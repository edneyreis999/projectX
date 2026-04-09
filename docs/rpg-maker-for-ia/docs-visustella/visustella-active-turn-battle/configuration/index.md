# Configuration

Esta seção contém todos os parâmetros configuráveis do plugin VisuStella Active Turn Battle, organizados por componente.

## Documentos

### [ATB Gauge](./atb-gauge.md)
Configurações das barras de ATB individuais (posição, tamanho, cores, visibilidade).

### [Field Gauge](./field-gauge.md)
Configurações do gauge de campo que mostra todos os battlers em uma única barra.

### [Timing e Fórmulas](./timing-formulas.md)
Fórmulas JavaScript para velocidade, aceleração, cast time e penalidades.

### [Interrupts](./interrupts.md)
Configurações do sistema de interrupção de ações em casting.

### [Sound Effects](./sound-effects.md)
Efeitos sonoros para eventos de ATB.

## Visão Geral dos Parâmetros

### Mechanics Settings
- Escape Fail Penalty
- Stuns Reset Gauge?
- Fórmulas JS (Initial Gauge, Speed, Base Speed, etc.)

### General Gauge Settings
- Anchor X/Y, Scale, Offset
- Slow/Fast Rate limiares
- Visibilidade para Actors/Enemies

### Field Gauge Settings
- Display Position, Forward Direction
- Gauge dimensions, Marker settings
- Border, Background, Arrow configs

### Gauge Color Settings
- Cores para cada estado (Default, Full, Cast, Fast, Slow, Stop)
- Cores 1 e 2 para gradiente

### Interrupt Settings
- Animation ID, Mirror, Mute
- Text Popup, Color, Flash settings

### Options Settings
- Add "Show ATB Gauges" option
- Option name, window height

## Navegação

- ← [Voltar ao índice principal](../index.md)
- → [Conceitos](../conceitos/) - Entender o sistema primeiro
- → [Features](../features/) - Aplicar notetags

## Dica de Configuração

**Recomendado**: Comece com parâmetros padrão, depois ajuste:
1. Configure [ATB Gauge](./atb-gauge.md) para visual básico
2. Ajuste [Timing e Fórmulas](./timing-formulas.md) para balanceamento
3. Habilite [Field Gauge](./field-gauge.md) se desejar ordem visual
4. Configure [Interrupts](./interrupts.md) para combates estratégicos
