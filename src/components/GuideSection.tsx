/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, AlertTriangle, Calculator, FileText, Info, HelpCircle, CornerDownRight, Landmark, FileCheck, ChevronDown } from 'lucide-react';

export default function GuideSection() {
  // FAQ 아코디언 상태 변수
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const faqs = [
    {
      id: 1,
      question: "미소금융 대출의 신청 자격 기준은 구체적으로 어떻게 되나요?",
      answer: "개인신용평점 하위 20%(KCB 700점, NICE 749점)에 해당하시거나, 기초생활수급자 및 차상위계층, 혹은 근로장려금 수급 사실이 증빙되는 소상공인, 자영업자 분들이 주요 지원 대상입니다. 담보나 보증 없이 순수 신용과 자활 의지로 지원하기 때문에 기준에 해당하시면 적극 검토해 드립니다."
    },
    {
      id: 2,
      question: "대출 금리가 정말 고정 연 4.5% 수준인가요? 추가 수수료는 없나요?",
      answer: "네, 그렇습니다. 미소금융 정책 자금은 영리 목적이 아닌 정부 보장성 서민금융 지원 사업으로, 모든 상품이 연 4.5% 수준의 고정금리로 설계되어 안심하고 이용할 수 있습니다. 취급 수수료, 중개 수수료, 보증 선수금, 경영 컨설팅 자문비 등 어떤 명목의 부가 비용도 일절 존재하지 않으며, 이런 명목으로 비용을 요구하면 사기이므로 즉시 대표번호로 신고해 주시기 바랍니다."
    },
    {
      id: 3,
      question: "중도상환을 진행할 경우 중도상환 수수료가 발생하나요?",
      answer: "아닙니다. 미소금융 대출의 모든 자력 지원 자금은 중도상환 수수료가 전액 면제됩니다. 대출 실행 도중 일부 또는 전액을 만기 전에 수수료 부담 없이 자유롭게 선납 상환하실 수 있으며, 중도상환을 통해 남은 상환 잔액이 감소하면 매달 분할 부과되는 약정 이자도 비례하여 즉각 자동적으로 줄어듭니다."
    },
    {
      id: 4,
      question: "신청 완료 후 최종 승인 및 입금까지 소요 기간은 어느 정도인가요?",
      answer: "통상적으로 간편 서류 접수, 053-252-6408 번호를 통한 1차 대면 면담, 전문위원의 현장 실사(점포 방문), 그리고 법인 내부 융자위원회의 심의·의결 단계를 거치게 됩니다. 이 과정은 약 1주일에서 2주일 내외가 소요되며, 필수 소명 서류들을 지참해 주시면 진행 속도를 단축하는 데 도움이 됩니다."
    },
    {
      id: 6,
      question: "대구중구법인 지점 위치는 어디이며 사전 예약이 필수인가요?",
      answer: "법인 사무소는 '대구광역시 남구 중앙대로 146, 4층 (봉덕동, 하나은행 봉덕지점 건물)'에 위치해 있습니다. 원활하고 세심한 일대일 무료 컨설팅 및 대기 시간 단축을 위하여, 내방 전 대표번호인 053-252-6408로 연락하시어 사전 예약 일정을 잡아 주시는 것을 권장합니다."
    }
  ];

  // 대출계산기 상태 변수
  const [loanAmount, setLoanAmount] = useState<number>(10000000); // 디폴트 1000만 원
  const [interestRate, setInterestRate] = useState<number>(4.5); // 디폴트 4.5%
  const [gracePeriod, setGracePeriod] = useState<number>(6); // 디폴트 거치 6개월
  const [repaymentPeriod, setRepaymentPeriod] = useState<number>(60); // 디폴트 상환 60개월 (5년)

  // 대출 계산 결과 저장
  const [calcResult, setCalcResult] = useState({
    gracePeriodMonthlyInterest: 0,
    repaymentMonthlyPrincipal: 0,
    repaymentMonthlyInterest: 0,
    repaymentTotalMonthly: 0,
    totalInterest: 0,
    totalPayment: 0
  });

  // 대출 계산 로직 구현
  useEffect(() => {
    // 거치 기간 월 이자 계산 (원금 * 연이율 / 12)
    const graceInterest = Math.round((loanAmount * (interestRate / 100)) / 12);

    // 상환 기간에 따른 월 원금 균등 상환액 (원리금이 아닌 미소금융은 원금 균등 상환이 기본 원칙임)
    const monthlyPrincipal = Math.round(loanAmount / repaymentPeriod);

    // 상환 첫 달 이자 (일반적으로 점점 줄어들지만, 사용자가 체감할 수 있도록 평균적인 납부액 or 첫 달 기준 가이딩)
    // 미소금융은 남은 잔액 기준 이자를 매달 계산하므로 첫 달 이자가 가장 큼
    const maxMonthlyInterest = Math.round((loanAmount * (interestRate / 100)) / 12);
    const minMonthlyInterest = Math.round((monthlyPrincipal * (interestRate / 100)) / 12);
    const avgMonthlyInterest = Math.round((maxMonthlyInterest + minMonthlyInterest) / 2);

    // 총 이자액 = (거치기간 동안 이자 총액) + (상환기간 동안 줄어드는 이자의 합)
    // 상환기간 총 이자식: sum_{k=1}^N (원금 - (k-1)*월원금) * r / 12 = 원금 * r / 12 * (N + 1) / 2
    const repaymentTotalInterest = Math.round(((loanAmount * (interestRate / 100)) / 12) * (repaymentPeriod + 1) / 2);
    const totalInt = Math.round((graceInterest * gracePeriod) + repaymentTotalInterest);

    setCalcResult({
      gracePeriodMonthlyInterest: graceInterest,
      repaymentMonthlyPrincipal: monthlyPrincipal,
      repaymentMonthlyInterest: avgMonthlyInterest, // 평균적인 상환 이자 산출
      repaymentTotalMonthly: monthlyPrincipal + avgMonthlyInterest,
      totalInterest: totalInt,
      totalPayment: loanAmount + totalInt
    });
  }, [loanAmount, interestRate, gracePeriod, repaymentPeriod]);

  const processSteps = [
    {
      step: '01',
      title: '전화 상담 및 방문 예약',
      desc: '053-252-6408 전화 상담을 통해 방문 예약 일정을 안내받습니다.'
    },
    {
      step: '02',
      title: '서류 지참 및 1차 면담',
      desc: '사업자등록증, 부가세 증빙 등 필수 지참 서류를 구비하여 하나은행 봉덕지점 4층 사무소에 직접 내방하여 대면 심사를 거칩니다.'
    },
    {
      step: '03',
      title: '법인 여신 심사 및 현장 실사',
      desc: '제출 자격 적격성 검토 후, 전문위원이 직접 사업장(점포)을 방문하여 매출 및 운영 상태를 꼼꼼히 확인합니다.'
    },
    {
      step: '04',
      title: '융자위원회 의결 & 승인',
      desc: '법인 내 소집된 융자위원회의 내부 심의 규정에 따라 엄격한 기준으로 승인 여부를 결정합니다. (대출 승인을 보장하지는 않습니다)'
    },
    {
      step: '05',
      title: '자금 지급 및 사후 관리',
      desc: '무보증·무담보 조건으로 지정 계좌에 신속하게 지급되며, 성실 상환 기간 동안 필요 시 경영 컨설팅을 제공해 드립니다.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* 대출안내 타이틀 */}
        <div id="loan-calc-intro" className="text-center space-y-4 max-w-4xl mx-auto">
          <span className="text-xs font-black text-miso-blue-600 tracking-widest uppercase">Smart Loan Calculator</span>
          <h2 className="text-3xl md:text-4.5xl font-black text-slate-900 tracking-tight leading-none">
            스마트 대출 계산기
          </h2>
          <div className="h-1.5 w-16 bg-miso-blue-600 rounded-full mx-auto" />
          <p className="text-slate-600 font-medium text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            월 상환 예정액을 미리 확인하실 수 있습니다.
          </p>
        </div>

        {/* 세련된 스마트 대출 이자 계산기 */}
        <div id="loan-calc" className="bg-white border border-slate-200/90 rounded-3xl shadow-xl overflow-hidden text-left">
          
          <div className="bg-gradient-to-r from-miso-blue-700 to-miso-navy-700 p-8 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-miso-blue-100 bg-white/20 px-2.5 py-1 rounded-md uppercase">Smart Interest Simulator</span>
                <h3 className="text-2xl font-black tracking-tight leading-none">대구중구법인 대출 설계 계산기</h3>
                <p className="text-miso-blue-100 text-xs font-semibold">비영리 공공수행 이율 연 4.5% 기준 매월 가상 상환액</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => { setLoanAmount(20000000); setGracePeriod(6); setRepaymentPeriod(60); }}
                  className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3 py-2 rounded-lg transition-all"
                >
                  🏪 사업자 표준 (2천만 / 거치6M)
                </button>
                <button 
                  onClick={() => { setLoanAmount(5000000); setGracePeriod(72); setRepaymentPeriod(60); }}
                  className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3 py-2 rounded-lg transition-all"
                >
                  🌱 청년 미래이음 (5백만 / 거치6년)
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* 좌측 슬라이더 컨트롤러 영역 */}
            <div className="lg:col-span-7 p-8 md:p-10 space-y-8 divide-y divide-slate-100">
              
              {/* 대출 원금 */}
              <div className="space-y-4 pb-4">
                <div className="flex justify-between items-center text-sm font-extrabold text-slate-800">
                  <span className="flex items-center gap-1">💰 대출 요청 원금 설정</span>
                  <span className="text-miso-blue-600 font-black text-lg">{(loanAmount / 10000).toLocaleString()}만 원</span>
                </div>
                <input 
                  type="range" 
                  min="1000000" 
                  max="100000000" 
                  step="500000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-miso-blue-600 cursor-pointer h-2 bg-slate-100 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-extrabold">
                  <span>100만</span>
                  <span>1,000만</span>
                  <span>3,000만</span>
                  <span>5,000만</span>
                  <span>우수기업 1억 한도</span>
                </div>
              </div>

              {/* 실질 이자율 설정 (미소금융 정책이율 4.0 ~ 4.5%) */}
              <div className="space-y-4 pt-6 pb-4">
                <div className="flex justify-between items-center text-sm font-extrabold text-slate-800">
                  <span className="flex items-center gap-1">📈 연 이자율 (표준 4.5% 기준)</span>
                  <span className="text-miso-blue-600 font-black text-lg">{interestRate.toFixed(1)}%</span>
                </div>
                <input 
                  type="range" 
                  min="4.0" 
                  max="4.5" 
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-miso-blue-600 cursor-pointer h-2 bg-slate-100 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                  <span>우수 사회적기업 4.0% 우대</span>
                  <span>서민금융 표준 4.5%</span>
                </div>
              </div>

              {/* 거치 기간 설정 (이자만 납부하는 유예기) */}
              <div className="space-y-4 pt-6 pb-4">
                <div className="flex justify-between items-center text-sm font-extrabold text-slate-800">
                  <span className="flex items-center gap-1">⏳ 거치 유예기간 (이자만 납부)</span>
                  <span className="text-miso-blue-600 font-black text-lg">{gracePeriod} 개월 {gracePeriod >= 12 && `(${Math.floor(gracePeriod / 12)}년)`}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="72" 
                  step="6"
                  value={gracePeriod}
                  onChange={(e) => setGracePeriod(Number(e.target.value))}
                  className="w-full accent-miso-blue-600 cursor-pointer h-2 bg-slate-100 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                  <span>즉시원금상환 (0개월)</span>
                  <span>사업자 상한 6개월</span>
                  <span>생계 1년</span>
                  <span>사회연대 2년</span>
                  <span>미래이음 상한 6년</span>
                </div>
              </div>

              {/* 원금 상환 기간 설정 */}
              <div className="space-y-4 pt-6">
                <div className="flex justify-between items-center text-sm font-extrabold text-slate-800">
                  <span className="flex items-center gap-1">📅 원금분할상환 기간 설정</span>
                  <span className="text-miso-blue-600 font-black text-lg">{repaymentPeriod} 개월 ({repaymentPeriod / 12}년)</span>
                </div>
                <input 
                  type="range" 
                  min="12" 
                  max="60" 
                  step="12"
                  value={repaymentPeriod}
                  onChange={(e) => setRepaymentPeriod(Number(e.target.value))}
                  className="w-full accent-miso-blue-600 cursor-pointer h-2 bg-slate-100 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                  <span>12개월 (1년)</span>
                  <span>24개월</span>
                  <span>36개월</span>
                  <span>48개월</span>
                  <span>소상공인 표준 60개월 (5년)</span>
                </div>
              </div>

            </div>

            {/* 우측 계산 결과 시각 패널 */}
            <div className="lg:col-span-5 bg-slate-50 p-8 md:p-10 border-l border-slate-100 flex flex-col justify-between">
              
              <div className="space-y-6">
                <h4 className="font-extrabold text-slate-900 text-[15px] pb-3 border-b border-slate-200">
                  가상 설계 결과 (원금균등 기본안)
                </h4>

                {/* 거치 기간 이자 */}
                {gracePeriod > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 font-medium">거치기간 중 매달 납부액(이자만):</span>
                    <span className="font-black text-slate-800">{calcResult.gracePeriodMonthlyInterest.toLocaleString()} 원</span>
                  </div>
                )}

                {/* 상환 기간 돌입 후 이자 */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 font-medium">상환기간 매월 균등 원금:</span>
                    <span className="font-black text-slate-800">{calcResult.repaymentMonthlyPrincipal.toLocaleString()} 원</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 font-medium mr-2 flex items-center">
                      상환기간 첫달 평균 이자:
                      <span className="inline-block relative group ml-1 text-slate-300 hover:text-slate-500 cursor-help pr-1 text-xs">
                        ⓘ
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black text-white text-[10px] p-2 rounded w-44 hidden group-hover:block z-20 font-medium leading-normal">
                          원금균등 방식은 매월 원금이 줄어들수록 부과되는 이자도 점차 줄어듭니다. 결과는 첫달과 마지막달의 평균 기준입니다.
                        </span>
                      </span>
                    </span>
                    <span className="font-black text-miso-blue-700">{calcResult.repaymentMonthlyInterest.toLocaleString()} 원</span>
                  </div>
                  <div className="h-0.5 bg-dashed bg-slate-200 my-1" />
                  <div className="flex justify-between text-base font-extrabold text-slate-900">
                    <span>이후 매월 평균 납입금:</span>
                    <span className="font-black text-miso-blue-600">월 {calcResult.repaymentTotalMonthly.toLocaleString()} 원</span>
                  </div>
                </div>

                {/* 누적 통계 */}
                <div className="bg-white p-4.5 rounded-2xl border border-slate-200 space-y-2.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400 font-extrabold">원금과 이자 합산</span>
                    <span className="text-slate-500 font-bold">총 납부 이자 : {calcResult.totalInterest.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-slate-900">
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
                <p className="text-[10px] text-slate-400 leading-normal pt-1 font-bold">
                  ※ 시중 사채 연 20% 이용 시 이자 부담만 약 4배 가량 늘어납니다. 비영리 제도 자금의 낮은 금리를 충분히 활용해 보세요.
                </p>
                <a 
                  href="tel:053-252-6408"
                  className="w-full bg-miso-blue-600 hover:bg-miso-blue-700 text-white font-black py-4 rounded-xl text-center text-sm transition shadow mt-3 flex items-center justify-center"
                >
                  📞 위 설계 조건으로 전화 상담하기
                </a>
              </div>

            </div>

          </div>

        </div>

        {/* 이용 절차 타임라인 가이드 */}
        <div id="process-guide" className="space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-miso-blue-600 font-bold text-sm tracking-widest uppercase">Process Flow</span>
            <h3 className="text-2.5xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              체계적이고 투명한 대출 진행 절차
            </h3>
            <p className="text-slate-500 text-xs">
              서민금융진흥원 심의 규칙에 맞춰 진행되는 5단계 핵심 단계입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-8 text-left">
            {processSteps.map((p, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative group hover:border-miso-blue-200 hover:shadow-md transition duration-300">
                <div className="w-10 h-10 rounded-xl bg-miso-blue-50 text-miso-blue-700 font-black text-sm flex items-center justify-center shadow-inner">
                  {p.step}
                </div>
                <h4 className="font-extrabold text-slate-800 text-sm mt-5 tracking-tight group-hover:text-miso-blue-600 transition-colors">
                  {p.title}
                </h4>
                <p className="text-slate-500 text-xs mt-2 leading-relaxed font-semibold">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* 대출 서류 가이드 보완 팝카드 */}
        <div className="bg-gradient-to-tr from-slate-50 to-slate-100/30 p-8 rounded-3xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-left">
          <div className="space-y-3">
            <span className="inline-flex items-center text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2 rounded">
              Required Documents
            </span>
            <h4 className="font-extrabold text-slate-900 text-lg">기본 제출 필수 소명서류 안내</h4>
            <p className="text-slate-500 text-xs leading-relaxed font-semibold">
              사무실 방문 전 대구중구법인 전문여신 심사관의 대기 시간을 줄이고 빠른 접수를 위해 아래 공인 서류를 지참해 가시면 원활합니다.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-slate-600">
            <div className="bg-white p-4.5 rounded-xl border border-slate-200 relative shadow-sm">
              <span className="font-bold text-slate-800 block">🏪 자영업 부류</span>
              <ul className="list-disc pl-4 mt-1.5 space-y-1 text-slate-400 font-bold text-[11px]">
                <li>사업자등록증 원본</li>
                <li>최근 1년 부가세 영수증</li>
                <li>카드/종합 거래 통장 사본</li>
              </ul>
            </div>
            <div className="bg-white p-4.5 rounded-xl border border-slate-200 relative shadow-sm">
              <span className="font-bold text-slate-800 block">👥 사회적 기업 / 가치단체</span>
              <ul className="list-disc pl-4 mt-1.5 space-y-1 text-slate-400 font-bold text-[11px]">
                <li>법인등기부 및 정관 사본</li>
                <li>최근 3개년 매출 재무제표</li>
                <li>사회가치센터 업로드용 서류</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 아코디언 스타일 FAQ 섹션 */}
        <div id="faq-section" className="space-y-10 pt-8 border-t border-slate-100">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-black text-miso-blue-600 tracking-widest uppercase">Frequently Asked Questions</span>
            <h3 className="text-2.5xl md:text-3.5xl font-black text-slate-900 tracking-tight">
              자주 묻는 서민금융 질문 (FAQ)
            </h3>
            <p className="text-slate-500 text-sm font-semibold max-w-2xl mx-auto leading-relaxed">
              상담 예약 전, 많은 분들께서 궁금해하시는 핵심 질문들을 모았습니다. <br className="hidden sm:inline" />
              추가 정보가 필요하시면 대표전화로 편하게 상담받으실 수 있습니다.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4 text-left">
            {faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div 
                  key={faq.id}
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
                      <span className="font-extrabold text-slate-800 text-sm md:text-base leading-snug">
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
                      <p className="text-xs md:text-sm leading-relaxed font-semibold">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
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

        </div>

      </div>
    </section>
  );
}
