# REGRAS DO DUELO — ARQUITETURA DO SIMULADOR DUELVERSE

## 1. Estrutura do Campo (Master Rule & Speed Duel Adaptável)
- **Life Points (LP)**: 8000 por duelista.
- **Zonas do Campo**:
  - 5 Zonas de Monstros (Main Monster Zones)
  - 5 Zonas de Magias e Armadilhas (Spell & Trap Zones)
  - 1 Zona de Magia de Campo (Field Spell Zone)
  - Cemitério (Graveyard - GY) e Zona de Banimento
  - Deck Principal (Main Deck) e Deck Adicional (Extra Deck)

## 2. Fases Oficiais do Turno
1. **Draw Phase (DP)**: Compra de carta no início do turno (exceto primeiro turno do duelista 1).
2. **Standby Phase (SP)**: Manutenção e efeitos de ativação de início.
3. **Main Phase 1 (M1)**: Invocação Normal (1 por turno com verificação de tributos), Invocação Especial, Ativação e Posicionamento de Magias e Armadilhas.
4. **Battle Phase (BP)**: Não permitida no Turno 1 do jogador inicial. Declaração de ataques monstro x monstro ou diretos se não houver monstros no campo inimigo.
5. **Main Phase 2 (M2)**: Reorganização tática pós-combate.
6. **End Phase (EP)**: Resolução de efeitos de fim de turno e transferência de prioridade.

## 3. Sistema de Tributos
- **Nível 1 a 4**: Invocação Normal direta sem tributo.
- **Nível 5 a 6**: Exige 1 monstro no campo como tributo para o Cemitério.
- **Nível 7 ou mais**: Exige 2 monstros no campo como tributo.
- **Deuses Egípcios (Slifer, Obelisco, Rá)**: Exigem 3 tributos.

## 4. Resolução de Correntes (Chains - LIFO)
- Último efeito ativado resolve primeiro.
- Suporte a armadilhas de resposta rápida como Força do Espelho (Mirror Force) e Tufão Espacial Místico.
