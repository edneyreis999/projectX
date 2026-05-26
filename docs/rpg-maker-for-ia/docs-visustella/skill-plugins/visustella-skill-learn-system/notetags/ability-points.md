# Notetags - Ability Points (AP)

## AP Inicial

### `<Starting AP: x>`
- **Uso**: Actor Notetags
- Define a quantidade inicial de AP do ator em sua classe inicial.
- Substituir `x` pelo valor numerico.

### `<Class id Starting AP: x>`
### `<Class name Starting AP: x>`
- **Uso**: Actor Notetags
- Define AP inicial para uma classe especifica (quando AP nao e compartilhado).
- `id`: ID da classe. `name`: nome da classe.

---

## Ganho de AP em Batalha

### `<AP Gain: x>` / `<User AP Gain: x>`
- **Uso**: Skill, Item Notetags
- O usuario ganha `x` AP ao usar a skill/item em batalha.
- **Gatilho**: por hit (cada hit da acao).
- **Sobrepoe**: a configuracao "Per Action Hit" dos Plugin Parameters.

### `<Target AP Gain: x>`
- **Uso**: Skill, Item Notetags
- O alvo ganha `x` AP quando a skill/item e usada.
- **Gatilho**: por hit.

---

## AP de Inimigos

### `<AP: x>`
- **Uso**: Enemy Notetags
- Quantidade de AP que o inimigo concede ao party ao ser derrotado.
- **Sobrepoe**: a configuracao "Per Enemy" dos Plugin Parameters.

---

## Modificadores de AP

### `<AP Plus: +x%>` / `<AP Plus: -x%>`
- **Uso**: Actor, Class, Weapon, Armor, State Notetags
- Modificador aditivo de ganho de AP.
- **Stack**: aditivo com outros Plus.
- **Nao se aplica** a operacoes diretas (Add/Lose/Set).
- **Formula**: `(1 + Plus) * Rate + Flat`

### `<AP Rate: x%>`
- **Uso**: Actor, Class, Weapon, Armor, State Notetags
- Modificador multiplicativo de ganho de AP.
- **Stack**: multiplicativo com outros Rate.
- **Nao se aplica** a operacoes diretas (Add/Lose/Set).

### `<AP Flat: +x%>` / `<AP Flat: -x%>`
- **Uso**: Actor, Class, Weapon, Armor, State Notetags
- Modificador flat de ganho de AP.
- **Stack**: aditivo com outros Flat.
- **Nao se aplica** a operacoes diretas (Add/Lose/Set).

---

## Referencia Rapida

| Notetag | Aplicacao | Tipo |
|---------|-----------|------|
| `<Starting AP: x>` | Actor | Inicial |
| `<Class id Starting AP: x>` | Actor | Inicial |
| `<AP Gain: x>` | Skill, Item | Ganho por uso |
| `<Target AP Gain: x>` | Skill, Item | Ganho do alvo |
| `<AP: x>` | Enemy | Recompensa |
| `<AP Plus: +x%>` | Actor/Class/Weapon/Armor/State | Modificador |
| `<AP Rate: x%>` | Actor/Class/Weapon/Armor/State | Modificador |
| `<AP Flat: +x%>` | Actor/Class/Weapon/Armor/State | Modificador |
