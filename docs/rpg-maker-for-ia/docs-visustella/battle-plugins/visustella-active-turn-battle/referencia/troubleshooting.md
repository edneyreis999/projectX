# Troubleshooting - Solução de Problemas

## Overview

Problemas comuns e suas soluções ao usar o plugin VisuStella MZ Active Turn Battle.

---

## Problemas de Instalação

### Plugin Não Aparece

#### Sintomas
- Plugin não está na lista de plugins
- Plugin aparece mas não pode ser ativado

#### Soluções
1. Verifique que arquivo está em `js/plugins/`
2. Nome do arquivo deve ser `VisuMZ_2_ActiveTurnBattle.js`
3. Reinicie RPG Maker MZ após adicionar plugin
4. Verifique que não há plugins duplicados

### Plugin Não Funciona

#### Sintomas
- Plugin ON mas nada acontece
- Erro ao iniciar batalha

#### Diagnóstico
```
✓ Plugin está ON?
✓ VisuMZ_1_BattleCore está presente?
✓ BattleCore está ANTES de ATB?
✓ Game está em TPB mode?
```

#### Soluções
1. Verifique **BattleCore** está instalado
2. Verifique **ordem** dos plugins
3. Configure battle system para **TPB**
4. Reinicie o jogo completamente

---

## Problemas de Gauge

### Gauges Não Aparecem

#### Sintomas
- Batalha começa mas sem gauges
- Field Gauge não aparece

#### Diagnóstico
```
✓ Show Sprite Gauges está true?
✓ Actors estão em side-view?
✓ Use Field Gauge? está true?
✓ Plugin Commands não esconderam gauges?
```

#### Soluções

##### Sprite Gauges
```
Plugin Parameters > General Gauge Settings
├─ Show Sprite Gauges (Actors): true
└─ Show Sprite Gauges (Enemies): true
```

##### Field Gauge
```
Plugin Parameters > Field Gauge Settings
└─ Use Field Gauge?: true
```

##### Plugin Command
```
Plugin Command: System: ATB Field Gauge Visibility
└─ Visibility: Show
```

### Gauges na Posição Errada

#### Sintomas
- Gauges muito acima/abaixo do sprite
- Gauges fora da tela

#### Soluções
```
Plugin Parameters > General Gauge Settings
├─ Anchor X: 0.5    # Ajuste horizontal
├─ Anchor Y: 1.0    # Ajuste vertical
├─ Offset X: 0      # Ajuste fino horizontal
└─ Offset Y: -10    # Ajuste fino vertical
```

#### Valores Recomendados
```
Sobre sprite:
  Anchor X: 0.5
  Anchor Y: 1.0
  Offset X: 0
  Offset Y: -10 a -20

Na status window:
  Não requer ajuste (automático)
```

### Cores Erradas

#### Sintomas
- Gauges sempre na mesma cor
- Cores não mudam com estados

#### Diagnóstico
```
✓ Gauge Color Settings configurados?
✓ AGI Rate thresholds muito extremos?
✓ States não sobrescrevendo cores?
```

#### Soluções
```
Plugin Parameters > Gauge Color Settings
├─ Default Color 1/2: #ffffff → #ffffaa
├─ Full Color 1/2: #00ff00 → #00cc00
├─ Cast Color 1/2: #ff00ff → #cc00cc
├─ Fast Color 1/2: #00ffff → #00cccc
├─ Slow Color 1/2: #ffaa00 → #cc8800
└─ Stop Color 1/2: #ff0000 → #cc0000
```

#### Ajuste Thresholds
```
Plugin Parameters > General Gauge Settings
├─ Slow Rate: 0.8   # Diminua se muitos "Slow"
└─ Fast Rate: 1.2   # Aumente se poucos "Fast"
```

---

## Problemas de Mecânica

### Battlers Nunca Agem

#### Sintomas
- Gauge preenche mas battler não pode agir
- Gauge trava em certo valor

#### Diagnóstico
```
✓ JS: Speed retornando 0?
✓ JS: Acceleration muito baixa?
✓ State parando gauge?
```

#### Soluções

##### Verificar Speed Formula
```
Plugin Parameters > Mechanics Settings
└─ JS: Speed: user.agi

# Evite:
JS: Speed: 0  # Sempre 0 = nunca age
```

##### Verificar Acceleration
```
Plugin Parameters > Mechanics Settings
└─ JS: Acceleration: 1.0

# Evite:
JS: Acceleration: 0.0001  # Muito lento
```

##### Verificar States
```
Database: States
└─ Verifique se algum state tem "Restriction"
```

### Casts Muito Rápidos/Demorados

#### Sintomas
- Skills com cast instantâneo
- Skills com cast eterno

#### Diagnóstico
```
✓ JS: Cast Time correto?
✓ Speed values extremos?
✓ JS: Acceleration muito alta/baixa?
```

#### Soluções

##### Ajustar Cast Time
```
Plugin Parameters > Mechanics Settings
└─ JS: Cast Time: Math.abs(item.speed)

# Cast time em frames:
# -500  → 500 frames (~8s)
# -1000 → 1000 frames (~16s)
# -2000 → 2000 frames (~33s)
```

##### Ajustar Acceleration
```
Plugin Parameters > Mechanics Settings
└─ JS: Acceleration: 1.0

# Aumentar se cast muito rápido:
JS: Acceleration: 0.5

# Diminuir se cast muito lento:
JS: Acceleration: 2.0
```

