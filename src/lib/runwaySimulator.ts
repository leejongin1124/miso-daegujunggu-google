/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * 골목생존 Target-Runway 계산 엔진.
 *
 * 모든 함수는 순수 함수(deterministic)이며 외부 상태나 AI 추론에 의존하지 않는다.
 * "얼마까지 빌릴 수 있는가"가 아니라 "몇 개월을 버틸 수 있고, 그 시간을 사려면
 * 얼마가 필요한가"를 계산하는 것이 이 모듈의 목적이다. 여신 승인/거절을
 * 판단하는 코드가 아니므로, 이 모듈의 출력을 그런 용도로 사용하지 않는다.
 *
 * 금액 단위는 모두 "원"이며, 비율(variableCostRate 등)은 0~1 사이 소수로 받는다.
 */

// ── 1. 매출 · 공헌이익 ──────────────────────────────────────────────

export interface RevenueInput {
  /** 객단가 (원) */
  price: number;
  /** 월 고객수 */
  customers: number;
}

export function calculateRevenue({ price, customers }: RevenueInput): number {
  return Math.max(price, 0) * Math.max(customers, 0);
}

export interface ContributionMarginInput {
  /** 월 매출 (원) */
  revenue: number;
  /** 변동비율 (0~1) */
  variableCostRate: number;
}

export interface ContributionMarginResult {
  variableCost: number;
  contributionMargin: number;
  contributionMarginRate: number;
}

export function calculateContributionMargin({
  revenue,
  variableCostRate,
}: ContributionMarginInput): ContributionMarginResult {
  const rate = clamp01(variableCostRate);
  const variableCost = revenue * rate;
  return {
    variableCost,
    contributionMargin: revenue - variableCost,
    contributionMarginRate: 1 - rate,
  };
}

// ── 2. 대출 원리금 ──────────────────────────────────────────────────

export interface DebtPaymentInput {
  /** 대출 원금 (원) */
  principal: number;
  /** 연이율 (0~1, 예: 4.5% → 0.045) */
  annualRate: number;
  /** 상환기간 (개월) */
  months: number;
}

/** 원리금균등상환 월 상환액 PMT(L) = L × k */
export function calculateDebtPayment({ principal, annualRate, months }: DebtPaymentInput): number {
  if (principal <= 0 || months <= 0) return 0;
  return principal * paymentFactor(annualRate, months);
}

/**
 * 원리금균등상환 계수 k = [r/12 × (1+r/12)^n] / [(1+r/12)^n - 1]
 * (연이율 0%인 극단값도 안전하게 처리 — 이 경우 단순 원금분할)
 */
export function paymentFactor(annualRate: number, months: number): number {
  if (months <= 0) return 0;
  const monthlyRate = annualRate / 12;
  if (monthlyRate === 0) return 1 / months;
  const growth = Math.pow(1 + monthlyRate, months);
  return (monthlyRate * growth) / (growth - 1);
}

// ── 3. Runway (생존기간) ────────────────────────────────────────────

export interface RunwayInput {
  /** 현재 보유 현금 (원) */
  currentCash: number;
  /** 월 현금소진액 (Burn). 0 이하면 흑자(현금이 늘어남)로 간주 */
  monthlyBurn: number;
}

export interface RunwayResult {
  /** 현금이 0원이 되기까지 남은 개월 수. 흑자(monthlyBurn<=0)면 null */
  cashOutMonths: number | null;
  isSurplus: boolean;
}

export function calculateRunway({ currentCash, monthlyBurn }: RunwayInput): RunwayResult {
  if (monthlyBurn <= 0) return { cashOutMonths: null, isSurplus: true };
  if (currentCash <= 0) return { cashOutMonths: 0, isSurplus: false };
  return { cashOutMonths: currentCash / monthlyBurn, isSurplus: false };
}

export interface SafetyRunwayInput {
  currentCash: number;
  monthlyBurn: number;
  /** 안전현금 기준 (예: 다음 1개월 고정비) */
  safetyBuffer: number;
}

/** "잔고 0원"이 아니라 안전현금(예: 다음 달 고정비) 이하로 떨어지는 시점까지의 개월 수 */
export function calculateSafetyRunway({ currentCash, monthlyBurn, safetyBuffer }: SafetyRunwayInput): number | null {
  if (monthlyBurn <= 0) return null;
  const usable = currentCash - safetyBuffer;
  if (usable <= 0) return 0;
  return usable / monthlyBurn;
}

