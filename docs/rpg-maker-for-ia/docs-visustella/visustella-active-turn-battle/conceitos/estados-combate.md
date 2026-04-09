# Estados de Combate

Durante o combate ATB, cada battler pode estar em diferentes estados que afetam sua barra e comportamento. Compreender estes estados é crucial para balanceamento e design de habilidades.

## Estados Principais

### 1. Charging (Carregando)

Estado padrão onde a barra de ATB está enchendo.

**Características**:
- Barra enche de 0% a 100%
- Velocidade determinada por AGI
- Battler não pode agir até chegar a 100%
- Cor padrão da gauge (configurável)

**Visualização**:
- Gauge com cores Default Color 1 e 2
- Posição aumenta suavemente

### 2. Ready (Pronto)

Battler com gauge cheia, pronto para agir.

**Características**:
- Gauge em 100%
- Battler pode selecionar ação
- Aguarda input do jogador (para actors) ou IA (para enemies)

**Visualização**:
- Gauge com cores Full Color 1 e 2
- Indicador visual de "ready"

### 3. Casting (Castando)

Estado especial para skills com speed negativo.

**Características**:
- Barra **diminui** ao invés de aumentar
- Representa tempo de cast da skill
- Pode ser **interrompido** por ataques
- Ao completar, skill é executada

**Visualização**:
- Gauge com cores Cast Color 1 e 2 (distintas)
- Efeito visual de casting (animação)

**Interrupção**:
- Skills com `<ATB Interrupt>` cancelam o casting
- Gauge reseta para 0% quando interrompido
- Popup "INTERRUPTED!" aparece (configurável)

### 4. Stop (Parado)

Battler com velocidade zero.

**Características**:
- Gauge não enche nem diminui
- Causado por estados paralisantes
- Não pode agir

**Visualização**:
- Gauge com cores Stop Color 1 e 2
- Indicador visual de "stopped"

**Causas comuns**:
- States como Paralyze, Sleep, Freeze
- Efeitos que aplicam "Stop"

### 5. Slow (Lento)

Battler com velocidade reduzida.

**Características**:
- Gauge enche mais lentamente que o normal
- Causado por debuffs de velocidade
- Ainda pode agir, mas demora mais

**Visualização**:
- Gauge com cores Slow Color 1 e 2
- Indicador visual de "slowed"

**Limite**: Configurável via parâmetro "Slow Rate"

### 6. Fast (Rápido)

Battler com velocidade aumentada.

**Características**:
- Gauge enche mais rapidamente que o normal
- Causado por buffs de velocidade
- Age mais frequentemente

**Visualização**:
- Gauge com cores Fast Color 1 e 2
- Indicador visual de "hasted"

**Limite**: Configurável via parâmetro "Fast Rate"

## Cores da Gauge por Estado

Cada estado possui cores configuráveis:

| Estado | Parâmetro de Cor |
|--------|------------------|
| Charging | Default Color 1, 2 |
| Ready | Full Color 1, 2 |
| Casting | Cast Color 1, 2 |
| Stop | Stop Color 1, 2 |
| Slow | Slow Color 1, 2 |
| Fast | Fast Color 1, 2 |

## Transições de Estado

```
[Start Battle]
    ↓
[Charging] ←→ [Slow] / [Fast]
    ↓ (gauge = 100%)
[Ready]
    ↓ (ação selecionada)
[Action Executing]
    ↓ (skill com speed negativo?)
[Casting] → [Interrupt] ou [Complete]
    ↓
[After Gauge Reset]
    ↓
[Charging]
```

## Estados Excepcionais

### Stun Reset Gauge
Configurável via parâmetro "Stuns Reset Gauge?":

- **ON**: Stuns (Stun, Charm, Berserk, Confusion) resetam gauge para 0%
- **OFF**: Gauge mantém posição após stun

### Charging States
Alguns estados específicos:
- **Charging**: Para estados mantendo casting
- **Cannot Act**: Para estados impossibilitando ação

## Notetags Relacionadas

### Modificar Estados
```
<ATB Battle Start Gauge: +25%>
```
Começa com gauge adiantado.

```
<ATB After Gauge: -50%>
```
Reseta gauge para 50% após ação.

```
<ATB Cast Gauge: +20%>
```
Modifica gauge durante casting.

## Ver Também

- [O que é ATB?](./o-que-e-atb.md) - Sistema geral
- [Mecânica de Agilidade](./mecanica-agilidade.md) - Como AGI afeta estados
- [Interrupts](../configuration/interrupts.md) - Configurar interrupções
- [Gauge Colors](../configuration/atb-gauge.md#cores) - Configurar cores

## Troubleshooting

**Casting não funciona**: Verificar se skill tem speed negativo

**Interrupt não acontece**: Confirmar que skill tem `<ATB Interrupt>` e target está em casting

**Cores não mudam**: Verificar parâmetros de cor e limiares Slow/Fast Rate
