import React from 'react';
import { MinimalWhite } from './MinimalWhite';
import { DarkPremium } from './DarkPremium';
import { PastelSoft } from './PastelSoft';
import { BoldType } from './BoldType';
import { LuxuryEditorial } from './LuxuryEditorial';
import { SplitFrame } from './SplitFrame';
import { StreetBold } from './StreetBold';
import { KFashionGrad } from './KFashionGrad';
import { EditorialMag } from './EditorialMag';
import { MinimalistLux } from './MinimalistLux';
import { TemplateId } from '../store/editorStore';
import { TemplateProps } from './types';

export {
  MinimalWhite, DarkPremium, PastelSoft, BoldType,
  LuxuryEditorial, SplitFrame, StreetBold, KFashionGrad, EditorialMag, MinimalistLux,
};
export type { TemplateProps };

export const TEMPLATE_MAP: Record<TemplateId, React.FC<TemplateProps>> = {
  // 기본
  'minimal-white': MinimalWhite,
  'dark-premium': DarkPremium,
  'pastel-soft': PastelSoft,
  'bold-type': BoldType,
  // 패션 브랜드
  'luxury-editorial': LuxuryEditorial,
  'split-frame': SplitFrame,
  'street-bold': StreetBold,
  'kfashion-grad': KFashionGrad,
  'editorial-mag': EditorialMag,
  'minimalist-lux': MinimalistLux,
};

export const TEMPLATE_INFO: Record<TemplateId, { label: string; description: string; category?: string }> = {
  // 기본
  'minimal-white':     { label: '미니멀 화이트',   description: '깔끔하고 전문적' },
  'dark-premium':      { label: '다크 프리미엄',   description: '고급스러운 다크' },
  'pastel-soft':       { label: '파스텔 소프트',   description: '감성적인 그라데이션' },
  'bold-type':         { label: '볼드 타입',       description: '강렬한 컬러 배경' },
  // 패션
  'luxury-editorial':  { label: '럭셔리 에디토리얼', description: '명품 브랜드, Vogue 스타일', category: '패션' },
  'split-frame':       { label: '스플릿 프레임',    description: '좌우 분할, 구조적 레이아웃', category: '패션' },
  'street-bold':       { label: '스트리트 볼드',    description: '스트리트웨어, 하입 브랜드', category: '패션' },
  'kfashion-grad':     { label: 'K패션 그라디언트', description: '무신사·29CM 스타일', category: '패션' },
  'editorial-mag':     { label: '에디토리얼 매거진', description: '매거진 비대칭 레이아웃', category: '패션' },
  'minimalist-lux':    { label: '미니멀 럭스',      description: '극도의 여백, Toteme 스타일', category: '패션' },
};
