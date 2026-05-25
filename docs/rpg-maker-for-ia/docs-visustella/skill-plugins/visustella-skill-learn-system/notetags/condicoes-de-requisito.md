# Notetags - Condicoes de Requisito (Require Conditions)

Require Conditions determinam se a skill esta **habilitada** para selecao no menu. A skill aparece mas fica desabilitada (nao selecionavel) ate os requisitos serem atendidos.

---

## Condicoes de Level

### `<Learn Require Level: x>`
- **Uso**: Skill Notetags
- O ator deve ter pelo menos nivel `x` para a skill ser habilitada.

---

## Condicoes de Skills

### `<Learn Require Skill: id>`
### `<Learn Require Skill: name>`
- **Uso**: Skill Notetags
- O ator ja deve ter aprendido a skill especificada.

### `<Learn Require All Skills: id, id, id>`
### `<Learn Require All Skills: name, name, name>`
- **Uso**: Skill Notetags
- **Todas** as skills listadas devem ser conhecidas.

### `<Learn Require Any Skills: id, id, id>`
### `<Learn Require Any Skills: name, name, name>`
- **Uso**: Skill Notetags
- **Qualquer uma** das skills listadas basta.

---

## Condicoes de Switches

### `<Learn Require Switch: x>`
- **Uso**: Skill Notetags
- O switch `x` deve estar ON.

### `<Learn Require All Switches: x, x, x>`
- **Uso**: Skill Notetags
- **Todos** os switches listados devem estar ON.

### `<Learn Require Any Switches: x, x, x>`
- **Uso**: Skill Notetags
- **Qualquer um** dos switches listados deve estar ON.

---

## Condicoes Dinamicas (JavaScript)

### `<JS Learn Requirements>`
```
 code
 enabled = code;
</JS Learn Requirements>`
```
- **Uso**: Skill Notetags
- Determina se a skill esta habilitada dinamicamente.
- **Variaveis**: `user` (ator), `skill` (skill)
- **Retorno**: `enabled` (booleano - true/false)
- Outras require conditions tambem devem ser atendidas.

### `<JS Learn Requirements List Text>`
```
 code
 text = code;
</JS Learn Requirements List Text>`
```
- **Uso**: Skill Notetags
- Texto customizado exibido na lista quando requisitos nao atendidos.
- **Variaveis**: `user`, `skill`. **Retorno**: `text` (string).

### `<JS Learn Requirements Detail Text>`
```
 code
 text = code;
</JS Learn Requirements Detail Text>`
```
- **Uso**: Skill Notetags
- Texto customizado exibido na janela de detalhes quando requisitos nao atendidos.
- **Variaveis**: `user`, `skill`. **Retorno**: `text` (string).

---

## Referencia Rapida

| Notetag | Logica |
|---------|--------|
| `<Learn Require Level: x>` | Nivel minimo |
| `<Learn Require Skill: id>` | Skill especifica conhecida |
| `<Learn Require All Skills: ...>` | TODAS as skills conhecidas |
| `<Learn Require Any Skills: ...>` | QUALQUER skill conhecida |
| `<Learn Require Switch: x>` | Switch ON |
| `<Learn Require All Switches: ...>` | TODOS os switches ON |
| `<Learn Require Any Switches: ...>` | QUALQUER switch ON |
| `<JS Learn Requirements>` | Condicao dinamica JS |
| `<JS Learn Requirements List Text>` | Texto custom na lista |
| `<JS Learn Requirements Detail Text>` | Texto custom no detalhe |
