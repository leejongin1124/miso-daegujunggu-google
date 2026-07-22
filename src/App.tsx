/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate, useLocation, useParams } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { TabType } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import SectionPageShell from './components/SectionPageShell';
import ScrollToTopButton from './components/ScrollToTopButton';

// 랜딩 화면(Hero+Footer)에는 필요 없는 화면들은 지연 로딩하여 초기 번들 크기를 줄임
const AboutSection = lazy(() => import('./components/AboutSection'));
const ProductSection = lazy(() => import('./components/ProductSection'));
const GuideSection = lazy(() => import('./components/GuideSection'));
const CaseSection = lazy(() => import('./components/CaseSection'));
const NoticeSection = lazy(() => import('./components/NoticeSection'));
const MisoIntroSection = lazy(() => import('./components/MisoIntroSection'));
const PrivacyPolicySection = lazy(() => import('./components/PrivacyPolicySection'));

// 섹션 ID(기존 앵커 스크롤 대상 DOM id와 동일) → 어느 라우트 컴포넌트에 속하는지 매핑
const SECTION_MAP: Record<string, string> = {
  'ceo-greeting': 'about', 'about-miso': 'about', 'history': 'about',
  'organization': 'about', 'location': 'about',
  'miso-intro': 'miso-intro',
  'social-finance': 'products', 'business-fund': 'products',
  'youth-fund': 'products', 'vulnerable-fund': 'products', 'products-all': 'products',
  'loan-target': 'guide', 'faq-section': 'guide',
  'loan-calc-intro': 'guide', 'loan-calc': 'guide', 'process-guide': 'guide',
  'case-social': 'cases', 'case-business': 'cases',
  'case-youth': 'cases', 'case-vulnerable': 'cases',
  'notice': 'notice', 'anti-fraud': 'notice',
  'privacy-policy': 'privacy',
};

// 컴포넌트 키 → 해당 sectionId로 이동할 실제 URL 경로를 만드는 함수
const ROUTE_FOR_COMPONENT: Record<string, (sectionId: string) => string> = {
  about: (id) => `/about/${id}`,
  'miso-intro': () => '/miso-intro',
  guide: (id) => `/guide/${id}`,
  notice: (id) => `/notice/${id}`,
  privacy: () => '/privacy-policy',
};

// 라우트 파라미터 허용값 — 목록에 없는 값이 들어오면 기본 경로로 리다이렉트
const PRODUCT_TABS = ['social', 'business', 'youth', 'vulnerable'];
const CASE_FILTERS = ['social', 'business', 'youth', 'vulnerable'];
const ABOUT_SECTIONS = ['ceo-greeting', 'about-miso', 'history', 'organization', 'location'];
const GUIDE_SECTIONS = ['loan-target', 'faq-section', 'loan-calc-intro', 'loan-calc', 'process-guide'];
const NOTICE_SECTIONS = ['notice', 'anti-fraud'];

const sectionToProductTab: Record<string, string> = {
  'social-finance': 'social', 'business-fund': 'business',
  'youth-fund': 'youth', 'vulnerable-fund': 'vulnerable',
};
const sectionToCaseFilter: Record<string, string> = {
  'case-social': 'social', 'case-business': 'business',
  'case-youth': 'youth', 'case-vulnerable': 'vulnerable',
};

interface RouteProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenCalculator: () => void;
}

const SITE_URL = 'https://misodaegu.or.kr';
const SITE_NAME = '미소금융대구중구법인';

// React 19는 컴포넌트가 렌더링한 <title>/<meta>/<link>를 자동으로 <head>로 끌어올려주므로
// 별도 라이브러리(react-helmet-async) 없이 라우트별 메타데이터를 선언할 수 있음.
// og:* 태그는 index.html에 사이트 공통 정적값으로 유지(카카오톡 등 JS 미실행 스크레이퍼 대상)하고,
// 여기서는 실제 브라우저·검색엔진이 보는 title/description/canonical만 라우트별로 갱신한다.
function RouteMeta({ title, description, path }: { title: string; description: string; path: string }) {
  return (
    <>
      <title>{`${title} | ${SITE_NAME}`}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`${SITE_URL}${path}`} />
    </>
  );
}

