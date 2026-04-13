# Notetags - Skill Accessibility

Notetags para controlar visibilidade e disponibilidade de skills. Útil para esconder skills de menu durante batalha, skills que requerem switches, ou skills desbloqueáveis.

---

## Battle Context

```
<Hide in Battle>
<Hide outside Battle>
```

- **Usado em**: Skill Notetags
- Controla visibilidade baseada em contexto de batalha

---

## Switch - Show

```
<Show Switch: x>
<Show All Switches: x,x,x>
<Show Any Switches: x,x,x>
```

- **Usado em**: Skill Notetags
- **All**: Skill oculta até TODOS os switches ON
- **Any**: Skill visível se QUALQUER switch ON

---

## Switch - Hide

```
<Hide Switch: x>
<Hide All Switches: x,x,x>
<Hide Any Switches: x,x,x>
```

- **Usado em**: Skill Notetags
- **All**: Skill visível até TODOS os switches ON
- **Any**: Skill oculta se QUALQUER switch ON

---

## Learned Skill - Show

```
<Show if learned Skill: x>
<Show if learned All Skills: x,x,x>
<Show if learned Any Skills: x,x,x>
<Show if learned Skill: name>
<Show if learned All Skills: name, name, name>
<Show if learned Any Skills: name, name, name>
```

- **Usado em**: Skill Notetags
- **NÃO se aplica** a skills adicionadas por traits (equip/states) - apenas skills aprendidas diretamente
- **All**: Oculta até TODAS as skills aprendidas
- **Any**: Visível se QUALQUER skill aprendida

---

## Learned Skill - Hide

```
<Hide if learned Skill: x>
<Hide if learned All Skills: x,x,x>
<Hide if learned Any Skills: x,x,x>
<Hide if learned Skill: name>
<Hide if learned All Skills: name, name, name>
<Hide if learned Any Skills: name, name, name>
```

- **Usado em**: Skill Notetags
- Mesmas regras de "Learned Skill - Show", mas inverso

---

## Has Skill - Show (Inclui Traits)

```
<Show if has Skill: x>
<Show if have All Skills: x,x,x>
<Show if have Any Skills: x,x,x>
<Show if has Skill: name>
<Show if have All Skills: name, name, name>
<Show if have Any Skills: name, name, name>
```

- **Usado em**: Skill Notetags
- **Diferente** de "Learned": inclui skills por traits (equip/states)
- **All**: Oculta até TODAS disponíveis
- **Any**: Visível se QUALQUER disponível

---

## Has Skill - Hide (Inclui Traits)

```
<Hide if has Skill: x>
<Hide if have All Skills: x,x,x>
<Hide if have Any Skills: x,x,x>
<Hide if has Skill: name>
<Hide if have All Skills: name, name, name>
<Hide if have Any Skills: name, name, name>
```

- **Usado em**: Skill Notetags
- Mesmas regras de "Has Skill - Show", mas inverso

---

## Switch - Enable

```
<Enable Switch: x>
<Enable All Switches: x,x,x>
<Enable Any Switches: x,x,x>
```

- **Usado em**: Skill Notetags
- Controla se a skill está **habilitada** (não apenas visível)
- **All**: Desabilitada até TODOS ON
- **Any**: Habilitada se QUALQUER ON

---

## Switch - Disable

```
<Disable Switch: x>
<Disable All Switches: x,x,x>
<Disable Any Switches: x,x,x>
```

- **Usado em**: Skill Notetags
- **All**: Habilitada até TODOS ON
- **Any**: Desabilitada se QUALQUER ON

---

## JS Skill Visible

```
<JS Skill Visible>
 code
 visible = code;
</JS Skill Visible>
```

- **Usado em**: Skill Notetags
- `visible` = boolean (true/false)
- Variáveis: `user`, `skill`
- **Todas as outras condições de visibilidade devem ser atendidas primeiro**

---

## JS Skill Enable

```
<JS Skill Enable>
 code
 enabled = code;
</JS Skill Enable>
```

- **Usado em**: Skill Notetags
- `enabled` = boolean (true/false)
- Variáveis: `user`, `skill`
- **Todas as outras condições de skill devem ser atendidas primeiro**
