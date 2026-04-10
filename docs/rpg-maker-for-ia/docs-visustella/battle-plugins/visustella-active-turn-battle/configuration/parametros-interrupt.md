# Parâmetros: Interrupt (Interrupt Settings)

## Overview

Estes parâmetros controlam o sistema de **interrupção** do ATB, permitindo skills cancelarem casts inimigos. Inclui configurações visuais (animações, popups) que aparecem quando uma interrupção ocorre.

## Localização
**Plugin Parameters > Interrupt Settings**

---

## Animation ID

### Descrição
ID da animação reproduzida quando um battler é interrompido durante um cast.

### Parâmetro
```
Animation ID: 0
```

### Requisitos
- **VisuMZ_0_CoreEngine** deve estar instalado
- Se CoreEngine não estiver presente, este parâmetro não tem efeito

### Comportamento
- **0**: Nenhuma animação tocada
- **1-X**: Toca animação com ID X

### Exemplos
```
0   // Sem animação
1   // Animation 1 (geralmente "Hit")
54  // Animation 54 (ex: "Shock" ou custom)
```

### Visual
Animação é tocada **no battler interrompido**.

---

## Mirror Animation

### Descrição
Se a animação de interrupt deve ser espelhada horizontalmente.

### Parâmetro
```
Mirror Animation: false
```

### Requisitos
- **VisuMZ_0_CoreEngine** deve estar instalado

### Comportamento
- **true**: Animação é espelhada (flip horizontal)
- **false**: Animação é reproduzida normalmente

### Uso Típico
- Útil para battlers voltados para a esquerda
- Adiciona variedade visual

---

## Mute Animation

### Descrição
Se a animação de interrupt deve ter seu som (SE) desabilitado.

### Parâmetro
```
Mute Animation: false
```

### Requisitos
- **VisuMZ_0_CoreEngine** deve estar instalado

### Comportamento
- **true**: Animação toca sem som
- **false**: Animação toca com som normalmente

### Uso Típico
- Útil se muitos interrupts ocorrem (evita spam sonoro)
- Pode reduzir fadiga auditiva

---

## Text Popup

### Descrição
Texto exibido como popup quando um interrupt ocorre.

### Parâmetro
```
Text Popup: INTERRUPTED!
```

### Comportamento
- **Vazio ("")**: Nenhum popup exibido
- **Texto**: Popup exibido acima do battler

### Exemplos
```
""              // Sem popup
"INTERRUPTED!"  // Texto em inglês
"INTERROMPIDO!" // Texto em português
"✕"            // Símbolo simples
```

### Visual
- Popup aparece **acima do battler interrompido**
- Cor definida por **Text Color**
- Flash definido por **Flash Color/Duration**

---

## Text Color

### Descrição
Cor do texto do popup de interrupt.

### Parâmetro
```
Text Color: #ff0000
```

### Formatos Suportados

#### Hexadecimal
```
#rrggbb
#ff0000 // Vermelho
#00ff00 // Verde
#0000ff // Azul
#ffff00 // Amarelo
```

#### Window Skin Number
```
0 // Skin Color 0 (geralmente branco)
1 // Skin Color 1 (geralmente preto/claro)
2 // Skin Color 2 (geralmente cinza)
```

### Exemplos
```
#ff0000        // Vermelho brilhante
#ffff00        // Amarelo
#ffa500        // Laranja
0              // Cor 0 da Window Skin
```

---

## Flash Color

### Descrição
Cor do efeito de flash do popup de interrupt.

### Parâmetro
```
Flash Color: [255, 0, 0, 128]
```

### Formato
Array com 4 valores: **[red, green, blue, alpha]**

### Componentes

#### Red (Vermelho)
- **0-255**: Intensidade de vermelho
- **255**: Máximo vermelho
- **0**: Sem vermelho

#### Green (Verde)
- **0-255**: Intensidade de verde
- **255**: Máximo verde
- **0**: Sem verde

#### Blue (Azul)
- **0-255**: Intensidade de azul
- **255**: Máximo azul
- **0**: Sem azul

#### Alpha (Transparência)
- **0-255**: Transparência
- **255**: Opaco
- **0**: Transparente
- **128**: 50% transparente

### Exemplos

#### Vermelho Vermelho
```
[255, 0, 0, 128]
```

#### Amarelo
```
[255, 255, 0, 128]
```

#### Branco
```
[255, 255, 255, 128]
```

#### Transparente
```
[255, 0, 0, 0]
```

---

## Flash Duration

### Descrição
Duração (em frames) do efeito de flash do popup.

### Parâmetro
```
Flash Duration: 30
```

### Comportamento
- Número de frames que o flash dura
- **60 frames ≈ 1 segundo** (a 60 FPS)

### Exemplos
```
15  // 0.25 segundos
30  // 0.5 segundos (default)
60  // 1 segundo
120 // 2 segundos
```

### Uso Típico
- **Valores baixos**: Flash rápido, menos visível
- **Valores altos**: Flash lento, mais visível

---

## Como Funciona o Interrupt

### Condições para Interrupt

Um interrupt ocorre quando **todas** as seguintes condições são verdadeiras:

1. Target está em **Casting State** (skill com speed < 0)
2. Skill/Item tem notetag `<ATB Interrupt>`
3. Target **não** tem `<ATB Cannot Be Interrupted>`
4. Skill/Item acerta o target (hit)

### Efeitos do Interrupt

Quando um interrupt ocorre:

1. **Casting Cancelado**: Ação em cast é cancelada
2. **Gauge Resetada**: ATB Gauge volta para 0%
3. **Animation** (se configurado): Animação toca
4. **Text Popup** (se configurado): Texto aparece
5. **Flash Effect** (se configurado): Popup pisca

### Consulte Também
- [Notetags: Gauge Manipulation](../notetags/gauge-manipulation.md) - Notetag `<ATB Interrupt>`
- [Mecânica ATB](../conceitos/mecanica-atb.md) - Casting states