function LandingMeta() {
  return (
    <>
      <title>{SITE_NAME}</title>
      <meta name="description" content="(사)미소금융대구중구법인은 서민금융진흥원 미소금융 사업수행기관으로, 대구·경북 지역 청년·소상공인·금융취약계층을 위한 무담보 정책자금 상담 및 대출을 지원합니다." />
      <link rel="canonical" href={SITE_URL} />
    </>
  );
}

function AboutRoute() {
  const { sectionId } = useParams();
  if (sectionId && !ABOUT_SECTIONS.includes(sectionId)) {
    return <Navigate to="/about" replace />;
  }
  return (
    <SectionPageShell
      eyebrow="About Foundation"
      title="법인소개"
      description={"금융위원회 허가 비영리 공익법인으로서\n대구·경북 서민과 소상공인의 자립을 지원합니다."}
      bgImage="/backgrounds/about-bg.webp"
    >
      <RouteMeta title="법인소개" description="금융위원회 허가 비영리 공익법인으로서 대구·경북 서민과 소상공인의 자립을 지원하는 미소금융대구중구법인을 소개합니다." path="/about" />
      <AboutSection sectionId={sectionId} />
    </SectionPageShell>
  );
}

function MisoIntroRoute() {
  return (
    <SectionPageShell
      eyebrow="Loan Guide"
      title="대출안내"
      description={"상담, 서류 준비, 심사, 결과 안내까지\n신청 전 필요한 절차를 차분히 확인하실 수 있습니다."}
      bgImage="/backgrounds/guide-bg.webp"
    >
      <RouteMeta title="미소금융이란" description="서민금융진흥원 미소금융 사업수행기관인 미소금융대구중구법인이 안내하는 미소금융 제도 소개입니다." path="/miso-intro" />
      <MisoIntroSection />
    </SectionPageShell>
  );
}

function ProductsRoute({ onScrollToSection, onOpenCalculator }: RouteProps) {
  const { tab } = useParams();
  const navigate = useNavigate();
  if (tab && !PRODUCT_TABS.includes(tab)) {
    return <Navigate to="/products" replace />;
  }
  return (
    <SectionPageShell
      eyebrow="Miso Finance Products"
      title="대출상품"
      description={"상품별 대상 요건과 증빙서류를 확인한 뒤\n심사 절차에 따라 지원 가능 여부를 안내합니다."}
      bgImage="/backgrounds/products-bg.webp"
    >
      <RouteMeta title="대출상품" description="사회연대금융, 사업자 운영자금, 청년 미래이음, 금융취약계층 생계자금 등 미소금융대구중구법인 대출상품을 안내합니다." path={tab ? `/products/${tab}` : '/products'} />
      <ProductSection
        onScrollToSection={onScrollToSection}
        onOpenCalculator={onOpenCalculator}
        initialTab={tab ?? 'social'}
        hideTabs={!!tab}
        onTabChange={(nextTab) => navigate(`/products/${nextTab}`, { replace: true })}
      />
    </SectionPageShell>
  );
}

function GuideRoute() {
  const { sectionId } = useParams();
  if (sectionId && !GUIDE_SECTIONS.includes(sectionId)) {
    return <Navigate to="/guide" replace />;
  }
  return (
    <SectionPageShell
      eyebrow="Loan Guide"
      title="대출안내"
      description={"상담, 서류 준비, 심사, 결과 안내까지\n신청 전 필요한 절차를 차분히 확인하실 수 있습니다."}
      bgImage="/backgrounds/guide-bg.webp"
    >
      <RouteMeta title="대출안내" description="상담, 서류 준비, 심사, 결과 안내까지 신청 전 필요한 절차와 자주 묻는 질문을 확인하실 수 있습니다." path={sectionId ? `/guide/${sectionId}` : '/guide'} />
      <GuideSection sectionId={sectionId} />
    </SectionPageShell>
  );
}

