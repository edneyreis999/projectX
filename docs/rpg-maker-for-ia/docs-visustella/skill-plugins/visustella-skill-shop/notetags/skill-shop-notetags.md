# Notetags — VisuStella Skill Shop

Todas as notetags são aplicadas em **Skills** (database de skills do RPG Maker MZ).

---

## Custo

### `<Skill Shop Cost: x>`

Define o custo em gold da skill na loja.

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `x` | número | Quantidade de gold necessária |

- Se esta notetag não estiver presente, o custo padrão do Plugin Parameters é utilizado.

---

## Moeda Extendida (requer MoreCurrencies)

### `<Item id Learn Cost: x>`
### `<Item name Learn Cost: x>`
### `<Weapon id Learn Cost: x>`
### `<Weapon name Learn Cost: x>`
### `<Armor id Learn Cost: x>`
### `<Armor name Learn Cost: x>`
### `<Variable id Learn Cost: x>`

Permite comprar skills usando itens, armas, armaduras ou variáveis como moeda alternativa.

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `id` | número | ID do item/arma/armadura/variável |
| `name` | texto | Nome do item/arma/armadura/variável |
| `x` | número | Quantidade que será consumida na compra |

- **Requer**: `Imported.VisuMZ_2_MoreCurrencies`
- Múltiplas notetags podem ser usadas para custos combinados

---

## Requisito de Classe

### `<Skill Shop Require Class: id>`
### `<Skill Shop Require Classes: id, id, id>`
### `<Skill Shop Require Class: name>`
### `<Skill Shop Require Classes: name, name, name>`

Restringe a skill a atores com a(s) classe(s) especificada(s).

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `id` | número | ID da classe |
| `name` | texto | Nome da classe |

- Use a variante singular para uma classe, plural para múltiplas

---

## Requisito de Nível

### `<Skill Shop Require Level: x>`

Define o nível mínimo que o ator precisa ter.

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `x` | número | Nível mínimo requerido |

---

## Requisito de Skill Prévia

### `<Skill Shop Require Learned Skill: id>`
### `<Skill Shop Require Learned Skills: id, id, id>`
### `<Skill Shop Require Learned Skill: name>`
### `<Skill Shop Require Learned Skills: name, name, name>`

Exige que o ator já tenha aprendido a(s) skill(s) listada(s). Todas devem estar aprendidas.

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `id` | número | ID da skill |
| `name` | texto | Nome da skill |

- **Todas** as skills listadas devem estar aprendidas (AND lógico)

---

## Requisito de Switch

### `<Skill Shop Require Switch: x>`
### `<Skill Shop Require Switches: x, x, x>`

Exige que a(s) switch(es) esteja(m) ON para desbloquear a skill.

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `x` | número | ID da switch |

- Todas as switches listadas devem estar ON (AND lógico)

---

## Referência Rápida

| Notetag | Categoria | Requer MoreCurrencies |
|---------|-----------|----------------------|
| `<Skill Shop Cost: x>` | Custo | Não |
| `<Item/Weapon/Armor/Variable * Learn Cost: x>` | Custo alternativo | Sim |
| `<Skill Shop Require Class: *>` | Requisito | Não |
| `<Skill Shop Require Level: x>` | Requisito | Não |
| `<Skill Shop Require Learned Skill: *>` | Requisito | Não |
| `<Skill Shop Require Switch: x>` | Requisito | Não |
