/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { TabType } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ProductSection from './components/ProductSection';
import GuideSection from './components/GuideSection';
import CaseSection from './components/CaseSection';
import NoticeSection from './components/NoticeSection';
import Footer from './components/Footer';
import MisoIntroSection from './components/MisoIntroSection';
import PrivacyPolicySection from './components/PrivacyPolicySection';

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

        {/* 미소금융이란 */}
        {activeSection === 'miso-intro' && (
          <div className="bg-white pt-20">
            <MisoIntroSection />
          </div>
        )}

        {/* 법인소개 */}
        {activeSection === 'about' && (
          <div className="bg-white pt-14 md:pt-20">
            <AboutSection sectionId={activeSectionId ?? undefined} />
          </div>
        )}

        {/* 지원상품 */}
        {activeSection === 'products' && (
          <div className="pt-20">
            <ProductSection
              onScrollToSection={handleScrollToSection}
              onOpenCalculator={handleOpenCalculator}
              initialTab={productTab}
              hideTabs={productHideTabs}
            />
          </div>
        )}

        {/* 대출안내 */}
        {activeSection === 'guide' && (
          <div className="bg-white pt-20">
            <GuideSection sectionId={activeSectionId ?? undefined} />
          </div>
        )}

        {/* 지원사례 */}
        {activeSection === 'cases' && (
          <div className="pt-20">
            <CaseSection initialFilter={caseFilter} />
          </div>
        )}

        {/* 알림마당 */}
        {activeSection === 'notice' && (
          <div className="bg-white pt-20">
            <NoticeSection sectionId={activeSectionId ?? undefined} />
          </div>
        )}

        {/* 개인정보처리방침 */}
        {activeSection === 'privacy' && (
          <div className="bg-white pt-20">
            <PrivacyPolicySection />
          </div>
        )}

      </main>

      <Footer onScrollToSection={handleScrollToSection} />


    </div>
  );
}
