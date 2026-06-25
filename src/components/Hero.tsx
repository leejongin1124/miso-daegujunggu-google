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

export default function Hero({ onScrollToSection }: HeroProps) {
  const [spotlightIdx, setSpotlightIdx] = useState(0);
  const [statsInView, setStatsInView] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpotlightIdx(prev => (prev + 1) % 4);
    }, 1800);
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
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.2]"
            >
              은행 문턱에 막히셨나요?<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
                여기, 또 다른 길이 있습니다.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed max-w-2xl"
            >
              금융위원회 허가 비영리 공익법인이자 서민금융진흥원 공식 사업수행기관입니다. <br className="hidden md:inline" />
              대구·경북 지역 소상공인과 자영업자의 경제적 자립을 위한 서민금융 지원을 제공합니다.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <a 
                href="tel:053-252-6408"
                className="inline-flex justify-center items-center space-x-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold px-8 py-4 rounded-2xl hover:brightness-105 transition-all shadow-lg hover:shadow-teal-100 text-base"
              >
                <Phone className="w-5 h-5" />
                <span>전화 상담 053-252-6408</span>
              </a>
              <button 
                onClick={() => onScrollToSection('social-finance')}
                className="inline-flex justify-center items-center space-x-2 bg-white text-slate-800 border-2 border-slate-200 hover:border-teal-500 hover:text-teal-600 font-bold px-7 py-4 rounded-2xl transition-all shadow-sm text-base"
              >
                <span>🔍 지원상품 전체보기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
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

        {/* 미소금융이란 무엇인가? 상세소개 디테일 */}
        <div id="about-miso" className="mt-24 md:mt-32 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <span className="text-teal-600 font-bold text-sm tracking-widest uppercase">What is Miso Finance?</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              미소금융은 무엇이 다른가요?
            </h2>
            <div className="h-1.5 w-16 bg-gradient-to-r from-teal-500 to-emerald-500 mx-auto rounded-full mt-3" />
            <p className="text-slate-600 text-base md:text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
              서민금융진흥원의 정책 재원으로 운영되는 <br className="hidden sm:inline" />
              저소득·저신용 계층을 위한 제도권 공익 금융 지원 프로그램입니다.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left">
            
            <div className="bg-white p-8 rounded-2xl border-b-4 border-b-teal-500 shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 mb-6 font-bold text-xl mx-auto">
                🏛
              </div>
              <h3 className="font-bold text-lg text-slate-900">투명한 공익 재원</h3>
              <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                대기업 출연금과 금융권 휴면예금을 재원으로 정부가 조성한 공익 정책 자금입니다. 별도의 수수료나 부대비용은 없습니다.
              </p>
              <span className="inline-block bg-teal-50 text-teal-700 text-[11px] font-bold px-2.5 py-1 rounded-md mt-6">
                서민금융진흥원 운영
              </span>
            </div>

            <div className="bg-white p-8 rounded-2xl border-b-4 border-b-emerald-500 shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-6 font-bold text-xl mx-auto">
                📋
              </div>
              <h3 className="font-bold text-lg text-slate-900">제도권 비영리 법인</h3>
              <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                금융위원회로부터 설립 허가를 받은 비영리 공익법인으로, 이윤을 추구하지 않고 서민의 경제적 자립을 목적으로 운영됩니다.
              </p>
              <span className="inline-block bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2.5 py-1 rounded-md mt-6">
                공익법인(사단법인)
              </span>
            </div>

            <div className="bg-white p-8 rounded-2xl border-b-4 border-b-indigo-500 shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6 font-bold text-xl mx-auto">
                💰
              </div>
              <h3 className="font-bold text-lg text-slate-900">연 4.5% 수준의 저금리</h3>
              <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                연 4.5% 금리로 운영되며, 3회 이상 납입하시면 금리가 1% 낮아집니다. 카드론이나 대부업 이용 전에 미소금융을 먼저 알아보시기 바랍니다.
              </p>
              <div className="flex items-center gap-1.5 mt-6 text-[11px] font-bold text-indigo-700">
                <span className="bg-indigo-50 px-2.5 py-1 rounded-md">무담보</span>
                <span className="text-indigo-300">·</span>
                <span className="bg-indigo-50 px-2.5 py-1 rounded-md">무보증</span>
              </div>
            </div>

          </div>
        </div>

        {/* 미소금융 vs 일반 금융 아주 상세한 카드 테이블 비교 */}
        <div className="mt-24 md:mt-32 bg-slate-50/50 p-8 md:p-12 rounded-3xl border border-slate-100 text-left">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-slate-500 font-bold text-xs uppercase tracking-wider">Miso vs Commercial</h3>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-2">일반 은행과 미소금융, 어떻게 다른가요?</h2>
            <p className="text-slate-500 text-xs mt-1">서민 지원을 전담하는 미소금융대구중구법인만의 강력한 이점</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-500">
              <thead className="text-xs text-slate-700 uppercase bg-slate-100 rounded-lg">
                <tr>
                  <th scope="col" className="px-6 py-4 rounded-l-xl font-bold">구분</th>
                  <th scope="col" className="px-6 py-4 font-bold text-teal-700">미소금융 (대구중구법인)</th>
                  <th scope="col" className="px-6 py-4 rounded-r-xl font-bold">일반 금융 (은행·카드·대부업)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">운영 목적</td>
                  <td className="px-6 py-4 font-semibold text-teal-600">소상공인과 서민의 경제적 자립 지원 (비영리)</td>
                  <td className="px-6 py-4 text-slate-500">금융회사의 수익 창출 (영리)</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">대표 이자율</td>
                  <td className="px-6 py-4 font-extrabold text-teal-600">연 4.5% 수준</td>
                  <td className="px-6 py-4 text-slate-500">신용도에 따라 고금리 적용</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">담보 및 보증</td>
                  <td className="px-6 py-4 font-semibold text-teal-600">무담보·무보증</td>
                  <td className="px-6 py-4 text-slate-500">부동산 담보 또는 보증 필요</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">자금 출처</td>
                  <td className="px-6 py-4 font-semibold text-teal-600">정부(서민금융진흥원) 정책 재원</td>
                  <td className="px-6 py-4 text-slate-500">고객 예·적금 및 금융시장 조달</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
