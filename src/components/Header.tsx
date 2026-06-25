/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenCalculator: () => void;
}

export default function Header({ activeTab, setActiveTab, onScrollToSection, onOpenCalculator }: HeaderProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [clickedSublink, setClickedSublink] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    {
      type: TabType.ABOUT,
      label: '법인소개',
      sublinks: [
        { name: '이사장 인사말', id: 'ceo-greeting' },
        { name: '설립목적', id: 'about-miso' },
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
        { name: '청년미래이음대출', id: 'youth-fund' },
        { name: '금융취약계층 생계자금', id: 'vulnerable-fund' }
      ]
    },
    {
      type: TabType.GUIDE,
      label: '대출안내',
      sublinks: [
        { name: '자주 묻는 질문', id: 'faq-section' },
        { name: '스마트 대출계산기', id: 'loan-calc-intro' },
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
        { name: '불법 사금융 가이드', id: 'anti-fraud' }
      ]
    }
  ];

  const handleSublinkClick = (sectionId: string, tab: TabType) => {
    setClickedSublink(sectionId);
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setOpenMenu(null);
    setTimeout(() => {
      onScrollToSection(sectionId);
      setClickedSublink(null);
    }, 400);
  };

  return (
    <header
      id="main-header"
      className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* 로고 */}
          <div className="flex items-center space-x-2 cursor-pointer min-w-0 flex-shrink" onClick={() => handleSublinkClick('hero-section', TabType.ABOUT)}>
            <img src="/miso_symbol.png" alt="미소금융 로고" className="w-7 h-7 lg:w-10 lg:h-10 object-contain flex-shrink-0" />
            <div className="text-left min-w-0">
              <span className="text-slate-900 font-bold text-[11px] sm:text-sm lg:text-lg tracking-tight leading-tight whitespace-nowrap block">(사)미소금융대구중구법인</span>
              <span className="text-[8px] sm:text-[9px] lg:text-[10px] font-semibold text-slate-400 tracking-wider uppercase block whitespace-nowrap">서민금융진흥원 공식 사업수행기관</span>
            </div>
          </div>

          {/* GNB (데스크톱) — 클릭 시 해당 메뉴 아래로 드롭다운 */}
          <nav ref={navRef} className="hidden lg:flex space-x-1 xl:space-x-2 h-full items-center relative">
            {menuItems.map((item) => (
              <div key={item.type} className="relative h-full flex items-center">
                <button
                  onClick={() => setOpenMenu(openMenu === item.type ? null : item.type)}
                  className={`px-4 py-2 font-semibold text-base tracking-tight transition-all duration-200 rounded-lg flex items-center space-x-1 ${
                    activeTab === item.type || openMenu === item.type
                      ? 'text-teal-600 bg-teal-50/50'
                      : 'text-slate-600 hover:text-teal-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openMenu === item.type ? 'rotate-180 text-teal-600' : 'text-slate-400'}`} />
                </button>

                {/* 개별 드롭다운: 버튼 바로 아래 */}
                <AnimatePresence>
                  {openMenu === item.type && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.97 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute top-full left-0 mt-1 min-w-[180px] bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50"
                    >
                      <div className="px-3 py-2 border-b border-slate-50">
                        <span className="text-[10px] font-bold text-teal-600 tracking-widest uppercase">{item.label}</span>
                      </div>
                      <ul className="py-1">
                        {item.sublinks.map((sublink, idx) => (
                          <motion.li
                            key={sublink.id}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.04, duration: 0.15 }}
                          >
                            <button
                              onClick={() => handleSublinkClick(sublink.id, item.type)}
                              className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-all duration-150 flex items-center space-x-2 group ${
                                clickedSublink === sublink.id
                                  ? 'bg-teal-600 text-white'
                                  : 'text-slate-600 hover:bg-teal-50 hover:text-teal-700'
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full transition-all ${clickedSublink === sublink.id ? 'bg-white' : 'bg-slate-300 group-hover:bg-teal-500'}`} />
                              <span className="group-hover:translate-x-0.5 transition-transform duration-150">{sublink.name}</span>
                            </button>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>


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
                <a
                  href="https://blog.naver.com/eornwndrn1"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold py-3 rounded-xl text-center text-sm transition-all flex items-center justify-center space-x-2 shadow-sm"
                >
                  <span>📝</span>
                  <span>법인 블로그 방문</span>
                </a>
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
