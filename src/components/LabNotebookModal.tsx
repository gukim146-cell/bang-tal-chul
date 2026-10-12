import React, { useState } from 'react';
import { X, BookOpen, Beaker, Search, Scale, ShieldAlert, Check } from 'lucide-react';
import { sound } from '../utils/sound';

interface LabNotebookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LabNotebookModal: React.FC<LabNotebookModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'acid' | 'periodic' | 'equation' | 'oxidation'>('acid');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">화학 연구 일지 & 방탈출 가이드</h3>
              <p className="text-xs text-slate-400">실험실 탈출을 위한 화학 핵심 개념 및 공식 정리</p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-800 px-4 sm:px-6 gap-2 bg-slate-950/30 overflow-x-auto">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('acid');
            }}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'acid'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Beaker className="w-4 h-4" />
            <span>1. 산·염기 및 지시약</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('periodic');
            }}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'periodic'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>2. 주기율표와 원소</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('equation');
            }}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'equation'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>3. 화학 반응식 계수</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('oxidation');
            }}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'oxidation'
                ? 'border-purple-400 text-purple-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>4. 산화수 결정 규칙</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-300">
          {activeTab === 'acid' && (
            <div className="space-y-4">
              <h4 className="font-bold text-white text-base">산과 염기의 성질 & 지시약 변색표</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                산(Acid)은 수용액에서 H⁺(수소 이온)을 내놓고 신맛이 나며 금속과 반응해 H₂ 기체를 생성합니다. 염기(Base)는 수용액에서 OH⁻(수산화 이온)을 내놓고 쓴맛과 미끈거리는 감촉을 가집니다.
              </p>

              {/* Indicator Table */}
              <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950/70">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-800 text-slate-300">
                      <th className="p-2.5">지시약 이름</th>
                      <th className="p-2.5 text-amber-300">산성 (pH &lt; 7)</th>
                      <th className="p-2.5 text-emerald-300">중성 (pH = 7)</th>
                      <th className="p-2.5 text-blue-300">염기성 (pH &gt; 7)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    <tr>
                      <td className="p-2.5 font-bold font-sans text-white">페놀프탈레인</td>
                      <td className="p-2.5 text-slate-400">무색 (투명)</td>
                      <td className="p-2.5 text-slate-400">무색 (투명)</td>
                      <td className="p-2.5 text-rose-400 font-bold">붉은색 (진분홍)</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold font-sans text-white">BTB 용액</td>
                      <td className="p-2.5 text-yellow-400 font-bold">노란색</td>
                      <td className="p-2.5 text-emerald-400 font-bold">초록색</td>
                      <td className="p-2.5 text-blue-400 font-bold">파란색</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold font-sans text-white">붉은 리트머스 종이</td>
                      <td className="p-2.5 text-rose-400">붉은색 유지</td>
                      <td className="p-2.5 text-rose-400">붉은색 유지</td>
                      <td className="p-2.5 text-blue-400 font-bold">푸른색으로 변함</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold font-sans text-white">푸른 리트머스 종이</td>
                      <td className="p-2.5 text-rose-400 font-bold">붉은색으로 변함</td>
                      <td className="p-2.5 text-blue-400">푸른색 유지</td>
                      <td className="p-2.5 text-blue-400">푸른색 유지</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Neutralization Formula */}
              <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-emerald-400 block text-xs">중화 반응의 알짜 이온 반응식</span>
                <span className="font-mono text-white text-sm">H⁺(aq) + OH⁻(aq) → H₂O(l) + 중화열</span>
                <p className="text-xs text-slate-400">
                  산의 H⁺ 몰수와 염기의 OH⁻ 몰수가 같을 때 완전 중화(pH 7)를 이루며, BTB 용액은 완벽한 초록색을 나타냅니다.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'periodic' && (
            <div className="space-y-4">
              <h4 className="font-bold text-white text-base">주기율표의 구성과 원소의 규칙성</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                주기율표는 원자 번호(양성자 수) 순서로 배열되어 있으며, 같은 족(Group, 세로줄)에 속하는 원소들은 원자가 전자 수가 같아 화학적 성질이 매우 유사합니다.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-rose-400 block">1족: 알칼리 금속 (Li, Na, K...)</span>
                  <p className="text-slate-400">
                    최외각 전자 1개. 칼로 잘릴 만큼 무르며, 물과 격렬히 반응하여 H₂ 기체와 염기성 수용액(OH⁻)을 형성합니다.
                  </p>
                </div>
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-purple-400 block">17족: 할로젠 (F, Cl, Br, I)</span>
                  <p className="text-slate-400">
                    원자가 전자 7개. 전자를 1개 얻어 -1가 음이온이 되려는 경향이 강해 반응성이 크며, 살균과 소독에 사용됩니다.
                  </p>
                </div>
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-indigo-400 block">18족: 비활성 기체 (He, Ne, Ar...)</span>
                  <p className="text-slate-400">
                    옥텟 규칙을 만족하여 최외각 전자가 8개(He은 2개)로 극도로 안정적이며 화학 반응을 거의 하지 않습니다.
                  </p>
                </div>
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-cyan-400 block">상온의 액체 원소</span>
                  <p className="text-slate-400">
                    금속 중에서는 <strong>수은(Hg, 원자번호 80)</strong>, 비금속 중에서는 <strong>브로민(Br, 원자번호 35)</strong>이 유일한 액체 상태입니다.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'equation' && (
            <div className="space-y-4">
              <h4 className="font-bold text-white text-base">화학 반응식 계수 맞추기 (원자 보존 법칙)</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                화학 반응 전후에 원자의 종류와 개수는 절대로 생성되거나 소멸하지 않고 보존됩니다(질량 보존 법칙).
              </p>

              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                  <span className="font-bold text-amber-400 block">1단계: 화학식 확정</span>
                  <p className="text-slate-400">반응물과 생성물의 고유 분자식의 아래 첨자는 절대 변경하지 않습니다.</p>
                </div>
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                  <span className="font-bold text-amber-400 block">2단계: 복잡한 분자부터 기준 계수 1 설정</span>
                  <p className="text-slate-400">
                    분자를 구성하는 원소의 종류가 가장 많은 물질(예: C₃H₈, C₆H₁₂O₆)의 계수를 1로 두고 다른 원자 수를 맞춥니다.
                  </p>
                </div>
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                  <span className="font-bold text-amber-400 block">3단계: 홀원소 물질(O₂, H₂, N₂)은 마지막에 조정</span>
                  <p className="text-slate-400">
                    홀원소 물질은 다른 원소에 영향을 주지 않으므로 최종 산소나 수소 개수를 맞추는 데 가장 유리합니다.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-amber-300">
                예: 1 C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O<br />
                · 탄소(C): 좌변 3개 = 우변 3개<br />
                · 수소(H): 좌변 8개 = 우변 4×2 = 8개<br />
                · 산소(O): 좌변 5×2 = 10개 = 우변 (3×2 + 4×1) = 10개
              </div>
            </div>
          )}

          {activeTab === 'oxidation' && (
            <div className="space-y-4">
              <h4 className="font-bold text-white text-base">산화수 결정 6대 핵심 우선순위 규칙</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                산화수는 공유 결합 물질에서 전기 음성도가 더 큰 원자가 공유 전자쌍을 모두 가져간다고 가정했을 때 원자가 띠는 가상의 전하입니다.
              </p>

              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                  <span className="font-bold text-purple-400 block">규칙 1: 홑원소 물질 = 0</span>
                  <p className="text-slate-400">H₂, O₂, Fe, Na 등 하나의 원소로 이루어진 물질의 산화수는 항상 0입니다.</p>
                </div>
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                  <span className="font-bold text-purple-400 block">규칙 2: 중성 화합물의 산화수 합 = 0</span>
                  <p className="text-slate-400">중성 화합물을 구성하는 모든 원자의 산화수 총합은 0입니다.</p>
                </div>
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                  <span className="font-bold text-purple-400 block">규칙 3: 다원자 이온의 산화수 합 = 이온의 전하</span>
                  <p className="text-slate-400">
                    SO₄²⁻의 합은 -2, NO₃⁻의 합은 -1, NH₄⁺의 합은 +1입니다.
                  </p>
                </div>
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                  <span className="font-bold text-purple-400 block">규칙 4: F(-1), 1족 금속(+1), 2족 금속(+2), Al(+3)</span>
                  <p className="text-slate-400">이 원소들은 화합물 내에서 예외 없이 고정된 산화수를 갖습니다.</p>
                </div>
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                  <span className="font-bold text-purple-400 block">규칙 5: 수소(H) = +1 (단, 금속 수소화물 NaH에서는 -1)</span>
                  <p className="text-slate-400">대부분의 화합물에서 +1이나, 금속과 직접 결합한 NaH, CaH₂에서는 -1입니다.</p>
                </div>
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                  <span className="font-bold text-purple-400 block">규칙 6: 산소(O) = -2 (단, 과산화물 H₂O₂=-1, OF₂=+2)</span>
                  <p className="text-slate-400">
                    대부분 -2이지만, H₂O₂나 Na₂O₂에서는 -1이고, F가 더 강한 OF₂에서는 +2입니다.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
