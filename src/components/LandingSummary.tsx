/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface LandingSummaryProps {
  onScrollToSection: (sectionId: string) => void;
}

const cards = [
  {
    emoji: '🏛',
    iconBg: 'bg-teal-50',
    accentColor: 'text-teal-600',
    borderHover: 'hover:border-teal-300 hover:shadow-teal-100',
    badge: '법인소개',
    title: '(사)미소금융\n대구중구법인',
    desc: '설립 15년, 금융위원회 허가\n비영리 공익법인',
    sectionId: 'ceo-greeting',
  },
  {
    emoji: '💰',
    iconBg: 'bg-indigo-50',
    accentColor: 'text-indigo-600',
    borderHover: 'hover:border-indigo-300 hover:shadow-indigo-100',
    badge: '지원상품',
    title: '4가지\n정책 대출 상품',
    desc: '사회적연대 · 사업자운영자금\n청년미래이음 · 취약계층생계자금',
    sectionId: 'social-finance',
  },
  {
    emoji: '📋',
    iconBg: 'bg-sky-50',
    accentColor: 'text-sky-600',
    borderHover: 'hover:border-sky-300 hover:shadow-sky-100',
    badge: '대출안내',
    title: '지원대상 · FAQ\n서류 안내',
    desc: '신청 자격 · 자주 묻는 질문\n대출 계산기 · 이용 절차',
    sectionId: 'loan-target',
  },
  {
    emoji: '🌟',
    iconBg: 'bg-orange-50',
    accentColor: 'text-orange-600',
    borderHover: 'hover:border-orange-300 hover:shadow-orange-100',
    badge: '지원사례',
    title: '실제 수혜자\n후기',
    desc: '대구 소상공인의 생생한 재기 스토리\n사회연대 · 사업자 · 청년 · 취약계층',
    sectionId: 'case-social',
  },
  {
    emoji: '📢',
    iconBg: 'bg-rose-50',
    accentColor: 'text-rose-600',
    borderHover: 'hover:border-rose-300 hover:shadow-rose-100',
    badge: '알림마당',
    title: '공지사항\n불법사금융 예방',
    desc: '법인 최신 소식 및 공지사항\n불법 사금융 피해 예방 가이드',
    sectionId: 'notice',
  }
];

export default function LandingSummary({ onScrollToSection }: LandingSummaryProps) {
  return (
    <section className="bg-white py-14 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-100">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            원하시는 메뉴를 선택하세요
          </h2>
          <p className="text-slate-400 text-sm mt-2">카드를 누르면 해당 내용으로 바로 이동합니다</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={card.sectionId}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onScrollToSection(card.sectionId)}
              className={`bg-white border-2 border-slate-100 ${card.borderHover} rounded-2xl p-7 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-250 group flex flex-col gap-5`}
            >
              <div className={`w-16 h-16 ${card.iconBg} rounded-2xl flex items-center justify-center text-3xl shadow-inner`}>
                {card.emoji}
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <span className={`text-[11px] font-black tracking-widest uppercase ${card.accentColor}`}>
                  {card.badge}
                </span>
                <h3 className="font-extrabold text-slate-900 text-xl leading-snug whitespace-pre-line">
                  {card.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed whitespace-pre-line font-medium">
                  {card.desc}
                </p>
              </div>

              <div className={`flex items-center gap-1 font-bold text-sm ${card.accentColor} mt-auto`}>
                <span>자세히 보기</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
