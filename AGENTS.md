# Sobre o Projeto

Daratrine - A Origem e um RPG em desenvolvimento no RPG Maker MZ com combate turn-based tatico (ATB). O projeto usa plugins do VisuStella (Battle Core, ATB, Skills & States Core, TP System, State Tooltips) como base do combate, TypeScript com Clean Architecture para logica de negocio, e plugins customizados em JS. Sistema de combate estruturado em 3 eixos: Efeito (Battle Core), Tempo (ATB) e Recurso (TP System). Quatro personagens jogaveis (Filena, Kilin, Mhordred, Thorin) com identidades mecanicas distintas e sinergias de time.

# Estrutura de Pastas

## projectX/scripts

Scripts auxiliares para analise de mapa, conversao de common events para XML, busca de variaveis/switches livres e deteccao de assets nao utilizados. Detalhes em `scripts/CLAUDE.md` (futuro).

## projectX/Obsidian

Base de conhecimento narrativa e worldbuilding do universo de Daratrine. Contem anotacoes gerais, lore e imagens de referencia. Detalhes em `Obsidian/CLAUDE.md` (futuro).

## projectX/frontend

Codigo-fonte do jogo em RPG Maker MZ. TypeScript (Clean Architecture: domain, application, dto, adapters, infrastructure), plugins JS compilados, testes Jest, dados JSON do jogo e assets. Detalhes em `frontend/CLAUDE.md` (futuro).

## projectX/docs

Documentacao de design: GDD com diretrizes de combate, balanceamento e design de skills; definicoes de quests; e documentacao de integracao RPG Maker MZ para IAs. Detalhes em `docs/CLAUDE.md` (futuro).

# Configuracoes Globais dos Plugins VisuStella

Configuracoes que afetam todo o sistema de combate e devem ser consideradas em decisoes de design:

- **Damage Style: MOBA** (BattleCore) - Formula: `formula * ATK * (100 / (100 + DEF))`. O campo "formula" do RPG Maker funciona como multiplicador
- **Critical Base Multiplier: 2.0** (BattleCore) - Modificavel via notetags `<MODIFY CRITICAL MULTIPLIER>`, `<ALWAYS CRITICAL>`
- **Guard: 50% reducao** (BattleCore) - Bypassavel com notetag `<UNBLOCKABLE>`
- **Buff/Debuff: max 2 stacks, 25% por stack** (SkillsStatesCore) - Cada stack de buff/debuff altera o parametro em 25%
- **ATB Speed: `sqrt(agi) + 1`** (BattleSystemATB) - Determina velocidade de enchimento do gauge
- **Cast Time: `sqrt(|speed|) / speed`** (BattleSystemATB) - Skills com speed negativo tem cast time proporcional
- **Stuns resetam o gauge ATB** (BattleSystemATB)
- **TP Modes por personagem** (EnhancedTpSystem): Momentum (Filena), Guarda (Kilin), Furia (Mhordred), Foco (Thorin), Boss (inimigos). Cada modo define MaxTP, TCR, Preserve ON/OFF, Regen e formulas de geracao

# Documentacao de Referencia

- `docs/GDD/6-combate/FUNDAMENTOS-COMBAT-SYSTEM.md` - Principios do sistema de combate: filosofia, identidade dos personagens, loop central, balanceamento macro e design de inimigos
- `docs/GDD/6-combate/DIRETRIZES-DESIGN-COMBAT-SYSTEM.md` - Diretrizes praticas para criacao e balanceamento de skills, kits de personagem e sinergias
- `docs/GDD/6-combate/CLASSIFICACAO-MODIFICADORES.md` - Sistema de score numerico para classificacao e balanceamento de modificadores de skills nos 3 eixos do combate
