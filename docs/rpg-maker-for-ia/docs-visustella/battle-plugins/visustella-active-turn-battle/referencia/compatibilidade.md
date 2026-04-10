# Compatibilidade - Integração com Plugins

## Overview

O plugin VisuStella MZ Active Turn Battle integra-se com outros plugins da biblioteca VisuStella MZ e pode ser usado com plugins de terceiros, desde que respeitando a ordem de tiers.

---

## Requisitos Obrigatórios

### VisuMZ_1_BattleCore
- **Tier**: 1
- **Propósito**: Core battle system
- **Necessidade**: **Obrigatório**
- **Sem ele**: Plugin não funciona

### Configuração de Sistema
O game project deve estar configurado para **TPB mode**:
1. Database > System > Battle System
2. Selecione **Time Progress (Active)** ou **Time Progress (Wait)**

---

## Integração VisuStella MZ

### VisuMZ_0_CoreEngine

#### Recursos Adicionados
Adiciona animações ao sistema de interrupt.

#### Features
- **Animation ID**: Tocar animação ao interromper
- **Mirror Animation**: Espelhar animação
- **Mute Animation**: Tocar sem som

#### Parâmetros Extras
```
Interrupt Settings
├─ Animation ID: 0
├─ Mirror Animation: false
└─ Mute Animation: false
```

#### Requisitos
- CoreEngine deve estar **ANTES** de ATB na lista de plugins
- CoreEngine deve estar em **Tier 0**

#### Sem CoreEngine
- Parâmetros de animação **não funcionam**
- Sistema de interrupt funciona (sem animação)

---

### VisuMZ_1_OptionsCore

#### Recursos Adicionados
Adiciona opções no menu de opções para customizar ATB.

#### Features

##### ATB Gauge Speed
Player pode ajustar velocidade de preenchimento:
- **0.5x**: Lento
- **1.0x**: Normal
- **1.5x**: Rápido
- **2.0x**: Muito rápido

##### Active/Wait ATB Toggle
Player pode toggle entre:
- **Active ATB**: Gauges preenchem durante seleção
- **Wait ATB**: Gauges param durante seleção

##### Show ATB Gauges
Player pode mostrar/esconder ATB gauges.

#### Parâmetros Extras
```
Options Settings
├─ Add Option?: true
├─ Adjust Window Height?: true
└─ Option Name: Show ATB Gauges
```

#### Requisitos
- OptionsCore deve estar **ANTES** de ATB na lista de plugins
- OptionsCore deve estar em **Tier 1**

#### Sem OptionsCore
- Opções **não aparecem** no menu
- ATB funciona normalmente (sem customização por player)

---

## Ordem de Plugins

### Sistema de Tiers VisuStella

```
Tier 0: Core Engine
   ↓
Tier 1: Battle Core, Options Core
   ↓
Tier 2: ATB, Element Core, State Core
   ↓
Tier 3: Outros plugins VisuStella
   ↓
Tier 4+: Outros plugins VisuStella
```

### Ordem Recomendada

```
1. VisuMZ_0_CoreEngine           (Tier 0)
2. VisuMZ_1_BattleCore           (Tier 1)
3. VisuMZ_1_OptionsCore          (Tier 1, opcional)
4. VisuMZ_2_ActiveTurnBattle     (Tier 2, este plugin)
5. Outros plugins VisuStella     (Tier 3+)
6. Plugins de terceiros          (AFTER VisuStella)
```

### Importância da Ordem

#### Ordem Correta
```
CoreEngine → BattleCore → ATB
✓ Funciona corretamente
```

#### Ordem Incorreta
```
ATB → BattleCore → CoreEngine
✗ Pode causar bugs, crashes, ou não funcionar
```

---

## Plugins de Terceiros

### Compatíveis Geralmente
Plugins que **não modificam** o sistema de batalha geralmente funcionam:
- Plugins de menu
- Plugins de mapa
- Plugins de UI
- Plugins de save/load

### Potencialmente Incompatíveis
Plugins que **modificam** o sistema de batalha:
- Outros sistemas ATB
- Plugins de battle action sequence
- Plugins que modificam gauges nativas

### Teste Sempre
Antes de usar em produção:
1. Teste batalha simples
2. Teste com todos features
3. Teste com saves/load
4. Teste com novos game+

---

## Conflitos Conhecidos

### Yanfly's Battle Engine (MV)
- **Status**: Incompatível (MV vs MZ)
- **Motivo**: Plugins MV não funcionam em MZ

### Outros Sistemas ATB
- **Status**: Potencialmente incompatível
- **Motivo**: Dois sistemas ATB podem conflitar
- **Solução**: Use apenas um sistema ATB

### Plugins que Modificam Speed
- **Status**: Potencial conflito
- **Motivo**: Ambos modificam mecânica de speed
- **Solução**: Teste extensivamente

---

## Exemplos de Configuração

### Configuração Mínima
```
Plugin Manager:
1. VisuMZ_0_CoreEngine
2. VisuMZ_1_BattleCore
3. VisuMZ_2_ActiveTurnBattle

# Funciona, sem features extras
```

### Configuração Recomendada
```
Plugin Manager:
1. VisuMZ_0_CoreEngine
2. VisuMZ_1_BattleCore
3. VisuMZ_1_OptionsCore
4. VisuMZ_2_ActiveTurnBattle
5. [Outros plugins VisuStella]

# Todas features disponíveis
```

### Configuração com Plugins de Terceiros
```
Plugin Manager:
1. VisuMZ_0_CoreEngine
2. VisuMZ_1_BattleCore
3. VisuMZ_1_OptionsCore
4. VisuMZ_2_ActiveTurnBattle
5. [Plugins VisuStella Tier 3+]
6. [Plugins de Terceiros - Batalha]
7. [Plugins de Terceiros - Outros]

# Ordem correta mantida
```

---

## Troubleshooting de Compatibilidade

### Plugin Não Funciona

#### Verifique
1. BattleCore está presente?
2. BattleCore está **ANTES** de ATB?
3. Game está em **TPB mode**?
4. Plugin está **ON**?

### Animation de Interrupt Não Funciona

#### Verifique
1. CoreEngine está presente?
2. CoreEngine está **ANTES** de ATB?
3. Animation ID > 0?
4. Skill tem `<ATB Interrupt>`?

### Opções Não Aparecem

#### Verifique
1. OptionsCore está presente?
2. OptionsCore está **ANTES** de ATB?
3. "Add Option?" está **true**?
4. Options menu foi reaberto?

### Bugs com Outros Plugins

#### Diagnóstico
1. Desative plugins de terceiros
2. Teste apenas com VisuStella
3. Reative plugins um a um
4. Identifique plugin conflitante

#### Solução
- Contacte autor do plugin de terceiros
- Reporte bug com detalhes
- Considere alternativa

---

## Consulte Também

- [Conceitos: Visão Geral](../conceitos/visao-geral.md) - Requisitos do sistema
- [Parâmetros: Mecânica](../configuration/parametros-mecanica.md) - JavaScript formulas
- [Referência: Troubleshooting](troubleshooting.md) - Solução de problemas
