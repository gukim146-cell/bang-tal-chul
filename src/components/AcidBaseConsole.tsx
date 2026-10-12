import React, { useState } from 'react';
import { Beaker, Droplets, CheckCircle2, AlertCircle, KeyRound, Sparkles, RefreshCw, HelpCircle, ArrowRight } from 'lucide-react';
import { INDICATORS, SECRET_SPOTS, getIndicatorReaction, Indicator } from '../data/acidBaseData';
import { sound } from '../utils/sound';

interface AcidBaseConsoleProps {
  isUnlocked: boolean;
  onUnlockToken: () => void;
  onOpenNotebook: () => void;
  onBackToOverview: () => void;
}

export const AcidBaseConsole: React.FC<AcidBaseConsoleProps> = ({
  isUnlocked,
  onUnlockToken,
  onOpenNotebook,
  onBackToOverview,
}) => {
  // Mission 1: Spot Plate Indicator State
  const [selectedIndicator, setSelectedIndicator] = useState<Indicator>(INDICATORS[0]);
  const [vialResults, setVialResults] = useState<Record<number, { indicatorName: string; color: string; label: string; testedType: 'acid' | 'neutral' | 'base' }>>({});
  const [cipherInput, setCipherInput] = useState<string>('');
  const [cipherSolved, setCipherSolved] = useState<boolean>(isUnlocked);

  // Mission 2: Neutralization State
  // Target is pH 7.0 (range 6.5 - 7.5). Starts at pH 1.0 (acidic)
  const [currentPh, setCurrentPh] = useState<number>(1.0);
  const [titrationDropsAdded, setTitrationDropsAdded] = useState<number>(0);
  const [neutralizationSolved, setNeutralizationSolved] = useState<boolean>(isUnlocked);

  // Active sub-tab
  const [activeTab, setActiveTab] = useState<'spot' | 'neutralize'>('spot');

  // Test a vial
  const handleTestVial = (vialId: number) => {
    sound.playDroplet();
    const spot = SECRET_SPOTS.find((s) => s.id === vialId);
    if (!spot) return;

    const reaction = getIndicatorReaction(selectedIndicator.id, spot.sampleType);
    setVialResults((prev) => ({
      ...prev,
      [vialId]: {
        indicatorName: selectedIndicator.name,
        color: reaction.color,
        label: reaction.label,
        testedType: spot.sampleType,
      },
    }));
  };

  // Submit Cipher
  const handleCheckCipher = (e: React.FormEvent) => {
    e.preventDefault();
    if (cipherInput.trim().toUpperCase() === 'ACID') {
      sound.playSuccess();
      setCipherSolved(true);
      if (neutralizationSolved && !isUnlocked) {
        onUnlockToken();
      }
    } else {
      sound.playError();
      alert('암호가 올바르지 않습니다. 시료 4개의 비밀 문자를 조합해 보세요! (힌트: ACID)');
    }
  };

  // Neutralization Titration
  // Starting at pH 1.0. Each drop of 0.1M NaOH adds base.
  // 6 drops = pH 7.0! If >6 drops, pH increases to 12.0 (overshot).
  // Player can also add acid drops (0.1M HCl) to fix overshot.
  const handleAddBaseDrop = () => {
    sound.playDroplet();
    const newDrops = titrationDropsAdded + 1;
    setTitrationDropsAdded(newDrops);

    let nextPh = 1.0;
    if (newDrops === 1) nextPh = 1.5;
    else if (newDrops === 2) nextPh = 2.2;
    else if (newDrops === 3) nextPh = 3.5;
    else if (newDrops === 4) nextPh = 5.0;
    else if (newDrops === 5) nextPh = 6.0;
    else if (newDrops === 6) nextPh = 7.0; // Perfect neutral!
    else if (newDrops === 7) nextPh = 8.8;
    else if (newDrops === 8) nextPh = 10.5;
    else nextPh = 12.5;

    setCurrentPh(nextPh);

    if (nextPh >= 6.5 && nextPh <= 7.5) {
      sound.playSuccess();
      setNeutralizationSolved(true);
      if (cipherSolved && !isUnlocked) {
        onUnlockToken();
      }
    } else {
      setNeutralizationSolved(false);
    }
  };

  const handleAddAcidDrop = () => {
    sound.playDroplet();
    if (titrationDropsAdded <= 0) return;
    const newDrops = titrationDropsAdded - 1;
    setTitrationDropsAdded(newDrops);

    let nextPh = 1.0;
    if (newDrops === 1) nextPh = 1.5;
    else if (newDrops === 2) nextPh = 2.2;
    else if (newDrops === 3) nextPh = 3.5;
    else if (newDrops === 4) nextPh = 5.0;
    else if (newDrops === 5) nextPh = 6.0;
    else if (newDrops === 6) nextPh = 7.0;
    else if (newDrops === 7) nextPh = 8.8;
    else if (newDrops === 8) nextPh = 10.5;
    else nextPh = 12.5;

    setCurrentPh(nextPh);

    if (nextPh >= 6.5 && nextPh <= 7.5) {
      sound.playSuccess();
      setNeutralizationSolved(true);
      if (cipherSolved && !isUnlocked) {
        onUnlockToken();
      }
    } else {
      setNeutralizationSolved(false);
    }
  };

  const handleResetTitration = () => {
    sound.playClick();
    setTitrationDropsAdded(0);
    setCurrentPh(1.0);
    setNeutralizationSolved(false);
  };

  // Calculate beaker BTB color based on current pH
  const getBtbColor = (ph: number) => {
    if (ph < 6.0) return 'rgba(234, 179, 8, 0.85)'; // Yellow (Acid)
    if (ph <= 7.6) return 'rgba(34, 197, 94, 0.9)'; // Green (Neutral)
    return 'rgba(37, 99, 235, 0.9)'; // Blue (Base)
  };

  const allMissionsSolved = cipherSolved && neutralizationSolved;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Station Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">Chamber 01</span>
            <span>산·염기 지시약 실험대</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            지시약 반응 분석 & 중화 적정 프로토콜
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            미션 1에서 지시약 색 변화로 비밀 암호 4자리를 풀고, 미션 2에서 유출된 산성 용액을 pH 7.0으로 중화시켜 토큰을 획득하세요.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {allMissionsSolved || isUnlocked ? (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>산·염기 보안 토큰 획득 완료</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-medium">
              <AlertCircle className="w-4 h-4" />
              <span>진행 중: 2개 미션 완료 필요</span>
            </div>
          )}
        </div>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('spot');
          }}
          className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors ${
            activeTab === 'spot'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-850'
          }`}
        >
          <Beaker className="w-4 h-4" />
          <span>미션 1: 스팟 플레이트 지시약 암호</span>
          {cipherSolved && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('neutralize');
          }}
          className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors ${
            activeTab === 'neutralize'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-850'
          }`}
        >
          <Droplets className="w-4 h-4" />
          <span>미션 2: 산성 폐수 중화 적정</span>
          {neutralizationSolved && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
        </button>
      </div>

      {/* Tab 1: Spot Plate & Secret Message */}
      {activeTab === 'spot' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Indicator Selection Shelf */}
          <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Beaker className="w-4 h-4 text-emerald-400" />
                <span>지시약 스포이트 선택</span>
              </h3>
              <button
                onClick={onOpenNotebook}
                className="text-xs text-indigo-400 hover:underline flex items-center gap-1"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                지시약 색표
              </button>
            </div>

            <p className="text-xs text-slate-400">
              사용할 지시약을 선택한 뒤, 우측의 시료 1~4 시험관에 떨어뜨려 반응을 관찰하세요.
            </p>

            <div className="space-y-2">
              {INDICATORS.map((ind) => {
                const isSelected = selectedIndicator.id === ind.id;
                return (
                  <button
                    key={ind.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedIndicator(ind);
                    }}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                      isSelected
                        ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-sm'
                        : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-semibold text-emerald-300 mb-1">{ind.name}</div>
                    <div className="text-slate-400 text-xs leading-relaxed">{ind.description}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Spot Plate & Test Vials */}
          <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">비밀 시료 스팟 플레이트</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  각 시료의 성질(산성, 중성, 염기성)을 밝히면 암호 문자가 드러납니다.
                </p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                선택된 지시약: {selectedIndicator.name}
              </span>
            </div>

            {/* 4 Test Tubes Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {SECRET_SPOTS.map((spot) => {
                const result = vialResults[spot.id];
                const isTested = !!result;

                return (
                  <div
                    key={spot.id}
                    className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col items-center text-center space-y-3 relative overflow-hidden group"
                  >
                    <span className="text-xs font-semibold text-slate-400">{spot.label}</span>

                    {/* Test Tube Graphic */}
                    <div className="w-12 h-28 border-2 border-slate-600 rounded-b-full rounded-t-sm relative bg-slate-900/60 flex flex-col justify-end p-1 overflow-hidden shadow-inner">
                      {/* Fluid inside */}
                      <div
                        className="w-full rounded-b-full transition-all duration-700"
                        style={{
                          height: '75%',
                          backgroundColor: isTested ? result.color : 'rgba(255, 255, 255, 0.1)',
                          boxShadow: isTested ? `0 0 16px ${result.color}` : 'none',
                        }}
                      />

                      {/* Revealed Letter Bubble if tested */}
                      {isTested && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] animate-bounce">
                            {spot.revealedSymbol}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Test Button */}
                    <button
                      onClick={() => handleTestVial(spot.id)}
                      className="w-full py-1.5 px-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors shadow-sm"
                    >
                      지시약 반응
                    </button>

                    {/* Result info */}
                    <div className="min-h-10 text-xs">
                      {isTested ? (
                        <div className="space-y-0.5">
                          <span className="text-emerald-300 font-semibold block">{result.label}</span>
                          <span className="text-slate-400 block text-[11px]">
                            {spot.sampleType === 'acid' ? '산성 용액' : spot.sampleType === 'base' ? '염기성 용액' : '중성 용액'}
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-[11px]">미반응 시료</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cipher Input Box */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-emerald-400" />
                    <span>추출된 비밀 4자리 단어 입력</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    시료 1~4번 시험관에 드러난 알파벳 4글자를 조합하여 입력하세요. (대소문자 무관)
                  </p>
                </div>
                {cipherSolved && (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    암호 해독 완료!
                  </span>
                )}
              </div>

              <form onSubmit={handleCheckCipher} className="flex gap-3">
                <input
                  type="text"
                  maxLength={6}
                  value={cipherInput}
                  onChange={(e) => setCipherInput(e.target.value.toUpperCase())}
                  placeholder="예: ACID"
                  disabled={cipherSolved}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white placeholder-slate-400 uppercase tracking-widest font-mono font-bold focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  disabled={cipherSolved}
                  className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 text-xs font-bold rounded-lg transition-colors"
                >
                  암호 승인
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Neutralization Titration */}
      {activeTab === 'neutralize' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 lg:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                긴급 중화 적정: 비상 배출 밸브 개방
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                유출된 강산 용액(BTB 노란색, pH 1.0)에 염기(0.1M NaOH)를 스포이트로 투입하여 <strong>BTB 초록색(pH 7.0 중성)</strong>을 만드세요!
              </p>
            </div>

            <button
              onClick={handleResetTitration}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium self-start sm:self-auto transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>적정 초기화</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Visual Beaker Simulator */}
            <div className="md:col-span-6 flex flex-col items-center justify-center p-6 bg-slate-950/70 rounded-2xl border border-slate-800 space-y-4">
              <div className="relative w-48 h-60 border-4 border-slate-600 border-t-0 rounded-b-3xl bg-slate-900/40 p-2 flex flex-col justify-end shadow-2xl overflow-hidden">
                {/* Volume markings */}
                <div className="absolute left-2 top-8 text-[10px] font-mono text-slate-400">100mL</div>
                <div className="absolute left-2 top-20 text-[10px] font-mono text-slate-400">75mL</div>
                <div className="absolute left-2 top-32 text-[10px] font-mono text-slate-400">50mL</div>
                <div className="absolute left-2 top-44 text-[10px] font-mono text-slate-400">25mL</div>

                {/* Liquid in Beaker */}
                <div
                  className="w-full rounded-b-2xl transition-all duration-500 relative"
                  style={{
                    height: `${45 + titrationDropsAdded * 4}%`,
                    backgroundColor: getBtbColor(currentPh),
                    boxShadow: `0 0 30px ${getBtbColor(currentPh)}`,
                  }}
                >
                  {/* Surface Ripple */}
                  <div className="w-full h-2 bg-white/20 rounded-full animate-pulse" />
                </div>
              </div>

              {/* Status readout */}
              <div className="text-center space-y-1">
                <div className="text-xs font-medium text-slate-400">BTB 지시약 색상 판정</div>
                <div className="text-sm font-bold text-white flex items-center justify-center gap-2">
                  <span
                    className="w-3.5 h-3.5 rounded-full inline-block"
                    style={{ backgroundColor: getBtbColor(currentPh) }}
                  />
                  <span>
                    {currentPh < 6.0
                      ? '노란색 (산성 - H⁺ 과다)'
                      : currentPh <= 7.6
                      ? '선명한 초록색 (완전 중성! pH 7.0)'
                      : '파란색 (염기성 - OH⁻ 과다 오버슈트)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Digital pH Meter & Control Panel */}
            <div className="md:col-span-6 space-y-5">
              {/* Digital pH Gauge */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">디지털 pH 계측 센서</span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded ${
                    neutralizationSolved ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-amber-300'
                  }`}>
                    {neutralizationSolved ? '중화 완료 (STABLE)' : '중화 대기 중'}
                  </span>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white">
                    pH {currentPh.toFixed(1)}
                  </span>
                  <span className="text-xs text-slate-400">
                    목표치: pH 7.0 (중성)
                  </span>
                </div>

                {/* pH Scale Bar */}
                <div className="space-y-1 pt-1">
                  <div className="h-3 w-full rounded-full bg-gradient-to-r from-yellow-400 via-green-500 to-blue-600 relative">
                    {/* Indicator pin */}
                    <div
                      className="absolute top-0 bottom-0 w-2 bg-white rounded-full shadow border border-slate-900 transition-all duration-300"
                      style={{ left: `${Math.min(100, Math.max(0, (currentPh / 14) * 100))}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>pH 0 (강산)</span>
                    <span className="text-emerald-400 font-bold">pH 7 (중성)</span>
                    <span>pH 14 (강염기)</span>
                  </div>
                </div>
              </div>

              {/* Titration Action Buttons */}
              <div className="space-y-2">
                <div className="text-xs text-slate-300 font-medium">스포이트 적정 제어:</div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleAddBaseDrop}
                    className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all shadow-md"
                  >
                    <Droplets className="w-4 h-4" />
                    <span>0.1M NaOH (염기) +1방울</span>
                    <span className="text-[10px] text-blue-200">pH 상승</span>
                  </button>

                  <button
                    onClick={handleAddAcidDrop}
                    disabled={titrationDropsAdded <= 0}
                    className="p-3 bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all shadow-md"
                  >
                    <Droplets className="w-4 h-4" />
                    <span>0.1M HCl (산) +1방울</span>
                    <span className="text-[10px] text-amber-200">오버슈트 시 되돌리기</span>
                  </button>
                </div>
              </div>

              {/* Chemical Concept Card */}
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs text-slate-400 space-y-1">
                <div className="font-semibold text-slate-300">중화 반응식 (Neutralization)</div>
                <div className="font-mono text-emerald-400">H⁺(aq) + OH⁻(aq) → H₂O(l) + 중화열</div>
                <p className="text-[11px] text-slate-400">
                  수소 이온과 수산화 이온이 1:1 몰비로 반응하여 물을 생성할 때 BTB 용액은 완벽한 초록색을 띱니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Unlock / Station Complete Notification Banner */}
      {allMissionsSolved && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/90 to-slate-900 border border-emerald-500/50 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-emerald-500 text-slate-950">
              <KeyRound className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <span>Chamber 01 클리어: 산·염기 보안 토큰 회수!</span>
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </h4>
              <p className="text-xs text-emerald-300/80">
                스팟 플레이트 암호(ACID)와 BTB 중화 적정 미션을 성공적으로 마쳤습니다.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onBackToOverview();
            }}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
          >
            <span>다음 연구실 콘솔로 이동</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
