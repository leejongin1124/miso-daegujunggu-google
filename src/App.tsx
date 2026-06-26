/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
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

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.ABOUT);
  const [productTab, setProductTab] = useState<string>('social');
  const [caseFilter, setCaseFilter] = useState<string>('all');

  const sectionToProductTab: Record<string, string> = {
    'social-finance': 'social',
    'business-fund': 'business',
    'youth-fund': 'youth',
    'vulnerable-fund': 'vulnerable',
  };

  const sectionToCaseFilter: Record<string, string> = {
    'case-social': 'social',
    'case-business': 'business',
    'case-youth': 'youth',
    'case-vulnerable': 'vulnerable',
  };

  // 스크롤 이벤트 기반 액티브 탭 동적 트래킹
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      
      const aboutEl = document.getElementById('history');
      const productsEl = document.getElementById('social-finance');
      const guideEl = document.getElementById('loan-calc-intro');
      const casesEl = document.getElementById('case-social');
      const noticeEl = document.getElementById('notice');

      if (noticeEl && scrollPos >= noticeEl.offsetTop) {
        setActiveTab(TabType.NOTICE);
      } else if (casesEl && scrollPos >= casesEl.offsetTop) {
        setActiveTab(TabType.CASES);
      } else if (guideEl && scrollPos >= guideEl.offsetTop) {
        setActiveTab(TabType.GUIDE);
      } else if (productsEl && scrollPos >= productsEl.offsetTop) {
        setActiveTab(TabType.PRODUCTS);
      } else {
        setActiveTab(TabType.ABOUT);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    // 지원상품 탭 전환
    if (sectionToProductTab[sectionId]) {
      setProductTab(sectionToProductTab[sectionId]);
      setTimeout(() => {
        const el = document.getElementById('social-finance');
        if (el) {
          const offset = el.getBoundingClientRect().top + window.pageYOffset - 110;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }
      }, 50);
      return;
    }
    // 지원사례 필터 전환
    if (sectionToCaseFilter[sectionId]) {
      setCaseFilter(sectionToCaseFilter[sectionId]);
      setTimeout(() => {
        const el = document.getElementById('case-social');
        if (el) {
          const offset = el.getBoundingClientRect().top + window.pageYOffset - 110;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }
      }, 50);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 110;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleOpenCalculator = () => {
    handleScrollToSection('loan-calc');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-miso-blue-500 selection:text-white">
      
      {/* 상단 고정 헤더 */}
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onScrollToSection={handleScrollToSection}
        onOpenCalculator={handleOpenCalculator}
      />

      <main className="relative">
        
        {/* 메인 히어로 배너 & 기초 비교표 */}
        <Hero onScrollToSection={handleScrollToSection} />

        {/* 퀵 네비게이션 랜딩 요약 카드 */}
        <LandingSummary onScrollToSection={handleScrollToSection} />

        {/* 1. 사단법인 및 미소금융 소개 */}
        <div className="bg-white">
          <AboutSection />
        </div>

        {/* 2. 대구중구법인 4대 대표자금 상품 상세안내 */}
        <div>
          <ProductSection
            onScrollToSection={handleScrollToSection}
            onOpenCalculator={handleOpenCalculator}
            initialTab={productTab}
          />
        </div>

        {/* 3. 거치 분리 스마트계산기 */}
        <div className="bg-white">
          <GuideSection />
        </div>

        {/* 4. 지원 사례 */}
        <div>
          <CaseSection initialFilter={caseFilter} />
        </div>

        {/* 5. 공지사항 및 불법 사금융 예방 안내 */}
        <div className="bg-white">
          <NoticeSection />
        </div>

      </main>

      {/* 6. 법인 정보 및 안내 하단 */}
      <Footer />

      {/* 7. 플로팅 퀵메뉴 */}
      <FloatingWidget 
        onOpenCalculator={handleOpenCalculator}
      />

    </div>
  );
}
