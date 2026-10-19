import { DuelState, PlayerState, YugiohCard, FieldSlot, DuelPhase } from '../../types';
import { INITIAL_FEATURED_CARDS, PRESET_DECKS } from '../../data/cards';

export class DuelEngine {
  public static createInitialDuel(arenaId: string = 'coliseum'): DuelState {
    const p1Deck = this.buildDeckFromPreset(PRESET_DECKS[0]);
    const p2Deck = this.buildDeckFromPreset(PRESET_DECKS[1]);

    const playerState: PlayerState = {
      id: 'player',
      name: 'Yugi Muto',
      avatar: 'https://images.ygoprodeck.com/images/cards_cropped/46986414.jpg',
      lp: 8000,
      deck: this.shuffle([...p1Deck.main]),
      hand: [],
      graveyard: [],
      banished: [],
      extraDeck: [...p1Deck.extra],
      monsterZones: [null, null, null, null, null],
      spellTrapZones: [null, null, null, null, null],
      fieldSpellZone: null,
      normalSummonAvailable: true
    };

    const opponentState: PlayerState = {
      id: 'opponent',
      name: 'Seto Kaiba',
      avatar: 'https://images.ygoprodeck.com/images/cards_cropped/89631139.jpg',
      lp: 8000,
      deck: this.shuffle([...p2Deck.main]),
      hand: [],
      graveyard: [],
      banished: [],
      extraDeck: [...p2Deck.extra],
      monsterZones: [null, null, null, null, null],
      spellTrapZones: [null, null, null, null, null],
      fieldSpellZone: null,
      normalSummonAvailable: true
    };

    // Draw initial 5 cards each
    for (let i = 0; i < 5; i++) {
      if (playerState.deck.length > 0) playerState.hand.push(playerState.deck.pop()!);
      if (opponentState.deck.length > 0) opponentState.hand.push(opponentState.deck.pop()!);
    }

    return {
      turn: 1,
      activePlayerId: 'player',
      turnPlayerId: 'player',
      phase: 'M1', // Starts on Main Phase 1 on turn 1
      players: {
        player: playerState,
        opponent: opponentState
      },
      extraMonsterZones: [null, null],
      chain: [],
      log: [
        { id: '1', text: 'O Duelo começou! É hora do duelo!', type: 'info' },
        { id: '2', text: 'Turno 1 - Jogador: Yugi Muto. Fase: Main Phase 1.', type: 'phase' }
      ],
      winner: null,
      arenaId
    };
  }

  private static buildDeckFromPreset(preset: typeof PRESET_DECKS[0]) {
    const main: YugiohCard[] = [];
    const extra: YugiohCard[] = [];

    preset.mainDeckIds.forEach(id => {
      const card = INITIAL_FEATURED_CARDS.find(c => c.id === id);
      if (card) main.push(card);
    });
    preset.extraDeckIds.forEach(id => {
      const card = INITIAL_FEATURED_CARDS.find(c => c.id === id);
      if (card) extra.push(card);
    });

    return { main, extra };
  }

