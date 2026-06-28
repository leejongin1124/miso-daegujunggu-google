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

export default function Hero({ onScrollToSection }: HeroProps) {
  const [spotlightIdx, setSpotlightIdx] = useState(0);
  const [audienceIdx, setAudienceIdx] = useState(0);
  const [statsInView, setStatsInView] = useState(false);
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

  const quickCards = [
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
    },
    {
      icon: <MapPin className="w-6 h-6 text-rose-600" />,
      title: '법인 방문 오시는 길',
      value: '하나은행 봉덕지점 4층',
      desc: '남구 중앙대로 146',
      action: () => onScrollToSection('location')
    },
    {
      icon: <Phone className="w-6 h-6 text-teal-600" />,
      title: '대표번호 즉시상담',
      value: '053-252-6408',
      desc: '평일 09시 ~ 18시 운영',
      action: () => window.open('tel:053-252-6408')
    }
  ];

  return (
    <section id="hero-section" className="relative pt-28 md:pt-36 bg-gradient-to-b from-teal-50/40 via-white to-white pb-16 md:pb-24 overflow-hidden">
      
      {/* 우장한 백그라운드 구체 데코 */}
      <div className="absolute top-0 right-0 -mr-64 -mt-64 w-[600px] h-[600px] bg-teal-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 -ml-48 w-96 h-96 bg-emerald-50/50 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 상단 문구 배너와 텍스트 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          <div className="space-y-6 text-left">

            {/* 순환 대상 칩 */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2"
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

            <h1 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.3] space-y-1 overflow-hidden">
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
                  여기, 또 다른 길이 있습니다.
                </span>
                {titlePhase >= 3 && (
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="absolute left-0 -bottom-1 h-1 w-full bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full origin-left"
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
              <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed">
                금융위원회 허가 비영리 공익법인이자 서민금융진흥원 공식 사업수행기관입니다.
              </p>
              <p className="text-slate-700 text-base md:text-lg font-semibold leading-relaxed flex flex-wrap items-center gap-2">
                대구·경북 청년·소상공인·취약계층의 자립을 위해
                <span className="inline-flex items-center bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-black px-2.5 py-1 rounded-lg whitespace-nowrap">
                  연 4.5% 저금리
                </span>
                상담부터 대출까지 함께합니다.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <button
                onClick={() => onScrollToSection('social-finance')}
                className="inline-flex justify-center items-center space-x-2 bg-white text-slate-800 border-2 border-slate-200 hover:border-teal-500 hover:text-teal-600 font-bold px-7 py-4 rounded-2xl transition-all shadow-sm text-base"
              >
                <span>🔍 지원상품 전체보기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="tel:053-252-6408"
                className="inline-flex justify-center items-center space-x-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold px-8 py-4 rounded-2xl hover:brightness-105 transition-all shadow-lg hover:shadow-teal-100 text-base"
              >
                <Phone className="w-5 h-5" />
                <span>전화 상담 053-252-6408</span>
              </a>
            </motion.div>
          </div>

          {/* 오른쪽: 이미지 자산 배치 및 프레임 효과 (input_file_0.png) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/hero-bg.jpg.png"
                  alt="미소금융의 따뜻한 자금 지원 일러스트"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </motion.div>

        </div>

        {/* 4종 모바일 퀵 카드 */}
        <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-16 md:mt-20">
          {quickCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12, type: 'spring', stiffness: 200, damping: 18 }}
              animate={spotlightIdx === i ? { y: -6, scale: 1.03 } : { y: 0, scale: 1 }}
              onClick={card.action}
              className={`relative bg-white p-6 rounded-2xl shadow-sm transition-colors duration-500 text-left group overflow-hidden ${
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
              <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-5 relative z-10">{card.title}</h3>
              <p className="text-slate-800 font-extrabold text-xl mt-1 tracking-tight relative z-10">{card.value}</p>
              <p className="text-slate-400 text-xs mt-1 font-semibold relative z-10">{card.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
