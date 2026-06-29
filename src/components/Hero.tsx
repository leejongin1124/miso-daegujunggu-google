/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { Phone, ArrowRight, ShieldCheck, BadgePercent, TrendingUp, Users, PiggyBank, MapPin } from 'lucide-react';

function useCountUp(target: number, duration: number, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [trigger, target, duration]);
  return count;
}

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
}

const AUDIENCE = ['청년', '소상공인', '취약계층', '자영업자'];

const PHONES = [
  { number: '053-252-6408', color: 'text-teal-600' },
  { number: '053-252-6409', color: 'text-indigo-600' },
  { number: '053-252-6479', color: 'text-rose-600' },
  { number: '053-252-6480', color: 'text-amber-600' },
];

export default function Hero({ onScrollToSection }: HeroProps) {
  const [spotlightIdx, setSpotlightIdx] = useState(0);
  const [audienceIdx, setAudienceIdx] = useState(0);
  const [statsInView, setStatsInView] = useState(false);
  const [phoneIdx, setPhoneIdx] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpotlightIdx(prev => (prev + 1) % 4);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAudienceIdx(prev => (prev + 1) % AUDIENCE.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhoneIdx(prev => (prev + 1) % PHONES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsInView(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const countPeople = useCountUp(3800, 2200, statsInView);
  const countMoney = useCountUp(600, 2200, statsInView);

  // 타이틀 순차 애니메이션 phase: 0→숨김 1→1번등장 2→2번등장 3→고정
  const [titlePhase, setTitlePhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setTitlePhase(1), 300);
    const t2 = setTimeout(() => setTitlePhase(2), 1100);
    const t3 = setTimeout(() => setTitlePhase(3), 1900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const currentPhone = PHONES[phoneIdx];

  const quickCards = [
    {
      icon: <Phone className="w-6 h-6 text-teal-600" />,
      title: '대표번호 즉시상담',
      value: currentPhone.number,
      desc: '평일 09시 ~ 18시 운영',
      action: () => window.open(`tel:${currentPhone.number}`)
    },
    {
      icon: <MapPin className="w-6 h-6 text-rose-600" />,
      title: '법인 방문 오시는 길',
      value: '하나은행 봉덕지점 4층',
      desc: '남구 중앙대로 146',
      action: () => onScrollToSection('location')
    },
    {
      icon: <Users className="w-6 h-6 text-emerald-600" />,
      title: '누적 지원 인원',
      value: statsInView ? `${countPeople.toLocaleString()} 여명` : '0 여명',
      desc: '대구 소상공인의 든든한 동반자'
    },
    {
      icon: <PiggyBank className="w-6 h-6 text-indigo-600" />,
      title: '누적 지원 금액',
      value: statsInView ? `${countMoney}억 원 돌파` : '0억 원 돌파',
      desc: '2026년 5월 누적 기준'
    }
  ];

  return (
    <section id="hero-section" className="relative overflow-hidden min-h-[100svh] flex flex-col">

      {/* 배경 동영상 — 모바일: object-top으로 상단 인물 중심 표시 */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover [object-position:80%_0%] md:[object-position:50%_50%]"
        src="/hero-bg.mp4"
      />
      {/* 오버레이 — 모바일은 더 어둡게(텍스트 가독성) */}
      <div className="absolute inset-0 bg-slate-900/10 md:bg-gradient-to-r md:from-slate-900/25 md:via-slate-900/10 md:to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/10 pointer-events-none" />

      <div className="relative z-10 flex flex-col flex-1 pt-12 md:pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col flex-1">

        {/* 텍스트 영역 — 모바일: 중앙, PC: 좌측 */}
        <div className="flex-1 flex items-center py-4 md:py-12">

          <div className="space-y-3 md:space-y-6 text-left w-full md:max-w-2xl">

            {/* 순환 대상 칩 */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-start gap-2"
            >
<div className="relative h-7 overflow-hidden">
                {AUDIENCE.map((label, i) => (
                  <motion.span
                    key={label}
                    animate={{
                      y: i === audienceIdx ? 0 : i === (audienceIdx - 1 + AUDIENCE.length) % AUDIENCE.length ? -28 : 28,
                      opacity: i === audienceIdx ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="absolute inset-0 flex items-center"
                  >
                    <span className="bg-teal-600 text-white text-xs font-black px-3 py-1 rounded-full whitespace-nowrap">
                      {label}
                    </span>
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.3] space-y-1 overflow-hidden drop-shadow-lg">
              {/* 1번: 좌→우 슬라이드 후 고정 */}
              <motion.div
                initial={{ x: -80, opacity: 0 }}
                animate={titlePhase >= 1 ? { x: 0, opacity: 1 } : { x: -80, opacity: 0 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              >
                은행 문턱에 막히셨나요?
              </motion.div>

              {/* 2번: 슬라이드 + 밑줄 애니메이션 */}
              <motion.div
                initial={{ x: -80, opacity: 0 }}
                animate={titlePhase >= 2 ? { x: 0, opacity: 1 } : { x: -80, opacity: 0 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className="relative inline-block"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-300">
                  여기, 또 다른 길이 있습니다.
                </span>
                {titlePhase >= 3 && (
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="absolute left-0 -bottom-1 h-1 w-full bg-gradient-to-r from-teal-300 to-emerald-300 rounded-full origin-left"
                  />
                )}
              </motion.div>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-2"
            >
              <p className="text-white/70 text-sm md:text-base font-medium leading-relaxed drop-shadow">
                금융위원회 허가 비영리 공익법인이자 서민금융진흥원 공식 사업수행기관입니다.
              </p>
              <p className="text-white text-base md:text-lg font-semibold leading-relaxed flex flex-wrap items-center gap-2 drop-shadow">
                대구·경북 청년·소상공인·취약계층의 자립을 위해
                <span className="inline-flex items-center bg-emerald-500/90 text-white text-xs font-black px-2.5 py-1 rounded-lg whitespace-nowrap shadow">
                  연 4.5% 저금리
                </span>
                상담부터 대출까지 함께합니다.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-row gap-3 pt-2 items-start w-full"
            >
              <button
                onClick={() => onScrollToSection('social-finance')}
                className="inline-flex flex-1 md:flex-none justify-center items-center space-x-2 bg-white/20 backdrop-blur-sm text-white border-2 border-white/40 hover:bg-white hover:text-teal-700 font-bold px-4 md:px-7 py-4 rounded-2xl transition-all shadow text-sm md:text-base"
              >
                <span className="md:hidden">🔍 상품안내</span>
                <span className="hidden md:inline">🔍 지원상품 전체보기</span>
                <ArrowRight className="w-4 h-4 hidden md:inline" />
              </button>
              <a
                href="https://blog.naver.com/eornwndrn1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 md:flex-none justify-center items-center space-x-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold px-4 md:px-8 py-4 rounded-2xl hover:brightness-105 transition-all shadow-lg text-sm md:text-base"
              >
                <img
                  src="/logos/naver_blog_logo.png"
                  alt="블로그"
                  className="w-5 h-5 md:w-6 md:h-6 object-contain"
                />
                <span className="md:hidden">법인 블로그</span>
                <span className="hidden md:inline">법인 공식 블로그 보기</span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* 4종 퀵 카드 — 동영상 섹션 하단 */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 pb-4 md:pb-8">
          {quickCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12, type: 'spring', stiffness: 200, damping: 18 }}
              animate={spotlightIdx === i ? { y: -6, scale: 1.03 } : { y: 0, scale: 1 }}
              onClick={card.action}
              className={`relative bg-white/90 backdrop-blur-sm p-4 md:p-6 rounded-2xl shadow-sm transition-colors duration-500 text-left group overflow-hidden ${
                card.action ? 'cursor-pointer' : ''
              } ${
                spotlightIdx === i
                  ? 'border-2 border-teal-400 shadow-lg shadow-teal-100'
                  : 'border border-slate-100 hover:border-teal-200 hover:shadow-md'
              }`}
            >
              {spotlightIdx === i && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.15, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-br from-teal-400 to-emerald-400 pointer-events-none rounded-2xl"
                />
              )}
              <div className="flex justify-between items-start relative z-10">
                <div className={`p-3 rounded-xl transition-all shadow-inner ${spotlightIdx === i ? 'bg-teal-50' : 'bg-slate-50 group-hover:bg-white'}`}>
                  {card.icon}
                </div>
                {card.action && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${spotlightIdx === i ? 'bg-teal-600 text-white' : 'text-teal-600 bg-teal-50 group-hover:bg-teal-600 group-hover:text-white'}`}>
                    이동
                  </span>
                )}
              </div>
              <h3 className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-wider mt-3 md:mt-5 relative z-10">{card.title}</h3>
              {i === 0 ? (
                <div className="relative h-7 overflow-hidden mt-1">
                  {PHONES.map((phone, pi) => (
                    <motion.p
                      key={phone.number}
                      animate={{
                        y: pi === phoneIdx ? 0 : pi === (phoneIdx - 1 + PHONES.length) % PHONES.length ? -28 : 28,
                        opacity: pi === phoneIdx ? 1 : 0,
                      }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className={`absolute inset-0 flex items-center font-extrabold text-base md:text-xl tracking-tight ${phone.color}`}
                    >
                      {phone.number}
                    </motion.p>
                  ))}
                </div>
              ) : (
                <p className="text-slate-800 font-extrabold text-base md:text-xl mt-1 tracking-tight relative z-10">{card.value}</p>
              )}
              <p className="text-slate-400 text-xs mt-1 font-semibold relative z-10">{card.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
      </div>
    </section>
  );
}
