import React from 'react';
import { Volume2, VolumeX, BookOpen, Clock, ShieldCheck, DoorOpen } from 'lucide-react';
import { sound } from '../utils/sound';

interface HeaderProps {
  elapsedSeconds: number;
  unlockedTokens: {
    acidBase: boolean;
    periodicTable: boolean;
    equation: boolean;
    oxidation: boolean;
  };
  onOpenNotebook: () => void;
  onOpenBlastDoor: () => void;
  activeView: string;
  onNavigateHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  elapsedSeconds,
  unlockedTokens,
  onOpenNotebook,
  onOpenBlastDoor,
  activeView,
  onNavigateHome,
}) => {
  const [isMuted, setIsMuted] = React.useState(sound.isMuted());

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playClick(800);
  };

  const unlockedCount = Object.values(unlockedTokens).filter(Boolean).length;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onNavigateHome();
            }}
            className="flex items-center gap-2.5 text-left group transition-opacity hover:opacity-90"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black tracking-wider text-sm shadow-inner">
              CH
            </div>
            <div>
              <span className="font-bold text-base sm:text-lg tracking-tight text-white block">
                화학 실험실 탈출
              </span>
              <span className="text-xs text-slate-400 hidden sm:block">
                ChemLab Escape Room
              </span>
            </div>
          </button>

          {activeView !== 'overview' && (
            <button
              onClick={() => {
                sound.playClick();
                onNavigateHome();
              }}
              className="ml-2 text-xs font-medium px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              ← 연구실 전경
            </button>
          )}
        </div>

        {/* Status Indicators & Timer */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Escape Progress */}
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-300 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 font-medium">보안 해제 토큰:</span>
            <div className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${unlockedTokens.acidBase ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50' : 'bg-slate-700'}`} title="산·염기 토큰" />
              <span className={`w-2.5 h-2.5 rounded-full ${unlockedTokens.periodicTable ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50' : 'bg-slate-700'}`} title="원소 탐색 토큰" />
              <span className={`w-2.5 h-2.5 rounded-full ${unlockedTokens.equation ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50' : 'bg-slate-700'}`} title="반응식 밸런서 토큰" />
              <span className={`w-2.5 h-2.5 rounded-full ${unlockedTokens.oxidation ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50' : 'bg-slate-700'}`} title="산화수 해독 토큰" />
            </div>
            <span className="font-bold text-emerald-400 ml-1">{unlockedCount}/4</span>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-amber-400 bg-amber-500/10 px-2.5 py-1.5 rounded-lg border border-amber-500/20">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTime(elapsedSeconds)}</span>
          </div>

          {/* Chemical Handbook Modal Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenNotebook();
            }}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-700/50 text-indigo-200 transition-colors"
            title="화학 연구 일지 / 공략 가이드"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">연구 일지</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title={isMuted ? '음소거 해제' : '음소거'}
            aria-label="Sound Toggle"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Master Blast Door Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenBlastDoor();
            }}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
              unlockedCount === 4
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/30 animate-pulse'
                : 'bg-rose-950/70 hover:bg-rose-900/80 border border-rose-800/50 text-rose-200'
            }`}
          >
            <DoorOpen className="w-4 h-4" />
            <span>{unlockedCount === 4 ? '비상 탈출문 개방!' : '방폭 탈출문'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
