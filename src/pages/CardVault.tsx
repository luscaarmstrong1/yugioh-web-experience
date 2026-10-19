import React, { useState } from 'react';
import { Package, Sparkles, Gift } from 'lucide-react';
import { INITIAL_FEATURED_CARDS } from '../data/cards';
import { HoloCard } from '../components/HoloCard';
import confetti from 'canvas-confetti';
import styles from './CardVault.module.css';

export const CardVault: React.FC = () => {
  const [openedPack, setOpenedPack] = useState<typeof INITIAL_FEATURED_CARDS | null>(null);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenPack = () => {
    setIsOpening(true);
    setOpenedPack(null);

    setTimeout(() => {
      // Pick 5 random cards
      const shuffled = [...INITIAL_FEATURED_CARDS].sort(() => Math.random() - 0.5);
      const pulled = shuffled.slice(0, 5);
      setOpenedPack(pulled);
      setIsOpening(false);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }, 1800);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Package size={24} color="#d9ad56" />
        <div>
          <h2 className={styles.title}>CARD VAULT & BOOSTER PACKS</h2>
          <p className={styles.sub}>Coleção Pessoal, Registro de Cartas e Simulador Gratuito de Pacotes Lendários</p>
        </div>
      </div>

      <div className={styles.content}>
        {/* Booster Pack Simulator Box */}
        <div className={styles.boosterSection}>
          <div className={styles.packDisplay}>
            <div className={styles.packCover}>
              <div className={styles.packEye}>👁️</div>
              <div className={styles.packTitle}>LEGEND OF BLUE EYES</div>
              <div className={styles.packBadge}>PACOTE VIRTUAL DE DEMONSTRAÇÃO</div>
            </div>
            <button 
              className={styles.openPackBtn} 
              onClick={handleOpenPack}
              disabled={isOpening}
            >
              <Gift size={16} />
              <span>{isOpening ? 'Rasgando Booster Foil...' : 'Abrir Pacote (5 Cartas)'}</span>
            </button>
          </div>

          {/* Cards Pulled Stage */}
          {openedPack && (
            <div className={styles.pulledStage}>
              <div className={styles.stageTitle}>
                <Sparkles size={16} color="#d9ad56" />
                <span>Cartas Obtidas neste Pacote:</span>
              </div>
              <div className={styles.cardsRow}>
                {openedPack.map((card, i) => (
                  <div key={i} className={styles.pulledCardAnim}>
                    <HoloCard card={card} size="md" showDetails={true} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
