import React, { useState } from 'react';
import { BarChart2, Dices, TrendingUp, Layers } from 'lucide-react';
import styles from './DuelAnalytics.module.css';

export const DuelAnalytics: React.FC = () => {
  const [iterations, setIterations] = useState(1000);
  const [simResults, setSimResults] = useState<{
    openedMonsterRate: number;
    openedSpellRate: number;
    openedTrapRate: number;
    brickRate: number;
  } | null>(null);

  const runMonteCarlo = () => {
    // 40 card deck with 20 monsters, 12 spells, 8 traps
    let monsterCountSuccess = 0;
    let spellCountSuccess = 0;
    let trapCountSuccess = 0;
    let brickCount = 0;

    const deckPool = [
      ...Array(20).fill('monster'),
      ...Array(12).fill('spell'),
      ...Array(8).fill('trap')
    ];

    for (let i = 0; i < iterations; i++) {
      const shuffled = [...deckPool].sort(() => Math.random() - 0.5);
      const hand = shuffled.slice(0, 5);

      const hasMonster = hand.includes('monster');
      const hasSpell = hand.includes('spell');
      const hasTrap = hand.includes('trap');

      if (hasMonster) monsterCountSuccess++;
      if (hasSpell) spellCountSuccess++;
      if (hasTrap) trapCountSuccess++;

      // Brick: 0 monsters in opening hand
      if (!hasMonster) brickCount++;
    }

    setSimResults({
      openedMonsterRate: Number(((monsterCountSuccess / iterations) * 100).toFixed(1)),
      openedSpellRate: Number(((spellCountSuccess / iterations) * 100).toFixed(1)),
      openedTrapRate: Number(((trapCountSuccess / iterations) * 100).toFixed(1)),
      brickRate: Number(((brickCount / iterations) * 100).toFixed(1))
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <BarChart2 size={24} color="#d9ad56" />
        <div>
          <h2 className={styles.title}>DUEL ANALYTICS & SIMULATION</h2>
          <p className={styles.sub}>Simulações Monte Carlo, Análise de Mãos Iniciais e Consistência Probabilística</p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.simCard}>
          <div className={styles.simHeader}>
            <Dices size={18} color="#00d5ff" />
            <span>Simulador de Mão Monte Carlo (Deck Padrão 40 Cartas)</span>
          </div>

          <div className={styles.controlRow}>
            <div className={styles.iterPicker}>
              <label>Número de Mãos a Simular:</label>
              <select 
                value={iterations} 
                onChange={e => setIterations(Number(e.target.value))}
                className={styles.select}
              >
                <option value={100}>100 Mãos</option>
                <option value={1000}>1.000 Mãos</option>
                <option value={10000}>10.000 Mãos</option>
              </select>
            </div>

            <button className={styles.runBtn} onClick={runMonteCarlo}>
              <TrendingUp size={16} />
              <span>Executar Análise Estatística</span>
            </button>
          </div>

          {simResults && (
            <div className={styles.resultsGrid}>
              <div className={styles.resultBox}>
                <span className={styles.resLabel}>Pelo menos 1 Monstro na Mão</span>
                <span className={styles.resVal} style={{ color: '#35ba83' }}>{simResults.openedMonsterRate}%</span>
              </div>
              <div className={styles.resultBox}>
                <span className={styles.resLabel}>Pelo menos 1 Magia na Mão</span>
                <span className={styles.resVal} style={{ color: '#1778ff' }}>{simResults.openedSpellRate}%</span>
              </div>
              <div className={styles.resultBox}>
                <span className={styles.resLabel}>Pelo menos 1 Armadilha na Mão</span>
                <span className={styles.resVal} style={{ color: '#ff55a3' }}>{simResults.openedTrapRate}%</span>
              </div>
              <div className={styles.resultBox}>
                <span className={styles.resLabel}>Taxa de "Brick" (Mão Inutilizável)</span>
                <span className={styles.resVal} style={{ color: '#d9364a' }}>{simResults.brickRate}%</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
