# Sobre a Pasta

Documentacao de design do projeto Daratrine. Organizada em 3 areas: GDD (Game Design Document), Quests (definicoes de quests do jogo) e rpg-maker-for-ia (documentacao tecnica de plugins VisuStella para IAs).

# Estrutura

## projectX/docs/GDD
Game Design Document com diretrizes de narrativa, mundo, combate, personagens e arte. Detalhes em `GDD/CLAUDE.md` (futuro).

- `/docs/GDD/1-fundacao-narrativa/` — Pilares narrativos e tom do jogo
- `/docs/GDD/2-world-building/` — Continentes, racas, locais e magia
  - `/docs/GDD/2-world-building/continentes/`
  - `/docs/GDD/2-world-building/locais/`
  - `/docs/GDD/2-world-building/racas/`
- `/docs/GDD/3-historia/` — Historia principal, jornada do jogador e timeline
- `/docs/GDD/4-personagens-inimigos-criaturas/` — Fichas de personagens e inimigos
  - `/docs/GDD/4-personagens-inimigos-criaturas/Personagens/`
  - `/docs/GDD/4-personagens-inimigos-criaturas/inimigos/`
- `/docs/GDD/5-arte/` — Documento de artstyle e diretrizes visuais
- `/docs/GDD/6-combate/` — Fundamentos, diretrizes e balanceamento do sistema de combate
  - `/docs/GDD/6-combate/inimigos/`
  - `/docs/GDD/6-combate/personagens/`
  - `/docs/GDD/6-combate/templates/`
- `/docs/GDD/templates/` — Templates reutilizaveis para GDD
  - `/docs/GDD/templates/cidades/`

## projectX/docs/Quests
Definicoes de quests do jogo com NSDs (Narrative Structure Documents), documentos tecnicos e fluxos de cenas. Numeracao sequencial reflete ordem narrativa. Detalhes em `Quests/CLAUDE.md` (futuro).

- `/docs/Quests/1-noite-da-historia/` — Quest introdutoria
- `/docs/Quests/2-semifinal/` — Quest da semifinal do torneio
- `/docs/Quests/3-fim-de-jogo/`
- `/docs/Quests/4-e-hora-de-crescer/`
- `/docs/Quests/5-primeiro-contrato/`
- `/docs/Quests/6-minerador-aprendiz/`
- `/docs/Quests/7-travessia-perigosa/`
- `/docs/Quests/8-travessia-toxica/`
- `/docs/Quests/9-ameaca-lupina/`
- `/docs/Quests/10-barganha-sigmetal/`
- `/docs/Quests/11-a-voz-do-conselho/`
- `/docs/Quests/12-quebra-do-selo-em-melios/`
- `/docs/Quests/13-quando-segundo-sol-chegar/` — Quest com variaveis de caminho (subpastas V_*)
  - `/docs/Quests/13-quando-segundo-sol-chegar/v_armadilhas/`
  - `/docs/Quests/13-quando-segundo-sol-chegar/V_forca_civil/`
  - `/docs/Quests/13-quando-segundo-sol-chegar/V_forca_guarda/`
  - `/docs/Quests/13-quando-segundo-sol-chegar/V_influencia_corvos/`
  - `/docs/Quests/13-quando-segundo-sol-chegar/V_sigmetal/`

## projectX/docs/rpg-maker-for-ia
Documentacao tecnica de plugins VisuStella e RPG Maker MZ, organizada para consumo por IAs. Inclui notetags, parametros, comandos e conceitos de cada plugin. Detalhes em `rpg-maker-for-ia/CLAUDE.md`.

- `/docs/rpg-maker-for-ia/docs-visustella/battle-plugins/` — Plugins de combate (Battle Core, ATB, Skills & States, TP System, Battle AI, Aggro)
- `/docs/rpg-maker-for-ia/docs-visustella/skill-plugins/` — Plugins de skills (Skill Learn, Skill Shop, Equip Passive)
- `/docs/rpg-maker-for-ia/docs-visustella/movement-plugins/` — Plugins de movimento (DragonBones Union)
- `/docs/rpg-maker-for-ia/docs-visustella/quality-of-life-plugins/` — Plugins utilitarios (Database Inherit, Items & Equips Core)
- `/docs/rpg-maker-for-ia/docs-visustella/visustella-core-engine/` — Core Engine (comandos, conceitos, notetags, parametros)
- `/docs/rpg-maker-for-ia/battle-core-action-sequence/` — Documentacao de Action Sequences e comandos
  - `/docs/rpg-maker-for-ia/battle-core-action-sequence/exemplos-action-sequence/`
- `/docs/rpg-maker-for-ia/catalogado/` — Documentacao catalogada com indices para navegacao

# Documentacao de Referencia

- `docs/GDD/GDD.geral.md` — Visao geral do GDD (premissa, enredo, mecanicas, personagens principais)
- `docs/GDD/GDD.Narrative-geral.md` — Visao geral da narrativa (estrutura temporal, personagens, espiritualidade, contexto politico)
- `docs/GDD/6-combate/FUNDAMENTOS-COMBAT-SYSTEM.md` — Fundamentos do sistema de combate
- `docs/GDD/6-combate/DIRETRIZES-DESIGN-COMBAT-SYSTEM.md` — Diretrizes de design do combate
- `docs/GDD/6-combate/CLASSIFICACAO-MODIFICADORES.md` — Classificacao de modificadores de combate
