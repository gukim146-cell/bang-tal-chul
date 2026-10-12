export interface ElementData {
  number: number;
  symbol: string;
  nameKo: string;
  nameEn: string;
  period: number;
  group: number;
  category: 'alkali' | 'alkaline-earth' | 'transition' | 'post-transition' | 'metalloid' | 'nonmetal' | 'halogen' | 'noble-gas' | 'lanthanide' | 'actinide';
  categoryKo: string;
  mass: string;
  electronConfig: string;
  valenceElectrons: number;
  commonOxidation: string;
  description: string;
}

export const PERIODIC_ELEMENTS: ElementData[] = [
  { number: 1, symbol: 'H', nameKo: '수소', nameEn: 'Hydrogen', period: 1, group: 1, category: 'nonmetal', categoryKo: '비금속', mass: '1.008', electronConfig: '1s¹', valenceElectrons: 1, commonOxidation: '+1, -1', description: '우주에서 가장 풍부한 원소, 1개의 양성자와 1개의 전자로 구성' },
  { number: 2, symbol: 'He', nameKo: '헬륨', nameEn: 'Helium', period: 1, group: 18, category: 'noble-gas', categoryKo: '비활성 기체', mass: '4.003', electronConfig: '1s²', valenceElectrons: 2, commonOxidation: '0', description: '매우 안정적인 비활성 기체, 공기보다 가벼움' },
  { number: 3, symbol: 'Li', nameKo: '리튬', nameEn: 'Lithium', period: 2, group: 1, category: 'alkali', categoryKo: '알칼리 금속', mass: '6.94', electronConfig: '[He] 2s¹', valenceElectrons: 1, commonOxidation: '+1', description: '가장 가벼운 금속 원소, 이차전지 배터리의 핵심' },
  { number: 4, symbol: 'Be', nameKo: '베릴륨', nameEn: 'Beryllium', period: 2, group: 2, category: 'alkaline-earth', categoryKo: '알칼리 토금속', mass: '9.012', electronConfig: '[He] 2s²', valenceElectrons: 2, commonOxidation: '+2', description: '에메랄드의 구성 원소, 가볍고 단단한 금속' },
  { number: 5, symbol: 'B', nameKo: '붕소', nameEn: 'Boron', period: 2, group: 13, category: 'metalloid', categoryKo: '준금속', mass: '10.81', electronConfig: '[He] 2s² 2p¹', valenceElectrons: 3, commonOxidation: '+3', description: '내열 유리 및 반도체 도핑에 사용' },
  { number: 6, symbol: 'C', nameKo: '탄소', nameEn: 'Carbon', period: 2, group: 14, category: 'nonmetal', categoryKo: '비금속', mass: '12.011', electronConfig: '[He] 2s² 2p²', valenceElectrons: 4, commonOxidation: '-4 ~ +4', description: '생명체와 유기화합물의 기본 뼈대, 다이아몬드와 흑연의 성분' },
  { number: 7, symbol: 'N', nameKo: '질소', nameEn: 'Nitrogen', period: 2, group: 15, category: 'nonmetal', categoryKo: '비금속', mass: '14.007', electronConfig: '[He] 2s² 2p³', valenceElectrons: 5, commonOxidation: '-3, +3, +5', description: '대기의 약 78%를 차지하는 삼중결합 기체' },
  { number: 8, symbol: 'O', nameKo: '산소', nameEn: 'Oxygen', period: 2, group: 16, category: 'nonmetal', categoryKo: '비금속', mass: '15.999', electronConfig: '[He] 2s² 2p⁴', valenceElectrons: 6, commonOxidation: '-2', description: '호흡과 연소에 필수적인 원소, 대기의 약 21%' },
  { number: 9, symbol: 'F', nameKo: '플루오린', nameEn: 'Fluorine', period: 2, group: 17, category: 'halogen', categoryKo: '할로젠', mass: '18.998', electronConfig: '[He] 2s² 2p⁵', valenceElectrons: 7, commonOxidation: '-1', description: '전기 음성도가 가장 큰(4.0) 반응성이 극히 큰 비금속' },
  { number: 10, symbol: 'Ne', nameKo: '네온', nameEn: 'Neon', period: 2, group: 18, category: 'noble-gas', categoryKo: '비활성 기체', mass: '20.180', electronConfig: '[He] 2s² 2p⁶', valenceElectrons: 8, commonOxidation: '0', description: '주황-붉은색 방전을 나타내는 비활성 기체' },
  { number: 11, symbol: 'Na', nameKo: '나트륨', nameEn: 'Sodium', period: 3, group: 1, category: 'alkali', categoryKo: '알칼리 금속', mass: '22.990', electronConfig: '[Ne] 3s¹', valenceElectrons: 1, commonOxidation: '+1', description: '물과 격렬히 반응하여 수소 발생, 노란 불꽃 반응' },
  { number: 12, symbol: 'Mg', nameKo: '마그네슘', nameEn: 'Magnesium', period: 3, group: 2, category: 'alkaline-earth', categoryKo: '알칼리 토금속', mass: '24.305', electronConfig: '[Ne] 3s²', valenceElectrons: 2, commonOxidation: '+2', description: '엽록소의 중심 금속 이온, 연소 시 강렬한 백색광 방출' },
  { number: 13, symbol: 'Al', nameKo: '알루미늄', nameEn: 'Aluminium', period: 3, group: 13, category: 'post-transition', categoryKo: '전이후 금속', mass: '26.982', electronConfig: '[Ne] 3s² 3p¹', valenceElectrons: 3, commonOxidation: '+3', description: '가볍고 내식성이 우수한 양쪽성 금속' },
  { number: 14, symbol: 'Si', nameKo: '규소', nameEn: 'Silicon', period: 3, group: 14, category: 'metalloid', categoryKo: '준금속', mass: '28.085', electronConfig: '[Ne] 3s² 3p²', valenceElectrons: 4, commonOxidation: '+4, -4', description: '지각에서 두 번째로 많은 원소, 현대 반도체 산업의 기반' },
  { number: 15, symbol: 'P', nameKo: '인', nameEn: 'Phosphorus', period: 3, group: 15, category: 'nonmetal', categoryKo: '비금속', mass: '30.974', electronConfig: '[Ne] 3s² 3p³', valenceElectrons: 5, commonOxidation: '-3, +3, +5', description: 'DNA/RNA 백본 및 ATP 분자의 핵심 구성 원소' },
  { number: 16, symbol: 'S', nameKo: '황', nameEn: 'Sulfur', period: 3, group: 16, category: 'nonmetal', categoryKo: '비금속', mass: '32.06', electronConfig: '[Ne] 3s² 3p⁴', valenceElectrons: 6, commonOxidation: '-2, +4, +6', description: '노란색 고체, 황산 제조 및 단백질 이황화 결합 형성' },
  { number: 17, symbol: 'Cl', nameKo: '염소', nameEn: 'Chlorine', period: 3, group: 17, category: 'halogen', categoryKo: '할로젠', mass: '35.45', electronConfig: '[Ne] 3s² 3p⁵', valenceElectrons: 7, commonOxidation: '-1, +1, +3, +5, +7', description: '자극성 냄새의 황록색 기체, 강력한 산화제 및 소독제' },
  { number: 18, symbol: 'Ar', nameKo: '아르곤', nameEn: 'Argon', period: 3, group: 18, category: 'noble-gas', categoryKo: '비활성 기체', mass: '39.948', electronConfig: '[Ne] 3s² 3p⁶', valenceElectrons: 8, commonOxidation: '0', description: '대기 중 세 번째로 많은 기체(약 0.93%), 비활성 보호 기체' },
  { number: 19, symbol: 'K', nameKo: '칼륨', nameEn: 'Potassium', period: 4, group: 1, category: 'alkali', categoryKo: '알칼리 금속', mass: '39.098', electronConfig: '[Ar] 4s¹', valenceElectrons: 1, commonOxidation: '+1', description: '보라색 불꽃 반응, 신경 전달과 세포 전위 유지 필수' },
  { number: 20, symbol: 'Ca', nameKo: '칼슘', nameEn: 'Calcium', period: 4, group: 2, category: 'alkaline-earth', categoryKo: '알칼리 토금속', mass: '40.078', electronConfig: '[Ar] 4s²', valenceElectrons: 2, commonOxidation: '+2', description: '주황-붉은색 불꽃 반응, 뼈와 치아 및 석회암(CaCO3)의 주성분' },
  { number: 21, symbol: 'Sc', nameKo: '스칸듐', nameEn: 'Scandium', period: 4, group: 3, category: 'transition', categoryKo: '전이 금속', mass: '44.956', electronConfig: '[Ar] 3d¹ 4s²', valenceElectrons: 3, commonOxidation: '+3', description: '가볍고 강한 알루미늄 합금 첨가제' },
  { number: 22, symbol: 'Ti', nameKo: '타이타늄', nameEn: 'Titanium', period: 4, group: 4, category: 'transition', categoryKo: '전이 금속', mass: '47.867', electronConfig: '[Ar] 3d² 4s²', valenceElectrons: 4, commonOxidation: '+4', description: '높은 강도 대 중량비와 뛰어난 내식성을 가진 금속' },
  { number: 23, symbol: 'V', nameKo: '바나듐', nameEn: 'Vanadium', period: 4, group: 5, category: 'transition', categoryKo: '전이 금속', mass: '50.942', electronConfig: '[Ar] 3d³ 4s²', valenceElectrons: 5, commonOxidation: '+2, +3, +4, +5', description: '산화수에 따라 화려한 색상 변화(+2 보라, +3 녹색, +4 청색, +5 황색)' },
  { number: 24, symbol: 'Cr', nameKo: '크로뮴', nameEn: 'Chromium', period: 4, group: 6, category: 'transition', categoryKo: '전이 금속', mass: '51.996', electronConfig: '[Ar] 3d⁵ 4s¹', valenceElectrons: 6, commonOxidation: '+3, +6', description: '스테인리스강의 녹 방지 피막 형성, 중크롬산 이온(+6)의 산화제' },
  { number: 25, symbol: 'Mn', nameKo: '망가니즈', nameEn: 'Manganese', period: 4, group: 7, category: 'transition', categoryKo: '전이 금속', mass: '54.938', electronConfig: '[Ar] 3d⁵ 4s²', valenceElectrons: 7, commonOxidation: '+2, +4, +7', description: '과망가니즈산 칼륨(KMnO4, +7 보라색) 등 다양한 산화수' },
  { number: 26, symbol: 'Fe', nameKo: '철', nameEn: 'Iron', period: 4, group: 8, category: 'transition', categoryKo: '전이 금속', mass: '55.845', electronConfig: '[Ar] 3d⁶ 4s²', valenceElectrons: 8, commonOxidation: '+2, +3', description: '헤모글로빈 중심 금속, 인류 문명 발전의 중추적 금속' },
  { number: 27, symbol: 'Co', nameKo: '코발트', nameEn: 'Cobalt', period: 4, group: 9, category: 'transition', categoryKo: '전이 금속', mass: '58.933', electronConfig: '[Ar] 3d⁷ 4s²', valenceElectrons: 9, commonOxidation: '+2, +3', description: '비타민 B12의 구성 성분, 푸른색 코발트 안료' },
  { number: 28, symbol: 'Ni', nameKo: '니켈', nameEn: 'Nickel', period: 4, group: 10, category: 'transition', categoryKo: '전이 금속', mass: '58.693', electronConfig: '[Ar] 3d⁸ 4s²', valenceElectrons: 10, commonOxidation: '+2', description: '내식성 합금, 동전 및 수소화 반응 촉매' },
  { number: 29, symbol: 'Cu', nameKo: '구리', nameEn: 'Copper', period: 4, group: 11, category: 'transition', categoryKo: '전이 금속', mass: '63.546', electronConfig: '[Ar] 3d¹⁰ 4s¹', valenceElectrons: 11, commonOxidation: '+1, +2', description: '청록색 불꽃 반응, 뛰어난 전기·열 전도성, Cu²⁺ 이온은 푸른색' },
  { number: 30, symbol: 'Zn', nameKo: '아연', nameEn: 'Zinc', period: 4, group: 12, category: 'transition', categoryKo: '전이 금속', mass: '65.38', electronConfig: '[Ar] 3d¹⁰ 4s²', valenceElectrons: 12, commonOxidation: '+2', description: '산과 반응해 수소 발생, 철의 부식을 막는 아연 도금(함석)' },
  { number: 35, symbol: 'Br', nameKo: '브로민', nameEn: 'Bromine', period: 4, group: 17, category: 'halogen', categoryKo: '할로젠', mass: '79.904', electronConfig: '[Ar] 3d¹⁰ 4s² 4p⁵', valenceElectrons: 7, commonOxidation: '-1', description: '상온에서 유일한 적갈색 액체 비금속 원소' },
  { number: 47, symbol: 'Ag', nameKo: '은', nameEn: 'Silver', period: 5, group: 11, category: 'transition', categoryKo: '전이 금속', mass: '107.87', electronConfig: '[Kr] 4d¹⁰ 5s¹', valenceElectrons: 11, commonOxidation: '+1', description: '모든 금속 중 가장 높은 전기 및 열 전도도, 은거울 반응' },
  { number: 53, symbol: 'I', nameKo: '아이오딘', nameEn: 'Iodine', period: 5, group: 17, category: 'halogen', categoryKo: '할로젠', mass: '126.90', electronConfig: '[Kr] 4d¹⁰ 5s² 5p⁵', valenceElectrons: 7, commonOxidation: '-1', description: '가열 시 바로 보라색 증기로 승화하는 흑자색 고체, 녹말 반응' },
  { number: 56, symbol: 'Ba', nameKo: '바륨', nameEn: 'Barium', period: 6, group: 2, category: 'alkaline-earth', categoryKo: '알칼리 토금속', mass: '137.33', electronConfig: '[Xe] 6s²', valenceElectrons: 2, commonOxidation: '+2', description: '황록색 불꽃 반응, BaSO4 흰색 앙금 형성' },
  { number: 79, symbol: 'Au', nameKo: '금', nameEn: 'Gold', period: 6, group: 11, category: 'transition', categoryKo: '전이 금속', mass: '196.97', electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s¹', valenceElectrons: 11, commonOxidation: '+1, +3', description: '반응성이 매우 작아 변색되지 않는 대표적인 귀금속, 왕수에 용해' },
  { number: 80, symbol: 'Hg', nameKo: '수은', nameEn: 'Mercury', period: 6, group: 12, category: 'transition', categoryKo: '전이 금속', mass: '200.59', electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s²', valenceElectrons: 12, commonOxidation: '+1, +2', description: '상온(25℃)에서 액체 상태로 존재하는 유일한 금속 원소' },
  { number: 82, symbol: 'Pb', nameKo: '납', nameEn: 'Lead', period: 6, group: 14, category: 'post-transition', categoryKo: '전이후 금속', mass: '207.2', electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²', valenceElectrons: 4, commonOxidation: '+2, +4', description: '무겁고 부드러운 금속, 방사선 차폐재로 활용' }
];

export interface ElementPuzzle {
  id: string;
  title: string;
  clue: string;
  hint: string;
  targetSymbol: string;
  targetAtomicNumber: number;
  explanation: string;
}

export const ELEMENT_PUZZLES: ElementPuzzle[] = [
  {
    id: 'elem-1',
    title: '미션 1: 생명의 기본 골격 원소',
    clue: '주기율표 2주기 14족 원소로, 최외각 전자가 4개이며 모든 유기물의 기본 골격을 형성하고 다이아몬드와 흑연의 주성분인 원소는?',
    hint: '원자번호 6번이며 기호는 C입니다.',
    targetSymbol: 'C',
    targetAtomicNumber: 6,
    explanation: '탄소(C, 원자번호 6)는 2주기 14족으로 4개의 공유결합을 형성할 수 있어 생체 분자의 기본 뼈대입니다.'
  },
  {
    id: 'elem-2',
    title: '미션 2: 상온의 유일한 액체 금속',
    clue: '주기율표 6주기 12족에 위치하며, 상온(25℃)에서 고체가 아닌 유일한 은백색 "액체 금속" 원소의 기호는?',
    hint: '원자번호 80번이며 온도계나 혈압계에 쓰였던 원소입니다.',
    targetSymbol: 'Hg',
    targetAtomicNumber: 80,
    explanation: '수은(Hg, 원자번호 80)은 상온에서 유일하게 액체 상태인 금속입니다.'
  },
  {
    id: 'elem-3',
    title: '미션 3: 3주기 할로젠 살균 원소',
    clue: '최외각(원자가) 전자가 7개인 3주기 17족 할로젠 원소로, 자극성 황록색 기체이며 수돗물 소독 및 표백제로 널리 쓰이는 원소의 원자번호는?',
    hint: '수소(H)와 결합하여 염산(HCl)을 만듭니다.',
    targetSymbol: 'Cl',
    targetAtomicNumber: 17,
    explanation: '염소(Cl, 원자번호 17)는 3주기 17족 할로젠 원소로 강한 산화력과 살균 작용을 합니다.'
  },
  {
    id: 'elem-4',
    title: '미션 4: 물과 격렬히 반응하는 3주기 알칼리 금속',
    clue: '3주기 1족에 속하며, 칼로 쉽게 잘릴 정도로 무르고 물과 격렬히 반응하여 수소 기체(H2)와 염기성 수용액을 만드는 원소는?',
    hint: '노란색 불꽃 반응을 나타내며 소금(NaCl)의 구성 원소입니다.',
    targetSymbol: 'Na',
    targetAtomicNumber: 11,
    explanation: '나트륨(Na, 원자번호 11)은 3주기 1족 알칼리 금속으로, 물과 접촉 시 2Na + 2H2O → 2NaOH + H2 반응을 일으킵니다.'
  }
];
