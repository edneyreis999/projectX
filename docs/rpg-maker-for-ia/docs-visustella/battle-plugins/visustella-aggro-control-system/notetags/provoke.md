# Notetags - Provoke

Notetags relacionadas ao sistema de Provoke do Aggro Control System.

---

## `<Provoke>`

- **Uso**: State Notetags
- **Efeito**: Faz o state provocar o alvo afetado. O alvo so pode atacar o caster do state para acoes single-target.
- **Multiplas provocacoes**: Se multiplos provoke states forem aplicados, o provocador e o que aplicou o state com **maior prioridade** no database.
- **Remocao automatica**: States com `<Provoke>` se removem automaticamente se o provocador morrer.

---

## `<Provoke Height Origin: x%>`

- **Uso**: Actor, Enemy Notetags
- **Efeito**: Define a altura do ponto de origem das linhas de provoke como `x%` da altura do sprite.
- **Parametro**: `x` = porcentagem da altura do sprite (ex: `50` para 50%)
- **Funcao**: Ponto de destino das linhas animadas de provoke.

**Exemplo**:
```
<Provoke Height Origin: 75%>
```

---

## `<Bypass Provoke>` (Trait Objects)

- **Uso**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- **Efeito**: A unidade afetada ignora completamente todos os efeitos de provoke de quaisquer provoke states, podendo selecionar alvos normalmente.

**Exemplos de uso**:
- Boss que ignora provoke: adicionar `<Bypass Provoke>` no Enemy
- Skill especial de classe: adicionar `<Bypass Provoke>` na Class
- Weapon que permite ignorar: adicionar `<Bypass Provoke>` na Weapon

---

## `<Bypass Provoke>` (Skills/Items)

- **Uso**: Skill, Item Notetags
- **Efeito**: A acao ignora efeitos de provoke, permitindo que o usuario selecione alvos normalmente para esta acao especifica.

**Diferenca do Bypass em Trait Objects**:
- Trait Objects: bypass permanente enquanto equipado/ativo
- Skills/Items: bypass apenas para esta acao especifica

---

## Resumo Rapido

| Notetag | Onde Usa | Efeito |
|---------|----------|--------|
| `<Provoke>` | State | State causa provoke no alvo |
| `<Provoke Height Origin: x%>` | Actor, Enemy | Altura da origem da linha visual |
| `<Bypass Provoke>` | Actor, Class, Weapon, Armor, Enemy, State | Unidade ignora provoke |
| `<Bypass Provoke>` | Skill, Item | Acao ignora provoke |
