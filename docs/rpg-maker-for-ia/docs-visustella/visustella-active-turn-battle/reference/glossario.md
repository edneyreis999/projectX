# Glossário

Termos técnicos e definições usados no sistema Active Turn Battle.

## A

### AGI
**Agility** (Agilidade). Estatística primária que determina a velocidade de enchimento das barras de ATB. Battlers com AGI maior ench suas barras mais rapidamente.

**Ver também**: [Mecânica de Agilidade](../conceitos/mecanica-agilidade.md)

### ATB
**Active Time Battle**. Sistema de batalha onde personagens e inimigos possuem barras de tempo que enchem continuamente. Quando a barra atinge 100%, o battler pode executar uma ação.

**Origem**: Popularizado pela série Final Fantasy

**Ver também**: [O que é ATB?](../conceitos/o-que-e-atb.md)

### Actor
Personagem jogável controlado pelo player ou pela IA (em modo auto).

## B

### Battler
Qualquer entidade que pode participar em batalha: Actors, Enemies, ou em alguns casos, outros combatentes.

## C

### Cast Time
Tempo necessário para conjurar uma habilidade com speed negativo. Durante o cast time, a barra de ATB diminui ao invés de aumentar.

**Notetag relacionado**: `<ATB Cast Gauge>`

**Ver também**: [Estados de Combate - Casting](../conceitos/estados-combate.md#casting)

### Charging
Estado onde a barra de ATB está enchendo (de 0% a 100%). Battlers em charging não podem agir até a barra atingir 100%.

**Antônimo**: Casting (para skills com speed negativo)

## E

### Escape Fail Penalty
Penalidade aplicada à gauge de ATB quando uma tentativa de fuga falha.

**Parâmetro**: Escape Fail Penalty

## F

### Field Gauge
Gauge de campo que mostra todos os battlers da batalha em uma única barra. Permite visualizar a ordem relativa de turnos.

**Ver também**: [Field Gauge Configuration](../configuration/field-gauge.md)

## G

### Gauge
Barra de progresso que mostra o quanto um battler está próximo de poder agir. Vai de 0% a 100%.

**Tipos**:
- ATB Gauge (individual)
- Field Gauge (campo com todos)

## I

### Interrupt
Interrupção de uma habilidade em casting. Quando um battler é interrompido, sua ação é cancelada e sua gauge reseta para 0%.

**Notetag**: `<ATB Interrupt>`

**Ver também**: [Interrupts Configuration](../configuration/interrupts.md)

## J

### JS Formula
Fórmula JavaScript usada para calcular comportamentos customizados do ATB (speed, acceleration, cast time, etc.).

**Ver também**: [Timing e Fórmulas](../configuration/timing-formulas.md)

## M

### Marker
Indicador visual no Field Gauge que representa a posição de um battler. Pode ser ícone, face, ou sprite.

## N

### Notetag
Tag especial colocada na caixa de "Notes" de database objects (Skills, Items, Actors, etc.) para adicionar funcionalidades customizadas.

**Ver também**: [Features](../features/)

## R

### Ready
Estado onde a gauge do battler atingiu 100%. O battler está pronto para selecionar e executar uma ação.

**Cor**: Full Color 1, 2

**Ver também**: [Estados de Combate](../conceitos/estados-combate.md#ready)

## S

### Slow Rate
Limiar de AGI rate abaixo do qual um battler é considerado "lento". Abaixo deste valor, a gauge usa cores "Slow".

**Parâmetro**: Slow Rate

**Ver também**: [ATB Gauge Configuration](../configuration/atb-gauge.md#configurações-de-agi)

### Speed
Valor que determina quão rápido a gauge de ATB enche. Calculado via fórmula JS baseado em AGI e outros fatores.

**Fórmula**: JS: Speed

**Ver também**: [Timing e Fórmulas](../configuration/timing-formulas.md)

### Stop
Estado onde a gauge do battler não enche nem diminui (velocidade zero). Geralmente causado por estados paralisantes.

**Cor**: Stop Color 1, 2

### Stun Reset Gauge
Configuração que determina se estados de stun (Stun, Charm, Berserk, Confusion) resetam a gauge para 0%.

**Parâmetro**: Stuns Reset Gauge?

## T

### TPB
**Time Progress Battle**. Sistema base do RPG Maker MZ no qual o ATB é construído. O plugin VisuStella transforma TPB em um ATB completo.

**Diferença**: ATB adiciona gauge manipulation, interrupts, field gauge, etc.

## V

### VisuStella MZ
Série de plugins para RPG Maker MZ desenvolvidos pela VisuStella. O Active Turn Battle é um destes plugins e requer o Battle Core.

## Outros Termos

### Tier
Nível de prioridade de carregamento dos plugins VisuStella.
- Tier 0: Core Engine
- Tier 1: Battle Core
- Tier 2: Active Turn Battle (deve vir depois de 0 e 1)

### Window Skin
Arquivo gráfico que define a aparência de janelas e UI do jogo. Cores podem ser referenciadas por número (índice na Window Skin) ou hexadecimal (#rrggbb).

### Hex Color
Formato de cor hexadecimal: `#rrggbb`
- `rr`: Vermelho (00-FF)
- `gg`: Verde (00-FF)
- `bb`: Azul (00-FF)

**Exemplo**: `#ff0000` = vermelho puro

## Abreviações Comuns

| Abreviação | Significado |
|------------|-------------|
| AGI | Agility |
| ATB | Active Time Battle |
| TPB | Time Progress Battle |
| JS | JavaScript |
| SV | Side View |
| FV | Front View |
| SE | Sound Effect |

## Ver Também

- [Conceitos](../conceitos/) - Conceitos fundamentais do ATB
- [Reference](./index.md) - Outra documentação de referência
