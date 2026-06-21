/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  limit: string;
  interestRate: string;
  repaymentPeriod: string;
  repaymentMethod: string;
  target: string[];
  limitations?: string[];
  features?: string[];
  steps?: { step: string; desc: string }[];
  suitability: string[];
  effect: string;
}

export interface Milestone {
  year: string;
  details: {
    date: string;
    text: string;
    emphasis?: boolean;
  }[];
}

export interface ConsultationForm {
  name: string;
  phone: string;
  birthDate: string;
  productType: string;
  incomeType: 'individual' | 'corporate' | 'youth' | 'vulnerable';
  hasActiveArrears: boolean;
  message: string;
  isAgreed: boolean;
  monthlyIncome: number;
}

export interface CaseStudy {
  id: string;
  category: string;
  title: string;
  problem: string;
  solution: string;
  effect: string;
  author: string;
  location: string;
}

export enum TabType {
  ABOUT = 'ABOUT',
  PRODUCTS = 'PRODUCTS',
  GUIDE = 'GUIDE',
  CASES = 'CASES',
  NOTICE = 'NOTICE'
}
