# Visão Geral - Battle Core

## O que é o Battle Core?

O **Battle Core** plugin revampa completamente o engine de batalha fornecido pelo RPG Maker MZ, tornando-o mais flexível, streamlined e com suporte a uma variedade de features. O engine de batalha atualizado permite:

- **Action Sequences** customizáveis
- **Battle Layout styles** para mudar a aparência da batalha
- **Controle extensivo** sobre mecânicas de batalha

## Funcionalidades Principais

### Action Sequences
Action Sequence Plugin Commands dão controle total sobre o que acontece durante uma skill ou item. Isso permite criar sequências de ação complexas e customizadas.

### Battlers Animados
- **Animated Sideview Battler support para inimigos** - Inimigos podem usar sprites Sideview Actor
- Sprites se comportam como actors e podem ter suas próprias armas

### Auto Battle
Opções de Auto Battle para:
- Party-wide instâncias
- Actor-only instâncias

### Eventos de Batalha
- **Base Troop Events** para streamline eventos de todos os Troops
- Reduz trabalho de copy/paste

### Controle de Comandos
- **Battle Command control** para mudar quais comandos aparecem para actors
- **Party Command window** pode ser skipado/desabilitado

### Visual e Layout
- **Battle Layout styles** para mudar a aparência da cena de batalha
- **Weather effects** agora mostrados em batalha
- **Visual HP Gauges** acima de actors e/ou enemies

### Damage e Criticals
- **Critical Hit control** sobre fórmula de sucesso e multiplicadores
- **Custom target scopes** para skills e itens
- **Damage formula control**, incluindo Damage Styles
- **Damage caps** (hard caps e soft caps)
- **Damage traits** como Armor Penetration/Reduction

### Battle Log
- **Streamlined Battle Log** para remover informação redundante
- Melhora o flow de batalha

### Outras Features
- **Casting animation support** para skills
- **Elements & Status Menu Core support** para traits
- **Multitude de JavaScript notetags** e Plugin Parameters
- Efeitos variados durante batalha

## Requisitos

### Sistema
- **RPG Maker MZ** - Este plugin não funciona em outras versões do RPG Maker

### Plugins Obrigatórios
- **VisuMZ_0_CoreEngine** (Tier 0)

### Configuração de Plugin Manager
Este é um plugin **Tier 1**. Coloque-o após plugins de menor tier value (ie: 0, 1, 2, 3, 4, 5) no Plugin Manager para garantir melhor compatibilidade com a biblioteca VisuStella MZ.

## Ver Também

- [Major Changes](./major-changes.md) - Mudanças no código base do RPG Maker MZ
- [Base Troops](./base-troops.md) - Sistema de Base Troops
- [Damage Styles](./damage-styles.md) - Sistema de Damage Styles
- [Parâmetros: Mechanics](../parametros/mechanics.md) - Configurações de mecânicas
