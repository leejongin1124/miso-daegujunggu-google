/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function ContactForm() {
  return (
    <section id="consultation-form" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="text-xs font-black text-teal-600 tracking-widest uppercase">Contact Us</span>
        <h2 className="text-3xl font-black text-slate-900">상담 신청</h2>
        <div className="h-1.5 w-16 bg-teal-600 rounded-full mx-auto" />
        <p className="text-slate-600 font-medium">
          전화 또는 방문 상담을 원하시면 아래로 연락해 주세요.
        </p>
        <a
          href="tel:053-252-6408"
          className="inline-flex items-center bg-teal-600 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-md hover:bg-teal-700 transition"
        >
          📞 053-252-6408 전화 상담
        </a>
        <p className="text-slate-400 text-sm">평일 09:00 - 18:00 / 주말·공휴일 휴무</p>
      </div>
    </section>
  );
}