// ── 4. BEP (손익분기점) ─────────────────────────────────────────────

export interface BEPInput {
  /** 월 고정비 총액 (사업고정비 + 금융비용, 원) */
  fixedCost: number;
  /** 객단가 */
  price: number;
  /** 변동비율 (0~1) */
  variableCostRate: number;
  /** 월 영업일수 */
  businessDays: number;
}

export interface BEPResult {
  contributionMarginPerCustomer: number;
  bepCustomersMonthly: number;
  bepCustomersDaily: number;
}

export function calculateBEP({ fixedCost, price, variableCostRate, businessDays }: BEPInput): BEPResult {
  const cmPerCustomer = price * (1 - clamp01(variableCostRate));
  if (cmPerCustomer <= 0 || fixedCost <= 0) {
    return {
      contributionMarginPerCustomer: cmPerCustomer,
      bepCustomersMonthly: cmPerCustomer <= 0 ? Infinity : 0,
      bepCustomersDaily: cmPerCustomer <= 0 ? Infinity : 0,
    };
  }
  const bepMonthly = fixedCost / cmPerCustomer;
  return {
    contributionMarginPerCustomer: cmPerCustomer,
    bepCustomersMonthly: bepMonthly,
    bepCustomersDaily: businessDays > 0 ? bepMonthly / businessDays : bepMonthly,
  };
}

// ── 5. 목표 생존기간 필요자금 역산 ──────────────────────────────────

export interface RequiredFundingInput {
  /** 목표 생존기간 R (개월) */
  targetMonths: number;
  /** 신규대출을 제외한 월 고정비 Fbase (사업고정비 + 기존 금융상환액) */
  fixedCostExcludingNewLoan: number;
  /** 월 공헌이익 CM */
  contributionMargin: number;
  /** 현재 현금 B0 */
  currentCash: number;
  /** 신규 대출 연이율 (0~1) */
  annualRate: number;
  /** 신규 대출 상환기간 (개월) */
  loanTermMonths: number;
}

export interface RequiredFundingResult {
  feasible: boolean;
  /** 필요 대출금 (원). feasible=false면 null */
  requiredAmount: number | null;
  /** 필요 대출금에 대한 월 신규 원리금 (원) */
  newMonthlyPayment: number | null;
  reason?: string;
}

/**
 * B0 + L = R × [Fbase + kL - CM] 을 L에 대해 풀면
 * L = [R(Fbase - CM) - B0] / (1 - Rk)
 * 단, 1 - Rk > 0 이어야 유효한 해가 존재한다 (그렇지 않으면 원리금균등상환
 * 만으로는 해당 금리·기간 조합에서 목표기간을 계산할 수 없음).
 */
export function calculateRequiredFunding({
  targetMonths,
  fixedCostExcludingNewLoan,
  contributionMargin,
  currentCash,
  annualRate,
  loanTermMonths,
}: RequiredFundingInput): RequiredFundingResult {
  if (targetMonths <= 0) {
    return { feasible: true, requiredAmount: 0, newMonthlyPayment: 0 };
  }

  const k = paymentFactor(annualRate, loanTermMonths);
  const denominator = 1 - targetMonths * k;

  if (denominator <= 0) {
    return {
      feasible: false,
      requiredAmount: null,
      newMonthlyPayment: null,
      reason:
        '이 금리·상환기간 조합으로는 목표기간을 원리금균등상환 대출만으로 계산할 수 없습니다. 상환기간을 늘리거나 목표기간을 줄여 다시 확인해 주세요.',
    };
  }

  const numerator = targetMonths * (fixedCostExcludingNewLoan - contributionMargin) - currentCash;
  if (numerator <= 0) {
    // 이미 현재 현금만으로 목표기간을 버틸 수 있는 경우
    return { feasible: true, requiredAmount: 0, newMonthlyPayment: 0 };
  }

  const requiredAmount = numerator / denominator;
  const newMonthlyPayment = calculateDebtPayment({ principal: requiredAmount, annualRate, months: loanTermMonths });
  return { feasible: true, requiredAmount, newMonthlyPayment };
}

// ── 6. 스트레스 테스트 ──────────────────────────────────────────────

export interface StressScenarioInput {
  price: number;
  customers: number;
  variableCostRate: number;
  /** 월 고정비 총액 (신규대출 원리금 포함, 원) */
  fixedCost: number;
  businessDays: number;
  currentCash: number;
}

