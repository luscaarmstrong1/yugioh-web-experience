import { DuelState } from '../../types';
import { DuelEngine } from '../duel/DuelEngine';

export class DuelAiEngine {
  public static playTurn(state: DuelState): DuelState {
    if (state.activePlayerId !== 'opponent' || state.winner) return state;

    let currentState = structuredClone(state);
    const opp = currentState.players.opponent;

    // 1. Play spells if any available
    const potOfGreedIdx = opp.hand.findIndex(c => c.name === 'Pot of Greed');
    if (potOfGreedIdx !== -1) {
      currentState = DuelEngine.activateSpellOrTrap(currentState, 'opponent', potOfGreedIdx, 0);
    }

    // 2. Play Normal Summon of best monster
    if (opp.normalSummonAvailable) {
      const monsterIdxs = opp.hand
        .map((c, i) => ({ card: c, index: i }))
        .filter(item => item.card.type.includes('Monster'))
        .sort((a, b) => (b.card.atk || 0) - (a.card.atk || 0));

      if (monsterIdxs.length > 0) {
        const freeZone = opp.monsterZones.findIndex(z => z === null);
        if (freeZone !== -1) {
          const chosen = monsterIdxs[0];
          // Check level for tributes
          const level = chosen.card.level || 4;
          const reqTributes = level >= 7 ? 2 : level >= 5 ? 1 : 0;
          const currentMonsters = opp.monsterZones.filter(z => z !== null).length;

          if (reqTributes <= currentMonsters) {
            currentState = DuelEngine.normalSummon(currentState, 'opponent', chosen.index, freeZone);
          }
        }
      }
    }

    // 3. Move to Battle Phase if turn > 1
    if (currentState.turn > 1) {
      currentState.phase = 'BP';
      const playerMonsters = currentState.players.player.monsterZones;
      const hasPlayerMonsters = playerMonsters.some(z => z !== null);

      opp.monsterZones.forEach((slot, mySlotIdx) => {
        if (slot && slot.card && !slot.hasAttacked) {
          if (!hasPlayerMonsters) {
            // Attack directly!
            currentState = DuelEngine.declareAttack(currentState, mySlotIdx, 'direct');
          } else {
            // Find lowest defense or attack monster to conquer
            const targetIdx = playerMonsters.findIndex(z => z !== null && (z.card?.atk || 0) <= (slot.card?.atk || 0));
            if (targetIdx !== -1) {
              currentState = DuelEngine.declareAttack(currentState, mySlotIdx, targetIdx);
            }
          }
        }
      });
    }

    // 4. End turn
    return DuelEngine.endTurn(currentState);
  }
}
