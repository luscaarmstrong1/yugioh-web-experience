import React, { useState } from 'react';
import { Trophy, ChevronRight, Lock, CheckCircle, Swords, Play } from 'lucide-react';
import styles from './ShadowCampaign.module.css';

interface CampaignChapter {
  id: number;
  title: string;
  region: string;
  bossName: string;
  bossDeck: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Lendário';
  reward: string;
  unlocked: boolean;
  completed: boolean;
}

const CHAPTERS: CampaignChapter[] = [
  {
    id: 1,
    title: 'Capítulo 1: O Despertar na Cidade dos Duelistas',
    region: 'Cidade KaibaTech / Praça Central',
    bossName: 'Duelista Novato Ken',
    bossDeck: 'Guerreiros de Aço',
    difficulty: 'Iniciante',
    reward: 'Avatar de Duelista Iniciante + 500 DP',
    unlocked: true,
    completed: true
  },
  {
    id: 2,
    title: 'Capítulo 2: Os Segredos da Academia Arcana',
    region: 'Torre de Feitiçaria dos Magos',
    bossName: 'Instrutora Selene',
    bossDeck: 'Ordem dos Feiticeiros',
    difficulty: 'Intermediário',
    reward: 'Arena Desbloqueada: Templo do Faraó',
    unlocked: true,
    completed: false
  },
  {
    id: 3,
    title: 'Capítulo 3: Sobrecarga no Distrito Tecnológico',
    region: 'Complexo Cyberse Neo-Domino',
    bossName: 'Hacker Vector',
    bossDeck: 'Protocolo de Co-Link',
    difficulty: 'Intermediário',
    reward: 'Carta Holográfica Rara',
    unlocked: false,
    completed: false
  },
  {
    id: 4,
    title: 'Capítulo 4: Ecos nas Ruínas do Antigo Reino',
    region: 'Deserto Místico dos Faraós',
    bossName: 'Guardião Anúbis',
    bossDeck: 'Múmias e Julgamento',
    difficulty: 'Avançado',
    reward: 'Moldura Dourada do Milênio',
    unlocked: false,
    completed: false
  },
  {
    id: 5,
    title: 'Capítulo 5: O Portal da Dimensão das Sombras',
    region: 'Vórtice do Vazio Noturno',
    bossName: 'Sombra do Faraó Negro',
    bossDeck: 'Dragões do Abismo',
    difficulty: 'Lendário',
    reward: 'Arena Desbloqueada: Reino das Sombras',
    unlocked: false,
    completed: false
  },
  {
    id: 6,
    title: 'Capítulo 6: Grande Torneio dos Campeões Mundiais',
    region: 'Coliseu dos Deuses Celestes',
    bossName: 'Grande Mestre Kaiba',
    bossDeck: 'Supremacia dos Olhos Azuis Definitiva',
    difficulty: 'Lendário',
    reward: 'Troféu Supremo DUELVERSE',
    unlocked: false,
    completed: false
  }
];

export const ShadowCampaign: React.FC<{ onStartDuel: () => void }> = ({ onStartDuel }) => {
  const [selectedChapter, setSelectedChapter] = useState(CHAPTERS[1]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Trophy size={24} color="#d9ad56" />
        <div>
          <h2 className={styles.title}>SHADOW CAMPAIGN</h2>
          <p className={styles.sub}>Campanha Individual de RPG de Duelos — 6 Capítulos Épicos</p>
        </div>
      </div>

      <div className={styles.campaignLayout}>
        {/* Chapters timeline list */}
        <div className={styles.chapterList}>
          {CHAPTERS.map(ch => (
            <div
              key={ch.id}
              className={`${styles.chapterCard} ${selectedChapter.id === ch.id ? styles.activeChapter : ''} ${!ch.unlocked ? styles.locked : ''}`}
              onClick={() => ch.unlocked && setSelectedChapter(ch)}
            >
              <div className={styles.cardTop}>
                <span className={styles.chNumber}>CAP. {ch.id}</span>
                {ch.completed ? (
                  <span className={styles.completedTag}><CheckCircle size={12} /> Concluído</span>
                ) : !ch.unlocked ? (
                  <span className={styles.lockedTag}><Lock size={12} /> Bloqueado</span>
                ) : (
                  <span className={styles.readyTag}>Disponível</span>
                )}
              </div>
              <div className={styles.chTitle}>{ch.title}</div>
              <div className={styles.chBoss}>Oponente: {ch.bossName}</div>
            </div>
          ))}
        </div>

        {/* Selected Chapter Details */}
        <div className={styles.detailsPanel}>
          <div className={styles.panelContent}>
            <div className={styles.badgeRow}>
              <span className={styles.difficultyBadge}>{selectedChapter.difficulty}</span>
              <span className={styles.regionBadge}>{selectedChapter.region}</span>
            </div>

            <h3 className={styles.bossHeadline}>{selectedChapter.bossName}</h3>
            <div className={styles.deckName}>Deck: {selectedChapter.bossDeck}</div>

            <div className={styles.rewardBox}>
              <span className={styles.rewardLabel}>Recompensa por Vitória:</span>
              <span className={styles.rewardText}>🏆 {selectedChapter.reward}</span>
            </div>

            <button className={styles.startDuelBtn} onClick={onStartDuel}>
              <Swords size={18} />
              <span>INICIAR DUELO DESTE CAPÍTULO</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
