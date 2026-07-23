/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ShieldCheck, BadgePercent, TrendingDown, CheckCircle2, XCircle } from 'lucide-react';

export default function MisoIntroSection() {
  const features = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-teal-600" />,
      bg: 'bg-teal-50',
      title: '투명한 공익 재원',
      desc: '정부와 금융회사의 출연금으로 조성한 공적 기금으로 운영합니다. 수익 창출이 아니라 서민의 경제적 자립을 돕기 위해 설립된 비영리 법인입니다.'
    },
    {
      icon: <BadgePercent className="w-10 h-10 text-emerald-600" />,
      bg: 'bg-emerald-50',
      title: '제도권 비영리 법인',
      desc: '금융위원회의 허가를 받은 공익법인이자 서민금융진흥원의 미소금융 사업수행기관입니다. 무허가 사금융과 엄격히 구분되는 제도권 금융기관입니다.'
    },
    {
      icon: <TrendingDown className="w-10 h-10 text-indigo-600" />,
      bg: 'bg-indigo-50',
      title: '상품별 정책금리 적용',
      desc: '금리와 한도는 상품별 대상 요건, 우대 조건, 심사 결과에 따라 달라질 수 있습니다. 상담을 통해 본인에게 맞는 지원 가능 여부를 확인해 보시기 바랍니다.'
    }
  ];

  const comparison = [
    { item: '운영 목적', miso: '서민 자립 지원 (공익)', bank: '수익 창출 (영리)', good: true },
    { item: '담보 요구', miso: '없음 (무담보)', bank: '필요한 경우 많음', good: true },
    { item: '금리 수준', miso: '연 4.5% 이내', bank: '신용에 따라 고금리 가능', good: true },
    { item: '대출 한도', miso: '최대 1억 원', bank: '신용도에 따라 상이', good: false },
    { item: '감독 기관', miso: '금융위원회 · 서민금융진흥원', bank: '금융위원회', good: false },
    { item: '수수료', miso: '없음', bank: '중개 수수료 발생 가능', good: true },
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
          <span className="text-xs font-black text-teal-600 tracking-widest uppercase">What is Miso Microcredit?</span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            미소금융은 무엇이 다른가요?
          </h2>
          <div className="h-1.5 w-16 bg-teal-600 rounded-full mx-auto" />
          <p className="text-slate-600 font-medium text-base md:text-lg leading-relaxed">
            일반 금융기관을 이용하기 어려운 분께 저금리 대출을 지원하며,<br className="hidden md:inline" />
            수수료와 담보는 없습니다.
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
              <div className={`w-18 h-18 ${f.bg} rounded-xl flex items-center justify-center mb-5`}>
                {f.icon}
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg mb-3">{f.title}</h3>
              <p className="text-slate-500 text-base leading-relaxed font-medium">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* '미소금융' 명칭 및 사칭 주의 안내 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -4 }}
          className="bg-teal-50/50 border border-teal-100 rounded-3xl px-6 py-6 md:px-10 md:py-8 space-y-3 shadow-sm hover:shadow-md hover:border-teal-200 transition-all"
        >
          <h3 className="font-extrabold text-slate-900 text-lg text-left flex items-center gap-2">
            <span aria-hidden="true">🛡️</span>
            <span>'미소금융' 명칭 및 사칭 주의 안내</span>
          </h3>
          <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
            '미소금융'은 「서민의 금융생활 지원에 관한 법률」 및 관련 규정에 따라 보호되는 정책서민금융상품 명칭입니다. 대출상품·광고·상호 등에 이 명칭을 사용하는 자는 서민금융진흥원과 사업수행기관 등 법령상 허용된 자여야 하며, 이를 위반하면 관련 법령에 따라 과태료가 부과될 수 있습니다.
          </p>
          <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
            미소금융 지원 여부는 상품별 지원요건과 심사기준에 따라 결정되므로 상담 또는 신청만으로 대출이 승인되는 것은 아닙니다. 미소금융은 상담·대출 진행을 이유로 중개 수수료, 선납금, 보증 비용 등 어떠한 명목의 비용도 요구하지 않습니다. 비용을 요구받으셨다면 사기가 강하게 의심되므로 송금·앱 설치를 중단하고 공식 대표번호로 확인·신고해 주시기 바랍니다.
          </p>
          <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
            현재 지정된 서민금융진흥원 미소금융 사업수행기관은{' '}
            <a
              href="https://www.kinfa.or.kr/financialSupport/localCorporation.do"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-teal-600"
            >
              서민금융진흥원 지역법인 공식 안내
            </a>
            에서 확인해 주시기 바랍니다.
          </p>
        </motion.div>

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
            <p className="text-white/80 text-base mt-1">어떤 점이 다른지 한눈에 확인하세요</p>
          </div>

          {/* PC 테이블 */}
          <div className="hidden md:block overflow-x-auto">
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

          {/* 모바일 — B안: 3열 압축형 */}
          <div className="md:hidden">
            <div className="grid grid-cols-[auto_1fr_1fr] text-[10px] font-extrabold text-slate-400 uppercase tracking-wider bg-slate-50 border-b border-slate-100">
              <div className="px-3 py-2">항목</div>
              <div className="px-3 py-2 text-teal-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />미소금융
              </div>
              <div className="px-3 py-2">일반은행</div>
            </div>
            {comparison.map((row, i) => (
              <div key={i} className={`grid grid-cols-[auto_1fr_1fr] border-b border-slate-50 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}>
                <div className="px-3 py-3 font-bold text-slate-600 text-[11px] leading-snug whitespace-nowrap">{row.item}</div>
                <div className="px-3 py-3 font-bold text-teal-700 text-[11px] leading-snug flex items-start gap-1">
                  {row.good && <CheckCircle2 className="w-3 h-3 text-teal-500 shrink-0 mt-0.5" />}
                  <span>{row.miso}</span>
                </div>
                <div className="px-3 py-3 text-slate-500 text-[11px] leading-snug font-medium">{row.bank}</div>
              </div>
            ))}
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

          {/* 모바일 — A안: 상품별 세로 카드 */}
          <div className="md:hidden divide-y divide-slate-100">
            {[
              {
                name: '사회연대금융',
                purpose: '사회적경제기업 운영·시설·임차보증금',
                limit: '최대 1억원',
                rate: '연 4.5% (우수기업 4.0%)',
                period: '최대 6년 (거치 2년 포함)',
                highlight: true,
                blog: 'https://blog.naver.com/PostView.naver?blogId=eornwndrn1&logNo=223850000058&categoryNo=7&parentCategoryNo=7&from=thumbnailList'
              },
              {
                name: '사업자 운영자금',
                purpose: '원재료 구입, 사업장 운영비용',
                limit: '무등록 최대 500만원\n프리랜서 최대 1,000만원\n개인사업자 최대 2,000만원\n청년사업자 최대 3,000만원',
                rate: '연 4.5% (무등록 2.0%)',
                period: '최대 5.5년 (거치 6개월 포함)\n청년 최대 7년 (거치 2년 포함)',
                highlight: false,
                blog: 'https://blog.naver.com/PostView.naver?blogId=eornwndrn1&logNo=224289610439&categoryNo=7&parentCategoryNo=7&from=thumbnailList'
              },
              {
                name: '청년미래이음대출',
                purpose: '만 19~34세 청년 취·창업 자금',
                limit: '최대 500만원',
                rate: '연 4.5%',
                period: '최대 11년 (거치 6년 포함)',
                highlight: false,
                blog: 'https://blog.naver.com/PostView.naver?blogId=eornwndrn1&logNo=224274876397&categoryNo=7&parentCategoryNo=7&from=thumbnailList'
              },
              {
                name: '금융취약계층 생계자금',
                purpose: '취약계층 생계안정 자금',
                limit: '최대 500만원',
                rate: '연 4.5%',
                period: '최대 6년 (거치 1년 포함)',
                highlight: false,
                blog: 'https://blog.naver.com/eornwndrn1/224328452218'
              }
            ].map((row, i) => (
              <div key={i} className={`px-5 py-5 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}>
                <motion.a
                  href={row.blog} target="_blank" rel="noopener noreferrer"
                  animate={{ y: [0, -3, 0], boxShadow: ['0 1px 4px #03C75A33', '0 4px 14px #03C75A88', '0 1px 4px #03C75A33'] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ y: -4, boxShadow: '0 6px 18px #03C75Acc' }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 mb-3 cursor-pointer group">
                  <span className="flex-shrink-0 inline-flex items-center justify-center bg-[#03C75A] p-1.5 rounded-md">
                    <img src="/logos/naver_blog_logo.png" alt="블로그" className="w-4 h-4 object-contain brightness-0 invert flex-shrink-0" />
                  </span>
                  <span className={`font-extrabold text-sm leading-snug group-hover:underline ${row.highlight ? 'text-teal-700' : 'text-slate-800'}`}>{row.name}</span>
                </motion.a>
                <p className="text-slate-500 text-xs font-medium mb-3 leading-relaxed">{row.purpose}</p>
                <div className="flex gap-2 mb-2">
                  <div className="flex-1 bg-slate-50 rounded-lg px-3 py-2">
                    <p className="text-[10px] font-bold text-slate-400 mb-0.5">대출한도</p>
                    {row.limit.split('\n').map((line, j) => (
                      <p key={j} className="text-[10px] font-bold text-slate-800 leading-tight break-keep">{line}</p>
                    ))}
                  </div>
                  <div className="flex-1 bg-teal-50 rounded-lg px-3 py-2">
                    <p className="text-[10px] font-bold text-teal-500 mb-0.5">대출금리</p>
                    <p className="text-xs font-bold text-teal-700">{row.rate}</p>
                  </div>
                </div>
                <div className="bg-indigo-50 rounded-lg px-3 py-2">
                  <p className="text-[10px] font-bold text-indigo-400 mb-0.5">상환기간</p>
                  {row.period.split('\n').map((line, j) => (
                    <p key={j} className="text-xs font-medium text-indigo-700 leading-snug break-keep">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* PC 테이블 */}
          <div className="hidden md:block overflow-x-auto">
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
                    name: '사회연대금융',
                    purpose: '사회적경제기업 운영·시설·임차보증금',
                    limit: '최대 1억원',
                    rate: '연 4.5% (우수기업 4.0%)',
                    period: '최대 6년 (거치 2년 포함)',
                    highlight: true,
                    blog: 'https://blog.naver.com/PostView.naver?blogId=eornwndrn1&logNo=223850000058&categoryNo=7&parentCategoryNo=7&from=thumbnailList'
                  },
                  {
                    name: '사업자 운영자금',
                    purpose: '원재료 구입, 사업장 운영비용',
                    limit: '무등록 최대 500만원\n프리랜서 최대 1,000만원\n개인사업자 최대 2,000만원\n청년사업자 최대 3,000만원',
                    rate: '연 4.5% (무등록 2.0%)',
                    period: '최대 5.5년 (거치 6개월 포함)\n청년 최대 7년 (거치 2년 포함)',
                    highlight: false,
                    blog: 'https://blog.naver.com/PostView.naver?blogId=eornwndrn1&logNo=224289610439&categoryNo=7&parentCategoryNo=7&from=thumbnailList'
                  },
                  {
                    name: '청년미래이음대출',
                    purpose: '만 19~34세 청년 취·창업 자금',
                    limit: '최대 500만원',
                    rate: '연 4.5%',
                    period: '최대 11년 (거치 6년 포함)',
                    highlight: false,
                    blog: 'https://blog.naver.com/PostView.naver?blogId=eornwndrn1&logNo=224274876397&categoryNo=7&parentCategoryNo=7&from=thumbnailList'
                  },
                  {
                    name: '금융취약계층 생계자금',
                    purpose: '취약계층 생계안정 자금',
                    limit: '최대 500만원',
                    rate: '연 4.5%',
                    period: '최대 6년 (거치 1년 포함)',
                    highlight: false,
                    blog: 'https://blog.naver.com/eornwndrn1/224328452218'
                  }
                ].map((row, i) => (
                  <tr key={i} className={`border-b border-slate-50 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
                    <td className={`px-5 py-4 align-top font-extrabold text-sm ${row.highlight ? 'text-teal-700' : 'text-slate-800'}`}>
                      <motion.a
                        href={row.blog} target="_blank" rel="noopener noreferrer"
                        animate={{ y: [0, -3, 0], boxShadow: ['0 1px 4px #03C75A33', '0 4px 14px #03C75A88', '0 1px 4px #03C75A33'] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                        whileHover={{ y: -4, boxShadow: '0 6px 18px #03C75Acc' }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 cursor-pointer group">
                        <span className="flex-shrink-0 inline-flex items-center justify-center bg-[#03C75A] p-1.5 rounded-md">
                          <img src="/logos/naver_blog_logo.png" alt="블로그" className="w-4 h-4 object-contain brightness-0 invert flex-shrink-0" />
                        </span>
                        <span className="group-hover:underline">{row.name}</span>
                      </motion.a>
                    </td>
                    <td className="px-5 py-4 align-top text-slate-600 text-xs font-medium leading-relaxed">{row.purpose}</td>
                    <td className="px-5 py-4 align-top text-center font-bold text-slate-800 text-xs">
                      {row.limit.split('\n').map((line, j) => (
                        <p key={j} className="leading-snug break-keep">{line}</p>
                      ))}
                    </td>
                    <td className="px-5 py-4 align-top text-center font-bold text-teal-700 text-xs">{row.rate}</td>
                    <td className="px-5 py-4 align-top text-center text-slate-600 text-xs">
                      {row.period.split('\n').map((line, j) => (
                        <p key={j} className="leading-snug break-keep">{line}</p>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
