# Glossário - Enhanced TP System

> Termos e conceitos importantes do sistema TP.

## Termos Principais

### TP (Tension Points)

**Definição:** Recurso de combate usado por battlers em RPG Maker MZ. Também chamado de "Tech Points" ou "Tension Points".

**No Sistema Enhanced:** TP pode ter comportamentos completamente diferentes dependendo do TP Mode ativo.

---

### TP Mode

**Definição:** Conjunto de regras que define como um battler interage com o sistema TP.

**Componentes:**
- MaxTP (máximo de TP)
- TCR Multiplier (multiplicador de ganho)
- Preserve TP? (se preserva entre batalhas)
- Fórmulas de ganho (quando/quanto TP é ganho)
- Aparência do gauge (label, cores, flash)

**Analogia:** Como uma "classe" ou "postura" de combate que define o estilo de TP.

---

### MaxTP

**Definição:** Valor máximo de TP que um battler pode ter.

**No Sistema Enhanced:** Definido por fórmula JavaScript no TP Mode. Pode variar dinamicamente.

**Exemplos:**
- `100` - Fixo em 100
- `user.level * 10` - Escalona com nível
- `50 + user.agi / 2` - Base + atributo

---

### TCR (TP Charge Rate)

**Definição:** Multiplicador de quanto TP é ganho.

**No Sistema Enhanced:** `TCR Multiplier` do TP Mode multiplica com TCR de traits.

**Cálculo:** `TCR final = TCR (trait) × TCR Multiplier (mode)`

**Exemplo:** Trait TCR 1.5 × Mode TCR 1.2 = 1.8 (180% de ganho)

---

### Preserve TP

**Definição:** Se TP é carregado entre batalhas ou reseta.

**No Sistema Enhanced:** Determinado pelo TP Mode (`Preserve TP?`), **não** por trait nativo.

**Comportamento:**
- `ON`: TP é mantido para próxima batalha
- `OFF`: TP reseta, usa fórmula "Initial TP"

---

### Initial TP

**Definição:** TP que um battler tem no início de batalha.

**No Sistema Enhanced:** Controlado por fórmula, aplicado mesmo se `Preserve TP = ON`.

**Diferença do Nativo:** Sistema nativo dava TP aleatório se Preserve TP = OFF. Enhanced TP sempre usa fórmula.

---

### Gauge Flash

**Definição:** Efeito visual onde o gauge de TP pisca em cores diferentes.

**Requisito:** VisuStella MZ Skills & States Core

**Configuração:** Por TP Mode
- `Required Rate`: Porcentagem mínima para piscar
- `Flash Speed`: Velocidade da transição
- `Color Lightness**: Claridade das cores

---

### Custom Label

**Definição:** Texto substituto exibido no gauge em vez de "TP".

**Exemplos:** "MOMENTUM", "GUARDA", "FÚRIA", "FOCO"

**Importante:** Aplica-se apenas ao gauge visual, não a custos de skills.

---

### Custom Color

**Definição:** Cores customizadas para o gauge de TP.

**Formatos:**
- `#rrggbb` - Cor hexadecimal
- `0-255` - Número do Window Skin

**Importante:** Aplica-se apenas ao gauge visual.

---

### TP Mode Name

**Definição:** Nome identificador único de um TP Mode.

**Uso:** Referência em notetags e plugin commands.

**Importante:** Case sensitive, deve ser único.

---

## Ações e Eventos

### Learn TP Mode

**Definição:** Aprender permanentemente um TP Mode ao aprender uma skill.

**Escopo:** Apenas atores

**Diferença:** "Unlock" é temporário, "Learn" é permanente.

---

### Unlock TP Mode

**Definição:** Desbloquear um TP Mode para uso temporário.

**Escopo:** Skills e Items

**Diferença:** "Learn" é permanente, "Unlock" é temporário.

---

### Force TP Mode

**Definição:** Impor um TP Mode específico via trait.

**Escopo:** Actor, Class, Weapon, Armor, Enemy, State

**Prioridade:** Sobrescreve todas as outras configurações.

---

### Change TP Mode

**Definição:** Alterar o TP Mode de um battler.

**Via:**
- Notetag `<Change Target TP Mode>` - Skill/Item muda alvo
- Notetag `<Change User TP Mode>` - Skill/Item muda usuário
- Plugin Command - Muda em evento

---

## Siglas

### TCR

**TP Charge Rate** - Taxa de Carregamento de TP

### TP

**Tension Points** - Pontos de Tensão

---

## Ver Também

- [Visão Geral](conceitos/visao-geral.md) - Introdução ao sistema
- [TP Modes](conceitos/tp-modes.md) - Mecânica central
- [Parâmetros](parametros/modos-tp.md) - Configuração completa
