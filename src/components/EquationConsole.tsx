import React, { useState } from 'react';
import { Scale, CheckCircle2, AlertCircle, KeyRound, Sparkles, ArrowRight, RotateCcw, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';
import { EQUATIONS_DATABASE, calculateAtomCounts, EquationItem, EquationDifficulty } from '../data/equationsData';
import { sound } from '../utils/sound';

interface EquationConsoleProps {
  isUnlocked: boolean;
  onUnlockToken: () => void;
  onOpenNotebook: () => void;
  onBackToOverview: () => void;
}

export const EquationConsole: React.FC<EquationConsoleProps> = ({
  isUnlocked,
  onUnlockToken,
  onOpenNotebook,
  onBackToOverview,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<EquationDifficulty>('beginner');
  const [currentEquationIndex, setCurrentEquationIndex] = useState(0);

  // Filter equations by difficulty
  const equationsInMode = EQUATIONS_DATABASE.filter((eq) => eq.difficulty === selectedDifficulty);
  const currentEq: EquationItem = equationsInMode[currentEquationIndex] || equationsInMode[0];

  const totalSpecies = currentEq.reactants.length + currentEq.products.length;

  // Coefficients map by equation id
  const [coefficientsByEq, setCoefficientsByEq] = useState<Record<string, number[]>>({});
  const [solvedEquations, setSolvedEquations] = useState<string[]>(
    isUnlocked ? EQUATIONS_DATABASE.map((eq) => eq.id) : []
  );

  const currentCoeffs = coefficientsByEq[currentEq.id] || Array(totalSpecies).fill(1);

  // Calculate balance
  const balanceInfo = calculateAtomCounts(currentEq, currentCoeffs);

  // Handle coefficient increment/decrement
  const handleUpdateCoefficient = (speciesIndex: number, delta: number) => {
    sound.playTick();
    const updated = [...currentCoeffs];
    const newVal = Math.max(1, Math.min(20, (updated[speciesIndex] || 1) + delta));
    updated[speciesIndex] = newVal;

    setCoefficientsByEq((prev) => ({
      ...prev,
      [currentEq.id]: updated,
    }));

    // Check if balanced
    const newBalance = calculateAtomCounts(currentEq, updated);
    if (newBalance.isAllBalanced) {
      sound.playSuccess();
      if (!solvedEquations.includes(currentEq.id)) {
        const nextSolved = [...solvedEquations, currentEq.id];
        setSolvedEquations(nextSolved);

        // Unlock keycard if at least 3 equations are solved (or 1 in each mode)
        if (nextSolved.length >= 3 && !isUnlocked) {
          onUnlockToken();
        }
      }
    }
  };

  const handleResetCurrent = () => {
    sound.playClick();
    setCoefficientsByEq((prev) => ({
      ...prev,
      [currentEq.id]: Array(totalSpecies).fill(1),
    }));
  };

  const handleModeChange = (diff: EquationDifficulty) => {
    sound.playClick();
    setSelectedDifficulty(diff);
    setCurrentEquationIndex(0);
  };

  const isCurrentSolved = solvedEquations.includes(currentEq.id);
  const totalSolvedCount = solvedEquations.length;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Station Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">Chamber 03</span>
            <span>화학 반응식 밸런서 금고</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            질량 보존 & 원자 보존 법칙 기계식 금고 해제
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            반응물과 생성물의 원자 개수를 정확히 일치시켜 금고 기어를 회전시키세요. (난이도 모드별 도전 가능)
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isUnlocked || totalSolvedCount >= 3 ? (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>반응식 토큰 획득 완료</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-medium">
              <AlertCircle className="w-4 h-4" />
              <span>해제 진행: {totalSolvedCount} / 3개 반응식 맞춤</span>
            </div>
          )}
        </div>
      </div>

      {/* Difficulty Mode Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium mr-1">난이도 모드:</span>
          <button
            onClick={() => handleModeChange('beginner')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              selectedDifficulty === 'beginner'
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            초급 모드 (기초 반응)
          </button>
          <button
            onClick={() => handleModeChange('intermediate')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              selectedDifficulty === 'intermediate'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            중급 모드 (연소·치환)
          </button>
          <button
            onClick={() => handleModeChange('advanced')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              selectedDifficulty === 'advanced'
                ? 'bg-purple-500 text-white shadow'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            고급 모드 (복합 산화환원)
          </button>
        </div>

        {/* Mode Equation Index Navigation */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            disabled={currentEquationIndex <= 0}
            onClick={() => {
              sound.playClick();
              setCurrentEquationIndex((prev) => Math.max(0, prev - 1));
            }}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-slate-300">
            {currentEquationIndex + 1} / {equationsInMode.length}
          </span>
          <button
            disabled={currentEquationIndex >= equationsInMode.length - 1}
            onClick={() => {
              sound.playClick();
              setCurrentEquationIndex((prev) => Math.min(equationsInMode.length - 1, prev + 1));
            }}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-40"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Chemical Equation Balancer Workbench */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-7 space-y-7 shadow-2xl relative">
        {/* Equation Title & Hint */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white">{currentEq.title}</h3>
              {isCurrentSolved && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  계수 일치!
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{currentEq.description}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleResetCurrent}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              계수 초기화
            </button>
            <button
              onClick={onOpenNotebook}
              className="text-xs text-indigo-400 hover:underline flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              계수 맞추기 팁
            </button>
          </div>
        </div>

        {/* Interactive Equation Formula Display with Rotary Steppers */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-950/90 border border-slate-800 flex flex-wrap items-center justify-center gap-3 sm:gap-5 shadow-inner">
          {/* Reactants */}
          {currentEq.reactants.map((reactant, idx) => {
            const coeff = currentCoeffs[idx] || 1;
            return (
              <React.Fragment key={`react-${idx}`}>
                {idx > 0 && <span className="text-xl sm:text-2xl font-bold text-slate-500">+</span>}
                <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 transition-all">
                  {/* Stepper Dial */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleUpdateCoefficient(idx, -1)}
                      className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-9 text-center font-mono text-xl sm:text-2xl font-black text-amber-400">
                      {coeff}
                    </span>
                    <button
                      onClick={() => handleUpdateCoefficient(idx, 1)}
                      className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  {/* Chemical Formula */}
                  <div className="text-center">
                    <span className="text-lg sm:text-xl font-mono font-bold text-white tracking-wide">
                      {reactant.formula}
                    </span>
                    <span className="text-[10px] text-slate-400 block font-sans">{reactant.nameKo}</span>
                  </div>
                </div>
              </React.Fragment>
            );
          })}

          {/* Reaction Arrow */}
          <div className="flex flex-col items-center px-2">
            <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">→</span>
            <span className="text-[10px] text-slate-400">화학 반응</span>
          </div>

          {/* Products */}
          {currentEq.products.map((product, idx) => {
            const globalIdx = currentEq.reactants.length + idx;
            const coeff = currentCoeffs[globalIdx] || 1;
            return (
              <React.Fragment key={`prod-${idx}`}>
                {idx > 0 && <span className="text-xl sm:text-2xl font-bold text-slate-500">+</span>}
                <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 transition-all">
                  {/* Stepper Dial */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleUpdateCoefficient(globalIdx, -1)}
                      className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-9 text-center font-mono text-xl sm:text-2xl font-black text-cyan-400">
                      {coeff}
                    </span>
                    <button
                      onClick={() => handleUpdateCoefficient(globalIdx, 1)}
                      className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  {/* Chemical Formula */}
                  <div className="text-center">
                    <span className="text-lg sm:text-xl font-mono font-bold text-white tracking-wide">
                      {product.formula}
                    </span>
                    <span className="text-[10px] text-slate-400 block font-sans">{product.nameKo}</span>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* Real-time Atom Balance Inspector */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-amber-400" />
              <span>원자 보존 법칙 실시간 모니터링 (반응물 원자 수 vs 생성물 원자 수)</span>
            </h4>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded ${
              balanceInfo.isAllBalanced
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-slate-800 text-slate-400'
            }`}>
              {balanceInfo.isAllBalanced ? '모든 원자수 일치 (BALANCED)' : '원자 수 불일치 조정 필요'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {balanceInfo.balanceResults.map((res) => {
              const maxVal = Math.max(res.left, res.right, 1);
              return (
                <div
                  key={res.element}
                  className={`p-3.5 rounded-xl border text-xs space-y-2 transition-all ${
                    res.isBalanced
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-base text-white">{res.element}</span>
                      <span className="text-[11px] text-slate-400">원자</span>
                    </div>
                    {res.isBalanced ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        일치
                      </span>
                    ) : (
                      <span className="text-rose-400 font-medium text-[11px]">
                        차이: {Math.abs(res.left - res.right)}개
                      </span>
                    )}
                  </div>

                  {/* Comparative Bars */}
                  <div className="space-y-1 font-mono text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-amber-400">반응물: {res.left}개</span>
                      <span className="text-cyan-400">생성물: {res.right}개</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full flex overflow-hidden">
                      <div
                        className="bg-amber-400 h-full transition-all duration-300"
                        style={{ width: `${(res.left / (maxVal * 2)) * 100}%` }}
                      />
                      <div
                        className="bg-cyan-400 h-full transition-all duration-300 ml-auto"
                        style={{ width: `${(res.right / (maxVal * 2)) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Hint alert */}
          <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800/80 text-xs text-slate-400">
            <span className="text-amber-400 font-semibold mr-1">풀이 힌트:</span>
            {currentEq.hints[0]}
          </div>
        </div>
      </div>

      {/* Completion Banner */}
      {(isUnlocked || totalSolvedCount >= 3) && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/90 to-slate-900 border border-emerald-500/50 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-500 text-slate-950">
              <KeyRound className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <span>Chamber 03 클리어: 화학 반응식 토큰 회수!</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </h4>
              <p className="text-xs text-amber-300/80">
                화학 반응식의 계수를 맞춰 원자 보존 법칙을 증명하고 금고 잠금장치를 해제했습니다.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onBackToOverview();
            }}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
          >
            <span>다음 연구실 콘솔로 이동</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
