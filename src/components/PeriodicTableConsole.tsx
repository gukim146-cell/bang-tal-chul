import React, { useState } from 'react';
import { Search, CheckCircle2, AlertCircle, KeyRound, Sparkles, ArrowRight, HelpCircle, Info, X } from 'lucide-react';
import { PERIODIC_ELEMENTS, ELEMENT_PUZZLES, ElementData, ElementPuzzle } from '../data/periodicTable';
import { sound } from '../utils/sound';

interface PeriodicTableConsoleProps {
  isUnlocked: boolean;
  onUnlockToken: () => void;
  onOpenNotebook: () => void;
  onBackToOverview: () => void;
}

export const PeriodicTableConsole: React.FC<PeriodicTableConsoleProps> = ({
  isUnlocked,
  onUnlockToken,
  onOpenNotebook,
  onBackToOverview,
}) => {
  const [selectedElement, setSelectedElement] = useState<ElementData>(PERIODIC_ELEMENTS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [solvedPuzzleIds, setSolvedPuzzleIds] = useState<string[]>(
    isUnlocked ? ELEMENT_PUZZLES.map((p) => p.id) : []
  );
  const [answerInput, setAnswerInput] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);

  const currentPuzzle: ElementPuzzle = ELEMENT_PUZZLES[currentPuzzleIndex];

  // Category Color Map
  const categoryStyles: Record<string, { bg: string; text: string; border: string; nameKo: string }> = {
    alkali: { bg: 'bg-rose-500/15', text: 'text-rose-300', border: 'border-rose-500/40', nameKo: '알칼리 금속' },
    'alkaline-earth': { bg: 'bg-amber-500/15', text: 'text-amber-300', border: 'border-amber-500/40', nameKo: '알칼리 토금속' },
    transition: { bg: 'bg-blue-500/15', text: 'text-blue-300', border: 'border-blue-500/40', nameKo: '전이 금속' },
    'post-transition': { bg: 'bg-teal-500/15', text: 'text-teal-300', border: 'border-teal-500/40', nameKo: '전이후 금속' },
    metalloid: { bg: 'bg-emerald-500/15', text: 'text-emerald-300', border: 'border-emerald-500/40', nameKo: '준금속' },
    nonmetal: { bg: 'bg-sky-500/15', text: 'text-sky-300', border: 'border-sky-500/40', nameKo: '비금속' },
    halogen: { bg: 'bg-purple-500/15', text: 'text-purple-300', border: 'border-purple-500/40', nameKo: '할로젠' },
    'noble-gas': { bg: 'bg-indigo-500/15', text: 'text-indigo-300', border: 'border-indigo-500/40', nameKo: '비활성 기체' },
  };

  const handleSelectElement = (elem: ElementData) => {
    sound.playClick();
    setSelectedElement(elem);
    setShowDetailModal(true);
  };

  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = answerInput.trim().toUpperCase();

    // Check by symbol or atomic number or Korean name
    const isCorrect =
      clean === currentPuzzle.targetSymbol.toUpperCase() ||
      clean === String(currentPuzzle.targetAtomicNumber) ||
      clean === PERIODIC_ELEMENTS.find((el) => el.number === currentPuzzle.targetAtomicNumber)?.nameKo;

    if (isCorrect) {
      sound.playSuccess();
      const updatedSolved = Array.from(new Set([...solvedPuzzleIds, currentPuzzle.id]));
      setSolvedPuzzleIds(updatedSolved);
      setAnswerInput('');

      if (updatedSolved.length === ELEMENT_PUZZLES.length && !isUnlocked) {
        onUnlockToken();
      } else if (currentPuzzleIndex < ELEMENT_PUZZLES.length - 1) {
        setCurrentPuzzleIndex((prev) => prev + 1);
      }
    } else {
      sound.playError();
      alert(`정답이 아닙니다! 주기율표에서 "${currentPuzzle.hint}" 힌트를 찾아보세요.`);
    }
  };

  const handleQuickSubmitElement = (elem: ElementData) => {
    sound.playClick();
    if (elem.number === currentPuzzle.targetAtomicNumber) {
      sound.playSuccess();
      const updatedSolved = Array.from(new Set([...solvedPuzzleIds, currentPuzzle.id]));
      setSolvedPuzzleIds(updatedSolved);
      setAnswerInput('');
      setShowDetailModal(false);

      if (updatedSolved.length === ELEMENT_PUZZLES.length && !isUnlocked) {
        onUnlockToken();
      } else if (currentPuzzleIndex < ELEMENT_PUZZLES.length - 1) {
        setCurrentPuzzleIndex((prev) => prev + 1);
      }
    } else {
      sound.playError();
      alert(`원소 ${elem.nameKo}(${elem.symbol})은(는) 현재 미션의 정답이 아닙니다.`);
    }
  };

  // Filter elements
  const filteredElements = PERIODIC_ELEMENTS.filter((el) => {
    const matchesSearch =
      el.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      el.nameKo.includes(searchQuery) ||
      el.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(el.number) === searchQuery.trim();

    const matchesCategory = selectedCategory === 'all' || el.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const allSolved = solvedPuzzleIds.length === ELEMENT_PUZZLES.length;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Station Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">Chamber 02</span>
            <span>원소 분석기 & 주기율표 탐색기</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            화학 원소 데이터베이스 분석 & 미스터리 원소 해독
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            주기율표의 주기, 족, 원자가 전자 및 화학적 성질 단서를 분석하여 4개의 잠금 해제 원소를 식별하세요.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {allSolved || isUnlocked ? (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>원소 탐색 토큰 획득 완료</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-medium">
              <AlertCircle className="w-4 h-4" />
              <span>미션 진행: {solvedPuzzleIds.length} / {ELEMENT_PUZZLES.length} 완료</span>
            </div>
          )}
        </div>
      </div>

      {/* Mystery Element Mission Card */}
      <div className="bg-slate-900/95 border border-cyan-500/30 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              미션 {currentPuzzleIndex + 1} of {ELEMENT_PUZZLES.length}
            </span>
            <h3 className="text-base font-bold text-white">{currentPuzzle.title}</h3>
          </div>

          <div className="flex items-center gap-1.5">
            {ELEMENT_PUZZLES.map((p, idx) => {
              const isDone = solvedPuzzleIds.includes(p.id);
              const isCurrent = idx === currentPuzzleIndex;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    sound.playClick();
                    setCurrentPuzzleIndex(idx);
                  }}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-cyan-500 text-slate-950 shadow-md ring-2 ring-cyan-400/50'
                      : isDone
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Puzzle Clue */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
          <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
            "{currentPuzzle.clue}"
          </p>
          <div className="flex items-center gap-2 text-xs text-amber-400">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>힌트: {currentPuzzle.hint}</span>
          </div>
        </div>

        {/* Answer submission form */}
        <form onSubmit={handleSubmitAnswer} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:flex-1">
            <input
              type="text"
              value={answerInput}
              onChange={(e) => setAnswerInput(e.target.value)}
              placeholder="원소 기호(예: C), 원자번호(예: 6), 또는 한글명 입력"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 font-medium"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-md shrink-0"
          >
            정답 제출
          </button>
        </form>

        {/* If already solved, show explanation */}
        {solvedPuzzleIds.includes(currentPuzzle.id) && (
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{currentPuzzle.explanation}</span>
            </div>
            <span className="font-bold text-white font-mono bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
              정답: {currentPuzzle.targetSymbol} ({currentPuzzle.targetAtomicNumber})
            </span>
          </div>
        )}
      </div>

      {/* Periodic Table Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="원소 기호, 한글 이름, 원자번호 검색..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 text-[11px]">
          <button
            onClick={() => {
              sound.playClick();
              setSelectedCategory('all');
            }}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-slate-100 text-slate-900'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            전체 원소
          </button>
          {Object.entries(categoryStyles).map(([catKey, style]) => (
            <button
              key={catKey}
              onClick={() => {
                sound.playClick();
                setSelectedCategory(catKey);
              }}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors border ${
                selectedCategory === catKey
                  ? `${style.bg} ${style.text} ${style.border}`
                  : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
              }`}
            >
              {style.nameKo}
            </button>
          ))}
        </div>
      </div>

      {/* Periodic Table Grid View */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>원소를 클릭하면 상세 물성과 전자 배치를 확인하고, 바로 미션 정답으로 선택할 수 있습니다.</span>
          <span className="font-mono">{filteredElements.length}개 표시</span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-2">
          {filteredElements.map((elem) => {
            const style = categoryStyles[elem.category] || {
              bg: 'bg-slate-800/20',
              text: 'text-slate-300',
              border: 'border-slate-700',
              nameKo: elem.categoryKo,
            };

            const isCurrentTarget = elem.number === currentPuzzle.targetAtomicNumber;

            return (
              <button
                key={elem.number}
                onClick={() => handleSelectElement(elem)}
                className={`p-2.5 rounded-xl border text-left transition-all hover:scale-105 active:scale-95 flex flex-col justify-between aspect-square relative ${
                  style.bg
                } ${style.border} hover:shadow-lg`}
              >
                <div className="flex items-start justify-between w-full">
                  <span className="text-[10px] font-mono text-slate-400 font-bold">{elem.number}</span>
                  <span className="text-[9px] text-slate-400 font-mono hidden sm:inline">{elem.period}P</span>
                </div>

                <div className="text-center py-1">
                  <span className={`text-xl sm:text-2xl font-black ${style.text} block font-mono leading-none`}>
                    {elem.symbol}
                  </span>
                  <span className="text-[11px] font-medium text-slate-200 block truncate mt-0.5">
                    {elem.nameKo}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono w-full">
                  <span>{elem.group}족</span>
                  <span className="truncate">{elem.mass}</span>
                </div>

                {isCurrentTarget && solvedPuzzleIds.includes(currentPuzzle.id) && (
                  <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Element Detail Modal */}
      {showDetailModal && selectedElement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setShowDetailModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex flex-col items-center justify-center">
                <span className="text-[11px] font-mono text-cyan-400 font-bold">{selectedElement.number}</span>
                <span className="text-2xl font-black text-white font-mono leading-none">{selectedElement.symbol}</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>{selectedElement.nameKo}</span>
                  <span className="text-sm font-normal text-slate-400 font-mono">({selectedElement.nameEn})</span>
                </h3>
                <span className="text-xs font-medium text-cyan-400">{selectedElement.categoryKo}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950/70 p-4 rounded-xl border border-slate-800">
              <div>
                <span className="text-slate-400 block">주기 / 족:</span>
                <span className="font-semibold text-white font-mono">{selectedElement.period}주기 · {selectedElement.group}족</span>
              </div>
              <div>
                <span className="text-slate-400 block">원자가 전자 수:</span>
                <span className="font-semibold text-white font-mono">{selectedElement.valenceElectrons}개</span>
              </div>
              <div>
                <span className="text-slate-400 block">전자 배치:</span>
                <span className="font-semibold text-white font-mono">{selectedElement.electronConfig}</span>
              </div>
              <div>
                <span className="text-slate-400 block">대표 산화수:</span>
                <span className="font-semibold text-white font-mono">{selectedElement.commonOxidation}</span>
              </div>
              <div className="col-span-2 pt-1 border-t border-slate-800/80">
                <span className="text-slate-400 block">화학적 특징:</span>
                <p className="text-slate-200 mt-0.5 leading-relaxed">{selectedElement.description}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleQuickSubmitElement(selectedElement)}
                className="flex-1 py-2.5 px-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <span>현재 미션({currentPuzzleIndex + 1}) 정답으로 선택</span>
              </button>
              <button
                onClick={() => setShowDetailModal(false)}
                className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Completion Banner */}
      {allSolved && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/90 to-slate-900 border border-emerald-500/50 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-cyan-500 text-slate-950">
              <KeyRound className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <span>Chamber 02 클리어: 원소 분석 토큰 회수!</span>
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </h4>
              <p className="text-xs text-cyan-300/80">
                4개의 미스터리 원소(탄소, 수은, 염소, 나트륨)를 정확히 탐색하여 보안 프로토콜을 해제했습니다.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onBackToOverview();
            }}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
          >
            <span>다음 연구실 콘솔로 이동</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
