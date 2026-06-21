/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Heart, Landmark, ShieldAlert, BadgeInfo } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* 상단 띠 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-800 pb-8">
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-white font-extrabold text-lg">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 fill-white text-white" />
              </div>
              <span>(사)미소금융대구중구법인</span>
            </div>
            <p className="text-xs text-slate-500 font-semibold">
              본 법인은 금융위원회 법령 인가 설립 서민금융진흥원 공식 정책 사업수행기관입니다.
            </p>
          </div>

          <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-bold bg-slate-950 p-3 rounded-lg border border-slate-850">
            <ShieldAlert className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>본 사이트는 상담 안내 공식 사이트이며 수수료 수취 혹은 가입 보장 호객 브로커 계약을 완전히 처단합니다.</span>
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

          <div className="md:col-span-4 space-y-3.5 border-t border-slate-800 pt-6 md:border-t-0 md:pt-0">
            <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider">
              금융 소비자 보호 특별 안내조항
            </span>
            <ul className="space-y-1.5 text-slate-600 font-semibold leading-normal">
              <li>※ 모든 대출은 신용 등급 및 본인 점수에 따른 융자위원 개별 심사 결과에 근거합니다.</li>
              <li>※ 금리 연 4.5% 수준(고정 정책 이율)이며 취득 선수금, 보험료, 자문 갈취 일절 금지됩니다.</li>
              <li>※ 대출 연체 시 고유 등급 징벌 조향 및 이자 증가, 사후 경영 제약이 등입됩니다.</li>
            </ul>
          </div>

        </div>

        {/* 최하단 준수 광고 확인 라벨 */}
        <div className="p-4 bg-slate-950 rounded-lg text-[10px] text-slate-600 font-bold flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <span>※ 본 광고물은 서민금융 동반 가치 촉진을 위해 서금원 심의 가이드라인을 완전 준수해 작성되었습니다.</span>
          <span>공인 심의 일자: 2026년 06월 20일 기준 정비 완료</span>
        </div>

      </div>
    </footer>
  );
}
