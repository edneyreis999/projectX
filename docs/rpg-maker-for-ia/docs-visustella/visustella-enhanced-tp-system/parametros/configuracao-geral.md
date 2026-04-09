# Parâmetros - Configuração Geral

> Configurações globais do Enhanced TP System que controlam defaults e interface.

## Localização

**Plugin Manager → VisuMZ_2_EnhancedTpSystem → General Settings**

---

## Defaults

### Default TP Mode

**Descrição:** TP Mode padrão para atores e inimigos que não têm um modo especificado.

**Valores:**
- Selecione um TP Mode da lista de modos configurados

**Comportamento:**
- Aplicado a Actors sem `<TP Mode>` notetag
- Aplicado a Enemies sem `<TP Mode>` notetag
- Usado como fallback quando nenhum modo está definido

**Exemplo:**
```
Default TP Mode: Basic
```

---

### Global TP Modes

**Descrição:** Lista de TP Modes disponíveis para **todos os atores** selecionarem em Scene_Skill.

**Valores:**
- Lista de nomes de TP Modes (separados por vírgula ou um por linha)

**Comportamento:**
- Estes modos aparecem no seletor de TP Mode para qualquer personagem
- Personagens podem ter modos adicionais via `<Starting TP Modes>`
- Modos não listados aqui não aparecem no seletor (mas ainda podem ser aplicados via notetag/plugin command)

**Exemplo:**
```
Global TP Modes:
  Basic
  Standard
  Advanced
```

**Diferença: `<Starting TP Modes>` vs `Global TP Modes`**

| Característica | Starting TP Modes | Global TP Modes |
|----------------|-------------------|-----------------|
| **Escopo** | Personagem específico | Todos os personagens |
| **Definição** | Notetag no Actor | Parâmetro do plugin |
| **Seletor** | Adiciona ao personagem | Base para todos |

---

## Scene_Skill

Configurações do seletor de TP Mode no menu de Skills.

### Show TP Mode?

**Descrição:** Mostrar ou ocultar o comando de TP Mode em Scene_Skill por padrão.

**Valores:**
- `ON` - Mostra comando
- `OFF` - Oculta comando

**Comportamento:**
- Configuração padrão (pode ser sobrescrita via Plugin Command)
- Se `OFF`, comando não aparece (mas TP Modes ainda funcionam via notetag/commands)
- Se `ON`, jogador pode trocar TP Mode no menu Skills

---

### TP Mode Command

**Descrição:** Formato do nome do comando exibido em Scene_Skill.

**Valores:**
- String com `%1` como placeholder para o texto de TP

**Códigos:**
- `%1` - Substituído pelo vocabulário de TP do sistema (padrão: "TP")

**Exemplos:**
```
TP Mode Command: TP Mode
TP Mode Command: %1 Mode
TP Mode Command: Change %1 Style
```

**Resultado:**
- Se vocabulário de TP é "TP": "TP Mode"
- Se vocabulário de TP é "Momentum": "Momentum Mode"

---

### TP Mode Icon

**Descrição:** Ícone exibido ao lado do comando de TP Mode em Scene_Skill.

**Valores:**
- Número do ícone (conforme database do RPG Maker)

**Exemplo:**
```
TP Mode Icon: 76  (ícone de espada)
```

---

### Background Type

**Descrição:** Tipo de fundo da janela de seleção de TP Mode.

**Valores:**
- `0 - Window` - Fundo de janela padrão (com skin)
- `1 - Dim` - Fundo escuro sem bordas
- `2 - Transparent` - Fundo transparente

**Uso Visual:**
- `Window`: Padrão RPG Maker, mais visível
- `Dim`: Moderno, menos intrusivo
- `Transparent`: Integrado ao fundo

**Exemplo:**
```
Background Type: 1
```

---

## Configuração Recomendada

### Jogo Completo com TP System

```
Defaults
  Default TP Mode: Basic
  Global TP Modes:
    Momentum
    Guarda
    Fúria
    Foco

Scene_Skill
  Show TP Mode?: ON
  TP Mode Command: %1 Mode
  TP Mode Icon: 76
  Background Type: 0
```

### Jogo Sem Seleção de TP Mode

```
Defaults
  Default TP Mode: Basic
  Global TP Modes: (vazio)

Scene_Skill
  Show TP Mode?: OFF
```

---

## Ver Também

- [TP Modes (Conceito)](../conceitos/tp-modes.md) - Entenda o sistema de modos
- [Modos TP (Configuração)](modos-tp.md) - Criar e configurar modos específicos
- [Comandos de Sistema](../comandos/sistema.md) - Show/Hide TP Mode via evento
