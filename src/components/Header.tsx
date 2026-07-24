/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, Phone, User, Clock, Network, MapPin, Info, Users, Briefcase, Rocket, Shield, Target, HelpCircle, Calculator, FileText, Award, Store, Zap, Heart, Bell, AlertTriangle } from 'lucide-react';
import { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  getSectionPath: (sectionId: string) => string;
  prepareAnchor: (sectionId: string) => void;
}

export default function Header({ activeTab, getSectionPath, prepareAnchor }: HeaderProps) {
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
        { name: '인사말', id: 'ceo-greeting', icon: User, color: 'text-blue-500' },
        { name: '법인 연혁', id: 'history', icon: Clock, color: 'text-amber-500' },
        { name: '조직도', id: 'organization', icon: Network, color: 'text-violet-500' },
        { name: '오시는 길', id: 'location', icon: MapPin, color: 'text-rose-500' }
      ]
    },
    {
      type: TabType.PRODUCTS,
      label: '대출상품',
      sublinks: [
        { name: '사회연대금융', id: 'social-finance', icon: Users, color: 'text-teal-500' },
        { name: '사업자 운영자금', id: 'business-fund', icon: Briefcase, color: 'text-orange-500' },
        { name: '청년미래이음대출', id: 'youth-fund', icon: Rocket, color: 'text-purple-500' },
        { name: '금융취약계층 생계자금', id: 'vulnerable-fund', icon: Shield, color: 'text-emerald-500' }
      ]
    },
    {
      type: TabType.GUIDE,
      label: '대출안내',
      sublinks: [
        { name: '미소금융이란', id: 'miso-intro', icon: Info, color: 'text-sky-500' },
        { name: '대출 자격 안내', id: 'loan-target', icon: Target, color: 'text-red-500' },
        { name: '이용 절차 및 서류', id: 'process-guide', icon: FileText, color: 'text-amber-600' },
        { name: '자주 묻는 질문', id: 'faq-section', icon: HelpCircle, color: 'text-blue-500' },
        { name: '스마트 대출계산기', id: 'loan-calc-intro', icon: Calculator, color: 'text-green-500' }
      ]
    },
    {
      type: TabType.CASES,
      label: '상담사례',
      sublinks: [
        { name: '사회연대 성공 수기', id: 'case-social', icon: Award, color: 'text-yellow-500' },
        { name: '소상공인 대출 사례', id: 'case-business', icon: Store, color: 'text-indigo-500' },
        { name: '청년 미래이음 사례', id: 'case-youth', icon: Zap, color: 'text-cyan-500' },
        { name: '생계 극복 스토리', id: 'case-vulnerable', icon: Heart, color: 'text-pink-500' }
      ]
    },
    {
      type: TabType.NOTICE,
      label: '알림마당',
      sublinks: [
        { name: '법인 공지사항', id: 'notice', icon: Bell, color: 'text-amber-500' },
        { name: '불법 사금융 가이드', id: 'anti-fraud', icon: AlertTriangle, color: 'text-red-500' }
      ]
    }
  ];

  // <Link>가 실제 이동(navigate)을 담당하므로, 여기서는 클릭 하이라이트 표시와
  // 메뉴 닫기, 스크롤 앵커 준비만 처리한다 — 더 이상 이동 자체를 지연시키지 않음
  const handleSublinkClick = (sectionId: string) => {
    setClickedSublink(sectionId);
    setMobileMenuOpen(false);
    setOpenMenu(null);
    prepareAnchor(sectionId);
    setTimeout(() => setClickedSublink(null), 250);
  };

  return (
    <header
      id="main-header"
      className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">

          {/* 로고 */}
          <Link
            to="/"
            className="flex items-center space-x-2 cursor-pointer min-w-0 flex-shrink text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
            onClick={() => { setMobileMenuOpen(false); setOpenMenu(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <img src="/miso_symbol.png" alt="미소금융 로고" className="w-7 h-7 lg:w-10 lg:h-10 object-contain flex-shrink-0" />
            <div className="text-center min-w-0 leading-none">
              <span className="text-slate-900 font-bold text-xs sm:text-sm lg:text-lg tracking-tight leading-none whitespace-nowrap block">(사)미소금융대구중구법인</span>
              <span className="text-[10px] sm:text-[11px] lg:text-xs font-semibold text-slate-500 tracking-wide uppercase block whitespace-nowrap mt-0.5">서민금융진흥원 미소금융 사업수행기관</span>
            </div>
          </Link>

          {/* GNB (데스크톱) — 클릭 시 해당 메뉴 아래로 드롭다운 */}
          <nav ref={navRef} className="hidden lg:flex space-x-1 xl:space-x-2 h-full items-center relative">
            {menuItems.map((item) => (
              <div
                key={item.type}
                className="relative h-full flex items-center"
                onMouseEnter={() => setOpenMenu(item.type)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  onClick={() => setOpenMenu(openMenu === item.type ? null : item.type)}
                  aria-haspopup="true"
                  aria-expanded={openMenu === item.type}
                  className={`px-4 py-2 font-semibold text-base tracking-tight transition-all duration-200 rounded-lg flex items-center space-x-1 ${
                    (openMenu ? openMenu === item.type : activeTab === item.type)
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
                      className="absolute top-full left-0 mt-1 min-w-[200px] bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50 whitespace-nowrap"
                    >
                      <ul className="py-1">
                        {item.sublinks.map((sublink, idx) => (
                          <motion.li
                            key={sublink.id}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.04, duration: 0.15 }}
                          >
                            <Link
                              to={getSectionPath(sublink.id)}
                              onClick={() => handleSublinkClick(sublink.id)}
                              className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-all duration-150 flex items-center space-x-2.5 group ${
                                clickedSublink === sublink.id
                                  ? 'bg-teal-600 text-white'
                                  : 'text-slate-600 hover:bg-teal-50 hover:text-teal-700'
                              }`}
                            >
                              {sublink.icon && <sublink.icon className={`w-3.5 h-3.5 flex-shrink-0 transition-colors ${clickedSublink === sublink.id ? 'text-white' : (sublink.color ?? 'text-slate-400')}`} />}
                              <span className="group-hover:translate-x-0.5 transition-transform duration-150">{sublink.name}</span>
                            </Link>
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
            <a
              href="tel:053-252-6408"
              className="flex items-center space-x-1 bg-teal-600 text-white text-xs font-bold px-2.5 min-[360px]:px-3 py-1.5 rounded-full shadow-sm shrink-0 whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 shrink-0" />
              <span>전화상담</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? '메뉴 닫기' : '전체 메뉴 열기'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu-panel"
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
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
            id="mobile-menu-panel"
            className="lg:hidden border-t border-slate-100 bg-white overflow-y-auto max-h-[calc(100vh-56px)] shadow-lg"
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
                      aria-expanded={mobileAccordion === item.type}
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
                          <Link
                            key={sublink.id}
                            to={getSectionPath(sublink.id)}
                            onClick={() => handleSublinkClick(sublink.id)}
                            className="flex items-center space-x-2.5 w-full text-left py-2 px-3 text-sm font-medium text-slate-600 hover:text-teal-600 hover:bg-white rounded transition-all"
                          >
                            {sublink.icon && <sublink.icon className={`w-3.5 h-3.5 flex-shrink-0 ${sublink.color ?? 'text-slate-400'}`} />}
                            <span>{sublink.name}</span>
                          </Link>
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
                  <img src="/logos/naver_blog_logo.png" alt="네이버 블로그" className="w-5 h-5 object-contain" />
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
