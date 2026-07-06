/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode } from 'react';

interface SectionPageShellProps {
  eyebrow: string;
  title: string;
  description: string;
  bgImage?: string;
  children: ReactNode;
}

export default function SectionPageShell({ eyebrow, title, description, bgImage, children }: SectionPageShellProps) {
  return (
    <div className="bg-white">
      {/* 서브 히어로 배너 — 헤더(고정) 아래에 이어지도록 pt로 여백 확보 */}
      <div className="relative overflow-hidden bg-gradient-to-br from-miso-navy-700 via-miso-navy-600 to-miso-blue-700 pt-24 pb-12 md:pt-36 md:pb-20">
        {/* 배경 이미지 — 없거나 로드 실패해도 위 그라데이션이 그대로 보여 깨지지 않음 */}
        {bgImage && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-60"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
        )}
        {/* 어두운 오버레이 — 배경이 보이면서도 텍스트 가독성 확보 */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/45 via-slate-900/35 to-slate-900/55" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 md:space-y-4">
          <span className="inline-block text-[11px] md:text-xs font-black tracking-widest uppercase text-teal-300">
            {eyebrow}
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight drop-shadow">
            {title}
          </h1>
          <p className="text-white/80 text-sm md:text-lg font-medium leading-relaxed max-w-2xl md:max-w-none mx-auto whitespace-pre-line md:whitespace-nowrap">
            {description}
          </p>
        </div>
      </div>

      {/* 본문 — 배너와 자연스럽게 이어지도록 상단 여백만 부여 */}
      <div className="-mt-1">
        {children}
      </div>
    </div>
  );
}
