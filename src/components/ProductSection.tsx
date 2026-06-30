/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BadgePercent, ShieldCheck, CheckCircle2, ChevronRight, Calculator, FileText, ArrowUpRight, HelpCircle, FileCheck, Star, Users } from 'lucide-react';
import { Product } from '../types';

interface ProductSectionProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenCalculator: () => void;
  initialTab?: string;
}


export default function ProductSection({ onScrollToSection, onOpenCalculator, initialTab }: ProductSectionProps) {
  const [activeTab, setActiveTab] = useState<string>(initialTab || 'social');

  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  const products: Product[] = [
    {
      id: 'social',
      name: '사회적연대금융',
      subtitle: '전국 최초 미소법인 취급 · 최다 지원 실적 (누적 37건 / 15억 원)',
      description: '사회적기업, 협동조합, 자활기업, 마을기업 등 사회 구조의 빈틈에서 취약계층의 고용 안정을 도모하는 단체 전용 특별 정책 무담보 운영 자금입니다.',
      limit: '최대 1억 원',
      interestRate: '연 4.5% (사회적가치등급 S6등급 이상 연 4.0%로 우대)',
      repaymentPeriod: '거치 최대 2년 + 균등분할상환 4년 (최대 6년) 또는 2년 만기 일시상환',
      repaymentMethod: '원리금 균등분할 상환',
      target: [
        '고용노동부 정식 인증 사회적기업',
        '지역 지자체 및 부처형 예비사회적기업',
'최근 3개년 평균 연매출 10억 원 이하 법인 (3년 미만은 설립 후 연평균 적용)'
      ],
      suitability: [
        '사업 활동 및 사회적 가치 실현 관련 증빙 서류를 갖춘 대구 지역 사회적경제기업',
        '정부 보조금 지급 전 발생하는 일시적 운영자금 부족을 해소하고자 하는 단체',
        '취약계층 고용 유지 및 사회적 서비스 제공을 목적으로 운영되는 기업'
      ],
      effect: '보조금 지급 공백기에도 조직 운영을 안정적으로 유지하고, 직원의 고용을 지속할 수 있도록 지원합니다.',
      blogUrl: 'https://blog.naver.com/PostView.naver?blogId=eornwndrn1&logNo=223850000058&categoryNo=7&parentCategoryNo=7&from=thumbnailList',
      phone: '053-252-6480'
    },
    {
      id: 'business',
      name: '사업자 운영자금',
      subtitle: '사업자등록증 보유 후 실제 운영 3개월 이상인 소상공인·개인 사업자',
      description: '골목의 동네 미용실, 전통시장 안 작은 상회, 1인 배달업 등 사업 실적이 있음에도 담보가 부족해 대출이 어려운 자영업자를 지원하는 긴급 운영자금입니다.',
      limit: '최대 2,000만원 (청년사업가는 최대 3,000만원)',
      interestRate: '연 4.5%',
      repaymentPeriod: '거치 6개월 + 매달 균등분할상환 5년 (총 5.5년) / 청년 우수 시 거치 2년',
      repaymentMethod: '원리금 균등분할 상환',
      target: [
        '신용점수 하위 20% 이하 (NICE 749점 이하 또는 KCB 700점 이하)',
        '기초생활수급자 또는 차상위계층',
        '최근 1년 이내 근로장려금 수급 이력이 있는 개인'
      ],
      suitability: [
        '카드 매출 또는 통장 입출금 내역으로 매출을 확인할 수 있는 분',
        '고금리 대출을 저금리 정책자금으로 전환하고자 하는 분',
        '분할 상환 의지가 있는 소상공인·개인 사업자 (법인기업 제외)'
      ],
      effect: '고금리 대출 대신 저금리로 사업을 유지하면서, 성실하게 상환하다 보면 신용도 함께 좋아집니다.',
      blogUrl: 'https://blog.naver.com/PostView.naver?blogId=eornwndrn1&logNo=224289610439&categoryNo=7&parentCategoryNo=7&from=thumbnailList'
    },
    {
      id: 'youth',
      name: '청년 미래이음',
      subtitle: '만 19세 ~ 34세 청년 / 미취업자 및 신규 취·창업 1년차',
      description: '아직 신용이 충분히 형성되지 않은 대학생·구직자에게 올바른 금융 지식과 함께 사회 진출의 발판을 마련해주는 청년 전용 정책 자금입니다.',
      limit: '최대 500만 원',
      interestRate: '연 4.5%',
      repaymentPeriod: '거치 최대 6년 + 매달 분할 상환 5년 (총 11년 상환 설계)',
      repaymentMethod: '원리금 균등분할 상환',
      target: [
        '① 청년 요건 (다음 중 하나 해당) — 만 19세 이상 34세 이하 청년 / 미취업 상태이거나 취업·창업 이력 1년 미만인 분',
        '② 기본 미소금융 대상 (다음 중 하나 해당) — 신용점수 하위 20% 이하 (NICE 749점 이하 또는 KCB 700점 이하) / 기초생활수급자 또는 차상위계층 / 최근 1년 이내 근로장려금 수급 이력이 있는 분'
      ],
      suitability: [
        '아르바이트나 소득이 있어 매월 소액 이자를 납부할 수 있는 청년',
        '신용카드나 금융 거래 이력이 부족해 일반 은행 대출이 어려운 청년',
        '고금리 대부업 이용 전 공공 정책자금을 먼저 알아보고자 하는 청년'
      ],
      effect: '취업 준비 기간 동안 생활 자금을 마련하고, 처음으로 건전한 신용을 쌓을 수 있는 기회가 됩니다.',
      blogUrl: 'https://blog.naver.com/PostView.naver?blogId=eornwndrn1&logNo=224274876397&categoryNo=7&parentCategoryNo=7&from=thumbnailList'
    },
    {
      id: 'vulnerable',
      name: '금융취약계층 생계자금',
      subtitle: '기초수급자 · 차상위 · 다문화 · 보이스피싱 피해자 긴급의료',
      description: '가족의 급작스러운 사고·질병, 전세 사기 등 불의의 상황으로 병원비나 생계 주거비 마련이 어려운 가구를 지원하는 긴급 금융 지원 자금입니다.',
      limit: '최대 500만 원',
      interestRate: '연 4.5%',
      repaymentPeriod: '거치 1년 + 매월 분할 상환 5년 (총 6년 상환)',
      repaymentMethod: '원리금 균등분할 상환',
      target: [
        '① 기본 요건 (다음 중 하나 해당) — 개인신용평점 하위 20% 이하 또는 하위 50% 이하 & 연소득 3,500만원 이하 / 기초생활수급자 또는 차상위계층 / 근로장려금 신청자격 대상자',
        '② 추가 요건 — 성실상환: 불법사금융예방대출 완제자 또는 미소금융 12회차 이상 성실상환자',
        '② 추가 요건 — 사회적배려대상자: 한부모·조손·다문화가족, 북한이탈주민, 등록장애인, 국민기초생활수급자, 차상위계층, 자활근로자, 근로장려금 수급자',
        '② 추가 요건 — 특별취약계층: 불법사금융 피해자 / 보이스피싱 피해자 / 전세사기 피해자 / 특별재난지역 거주자'
      ],
      suitability: [
        '치료비·주거비 등 생활에 필요한 자금이 필요한 분',
        '수급비나 일용직 소득으로 매월 소액 이자를 납부할 수 있는 분',
        '고금리 사금융 대신 정부 지원 자금으로 생활을 안정시키고자 하는 분'
      ],
      effect: '급하게 돈이 필요할 때, 고금리 사금융 대신 저금리 정책대출로 생활의 위기를 넘길 수 있습니다.',
      blogUrl: 'https://blog.naver.com/eornwndrn1/224328452218'
    }
  ];

  const activeProduct = products.find((p) => p.id === activeTab) || products[0];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 상단 타이들 */}
        <div id="social-finance" className="text-center space-y-4 max-w-4xl mx-auto">
          <span className="text-xs font-black text-teal-600 tracking-widest uppercase">Miso Finance Products</span>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
            미소금융대구중구법인 대표상품
          </h2>
          <div className="h-1.5 w-16 bg-teal-600 rounded-full mx-auto" />
          <p className="text-slate-600 font-medium text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-left md:text-center">
            상환 의지와 자립의 꿈, 그것으로 충분합니다. <br className="hidden sm:inline" />
            담보·보증 없이, 연 4.5% 저금리 대출로 여러분의 새 출발을 함께합니다.
          </p>
        </div>

        {/* 탭 가로 셀렉터 */}
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {products.map((p) => {
            const tabStyles: Record<string, { active: string; inactive: string; glow: string; icon: JSX.Element }> = {
              social:     { active: 'from-teal-500 to-cyan-500 shadow-teal-200',        inactive: 'border-teal-200 text-teal-700 hover:bg-teal-50',       glow: 'shadow-teal-300',    icon: <Star className="w-4 h-4" /> },
              business:   { active: 'from-orange-500 to-amber-500 shadow-orange-200',  inactive: 'border-orange-200 text-orange-700 hover:bg-orange-50',  glow: 'shadow-orange-300',  icon: <BadgePercent className="w-4 h-4" /> },
              youth:      { active: 'from-indigo-500 to-violet-500 shadow-indigo-200',  inactive: 'border-indigo-200 text-indigo-700 hover:bg-indigo-50',  glow: 'shadow-indigo-300',  icon: <Users className="w-4 h-4" /> },
              vulnerable: { active: 'from-rose-500 to-pink-500 shadow-rose-200',        inactive: 'border-rose-200 text-rose-700 hover:bg-rose-50',        glow: 'shadow-rose-300',    icon: <ShieldCheck className="w-4 h-4" /> },
            };
            const s = tabStyles[p.id];
            const isActive = activeTab === p.id;
            return (
              <motion.button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                whileTap={{ scale: 0.93 }}
                animate={isActive ? { scale: 1.05 } : { scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className={`relative flex-1 min-w-[130px] py-4 px-4 rounded-2xl text-xs md:text-sm font-extrabold tracking-tight transition-all duration-300 overflow-hidden ${
                  isActive
                    ? `bg-gradient-to-r ${s.active} text-white shadow-lg`
                    : `bg-white border-2 ${s.inactive}`
                }`}
              >
                {/* 구슬 굴러가는 효과 */}
                {isActive && (
                  <motion.div
                    initial={{ x: -80, opacity: 0.6 }}
                    animate={{ x: 120, opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-white/40 rounded-full blur-sm pointer-events-none"
                  />
                )}
                <div className="relative z-10 flex flex-col items-center gap-1">
                  {s.icon}
                  <span>{p.name}</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* 탭 콘텐츠 본문 (정밀 상세카드) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            
            {/* 좌측 메인 스펙 카드 */}
            <div id="business-fund" className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl shadow-md border border-slate-100 text-left space-y-6">
              <div className="space-y-2">
                <span className="inline-flex items-center text-teal-700 bg-teal-50 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-teal-200/50">
                  {activeProduct.id === 'social' ? '🔥 최우수 핵심보급' : '📋 맞춤 서민지원'}
                </span>
                <h3 className="text-2xl md:text-3.5xl font-black text-slate-900 tracking-tight">
                  {activeProduct.name}
                </h3>
                {activeProduct.id === 'social' ? (
                  <motion.p
                    key="social-subtitle"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-black text-xs md:text-sm px-3 py-1.5 rounded-full shadow-md"
                  >
                    <motion.span
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.5 }}
                    >🏆</motion.span>
                    <motion.span
                      animate={{ opacity: [1, 0.6, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                    >
                      {activeProduct.subtitle}
                    </motion.span>
                  </motion.p>
                ) : (
                  <p className="text-teal-600 font-bold text-xs md:text-sm">
                    {activeProduct.subtitle}
                  </p>
                )}
                <p className="text-slate-500 font-medium text-xs md:text-sm leading-relaxed pt-2">
                  {activeProduct.description}
                </p>
              </div>

              <div className="h-0.5 w-full bg-slate-100" />

              {/* 스펙 핵심 수치 대전 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2">
                <div className="bg-slate-50 px-5 py-4 rounded-xl border border-slate-100 flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center text-lg">💰</div>
                  <div>
                    <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">대출 최대 한도</span>
                    <span className="block text-slate-800 font-black text-base leading-snug">{activeProduct.limit}</span>
                  </div>
                </div>
                <div className="bg-teal-50 px-5 py-4 rounded-xl border border-teal-100 flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-teal-200 rounded-xl flex items-center justify-center text-lg">📉</div>
                  <div>
                    <span className="block text-teal-600 text-[10px] font-bold uppercase tracking-wider mb-1">실질 금리 수준</span>
                    <span className="block text-teal-800 font-black text-sm leading-snug">{activeProduct.interestRate}</span>
                  </div>
                </div>
                <div className="bg-slate-50 px-5 py-4 rounded-xl border border-slate-100 flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-lg">📅</div>
                  <div>
                    <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">상환 · 거치 기간</span>
                    <span className="block text-slate-700 font-bold text-xs leading-relaxed">{activeProduct.repaymentPeriod}</span>
                  </div>
                </div>
                <div className="bg-slate-50 px-5 py-4 rounded-xl border border-slate-100 flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-lg">🔄</div>
                  <div>
                    <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">상환 방식</span>
                    <span className="block text-slate-800 font-black text-sm leading-snug">{activeProduct.repaymentMethod}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-slate-800 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-teal-600" />
                  <span>
                    {activeProduct.id === 'youth' || activeProduct.id === 'vulnerable'
                      ? '신청 자격 요건 (STEP 1 + STEP 2 동시 충족 필수)'
                      : '신청 자격 요건 (하나라도 해당 시 상담 가능)'}
                  </span>
                </div>

                {activeProduct.id === 'youth' ? (
                  <div className="text-xs space-y-0">
                    {/* STEP 1 */}
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="bg-indigo-50 border-2 border-indigo-300 rounded-xl p-4 space-y-1.5"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-indigo-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full tracking-widest">STEP 1</span>
                        <p className="font-extrabold text-slate-800">청년 요건</p>
                      </div>
                      <ul className="pl-4 space-y-1 text-slate-600 font-medium">
                        <li>• 만 19세 이상 34세 이하 청년이면서, 미취업 상태이거나 취업·창업 이력 1년 미만인 분</li>
                      </ul>
                    </motion.div>

                    {/* AND 커넥터 */}
                    <div className="flex flex-col items-center py-1.5">
                      <div className="w-0.5 h-3 bg-slate-300" />
                      <motion.span
                        animate={{ opacity: [1, 0.2, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        className="bg-rose-600 text-white text-[10px] font-black px-3 py-0.5 rounded-full"
                      >
                        AND · 두 가지 동시 충족 필수
                      </motion.span>
                      <div className="w-0.5 h-3 bg-slate-300" />
                    </div>

                    {/* STEP 2 */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="bg-teal-50 border-2 border-teal-300 rounded-xl p-4 space-y-1.5"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-teal-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full tracking-widest">STEP 2</span>
                        <p className="font-extrabold text-slate-800">기본 미소금융 대상 (다음 중 하나 해당)</p>
                      </div>
                      <ul className="pl-4 space-y-1.5 text-slate-600 font-medium">
                        <li>• 신용점수 하위 20% 이하 (NICE 749점 이하 또는 KCB 700점 이하)</li>
                        <li>• 기초생활수급자 또는 차상위계층</li>
                        <li>• 최근 1년 이내 근로장려금 수급 이력이 있는 분</li>
                      </ul>
                    </motion.div>

                    {/* 최종 경고 배너 */}
                    <motion.div
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                      className="mt-3 flex items-center gap-2 bg-rose-50 border border-rose-300 rounded-xl px-4 py-3"
                    >
                      <span className="text-base">⚠️</span>
                      <p className="text-rose-700 font-black text-xs">STEP 1 + STEP 2 모두 해당 시에만 상담 신청이 가능합니다</p>
                    </motion.div>
                  </div>

                ) : activeProduct.id === 'vulnerable' ? (
                  <div className="text-xs space-y-0">
                    {/* STEP 1 */}
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="bg-teal-50 border-2 border-teal-300 rounded-xl p-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-teal-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full tracking-widest">STEP 1</span>
                        <p className="font-extrabold text-slate-800">기본 요건 (다음 중 하나 해당)</p>
                      </div>
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-teal-100">
                            <th className="border border-teal-200 px-3 py-2 text-teal-700 font-bold w-28">구분</th>
                            <th className="border border-teal-200 px-3 py-2 text-teal-700 font-bold">요건</th>
                          </tr>
                        </thead>
                        <tbody className="text-slate-600 font-medium">
                          <tr className="bg-white">
                            <td className="border border-slate-100 px-3 py-2 font-bold text-slate-700">신용점수</td>
                            <td className="border border-slate-100 px-3 py-2">개인신용평점 하위 20% 이하 또는 하위 50% 이하 & 연소득 3,500만원 이하</td>
                          </tr>
                          <tr className="bg-slate-50">
                            <td className="border border-slate-100 px-3 py-2 font-bold text-slate-700">수급자</td>
                            <td className="border border-slate-100 px-3 py-2">기초생활수급자 또는 차상위계층</td>
                          </tr>
                          <tr className="bg-white">
                            <td className="border border-slate-100 px-3 py-2 font-bold text-slate-700">근로장려금</td>
                            <td className="border border-slate-100 px-3 py-2">근로장려금 신청자격 대상자</td>
                          </tr>
                        </tbody>
                      </table>
                    </motion.div>

                    {/* AND 커넥터 */}
                    <div className="flex flex-col items-center py-1.5">
                      <div className="w-0.5 h-3 bg-slate-300" />
                      <motion.span
                        animate={{ opacity: [1, 0.2, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        className="bg-rose-600 text-white text-[10px] font-black px-3 py-0.5 rounded-full"
                      >
                        AND · 두 가지 동시 충족 필수
                      </motion.span>
                      <div className="w-0.5 h-3 bg-slate-300" />
                    </div>

                    {/* STEP 2 */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="bg-indigo-50 border-2 border-indigo-300 rounded-xl p-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-indigo-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full tracking-widest">STEP 2</span>
                        <p className="font-extrabold text-slate-800">추가 요건 (다음 중 하나 해당)</p>
                      </div>
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-indigo-100">
                            <th className="border border-indigo-200 px-3 py-2 text-indigo-700 font-bold w-28">구분</th>
                            <th className="border border-indigo-200 px-3 py-2 text-indigo-700 font-bold">해당자</th>
                          </tr>
                        </thead>
                        <tbody className="text-slate-600 font-medium">
                          <tr className="bg-white">
                            <td className="border border-slate-100 px-3 py-2 font-bold text-slate-700">성실상환</td>
                            <td className="border border-slate-100 px-3 py-2">불법사금융예방대출 완제자 / 미소금융 12회차 이상 성실상환자</td>
                          </tr>
                          <tr className="bg-slate-50">
                            <td className="border border-slate-100 px-3 py-2 font-bold text-slate-700">사회적배려<br/>대상자</td>
                            <td className="border border-slate-100 px-3 py-2">한부모·조손·다문화가족, 북한이탈주민, 등록장애인, 국민기초생활수급자, 차상위계층, 자활근로자, 근로장려금 수급자</td>
                          </tr>
                          <tr className="bg-white">
                            <td className="border border-slate-100 px-3 py-2 font-bold text-slate-700">특별취약<br/>계층</td>
                            <td className="border border-slate-100 px-3 py-2">불법사금융 피해자 / 보이스피싱 피해자 / 전세사기 피해자 / 특별재난지역 거주자</td>
                          </tr>
                        </tbody>
                      </table>
                    </motion.div>

                    {/* 최종 경고 배너 */}
                    <motion.div
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                      className="mt-3 flex items-center gap-2 bg-rose-50 border border-rose-300 rounded-xl px-4 py-3"
                    >
                      <span className="text-base">⚠️</span>
                      <p className="text-rose-700 font-black text-xs">STEP 1 + STEP 2 모두 해당 시에만 상담 신청이 가능합니다</p>
                    </motion.div>
                  </div>

                ) : (
                  <ul className="space-y-2.5 pl-6 list-disc text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                    {activeProduct.target.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                )}
              </div>

              {activeProduct.id === 'youth' && (
                <div className="bg-rose-50 border-2 border-rose-300 p-5 rounded-2xl">
                  <h4 className="font-black text-sm text-rose-700 flex items-center gap-2">
                    <span className="animate-bounce inline-block">🔔</span>
                    <span className="animate-pulse">신청 전 필수 절차 — 반드시 확인하세요</span>
                  </h4>
                  <p className="text-slate-700 text-xs font-semibold mt-3 leading-relaxed">
                    청년미래이음대출 신청 전, 서민금융진흥원 홈페이지에서<br />
                    <span className="text-rose-600 font-black">「청년 모두를 위한 재무상담」</span>을 먼저 이수하셔야 합니다.
                  </p>
                  <a
                    href="https://www.kinfa.or.kr/financialLife/youthFinancialCounseling.do"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-sm"
                  >
                    <span>서민금융진흥원 홈페이지 바로가기</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {activeProduct.id === 'social' && (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h4 className="text-center font-black text-sm text-slate-700 tracking-widest mb-4">
                    ⚡ 신속 대출진행 4단계 프로세스
                  </h4>
                  <div className="flex flex-col gap-2">
                    {/* STEP 01 */}
                    <div className="bg-white border-2 border-blue-400 rounded-2xl p-4 shadow-sm">
                      <div className="mb-2">
                        <span className="bg-blue-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full inline-block mb-1">STEP 01</span>
                        <p className="font-black text-sm text-slate-800">대출상담 &amp; 온라인서류접수</p>
                        <motion.p
                          animate={{ scale: [1, 1.04, 1], color: ['#dc2626', '#f97316', '#dc2626'] }}
                          transition={{ duration: 1.4, repeat: Infinity }}
                          className="text-xs font-black mt-0.5 flex items-center gap-1"
                        >
                          <motion.span
                            animate={{ rotate: [0, -15, 15, -10, 10, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1.8 }}
                          >📞</motion.span>
                          반드시 전화 상담 후 신청해 주세요
                        </motion.p>
                      </div>
                      <div className="flex flex-col gap-2 mt-3">
                        <a
                          href="tel:053-252-6480"
                          className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-black text-xs py-2.5 rounded-xl transition shadow"
                        >
                          <span>📞</span><span>전화 상담 · 053-252-6480</span>
                        </a>
                        <div className="grid grid-cols-2 gap-2">
                          <a
                            href="https://m.one-click.co.kr/#/kinfa_miso"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between bg-blue-50 hover:bg-blue-100 border border-blue-300 px-3 py-2.5 rounded-xl text-xs font-bold text-blue-800 transition group"
                          >
                            <div className="flex items-center gap-2">
                              <span className="bg-blue-500 text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center shrink-0">1</span>
                              <span>NICE<br/>서류접수</span>
                            </div>
                            <ArrowUpRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </a>
                          <a
                            href="http://www.kodit.co.kr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between bg-green-50 hover:bg-green-100 border border-green-300 px-3 py-2.5 rounded-xl text-xs font-bold text-green-800 transition group"
                          >
                            <div className="flex items-center gap-2">
                              <span className="bg-green-500 text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center shrink-0">2</span>
                              <span>KODIT<br/>평가</span>
                            </div>
                            <ArrowUpRight className="w-3.5 h-3.5 text-green-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-center text-blue-400 text-lg font-black">▼</div>

                    {/* STEP 02 */}
                    <div className="bg-white border-2 border-indigo-400 rounded-2xl p-4 shadow-sm">
                      <span className="bg-indigo-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full inline-block mb-1">STEP 02</span>
                      <p className="font-black text-sm text-slate-800">경영현장 실사방문 &amp; 적격 심사</p>
                      <p className="text-xs text-slate-500 font-semibold mt-0.5">대출관련 서류 징구 · 전문심사위원<br className="md:hidden" /> 현장방문 및 면담 · 서류 심사</p>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-center text-indigo-400 text-lg font-black">▼</div>

                    {/* STEP 03 */}
                    <div className="bg-white border-2 border-violet-400 rounded-2xl p-4 shadow-sm">
                      <span className="bg-violet-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full inline-block mb-1">STEP 03</span>
                      <p className="font-black text-sm text-slate-800">융자위원회 부의 및 심의의결</p>
                      <p className="text-xs text-slate-500 font-semibold mt-0.5">사회적가치등급 및 신용평가 종합 심의</p>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-center text-violet-400 text-lg font-black">▼</div>

                    {/* STEP 04 */}
                    <div className="bg-white border-2 border-violet-400 rounded-2xl p-4 shadow-sm">
                      <span className="bg-violet-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full inline-block mb-1">STEP 04</span>
                      <p className="font-black text-sm text-slate-800">최종 대출약정 및 대출금 실행</p>
                      <p className="text-xs text-slate-500 font-semibold mt-0.5">약정 체결 후 대출금 지급 완료 🎉</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                {activeProduct.blogUrl ? (
                  <motion.a
                    href={activeProduct.blogUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative overflow-hidden bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold px-5 py-4 rounded-xl text-sm flex items-center justify-center space-x-2 shadow-md cursor-pointer"
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      animate={{ opacity: [0, 0.4, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                    />
                    <motion.span
                      animate={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.5 }}
                      className="relative z-10"
                    >
                      <img src="/logos/naver_blog_logo.png" alt="네이버 블로그" className="w-5 h-5 object-contain" />
                    </motion.span>
                    <span className="relative z-10 whitespace-nowrap">블로그 상품내용 자세히 보기</span>
                  </motion.a>
                ) : null}
                {activeProduct.id === 'social' && (
                  <a
                    href="https://www.socialenterprise.or.kr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-green-700 hover:bg-green-600 text-white font-bold py-4 rounded-xl text-sm shadow-md transition"
                  >
                    <img src="/logos/sejin_logo.png" alt="한국사회적기업진흥원" className="h-5 w-auto object-contain brightness-0 invert" />
                    바로가기
                  </a>
                )}
                {activeProduct.id !== 'social' && (
                  <a
                    href={`tel:${activeProduct.phone ?? '053-252-6408'}`}
                    className="flex-1 bg-teal-600 text-white font-bold py-4 rounded-xl text-center text-sm shadow-md hover:bg-teal-700 transition whitespace-nowrap"
                  >
                    📞 전화 상담 신청하기
                  </a>
                )}
              </div>

            </div>

            {/* 우측 보강 설명: 적용 추천 대상 및 기대 효과 */}
            <div id="youth-fund" className="lg:col-span-5 space-y-6 text-left">
              
              <div id="vulnerable-fund" className="bg-white p-6.5 md:p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
                <h4 className="font-extrabold text-slate-900 text-lg flex items-center gap-1 tracking-tight">
                  <Star className="w-5 h-5 text-indigo-500 fill-indigo-500" />
                  <span>이런 분에게 적극 추천합니다</span>
                </h4>
                
                <div className="space-y-4">
                  {activeProduct.suitability.map((suit, index) => (
                    <div key={index} className="flex gap-3 text-sm">
                      <div className="w-6 h-6 rounded-full bg-teal-50 text-teal-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-slate-600 font-medium leading-relaxed">{suit}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 기대 효과 — PC 전용 */}
              <div className="hidden md:block bg-gradient-to-tr from-teal-600 to-emerald-600 p-8 rounded-3xl text-white shadow-lg shadow-teal-100 space-y-4">
                <h4 className="font-extrabold text-lg">기대 효과</h4>
                <p className="text-teal-50 text-xs md:text-sm leading-relaxed font-medium">
                  &ldquo;{activeProduct.effect}&rdquo;
                </p>
                <div className="pt-2">
                  <p className="text-[10px] text-teal-200 leading-normal">
                    ※ 모든 대출 심사는 신청인 본인의 신용 및 증빙 서류를 기준으로 융자심의위원회 규정에 따라 처리됩니다.
                  </p>
                </div>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
