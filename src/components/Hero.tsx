/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useAnimation } from 'motion/react';
import { useState, useEffect, useRef, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, ArrowRight, Users, Banknote, MapPin, RotateCcw, Landmark, ClipboardList } from 'lucide-react';

function useCountUp(target: number, duration: number, trigger: boolean) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!trigger) return;
    setDone(false);
    let startTime: number | null = null;
    let frameId: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) frameId = requestAnimationFrame(step);
      else { setCount(target); setDone(true); }
    };
    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [trigger, target, duration]);
  return { count, done };
}

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
}

const AUDIENCE = ['청년', '영세자영업자', '취약계층'];

const PHONE_NUMBER = '053-252-6408';

// 카드 슬롯 공통 껍데기. 슬롯 자체는 항상 마운트된 채로 유지되고,
// 슬롯 안의 콘텐츠(icon/title/value/desc/링크)만 부모에서 바꿔 끼운다.
// → 카드가 배열에서 추가/삭제되는 구조가 아니므로 AnimatePresence의
//   mount/unmount(=등장/퇴장) 자체가 발생하지 않는다.
interface CardContent {
  icon: ReactNode;
  title: string;
  value: string;
  valueClass?: string;
  desc: string;
  href?: string;
  to?: string;
  action?: () => void;
  pulseControls?: ReturnType<typeof useAnimation>;
}

function CardSlot({ content, darkBg }: { content: CardContent; darkBg: boolean }) {
  // Tag는 content가 무엇이든 항상 같은 엘리먼트 타입을 유지해야 한다.
  // (motion.div ↔ Link처럼 타입 자체가 바뀌면 리액트가 이전 인스턴스를
  //  언마운트하고 새로 마운트하면서 initial→whileInView가 재실행되고,
  //  이게 5·6번 카드가 "재마운트되어 다시 나타나는" 것처럼 보이던
  //  진짜 원인이었다.) 링크 이동은 href만 네이티브 <a>로 두고,
  // to(내부 라우트)는 onClick에서 navigate()로 직접 처리한다.
  const navigate = useNavigate();
  const Tag = content.href ? motion.a : motion.div;
  const clickable = !!(content.action || content.href || content.to);
  const handleClick = () => {
    content.action?.();
    if (content.to) navigate(content.to);
  };
  return (
    <Tag
      {...(content.href ? { href: content.href } : {})}
      onClick={handleClick}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 18 }}
      className={`relative rounded-2xl shadow-sm transition-colors duration-500 text-left group overflow-hidden min-w-0 border border-white/30 hover:border-teal-200 hover:shadow-md ${
        darkBg ? 'bg-black/30 backdrop-blur-md' : 'bg-white/5 backdrop-blur-[2px]'
      } ${clickable ? 'cursor-pointer' : ''}`}
    >
      <div className="p-2 min-[360px]:p-3 md:p-6 relative z-10 min-w-0">
        <div className="flex justify-between items-start">
          <div className="p-2 md:p-3 rounded-xl transition-all shadow-inner bg-white/10 group-hover:bg-white/20">
            {content.icon}
          </div>
          {clickable && <ArrowRight className="w-4 h-4 transition-colors text-white/70 shrink-0" />}
        </div>
        <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-wider mt-3 md:mt-5 text-white/80 truncate">
          {content.title}
        </h3>
        <motion.p
          className={`font-extrabold mt-1 tracking-tight text-white drop-shadow truncate ${content.valueClass ?? 'text-lg md:text-3xl'}`}
          animate={content.pulseControls}
        >
          {content.value}
        </motion.p>
        <p className="text-[10px] md:text-xs mt-1 font-semibold text-white/70 truncate">{content.desc}</p>
      </div>
    </Tag>
  );
}

