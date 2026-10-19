# PESQUISA E ENGENHARIA REVERSA — DUELVERSE (YU-GI-OH! WEB EXPERIENCE)

## 1. Fonte de Dados e YGOPRODeck API v7
- Endpoint Base: `https://db.ygoprodeck.com/api/v7/cardinfo.php`
- Suporte a filtros:
  - `name`: busca textual por nome em inglês ou traduzido
  - `archetype`: agrupamento por arquétipos canônicos (ex: Blue-Eyes, Dark Magician, Elemental HERO)
  - `type`: categorização precisa de cartas (Normal, Effect, Fusion, Synchro, XYZ, Pendulum, Link, Spell, Trap)
  - `banlist`: restrições TCG, OCG e GOAT
- Política de Cache: implementação de snapshot local resiliente para evitar sobrecarga (respeitando limite de requisições e operando 100% offline via localStorage/fallback).

## 2. Direitos Autorais e Propriedade Intelectual
- Yu-Gi-Oh! e todos os designs de cartas e marcas associadas são propriedades exclusivas da Konami Digital Entertainment e de Kazuki Takahashi / Studio Dice / Shueisha / TV Tokyo.
- Este projeto é uma homenagem e aplicação web interativa sem fins comerciais para portfólio de engenharia de software e game design.
- O código da aplicação, arquitetura, design system e implementação do simulador são de autoria de **luscaarmstrong**.
