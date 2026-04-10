# Glossário - Termos e Definições

## Overview

Termos técnicos e conceitos usados no sistema VisuStella MZ Active Turn Battle.

---

## Termos Principais

### ATB (Active Turn Battle)
Sistema de batalha em tempo real onde battlers têm ações determinadas pelo preenchimento de uma gauge. Diferente do Turn-based tradicional, todos battlers preenchem gauges simultaneamente.

### ATB Gauge
Barra de progresso de 0% a 100% que indica quando um battler pode agir. Quando chega a 100%, o battler pode selecionar uma ação.

### TPB (Time Progress Battle)
Sistema nativo do RPG Maker MZ que serve de base para o ATB. ATB modifica e expande o TPB.

### Battler
Qualquer participante ativo da batalha: actor ou enemy.

---

## Estados da Gauge

### Charging State
Estado normal de preenchimento da gauge.
- **Condição**: Skill/item com **speed ≥ 0**
- **Comportamento**: Gauge preenche de 0% → 100%
- **Cor**: Default Color (branco/amarelo)

### Casting State
Estado de preparação de uma skill.
- **Condição**: Skill/item com **speed < 0**
- **Comportamento**: Gauge diminui de 100% → 0%
- **Cor**: Cast Color (magenta/roxo)
- **Pode ser**: Interrompido

### Full State
Estado quando gauge está cheia.
- **Condição**: Gauge = **100%**
- **Comportamento**: Battler pode agir
- **Cor**: Full Color (verde)

### Stop State
Estado quando gauge não se move.
- **Condição**: Speed = **0**
- **Comportamento**: Gauge parada
- **Cor**: Stop Color (vermelho)

---

## Mecânicas

### Speed (Velocidade)
Valor que determina quão rápido a gauge se preenche.
- **Alto**: Gauge preenche rápido
- **Baixo**: Gauge preenche devagar
- **Negativo**: Cria casting state

### AGI (Agility)
Stat do battler que influencia a velocidade.
- **Alto**: Battler mais rápido
- **Baixo**: Battler mais lento

### AGI Rate
Comparação de AGI entre battlers.
- **< 1.0**: Mais lento que referência
- **= 1.0**: Igual à referência
- **> 1.0**: Mais rápido que referência

### Slow Rate
Threshold que determina quando um battler é considerado "Slow".
- Default: **0.8**
- Se AGI Rate ≤ 0.8 → battler é Slow

### Fast Rate
Threshold que determina quando um battler é considerado "Fast".
- Default: **1.2**
- Se AGI Rate ≥ 1.2 → battler é Fast

---

## Features Específicas

### Interrupt
Ação de cancelar uma skill em casting.
- **Efeito**: Casting cancelado, gauge reseta para 0%
- **Requisito**: Skill com notetag `<ATB Interrupt>`
- **Visual**: Animation, text popup, flash

### Cast Time
Tempo de preparação de uma skill com speed negativo.
- **Fórmula**: |Speed| frames
- **Exemplo**: Speed -1000 = 1000 frames (~16s)

### After Gauge
Valor da gauge após executar uma ação.
- **Fórmula**: Speed / 2000 (para speed positivo)
- **Exemplo**: Speed 1000 → 50% gauge

### Field Gauge
Gauge única mostrando todos os battlers simultaneamente.
- **Marcadores**: Indicam posição de cada battler
- **Posição**: Top/Bottom/Left/Right
- **Propósito**: Visão tática completa

---

## Componentes Técnicos

### Tier
Sistema de numeração que indica a ordem de carregamento de plugins.
- **Tier 0**: Core Engine (base)
- **Tier 1**: Battle Core (dependência)
- **Tier 2**: ATB (este plugin)
- **Regra**: Coloque em ordem numérica crescente

### Plugin Parameters
Configurações do plugin definidas no Plugin Manager.
- Alteram comportamento do plugin
- Podem ser JavaScript-based
- Aplicam-se globalmente

### Notetags
Tags especiais colocadas no database de skills, items, actors, etc.
- Format: `<TagName>` ou `<TagName: value>`
- Customizam comportamento específico
- Override Plugin Parameters

### Plugin Commands
Comandos usados em eventos para alterar configurações dinamicamente.
- Executados durante batalha
- Modificam comportamento temporariamente
- Reseta ao fim da batalha

---

## Abreviações

### AGI
Agility (Agilidade) - Stat que afeta velocidade

### HP
Health Points / Hit Points - Pontos de vida

### LUK
Luck (Sorte) - Stat que pode afetar várias mecânicas

### MP
Magic Points / Mana Points - Pontos de magia

### TP
Tactical Points - Pontos táticos (RPG Maker MV/MZ)

### JS
JavaScript - Linguagem de script usada em fórmulas

---

## Conceitos de Balanceamento

### Haste
Efeito que deixa battler mais rápido.
- **Implementação**: Speed positivo ou After Gauge modifier
- **Exemplo**: Skill com Speed 1000 (+50% gauge)

### Slow
Efeito que deixa battler mais lento.
- **Implementação**: After Gauge negativo
- **Exemplo**: State com -10% After Gauge

### Buff
Melhoria temporária de stats.
- **Exemplo**: State "Blessed" +20% AGI

### Debuff
Piora temporária de stats.
- **Exemplo**: State "Cursed" -10% AGI

### CC (Crowd Control)
Habilidades que controlam ou restringem battlers.
- **Exemplo**: Stun, Paralyze, Sleep
- **No ATB**: Podem resetar gauge

---

## Formatos e Sintaxes

### Hexadecimal Color
Formato de cor usando valores hexadecimais.
```
#rrggbb
#ff0000  // Vermelho
#00ff00  // Verde
#0000ff  // Azul
```

### Skin Color Number
Número correspondente a uma cor da Window Skin.
```
0 a 31
0       // Skin Color 0 (branco)
1       // Skin Color 1 (preto/escuro)
```

### JavaScript Formula
Código JavaScript para calcular valores dinâmicos.
```javascript
user.agi + user.level * 2
// Retorna valor numérico
```

---

## Terms Relacionados a VisuStella

### VisuStella MZ
Biblioteca de plugins para RPG Maker MZ criada pela VisuStella.

### Core Engine
Plugin base (Tier 0) que adiciona funcionalidades core ao RPG Maker MZ.

### Battle Core
Plugin (Tier 1) que expande o sistema de batalha.

### Options Core
Plugin que adiciona opções customizadas ao menu de opções.

---

## Consulte Também

- [Conceitos: Visão Geral](../conceitos/visao-geral.md) - Introdução ao ATB
- [Conceitos: Mecânica ATB](../conceitos/mecanica-atb.md) - Como funciona
- [Referência: Troubleshooting](troubleshooting.md) - Solução de problemas