function CasesRoute() {
  const { filter } = useParams();
  const navigate = useNavigate();
  if (filter && !CASE_FILTERS.includes(filter)) {
    return <Navigate to="/cases" replace />;
  }
  return (
    <SectionPageShell
      eyebrow="Support Cases"
      title="상담사례"
      description={"상담과 심사를 통해 다시 일어선\n이웃들의 자립 이야기를 소개합니다."}
      bgImage="/backgrounds/cases-bg.webp"
    >
      <RouteMeta title="상담사례" description="상담과 심사를 통해 다시 일어선 이웃들의 자립 이야기를 소개합니다. (이해를 돕기 위해 재구성한 예시입니다)" path={filter ? `/cases/${filter}` : '/cases'} />
      <CaseSection
        initialFilter={filter ?? 'all'}
        onFilterChange={(nextFilter) => navigate(nextFilter === 'all' ? '/cases' : `/cases/${nextFilter}`, { replace: true })}
      />
    </SectionPageShell>
  );
}

function NoticeRoute() {
  const { sectionId } = useParams();
  if (sectionId && !NOTICE_SECTIONS.includes(sectionId)) {
    return <Navigate to="/notice" replace />;
  }
  return (
    <SectionPageShell
      eyebrow="Notice & Safety"
      title="알림마당"
      description={"공지사항과\n불법사금융·보이스피싱 피해예방 정보를 안내합니다."}
      bgImage="/backgrounds/notice-bg.webp"
    >
      <RouteMeta title="알림마당" description="법인 공지사항과 불법사금융·보이스피싱 피해예방 정보를 안내합니다." path={sectionId ? `/notice/${sectionId}` : '/notice'} />
      <NoticeSection sectionId={sectionId} />
    </SectionPageShell>
  );
}

function PrivacyRoute() {
  return (
    <div className="bg-white pt-20">
      <RouteMeta title="개인정보처리방침" description="미소금융대구중구법인 개인정보처리방침입니다." path="/privacy-policy" />
      <PrivacyPolicySection />
    </div>
  );
}

function NotFoundRoute() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 pt-24 space-y-4">
      <title>{`페이지를 찾을 수 없습니다 | ${SITE_NAME}`}</title>
      <meta name="robots" content="noindex" />
      <p className="text-6xl">🔍</p>
      <h1 className="text-2xl font-black text-slate-900">페이지를 찾을 수 없습니다</h1>
      <p className="text-slate-500 text-sm">주소가 변경되었거나 존재하지 않는 페이지입니다.</p>
      <Link to="/" className="mt-4 inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm px-5 py-3 rounded-xl transition">
        홈으로 돌아가기
      </Link>
    </div>
  );
}

// sectionId(레거시 앵커 id) → 실제 이동할 URL 경로 (순수 함수, Header의 <Link> href 계산에도 재사용)
function getSectionPath(sectionId: string): string {
  if (sectionId === 'hero-section') return '/';
  if (sectionId === 'products-all') return '/products';
  if (sectionToProductTab[sectionId]) return `/products/${sectionToProductTab[sectionId]}`;
  if (sectionToCaseFilter[sectionId]) return `/cases/${sectionToCaseFilter[sectionId]}`;
  const component = SECTION_MAP[sectionId];
  if (!component) return '/';
  return ROUTE_FOR_COMPONENT[component](sectionId);
}

// sectionId → 이동 후 스크롤할 실제 DOM 앵커 id
function getSectionAnchor(sectionId: string): string {
  if (sectionToProductTab[sectionId] || sectionId === 'products-all') return 'social-finance';
  if (sectionToCaseFilter[sectionId]) return 'case-social';
  return sectionId;
}

