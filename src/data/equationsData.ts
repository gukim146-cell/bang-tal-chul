export type EquationDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface ChemicalSpecies {
  formula: string;
  nameKo: string;
  elements: Record<string, number>; // e.g. { C: 3, H: 8 }
}

export interface EquationItem {
  id: string;
  title: string;
  description: string;
  difficulty: EquationDifficulty;
  reactants: ChemicalSpecies[];
  products: ChemicalSpecies[];
  correctCoefficients: number[]; // e.g. [1, 5, 3, 4]
  hints: string[];
}

export const EQUATIONS_DATABASE: EquationItem[] = [
  // --- 초급 (Beginner) ---
  {
    id: 'eq-b1',
    title: '물의 생성 반응',
    description: '수소 기체와 산소 기체가 폭명음을 내며 반응하여 물을 생성합니다.',
    difficulty: 'beginner',
    reactants: [
      { formula: 'H₂', nameKo: '수소', elements: { H: 2 } },
      { formula: 'O₂', nameKo: '산소', elements: { O: 2 } }
    ],
    products: [
      { formula: 'H₂O', nameKo: '물', elements: { H: 2, O: 1 } }
    ],
    correctCoefficients: [2, 1, 2],
    hints: ['산소(O) 원자 수를 먼저 맞춘 후, 수소(H) 원자 수를 조정하세요.']
  },
  {
    id: 'eq-b2',
    title: '암모니아 합성 반응 (하버-보슈법)',
    description: '질소 기체와 수소 기체가 고온·고압에서 반응하여 암모니아를 합성합니다.',
    difficulty: 'beginner',
    reactants: [
      { formula: 'N₂', nameKo: '질소', elements: { N: 2 } },
      { formula: 'H₂', nameKo: '수소', elements: { H: 2 } }
    ],
    products: [
      { formula: 'NH₃', nameKo: '암모니아', elements: { N: 1, H: 3 } }
    ],
    correctCoefficients: [1, 3, 2],
    hints: ['질소 원자 N이 2개이므로 우변의 NH₃ 계수는 2가 됩니다. 그 후 수소 H 원자 수를 계산하세요.']
  },
  {
    id: 'eq-b3',
    title: '메테인의 완전 연소',
    description: '천연가스의 주성분 메테인이 산소와 반응하여 이산화 탄소와 수증기를 생성합니다.',
    difficulty: 'beginner',
    reactants: [
      { formula: 'CH₄', nameKo: '메테인', elements: { C: 1, H: 4 } },
      { formula: 'O₂', nameKo: '산소', elements: { O: 2 } }
    ],
    products: [
      { formula: 'CO₂', nameKo: '이산화 탄소', elements: { C: 1, O: 2 } },
      { formula: 'H₂O', nameKo: '물', elements: { H: 2, O: 1 } }
    ],
    correctCoefficients: [1, 2, 1, 2],
    hints: ['탄소(C) -> 수소(H) -> 마지막에 홀원소인 산소(O) 순서로 맞추세요.']
  },
  {
    id: 'eq-b4',
    title: '마그네슘의 연소 반응',
    description: '마그네슘 리본이 공기 중에서 강한 백색광을 방출하며 산화 마그네슘을 만듭니다.',
    difficulty: 'beginner',
    reactants: [
      { formula: 'Mg', nameKo: '마그네슘', elements: { Mg: 1 } },
      { formula: 'O₂', nameKo: '산소', elements: { O: 2 } }
    ],
    products: [
      { formula: 'MgO', nameKo: '산화 마그네슘', elements: { Mg: 1, O: 1 } }
    ],
    correctCoefficients: [2, 1, 2],
    hints: ['산소 원자 2개를 맞추기 위해 MgO 앞에 2를 두고, Mg를 맞추세요.']
  },

  // --- 중급 (Intermediate) ---
  {
    id: 'eq-m1',
    title: '프로페인 가스 완전 연소',
    description: 'LPG의 주성분인 프로페인(C3H8)이 연소되어 이산화 탄소와 물을 생성합니다.',
    difficulty: 'intermediate',
    reactants: [
      { formula: 'C₃H₈', nameKo: '프로페인', elements: { C: 3, H: 8 } },
      { formula: 'O₂', nameKo: '산소', elements: { O: 2 } }
    ],
    products: [
      { formula: 'CO₂', nameKo: '이산화 탄소', elements: { C: 1, O: 2 } },
      { formula: 'H₂O', nameKo: '물', elements: { H: 2, O: 1 } }
    ],
    correctCoefficients: [1, 5, 3, 4],
    hints: ['탄소 C가 3개이므로 CO2는 3, 수소 H가 8개이므로 H2O는 4, 산소 O는 총 (3*2 + 4*1) = 10개입니다.']
  },
  {
    id: 'eq-m2',
    title: '철의 녹 생성 (산화철 형성)',
    description: '철(Fe)이 공기 중의 산소와 반응하여 붉은 녹(Fe2O3)을 형성합니다.',
    difficulty: 'intermediate',
    reactants: [
      { formula: 'Fe', nameKo: '철', elements: { Fe: 1 } },
      { formula: 'O₂', nameKo: '산소', elements: { O: 2 } }
    ],
    products: [
      { formula: 'Fe₂O₃', nameKo: '산화 철(III)', elements: { Fe: 2, O: 3 } }
    ],
    correctCoefficients: [4, 3, 2],
    hints: ['산소의 최소공배수는 6입니다. 3O2 -> 2Fe2O3, 그리고 철 Fe는 4개가 됩니다.']
  },
  {
    id: 'eq-m3',
    title: '알루미늄과 염산의 반응',
    description: '알루미늄 금속이 묽은 염산과 격렬히 반응하여 염화 알루미늄과 수소 기체를 발생시킵니다.',
    difficulty: 'intermediate',
    reactants: [
      { formula: 'Al', nameKo: '알루미늄', elements: { Al: 1 } },
      { formula: 'HCl', nameKo: '염산', elements: { H: 1, Cl: 1 } }
    ],
    products: [
      { formula: 'AlCl₃', nameKo: '염화 알루미늄', elements: { Al: 1, Cl: 3 } },
      { formula: 'H₂', nameKo: '수소', elements: { H: 2 } }
    ],
    correctCoefficients: [2, 6, 2, 3],
    hints: ['Cl과 H의 개수를 맞추기 위해 HCl의 계수는 6이 됩니다.']
  },
  {
    id: 'eq-m4',
    title: '소석회와 염산의 중화 반응',
    description: '수산화 칼슘과 염산이 반응하여 염화 칼슘 염과 물이 생성됩니다.',
    difficulty: 'intermediate',
    reactants: [
      { formula: 'Ca(OH)₂', nameKo: '수산화 칼슘', elements: { Ca: 1, O: 2, H: 2 } },
      { formula: 'HCl', nameKo: '염산', elements: { H: 1, Cl: 1 } }
    ],
    products: [
      { formula: 'CaCl₂', nameKo: '염화 칼슘', elements: { Ca: 1, Cl: 2 } },
      { formula: 'H₂O', nameKo: '물', elements: { H: 2, O: 1 } }
    ],
    correctCoefficients: [1, 2, 1, 2],
    hints: ['Cl 원자 수가 2개이므로 HCl 앞에 2를 붙이고 생성되는 H2O 수를 맞추세요.']
  },

  // --- 고급 (Advanced) ---
  {
    id: 'eq-a1',
    title: '포도당의 세포 호흡 및 연소',
    description: '생명 활동의 핵심인 포도당이 산소와 반응하여 이산화 탄소와 물을 방출합니다.',
    difficulty: 'advanced',
    reactants: [
      { formula: 'C₆H₁₂O₆', nameKo: '포도당', elements: { C: 6, H: 12, O: 6 } },
      { formula: 'O₂', nameKo: '산소', elements: { O: 2 } }
    ],
    products: [
      { formula: 'CO₂', nameKo: '이산화 탄소', elements: { C: 1, O: 2 } },
      { formula: 'H₂O', nameKo: '물', elements: { H: 2, O: 1 } }
    ],
    correctCoefficients: [1, 6, 6, 6],
    hints: ['C6H12O6 계수를 1로 두고, C 6개 -> 6CO2, H 12개 -> 6H2O. 우변 O는 총 18개이므로 O2는 6이 됩니다.']
  },
  {
    id: 'eq-a2',
    title: '용광로 내 철의 제련 반응',
    description: '철광석(Fe2O3)이 일산화 탄소(CO)에 의해 순수한 철(Fe)로 환원됩니다.',
    difficulty: 'advanced',
    reactants: [
      { formula: 'Fe₂O₃', nameKo: '산화 철(III)', elements: { Fe: 2, O: 3 } },
      { formula: 'CO', nameKo: '일산화 탄소', elements: { C: 1, O: 1 } }
    ],
    products: [
      { formula: 'Fe', nameKo: '철', elements: { Fe: 1 } },
      { formula: 'CO₂', nameKo: '이산화 탄소', elements: { C: 1, O: 2 } }
    ],
    correctCoefficients: [1, 3, 2, 3],
    hints: ['Fe 원자 수 2개, 그리고 3개의 O를 뺏어 CO2로 만들기 위해 CO는 3개가 필요합니다.']
  },
  {
    id: 'eq-a3',
    title: '베이킹소다(탄산수소 나트륨)의 열분해',
    description: '탄산수소 나트륨이 가열되면 탄산 나트륨, 물, 이산화 탄소 기체로 분해됩니다.',
    difficulty: 'advanced',
    reactants: [
      { formula: 'NaHCO₃', nameKo: '탄산수소 나트륨', elements: { Na: 1, H: 1, C: 1, O: 3 } }
    ],
    products: [
      { formula: 'Na₂CO₃', nameKo: '탄산 나트륨', elements: { Na: 2, C: 1, O: 3 } },
      { formula: 'H₂O', nameKo: '물', elements: { H: 2, O: 1 } },
      { formula: 'CO₂', nameKo: '이산화 탄소', elements: { C: 1, O: 2 } }
    ],
    correctCoefficients: [2, 1, 1, 1],
    hints: ['생성물의 Na가 2개이므로 NaHCO3 앞에 2를 붙이면 모든 원자의 개수가 완벽히 일치합니다.']
  }
];

