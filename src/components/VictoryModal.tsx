import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, Clock, RotateCcw, CheckCircle2, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
import { sound } from '../utils/sound';

interface VictoryModalProps {
  isOpen: boolean;
  elapsedSeconds: number;
  onRestart: () => void;
  onOpenNotebook: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  elapsedSeconds,
  onRestart,
  onOpenNotebook,
}) => {
  useEffect(() => {
    if (isOpen) {
      sound.playSuccess();

      // Launch multi-burst celebration confetti
      const end = Date.now() + 2.5 * 1000;
      const colors = ['#10b981', '#06b6d4', '#f59e0b', '#a855f7'];

      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}분 ${s}초`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-emerald-500/50 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-center">
        {/* Glow circle */}
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/40 animate-bounce">
          <Award className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>화학 실험실 봉쇄 완전 해제!</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            실험실 탈출 성공!
          </h2>

          <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            모든 화학 미션을 침착하게 해결하고 방폭문을 개방하여 무사히 연구실을 탈출하셨습니다!
          </p>
        </div>

        {/* Stats card */}
        <div className="grid grid-cols-2 gap-3 p-4 bg-slate-950/80 rounded-2xl border border-slate-800 text-left">
          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 block flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> 탈출 소요 시간
            </span>
            <span className="text-lg sm:text-xl font-bold font-mono text-emerald-400">
              {formatTime(elapsedSeconds)}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 block flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 획득 타이틀
            </span>
            <span className="text-sm sm:text-base font-bold text-cyan-300">
              수석 화학 마스터 연구원
            </span>
          </div>
        </div>

        {/* Solved Missions Checklist */}
        <div className="space-y-2 text-left text-xs bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
          <span className="font-bold text-slate-300 block mb-1">완료한 화학 미션 목록:</span>
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>지시약 변색 암호(ACID) & pH 7.0 중화 적정 완료</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>주기율표 원소 탐색 (C, Hg, Cl, Na) 분석 완료</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>화학 반응식 원자 보존 법칙 계수 밸런싱 완료</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>KMnO₄, H₂O₂, OF₂ 등 중심 원자 산화수 계산 완료</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => {
              sound.playClick();
              onRestart();
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>처음부터 다시 도전</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenNotebook();
            }}
            className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-700 transition-colors"
          >
            연구 일지 복습
          </button>
        </div>
      </div>
    </div>
  );
};
