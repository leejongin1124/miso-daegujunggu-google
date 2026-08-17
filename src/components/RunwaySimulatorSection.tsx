/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  AlertTriangle,
  Building2,
  Coins,
  Gauge,
  Landmark,
  Phone,
  Printer,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Target,
  Users,
  Wallet,
} from 'lucide-react';
import {
  calculateBEP,
  calculateContributionMargin,
  calculateDebtPayment,
  calculateRecoveryPath,
  calculateRequiredFunding,
  calculateRevenue,
  calculateRunway,
  calculateSafetyRunway,
  calculateStressScenario,
} from '../lib/runwaySimulator';

// ── 표시 포맷 유틸 ───────────────────────────────────────────────────

const formatWon = (n: number) => `${Math.round(n).toLocaleString('ko-KR')}원`;
const formatMan = (n: number) => `${Math.round(n / 10000).toLocaleString('ko-KR')}만원`;
const formatManPrecise = (n: number) => `${(n / 10000).toFixed(1)}만원`;
const roundUpTo10Man = (n: number) => Math.ceil(Math.max(n, 0) / 100000) * 100000;
const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

function formatMonths(months: number | null): string {
  if (months === null) return '무기한(흑자)';
  if (months <= 0) return '0개월';
  return `${months.toFixed(1)}개월`;
}

function runwayBand(months: number | null): 'green' | 'amber' | 'red' {
  if (months === null) return 'green';
  if (months >= 12) return 'green';
  if (months >= 6) return 'amber';
  return 'red';
}

