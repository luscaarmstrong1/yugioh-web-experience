import { YugiohCard } from '../types';

export const INITIAL_FEATURED_CARDS: YugiohCard[] = [
  {
    id: 46986414,
    name: "Dark Magician",
    name_pt: "Mago Negro",
    type: "Normal Monster",
    frameType: "normal",
    desc: "The ultimate wizard in terms of attack and defense.",
    desc_pt: "O mago definitivo em termos de ataque e defesa.",
    atk: 2500,
    def: 2100,
    level: 7,
    race: "Spellcaster",
    attribute: "DARK",
    archetype: "Dark Magician",
    card_images: [
      {
        id: 46986414,
        image_url: "https://images.ygoprodeck.com/images/cards/46986414.jpg",
        image_url_small: "https://images.ygoprodeck.com/images/cards_small/46986414.jpg",
        image_url_cropped: "https://images.ygoprodeck.com/images/cards_cropped/46986414.jpg"
      }
    ],
    card_sets: [{ set_name: "Legend of Blue Eyes White Dragon", set_code: "LOB-005", set_rarity: "Ultra Rare" }]
  },
  {
    id: 89631139,
    name: "Blue-Eyes White Dragon",
    name_pt: "Dragão Branco de Olhos Azuis",
    type: "Normal Monster",
    frameType: "normal",
    desc: "This legendary dragon is a powerful engine of destruction. Virtually invincible, very few have faced this awesome creature and lived to tell the tale.",
    desc_pt: "Este dragão lendário é uma poderosa máquina de destruição. Praticamente invencível, muito poucos enfrentaram esta incrível criatura e viveram para contar a história.",
    atk: 3000,
    def: 2500,
    level: 8,
    race: "Dragon",
    attribute: "LIGHT",
    archetype: "Blue-Eyes",
    card_images: [
      {
        id: 89631139,
        image_url: "https://images.ygoprodeck.com/images/cards/89631139.jpg",
        image_url_small: "https://images.ygoprodeck.com/images/cards_small/89631139.jpg",
        image_url_cropped: "https://images.ygoprodeck.com/images/cards_cropped/89631139.jpg"
      }
    ],
    card_sets: [{ set_name: "Legend of Blue Eyes White Dragon", set_code: "LOB-001", set_rarity: "Secret Rare" }]
  },
  {
    id: 74677422,
    name: "Red-Eyes Black Dragon",
    name_pt: "Dragão Negro de Olhos Vermelhos",
    type: "Normal Monster",
    frameType: "normal",
    desc: "A ferocious dragon with a deadly attack.",
    desc_pt: "Um dragão feroz com um ataque mortal.",
    atk: 2400,
    def: 2000,
    level: 7,
    race: "Dragon",
    attribute: "DARK",
    archetype: "Red-Eyes",
    card_images: [
      {
        id: 74677422,
        image_url: "https://images.ygoprodeck.com/images/cards/74677422.jpg",
        image_url_small: "https://images.ygoprodeck.com/images/cards_small/74677422.jpg",
        image_url_cropped: "https://images.ygoprodeck.com/images/cards_cropped/74677422.jpg"
      }
    ]
  },
  {
    id: 38033121,
    name: "Dark Magician Girl",
    name_pt: "Feiticeira Negra",
    type: "Effect Monster",
    frameType: "effect",
    desc: "Gains 300 ATK for every \"Dark Magician\" or \"Magician of Black Chaos\" in the GYs.",
    desc_pt: "Ganha 300 de ATK para cada \"Mago Negro\" ou \"Mago do Caos das Trevas\" nos Cemitérios.",
    atk: 2000,
    def: 1700,
    level: 6,
    race: "Spellcaster",
    attribute: "DARK",
    archetype: "Dark Magician",
    card_images: [
      {
        id: 38033121,
        image_url: "https://images.ygoprodeck.com/images/cards/38033121.jpg",
        image_url_small: "https://images.ygoprodeck.com/images/cards_small/38033121.jpg",
        image_url_cropped: "https://images.ygoprodeck.com/images/cards_cropped/38033121.jpg"
      }
    ]
  },
  {
    id: 10000000,
    name: "Slifer the Sky Dragon",
    name_pt: "Slifer, o Dragão Celeste",
    type: "Effect Monster",
    frameType: "effect",
    desc: "Requires 3 Tributes to Normal Summon. This card's Normal Summon cannot be negated. When Normal Summoned, spells, traps, and card effects cannot be activated. Gains 1000 ATK/DEF for each card in your hand.",
    desc_pt: "Requer 3 Tributos para Invocação-Normal. A Invocação-Normal deste card não pode ser negada. Ganha 1000 de ATK/DEF para cada card em sua mão.",
    atk: 0,
    def: 0,
    level: 10,
    race: "Divine-Beast",
    attribute: "DIVINE",
    card_images: [
      {
        id: 10000000,
        image_url: "https://images.ygoprodeck.com/images/cards/10000000.jpg",
        image_url_small: "https://images.ygoprodeck.com/images/cards_small/10000000.jpg",
        image_url_cropped: "https://images.ygoprodeck.com/images/cards_cropped/10000000.jpg"
      }
    ]
  },
  {
    id: 10000010,
    name: "Obelisk the Tormentor",
    name_pt: "Obelisco, o Atormentador",
    type: "Effect Monster",
    frameType: "effect",
    desc: "Requires 3 Tributes to Normal Summon. Cannot be targeted by Spells, Traps, or card effects. You can Tribute 2 monsters: Destroy all monsters your opponent controls.",
    desc_pt: "Requer 3 Tributos para Invocação-Normal. Não pode ser alvo de Magias, Armadilhas ou efeitos de cartas. Você pode Tributar 2 monstros: Destrua todos os monstros que seu oponente controla.",
    atk: 4000,
    def: 4000,
    level: 10,
    race: "Divine-Beast",
    attribute: "DIVINE",
    card_images: [
      {
        id: 10000010,
        image_url: "https://images.ygoprodeck.com/images/cards/10000010.jpg",
        image_url_small: "https://images.ygoprodeck.com/images/cards_small/10000010.jpg",
        image_url_cropped: "https://images.ygoprodeck.com/images/cards_cropped/10000010.jpg"
      }
    ]
  },
  {
    id: 10000020,
    name: "The Winged Dragon of Ra",
    name_pt: "O Dragão Alado de Rá",
    type: "Effect Monster",
    frameType: "effect",
    desc: "Cannot be Special Summoned. Requires 3 Tributes to Normal Summon. When Normal Summoned: You can pay LP so that you only have 100 left; this card gains ATK/DEF equal to the amount paid.",
    desc_pt: "Requer 3 Tributos para Invocação-Normal. Você pode pagar Pontos de Vida até restar apenas 100; este card ganha ATK/DEF igual ao montante pago.",
    atk: 0,
    def: 0,
    level: 10,
    race: "Divine-Beast",
    attribute: "DIVINE",
    card_images: [
      {
        id: 10000020,
        image_url: "https://images.ygoprodeck.com/images/cards/10000020.jpg",
        image_url_small: "https://images.ygoprodeck.com/images/cards_small/10000020.jpg",
        image_url_cropped: "https://images.ygoprodeck.com/images/cards_cropped/10000020.jpg"
      }
    ]
  },
  {
    id: 44508094,
    name: "Stardust Dragon",
    name_pt: "Dragão da Poeira Estelar",
    type: "Synchro Monster",
    frameType: "synchro",
    desc: "1 Tuner + 1+ non-Tuner monsters. During either player's turn, when a card or effect is activated that would destroy a card(s) on the field: You can Tribute this card; negate the activation, and if you do, destroy it.",
    desc_pt: "1 Regulador + 1+ monstros não-Reguladores. Durante o turno de qualquer duelista, quando um card ou efeito for ativado que destruiria um card no campo: Você pode Tributar este card; negue a ativação e, se isso acontecer, destrua-o.",
    atk: 2500,
    def: 2000,
    level: 8,
    race: "Dragon",
    attribute: "WIND",
    archetype: "Stardust",
    card_images: [
      {
        id: 44508094,
        image_url: "https://images.ygoprodeck.com/images/cards/44508094.jpg",
        image_url_small: "https://images.ygoprodeck.com/images/cards_small/44508094.jpg",
        image_url_cropped: "https://images.ygoprodeck.com/images/cards_cropped/44508094.jpg"
      }
    ]
  },
  {
    id: 84013237,
    name: "Number 39: Utopia",
    name_pt: "Número 39: Utopia",
    type: "XYZ Monster",
    frameType: "xyz",
    desc: "2 Level 4 monsters. When any player's monster declares an attack: You can detach 1 material from this card; negate the attack.",
    desc_pt: "2 monstros de Nível 4. Quando o monstro de qualquer duelista declarar um ataque: Você pode desassociar 1 matéria deste card; negue o ataque.",
    atk: 2500,
    def: 2000,
    level: 4,
    race: "Warrior",
    attribute: "LIGHT",
    archetype: "Utopia",
    card_images: [
      {
        id: 84013237,
        image_url: "https://images.ygoprodeck.com/images/cards/84013237.jpg",
        image_url_small: "https://images.ygoprodeck.com/images/cards_small/84013237.jpg",
        image_url_cropped: "https://images.ygoprodeck.com/images/cards_cropped/84013237.jpg"
      }
    ]
  },
  {
    id: 1861629,
    name: "Decode Talker",
    name_pt: "Decodificar Transmissor",
    type: "Link Monster",
    frameType: "link",
    desc: "2+ Effect Monsters. Gains 500 ATK for each monster it points to. When your opponent activates a card or effect that targets a card(s) you control (Quick Effect): You can Tribute 1 monster this card points to; negate the activation, and if you do, destroy that card.",
    desc_pt: "2+ Monstros de Efeito. Ganha 500 de ATK para cada monstro para o qual apontar.",
    atk: 2300,
    linkval: 3,
    linkmarkers: ["Top", "Bottom-Left", "Bottom-Right"],
    race: "Cyberse",
    attribute: "DARK",
    archetype: "Code Talker",
    card_images: [
      {
        id: 1861629,
        image_url: "https://images.ygoprodeck.com/images/cards/1861629.jpg",
        image_url_small: "https://images.ygoprodeck.com/images/cards_small/1861629.jpg",
        image_url_cropped: "https://images.ygoprodeck.com/images/cards_cropped/1861629.jpg"
      }
    ]
  },
  {
    id: 5318639,
    name: "Mystical Space Typhoon",
    name_pt: "Tufão Espacial Místico",
    type: "Spell Card",
    frameType: "spell",
    race: "Quick-Play",
    desc: "Target 1 Spell/Trap on the field; destroy that target.",
    desc_pt: "Escolha 1 Magia/Armadilha no campo; destrua o alvo.",
    card_images: [
      {
        id: 5318639,
        image_url: "https://images.ygoprodeck.com/images/cards/5318639.jpg",
        image_url_small: "https://images.ygoprodeck.com/images/cards_small/5318639.jpg",
        image_url_cropped: "https://images.ygoprodeck.com/images/cards_cropped/5318639.jpg"
      }
    ]
  },
  {
    id: 44095762,
    name: "Mirror Force",
    name_pt: "Força do Espelho",
    type: "Trap Card",
    frameType: "trap",
    race: "Normal",
    desc: "When an opponent's monster declares an attack: Destroy all Attack Position monsters your opponent controls.",
    desc_pt: "Quando um monstro do oponente declarar um ataque: Destrua todos os monstros em Posição de Ataque que seu oponente controla.",
    card_images: [
      {
        id: 44095762,
        image_url: "https://images.ygoprodeck.com/images/cards/44095762.jpg",
        image_url_small: "https://images.ygoprodeck.com/images/cards_small/44095762.jpg",
        image_url_cropped: "https://images.ygoprodeck.com/images/cards_cropped/44095762.jpg"
      }
    ]
  },
  {
    id: 72302403,
    name: "Swords of Revealing Light",
    name_pt: "Espadas da Luz Reveladora",
    type: "Spell Card",
    frameType: "spell",
    race: "Normal",
    desc: "After this card's activation, it remains on the field, but you must destroy it during the End Phase of your opponent's 3rd turn. Opponent's monsters cannot declare an attack.",
    desc_pt: "Monstros do oponente não podem declarar ataque por 3 turnos.",
    card_images: [
      {
        id: 72302403,
        image_url: "https://images.ygoprodeck.com/images/cards/72302403.jpg",
        image_url_small: "https://images.ygoprodeck.com/images/cards_small/72302403.jpg",
        image_url_cropped: "https://images.ygoprodeck.com/images/cards_cropped/72302403.jpg"
      }
    ]
  },
  {
    id: 83764718,
    name: "Monster Reborn",
    name_pt: "Ressurreição de Monstro",
    type: "Spell Card",
    frameType: "spell",
    race: "Normal",
    desc: "Target 1 monster in either GY; Special Summon it.",
    desc_pt: "Escolha 1 monstro em qualquer Cemitério; Invoque-o por Invocação-Especial.",
    card_images: [
      {
        id: 83764718,
        image_url: "https://images.ygoprodeck.com/images/cards/83764718.jpg",
        image_url_small: "https://images.ygoprodeck.com/images/cards_small/83764718.jpg",
        image_url_cropped: "https://images.ygoprodeck.com/images/cards_cropped/83764718.jpg"
      }
    ],
    banlist_info: {
      ban_tcg: "Limited",
      ban_ocg: "Limited"
    }
  },
  {
    id: 55144522,
    name: "Pot of Greed",
    name_pt: "Pote da Ganância",
    type: "Spell Card",
    frameType: "spell",
    race: "Normal",
    desc: "Draw 2 cards.",
    desc_pt: "Compre 2 cards.",
    card_images: [
      {
        id: 55144522,
        image_url: "https://images.ygoprodeck.com/images/cards/55144522.jpg",
        image_url_small: "https://images.ygoprodeck.com/images/cards_small/55144522.jpg",
        image_url_cropped: "https://images.ygoprodeck.com/images/cards_cropped/55144522.jpg"
      }
    ],
    banlist_info: {
      ban_tcg: "Banned",
      ban_ocg: "Banned",
      ban_goat: "Limited"
    }
  },
  {
    id: 33396948,
    name: "Exodia the Forbidden One",
    name_pt: "Exodia, \"O Proibido\"",
    type: "Effect Monster",
    frameType: "effect",
    desc: "If you have \"Right Leg of the Forbidden One\", \"Left Leg of the Forbidden One\", \"Right Arm of the Forbidden One\" and \"Left Arm of the Forbidden One\" in addition to this card in your hand, you win the Duel.",
    desc_pt: "Se você tiver este card e as 4 partes do Exodia em sua mão, você vence o Duelo automaticamente.",
    atk: 1000,
    def: 1000,
    level: 3,
    race: "Spellcaster",
    attribute: "DARK",
    card_images: [
      {
        id: 33396948,
        image_url: "https://images.ygoprodeck.com/images/cards/33396948.jpg",
        image_url_small: "https://images.ygoprodeck.com/images/cards_small/33396948.jpg",
        image_url_cropped: "https://images.ygoprodeck.com/images/cards_cropped/33396948.jpg"
      }
    ],
    banlist_info: {
      ban_tcg: "Limited"
    }
  },
  {
    id: 24094653,
    name: "Polymerization",
    name_pt: "Polimerização",
    type: "Spell Card",
    frameType: "spell",
    race: "Normal",
    desc: "Fusion Summon 1 Fusion Monster from your Extra Deck, using monsters from your hand or field as material.",
    desc_pt: "Invoque por Invocação-Fusão 1 Monstro de Fusão do seu Deck Adicional, usando monstros da sua mão ou campo como matéria.",
    card_images: [
      {
        id: 24094653,
        image_url: "https://images.ygoprodeck.com/images/cards/24094653.jpg",
        image_url_small: "https://images.ygoprodeck.com/images/cards_small/24094653.jpg",
        image_url_cropped: "https://images.ygoprodeck.com/images/cards_cropped/24094653.jpg"
      }
    ]
  },
  {
    id: 63519819,
    name: "Blue-Eyes Ultimate Dragon",
    name_pt: "Dragão Definitivo de Olhos Azuis",
    type: "Fusion Monster",
    frameType: "fusion",
    desc: "\"Blue-Eyes White Dragon\" + \"Blue-Eyes White Dragon\" + \"Blue-Eyes White Dragon\"",
    desc_pt: "\"Dragão Branco de Olhos Azuis\" + \"Dragão Branco de Olhos Azuis\" + \"Dragão Branco de Olhos Azuis\"",
    atk: 4500,
    def: 3800,
    level: 12,
    race: "Dragon",
    attribute: "LIGHT",
    archetype: "Blue-Eyes",
    card_images: [
      {
        id: 63519819,
        image_url: "https://images.ygoprodeck.com/images/cards/63519819.jpg",
        image_url_small: "https://images.ygoprodeck.com/images/cards_small/63519819.jpg",
        image_url_cropped: "https://images.ygoprodeck.com/images/cards_cropped/63519819.jpg"
      }
    ]
  },
  {
    id: 93717133,
    name: "Galaxy-Eyes Photon Dragon",
    name_pt: "Dragão de Fóton de Olhos das Galáxias",
    type: "Effect Monster",
    frameType: "effect",
    desc: "You can Special Summon this card (from your hand) by Tributing 2 monsters with 2000 or more ATK.",
    desc_pt: "Você pode Invocar este card por Invocação-Especial (da sua mão) ao Tributar 2 monstros com 2000 ou mais de ATK.",
    atk: 3000,
    def: 2500,
    level: 8,
    race: "Dragon",
    attribute: "LIGHT",
    archetype: "Galaxy-Eyes",
    card_images: [
      {
        id: 93717133,
        image_url: "https://images.ygoprodeck.com/images/cards/93717133.jpg",
        image_url_small: "https://images.ygoprodeck.com/images/cards_small/93717133.jpg",
        image_url_cropped: "https://images.ygoprodeck.com/images/cards_cropped/93717133.jpg"
      }
    ]
  },
  {
    id: 89943723,
    name: "Elemental HERO Neos",
    name_pt: "HERÓI do Elemento Neos",
    type: "Normal Monster",
    frameType: "normal",
    desc: "A new Elemental HERO has arrived from Neo-Space! When he initiates a Contact Fusion with a Neo-Spacian, his unknown powers are unleashed.",
    desc_pt: "Um novo HERÓI do Elemento chegou do Neo-Espaço!",
    atk: 2500,
    def: 2000,
    level: 7,
    race: "Warrior",
    attribute: "LIGHT",
    archetype: "Elemental HERO",
    card_images: [
      {
        id: 89943723,
        image_url: "https://images.ygoprodeck.com/images/cards/89943723.jpg",
        image_url_small: "https://images.ygoprodeck.com/images/cards_small/89943723.jpg",
        image_url_cropped: "https://images.ygoprodeck.com/images/cards_cropped/89943723.jpg"
      }
    ]
  }
];

export const PRESET_DECKS = [
  {
    id: 'deck-dark-magician',
    name: 'Mago Negro Clássico (Yugi Muto)',
    format: 'TCG Advanced' as const,
    coverCardId: 46986414,
    description: 'Deck focado na sinergia arcanista do Mago Negro com a Feiticeira Negra e magias de controle.',
    mainDeckIds: [
      46986414, 46986414, 46986414, 38033121, 38033121, 5318639, 5318639, 44095762, 44095762, 72302403, 83764718
    ],
    extraDeckIds: []
  },
  {
    id: 'deck-blue-eyes',
    name: 'Supremacia dos Olhos Azuis (Seto Kaiba)',
    format: 'TCG Advanced' as const,
    coverCardId: 89631139,
    description: 'Poder de destruição massivo com dragões de 3000 de ATK e fusão do Dragão Supremo.',
    mainDeckIds: [
      89631139, 89631139, 89631139, 24094653, 24094653, 5318639, 44095762, 83764718
    ],
    extraDeckIds: [
      63519819
    ]
  }
];