export interface StressScenarioResult {
  id: 'base' | 'downside' | 'severe';
  label: string;
  description: string;
  revenue: number;
  contributionMargin: number;
  monthlyBurn: number;
  runwayMonths: number | null;
  bepCustomersDaily: number;
}

const STRESS_SCENARIOS = [
  { id: 'base' as const, label: '기준', description: '현재 매출 유지', revenueMultiplier: 1, variableCostAdd: 0 },
  { id: 'downside' as const, label: '악화', description: '매출 -10%', revenueMultiplier: 0.9, variableCostAdd: 0 },
  {
    id: 'severe' as const,
    label: '심각',
    description: '매출 -20% + 변동비율 +5%p',
    revenueMultiplier: 0.8,
    variableCostAdd: 0.05,
  },
];

export function calculateStressScenario(input: StressScenarioInput): StressScenarioResult[] {
  return STRESS_SCENARIOS.map((scenario) => {
    const customers = input.customers * scenario.revenueMultiplier;
    const revenue = calculateRevenue({ price: input.price, customers });
    const variableCostRate = clamp01(input.variableCostRate + scenario.variableCostAdd);
    const { contributionMargin } = calculateContributionMargin({ revenue, variableCostRate });
    const monthlyBurn = input.fixedCost - contributionMargin;
    const { cashOutMonths } = calculateRunway({ currentCash: input.currentCash, monthlyBurn });
    const bep = calculateBEP({
      fixedCost: input.fixedCost,
      price: input.price,
      variableCostRate,
      businessDays: input.businessDays,
    });
    return {
      id: scenario.id,
      label: scenario.label,
      description: scenario.description,
      revenue,
      contributionMargin,
      monthlyBurn,
      runwayMonths: cashOutMonths,
      bepCustomersDaily: bep.bepCustomersDaily,
    };
  });
}

// ── 7. 회복경로 (고객·가격·원가·고정비 중 무엇을 바꿀 것인가) ───────

export interface RecoveryPathInput {
  price: number;
  customers: number;
  variableCostRate: number;
  /** 월 고정비 총액 (신규대출 원리금 포함, 원) */
  fixedCost: number;
  businessDays: number;
}

export interface RecoveryPathResult {
  currentMonthlyProfit: number;
  /** 방법 A: BEP 도달에 필요한 월 추가 고객수 (음수면 이미 BEP 이상) */
  customerIncreaseNeeded: number;
  dailyCustomerIncreaseNeeded: number;
  /** 방법 B: 고객수·원가율 고정 시 BEP에 필요한 객단가 */
  priceNeededForBEP: number | null;
  /** 방법 C: 객단가·고객수 고정 시 BEP에 필요한 변동비율 (0~1, 음수면 불가능) */
  variableCostRateNeededForBEP: number | null;
  /** 방법 D 기초자료: 고객수·객단가·원가율 고정 시 BEP에 필요한 고정비 절감액 */
  fixedCostReductionNeeded: number;
}

export function calculateRecoveryPath({
  price,
  customers,
  variableCostRate,
  fixedCost,
  businessDays,
}: RecoveryPathInput): RecoveryPathResult {
  const revenue = calculateRevenue({ price, customers });
  const { contributionMargin } = calculateContributionMargin({ revenue, variableCostRate });
  const currentMonthlyProfit = contributionMargin - fixedCost;

  const bep = calculateBEP({ fixedCost, price, variableCostRate, businessDays });
  const customerIncreaseNeeded = Number.isFinite(bep.bepCustomersMonthly) ? bep.bepCustomersMonthly - customers : Infinity;
  const dailyCustomerIncreaseNeeded = businessDays > 0 ? customerIncreaseNeeded / businessDays : customerIncreaseNeeded;

  const cmRate = 1 - clamp01(variableCostRate);
  const priceNeededForBEP = customers > 0 && cmRate > 0 ? fixedCost / (customers * cmRate) : null;

  const variableCostRateNeededForBEP = revenue > 0 ? 1 - fixedCost / revenue : null;

  const fixedCostReductionNeeded = Math.max(fixedCost - contributionMargin, 0);

  return {
    currentMonthlyProfit,
    customerIncreaseNeeded,
    dailyCustomerIncreaseNeeded,
    priceNeededForBEP,
    variableCostRateNeededForBEP,
    fixedCostReductionNeeded,
  };
}

// ── 유틸 ────────────────────────────────────────────────────────────

function clamp01(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.min(Math.max(value, 0), 1);
}
