/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Award, Trophy, Newspaper, Briefcase, Calendar, MapPin, Bus, Train, Car, Phone, Share2, Printer, ExternalLink, FileText, Copy, Check, ShieldCheck, ArrowRight } from 'lucide-react';

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

const PHONES = [
  { number: '053-252-6408', chip: 'bg-rose-100 text-rose-700',    bg: 'from-rose-500 to-pink-500' },
  { number: '053-252-6409', chip: 'bg-indigo-100 text-indigo-700', bg: 'from-indigo-500 to-violet-500' },
  { number: '053-252-6479', chip: 'bg-teal-100 text-teal-700',    bg: 'from-teal-500 to-emerald-500' },
  { number: '053-252-6480', chip: 'bg-amber-100 text-amber-700',  bg: 'from-amber-500 to-orange-500' },
];

// 이사진 소개는 요청 시까지 비공개 — 콘텐츠는 삭제하지 않고 렌더링만 끈다 (조직도 자체는 공개)
const SHOW_BOARD_MEMBERS = false;

const BOARD_MEMBERS = [
  { role: '이사장', name: '김석동', affiliation: '(前) 한국산업은행 부장' },
  { role: '이사', name: '박정희', affiliation: '(現) 영남대학교 경제금융학부 교수' },
  { role: '이사', name: '정순도', affiliation: '(現) 법무법인 정앤정 변호사' },
  { role: '이사', name: '홍성헌', affiliation: '(前) 경영학박사/산학연구원사무처장' },
  { role: '이사', name: '정헌철', affiliation: '(前) 한국산업은행 부장' },
  { role: '감사', name: '윤기태', affiliation: '(現) 공인회계사/세무사/경신세무회계사무소 대표' },
];

// 재정보고 — 연도별 재무상태표·손익계산서 PDF. 파일 확보되는 대로 file 값을 채운다 (없으면 "등록 예정"으로 표시)
const DISCLOSURES = [
  { year: 2025, file: '/disclosures/2025.pdf' as string | null },
  { year: 2024, file: '/disclosures/2024.pdf' as string | null },
  { year: 2023, file: '/disclosures/2023.pdf' as string | null },
  { year: 2022, file: '/disclosures/2022.pdf' as string | null },
  { year: 2021, file: '/disclosures/2021.pdf' as string | null },
  { year: 2020, file: '/disclosures/2020.pdf' as string | null },
  { year: 2019, file: '/disclosures/2019.pdf' as string | null },
  { year: 2018, file: '/disclosures/2018.pdf' as string | null },
  { year: 2017, file: '/disclosures/2017.pdf' as string | null },
  { year: 2016, file: '/disclosures/2016.pdf' as string | null },
  { year: 2015, file: '/disclosures/2015.pdf' as string | null },
  { year: 2014, file: '/disclosures/2014.pdf' as string | null },
  { year: 2013, file: '/disclosures/2013.pdf' as string | null },
  { year: 2012, file: '/disclosures/2012.pdf' as string | null },
  { year: 2011, file: '/disclosures/2011.pdf' as string | null },
  { year: 2010, file: '/disclosures/2010.pdf' as string | null },
];

// 공시 아카이브 그룹핑 — 최근 5개년은 별도로, 나머지는 연대별로 묶어 표시
const RECENT_DISCLOSURES = DISCLOSURES.slice(0, 6);
const OLDER_DISCLOSURES_BY_DECADE = DISCLOSURES.slice(6).reduce<Record<string, typeof DISCLOSURES>>((acc, d) => {
  const decade = `${Math.floor(d.year / 10) * 10}년대`;
  acc[decade] = [...(acc[decade] ?? []), d];
  return acc;
}, {});

// 연도별 총자산(원) — 재무상태표 기준. 성장 추이 그래프에 사용 (연도 오름차순)
const ASSET_GROWTH = [
  { year: 2010, amount: 184054342 },
  { year: 2011, amount: 691882995 },
  { year: 2012, amount: 2259820402 },
  { year: 2013, amount: 3956537727 },
  { year: 2014, amount: 4961103652 },
  { year: 2015, amount: 8293574028 },
  { year: 2016, amount: 11273122087 },
  { year: 2017, amount: 13033042580 },
  { year: 2018, amount: 14140558331 },
  { year: 2019, amount: 14710921616 },
  { year: 2020, amount: 16202042022 },
  { year: 2021, amount: 14165670694 },
  { year: 2022, amount: 13056457088 },
  { year: 2023, amount: 12279649667 },
  { year: 2024, amount: 11201603433 },
  { year: 2025, amount: 10533341130 },
];
const ASSET_MAX = Math.max(...ASSET_GROWTH.map(a => a.amount));
const formatEok = (won: number) => `${(won / 100000000).toFixed(1)}억`;

// 성장 추이 라인 차트 좌표 계산 (SVG viewBox 기준, 0을 기준선으로 유지)
const CHART_W = 760;
const CHART_H = 200;
const CHART_MARGIN_X = 24;
const CHART_TOP = 30;
const CHART_BASELINE = 160;
const chartPoints = ASSET_GROWTH.map((a, idx) => {
  const x = CHART_MARGIN_X + (idx * (CHART_W - CHART_MARGIN_X * 2)) / (ASSET_GROWTH.length - 1);
  const y = CHART_BASELINE - (a.amount / ASSET_MAX) * (CHART_BASELINE - CHART_TOP);
  return { ...a, x, y };
});
const chartLinePath = chartPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
const chartAreaPath = `${chartLinePath} L${chartPoints[chartPoints.length - 1].x},${CHART_BASELINE} L${chartPoints[0].x},${CHART_BASELINE} Z`;

