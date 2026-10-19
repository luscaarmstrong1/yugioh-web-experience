import React, { useState } from 'react';
import { ArchetypeSummary } from '../types';
import { BookOpen, Sparkles, Network, ArrowUpRight } from 'lucide-react';
import styles from './ArchetypeNexus.module.css';

const ARCHETYPES: ArchetypeSummary[] = [
  {
    name: 'Blue-Eyes',
    description: 'Arquétipo clássico centrado em dragões de Nível 8 de LUZ com alto ATK e invocações do Dragão Definitivo.',
    keyCards: [89631139, 63519819],
    playstyle: 'Agressivo / Beatdown / Fusão',
    bossMonsters: ['Dragão Branco de Olhos Azuis', 'Dragão Definitivo de Olhos Azuis'],
    synergyLevel: 94
  },
  {
    name: 'Dark Magician',
    description: 'Controle místico com suporte a magias rápidas, invocação de Feiticeira Negra e remoção pontual.',
    keyCards: [46986414, 38033121],
    playstyle: 'Controle de Magias / Ressurreição',
    bossMonsters: ['Mago Negro', 'Feiticeira Negra'],
    synergyLevel: 92
  },
  {
    name: 'Stardust / Sincro',
    description: 'Estratégia veloz de afunilamento de níveis para invocar dragões defensivos com negação de destruição.',
    keyCards: [44508094],
    playstyle: 'Combos Sincro / Proteção',
    bossMonsters: ['Dragão da Poeira Estelar'],
    synergyLevel: 88
  },
  {
    name: 'Utopia / Xyz',
    description: 'Formação de monstros Nível 4 para sobreposição Xyz com interrupção e negação de ataques oponentes.',
    keyCards: [84013237],
    playstyle: 'Defesa Tática / Xyz Rank 4',
    bossMonsters: ['Número 39: Utopia'],
    synergyLevel: 86
  },
  {
    name: 'Code Talker / Cyberse',
    description: 'Criação de cadeias de co-link na Zona de Monstro Adicional para amplificação exponencial de ATK.',
    keyCards: [1861629],
    playstyle: 'Enxame / Link Arrows Co-link',
    bossMonsters: ['Decodificar Transmissor'],
    synergyLevel: 90
  }
];

export const ArchetypeNexus: React.FC = () => {
  const [selectedArch, setSelectedArch] = useState<ArchetypeSummary>(ARCHETYPES[0]);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.topHeader}>
        <div>
          <h2 className={styles.title}>ARCHETYPE NEXUS</h2>
          <p className={styles.subtitle}>Enciclopédia de Estratégias, Grafos de Sinergia e Cartas Centrais</p>
        </div>
      </div>

      <div className={styles.nexusLayout}>
        {/* Archetypes List */}
        <aside className={styles.archList}>
          {ARCHETYPES.map(arch => (
            <div
              key={arch.name}
              className={`${styles.archCard} ${selectedArch.name === arch.name ? styles.activeArch : ''}`}
              onClick={() => setSelectedArch(arch)}
            >
              <div className={styles.archName}>{arch.name}</div>
              <div className={styles.archStyle}>{arch.playstyle}</div>
              <div className={styles.synergyBar}>
                <div className={styles.synergyFill} style={{ width: `${arch.synergyLevel}%` }} />
              </div>
            </div>
          ))}
        </aside>

        {/* Selected Archetype Deep Dive */}
        <main className={styles.archDetail}>
          <div className={styles.detailCard}>
            <div className={styles.archHead}>
              <h3>{selectedArch.name}</h3>
              <span className={styles.synergyScore}>Sinergia: {selectedArch.synergyLevel}%</span>
            </div>

            <p className={styles.desc}>{selectedArch.description}</p>

            <div className={styles.metaGrid}>
              <div className={styles.metaBox}>
                <span className={styles.label}>Estilo Primário</span>
                <span className={styles.val}>{selectedArch.playstyle}</span>
              </div>
              <div className={styles.metaBox}>
                <span className={styles.label}>Monstros Chefes</span>
                <span className={styles.val}>{selectedArch.bossMonsters.join(', ')}</span>
              </div>
            </div>

            {/* Synergy Graph Visual Simulation */}
            <div className={styles.synergyGraphBox}>
              <div className={styles.graphHeader}>
                <Network size={16} color="#00d5ff" />
                <span>Grafo de Sinergia e Conectividade do Arquétipo</span>
              </div>

              <div className={styles.graphCanvas}>
                <div className={styles.graphCoreNode}>
                  <span>{selectedArch.name} (Núcleo)</span>
                </div>
                <div className={styles.graphConnectors}>
                  {selectedArch.bossMonsters.map((boss, idx) => (
                    <div key={idx} className={styles.graphLeafNode}>
                      <span>{boss}</span>
                      <ArrowUpRight size={12} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
