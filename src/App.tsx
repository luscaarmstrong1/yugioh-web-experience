import React, { useState } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { CardDex } from './pages/CardDex';
import { DuelArena } from './pages/DuelArena';
import { DeckForge } from './pages/DeckForge';
import { SummonLab } from './pages/SummonLab';
import { ArchetypeNexus } from './pages/ArchetypeNexus';
import { DuelAcademy } from './pages/DuelAcademy';
import { ShadowCampaign } from './pages/ShadowCampaign';
import { CardVault } from './pages/CardVault';
import { DuelAnalytics } from './pages/DuelAnalytics';
import { DuelCore } from './pages/DuelCore';
import './App.css';

export function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('cardex');
  const [showIntro, setShowIntro] = useState(true);

  if (showIntro) {
    return (
      <div className="introContainer">
        <div className="introCard">
          <div className="millenniumEye">👁️</div>
          <h1 className="introTitle">DUELVERSE</h1>
          <h2 className="introSub">YU-GI-OH! WEB EXPERIENCE — ULTIMATE DUEL EDITION</h2>
          <p className="introLore">
            Entre na arena definitiva de Yu-Gi-Oh! no navegador. Cartas com renderização holográfica 3D,
            simulador oficial de batalhas, construtor de decks, laboratório de invocações e campanha solo.
          </p>
          <div className="authorSign">Developed by <strong>luscaarmstrong</strong></div>
          <button className="startDuelBtn" onClick={() => setShowIntro(false)}>
            ⚔️ É HORA DO DUELO!
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="appContainer">
      <Navbar currentTab={currentTab} onTabChange={setCurrentTab} />

      <main className="tabContent">
        {currentTab === 'cardex' && <CardDex />}
        {currentTab === 'duel' && <DuelArena />}
        {currentTab === 'deckforge' && <DeckForge />}
        {currentTab === 'summonlab' && <SummonLab />}
        {currentTab === 'archetypes' && <ArchetypeNexus />}
        {currentTab === 'academy' && <DuelAcademy />}
        {currentTab === 'campaign' && <ShadowCampaign onStartDuel={() => setCurrentTab('duel')} />}
        {currentTab === 'vault' && <CardVault />}
        {currentTab === 'analytics' && <DuelAnalytics />}
        {currentTab === 'core' && <DuelCore />}
      </main>
    </div>
  );
}

export default App;
