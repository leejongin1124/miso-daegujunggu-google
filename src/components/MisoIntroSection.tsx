/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ShieldCheck, BadgePercent, TrendingUp, CheckCircle2, XCircle } from 'lucide-react';

export default function MisoIntroSection() {
  const features = [
    {
      icon: <ShieldCheck className="w-7 h-7 text-teal-600" />,
      bg: 'bg-teal-50',
      title: '투명한 공익 재원',
      desc: '정부 출연금과 금융회사 출연금으로 조성된 공적 재원으로 운영됩니다. 수익이 아닌 서민의 자립을 목적으로 설립된 비영리 구조입니다.'
    },
    {
      icon: <BadgePercent className="w-7 h-7 text-emerald-600" />,
      bg: 'bg-emerald-50',
      title: '제도권 비영리 법인',
      desc: '금융위원회 허가를 받은 공익법인으로, 서민금융진흥원의 공식 사업수행기관입니다. 불법 사금융과는 전혀 다른 제도권 금융입니다.'
    },
    {
      icon: <TrendingUp className="w-7 h-7 text-indigo-600" />,
      bg: 'bg-indigo-50',
      title: '연 4.5% 저금리',
      desc: '시중 은행 대출이 어려운 분들에게 연 4.5% 수준의 저금리로 지원합니다. 담보나 보증 없이 자립 의지만으로 신청하실 수 있습니다.'
    }
  ];

  const comparison = [
    { item: '운영 목적', miso: '서민 자립 지원 (공익)', bank: '수익 창출 (영리)', good: true },
    { item: '담보 요구', miso: '없음 (무담보)', bank: '필요한 경우 많음', good: true },
    { item: '금리 수준', miso: '연 4.5% 내외', bank: '신용에 따라 고금리 가능', good: true },
    { item: '대출 한도', miso: '최대 1억 원', bank: '신용도에 따라 상이', good: false },
    { item: '감독 기관', miso: '금융위원회 · 서민금융진흥원', bank: '금융위원회', good: false },
    { item: '수수료', miso: '일체 없음', bank: '중개 수수료 발생 가능', good: true },
  ];

  return (
    <section id="miso-intro" className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* 타이틀 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          <span className="text-xs font-black text-teal-600 tracking-widest uppercase">What is Miso Finance?</span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            미소금융은 무엇이 다른가요?
          </h2>
          <div className="h-1.5 w-16 bg-teal-600 rounded-full mx-auto" />
          <p className="text-slate-600 font-medium text-base md:text-lg leading-relaxed">
            은행 대출이 어려우셨던 분들을 위해 정부가 만든 서민 전용 정책 금융입니다.<br className="hidden md:inline" />
            수수료도, 담보도, 보증인도 필요 없습니다.
          </p>
        </motion.div>

        {/* 3가지 특징 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm hover:shadow-md hover:border-teal-200 transition-all"
            >
              <div className={`w-14 h-14 ${f.bg} rounded-xl flex items-center justify-center mb-5`}>
                {f.icon}
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg mb-3">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* 비교 테이블 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden"
        >
          <div className="bg-gradient-to-r from-teal-600 to-emerald-600 px-8 py-6 text-white">
            <h3 className="font-extrabold text-xl">미소금융 vs 일반 금융기관 비교</h3>
            <p className="text-white/80 text-sm mt-1">어떤 점이 다른지 한눈에 확인하세요</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left px-6 py-4 font-extrabold text-slate-500 text-xs uppercase tracking-wider w-1/4">항목</th>
                  <th className="text-center px-6 py-4 font-extrabold text-teal-700 text-xs uppercase tracking-wider w-3/8">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-teal-500 inline-block" />
                      미소금융 (정책금융)
                    </span>
                  </th>
                  <th className="text-center px-6 py-4 font-extrabold text-slate-500 text-xs uppercase tracking-wider w-3/8">일반 금융기관</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={i} className={`border-b border-slate-50 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
                    <td className="px-6 py-4 font-bold text-slate-700">{row.item}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1.5 font-bold text-teal-700">
                        {row.good && <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />}
                        {row.miso}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-slate-500 font-medium">{row.bank}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-8 py-5 bg-teal-50/50 border-t border-teal-100">
            <p className="text-teal-700 text-xs font-bold text-center">
              ※ 미소금융은 중개 수수료, 선납금, 보증 비용 등 어떠한 명목의 비용도 요구하지 않습니다. 이를 요구하는 경우 100% 사기입니다.
            </p>
          </div>
        </motion.div>

        {/* 한눈에 보는 대출상품 안내 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-6 text-white">
            <h3 className="font-extrabold text-xl">한눈에 보는 대출상품 안내</h3>
            <p className="text-white/80 text-sm mt-1">4가지 정책 대출 상품의 주요 조건을 한 번에 확인하세요</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ minWidth: '640px' }}>
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left px-5 py-4 font-extrabold text-slate-500 text-xs uppercase tracking-wider">상품명</th>
                  <th className="text-left px-5 py-4 font-extrabold text-slate-500 text-xs uppercase tracking-wider">자금용도</th>
                  <th className="text-center px-5 py-4 font-extrabold text-slate-500 text-xs uppercase tracking-wider">대출한도</th>
                  <th className="text-center px-5 py-4 font-extrabold text-slate-500 text-xs uppercase tracking-wider">대출금리</th>
                  <th className="text-center px-5 py-4 font-extrabold text-slate-500 text-xs uppercase tracking-wider">상환기간</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: '사회적연대금융',
                    purpose: '사회적경제기업 운영·시설·임차보증금',
                    limit: '최대 1억원',
                    rate: '연 4.5% (우수기업 4.0%)',
                    period: '최대 6년 (거치 2년 포함)',
                    highlight: true
                  },
                  {
                    name: '사업자 운영자금',
                    purpose: '원재료 구입, 사업장 운영비용',
                    limit: '최대 2,000만원 (청년 최대 3,000만원)',
                    rate: '연 4.5%',
                    period: '최대 5.5년 (거치 6개월 포함)',
                    highlight: false
                  },
                  {
                    name: '청년미래이음대출',
                    purpose: '만 19~34세 청년 취·창업 자금',
                    limit: '최대 500만원',
                    rate: '연 4.5%',
                    period: '최대 11년 (거치 6년 포함)',
                    highlight: false
                  },
                  {
                    name: '금융취약계층 생계자금',
                    purpose: '취약계층 생계안정 자금',
                    limit: '최대 500만원',
                    rate: '연 4.5%',
                    period: '거치 1년 + 분할 5년 (총 6년)',
                    highlight: false
                  }
                ].map((row, i) => (
                  <tr key={i} className={`border-b border-slate-50 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
                    <td className={`px-5 py-4 font-extrabold text-sm ${row.highlight ? 'text-teal-700' : 'text-slate-800'}`}>{row.name}</td>
                    <td className="px-5 py-4 text-slate-600 text-xs font-medium leading-relaxed">{row.purpose}</td>
                    <td className="px-5 py-4 text-center font-bold text-slate-800 text-xs">{row.limit}</td>
                    <td className="px-5 py-4 text-center font-bold text-teal-700 text-xs">{row.rate}</td>
                    <td className="px-5 py-4 text-center text-slate-600 text-xs">{row.period}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-8 py-5 bg-indigo-50/50 border-t border-indigo-100">
            <p className="text-indigo-700 text-xs font-bold text-center">
              ※ 모든 상품 금리는 연 4.5% 고정이며, 4회 이상 성실 납입 시 연 3.5%로 우대 적용됩니다.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
