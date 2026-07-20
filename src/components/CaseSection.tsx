/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Sparkles, Star, MapPin, Heart, ChevronRight } from 'lucide-react';
import { CaseStudy } from '../types';

interface CaseSectionProps {
  initialFilter?: string;
}

export default function CaseSection({ initialFilter }: CaseSectionProps) {
  const [filter, setFilter] = useState<string>(initialFilter || 'all');

  useEffect(() => {
    if (initialFilter) setFilter(initialFilter);
  }, [initialFilter]);

  const cases: CaseStudy[] = [
    {
      id: 'social-1',
      category: 'social',
      image: '/images/case-social-1.webp',
      title: '발달장애인 10명의 월급날, 더 이상 한숨이 없습니다',
      problem: '대구 남산동에서 발달장애인 10명과 함께 제과제빵 사회적기업을 운영하고 있습니다. 보조금이 들어오기 전 급여일마다 통장을 보며 한숨만 나왔어요. 담보가 없다고 하니 은행에서는 상담도 제대로 안 해주더라고요.',
      solution: '미소금융에 전화했더니 사회적기업 서류와 신보 가치평가 등을 바탕으로 상담·심사를 진행한다고 했습니다. 공동인증서 챙겨서 방문했고, 심사 결과에 따라 무보증으로 운영자금을 지원받을 수 있었어요.',
      effect: '거치 기간 2년 동안 제품 품질에만 집중할 수 있었습니다. 이제는 월급날이 두렵지 않아요.',
      author: '김○○ 대표 (인증 사회적기업 운영)',
      location: '대구 남구'
    },
    {
      id: 'social-2',
      category: 'social',
      image: '/images/case-social-2.webp',
      title: '신규 협동조합도 문턱 없이 자금을 받을 수 있었습니다',
      problem: '돌봄 서비스를 하고 싶어서 사회적협동조합을 설립했는데, 설립한 지 얼마 안 됐다는 이유로 은행에서는 상담조차 거절당했습니다. 조합원들 모두 처음엔 포기할까 생각했어요.',
      solution: '미소금융대구중구법인을 찾아갔더니 조합 서류와 사회적 가치 평가 등을 바탕으로 심사를 진행해 주었습니다. 심사 결과에 따라 담보 없이 운영자금을 지원받을 수 있었고, 덕분에 조합 운영을 이어갈 수 있었습니다.',
      effect: '초기 시설 구비 및 인건비 조달을 메우고, 조합원이 대폭 증대되어 남구 시민 돌봄 복지의 어엿한 중심축이 되었습니다.',
      author: '이○○ 이사장 (50대 대표 조합원)',
      location: '대구 남구'
    },
    {
      id: 'business-1',
      category: 'business',
      image: '/images/case-business-1.webp',
      title: '반찬가게 10년, 사금융 전화 누르기 직전에 미소금융을 알았습니다',
      problem: '반찬가게를 10년째 운영했는데 코로나 이후로 식재료 값은 오르고 매출은 줄어서 재료도 절반밖에 못 사는 상황이었어요. 매일 밤 사채 광고 문자를 보면서 전화를 눌러야 하나 고민했습니다.',
      solution: '지인 소개로 통장 내역과 사업자등록증을 챙겨서 방문했습니다. 카드 매출 내역 등을 바탕으로 심사를 진행했고, 필요한 자금을 지원받을 수 있었어요. 그때 전화 안 누른 게 정말 다행입니다.',
      effect: '대부업 유혹에 넘어가기 전, 정직한 연 4.5% 수준의 자금으로 재료를 충분히 확보하니 단골손님도 다시 늘어 안정을 되찾았습니다.',
      author: '이○○ 사장 (60대, ○○반찬)',
      location: '대구 중구 남산동'
    },
    {
      id: 'business-2',
      category: 'business',
      image: '/images/case-business-2.webp',
      title: '개업 3개월, 자금이 바닥났는데 청년 우대 한도로 숨통이 트였습니다',
      problem: '동성로에 수제버거 가게를 열었는데 개업 초반부터 인테리어 대출 상환과 재료비가 한꺼번에 밀려왔어요. 거래 이력이 짧다는 이유로 은행에서는 상담조차 안 해줬습니다.',
      solution: '개업 3개월이 지나고 미소금융 청년 자영업자 우대 한도(최대 3,000만원)를 알게 됐습니다. 카드 정산 내역을 챙겨서 상담받았고, 심사를 거쳐 지원받을 수 있었습니다. 덕분에 재료를 제대로 갖추고 장사를 이어갈 수 있었습니다.',
      effect: '넉넉한 운영자금 덕분에 좋은 재료를 안정적으로 공급받게 되었고, 매달 건전하게 사업을 꾸려가며 대구의 인기 매장으로 자리잡아 가고 있습니다.',
      author: '박○○ 사장 (34세, ○○버거)',
      location: '대구 중구'
    },
    {
      id: 'youth-1',
      category: 'youth',
      image: '/images/case-youth-1.webp',
      title: '아르바이트생 신분으로도 첫 대출, 브랜드 런칭까지 할 수 있었습니다',
      problem: '디자이너로 독립해서 내 브랜드를 만들고 싶었는데, 아르바이트생 신분에 금융 거래 이력도 없다 보니 은행이나 카드사에서는 아예 상담이 안 됐어요. 자금이 없으니 시작 자체가 막막했습니다.',
      solution: '청년미래이음 신청을 하면서 「청년 모두를 위한 재무상담」도 함께 이수했습니다. 담당자분이 소득 증빙 방법을 친절하게 안내해 주셔서 어렵지 않게 진행할 수 있었어요.',
      effect: '6년이라는 긴 거치 기간 덕분에 초기 상환 부담을 덜고 브랜드 준비에 전념할 수 있었고, 마침내 독립할 수 있었습니다.',
      author: '최○○ 디자이너 (20대 패션 디자이너)',
      location: '대구 중구'
    },
    {
      id: 'youth-2',
      category: 'youth',
      image: '/images/case-youth-2.webp',
      title: '취업 준비 중 카드 한도가 바닥났는데, 사채 대신 미소금융을 선택했습니다',
      problem: '대학 마지막 학기에 면접비, 시험 응시료가 계속 나가다 보니 카드 한도가 다 찼어요. 단기 사채 광고 문자가 매일 와서 손이 갈 뻔했습니다.',
      solution: '청년미래이음을 알게 돼서 구직 계획서와 아르바이트 소득 내역을 챙겨 상담받았습니다. 상담과 심사를 거쳐 지원받을 수 있었고, 취업 준비를 끝까지 마칠 수 있었어요.',
      effect: '면접 복장 마련과 토익 응시료 부담을 덜 수 있었고, 이후 취업에 성공해 성실히 상환하고 있습니다.',
      author: '김○○ 사원 (20대 취업인)',
      location: '대구 남구'
    },
    {
      id: 'vulnerable-1',
      category: 'vulnerable',
      image: '/images/case-vulnerable-1.webp',
      title: '아이 수술비가 갑자기 수백만 원, 미소금융이 버팀목이 됐습니다',
      problem: '편의점 알바로 아이 둘을 혼자 키우고 있었는데, 큰 아이가 갑자기 장 수술을 받아야 한다는 연락이 왔어요. 수백만 원이 갑자기 필요한데 방법이 없었습니다.',
      solution: '사회복지센터 선생님 소개로 미소금융 생계자금을 알게 됐습니다. 한부모가정 서류를 챙겨서 상담받았고, 심사를 거쳐 생계자금을 지원받을 수 있었어요. 그 돈으로 아이 수술을 제때 받을 수 있었습니다.',
      effect: '아이는 무사히 퇴원해 학교에 다니고 있으며, 정책자금 이용을 통해 힘든 시기를 지나올 수 있었습니다.',
      author: '이○○ 회원 (40대, 한부모가정)',
      location: '대구 중구'
    },
    {
      id: 'vulnerable-2',
      category: 'vulnerable',
      image: '/images/case-vulnerable-2.webp',
      title: '보이스피싱으로 모든 게 무너졌는데, 미소금융으로 다시 일어설 수 있었습니다',
      problem: '보이스피싱 피해를 당하고 나서 신용도 망가지고 월세도 몇 달째 못 내다가 퇴거 통지서까지 받았어요. 어디에도 기댈 곳이 없어서 정말 힘든 시간이었습니다.',
      solution: '통합지원센터에서 미소금융 생계자금을 안내해 주었습니다. 보이스피싱 피해 관련 서류를 챙겨서 접수했고, 심사를 거쳐 지원받을 수 있었어요. 그 자금으로 밀린 임차료를 해결하고 생활을 다시 시작할 수 있었습니다.',
      effect: '밀린 임차료를 모두 갚았으며, 연 4.5% 원리금 균등분할 상환으로 안정적인 일상을 되찾았습니다.',
      author: '한○○ 고객 (50대, 새 출발 중)',
      location: '대구 수성구'
    }
  ];

  const filteredCases = filter === 'all' ? cases : cases.filter((c) => c.category === filter);

  return (
    <section className="py-12 md:py-16 bg-slate-50">
      <div id="case-social" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* 필터 칩 */}
        <div className="flex flex-wrap justify-center gap-2.5">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-black tracking-tight transition-all duration-200 ${
              filter === 'all'
                ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            🌟 전체 사례 보기
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter('social')}
            className={`px-5 py-2.5 rounded-full text-xs font-black tracking-tight transition-all duration-200 ${
              filter === 'social'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/20'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            🏛 사회연대금융 사례
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter('business')}
            className={`px-5 py-2.5 rounded-full text-xs font-black tracking-tight transition-all duration-200 ${
              filter === 'business'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            🏪 자영업 동네 소상공인 사례
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter('youth')}
            className={`px-5 py-2.5 rounded-full text-xs font-black tracking-tight transition-all duration-200 ${
              filter === 'youth'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            🌱 청년 미래이음 사례
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter('vulnerable')}
            className={`px-5 py-2.5 rounded-full text-xs font-black tracking-tight transition-all duration-200 ${
              filter === 'vulnerable'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            🤝 금융배려계층 상담사례
          </motion.button>
        </div>

        {/* 그리드 정렬 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <AnimatePresence mode="popLayout">
            {filteredCases.map((c) => (
              <motion.div
                key={c.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -6 }}
                className="group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-300/40 hover:border-slate-200 transition-all duration-300 relative flex flex-col justify-between"
              >
                {/* 물밑에 비실용적인 기하학적 요소 제거, 정갈하게 카드 형태로만 처리 */}
                <div className="space-y-6">

                  {/* 재구성 사례 배지 */}
                  <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-500 text-[10px] font-bold px-2.5 py-1 rounded-md">
                    📝 이해를 돕기 위한 재구성 사례
                  </span>

                  {/* 케이스 이미지 */}
                  {c.image && (
                    <div className="w-full rounded-2xl overflow-hidden bg-slate-50">
                      <img
                        src={c.image}
                        alt={c.title}
                        loading="lazy"
                        className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  {/* 카테고리 태그 */}
                  <div className="flex justify-between items-center text-xs">
                    <span className={`font-black px-3 py-1 rounded-md text-[10px] uppercase ${
                      c.category === 'social' ? 'bg-teal-50 text-teal-700 border border-teal-100' :
                      c.category === 'business' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                      c.category === 'youth' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' :
                      'bg-rose-50 text-rose-700 border border-rose-100'
                    }`}>
                      {c.category === 'social' && '사회연대금융'}
                      {c.category === 'business' && '사업자 운영자금'}
                      {c.category === 'youth' && '청년 미래이음'}
                      {c.category === 'vulnerable' && '금융취약 생계자금'}
                    </span>
                    <span className="text-slate-400 font-bold flex items-center gap-1 font-mono">
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
                      <span className="text-teal-600 block font-bold">💡 미소금융대구중구법인의 손길</span>
                      <p className="text-slate-600 mt-1">{c.solution}</p>
                    </div>
                  </div>

                </div>

                {/* 하단 화자 사인 */}
                <div className="flex justify-between items-center pt-6 border-t border-slate-100/70 mt-6">
                  <div>
                    <span className="block font-black text-slate-850 text-sm">{c.author}</span>
                    <p className="text-teal-600 font-bold text-[10px] mt-0.5 flex items-center gap-1 uppercase">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>
                        {c.category === 'youth' || c.category === 'vulnerable'
                          ? '성실 상환 중'
                          : '성실 상환 중 · 현재 정상 운영'}
                      </span>
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

        <p className="text-slate-500 text-xs text-center -mt-4 leading-relaxed">
          ※ 위 사진과 사례는 이해를 돕기 위해 재구성한 예시이며, 실제 고객 및 승인 결과가 아닙니다. 대출 가능 여부·한도·금리는 개인별 심사 결과에 따라 달라집니다.
        </p>

        {/* 하단 기부 및 희망 고취 문구 배너 */}
        <div className="bg-slate-900 text-white p-8 md:p-12 rounded-3xl relative overflow-hidden text-left shadow-xl">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center text-[10px] font-black tracking-widest text-teal-300 bg-white/10 px-2.5 py-1 rounded">
              함께 성장하는 서민금융
            </span>
            <h4 className="text-xl md:text-2xl font-black tracking-tight leading-snug">
              &ldquo;갚아 주신 원금은 다음 분의 대출 재원이 됩니다&rdquo;
            </h4>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-medium">
              저희 법인의 대출 재원은 서민금융진흥원이 조성한 공익 자금입니다. <br />
              성실히 갚아 주신 원금은 서민금융진흥원으로 돌아가, <br />
              경제적으로 어려운 다른 대구 시민의 자립 지원을 위한 대출 재원으로 활용됩니다.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
