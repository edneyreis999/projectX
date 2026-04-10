# Major Changes - Battle Core

## Visão Geral

Este plugin sobrescreve partes do código base do RPG Maker MZ para garantir que o Battle Core funcione em capacidade total. Abaixo estão as explicações do que foi alterado.

## Action Sequences

### Mudança
Action sequences agora são feitas inteiramente pelo **Battle Log Window** ou através de **common events** se a notetag `<Custom Action Sequence>` for usada.

### Comportamento Padrão do RPG Maker MZ
No RPG Maker MZ padrão, Action Sequences seriam uma mistura usando:
- Battle Log Window
- Battle Manager
- Battle Scene

Isso torna difícil ter controle total da situação.

### Vantagem da Mudança
Controle completo sobre Action Sequences através de um canal centralizado (Battle Log Window ou Common Events).

## Action Speed

### Mudança
Random variance aplicada ao sistema de action speed foi **desabilitada por padrão**.

### Motivoção
A random variance torna a ordem de turnos extremamente caótica e difícil para o jogador determinar.

### Reabilitação
A random variance pode ser reabilitada através de:
```
Plugin Parameters => Mechanics Settings => Allow Random Speed?
```

## Animated Sideview Battler Support For Enemies

### Mudança
Inimigos podem agora usar **Sideview Actor sprites** para eles mesmos!

### Funcionalidades
- Comportam-se como actors
- Podem ter suas próprias armas para ataques físicos
- Devem ser configurados usando notetags

### Impacto no Código
Algumas mudanças foram feitas em `Sprite_Actor` para suportar ambos actors e enemies. Estas mudanças devem ter impacto mínimo em outros plugins.

### Consulte Também
- [Notetags: Animated Sideview Battler](../notetags/animated-sideview-battler.md)

## Battle Sprite Updates

### Mudança
Muitas funções em `Sprite_Battler`, `Sprite_Actor` e `Sprite_Enemy` foram sobrescritas.

### Funcionalidades Habilitadas
As mudanças tornam possível para sprites:
- Mover em qualquer lugar da tela
- Pular
- Flutuar
- Mudar visibilidade
- E mais...

### Propósito
Possibilitar o novo sistema de Action Sequence adicionado por este plugin.

## Change Battle Back in Battle

### Mudança
O event command **Change Battle Back** agora funciona **durante a batalha**.

### Comportamento Anterior
Por padrão, o Change Battle Back não funcionava em batalha. Configurações feitas refletiriam apenas na próxima batalha.

### Comportamento Atual
Se o battle back event command for usado durante batalha, mudanças são refletidas imediatamente.

## Critical Hit - LUK Influence

### Mudança 1: LUK Buffs e Critical Hit Rate
LUK Buffs agora afetam a critical hit rate baseado na nova fórmula:
- Cada stack de LUK Buff dobra a critical hit rate e compõe sobre isso
- x1 LUK Buff stack → dobra critical hit rate por x2
- x2 LUK Buff stack → dobra critical hit rate por x4
- x3 LUK Buff stack → dobra critical hit rate por x8
- E assim por diante...

### Mudança 2: LUK e Critical Damage
LUK também afeta quanto dano é dealt com critical hits:
- Default critical hit multiplier foi reduzido de x3 para x2
- Uma porcentagem de LUK é adicionada (baseado na CRI rate do user) ao dano finalizado
- Se a CRI rate do user for 4%, então 4% do valor LUK do user será adicionado ao dano

### Customização
Esta mudança pode ser alterada através de:
```
Plugin Parameters => Damage Settings => Critical Hits => JS: Rate Formula
Plugin Parameters => Damage Settings => Critical Hits => JS: Damage Formula
```

## Damage Popups

### Mudança 1: Formatação
Damage popups agora formatados com **+ e -** para determinar healing e damage:
- MP Damage inclui "MP" no final
- Torna mais claro o que cada variante colorida significa
- Ajuda jogadores com daltonismo a ler dados na tela

