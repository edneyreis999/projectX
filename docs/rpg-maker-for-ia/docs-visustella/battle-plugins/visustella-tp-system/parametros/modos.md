# Parâmetros - Modos de TP - Enhanced TP System

TP Modes são as configurações de TP de um actor/enemy. Regulam como TP é ganho e o valor máximo.

## Estrutura de um TP Mode

Cada TP Mode contém as seções abaixo:

1. **General** - Identidade e limites
2. **Gauge** - Visual e cores
3. **TP Formulas** - Todas as fórmulas de ganho (veja [Fórmulas de TP](formulas.md))

---

## General Section

### TP Mode Name

**Função:** Nome do mode.

**Uso:**
- Referência em notetags
- Nome mostrado no Scene_Skill
- Identificador único

**Exemplo:** `Berserker`

**Notas:**
- Use nomes descritivos
- Evite caracteres especiais
- Case-sensitive

---

### Icon

**Função:** Ícone do mode.

**Valor:** Número do ícone do database

**Exemplo:** `87` (ícone de axe)

---

### Help

**Função:** Descrição do mode.

**Valor:** String com placeholder `%1`

**Placeholder `%1`:** Substituído por vocabulário de TP do database

**Exemplo:**
- `Mode focused on offense. %1 regen is slower.`
- `%1 charges faster when damaged.`

**Resultado no jogo:**
- "Mode focused on offense. TP regen is slower."

---

### MaxTP Formula

**Função:** Limite máximo de TP.

**Valor:** Fórmula JavaScript

**Exemplos:**
- `100` → Fixo em 100
- `user.level * 10` → Baseado em level
- `user.hp + user.mp` → HP + MP

**Variáveis disponíveis:**
- `user` - Battler atual
- `user.level`, `user.mhp`, `user.hp`, etc.

---

### TCR Multiplier

**Função:** Multiplicador de quanto TP é ganho.

**Valor:** Número decimal

**Comportamento:**
- `1.0` = normal
- `2.0` = dobro de TP
- `0.5` = metade do TP

**Stacking:** Multiplicativo com TCR (TP Charge Rate)

**Exemplo:**
```
TCR trait: 150%
TP Mode TCR: 1.5
Resultado: 1.5 * 1.5 = 2.25 (225%)
```

---

### Preserve TP?

**Função:** TP persiste para próxima batalha?

**Valores:**
- `true` - TP carrega para próxima batalha
- `false` - TP reseta cada batalha

**Notas Importantes:**
- Sobrescreve trait "Preserve TP"
- Determinado pelo TP Mode, não pelo battler
- Veja [Mudanças no Core](../conceitos/mudancas-core.md)

---

## Gauge Section

Configuração visual do gauge.

### Flash Gauge?

**Função:** Gauge pisca ao atingir certo percentual.

**Requisito:** VisuMZ_1_SkillsStatesCore

**Valor:** Boolean (true/false)

---

### Required Rate

**Função:** Percentual mínimo para ativar flash.

**Valor:** Decimal (0.0 a 1.0)

**Exemplos:**
- `0.5` → 50% TP
- `0.75` → 75% TP
- `0.9` → 90% TP

**Notas:**
- Só funciona se Flash Gauge? = true
- Pisca continuamente acima deste valor

---

### Flash Speed

**Função:** Velocidade do flash (troca de cores).

**Valor:** Número

**Comportamento:**
- Menor = mais lento
- Maior = mais rápido

**Exemplo:** `10` (velocidade média)

---

### Color Lightness

**Função:** Quão clara é a cor do flash.

**Valor:** Número

**Comportamento:**
- Menor = mais escuro
- Maior = mais claro

**Exemplo:** `120` (claro)

---

### Custom Label

**Função:** Label customizado no gauge (em vez de "TP").

**Valor:** String ou vazio

**Exemplo:** `RAGE` (para modo Berserker)

**Notas:**
- Vazio = usa "TP"
- **Só afeta gauge visual**
- **NÃO muda custo de skills** (continua mostrando "TP")

---

### Custom Color 1 / Custom Color 2

**Função:** Cores customizadas do gauge.

**Valores:**
- `#rrggbb` → Hex color (ex: `#ff0000` = vermelho)
- Número → Color index do Window Skin
- Vazio → Cores default

**Exemplo:**
- Color 1: `#ff4444` (vermelho claro)
- Color 2: `#aa0000` (vermelho escuro)

**Notas:**
- **Só afeta gauge visual**
- **NÃO muda cores de custo de skills**

---

## Próximo: Fórmulas de TP

Configurar as fórmulas de ganho de TP em [Fórmulas de TP](formulas.md).

## Documentação Relacionada

- [Configuração Geral](configuracao-geral.md) - Defaults e Scene_Skill
- [Fórmulas de TP](formulas.md) - Todas as fórmulas de ganho
- [Mudanças no Core](../conceitos/mudancas-core.md) - MaxTP e Preserve TP
