/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* 상단 띠 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-800 pb-8">

          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-white font-extrabold text-lg">
              <img src="/miso_symbol.png" alt="미소금융 로고" className="w-8 h-8 object-contain" />
              <span>(사)미소금융대구중구법인</span>
            </div>
            <p className="text-xs text-slate-500 font-semibold">
              본 법인은 금융위원회 법령 인가 설립 서민금융진흥원 공식 정책 사업수행기관입니다.
            </p>
          </div>

        </div>

        {/* 중단 상세 법인 정보 및 실데이터 수록 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-xs leading-relaxed">
          
          <div className="md:col-span-8 space-y-4">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-slate-400 font-semibold">
              <span><strong>대표자:</strong> 김석동</span>
              <span><strong>법인 등록번호:</strong> 504-82-13565</span>
              <span><strong>주소:</strong> 대구광역시 남구 중앙대로 146, 4층 (봉덕동, 하나은행 봉덕지점 건물)</span>
            </div>
            
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-slate-500 font-medium">
              <span><strong>대표 문의:</strong> 053-252-6408</span>
              <span><strong>FAX 전용 팩스:</strong> 053-252-8877</span>
              <span><strong>서민금융 콜 통합:</strong> 1397 (국번없이)</span>
            </div>

            <p className="text-slate-600 font-bold">
              © 2026 (사)미소금융대구중구법인 (Daegu Junggu Miso Microcredit Bank Corp). All rights reserved.
            </p>
          </div>


        </div>


      </div>
    </footer>
  );
}
