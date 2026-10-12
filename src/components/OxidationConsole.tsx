import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, AlertCircle, KeyRound, Sparkles, ArrowRight, HelpCircle, Delete, CornerDownLeft, BookOpen } from 'lucide-react';
import { OXIDATION_QUESTIONS, OXIDATION_RULES, OxidationQuestion } from '../data/oxidationData';
import { sound } from '../utils/sound';

interface OxidationConsoleProps {
  isUnlocked: boolean;
  onUnlockToken: () => void;
  onOpenNotebook: () => void;
  onBackToOverview: () => void;
}

export const OxidationConsole: React.FC<OxidationConsoleProps> = ({
  isUnlocked,
  onUnlockToken,
  onOpenNotebook,
  onBackToOverview,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [solvedIds, setSolvedIds] = useState<string[]>(
    isUnlocked ? OXIDATION_QUESTIONS.map((q) => q.id) : []
  );

  // Keypad input buffer
  const [sign, setSign] = useState<'+' | '-'>('+');
  const [numBuffer, setNumBuffer] = useState<string>('');
  const [showRulesDrawer, setShowRulesDrawer] = useState<boolean>(false);

  const currentQ: OxidationQuestion = OXIDATION_QUESTIONS[currentIndex];
  const isCurrentSolved = solvedIds.includes(currentQ.id);

  // Keypad actions
  const handleDigit = (d: string) => {
    sound.playClick(700);
    if (numBuffer.length >= 2) return;
    setNumBuffer((prev) => prev + d);
  };

  const handleToggleSign = () => {
    sound.playClick(600);
    setSign((prev) => (prev === '+' ? '-' : '+'));
  };

  const handleBackspace = () => {
    sound.playClick(500);
    setNumBuffer((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    sound.playClick(400);
    setNumBuffer('');
    setSign('+');
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!numBuffer) {
      alert('산화수를 입력해 주세요. (예: +7 또는 -1)');
      return;
    }

    const value = parseInt(numBuffer, 10) * (sign === '-' ? -1 : 1);

    if (value === currentQ.correctValue) {
      sound.playSuccess();
      const updatedSolved = Array.from(new Set([...solvedIds, currentQ.id]));
      setSolvedIds(updatedSolved);
      setNumBuffer('');

      // Unlock if at least 4 questions solved or all
      if (updatedSolved.length >= 4 && !isUnlocked) {
        onUnlockToken();
      } else if (currentIndex < OXIDATION_QUESTIONS.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      }
    } else {
      sound.playError();
      alert(`오답입니다! 입력값: ${sign}${numBuffer}, 힌트를 확인하고 다시 계산해 보세요.`);
    }
  };

  const totalSolved = solvedIds.length;
  const isTokenEarned = isUnlocked || totalSolved >= 4;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Station Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400">
            <span className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30">Chamber 04</span>
            <span>산화수 보안 해독 터미널</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            화합물 및 다원자 이온의 중심 원자 산화수 계산
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            화학식 내 지정된 원자의 산화수(+ 또는 - 부호 포함)를 계산하여 보안 코드를 입력하세요.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isTokenEarned ? (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>산화수 토큰 획득 완료</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-medium">
              <AlertCircle className="w-4 h-4" />
              <span>해제 진행: {totalSolved} / 4개 이상 풀이 필요</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Terminal Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Security Question & Breakdown */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-7 space-y-6 shadow-xl">
          {/* Question Selector Dots */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold text-purple-400">
              보안 락 {currentIndex + 1} of {OXIDATION_QUESTIONS.length}
            </span>

            <div className="flex items-center gap-1.5 flex-wrap">
              {OXIDATION_QUESTIONS.map((q, idx) => {
                const isDone = solvedIds.includes(q.id);
                const isCurr = idx === currentIndex;
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      sound.playClick();
                      setCurrentIndex(idx);
                      handleClear();
                    }}
                    className={`w-7 h-7 rounded-lg text-xs font-bold font-mono transition-all ${
                      isCurr
                        ? 'bg-purple-500 text-white shadow-md ring-2 ring-purple-400/50'
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

          {/* Chemical Formula Showcase Display */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center space-y-3 relative overflow-hidden shadow-inner">
            <div className="absolute top-3 left-3 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              분석 대상 화학종
            </div>

            <div className="text-4xl sm:text-5xl font-black font-mono tracking-wider text-purple-200">
              {currentQ.formula}
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-300">
              <span>구해야 할 원자:</span>
              <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-200 font-mono text-base">
                {currentQ.targetElementNameKo}
              </span>
            </div>
          </div>

          {/* Clue Card */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
                분석 단서 및 가이드
              </span>
              <button
                onClick={() => setShowRulesDrawer(!showRulesDrawer)}
                className="text-purple-400 hover:underline text-[11px]"
              >
                {showRulesDrawer ? '규칙 닫기' : '산화수 6대 규칙 보기'}
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{currentQ.clue}</p>
          </div>

          {/* If Solved, show full detailed solution */}
          {isCurrentSolved && (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-1.5 text-xs">
              <div className="flex items-center gap-2 font-bold text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>해제 완료! 상세 화학적 풀이:</span>
              </div>
              <p className="text-emerald-200 leading-relaxed font-mono">{currentQ.explanation}</p>
            </div>
          )}

          {/* Rules Drawer */}
          {showRulesDrawer && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-700 space-y-3 text-xs">
              <div className="flex items-center justify-between font-bold text-white">
                <span className="flex items-center gap-1.5 text-purple-300">
                  <BookOpen className="w-4 h-4" />
                  산화수 결정 6대 핵심 규칙
                </span>
                <button
                  onClick={() => setShowRulesDrawer(false)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {OXIDATION_RULES.map((rule, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="font-bold text-emerald-400 block">{rule.rule}</span>
                    <span className="text-slate-300 block text-[11px] mt-0.5">{rule.desc}</span>
                    <span className="text-slate-400 block text-[10px] font-mono mt-0.5">예시: {rule.examples}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Terminal Keypad & Input */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-purple-400" />
                <span>보안 코드 입력 패드</span>
              </h3>
              <span className="text-xs text-slate-400">부호 및 정수</span>
            </div>

            {/* Display screen */}
            <div className="p-4 rounded-xl bg-slate-950 border-2 border-purple-500/40 flex items-center justify-between font-mono shadow-inner">
              <span className="text-xs text-slate-500 uppercase">산화수 입력치:</span>
              <div className="flex items-center gap-1 text-3xl font-black text-white">
                <span className={sign === '+' ? 'text-emerald-400' : 'text-rose-400'}>
                  {sign}
                </span>
                <span>{numBuffer || '0'}</span>
              </div>
            </div>

            {/* Keypad Buttons */}
            <div className="grid grid-cols-3 gap-2.5">
              {/* Row 1 */}
              <button
                onClick={handleToggleSign}
                className="py-3 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-700/60 text-purple-200 font-bold text-base transition-colors"
                title="부호 전환 (+ / -)"
              >
                + / -
              </button>
              <button
                onClick={() => handleDigit('1')}
                className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono font-bold text-lg transition-colors"
              >
                1
              </button>
              <button
                onClick={() => handleDigit('2')}
                className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono font-bold text-lg transition-colors"
              >
                2
              </button>

              {/* Row 2 */}
              <button
                onClick={() => handleDigit('3')}
                className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono font-bold text-lg transition-colors"
              >
                3
              </button>
              <button
                onClick={() => handleDigit('4')}
                className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono font-bold text-lg transition-colors"
              >
                4
              </button>
              <button
                onClick={() => handleDigit('5')}
                className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono font-bold text-lg transition-colors"
              >
                5
              </button>

              {/* Row 3 */}
              <button
                onClick={() => handleDigit('6')}
                className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono font-bold text-lg transition-colors"
              >
                6
              </button>
              <button
                onClick={() => handleDigit('7')}
                className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono font-bold text-lg transition-colors"
              >
                7
              </button>
              <button
                onClick={() => handleDigit('8')}
                className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono font-bold text-lg transition-colors"
              >
                8
              </button>

              {/* Row 4 */}
              <button
                onClick={handleClear}
                className="py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-rose-300 font-bold text-sm transition-colors"
              >
                C
              </button>
              <button
                onClick={() => handleDigit('0')}
                className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono font-bold text-lg transition-colors"
              >
                0
              </button>
              <button
                onClick={handleBackspace}
                className="py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-bold text-sm transition-colors flex items-center justify-center"
              >
                <Delete className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={() => handleSubmit()}
            className="w-full py-3.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 mt-4"
          >
            <CornerDownLeft className="w-4 h-4" />
            <span>코드 입력 승인 (Enter)</span>
          </button>
        </div>
      </div>

      {/* Completion Banner */}
      {isTokenEarned && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/90 to-slate-900 border border-emerald-500/50 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-purple-500 text-slate-950">
              <KeyRound className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <span>Chamber 04 클리어: 산화수 해독 토큰 회수!</span>
                <Sparkles className="w-4 h-4 text-purple-400" />
              </h4>
              <p className="text-xs text-purple-300/80">
                KMnO₄, K₂Cr₂O₇, H₂O₂, OF₂ 등 복합 화합물의 산화수 보안 코드를 모두 해제했습니다.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onBackToOverview();
            }}
            className="px-5 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
          >
            <span>다음 연구실 콘솔로 이동</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