### Mudança 2: Múltiplos Damage Types
Damage popups foram reescritos para mostrar **todos os aspectos alterados** em vez de apenas um:
- Anteriormente: Se uma action dealt HP e MP damage, apenas um mostrava
- Agora: HP e MP changes são separados e mostrados ao mesmo tempo

## Dual Wielding

### Problema Anterior
RPG Maker MZ tinha "Dual Wielding" attack usando ambas weapon animations de uma vez, com ATK combinado de cada weapon. Confuso de visualizar e não retrata a natureza de "Dual Wielding".

### Mudança
Dual Wielding (ou Multi Wielding para terceiras e quartas armas) agora funciona diferente:
- Cada weapon é **exibida individualmente**
- Cada weapon produz sua **própria attack animation**
- Cada weapon mostra seu **weapon type**
- Aplica apenas **aquele weapon's ATK, Traits e efeitos relacionados**
- Não é mais um efeito combinado

### Comportamento com Slots Vazios
Se um actor tem múltiplos weapon slots mas alguns estão unequipped:
- A action trata o attack como single attack
- Não há barehanded attack adicionado
- Isso match a decisão do RPG Maker MZ de omitir segunda animation neste cenário

## Force Action

### Problema Anterior
Forced Actions interrompiam o meio de um evento para performar uma action. Com Action Sequences mais flexíveis, o sistema Force Action preexistente não poderia existir e precisaria ser refeito.

### Mudança
Forced Actions agora são adicionadas a uma **separate queue** da action battler list:
- Quando uma action e/ou common event é completada
- Se há um Forced Action battler queued
- O Forced Action battler terá seu turn

### Vantagens
- Método mais limpo
- Evita a maioria dos conflitos possíveis

### Impacto em Sequências Cinemáticas
Se planejava fazer cinematic sequences com Forced Actions, precisará **account para queued Force Actions**.

**Recomendação**: Para battle cinematics, use **Action Sequence Plugin Commands** ao invés, pois dão mais controle que qualquer Force Action jamais poderia.

## Random Scope

### Mudança
Skill e item targeting scopes para:
- Random Enemy
- 2 Random Enemies
- 3 Random Enemies
- 4 Random Enemies

Agora **ignoram TGR** (Target Rate) e utilizam **true randomness**.

## Spriteset_Battle Update

### Mudança
Spriteset agora tem **extra containers** para separar:
- Battlers (actors e enemies)
- Animations
- Damage

### Propósito
1. Tornar actors e enemy battler sprites mais eficientes para sort (se enabled)
2. Animções não interferem e cobrem damage sprites
3. Damage sprites são unaffected por screen tints
4. Player sempre terá clear read nas sprites de informação

## TPB/ATB Active Battle Actor Shifting

### Mudança
Pressionar cancel no Actor Command Window **não mais switch entre actors** com TPB/ATB gauge cheia antes de reaching Party Command Window.

### Propósito
1. Reduzir número de button presses para reaching Party Command Window
2. Prevenir motion resets e disrupting action sequences

### Aviso
Se esta feature é vital para seu battle system, recomendamos **não usar este plugin** ou qualquer dos plugins Battle Core-required.

## Weather Displayed in Battle

### Comportamento Anterior
Weather não era exibido em batalha. Efeitos de weather colocados no mapa não transferiam para batalha, causando disconnect para players.

### Mudança
Battle Core plugin adiciona weather effects para match as condições de weather do mapa:
- Weather effects do mapa são aplicados na batalha
- Mudanças feitas através de event commands midway através da batalha são refletidas

## Ver Também

- [Visão Geral](./visao-geral.md) - Introdução ao Battle Core
- [Parâmetros: Mechanics](../parametros/mechanics.md) - Configurações relacionadas
- [Parâmetros: Damage](../parametros/damage.md) - Configurações de damage
