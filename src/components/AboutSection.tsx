/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Award, Briefcase, Calendar, MapPin, Bus, Train, Phone, Share2, Printer, ExternalLink } from 'lucide-react';

export default function AboutSection() {
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
        { date: '08.31', text: '전국 미소금융 법인 최초 사회적경제기업 1호 대출 지원', emphasis: true }
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
        { date: '12.12', text: '서민금융 활성화 유공 대통령 표창 수상', emphasis: true }
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* 이사장 인사말 */}
        <div id="ceo-greeting" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-slate-50 p-8 md:p-14 rounded-3xl border border-slate-100">
          <div className="lg:col-span-4 text-center space-y-4">
            <div className="relative inline-block">
              <div className="w-52 h-52 bg-slate-200 rounded-2xl mx-auto overflow-hidden shadow-md border-4 border-white flex items-center justify-center text-teal-700 bg-gradient-to-tr from-teal-50 to-teal-100">
                <span className="text-4xl font-extrabold font-mono">김 석 동</span>
              </div>
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-teal-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
                법인 대표이사
              </div>
            </div>
            
            <div className="pt-2">
              <h4 className="text-slate-800 font-extrabold text-lg">김석동 대표</h4>
              <p className="text-slate-500 text-xs mt-1 font-semibold">(사)미소금융대구중구법인</p>
            </div>
          </div>

          <div className="lg:col-span-8 text-left space-y-6">
            <span className="text-xs font-black tracking-widest text-teal-600 uppercase">Ceo Greeting</span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              &ldquo;대구 지역 소상공인의 든든한 버팀목이 되겠습니다.&rdquo;
            </h3>
            <div className="h-1 w-20 bg-teal-600 rounded-full" />
            
            <div className="text-slate-600 text-sm md:text-base leading-relaxed space-y-4">
              <p>안녕하십니까, <strong>(사)미소금융대구중구법인</strong> 대표 <strong>김석동</strong>입니다.</p>
              <p>
                쉼 없는 노력에도 불구하고, 현실의 높은 금융 문턱과 상업 제도의 가로막힘 속에서 차갑게 좌절을 경험하시는 대구지역 수많은 자영업자, 영세상인, 소상공인 여러분이 계십니다.
              </p>
              <p>
                저희 법인은 제도권 1금융 내지 2금융의 가입 기준을 넘기 어려운 소외된 이웃분들에게 경제적 독립과 자립의 확실한 초석을 마련해 드리기 위해 설립된 <strong>금융위원회 산하 서민금융진흥원 사업수행기관</strong>입니다.
              </p>
              <p>
                단순히 일정한 한도의 자금 대지급이라는 일방향적이고 단편적인 역할을 넘어, 여러분이 마주한 고단한 삶의 영업 현장을 깊이 이해하고 실질적인 자활과 극복의 자양분을 함께 보살피는 것이 저희 대구중구법인의 핵심 사명이자 가치입니다.
              </p>
              <p className="font-semibold text-slate-800">
                다시 당당히 일어서고자 하는 확고한 의지와 자활 희망만 풍부하게 지니셨다면, 조건 없이 대구중구법인의 따뜻한 문을 똑똑히 두드려 주십시오.
              </p>
            </div>

            <p className="text-right text-slate-800 font-extrabold text-base pt-4 decoration-teal-600 decoration-2">
              (사)미소금융대구중구법인 대표 <span className="text-teal-600 font-black text-lg">김 석 동</span> 拜上
            </p>
          </div>
        </div>

        {/* 법인 조직도 (공공기관 형식 CSS/SVG 다이어그램) */}
        <div id="organization" className="text-center space-y-8 bg-white p-8 md:p-12 rounded-3xl border border-slate-100 shadow-sm">
          <div className="space-y-2">
            <span className="text-xs font-bold text-teal-600 tracking-widest uppercase">Organization Chart</span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight">조직도</h3>
            <p className="text-slate-500 text-xs">법인 운영 조직 및 업무 분장</p>
          </div>

          <div className="overflow-x-auto py-6">
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

                {/* 전문위원 여신심사 1팀 */}
                <rect x="5"   y="300" width="110" height="60" rx="8" fill="#F0FDFA" stroke="#5EEAD4" strokeWidth="1.5"/>
                <text x="60"  y="323" textAnchor="middle" fill="#0F766E" fontSize="11" fontWeight="bold">전문위원</text>
                <text x="60"  y="344" textAnchor="middle" fill="#0D9488" fontSize="10">(여신심사 1팀)</text>

                {/* 전문위원 여신심사 2팀 */}
                <rect x="130" y="300" width="110" height="60" rx="8" fill="#F0FDFA" stroke="#5EEAD4" strokeWidth="1.5"/>
                <text x="185" y="323" textAnchor="middle" fill="#0F766E" fontSize="11" fontWeight="bold">전문위원</text>
                <text x="185" y="344" textAnchor="middle" fill="#0D9488" fontSize="10">(여신심사 2팀)</text>

                {/* 전문위원 여신심사 3팀 */}
                <rect x="255" y="300" width="110" height="60" rx="8" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5"/>
                <text x="310" y="323" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="bold">전문위원</text>
                <text x="310" y="344" textAnchor="middle" fill="#64748B" fontSize="10">(여신심사 3팀)</text>

                {/* 전문위원 사업 행정기획 */}
                <rect x="380" y="300" width="110" height="60" rx="8" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5"/>
                <text x="435" y="323" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="bold">전문위원</text>
                <text x="435" y="344" textAnchor="middle" fill="#64748B" fontSize="10">(사업 행정기획)</text>

                {/* 신중년 사회공헌단 — right edge=615, 융자위원회 left=635, 간격 20px */}
                <rect x="505" y="300" width="110" height="60" rx="8" fill="#ECFDF5" stroke="#6EE7B7" strokeWidth="1.5"/>
                <text x="560" y="323" textAnchor="middle" fill="#065F46" fontSize="11" fontWeight="bold">신중년</text>
                <text x="560" y="344" textAnchor="middle" fill="#059669" fontSize="10">(사회공헌단)</text>

              </svg>
            </div>
          </div>
        </div>

        {/* 법인 연혁 (스마트 타임라인 카드) */}
        <div id="history" className="space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-teal-600 font-bold text-sm tracking-widest uppercase">History Timeline</span>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">대구 미소금융의 15년 발자취</h3>
            <p className="text-slate-500 text-sm max-w-2xl mx-auto">
              2010년 설립 이래 오직 자영업자와 서민의 재기를 위해 걸어온 영광스러운 순간입니다.
            </p>
          </div>

          <div className="relative border-l-2 border-slate-150 ml-6 md:ml-32 py-4">
            {historyData.map((milestone, idx) => (
              <div key={idx} className="mb-14 last:mb-0 relative">
                
                {/* 좌측 연도 벳지 */}
                <div className="absolute -left-[54px] md:-left-[152px] top-0 w-24 text-right hidden md:block">
                  <span className="text-2xl font-black text-slate-800 tracking-tight font-mono">{milestone.year}</span>
                </div>

                {/* 타임라인 원형 동그라미 데코 */}
                <div className="absolute -left-[39px] top-2.5 w-4 h-4 rounded-full bg-white border-4 border-teal-600 shadow-md transform -translate-x-1/2" />

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm md:ml-6 hover:shadow-md transition-shadow">
                  <span className="inline-block md:hidden text-lg font-extrabold text-teal-600 font-mono mb-2">
                    {milestone.year} 년
                  </span>
                  
                  <ul className="space-y-3.5">
                    {milestone.items.map((item, id) => (
                      <li key={id} className="flex flex-col sm:flex-row sm:items-start space-y-1 sm:space-y-0 text-left">
                        <span className="text-xs font-bold text-slate-400 font-mono tracking-wider w-14 pt-1">
                          {item.date}
                        </span>
                        <div className="flex-1 font-medium text-slate-700">
                          {item.emphasis ? (
                            <span className="inline-flex flex-wrap items-center">
                              <span className="text-teal-600 font-bold bg-teal-50 px-2 py-0.5 rounded text-xs mr-2 font-mono">핵심성과</span>
                              <strong className="text-slate-900 font-bold">{item.text}</strong>
                            </span>
                          ) : (
                            <span className="text-slate-600 text-sm md:text-base">{item.text}</span>
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

        {/* 오시는 길 지도 서비스 및 역 안내 */}
        <div id="location" className="space-y-8 bg-slate-50 p-8 md:p-14 rounded-3xl border border-slate-100 text-left">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            
            <div className="space-y-6">
              <span className="text-xs font-black tracking-widest text-teal-600 uppercase">Way to Come</span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">대구중구법인 오시는 길</h3>
              <p className="text-slate-600 font-medium text-sm md:text-base leading-relaxed">
                (사)미소금융대구중구법인은 대구광역시 남구에 위치하고 있습니다. <br />
                남구 소재의 하나은행 건물 4층으로 오시면 정성을 다해 직접 상담을 진행해 드립니다. <br />
                지하철 및 버스 노선이 편리하게 마련되어 있어 교통이 수월합니다.
              </p>

              <div className="space-y-4 pt-2">
                
                <div className="flex items-start space-x-3 text-sm">
                  <div className="p-1.5 bg-teal-50 rounded text-teal-700 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-slate-800">상세 주소</h5>
                    <p className="text-slate-500 font-medium mt-0.5">대구광역시 남구 중앙대로 146, 4층 (봉덕동, 하나은행 봉덕지점 건물)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-sm">
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

                <div className="flex items-start space-x-3 text-sm">
                  <div className="p-1.5 bg-emerald-50 rounded text-emerald-700 mt-0.5">
                    <Bus className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-slate-800">일반 버스 노선</h5>
                    <p className="text-slate-500 font-medium mt-0.5">
                      대구고등학교 건너 정류장에 내리시면 바로 근처입니다 <br />
                      오는 버스: 349, 405, 410, 503, 649
                    </p>
                  </div>
                </div>

              </div>

              {/* 길찾기 버튼 모음 */}
              <div className="flex flex-wrap gap-3 pt-4">
                <a 
                  href="https://map.naver.com/v5/search/%EB%AF%B8%EC%86%8C%EA%B8%88%EC%9C%B5%EB%8C%80%EA%B5%AC%EC%A4%91%EA%B5%AC%EB%B2%95%EC%9D%B8" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-emerald-600 text-white hover:bg-emerald-700 px-5 py-3 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center space-x-1.5"
                >
                  <span>🗺 네이버 지도로 길찾기</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="tel:053-252-6408" 
                  className="bg-white text-slate-800 border border-slate-200 hover:border-slate-300 px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>전화문의: 053-252-6408</span>
                </a>
              </div>

            </div>

            {/* 지도 박스 */}
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
              <div className="flex items-center justify-between mt-2 px-1">
                <p className="text-slate-400 text-[10px] font-bold">하나은행 건물 뒤편 주차 공간 보유 (방문 전 유선 확인 요망)</p>
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

        </div>

      </div>
    </section>
  );
}
