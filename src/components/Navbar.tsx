import React from 'react';
import { 
  Sparkles, 
  Swords, 
  Layers, 
  Cpu, 
  BookOpen, 
  ShieldAlert, 
  Trophy, 
  Package, 
  BarChart2, 
  User 
} from 'lucide-react';
import styles from './Navbar.module.css';

export type NavTab = 
  | 'cardex' 
  | 'duel' 
  | 'deckforge' 
  | 'summonlab' 
  | 'archetypes' 
  | 'academy' 
  | 'campaign' 
  | 'vault' 
  | 'analytics' 
  | 'core';

interface NavbarProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onTabChange }) => {
  const navItems: Array<{ id: NavTab; label: string; icon: React.ReactNode }> = [
    { id: 'cardex', label: 'CardDex', icon: <Sparkles size={18} /> },
    { id: 'duel', label: 'Duel Arena', icon: <Swords size={18} /> },
    { id: 'deckforge', label: 'Deck Forge', icon: <Layers size={18} /> },
    { id: 'summonlab', label: 'Summon Lab', icon: <Cpu size={18} /> },
    { id: 'archetypes', label: 'Arquétipos', icon: <BookOpen size={18} /> },
    { id: 'academy', label: 'Academia', icon: <ShieldAlert size={18} /> },
    { id: 'campaign', label: 'Campanha', icon: <Trophy size={18} /> },
    { id: 'vault', label: 'Card Vault', icon: <Package size={18} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart2 size={18} /> },
    { id: 'core', label: 'Duel Core', icon: <User size={18} /> }
  ];

  return (
    <header className={styles.header}>
      <div className={styles.brandContainer} onClick={() => onTabChange('cardex')}>
        <div className={styles.millenniumIcon}>👁️</div>
        <div>
          <h1 className={styles.brandTitle}>DUELVERSE</h1>
          <span className={styles.brandSub}>YU-GI-OH! WEB EXPERIENCE</span>
        </div>
      </div>

      <nav className={styles.navLinks}>
        {navItems.map(item => (
          <button
            key={item.id}
            className={`${styles.navButton} ${currentTab === item.id ? styles.active : ''}`}
            onClick={() => onTabChange(item.id)}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className={styles.authorBadge}>
        <span>Developed by <strong>luscaarmstrong</strong></span>
      </div>
    </header>
  );
};