const BAND_STYLES = {
  green: { text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  amber: { text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', dot: 'bg-amber-500' },
  red: { text: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-200', dot: 'bg-rose-500' },
} as const;

const TARGET_MONTH_OPTIONS = [6, 12, 18, 24] as const;

// ── 재사용 소형 컴포넌트 ─────────────────────────────────────────────

function FieldNumber({
  id,
  label,
  value,
  onChange,
  suffix,
  hint,
  min = 0,
  step = 1,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
  hint?: string;
  min?: number;
  step?: number;
}) {
  return (
    <label htmlFor={id} className="block space-y-1.5">
      <span className="text-xs font-extrabold text-slate-600">{label}</span>
      <div className="relative">
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          step={step}
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) => onChange(clamp(Number(e.target.value) || 0, min, Number.MAX_SAFE_INTEGER))}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-miso-blue-500/30 focus:border-miso-blue-400"
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
      {hint && <span className="block text-[11px] text-slate-400 font-semibold">{hint}</span>}
    </label>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  band = 'green',
}: {
  icon: typeof Gauge;
  label: string;
  value: string;
  sub?: string;
  band?: 'green' | 'amber' | 'red' | 'neutral';
}) {
  const style =
    band === 'neutral'
      ? { text: 'text-slate-800', bg: 'bg-slate-50', border: 'border-slate-200', dot: 'bg-slate-400' }
      : BAND_STYLES[band];
  return (
    <div className={`rounded-2xl border p-5 space-y-2 ${style.bg} ${style.border}`}>
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${style.dot}`} />
        <Icon className="w-4 h-4 text-slate-400" />
        <span className="text-xs font-extrabold text-slate-500">{label}</span>
      </div>
      <p className={`text-2xl md:text-3xl font-black tracking-tight ${style.text}`}>{value}</p>
      {sub && <p className="text-xs text-slate-500 font-semibold leading-relaxed break-keep">{sub}</p>}
    </div>
  );
}

function SliderRow({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step,
  valueLabel,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  valueLabel: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm font-extrabold text-slate-800">
        <label htmlFor={id}>{label}</label>
        <output htmlFor={id} className="text-miso-blue-600 font-black">
          {valueLabel}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-miso-blue-600 cursor-pointer h-2 bg-slate-100 rounded-lg appearance-none"
      />
    </div>
  );
}

// ── 메인 컴포넌트 ────────────────────────────────────────────────────

export default function RunwaySimulatorSection() {
  // STEP 1 — 사업 정보
  const [price, setPrice] = useState(10000);
  const [customers, setCustomers] = useState(800);
  const [businessDays, setBusinessDays] = useState(25);
  const [currentCash, setCurrentCash] = useState(10000000);
  const [variableCostRatePct, setVariableCostRatePct] = useState(40);

  // STEP 2 — 비용구조 (고정비 세부 입력)
  const [rent, setRent] = useState(1800000);
  const [labor, setLabor] = useState(2500000);
  const [otherFixed, setOtherFixed] = useState(1200000);
  const [existingDebtPayment, setExistingDebtPayment] = useState(500000);

  // STEP 5 — 신규 대출 시뮬레이션
  const [loanAmount, setLoanAmount] = useState(0);
  const [loanRate, setLoanRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(60);

  // STEP 6 — 목표 생존기간
  const [targetMonths, setTargetMonths] = useState<(typeof TARGET_MONTH_OPTIONS)[number]>(12);

  // STEP 20/21 — 회복경로 복합개선 슬라이더 (하루 고객·객단가·원가율·고정비 조정폭)
  const [dailyCustomerDelta, setDailyCustomerDelta] = useState(0);
  const [priceDelta, setPriceDelta] = useState(0);
  const [vcRateDeltaPct, setVcRateDeltaPct] = useState(0);
  const [fixedCostDeltaMan, setFixedCostDeltaMan] = useState(0);

  const variableCostRate = variableCostRatePct / 100;
  const fBase = rent + labor + otherFixed + existingDebtPayment;

  const revenue = useMemo(() => calculateRevenue({ price, customers }), [price, customers]);
  const { contributionMargin, contributionMarginRate } = useMemo(
    () => calculateContributionMargin({ revenue, variableCostRate }),
    [revenue, variableCostRate],
  );

  // "지금 이대로" — 신규대출 없이 현재 상태 그대로 버틸 때
  const baseMonthlyBurn = fBase - contributionMargin;
  const baseRunway = useMemo(
    () => calculateRunway({ currentCash, monthlyBurn: baseMonthlyBurn }),
    [currentCash, baseMonthlyBurn],
  );
  const baseSafetyRunway = useMemo(
    () => calculateSafetyRunway({ currentCash, monthlyBurn: baseMonthlyBurn, safetyBuffer: fBase }),
    [currentCash, baseMonthlyBurn, fBase],
  );
  const baseBEP = useMemo(
    () => calculateBEP({ fixedCost: fBase, price, variableCostRate, businessDays }),
    [fBase, price, variableCostRate, businessDays],
  );
  const currentDaily = businessDays > 0 ? customers / businessDays : 0;
  const dailyGap = Number.isFinite(baseBEP.bepCustomersDaily) ? Math.max(baseBEP.bepCustomersDaily - currentDaily, 0) : Infinity;

  // 신규 대출 반영 시
  const newLoanPayment = useMemo(
    () => calculateDebtPayment({ principal: loanAmount, annualRate: loanRate / 100, months: loanTerm }),
    [loanAmount, loanRate, loanTerm],
  );
  const totalFixedCost = fBase + newLoanPayment;
  const cashAfterLoan = currentCash + loanAmount;
  const monthlyBurnAfterLoan = totalFixedCost - contributionMargin;
  const runwayAfterLoan = useMemo(
    () => calculateRunway({ currentCash: cashAfterLoan, monthlyBurn: monthlyBurnAfterLoan }),
    [cashAfterLoan, monthlyBurnAfterLoan],
  );
  const bepAfterLoan = useMemo(
    () => calculateBEP({ fixedCost: totalFixedCost, price, variableCostRate, businessDays }),
    [totalFixedCost, price, variableCostRate, businessDays],
  );

  // STEP 6 — 목표 생존기간 필요자금 역산
  const requiredFunding = useMemo(
    () =>
      calculateRequiredFunding({
        targetMonths,
        fixedCostExcludingNewLoan: fBase,
        contributionMargin,
        currentCash,
        annualRate: loanRate / 100,
        loanTermMonths: loanTerm,
      }),
    [targetMonths, fBase, contributionMargin, currentCash, loanRate, loanTerm],
  );
  const requiredFundingDisplay = requiredFunding.requiredAmount !== null ? roundUpTo10Man(requiredFunding.requiredAmount) : null;

  // 스트레스 테스트 — 신규 대출을 반영한 상태에서 매출 충격에 얼마나 버티는가
  const stressScenarios = useMemo(
    () =>
      calculateStressScenario({
        price,
        customers,
        variableCostRate,
        fixedCost: totalFixedCost,
        businessDays,
        currentCash: cashAfterLoan,
      }),
    [price, customers, variableCostRate, totalFixedCost, businessDays, cashAfterLoan],
  );
  const severeScenario = stressScenarios.find((s) => s.id === 'severe') ?? null;

  // 회복경로 — 신규 대출 반영 상태를 기준으로, "그 다음에 무엇을 바꿔야 하는가"
  const recovery = useMemo(
    () =>
      calculateRecoveryPath({
        price,
        customers,
        variableCostRate,
        fixedCost: totalFixedCost,
        businessDays,
      }),
    [price, customers, variableCostRate, totalFixedCost, businessDays],
  );

  // 복합개선 슬라이더 반영 결과
  const adjCustomers = Math.max(customers + dailyCustomerDelta * businessDays, 0);
  const adjPrice = Math.max(price + priceDelta, 0);
  const adjVcRate = clamp(variableCostRate - vcRateDeltaPct / 100, 0, 0.95);
  const adjFixedCost = Math.max(totalFixedCost - fixedCostDeltaMan * 10000, 0);
  const adjRevenue = calculateRevenue({ price: adjPrice, customers: adjCustomers });
  const adjContributionMargin = calculateContributionMargin({ revenue: adjRevenue, variableCostRate: adjVcRate }).contributionMargin;
  const adjMonthlyProfit = adjContributionMargin - adjFixedCost;
  const baselineMonthlyProfitAfterLoan = -monthlyBurnAfterLoan;
  const hasRecoveryAdjustment = dailyCustomerDelta !== 0 || priceDelta !== 0 || vcRateDeltaPct !== 0 || fixedCostDeltaMan !== 0;

  // 4단계 진단 배지 — section 13~15: 여신승인/거절 판정이 아닌 참고용 구조진단
  const diagnosisTier = useMemo<'green' | 'amber' | 'red'>(() => {
    const gapRatio = currentDaily > 0 ? dailyGap / currentDaily : dailyGap > 0 ? Infinity : 0;
    const severeIsCollapsing = severeScenario ? severeScenario.runwayMonths !== null && severeScenario.runwayMonths <= 3 : false;
    if (!requiredFunding.feasible) return 'red';
    if (severeIsCollapsing && gapRatio > 0.3) return 'red';
    if (gapRatio <= 0.15) return 'green';
    if (gapRatio <= 0.5) return 'amber';
    return 'red';
  }, [currentDaily, dailyGap, severeScenario, requiredFunding.feasible]);

  const diagnosisCopy = {
    green: {
      emoji: '🟢',
      title: '회복여력 있음',
      body: '현재 비용구조와 고객 수준에서 비교적 작은 개선으로 BEP 접근이 가능합니다.',
    },
    amber: {
      emoji: '🟡',
      title: '구조개선 필요',
      body: '대출만으로는 충분하지 않습니다. 고객 증가 또는 원가·고정비 개선이 함께 이루어져야 합니다.',
    },
    red: {
      emoji: '🔴',
      title: '현금투입 효과 제한',
      body: '추가자금을 투입하더라도 현재 수익구조가 유지되면 일정기간 후 다시 현금부족이 발생할 수 있습니다.',
    },
  }[diagnosisTier];

  const applyRequiredFundingToLoanSlider = () => {
    if (requiredFundingDisplay === null) return;
    setLoanAmount(clamp(requiredFundingDisplay, 0, 30000000));
  };

  const resetRecoverySliders = () => {
    setDailyCustomerDelta(0);
    setPriceDelta(0);
    setVcRateDeltaPct(0);
    setFixedCostDeltaMan(0);
  };

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 소개 + 핵심 메시지 */}
        <div className="text-center space-y-5 max-w-3xl mx-auto">
          <span className="text-xs font-black text-miso-blue-600 tracking-widest uppercase">Small Business Runway Simulator</span>
          <h2 className="text-3xl md:text-[2.6rem] font-black text-slate-900 tracking-tight leading-tight break-keep">
            골목생존 Target-Runway
          </h2>
          <div className="h-1.5 w-16 bg-miso-blue-600 rounded-full mx-auto" />
          <p className="text-slate-600 font-bold text-base md:text-lg leading-relaxed break-keep">
            "얼마를 빌릴 수 있습니까?"가 아니라
            <br className="hidden sm:block" />
            "얼마의 시간을 살 것이며, 그 시간 안에 무엇을 바꿔야 합니까?"
          </p>
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 text-left">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-amber-800 text-xs md:text-sm font-semibold leading-relaxed break-keep">
              이 도구는 입력하신 조건을 바탕으로 한 참고용 시뮬레이션입니다. 실제 대출 여부와 한도는 금융기관의 별도 여신심사에 따라
              결정되며, 이 계산 결과가 대출 승인이나 거절을 의미하지 않습니다.
            </p>
          </div>
        </div>

        {/* STEP 1+2 — 입력: 사업정보 · 비용구조 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-white border border-slate-200 rounded-3xl p-6 md:p-7 space-y-5 shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-miso-blue-50 text-miso-blue-700 flex items-center justify-center">
                <Building2 className="w-4.5 h-4.5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">사업 정보</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FieldNumber id="price" label="객단가" value={price} onChange={setPrice} suffix="원" step={500} hint={`${price.toLocaleString('ko-KR')}원`} />
              <FieldNumber id="customers" label="월 고객수" value={customers} onChange={setCustomers} suffix="명" step={10} />
              <FieldNumber id="business-days" label="월 영업일수" value={businessDays} onChange={setBusinessDays} suffix="일" min={1} step={1} />
              <FieldNumber
                id="current-cash"
                label="현재 보유 현금"
                value={currentCash}
                onChange={setCurrentCash}
                suffix="원"
                step={1000000}
                hint={formatMan(currentCash)}
              />
            </div>
            <div className="pt-1">
              <SliderRow
                id="variable-cost-rate"
                label="변동비율 (원재료·수수료 등)"
                value={variableCostRatePct}
                onChange={setVariableCostRatePct}
                min={0}
                max={80}
                step={1}
                valueLabel={`${variableCostRatePct}%`}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="bg-white border border-slate-200 rounded-3xl p-6 md:p-7 space-y-5 shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-miso-blue-50 text-miso-blue-700 flex items-center justify-center">
                <Wallet className="w-4.5 h-4.5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">월 고정비 구조</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FieldNumber id="rent" label="임차료" value={rent} onChange={setRent} suffix="원" step={100000} hint={formatMan(rent)} />
              <FieldNumber id="labor" label="인건비(4대보험 포함)" value={labor} onChange={setLabor} suffix="원" step={100000} hint={formatMan(labor)} />
              <FieldNumber
                id="other-fixed"
                label="관리비·공과금·통신비 등"
                value={otherFixed}
                onChange={setOtherFixed}
                suffix="원"
                step={100000}
                hint={formatMan(otherFixed)}
              />
              <FieldNumber
                id="existing-debt"
                label="기존 대출·카드론 월 상환액"
                value={existingDebtPayment}
                onChange={setExistingDebtPayment}
                suffix="원"
                step={50000}
                hint={formatMan(existingDebtPayment)}
              />
            </div>
            <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
              <span className="text-xs font-extrabold text-slate-500">월 고정비 합계 (Fbase)</span>
              <span className="text-sm font-black text-slate-800">{formatMan(fBase)}</span>
            </div>
          </motion.div>
        </div>

        {/* STEP 3+4 — 지금 이대로 진단 */}
        <div className="space-y-5">
          <div className="text-center space-y-2">
            <span className="text-xs font-black text-miso-blue-600 tracking-widest uppercase">Where I Stand Today</span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">지금 이대로, 몇 개월을 버틸 수 있을까요?</h3>
            <p className="text-slate-500 text-sm break-keep">신규 대출 없이 현재 조건이 그대로 이어질 경우를 기준으로 계산합니다.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={Gauge}
              label="현금 완전 고갈까지"
              value={formatMonths(baseRunway.cashOutMonths)}
              sub={baseRunway.isSurplus ? '월 손익이 흑자라 현금이 늘어나고 있습니다.' : undefined}
              band={runwayBand(baseRunway.cashOutMonths)}
            />
            <StatCard
              icon={ShieldAlert}
              label="안전현금(다음 1개월 고정비) 기준"
              value={formatMonths(baseSafetyRunway)}
              sub="다음 달 임차료·인건비를 낼 현금이 없어지는 시점입니다."
              band={runwayBand(baseSafetyRunway)}
            />
            <StatCard
              icon={Coins}
              label="월 현금소진(Burn)"
              value={baseMonthlyBurn <= 0 ? `+${formatMan(-baseMonthlyBurn)}` : `-${formatMan(baseMonthlyBurn)}`}
              sub={baseMonthlyBurn <= 0 ? '월 기준 흑자입니다.' : '월 기준 적자 규모입니다.'}
              band={baseMonthlyBurn <= 0 ? 'green' : baseMonthlyBurn > fBase * 0.5 ? 'red' : 'amber'}
            />
            <StatCard
              icon={Users}
              label="하루 필요 고객"
              value={`${currentDaily.toFixed(1)}명 → ${Number.isFinite(baseBEP.bepCustomersDaily) ? baseBEP.bepCustomersDaily.toFixed(1) : '∞'}명`}
              sub={
                Number.isFinite(dailyGap)
                  ? dailyGap <= 0
                    ? '이미 손익분기점(BEP)을 넘었습니다.'
                    : `적자를 멈추려면 하루 +${dailyGap.toFixed(1)}명이 더 필요합니다.`
                  : '현재 원가·가격 구조로는 손익분기점에 도달할 수 없습니다.'
              }
              band={dailyGap <= 0 ? 'green' : dailyGap <= currentDaily * 0.15 ? 'green' : dailyGap <= currentDaily * 0.5 ? 'amber' : 'red'}
            />
          </div>
          <p className="text-center text-xs text-slate-400 font-semibold">
            공헌이익률 {(contributionMarginRate * 100).toFixed(1)}% · 월 공헌이익 {formatMan(contributionMargin)} · 월 매출 {formatMan(revenue)}
          </p>
        </div>

        {/* STEP 5 — 신규 대출 시뮬레이션 */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-slate-200/90 rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-miso-blue-700 to-miso-navy-700 p-8 text-white space-y-2">
            <span className="text-[10px] font-bold text-miso-blue-100 bg-white/20 px-2.5 py-1 rounded-md uppercase">Loan Simulation</span>
            <h3 className="text-xl md:text-2xl font-black tracking-tight">대출을 받으면 생존기간이 얼마나 늘어날까?</h3>
            <p className="text-miso-blue-100 text-xs font-semibold">대출은 돈을 빌리는 것이 아니라, 회복할 시간을 사는 것입니다. 그 시간 안에 BEP를 넘지 못하면 부채만 늘어납니다.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-8 md:p-10 space-y-8 divide-y divide-slate-100">
              <div className="space-y-3 pb-2">
                <div className="flex justify-between items-center text-sm font-extrabold text-slate-800">
                  <label htmlFor="new-loan-amount">💰 신규 대출 원금</label>
                  <output htmlFor="new-loan-amount" className="text-miso-blue-600 font-black text-lg">
                    {formatMan(loanAmount)}
                  </output>
                </div>
                <input
                  id="new-loan-amount"
                  type="range"
                  min={0}
                  max={30000000}
                  step={500000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-miso-blue-600 cursor-pointer h-2 bg-slate-100 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-bold">
                  <span>0원</span>
                  <span>1,500만원</span>
                  <span>3,000만원</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-6">
                <SliderRow
                  id="loan-rate"
                  label="📈 연 이자율"
                  value={loanRate}
                  onChange={setLoanRate}
                  min={1}
                  max={10}
                  step={0.1}
                  valueLabel={`${loanRate.toFixed(1)}%`}
                />
                <SliderRow
                  id="loan-term"
                  label="📅 상환기간"
                  value={loanTerm}
                  onChange={setLoanTerm}
                  min={12}
                  max={84}
                  step={12}
                  valueLabel={`${loanTerm}개월(${(loanTerm / 12).toFixed(0)}년)`}
                />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed pt-6">
                ※ 위 조건은 원리금균등상환·거치기간 없음 기준의 단순 예상치입니다. 실제 적용 가능한 금리·기간·거치조건은 상담을 통해
                안내해 드립니다.
              </p>
            </div>
            <div className="lg:col-span-5 bg-slate-50 p-8 md:p-10 border-l border-slate-100 space-y-5">
              <h4 className="font-extrabold text-slate-900 text-[15px] pb-3 border-b border-slate-200">대출 반영 결과</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-baseline">
                  <span className="text-slate-500 font-medium">월 신규 원리금</span>
                  <span className="font-black text-slate-800">{loanAmount > 0 ? formatManPrecise(newLoanPayment) : '0원'}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-slate-500 font-medium">대출 후 현금</span>
                  <span className="font-black text-slate-800">{formatMan(cashAfterLoan)}</span>
                </div>
                <div className="h-0.5 border-t border-dashed border-slate-200 my-1" />
                <div className="flex justify-between items-baseline">
                  <span className="text-slate-500 font-medium">대출 후 생존기간</span>
                  <span className="font-black text-miso-blue-700">{formatMonths(runwayAfterLoan.cashOutMonths)}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-slate-500 font-medium">대출 후 BEP 하루 고객</span>
                  <span className="font-black text-slate-800">
                    {Number.isFinite(bepAfterLoan.bepCustomersDaily) ? `약 ${Math.ceil(bepAfterLoan.bepCustomersDaily)}명` : '도달 불가'}
                  </span>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-4 text-xs text-slate-500 font-semibold leading-relaxed break-keep">
                대출 전 BEP {Number.isFinite(baseBEP.bepCustomersDaily) ? `${baseBEP.bepCustomersDaily.toFixed(1)}명/일` : '도달 불가'} →
                대출 후 BEP {Number.isFinite(bepAfterLoan.bepCustomersDaily) ? `${bepAfterLoan.bepCustomersDaily.toFixed(1)}명/일` : '도달 불가'}. 원리금만큼
                손익분기점이 더 높아집니다.
              </div>
            </div>
          </div>
        </motion.div>

        {/* STEP 6 — 목표기간 역산 */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-tr from-teal-50 to-slate-50 border border-teal-100 rounded-3xl p-6 md:p-8 space-y-5"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center">
              <Target className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">얼마나 시간을 확보하고 싶습니까?</h3>
              <p className="text-slate-500 text-xs font-semibold">목표 생존기간을 고르면 필요 자금을 역산합니다.</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {TARGET_MONTH_OPTIONS.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setTargetMonths(m)}
                aria-pressed={targetMonths === m}
                className={`text-sm font-black py-3 rounded-xl border transition-colors ${
                  targetMonths === m
                    ? 'bg-teal-600 border-teal-600 text-white shadow'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-teal-300'
                }`}
              >
                {m}개월
              </button>
            ))}
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
            {requiredFunding.feasible ? (
              <>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                  <span className="text-sm font-extrabold text-slate-600">{targetMonths}개월 확보에 필요한 신규자금</span>
                  <span className="text-2xl font-black text-teal-700">약 {formatMan(requiredFundingDisplay ?? 0)}</span>
                </div>
                {requiredFunding.requiredAmount !== null && requiredFunding.requiredAmount > 0 && (
                  <p className="text-xs text-slate-400 font-semibold">
                    정확한 계산값 {formatManPrecise(requiredFunding.requiredAmount)} · 예상 월 신규 원리금{' '}
                    {formatManPrecise(requiredFunding.newMonthlyPayment ?? 0)}
                  </p>
                )}
                {requiredFunding.requiredAmount === 0 && (
                  <p className="text-xs text-emerald-600 font-bold">현재 보유 현금만으로도 {targetMonths}개월을 버틸 수 있는 것으로 계산됩니다.</p>
                )}
                {requiredFundingDisplay !== null && requiredFundingDisplay > 0 && (
                  <button
                    type="button"
                    onClick={applyRequiredFundingToLoanSlider}
                    className="text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg px-3 py-2 transition-colors"
                  >
                    이 금액을 위 대출 시뮬레이션에 반영하기 →
                  </button>
                )}
              </>
            ) : (
              <p className="text-sm font-bold text-rose-600 leading-relaxed break-keep">{requiredFunding.reason}</p>
            )}
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            ※ 계절적 매출 변화, 거치기간, 세금, 일회성 지출 등은 반영되지 않은 단순화된 계산입니다. 실제 필요 자금은 상담을 통해 더
            정교하게 산정할 수 있습니다.
          </p>
        </motion.div>

        {/* 스트레스 테스트 */}
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <span className="text-xs font-black text-miso-blue-600 tracking-widest uppercase">Stress Test</span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">매출이 흔들려도 버틸 수 있을까요?</h3>
            <p className="text-slate-500 text-sm break-keep">위에서 설정한 대출 조건을 반영해, 매출 충격 시나리오별로 다시 계산합니다.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[560px]">
              <thead>
                <tr className="text-left text-xs font-black text-slate-500 border-b border-slate-200">
                  <th className="py-3 pr-4">시나리오</th>
                  <th className="py-3 pr-4">월 매출</th>
                  <th className="py-3 pr-4">월 손익</th>
                  <th className="py-3 pr-4">생존기간</th>
                  <th className="py-3">BEP 하루 고객</th>
                </tr>
              </thead>
              <tbody>
                {stressScenarios.map((s) => {
                  const band = runwayBand(s.runwayMonths);
                  const style = BAND_STYLES[band];
                  return (
                    <tr key={s.id} className="border-b border-slate-100">
                      <td className="py-3 pr-4">
                        <span className="font-extrabold text-slate-800">{s.label}</span>
                        <span className="block text-[11px] text-slate-400 font-semibold">{s.description}</span>
                      </td>
                      <td className="py-3 pr-4 font-bold text-slate-700">{formatMan(s.revenue)}</td>
                      <td className={`py-3 pr-4 font-bold ${s.monthlyBurn <= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {s.monthlyBurn <= 0 ? `+${formatMan(-s.monthlyBurn)}` : `-${formatMan(s.monthlyBurn)}`}
                      </td>
                      <td className={`py-3 pr-4 font-black ${style.text}`}>{formatMonths(s.runwayMonths)}</td>
                      <td className="py-3 font-bold text-slate-700">
                        {Number.isFinite(s.bepCustomersDaily) ? `${s.bepCustomersDaily.toFixed(1)}명` : '도달 불가'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 회복경로 찾기 */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-black text-miso-blue-600 tracking-widest uppercase">Recovery Path</span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">무엇을 바꿔야 대출 없이도 살아남을까요?</h3>
            <p className="text-slate-500 text-sm break-keep">위 대출 조건을 반영한 손익분기점을 기준으로, 네 가지 방법을 따로 계산합니다.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2">
              <span className="text-[10px] font-black text-miso-blue-600 uppercase">방법 A · 고객 증가</span>
              <p className="text-2xl font-black text-slate-900">
                {Number.isFinite(recovery.dailyCustomerIncreaseNeeded)
                  ? recovery.dailyCustomerIncreaseNeeded <= 0
                    ? '달성'
                    : `+${recovery.dailyCustomerIncreaseNeeded.toFixed(1)}명`
                  : '불가'}
              </p>
              <p className="text-xs text-slate-500 font-semibold">하루 고객을 이만큼 늘리면 BEP에 도달합니다.</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2">
              <span className="text-[10px] font-black text-miso-blue-600 uppercase">방법 B · 가격 조정</span>
              <p className="text-2xl font-black text-slate-900">
                {recovery.priceNeededForBEP !== null ? `${Math.ceil(recovery.priceNeededForBEP).toLocaleString('ko-KR')}원` : '불가'}
              </p>
              <p className="text-xs text-slate-500 font-semibold">
                고객수를 유지한다면 객단가를 현재 {price.toLocaleString('ko-KR')}원에서 이 수준으로 조정해야 합니다.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2">
              <span className="text-[10px] font-black text-miso-blue-600 uppercase">방법 C · 원가율 개선</span>
              <p className="text-2xl font-black text-slate-900">
                {recovery.variableCostRateNeededForBEP !== null && recovery.variableCostRateNeededForBEP >= 0
                  ? `${(recovery.variableCostRateNeededForBEP * 100).toFixed(1)}%`
                  : '불가'}
              </p>
              <p className="text-xs text-slate-500 font-semibold">현재 {variableCostRatePct}%인 변동비율을 이 수준까지 낮춰야 합니다.</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2">
              <span className="text-[10px] font-black text-miso-blue-600 uppercase">방법 D · 고정비 절감</span>
              <p className="text-2xl font-black text-slate-900">{formatMan(recovery.fixedCostReductionNeeded)}</p>
              <p className="text-xs text-slate-500 font-semibold">월 고정비를 이만큼 줄이면 BEP에 도달합니다.</p>
            </div>
          </div>

          {/* 복합개선 시뮬레이터 */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-miso-navy-600 text-white flex items-center justify-center">
                  <Sparkles className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base">복합개선 시뮬레이터</h4>
                  <p className="text-slate-500 text-xs font-semibold">네 가지 방법을 동시에 조금씩 조절해 보세요.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={resetRecoverySliders}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                초기화
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <SliderRow
                id="recovery-customer"
                label="고객 증가 (하루)"
                value={dailyCustomerDelta}
                onChange={setDailyCustomerDelta}
                min={0}
                max={20}
                step={1}
                valueLabel={`+${dailyCustomerDelta}명`}
              />
              <SliderRow
                id="recovery-price"
                label="객단가 인상"
                value={priceDelta}
                onChange={setPriceDelta}
                min={0}
                max={2000}
                step={100}
                valueLabel={`+${priceDelta.toLocaleString('ko-KR')}원`}
              />
              <SliderRow
                id="recovery-vc"
                label="원가율 절감"
                value={vcRateDeltaPct}
                onChange={setVcRateDeltaPct}
                min={0}
                max={15}
                step={1}
                valueLabel={`-${vcRateDeltaPct}%p`}
              />
              <SliderRow
                id="recovery-fixed"
                label="고정비 절감"
                value={fixedCostDeltaMan}
                onChange={setFixedCostDeltaMan}
                min={0}
                max={200}
                step={10}
                valueLabel={`-${fixedCostDeltaMan}만원`}
              />
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <span className="text-xs font-extrabold text-slate-500 block">조정 후 예상 월손익 (대출 반영 기준)</span>
                <span className={`text-2xl font-black ${adjMonthlyProfit >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {adjMonthlyProfit >= 0 ? '+' : '-'}
                  {formatMan(Math.abs(adjMonthlyProfit))}
                </span>
              </div>
              {hasRecoveryAdjustment && (
                <span className="text-xs font-bold text-slate-500">
                  조정 전 {baselineMonthlyProfitAfterLoan >= 0 ? '+' : '-'}
                  {formatMan(Math.abs(baselineMonthlyProfitAfterLoan))} → 조정 후{' '}
                  <span className={adjMonthlyProfit >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                    {adjMonthlyProfit >= 0 ? '+' : '-'}
                    {formatMan(Math.abs(adjMonthlyProfit))}
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 사업 자금구조 진단 (여신등급이 아님) */}
        <div id="runway-report" className="bg-slate-900 rounded-3xl p-6 md:p-10 text-white space-y-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Result Report</span>
              <h3 className="text-xl md:text-2xl font-black tracking-tight mt-1">우리 가게 자금생존 진단</h3>
              <p className="text-slate-400 text-xs font-semibold mt-1">사업 자금구조 진단 — 여신등급이나 대출 승인 여부가 아닙니다.</p>
            </div>
            <div className={`flex items-center gap-2 rounded-2xl px-4 py-3 ${BAND_STYLES[diagnosisTier].bg} border ${BAND_STYLES[diagnosisTier].border}`}>
              <span className="text-2xl leading-none">{diagnosisCopy.emoji}</span>
              <div>
                <p className={`font-black text-sm ${BAND_STYLES[diagnosisTier].text}`}>{diagnosisCopy.title}</p>
              </div>
            </div>
          </div>

          <p className="text-slate-300 text-sm md:text-base font-semibold leading-relaxed break-keep">{diagnosisCopy.body}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="space-y-1">
              <span className="text-slate-400 text-xs font-bold block">현금잔액</span>
              <span className="font-black text-lg">{formatMan(currentCash)}</span>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 text-xs font-bold block">월 현금소진</span>
              <span className="font-black text-lg">{baseMonthlyBurn <= 0 ? '흑자' : formatMan(baseMonthlyBurn)}</span>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 text-xs font-bold block">현 상태 생존기간</span>
              <span className="font-black text-lg">{formatMonths(baseRunway.cashOutMonths)}</span>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 text-xs font-bold block">하루 고객 부족분</span>
              <span className="font-black text-lg">{Number.isFinite(dailyGap) ? `+${dailyGap.toFixed(1)}명` : '도달불가'}</span>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-1">
              <span className="text-slate-400 text-xs font-bold block">{targetMonths}개월 확보 시 필요자금</span>
              <span className="font-black text-lg text-teal-300">
                {requiredFunding.feasible ? `약 ${formatMan(requiredFundingDisplay ?? 0)}` : '계산 불가'}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 text-xs font-bold block">신규 원리금(예상)</span>
              <span className="font-black text-lg">
                {requiredFunding.feasible && requiredFunding.newMonthlyPayment ? formatManPrecise(requiredFunding.newMonthlyPayment) : '-'}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 text-xs font-bold block">대출 후 BEP 하루 고객</span>
              <span className="font-black text-lg">
                {Number.isFinite(bepAfterLoan.bepCustomersDaily) ? `약 ${Math.ceil(bepAfterLoan.bepCustomersDaily)}명` : '도달 불가'}
              </span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
            <p className="text-slate-200 text-sm font-bold leading-relaxed break-keep">
              🟢 Green이 대출 승인을, 🔴 Red가 대출 거절을 의미하지 않습니다. 이 진단은 상담을 준비하기 위한 참고 자료이며, 실제 대출
              여부와 한도는 금융기관의 별도 심사에 따라 결정됩니다.
            </p>
            <p className="text-slate-400 text-xs font-semibold leading-relaxed break-keep">
              입력하신 조건에 따른 시뮬레이션 결과이며, 계절적 매출 변화·세금·일회성 지출 등 실제 현금흐름에 영향을 주는 요소가 모두
              반영되지는 않았습니다.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-black text-sm px-5 py-3.5 rounded-xl transition"
            >
              <Printer className="w-4 h-4" />
              결과 인쇄 · PDF로 저장
            </button>
            <a
              href="tel:053-252-6408"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-900 font-black text-sm px-5 py-3.5 rounded-xl transition"
            >
              <Phone className="w-4 h-4" />
              이 결과로 전화 상담 신청하기
            </a>
          </div>
        </div>

        {/* 하단 보조 안내 */}
        <div className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 max-w-4xl mx-auto">
          <Landmark className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
          <p className="text-slate-500 text-xs leading-relaxed break-keep">
            모든 계산은 입력값을 기반으로 한 결정론적(deterministic) 수식으로 이루어지며, AI는 결과를 설명하는 역할만 담당합니다. 담보나
            보증 없이도 상담을 신청할 수 있으며, 신용점수·상환능력·사업 지속 가능성 등을 종합적으로 심사해 지원 여부를 결정합니다.
          </p>
        </div>
      </div>
    </section>
  );
}
