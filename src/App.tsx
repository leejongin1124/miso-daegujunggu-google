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
import ContactForm from './components/ContactForm';
import NoticeSection from './components/NoticeSection';
import Footer from './components/Footer';
import FloatingWidget from './components/FloatingWidget';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.ABOUT);

  // 스크롤 이벤트 기반 액티브 탭 동적 트래킹
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      
      const aboutEl = document.getElementById('history');
      const productsEl = document.getElementById('social-finance');
      const guideEl = document.getElementById('self-diagnosis');
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
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 110; // 메인 헤더 고려 최적 오프셋
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleOpenCalculator = () => {
    handleScrollToSection('loan-calc');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-teal-500 selection:text-white">
      
      {/* 글로벌 신한은행풍 메가 픽업 헤더 */}
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onScrollToSection={handleScrollToSection}
        onOpenCalculator={handleOpenCalculator}
      />

      <main className="relative">
        
        {/* 메인 히어로 배너 & 기초 비교표 */}
        <Hero onScrollToSection={handleScrollToSection} />

        {/* 1. 사단법인 및 미소금융 소개 */}
        <div className="bg-white">
          <AboutSection />
        </div>

        {/* 2. 대구중구법인 4대 대표자금 상품 상세안내 */}
        <div>
          <ProductSection 
            onScrollToSection={handleScrollToSection}
            onOpenCalculator={handleOpenCalculator}
          />
        </div>

        {/* 3. 자격 자가진단 및 거치 분리 스마트계산기 */}
        <div className="bg-white">
          <GuideSection />
        </div>

        {/* 4. 자활 감동 극복사례 수기 */}
        <div>
          <CaseSection />
        </div>

        {/* 5. 로컬스토리지 대시보드 연동 간편상담 및 AI 대화 가이드 */}
        <div className="bg-white">
          <ContactForm />
        </div>

        {/* 6. 공지사항 및 유한 단속 피싱방지 숏바 */}
        <div>
          <NoticeSection />
        </div>

      </main>

      {/* 7. 필수 법률 고지 및 대표자 기입 하단 */}
      <Footer />

      {/* 8. 도우미 퀵 숏컷 패널 플로팅 */}
      <FloatingWidget 
        onScrollToSection={handleScrollToSection}
        onOpenCalculator={handleOpenCalculator}
      />

    </div>
  );
}