export default function Hero({ onScrollToSection }: HeroProps) {
  // 부모(App)가 onScrollToSection을 useCallback 없이 매 렌더 새로 생성해
  // 전달하므로, ref로 최신 함수만 보관해 리렌더에 영향받지 않도록 분리한다.
  const onScrollToSectionRef = useRef(onScrollToSection);
  useEffect(() => {
    onScrollToSectionRef.current = onScrollToSection;
  }, [onScrollToSection]);

  const [audienceIdx, setAudienceIdx] = useState(0);
  const [statsInView, setStatsInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);

  // 5·6번(상품별 조건 확인 / 신청 절차 확인) 카드는 동영상 재생 시간과
  // 무관하게, 3·4번(누적 대출 건수/금액) 숫자 카운팅이 끝나면 그 자리에
  // 바로 표시된다. 한 번 true가 되면 다시 false로 되돌리는 코드는
  // 어디에도 없다(리렌더 시 재계산되지 않는 단순 불리언 상태).
  const [showNavCards, setShowNavCards] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAudienceIdx(prev => (prev + 1) % AUDIENCE.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // 퀵카드는 히어로 최초 화면 안에 있는 콘텐츠라, 스크롤 진입을 기다리지 않고
    // 짧은 지연 후 바로 카운트업을 시작 (화면이 낮은 기기에서 "0건" 노출 방지)
    const timer = setTimeout(() => setStatsInView(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const { count: countPeople, done: peopleDone } = useCountUp(6300, 1200, statsInView);
  const { count: countMoney, done: moneyDone } = useCountUp(600, 1200, statsInView);

  useEffect(() => {
    if (peopleDone && moneyDone) {
      setShowNavCards(true);
    }
  }, [peopleDone, moneyDone]);

  const peopleAnim = useAnimation();
  const moneyAnim = useAnimation();

  useEffect(() => {
    if (peopleDone) {
      peopleAnim.start({
        scale: [1, 1.5, 0.9, 1.25, 0.95, 1.1, 1],
        x: [0, 18, -4, 10, -2, 5, 0],
        transition: { duration: 0.8, ease: 'easeInOut' as const }
      });
    }
  }, [peopleDone]);

  useEffect(() => {
    if (moneyDone) {
      moneyAnim.start({
        scale: [1, 1.5, 0.9, 1.25, 0.95, 1.1, 1],
        x: [0, 18, -4, 10, -2, 5, 0],
        transition: { duration: 0.8, ease: 'easeInOut' as const }
      });
    }
  }, [moneyDone]);

  // 타이틀 순차 애니메이션 phase: 0→숨김 1→1번등장 2→2번등장 3→고정
  const [titlePhase, setTitlePhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setTitlePhase(1), 300);
    const t2 = setTimeout(() => setTitlePhase(2), 1100);
    const t3 = setTimeout(() => setTitlePhase(3), 1900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // 카드 정의 (사용자 지정 번호)
  // 1: 누적 대출 건수, 2: 누적 대출 금액, 3: 법인 방문 오시는 길,
  // 4: 전화 상담 문의, 5: 상품별 조건 확인, 6: 신청 절차 확인
  const card3Location: CardContent = {
    icon: <MapPin className="w-6 h-6 text-rose-600" />,
    title: '법인 방문 오시는 길',
    value: '하나은행 봉덕지점 4층',
    valueClass: 'text-sm md:text-xl whitespace-nowrap',
    desc: '대구 남구 중앙대로 146',
    action: () => onScrollToSectionRef.current('location')
  };

  const card4Call: CardContent = {
    icon: <Phone className="w-6 h-6 text-rose-600" />,
    title: '전화 상담 문의',
    value: PHONE_NUMBER,
    valueClass: 'text-lg md:text-3xl tabular-nums',
    desc: '평일 09시 ~ 18시 운영',
    href: `tel:${PHONE_NUMBER}`
  };

  const card1StatsCount: CardContent = {
    icon: <Users className="w-6 h-6 text-emerald-600" />,
    title: '누적 대출 건수',
    value: statsInView ? `${countPeople.toLocaleString()} 건` : '0 건',
    valueClass: 'text-[clamp(1rem,4.5vw,1.125rem)] md:text-3xl tabular-nums whitespace-nowrap',
    desc: '2026년 누적 기준',
    pulseControls: peopleAnim
  };

  const card2StatsAmount: CardContent = {
    icon: (
      <div className="relative inline-flex items-center justify-center">
        <Banknote className="w-6 h-6 text-indigo-600" />
        <span className="absolute -top-1.5 -right-2 text-[9px] font-black bg-indigo-600 text-white rounded-full px-1 leading-tight">₩</span>
      </div>
    ),
    title: '누적 대출 금액',
    value: statsInView ? `${countMoney}억 원 돌파` : '0억 원 돌파',
    valueClass: 'text-[clamp(1rem,4.5vw,1.125rem)] md:text-3xl tabular-nums whitespace-nowrap',
    desc: '2026년 누적 기준',
    pulseControls: moneyAnim
  };

  const card5Products: CardContent = {
    icon: <Landmark className="w-6 h-6 text-indigo-600" />,
    title: '대출상품 안내',
    value: '상품별 조건 확인',
    valueClass: 'text-sm md:text-2xl whitespace-nowrap',
    desc: '상품 비교 후 신청 가능',
    to: '/products'
  };

  const card6Apply: CardContent = {
    icon: <ClipboardList className="w-6 h-6 text-emerald-600" />,
    title: '신청안내',
    value: '신청 절차 확인',
    valueClass: 'text-sm md:text-2xl whitespace-nowrap',
    desc: '상담부터 결과 안내까지',
    to: '/guide'
  };

  // 첫 번째·두 번째 슬롯의 내용만 showNavCards에 따라 바뀐다.
  // 슬롯(껍데기) 자체는 항상 같은 위치에 마운트되어 있으므로 등장/퇴장
  // 애니메이션이 반복될 여지가 없다.
  const slot1 = showNavCards ? card5Products : card1StatsCount;
  const slot2 = showNavCards ? card6Apply : card2StatsAmount;

  return (
    <section
      id="hero-section"
      className="relative overflow-hidden flex flex-col min-h-[100svh]"
    >

      {/* 최초 로딩 배경(포스터) — 모바일 중앙 정렬(50:50), 동영상 재생 시작 전까지만 표시 */}
      <img
        src="/hero-bg.jpg"
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full object-cover [object-position:50%_50%] transition-opacity duration-500 ${videoPlaying ? 'opacity-0' : 'opacity-100'}`}
      />
      {/* 배경 동영상 — 재생 시작 후 모바일은 80% 우측 기준 표시 */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="metadata"
        onCanPlay={() => { if (videoRef.current) videoRef.current.playbackRate = 0.8; }}
        onPlaying={() => setVideoPlaying(true)}
        onEnded={() => setVideoEnded(true)}
        className="absolute inset-0 w-full h-full object-cover [object-position:80%_0%] md:[object-position:50%_50%]"
        src="/hero-bg.mp4"
      />
      {/* 영상 종료 후에만 노출되는 다시보기 버튼 */}
      {videoEnded && (
        <button
          type="button"
          onClick={() => {
            if (videoRef.current) {
              videoRef.current.currentTime = 0;
              videoRef.current.play();
            }
            setVideoEnded(false);
          }}
          aria-label="배경 영상 다시보기"
          className="absolute top-20 right-5 md:top-24 z-20 flex items-center gap-1.5 bg-white/85 hover:bg-white text-slate-700 text-xs font-semibold px-3 py-2 rounded-full shadow-md backdrop-blur-sm transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>다시보기</span>
        </button>
      )}
      {/* 오버레이 — 밝기 조정 */}
      <div className="absolute inset-0 bg-slate-900/5 md:bg-gradient-to-r md:from-slate-900/10 md:via-slate-900/5 md:to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/5 pointer-events-none" />

      <div className="relative z-10 flex flex-col flex-1 pt-12 md:pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col flex-1">

        {/* 텍스트 영역 — 모바일: 상단 고정(카드 접힘에 영향받지 않음), PC: 중앙 */}
        <div className="flex-1 flex items-start md:items-center py-4 md:py-12">

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

            <h1 className="text-lg sm:text-xl lg:text-3xl font-extrabold tracking-tight text-white leading-snug break-keep space-y-1 overflow-hidden drop-shadow-lg">
              {/* 1번: 좌→우 슬라이드 후 고정 */}
              <motion.div
                initial={{ x: -80, opacity: 0 }}
                animate={titlePhase >= 1 ? { x: 0, opacity: 1 } : { x: -80, opacity: 0 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              >
                금융위원회 허가 비영리 공익법인이자 서민금융진흥원 미소금융 사업수행기관입니다.
              </motion.div>

              {/* 2번: 슬라이드 + 밑줄 애니메이션 */}
              <motion.div
                initial={{ x: -80, opacity: 0 }}
                animate={titlePhase >= 2 ? { x: 0, opacity: 1 } : { x: -80, opacity: 0 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className="relative inline-block"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-300">
                  청년·영세자영업자·금융취약계층을 위한 서민금융 상담을 제공합니다.
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

          </div>
        </div>

        {/* 6종 퀵 카드 — 3·4번 슬롯은 항상 마운트된 채로 내용만 전환된다 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 pb-4 md:pb-8">
          <CardSlot content={slot1} darkBg={videoEnded} />
          <CardSlot content={slot2} darkBg={videoEnded} />
          <CardSlot content={card3Location} darkBg={videoEnded} />
          <CardSlot content={card4Call} darkBg={videoEnded} />
        </div>

      </div>
      </div>
    </section>
  );
}
