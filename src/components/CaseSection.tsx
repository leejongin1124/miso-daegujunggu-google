/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Sparkles, Star, MapPin, Heart, ChevronRight } from 'lucide-react';
import { CaseStudy } from '../types';

export default function CaseSection() {
  const [filter, setFilter] = useState<string>('all');

  const cases: CaseStudy[] = [
    {
      id: 'social-1',
      category: 'social',
      title: '발달장애인 10명의 일자리를 지켜낸 사례',
      problem: '대구 남산동에서 발달장애인 10명과 함께 제과제빵 업체를 운영하고 있습니다. 정부 보조금 정산 분기 전 일시적 자금 공백이 생길 때마다 급여일이 다가오면 걱정이 컸습니다. 부동산 담보가 없다는 이유로 은행 대출은 거절당했습니다.',
      solution: '미소금융의 사회연대금융 상담을 받고 신용보증기금 가치평가 등록을 통해 무보증으로 운전자금을 지원받았습니다.',
      effect: '거치 유예기간 2년을 활용해 제품 품질에 집중할 수 있었고, 안정적으로 운영을 이어가고 있습니다.',
      author: '김○○ 대표 (인증 사회적기업 운영)',
      location: '대구 남구'
    },
    {
      id: 'social-2',
      category: 'social',
      title: '신규 사회적협동조합의 첫걸음',
      problem: '돌봄 서비스를 제공하고자 사회적협동조합을 막 설립했지만, 신규 단체라는 이유로 거래 이력이 없어 1금융권 대출이 어려웠습니다.',
      solution: '사회연대금융 취급 실적이 많은 대구중구법인을 찾아 조합 서류와 가치평가를 기반으로 무담보 자금을 지원받았습니다.',
      effect: '초기 시설 구비와 인건비를 충당했고, 조합원이 늘어나며 지역 돌봄 복지의 한 축으로 자리 잡았습니다.',
      author: '이○○ 이사장 (50대 대표 조합원)',
      location: '대구 남구'
    },
    {
      id: 'business-1',
      category: 'business',
      title: '사채 대신 선택한 미소금융',
      problem: '반찬가게를 10년째 운영하고 있었으나 코로나 이후 식자재 값 폭등과 매출 하락으로 재료비조차 감당하기 어려웠습니다. 고금리 사채 광고를 보며 전화를 걸까 고민하던 날이 많았습니다.',
      solution: '지인의 권유로 통장 명세와 사업자등록증을 지참해 상담받았고, 카드 매출 이력을 바탕으로 운영자금을 승인받았습니다.',
      effect: '연 4.5% 고정금리로 재료를 안정적으로 조달할 수 있게 되어 단골손님도 다시 늘었습니다.',
      author: '이○○ 사장 (60대, ○○반찬)',
      location: '대구 중구 남산동'
    },
    {
      id: 'business-2',
      category: 'business',
      title: '청년 창업자의 사업자금 우대 사례',
      problem: '동성로 골목에 수제버거 가게를 개업하자마자 인테리어 비용과 초기 재료비 부담이 겹쳤습니다. 개업 1개월 차 신생 사업자라 일반 대출은 받기 어려웠습니다.',
      solution: '미소금융 청년 사업자 우대 한도(최대 3,000만원) 제도를 확인하고, 카드 정산 계좌 거래이력을 준비해 상담받았습니다.',
      effect: '여유 있는 사업자금으로 안정적인 재료 수급이 가능해졌고, 매달 꾸준히 상환하며 지역 맛집으로 자리 잡고 있습니다.',
      author: '박○○ 사장 (35세, ○○버거)',
      location: '대구 중구'
    },
    {
      id: 'youth-1',
      category: 'youth',
      title: '청년 재무상담을 통한 브랜드 창업',
      problem: '디자이너 자체 브랜드 출시를 꿈꿨지만 아르바이트 소득과 거래 이력 부족으로 은행과 카드사 신용 평가에서 어려움을 겪었습니다.',
      solution: '청년 미래이음 자금을 신청하면서 「청년 스마트 재무상담」 과정을 함께 수강해 소득·보증 소명을 안내받았습니다.',
      effect: '6년의 거치 기간 덕분에 초기 부채 부담 없이 브랜드 운영에 집중할 수 있었고, 독립에 성공했습니다.',
      author: '최○○ 작가 (20대 디자이너)',
      location: '대구 중구'
    },
    {
      id: 'youth-2',
      category: 'youth',
      title: '구직 비용 부담을 덜어낸 사례',
      problem: '대학 마지막 학기, 면접 비용과 시험 응시료로 카드 한도가 바닥났고 단기 대부업 광고에 손이 갈까 걱정될 만큼 자금 압박이 컸습니다.',
      solution: '청년 미래이음 자금을 알아보고 구직 계획서와 아르바이트 소득 이력을 소명해 지원받았습니다.',
      effect: '면접 준비와 시험 응시료 부담을 덜고 지역 기업에 최종 합격해 안정적으로 상환하고 있습니다.',
      author: '김○○ 사원 (20대 취업인)',
      location: '대구 남구'
    },
    {
      id: 'vulnerable-1',
      category: 'vulnerable',
      title: '아이의 수술비를 마련한 사례',
      problem: '편의점 아르바이트 소득으로 홀로 두 자녀를 키우던 중, 큰아이의 갑작스러운 수술 통보를 받았지만 수백만 원의 의료비를 마련할 방법이 없었습니다.',
      solution: '사회복지센터의 안내로 미소금융 생계자금을 알게 되었고, 금융취약계층 요건을 소명해 긴급 의료비를 지원받았습니다.',
      effect: '아이는 무사히 퇴원해 통학하고 있으며, 연 4.5% 저금리(월 1만원 미만 이자)로 부담 없이 상환하고 있습니다.',
      author: '이○○ 회원 (40대, 한부모가정)',
      location: '대구 중구'
    },
    {
      id: 'vulnerable-2',
      category: 'vulnerable',
      title: '전세 사기 피해를 딛고 일상을 회복한 사례',
      problem: '보이스피싱 피해로 신용이 무너지고 임차료가 수개월 연체되어 퇴거 통지를 받는 어려운 상황이었습니다.',
      solution: '통합지원센터에서 미소금융의 불법사금융 피해 구제 자금을 소개받아 피해 증빙 서류를 준비해 접수했습니다.',
      effect: '연체된 주거비를 정리했고, 연 4.5% 원리금 균등 상환으로 안정적으로 일상을 회복했습니다.',
      author: '한○○ 고객 (50대, 피해 극복인)',
      location: '대구 수성구'
    }
  ];

  const filteredCases = filter === 'all' ? cases : cases.filter((c) => c.category === filter);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 타이틀 */}
        <div id="case-social" className="text-center space-y-4 max-w-4xl mx-auto">
          <span className="text-xs font-black text-miso-blue-600 tracking-widest uppercase">Miso Miracle Stories</span>
          <h2 className="text-3xl md:text-4.5xl font-black text-slate-900 tracking-tight leading-none">
            다시 일어선 대구의 실제 감동사례
          </h2>
          <div className="h-1.5 w-16 bg-miso-blue-600 rounded-full mx-auto" />
          <p className="text-slate-600 font-medium text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            미소금융대구중구법인을 통해 고금리 사금융 대신 <br className="hidden sm:inline" />
            성실한 상환과 신뢰로 재기에 성공한 이웃들의 이야기입니다.
          </p>
        </div>

        {/* 필터 칩 */}
        <div className="flex flex-wrap justify-center gap-2.5">
          <button
            onClick={() => setFilter('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-black tracking-tight transition-all duration-200 ${
              filter === 'all' 
                ? 'bg-slate-900 text-white shadow' 
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            🌟 전체 사례 보기
          </button>
          <button
            onClick={() => setFilter('social')}
            className={`px-5 py-2.5 rounded-full text-xs font-black tracking-tight transition-all duration-200 ${
              filter === 'social' 
                ? 'bg-miso-blue-600 text-white shadow' 
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            🏛 사회적연대금융 사례
          </button>
          <button
            onClick={() => setFilter('business')}
            className={`px-5 py-2.5 rounded-full text-xs font-black tracking-tight transition-all duration-200 ${
              filter === 'business' 
                ? 'bg-miso-navy-600 text-white shadow' 
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            🏪 자영업 동네 소상공인 사례
          </button>
          <button
            onClick={() => setFilter('youth')}
            className={`px-5 py-2.5 rounded-full text-xs font-black tracking-tight transition-all duration-200 ${
              filter === 'youth' 
                ? 'bg-indigo-600 text-white shadow' 
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            🌱 청년 미래이음 사례
          </button>
          <button
            onClick={() => setFilter('vulnerable')}
            className={`px-5 py-2.5 rounded-full text-xs font-black tracking-tight transition-all duration-200 ${
              filter === 'vulnerable' 
                ? 'bg-rose-600 text-white shadow' 
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            🤝 금융취약계층 지원 사례
          </button>
        </div>

        {/* 그리드 정렬 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <AnimatePresence mode="popLayout">
            {filteredCases.map((c) => (
              <motion.div
                key={c.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all relative flex flex-col justify-between"
              >
                {/* 카드 본문 */}
                <div id="case-business" className="space-y-6">
                  
                  {/* 카테고리 태그 */}
                  <div id="case-youth" className="flex justify-between items-center text-xs">
                    <span className={`font-black px-3 py-1 rounded-md text-[10px] uppercase ${
                      c.category === 'social' ? 'bg-miso-blue-50 text-miso-blue-700 border border-miso-blue-100' :
                      c.category === 'business' ? 'bg-miso-navy-50 text-miso-navy-700 border border-miso-navy-100' :
                      c.category === 'youth' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' :
                      'bg-rose-50 text-rose-700 border border-rose-100'
                    }`}>
                      {c.category === 'social' && '사회연대금융'}
                      {c.category === 'business' && '사업자 운영자금'}
                      {c.category === 'youth' && '청년 미래이음'}
                      {c.category === 'vulnerable' && '금융취약 생계자금'}
                    </span>
                    <span id="case-vulnerable" className="text-slate-400 font-bold flex items-center gap-1 font-mono">
                      <MapPin className="w-3.5 h-3.5" />
                      {c.location}
                    </span>
                  </div>

                  <div className="space-y-2 relative pl-6">
                    <Quote className="w-5 h-5 text-slate-200 absolute left-0 top-0.5" />
                    <h3 className="font-extrabold text-slate-900 text-lg tracking-tight leading-snug">
                      {c.title}
                    </h3>
                  </div>

                  {/* 전/후 스토리 슬라이딩 */}
                  <div className="space-y-3.5 text-xs bg-slate-50 p-4.5 rounded-2xl border border-slate-100 leading-relaxed font-semibold">
                    <div>
                      <span className="text-amber-600 block font-bold">🚫 당면한 자금 장벽</span>
                      <p className="text-slate-500 mt-1">{c.problem}</p>
                    </div>
                    <div>
                      <span className="text-miso-blue-600 block font-bold">💡 미소금융대구중구법인의 손길</span>
                      <p className="text-slate-600 mt-1">{c.solution}</p>
                    </div>
                  </div>

                </div>

                {/* 하단 화자 사인 */}
                <div className="flex justify-between items-center pt-6 border-t border-slate-100/70 mt-6">
                  <div>
                    <span className="block font-black text-slate-800 text-sm">{c.author}</span>
                    <p className="text-miso-blue-600 font-bold text-[10px] mt-0.5 flex items-center gap-1 uppercase">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>성실 상환 진행 중</span>
                    </p>
                  </div>
                  <div className="w-9 h-9 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center text-rose-500 shadow-inner">
                    <Heart className="w-4 h-4 fill-rose-500" />
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 하단 기부 및 희망 고취 문구 배너 */}
        <div className="bg-slate-900 text-white p-8 md:p-12 rounded-3xl relative overflow-hidden text-left shadow-xl">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-miso-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center text-[10px] font-black tracking-widest text-miso-blue-300 bg-white/10 px-2.5 py-1 rounded">
              A Warm Promise of Co-prosperity
            </span>
            <h4 className="text-xl md:text-2xl font-black tracking-tight leading-snug">
              &ldquo;여러분이 갚으신 이자는, <br className="sm:hidden" />다음 자영업자에게 도움이 됩니다.&rdquo;
            </h4>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-medium">
              (사)미소금융대구중구법인의 운용자금은 영리 목적의 회수기금이 아닙니다. <br />
              성실하게 갚아주시는 원금과 연 4.5% 수준의 이자는 서민금융진흥원 재원으로 다시 모여, <br />
              어려움을 겪는 다른 대구 소상공인을 지원하는 자금으로 순환됩니다.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
