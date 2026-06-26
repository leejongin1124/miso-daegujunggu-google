/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface LandingSummaryProps {
  onScrollToSection: (sectionId: string) => void;
}

const cards = [
  {
    emoji: '🏛',
    color: 'from-teal-500 to-emerald-500',
    lightBg: 'bg-teal-50',
    border: 'hover:border-teal-300',
    badge: '법인소개',
    title: '(사)미소금융대구중구법인',
    desc: '설립 15년, 금융위원회 허가 비영리 공익법인\n이사장 인사말 · 연혁 · 조직도 · 오시는 길',
    sectionId: 'ceo-greeting',
    cta: '법인 소개 보기'
  },
  {
    emoji: '💰',
    color: 'from-indigo-500 to-violet-500',
    lightBg: 'bg-indigo-50',
    border: 'hover:border-indigo-300',
    badge: '지원상품',
    title: '4가지 정책 대출 상품',
    desc: '사회적연대금융 · 사업자운영자금\n청년미래이음 · 금융취약계층 생계자금',
    sectionId: 'social-finance',
    cta: '상품 안내 보기'
  },
  {
    emoji: '📋',
    color: 'from-sky-500 to-cyan-500',
    lightBg: 'bg-sky-50',
    border: 'hover:border-sky-300',
    badge: '대출안내',
    title: '지원대상 · FAQ · 서류 안내',
    desc: '신청 자격 · 자주 묻는 질문\n대출 계산기 · 이용 절차 및 서류',
    sectionId: 'loan-target',
    cta: '대출 안내 보기'
  },
  {
    emoji: '🌟',
    color: 'from-orange-500 to-amber-500',
    lightBg: 'bg-orange-50',
    border: 'hover:border-orange-300',
    badge: '지원사례',
    title: '실제 수혜자 후기',
    desc: '대구 소상공인의 생생한 재기 스토리\n사회연대 · 사업자 · 청년 · 취약계층',
    sectionId: 'case-social',
    cta: '사례 보기'
  },
  {
    emoji: '📢',
    color: 'from-rose-500 to-pink-500',
    lightBg: 'bg-rose-50',
    border: 'hover:border-rose-300',
    badge: '알림마당',
    title: '공지사항 · 불법사금융 예방',
    desc: '법인 최신 소식 및 공지사항\n불법 사금융 피해 예방 가이드',
    sectionId: 'notice',
    cta: '공지 보기'
  }
];

export default function LandingSummary({ onScrollToSection }: LandingSummaryProps) {
  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* 섹션 타이틀 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 space-y-2"
        >
          <span className="text-xs font-black text-teal-600 tracking-widest uppercase">Quick Navigation</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            원하시는 메뉴를 바로 선택하세요
          </h2>
          <p className="text-slate-500 text-sm">카드를 누르면 해당 내용으로 바로 이동합니다</p>
        </motion.div>

        {/* 카드 그리드: 상단 3개, 하단 2개 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-4 md:mb-5">
          {cards.slice(0, 3).map((card, i) => (
            <CardItem key={card.sectionId} card={card} idx={i} onScrollToSection={onScrollToSection} />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 max-w-2xl lg:max-w-none lg:grid-cols-2 mx-auto">
          {cards.slice(3).map((card, i) => (
            <CardItem key={card.sectionId} card={card} idx={i + 3} onScrollToSection={onScrollToSection} />
          ))}
        </div>

      </div>
    </section>
  );
}

function CardItem({ card, idx, onScrollToSection }: {
  card: typeof cards[0];
  idx: number;
  onScrollToSection: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: idx * 0.08 }}
      whileHover={{ y: -4, scale: 1.01 }}
      onClick={() => onScrollToSection(card.sectionId)}
      className={`bg-white border border-slate-100 ${card.border} rounded-2xl p-6 cursor-pointer shadow-sm hover:shadow-lg transition-all duration-250 group flex flex-col justify-between min-h-[180px]`}
    >
      <div className="space-y-3">
        {/* 뱃지 + 이모지 */}
        <div className="flex items-center justify-between">
          <span className={`text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full ${card.lightBg} text-slate-600`}>
            {card.badge}
          </span>
          <span className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-xl shadow-sm`}>
            {card.emoji}
          </span>
        </div>

        {/* 제목 */}
        <h3 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-teal-700 transition-colors">
          {card.title}
        </h3>

        {/* 설명 */}
        <p className="text-slate-500 text-xs leading-relaxed whitespace-pre-line">
          {card.desc}
        </p>
      </div>

      {/* CTA */}
      <div className={`mt-4 flex items-center space-x-1 text-xs font-bold bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}>
        <span>{card.cta}</span>
        <motion.span
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowRight className="w-3.5 h-3.5 text-teal-600 group-hover:text-teal-700" />
        </motion.span>
      </div>
    </motion.div>
  );
}
