export interface ChemicalReagent {
  id: string;
  name: string;
  formula: string;
  type: 'acid' | 'neutral' | 'base';
  ph: number;
  description: string;
  liquidColor: string; // Tailwind/CSS color
}

export interface Indicator {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  colorRanges: {
    acid: { color: string; label: string };
    neutral: { color: string; label: string };
    base: { color: string; label: string };
  };
}

export const REAGENTS: ChemicalReagent[] = [
  {
    id: 'hcl',
    name: '0.1M 묽은 염산',
    formula: 'HCl',
    type: 'acid',
    ph: 1.0,
    description: '대표적인 강산성 용액. 수소 이온(H⁺)을 다량 방출함.',
    liquidColor: 'rgba(255, 255, 255, 0.4)'
  },
  {
    id: 'ch3cooh',
    name: '식초 (아세트산)',
    formula: 'CH₃COOH',
    type: 'acid',
    ph: 3.0,
    description: '대표적인 약산성 용액. 자극적인 식초 냄새를 가짐.',
    liquidColor: 'rgba(255, 255, 230, 0.4)'
  },
  {
    id: 'water',
    name: '순수 증류수',
    formula: 'H₂O',
    type: 'neutral',
    ph: 7.0,
    description: '순수한 물. 수소 이온과 수산화 이온의 농도가 같은 중성.',
    liquidColor: 'rgba(220, 245, 255, 0.4)'
  },
  {
    id: 'nh3',
    name: '암모니아수',
    formula: 'NH₃(aq)',
    type: 'base',
    ph: 10.5,
    description: '대표적인 약염기성 용액. 특유의 찌르는 듯한 냄새.',
    liquidColor: 'rgba(240, 255, 250, 0.4)'
  },
  {
    id: 'naoh',
    name: '0.1M 수산화 나트륨',
    formula: 'NaOH',
    type: 'base',
    ph: 13.0,
    description: '대표적인 강염기성 용액. 단백질을 녹여 손에 닿으면 미끈거림.',
    liquidColor: 'rgba(245, 250, 255, 0.4)'
  }
];

export const INDICATORS: Indicator[] = [
  {
    id: 'phenolphthalein',
    name: '페놀프탈레인 용액',
    nameEn: 'Phenolphthalein',
    description: '산성과 중성에서는 무색, 염기성(pH 8.3 이상)에서만 선명한 붉은색(자홍색)으로 변함.',
    colorRanges: {
      acid: { color: 'rgba(255,255,255,0.2)', label: '무색 (투명)' },
      neutral: { color: 'rgba(255,255,255,0.2)', label: '무색 (투명)' },
      base: { color: 'rgba(244, 63, 94, 0.85)', label: '붉은색 (진한 분홍)' }
    }
  },
  {
    id: 'btb',
    name: 'BTB (브롬티몰 블루)',
    nameEn: 'Bromothymol Blue',
    description: '산성에서 노란색, 중성에서 초록색, 염기성에서 파란색으로 변하는 만능 지시약.',
    colorRanges: {
      acid: { color: 'rgba(234, 179, 8, 0.9)', label: '노란색' },
      neutral: { color: 'rgba(34, 197, 94, 0.9)', label: '초록색' },
      base: { color: 'rgba(37, 99, 235, 0.9)', label: '파란색' }
    }
  },
  {
    id: 'litmus_red',
    name: '붉은 리트머스 종이',
    nameEn: 'Red Litmus Paper',
    description: '산성과 중성에서는 붉은색 유지, 염기성 용액을 묻히면 푸른색으로 변함.',
    colorRanges: {
      acid: { color: 'rgba(239, 68, 68, 0.9)', label: '붉은색 유지' },
      neutral: { color: 'rgba(239, 68, 68, 0.9)', label: '붉은색 유지' },
      base: { color: 'rgba(59, 130, 246, 0.9)', label: '푸른색으로 변함' }
    }
  },
  {
    id: 'litmus_blue',
    name: '푸른 리트머스 종이',
    nameEn: 'Blue Litmus Paper',
    description: '염기성과 중성에서는 푸른색 유지, 산성 용액을 묻히면 붉은색으로 변함.',
    colorRanges: {
      acid: { color: 'rgba(239, 68, 68, 0.9)', label: '붉은색으로 변함' },
      neutral: { color: 'rgba(59, 130, 246, 0.9)', label: '푸른색 유지' },
      base: { color: 'rgba(59, 130, 246, 0.9)', label: '푸른색 유지' }
    }
  }
];

export interface SecretSpot {
  id: number;
  label: string;
  sampleName: string;
  sampleType: 'acid' | 'neutral' | 'base';
  ph: number;
  revealedSymbol: string; // The secret character revealed once tested properly
  hintClue: string;
}

export const SECRET_SPOTS: SecretSpot[] = [
  {
    id: 1,
    label: '시료 A (비커 1)',
    sampleName: '위액 성분 용액',
    sampleType: 'acid',
    ph: 1.5,
    revealedSymbol: 'A',
    hintClue: '푸른 리트머스를 붉게 만들고, BTB를 노랗게 물들입니다.'
  },
  {
    id: 2,
    label: '시료 B (비커 2)',
    sampleName: '비눗물 & 세정제',
    sampleType: 'base',
    ph: 12.0,
    revealedSymbol: 'C',
    hintClue: '페놀프탈레인을 선명한 붉은색으로 변색시키며, 단백질을 녹입니다.'
  },
  {
    id: 3,
    label: '시료 C (비커 3)',
    sampleName: '생리식염수 & 증류수',
    sampleType: 'neutral',
    ph: 7.0,
    revealedSymbol: 'I',
    hintClue: 'BTB를 떨어뜨렸을 때 초록색을 나타내며 전기적으로 중성입니다.'
  },
  {
    id: 4,
    label: '시료 D (비커 4)',
    sampleName: '배수구 세척액',
    sampleType: 'base',
    ph: 13.5,
    revealedSymbol: 'D',
    hintClue: '붉은 리트머스를 푸르게 바꾸고, 페놀프탈레인을 붉게 변화시킵니다.'
  }
];

/**
 * Returns color and text description when an indicator is added to a sample
 */
export function getIndicatorReaction(indicatorId: string, sampleType: 'acid' | 'neutral' | 'base') {
  const ind = INDICATORS.find(i => i.id === indicatorId);
  if (!ind) return { color: 'rgba(255,255,255,0.2)', label: '변화 없음' };
  return ind.colorRanges[sampleType];
}
