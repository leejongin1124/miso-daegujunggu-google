/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, ChevronRight, AlertTriangle, ShieldCheck, HelpCircle, Phone, Landmark, Scale, Share2, ExternalLink } from 'lucide-react';

export default function NoticeSection() {
  const [clickedIdx, setClickedIdx] = useState<number | null>(null);
  const notices = [
    {
      id: 1,
      badge: '공지',
      title: '2026년 신중년 사회공헌사업단 미소금융 대상자 자원봉사 지원 정규 운영 시작',
      date: '2026-05-12',
      desc: '대구광역시와의 연계를 통해, 풍부한 경험을 보유한 신중년 자원봉사자들이 대출이 필요한 대구 지역 소상공인 및 청년을 대상으로 경영 상담 및 자립 지원 서비스를 제공합니다.'
    },
    {
      id: 2,
      badge: '중요',
      title: '불법 대출 중개 및 사칭 브로커 피해 예방 안내',
      date: '2026-04-18',
      desc: '(사)미소금융대구중구법인은 대출 중개 수수료 또는 선납금을 요구하지 않습니다. 본 법인을 사칭하여 금품을 요구하는 연락을 받으신 경우, 응하지 마시고 대표번호(053-252-6408) 또는 금융감독원(1332)에 신고해 주시기 바랍니다.'
    },
  ];

  const antiFrauds = [
    {
      icon: <AlertTriangle className="w-5.5 h-5.5 text-rose-600" />,
      title: '법정 최고금리 초과 불법 대출 주의',
      desc: '대출 이율을 허위로 안내하거나 법정 최고금리(연 20%)를 초과하는 불법 대출 광고를 접하신 경우, 즉시 금융감독원(1332) 또는 경찰청(112)에 신고해 주시기 바랍니다.'
    },
    {
      icon: <Scale className="w-5.5 h-5.5 text-indigo-600" />,
      title: '대출 수수료 및 선납금 요구 사기 주의',
      desc: '미소금융 정책자금은 중개 수수료, 보증 선납금, 서류 처리비 등 어떠한 명목의 비용도 요구하지 않습니다. 승인을 조건으로 금전을 요구하는 경우 100% 사기이므로 즉시 신고하시기 바랍니다.'
    },
    {
      icon: <ShieldCheck className="w-5.5 h-5.5 text-emerald-600" />,
      title: '정부기관 사칭 문자·전화 보이스피싱 주의',
      desc: '서민금융진흥원 또는 미소금융 관련 기관을 사칭해 휴대폰 문자나 링크를 발송하는 경우가 있습니다. 출처가 불분명한 링크 클릭이나 앱 설치는 하지 마시고, 반드시 공식 번호(1397)로 확인하시기 바랍니다.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* 타이틀 */}
        <div id="notice" className="text-center space-y-4 max-w-4xl mx-auto">
          <span className="text-xs font-black text-teal-600 tracking-widest uppercase">Miso Notice Board</span>
          <h2 className="text-3xl md:text-4.5xl font-black text-slate-900 tracking-tight leading-none">
            알림마당 & 사금융 안심 센터
          </h2>
          <div className="h-1.5 w-16 bg-teal-600 rounded-full mx-auto" />
          <p className="text-slate-600 font-medium text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            (사)미소금융대구중구법인은 지원 대상자의 권익 보호와 <br className="hidden sm:inline" />
            공정하고 투명한 금융 정보 제공을 위해 운영됩니다.
          </p>
        </div>

        {/* 공지사항 테이블 리스트 */}
        <div className="bg-slate-50 border border-slate-100 p-8 md:p-12 rounded-3xl text-left space-y-8">
          <div className="flex justify-between items-center border-b border-slate-200 pb-5">
            <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-1.5">
              <FileText className="w-5.5 h-5.5 text-teal-650" />
              <span>법인 소식 & 공식 공지사항</span>
            </h3>
            <span className="text-slate-400 font-bold text-xs">최신 업데이트 기준</span>
          </div>

          <div className="space-y-4">
            {notices.map((n) => (
              <div key={n.id} className="bg-white p-6 rounded-2xl border border-slate-150 shadow-sm flex flex-col sm:flex-row sm:items-start gap-4 hover:border-teal-300 transition-all">
                
                <span className={`px-2.5 py-1 rounded text-[10px] font-black tracking-widest uppercase text-center shrink-0 min-w-[50px] ${
                  n.badge === '중요' ? 'bg-rose-50 text-rose-700 border border-rose-100' :
                  n.badge === '공지' ? 'bg-teal-50 text-teal-700 border border-teal-100' :
                  'bg-slate-50 text-slate-500 border border-slate-150'
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
                <span>불법 사금융 및 보이스피싱 피해 예방 안내</span>
              </h3>
              <p className="text-rose-600/80 text-xs font-bold leading-normal">
                불법 사금융 피해를 입으셨거나 의심스러운 연락을 받으셨다면, 아래 정부 공식 상담번호를 이용해 주시기 바랍니다.
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
              불법 부당 행위 공식 자진 신고처
            </span>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-black">
              <a href="tel:112" className="bg-slate-50 border border-slate-100 p-4.5 rounded-lg text-slate-800 hover:text-teal-600 text-center transition">
                <span>🚔 경찰청 신고</span>
                <span className="text-teal-600 text-[11px] block mt-1 font-mono">112</span>
              </a>
              <a href="tel:1332" className="bg-slate-50 border border-slate-100 p-4.5 rounded-lg text-slate-800 hover:text-teal-600 text-center transition">
                <span>🏛 금융감독원</span>
                <span className="text-teal-600 text-[11px] block mt-1 font-mono">1332</span>
              </a>
              <a href="tel:1397" className="bg-slate-50 border border-slate-100 p-4.5 rounded-lg text-slate-800 hover:text-teal-600 text-center transition">
                <span>☎ 서민금융진흥원</span>
                <span className="text-teal-600 text-[11px] block mt-1 font-mono">1397 (상환상담)</span>
              </a>
              <a href="tel:053-252-6408" className="bg-slate-50 border border-slate-100 p-4.5 rounded-lg text-slate-800 hover:text-teal-600 text-center transition">
                <span>📞 대구중구법인</span>
                <span className="text-teal-600 text-[11px] block mt-1 font-mono">053-252-6408</span>
              </a>
            </div>
          </div>
        </div>

        {/* 유관 기관 바로가기 유연 바 (Footer 전 단계) */}
        <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 text-left">
          <span className="text-[10px] text-slate-400 font-extrabold block mb-4 tracking-wider uppercase">
            정부 및 공익 유관 네트워크 포털 바로 가기
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 text-xs font-extrabold text-slate-600">
            {[
              { label: '서민금융진흥원', href: 'https://www.kinfa.or.kr', active: 'bg-teal-500 border-teal-500 text-white', hover: 'hover:bg-teal-50 hover:border-teal-400 hover:text-teal-700' },
              { label: '금융위원회', href: 'https://www.fsc.go.kr', active: 'bg-blue-500 border-blue-500 text-white', hover: 'hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700' },
              { label: '금융감독원', href: 'https://www.fss.or.kr', active: 'bg-indigo-500 border-indigo-500 text-white', hover: 'hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-700' },
              { label: '대구광역시청', href: 'https://www.daegu.go.kr', active: 'bg-emerald-500 border-emerald-500 text-white', hover: 'hover:bg-emerald-50 hover:border-emerald-400 hover:text-emerald-700' },
              { label: '사회적기업진흥원', href: 'https://www.socialenterprise.or.kr', active: 'bg-violet-500 border-violet-500 text-white', hover: 'hover:bg-violet-50 hover:border-violet-400 hover:text-violet-700' },
              { label: '법인 네이버블로그', href: 'https://blog.naver.com', active: 'bg-green-500 border-green-500 text-white', hover: 'hover:bg-green-50 hover:border-green-400 hover:text-green-700' },
            ].map((item, idx) => (
              <motion.a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setClickedIdx(idx);
                  setTimeout(() => setClickedIdx(null), 600);
                }}
                animate={clickedIdx === idx ? { scale: [1, 1.12, 0.96, 1.04, 1], rotate: [0, -3, 3, -1, 0] } : {}}
                whileHover={{ y: -5, scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className={`p-3 rounded-lg border text-center flex items-center justify-between shadow-sm cursor-pointer transition-all duration-300 ${
                  clickedIdx === idx
                    ? item.active
                    : `bg-white border-slate-200 ${item.hover}`
                }`}
              >
                <span>{item.label}</span>
                <motion.div
                  animate={clickedIdx === idx ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </motion.div>
              </motion.a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
