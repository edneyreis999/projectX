# ATB Gauge Configuration

Configurações das barras individuais de ATB que aparecem sobre cada battler (actors e enemies).

## Visão Geral

As ATB Gauges são barras de progresso que mostram o quanto cada battler está próximo de poder agir. Cada gauge pode ser customizada em posição, tamanho, cores e visibilidade.

## Parâmetros Gerais

### Anchor X / Anchor Y
**Descrição**: Ponto de ancoragem do sprite da gauge

**Valores**: 0.0 a 1.0
- `0.0` = borda superior/esquerda
- `0.5` = centro
- `1.0` = borda inferior/direita

**Recomendação**: Use valores entre 0 e 1 para segurança

### Scale
**Descrição**: Escala da gauge

**Valores**: Número decimal
- `1.0` = tamanho normal
- `1.5` = 50% maior
- `0.8` = 80% do tamanho

### Offset X / Offset Y
**Descrição**: Posição em pixels relativa à ancoragem

**Uso**: Ajuste fino da posição da gauge

## Configurações de AGI

### Slow Rate
**Descrição**: Limiar para considerar um battler "lento"

**Valor**: Taxa de AGI (ex: 0.8 = 80% da velocidade normal)

**Efeito**: Quando AGI rate < Slow Rate, gauge usa cores "Slow"

### Fast Rate
**Descrição**: Limiar para considerar um battler "rápido"

**Valor**: Taxa de AGI (ex: 1.2 = 120% da velocidade normal)

**Efeito**: Quando AGI rate > Fast Rate, gauge usa cores "Fast"

## Visibilidade

### Actors - Show Sprite Gauges
**Descrição**: Mostrar gauges sobre sprites dos actors

**Requisito**: SV Actors devem estar visíveis

**Valores**:
- `true` = mostra gauges sobre actors
- `false` = oculta gauges

### Actors - Show Status Gauges
**Descrição**: Mostrar gauges na janela de status

**Aplicação**: Apenas side-view battle

### Enemies - Show Sprite Gauges
**Descrição**: Mostrar gauges sobre sprites dos enemies

**Valores**:
- `true` = mostra gauges sobre enemies
- `false` = oculta gauges

## Cores da Gauge

Cada estado possui duas cores para criar gradiente:

### Cores Disponíveis

| Estado | Parâmetro | Uso |
|--------|-----------|-----|
| Charging | Default Color 1, 2 | Estado padrão de enchimento |
| Ready | Full Color 1, 2 | Gauge cheia (100%) |
| Casting | Cast Color 1, 2 | Executando skill com speed < 0 |
| Fast | Fast Color 1, 2 | Velocidade acima de Fast Rate |
| Slow | Slow Color 1, 2 | Velocidade abaixo de Slow Rate |
| Stop | Stop Color 1, 2 | Velocidade zero |

### Formato de Cores

**Hexadecimal**: `#rrggbb`
- Exemplo: `#ff0000` = vermelho

**Número**: Cor da Window Skin
- Exemplo: `0` = cor normal, `16` = cor de sistema

## Notetags Relacionados

### Ocultar Gauge Específico
```
<Hide ATB Gauge>
```
Usado em: Enemy Notetags
Oculta a gauge de um enemy específico

## Exemplos de Configuração

### Configuração Padrão Equilibrada
```
Anchor X: 0.5
Anchor Y: 1.0
Scale: 1.0
Offset X: 0
Offset Y: -10
Slow Rate: 0.8
Fast Rate: 1.2
Show Sprite Gauges (Actors): true
Show Sprite Gauges (Enemies): true
```

### Configuração Minimalista
```
Scale: 0.8
Show Sprite Gauges (Enemies): false
Show Status Gauges: true
```

### Configuração Estratégica (com cores marcantes)
```
Slow Rate: 0.7  ← Marca claramente battlers lentos
Fast Rate: 1.3  ← Marca claramente battlers rápidos
Stop Color 1: #ff0000  ← Vermelho para parados
Cast Color 1: #ff00ff  ← Magenta para casting
```

## Ver Também

- [Field Gauge](./field-gauge.md) - Gauge de campo com todos os battlers
- [Estados de Combate](../conceitos/estados-combate.md) - O que cada cor significa
- [Glossário - Gauge](../reference/glossario.md#gauge) - Definição técnica

## Troubleshooting

**Gauges não aparecem**: Verificar "Show Sprite Gauges" e se está em side-view

**Cores não mudam**: Ajustar Slow Rate/Fast Rate ou verificar configuração de cores

**Gauge mal posicionada**: Ajustar Anchor X/Y e Offset X/Y
