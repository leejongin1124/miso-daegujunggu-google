/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, AlertTriangle, Calculator, FileText, Info, HelpCircle, CornerDownRight, Landmark, FileCheck, ChevronDown, ChevronRight, Search, MapPin, Monitor, Smartphone } from 'lucide-react';
import MisoIntroSection from './MisoIntroSection';

const GUIDE_CATEGORIES = [
  { id: 'miso-intro', label: '미소금융이란', desc: '서민금융진흥원 미소금융 제도 소개', icon: Info, path: '/miso-intro' },
  { id: 'loan-target', label: '신청 전 확인사항', desc: '신청 전 확인해야 할 기본 기준', icon: CheckCircle2, path: '/guide/loan-target' },
  { id: 'process-guide', label: '신청 절차·준비서류', desc: '상담부터 결과 안내까지의 절차', icon: FileCheck, path: '/guide/process-guide' },
  { id: 'faq-section', label: '자주 묻는 질문', desc: '신청 전 궁금한 점 모음', icon: HelpCircle, path: '/guide/faq-section' },
  { id: 'loan-calc-intro', label: '대출금 계산기', desc: '월 상환 예정액을 미리 계산', icon: Calculator, path: '/guide/loan-calc-intro' },
];

export default function GuideSection({ sectionId }: { sectionId?: string }) {
  const navigate = useNavigate();
  const show = (ids: string | string[]) =>
    !sectionId || (Array.isArray(ids) ? ids.includes(sectionId) : sectionId === ids);
  // FAQ 아코디언 상태 변수
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);
  // FAQ 카테고리 필터 · 검색어 상태
  const [faqCategory, setFaqCategory] = useState('전체');
  const [faqQuery, setFaqQuery] = useState('');

  // 신청안내 개요 화면(sectionId 없음)에서 카테고리 카드 4개를 1바퀴 자동 순환 강조
  const [spotlightIdx, setSpotlightIdx] = useState(0);
  const userInteractedRef = useRef(false);
  useEffect(() => {
    if (sectionId) return;
    userInteractedRef.current = false;
    setSpotlightIdx(0);
    let idx = 0;
    const interval = setInterval(() => {
      if (userInteractedRef.current) {
        clearInterval(interval);
        return;
      }
      idx += 1;
      if (idx >= GUIDE_CATEGORIES.length) {
        clearInterval(interval);
        setSpotlightIdx(-1);
        return;
      }
      setSpotlightIdx(idx);
    }, 2200);
    return () => clearInterval(interval);
  }, [sectionId]);

  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const faqs = [
    {
      id: 1,
      category: '신청 자격',
      question: "미소금융은 누가 신청할 수 있나요?",
      answer: "개인신용평점 하위 20%(KCB 700점 이하, NICE 749점 이하 기준)에 해당하거나 기초생활수급자, 차상위계층, 근로장려금 신청자격 요건에 해당하는 청년, 영세자영업자가 신청할 수 있습니다. 요건 충족이 곧 승인을 의미하지는 않으며, 최종 지원 여부는 여신심사 결과에 따라 결정됩니다."
    },
    {
      id: 22,
      category: '상환·금리',
      question: "금리는 어떻게 되나요?",
      answer: "기본금리는 연 4.5%예요. 그동안 연체 없이 잘 갚아오신 분은 성실상환 우대금리가 적용돼서 연 3.5%로 낮아집니다. 반대로 상환이 늦어지면 단기연체 시 연 5.5%가 적용되고, 장기연체로 넘어가면 지연배상금률로 연 9.0%까지 올라가니 상환일은 꼭 지켜주세요. 무등록사업자는 이런 구분 없이 처음부터 연 2.0%의 낮은 금리가 적용되며 지연배상금률은 동일합니다."
    },
    {
      id: 2,
      category: '신청 자격',
      question: "신용점수가 낮으면 무조건 대출을 받을 수 있나요?",
      answer: "아닙니다. 신용점수 기준 충족은 신청 가능 여부를 판단하는 하나의 요건일 뿐이며, 상환능력과 사업 지속 가능성 등을 함께 살펴 종합적으로 심사합니다."
    },
    {
      id: 3,
      category: '신청 자격',
      question: "담보나 보증인이 필요한가요?",
      answer: "담보나 보증인 없이 신청할 수 있습니다. 신용도와 상환 의지를 바탕으로 여신심사를 진행해 지원 여부를 결정합니다."
    },
    {
      id: 4,
      category: '신청 자격',
      question: "기존에 다른 대출이 있으면 신청이 불가능한가요?",
      answer: "기존 대출이 있다는 사실만으로 신청이 제한되지는 않습니다. 소득, 상환능력, 기존 채무 현황 등을 종합적으로 심사해 판단합니다."
    },
    {
      id: 5,
      category: '신청 절차·서류',
      question: "대리인 신청이 가능한가요?",
      answer: "대출상담 신청 및 약정체결 등의 모든 절차는 반드시 본인이 진행해야 합니다."
    },
    {
      id: 6,
      category: '신청 자격',
      question: "나의 신용평점은 어디에서 확인할 수 있나요?",
      answer: "NICE지키미 또는 KCB 올크레딧에서 무료로 본인의 신용평점을 조회할 수 있습니다."
    },
    {
      id: 7,
      category: '신청 절차·서류',
      question: "상담부터 대출금 지급까지 얼마나 걸리나요?",
      answer: "방문 상담, 서류 제출, 현장 확인, 여신심사 순서로 진행되며 통상 7영업일 이내입니다. 서류 보완이나 심사 일정에 따라 달라질 수 있습니다."
    },
    {
      id: 8,
      category: '신청 절차·서류',
      question: "지점 방문 전에 예약해야 하나요?",
      answer: "필수는 아니지만, 방문 전 대표번호(053-252-6408)로 미리 연락하시면 대기 시간을 줄이고 원활하게 상담받으실 수 있습니다. 사무소는 대구광역시 남구 중앙대로 146, 하나은행 봉덕지점 4층에 있습니다."
    },
    {
      id: 9,
      category: '신청 절차·서류',
      question: "상담비나 수수료가 있나요?",
      answer: "상담은 무료이며, 어떠한 명목의 상담수수료나 취급수수료도 요구하지 않습니다. 중개 수수료나 보증 선납금을 요구하는 연락을 받으시면 응하지 마시고 즉시 대표번호로 신고해 주시기 바랍니다."
    },
    {
      id: 10,
      category: '신청 절차·서류',
      question: "신청 시 필요한 서류는 무엇인가요?",
      answer: "신청하는 상품과 신청인의 상황(사업자등록 여부, 소득 증빙 방식 등)에 따라 필요한 서류가 다릅니다. 상담 시 개별 안내해 드립니다."
    },
    {
      id: 11,
      category: '상환·금리',
      question: "거치기간과 상환기간은 무엇이 다른가요?",
      answer: "거치기간은 원금 상환 없이 이자만 납부하는 기간이고, 상환기간은 원금과 이자를 함께 갚아나가는 기간입니다."
    },
    {
      id: 12,
      category: '상환·금리',
      question: "대출금은 어떤 방식으로 상환하나요?",
      answer: "상품별 조건에 따라 매월 원리금 균등분할 방식으로 상환합니다."
    },
    {
      id: 13,
      category: '상환·금리',
      question: "중도상환수수료가 있나요?",
      answer: "중도상환수수료는 없습니다. 대출 기간 중 언제든 일부 또는 전액을 미리 갚으실 수 있으며, 중도상환 시 남은 원금이 줄어드는 만큼 매월 이자도 함께 줄어듭니다."
    },
    {
      id: 14,
      category: '상환·금리',
      question: "대출 가능 횟수에 제한이 있나요?",
      answer: "횟수 자체에 제한은 없습니다. 상품별 한도금액 범위 내에서 신청 자격을 다시 충족하면 재신청하실 수 있으며, 최종 지원 여부는 심사 결과에 따라 결정됩니다."
    },
    {
      id: 15,
      category: '상품별 특별 조건',
      question: "운영자금 지원이 제한되는 업종이 있나요?",
      answer: "중소벤처기업부가 정한 소상공인 정책자금 융자제외 업종 기준을 적용합니다. 도박·사행성 기구 제조·판매업, 유흥주점업, 무도장 운영업, 성인 관련 업종, 금융·보험업, 일부 부동산업 등이 해당하며, 최종 판단은 표준산업분류코드(KSIC)와 실제 영위 업종을 기준으로 합니다. 업종명이 같더라도 분류코드와 실제 영업 형태에 따라 지원 가능 여부가 달라질 수 있어, 정확한 확인은 상담을 통해 안내해 드립니다."
    },
    {
      id: 16,
      category: '상품별 특별 조건',
      question: "신청일 현재 2개 이상 사업장을 운영 중인데, 사업장별로 각각 대출이 가능한가요?",
      answer: "아닙니다. 신청일 현재 2개 이상의 자영업을 운영하고 있는 경우, 1개의 사업장에 대해서만 대출할 수 있습니다."
    },
    {
      id: 17,
      category: '상품별 특별 조건',
      question: "사회적경제기업이나 법인도 지원을 받을 수 있나요?",
      answer: "일반 미소금융은 개인을 대상으로 하지만, 사회적연대금융은 지원요건을 충족하는 사회적경제기업과 법인 등이 신청할 수 있습니다."
    },
    {
      id: 18,
      category: '상품별 특별 조건',
      question: "사회적연대금융은 어떤 기업이 신청할 수 있나요?",
      answer: "사회적기업, 예비사회적기업, 협동조합, 사회적협동조합 등 관계 법령이 정한 사회적경제기업이 대상입니다."
    },
    {
      id: 19,
      category: '상품별 특별 조건',
      question: "사회적연대금융은 일반 미소금융과 무엇이 다른가요?",
      answer: "일반 미소금융은 개인의 경제적 자립을 지원하는 상품이고, 사회적연대금융은 사회적경제기업의 지속가능한 경영과 일자리 창출을 지원하는 상품입니다. 지원대상과 심사기준이 서로 다르게 적용됩니다."
    },
    {
      id: 20,
      category: '상품별 특별 조건',
      question: "공동대표도 신청할 수 있나요?",
      answer: "공동대표라는 사실만으로 지원 여부가 결정되지는 않으며, 신청 상품과 기업 형태 등을 종합적으로 심사해 판단합니다."
    },
    {
      id: 21,
      category: '신청 자격',
      question: "외국인도 신청할 수 있나요?",
      answer: "미소금융 지원대상은 대한민국 국민을 원칙으로 하며, 외국인은 지원 대상에서 제외됩니다."
    }
  ];

  const FAQ_CATEGORIES = ['전체', '신청 자격', '신청 절차·서류', '상환·금리', '상품별 특별 조건'];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = faqCategory === '전체' || faq.category === faqCategory;
    const query = faqQuery.trim();
    const matchesQuery = !query || faq.question.includes(query) || faq.answer.includes(query);
    return matchesCategory && matchesQuery;
  });

  // 대출계산기 상태 변수
  const [loanAmount, setLoanAmount] = useState<number>(10000000); // 디폴트 1000만 원
  const [interestRate, setInterestRate] = useState<number>(4.5); // 디폴트 4.5%
  const [gracePeriod, setGracePeriod] = useState<number>(6); // 디폴트 거치 6개월
  const [repaymentPeriod, setRepaymentPeriod] = useState<number>(60); // 디폴트 상환 60개월 (5년)

  // 거치기간 중 적용금리는 상품별로 상이함 (사업자 운영자금 2.0% / 금융취약계층 생계자금 3.0% / 청년미래이음 4.5% / 사회연대금융 4.0%)
  const GRACE_RATE_OPTIONS = [
    { id: 'business', label: '사업자 운영자금', rate: 2.0 },
    { id: 'vulnerable', label: '금융취약계층 생계자금', rate: 3.0 },
    { id: 'youth', label: '청년미래이음', rate: 4.5 },
    { id: 'social', label: '사회연대금융', rate: 4.0 },
  ] as const;
  const [graceRateType, setGraceRateType] = useState<typeof GRACE_RATE_OPTIONS[number]['id']>('business');
  const gracePeriodRate = GRACE_RATE_OPTIONS.find((o) => o.id === graceRateType)!.rate;

  // 상품별 실제 한도·금리·거치·상환기간 범위 — 계산기가 상품 규정과 무관한 조합을 허용하지 않도록 제한
  const PRODUCT_CALC_LIMITS = {
    business: { label: '사업자 운영자금', maxLoan: 30000000, minRate: 2.0, maxRate: 4.5, maxGrace: 24, maxRepay: 60 },
    vulnerable: { label: '금융취약계층 생계자금', maxLoan: 5000000, minRate: 3.5, maxRate: 4.5, maxGrace: 12, maxRepay: 60 },
    youth: { label: '청년미래이음', maxLoan: 5000000, minRate: 3.5, maxRate: 4.5, maxGrace: 72, maxRepay: 60 },
    social: { label: '사회연대금융', maxLoan: 100000000, minRate: 4.0, maxRate: 4.5, maxGrace: 24, maxRepay: 48 },
  } as const;
  type ProductCalcId = keyof typeof PRODUCT_CALC_LIMITS;
  const [selectedProduct, setSelectedProduct] = useState<ProductCalcId>('business');
  const productLimits = PRODUCT_CALC_LIMITS[selectedProduct];
  const applyProductLimits = (id: ProductCalcId) => {
    const cfg = PRODUCT_CALC_LIMITS[id];
    setSelectedProduct(id);
    setGraceRateType(id);
    setLoanAmount((prev) => Math.min(prev, cfg.maxLoan));
    setInterestRate((prev) => Math.min(Math.max(prev, cfg.minRate), cfg.maxRate));
    setGracePeriod((prev) => Math.min(prev, cfg.maxGrace));
    setRepaymentPeriod((prev) => Math.min(prev, cfg.maxRepay));
  };

  // 대출 계산 결과 저장
  const [calcResult, setCalcResult] = useState({
    gracePeriodMonthlyInterest: 0,
    repaymentMonthlyPrincipal: 0,
    repaymentMonthlyInterest: 0,
    repaymentTotalMonthly: 0,
    totalInterest: 0,
    totalPayment: 0
  });

  // 대출 계산 로직 구현 (매월 원리금 균등분할 상환 방식 — 상품 안내와 동일한 산출 방식)
  useEffect(() => {
    // 거치 기간 월 이자 계산 (원금 * 상품별 거치기간 적용금리 / 12, 거치기간 동안은 이자만 납부)
    const graceInterest = Math.round((loanAmount * (gracePeriodRate / 100)) / 12);

    // 월 이자율 (상환기간 적용금리 기준)
    const monthlyRate = interestRate / 100 / 12;

    // 원리금균등분할상환: 매월 납부액(A) = 원금 * r / (1 - (1+r)^-N)
    const monthlyPayment = monthlyRate === 0
      ? Math.round(loanAmount / repaymentPeriod)
      : Math.round((loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -repaymentPeriod)));

    // 상환 첫 달 이자·원금 (원리금균등 방식은 이 두 값의 합이 매월 동일하게 유지됨)
    const firstMonthInterest = Math.round(loanAmount * monthlyRate);
    const firstMonthPrincipal = monthlyPayment - firstMonthInterest;

    // 총 이자액 = (거치기간 동안 이자 총액) + (상환기간 총 납부액 - 원금)
    const repaymentTotalInterest = (monthlyPayment * repaymentPeriod) - loanAmount;
    const totalInt = Math.round((graceInterest * gracePeriod) + repaymentTotalInterest);

    setCalcResult({
      gracePeriodMonthlyInterest: graceInterest,
      repaymentMonthlyPrincipal: firstMonthPrincipal,
      repaymentMonthlyInterest: firstMonthInterest,
      repaymentTotalMonthly: monthlyPayment,
      totalInterest: totalInt,
      totalPayment: loanAmount + totalInt
    });
  }, [loanAmount, interestRate, gracePeriod, repaymentPeriod, gracePeriodRate]);

  const processSteps = [
    {
      step: '01',
      icon: '📞',
      label: '이용 상담',
      title: '전화 상담 · 방문 예약',
      desc: '053-252-6408로 전화하여 방문 일정을 잡습니다.'
    },
    {
      step: '02',
      icon: '📋',
      label: '서류 준비',
      title: '서류 지참 · 1차 면담',
      desc: '필수 서류를 챙겨 하나은행 봉덕지점 4층에 내방합니다.'
    },
    {
      step: '03',
      icon: '🔍',
      label: '현장 심사',
      title: '현장 실사 · 적격 검토',
      desc: '전문심사위원이 사업장을 직접 방문해 매출·운영을 확인합니다.'
    },
    {
      step: '04',
      icon: '⚖️',
      label: '승인 결정',
      title: '융자위원회 심의',
      desc: '내부 규정에 따라 승인 여부를 결정합니다.'
    },
    {
      step: '05',
      icon: '💳',
      label: '자금 수령',
      title: '자금 지급 · 사후 관리',
      desc: '승인 시 지정 계좌로 신속 지급, 경영 컨설팅도 제공합니다.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* 신청안내 카테고리 개요 (개요 화면에서만 노출, 4개 카드 1바퀴 자동 순환 강조) */}
        {!sectionId && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {GUIDE_CATEGORIES.map((cat, i) => (
              <motion.button
                key={cat.id}
                type="button"
                onClick={() => { userInteractedRef.current = true; setSpotlightIdx(-1); navigate(cat.path); }}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                animate={spotlightIdx === i ? { y: -4, scale: 1.02 } : { y: 0, scale: 1 }}
                className={`relative text-left rounded-2xl p-5 border transition-colors bg-white ${
                  spotlightIdx === i
                    ? 'border-2 border-teal-400 shadow-lg shadow-teal-100'
                    : 'border-slate-200 hover:border-teal-200 hover:shadow-md'
                }`}
              >
                <cat.icon className="w-6 h-6 text-teal-600" />
                <h4 className="font-extrabold text-slate-900 text-sm mt-3">{cat.label}</h4>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed break-keep">{cat.desc}</p>
                <ChevronRight className="w-4 h-4 text-slate-300 absolute top-5 right-5" />
              </motion.button>
            ))}
          </div>
        )}

        {/* 개요 화면에서는 1번 카테고리(미소금융이란) 내용을 최상단에 바로 노출 */}
        {!sectionId && <MisoIntroSection />}

        {/* 대출 지원대상 및 제외대상 */}
        {show('loan-target') && <div id="loan-target" className="space-y-8">

          <div className="text-center space-y-3">
            <span className="text-teal-600 font-bold text-sm tracking-widest uppercase">Before You Apply</span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">신청 전 확인사항</h3>
            <p className="text-slate-500 text-sm break-keep">개인 또는 개인사업자는 상담을 신청하기 전에 아래 기준을 먼저 확인해 주세요.</p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 text-sm text-amber-800 font-semibold text-center break-keep">
            아래 기준에 해당하더라도 대출이 자동으로 승인되는 것은 아닙니다. 지원 여부와 한도는 상담과 심사를 거쳐 결정됩니다.
          </div>

          {/* 지원대상 3가지 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -4 }}
              className="bg-teal-50 border border-teal-200 rounded-2xl p-6 space-y-3 hover:shadow-md transition-shadow"
            >
              <div className="w-9 h-9 bg-teal-600 text-white rounded-xl flex items-center justify-center font-black text-sm">1</div>
              <h4 className="font-extrabold text-teal-800 text-base">신용평점 기준 확인</h4>
              <p className="text-slate-600 text-sm leading-relaxed break-keep">
                개인신용평점이 서민금융 지원 기준에 해당하는지 확인합니다. 기준 점수는 매년 변경될 수 있습니다.<br />
                <span className="font-bold text-teal-700">KCB 700점 이하 · NICE 749점 이하</span>
              </p>
              <p className="text-xs text-slate-500 font-medium">※ 표시된 신용평점은 기본 확인 기준이며, 실제 대출 여부를 의미하지 않습니다. 내 신용점수를 먼저 확인해 보세요 👇</p>
              <div className="flex flex-wrap gap-2 pt-1">
                <motion.a
                  href="https://www.niceinfo.co.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ boxShadow: ['0 0 0px #0d9488', '0 0 8px #0d9488', '0 0 0px #0d9488'] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="flex items-center gap-1.5 text-xs font-black text-white bg-teal-600 px-4 py-2 rounded-xl shadow-sm cursor-pointer"
                >
                  <span>🔍</span>
                  <span>NICE 신용점수 확인</span>
                </motion.a>
                <motion.a
                  href="https://www.allcredit.co.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ boxShadow: ['0 0 0px #6366f1', '0 0 8px #6366f1', '0 0 0px #6366f1'] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: 0.9 }}
                  className="flex items-center gap-1.5 text-xs font-black text-white bg-indigo-600 px-4 py-2 rounded-xl shadow-sm cursor-pointer"
                >
                  <span>🔍</span>
                  <span>KCB 신용점수 확인</span>
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-teal-50 border border-teal-200 rounded-2xl p-6 space-y-3 hover:shadow-md transition-shadow"
            >
              <div className="w-9 h-9 bg-teal-600 text-white rounded-xl flex items-center justify-center font-black text-sm">2</div>
              <h4 className="font-extrabold text-teal-800 text-base">취약계층 기준 확인</h4>
              <p className="text-slate-600 text-sm leading-relaxed break-keep">
                기초생활수급자, 차상위계층 등 서민금융 지원 기준에서 정한 취약계층에 해당하는지 확인합니다.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              whileHover={{ y: -4 }}
              className="bg-teal-50 border border-teal-200 rounded-2xl p-6 space-y-3 hover:shadow-md transition-shadow"
            >
              <div className="w-9 h-9 bg-teal-600 text-white rounded-xl flex items-center justify-center font-black text-sm">3</div>
              <h4 className="font-extrabold text-teal-800 text-base">근로장려금 신청자격 기준 확인</h4>
              <p className="text-slate-600 text-sm leading-relaxed break-keep">
                근로장려금 신청자격 요건에 해당하는지 국세청 안내를 통해 확인합니다.
              </p>
              <p className="text-[10px] text-slate-400 font-medium">자격 해당 여부를 지금 바로 확인하세요 👇</p>
              <motion.a
                href="https://hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index_pp.xml&tmIdx=45&tm2lIdx=4501000000&tm3lIdx=4501010000"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                animate={{ boxShadow: ['0 0 0px #16a34a', '0 0 8px #16a34a', '0 0 0px #16a34a'] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="inline-flex items-center gap-1.5 text-xs font-black text-white bg-green-600 px-4 py-2 rounded-xl shadow-sm cursor-pointer"
              >
                <span>🏛️</span>
                <span>국세청 홈택스 근로·자녀장려금 안내</span>
              </motion.a>
            </motion.div>
          </div>

          {/* 대출 제외대상 */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-slate-500 flex-shrink-0" />
              <h4 className="font-extrabold text-slate-700 text-base">지원 제한대상</h4>
            </div>
            <p className="text-slate-500 text-xs font-semibold">다음의 경우에는 미소금융 대출 지원이 제한됩니다.</p>
            <ul className="space-y-2.5">
              {[
                '한국신용정보원 신용 정보 전산망에 신용도 판단정보 및 공공정보가 등재되어 있는 자',
                '채무이행을 회피하기 위해 책임재산의 도피, 은닉, 감소 행위를 초래한 경력이 있는 자',
                '대출 신청인 재산에 가등기, (가)압류, 가처분, 경매 진행 등 법적 절차가 진행 중인 것으로 확인되는 자',
                '재외국인, 외국인, 해외체류자',
                '사회통념상 저소득, 저신용층으로 보기 어렵거나 미소금융 대출 취지에 부합하지 아니하다고 판단되는 자',
                '중소벤처기업부가 공고하는 \'소상공인정책자금 융자 제외 대상 업종\'을 창업 예정이거나 운영 중인 경우'
              ].map((item, i) => (
                <li key={i} className="flex items-start space-x-2 text-xs text-slate-600">
                  <span className="text-slate-400 font-bold mt-0.5 flex-shrink-0">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>}

        {/* 이용 절차 타임라인 가이드 */}
        {show('process-guide') && <><div id="process-guide" className="space-y-12">
          
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="relative bg-gradient-to-r from-miso-blue-700 to-miso-navy-700 rounded-3xl px-8 py-7 text-white overflow-hidden"
          >
            <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center gap-4">
                <motion.span
                  animate={{ rotate: [0, -8, 8, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                  className="text-4xl"
                >
                  🗺️
                </motion.span>
                <div>
                  <span className="text-[10px] font-black text-miso-blue-200 tracking-widest uppercase">Step-by-Step Guide</span>
                  <h3 className="text-xl md:text-2xl font-black tracking-tight leading-tight mt-0.5">
                    대출 진행 절차 안내
                  </h3>
                  <p className="text-miso-blue-100 text-xs font-semibold mt-1">
                    서민금융진흥원 심의 규칙에 맞춘 5단계 핵심 과정입니다.
                  </p>
                </div>
              </div>
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="md:ml-auto flex items-center gap-2 bg-white/15 border border-white/20 rounded-xl px-4 py-2 text-xs font-black whitespace-nowrap"
              >
                <span>📞</span>
                <span>전화 상담 먼저 · 053-252-6408</span>
              </motion.div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-8 text-left">
            {processSteps.map((p, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative group hover:border-miso-blue-200 hover:shadow-lg transition duration-300 flex flex-col"
              >
                {/* 단계 번호 + 아이콘 */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-xl bg-miso-blue-50 text-miso-blue-700 font-black text-xs flex items-center justify-center shadow-inner">
                    {p.step}
                  </div>
                  <span className="text-2xl">{p.icon}</span>
                </div>
                {/* 카테고리 라벨 */}
                <span className="inline-block text-[10px] font-black text-miso-blue-600 bg-miso-blue-50 px-2 py-0.5 rounded-full mb-2 w-fit tracking-wide">
                  {p.label}
                </span>
                <h4 className="font-extrabold text-slate-800 text-sm tracking-tight group-hover:text-miso-blue-600 transition-colors leading-snug break-keep">
                  {p.title}
                </h4>
                <p className="text-slate-500 text-xs mt-2 leading-relaxed font-semibold flex-1 break-keep">
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* 잇다(서민금융진흥원) 온라인 신청 안내 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl px-8 py-7 text-white"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-5">
              <div className="flex items-center gap-4">
                <span className="text-4xl">💻</span>
                <div>
                  <span className="text-[10px] font-black text-slate-300 tracking-widest uppercase">Online Application</span>
                  <h4 className="text-lg md:text-xl font-black tracking-tight leading-tight mt-0.5 break-keep">
                    온라인으로도 신청할 수 있어요
                  </h4>
                  <p className="text-slate-300 text-xs font-semibold mt-1 leading-relaxed break-keep">
                    서민금융진흥원 '잇다' 플랫폼을 통해 방문 없이 온라인으로 상담을 신청하실 수 있습니다.<br />
                    다만 최종 승인 여부는 방문 상담 및 여신심사 결과에 따라 결정됩니다.
                  </p>
                </div>
              </div>
              <div className="md:ml-auto flex flex-wrap gap-2 shrink-0">
                <motion.a
                  href="https://loan.kinfa.or.kr/main.ke"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 text-xs font-black text-slate-900 bg-white px-4 py-2.5 rounded-xl shadow-sm cursor-pointer whitespace-nowrap"
                >
                  <span>🖥️</span>
                  <span>PC로 신청하기</span>
                </motion.a>
                <motion.a
                  href="https://play.google.com/store/apps/details?id=kr.or.knfa.nfcs.m&hl=ko"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 text-xs font-black text-white bg-white/15 border border-white/20 px-4 py-2.5 rounded-xl shadow-sm cursor-pointer whitespace-nowrap"
                >
                  <span>📱</span>
                  <span>모바일 앱 설치</span>
                </motion.a>
              </div>
            </div>
          </motion.div>

        </div>

        {/* 대출 서류 가이드 보완 팝카드 */}
        <div className="bg-gradient-to-tr from-teal-50 to-slate-50 p-8 rounded-3xl border border-teal-100 text-left space-y-6">
          {/* 준비서류 섹션 헤더 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="relative bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl px-6 py-5 text-white overflow-hidden"
          >
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-3">
              <div className="flex items-center gap-3">
                <motion.span
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1.5 }}
                  className="text-3xl"
                >
                  📂
                </motion.span>
                <div>
                  <span className="text-[10px] font-black text-teal-100 tracking-widest uppercase">Required Documents</span>
                  <h3 className="text-lg md:text-xl font-black tracking-tight leading-tight mt-0.5">
                    준비 서류 안내
                  </h3>
                  <p className="text-teal-100 text-xs font-semibold mt-0.5">
                    두 번 발걸음 안 하시게, 아래 서류를 미리 챙겨주세요.
                  </p>
                </div>
              </div>
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, delay: 0.8 }}
                className="md:ml-auto flex items-center gap-2 bg-white/15 border border-white/20 rounded-xl px-4 py-2 text-xs font-black whitespace-nowrap"
              >
                <span>✅</span>
                <span>기본서류 준비 시 첫 상담이 더 빨라집니다</span>
              </motion.div>
            </div>
          </motion.div>
          <div className="space-y-2">
            <p className="text-slate-500 text-sm leading-relaxed break-keep">
              아래 기본서류를 준비하시면 첫 상담에서 <strong className="text-teal-700">신청 자격과 예상 한도</strong>를 더 빠르게 확인하실 수 있습니다.
            </p>
          </div>

          {/* 민원 예방 안내 — 서류 구비와 대출 승인은 별개이며, 서류 목록도 개인별로 달라질 수 있음을 함께 고지 */}
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <ul className="text-amber-800 text-xs md:text-sm font-semibold leading-relaxed break-keep space-y-1.5 list-disc pl-4">
              <li>서류 준비와 대출 승인은 별개이며, 지원 여부는 여신심사 결과로 결정됩니다.</li>
              <li>필요 서류는 <strong>상품·상황별로 다르며</strong>, 목록 외 서류를 요청드릴 수 있습니다.</li>
              <li>제출서류는 <strong>발급일로부터 1개월 이내</strong>여야 합니다.</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            {/* 신분 확인 */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -4 }}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-2"
            >
              <span className="font-extrabold text-slate-800 block text-base">📝 신분 확인</span>
              <ul className="space-y-1.5 text-slate-600 text-[13px]">
                <li className="flex items-start gap-2"><span className="text-teal-500 mt-0.5">✓</span><span>주민등록증 또는 운전면허증 <span className="text-rose-500 font-bold">(필수)</span></span></li>
                <li className="flex items-start gap-2"><span className="text-teal-500 mt-0.5">✓</span><span>주민등록 등본·초본 <span className="text-slate-400 text-[11px]">(주민센터 발급)</span></span></li>
              </ul>
            </motion.div>

            {/* 사업 서류 */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-2"
            >
              <span className="font-extrabold text-slate-800 block text-base">🏪 사업 관련 서류</span>
              <ul className="space-y-1.5 text-slate-600 text-[13px]">
                <li className="flex items-start gap-2"><span className="text-teal-500 mt-0.5">✓</span><span>사업자등록증</span></li>
                <li className="flex items-start gap-2"><span className="text-teal-500 mt-0.5">✓</span><span>임대차 계약서 <span className="text-slate-400 text-[11px]">(가게 계약서)</span></span></li>
                <li className="flex items-start gap-2"><span className="text-teal-500 mt-0.5">✓</span><span>주거래 통장 <span className="text-slate-400 text-[11px]">(최근 3개월 입출금내역)</span></span></li>
                <li className="flex items-start gap-2"><span className="text-teal-500 mt-0.5">✓</span><span>소득금액증명원 또는 부가세 과세표준증명원</span></li>
              </ul>
            </motion.div>

            {/* 해당자 추가 서류 */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              whileHover={{ y: -4 }}
              className="bg-white p-5 rounded-2xl border border-amber-100 shadow-sm hover:shadow-md transition-shadow space-y-2"
            >
              <span className="font-extrabold text-slate-800 block text-base">📋 해당되시는 분만</span>
              <ul className="space-y-1.5 text-slate-600 text-[13px]">
                <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">✓</span><span>근로장려금 수급사실 증명서</span></li>
                <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">✓</span><span>국민기초생활수급자 증명서</span></li>
                <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">✓</span><span>차상위계층 확인서</span></li>
                <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">✓</span><span>기타 자격요건 확인 서류</span></li>
              </ul>
            </motion.div>
          </div>

          {/* 상품별 통합 안내서 */}
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-black text-teal-600 tracking-widest uppercase">Product Document Checklist</span>
              <h4 className="text-base md:text-lg font-black text-slate-900 tracking-tight mt-0.5">상품별 통합 안내서 (참고용)</h4>
              <p className="text-slate-500 text-xs md:text-sm mt-1 leading-relaxed break-keep">
                상품별 예상 서류를 PDF로 미리 확인하실 수 있습니다. 실제 제출서류는 상담 후 개별 안내해 드립니다.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {[
                { label: '사업자 운영자금', file: '/docs/loan-docs-business.pdf', note: '온라인 교육 4과목 수료 안내 포함' },
                { label: '청년미래이음', file: '/docs/loan-docs-youth.pdf', note: '재무진단보고서 출력 안내 포함', extra: '취업 후 1년 이내 신청 시 재직증명서·급여통장 추가' },
                { label: '금융취약계층 생계자금', file: '/docs/loan-docs-vulnerable.pdf', note: '기초·차상위 수급자 증빙서류 안내 포함', extra: '자격유형 1·2번 직장인은 재직증명서·급여통장 추가' },
              ].map((doc) => (
                <a
                  key={doc.file}
                  href={doc.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-200 transition-all"
                >
                  <FileText className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <span className="font-extrabold text-slate-800 block break-keep">{doc.label}</span>
                    <span className="text-slate-400 text-[11px] block mt-0.5 break-keep">{doc.note}</span>
                    {doc.extra && (
                      <span className="text-amber-600 text-[11px] block mt-0.5 break-keep">※ {doc.extra}</span>
                    )}
                    <span className="text-teal-600 text-xs font-bold inline-block mt-2">PDF로 보기 · 인쇄하기 →</span>
                  </div>
                </a>
              ))}
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed break-keep">
              ※ 새 창에서 PDF가 열리며, 오른쪽 마우스 클릭(또는 브라우저 인쇄 기능)으로 저장·인쇄하실 수 있습니다.
            </p>
          </div>

          {/* 민원서류 발급 방법 안내 */}
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-black text-teal-600 tracking-widest uppercase">How to Get Documents</span>
              <h4 className="text-base md:text-lg font-black text-slate-900 tracking-tight mt-0.5">민원서류 발급 방법 안내</h4>
              <p className="text-slate-500 text-xs md:text-sm mt-1 leading-relaxed break-keep">
                주민등록등본·초본 등은 아래 두 가지 방법으로 발급받을 수 있습니다. 일부 서류는 다른 발급기관을 이용해야 할 수 있습니다.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {/* 주민센터 방문 발급 */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <span className="flex items-center gap-2 font-extrabold text-slate-800 text-base">
                  <MapPin className="w-5 h-5 text-teal-600 shrink-0" />
                  행정복지센터(주민센터) 방문 발급
                </span>
                <p className="text-slate-600 text-[13px] leading-relaxed break-keep">
                  신분증을 지참해 방문하시면 즉시 발급받을 수 있습니다.
                </p>
                <a
                  href="https://www.myhome.go.kr/hws/portal/cont/selectAdministrativeWelfareCenter.do"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  가까운 행정복지센터 찾기
                </a>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href="https://map.naver.com/p/search/행정복지센터"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-teal-50 hover:bg-teal-100 text-teal-700 text-xs font-bold px-3 py-2 rounded-lg transition-colors"
                  >
                    네이버지도
                  </a>
                  <a
                    href="https://map.kakao.com/?q=행정복지센터"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-teal-50 hover:bg-teal-100 text-teal-700 text-xs font-bold px-3 py-2 rounded-lg transition-colors"
                  >
                    카카오맵
                  </a>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed break-keep">
                  ※ 지도는 위치 기준 검색이라 실제 관할과 다를 수 있어, 관할 확인이 필요하면 위 마이홈포털을 이용해 주세요.
                </p>
              </div>

              {/* 정부24 온라인 발급 */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <span className="flex items-center gap-2 font-extrabold text-slate-800 text-base">
                  <Monitor className="w-5 h-5 text-teal-600 shrink-0" />
                  정부24 온라인 발급
                </span>
                <p className="text-slate-600 text-[13px] leading-relaxed break-keep">
                  정부24 홈페이지·앱에서 본인인증 후 회원·비회원 상관없이 발급받을 수 있습니다.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href="https://plus.gov.kr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-teal-50 hover:bg-teal-100 text-teal-700 text-xs font-bold px-3 py-2 rounded-lg transition-colors"
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    PC · 인터넷으로 발급
                  </a>
                  <a
                    href="https://play.google.com/store/search?q=%EC%A0%95%EB%B6%8024&c=apps"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-teal-50 hover:bg-teal-100 text-teal-700 text-xs font-bold px-3 py-2 rounded-lg transition-colors"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    모바일 앱 (안드로이드)
                  </a>
                  <a
                    href="https://apps.apple.com/kr/search?term=%EC%A0%95%EB%B6%8024"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-teal-50 hover:bg-teal-100 text-teal-700 text-xs font-bold px-3 py-2 rounded-lg transition-colors"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    모바일 앱 (iOS)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div></>}

        {/* 아코디언 스타일 FAQ 섹션 */}
        {show('faq-section') && <div id="faq-section" className="space-y-10 pt-8 border-t border-slate-100">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-black text-miso-blue-600 tracking-widest uppercase">Frequently Asked Questions</span>
            <h3 className="text-[1.7rem] md:text-[2rem] font-black text-slate-900 tracking-tight">
              자주 묻는 서민금융 질문 (FAQ)
            </h3>
            <p className="text-slate-500 text-sm font-semibold max-w-2xl mx-auto leading-relaxed break-keep">
              상담 예약 전, 많은 분들께서 궁금해하시는 핵심 질문들을 모았습니다. <br className="hidden sm:inline" />
              추가 정보가 필요하시면 대표전화로 편하게 상담받으실 수 있습니다.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {/* 검색창 */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={faqQuery}
                onChange={(e) => {
                  setFaqQuery(e.target.value);
                  setFaqCategory('전체');
                  setOpenFaqId(null);
                }}
                placeholder="궁금한 내용을 검색해 보세요 (예: 서류, 상환, 자격)"
                aria-label="자주 묻는 질문 검색"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-miso-blue-500/30 focus:border-miso-blue-400"
              />
            </div>

            {/* 카테고리 필터 칩 */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {FAQ_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={faqCategory === cat}
                  onClick={() => { setFaqCategory(cat); setOpenFaqId(null); }}
                  className={`shrink-0 text-xs font-bold px-3.5 py-1.5 rounded-full border transition-colors whitespace-nowrap ${
                    faqCategory === cat
                      ? 'bg-miso-blue-600 border-miso-blue-600 text-white'
                      : 'bg-white border-slate-200 text-slate-500 hover:border-miso-blue-300 hover:text-miso-blue-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <p className="text-xs font-semibold text-slate-400" aria-live="polite">
              {filteredFaqs.length}개의 질문이 있습니다.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4 text-left">
            {filteredFaqs.length === 0 && (
              <div className="text-center py-10 space-y-2">
                <p className="text-slate-500 text-sm font-semibold break-keep">검색 결과가 없습니다. 대표번호로 편하게 문의해 주세요.</p>
                <a href="tel:053-252-6408" className="inline-block text-miso-blue-600 font-bold text-sm underline underline-offset-2">
                  053-252-6408
                </a>
              </div>
            )}
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqId === faq.id;
              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.06 }}
                  className={`bg-white rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? 'border-miso-blue-500 shadow-md ring-1 ring-miso-blue-500/20'
                      : 'border-slate-200/90 hover:border-slate-400 hover:shadow-sm'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-miso-blue-500/20 rounded-2xl"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-center gap-3 pr-4">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs shrink-0 transition-colors ${
                        isOpen ? 'bg-miso-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        Q
                      </span>
                      <span className="font-extrabold text-slate-800 text-base md:text-lg leading-snug break-keep">
                        {faq.question}
                      </span>
                    </span>
                    <ChevronDown 
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'transform rotate-180 text-miso-blue-600' : ''
                      }`}
                    />
                  </button>

                  <div 
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-[500px] opacity-100 border-t border-slate-100' : 'max-h-0 opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="p-6 bg-slate-50/70 text-slate-600 space-y-2 rounded-b-2xl">
                      <p className="text-sm md:text-base leading-relaxed break-keep font-semibold">
                        {faq.id === 6 ? (
                          <>
                            <a href="https://www.credit.co.kr" target="_blank" rel="noopener noreferrer" className="text-miso-blue-600 font-bold underline underline-offset-2 hover:text-miso-blue-700">
                              NICE지키미
                            </a>
                            {' 또는 '}
                            <a href="https://www.allcredit.co.kr" target="_blank" rel="noopener noreferrer" className="text-miso-blue-600 font-bold underline underline-offset-2 hover:text-miso-blue-700">
                              KCB 올크레딧
                            </a>
                            에서 무료로 본인의 신용평점을 조회할 수 있습니다.
                          </>
                        ) : (
                          faq.answer
                        )}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* 추가 개별 문의 퀵 링크 배너 */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-miso-blue-50 text-miso-blue-600 rounded-full flex items-center justify-center">
                <HelpCircle className="w-5.5 h-5.5" />
              </div>
              <div className="text-left">
                <h4 className="font-extrabold text-slate-900 text-sm">원하시는 답변을 찾지 못하셨나요?</h4>
                <p className="text-slate-500 text-xs font-semibold">전화 상담을 통해 궁금하신 점을 자세히 안내해 드리겠습니다.</p>
              </div>
            </div>
            <a 
              href="tel:053-252-6408"
              className="bg-slate-900 hover:bg-slate-800 text-white font-black text-xs px-5 py-3 rounded-xl transition shadow"
            >
              ☎ 즉시 대표 전화 걸기 (053-252-6408)
            </a>
          </div>

        </div>}

        {/* 대출 계산기 */}
        {show(['loan-calc-intro', 'loan-calc']) && <>
        <div id="loan-calc-intro" className="text-center space-y-4 max-w-4xl mx-auto">
          <span className="text-xs font-black text-miso-blue-600 tracking-widest uppercase">Loan Calculator</span>
          <h2 className="text-3xl md:text-[2.6rem] font-black text-slate-900 tracking-tight leading-none">
            대출 상환액 계산기
          </h2>
          <div className="h-1.5 w-16 bg-miso-blue-600 rounded-full mx-auto" />
          <p className="text-slate-600 font-medium text-base md:text-lg max-w-2xl mx-auto leading-relaxed break-keep">
            월 상환 예정액을 미리 확인하실 수 있습니다.
          </p>
        </div>

        {/* 세련된 스마트 대출 이자 계산기 */}
        <div id="loan-calc" className="bg-white border border-slate-200/90 rounded-3xl shadow-xl overflow-hidden text-left">
          
          <div className="bg-gradient-to-r from-miso-blue-700 to-miso-navy-700 p-8 text-white space-y-4">
            <div>
              <span className="text-[10px] font-bold text-miso-blue-100 bg-white/20 px-2.5 py-1 rounded-md uppercase">Repayment Simulation</span>
              <h3 className="text-xl md:text-2xl font-black tracking-tight leading-none whitespace-nowrap mt-2">상환 금액 계산기</h3>
              <p className="text-miso-blue-100 text-xs font-semibold mt-2">먼저 신청 상품을 선택하면 해당 상품의 한도·금리 범위 안에서만 계산됩니다.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(Object.entries(PRODUCT_CALC_LIMITS) as [ProductCalcId, typeof PRODUCT_CALC_LIMITS[ProductCalcId]][]).map(([id, cfg]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => applyProductLimits(id)}
                  aria-pressed={selectedProduct === id}
                  className={`text-xs font-bold px-3 py-2 rounded-lg transition-all ${
                    selectedProduct === id ? 'bg-white text-miso-blue-700 shadow' : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  {cfg.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* 좌측 슬라이더 컨트롤러 영역 */}
            <div className="lg:col-span-7 p-8 md:p-10 space-y-8 divide-y divide-slate-100">
              
              {/* 대출 원금 */}
              <div className="space-y-4 pb-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm font-extrabold text-slate-800 gap-1">
                  <label htmlFor="loan-amount" className="flex items-center gap-1">💰 대출 요청 원금 설정</label>
                  <output htmlFor="loan-amount" className="text-miso-blue-600 font-black text-lg whitespace-nowrap">{(loanAmount / 10000).toLocaleString()}만 원</output>
                </div>
                <p className="text-[11px] text-slate-400 font-semibold">{productLimits.label} 기준 최대 {(productLimits.maxLoan / 10000).toLocaleString()}만 원까지 신청 가능합니다.</p>
                <input
                  id="loan-amount"
                  type="range"
                  min="1000000"
                  max={productLimits.maxLoan}
                  step="500000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  aria-valuetext={`${loanAmount.toLocaleString('ko-KR')}원`}
                  className="w-full accent-miso-blue-600 cursor-pointer h-2 bg-slate-100 rounded-lg appearance-none"
                />
                <div className="relative h-9 mt-1">
                  {[
                    { val: 1000000,   label: '100만',   mobileHide: true  },
                    { val: 5000000,   label: '500만',   mobileHide: false },
                    { val: 10000000,  label: '1,000만', mobileHide: false },
                    { val: 20000000,  label: '2,000만', mobileHide: true  },
                    { val: 30000000,  label: '3,000만', mobileHide: false },
                    { val: 50000000,  label: '5,000만', mobileHide: false },
                    { val: 100000000, label: '1억',     mobileHide: false },
                  ].filter(({ val }) => val <= productLimits.maxLoan).map(({ val, label, mobileHide }, i, arr) => {
                    const pct = ((val - 1000000) / (productLimits.maxLoan - 1000000)) * 100;
                    const isFirst = i === 0;
                    const isLast = i === arr.length - 1;
                    const top = i % 2 === 0 ? '0px' : '16px';
                    const transform = isFirst ? 'translateX(0)' : isLast ? 'translateX(-100%)' : 'translateX(-50%)';
                    return (
                      <span
                        key={val}
                        className={`absolute text-[11px] text-slate-400 font-extrabold cursor-pointer hover:text-miso-blue-600 transition whitespace-nowrap ${mobileHide ? 'hidden md:inline' : ''}`}
                        style={{ left: `${pct}%`, top, transform }}
                        onClick={() => setLoanAmount(val)}
                      >
                        {label}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* 실질 이자율 설정 (미소금융 정책이율 4.0 ~ 4.5%) */}
              <div className="space-y-4 pt-6 pb-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm font-extrabold text-slate-800 gap-1">
                  <label htmlFor="interest-rate" className="flex items-center gap-1">📈 연 이자율</label>
                  <output htmlFor="interest-rate" className="text-miso-blue-600 font-black text-lg whitespace-nowrap">{interestRate.toFixed(1)}%</output>
                </div>
                <input
                  id="interest-rate"
                  type="range"
                  min={productLimits.minRate}
                  max={productLimits.maxRate}
                  step="0.5"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  aria-valuetext={`연 ${interestRate.toFixed(1)}퍼센트`}
                  className="w-full accent-miso-blue-600 cursor-pointer h-2 bg-slate-100 rounded-lg appearance-none"
                />
                <div className="relative h-5 mt-1">
                  {[
                    { val: 2.0, label: '2.0%' },
                    { val: 3.5, label: '3.5%' },
                    { val: 4.5, label: '4.5%' },
                  ].filter(({ val }) => val >= productLimits.minRate && val <= productLimits.maxRate).map(({ val, label }) => {
                    const pct = productLimits.maxRate === productLimits.minRate
                      ? 0
                      : ((val - productLimits.minRate) / (productLimits.maxRate - productLimits.minRate)) * 100;
                    return (
                      <span
                        key={val}
                        className="absolute text-[11px] text-slate-400 font-semibold -translate-x-1/2"
                        style={{ left: `${pct}%` }}
                      >
                        {label}
                      </span>
                    );
                  })}
                </div>
                {/* 금리 안내 테이블 */}
                <div className="grid grid-cols-4 gap-1.5 mt-2">
                  <button
                    onClick={() => setInterestRate(2.0)}
                    disabled={productLimits.minRate > 2.0}
                    className="bg-green-50 border border-green-200 rounded-xl p-2 text-center hover:bg-green-100 transition disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-green-50"
                  >
                    <p className="text-green-700 font-black text-sm">2.0%</p>
                    <p className="text-[10px] text-green-600 font-semibold leading-tight mt-0.5">무등록사업자<br/>500만원</p>
                  </button>
                  <button
                    onClick={() => setInterestRate(3.5)}
                    disabled={productLimits.minRate > 3.5 || productLimits.maxRate < 3.5}
                    className="bg-blue-50 border border-blue-200 rounded-xl p-2 text-center hover:bg-blue-100 transition disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-blue-50"
                  >
                    <p className="text-blue-700 font-black text-sm">3.5%</p>
                    <p className="text-[10px] text-blue-600 font-semibold leading-tight mt-0.5">성실상환시<br/>이자율 감면</p>
                  </button>
                  <button onClick={() => setInterestRate(4.5)} className="bg-teal-50 border border-teal-300 rounded-xl p-2 text-center hover:bg-teal-100 transition">
                    <p className="text-teal-700 font-black text-sm">4.5%</p>
                    <p className="text-[10px] text-teal-600 font-semibold leading-tight mt-0.5">기본<br/>적용금리</p>
                  </button>
                  <div className="bg-red-50 border border-red-200 rounded-xl p-2 text-center cursor-default" title="연체금리는 상환 설계 시뮬레이션에 반영되지 않는 안내용 정보입니다">
                    <p className="text-red-600 font-black text-sm">5.5%</p>
                    <p className="text-[10px] text-red-500 font-semibold leading-tight mt-0.5">연체 발생시<br/>적용금리(안내)</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-normal pt-1">
                  ※ 연체가 장기화될 경우 최고 연 9%까지 연체이자율이 적용될 수 있습니다. (서민금융진흥원 고시 기준)
                </p>
              </div>

              {/* 거치 기간 설정 (이자만 납부하는 유예기) */}
              <div className="space-y-4 pt-6 pb-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm font-extrabold text-slate-800 gap-1">
                  <label htmlFor="grace-period" className="flex items-center gap-1">⏳ 거치 유예기간 (이자만 납부)</label>
                  <output htmlFor="grace-period" className="text-miso-blue-600 font-black text-lg whitespace-nowrap">{gracePeriod} 개월 {gracePeriod >= 12 && `(${Math.floor(gracePeriod / 12)}년)`}</output>
                </div>

                {/* 거치기간 중 적용금리는 상단에서 선택한 상품 기준으로 자동 적용됨 */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="text-slate-400 font-semibold mr-1">거치기간 적용금리:</span>
                  <span className="px-2.5 py-1 rounded-full font-bold bg-miso-blue-600 text-white shadow">
                    {productLimits.label} {gracePeriodRate.toFixed(1)}%
                  </span>
                  <span className="text-slate-400">최대 {productLimits.maxGrace}개월까지 설정 가능</span>
                </div>
                <input
                  id="grace-period"
                  type="range"
                  min="0"
                  max={productLimits.maxGrace}
                  step="6"
                  value={gracePeriod}
                  onChange={(e) => setGracePeriod(Number(e.target.value))}
                  aria-valuetext={gracePeriod === 0 ? '거치기간 없음' : `${gracePeriod}개월${gracePeriod >= 12 ? `, ${Math.floor(gracePeriod / 12)}년` : ''}`}
                  className="w-full accent-miso-blue-600 cursor-pointer h-2 bg-slate-100 rounded-lg appearance-none"
                />
                <div className="relative h-8 mt-1">
                  {[
                    { val: 0,  label: '0개월', mobileHide: false },
                    { val: 6,  label: '6개월', mobileHide: false },
                    { val: 12, label: '1년',   mobileHide: false },
                    { val: 24, label: '2년',   mobileHide: false },
                    { val: 36, label: '3년',   mobileHide: true  },
                    { val: 48, label: '4년',   mobileHide: true  },
                    { val: 60, label: '5년',   mobileHide: true  },
                    { val: 72, label: '6년',   mobileHide: false },
                  ].filter(({ val }) => val <= productLimits.maxGrace).map(({ val, label, mobileHide }, i, arr) => {
                    const pct = (val / productLimits.maxGrace) * 100;
                    const isFirst = i === 0;
                    const isLast = i === arr.length - 1;
                    const top = i % 2 === 0 ? '0px' : '16px';
                    const transform = isFirst ? 'translateX(0)' : isLast ? 'translateX(-100%)' : 'translateX(-50%)';
                    return (
                      <span
                        key={val}
                        className={`absolute text-[10px] text-slate-400 font-semibold cursor-pointer hover:text-miso-blue-600 transition whitespace-nowrap ${mobileHide ? 'hidden md:inline' : ''}`}
                        style={{ left: `${pct}%`, top, transform }}
                        onClick={() => setGracePeriod(val)}
                      >
                        {label}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* 원금 상환 기간 설정 */}
              <div className="space-y-4 pt-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm font-extrabold text-slate-800 gap-1">
                  <label htmlFor="repayment-period" className="flex items-center gap-1">📅 원금분할상환 기간 설정</label>
                  <output htmlFor="repayment-period" className="text-miso-blue-600 font-black text-lg whitespace-nowrap">{repaymentPeriod} 개월 ({repaymentPeriod / 12}년)</output>
                </div>
                <input
                  id="repayment-period"
                  type="range"
                  min="12"
                  max={productLimits.maxRepay}
                  step="12"
                  value={repaymentPeriod}
                  onChange={(e) => setRepaymentPeriod(Number(e.target.value))}
                  aria-valuetext={`${repaymentPeriod}개월, ${repaymentPeriod / 12}년`}
                  className="w-full accent-miso-blue-600 cursor-pointer h-2 bg-slate-100 rounded-lg appearance-none"
                />
                <div className="relative h-8 mt-1">
                  {[
                    { val: 12, label: '1년' },
                    { val: 24, label: '2년' },
                    { val: 36, label: '3년' },
                    { val: 48, label: '4년' },
                    { val: 60, label: '5년' },
                  ].filter(({ val }) => val <= productLimits.maxRepay).map(({ val, label }, i, arr) => {
                    const pct = ((val - 12) / (productLimits.maxRepay - 12)) * 100;
                    const isLast = i === arr.length - 1;
                    return (
                      <span
                        key={val}
                        className="absolute text-[10px] text-slate-400 font-semibold cursor-pointer hover:text-miso-blue-600 transition whitespace-nowrap"
                        style={{ left: `${pct}%`, transform: isLast ? 'translateX(-100%)' : 'translateX(-50%)' }}
                        onClick={() => setRepaymentPeriod(val)}
                      >
                        {label}
                      </span>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* 우측 계산 결과 시각 패널 */}
            <div className="lg:col-span-5 bg-slate-50 p-8 md:p-10 border-l border-slate-100 flex flex-col justify-between">
              
              <div className="space-y-6">
                <h4 className="font-extrabold text-slate-900 text-[15px] pb-3 border-b border-slate-200">
                  가상 설계 결과 (원리금균등 기본안)
                </h4>

                {/* 거치 기간 이자 */}
                {gracePeriod > 0 && (
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline text-sm gap-0.5">
                    <span className="text-slate-500 font-medium">거치기간 중 매달 납부액(이자만):</span>
                    <span className="font-black text-slate-800">{calcResult.gracePeriodMonthlyInterest.toLocaleString()} 원</span>
                  </div>
                )}

                {/* 상환 기간 돌입 후 이자 */}
                <div className="space-y-3 pt-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline text-sm gap-0.5">
                    <span className="text-slate-500 font-medium">상환 첫 달 원금:</span>
                    <span className="font-black text-slate-800">{calcResult.repaymentMonthlyPrincipal.toLocaleString()} 원</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline text-sm gap-0.5">
                    <span className="text-slate-500 font-medium mr-2 flex items-center">
                      상환 첫 달 이자:
                      <span className="inline-block relative group ml-1 text-slate-300 hover:text-slate-500 cursor-help pr-1 text-xs">
                        ⓘ
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black text-white text-[10px] p-2 rounded w-44 hidden group-hover:block z-20 font-medium leading-normal">
                          원리금균등 방식은 매월 납부액(원금+이자)이 동일하며, 회차가 지날수록 원금 비중은 늘고 이자 비중은 줄어듭니다. 표시된 값은 첫 달 기준입니다.
                        </span>
                      </span>
                    </span>
                    <span className="font-black text-miso-blue-700">{calcResult.repaymentMonthlyInterest.toLocaleString()} 원</span>
                  </div>
                  <div className="h-0.5 border-t border-dashed border-slate-200 my-1" />
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline text-base font-extrabold text-slate-900 gap-0.5">
                    <span>매월 납입금 (원리금균등):</span>
                    <span className="font-black text-miso-blue-600">월 {calcResult.repaymentTotalMonthly.toLocaleString()} 원</span>
                  </div>
                </div>

                {/* 누적 통계 */}
                <div className="bg-white p-4.5 rounded-2xl border border-slate-200 space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline text-xs gap-0.5">
                    <span className="text-slate-400 font-extrabold">원금과 이자 합산</span>
                    <span className="text-slate-500 font-bold">총 납부 이자 : {calcResult.totalInterest.toLocaleString()}원</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline text-sm font-extrabold text-slate-900 gap-0.5">
                    <span>총 상환 예정액:</span>
                    <span className="font-black text-slate-800">{calcResult.totalPayment.toLocaleString()} 원</span>
                  </div>
                </div>

              </div>

              {/* 매월 상환금 비주얼 바 데모 */}
              <div className="pt-6 space-y-2 text-xs">
                <span className="text-slate-400 font-bold block">월 상환 부담 한눈에 보기</span>
                <div className="flex h-5 w-full bg-slate-200 rounded-lg overflow-hidden font-bold text-white text-[10px] text-center shrink-0">
                  <div 
                    style={{ width: `${(calcResult.repaymentMonthlyPrincipal / calcResult.repaymentTotalMonthly) * 100}%` }}
                    className="bg-miso-blue-600 flex items-center justify-center"
                    title="원금 분량"
                  >
                    원금 {Math.round((calcResult.repaymentMonthlyPrincipal / calcResult.repaymentTotalMonthly) * 100)}%
                  </div>
                  <div 
                    style={{ width: `${(calcResult.repaymentMonthlyInterest / calcResult.repaymentTotalMonthly) * 100}%` }}
                    className="bg-amber-500 flex items-center justify-center text-[9px]"
                    title="평균 이자 분량"
                  >
                    이자
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-normal pt-1 font-bold">
                  ※ 이 결과는 입력값을 기준으로 한 단순 예상치이며, 실제 약정금액·금리는 심사 결과에 따라 달라질 수 있습니다.
                </p>
                <a 
                  href="tel:053-252-6408"
                  className="w-full bg-miso-blue-600 hover:bg-miso-blue-700 text-white font-black py-4 rounded-xl text-center text-sm transition shadow mt-3 flex items-center justify-center"
                >
                  📞 계산 결과로 전화 상담 신청하기
                </a>
              </div>

            </div>

          </div>

        </div></>}

      </div>
    </section>
  );
}
