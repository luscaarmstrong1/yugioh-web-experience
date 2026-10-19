import React, { useState } from 'react';
import { YugiohCard, DeckData } from '../types';
import { INITIAL_FEATURED_CARDS, PRESET_DECKS } from '../data/cards';
import { HoloCard } from '../components/HoloCard';
import { 
  Plus, 
  Trash2, 
  Download, 
  Upload, 
  PieChart, 
  Dices, 
  CheckCircle2, 
  AlertCircle, 
  Save, 
  Copy 
} from 'lucide-react';
import styles from './DeckForge.module.css';

export const DeckForge: React.FC = () => {
  const [currentDeck, setCurrentDeck] = useState<DeckData>({
    id: 'custom-deck-1',
    name: 'Meu Deck Personalizado',
    format: 'TCG Advanced',
    mainDeck: [
      INITIAL_FEATURED_CARDS[0],
      INITIAL_FEATURED_CARDS[1],
      INITIAL_FEATURED_CARDS[3],
      INITIAL_FEATURED_CARDS[10],
      INITIAL_FEATURED_CARDS[11]
    ],
    extraDeck: [
      INITIAL_FEATURED_CARDS[17]
    ],
    sideDeck: [],
    updatedAt: new Date().toISOString()
  });

  const [testHand, setTestHand] = useState<YugiohCard[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<'TCG Advanced' | 'Master Duel' | 'GOAT' | 'Genesys'>('TCG Advanced');

  // Add card to main or extra
  const addCardToDeck = (card: YugiohCard) => {
    const isExtra = card.type.includes('Fusion') || card.type.includes('Synchro') || card.type.includes('XYZ') || card.type.includes('Link');
    if (isExtra) {
      if (currentDeck.extraDeck.length >= 15) return;
      setCurrentDeck({
        ...currentDeck,
        extraDeck: [...currentDeck.extraDeck, card]
      });
    } else {
      if (currentDeck.mainDeck.length >= 60) return;
      setCurrentDeck({
        ...currentDeck,
        mainDeck: [...currentDeck.mainDeck, card]
      });
    }
  };

  const removeMainCard = (index: number) => {
    const copy = [...currentDeck.mainDeck];
    copy.splice(index, 1);
    setCurrentDeck({ ...currentDeck, mainDeck: copy });
  };

  const removeExtraCard = (index: number) => {
    const copy = [...currentDeck.extraDeck];
    copy.splice(index, 1);
    setCurrentDeck({ ...currentDeck, extraDeck: copy });
  };

  // Test Hand draw 5 random cards
  const drawSampleHand = () => {
    if (currentDeck.mainDeck.length === 0) return;
    const shuffled = [...currentDeck.mainDeck].sort(() => Math.random() - 0.5);
    setTestHand(shuffled.slice(0, 5));
  };

  // Export .YDK file
  const exportYdk = () => {
    let content = '#created by luscaarmstrong - DUELVERSE\n#main\n';
    currentDeck.mainDeck.forEach(c => {
      content += `${c.id}\n`;
    });
    content += '#extra\n';
    currentDeck.extraDeck.forEach(c => {
      content += `${c.id}\n`;
    });
    content += '!side\n';
    currentDeck.sideDeck.forEach(c => {
      content += `${c.id}\n`;
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentDeck.name.replace(/\s+/g, '_')}.ydk`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const monstersCount = currentDeck.mainDeck.filter(c => c.type.includes('Monster')).length;
  const spellsCount = currentDeck.mainDeck.filter(c => c.type.includes('Spell')).length;
  const trapsCount = currentDeck.mainDeck.filter(c => c.type.includes('Trap')).length;
  const isLegal = currentDeck.mainDeck.length >= 40 && currentDeck.mainDeck.length <= 60;

  return (
    <div className={styles.container}>
      {/* Deck Header & Actions */}
      <div className={styles.header}>
        <div className={styles.deckNameBox}>
          <input
            type="text"
            value={currentDeck.name}
            onChange={e => setCurrentDeck({ ...currentDeck, name: e.target.value })}
            className={styles.deckNameInput}
          />
          <select
            value={selectedFormat}
            onChange={e => setSelectedFormat(e.target.value as any)}
            className={styles.formatSelect}
          >
            <option value="TCG Advanced">TCG Advanced (Padrão)</option>
            <option value="Master Duel">Master Duel</option>
            <option value="GOAT">Formato GOAT (2005)</option>
            <option value="Genesys">Genesys Points System</option>
          </select>
        </div>

        <div className={styles.actions}>
          <button className={styles.actionBtn} onClick={drawSampleHand}>
            <Dices size={16} />
            <span>Simular Mão Inicial</span>
          </button>
          <button className={styles.actionBtn} onClick={exportYdk}>
            <Download size={16} />
            <span>Exportar .YDK</span>
          </button>
        </div>
      </div>

      <div className={styles.mainGrid}>
        {/* Available Cards Catalogue */}
        <section className={styles.catalogueSection}>
          <div className={styles.sectionHeader}>
            <span>Catálogo de Cartas (Clique para Adicionar)</span>
          </div>
          <div className={styles.cardsCatalogue}>
            {INITIAL_FEATURED_CARDS.map(card => (
              <div 
                key={card.id} 
                className={styles.catalogueCardItem}
                onClick={() => addCardToDeck(card)}
              >
                <HoloCard card={card} size="sm" isHoverable={false} />
                <div className={styles.addOverlay}>
                  <Plus size={20} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Deck Board Area */}
        <section className={styles.deckBoard}>
          {/* Main Deck */}
          <div className={styles.deckCategoryHeader}>
            <div className={styles.categoryTitle}>
              <span>Main Deck ({currentDeck.mainDeck.length}/60)</span>
              {isLegal ? (
                <span className={styles.legalBadge}><CheckCircle2 size={14} /> Válido</span>
              ) : (
                <span className={styles.illegalBadge}><AlertCircle size={14} /> Mínimo 40 cartas</span>
              )}
            </div>

            <div className={styles.statsRatios}>
              <span className={styles.monsterRatio}>👾 {monstersCount} Monstros</span>
              <span className={styles.spellRatio}>🔮 {spellsCount} Magias</span>
              <span className={styles.trapRatio}>🛡️ {trapsCount} Armadilhas</span>
            </div>
          </div>

          <div className={styles.cardSlotsContainer}>
            {currentDeck.mainDeck.map((card, idx) => (
              <div key={idx} className={styles.deckSlot} onClick={() => removeMainCard(idx)}>
                <HoloCard card={card} size="sm" isHoverable={false} />
                <div className={styles.removeIcon}>
                  <Trash2 size={16} />
                </div>
              </div>
            ))}
          </div>

          {/* Extra Deck */}
          <div className={styles.deckCategoryHeader}>
            <div className={styles.categoryTitle}>
              <span>Extra Deck ({currentDeck.extraDeck.length}/15)</span>
            </div>
          </div>

          <div className={styles.cardSlotsContainer}>
            {currentDeck.extraDeck.map((card, idx) => (
              <div key={idx} className={styles.deckSlot} onClick={() => removeExtraCard(idx)}>
                <HoloCard card={card} size="sm" isHoverable={false} />
                <div className={styles.removeIcon}>
                  <Trash2 size={16} />
                </div>
              </div>
            ))}
          </div>

          {/* Hand Simulator Preview */}
          {testHand.length > 0 && (
            <div className={styles.testHandSection}>
              <div className={styles.handHeader}>
                <Dices size={16} color="#00d5ff" />
                <span>Simulação de Mão Inicial (5 Cartas)</span>
              </div>
              <div className={styles.handCardsRow}>
                {testHand.map((c, i) => (
                  <HoloCard key={i} card={c} size="md" />
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