export default function AboutSection({ sectionId }: { sectionId?: string }) {
  const show = (ids: string | string[]) =>
    !sectionId || (Array.isArray(ids) ? ids.includes(sectionId) : sectionId === ids);

  const [financeStatsInView, setFinanceStatsInView] = useState(false);
  const financeYearCount = useCountUp(DISCLOSURES.length, 2200, financeStatsInView);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const handleCopy = (field: string, value: string) => {
    navigator.clipboard?.writeText(value).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(prev => (prev === field ? null : prev)), 1500);
    });
  };

  const [phoneIdx, setPhoneIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setPhoneIdx(prev => (prev + 1) % PHONES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const [lightboxImg, setLightboxImg] = useState<{ src: string; alt: string; caption: string } | null>(null);
  useEffect(() => {
    if (!lightboxImg) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightboxImg(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxImg]);

  type HistoryCategory = '설립' | '협약' | '수상' | '지원성과' | '기관운영';

  interface HistoryItem {
    date: string;
    text: string;
    category: HistoryCategory;
    emphasis: boolean;
    status?: 'planned';
    impact?: string;
    newsUrl?: string;
    newsUrl2?: string;
    govHonor?: boolean;
    honorScope?: '법인' | '대표자';
  }

  // 2026.07 통합 정리 — 「미소금융16년_연혁」 원본 문서 기준 재구성 (32건)
  // 삭제 처리: 2025.07.02 임대차계약 연장(대내 행정사항), 2015.01.16 연도 오표기 항목,
  //           2016.03.20·2018.02.02 중복 의심 항목(각각 2016.01.18·2018.08.22와 동일 실적)
  const categoryStyle: Record<HistoryCategory, string> = {
    '설립': 'bg-teal-50 text-teal-700 border border-teal-200',
    '협약': 'bg-indigo-50 text-indigo-700 border border-indigo-200',
    '수상': 'bg-amber-50 text-amber-700 border border-amber-200',
    '지원성과': 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    '기관운영': 'bg-slate-100 text-slate-600 border border-slate-200',
  };
  const categoryActiveStyle: Record<HistoryCategory, string> = {
    '설립': 'bg-teal-600 text-white border border-teal-600',
    '협약': 'bg-indigo-600 text-white border border-indigo-600',
    '수상': 'bg-amber-600 text-white border border-amber-600',
    '지원성과': 'bg-emerald-600 text-white border border-emerald-600',
    '기관운영': 'bg-slate-600 text-white border border-slate-600',
  };
  const HISTORY_CATEGORIES: HistoryCategory[] = ['설립', '협약', '수상', '지원성과', '기관운영'];

  const historyData: { year: string; items: HistoryItem[] }[] = [
    {
      year: '2026',
      items: [
        { date: '04.28', text: '서민금융진흥원장 표창장(2025년 사업실적평가 우수상) 수상', category: '수상', emphasis: true },
        { date: '08.03', text: '미소금융대구중구법인 홈페이지 개설 예정', category: '기관운영', emphasis: true, status: 'planned' }
      ]
    },
    {
      year: '2023',
      items: [
        { date: '04.01', text: '신중년 사회공헌사업단 시범운영 개시', category: '지원성과', emphasis: false },
        { date: '09.15', text: '영남대학교 기업연계기반 Capstone Design 현장 실습 프로그램 운영', category: '협약', emphasis: false }
      ]
    },
    {
      year: '2022',
      items: [
        { date: '08.01', text: '현 사무소 이전 (남구 중앙대로 146, 하나은행 봉덕지점 4층)', category: '기관운영', emphasis: false }
      ]
    },
    {
      year: '2020',
      items: [
        { date: '04.21', text: '2019년 미소금융 사업실적 평가 최우수등급 표창(서민금융진흥원장)', category: '수상', emphasis: false }
      ]
    },
    {
      year: '2019',
      items: [
        { date: '03.27', text: '2018년 미소금융 사업실적 평가 최우수등급 표창(서민금융진흥원장)', category: '수상', emphasis: false },
        { date: '06.17', text: '대구서민금융통합지원센터 지역협의체 출범 참가', category: '협약', emphasis: true, newsUrl: 'https://www.yeongnam.com/web/view.php?key=20190618.010170750260001' }
      ]
    },
    {
      year: '2018',
      items: [
        { date: '03.27', text: '2017년 미소금융 사업실적 평가 최우수등급 표창(서민금융진흥원장)', category: '수상', emphasis: false },
        { date: '06.28', text: '법인 명칭 변경 (미소금융대구중구지점 → 미소금융대구중구법인) 및 사업내용(사회적금융) 추가', category: '기관운영', emphasis: false },
        { date: '08.22', text: '서민금융진흥원장 표창장 (200/2000클럽) 수상', category: '수상', emphasis: false },
        { date: '08.31', text: '전국 미소금융 사회적경제기업 1호 대출 지원', category: '지원성과', emphasis: true, newsUrl: 'https://www.yna.co.kr/view/AKR20180831135900002' },
        { date: '10.30', text: '제3회 금융의 날 서민금융부문 국민포장 수훈 (김석동 대표)', category: '수상', emphasis: true, newsUrl: 'https://www.skyedaily.com/news/news_view.html?ID=78486', govHonor: true, honorScope: '대표자' }
      ]
    },
    {
      year: '2017',
      items: [
        { date: '02.17', text: '서민금융진흥원장 표창장 (찾아가는 서비스 최우수상) 수상', category: '수상', emphasis: false },
        { date: '03.21', text: '2016년 미소금융 사업실적 평가 최우수등급 표창(서민금융진흥원장)', category: '수상', emphasis: false }
      ]
    },
    {
      year: '2016',
      items: [
        { date: '01.15', text: '미소금융중앙재단 표창장 (100/1,000클럽)', category: '수상', emphasis: false },
        { date: '03.20', text: '2015년 미소금융 사업실적 평가 우수등급(서민금융진흥원장)', category: '수상', emphasis: false },
        { date: '09.23', text: '서민금융진흥원 출범으로 법인 기능·명칭 변경 (복지사업자 → 사업수행기관)', category: '기관운영', emphasis: true, newsUrl: 'https://www.yna.co.kr/view/AKR20160923070451002' },
        { date: '12.14', text: '서문시장 화재 성금 전달 및 봉사활동 지원', category: '지원성과', emphasis: false, newsUrl: 'https://www.yeongnam.com/web/view.php?key=20161206.990011109310983' }
      ]
    },
    {
      year: '2015',
      items: [
        { date: '01.16', text: '미소금융중앙재단 표창장 (50/500클럽)', category: '수상', emphasis: false },
        { date: '03.17', text: '2014년 미소금융 사업실적 평가 최우수등급 표창(미소금융중앙재단)', category: '수상', emphasis: false },
        { date: '09.18', text: '영남대학교 LINC사업단과 창업지원 업무협약 체결 및 Capstone Design 프로그램 운영', category: '협약', emphasis: false },
        { date: '10.27', text: "'2015 Asia-Pacific Financial Inclusion Summit' 국제회의(필리핀 마닐라) 우수 지역법인 대표 참가", category: '기관운영', emphasis: false },
        { date: '11.05', text: '영남대학교 총장 감사패 (산학협력 우수인재양성·취업활성화 기여)', category: '수상', emphasis: false },
        { date: '12.28', text: '대구서민금융통합지원센터 유치 및 개소식 (금융위원장·대구광역시장 참석)', category: '협약', emphasis: true, newsUrl: 'https://www.iij.co.kr/news/articleView.html?idxno=138547' }
      ]
    },
    {
      year: '2014',
      items: [
        { date: '02.27', text: '2013년 미소금융 사업실적 평가 최우수등급 표창(미소금융중앙재단)', category: '수상', emphasis: false }
      ]
    },
    {
      year: '2013',
      items: [
        { date: '01.17', text: '2012년도 미소금융 사업실적 평가 최우수등급 표창(미소금융중앙재단)', category: '수상', emphasis: false, newsUrl: 'https://www.idaegu.co.kr/news/articleView.html?idxno=85600' },
        { date: '02.13', text: '대구신용보증재단과 서민금융지원 업무협약(MOU) 체결', category: '협약', emphasis: false, newsUrl: 'https://www.idaegu.co.kr/news/articleView.html?idxno=89376' },
        { date: '06.06', text: '사무소 이전 (중구 경상감영길 제일은행 대구지점 4층)', category: '기관운영', emphasis: false }
      ]
    },
    {
      year: '2012',
      items: [
        { date: '01.24', text: '2011년도 미소금융 사업실적 평가 최우수등급 표창(미소금융중앙재단)', category: '수상', emphasis: false },
        { date: '05.10', text: '대구광역시 지역 서민금융기관간 서민금융지원 업무협약(MOU) 체결', category: '협약', emphasis: false, newsUrl: 'https://www.newswire.co.kr/newsRead.php?no=622913' },
        { date: '12.12', text: "대통령 주재 '서민금융 보고대회' 참석(청와대 영빈관) 및 서민금융지원 유공 대통령 표창 수상", category: '수상', emphasis: true, impact: '지원액 20억 9천만 원, 전년 대비 2.5배 증가', newsUrl: 'https://www.korea.kr/news/policyNewsView.do?newsId=148753689', newsUrl2: 'https://www.imaeil.com/page/view/2013010507401495165', govHonor: true, honorScope: '법인' }
      ]
    },
    {
      year: '2011',
      items: [
        { date: '11.16', text: '미소금융 대구중구법인 대구동구청출장소 설치(동구청 민원실)', category: '기관운영', emphasis: false, newsUrl: 'https://www.imaeil.com/page/view/2011111616042014010' }
      ]
    },
    {
      year: '2010',
      items: [
        { date: '04.06', text: '사단법인 미소금융 지역거점 대표자 공모 선정', category: '설립', emphasis: false },
        { date: '04.27', text: '금융위원회로부터 비영리 사단법인 설립 허가', category: '설립', emphasis: false },
        { date: '04.28', text: '사무소 무상 임차 (중구 서문로 갑을빌딩 2층)', category: '설립', emphasis: false },
        { date: '05.06', text: '사단법인 미소금융대구중구법인 설립 등기 완료', category: '설립', emphasis: false },
        { date: '05.28', text: '개소식(대구광역시 정무부시장 참석) 및 영업개시', category: '설립', emphasis: true, newsUrl: 'https://www.fntimes.com/html/view.php?ud=20100530194522102969_18' }
      ]
    }
  ];

  // 연혁 최초 조회 시에는 전체 연도가 펼쳐진 상태로 시작한다
  const [openYears, setOpenYears] = useState<Set<string>>(new Set(historyData.map((m) => m.year)));
  const toggleYear = (year: string) => {
    setOpenYears((prev) => {
      const next = new Set(prev);
      if (next.has(year)) next.delete(year); else next.add(year);
      return next;
    });
  };
  const allYearsOpen = openYears.size === historyData.length;
  const toggleAllYears = () => setOpenYears(allYearsOpen ? new Set() : new Set(historyData.map((m) => m.year)));

  // 연혁 카테고리 필터(5종 단일 선택) + 언론보도 유무 별도 토글
  const [historyFilter, setHistoryFilter] = useState<'all' | HistoryCategory>('all');
  const [newsOnly, setNewsOnly] = useState(false);
  const toggleHistoryFilter = (filter: HistoryCategory) => {
    const next = historyFilter === filter ? 'all' : filter;
    setHistoryFilter(next);
    if (next !== 'all' || newsOnly) setOpenYears(new Set(historyData.map((m) => m.year)));
  };
  const toggleNewsOnly = () => {
    const next = !newsOnly;
    setNewsOnly(next);
    if (next || historyFilter !== 'all') setOpenYears(new Set(historyData.map((m) => m.year)));
  };
  const clearHistoryFilters = () => { setHistoryFilter('all'); setNewsOnly(false); };
  const filteredHistoryData = historyData
    .map((milestone) => ({
      ...milestone,
      items: milestone.items.filter((item) => {
        if (historyFilter !== 'all' && item.category !== historyFilter) return false;
        if (newsOnly && !item.newsUrl) return false;
        return true;
      }),
    }))
    .filter((milestone) => milestone.items.length > 0);

  const allHistoryItems = historyData.flatMap((m) => m.items.map((item) => ({ ...item, year: m.year })));
  const totalHistoryCount = allHistoryItems.length;
  const awardCount = allHistoryItems.filter((i) => i.category === '수상' && !i.govHonor).length;
  const foundingYear = historyData[historyData.length - 1].year;
  const presidentialAward = allHistoryItems.find((i) => i.honorScope === '법인');
  const individualHonor = allHistoryItems.find((i) => i.honorScope === '대표자');

  // 대표 연혁 5개 — historyData를 복제하지 않고 연도·날짜 키로 원본을 그대로 참조한다
  const HIGHLIGHT_KEYS: { year: string; date: string }[] = [
    { year: '2010', date: '05.28' },
    { year: '2012', date: '12.12' },
    { year: '2015', date: '12.28' },
    { year: '2018', date: '08.31' },
    { year: '2022', date: '08.01' },
  ];
  const highlightItems = HIGHLIGHT_KEYS
    .map(({ year, date }) => allHistoryItems.find((i) => i.year === year && i.date === date))
    .filter((i): i is typeof allHistoryItems[number] => !!i);

  return (
    <>
    <section className="pt-4 pb-20 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

        {/* 이사장 인사말 */}
        {show(['ceo-greeting', 'about-miso']) && <div id="ceo-greeting" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-slate-50 p-8 md:p-14 rounded-3xl border border-slate-100">
          <div className="lg:col-span-4 text-center">
            <div className="w-52 sm:w-64 md:w-72 aspect-[7/9] bg-slate-100 rounded-2xl mx-auto overflow-hidden shadow-md border-4 border-white">
              <img src="/ceo-photo.jpg" alt="미소금융대구중구법인 대표 김석동" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            </div>
          </div>

          <div className="lg:col-span-8 text-left space-y-6">
            <span className="text-xs font-black tracking-widest text-teal-600 uppercase">Ceo Greeting</span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug break-keep">
              &ldquo;영세자영업자의 든든한 버팀목이 되겠습니다.&rdquo;
            </h3>
            <div className="h-1 w-20 bg-teal-600 rounded-full" />

            <div className="text-slate-600 text-base md:text-lg leading-relaxed space-y-4 break-keep">
              <p>
                사단법인 미소금융 대구중구법인 홈페이지를 방문해주신 여러분께 진심으로 감사드립니다.
              </p>
              <p>
                미소금융은 저소득·저신용으로 제도권 금융을 이용하기 어려운 금융취약계층의 자립을 도와주기 위해 만들어진 대표적 정책서민금융이며, 우리 법인은 금융위원회의 허가를 받아 설립된 비영리 공익법인 및 미소금융 사업수행기관으로서 금융의 사회안전망 역할을 수행하고 있습니다.
              </p>
              <p>
                따라서 금융사각지대에 놓인 노점상이나 영세자영업자 중심의 지원대상자를 적극 발굴하여 적기의 자금 지원과 더불어, 일시적 어려움으로 절박한 상황에 놓인 청년과 취약계층에게도 희망을 주는 포용적 금융을 실천하기 위해 노력하겠습니다.
              </p>
              <p className="font-semibold text-slate-800">
                또한 사회적기업이나 사회적협동조합에 대한 사회적금융의 확대를 통해 지역경제 활성화와 지속가능한 공동체 발전에도 동참하고, 나아가 구성원 모두가 금융기관에서 오랜 기간 쌓은 금융경력을 사회에 환원하는 봉사정신으로 미소금융 이용자와 따뜻한 동반자가 되는데 최선을 다하겠습니다.
              </p>
            </div>

            <p className="text-right text-slate-800 font-extrabold text-base pt-4 decoration-teal-600 decoration-2">
              사단법인 미소금융 대구중구법인<br />
              대표 <span className="text-teal-600 font-black text-lg">김 석 동</span>
            </p>
          </div>
        </div>}

        {/* 법인 조직도 (공공기관 형식 CSS/SVG 다이어그램) */}
        {show('organization') && <div id="organization" className="text-center space-y-8 bg-white p-4 md:p-12 rounded-3xl border border-slate-100 shadow-sm">
          <div className="space-y-2">
            <span className="text-xs font-bold text-teal-600 tracking-widest uppercase">Organization Chart</span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight">조직도</h3>
            <p className="text-slate-500 text-xs">법인 운영 조직 및 업무 분장</p>
          </div>

          {/* 모바일 조직도 카드 레이아웃 */}
          <div className="md:hidden space-y-2 text-left">
            {/* 사원총회 */}
            <div className="w-[70%] mx-auto bg-slate-800 text-white text-center py-3 rounded-xl font-bold text-sm flex items-center justify-center h-12">사원총회</div>
            <div className="flex justify-center"><div className="w-0.5 h-4 bg-slate-300"/></div>
            {/* 이사회 + 감사 */}
            <div className="w-[70%] mx-auto flex gap-2">
              <div className="flex-1 bg-slate-700 text-white text-center py-3 rounded-lg font-bold text-sm flex items-center justify-center h-12">이사회</div>
              <div className="flex-1 bg-amber-500 text-white text-center py-3 rounded-lg font-bold text-sm flex items-center justify-center h-12">감사</div>
            </div>
            <div className="flex justify-center"><div className="w-0.5 h-4 bg-slate-300"/></div>
            {/* 이사장 */}
            <div className="w-[70%] mx-auto bg-teal-600 text-white text-center py-3 rounded-xl font-extrabold text-base flex items-center justify-center h-12">이사장 (대표)</div>
            <div className="flex justify-center"><div className="w-0.5 h-4 bg-slate-300"/></div>
            {/* 융자위원회 */}
            <div className="w-[55%] mx-auto bg-indigo-600 text-white text-center py-2 rounded-lg font-bold text-sm">융자위원회</div>
            <div className="flex justify-center"><div className="w-0.5 h-4 bg-slate-300"/></div>
            {/* 5개 부서 — 2열 그리드 */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-teal-50 border border-teal-200 rounded-lg py-2.5 text-center">
                <div className="text-teal-800 font-bold text-xs">전문위원</div>
                <div className="text-teal-600 text-[11px]">(여신심사 1팀)</div>
              </div>
              <div className="bg-teal-50 border border-teal-200 rounded-lg py-2.5 text-center">
                <div className="text-teal-800 font-bold text-xs">전문위원</div>
                <div className="text-teal-600 text-[11px]">(여신심사 2팀)</div>
              </div>
              <div className="bg-teal-50 border border-teal-200 rounded-lg py-2.5 text-center">
                <div className="text-teal-800 font-bold text-xs">전문위원</div>
                <div className="text-teal-600 text-[11px]">(여신심사 3팀)</div>
              </div>
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg py-2.5 text-center">
                <div className="text-indigo-800 font-bold text-xs">전문위원</div>
                <div className="text-indigo-600 text-[11px]">(사업 행정기획)</div>
              </div>
              <div className="col-span-2 bg-rose-50 border border-rose-200 rounded-lg py-2.5 text-center">
                <div className="text-rose-800 font-bold text-xs">신중년 사회공헌단</div>
              </div>
            </div>
          </div>

          {/* PC 조직도 SVG (md 이상) */}
          <div className="hidden md:block overflow-x-auto py-6">
            <div style={{minWidth: '840px'}}>
              <svg viewBox="0 0 840 385" width="840" height="385" xmlns="http://www.w3.org/2000/svg" style={{display:'block', margin:'0 auto', fontFamily:'inherit'}}>

                {/* ── 연결선 ── */}

                {/* 사원총회(center=310) → T → 이사회(310) & 감사(620) */}
                <line x1="310" y1="52" x2="310" y2="78" stroke="#CBD5E1" strokeWidth="2"/>
                <line x1="310" y1="78" x2="620" y2="78" stroke="#CBD5E1" strokeWidth="2"/>
                <line x1="310" y1="78" x2="310" y2="105" stroke="#CBD5E1" strokeWidth="2"/>
                <line x1="620" y1="78" x2="620" y2="105" stroke="#CBD5E1" strokeWidth="2"/>

                {/* 이사회(310) → 이사장(310) */}
                <line x1="310" y1="149" x2="310" y2="178" stroke="#CBD5E1" strokeWidth="2"/>

                {/* 이사장(310) 하단 수직선 → y=248 분기점 → 우측 수평 → 융자위원회(715) */}
                <line x1="310" y1="222" x2="310" y2="285" stroke="#CBD5E1" strokeWidth="2"/>
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
                <rect x="220" y="8" width="180" height="44" rx="10" fill="#1E293B"/>
                <text x="310" y="35" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">사 원 총 회</text>

                {/* 이사회 */}
                <rect x="220" y="105" width="180" height="44" rx="8" fill="#334155"/>
                <text x="310" y="132" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">이 사 회</text>

                {/* 감사 */}
                <rect x="530" y="105" width="180" height="44" rx="8" fill="#F59E0B"/>
                <text x="620" y="132" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">감   사</text>

                {/* 이사장 */}
                <rect x="220" y="178" width="180" height="44" rx="10" fill="#0D9488"/>
                <text x="310" y="205" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">이 사 장 (대표)</text>

                {/* 융자위원회 — 신중년(right=615)과 간격 확보: x=635 */}
                <rect x="635" y="260" width="160" height="42" rx="8" fill="#4F46E5"/>
                <text x="715" y="286" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">융 자 위 원 회</text>

                {/* 전문위원 여신심사 1팀 — teal */}
                <rect x="5"   y="300" width="110" height="60" rx="8" fill="#F0FDFA" stroke="#5EEAD4" strokeWidth="1.5"/>
                <text x="60"  y="323" textAnchor="middle" fill="#0F766E" fontSize="11" fontWeight="bold">전문위원</text>
                <text x="60"  y="344" textAnchor="middle" fill="#0D9488" fontSize="10">(여신심사 1팀)</text>

                {/* 전문위원 여신심사 2팀 — teal (동일) */}
                <rect x="130" y="300" width="110" height="60" rx="8" fill="#F0FDFA" stroke="#5EEAD4" strokeWidth="1.5"/>
                <text x="185" y="323" textAnchor="middle" fill="#0F766E" fontSize="11" fontWeight="bold">전문위원</text>
                <text x="185" y="344" textAnchor="middle" fill="#0D9488" fontSize="10">(여신심사 2팀)</text>

                {/* 전문위원 여신심사 3팀 — teal (동일) */}
                <rect x="255" y="300" width="110" height="60" rx="8" fill="#F0FDFA" stroke="#5EEAD4" strokeWidth="1.5"/>
                <text x="310" y="323" textAnchor="middle" fill="#0F766E" fontSize="11" fontWeight="bold">전문위원</text>
                <text x="310" y="344" textAnchor="middle" fill="#0D9488" fontSize="10">(여신심사 3팀)</text>

                {/* 전문위원 사업 행정기획 — indigo */}
                <rect x="380" y="300" width="110" height="60" rx="8" fill="#EEF2FF" stroke="#A5B4FC" strokeWidth="1.5"/>
                <text x="435" y="323" textAnchor="middle" fill="#3730A3" fontSize="11" fontWeight="bold">전문위원</text>
                <text x="435" y="344" textAnchor="middle" fill="#4F46E5" fontSize="10">(사업 행정기획)</text>

                {/* 신중년 사회공헌단 — rose */}
                <rect x="505" y="300" width="110" height="60" rx="8" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="1.5"/>
                <text x="560" y="323" textAnchor="middle" fill="#9F1239" fontSize="11" fontWeight="bold">신중년</text>
                <text x="560" y="344" textAnchor="middle" fill="#E11D48" fontSize="10">(사회공헌단)</text>

              </svg>
            </div>
          </div>

          {/* 이사진 현황 — 조직도 화면 내 별도 구성 */}
          {SHOW_BOARD_MEMBERS && <div className="pt-4 space-y-8 border-t border-slate-100">
            <div className="text-center space-y-2 pt-4">
              <span className="text-xs font-bold text-indigo-600 tracking-widest uppercase">Board Members</span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight">이사진 현황</h3>
              <p className="text-slate-500 text-xs">법인을 이끌어가는 이사회 구성원을 소개합니다</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {BOARD_MEMBERS.map((member, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  whileHover={{ y: -4 }}
                  className="bg-white border border-miso-navy-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-left space-y-2"
                >
                  <span className="inline-block text-[10px] font-black tracking-wide px-2.5 py-1 rounded-full bg-miso-navy-50 text-miso-navy-600 border border-miso-navy-100">
                    {member.role}
                  </span>
                  <h4 className="font-extrabold text-slate-900 text-lg">{member.name}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed break-keep">
                    <span className={member.affiliation.startsWith('(現)') ? 'font-bold text-miso-blue-700' : 'font-bold text-slate-400'}>
                      {member.affiliation.slice(0, 3)}
                    </span>
                    {member.affiliation.slice(3)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>}

        </div>}

        {/* 법인 연혁 (연도별 아코디언) */}
        {show('history') && <div id="history" className="space-y-8">

          <div className="text-center space-y-3">
            <span className="text-teal-600 font-bold text-sm tracking-widest uppercase">History Timeline</span>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight break-keep">지역과 함께한 대구중구법인의 발자취</h3>
            <p className="text-slate-500 text-sm max-w-2xl mx-auto break-keep">
              2010년 설립 이후 미소금융 사업과 지역 서민경제 발전을 지원해 온 주요 기록입니다.
            </p>
          </div>

          {/* 핵심 지표 3개 */}
          <div className="max-w-2xl mx-auto grid grid-cols-3 divide-x divide-slate-200 border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
            <div className="text-center py-4 px-2">
              <p className="text-2xl md:text-3xl font-black text-slate-900 font-mono">{foundingYear}</p>
              <p className="text-slate-500 text-[11px] md:text-xs font-semibold mt-1">법인 설립</p>
            </div>
            <div className="text-center py-4 px-2">
              <p className="text-2xl md:text-3xl font-black text-slate-900 font-mono">{presidentialAward?.year}</p>
              <p className="text-slate-500 text-[11px] md:text-xs font-semibold mt-1">대통령 표창</p>
            </div>
            <div className="text-center py-4 px-2">
              <p className="text-2xl md:text-3xl font-black text-slate-900 font-mono">{awardCount}회</p>
              <p className="text-slate-500 text-[11px] md:text-xs font-semibold mt-1">기관·사업실적 수상</p>
            </div>
          </div>

          {/* 대표 연혁 5개 — 32건 중 신뢰를 증명하는 핵심 기록만 먼저 보여준다 */}
          <div className="max-w-2xl mx-auto space-y-2">
            {highlightItems.map((item) => (
              <div key={`${item.year}-${item.date}`} className="flex items-center gap-3 bg-white border border-slate-100 rounded-xl px-4 py-3 shadow-sm">
                <span className="text-base md:text-lg font-black text-slate-800 font-mono w-14 shrink-0">{item.year}</span>
                <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${categoryStyle[item.category]}`}>{item.category}</span>
                <span className="flex-1 min-w-0 text-sm text-slate-700 break-keep">{item.text}</span>
                {item.newsUrl && (
                  <a href={item.newsUrl} target="_blank" rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100 text-[10px] font-bold px-2 py-1 rounded-full transition-colors">
                    <Newspaper className="w-3 h-3" /><span className="hidden sm:inline">근거자료 보기</span>
                  </a>
                )}
                {item.newsUrl2 && (
                  <a href={item.newsUrl2} target="_blank" rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100 text-[10px] font-bold px-2 py-1 rounded-full transition-colors">
                    <Newspaper className="w-3 h-3" /><span className="hidden sm:inline">관련기사 더보기</span>
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* 대표자 개인 수훈 — 법인 수상과 성격이 다르므로 별도 카드로 분리 표시 */}
          {individualHonor && (
            <div className="max-w-2xl mx-auto flex items-center gap-3 bg-gradient-to-br from-amber-50 to-amber-100/60 border border-amber-200 rounded-2xl px-5 py-4">
              <Award className="w-8 h-8 text-amber-600 shrink-0" aria-hidden="true" />
              <div className="flex-1 min-w-0 space-y-1">
                <p className="text-sm font-bold text-slate-800 break-keep">{individualHonor.text}</p>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-white bg-amber-600 px-2 py-0.5 rounded-full">대표자 수훈</span>
              </div>
              {individualHonor.newsUrl2 && (
                <a href={individualHonor.newsUrl2} target="_blank" rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-1 bg-white border border-amber-200 text-amber-700 hover:bg-amber-50 text-[11px] font-bold px-2.5 py-1.5 rounded-full transition-colors">
                  <Newspaper className="w-3.5 h-3.5" />관련기사 더보기</a>
              )}
              {individualHonor.newsUrl && (
                <a href={individualHonor.newsUrl} target="_blank" rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-1 bg-white border border-amber-200 text-amber-700 hover:bg-amber-50 text-[11px] font-bold px-2.5 py-1.5 rounded-full transition-colors">
                  <Newspaper className="w-3.5 h-3.5" />근거자료 보기
                </a>
              )}
            </div>
          )}

          <div className="text-center">
            <button
              type="button"
              onClick={toggleAllYears}
              className="text-sm font-bold text-teal-700 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-full px-5 py-2.5 transition-colors"
            >
              {allYearsOpen ? '대표 기록만 보기' : `전체 ${totalHistoryCount}건 보기`}
            </button>
          </div>

          {/* 분야별 필터 — 5개 카테고리 단일 선택 + 언론보도 유무 별도 토글 */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {HISTORY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => toggleHistoryFilter(cat)}
                aria-pressed={historyFilter === cat}
                className={`text-xs font-bold rounded-full px-3 py-1.5 transition-colors ${
                  historyFilter === cat ? categoryActiveStyle[cat] : categoryStyle[cat]
                }`}
              >
                {cat}
              </button>
            ))}
            <button
              type="button"
              onClick={toggleNewsOnly}
              aria-pressed={newsOnly}
              className={`inline-flex items-center gap-1 text-xs font-bold rounded-full px-3 py-1.5 border transition-colors ${
                newsOnly ? 'bg-slate-700 text-white border-slate-700' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Newspaper className="w-3 h-3" />언론보도만
            </button>
            {(historyFilter !== 'all' || newsOnly) && (
              <button
                type="button"
                onClick={clearHistoryFilters}
                className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-slate-600 rounded-full px-3 py-1.5 border border-slate-200 hover:border-slate-300 transition-colors"
              >
                ✕ 전체보기
              </button>
            )}
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden bg-white shadow-sm">
              {filteredHistoryData.map((milestone) => {
                const isOpen = openYears.has(milestone.year);
                return (
                  <div key={milestone.year}>
                    <button
                      type="button"
                      onClick={() => toggleYear(milestone.year)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between px-5 py-4 md:px-6 md:py-5 text-left hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="text-xl md:text-2xl font-black text-slate-800 font-mono tracking-tight">{milestone.year}</span>
                        <span className="text-xs text-slate-400 font-medium">{milestone.items.length}건</span>
                      </div>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-slate-400 text-sm"
                      >
                        ▾
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <ul className="px-5 md:px-6 pb-5 md:pb-6 space-y-3.5">
                            {milestone.items.map((item, id) => (
                              <li key={id} className={`flex items-start gap-3 ${item.status === 'planned' ? 'opacity-70' : ''}`}>
                                <span className="text-xs font-bold text-slate-400 font-mono tracking-wider w-12 pt-0.5 flex-shrink-0">{item.date}</span>
                                <div className="flex-1 min-w-0 space-y-1">
                                  {item.status === 'planned' && (
                                    <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border border-dashed border-slate-300 text-slate-400">예정</span>
                                  )}
                                  <div>
                                    {item.emphasis ? (
                                      <span className="inline-flex flex-wrap items-center gap-2">
                                        <strong className="text-slate-900 font-bold text-[15px] break-keep">
                                          {item.category === '수상' && <Trophy className="inline w-3.5 h-3.5 text-amber-500 mr-1 -mt-0.5" aria-hidden="true" />}
                                          {item.text}
                                        </strong>
                                        {item.newsUrl && (
                                          <a href={item.newsUrl} target="_blank" rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100 text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors">
                                            <Newspaper className="w-3 h-3" /><span>근거자료 보기</span>
                                          </a>
                                        )}
                                        {item.newsUrl2 && (
                                          <a href={item.newsUrl2} target="_blank" rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100 text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors">
                                            <Newspaper className="w-3 h-3" /><span>관련기사 더보기</span>
                                          </a>
                                        )}
                                      </span>
                                    ) : (
                                      <span className="inline-flex flex-wrap items-center gap-2">
                                        <span className="text-slate-600 text-sm break-keep">
                                          {item.category === '수상' && <Trophy className="inline w-3.5 h-3.5 text-amber-500 mr-1 -mt-0.5" aria-hidden="true" />}
                                          {item.text}
                                        </span>
                                        {item.newsUrl && (
                                          <a href={item.newsUrl} target="_blank" rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100 text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors">
                                            <Newspaper className="w-3 h-3" /><span>근거자료 보기</span>
                                          </a>
                                        )}
                                        {item.newsUrl2 && (
                                          <a href={item.newsUrl2} target="_blank" rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100 text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors">
                                            <Newspaper className="w-3 h-3" /><span>관련기사 더보기</span>
                                          </a>
                                        )}
                                      </span>
                                    )}
                                  </div>
                                  {item.govHonor && (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-white bg-gradient-to-r from-amber-500 to-amber-600 px-2 py-0.5 rounded-full">
                                      <Award className="w-3 h-3" aria-hidden="true" />
                                      {item.honorScope === '대표자' ? '대표자 수훈' : '법인 수상'}
                                    </span>
                                  )}
                                  {item.impact && (
                                    <p className="text-emerald-700 text-xs font-semibold">{item.impact}</p>
                                  )}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

        </div>}

        {/* 경영공시 — 연도별 재무상태표·손익계산서 */}
        {show('finance-report') && <div id="finance-report" className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-teal-600 to-emerald-600 px-6 py-8 md:px-12 md:py-10 text-white text-center space-y-2">
            <span className="text-xs font-bold text-white/70 tracking-widest uppercase">Management Disclosure</span>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">경영공시</h3>
            <p className="text-white/85 text-xs md:text-sm leading-relaxed max-w-xl mx-auto break-keep">
              2010년부터 2025년까지, {financeYearCount}년 연속 결산서류를 공개합니다.<br />
              투명한 기관 운영을 위해 연도별 재무상태표와 손익계산서를 제공합니다.
            </p>
          </div>

          <div className="p-6 md:p-12 space-y-10">

            {/* 총자산 성장 추이 그래프 */}
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <h4 className="font-extrabold text-slate-900 text-base md:text-lg">법인 성장 추이</h4>
                <p className="text-slate-400 text-xs">연도별 총자산 (단위: 억원)</p>
              </div>
              <div className="overflow-x-auto pb-2">
                <svg
                  viewBox={`0 0 ${CHART_W} ${CHART_H}`}
                  className="w-full min-w-[720px] md:min-w-0"
                  role="img"
                  aria-label="연도별 총자산 추이 꺾은선 그래프"
                >
                  <defs>
                    <linearGradient id="assetAreaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0d9488" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="assetLineGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#0d9488" />
                      <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                  </defs>

                  {/* 기준선(0) */}
                  <line x1={CHART_MARGIN_X} y1={CHART_BASELINE} x2={CHART_W - CHART_MARGIN_X} y2={CHART_BASELINE} stroke="#e2e8f0" strokeWidth="1" />

                  {/* 영역 채우기 */}
                  <motion.path
                    d={chartAreaPath}
                    fill="url(#assetAreaGradient)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  />

                  {/* 추세선 (draw-in 애니메이션) */}
                  <motion.path
                    d={chartLinePath}
                    fill="none"
                    stroke="url(#assetLineGradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 1.4, ease: 'easeInOut' }}
                  />

                  {/* 연도별 포인트 + 라벨 — 꺾은선이 그려지는 속도(1.4초)에 맞춰
                      좌→우로 순차 지연시키고, 등장 시 원이 한 번 크게 점등되었다가 안정된다 */}
                  {chartPoints.map((p, idx) => {
                    const pointDelay = (idx / Math.max(chartPoints.length - 1, 1)) * 1.4;
                    return (
                    <motion.g
                      key={p.year}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.2, delay: pointDelay }}
                    >
                      <text x={p.x} y={p.y - 10} textAnchor="middle" fontSize="10" fontWeight="700" fill="#475569">
                        {formatEok(p.amount)}
                      </text>
                      <motion.circle
                        cx={p.x}
                        cy={p.y}
                        r="4"
                        fill="#fff"
                        stroke="#0d9488"
                        strokeWidth="2.5"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: [0, 2.2, 1] }}
                        whileHover={{ scale: 1.6 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ scale: { duration: 0.5, delay: pointDelay, times: [0, 0.5, 1], ease: 'easeOut' } }}
                        style={{ transformOrigin: `${p.x}px ${p.y}px`, cursor: 'default' }}
                      />
                      <text x={p.x} y={CHART_BASELINE + 22} textAnchor="middle" fontSize="10" fontWeight="600" fill="#94a3b8" fontFamily="monospace">
                        {p.year}
                      </text>
                    </motion.g>
                    );
                  })}
                </svg>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-6 md:px-8 md:py-7 space-y-4">
              <div className="flex flex-col items-center gap-3 text-center">
                <a
                  href="https://hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index_pp.xml&tmIdx=44&tm2lIdx=4405000000&tm3lIdx=4405020000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-colors whitespace-nowrap"
                >
                  <ExternalLink className="w-4 h-4 shrink-0" />
                  국세청 공익법인 공시시스템 바로가기
                </a>

                {/* 조회용 정보 복사 칩 */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {[
                    { field: 'name', label: '단체명', value: '(사)미소금융대구중구법인' },
                    { field: 'bizno', label: '사업자번호', value: '504-82-13565' },
                  ].map((item) => (
                    <button
                      key={item.field}
                      type="button"
                      onClick={() => handleCopy(item.field, item.value)}
                      className="inline-flex items-center gap-1.5 bg-white border border-slate-200 hover:border-emerald-300 text-slate-600 hover:text-emerald-700 text-xs font-semibold pl-3 pr-2.5 py-1.5 rounded-full transition-colors"
                    >
                      <span className="text-slate-400">{item.label}</span>
                      <span className="font-bold">{item.value}</span>
                      {copiedField === item.field ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-slate-400 text-[11px] break-keep">칩을 누르면 클립보드에 복사됩니다. 국세청 조회 화면에 붙여넣어 확인하세요.</p>
              </div>

              {/* 구분선 — 국세청 조회 정보와 공시 연혁 지표를 시각적으로 분리 */}
              <div className="border-t border-slate-200" />

              {/* N년 연속 공시 지표 — 001기 2010년 → 016기 2025년 순으로 증가하는 카운트업 */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                onViewportEnter={() => setFinanceStatsInView(true)}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-3 pt-1"
              >
                <div className="flex items-center gap-3">
                  <div className="shrink-0 bg-white border-2 border-teal-600 rounded-xl px-3.5 py-2 text-center leading-tight">
                    <p className="text-teal-700 font-black text-lg tabular-nums font-mono">
                      {String(Math.max(financeYearCount, 1)).padStart(3, '0')}기
                    </p>
                    <p className="text-slate-400 text-[11px] font-bold tabular-nums">
                      {Math.min(2010 + Math.max(financeYearCount, 1) - 1, 2025)}년
                    </p>
                  </div>
                  <div className="text-left">
                    <p className="flex items-center gap-1 text-teal-700 text-sm font-bold">
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      {financeYearCount}년 연속 결산서류 공시
                    </p>
                    <p className="text-slate-400 text-xs">2010년 ~ 2025년 공시자료 아카이브</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 font-mono">
                  <span>2010</span>
                  <span className="w-16 sm:w-28 h-px bg-gradient-to-r from-slate-300 to-teal-500" />
                  <span className="text-teal-700">2025</span>
                </div>
              </motion.div>
            </div>

            {/* 최신 공시자료 강조 카드 */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-slate-900 text-base md:text-lg text-center">최신 공시자료</h4>
              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200 rounded-2xl px-5 py-5 md:px-8 md:py-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="shrink-0 bg-teal-600 text-white font-black text-lg md:text-xl px-3 py-1.5 rounded-lg font-mono">
                    {DISCLOSURES[0].year}년
                  </span>
                  <div className="min-w-0">
                    <p className="font-bold text-slate-800 text-sm md:text-base break-keep">재무상태표 및 손익계산서</p>
                    <p className="text-slate-400 text-xs break-keep">가장 최근 공개된 결산서류입니다</p>
                  </div>
                </div>
                {DISCLOSURES[0].file ? (
                  <motion.a
                    href={DISCLOSURES[0].file}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="shrink-0 inline-flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    PDF 보기
                  </motion.a>
                ) : (
                  <span className="shrink-0 text-xs font-semibold text-slate-400">등록 예정</span>
                )}
              </div>
            </div>

            {/* 공시 아카이브 — 연도별 카드 그리드 */}
            <div className="space-y-6">
              {[
                { label: '최근 공시', items: RECENT_DISCLOSURES },
                ...Object.entries(OLDER_DISCLOSURES_BY_DECADE).map(([label, items]) => ({ label, items })),
              ].map((group) => (
                <div key={group.label} className="space-y-3">
                  <h4 className="font-extrabold text-slate-700 text-sm md:text-base">{group.label}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {group.items.map((d, idx) => (
                      <motion.div
                        key={d.year}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-30px' }}
                        transition={{ duration: 0.3, delay: Math.min(idx * 0.03, 0.24) }}
                        className="flex items-center justify-between gap-3 bg-white border border-slate-100 rounded-xl px-4 py-3 hover:shadow-md hover:border-teal-200 transition-all group"
                      >
                        <span className="flex items-center gap-2.5 min-w-0">
                          <span className="text-slate-800 font-black text-sm font-mono shrink-0">{d.year}년</span>
                          <span className="flex items-center gap-1.5 min-w-0">
                            <FileText className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span className="font-semibold text-slate-600 text-xs md:text-sm truncate">재무상태표 및 손익계산서</span>
                          </span>
                        </span>
                        {d.file ? (
                          <a
                            href={d.file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 inline-flex items-center gap-1 bg-emerald-50 group-hover:bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1.5 rounded-lg transition-colors"
                          >
                            PDF 보기
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                          </a>
                        ) : (
                          <span className="shrink-0 text-xs font-semibold text-slate-300">등록 예정</span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>}

        {/* 오시는 길 지도 서비스 및 역 안내 */}
        {show('location') && <div id="location" className="space-y-8 bg-slate-50 px-4 py-6 md:p-14 rounded-3xl border border-slate-100 text-left">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            
            {/* 소개 문구 — 모바일: 최상단(간격 축소) / PC: 좌측 상단 */}
            <div className="space-y-1.5 md:space-y-6 order-1 lg:order-1">
              <span className="text-xs font-black tracking-widest text-teal-600 uppercase">Way to Come</span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">대구중구법인 오시는 길</h3>
              <p className="hidden md:block text-slate-600 font-medium text-base md:text-lg leading-relaxed break-keep">
                대구광역시 남구 하나은행 봉덕지점 건물 4층에 위치합니다. <br />
                지하철·버스 접근이 편리하며, 방문 상담을 환영합니다.
              </p>
            </div>

            {/* 지도 박스 — 모바일: 자가용 이용 시 다음(맨 아래), 버튼은 지도 상단 / PC: 우측 그대로, 버튼은 지도 하단 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white p-3 rounded-2xl border border-slate-200 shadow-md hover:shadow-xl transition-shadow order-3 lg:order-2 lg:row-span-2"
            >
              <div className="flex items-center justify-center mb-2 px-1 md:hidden">
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
              <a
                href="https://naver.me/GSQLkTiM"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
              >
                <img
                  src="/map-location.webp"
                  alt="미소금융대구중구법인 위치 지도"
                  loading="lazy"
                  className="w-full h-80 object-cover"
                />
              </a>
              <div className="hidden md:flex items-center justify-center mt-2 px-1">
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
            </motion.div>

            {/* 상세 정보 — 모바일: 소개 문구 다음(지도보다 먼저) / PC: 좌측 하단 */}
            <div className="space-y-4 pt-2 order-2 lg:order-3">

              <div className="flex items-start space-x-3 text-base">
                <div className="p-1.5 bg-teal-50 rounded text-teal-700 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-extrabold text-slate-800">상세 주소</h5>
                  <p className="text-slate-500 font-medium mt-0.5">
                    대구광역시 남구 중앙대로 146, 4층<br className="md:hidden" /> <span className="md:inline">(봉덕동, 하나은행 봉덕지점)</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-base">
                <div className="p-1.5 bg-indigo-50 rounded text-indigo-700 mt-0.5">
                  <Train className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-extrabold text-slate-800">
                    <span className="md:hidden">대구 지하철 이용 시</span>
                    <span className="hidden md:inline">지하철 이용 시</span>
                  </h5>
                  <p className="text-slate-500 font-medium mt-0.5">
                    <span className="md:hidden whitespace-nowrap">
                      1호선 <motion.strong
                        className="inline-block text-indigo-700"
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                      >영대병원역</motion.strong> 3번출구 도보8분 <br />
                      1호선 <motion.strong
                        className="inline-block text-indigo-700"
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
                      >교대역</motion.strong> 2번출구 도보10분
                    </span>
                    <span className="hidden md:inline">
                      대구 지하철 1호선 <motion.strong
                        className="inline-block text-indigo-700"
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                      >영대병원역</motion.strong> 3번 출구 도보 8분 <br />
                      대구 지하철 1호선 <motion.strong
                        className="inline-block text-indigo-700"
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
                      >교대역</motion.strong> 2번 출구 도보 10분
                    </span>
                  </p>
                  <a
                    href="https://www.dtro.or.kr/cmsh/dtro.or.kr/html/nosundo.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-indigo-600 text-xs font-bold mt-1.5 hover:text-indigo-700"
                  >
                    <span>지하철 노선도 보기</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-base">
                <div className="p-1.5 bg-emerald-50 rounded text-emerald-700 mt-0.5">
                  <Bus className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-extrabold text-slate-800">일반 버스 노선</h5>
                  <p className="text-slate-500 font-medium mt-0.5">
                    <span className="md:hidden">대구고등학교 건너 정류장 근처</span>
                    <span className="hidden md:inline">대구고등학교 건너 정류장에 내리시면 바로 근처입니다</span>
                    <br />
                    오는 버스: <motion.strong
                      className="inline-block text-emerald-700"
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                    >349, 405, 410, 503, 649</motion.strong>
                  </p>
                  <a
                    href="https://businfo.daegu.go.kr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-700 text-xs font-bold mt-1.5 hover:text-emerald-800"
                  >
                    <span>버스 실시간 도착정보 보기</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-base">
                <div className="p-1.5 bg-amber-50 rounded text-amber-600 mt-0.5">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-extrabold text-slate-800">자가용 이용 시</h5>
                  <p className="text-slate-500 font-medium mt-0.5">
                    <span className="md:hidden">
                      하나은행 봉덕지점 <strong>뒤편 주차장</strong> 이용 시 <br />
                      <motion.strong
                        className="inline-block text-amber-600"
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        무료 주차
                      </motion.strong> 가능합니다
                    </span>
                    <span className="hidden md:inline">
                      하나은행 봉덕지점 <strong>뒤편 주차장</strong> 이용 시 <motion.strong
                        className="inline-block text-amber-600"
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                      >무료 주차</motion.strong> 가능합니다
                    </span>
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* 실제 방문 사진 — 건물 외관/입구/주차장 */}
          <div className="pt-2">
            <h5 className="font-extrabold text-slate-800 mb-3 text-base">실제 방문 사진</h5>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { src: '/images/location/building-exterior.webp', alt: '미소금융대구중구법인 건물 외관 및 간판', caption: '사무실 외관' },
                { src: '/images/location/parking-lot.webp', alt: '하나은행 봉덕지점 뒤편 무료 주차장', caption: '후면 무료 주차장' },
                { src: '/images/location/entrance-notice-board.webp', alt: '건물 층별 안내판 (4층 미소금융대구중구법인)', caption: '층별 안내도' },
                { src: '/images/location/building-entrance.webp', alt: '미소금융대구중구법인 사무실 입구 복도', caption: '사무실 입구' },
                { src: '/images/location/office-interior.webp', alt: '미소금융대구중구법인 사무실 내부 전경', caption: '사무실 전경' },
              ].map((img) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => setLightboxImg(img)}
                  className="text-left rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white cursor-pointer group focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <div className="overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="w-full h-32 md:h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-[11px] md:text-xs font-bold text-slate-600 text-center py-1.5 px-1 truncate">
                    {img.caption}
                  </p>
                </button>
              ))}
            </div>

          </div>

          {/* 블로그 + 전화상담 — PC: 한 줄 나란히 / 모바일: 세로 순서 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* 법인 블로그 배너 */}
            <motion.a
              href="https://blog.naver.com/PostView.naver?blogId=eornwndrn1&logNo=224112219401&categoryNo=6&parentCategoryNo=&from=thumbnailList"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl px-5 py-4 shadow-md cursor-pointer group"
            >
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm p-1.5">
                  <img src="/logos/naver_blog_logo.png" alt="네이버 블로그" className="w-full h-full object-contain" />
                </div>
                <div className="min-w-0">
                  <p className="text-white font-extrabold text-sm leading-tight whitespace-nowrap">법인 공식 블로그 보기</p>
                  <p className="text-white/80 text-[11px] mt-0.5 leading-tight">상세 방문 안내 및 대출 상품 정보를 확인하실 수 있습니다</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center space-x-1 bg-white text-teal-700 font-bold text-xs px-3 py-2 rounded-xl shadow-sm group-hover:bg-teal-50 transition-colors flex-shrink-0 ml-3">
                <span>방문하기</span>
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: 1, ease: 'easeInOut' }}>→</motion.span>
              </div>
              <ExternalLink className="sm:hidden w-5 h-5 text-white flex-shrink-0 ml-2" />
            </motion.a>

            {/* 전화상담 버튼 — 4개 번호 순환 */}
            <motion.a
              href={`tel:${PHONES[phoneIdx].number}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={`relative flex items-center justify-between gap-3 bg-gradient-to-r ${PHONES[phoneIdx].bg} text-white font-extrabold py-4 px-5 rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-700`}
            >
              <motion.div
                className="absolute inset-0 bg-white/10 rounded-2xl"
                animate={{ opacity: [0, 0.2, 0] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              <motion.span
                className="text-2xl relative z-10 flex-shrink-0"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
              >☎️</motion.span>
              <div className="relative z-10 flex-1 text-center min-w-0">
                <div className="text-[11px] font-bold text-white/80 tracking-widest uppercase mb-1">지금 바로 전화상담</div>
                <div className="relative h-8 overflow-hidden">
                  {PHONES.map((p, pi) => (
                    <motion.div
                      key={p.number}
                      animate={{
                        y: pi === phoneIdx ? 0 : pi === (phoneIdx - 1 + PHONES.length) % PHONES.length ? -32 : 32,
                        opacity: pi === phoneIdx ? 1 : 0,
                      }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <span className={`${p.chip} text-base font-black tracking-tight whitespace-nowrap px-3 py-1 rounded-lg`}>
                        {p.number}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <motion.span
                className="text-lg relative z-10 flex-shrink-0"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
              >👆</motion.span>
            </motion.a>
          </div>

        </div>}

      </div>
    </section>

    {/* 방문 사진 라이트박스 */}
    {lightboxImg && (
      <div
        className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4 md:p-8"
        onClick={() => setLightboxImg(null)}
      >
        <button
          type="button"
          onClick={() => setLightboxImg(null)}
          aria-label="닫기"
          className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl flex items-center justify-center transition-colors"
        >
          ✕
        </button>
        <div className="max-w-4xl max-h-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
          <img
            src={lightboxImg.src}
            alt={lightboxImg.alt}
            className="max-w-full max-h-[80vh] rounded-lg object-contain shadow-2xl"
          />
          <p className="text-white/90 font-bold mt-4 text-center">{lightboxImg.caption}</p>
        </div>
      </div>
    )}
    </>
  );
}
