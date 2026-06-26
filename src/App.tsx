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
import FloatingWidget from './components/FloatingWidget';
import LandingSummary from './components/LandingSummary';
import MisoIntroSection from './components/MisoIntroSection';

// 섹션 ID → 어느 컴포넌트에 속하는지 매핑
const SECTION_MAP: Record<string, string> = {
  'ceo-greeting': 'about', 'about-miso': 'about', 'history': 'about',
  'organization': 'about', 'location': 'about',
  'miso-intro': 'miso-intro',
  'social-finance': 'products', 'business-fund': 'products',
  'youth-fund': 'products', 'vulnerable-fund': 'products',
  'loan-target': 'guide', 'faq-section': 'guide',
  'loan-calc-intro': 'guide', 'loan-calc': 'guide', 'process-guide': 'guide',
  'case-social': 'cases', 'case-business': 'cases',
  'case-youth': 'cases', 'case-vulnerable': 'cases',
  'notice': 'notice', 'anti-fraud': 'notice',
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.ABOUT);
  const [productTab, setProductTab] = useState<string>('social');
  const [caseFilter, setCaseFilter] = useState<string>('all');

  // 초기에는 아무 섹션도 열려있지 않음
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const pendingScrollRef = useRef<string | null>(null);

  const sectionToProductTab: Record<string, string> = {
    'social-finance': 'social', 'business-fund': 'business',
    'youth-fund': 'youth', 'vulnerable-fund': 'vulnerable',
  };
  const sectionToCaseFilter: Record<string, string> = {
    'case-social': 'social', 'case-business': 'business',
    'case-youth': 'youth', 'case-vulnerable': 'vulnerable',
  };

  // 섹션이 열린 뒤 대기 중인 스크롤 실행
  useEffect(() => {
    if (pendingScrollRef.current) {
      const target = pendingScrollRef.current;
      pendingScrollRef.current = null;
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) {
          const offset = el.getBoundingClientRect().top + window.pageYOffset - 110;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }
      }, 80);
    }
  }, [openSections]);

  // 스크롤 기반 액티브 탭 트래킹
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      const aboutEl = document.getElementById('history');
      const productsEl = document.getElementById('social-finance');
      const guideEl = document.getElementById('loan-calc-intro');
      const casesEl = document.getElementById('case-social');
      const noticeEl = document.getElementById('notice');

      if (noticeEl && scrollPos >= noticeEl.offsetTop) setActiveTab(TabType.NOTICE);
      else if (casesEl && scrollPos >= casesEl.offsetTop) setActiveTab(TabType.CASES);
      else if (guideEl && scrollPos >= guideEl.offsetTop) setActiveTab(TabType.GUIDE);
      else if (productsEl && scrollPos >= productsEl.offsetTop) setActiveTab(TabType.PRODUCTS);
      else setActiveTab(TabType.ABOUT);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const revealAndScroll = (sectionId: string) => {
    const component = SECTION_MAP[sectionId];
    if (component) {
      setOpenSections(prev => {
        if (prev.has(component)) return prev;
        pendingScrollRef.current = sectionId;
        return new Set([...prev, component]);
      });
      // 이미 열려있으면 바로 스크롤
      setOpenSections(prev => {
        if (prev.has(component)) {
          setTimeout(() => {
            const el = document.getElementById(sectionId);
            if (el) {
              const offset = el.getBoundingClientRect().top + window.pageYOffset - 110;
              window.scrollTo({ top: offset, behavior: 'smooth' });
            }
          }, 80);
        }
        return prev;
      });
    }
  };

  const handleScrollToSection = (sectionId: string) => {
    if (sectionToProductTab[sectionId]) {
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-miso-blue-500 selection:text-white">

      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onScrollToSection={handleScrollToSection}
        onOpenCalculator={handleOpenCalculator}
      />

      <main className="relative">

        {/* 항상 표시: Hero */}
        <Hero onScrollToSection={handleScrollToSection} />

        {/* 항상 표시: 퀵 네비게이션 카드 */}
        <LandingSummary onScrollToSection={handleScrollToSection} />

        {/* 클릭 시 표시: 미소금융이란 */}
        {openSections.has('miso-intro') && (
          <div className="bg-white">
            <MisoIntroSection />
          </div>
        )}

        {/* 클릭 시 표시: 법인소개 */}
        {openSections.has('about') && (
          <div className="bg-white">
            <AboutSection />
          </div>
        )}

        {/* 클릭 시 표시: 지원상품 */}
        {openSections.has('products') && (
          <div>
            <ProductSection
              onScrollToSection={handleScrollToSection}
              onOpenCalculator={handleOpenCalculator}
              initialTab={productTab}
            />
          </div>
        )}

        {/* 클릭 시 표시: 대출안내 */}
        {openSections.has('guide') && (
          <div className="bg-white">
            <GuideSection />
          </div>
        )}

        {/* 클릭 시 표시: 지원사례 */}
        {openSections.has('cases') && (
          <div>
            <CaseSection initialFilter={caseFilter} />
          </div>
        )}

        {/* 클릭 시 표시: 알림마당 */}
        {openSections.has('notice') && (
          <div className="bg-white">
            <NoticeSection />
          </div>
        )}

      </main>

      <Footer />

      <FloatingWidget onOpenCalculator={handleOpenCalculator} />

    </div>
  );
}
