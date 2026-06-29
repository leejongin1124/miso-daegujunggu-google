/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">

        {/* 로고 및 법인명 — 헤더와 동일 구조 */}
        <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-800">
          <img src="/miso_symbol.png" alt="미소금융 로고" className="w-9 h-9 object-contain" />
          <div className="leading-none">
            <div className="text-white font-bold text-base tracking-tight leading-none">(사)미소금융대구중구법인</div>
            <div className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase mt-0.5">서민금융진흥원 공식 사업수행기관</div>
          </div>
        </div>

        {/* 법인 정보 */}
        <div className="text-xs leading-snug space-y-1.5">
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-slate-400 font-semibold">
            <span><strong>대표자:</strong> 김석동</span>
            <span><strong>사업자번호:</strong> 504-82-13565</span>
            <span><strong>주소:</strong> 대구광역시 남구 중앙대로 146, 4층 (봉덕동, 하나은행 봉덕지점 건물)</span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-slate-500 font-medium">
            <span><strong>대표 문의:</strong> 053-252-6408</span>
            <span><strong>FAX:</strong> 053-252-8877</span>
            <span><strong>서민금융 콜 통합:</strong> 1397 (국번없이)</span>
          </div>
          <p className="text-slate-600 font-bold pt-1">
            © 2026 (사)미소금융대구중구법인 (Daegu Junggu Miso Microcredit Bank Corp). All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
