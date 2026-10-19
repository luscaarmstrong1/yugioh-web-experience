import { YugiohCard } from '../types';
import { INITIAL_FEATURED_CARDS } from '../data/cards';

const API_BASE_URL = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';
const CACHE_STORAGE_KEY = 'duelverse_cards_cache_v1';

export class CardApiService {
  private static memoryCache: YugiohCard[] | null = null;

  public static async getAllCards(): Promise<YugiohCard[]> {
    if (this.memoryCache && this.memoryCache.length > 0) {
      return this.memoryCache;
    }

    try {
      const cached = localStorage.getItem(CACHE_STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.memoryCache = parsed;
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read cached cards from storage', e);
    }

    try {
      // Fetch full official dataset (all 14,600+ cards)
      const res = await fetch(`${API_BASE_URL}`);
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const json = await res.json();
      if (json && Array.isArray(json.data)) {
        const map = new Map<number, YugiohCard>();
        INITIAL_FEATURED_CARDS.forEach(c => map.set(c.id, c));
        (json.data as YugiohCard[]).forEach(c => {
          if (!map.has(c.id)) {
            map.set(c.id, c);
          }
        });

        const merged = Array.from(map.values());
        this.memoryCache = merged;
        try {
          // Keep a quick local backup of the top cards
          localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(merged.slice(0, 50)));
        } catch {
          // ignore storage limit
        }
        return merged;
      }
    } catch (apiErr) {
      console.warn('Falling back to local curated card catalogue', apiErr);
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
