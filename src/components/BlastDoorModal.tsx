import React, { useState } from 'react';
import { X, KeyRound, Lock, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';
import { sound } from '../utils/sound';

interface BlastDoorModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedTokens: {
    acidBase: boolean;
    periodicTable: boolean;
    equation: boolean;
    oxidation: boolean;
  };
  onNavigateStation: (stationId: 'acidBase' | 'periodicTable' | 'equation' | 'oxidation') => void;
  onTriggerEscape: () => void;
}

export const BlastDoorModal: React.FC<BlastDoorModalProps> = ({
  isOpen,
  onClose,
  unlockedTokens,
  onNavigateStation,
  onTriggerEscape,
}) => {
  const [isPullingLever, setIsPullingLever] = useState(false);

  if (!isOpen) return null;

  const totalTokens = Object.values(unlockedTokens).filter(Boolean).length;
  const isAllReady = totalTokens === 4;

  const handlePullLever = () => {
    if (!isAllReady || isPullingLever) return;
    setIsPullingLever(true);
    sound.playHeavyDoor();

    setTimeout(() => {
      onTriggerEscape();
      setIsPullingLever(false);
    }, 1200);
  };

  const tokenList = [
    {
      id: 'acidBase' as const,
      name: '토큰 1: 산·염기 암호 해독',
      desc: '지시약 스팟 플레이트 & pH 7.0 중화 적정',
      isUnlocked: unlockedTokens.acidBase,
      color: 'emerald',
    },
    {
      id: 'periodicTable' as const,
      name: '토큰 2: 주기율표 원소 분석',
      desc: '원자번호 & 족/주기 미스터리 원소 탐색',
      isUnlocked: unlockedTokens.periodicTable,
      color: 'cyan',
    },
    {
      id: 'equation' as const,
      name: '토큰 3: 화학 반응식 밸런서',
      desc: '원자 보존 법칙 질량 균형 계수 일치',
      isUnlocked: unlockedTokens.equation,
      color: 'amber',
    },
    {
      id: 'oxidation' as const,
      name: '토큰 4: 산화수 보안 코드',
      desc: 'KMnO₄, H₂O₂ 등 중심 원자 산화수 계산',
      isUnlocked: unlockedTokens.oxidation,
      color: 'purple',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-slate-950/70 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Door Header Graphic */}
        <div className="relative h-48 w-full overflow-hidden shrink-0">
          <img
            src="/src/assets/images/lab_blast_door_1791763561138.jpg"
            alt="비상 방폭문"
            className="w-full h-full object-cover filter brightness-80 contrast-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[11px] font-bold mb-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>격리 에어로크 봉쇄 장치 (BD-04)</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                중앙 비상 탈출 방폭문
              </h3>
            </div>

            <div className="bg-slate-950/90 border border-slate-800 px-3 py-1.5 rounded-xl font-mono text-xs">
              <span className="text-slate-400">장착 토큰: </span>
              <span className="font-bold text-emerald-400 text-sm">{totalTokens} / 4</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
          <p className="text-xs sm:text-sm text-slate-300">
            방폭문 개폐 콘솔은 4중 화학 안전 프로토콜로 잠겨 있습니다. 각 실험실 콘솔에서 획득한 화학 보안 토큰을 장착해야 최종 탈출 레버를 작동시킬 수 있습니다.
          </p>

          {/* 4 Token Slots */}
          <div className="space-y-2.5">
            {tokenList.map((tok) => (
              <div
                key={tok.id}
                className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition-all ${
                  tok.isUnlocked
                    ? 'bg-slate-950/80 border-emerald-500/40'
                    : 'bg-slate-950/40 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      tok.isUnlocked
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {tok.isUnlocked ? <CheckCircle2 className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">{tok.name}</h4>
                    <p className="text-[11px] text-slate-400">{tok.desc}</p>
                  </div>
                </div>

                {tok.isUnlocked ? (
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30 shrink-0">
                    장착 완료
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      sound.playClick();
                      onClose();
                      onNavigateStation(tok.id);
                    }}
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors flex items-center gap-1 shrink-0"
                  >
                    <span>풀러 가기</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Lever / Escape Trigger */}
          <div className="pt-2">
            {isAllReady ? (
              <button
                onClick={handlePullLever}
                disabled={isPullingLever}
                className={`w-full py-4 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2 shadow-2xl ${
                  isPullingLever
                    ? 'bg-emerald-600 text-white animate-pulse'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-emerald-500/30'
                }`}
              >
                <KeyRound className="w-5 h-5" />
                <span>{isPullingLever ? '방폭문 잠금장치 해제 중...' : '비상 탈출 레버 당기기 (방폭문 개방)'}</span>
              </button>
            ) : (
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
                <span className="text-xs text-amber-400 font-medium">
                  아직 해제되지 않은 보안 토큰이 {4 - totalTokens}개 있습니다. 모든 콘솔의 화학 문제를 풀어주세요.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
