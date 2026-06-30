/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Award, Briefcase, Calendar, MapPin, Bus, Train, Car, Phone, Share2, Printer, ExternalLink } from 'lucide-react';

const PHONES = [
  { number: '053-252-6408', chip: 'bg-rose-100 text-rose-700',    bg: 'from-rose-500 to-pink-500' },
  { number: '053-252-6409', chip: 'bg-indigo-100 text-indigo-700', bg: 'from-indigo-500 to-violet-500' },
  { number: '053-252-6479', chip: 'bg-teal-100 text-teal-700',    bg: 'from-teal-500 to-emerald-500' },
  { number: '053-252-6480', chip: 'bg-amber-100 text-amber-700',  bg: 'from-amber-500 to-orange-500' },
];

export default function AboutSection({ sectionId }: { sectionId?: string }) {
  const show = (ids: string | string[]) =>
    !sectionId || (Array.isArray(ids) ? ids.includes(sectionId) : sectionId === ids);

  const [phoneIdx, setPhoneIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setPhoneIdx(prev => (prev + 1) % PHONES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);
  const historyData = [
    {
      year: '2026',
      items: [
        { date: '07.00', text: '미소금융대구중구법인 홈페이지 개설', emphasis: true }
      ]
    },
    {
      year: '2025',
      items: [
        { date: '07.02', text: '사무실 임대차계약 연장 (3년) 체결', emphasis: false }
      ]
    },
    {
      year: '2023',
      items: [
        { date: '04.01', text: '신중년 사회공헌사업단 시범운영 개시', emphasis: false }
      ]
    },
    {
      year: '2022',
      items: [
        { date: '08.01', text: '현 사무소 이전 (남구 중앙대로 146, 하나은행 봉덕지점 4층)', emphasis: false }
      ]
    },
    {
      year: '2019',
      items: [
        { date: '06.17', text: '대구서민금융통합지원센터 지역협의체 출범 참가', emphasis: false }
      ]
    },
    {
      year: '2018',
      items: [
        { date: '08.31', text: '전국 미소금융 법인 최초 사회적경제기업 1호 대출 지원', emphasis: true, newsUrl: 'https://www.yna.co.kr/view/AKR20180831135900002' },
        { date: '10.30', text: '제3회 금융의 날 기념식 서민금융부문 수상 (김석동 대표)', emphasis: true, newsUrl: 'https://www.skyedaily.com/news/news_view.html?ID=78486' }
      ]
    },
    {
      year: '2015',
      items: [
        { date: '12.28', text: '대구서민금융통합지원센터 개소 업무 협력 및 참가', emphasis: false }
      ]
    },
    {
      year: '2013',
      items: [
        { date: '02.13', text: '대구신용보증재단 업무 연계 협약(MOU) 체결', emphasis: false },
        { date: '06.06', text: '사무소 이전 (중구 경상감영길 제일은행 대구지점 4층)', emphasis: false }
      ]
    },
    {
      year: '2012',
      items: [
        { date: '01.25', text: '대구광역시 예비사회적기업 정식 지정', emphasis: false },
        { date: '05.10', text: '대구광역시 서민금융지원 다자간 업무 협약(MOU) 체결', emphasis: false },
        { date: '12.12', text: '서민금융 활성화 유공 대통령 표창 수상', emphasis: true, newsUrl: 'https://www.imaeil.com/page/view/2013010507401495165' }
      ]
    },
    {
      year: '2010',
      items: [
        { date: '04.27', text: '금융위원회 비영리사단법인 설립 허가 인가', emphasis: false },
        { date: '05.06', text: '사단법인 미소금융대구중구법인 설립 등기 완료', emphasis: false },
        { date: '05.28', text: '공식 영업 개시 및 서민금융대출 개시', emphasis: true }
      ]
    }
  ];

  return (
    <section className="pt-4 pb-20 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

        {/* 이사장 인사말 */}
        {show(['ceo-greeting', 'about-miso']) && <div id="ceo-greeting" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-slate-50 p-8 md:p-14 rounded-3xl border border-slate-100">
          <div className="lg:col-span-4 text-center">
            <div className="w-52 h-52 bg-slate-100 rounded-2xl mx-auto overflow-hidden shadow-md border-4 border-white">
              <img src="/ceo-photo.jpg" alt="대표이사" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            </div>
          </div>

          <div className="lg:col-span-8 text-left space-y-6">
            <span className="text-xs font-black tracking-widest text-teal-600 uppercase">Ceo Greeting</span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              &ldquo;대구 지역 소상공인의 든든한 버팀목이 되겠습니다.&rdquo;
            </h3>
            <div className="h-1 w-20 bg-teal-600 rounded-full" />
            
            <div className="text-slate-600 text-base md:text-lg leading-relaxed space-y-4">
              <p>안녕하십니까, <strong>(사)미소금융대구중구법인</strong> 대표 <strong>김석동</strong>입니다.</p>
              <p>
                열심히 일하고 계시지만 은행 문턱이 높아 막막하셨던 소상공인·자영업자 여러분께 먼저 인사드립니다.
              </p>
              <p>
                저희 법인은 금융위원회 허가를 받은 비영리 공익법인으로, <strong>서민금융진흥원의 공식 사업수행기관으로서</strong> 대구 지역 서민의 경제적 자립을 지원하고 있습니다. 담보나 보증 없이도 자활 의지를 바탕으로 이용하실 수 있도록, 전문 여신심사 위원이 직접 현장을 방문하여 여러분의 상황을 꼼꼼히 살피고 있습니다.
              </p>
              <p>
                장기화되는 경기 침체 속에서도 묵묵히 내일을 준비하시는 여러분의 노력이 헛되지 않도록, 저희 법인은 막중한 책임감을 갖고 투명하고 성실하게 업무에 임하겠습니다.
              </p>
              <p className="font-semibold text-slate-800">
                다시 일어서고자 하는 의지가 있으시다면, 언제든지 저희 법인의 문을 두드려 주십시오. 여러분의 새 출발에 함께하겠습니다.
              </p>
            </div>

            <p className="text-right text-slate-800 font-extrabold text-base pt-4 decoration-teal-600 decoration-2">
              (사)미소금융대구중구법인 대표 <span className="text-teal-600 font-black text-lg">김 석 동</span>
            </p>
          </div>
        </div>}

        {/* 법인 조직도 (공공기관 형식 CSS/SVG 다이어그램) */}
        {show('organization') && <div id="organization" className="text-center space-y-8 bg-white p-4 md:p-12 rounded-3xl border border-slate-100 shadow-sm">
          <div className="space-y-2">
            <span className="text-xs font-bold text-teal-600 tracking-widest uppercase">Organization Chart</span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight">조직도</h3>
            <p className="text-slate-500 text-xs">법인 운영 조직 및 업무 분장</p>
          </div>

          {/* 모바일 조직도 카드 레이아웃 */}
          <div className="md:hidden space-y-2 text-left">
            {/* 사원총회 */}
            <div className="bg-slate-800 text-white text-center py-2.5 rounded-xl font-bold text-sm">사원총회</div>
            <div className="flex justify-center"><div className="w-0.5 h-4 bg-slate-300"/></div>
            {/* 이사회 + 감사 */}
            <div className="flex gap-2">
              <div className="flex-1 bg-slate-700 text-white text-center py-2 rounded-lg font-bold text-sm">이사회</div>
              <div className="w-24 bg-amber-500 text-white text-center py-2 rounded-lg font-bold text-sm">감사</div>
            </div>
            <div className="flex justify-start pl-[calc(50%-1px)]"><div className="w-0.5 h-4 bg-slate-300"/></div>
            {/* 이사장 */}
            <div className="bg-teal-600 text-white text-center py-3 rounded-xl font-extrabold text-base">이사장 (대표)</div>
            <div className="flex justify-center"><div className="w-0.5 h-4 bg-slate-300"/></div>
            {/* 융자위원회 */}
            <div className="bg-indigo-600 text-white text-center py-2 rounded-lg font-bold text-sm">융자위원회</div>
            <div className="flex justify-center"><div className="w-0.5 h-4 bg-slate-300"/></div>
            {/* 5개 부서 — 2열 그리드 */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-teal-50 border border-teal-200 rounded-lg py-2.5 text-center">
                <div className="text-teal-800 font-bold text-xs">전문위원</div>
                <div className="text-teal-600 text-[11px]">(여신심사 1팀)</div>
              </div>
              <div className="bg-teal-50 border border-teal-200 rounded-lg py-2.5 text-center">
                <div className="text-teal-800 font-bold text-xs">전문위원</div>
                <div className="text-teal-600 text-[11px]">(여신심사 2팀)</div>
              </div>
              <div className="bg-teal-50 border border-teal-200 rounded-lg py-2.5 text-center">
                <div className="text-teal-800 font-bold text-xs">전문위원</div>
                <div className="text-teal-600 text-[11px]">(여신심사 3팀)</div>
              </div>
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg py-2.5 text-center">
                <div className="text-indigo-800 font-bold text-xs">전문위원</div>
                <div className="text-indigo-600 text-[11px]">(사업 행정기획)</div>
              </div>
              <div className="col-span-2 bg-rose-50 border border-rose-200 rounded-lg py-2.5 text-center">
                <div className="text-rose-800 font-bold text-xs">신중년 사회공헌단</div>
              </div>
            </div>
          </div>

          {/* PC 조직도 SVG (md 이상) */}
          <div className="hidden md:block overflow-x-auto py-6">
            <div style={{minWidth: '840px'}}>
              <svg viewBox="0 0 840 385" width="840" height="385" xmlns="http://www.w3.org/2000/svg" style={{display:'block', margin:'0 auto', fontFamily:'inherit'}}>

                {/* ── 연결선 ── */}

                {/* 사원총회(center=310) → T → 이사회(310) & 감사(620) */}
                <line x1="310" y1="48" x2="310" y2="78" stroke="#CBD5E1" strokeWidth="2"/>
                <line x1="310" y1="78" x2="620" y2="78" stroke="#CBD5E1" strokeWidth="2"/>
                <line x1="310" y1="78" x2="310" y2="105" stroke="#CBD5E1" strokeWidth="2"/>
                <line x1="620" y1="78" x2="620" y2="105" stroke="#CBD5E1" strokeWidth="2"/>

                {/* 이사회(310) → 이사장(310) */}
                <line x1="310" y1="145" x2="310" y2="178" stroke="#CBD5E1" strokeWidth="2"/>

                {/* 이사장(310) 하단 수직선 → y=248 분기점 → 우측 수평 → 융자위원회(715) */}
                <line x1="310" y1="226" x2="310" y2="285" stroke="#CBD5E1" strokeWidth="2"/>
                <line x1="310" y1="248" x2="715" y2="248" stroke="#CBD5E1" strokeWidth="2"/>
                <line x1="715" y1="248" x2="715" y2="260" stroke="#CBD5E1" strokeWidth="2"/>

                {/* 이사장(310) 하단 수직 → 수평바 y=285 → 5팀 */}
                <line x1="60"  y1="285" x2="560" y2="285" stroke="#CBD5E1" strokeWidth="2"/>
                <line x1="60"  y1="285" x2="60"  y2="300" stroke="#CBD5E1" strokeWidth="2"/>
                <line x1="185" y1="285" x2="185" y2="300" stroke="#CBD5E1" strokeWidth="2"/>
                <line x1="310" y1="285" x2="310" y2="300" stroke="#CBD5E1" strokeWidth="2"/>
                <line x1="435" y1="285" x2="435" y2="300" stroke="#CBD5E1" strokeWidth="2"/>
                <line x1="560" y1="285" x2="560" y2="300" stroke="#CBD5E1" strokeWidth="2"/>

                {/* ── 박스 ── */}

                {/* 사원총회 */}
                <rect x="210" y="8" width="200" height="40" rx="10" fill="#1E293B"/>
                <text x="310" y="33" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">사 원 총 회</text>

                {/* 이사회 */}
                <rect x="230" y="105" width="160" height="40" rx="8" fill="#334155"/>
                <text x="310" y="130" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">이 사 회</text>

                {/* 감사 */}
                <rect x="565" y="105" width="110" height="40" rx="8" fill="#F59E0B"/>
                <text x="620" y="130" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">감   사</text>

                {/* 이사장 */}
                <rect x="210" y="178" width="200" height="48" rx="10" fill="#0D9488"/>
                <text x="310" y="207" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">이 사 장 (대표)</text>

                {/* 융자위원회 — 신중년(right=615)과 간격 확보: x=635 */}
                <rect x="635" y="260" width="160" height="42" rx="8" fill="#4F46E5"/>
                <text x="715" y="286" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">융 자 위 원 회</text>

                {/* 전문위원 여신심사 1팀 — teal */}
                <rect x="5"   y="300" width="110" height="60" rx="8" fill="#F0FDFA" stroke="#5EEAD4" strokeWidth="1.5"/>
                <text x="60"  y="323" textAnchor="middle" fill="#0F766E" fontSize="11" fontWeight="bold">전문위원</text>
                <text x="60"  y="344" textAnchor="middle" fill="#0D9488" fontSize="10">(여신심사 1팀)</text>

                {/* 전문위원 여신심사 2팀 — teal (동일) */}
                <rect x="130" y="300" width="110" height="60" rx="8" fill="#F0FDFA" stroke="#5EEAD4" strokeWidth="1.5"/>
                <text x="185" y="323" textAnchor="middle" fill="#0F766E" fontSize="11" fontWeight="bold">전문위원</text>
                <text x="185" y="344" textAnchor="middle" fill="#0D9488" fontSize="10">(여신심사 2팀)</text>

                {/* 전문위원 여신심사 3팀 — teal (동일) */}
                <rect x="255" y="300" width="110" height="60" rx="8" fill="#F0FDFA" stroke="#5EEAD4" strokeWidth="1.5"/>
                <text x="310" y="323" textAnchor="middle" fill="#0F766E" fontSize="11" fontWeight="bold">전문위원</text>
                <text x="310" y="344" textAnchor="middle" fill="#0D9488" fontSize="10">(여신심사 3팀)</text>

                {/* 전문위원 사업 행정기획 — indigo */}
                <rect x="380" y="300" width="110" height="60" rx="8" fill="#EEF2FF" stroke="#A5B4FC" strokeWidth="1.5"/>
                <text x="435" y="323" textAnchor="middle" fill="#3730A3" fontSize="11" fontWeight="bold">전문위원</text>
                <text x="435" y="344" textAnchor="middle" fill="#4F46E5" fontSize="10">(사업 행정기획)</text>

                {/* 신중년 사회공헌단 — rose */}
                <rect x="505" y="300" width="110" height="60" rx="8" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="1.5"/>
                <text x="560" y="323" textAnchor="middle" fill="#9F1239" fontSize="11" fontWeight="bold">신중년</text>
                <text x="560" y="344" textAnchor="middle" fill="#E11D48" fontSize="10">(사회공헌단)</text>

              </svg>
            </div>
          </div>

        </div>}

        {/* 법인 연혁 (스마트 타임라인 카드) */}
        {show('history') && <div id="history" className="space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-teal-600 font-bold text-sm tracking-widest uppercase">History Timeline</span>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">대구 미소금융의 15년 발자취</h3>
            <p className="text-slate-500 text-sm max-w-2xl mx-auto">
              2010년 설립 이래 오직 자영업자와 서민의 재기를 위해 걸어온 영광스러운 순간입니다.
            </p>
          </div>

          {/* PC 레이아웃 (md 이상) */}
          <div className="hidden md:block overflow-x-auto pb-4">
            <div style={{ minWidth: '600px' }}>
              <div className="relative border-l-2 border-slate-200 ml-40 py-4">
                {historyData.map((milestone, idx) => (
                  <div key={idx} className="mb-14 last:mb-0 relative">
                    <div className="absolute -left-[176px] top-0 w-40 text-right">
                      <span className="text-2xl font-black text-slate-800 tracking-tight font-mono">{milestone.year}</span>
                    </div>
                    <div className="absolute -left-[9px] top-2.5 w-4 h-4 rounded-full bg-white border-4 border-teal-600 shadow-md" />
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm ml-6 hover:shadow-md transition-shadow">
                      <ul className="space-y-3.5">
                        {milestone.items.map((item, id) => (
                          <li key={id} className="flex items-start space-x-3 text-left">
                            <span className="text-xs font-bold text-slate-400 font-mono tracking-wider w-14 pt-1 flex-shrink-0">{item.date}</span>
                            <div className="flex-1 font-medium text-slate-700">
                              {item.emphasis ? (
                                <span className="inline-flex flex-wrap items-center gap-2">
                                  <span className="text-teal-600 font-bold bg-teal-50 px-2 py-0.5 rounded text-xs font-mono">핵심성과</span>
                                  <strong className="text-slate-900 font-bold">{item.text}</strong>
                                  {(item as any).newsUrl && (
                                    <a href={(item as any).newsUrl} target="_blank" rel="noopener noreferrer"
                                      className="inline-flex items-center space-x-1 bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100 text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors">
                                      <span>📰</span><span>신문기사 보기</span>
                                    </a>
                                  )}
                                </span>
                              ) : (
                                <span className="text-slate-600 text-sm">{item.text}</span>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 모바일 레이아웃 (md 미만) — 연도가 카드 상단에 표시, 세로 타임라인 */}
          <div className="md:hidden relative border-l-2 border-slate-200 ml-4 py-2">
            {historyData.map((milestone, idx) => (
              <div key={idx} className="mb-8 last:mb-0 relative pl-6">
                {/* 원형 동그라미 */}
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-4 border-teal-600 shadow-md" />
                {/* 연도 배지 */}
                <div className="mb-2">
                  <span className="text-lg font-black text-teal-700 font-mono">{milestone.year}</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <ul className="space-y-2.5">
                    {milestone.items.map((item, id) => (
                      <li key={id} className="text-left">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[11px] font-bold text-slate-400 font-mono">{item.date}</span>
                          {item.emphasis && (
                            <span className="text-teal-600 font-bold bg-teal-50 px-1.5 py-0.5 rounded text-[10px] font-mono">핵심성과</span>
                          )}
                        </div>
                        <div className="text-[12px] font-medium text-slate-700 leading-snug">
                          {item.emphasis ? (
                            <span className="inline-flex flex-wrap items-center gap-1.5">
                              <strong className="text-slate-900">{item.text}</strong>
                              {(item as any).newsUrl && (
                                <a href={(item as any).newsUrl} target="_blank" rel="noopener noreferrer"
                                  className="inline-flex items-center space-x-0.5 bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                  <span>📰</span><span>기사</span>
                                </a>
                              )}
                            </span>
                          ) : (
                            <span className="text-slate-600">{item.text}</span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

        </div>}

        {/* 오시는 길 지도 서비스 및 역 안내 */}
        {show('location') && <div id="location" className="space-y-8 bg-slate-50 px-4 py-6 md:p-14 rounded-3xl border border-slate-100 text-left">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            
            <div className="space-y-6">
              <span className="text-xs font-black tracking-widest text-teal-600 uppercase">Way to Come</span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">대구중구법인 오시는 길</h3>
              <p className="text-slate-600 font-medium text-base md:text-lg leading-relaxed">
                대구광역시 남구 하나은행 봉덕지점 건물 4층에 위치합니다. <br />
                지하철·버스 접근이 편리하며, 방문 상담을 환영합니다.
              </p>

              <div className="space-y-4 pt-2">
                
                <div className="flex items-start space-x-3 text-base">
                  <div className="p-1.5 bg-teal-50 rounded text-teal-700 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-slate-800">상세 주소</h5>
                    <p className="text-slate-500 font-medium mt-0.5">대구광역시 남구 중앙대로 146, 4층 (봉덕동, 하나은행 봉덕지점 건물)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-base">
                  <div className="p-1.5 bg-indigo-50 rounded text-indigo-700 mt-0.5">
                    <Train className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-slate-800">지하철 이용 시</h5>
                    <p className="text-slate-500 font-medium mt-0.5">
                      대구 지하철 1호선 <strong>영대병원역</strong> 3번 출구 도보 8분 <br />
                      대구 지하철 1호선 <strong>교대역</strong> 2번 출구 도보 10분
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-base">
                  <div className="p-1.5 bg-emerald-50 rounded text-emerald-700 mt-0.5">
                    <Bus className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-slate-800">일반 버스 노선</h5>
                    <p className="text-slate-500 font-medium mt-0.5">
                      대구고등학교 건너 정류장에 내리시면 바로 근처입니다 <br />
                      오는 버스: <strong>349, 405, 410, 503, 649</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-base">
                  <div className="p-1.5 bg-amber-50 rounded text-amber-600 mt-0.5">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-slate-800">자가용 이용 시</h5>
                    <p className="text-slate-500 font-medium mt-0.5">
                      하나은행 봉덕지점 <strong>뒤편 주차장</strong> 이용 시 <strong className="text-amber-600">무료 주차</strong> 가능합니다
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* 지도 박스 — 모바일: 텍스트 아래 / PC: 우측 */}
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-md">
              <a
                href="https://naver.me/GSQLkTiM"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
              >
                <img
                  src="/map-location.png"
                  alt="미소금융대구중구법인 위치 지도"
                  className="w-full h-80 object-cover"
                />
              </a>
              <div className="flex items-center justify-center mt-2 px-1">
                <a
                  href="https://naver.me/GSQLkTiM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-teal-600 text-white hover:bg-teal-700 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all flex items-center space-x-1"
                >
                  <span>📍 네이버 지도 열기</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>

          {/* 블로그 + 전화상담 — PC: 한 줄 나란히 / 모바일: 세로 순서 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* 법인 블로그 배너 */}
            <motion.a
              href="https://blog.naver.com/PostView.naver?blogId=eornwndrn1&logNo=224112219401&categoryNo=6&parentCategoryNo=&from=thumbnailList"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl px-5 py-4 shadow-md cursor-pointer group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm p-1.5">
                  <img src="/logos/naver_blog_logo.png" alt="네이버 블로그" className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="text-white font-extrabold text-sm leading-tight">법인 공식 블로그 보기</p>
                  <p className="text-white/80 text-[11px] mt-0.5 leading-tight">상세 방문 안내 및 대출 상품 정보를 확인하실 수 있습니다</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 bg-white text-teal-700 font-bold text-xs px-3 py-2 rounded-xl shadow-sm group-hover:bg-teal-50 transition-colors flex-shrink-0 ml-3">
                <span>방문하기</span>
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}>→</motion.span>
              </div>
            </motion.a>

            {/* 전화상담 버튼 — 4개 번호 순환 */}
            <motion.a
              href={`tel:${PHONES[phoneIdx].number}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={`relative flex items-center justify-between gap-3 bg-gradient-to-r ${PHONES[phoneIdx].bg} text-white font-extrabold py-4 px-5 rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-700`}
            >
              <motion.div
                className="absolute inset-0 bg-white/10 rounded-2xl"
                animate={{ opacity: [0, 0.2, 0] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              <motion.span
                className="text-2xl relative z-10 flex-shrink-0"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
              >☎️</motion.span>
              <div className="relative z-10 flex-1 text-center min-w-0">
                <div className="text-[11px] font-bold text-white/80 tracking-widest uppercase mb-1">지금 바로 전화상담</div>
                <div className="relative h-8 overflow-hidden">
                  {PHONES.map((p, pi) => (
                    <motion.div
                      key={p.number}
                      animate={{
                        y: pi === phoneIdx ? 0 : pi === (phoneIdx - 1 + PHONES.length) % PHONES.length ? -32 : 32,
                        opacity: pi === phoneIdx ? 1 : 0,
                      }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <span className={`${p.chip} text-base font-black tracking-tight whitespace-nowrap px-3 py-1 rounded-lg`}>
                        {p.number}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <motion.span
                className="text-lg relative z-10 flex-shrink-0"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
              >👆</motion.span>
            </motion.a>
          </div>

        </div>}

      </div>
    </section>
  );
}
