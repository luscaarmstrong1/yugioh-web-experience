export interface DuelArenaInfo {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  themeColor: string;
  ambientLight: string;
  bgGradient: string;
  fieldGlow: string;
  lore: string;
}

export const DUEL_ARENAS: DuelArenaInfo[] = [
  {
    id: 'coliseum',
    name: 'Coliseu dos Duelistas',
    subtitle: 'Estádio Mundial de Batalhas',
    description: 'Arquibancadas lotadas, holofotes e tecnologia de projeção holográfica de arena profissional.',
    themeColor: '#1778FF',
    ambientLight: 'rgba(23, 120, 255, 0.25)',
    bgGradient: 'radial-gradient(circle at 50% 30%, #0d1e3d 0%, #060b18 80%)',
    fieldGlow: '0 0 40px rgba(23, 120, 255, 0.4)',
    lore: 'Onde campeões forjam lendas perante milhares de duelistas em êxtase.'
  },
  {
    id: 'pharaoh-temple',
    name: 'Templo do Faraó',
    subtitle: 'Santuário do Antigo Egito',
    description: 'Pilares milenares com hieróglifos ancestrais e o brilho sagrado dos Itens do Milênio.',
    themeColor: '#D9AD56',
    ambientLight: 'rgba(217, 173, 86, 0.25)',
    bgGradient: 'radial-gradient(circle at 50% 30%, #2a2010 0%, #0c0803 80%)',
    fieldGlow: '0 0 40px rgba(217, 173, 86, 0.4)',
    lore: 'As lages ancestrais onde os Jogos das Sombras nasceram há 5000 anos.'
  },
  {
    id: 'kaibatech-city',
    name: 'Cidade KaibaTech',
    subtitle: 'Metrópole Cibernética Neo Domino',
    description: 'Arranha-céus de fibra de carbono, redes neurais e hologramas de ultra-definição.',
    themeColor: '#00D5FF',
    ambientLight: 'rgba(0, 213, 255, 0.25)',
    bgGradient: 'radial-gradient(circle at 50% 30%, #062638 0%, #030d14 80%)',
    fieldGlow: '0 0 40px rgba(0, 213, 255, 0.45)',
    lore: 'Tecnologia de ponta desenvolvida para levar o duelo ao pico da evolução humana.'
  },
  {
    id: 'shadow-realm',
    name: 'Reino das Sombras',
    subtitle: 'Dimensão do Julgamento Noturno',
    description: 'Vórtices de névoa escura, runas violetas e energia arcana imersiva.',
    themeColor: '#7548D9',
    ambientLight: 'rgba(117, 72, 217, 0.3)',
    bgGradient: 'radial-gradient(circle at 50% 30%, #1f0d38 0%, #080310 80%)',
    fieldGlow: '0 0 45px rgba(117, 72, 217, 0.5)',
    lore: 'Apenas duelistas de coração resoluto escapam das garras das Sombras.'
  },
  {
    id: 'enchanted-forest',
    name: 'Floresta Encantada',
    subtitle: 'Clube dos Espíritos da Natureza',
    description: 'Focos de luz esmeralda entre árvores colossais e fadas guardiãs.',
    themeColor: '#35BA83',
    ambientLight: 'rgba(53, 186, 131, 0.25)',
    bgGradient: 'radial-gradient(circle at 50% 30%, #09261a 0%, #020d08 80%)',
    fieldGlow: '0 0 35px rgba(53, 186, 131, 0.4)',
    lore: 'Habitat de feras míticas e espíritos antigos que protegem o equilíbrio.'
  },
  {
    id: 'infernal-volcano',
    name: 'Vulcão Infernal',
    subtitle: 'Cratera de Magma Ardente',
    description: 'Lava incandescente, brasas ardentes e temperatura extrema nas linhas de duelo.',
    themeColor: '#D9364A',
    ambientLight: 'rgba(217, 54, 74, 0.3)',
    bgGradient: 'radial-gradient(circle at 50% 30%, #3b0e14 0%, #120305 80%)',
    fieldGlow: '0 0 45px rgba(217, 54, 74, 0.45)',
    lore: 'Forjado pelas chamas da destruição, onde cada ponto de dano arde como fogo vivo.'
  },
  {
    id: 'mystic-ocean',
    name: 'Oceano Místico',
    subtitle: 'Profundezas de Atlântida Submersa',
    description: 'Correntes bioluminescentes, ruínas marinhas e o reino dos monstros aquáticos.',
    themeColor: '#00A3FF',
    ambientLight: 'rgba(0, 163, 255, 0.25)',
    bgGradient: 'radial-gradient(circle at 50% 30%, #04243d 0%, #020c16 80%)',
    fieldGlow: '0 0 40px rgba(0, 163, 255, 0.4)',
    lore: 'Um santuário sob as ondas guardado por serpentes marinhas lendárias.'
  },
  {
    id: 'celestial-ruins',
    name: 'Ruínas Celestiais',
    subtitle: 'Plataforma Flutuante dos Céus',
    description: 'Colunas de mármore branco pairando sobre o manto de nuvens douradas.',
    themeColor: '#E6C075',
    ambientLight: 'rgba(230, 192, 117, 0.25)',
    bgGradient: 'radial-gradient(circle at 50% 30%, #2b2313 0%, #0d0a04 80%)',
    fieldGlow: '0 0 40px rgba(230, 192, 117, 0.4)',
    lore: 'Pairando além da atmosfera, onde os anjos e deuses antigos medem forças.'
  },
  {
    id: 'cyberse-lab',
    name: 'Laboratório Cyberse',
    subtitle: 'Matriz Virtual de Dados Puros',
    description: 'Redes neurais em malha hexagonal, fluxos de pulsos luminosos e links cibernéticos.',
    themeColor: '#00F0FF',
    ambientLight: 'rgba(0, 240, 255, 0.25)',
    bgGradient: 'radial-gradient(circle at 50% 30%, #04232c 0%, #010c10 80%)',
    fieldGlow: '0 0 40px rgba(0, 240, 255, 0.45)',
    lore: 'Onde o ciberespaço converge com os monstros Link em altíssima velocidade.'
  },
  {
    id: 'gods-arena',
    name: 'Arena dos Deuses',
    subtitle: 'Trono Monumental das Divindades Egípcias',
    description: 'Três obeliscos colossais iluminados por raios místicos das três Bestas Sagradas.',
    themeColor: '#FFAE00',
    ambientLight: 'rgba(255, 174, 0, 0.3)',
    bgGradient: 'radial-gradient(circle at 50% 30%, #362203 0%, #0f0900 80%)',
    fieldGlow: '0 0 55px rgba(255, 174, 0, 0.55)',
    lore: 'Apenas os duelistas mais extraordinários conseguem pisar diante do olhar das 3 Divindades.'
  }
];
