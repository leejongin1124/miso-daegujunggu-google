/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, BadgeAlert, MessageSquare } from 'lucide-react';
import { ConsultationForm } from '../types';

export default function ContactForm() {
  const [formData, setFormData] = useState<ConsultationForm>({
    name: '',
    phone: '',
    birthDate: '',
    productType: 'social',
    incomeType: 'individual',
    hasActiveArrears: false,
    message: '',
    isAgreed: false,
    monthlyIncome: 2000000
  });

  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  
  // 가상 챗봇 상태
  const [chatMessages, setChatMessages] = useState<{sender: 'user' | 'bot', text: string}[]>([
    { sender: 'bot', text: '안녕하십니까! (사)미소금융대구중구법인 서민금융 AI 안심 도우미입니다.' },
    { sender: 'bot', text: '4대 미소금융 정책 자금 조건 및 연 4.5% 한도 구제 수칙, 구비 서류 등에 대해 무엇이든 정직하게 질문해 주십시오.' }
  ]);
  const [chatbotInput, setChatbotInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.isAgreed) {
      alert('개인정보 제공 동의(필수)에 동의해 주셔야 접수가 가능합니다.');
      return;
    }

    const newApp = {
      ...formData,
      id: 'MISO-' + Date.now().toString().slice(-6),
      timestamp: new Date().toLocaleString(),
      status: formData.hasActiveArrears ? '구제 검토중' : '접수 완료'
    };

    // 로컬 스토리지 보존 (보이지 않는 백엔드 기록용)
    try {
      const saved = localStorage.getItem('miso_applications');
      const list = saved ? JSON.parse(saved) : [];
      const updated = [newApp, ...list];
      localStorage.setItem('miso_applications', JSON.stringify(updated.slice(0, 10)));
    } catch (err) {
      console.error(err);
    }

    setIsSubmitSuccess(true);
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      phone: '',
      birthDate: '',
      productType: 'social',
      incomeType: 'individual',
      hasActiveArrears: false,
      message: '',
      isAgreed: false,
      monthlyIncome: 2000000
    });
    setIsSubmitSuccess(false);
  };

  // 실시간 AI 챗 복잡 룰 엔진 (Gemini Client mock-tuning)
  const handleChatSend = () => {
    if(!chatbotInput.trim()) return;
    const userMsg = chatbotInput;
    const newMsgs = [...chatMessages, { sender: 'user', text: userMsg }];
    setChatMessages(newMsgs);
    setChatbotInput('');

    // 비상 대응 답변 딕셔너리
    setTimeout(() => {
      let botResponse = '질문하신 사항에 대한 세부 가이드입니다. 미소금융 대구중구법인 대출 자격은 신용평점 하위 20% 이내(NICE 749점 이하)이거나 기초생활수급자·차상위계층에 해당되어야 무담보 연 4.5% 접수가 가능합니다. 더 상세한 사항은 평일 9시 ~ 18시 대표전화 053-252-6408로 연락주시면 기꺼이 도와드립니다.';
      
      const text = userMsg.toLowerCase();
      if(text.includes('금리') || text.includes('이자')) {
        botResponse = '저희 (사)미소금융대구중구법인의 표준 이자율은 연 4.5% 고정 금리입니다. 가혹한 마진이 포함되지 않은 서민금융원 공식 정책 요율이며, 고용인증 사회적기업 우대 통과 시 전국 최저인 연 4.0%대 특수 금리 설계도 가능합니다.';
      } else if(text.includes('한도') || text.includes('얼마')) {
        botResponse = '상품 설계별 한도는 다음과 같습니다. 1) 대표 공공 협력 가치자금인 「사회적연대금융」은 기업·조합 당 최대 1억원 원칙이며, 2) 일반 골목상권 「사업자 자영업자금」은 최대 2,000만원, 3) 구직·창업 「청년 미래이음」은 최대 500만원, 4) 긴급 구제 「금융취약생계비」는 최대 500만원 한도로 제한 결정됩니다.';
      } else if(text.includes('서류') || text.includes('준비')) {
        botResponse = '기본 방문 시 1) 사업자등록증 원본 구비, 2) 최근 연 매출 부가세 소득 소명 영수증, 3) 카드 매출 통장 거래 계좌 사본을 지참하셔야 1차 면접심사가 속히 도출됩니다. 사회단체는 법인정관과 3개년 결산서 및 KODIT 업로드 내역이 필수입니다.';
      } else if(text.includes('연체') || text.includes('신용')) {
        botResponse = '미소금융 지원 규칙 상, 현재 전산 상 1일 이상의 연체 정보가 등재되어 있을 시 신차 대출 가입이 엄격히 불허될 수 있습니다. 단, 과거 연체 해소자 및 채무 성수 조정 중인 분들을 위한 피해 복구 구제 생계 자금도 상담 중 확인이 가능하오니 꼭 대표번호 053-252-6408 가이드를 권장합니다.';
      } else if(text.includes('위치') || text.includes('어디') || text.includes('주소')) {
        botResponse = '저희 대구중구법인은 대구광역시 남구 중앙대로 146(봉덕동), 하나은행 봉덕지점 건물 4층으로 마주해 있습니다. 지하철 1호선 영대병원역 3번출구로 내리시면 8분 내 이동이 수월합니다.';
      }

      setChatMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 400);
  };

  return (
    <section id="consultation-form" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 타이틀 */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <span className="text-xs font-black text-teal-600 tracking-widest uppercase">Quick Consultation</span>
          <h2 className="text-3xl md:text-4.5xl font-black text-slate-900 tracking-tight leading-none">
            간편 무료 자격상담 예약 신청
          </h2>
          <div className="h-1.5 w-16 bg-teal-600 rounded-full mx-auto" />
          <p className="text-slate-600 font-medium text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            무료 예약 상담은 본인의 신용 평점에 일체의 타격을 주지 않는 안전 무담보 맞춤 정보 서비스 제공 목적으로만 운용됩니다. <br />
            아래 필수 정보를 기입하시면 담당 심사역과의 정직하고 빠른 유선 상담 예약이 확정됩니다.
          </p>
        </div>

        {/* 대시보드 융합 구도 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* 가입 신청서 (8칸) */}
          <div className="lg:col-span-8 bg-white p-8 md:p-10 rounded-3xl border border-slate-200/80 shadow-lg text-left flex flex-col justify-between">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-1">
              <span>📝 무료 한도 상담 신청서</span>
            </h3>

            {isSubmitSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 px-6 space-y-6 flex flex-col items-center my-auto"
              >
                <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center text-3xl shadow-inner border border-teal-100/80 animate-bounce">
                  ✅
                </div>
                <div className="space-y-2">
                  <h4 className="font-black text-slate-900 text-xl">무료 상담 예약 신청이 완료되었습니다!</h4>
                  <p className="text-slate-500 text-xs md:text-sm max-w-md mx-auto leading-relaxed font-semibold">
                    국가 정책 자금 자문 위원이 기입해 주신 연락처 <strong className="text-teal-600 font-extrabold">{formData.phone}</strong>로 <br />
                    영업일 기준 가장 빠른 시일 내에 전화를 드려 정직하고 정밀한 맞춤 상담을 진행해 드리겠습니다.
                  </p>
                </div>
                
                {/* 간략 정리 박스 */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left w-full max-w-md space-y-3 font-semibold text-xs shadow-sm">
                  <div className="flex justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-slate-400 font-bold">신청 고객명</span>
                    <span className="text-slate-800 font-extrabold">{formData.name}님</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-slate-400 font-bold">희망 정책자금</span>
                    <span className="text-slate-800 font-extrabold text-teal-600">
                      {formData.productType === 'social' && '사회적연대금융 (최대 1억)'}
                      {formData.productType === 'business' && '일반 소상공인 사업운영자금 (최대 2천)'}
                      {formData.productType === 'youth' && '청년 미래이음 성장자금 (최대 5백)'}
                      {formData.productType === 'vulnerable' && '금융소외 보호 생계자금 (최대 5백)'}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-slate-400 font-bold">신청 소득 구분</span>
                    <span className="text-slate-800 font-extrabold">
                      {formData.incomeType === 'corporate' && '고용노동부 인증 및 사회 법인'}
                      {formData.incomeType === 'individual' && '개인 자영업 사업자 대표'}
                      {formData.incomeType === 'youth' && '만 19세 ~ 34세 청년 구직/창업'}
                      {formData.incomeType === 'vulnerable' && '수급자·차상위·기타 피해 배려가구'}
                    </span>
                  </div>
                  {formData.hasActiveArrears && (
                    <p className="text-[10px] text-rose-700 bg-rose-50 p-3 rounded-xl border border-rose-200 leading-normal font-bold">
                      ※ 연체 사실을 체크해 주셨습니다. 심사관과의 1:1 대화 단계에서 한도 우회 자격 검토 및 공공 채무 조정을 동반한 복구 설계 가능 여부를 집중 타진하겠습니다.
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleResetForm}
                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black transition shadow cursor-pointer justify-center align-middle"
                >
                  새로 상담 신청하기
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-500">실명 성 명 (한글 필수)</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      placeholder="홍길동"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-500 px-4 py-3 rounded-xl text-sm font-semibold text-slate-800 transition-all outline-none"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-500">생년월일 (8자리)</label>
                    <input 
                      type="text" 
                      name="birthDate"
                      required
                      placeholder="19850101"
                      maxLength={8}
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-500 px-4 py-3 rounded-xl text-sm font-semibold text-slate-800 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-500">휴대폰 연락처 및 문자 구사</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      placeholder="010-1234-5678"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-500 px-4 py-3 rounded-xl text-sm font-semibold text-slate-800 transition-all outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-500">희망 요청 정책자금</label>
                    <select 
                      name="productType"
                      value={formData.productType}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-500 px-4 py-3.5 rounded-xl text-sm font-bold text-slate-700 transition-all outline-none cursor-pointer"
                    >
                      <option value="social">사회적연대금융 (최대 1억원)</option>
                      <option value="business">일반 소상공인 사업운영자금 (최대 2천만원)</option>
                      <option value="youth">청년 미래이음 성장자금 (최대 5백만원)</option>
                      <option value="vulnerable">금융소외 보호 생계자금 (최대 5백만원)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-500">신청 소득 구분</label>
                    <select 
                      name="incomeType"
                      value={formData.incomeType}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-500 px-4 py-3.5 rounded-xl text-sm font-bold text-slate-700 transition-all outline-none cursor-pointer"
                    >
                      <option value="corporate">고용노동부 인증 및 사회 법인</option>
                      <option value="individual">개인 자영업 사업자 대표</option>
                      <option value="youth">만 19세 ~ 34세 청년 구직/창업</option>
                      <option value="vulnerable">수급자·차상위·기타 피해 배려가구</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-500">대략적인 월 평균 고정소득 (원)</label>
                    <input 
                      type="number" 
                      name="monthlyIncome"
                      value={formData.monthlyIncome}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-500 px-4 py-3 rounded-xl text-sm font-semibold text-slate-800 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* 연체 주의 빨간 카드 위젯 */}
                <div className="bg-rose-50 border border-rose-200/50 p-4 rounded-2xl space-y-3">
                  <div className="flex gap-2.5 text-rose-800">
                    <BadgeAlert className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-extrabold text-sm">연체 상태에 관한 양심 심의 수칙</h5>
                      <p className="text-[11px] text-rose-600 font-semibold leading-normal mt-0.5">
                        미소정책법령상, 타금융사나 공공 전산망에 단 1일이라도 **연체 연체정보**가 가동 중이시라면 심사 통과가 정직히 어려울 수 있습니다.
                      </p>
                    </div>
                  </div>
                  
                  <label className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-rose-150 cursor-pointer text-xs font-bold text-slate-755 select-none hover:bg-slate-50">
                    <input 
                      type="checkbox" 
                      name="hasActiveArrears"
                      checked={formData.hasActiveArrears}
                      onChange={handleInputChange}
                      className="accent-rose-650 w-4 h-4"
                    />
                    <span>솔직하게 고백합니다: 저는 현재 연체 연체 상태에 놓여 있습니다.</span>
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-500">기타 자생적 경영 세부 애로사항 (기입 시 가산심사)</label>
                  <textarea 
                    name="message"
                    rows={4}
                    placeholder="예: 정부보조금 선집행 전 운전자금이 3주 동안 필요합니다 등"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-500 px-4 py-3 rounded-xl text-sm font-semibold text-slate-800 transition-all outline-none resize-none"
                  />
                </div>

                {/* 개인정보 제공 동의 */}
                <label className="flex items-start gap-2.5 pt-2 text-xs font-bold text-slate-500 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    name="isAgreed"
                    required
                    checked={formData.isAgreed}
                    onChange={handleInputChange}
                    className="accent-teal-600 w-4.5 h-4.5 mt-0.5 shrink-0 cursor-pointer"
                  />
                  <span>
                    [필수] 개인 정보 보호법 수칙에 따른 (사)미소금융대구중구법인의 상담 서적 기입 및 무료 맞춤 제안 업무용 개인 정보 수집 및 제공 양식에 정직히 동의합니다.
                  </span>
                </label>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:brightness-105 font-black py-4.5 rounded-2xl text-base shadow-lg shadow-teal-100/50 flex items-center justify-center space-x-2 transition cursor-pointer"
                >
                  <Send className="w-5 h-5" />
                  <span>📞 무료 맞춤 상담 신청하기</span>
                </button>

              </form>
            )}
          </div>

          {/* AI 대화형 안심 도우미 챗봇 위젯 컴팩트 탑재 */}
          <div className="lg:col-span-4 flex flex-col sm:h-[450px] lg:h-auto text-left">
            
            <div className="bg-gradient-to-tr from-slate-900 to-teal-950 p-6 md:p-8 rounded-3xl text-white text-left relative overflow-hidden shadow-lg flex-1 flex flex-col justify-between h-full min-h-[500px]">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-4 flex flex-col flex-1 h-full">
                <div className="flex justify-between items-center shrink-0">
                  <span className="text-[10px] font-bold text-teal-300 bg-white/10 px-2.5 py-1 rounded">
                    Miso AI Assistant
                  </span>
                  <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
                </div>
                
                <h4 className="text-base font-extrabold flex items-center gap-1.5 pb-2 border-b border-white/15 shrink-0">
                  <MessageSquare className="w-5 h-5 text-teal-300" />
                  <span>서민금융 안심 AI 도우미</span>
                </h4>

                <div className="space-y-3 overflow-y-auto pr-1 text-xs leading-relaxed flex-1 my-4 scrollbar-thin scrollbar-thumb-white/10 min-h-[220px] max-h-[460px]">
                  {chatMessages.map((msg, i) => (
                    <div 
                      key={i} 
                      className={`p-3 rounded-2xl max-w-[85%] font-medium leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-teal-600 text-white ml-auto text-left shadow-sm'
                          : 'bg-white/15 text-slate-100'
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))}
                </div>

                {/* 챗봇 인풋 */}
                <div className="flex gap-2 shrink-0 pt-2 border-t border-white/10">
                  <input 
                    type="text" 
                    placeholder="예: '금리', '한도', '구비서류' 질문"
                    value={chatbotInput}
                    onChange={(e) => setChatbotInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                    className="flex-1 bg-white/10 border border-white/15 focus:bg-white/15 px-3.5 py-2.5 rounded-xl text-xs text-white outline-none w-full"
                  />
                  <button
                    type="button"
                    onClick={handleChatSend}
                    className="bg-teal-500 hover:bg-teal-600 text-white font-bold px-3.5 py-2 rounded-xl text-xs transition-colors shrink-0 cursor-pointer animate-pulse"
                  >
                    전송
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
