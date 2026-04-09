# Parâmetros - TP Modes

> Como criar e configurar TP Modes individuais.

## Localização

**Plugin Manager → VisuMZ_2_EnhancedTpSystem → TP Modes**

## Estrutura de um TP Mode

Cada TP Mode consiste em **4 seções principais**:

```
┌──────────────────────────────────────┐
│  TP Mode: "Momentum"                 │
├──────────────────────────────────────┤
│  General                             │
│  ├── Name, Icon, Help                │
│  ├── MaxTP Formula                   │
│  ├── TCR Multiplier                  │
│  └── Preserve TP?                    │
├──────────────────────────────────────┤
│  Gauge                               │
│  ├── Flash settings                  │
│  ├── Custom Label/Colors             │
│  └── Visual customization            │
├──────────────────────────────────────┤
│  TP Formulas (vários)                │
│  └── Quando e quanto TP é ganho      │
└──────────────────────────────────────┘
```

---

## Seção: General

### TP Mode Name

**Descrição:** Nome identificador do TP Mode.

**Importante:**
- Usado para referência em notetags e plugin commands
- Deve ser único (não pode ter dois modos com mesmo nome)
- Case sensitive ("Momentum" ≠ "momentum")

**Exemplo:**
```
TP Mode Name: Momentum
```

---

### Icon

**Descrição:** Ícone que representa este TP Mode nas interfaces.

**Valor:** Número do ícone do database do RPG Maker

**Exemplo:**
```
Icon: 77 (ícone de movimento)
```

---

### Help

**Descrição:** Texto de ajuda exibido quando o modo está selecionado.

**Códigos:**
- `%1` - Substituído pelo vocabulário de TP do sistema

**Exemplos:**
```
Help: Gera %1 com ataques rápidos
Help: Consome %1 para golpes especiais
```

---

### MaxTP Formula

**Descrição:** Fórmula JavaScript que calcula o **máximo de TP** para este modo.

**Variáveis Disponíveis:**
- `user` - O battler (ator/inimigo)
- `a` - Aliado (em contextos de equipe)

**Exemplos:**
```
MaxTP Formula: 100                           (fixo)
MaxTP Formula: user.level * 10              (escalona com nível)
MaxTP Formula: 50 + user.agi / 2            (base + atributo)
MaxTP Formula: Math.max(1, user.hp / 10)    (baseado em HP)
```

**Importante:**
- Deve retornar um número
- Valores decimais são arredondados
- Valores negativos ou zero podem causar bugs

---

### TCR Multiplier

**Descrição:** Multiplicador de **TCR (TP Charge Rate)** - quanto TP é ganho.

**Comportamento:**
- `1.0` = 100% (ganho normal)
- `1.5` = 150% (ganho 50% maior)
- `0.5` = 50% (ganho metade)

**Stacking:**
- Multiplicativo com TCR de traits
- Exemplo: TCR 1.5 (trait) × 1.2 (mode) = 1.8 (180%)

**Exemplos:**
```
TCR Multiplier: 1.0   (normal)
TCR Multiplier: 1.5   (+50% ganho)
TCR Multiplier: 0.8   (-20% ganho)
```

---

### Preserve TP?

**Descrição:** Se TP é preservado entre batalhas.

**Valores:**
- `ON` - TP é carregado para próxima batalha
- `OFF` - TP reseta a cada batalha

**Comportamento:**
- Substitui trait nativo "Preserve TP"
- Determina quando fórmula "Initial TP" é usada

**Exemplos:**
```
Preserve TP?: ON   (personagem mantém TP)
Preserve TP?: OFF  (TP reseta cada batalha)
```

---

## Seção: Gauge

### Flash Gauge?

**Descrição:** Se o gauge pisca quando atinge certa porcentagem.

**Requisito:** VisuStella MZ Skills & States Core

**Valores:**
- `ON` - Ativa flash do gauge
- `OFF` - Gauge normal

---

### Required Rate

**Descrição:** Porcentagem mínima para o gauge começar a piscar.

