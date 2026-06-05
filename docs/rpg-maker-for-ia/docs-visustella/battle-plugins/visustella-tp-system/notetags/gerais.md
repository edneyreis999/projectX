# Notetags Gerais - Enhanced TP System

Notetags que afetam tanto actors quanto enemies, além de skills, items e states.

## TP Mode Notetags

Notetags relacionadas a TP Mode que afetam ambos actors e enemies.

---

### `<TP Mode: name>`

**Usado em:** Actor, Enemy, State

**Função:** Define o TP Mode inicial para este actor/enemy.

**Parâmetros:**
- `name` - Nome de um TP Mode da lista Plugin Parameters > TP Modes

**Exemplo:**
```
<TP Mode: Berserker>
```

**Notas:**
- Pode ser sobrescrito por traits com `<Force TP Mode:>`
- Priority baseada em ordem de trait objects

---

### `<Starting TP Modes>` ... `</Starting TP Modes>`

**Usado em:** Actor

**Função:** Adiciona TP Modes à lista disponível do actor desde o início.

**Parâmetros:**
- `name` - Nome de um TP Mode (linhas múltiplas)

**Exemplo:**
```
<Starting TP Modes>
 Berserker
 Tactician
 Healer
</Starting TP Modes>
```

**Notas:**
- Actor poderá selecionar entre estes modes
- Requer que TP Mode seja mostrado em Scene_Skill

---

## Change TP Mode Notetags

Notetags para mudar o TP Mode via skills/items.

---

### `<Change Target TP Mode: name>`

**Usado em:** Skill, Item

**Função:** Muda o TP Mode do alvo para `name` ao usar este item/skill.

**Parâmetros:**
- `name` - Nome de um TP Mode

**Requisitos:**
- Ação deve acertar o alvo com sucesso

**Exemplo:**
```
<Change Target TP Mode: Cautious>
```

---

### `<Change User TP Mode: name>`

**Usado em:** Skill, Item

**Função:** Muda o TP Mode do usuário para `name` ao usar este item/skill.

**Parâmetros:**
- `name` - Nome de um TP Mode

**Exemplo:**
```
<Change User TP Mode: Desperate>
```

---

## Force TP Mode

**Usado em:** Actor, Class, Weapon, Armor, Enemy, State

**Função:** Força o battler a usar o TP Mode especificado em batalha.

**Notetags:** Ver [Notetags para Atores](atores.md) para detalhes completos de `<Force TP Mode:>`.

---

## Referência Rápida

Consulte [referencia-rapida.md](referencia-rapida.md) para lista compacta de todas as notetags.

## Documentação Relacionada

- [Notetags para Atores](atores.md) - Notetags exclusivas de actors
- [Comandos de Atores](../comandos/atores.md) - Plugin Commands equivalentes
- [Modos de TP](../parametros/modos.md) - Criar/editar TP Modes
