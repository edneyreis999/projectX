# Visão Geral - Active Turn Battle (ATB)

## O que é ATB?

O **Active Turn Battle (ATB)** é um sistema de batalha em tempo real onde os personagens e inimigos têm suas ações determinadas pelo preenchimento de uma gauge (barra de progresso). Este plugin transforma o sistema **Time Progress Battle (TPB)** nativo do RPG Maker MZ no aclamado sistema ATB, oferecendo controle total sobre as mecânicas.

## TPB vs ATB

### Time Progress Battle (TPB)
- Sistema nativo do RPG Maker MZ
- Gauges se preenchem com o tempo
- Skills com speed negativo entram em "casting"
- Skills com speed positivo não afetam a gauge do próximo turno

### Active Turn Battle (ATB)
- Modifica o TPB para funcionar como ATB clássico
- Skills com speed positivo **afetam** a gauge do próximo turno
- Maior controle sobre mecânicas (penalidades, cálculos)
- Sistema de interrupção para casts
- Visualização aprimorada das gauges

## Requisitos

### Obrigatórios
- **RPG Maker MZ** (não funciona em outras versões)
- **VisuMZ_1_BattleCore** (plugin Tier 1)

### Configuração Necessária
O game project deve estar configurado para **TPB mode**:
1. Vá em `Database > System 1`
2. Em "Battle System", selecione:
   - `Time Progress (Active)` OU
   - `Time Progress (Wait)`

### Tier do Plugin
Este é um plugin **Tier 2**. Coloque-o após plugins de menor valor numérico (0, 1) na lista de plugins para melhor compatibilidade.

## Características Principais

### 1. Controle de Mecânicas
- Full control over TPB/ATB mechanics (speed, calculations, etc.)
- Penalidades customizáveis (escape fail, stuns)
- Fórmulas JavaScript para todos os cálculos

### 2. Manipulação de Gauges
Notetags permitem skills e items manipularem ATB Gauges:
- Alterar quanto cheia a gauge está
- Modificar gauges em charging/casting
- Definir gauge inicial de batalha
- Modifier após cada ação

### 3. Sistema de Interrupção
- Skills podem interromper casts inimigos
- Cancela a ação e reseta a gauge para 0%
- Animações e text popups para feedback visual
- Skills podem ser imunes a interrupção

### 4. Visualização Aprimorada
- **ATB Gauges** sobre sprites de actors/enemies
- **Cores diferenciadas** por estado:
  - Stopped (parado)
  - Slow/Fast (lento/rápido)
  - Full (pronto para agir)
  - Cast (em cast)
- **Field Gauge**: Gauge de campo com marcadores para todos os battlers

### 5. Field Gauge
Gauge horizontal/vertical mostrando todos os battlers simultaneamente:
- Marcadores para actors e enemies
- Posição relativa mostra quem está mais próximo de agir
- Customizável: position, direction, skins, markers
- Plugin commands para dynamic changes

## Mudanças em Relação ao TPB Original

### ATB Gauges Revamp
As gauges agora mostram cores diferentes para diferentes estados:
- **Stopped**: Vermelho (speed = 0)
- **Slow/Fast**: Laranul/Azul baseado em AGI rate
- **Full**: Verde (ready to act)
- **Cast**: Roxo (negative speed)

### Skill & Item Speeds
No TPB original:
- Speed negativo = casting state ✓
- Speed positivo = **não afeta** próxima gauge ✗

No ATB:
- Speed negativo = casting state ✓
- Speed positivo = **afeta** próxima gauge ✓
  - 2000 speed = 50% gauge
  - 1000 speed = 25% gauge
  - 500 speed = 12.5% gauge

### JavaScript Calculation Mechanics
Funções de cálculo foram overriden para permitir customização:
- Initial Gauge
- Speed, Base Speed, Relative Speed
- Acceleration
- Cast Time

## Compatibilidade com Outros Plugins

### VisuMZ_0_CoreEngine
- Adiciona animações ao ATB Interrupts
- Mirror/Mute options para animações

### VisuMZ_1_OptionsCore
- Opção para ajustar ATB Gauge speed
- Toggle entre Active/Wait ATB modes
- Toggle "Show ATB Gauges" no options menu

## Fluxo de Batalha ATB

```
1. Batalha começa
   ↓
2. Battlers recebem Initial Gauge
   ↓
3. Gauges preenchem baseado em Speed/AGI
   ↓
4. Quando gauge = 100%, battler pode agir
   ↓
5. Skill/Item executado
   ↓
6. Gauge reseta baseado em After Gauge
   ↓
7. Loop continua até batalha acabar
```

## Estados de um Battler

1. **Charging**: Gauge preenchendo normalmente (speed ≥ 0)
2. **Casting**: Gauge diminuindo para skill (speed < 0)
3. **Full**: Gauge cheia, pronto para agir
4. **Stopped**: Speed = 0, gauge não preenche
5. **Interrupted**: Cast cancelado, gauge = 0%

## Próximos Passos

- Leia [Mecânica ATB](mecanica-atb.md) para entender detalhadamente como o sistema funciona
- Consulte [Parâmetros: Mecânica](../configuration/parametros-mecanica.md) para configurar fórmulas
- Veja [Notetags](../notetags/) para implementar features específicas