// 현재 경로로부터 GNB 활성 탭을 계산 — 별도 state 없이 URL을 유일한 기준으로 사용
function getActiveTabFromPath(pathname: string): TabType {
  if (pathname.startsWith('/products')) return TabType.PRODUCTS;
  if (pathname.startsWith('/guide') || pathname.startsWith('/miso-intro')) return TabType.GUIDE;
  if (pathname.startsWith('/cases')) return TabType.CASES;
  if (pathname.startsWith('/notice')) return TabType.NOTICE;
  return TabType.ABOUT;
}

function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = getActiveTabFromPath(location.pathname);
  const pendingScrollRef = useRef<string | null>(null);

  // 경로가 바뀐 뒤 대기 중인 앵커 스크롤 실행 (지연 로딩된 컴포넌트가 마운트될 시간을 확보)
  useEffect(() => {
    if (pendingScrollRef.current) {
      const target = pendingScrollRef.current;
      pendingScrollRef.current = null;
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 80);
    }
  }, [location.pathname]);

  const scrollToAnchor = (anchorId: string) => {
    setTimeout(() => {
      const el = document.getElementById(anchorId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 80);
  };

  const goTo = (path: string, anchorId: string) => {
    if (location.pathname === path) {
      // 같은 경로 재클릭 → 스크롤만
      scrollToAnchor(anchorId);
    } else {
      pendingScrollRef.current = anchorId;
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  // 버튼(onClick)으로만 이동하는 곳(Footer/Hero 등)에서 사용 — 경로 계산 + 실제 navigate까지 함께 수행
  const handleScrollToSection = (sectionId: string) => {
    if (sectionId === 'hero-section') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    goTo(getSectionPath(sectionId), getSectionAnchor(sectionId));
  };

  // <Link>로 실제 이동하는 곳(Header 하위 메뉴)에서 사용 — navigate는 Link가 담당하고,
  // 여기서는 이동 후(또는 같은 경로 재클릭 시) 스크롤할 앵커만 준비
  const prepareAnchor = (sectionId: string) => {
    if (sectionId === 'hero-section') return;
    const path = getSectionPath(sectionId);
    const anchorId = getSectionAnchor(sectionId);
    if (location.pathname === path) {
      scrollToAnchor(anchorId);
    } else {
      pendingScrollRef.current = anchorId;
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const handleOpenCalculator = () => {
    handleScrollToSection('loan-calc');
  };

  const isLanding = location.pathname === '/';

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-miso-blue-500 selection:text-white">

      <Header
        activeTab={activeTab}
        getSectionPath={getSectionPath}
        prepareAnchor={prepareAnchor}
      />

      <main className="relative">

        {/* 랜딩페이지: Hero + 퀵 네비게이션 */}
        {isLanding && (
          <Hero onScrollToSection={handleScrollToSection} />
        )}
        {/* LandingSummary(모바일/태블릿 5개 퀵메뉴 카드)는 현재 비노출 — 파일은 보존 */}

        <Suspense fallback={<div className="min-h-[60vh]" />}>
          <Routes>
            <Route path="/" element={<LandingMeta />} />
            <Route path="/miso-intro" element={<MisoIntroRoute />} />
            <Route path="/about/:sectionId?" element={<AboutRoute />} />
            <Route path="/products/:tab?" element={<ProductsRoute onScrollToSection={handleScrollToSection} onOpenCalculator={handleOpenCalculator} />} />
            <Route path="/guide/:sectionId?" element={<GuideRoute />} />
            <Route path="/cases/:filter?" element={<CasesRoute />} />
            <Route path="/notice/:sectionId?" element={<NoticeRoute />} />
            <Route path="/privacy-policy" element={<PrivacyRoute />} />
            <Route path="*" element={<NotFoundRoute />} />
          </Routes>
        </Suspense>

      </main>

      <Footer />

      <ScrollToTopButton />


    </div>
    </MotionConfig>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
