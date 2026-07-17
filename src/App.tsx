/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { TabType } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import SectionPageShell from './components/SectionPageShell';

// 랜딩 화면(Hero+Footer)에는 필요 없는 화면들은 지연 로딩하여 초기 번들 크기를 줄임
const AboutSection = lazy(() => import('./components/AboutSection'));
const ProductSection = lazy(() => import('./components/ProductSection'));
const GuideSection = lazy(() => import('./components/GuideSection'));
const CaseSection = lazy(() => import('./components/CaseSection'));
const NoticeSection = lazy(() => import('./components/NoticeSection'));
const MisoIntroSection = lazy(() => import('./components/MisoIntroSection'));
const PrivacyPolicySection = lazy(() => import('./components/PrivacyPolicySection'));

// 섹션 ID → 어느 컴포넌트에 속하는지 매핑
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

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.ABOUT);
  const [productTab, setProductTab] = useState<string>('social');
  // 특정 상품 링크로 바로 진입한 경우(true) 상단 4개 탭 선택바를 숨기고 해당 상품만 표시
  const [productHideTabs, setProductHideTabs] = useState<boolean>(false);
  const [caseFilter, setCaseFilter] = useState<string>('all');

  // null = 랜딩페이지, 문자열 = 해당 컴포넌트만 표시
  const [activeSection, setActiveSection] = useState<string | null>(null);
  // 클릭된 서브섹션 ID (컴포넌트 내부에서 해당 항목만 표시)
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  const pendingScrollRef = useRef<string | null>(null);

  const sectionToProductTab: Record<string, string> = {
    'social-finance': 'social', 'business-fund': 'business',
    'youth-fund': 'youth', 'vulnerable-fund': 'vulnerable',
  };
  const sectionToCaseFilter: Record<string, string> = {
    'case-social': 'social', 'case-business': 'business',
    'case-youth': 'youth', 'case-vulnerable': 'vulnerable',
  };

  // 섹션이 바뀐 뒤 대기 중인 스크롤 실행
  useEffect(() => {
    if (pendingScrollRef.current) {
      const target = pendingScrollRef.current;
      pendingScrollRef.current = null;
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) {
          const offset = el.getBoundingClientRect().top + window.pageYOffset - 110;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 80);
    }
  }, [activeSection]);

  const revealAndScroll = (sectionId: string) => {
    const component = SECTION_MAP[sectionId];
    if (!component) return;

    if (activeSection === component && activeSectionId === sectionId) {
      // 동일 서브섹션 → 스크롤만
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          const offset = el.getBoundingClientRect().top + window.pageYOffset - 110;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }
      }, 80);
    } else {
      // 다른 섹션/서브섹션 → 교체 후 상단으로
      pendingScrollRef.current = sectionId;
      setActiveSectionId(sectionId);
      setActiveSection(component);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const handleScrollToSection = (sectionId: string) => {
    // 로고 클릭 등 랜딩페이지 복귀
    if (sectionId === 'hero-section') {
      setActiveSection(null);
      setActiveSectionId(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (sectionId === 'products-all') {
      setProductHideTabs(false);
      setProductTab('social');
      revealAndScroll('social-finance');
      return;
    }
    if (sectionToProductTab[sectionId]) {
      setProductHideTabs(true);
      setProductTab(sectionToProductTab[sectionId]);
      revealAndScroll('social-finance');
      return;
    }
    if (sectionToCaseFilter[sectionId]) {
      setCaseFilter(sectionToCaseFilter[sectionId]);
      revealAndScroll('case-social');
      return;
    }
    revealAndScroll(sectionId);
  };

  const handleOpenCalculator = () => {
    handleScrollToSection('loan-calc');
  };

  const isLanding = activeSection === null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-miso-blue-500 selection:text-white">

      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onScrollToSection={handleScrollToSection}
        onOpenCalculator={handleOpenCalculator}
      />

      <main className="relative">

        {/* 랜딩페이지: Hero + 퀵 네비게이션 */}
        {isLanding && (
          <Hero onScrollToSection={handleScrollToSection} />
        )}

        <Suspense fallback={<div className="min-h-[60vh]" />}>

        {/* 미소금융이란 */}
        {activeSection === 'miso-intro' && (
          <SectionPageShell
            eyebrow="Loan Guide"
            title="대출안내"
            description={"상담, 서류 준비, 심사, 결과 안내까지\n신청 전 필요한 절차를 차분히 확인하실 수 있습니다."}
            bgImage="/backgrounds/guide-bg.webp"
          >
            <MisoIntroSection />
          </SectionPageShell>
        )}

        {/* 법인소개 */}
        {activeSection === 'about' && (
          <SectionPageShell
            eyebrow="About Foundation"
            title="법인소개"
            description={"금융위원회 허가 비영리 공익법인으로서\n대구·경북 서민과 소상공인의 자립을 지원합니다."}
            bgImage="/backgrounds/about-bg.webp"
          >
            <AboutSection sectionId={activeSectionId ?? undefined} />
          </SectionPageShell>
        )}

        {/* 지원상품 */}
        {activeSection === 'products' && (
          <SectionPageShell
            eyebrow="Miso Finance Products"
            title="대출상품"
            description={"상품별 대상 요건과 증빙서류를 확인한 뒤\n심사 절차에 따라 지원 가능 여부를 안내합니다."}
            bgImage="/backgrounds/products-bg.webp"
          >
            <ProductSection
              onScrollToSection={handleScrollToSection}
              onOpenCalculator={handleOpenCalculator}
              initialTab={productTab}
              hideTabs={productHideTabs}
            />
          </SectionPageShell>
        )}

        {/* 대출안내 */}
        {activeSection === 'guide' && (
          <SectionPageShell
            eyebrow="Loan Guide"
            title="대출안내"
            description={"상담, 서류 준비, 심사, 결과 안내까지\n신청 전 필요한 절차를 차분히 확인하실 수 있습니다."}
            bgImage="/backgrounds/guide-bg.webp"
          >
            <GuideSection sectionId={activeSectionId ?? undefined} />
          </SectionPageShell>
        )}

        {/* 지원사례 */}
        {activeSection === 'cases' && (
          <SectionPageShell
            eyebrow="Support Cases"
            title="상담사례"
            description={"상담과 심사를 통해 다시 일어선\n이웃들의 자립 이야기를 소개합니다."}
            bgImage="/backgrounds/cases-bg.webp"
          >
            <CaseSection initialFilter={caseFilter} />
          </SectionPageShell>
        )}

        {/* 알림마당 */}
        {activeSection === 'notice' && (
          <SectionPageShell
            eyebrow="Notice & Safety"
            title="알림마당"
            description={"공지사항과\n불법사금융·보이스피싱 피해예방 정보를 안내합니다."}
            bgImage="/backgrounds/notice-bg.webp"
          >
            <NoticeSection sectionId={activeSectionId ?? undefined} />
          </SectionPageShell>
        )}

        {/* 개인정보처리방침 */}
        {activeSection === 'privacy' && (
          <div className="bg-white pt-20">
            <PrivacyPolicySection />
          </div>
        )}

        </Suspense>

      </main>

      <Footer onScrollToSection={handleScrollToSection} />


    </div>
  );
}
