# VisuStella Skill Learn System - Visao Geral

## O Plugin

O **Skill Learn System** (Tier 2) e um plugin VisuStella MZ que permite aos atores aprender skills por meio de um menu dedicado dentro do menu de Skills do jogo, em vez de depender apenas de level-up.

## Recursos Principais

- Atores aprendem skills pelo comando "Learn" no menu de Skills
- Sistema de custos multiplos: Ability Points (AP), Skill Points (SP), Gold, Items, Weapons, Armors
- Dois recursos novos: **Ability Points** e **Skill Points** - moedas dedicadas ao aprendizado
- AP e SP podem ser adquiridos por: acoes em batalha, derrotar inimigos, level-up
- Sistema de requisitos para aprendizado: nivel minimo, skills pre-requisito, switches
- Sistema de condicoes de exibicao: skills podem ficar ocultas ate requisitos serem atendidos
- Animacoes personalizaveis ao aprender skills
- Suporte a JavaScript notetags para logica dinamica

## Requisitos

- RPG Maker MZ (nao funciona em outras versoes)
- Tier 2: deve ser colocado abaixo de plugins de tier inferior (0, 1) no Plugin Manager

## Integracoes com Outros Plugins

- **Class Change System** (VisuMZ_2_ClassChangeSystem): adiciona custos em CP (Class Points) e JP (Job Points)
- **Victory Aftermath** (VisuMZ_3_VictoryAftermath): exibe AP/SP ganhos na tela de vitoria
- **Battle Test**: skills aprendiveis ficam automaticamente disponiveis em battle tests

## Fluxo de Aprendizado

```
Menu de Skills → Comando "Learn" → Lista de Skills Aprendiveis
  → Verifica Condicoes de Exibicao (Show Conditions)
  → Verifica Condicoes de Requisito (Require Conditions)
  → Verifica Custos (AP, SP, Items, Gold, etc.)
  → Confirmacao → Animacao → Skill Aprendida
```

## Arquitetura de Dados

- **AP e SP** sao recursos por ator, opcionalmente compartilhados entre classes
- Skills aprendiveis sao definidas por **notetags nas Classes**
- Custos e requisitos sao definidos por **notetags nas Skills**
- Bonus de AP/SP sao definidos por notetags em Actor, Class, Weapon, Armor, State
