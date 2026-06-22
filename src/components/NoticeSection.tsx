/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { FileText, ChevronRight, AlertTriangle, ShieldCheck, HelpCircle, Phone, Landmark, Scale, Share2, ExternalLink } from 'lucide-react';

export default function NoticeSection() {
  const notices = [
    {
      id: 1,
      badge: '공지',
      title: '2026년 신중년 사회공헌사업단 전문 지원인력 정규 운영 시작',
      date: '2026-05-12',
      desc: '대구시와의 서민 지원 연계 사업으로, 신중년 경영 컨설턴트들이 대구 소상공인의 회계 소명을 지원하는 사업을 시작했습니다.'
    },
    {
      id: 2,
      badge: '중요',
      title: '미소금융 사칭 불법 브로커 주의 안내',
      date: '2026-04-18',
      desc: '미소금융대구중구법인은 대출 중개 수수료나 선수금을 요구하는 브로커를 일절 두지 않습니다. 본 법인을 사칭하는 문자를 받으시면 즉시 대표번호로 알려주십시오.'
    },
    {
      id: 3,
      badge: '안내',
      title: '남구 봉덕동 하나은행 건물 사무실 임대차 연장 안내',
      date: '2025-07-02',
      desc: '현 남구 중앙대로 146, 4층 하나은행 봉덕지점 사무실 계약을 3년 추가 연장하여 정상적으로 대면 상담을 이어갑니다.'
    }
  ];

  const antiFrauds = [
    {
      icon: <AlertTriangle className="w-5.5 h-5.5 text-rose-600" />,
      title: '불법 고금리 대출광고 주의',
      desc: '법정 최고이율(연 20%)을 초과하는 불법 사채 광고를 발견하시면 금융감독원(1332) 또는 경찰청(112)에 신고해 주시기 바랍니다.'
    },
    {
      icon: <Scale className="w-5.5 h-5.5 text-indigo-600" />,
      title: '중개 수수료·보증 선수금 요구 주의',
      desc: '미소금융 정책자금은 무상으로 지원되는 국가 보장 금융입니다. 승인을 빌미로 수수료나 사례금, 선납금을 요구한다면 사기이므로 즉시 신고해 주십시오.'
    },
    {
      icon: <ShieldCheck className="w-5.5 h-5.5 text-miso-navy-600" />,
      title: '문자 대환대출 및 기관 사칭 주의',
      desc: '서민금융진흥원이나 미소금융을 사칭해 문자로 가입을 유도하는 보이스피싱 사례가 있습니다. 출처가 불분명한 링크나 앱 설치는 클릭하지 마시기 바랍니다.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* 타이틀 */}
        <div id="notice" className="text-center space-y-4 max-w-4xl mx-auto">
          <span className="text-xs font-black text-miso-blue-600 tracking-widest uppercase">Miso Notice Board</span>
          <h2 className="text-3xl md:text-4.5xl font-black text-slate-900 tracking-tight leading-none">
            알림마당 & 사금융 안심 센터
          </h2>
          <div className="h-1.5 w-16 bg-miso-blue-600 rounded-full mx-auto" />
          <p className="text-slate-600 font-medium text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            미소금융대구중구법인을 이용하시는 고객님들의 권익을 보호하고, <br className="hidden sm:inline" />
            안전한 금융 이용을 위한 정보를 제공해 드립니다.
          </p>
        </div>

        {/* 공지사항 테이블 리스트 */}
        <div className="bg-slate-50 border border-slate-100 p-8 md:p-12 rounded-3xl text-left space-y-8">
          <div className="flex justify-between items-center border-b border-slate-200 pb-5">
            <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-1.5">
              <FileText className="w-5.5 h-5.5 text-miso-blue-700" />
              <span>법인 소식 & 공식 공지사항</span>
            </h3>
            <span className="text-slate-400 font-bold text-xs">최신 업데이트 기준</span>
          </div>

          <div className="space-y-4">
            {notices.map((n) => (
              <div key={n.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-start gap-4 hover:border-miso-blue-300 transition-all">
                
                <span className={`px-2.5 py-1 rounded text-[10px] font-black tracking-widest uppercase text-center shrink-0 min-w-[50px] ${
                  n.badge === '중요' ? 'bg-rose-50 text-rose-700 border border-rose-100' :
                  n.badge === '공지' ? 'bg-miso-blue-50 text-miso-blue-700 border border-miso-blue-100' :
                  'bg-slate-50 text-slate-500 border border-slate-200'
                }`}>
                  {n.badge}
                </span>

                <div className="flex-1 space-y-1.5 text-left">
                  <h4 className="font-extrabold text-slate-900 text-sm md:text-base leading-snug">
                    {n.title}
                  </h4>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-semibold">
                    {n.desc}
                  </p>
                  <span className="text-slate-400 font-mono text-[10px] block pt-1">{n.date}</span>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* 불법 사금융 예방 배너 및 단속 카드 (안심 보호) */}
        <div id="anti-fraud" className="bg-rose-50/50 border border-rose-100 p-8 md:p-12 rounded-3xl text-left space-y-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-rose-100 pb-5">
            <div className="space-y-1.5">
              <h3 className="font-extrabold text-slate-950 text-lg flex items-center gap-1.5">
                <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0" />
                <span>🚨 불법 사금융 광고 및 보이스피싱 주의</span>
              </h3>
              <p className="text-rose-600/80 text-xs font-bold leading-normal">
                연 20% 이상의 불법 사채에 빠지기 전, 정부 공식 무료 상담전화를 먼저 이용해 주십시오.
              </p>
            </div>
            
            <a 
              href="tel:1397"
              className="bg-rose-600 hover:bg-rose-700 text-white font-black px-4.5 py-3 rounded-xl text-xs flex items-center gap-1.5 shrink-0 transition"
            >
              <span>☎ 서민금융 통합 번호 1397</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {antiFrauds.map((af, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm space-y-4">
                <div className="p-2 bg-rose-50 rounded-lg inline-block text-rose-650">
                  {af.icon}
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm">{af.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed font-semibold">{af.desc}</p>
              </div>
            ))}
          </div>

          {/* 피해 신고 기관 상세 테이블 */}
          <div id="partners" className="bg-white p-6 rounded-2xl border border-rose-100 text-center ">
            <span className="text-slate-400 font-bold text-[10px] uppercase block tracking-wider mb-4">
              불법 행위 신고처
            </span>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-black">
              <a href="tel:112" className="bg-slate-50 border border-slate-100 p-4.5 rounded-lg text-slate-800 hover:text-miso-blue-600 text-center transition">
                <span>🚔 경찰청 신고</span>
                <span className="text-miso-blue-600 text-[11px] block mt-1 font-mono">112</span>
              </a>
              <a href="tel:1332" className="bg-slate-50 border border-slate-100 p-4.5 rounded-lg text-slate-800 hover:text-miso-blue-600 text-center transition">
                <span>🏛 금융감독원</span>
                <span className="text-miso-blue-600 text-[11px] block mt-1 font-mono">1332</span>
              </a>
              <a href="tel:1397" className="bg-slate-50 border border-slate-100 p-4.5 rounded-lg text-slate-800 hover:text-miso-blue-600 text-center transition">
                <span>☎ 서민금융진흥원</span>
                <span className="text-miso-blue-600 text-[11px] block mt-1 font-mono">1397 (상환상담)</span>
              </a>
              <a href="tel:053-252-6408" className="bg-slate-50 border border-slate-100 p-4.5 rounded-lg text-slate-800 hover:text-miso-blue-600 text-center transition">
                <span>📞 대구중구법인</span>
                <span className="text-miso-blue-600 text-[11px] block mt-1 font-mono">053-252-6408</span>
              </a>
            </div>
          </div>
        </div>

        {/* 유관 기관 바로가기 */}
        <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 text-left">
          <span className="text-[10px] text-slate-400 font-extrabold block mb-4 tracking-wider uppercase">
            관련 기관 바로 가기
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 text-xs font-extrabold text-slate-600">
            <a href="https://www.kinfa.or.kr" target="_blank" rel="noopener noreferrer" className="bg-white hover:bg-slate-100 p-3 rounded-lg border border-slate-200 text-center flex items-center justify-between shadow-sm transition">
              <span>서민금융진흥원</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
            <a href="https://www.fsc.go.kr" target="_blank" rel="noopener noreferrer" className="bg-white hover:bg-slate-100 p-3 rounded-lg border border-slate-200 text-center flex items-center justify-between shadow-sm transition">
              <span>금융위원회</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
            <a href="https://www.fss.or.kr" target="_blank" rel="noopener noreferrer" className="bg-white hover:bg-slate-100 p-3 rounded-lg border border-slate-200 text-center flex items-center justify-between shadow-sm transition">
              <span>금융감독원</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
            <a href="https://www.daegu.go.kr" target="_blank" rel="noopener noreferrer" className="bg-white hover:bg-slate-100 p-3 rounded-lg border border-slate-200 text-center flex items-center justify-between shadow-sm transition">
              <span>대구광역시청</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
            <a href="https://www.socialenterprise.or.kr" target="_blank" rel="noopener noreferrer" className="bg-white hover:bg-slate-100 p-3 rounded-lg border border-slate-200 text-center flex items-center justify-between shadow-sm transition">
              <span>사회적기업진흥원</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
            <a href="https://blog.naver.com/eornwndrn1" target="_blank" rel="noopener noreferrer" className="bg-white hover:bg-slate-100 p-3 rounded-lg border border-slate-200 text-center flex items-center justify-between shadow-sm transition">
              <span>법인 네이버블로그</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
