# Notetags - Skills Gerais

Notetags gerais relacionadas a skills. Estas notetags requerem o plugin Skills & States Core ativo.

---

## Skill Types Múltiplos

```
<Skill Type: x>
<Skill Types: x,x,x>
<Skill Type: name>
<Skill Types: name, name, name>
```

- **Usado em**: Skill Notetags
- Marca a skill com múltiplos Skill Types, aparecendo em diferentes categorias sem duplicar a skill
- `x` = Skill Type ID (número)
- `name` = Skill Type name

**Exemplo**:
```
<Skill Types: 1, 3, 5>
```

---

## List Name Customizado

```
<List Name: name>
```

- **Usado em**: Skill Notetags
- Faz o nome da skill aparecer diferente na skill list
- Suporta `\V[x]` para variáveis

**Exemplo**:
```
<List Name: \V[42] Blade>
```

---

## ID Sort Priority

```
<ID Sort Priority: x>
```

- **Usado em**: Skill Notetags (Scene_Skill)
- Muda a prioridade de sorting por ID para `x`
- **Default**: 50
- Valores maiores = mais alto na lista; menores = mais baixo

**Exemplo**:
```
<ID Sort Priority: 100>
```

---

## Gauge Replacement por Classe

```
<Replace HP Gauge: type>
<Replace MP Gauge: type>
<Replace TP Gauge: type>
```

- **Usado em**: Class Notetags
- Substitui o gauge HP (1o), MP (2o) ou TP (3o) por outro Skill Cost Type
- `type` = resource type (HP, MP, TP, Gold, Potion, etc.)
- `none` para não exibir gauge nenhum
- **NÃO funciona** com 'Item Cost', 'Weapon Cost' ou 'Armor Cost'
- `<Replace TP Gauge>` requer 'Display TP in Window' ON no Database > System 1

**Exemplo**:
```
<Replace MP Gauge: Gold>
<Replace TP Gauge: none>
```
