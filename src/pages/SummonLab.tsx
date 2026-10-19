import React, { useState } from 'react';
import { HoloCard } from '../components/HoloCard';
import { INITIAL_FEATURED_CARDS } from '../data/cards';
import { Sparkles, Play, CheckCircle, ArrowRight } from 'lucide-react';
import styles from './SummonLab.module.css';

interface SummonMethod {
  id: string;
  name: string;
  subtitle: string;
  desc: string;
  requirements: string[];
  animationColor: string;
  demoMonster: typeof INITIAL_FEATURED_CARDS[0];
  materials: typeof INITIAL_FEATURED_CARDS;
}

export const SummonLab: React.FC = () => {
  const methods: SummonMethod[] = [
    {
      id: 'fusion',
      name: 'Invocação-Fusão',
      subtitle: 'União Alquímica de Matérias',
      desc: 'Envia duas ou mais matérias especificadas da mão ou campo ao Cemitério usando Polimerização.',
      requirements: ['Card Mágico "Polimerização"', 'Monstros Matéria de Fusão corretos', 'Espaço na Zona de Monstros'],
      animationColor: '#7548D9',
      demoMonster: INITIAL_FEATURED_CARDS[17], // Blue-Eyes Ultimate Dragon
      materials: [INITIAL_FEATURED_CARDS[1], INITIAL_FEATURED_CARDS[1], INITIAL_FEATURED_CARDS[1]]
    },
    {
      id: 'synchro',
      name: 'Invocação-Sincro',
      subtitle: 'Sintonia Dimensional por Níveis',
      desc: 'Sincroniza exatamente 1 monstro Regulador (Tuner) com um ou mais não-Reguladores cujos níveis somados correspondam exatamente ao nível do monstro Sincro.',
      requirements: ['1 Regulador + 1+ Não-Reguladores', 'Soma exata de níveis (ex: 4 + 4 = 8)', 'Envio dos monstros ao Cemitério'],
      animationColor: '#35BA83',
      demoMonster: INITIAL_FEATURED_CARDS[7], // Stardust Dragon
      materials: [INITIAL_FEATURED_CARDS[0], INITIAL_FEATURED_CARDS[15]]
    },
    {
      id: 'xyz',
      name: 'Invocação-Xyz',
      subtitle: 'Superposição de Matérias Espaciais',
      desc: 'Sobrepõe dois ou mais monstros do mesmo nível no campo para abrir uma fenda estelar e invocar um monstro com Rank.',
      requirements: ['2 ou mais monstros do mesmo nível (ex: 2x Nível 4)', 'As matérias são colocadas embaixo da carta Xyz', 'Não vão para o Cemitério até serem desassociadas'],
      animationColor: '#1778FF',
      demoMonster: INITIAL_FEATURED_CARDS[8], // Utopia
      materials: [INITIAL_FEATURED_CARDS[3], INITIAL_FEATURED_CARDS[15]]
    },
    {
      id: 'link',
      name: 'Invocação-Link',
      subtitle: 'Conexão de Circuitos Digitais',
      desc: 'Envia monstros do campo ao Cemitério para ativar as Setas de Link na Zona de Monstros Adicional.',
      requirements: ['Monstros que atendam ao Link Rating', 'Invoca prioritariamente na Zona de Monstro Adicional', 'Desbloqueia zonas para onde as setas apontam'],
      animationColor: '#00D5FF',
      demoMonster: INITIAL_FEATURED_CARDS[9], // Decode Talker
      materials: [INITIAL_FEATURED_CARDS[3], INITIAL_FEATURED_CARDS[15]]
    }
  ];

  const [activeMethodId, setActiveMethodId] = useState(methods[0].id);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationSuccess, setSimulationSuccess] = useState(false);

  const current = methods.find(m => m.id === activeMethodId) || methods[0];

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulationSuccess(false);

    setTimeout(() => {
      setIsSimulating(false);
      setSimulationSuccess(true);
    }, 2200);
  };

  return (
    <div className={styles.container}>
      {/* Sidebar with Summon Methods */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Sparkles size={18} color="#d9ad56" />
          <span>Métodos de Invocação</span>
        </div>
        <div className={styles.methodsList}>
          {methods.map(m => (
            <button
              key={m.id}
              className={`${styles.methodBtn} ${activeMethodId === m.id ? styles.activeMethod : ''}`}
              onClick={() => {
                setActiveMethodId(m.id);
                setSimulationSuccess(false);
                setIsSimulating(false);
              }}
            >
              <div className={styles.methodName}>{m.name}</div>
              <div className={styles.methodSubtitle}>{m.subtitle}</div>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Educational Arena Stage */}
      <main className={styles.stage}>
        <div className={styles.stageHeader}>
          <h2 className={styles.title} style={{ color: current.animationColor }}>
            {current.name}
          </h2>
          <p className={styles.desc}>{current.desc}</p>
        </div>

        {/* Requirements check */}
        <div className={styles.reqBox}>
          <div className={styles.reqTitle}>Requisitos Oficiais da Regra:</div>
          <ul className={styles.reqList}>
            {current.requirements.map((req, idx) => (
              <li key={idx} className={styles.reqItem}>
                <CheckCircle size={14} color="#35ba83" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Simulation Workbench */}
        <div className={styles.workbench}>
          <div className={styles.materialsSide}>
            <div className={styles.benchLabel}>Matérias Necessárias no Campo:</div>
            <div className={styles.materialsRow}>
              {current.materials.map((mat, i) => (
                <div key={i} className={`${styles.materialSlot} ${isSimulating ? styles.materialAbsorbing : ''}`}>
                  <HoloCard card={mat} size="sm" isHoverable={false} />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.arrowCenter}>
            <button 
              className={styles.executeSummonBtn} 
              onClick={handleRunSimulation}
              disabled={isSimulating}
              style={{ background: current.animationColor }}
            >
              <Play size={16} />
              <span>{isSimulating ? 'Sintonizando Matérias...' : 'Executar Invocação'}</span>
            </button>
          </div>

          <div className={styles.resultSide}>
            <div className={styles.benchLabel}>Monstro Invocado no Campo:</div>
            <div className={styles.summonedSlot}>
              {simulationSuccess ? (
                <div className={styles.summonSuccessAnim}>
                  <HoloCard card={current.demoMonster} size="md" />
                  <div className={styles.summonBadge}>INVOCAÇÃO BEM-SUCEDIDA!</div>
                </div>
              ) : (
                <div className={styles.waitingSlot}>
                  <span>Aguardando canalização de energia...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
