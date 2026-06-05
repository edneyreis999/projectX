# Parâmetros: Opções (Options Settings)

## Overview

Estes parâmetros controlam a integração do ATB com o **Options menu** do jogo, permitindo players customizarem a exibição e velocidade das ATB Gauges.

## Requisitos
- **VisuMZ_1_OptionsCore** deve estar instalado
- Se OptionsCore não estiver presente, estes parâmetros não têm efeito

## Localização
**Plugin Parameters > Options Settings**

---

## Add Option?

### Descrição
Adiciona a opção "Show ATB Gauges" ao menu de opções.

### Parâmetro
```
Add Option?: true
```

### Comportamento
- **true**: Adiciona opção ao menu
- **false**: Não adiciona opção

### Opção Adicionada
Quando ativado, player pode toggle:
- **Show ATB Gauges**: Mostrar ou esconder ATB Gauges

### Uso Típico
```
true  // Player pode escolher ver gauges
false // Gauges sempre visíveis (ou sempre ocultas)
```

---

## Adjust Window Height

### Descrição
Se a janela de opções deve ajustar sua altura automaticamente para acomodar a nova opção.

### Parâmetro
```
Adjust Window Height?: true
```

### Comportamento
- **true**: Altura ajustada automaticamente
- **false**: Altura não ajustada (pode cortar conteúdo)

### Uso Típico
```
true  // Ajuste automático (recomendado)
false // Altura fixa
```

---

## Option Name

### Descrição
Nome (label) exibido para a opção no menu de opções.

### Parâmetro
```
Option Name: Show ATB Gauges
```

### Comportamento
Texto exibido ao lado da checkbox/toggle.

### Exemplos

#### Inglês
```
Show ATB Gauges
ATB Gauges
Display ATB
```

#### Português
```
Mostrar ATB Gauges
Barras ATB
Exibir ATB
```

#### Japonês
```
ATBゲージ表示
```

### Curto vs Longo
```
"Show ATB Gauges"     // Claro, mas longo
"ATB Gauges"          // Curto, claro o suficiente
"ATB"                 // Muito curto, pode ser ambíguo
```

---

## Integração com OptionsCore

### Funcionalidades Extras

Quando **VisuMZ_1_OptionsCore** está instalado, features adicionais estão disponíveis:

#### 1. ATB Gauge Speed
Player pode ajustar a velocidade de preenchimento das gauges:
- **Velocidades**: 0.5x, 1.0x, 1.5x, 2.0x
- **Default**: 1.0x (normal)

#### 2. Active/Wait ATB Toggle
Player pode toggle entre:
- **Active ATB**: Gauges preenchem mesmo durante seleção de comando
- **Wait ATB**: Gauges param durante seleção de comando

### Comportamento
Essas opções são adicionadas automaticamente pelo OptionsCore, sem configuração adicional necessária.

---

## Consulte Também

- [Parâmetros: Mecânica](parametros-mecanica.md) - JS: Acceleration (velocidade base)
- [Referência: Compatibilidade](../referencia/compatibilidade.md) - OptionsCore integration
