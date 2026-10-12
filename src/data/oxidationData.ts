export interface OxidationQuestion {
  id: string;
  title: string;
  formula: string;
  targetElement: string;
  targetElementNameKo: string;
  correctValue: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  clue: string;
}

export const OXIDATION_RULES = [
  {
    rule: '1. 홑원소 물질',
    desc: '홑원소 물질을 구성하는 원자의 산화수는 항상 0입니다.',
    examples: 'H₂ (H=0), O₂ (O=0), Fe (Fe=0), Na (Na=0)'
  },
  {
    rule: '2. 단순 이온',
    desc: '단원자 이온의 산화수는 그 이온의 전하수와 같습니다.',
    examples: 'Na⁺ (+1), Mg²⁺ (+2), Cl⁻ (-1), O²⁻ (-2)'
  },
  {
    rule: '3. 중성 화합물의 총합',
    desc: '중성 화합물을 이루는 모든 원자의 산화수 총합은 0입니다.',
    examples: 'H₂O: (+1)×2 + (-2) = 0'
  },
  {
    rule: '4. 다원자 이온의 총합',
    desc: '다원자 이온을 이루는 원자들의 산화수 합은 그 이온의 전하수와 같습니다.',
    examples: 'SO₄²⁻: S + (-2)×4 = -2 → S = +6'
  },
  {
    rule: '5. 주요 원소 우선순위',
    desc: 'F는 항상 -1, 1족 알칼리 금속은 +1, 2족 금속은 +2, Al은 +3입니다.',
    examples: 'NaCl (Na=+1, Cl=-1), MgCl₂ (Mg=+2, Cl=-1)'
  },
  {
    rule: '6. 수소(H)와 산소(O)',
    desc: 'H는 보통 +1 (단, 금속 수소화물 NaH에서는 -1), O는 보통 -2 (단, 과산화물 H₂O₂에서는 -1, OF₂에서는 +2).',
    examples: 'H₂O (H=+1, O=-2), H₂O₂ (O=-1), OF₂ (O=+2), NaH (H=-1)'
  }
];

export const OXIDATION_QUESTIONS: OxidationQuestion[] = [
  {
    id: 'ox-1',
    title: '보안 락 1: 과망가니즈산 칼륨 (KMnO₄)',
    formula: 'KMnO₄',
    targetElement: 'Mn',
    targetElementNameKo: '망가니즈(Mn)',
    correctValue: 7,
    difficulty: 'medium',
    clue: 'K는 1족 금속(+1), O는 보통 -2입니다. 전체 화합물의 합은 0입니다.',
    explanation: '(+1) + Mn + 4×(-2) = 0 → 1 + Mn - 8 = 0 → Mn = +7 입니다.'
  },
  {
    id: 'ox-2',
    title: '보안 락 2: 이크롬산 칼륨 (K₂Cr₂O₇)',
    formula: 'K₂Cr₂O₇',
    targetElement: 'Cr',
    targetElementNameKo: '크로뮴(Cr)',
    correctValue: 6,
    difficulty: 'hard',
    clue: 'K는 +1, O는 -2입니다. 2개의 Cr이 가지는 산화수를 구한 뒤 원자 1개당 산화수를 구하세요.',
    explanation: '2×(+1) + 2×Cr + 7×(-2) = 0 → +2 + 2Cr - 14 = 0 → 2Cr = +12 → Cr = +6 입니다.'
  },
  {
    id: 'ox-3',
    title: '보안 락 3: 과산화 수소 (H₂O₂)',
    formula: 'H₂O₂',
    targetElement: 'O',
    targetElementNameKo: '산소(O)',
    correctValue: -1,
    difficulty: 'medium',
    clue: '과산화물(Peroxide)에서 산소는 일반적인 -2가 아닌 예외 산화수를 갖습니다. H는 +1입니다.',
    explanation: '2×(+1) + 2×O = 0 → 2 + 2O = 0 → O = -1 입니다. 대표적인 과산화물 예외입니다.'
  },
  {
    id: 'ox-4',
    title: '보안 락 4: 질산 이온 (NO₃⁻)',
    formula: 'NO₃⁻',
    targetElement: 'N',
    targetElementNameKo: '질소(N)',
    correctValue: 5,
    difficulty: 'medium',
    clue: '다원자 이온의 산화수 총합은 이온의 전하(-1)와 같습니다. O는 -2입니다.',
    explanation: 'N + 3×(-2) = -1 → N - 6 = -1 → N = +5 입니다.'
  },
  {
    id: 'ox-5',
    title: '보안 락 5: 암모늄 이온 (NH₄⁺)',
    formula: 'NH₄⁺',
    targetElement: 'N',
    targetElementNameKo: '질소(N)',
    correctValue: -3,
    difficulty: 'easy',
    clue: '다원자 이온의 산화수 총합은 +1입니다. 수소 H는 +1입니다.',
    explanation: 'N + 4×(+1) = +1 → N + 4 = +1 → N = -3 입니다.'
  },
  {
    id: 'ox-6',
    title: '보안 락 6: 이플루오린화 산소 (OF₂)',
    formula: 'OF₂',
    targetElement: 'O',
    targetElementNameKo: '산소(O)',
    correctValue: 2,
    difficulty: 'hard',
    clue: '플루오린(F)은 전기 음성도가 4.0으로 전자를 가장 강하게 당기므로 항상 -1입니다.',
    explanation: 'O + 2×(-1) = 0 → O - 2 = 0 → O = +2 입니다. 산소가 양의 산화수를 갖는 희귀한 경우입니다.'
  },
  {
    id: 'ox-7',
    title: '보안 락 7: 황산 (H₂SO₄)',
    formula: 'H₂SO₄',
    targetElement: 'S',
    targetElementNameKo: '황(S)',
    correctValue: 6,
    difficulty: 'easy',
    clue: 'H는 +1, O는 -2입니다. 황산 분자의 산화수 합은 0입니다.',
    explanation: '2×(+1) + S + 4×(-2) = 0 → 2 + S - 8 = 0 → S = +6 입니다.'
  },
  {
    id: 'ox-8',
    title: '보안 락 8: 수소화 나트륨 (NaH)',
    formula: 'NaH',
    targetElement: 'H',
    targetElementNameKo: '수소(H)',
    correctValue: -1,
    difficulty: 'medium',
    clue: '1족 금속 Na는 무조건 +1입니다. 따라서 수소가 전자를 얻어 음이온 상태가 됩니다.',
    explanation: 'Na(+1) + H = 0 → H = -1 입니다. 금속 수소화물에서 수소의 예외 산화수입니다.'
  }
];
