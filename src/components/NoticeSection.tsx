/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, ChevronRight, AlertTriangle, ShieldCheck, HelpCircle, Phone, Landmark, Scale, Share2, ExternalLink } from 'lucide-react';

export default function NoticeSection({ sectionId }: { sectionId?: string }) {
  const show = (ids: string | string[]) =>
    !sectionId || (Array.isArray(ids) ? ids.includes(sectionId) : sectionId === ids);
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
        
        {/* 공지사항 */}
        {show('notice') && <><div id="notice" className="text-center space-y-4 max-w-4xl mx-auto">
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
        </div></>}

        {/* 불법 사금융 예방 배너 및 단속 카드 (안심 보호) */}
        {show('anti-fraud') && <div id="anti-fraud" className="bg-rose-50/50 border border-rose-100 p-8 md:p-12 rounded-3xl text-left space-y-8">
          
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
          <div id="partners" className="bg-gradient-to-br from-slate-900 to-slate-800 p-7 rounded-2xl text-center relative overflow-hidden">
            {/* 배경 광원 */}
            <motion.div
              className="absolute -top-10 -left-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
              animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -bottom-10 -right-10 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            />

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 bg-rose-600/20 border border-rose-500/40 text-rose-300 text-[11px] font-black tracking-widest px-4 py-1.5 rounded-full uppercase mb-3">
                  <motion.span
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >🚨</motion.span>
                  불법 부당 행위 공식 자진 신고처
                </span>
                <p className="text-slate-400 text-xs mt-2">불법 사금융·사기 피해를 당하셨다면 즉시 신고하세요</p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                {/* 경찰청 112 */}
                <motion.a
                  href="tel:112"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  whileHover={{ scale: 1.04, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative bg-blue-600 hover:bg-blue-500 rounded-2xl p-6 text-white text-center overflow-hidden group cursor-pointer shadow-lg shadow-blue-900/40 transition-colors"
                >
                  <motion.div
                    className="absolute inset-0 bg-white/5 rounded-2xl"
                    animate={{ opacity: [0, 0.15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="text-4xl mb-3">🚔</div>
                  <div className="text-white/70 text-[11px] font-bold tracking-widest uppercase mb-1">경찰청 신고</div>
                  <div className="text-5xl font-black tracking-tight text-white drop-shadow-lg">112</div>
                  <motion.div
                    className="mt-3 text-blue-200 text-[11px] font-semibold"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    전화하기 →
                  </motion.div>
                </motion.a>

                {/* 금융감독원 1332 */}
                <motion.a
                  href="tel:1332"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  whileHover={{ scale: 1.04, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative bg-emerald-700 hover:bg-emerald-600 rounded-2xl p-6 text-white text-center overflow-hidden group cursor-pointer shadow-lg shadow-emerald-900/40 transition-colors"
                >
                  <motion.div
                    className="absolute inset-0 bg-white/5 rounded-2xl"
                    animate={{ opacity: [0, 0.15, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                  />
                  <div className="text-4xl mb-3">🏛</div>
                  <div className="text-white/70 text-[11px] font-bold tracking-widest uppercase mb-1">금융감독원</div>
                  <div className="text-5xl font-black tracking-tight text-white drop-shadow-lg">1332</div>
                  <motion.div
                    className="mt-3 text-emerald-200 text-[11px] font-semibold"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  >
                    전화하기 →
                  </motion.div>
                </motion.a>

                {/* 서민금융진흥원 1397 */}
                <motion.a
                  href="tel:1397"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  whileHover={{ scale: 1.04, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative bg-teal-700 hover:bg-teal-600 rounded-2xl p-6 text-white text-center overflow-hidden group cursor-pointer shadow-lg shadow-teal-900/40 transition-colors"
                >
                  <motion.div
                    className="absolute inset-0 bg-white/5 rounded-2xl"
                    animate={{ opacity: [0, 0.15, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
                  />
                  <div className="text-4xl mb-3">☎️</div>
                  <div className="text-white/70 text-[11px] font-bold tracking-widest uppercase mb-1">서민금융진흥원</div>
                  <div className="text-5xl font-black tracking-tight text-white drop-shadow-lg">1397</div>
                  <div className="text-teal-200 text-[11px] font-semibold mt-1">(상환상담)</div>
                  <motion.div
                    className="mt-2 text-teal-200 text-[11px] font-semibold"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                  >
                    전화하기 →
                  </motion.div>
                </motion.a>

              </div>
            </div>
          </div>
        </div>}

        {/* 유관 기관 바로가기 */}
        <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 text-center">
          <span className="text-[10px] text-slate-400 font-extrabold block mb-6 tracking-wider uppercase">
            관련기관 바로가기
          </span>

          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 md:gap-6">
            {[
              {
                label: '서민금융진흥원',
                href: 'https://www.kinfa.or.kr',
                borderHover: 'hover:border-blue-300',
                textColor: 'group-hover:text-blue-700',
                symbol: (
                  <svg viewBox="0 0 48 48" width="48" height="48">
                    <circle cx="24" cy="24" r="22" fill="white"/>
                    <path d="M24 24 L24 4 A20 20 0 0 1 44 24 Z" fill="#E8182C"/>
                    <path d="M24 24 L44 24 A20 20 0 0 1 24 44 Z" fill="#0066B3"/>
                    <path d="M24 24 L24 44 A20 20 0 0 1 4 24 Z" fill="#00A550"/>
                    <path d="M24 24 L4 24 A20 20 0 0 1 24 4 Z" fill="#F5A800"/>
                    <circle cx="24" cy="24" r="7" fill="white"/>
                  </svg>
                )
              },
              {
                label: '신용회복위원회',
                href: 'https://www.ccrs.or.kr',
                borderHover: 'hover:border-orange-300',
                textColor: 'group-hover:text-orange-700',
                symbol: (
                  <svg viewBox="0 0 48 48" width="48" height="48">
                    <circle cx="24" cy="24" r="22" fill="#FF6B00"/>
                    <path d="M24 10 A14 14 0 0 1 38 24" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round"/>
                    <path d="M38 24 A14 14 0 0 1 24 38" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.7"/>
                    <path d="M24 38 A14 14 0 0 1 10 24" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.4"/>
                    <circle cx="24" cy="10" r="3.5" fill="white"/>
                  </svg>
                )
              },
              {
                label: '소상공인시장진흥공단',
                href: 'https://www.semas.or.kr',
                borderHover: 'hover:border-orange-300',
                textColor: 'group-hover:text-orange-700',
                symbol: (
                  <svg viewBox="0 0 48 48" width="48" height="48">
                    <circle cx="24" cy="24" r="22" fill="#F5F5F5"/>
                    <circle cx="24" cy="24" r="14" fill="#FF6B00"/>
                    <circle cx="24" cy="24" r="9" fill="#003A8C"/>
                    <circle cx="24" cy="24" r="4" fill="white"/>
                    <rect x="22" y="4" width="4" height="8" rx="2" fill="#FF6B00"/>
                    <rect x="22" y="36" width="4" height="8" rx="2" fill="#003A8C"/>
                    <rect x="4" y="22" width="8" height="4" rx="2" fill="#FF6B00"/>
                    <rect x="36" y="22" width="8" height="4" rx="2" fill="#003A8C"/>
                  </svg>
                )
              },
              {
                label: '국세청',
                href: 'https://www.nts.go.kr',
                borderHover: 'hover:border-blue-300',
                textColor: 'group-hover:text-blue-700',
                symbol: (
                  <svg viewBox="0 0 48 48" width="48" height="48">
                    <circle cx="24" cy="24" r="22" fill="#F5F5F5"/>
                    <path d="M24 4 A20 20 0 0 1 24 44 A10 10 0 0 0 24 4 Z" fill="none"/>
                    <path d="M24 4 A20 20 0 0 1 44 24 A20 20 0 0 0 24 4 Z" fill="#C0392B"/>
                    <path d="M24 4 A20 20 0 0 0 4 24 A20 20 0 0 1 24 4 Z" fill="#C0392B" opacity="0.5"/>
                    <path d="M44 24 A20 20 0 0 1 24 44 A20 20 0 0 0 44 24 Z" fill="#003087"/>
                    <path d="M4 24 A20 20 0 0 0 24 44 A20 20 0 0 1 4 24 Z" fill="#003087" opacity="0.5"/>
                    <circle cx="24" cy="14" r="4" fill="#C0392B"/>
                    <circle cx="24" cy="34" r="4" fill="#003087"/>
                    <circle cx="34" cy="24" r="3" fill="white" opacity="0.6"/>
                    <circle cx="14" cy="24" r="3" fill="white" opacity="0.6"/>
                  </svg>
                )
              },
              {
                label: '사회적기업진흥원',
                href: 'https://www.socialenterprise.or.kr',
                borderHover: 'hover:border-green-300',
                textColor: 'group-hover:text-green-700',
                symbol: (
                  <svg viewBox="0 0 48 48" width="48" height="48">
                    <circle cx="24" cy="24" r="22" fill="#006633"/>
                    <circle cx="24" cy="20" r="8" fill="white" opacity="0.95"/>
                    <circle cx="24" cy="20" r="4.5" fill="#006633"/>
                    <path d="M14 34 Q24 26 34 34" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
                    <path d="M18 38 Q24 33 30 38" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7"/>
                  </svg>
                )
              },
            ].map((item, idx) => (
              <motion.a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center gap-3 bg-white border-2 border-slate-100 ${item.borderHover} rounded-2xl py-6 px-3 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer group`}
              >
                <div className="w-12 h-12 flex items-center justify-center drop-shadow-sm">
                  {item.symbol}
                </div>
                <span className={`text-[11px] font-bold text-slate-500 ${item.textColor} transition-colors text-center leading-tight`}>
                  {item.label}
                </span>
              </motion.a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
