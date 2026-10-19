import { YugiohCard } from '../types';
import { INITIAL_FEATURED_CARDS } from '../data/cards';

const API_BASE_URL = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';
const CACHE_STORAGE_KEY = 'duelverse_cards_cache_v1';

export class CardApiService {
  private static memoryCache: YugiohCard[] | null = null;

  public static async getAllCards(): Promise<YugiohCard[]> {
    if (this.memoryCache && this.memoryCache.length > 500) {
      return this.memoryCache;
    }

    // Clear any previous small test cache from localStorage
    try {
      localStorage.removeItem(CACHE_STORAGE_KEY);
      localStorage.removeItem('duelverse_cards_cache');
    } catch {
      // ignore
    }

    try {
      // Fetch the full official dataset of 14,618 cards
      const res = await fetch(API_BASE_URL);
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const json = await res.json();
      if (json && Array.isArray(json.data) && json.data.length > 0) {
        const map = new Map<number, YugiohCard>();
        // Add our enhanced initial cards first
        INITIAL_FEATURED_CARDS.forEach(c => map.set(c.id, c));
        // Add all official cards
        (json.data as YugiohCard[]).forEach(c => {
          if (!map.has(c.id)) {
            map.set(c.id, c);
          }
        });

        const merged = Array.from(map.values());
        this.memoryCache = merged;
        return merged;
      }
    } catch (apiErr) {
      console.warn('API error fetching full catalog, trying backup', apiErr);
    }

    this.memoryCache = INITIAL_FEATURED_CARDS;
    return INITIAL_FEATURED_CARDS;
  }

  public static async searchCards(query: {
    name?: string;
    archetype?: string;
    type?: string;
    attribute?: string;
    level?: number;
  }): Promise<YugiohCard[]> {
    const all = await this.getAllCards();
    return all.filter(c => {
      if (query.name) {
        const q = query.name.toLowerCase();
        const matchesName = c.name.toLowerCase().includes(q) || (c.name_pt && c.name_pt.toLowerCase().includes(q));
        if (!matchesName) return false;
      }
      if (query.archetype && (!c.archetype || !c.archetype.toLowerCase().includes(query.archetype.toLowerCase()))) {
        return false;
      }
      if (query.type && !c.type.toLowerCase().includes(query.type.toLowerCase())) {
        return false;
      }
      if (query.attribute && c.attribute !== query.attribute) {
        return false;
      }
      if (query.level !== undefined && c.level !== query.level) {
        return false;
      }
      return true;
    });
  }

  public static getCardById(id: number, cards: YugiohCard[]): YugiohCard | undefined {
    return cards.find(c => c.id === id) || INITIAL_FEATURED_CARDS.find(c => c.id === id);
  }
}
