/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, Heart, ChevronDown, CheckCircle2 } from 'lucide-react';
import { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenCalculator: () => void;
}

export default function Header({ activeTab, setActiveTab, onScrollToSection, onOpenCalculator }: HeaderProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  const menuItems = [
    {
      type: TabType.ABOUT,
      label: '법인소개',
      sublinks: [
        { name: '이사장 인사말', id: 'ceo-greeting' },
        { name: '설립 및 미소금융 목적', id: 'about-miso' },
        { name: '법인 연혁', id: 'history' },
        { name: '조직도', id: 'organization' },
        { name: '오시는 길', id: 'location' }
      ]
    },
    {
      type: TabType.PRODUCTS,
      label: '지원상품',
      sublinks: [
        { name: '사회적연대금융', id: 'social-finance' },
        { name: '사업자 운영자금', id: 'business-fund' },
        { name: '청년 미래이음 자금', id: 'youth-fund' },
        { name: '금융취약계층 생계자금', id: 'vulnerable-fund' }
      ]
    },
    {
      type: TabType.GUIDE,
      label: '대출안내',
      sublinks: [
        { name: '대출 자격 자가진단', id: 'self-diagnosis' },
        { name: '스마트 대출계산기', id: 'loan-calc' },
        { name: '이용 절차 및 서류', id: 'process-guide' }
      ]
    },
    {
      type: TabType.CASES,
      label: '지원사례',
      sublinks: [
        { name: '사회연대 성공 수기', id: 'case-social' },
        { name: '소상공인 대출 사례', id: 'case-business' },
        { name: '청년 미래이음 사례', id: 'case-youth' },
        { name: '생계 극복 스토리', id: 'case-vulnerable' }
      ]
    },
    {
      type: TabType.NOTICE,
      label: '알림마당',
      sublinks: [
        { name: '법인 공지사항', id: 'notice' },
        { name: '불법 사금융 가이드', id: 'anti-fraud' },
        { name: '자활 연계 유관기관', id: 'partners' }
      ]
    }
  ];

  const handleSublinkClick = (sectionId: string, tab: TabType) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setTimeout(() => {
      onScrollToSection(sectionId);
    }, 100);
  };

  return (
    <header 
      id="main-header"
      className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300"
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 최상단 마이크로 띠링 */}
      <div className="bg-slate-50 border-b border-slate-100 py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs text-slate-500 font-medium">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center text-teal-600 bg-teal-50 px-2 py-0.5 rounded text-[10px] font-bold">공식 기관</span>
            <span>서민금융진흥원 사업수행기관 · 대구지역 15년 경제적 자립 파트너</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-slate-400">대표전화:</span>
            <a href="tel:053-252-6408" className="hover:text-teal-600 font-semibold text-slate-700 transition-colors">053-252-6408</a>
            <span className="text-slate-200">|</span>
            <span>평일 09:00 - 18:00</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* 로고 */}
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => handleSublinkClick('hero-section', TabType.ABOUT)}>
            <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-teal-100">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-slate-900 font-bold text-lg tracking-tight leading-none">(사)미소금융대구중구법인</span>
              </div>
              <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase block">서민금융진흥원 공식 사업수행기관</span>
            </div>
          </div>

          {/* GNB (데스크톱) — 마우스 호버 시 전체 메가 드롭다운 */}
          <nav className="hidden lg:flex space-x-1 xl:space-x-4 h-full items-center">
            {menuItems.map((item) => (
              <div 
                key={item.type}
                className="h-full flex items-center"
                onMouseEnter={() => setIsHovered(true)}
              >
                <button
                  onClick={() => handleSublinkClick(item.sublinks[0].id, item.type)}
                  className={`px-4 py-2 font-semibold text-base tracking-tight transition-all duration-200 rounded-lg flex items-center space-x-1 ${
                    activeTab === item.type 
                      ? 'text-teal-600 bg-teal-50/50' 
                      : 'text-slate-600 hover:text-teal-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isHovered ? 'rotate-180 text-teal-600' : 'text-slate-400'}`} />
                </button>
              </div>
            ))}
          </nav>

          {/* 우측 퀵 액션 (데스크톱) */}
          <div className="hidden lg:flex items-center space-x-3">
            <button 
              onClick={onOpenCalculator}
              className="bg-slate-50 text-slate-700 border border-slate-200 hover:bg-teal-50 hover:border-teal-200 hover:text-teal-700 px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm"
            >
              📊 대출계산기
            </button>
            <a 
              href="tel:053-252-6408"
              className="bg-teal-600 text-white hover:bg-teal-700 px-4.5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md shadow-teal-100 flex items-center space-x-1.5"
            >
              <Phone className="w-4 h-4" />
              <span>전화문의</span>
            </a>
          </div>

          {/* 모바일 햄버거 토글 */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={onOpenCalculator}
              className="p-2 text-slate-600 hover:text-teal-600 transition-colors"
              title="대출 계산기"
            >
              📊
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* 데스크톱 메가 드롭다운 패널 (신한 스타일로 상단 전체에 광활하게 드롭다운) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute left-0 w-full bg-white border-b border-slate-200 shadow-xl hidden lg:block overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-5 gap-8">
              {menuItems.map((item) => (
                <div key={item.type} className="space-y-4 border-r border-slate-50 last:border-none pr-4">
                  <span className="block text-xs font-bold text-slate-400 tracking-widest uppercase">
                    {item.label}
                  </span>
                  <ul className="space-y-2.5">
                    {item.sublinks.map((sublink) => (
                      <li key={sublink.id}>
                        <button
                          onClick={() => handleSublinkClick(sublink.id, item.type)}
                          className="text-sm font-medium text-slate-600 hover:text-teal-600 text-left w-full transition-colors flex items-center space-x-1 group"
                        >
                          <span className="w-1 h-1 bg-slate-300 rounded-full group-hover:bg-teal-500 transition-colors"></span>
                          <span className="pl-1 group-hover:translate-x-0.5 transition-transform duration-200">{sublink.name}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            {/* 정책 광고 조항 가이드 숏컷 배너 */}
            <div className="bg-slate-50 px-8 py-4 border-t border-slate-100">
              <div className="max-w-7xl mx-auto flex justify-between items-center text-xs text-slate-500">
                <p className="flex items-center space-x-1 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 mr-1 inline" />
                  <span>본 법인은 <strong>서민금융진흥원</strong> 공식 수행기관이며, 일체의 대출 가입 유도 수수료나 보증 수수료를 받지 않습니다.</span>
                </p>
                <div className="flex gap-4 text-slate-400 font-semibold">
                  <span>금리: 연 4.5% 수준</span>
                  <span>담보: 무담보 정책 자금</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 모바일 전체 메뉴 패널 */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-slate-100 bg-white overflow-y-auto max-h-[calc(100vh-80px)] shadow-lg"
          >
            <div className="px-4 py-6 space-y-4">
              
              {/* 모바일 퀵 상담 배너 */}
              <div className="bg-gradient-to-r from-teal-500 to-emerald-600 p-4 rounded-xl text-white shadow-sm flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-sm">대구중구법인 든든 콜센터</h4>
                  <p className="text-white/80 text-[11px] mt-0.5">평일 9시 ~ 18시 / 주말 휴무</p>
                </div>
                <a 
                  href="tel:053-252-6408" 
                  className="bg-white text-teal-700 px-3.5 py-1.5 rounded-lg text-xs font-bold shadow flex items-center space-x-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>전화걸기</span>
                </a>
              </div>

              {/* GNB 리스트 */}
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <div key={item.type} className="border-b border-slate-50 pb-2 mb-2">
                    <button
                      onClick={() => setMobileAccordion(mobileAccordion === item.type ? null : item.type)}
                      className="flex justify-between items-center w-full py-2.5 px-2 text-left text-slate-800 font-semibold text-lg hover:text-teal-600 hover:bg-slate-50 rounded-lg"
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${mobileAccordion === item.type ? 'rotate-180 text-teal-600' : 'text-slate-400'}`} />
                    </button>
                    
                    {mobileAccordion === item.type && (
                      <motion.div 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="pl-4 pr-2 py-1 space-y-1 bg-slate-50/50 rounded-lg mt-1"
                      >
                        {item.sublinks.map((sublink) => (
                          <button
                            key={sublink.id}
                            onClick={() => handleSublinkClick(sublink.id, item.type)}
                            className="block w-full text-left py-2 px-3 text-sm font-medium text-slate-600 hover:text-teal-600 hover:bg-white rounded transition-all"
                          >
                            {sublink.name}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-col space-y-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCalculator();
                  }}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 rounded-xl text-center text-sm transition-all"
                >
                  📊 대출 계산기 실행하기
                </button>
                <div className="text-center text-[10px] text-slate-400 font-medium py-2">
                  대표자: 김석동 | 대표번호: 053-252-6408
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
