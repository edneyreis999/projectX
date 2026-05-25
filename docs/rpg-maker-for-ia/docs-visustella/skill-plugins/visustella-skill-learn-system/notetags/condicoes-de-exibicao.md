# Notetags - Condicoes de Exibicao (Show Conditions)

Show Conditions determinam se a skill **aparece visualmente** no menu de aprendizado. Se nao atendidas, a skill fica invisivel.

---

## Condicoes de Level

### `<Learn Show Level: x>`
- **Uso**: Skill Notetags
- O ator deve ter pelo menos nivel `x` para a skill aparecer na lista.
- Skill ficara invisivel ate o requisito ser atendido.

---

## Condicoes de Skills

### `<Learn Show Skill: id>`
### `<Learn Show Skill: name>`
- **Uso**: Skill Notetags
- O ator ja deve ter aprendido a skill especificada.

### `<Learn Show All Skills: id, id, id>`
### `<Learn Show All Skills: name, name, name>`
- **Uso**: Skill Notetags
- **Todas** as skills listadas devem ser conhecidas pelo ator.

### `<Learn Show Any Skills: id, id, id>`
### `<Learn Show Any Skills: name, name, name>`
- **Uso**: Skill Notetags
- **Qualquer uma** das skills listadas basta para a skill aparecer.

---

## Condicoes de Switches

### `<Learn Show Switch: x>`
- **Uso**: Skill Notetags
- O switch `x` deve estar ON.

### `<Learn Show All Switches: x, x, x>`
- **Uso**: Skill Notetags
- **Todos** os switches listados devem estar ON.

### `<Learn Show Any Switches: x, x, x>`
- **Uso**: Skill Notetags
- **Qualquer um** dos switches listados deve estar ON.

---

## Condicoes Dinamicas (JavaScript)

### `<JS Learn Show>`
```
 code
 visible = code;
</JS Learn Show>`
```
- **Uso**: Skill Notetags
- Determina visibilidade dinamica da skill.
- **Variaveis**: `user` (ator), `skill` (skill)
- **Retorno**: `visible` (booleano - true/false)
- Outras show conditions tambem devem ser atendidas.

### `<JS Learn Show List Text>`
```
 code
 text = code;
</JS Learn Show List Text>`
```
- **Uso**: Skill Notetags
- Texto customizado exibido na lista de skills quando a show condition esta ativa.
- **Variaveis**: `user`, `skill`. **Retorno**: `text` (string).

### `<JS Learn Show Detail Text>`
```
 code
 text = code;
</JS Learn Show Detail Text>`
```
- **Uso**: Skill Notetags
- Texto customizado exibido na janela de detalhes quando a show condition esta ativa.
- **Variaveis**: `user`, `skill`. **Retorno**: `text` (string).

---

## Referencia Rapida

| Notetag | Logica |
|---------|--------|
| `<Learn Show Level: x>` | Nivel minimo |
| `<Learn Show Skill: id>` | Skill especifica conhecida |
| `<Learn Show All Skills: ...>` | TODAS as skills conhecidas |
| `<Learn Show Any Skills: ...>` | QUALQUER skill conhecida |
| `<Learn Show Switch: x>` | Switch ON |
| `<Learn Show All Switches: ...>` | TODOS os switches ON |
| `<Learn Show Any Switches: ...>` | QUALQUER switch ON |
| `<JS Learn Show>` | Condicao dinamica JS |
| `<JS Learn Show List Text>` | Texto custom na lista |
| `<JS Learn Show Detail Text>` | Texto custom no detalhe |