  public static shuffle(array: YugiohCard[]): YugiohCard[] {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  public static normalSummon(
    state: DuelState,
    playerId: 'player' | 'opponent',
    cardHandIndex: number,
    targetZoneIndex: number
  ): DuelState {
    const newState = structuredClone(state);
    const p = newState.players[playerId];

    if (!p.normalSummonAvailable) {
      newState.log.unshift({
        id: Math.random().toString(),
        text: `Invocação Normal já foi utilizada neste turno!`,
        type: 'info'
      });
      return newState;
    }

    const card = p.hand[cardHandIndex];
    if (!card || !card.type.includes('Monster')) return state;

    // Check Tribute requirements (Level 5-6: 1 tribute, Level 7+: 2 tributes)
    const level = card.level || 4;
    const requiredTributes = level >= 7 ? 2 : level >= 5 ? 1 : 0;
    const availableMonsters = p.monsterZones.filter(z => z !== null);

    if (requiredTributes > 0 && availableMonsters.length < requiredTributes) {
      newState.log.unshift({
        id: Math.random().toString(),
        text: `Nível ${level} exige ${requiredTributes} tributo(s)! Monstros insuficientes no campo.`,
        type: 'info'
      });
      return newState;
    }

    // Auto tribute if needed
    if (requiredTributes > 0) {
      let tCount = 0;
      for (let i = 0; i < p.monsterZones.length && tCount < requiredTributes; i++) {
        if (p.monsterZones[i]) {
          p.graveyard.push(p.monsterZones[i]!.card!);
          p.monsterZones[i] = null;
          tCount++;
        }
      }
      newState.log.unshift({
        id: Math.random().toString(),
        text: `${p.name} tributou ${requiredTributes} monstro(s) para invocar ${card.name_pt || card.name}!`,
        type: 'summon'
      });
    }

    // Place monster on target slot
    p.hand.splice(cardHandIndex, 1);
    const slot: FieldSlot = {
      id: Math.random().toString(),
      card,
      position: 'faceUpAttack',
      canAttack: newState.phase === 'BP' && newState.turn > 1,
      hasAttacked: false,
      turnSummoned: newState.turn
    };

    p.monsterZones[targetZoneIndex] = slot;
    p.normalSummonAvailable = false;

    newState.log.unshift({
      id: Math.random().toString(),
      text: `${p.name} Invoca Normalmente: ${card.name_pt || card.name} [ATK: ${card.atk} / DEF: ${card.def}]!`,
      type: 'summon'
    });

    return newState;
  }

  public static activateSpellOrTrap(
    state: DuelState,
    playerId: 'player' | 'opponent',
    cardHandIndex: number,
    targetZoneIndex: number
  ): DuelState {
    const newState = structuredClone(state);
    const p = newState.players[playerId];
    const opponent = newState.players[playerId === 'player' ? 'opponent' : 'player'];
    const card = p.hand[cardHandIndex];
    if (!card) return state;

    p.hand.splice(cardHandIndex, 1);

    // Specific effects
    if (card.name === 'Pot of Greed') {
      // Draw 2 cards
      for (let i = 0; i < 2; i++) {
        if (p.deck.length > 0) p.hand.push(p.deck.pop()!);
      }
      p.graveyard.push(card);
      newState.log.unshift({
        id: Math.random().toString(),
        text: `${p.name} ativou Pote da Ganância e comprou 2 cartas!`,
        type: 'effect'
      });
    } else if (card.name === 'Monster Reborn') {
      // Special summon 1 from GY to field
      const monsterInGy = p.graveyard.find(c => c.type.includes('Monster')) || opponent.graveyard.find(c => c.type.includes('Monster'));
      if (monsterInGy) {
        const freeZone = p.monsterZones.findIndex(z => z === null);
        if (freeZone !== -1) {
          p.monsterZones[freeZone] = {
            id: Math.random().toString(),
            card: monsterInGy,
            position: 'faceUpAttack',
            canAttack: newState.phase === 'BP' && newState.turn > 1,
            hasAttacked: false,
            turnSummoned: newState.turn
          };
          newState.log.unshift({
            id: Math.random().toString(),
            text: `${p.name} ativou Ressurreição de Monstro e reviveu ${monsterInGy.name_pt || monsterInGy.name}!`,
            type: 'effect'
          });
        }
      }
      p.graveyard.push(card);
    } else if (card.name === 'Mystical Space Typhoon') {
      // Destroy 1 opponent spell/trap
      const oppStZone = opponent.spellTrapZones.findIndex(z => z !== null);
      if (oppStZone !== -1) {
        const target = opponent.spellTrapZones[oppStZone]!.card!;
        opponent.spellTrapZones[oppStZone] = null;
        opponent.graveyard.push(target);
        newState.log.unshift({
          id: Math.random().toString(),
          text: `${p.name} ativou Tufão Espacial Místico e destruiu ${target.name_pt || target.name}!`,
          type: 'effect'
        });
      } else {
        newState.log.unshift({
          id: Math.random().toString(),
          text: `${p.name} ativou Tufão Espacial Místico (sem alvos válidos no campo oponente).`,
          type: 'effect'
        });
      }
      p.graveyard.push(card);
    } else {
      // Default Spell/Trap placement/activation
      p.graveyard.push(card);
      newState.log.unshift({
        id: Math.random().toString(),
        text: `${p.name} ativou ${card.name_pt || card.name}!`,
        type: 'effect'
      });
    }

    return newState;
  }

  public static declareAttack(
    state: DuelState,
    attackerZoneIndex: number,
    targetZoneIndex: number | 'direct'
  ): DuelState {
    const newState = structuredClone(state);
    const activeId = newState.activePlayerId as 'player' | 'opponent';
    const defenderId = activeId === 'player' ? 'opponent' : 'player';
    const attacker = newState.players[activeId];
    const defender = newState.players[defenderId];

    const attackerSlot = attacker.monsterZones[attackerZoneIndex];
    if (!attackerSlot || !attackerSlot.card || attackerSlot.hasAttacked) return state;

    const atkCard = attackerSlot.card;
    const atkVal = atkCard.atk || 0;

    if (targetZoneIndex === 'direct') {
      // Check if defender has any monster
      const hasMonsters = defender.monsterZones.some(z => z !== null);
      if (hasMonsters) {
        newState.log.unshift({
          id: Math.random().toString(),
          text: `Ataque direto ilegal! O oponente possui monstros protegendo o campo.`,
          type: 'info'
        });
        return newState;
      }

      defender.lp = Math.max(0, defender.lp - atkVal);
      attackerSlot.hasAttacked = true;

      newState.log.unshift({
        id: Math.random().toString(),
        text: `⚔️ ATAQUE DIRETO! ${atkCard.name_pt || atkCard.name} causa ${atkVal} de dano a ${defender.name}!`,
        type: 'damage'
      });

      if (defender.lp <= 0) {
        newState.winner = activeId;
        newState.log.unshift({
          id: Math.random().toString(),
          text: `🏆 VITÓRIA! ${attacker.name} venceu o duelo por redução total de Life Points!`,
          type: 'info'
        });
      }

      return newState;
    }

    // Monster vs Monster combat
    const defSlot = defender.monsterZones[targetZoneIndex];
    if (!defSlot || !defSlot.card) return state;

    const defCard = defSlot.card;
    attackerSlot.hasAttacked = true;

    // Check Mirror Force trap response
    const mirrorForceIndex = defender.spellTrapZones.findIndex(z => z && z.card && z.card.name === 'Mirror Force');
    if (mirrorForceIndex !== -1) {
      const mfCard = defender.spellTrapZones[mirrorForceIndex]!.card!;
      defender.spellTrapZones[mirrorForceIndex] = null;
      defender.graveyard.push(mfCard);

      // Destroy all attack position monsters of attacker
      attacker.monsterZones.forEach((z, i) => {
        if (z && z.position === 'faceUpAttack') {
          attacker.graveyard.push(z.card!);
          attacker.monsterZones[i] = null;
        }
      });

      newState.log.unshift({
        id: Math.random().toString(),
        text: `🛡️ ARMADILHA ATIVADA! ${defender.name} aciona Força do Espelho! Todos os monstros de ataque de ${attacker.name} foram destruídos!`,
        type: 'effect'
      });
      return newState;
    }

    if (defSlot.position === 'faceUpAttack') {
      const defVal = defCard.atk || 0;
      if (atkVal > defVal) {
        const damage = atkVal - defVal;
        defender.lp = Math.max(0, defender.lp - damage);
        defender.graveyard.push(defCard);
        defender.monsterZones[targetZoneIndex] = null;

        newState.log.unshift({
          id: Math.random().toString(),
          text: `💥 ${atkCard.name_pt || atkCard.name} destruiu ${defCard.name_pt || defCard.name}! ${defender.name} recebe ${damage} de dano!`,
          type: 'damage'
        });
      } else if (atkVal < defVal) {
        const damage = defVal - atkVal;
        attacker.lp = Math.max(0, attacker.lp - damage);
        attacker.graveyard.push(atkCard);
        attacker.monsterZones[attackerZoneIndex] = null;

        newState.log.unshift({
          id: Math.random().toString(),
          text: `🛡️ Contra-ataque! ${atkCard.name_pt || atkCard.name} foi destruído! ${attacker.name} recebe ${damage} de dano!`,
          type: 'damage'
        });
      } else {
        // Tie: both destroyed
        attacker.graveyard.push(atkCard);
        attacker.monsterZones[attackerZoneIndex] = null;
        defender.graveyard.push(defCard);
        defender.monsterZones[targetZoneIndex] = null;

        newState.log.unshift({
          id: Math.random().toString(),
          text: `💥 Empate de forças! Ambos os monstros foram destruídos simultaneamente!`,
          type: 'attack'
        });
      }
    } else {
      // Defense position
      const defVal = defCard.def || 0;
      if (atkVal > defVal) {
        defender.graveyard.push(defCard);
        defender.monsterZones[targetZoneIndex] = null;
        newState.log.unshift({
          id: Math.random().toString(),
          text: `💥 ${atkCard.name_pt || atkCard.name} destruiu a defesa de ${defCard.name_pt || defCard.name}! (Sem dano aos LPs)`,
          type: 'attack'
        });
      } else if (atkVal < defVal) {
        const damage = defVal - atkVal;
        attacker.lp = Math.max(0, attacker.lp - damage);
        newState.log.unshift({
          id: Math.random().toString(),
          text: `🛡️ A defesa de ${defCard.name_pt || defCard.name} resistiu! ${attacker.name} recebe ${damage} de ricochete!`,
          type: 'damage'
        });
      }
    }

    if (defender.lp <= 0) {
      newState.winner = activeId;
      newState.log.unshift({
        id: Math.random().toString(),
        text: `🏆 VITÓRIA! ${attacker.name} reduziu os Life Points do oponente a zero!`,
        type: 'info'
      });
    }

    return newState;
  }

  public static nextPhase(state: DuelState): DuelState {
    const newState = structuredClone(state);
    const phaseOrder: DuelPhase[] = ['DP', 'SP', 'M1', 'BP', 'M2', 'EP'];
    const currentIdx = phaseOrder.indexOf(newState.phase);

    if (currentIdx < phaseOrder.length - 1) {
      // Cannot go to Battle Phase on Turn 1 according to official Master Duel / TCG rules
      if (newState.turn === 1 && phaseOrder[currentIdx + 1] === 'BP') {
        newState.phase = 'M2';
      } else {
        newState.phase = phaseOrder[currentIdx + 1];
      }
      newState.log.unshift({
        id: Math.random().toString(),
        text: `Fase alterada para: ${this.getPhaseLabel(newState.phase)}`,
        type: 'phase'
      });
    } else {
      // Turn change
      return this.endTurn(newState);
    }

    return newState;
  }

  public static endTurn(state: DuelState): DuelState {
    const newState = structuredClone(state);
    const nextPlayerId = newState.activePlayerId === 'player' ? 'opponent' : 'player';
    newState.turn += 1;
    newState.activePlayerId = nextPlayerId;
    newState.turnPlayerId = nextPlayerId;
    newState.phase = 'DP';

    const currentP = newState.players[nextPlayerId];
    currentP.normalSummonAvailable = true;

    // Reset monster attack flags
    currentP.monsterZones.forEach(z => {
      if (z) {
        z.hasAttacked = false;
        z.canAttack = true;
      }
    });

    // Draw Phase card draw
    if (currentP.deck.length > 0) {
      const drawn = currentP.deck.pop()!;
      currentP.hand.push(drawn);
      newState.log.unshift({
        id: Math.random().toString(),
        text: `Turno ${newState.turn} - ${currentP.name} comprou uma carta.`,
        type: 'phase'
      });
    } else {
      // Deck out condition
      newState.winner = nextPlayerId === 'player' ? 'opponent' : 'player';
      newState.log.unshift({
        id: Math.random().toString(),
        text: `Derrota por Deck Out! ${currentP.name} não possui mais cartas no deck.`,
        type: 'info'
      });
      return newState;
    }

    // Auto advance to Main Phase 1
    newState.phase = 'M1';

    return newState;
  }

  public static getPhaseLabel(phase: DuelPhase): string {
    switch (phase) {
      case 'DP': return 'Draw Phase';
      case 'SP': return 'Standby Phase';
      case 'M1': return 'Main Phase 1';
      case 'BP': return 'Battle Phase';
      case 'M2': return 'Main Phase 2';
      case 'EP': return 'End Phase';
    }
  }
}
