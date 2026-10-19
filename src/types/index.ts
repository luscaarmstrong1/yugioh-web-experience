export type CardType = 
  | 'Normal Monster'
  | 'Effect Monster'
  | 'Ritual Monster'
  | 'Fusion Monster'
  | 'Synchro Monster'
  | 'XYZ Monster'
  | 'Pendulum Effect Monster'
  | 'Link Monster'
  | 'Spell Card'
  | 'Trap Card';

export type CardCategory = 'Monster' | 'Spell' | 'Trap';

export type CardAttribute = 'DARK' | 'LIGHT' | 'EARTH' | 'WATER' | 'FIRE' | 'WIND' | 'DIVINE';

export type SpellTrapProperty = 'Normal' | 'Continuous' | 'Equip' | 'Quick-Play' | 'Field' | 'Ritual' | 'Counter';

export interface CardPrice {
  cardmarket_price?: string;
  tcgplayer_price?: string;
  ebay_price?: string;
  amazon_price?: string;
}

export interface CardSet {
  set_name: string;
  set_code: string;
  set_rarity: string;
  set_price?: string;
}

export interface YugiohCard {
  id: number;
  name: string;
  name_pt?: string;
  type: string;
  frameType: string;
  desc: string;
  desc_pt?: string;
  atk?: number;
  def?: number;
  level?: number;
  race?: string; // Spellcaster, Dragon, Continuous, etc.
  attribute?: CardAttribute;
  archetype?: string;
  scale?: number;
  linkval?: number;
  linkmarkers?: string[];
  card_images: Array<{
    id: number;
    image_url: string;
    image_url_small: string;
    image_url_cropped: string;
  }>;
  card_sets?: CardSet[];
  card_prices?: CardPrice[];
  banlist_info?: {
    ban_tcg?: 'Banned' | 'Limited' | 'Semi-Limited';
    ban_ocg?: 'Banned' | 'Limited' | 'Semi-Limited';
    ban_goat?: 'Banned' | 'Limited' | 'Semi-Limited';
  };
}

export type DuelPhase = 'DP' | 'SP' | 'M1' | 'BP' | 'M2' | 'EP';

export type CardPosition = 'faceUpAttack' | 'faceUpDefense' | 'faceDownDefense' | 'faceDownSpellTrap' | 'faceUpSpellTrap';

export interface FieldSlot {
  id: string;
  card: YugiohCard | null;
  position: CardPosition;
  canAttack?: boolean;
  hasAttacked?: boolean;
  turnSummoned?: number;
  overlayMaterials?: YugiohCard[];
  counters?: number;
}

export interface PlayerState {
  id: string;
  name: string;
  avatar: string;
  lp: number;
  deck: YugiohCard[];
  hand: YugiohCard[];
  graveyard: YugiohCard[];
  banished: YugiohCard[];
  extraDeck: YugiohCard[];
  monsterZones: (FieldSlot | null)[]; // 5 zones
  spellTrapZones: (FieldSlot | null)[]; // 5 zones
  fieldSpellZone: FieldSlot | null;
  normalSummonAvailable: boolean;
}

export interface ChainLink {
  id: string;
  card: YugiohCard;
  playerId: string;
  spellSpeed: number; // 1, 2, or 3
  effectDescription: string;
  target?: any;
}

export interface DuelState {
  turn: number;
  activePlayerId: string;
  turnPlayerId: string;
  phase: DuelPhase;
  players: {
    player: PlayerState;
    opponent: PlayerState;
  };
  extraMonsterZones: [FieldSlot | null, FieldSlot | null];
  chain: ChainLink[];
  log: Array<{ id: string; text: string; type: 'info' | 'summon' | 'attack' | 'damage' | 'effect' | 'phase' }>;
  winner: 'player' | 'opponent' | null;
  arenaId: string;
}

export interface DeckData {
  id: string;
  name: string;
  description?: string;
  format: 'TCG Advanced' | 'Master Duel' | 'GOAT' | 'Speed Duel' | 'Genesys';
  coverCardId?: number;
  mainDeck: YugiohCard[];
  extraDeck: YugiohCard[];
  sideDeck: YugiohCard[];
  updatedAt: string;
  tags?: string[];
}

export interface ArchetypeSummary {
  name: string;
  description: string;
  keyCards: number[]; // card IDs
  playstyle: string;
  bossMonsters: string[];
  synergyLevel: number; // 1-100
}
