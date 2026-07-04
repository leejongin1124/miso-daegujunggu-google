/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function PrivacyPolicySection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-left">
        <div className="space-y-2 text-center">
          <span className="text-xs font-black text-teal-600 tracking-widest uppercase">Privacy Policy</span>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">개인정보처리방침</h2>
          <div className="h-1.5 w-16 bg-teal-600 rounded-full mx-auto" />
        </div>

        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 md:p-8 space-y-4 text-sm text-slate-600 leading-relaxed">
          <p>
            (사)미소금융대구중구법인(이하 "법인")은 본 홈페이지를 통해 별도의 회원가입이나 온라인 신청 절차를 운영하지 않으며,
            홈페이지 방문 과정에서 이용자의 개인정보를 직접 수집하지 않습니다.
          </p>
          <p>
            대출 상담 및 신청 절차는 대표 전화 상담 또는 법인 방문을 통해서만 진행되며, 이 과정에서 발생하는 개인정보(성명, 연락처,
            신용정보, 증빙서류 등)는 관련 법령 및 서민금융진흥원의 정책자금 운용 기준에 따라 서면·대면으로만 수집·관리됩니다.
          </p>
          <p>
            온라인상에서 법인을 사칭하여 개인정보나 금전을 요구하는 경우 이에 응하지 마시고, 즉시 대표번호(053-252-6408) 또는
            금융감독원(1332)으로 신고해 주시기 바랍니다.
          </p>
          <p className="text-slate-400 text-xs pt-2">
            본 방침은 관련 법령 및 정책 변경에 따라 사전 고지 없이 수정될 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
