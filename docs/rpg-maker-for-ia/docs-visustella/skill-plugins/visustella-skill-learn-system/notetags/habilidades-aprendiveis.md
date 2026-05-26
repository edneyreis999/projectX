# Notetags - Habilidades Aprendiveis

## Definindo Skills Aprendiveis por Classe

Skills que podem ser aprendidas pelo sistema sao definidas nas **Classes** via notetags.

---

### `<Learn Skill: id>`
### `<Learn Skills: id, id, id>`
### `<Learn Skill: name>`
### `<Learn Skills: name, name, name>`

- **Uso**: Class Notetags
- Define quais skills a classe pode aprender pelo Skill Learn System.
- `id`: ID numerica da skill.
- `name`: nome da skill.
- Multiplas entradas sao permitidas.

**Exemplo:**
```
<Learn Skill: 10>
<Learn Skills: 15, 20, 25>
<Learn Skill: Fireball>
<Learn Skills: Ice Bolt, Thunder Strike, Heal>
```

---

### `<Learn Skills>`
### ` id`
### ` id`
### ` name`
### `</Learn Skills>`

- **Uso**: Class Notetags
- Formato multi-linha para definir skills aprendiveis.
- `id`: ID numerica da skill.
- `name`: nome da skill.
- Permite multiplas entradas no corpo.

**Exemplo:**
```
<Learn Skills>
 10
 15
 20
 Fireball
 Heal
</Learn Skills>
```

---

## Notas Importantes

- Skills definidas aqui aparecem no menu "Learn" do Skill Learn System
- Skills ja aprendidas podem ser ocultadas (configuravel em Plugin Parameters)
- A ordem de definicao nao afeta a ordem de exibicao (controlada por skill type e ID)
- Skills que nao estao nesta lista NAO podem ser aprendidas pelo sistema, mesmo que tenham notetags de custo