---

## Problemas de Interrupt

### Interrupt Não Funciona

#### Sintomas
- Skills com `<ATB Interrupt>` não interrompem
- Targets em casting não são afetados

#### Diagnóstico
```
✓ Skill tem <ATB Interrupt>?
✓ Target está em casting state?
✓ Skill acertou o target?
✓ Target tem <ATB Cannot Be Interrupted>?
```

#### Soluções

##### Verificar Notetag
```ruby
# Database: Skill
<ATB Interrupt>

# Correto:
<ATB Interrupt>

# Errado:
<ATBInterrupt>  # Falta espaço
<ATB Interrupt >  # Espaço extra
```

##### Verificar Casting State
```ruby
# Target deve estar castando:
# - Skill com speed < 0
# - Gauge diminuindo
```

##### Verificar Hit
```ruby
# Skill deve acertar:
# - Hit chance > 0%
# - Target não evadiu
```

### Interrupt Acontece Mas Não Deveria

#### Sintomas
- Skills sem interrupt estão interrompendo
- Allies interrompendo allies

#### Diagnóstico
```
✓ Notetag em skill errada?
✓ Notetag herdada de class/state?
✓ Multiple skills com interrupt?
```

#### Soluções

##### Remover Notetag
```ruby
# Database: Skill
# Remover notetag se não deve interromper
```

##### Verificar Herança
```
# Class com notetag:
Database: Class "Warrior"
<ATB Interrupt>

# Todas skills de Warrior herdam interrupt
```

---

## Problemas de Field Gauge

### Field Gauge Não Aparece

#### Sintomas
- Field Gauge configurado mas invisível

#### Diagnóstico
```
✓ Use Field Gauge?: true?
✓ System: Visibility command?
✓ Position fora da tela?
```

#### Soluções
```
Plugin Parameters > Field Gauge Settings
└─ Use Field Gauge?: true

Plugin Command: System: ATB Field Gauge Visibility
└─ Visibility: Show
```

### Marcadores Não Aparecem

#### Sintomas
- Field Gauge visível mas sem marcadores
- Alguns battlers sem marcador

#### Diagnóstico
```
✓ Marker Size muito pequeno?
✓ Marker Offset muito grande?
✓ Notetag <Hide ATB Gauge>?
✓ Sprite Type incorreto?
```

#### Soluções
```
Plugin Parameters > Field Gauge Settings > Marker Sprites
├─ Marker Size: 32x32
├─ Marker Offset: 5
└─ Sprite Type: Icon
```

---

## Problemas de JavaScript

### Erro de JS Formula

#### Sintomas
- Erro no console (F8)
- Batalha crasha

#### Diagnóstico
```
✓ Sintaxe JavaScript correta?
✓ Variáveis existem?
✓ Retorno correto?
```

#### Soluções

##### Verificar Sintaxe
```javascript
// Errado:
JS: Speed: user.agi +  # Falta valor

// Correto:
JS: Speed: user.agi + user.level
```

##### Verificar Variáveis
```javascript
// Variáveis disponíveis:
user   // Battler
target // Battler sendo afetado
item   // Skill/item

// Variáveis NÃO disponíveis:
actor  // Use user em vez disso
enemy  // Use target em vez disso
```

##### Verificar Retorno
```javascript
// JS formulas devem retornar número:
JS: Speed: user.agi

// Não retornam texto:
JS: Speed: "rápido"  # ERRADO
```

### JS Formula Não Funciona Como Esperado

#### Sintomas
- Fórmula executa mas resultado errado
- Battlers muito rápidos/lentos

#### Diagnóstico
```
✓ Valores de input corretos?
✓ Fórmula matemática correta?
✓ Ordem de operações?
```

#### Soluções

##### Testar Valores
```javascript
// Adicionar logs (temporário):
JS: Speed:
console.log("AGI:", user.agi);
console.log("Level:", user.level);
user.agi + user.level

# Remover logs antes de produção
```

##### Simplificar Fórmula
```javascript
// Complexo (difícil debugar):
user.agi + (user.level * 2) + (user.luk / 2) - (user.hp < 100 ? 10 : 0)

// Simplificar:
user.agi + user.level * 2
```

---

## Problemas de Performance

### Lag Durante Batalha

#### Sintomas
- Batalha fica lenta
- FPS cai drasticamente

#### Diagnóstico
```
✓ Muitos battlers?
✓ Field Gauge com muitos marcadores?
✓ JS formulas muito complexas?
✓ Animation de interrupt em loop?
```

#### Soluções

##### Reduzir Battlers
```
# Limite enemies em batalha:
# Máximo recomendado: 8-12 battlers
```

##### Otimizar Field Gauge
```
Plugin Parameters > Field Gauge Settings
├─ Marker Speed: 10  # Reduzir movimento
├─ Show Arrow?: false  # Desabilitar setas
└─ Show Border?: false  # Desabilitar bordas
```

##### Simplificar JS Formulas
```
# Evitar loops complexos:
JS: Speed:
for (var i = 0; i < 100; i++) { ... }  # LENTO

# Usar cálculo simples:
JS: Speed: user.agi  # RÁPIDO
```

---

## Consulte Também

- [Referência: Compatibilidade](compatibilidade.md) - Integração com plugins
- [Referência: Glossário](glossario.md) - Termos técnicos
- [Conceitos: Mecânica ATB](../conceitos/mecanica-atb.md) - Como funciona