**Valores:** 0.0 a 1.0
- `0.5` = 50% do gauge
- `0.8` = 80% do gauge
- `1.0` = 100% do gauge

**Exemplo:**
```
Required Rate: 0.8  (piscar quando TP ≥ 80%)
```

---

### Flash Speed

**Descrição:** Velocidade da transição de cores ao piscar.

**Valores:**
- **Baixos** (5-10): Transição lenta
- **Médios** (15-30): Transição moderada
- **Altos** (40+): Transição rápida

**Exemplo:**
```
Flash Speed: 20
```

---

### Color Lightness

**Descrição:** Quão clara é a cor do flash.

**Valores:**
- **Baixos** (0-100): Cores escuras
- **Médios** (101-170): Cores médias
- **Altos** (171-255): Cores claras

**Exemplo:**
```
Color Lightness: 140
```

---

### Custom Label

**Descrição:** Texto customizado exibido no gauge em vez de "TP".

**Valor:** String ou vazio
- Vazio = Usa "TP"
- Texto = Usa texto customizado

**Importante:**
- Aplica-se **apenas ao gauge visual**
- **NÃO** muda como custos de TP são exibidos em skills
- Use termos temáticos (ex: "Momentum", "Guarda", "Fúria")

**Exemplos:**
```
Custom Label: MOMENTUM
Custom Label: GUARDA
Custom Label: FÚRIA
Custom Label: (vazio = usa "TP")
```

---

### Custom Color 1 & 2

**Descrição:** Cores customizadas para o gauge de TP.

**Formatos:**
- `#rrggbb` - Cor hexadecimal (ex: `#ff0000` = vermelho)
- `0-255` - Número de cor do Window Skin
- Vazio = Usa cores padrão de TP

**Importante:**
- Aplica-se **apenas ao gauge visual**
- **NÃO** mange cores de custos de TP em skills

**Exemplos:**
```
Custom Color 1: #4a90e2  (azul)
Custom Color 2: #50c878  (verde)

Custom Color 1: 10       (cor 10 do Window Skin)
Custom Color 2: (vazio)
```

---

## Exemplos Completos de TP Modes

### Modo: Momentum (Filena)

```
General
  TP Mode Name: Momentum
  Icon: 77
  Help: Gera %1 com ataques rápidos e combos
  MaxTP Formula: 100
  TCR Multiplier: 1.2
  Preserve TP?: ON

Gauge
  Flash Gauge?: ON
  Required Rate: 0.8
  Flash Speed: 20
  Color Lightness: 150
  Custom Label: MOMENTUM
  Custom Color 1: #00d9ff
  Custom Color 2: #0099cc
```

### Modo: Guarda (Kilin)

```
General
  TP Mode Name: Guarda
  Icon: 68
  Help: Gera %1 ao proteger aliados e defender
  MaxTP Formula: 50
  TCR Multiplier: 1.0
  Preserve TP?: OFF

Gauge
  Flash Gauge?: ON
  Required Rate: 1.0
  Flash Speed: 15
  Color Lightness: 120
  Custom Label: GUARDA
  Custom Color 1: #4a90e2
  Custom Color 2: #2c5aa0
```

### Modo: Fúria (Mhordred)

```
General
  TP Mode Name: Fúria
  Icon: 65
  Help: Gera %1 com dano recebido e causado
  MaxTP Formula: 100
  TCR Multiplier: 1.5
  Preserve TP?: OFF

Gauge
  Flash Gauge?: ON
  Required Rate: 0.5
  Flash Speed: 30
  Color Lightness: 180
  Custom Label: FÚRIA
  Custom Color 1: #ff4444
  Custom Color 2: #cc0000
```

---

## Ver Também

- [Fórmulas TP](formulas-tp.md) - Configurar quando/quanto TP é ganho
- [Conceito de TP Modes](../conceitos/tp-modes.md) - Entenda a mecânica
- [Notetags Gerais](../notetags/gerais.md) - Aplicar TP Modes no database
