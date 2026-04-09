# Interrupts Configuration

Configurações do sistema de interrupção que permite cancelar habilidades em casting.

## Visão Geral

O sistema de **Interrupts** permite que skills/items interrompam ações que estão sendo conjuradas (casting). Quando um battler é interrompido, sua ação é cancelada e sua gauge reseta para 0%.

### Funcionamento

1. **Inimigo começa casting** → Skill com speed negativo
2. **Player ataca com Interrupt** → Skill com `<ATB Interrupt>`
3. **Interrupção ocorre** → Casting cancelado, gauge reseta
4. **Feedback visual** → Popup "INTERRUPTED!", flash, animação

## Configurações Visuais

### Animation ID
**Descrição**: Animação tocada quando um battler é interrompido

**Requisito**: `VisuMZ_0_CoreEngine` instalado

**Valor**: ID da animação no Database

**Exemplo**: `1` para primeira animação

### Mirror Animation
**Descrição**: Espelhar a animação de interrupção horizontalmente

**Requisito**: `VisuMZ_0_CoreEngine` instalado

**Valores**:
- `true` = animação espelhada
- `false` = animação normal

**Uso**: Útil para battlers no lado direito da tela

### Mute Animation
**Descrição**: Reproduzir animação sem som

**Requisito**: `VisuMZ_0_CoreEngine` instalado

**Valores**:
- `true` = sem som
- `false` = com som (padrão)

## Configurações de Popup

### Text Popup
**Descrição**: Texto exibido quando interrupção ocorre

**Valor**: String de texto

**Vazio** = Nenhum popup exibido

**Exemplos**:
- `INTERRUPTED!`
- `CANCELLED!`
- `BLOCKED!`
- `` (vazio = sem popup)

### Text Color
**Descrição**: Cor do texto do popup

**Formato**:
- **Hexadecimal**: `#rrggbb`
  - Exemplo: `#ff0000` = vermelho
- **Número**: Cor da Window Skin
  - Exemplo: `0` = cor normal

**Uso**:
```javascript
// Vermelho brilhante
#ff0000

// Amarelo aviso
#ffff00

// Cor do sistema (16)
16
```

### Flash Color
**Descrição**: Cor do flash no popup

**Formato**: Array `[red, green, blue, alpha]`

**Valores**: 0-255 para RGB, 0-255 para alpha

**Exemplos**:
```javascript
// Branco sólido
[255, 255, 255, 255]

// Vermelho semi-transparente
[255, 0, 0, 128]

// Sem flash (transparente)
[0, 0, 0, 0]
```

### Flash Duration
**Descrição**: Duração do efeito de flash

**Unidade**: Frames

**Valores**:
- `30` = 0.5 segundos (60fps)
- `60` = 1 segundo
- `0` = nenhum flash

## Notetags Relacionados

### Habilitar Interrupt em Skill/Item
```
<ATB Interrupt>
```
Usado em: Skill, Item Notetags

**Efeito**: Se atingir alvo em casting, interrompe a ação

**Exemplo de uso**:
- Skills físicas (ataques, projéteis)
- Skills de stun
- Contra-ataques

### Prevenir Interrupt
```
<ATB Cannot Be Interrupted>
```
Usado em: Skill, Item Notetags

**Efeito**: Torna a skill imune a interrupção

**Exemplo de uso**:
- Habilidades ultimates
- Magias poderosas
- Skills com "Unstoppable" flag

## Estratégia de Design

### Quando Usar Interrupts

**Bom para**:
- ✅ Físico vs Magic balanceamento
- ✅ Habilidades anti-caster
- ✅ Skills de "taunt" ou "provocation"
- ✅ Contra-ataques táticos

**Cuidado com**:
- ⚠️ Overuse → Frustração do player
- ⚠️ Sem custo → Muito forte
- ⚠️ Sem indicador visual → Player confuso

### Balanceamento

**Custo**:
- Interrupts devem ter custo (damage reduzido, MP, cooldown)
- Não fazer todos os attacks terem interrupt

**Visual**:
- Sempre usar popup OU animação para feedback claro
- Cores devem indicar "perigo" ou "cancelamento"

**Limitação**:
- Considerar `<ATB Cannot Be Interrupted>` para skills importantes
- Bosses podem ter resistência a interrupts

## Exemplos de Configuração

### Configuração Padrão Clara
```
Animation ID: 1
Mirror Animation: false
Mute Animation: false
Text Popup: INTERRUPTED!
Text Color: #ff0000
Flash Color: [255, 0, 0, 180]
Flash Duration: 30
```

### Configuração Sutil (Sem Popup)
```
Animation ID: 0
Text Popup: (vazio)
Flash Color: [255, 255, 255, 100]
Flash Duration: 15
```

### Configuração Dramática
```
Animation ID: 50  ← Animação impactante
Mirror Animation: true
Mute Animation: false
Text Popup: SPELL BROKEN!
Text Color: #ffff00
Flash Color: [255, 200, 0, 255]
Flash Duration: 60
```

## Compatibilidade

### VisuMZ_0_CoreEngine
**Requerido para**: Animações de interrupt

**Features habilitadas**:
- Animation ID
- Mirror Animation
- Mute Animation

Sem Core Engine, interrupts funcionam mas sem animação.

## Ver Também

- [Estados de Combate - Casting](../conceitos/estados-combate.md#casting) - Como casting funciona
- [Skills e Items - Interrupt](../features/skills-items.md#interrupts) - Notetags de interrupt
- [Sound Effects](./sound-effects.md) - Sons para interrupts

## Troubleshooting

**Interrupt não funciona**: Verificar se:
1. Skill/item tem `<ATB Interrupt>`
2. Target está em casting (speed negativo)
3. Target não tem `<ATB Cannot Be Interrupted>`

**Animação não toca**: Instalar `VisuMZ_0_CoreEngine`

**Popup não aparece**: Verificar "Text Popup" não está vazio
