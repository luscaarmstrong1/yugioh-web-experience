import React, { useState, useEffect, useMemo } from 'react';
import { YugiohCard } from '../types';
import { CardApiService } from '../services/cardApi';
import { HoloCard } from '../components/HoloCard';
import { Search, Filter, Shield, Zap, Sparkles, Layers, SlidersHorizontal } from 'lucide-react';
import styles from './CardDex.module.css';

export const CardDex: React.FC = () => {
  const [cards, setCards] = useState<YugiohCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedAttribute, setSelectedAttribute] = useState('All');
  const [selectedArchetype, setSelectedArchetype] = useState('All');
  const [selectedCard, setSelectedCard] = useState<YugiohCard | null>(null);
  const [hologramMode, setHologramMode] = useState(false);

  useEffect(() => {
    async function loadCards() {
      setIsLoading(true);
      const data = await CardApiService.getAllCards();
      setCards(data);
      if (data.length > 0) {
        setSelectedCard(data[0]);
      }
      setIsLoading(false);
    }
    loadCards();
  }, []);

  const archetypes = useMemo(() => {
    const set = new Set<string>();
    cards.forEach(c => {
      if (c.archetype) set.add(c.archetype);
    });
    return ['All', ...Array.from(set).sort()];
  }, [cards]);

  const filteredCards = useMemo(() => {
    return cards.filter(c => {
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        const matches = 
          c.name.toLowerCase().includes(q) ||
          (c.name_pt && c.name_pt.toLowerCase().includes(q)) ||
          c.id.toString().includes(q);
        if (!matches) return false;
      }
      if (selectedType !== 'All') {
        if (!c.type.toLowerCase().includes(selectedType.toLowerCase())) return false;
      }
      if (selectedAttribute !== 'All') {
        if (c.attribute !== selectedAttribute) return false;
      }
      if (selectedArchetype !== 'All') {
        if (c.archetype !== selectedArchetype) return false;
      }
      return true;
    });
  }, [cards, searchTerm, selectedType, selectedAttribute, selectedArchetype]);

  return (
    <div className={styles.container}>
      {/* Top Search & Filter Bar */}
      <div className={styles.filterBar}>
        <div className={styles.searchBox}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar por nome da carta, tradução em PT ou ID..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filters}>
          <select 
            value={selectedType} 
            onChange={e => setSelectedType(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="All">Todos os Tipos</option>
            <option value="Normal">Monstro Normal</option>
            <option value="Effect">Monstro de Efeito</option>
            <option value="Fusion">Fusão</option>
            <option value="Synchro">Sincro</option>
            <option value="XYZ">Xyz</option>
            <option value="Link">Link</option>
            <option value="Spell">Magia</option>
            <option value="Trap">Armadilha</option>
          </select>

          <select 
            value={selectedAttribute} 
            onChange={e => setSelectedAttribute(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="All">Todos Atributos</option>
            <option value="DARK">DARK (Trevas)</option>
            <option value="LIGHT">LIGHT (Luz)</option>
            <option value="EARTH">EARTH (Terra)</option>
            <option value="WATER">WATER (Água)</option>
            <option value="FIRE">FIRE (Fogo)</option>
            <option value="WIND">WIND (Vento)</option>
            <option value="DIVINE">DIVINE (Divino)</option>
          </select>

          <select 
            value={selectedArchetype} 
            onChange={e => setSelectedArchetype(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="All">Todos os Arquétipos</option>
            {archetypes.filter(a => a !== 'All').map(arch => (
              <option key={arch} value={arch}>{arch}</option>
            ))}
          </select>

          <div className={styles.cardCounter}>
            <SlidersHorizontal size={14} />
            <span>{filteredCards.length} cartas encontradas</span>
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        {/* Gallery Grid */}
        <div className={styles.gridSection}>
          {isLoading ? (
            <div className={styles.loader}>
              <Sparkles className={styles.spinning} size={36} />
              <p>Carregando catálogo de cartas YGOPRODeck...</p>
            </div>
          ) : filteredCards.length === 0 ? (
            <div className={styles.emptyState}>
              <Shield size={48} />
              <p>Nenhuma carta encontrada com os filtros selecionados.</p>
            </div>
          ) : (
            <div className={styles.cardGrid}>
              {filteredCards.map(c => (
                <div
                  key={c.id}
                  className={`${styles.cardThumb} ${selectedCard?.id === c.id ? styles.selectedThumb : ''}`}
                  onClick={() => setSelectedCard(c)}
                >
                  <HoloCard card={c} size="md" showDetails={true} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Card Deep Inspect Panel */}
        {selectedCard && (
          <aside className={styles.inspectPanel}>
            <div className={styles.inspectHeader}>
              <div className={styles.typeTag}>{selectedCard.type}</div>
              {selectedCard.attribute && (
                <span className={styles.attributeBadge}>{selectedCard.attribute}</span>
              )}
            </div>

            <div className={styles.heroCardHolder}>
              <HoloCard card={selectedCard} size="lg" isHoverable={true} />
              <button 
                className={`${styles.hologramBtn} ${hologramMode ? styles.activeHolo : ''}`}
                onClick={() => setHologramMode(!hologramMode)}
              >
                <Zap size={16} />
                <span>{hologramMode ? 'Desativar Projeção' : 'Modo Holograma 2.5D'}</span>
              </button>
            </div>

            {hologramMode && (
              <div className={styles.hologramStage}>
                <div className={styles.holoCircle} />
                <div className={styles.holoPillar} />
                <div className={styles.holoText}>PROJEÇÃO DE MONSTRO ATIVA</div>
              </div>
            )}

            <div className={styles.detailsContent}>
              <h2 className={styles.cardTitle}>{selectedCard.name_pt || selectedCard.name}</h2>
              {selectedCard.name_pt && selectedCard.name_pt !== selectedCard.name && (
                <div className={styles.originalName}>Nome Original: {selectedCard.name}</div>
              )}

              {selectedCard.type.includes('Monster') && (
                <div className={styles.monsterAttributes}>
                  {selectedCard.level !== undefined && (
                    <div className={styles.statBox}>
                      <span className={styles.statLabel}>NÍVEL/RANK</span>
                      <span className={styles.statVal}>⭐ {selectedCard.level}</span>
                    </div>
                  )}
                  <div className={styles.statBox}>
                    <span className={styles.statLabel}>ATK</span>
                    <span className={styles.atkVal}>{selectedCard.atk ?? 0}</span>
                  </div>
                  <div className={styles.statBox}>
                    <span className={styles.statLabel}>DEF</span>
                    <span className={styles.defVal}>{selectedCard.def ?? 0}</span>
                  </div>
                </div>
              )}

              <div className={styles.descBox}>
                <div className={styles.descHeader}>
                  <Layers size={14} />
                  <span>Descrição / Efeito</span>
                </div>
                <p className={styles.cardDesc}>
                  {selectedCard.desc_pt || selectedCard.desc}
                </p>
              </div>

              {selectedCard.card_sets && selectedCard.card_sets.length > 0 && (
                <div className={styles.collectionsSection}>
                  <div className={styles.metaLabel}>Coleções & Raridade:</div>
                  <div className={styles.setTags}>
                    {selectedCard.card_sets.slice(0, 3).map((s, idx) => (
                      <span key={idx} className={styles.setChip}>
                        {s.set_code} - {s.set_rarity}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedCard.banlist_info && (
                <div className={styles.banlistSection}>
                  <div className={styles.metaLabel}>Status em Listas de Restrição:</div>
                  <div className={styles.banBadge}>
                    TCG: {selectedCard.banlist_info.ban_tcg || 'Sem restrições (3x)'}
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
