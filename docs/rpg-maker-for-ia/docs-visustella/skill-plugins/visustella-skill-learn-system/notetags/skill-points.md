# Notetags - Skill Points (SP)

## SP Inicial

### `<Starting SP: x>`
- **Uso**: Actor Notetags
- Define a quantidade inicial de SP do ator em sua classe inicial.
- Substituir `x` pelo valor numerico.

### `<Class id Starting SP: x>`
### `<Class name Starting SP: x>`
- **Uso**: Actor Notetags
- Define SP inicial para uma classe especifica (quando SP nao e compartilhado).
- `id`: ID da classe. `name`: nome da classe.

---

## Ganho de SP em Batalha

### `<SP Gain: x>` / `<User SP Gain: x>`
- **Uso**: Skill, Item Notetags
- O usuario ganha `x` SP ao usar a skill/item em batalha.
- **Gatilho**: por hit (cada hit da acao).
- **Sobrepoe**: a configuracao "Per Action Hit" dos Plugin Parameters.

### `<Target SP Gain: x>`
- **Uso**: Skill, Item Notetags
- O alvo ganha `x` SP quando a skill/item e usada.
- **Gatilho**: por hit.

---

## SP de Inimigos

### `<SP: x>`
- **Uso**: Enemy Notetags
- Quantidade de SP que o inimigo concede ao party ao ser derrotado.
- **Sobrepoe**: a configuracao "Per Enemy" dos Plugin Parameters.

---

## Modificadores de SP

### `<SP Plus: +x%>` / `<SP Plus: -x%>`
- **Uso**: Actor, Class, Weapon, Armor, State Notetags
- Modificador aditivo de ganho de SP.
- **Stack**: aditivo com outros Plus.
- **Nao se aplica** a operacoes diretas (Add/Lose/Set).
- **Formula**: `(1 + Plus) * Rate + Flat`

### `<SP Rate: x%>`
- **Uso**: Actor, Class, Weapon, Armor, State Notetags
- Modificador multiplicativo de ganho de SP.
- **Stack**: multiplicativo com outros Rate.
- **Nao se aplica** a operacoes diretas (Add/Lose/Set).

### `<SP Flat: +x%>` / `<SP Flat: -x%>`
- **Uso**: Actor, Class, Weapon, Armor, State Notetags
- Modificador flat de ganho de SP.
- **Stack**: aditivo com outros Flat.
- **Nao se aplica** a operacoes diretas (Add/Lose/Set).

---

## Referencia Rapida

| Notetag | Aplicacao | Tipo |
|---------|-----------|------|
| `<Starting SP: x>` | Actor | Inicial |
| `<Class id Starting SP: x>` | Actor | Inicial |
| `<SP Gain: x>` | Skill, Item | Ganho por uso |
| `<Target SP Gain: x>` | Skill, Item | Ganho do alvo |
| `<SP: x>` | Enemy | Recompensa |
| `<SP Plus: +x%>` | Actor/Class/Weapon/Armor/State | Modificador |
| `<SP Rate: x%>` | Actor/Class/Weapon/Armor/State | Modificador |
| `<SP Flat: +x%>` | Actor/Class/Weapon/Armor/State | Modificador |
