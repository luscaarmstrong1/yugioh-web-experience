import React, { useState } from 'react';
import { DuelState, YugiohCard, FieldSlot } from '../types';
import { DuelEngine } from '../engines/duel/DuelEngine';
import { DuelAiEngine } from '../engines/ai/DuelAiEngine';
import { DUEL_ARENAS, DuelArenaInfo } from '../data/arenas';
import { HoloCard } from '../components/HoloCard';
import confetti from 'canvas-confetti';
import { 
  Swords, 
  Shield, 
  RotateCcw, 
  Play, 
  Award, 
  ChevronRight, 
  Sparkles, 
  Eye, 
  Layers 
} from 'lucide-react';
import styles from './DuelArena.module.css';

export const DuelArena: React.FC = () => {
  const [selectedArenaId, setSelectedArenaId] = useState('coliseum');
  const [duelState, setDuelState] = useState<DuelState>(() => DuelEngine.createInitialDuel('coliseum'));
  const [selectedHandIndex, setSelectedHandIndex] = useState<number | null>(null);
  const [selectedAttackerZone, setSelectedAttackerZone] = useState<number | null>(null);
  const [activeAnimation, setActiveAnimation] = useState<string | null>(null);

  const currentArena = DUEL_ARENAS.find(a => a.id === selectedArenaId) || DUEL_ARENAS[0];

  const handleArenaChange = (arenaId: string) => {
    setSelectedArenaId(arenaId);
    setDuelState(DuelEngine.createInitialDuel(arenaId));
  };

  const handleRestart = () => {
    setDuelState(DuelEngine.createInitialDuel(selectedArenaId));
    setSelectedHandIndex(null);
    setSelectedAttackerZone(null);
    setActiveAnimation(null);
  };

  // Human Summon / Spell activation
  const handlePlayCardToMonsterZone = (zoneIndex: number) => {
    if (selectedHandIndex === null) return;
    const card = duelState.players.player.hand[selectedHandIndex];
    if (!card) return;

    if (card.type.includes('Monster')) {
      const next = DuelEngine.normalSummon(duelState, 'player', selectedHandIndex, zoneIndex);
      setDuelState(next);
      triggerSummonAnimation(card);
    }
    setSelectedHandIndex(null);
  };

  const handleActivateSpellFromHand = (index: number) => {
    const card = duelState.players.player.hand[index];
    if (!card) return;

    const next = DuelEngine.activateSpellOrTrap(duelState, 'player', index, 0);
    setDuelState(next);
    triggerSpellAnimation(card);
    setSelectedHandIndex(null);
  };

  // Attack declaration
  const handleMonsterClick = (zoneIndex: number, owner: 'player' | 'opponent') => {
    if (owner === 'player') {
      if (duelState.phase !== 'BP') return;
      const slot = duelState.players.player.monsterZones[zoneIndex];
      if (slot && !slot.hasAttacked) {
        setSelectedAttackerZone(zoneIndex);
      }
    } else {
      // Clicking opponent monster as target
      if (selectedAttackerZone !== null) {
        const next = DuelEngine.declareAttack(duelState, selectedAttackerZone, zoneIndex);
        setDuelState(next);
        triggerAttackAnimation();
        setSelectedAttackerZone(null);
        checkWinner(next);
      }
    }
  };

  const handleDirectAttack = () => {
    if (selectedAttackerZone === null) return;
    const next = DuelEngine.declareAttack(duelState, selectedAttackerZone, 'direct');
    setDuelState(next);
    triggerAttackAnimation();
    setSelectedAttackerZone(null);
    checkWinner(next);
  };

  // End turn & Run AI
  const handlePassPhase = () => {
    let next = DuelEngine.nextPhase(duelState);
    setDuelState(next);

    // If turn switched to opponent, execute AI
    if (next.activePlayerId === 'opponent' && !next.winner) {
      setTimeout(() => {
        const afterAi = DuelAiEngine.playTurn(next);
        setDuelState(afterAi);
        checkWinner(afterAi);
      }, 900);
    }
  };

  const checkWinner = (state: DuelState) => {
    if (state.winner === 'player') {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }
  };

  const triggerSummonAnimation = (card: YugiohCard) => {
    setActiveAnimation(`INVOCAÇÃO CINEMATOGRÁFICA: ${card.name_pt || card.name}!`);
    setTimeout(() => setActiveAnimation(null), 2000);
  };

  const triggerSpellAnimation = (card: YugiohCard) => {
    setActiveAnimation(`ATIVANDO EFEITO: ${card.name_pt || card.name}!`);
    setTimeout(() => setActiveAnimation(null), 1800);
  };

  const triggerAttackAnimation = () => {
    setActiveAnimation(`⚔️ ATAQUE DEPREDADOR CONECTADO!`);
    setTimeout(() => setActiveAnimation(null), 1500);
  };

  const player = duelState.players.player;
  const opponent = duelState.players.opponent;

  return (
    <div 
      className={styles.arenaContainer} 
      style={{ 
        background: currentArena.bgGradient,
        boxShadow: `inset ${currentArena.fieldGlow}`
      }}
    >
      {/* Cinematic Animation Banner */}
      {activeAnimation && (
        <div className={styles.cinematicBanner}>
          <div className={styles.cinematicText}>{activeAnimation}</div>
        </div>
      )}

      {/* Arena Selector & Status Topbar */}
      <div className={styles.topBar}>
        <div className={styles.arenaInfo}>
          <span className={styles.arenaTitle} style={{ color: currentArena.themeColor }}>
            🏟️ {currentArena.name}
          </span>
          <span className={styles.arenaSubtitle}>{currentArena.subtitle}</span>
        </div>

        <div className={styles.arenaPicker}>
          <select 
            value={selectedArenaId} 
            onChange={e => handleArenaChange(e.target.value)}
            className={styles.arenaSelect}
          >
            {DUEL_ARENAS.map(a => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>

          <button className={styles.resetBtn} onClick={handleRestart}>
            <RotateCcw size={14} />
            <span>Reiniciar Duelo</span>
          </button>
        </div>
      </div>

      {/* Duel Board Central */}
      <div className={styles.duelBoard}>
        {/* Opponent Field */}
        <div className={styles.playerSide}>
          <div className={styles.playerMeta}>
            <div className={styles.playerAvatarHolder}>
              <img src={opponent.avatar} alt={opponent.name} className={styles.avatarImg} />
            </div>
            <div>
              <div className={styles.playerName}>{opponent.name} (IA)</div>
              <div className={styles.lpMeter}>
                <div 
                  className={styles.lpBarOpponent} 
                  style={{ width: `${Math.min(100, (opponent.lp / 8000) * 100)}%` }} 
                />
                <span className={styles.lpNumber}>LP: {opponent.lp}</span>
              </div>
            </div>
            {selectedAttackerZone !== null && !opponent.monsterZones.some(z => z !== null) && (
              <button className={styles.directAttackBtn} onClick={handleDirectAttack}>
                ⚔️ ATACAR DIRETAMENTE!
              </button>
            )}
          </div>

          {/* Opponent Spell/Traps */}
          <div className={styles.fieldRow}>
            {opponent.spellTrapZones.map((slot, i) => (
              <div key={i} className={styles.fieldSlot}>
                {slot && <HoloCard card={slot.card!} size="sm" isHoverable={false} />}
                <span className={styles.slotLabel}>S/T</span>
              </div>
            ))}
          </div>

          {/* Opponent Monsters */}
          <div className={styles.fieldRow}>
            {opponent.monsterZones.map((slot, i) => (
              <div 
                key={i} 
                className={`${styles.fieldSlot} ${slot ? styles.hasMonster : ''} ${selectedAttackerZone !== null && slot ? styles.attackTargetCandidate : ''}`}
                onClick={() => slot && handleMonsterClick(i, 'opponent')}
              >
                {slot ? (
                  <HoloCard card={slot.card!} size="sm" isHoverable={false} />
                ) : (
                  <span className={styles.slotLabel}>M-{i + 1}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Center Field Divider & Phase HUD */}
        <div className={styles.centerHud}>
          <div className={styles.phaseIndicator}>
            <span>TURNO {duelState.turn}</span>
            <span className={styles.phaseBadge}>
              {DuelEngine.getPhaseLabel(duelState.phase)}
            </span>
          </div>

          <div className={styles.phaseControls}>
            <button 
              className={styles.nextPhaseBtn} 
              onClick={handlePassPhase}
              disabled={duelState.activePlayerId !== 'player' || !!duelState.winner}
            >
              <Play size={14} />
              <span>Avançar Fase</span>
            </button>
          </div>
        </div>

        {/* Player Field */}
        <div className={styles.playerSide}>
          {/* Player Monsters */}
          <div className={styles.fieldRow}>
            {player.monsterZones.map((slot, i) => (
              <div 
                key={i} 
                className={`${styles.fieldSlot} ${selectedAttackerZone === i ? styles.activeAttacker : ''}`}
                onClick={() => {
                  if (slot) {
                    handleMonsterClick(i, 'player');
                  } else {
                    handlePlayCardToMonsterZone(i);
                  }
                }}
              >
                {slot ? (
                  <HoloCard card={slot.card!} size="sm" isHoverable={false} />
                ) : (
                  <span className={styles.slotLabel}>Zona M-{i + 1}</span>
                )}
              </div>
            ))}
          </div>

          {/* Player Spell/Traps */}
          <div className={styles.fieldRow}>
            {player.spellTrapZones.map((slot, i) => (
              <div key={i} className={styles.fieldSlot}>
                {slot && <HoloCard card={slot.card!} size="sm" isHoverable={false} />}
                <span className={styles.slotLabel}>S/T</span>
              </div>
            ))}
          </div>

          {/* Player Meta LP */}
          <div className={styles.playerMeta}>
            <div className={styles.playerAvatarHolder}>
              <img src={player.avatar} alt={player.name} className={styles.avatarImg} />
            </div>
            <div>
              <div className={styles.playerName}>{player.name}</div>
              <div className={styles.lpMeter}>
                <div 
                  className={styles.lpBarPlayer} 
                  style={{ width: `${Math.min(100, (player.lp / 8000) * 100)}%` }} 
                />
                <span className={styles.lpNumber}>LP: {player.lp}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Player Hand Tray */}
        <div className={styles.handTray}>
          <div className={styles.handHeader}>
            <span>MÃO ({player.hand.length} Cartas) - Clique para selecionar e invocar ou ativar</span>
          </div>
          <div className={styles.handCardsContainer}>
            {player.hand.map((card, idx) => (
              <div 
                key={idx} 
                className={`${styles.handCardSlot} ${selectedHandIndex === idx ? styles.selectedHandCard : ''}`}
                onClick={() => {
                  if (card.type.includes('Spell')) {
                    handleActivateSpellFromHand(idx);
                  } else {
                    setSelectedHandIndex(idx);
                  }
                }}
              >
                <HoloCard card={card} size="sm" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Duel History Log Panel */}
      <aside className={styles.logPanel}>
        <div className={styles.logHeader}>
          <Layers size={14} />
          <span>Histórico do Duelo</span>
        </div>
        <div className={styles.logMessages}>
          {duelState.log.map(item => (
            <div key={item.id} className={`${styles.logEntry} ${styles[item.type]}`}>
              {item.text}
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};