/**
 * Calculates total atoms on reactants and products side given current coefficients
 */
export function calculateAtomCounts(item: EquationItem, userCoefficients: number[]) {
  const reactantCounts: Record<string, number> = {};
  const productCounts: Record<string, number> = {};

  const numReactants = item.reactants.length;

  // Reactants
  item.reactants.forEach((species, index) => {
    const coeff = userCoefficients[index] || 1;
    for (const [elem, count] of Object.entries(species.elements)) {
      reactantCounts[elem] = (reactantCounts[elem] || 0) + count * coeff;
    }
  });

  // Products
  item.products.forEach((species, index) => {
    const coeff = userCoefficients[numReactants + index] || 1;
    for (const [elem, count] of Object.entries(species.elements)) {
      productCounts[elem] = (productCounts[elem] || 0) + count * coeff;
    }
  });

  // All unique elements
  const allElements = Array.from(new Set([...Object.keys(reactantCounts), ...Object.keys(productCounts)]));

  const balanceResults = allElements.map((elem) => {
    const left = reactantCounts[elem] || 0;
    const right = productCounts[elem] || 0;
    return {
      element: elem,
      left,
      right,
      isBalanced: left === right && left > 0
    };
  });

  const isAllBalanced = balanceResults.every((r) => r.isBalanced);

  return {
    reactantCounts,
    productCounts,
    balanceResults,
    isAllBalanced
  };
}
