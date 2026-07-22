/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">

        {/* 로고 및 법인명 — 클릭 시 초기 화면으로 이동 */}
        <Link
          to="/"
          className="flex items-center space-x-2.5 pb-2 border-b border-slate-800 cursor-pointer hover:opacity-80 transition-opacity w-fit text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img src="/miso_symbol.png" alt="미소금융 로고" className="w-9 h-9 object-contain" />
          <div className="text-center leading-none">
            <div className="text-white font-bold text-base tracking-tight leading-none">(사)미소금융대구중구법인</div>
            <div className="text-xs font-semibold text-slate-300 tracking-wide uppercase mt-0.5 whitespace-nowrap">서민금융진흥원 미소금융 사업수행기관</div>
          </div>
        </Link>

        {/* 퀵링크 */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 py-1.5 border-b border-slate-800 text-xs font-semibold">
          <Link to="/products" className="text-slate-400 hover:text-white transition-colors">
            상품안내
          </Link>
          <a
            href="https://blog.naver.com/eornwndrn1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors"
          >
            법인 공식 블로그
          </a>
        </div>

        {/* 법인 정보 */}
        <div className="text-xs leading-snug space-y-1">
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-slate-400 font-semibold">
            <span><strong>대표자:</strong> 김석동</span>
            <span><strong>사업자번호:</strong> 504-82-13565</span>
            <span><strong>주소:</strong> 대구광역시 남구 중앙대로 146, 4층 (봉덕동, 하나은행 봉덕지점)</span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-slate-500 font-medium">
            <span><strong>대표 문의:</strong> <a href="tel:053-252-6408" className="hover:text-white underline underline-offset-2 transition-colors">053-252-6408</a></span>
            <span><strong>FAX:</strong> 053-252-8877</span>
            <span>
              <a
                href="https://www.kinfa.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 font-semibold hover:text-white underline underline-offset-2 transition-colors"
              >
                서민금융진흥원
              </a>
              :{' '}
              <a
                href="tel:1397"
                className="text-slate-400 hover:text-white underline underline-offset-2 transition-colors"
              >
                1397 (국번없이)
              </a>
            </span>
            <Link
              to="/privacy-policy"
              className="text-slate-400 hover:text-white font-semibold underline underline-offset-2 transition-colors"
            >
              개인정보처리방침
            </Link>
          </div>
          <p className="text-slate-600 font-bold pt-1">
            © 2026 (사)미소금융대구중구법인 (Daegu Jung-gu Miso Microfinance Association). All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
