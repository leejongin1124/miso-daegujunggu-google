/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BadgePercent, ShieldCheck, CheckCircle2, ChevronRight, Calculator, FileText, ArrowUpRight, HelpCircle, FileCheck, Star, Users } from 'lucide-react';
import { Product } from '../types';

interface ProductSectionProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenCalculator: () => void;
}

export default function ProductSection({ onScrollToSection, onOpenCalculator }: ProductSectionProps) {
  const [activeTab, setActiveTab] = useState<string>('social');

  const products: Product[] = [
    {
      id: 'social',
      name: '사회적연대금융',
      subtitle: '전국 최초 미소법인 취급 · 최다 지원 실적 (누적 37건 / 15억 원)',
      description: '사회적기업, 협동조합, 자활기업, 마을기업 등 사회 구조의 빈틈에서 취약계층의 고용 안정을 도모하는 단체 전용 특별 정책 무담보 운영 자금입니다.',
      limit: '최대 1억 원',
      interestRate: '연 4.5% (우수 단체 및 기업 선정 시 최저 연 4.0% 우대)',
      repaymentPeriod: '거치 최대 2년 + 균등분할상환 4년 (최대 6년) 또는 2년 만기 일시상환',
      repaymentMethod: '원금 균등분할 상환 (또는 만기 일시 상환)',
      target: [
        '고용노동부 정식 인증 사회적기업',
        '지역 지자체 및 부처형 예비사회적기업',
        '사회적협동조합 및 자활·마을 공인기업',
        '최근 3개년 평균 연매출 10억 원 이하 법인 (3년 미만은 설립 후 연평균 적용)'
      ],
      suitability: [
        '실제 활동 및 가치 증빙 서류가 완전한 대구지역 사회적 단체',
        '정부 지원금 교부 전 발생한 기한부 임시 운영자금 공백을 채우고자 하는 곳',
        '취약계층의 지속 가능한 근로계약과 사회 안정을 수호하고자 하는 기업'
      ],
      effect: '일회성 보조금 공백에 따른 급격한 조직 운영 균열을 방지하고, 직원의 근로 영속성을 안전하게 유지합니다.'
    },
    {
      id: 'business',
      name: '사업자 운영자금',
      subtitle: '소상공인·개인 가입 가능 / 사업자등록 후 3개월 필수',
      description: '골목의 동네 미용실, 전통시장 안 작은 상회, 1인 배달업 등 사업 실적이 충분히 존재함에도 담보가 부족해 대출을 기각당한 자영업자를 보살피는 긴급 수혈 자금입니다.',
      limit: '최대 2,000만원 (청년 사업가는 우대 최대 3,000만원)',
      interestRate: '연 4.5% (고정 이율)',
      repaymentPeriod: '거치 6개월 + 매달 균등분할상환 5년 (총 5.5년) / 청년 우수 시 거치 2년',
      repaymentMethod: '원금 균등분할 상환',
      target: [
        'NICE 가산 평점 하위 100분의 20 (749점 이하) 또는 KCB 700점 이하 대표자',
        '기초생활수급 자격자 및 차상위 대상자 소상공인',
        '근로장려금 최근 1년 내 수급 요건을 갖춘 소기업 대표자',
        '사업자등록증 보유 및 실제 가동 3개월 이상 확인 가능 대표자'
      ],
      suitability: [
        '카드 거래 승인 내역이나 종합 통장 입출금 매출 증빙이 명료한 분',
        '높은 대부업 자가 자금의 이율 구조(연 20%)를 합법적이고 투명하게 대수선할 자',
        '매출 채널을 소폭 확보해 나가며 성실하게 분할 부채를 상환할 의지가 강한 소상공인'
      ],
      effect: '제3금융권 사금융의 올가미 고리 구조에서 영속적으로 비켜가 성실 자립을 추진하는 디딤돌이 됩니다.'
    },
    {
      id: 'youth',
      name: '청년 미래이음',
      subtitle: '만 19세 ~ 34세 청년 / 미취업자 및 신규 취·창업 1년차',
      description: '아직 신용등급이 쌓이지 않아 카드 발급마저 주저하는 대학생, 구직자 층에게 올바른 금융 지식과 함께 사회 진출의 발판을 기입해주는 청년 독점 보장 기금입니다.',
      limit: '최대 500만 원 (개인 한도)',
      interestRate: '연 4.5% (고정 이율)',
      repaymentPeriod: '거치 최대 6년 + 매달 분할 상환 5년 (총 11년 상환 설계)',
      repaymentMethod: '원리금 균등분할 상환',
      target: [
        '만 19세 이상 34세 이하의 대구 거주 청년층',
        '신용점수 하위 100분의 20 이하 또는 차상위계층 이하 자산 청년',
        '미취업 상태의 고용 지원 대상자 또는 취·창업 이력 1년 미만의 초기 도전자'
      ],
      suitability: [
        '일시적 보육 수당이나 알바 소득 등으로 소액의 이자 상환 능력을 갖춘 청년',
        '필수 교육 과정인 「청년 모두를 위한 스마트 재무상담」 이수를 수월히 마칠 청년',
        '대부 광고의 늪에 빠지기 전 첫 금융 설계를 공공적 든든함으로 안심 출발할 청년'
      ],
      effect: '안정적인 구직 기간을 확보하여, 부결 걱정 없는 첫 신용의 합법적 기틀과 저금리 자금을 지원받게 됩니다.'
    },
    {
      id: 'vulnerable',
      name: '금융취약계층 생계자금',
      subtitle: '기초수급자 · 차상위 · 다문화 · 보이스피싱 피해자 긴급의료',
      description: '가족 중 급작스러운 사고나 질병, 전세 사기 등 우발적 사회재난 속에서 당장 병원비나 최소 생계 월세를 메워낼 길이 만무한 가구를 감싸 안는 긴급 금융 지원책입니다.',
      limit: '최대 500만 원 (생계 한도)',
      interestRate: '연 4.5%',
      repaymentPeriod: '거치 1년 + 매월 분할 상환 5년 (총 6년 상환)',
      repaymentMethod: '원금 균등분할 상환',
      target: [
        '개인 신용등급 하위 50% 이하이면서 연 소득 3,500만 원 이하 가구원',
        '한부모가족, 다문화가족, 북한이탈주민, 등록 장애인, 자활 근로자',
        '불법사금융예방 완제 이력 보유자 또는 미소금융 12회 이상 성실 상환자',
        '정부 지정 특별재난지역 거주자 및 전세 사기 / 보이스피싱 피해 신고 완료 자'
      ],
      suitability: [
        '생계비 용도(치료 영수증, 주거 전세 월세 연체 계좌 송금 내역) 소명이 온전한 경우',
        '일시적인 수급비나 일용 소득으로 매월 최소의 이자를 기한 내 이행 가능한 서민',
        '악질 사채 이용의 위협에서 벗어나 생명을 부지하고 생활을 복원시킬 강력한 자'
      ],
      effect: '사금융 유인책에 걸리지 않고 급한 생활 장벽을 국가 보조 지원으로 우수하게 극복해 생활 리듬을 사수합니다.'
    }
  ];

  const activeProduct = products.find((p) => p.id === activeTab) || products[0];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 상단 타이들 */}
        <div id="social-finance" className="text-center space-y-4 max-w-4xl mx-auto">
          <span className="text-xs font-black text-teal-600 tracking-widest uppercase">Miso Finance Products</span>
          <h2 className="text-3xl md:text-4.5xl font-black text-slate-900 tracking-tight leading-none">
            미소금융대구중구법인 대표상품
          </h2>
          <div className="h-1.5 w-16 bg-teal-600 rounded-full mx-auto" />
          <p className="text-slate-600 font-medium text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            상환 의지와 자립의 꿈, 그것으로 충분합니다. <br className="hidden sm:inline" />
            담보·보증 없이, 연 4.5% 저금리 대출로 여러분의 새 출발을 함께합니다.
          </p>
        </div>

        {/* 탭 가로 셀렉터 (신한은행 스타일의 입체감 있는 탭) */}
        <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl max-w-3xl mx-auto shadow-sm">
          {products.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveTab(p.id)}
              className={`flex-1 min-w-[130px] py-4 px-4 rounded-xl text-xs md:text-sm font-extrabold tracking-tight transition-all duration-200 ${
                activeTab === p.id 
                  ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md' 
                  : 'text-slate-600 hover:text-teal-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                {p.id === 'social' && <Star className="w-4 h-4" />}
                {p.id === 'business' && <BadgePercent className="w-4 h-4" />}
                {p.id === 'youth' && <Users className="w-4 h-4" />}
                {p.id === 'vulnerable' && <ShieldCheck className="w-4 h-4" />}
                <span>{p.name}</span>
              </div>
            </button>
          ))}
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
                <p className="text-teal-600 font-bold text-xs md:text-sm">
                  {activeProduct.subtitle}
                </p>
                <p className="text-slate-500 font-medium text-xs md:text-sm leading-relaxed pt-2">
                  {activeProduct.description}
                </p>
              </div>

              <div className="h-0.5 w-full bg-slate-100" />

              {/* 스펙 핵심 수치 대전 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2">
                <div className="bg-slate-50 p-4 rounded-xl text-center border border-slate-100">
                  <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider">대출 최대 한도</span>
                  <span className="block text-slate-800 font-black text-sm md:text-base mt-1.5">{activeProduct.limit}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl text-center border border-slate-100">
                  <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider">실질 금리 수준</span>
                  <span className="block text-teal-700 font-black text-sm md:text-base mt-1.5">{activeProduct.interestRate}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl text-center border border-slate-100">
                  <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider">상환·거치 기간</span>
                  <span className="block text-slate-800 font-extrabold text-[11px] md:text-xs mt-2 leading-tight">{activeProduct.repaymentPeriod}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl text-center border border-slate-100">
                  <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider">상환 방식 종류</span>
                  <span className="block text-slate-800 font-black text-xs mt-2">{activeProduct.repaymentMethod}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-slate-800 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-teal-600" />
                  <span>지원 자격 요건 (하나라도 해당 시 상담 가능)</span>
                </div>
                <ul className="space-y-2.5 pl-6 list-disc text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                  {activeProduct.target.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>

              {activeProduct.id === 'social' && (
                <div className="bg-gradient-to-tr from-slate-50 to-slate-100/30 p-5 rounded-2xl border border-slate-200">
                  <h4 className="font-bold text-xs text-indigo-700 flex items-center gap-1 tracking-tight">
                    <span>💡 사회연대금융 온라인 사전검토 2단계 필수</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3.5 text-xs text-slate-600">
                    <a 
                      href="https://www.niceodm.co.kr" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-white hover:bg-slate-50 p-3.5 rounded-xl border border-slate-150 flex items-center justify-between font-bold shadow-sm transition-all"
                    >
                      <span>1단계. NICE 원클릭 서류 제출</span>
                      <ArrowUpRight className="w-4 h-4 text-slate-400" />
                    </a>
                    <a 
                      href="http://www.kodit.co.kr" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-white hover:bg-slate-50 p-3.5 rounded-xl border border-slate-150 flex items-center justify-between font-bold shadow-sm transition-all"
                    >
                      <span>2단계. 신용보증기금 평가 업로드</span>
                      <ArrowUpRight className="w-4 h-4 text-slate-400" />
                    </a>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium mt-2 leading-normal">
                    ※ 사회적 기업용 공동인증서를 준비하여 NICE서류 센터 및 KODIT 사회가치평가 사이트에 전송하셔야 정밀 융자위원 심사가 시작됩니다.
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                {activeProduct.id === 'social' ? (
                  <a
                    href="tel:053-252-6480"
                    className="flex-1 bg-teal-600 text-white font-bold py-4 rounded-xl text-center text-sm shadow-md hover:bg-teal-700 transition"
                  >
                    📞 사회적연대금융 전화 상담하기 (053-252-6480)
                  </a>
                ) : (
                  <button
                    onClick={() => onScrollToSection('consultation-form')}
                    className="flex-1 bg-teal-600 text-white font-bold py-4 rounded-xl text-center text-sm shadow-md hover:bg-teal-700 transition"
                  >
                    📞 {activeProduct.name} 상담 신청하기
                  </button>
                )}
                <button
                  onClick={onOpenCalculator}
                  className="bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold px-6 py-4 rounded-xl text-sm transition flex items-center justify-center space-x-1"
                >
                  <Calculator className="w-4 h-4" />
                  <span>대출 계산기 돌리기</span>
                </button>
              </div>

            </div>

            {/* 우측 보강 설명: 적용 추천 대상 및 기대 효과 */}
            <div id="youth-fund" className="lg:col-span-5 space-y-6 text-left">
              
              <div id="vulnerable-fund" className="bg-white p-6.5 md:p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
                <h4 className="font-extrabold text-slate-900 text-lg flex items-center gap-1 tracking-tight">
                  <Star className="w-5 h-5 text-indigo-500 fill-indigo-500" />
                  <span>이런 분/기업에 적극 추천합니다</span>
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

              <div className="bg-gradient-to-tr from-teal-600 to-emerald-600 p-8 rounded-3xl text-white shadow-lg shadow-teal-100 space-y-4">
                <span className="text-[10px] font-bold text-teal-100 bg-white/20 px-2.5 py-1 rounded-md uppercase">Expected Effect</span>
                <h4 className="font-extrabold text-lg">기대 효과</h4>
                <p className="text-teal-50 text-xs md:text-sm leading-relaxed font-medium">
                  &ldquo;{activeProduct.effect}&rdquo;
                </p>
                <div className="pt-2">
                  <p className="text-[10px] text-teal-200 leading-normal">
                    ※ 모든 대출 심사는 본인명의 신용 및 증빙을 바탕으로 미소금융대구중구법인 융자심의위원회 규칙에 의거해 단독 처리되며, 법령을 정직하게 수호합니다.
                  </p>
                </div>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

        {/* 한눈에 보는 상품 비교표 컴팩트 카드 */}
        <div className="bg-white p-6.5 md:p-10 rounded-3xl border border-slate-100 shadow-sm text-left">
          <div className="mb-6">
            <h4 className="font-extrabold text-slate-900 text-lg">한눈에 비교하는 미소금융 스펙 요약</h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs md:text-sm text-left text-slate-500 divide-y divide-slate-100">
              <thead>
                <tr className="text-slate-400 font-bold text-[10px] uppercase tracking-wider bg-slate-50/50">
                  <th className="px-4 py-3">자금 구분</th>
                  <th className="px-4 py-3">주요 자금 한도</th>
                  <th className="px-4 py-3">실질 금리</th>
                  <th className="px-4 py-3 text-slate-700">추천 상환 기간</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-4.5 text-teal-700 font-extrabold text-slate-900 text-[13px] md:text-sm">사회적연대금융</td>
                  <td className="px-4 py-4.5 font-bold">법인 최대 1억 원</td>
                  <td className="px-4 py-4.5 text-teal-600">연 4.5% (우대 4.0%)</td>
                  <td className="px-4 py-4.5 text-slate-500">거치 2년 + 분할 4년 (최대 6년)</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-4.5 text-teal-700 font-extrabold text-slate-900 text-[13px] md:text-sm">사업자 운영자금</td>
                  <td className="px-4 py-4.5 font-bold">최대 2,000만 원 (청년 3천)</td>
                  <td className="px-4 py-4.5 text-teal-600">연 4.5% 수준</td>
                  <td className="px-4 py-4.5 text-slate-500">거치 6개월 + 분할 5년</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-4.5 text-teal-700 font-extrabold text-slate-900 text-[13px] md:text-sm">청년 미래이음 자금</td>
                  <td className="px-4 py-4.5 font-bold">최대 500만 원</td>
                  <td className="px-4 py-4.5 text-teal-600">연 4.5%수준</td>
                  <td className="px-4 py-4.5 text-slate-500">거치 6년 + 분할 5년 (총 11년)</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-4.5 text-teal-700 font-extrabold text-slate-900 text-[13px] md:text-sm">금융취약계층 생계자금</td>
                  <td className="px-4 py-4.5 font-bold">최대 500만 원</td>
                  <td className="px-4 py-4.5 text-teal-600">연 4.5%수준</td>
                  <td className="px-4 py-4.5 text-slate-500">거치 1년 + 분할 5년 (총 6년)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
