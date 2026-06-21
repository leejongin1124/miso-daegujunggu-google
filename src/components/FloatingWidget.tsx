/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Phone, ArrowUp, Calculator, HelpCircle, X, CheckSquare } from 'lucide-react';

interface FloatingWidgetProps {
  onOpenCalculator: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function FloatingWidget({ onOpenCalculator, onScrollToSection }: FloatingWidgetProps) {
  const [showTop, setShowTop] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTop(true);
      } else {
        setShowTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center space-y-2.5">
      
      {/* 퀵 안심 도우미 패널 */}
      {panelOpen && (
        <div className="bg-white border-2 border-slate-800 p-5 rounded-2xl shadow-2xl w-72 text-left relative mb-2">
          <button 
            onClick={() => setPanelOpen(false)}
            className="absolute top-3.5 right-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="space-y-4">
            <div>
              <span className="text-[9px] bg-slate-900 text-white font-black px-2 py-0.5 rounded tracking-wider uppercase font-mono">
                QUICK SUMMARY
              </span>
              <h4 className="font-extrabold text-slate-900 text-sm mt-1.5 leading-tight">대구중구법인 안심 금융 가이드</h4>
            </div>

            <div className="space-y-2 text-xs leading-normal font-semibold text-slate-600">
              <button 
                onClick={() => { onScrollToSection('self-diagnosis'); setPanelOpen(false); }}
                className="w-full text-left py-1.5 px-2 hover:bg-slate-50 rounded flex items-center gap-1.5 text-slate-800 hover:text-teal-600 transition"
              >
                <CheckSquare className="w-4 h-4 text-teal-600 inline" />
                <span>1초 만에 자격 진단하기</span>
              </button>
              <button 
                onClick={() => { onOpenCalculator(); setPanelOpen(false); }}
                className="w-full text-left py-1.5 px-2 hover:bg-slate-50 rounded flex items-center gap-1.5 text-slate-800 hover:text-teal-600 transition"
              >
                <Calculator className="w-4 h-4 text-teal-600 inline" />
                <span>스마트 이자 계산기 열기</span>
              </button>
              <button 
                onClick={() => { onScrollToSection('consultation-form'); setPanelOpen(false); }}
                className="w-full text-left py-1.5 px-2 hover:bg-slate-50 rounded flex items-center gap-1.5 text-slate-800 hover:text-teal-600 transition"
              >
                <span>📝 온라인 상담신청서 전송</span>
              </button>
            </div>

            <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-bold leading-normal">
              ※ 대구 남구 중앙대로 146, 4층 하나은행 건물에 위치해 있습니다. (대표 053-252-6408)
            </div>
          </div>
        </div>
      )}

      {/* 안심 상담 토글 버튼 */}
      <button 
        onClick={() => setPanelOpen(!panelOpen)}
        className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition cursor-pointer"
        title="퀵메뉴 도우미"
      >
        <HelpCircle className="w-5.5 h-5.5" />
      </button>

      {/* 대출 계산기 즉석 팝 */ }
      <button 
        onClick={onOpenCalculator}
        className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-teal-700 transition cursor-pointer"
        title="스마트 대출계산기"
      >
        <Calculator className="w-5.5 h-5.5" />
      </button>

      {/* 유선 통화 기법 */}
      <a 
        href="tel:053-252-6408"
        className="w-12 h-12 bg-gradient-to-tr from-emerald-500 to-teal-600 text-white rounded-full flex items-center justify-center shadow-lg hover:brightness-105 transition cursor-pointer"
        title="대표전화 바로 걸기"
      >
        <Phone className="w-5.5 h-5.5" />
      </a>

      {/* 최상단 스크롤업 */}
      {showTop && (
        <button 
          onClick={handleScrollTop}
          className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-slate-800 transition cursor-pointer animate-fade-in"
          title="최상단으로 이동"
        >
          <ArrowUp className="w-5.5 h-5.5" />
        </button>
      )}

    </div>
  );
}
