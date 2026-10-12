/**
 * ChemLab Escape: 화학 실험실 탈출
 * Interactive Chemistry Escape Room Game
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LabOverview } from './components/LabOverview';
import { AcidBaseConsole } from './components/AcidBaseConsole';
import { PeriodicTableConsole } from './components/PeriodicTableConsole';
import { EquationConsole } from './components/EquationConsole';
import { OxidationConsole } from './components/OxidationConsole';
import { BlastDoorModal } from './components/BlastDoorModal';
import { LabNotebookModal } from './components/LabNotebookModal';
import { VictoryModal } from './components/VictoryModal';
import { sound } from './utils/sound';

type ViewType = 'overview' | 'acidBase' | 'periodicTable' | 'equation' | 'oxidation';

export default function App() {
  const [activeView, setActiveView] = useState<ViewType>('overview');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isEscaped, setIsEscaped] = useState(false);

  // 4 Security Tokens
  const [unlockedTokens, setUnlockedTokens] = useState({
    acidBase: false,
    periodicTable: false,
    equation: false,
    oxidation: false,
  });

  // Modals
  const [showBlastDoorModal, setShowBlastDoorModal] = useState(false);
  const [showNotebookModal, setShowNotebookModal] = useState(false);
  const [showVictoryModal, setShowVictoryModal] = useState(false);

  // Timer effect
  useEffect(() => {
    if (isEscaped) return;
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isEscaped]);

  const handleUnlockToken = (tokenKey: keyof typeof unlockedTokens) => {
    sound.playSuccess();
    setUnlockedTokens((prev) => ({
      ...prev,
      [tokenKey]: true,
    }));
  };

  const handleTriggerEscape = () => {
    setIsEscaped(true);
    setShowBlastDoorModal(false);
    setShowVictoryModal(true);
  };

  const handleRestart = () => {
    setUnlockedTokens({
      acidBase: false,
      periodicTable: false,
      equation: false,
      oxidation: false,
    });
    setElapsedSeconds(0);
    setIsEscaped(false);
    setShowVictoryModal(false);
    setShowBlastDoorModal(false);
    setActiveView('overview');
    sound.playClick(600);
  };

  const handleSelectStation = (stationId: 'acidBase' | 'periodicTable' | 'equation' | 'oxidation' | 'blastDoor') => {
    if (stationId === 'blastDoor') {
      setShowBlastDoorModal(true);
    } else {
      setActiveView(stationId);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Bar Header */}
      <Header
        elapsedSeconds={elapsedSeconds}
        unlockedTokens={unlockedTokens}
        onOpenNotebook={() => setShowNotebookModal(true)}
        onOpenBlastDoor={() => setShowBlastDoorModal(true)}
        activeView={activeView}
        onNavigateHome={() => setActiveView('overview')}
      />

      {/* Main Game Station View */}
      <main className="flex-1">
        {activeView === 'overview' && (
          <LabOverview
            unlockedTokens={unlockedTokens}
            onSelectStation={handleSelectStation}
            onOpenNotebook={() => setShowNotebookModal(true)}
          />
        )}

        {activeView === 'acidBase' && (
          <AcidBaseConsole
            isUnlocked={unlockedTokens.acidBase}
            onUnlockToken={() => handleUnlockToken('acidBase')}
            onOpenNotebook={() => setShowNotebookModal(true)}
            onBackToOverview={() => setActiveView('overview')}
          />
        )}

        {activeView === 'periodicTable' && (
          <PeriodicTableConsole
            isUnlocked={unlockedTokens.periodicTable}
            onUnlockToken={() => handleUnlockToken('periodicTable')}
            onOpenNotebook={() => setShowNotebookModal(true)}
            onBackToOverview={() => setActiveView('overview')}
          />
        )}

        {activeView === 'equation' && (
          <EquationConsole
            isUnlocked={unlockedTokens.equation}
            onUnlockToken={() => handleUnlockToken('equation')}
            onOpenNotebook={() => setShowNotebookModal(true)}
            onBackToOverview={() => setActiveView('overview')}
          />
        )}

        {activeView === 'oxidation' && (
          <OxidationConsole
            isUnlocked={unlockedTokens.oxidation}
            onUnlockToken={() => handleUnlockToken('oxidation')}
            onOpenNotebook={() => setShowNotebookModal(true)}
            onBackToOverview={() => setActiveView('overview')}
          />
        )}
      </main>

      {/* Modals */}
      <BlastDoorModal
        isOpen={showBlastDoorModal}
        onClose={() => setShowBlastDoorModal(false)}
        unlockedTokens={unlockedTokens}
        onNavigateStation={(stId) => {
          setShowBlastDoorModal(false);
          setActiveView(stId);
        }}
        onTriggerEscape={handleTriggerEscape}
      />

      <LabNotebookModal
        isOpen={showNotebookModal}
        onClose={() => setShowNotebookModal(false)}
      />

      <VictoryModal
        isOpen={showVictoryModal}
        elapsedSeconds={elapsedSeconds}
        onRestart={handleRestart}
        onOpenNotebook={() => {
          setShowVictoryModal(false);
          setShowNotebookModal(true);
        }}
      />
    </div>
  );
}
