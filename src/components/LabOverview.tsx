import React from 'react';
import { Beaker, Search, Scale, ShieldAlert, KeyRound, ArrowRight, Lock, CheckCircle2, AlertTriangle, BookOpen } from 'lucide-react';
import { sound } from '../utils/sound';

interface LabOverviewProps {
  unlockedTokens: {
    acidBase: boolean;
    periodicTable: boolean;
    equation: boolean;
    oxidation: boolean;
  };
  onSelectStation: (stationId: 'acidBase' | 'periodicTable' | 'equation' | 'oxidation' | 'blastDoor') => void;
  onOpenNotebook: () => void;
}

export const LabOverview: React.FC<LabOverviewProps> = ({
  unlockedTokens,
  onSelectStation,
  onOpenNotebook,
}) => {
  const stations = [
    {
      id: 'acidBase' as const,
      title: '산·염기 지시약 실험대',
      subtitle: '지시약 색 변화와 중화반응 암호 해독',
      badge: 'Chamber 01',
      icon: Beaker,
      accent: 'emerald',
      isUnlocked: unlockedTokens.acidBase,
      description: '페놀프탈레인, BTB, 리트머스를 반응시켜 비밀 시료의 성질을 분석하고 중화 반응 밸브를 개방하세요.',
      imgSrc: '/src/assets/images/lab_acid_base_bench_1791763550278.jpg',
    },
    {
      id: 'periodicTable' as const,
      title: '원소 분석기 & 주기율표',
      subtitle: '주기율표 단서로 미스터리 원소 찾기',
      badge: 'Chamber 02',
      icon: Search,
      accent: 'cyan',
      isUnlocked: unlockedTokens.periodicTable,
      description: '족, 주기, 원자가 전자, 금속/비금속 특성 단서를 단말기에서 분석하여 잠금 해제 원자번호를 추출하세요.',
      imgSrc: '/src/assets/images/lab_room_interior_1791763538253.jpg',
    },
    {
      id: 'equation' as const,
      title: '화학 반응식 밸런서 금고',
      subtitle: '화학 반응식 계수 맞추기 (모드별 도전)',
      badge: 'Chamber 03',
      icon: Scale,
      accent: 'amber',
      isUnlocked: unlockedTokens.equation,
      description: '원자 보존 법칙에 따라 반응물과 생성물의 계수 다이얼을 맞춰 기계식 금고 기어를 회전시키세요.',
      imgSrc: '/src/assets/images/lab_chemical_vault_1791763573920.jpg',
    },
    {
      id: 'oxidation' as const,
      title: '산화수 보안 해독 터미널',
      subtitle: '화합물과 이온의 중심 원자 산화수 계산',
      badge: 'Chamber 04',
      icon: ShieldAlert,
      accent: 'purple',
      isUnlocked: unlockedTokens.oxidation,
      description: '산화수 결정 규칙을 적용하여 주요 화합물 및 다원자 이온 속 지정된 원자의 산화수를 입력해 방벽을 해제하세요.',
      imgSrc: '/src/assets/images/lab_chemical_vault_1791763573920.jpg',
    },
  ];

  const totalUnlocked = Object.values(unlockedTokens).filter(Boolean).length;

  return (
    <div className="min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Emergency Lockdown Cinematic Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="absolute inset-0">
          <img
            src="/src/assets/images/lab_room_interior_1791763538253.jpg"
            alt="화학 실험실 전경"
            className="w-full h-full object-cover opacity-35 filter brightness-75 contrast-125"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-900/40" />
        </div>

        <div className="relative z-10 p-6 sm:p-8 lg:p-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold tracking-wide uppercase">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>긴급 상황: 화학 실험실 봉쇄 경보 가동 중</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance leading-tight">
            화학 퍼즐을 풀고 비상 탈출 방폭문을 개방하라
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            실험실에 이상 화학물질 유출로 인해 방폭문이 차단되었습니다. 4개의 안전 통제 콘솔에서 화학 원리를 적용하여 보안 토큰을 회수해야 탈출할 수 있습니다!
          </p>

          {/* Quick Stats / Action Bar */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 px-4 py-2 rounded-xl">
              <span className="text-xs text-slate-400">보안 토큰 회수율</span>
              <span className="text-lg font-mono font-bold text-emerald-400">
                {totalUnlocked} / 4
              </span>
              <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden ml-2">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(totalUnlocked / 4) * 100}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onOpenNotebook();
              }}
              className="inline-flex items-center gap-2 text-xs font-medium px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>화학 개념 및 공식 일지 보기</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onSelectStation('blastDoor');
              }}
              className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl transition-all ${
                totalUnlocked === 4
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-rose-900/60 hover:bg-rose-800/70 border border-rose-700/50 text-rose-200'
              }`}
            >
              <KeyRound className="w-4 h-4" />
              <span>{totalUnlocked === 4 ? '최종 탈출문 잠금 해제!' : '방폭문 상태 확인'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Interactive Consoles Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            실험실 보안 콘솔 목록
          </h2>
          <span className="text-xs text-slate-400">
            원하는 콘솔을 클릭하여 화학 미션을 해결하세요
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {stations.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.id}
                onClick={() => {
                  sound.playClick();
                  onSelectStation(st.id);
                }}
                className={`group relative rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between ${
                  st.isUnlocked
                    ? 'bg-slate-900/90 border-emerald-500/40 hover:border-emerald-500 shadow-md shadow-emerald-950/20'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                {/* Background visual highlight */}
                <div className="h-32 w-full overflow-hidden relative">
                  <img
                    src={st.imgSrc}
                    alt={st.title}
                    className="w-full h-full object-cover filter brightness-70 group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-slate-300">
                      {st.badge}
                    </span>
                    {st.isUnlocked ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                        <CheckCircle2 className="w-3 h-3" />
                        토큰 획득 완료
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400">
                        <Lock className="w-3 h-3" />
                        미해결
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div className={`p-2 rounded-lg ${st.isUnlocked ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-300'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-emerald-400 transition-colors">
                        {st.title}
                      </h3>
                    </div>
                    <p className="text-xs text-emerald-400/90 font-medium mb-2">
                      {st.subtitle}
                    </p>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {st.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400">
                      {st.isUnlocked ? '다시 풀기 / 복습 가능' : '진입하여 문제 풀기'}
                    </span>
                    <span className={`inline-flex items-center gap-1 font-semibold ${st.isUnlocked ? 'text-emerald-400' : 'text-slate-200 group-hover:text-emerald-400'}`}>
                      <span>콘솔 접속</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Escape Blast Door Banner Footer */}
      <div
        onClick={() => {
          sound.playClick();
          onSelectStation('blastDoor');
        }}
        className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 cursor-pointer hover:border-slate-700 transition-all"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
            <KeyRound className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h4 className="font-bold text-white text-base">
              최종 비상 탈출 방폭문 (Master Blast Door BD-04)
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              4개의 화학 보안 토큰을 장착하여 에어로크 격리벽을 해제하고 무사히 연구실을 탈출하세요.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-slate-300">
            보안 레벨: {totalUnlocked}/4
          </span>
          <button className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            totalUnlocked === 4
              ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
          }`}>
            방폭문 열기
          </button>
        </div>
      </div>
    </div>
  );
};
