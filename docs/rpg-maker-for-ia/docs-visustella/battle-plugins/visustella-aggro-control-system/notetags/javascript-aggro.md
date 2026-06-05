# Notetags - JavaScript Aggro

Notetags JavaScript para logica dinamica de aggro no Aggro Control System.

---

## `<JS User Aggro>`

- **Uso**: Skill, Item Notetags
- **Efeito**: Executa codigo JavaScript para determinar o valor final de mudanca de aggro do usuario ao usar a skill/item.
- **Frequencia**: Aplica **1 vez por uso**, independente do numero de hits.

### Variaveis Disponiveis

| Variavel | Tipo | Descricao |
|----------|------|-----------|
| `user` | Game_Battler | Quem esta usando a skill/item |
| `target` | Game_Battler | Quem esta recebendo o hit |
| `value` | Number | Valor final de mudanca de aggro (deve ser setado) |

### Sintaxe

```
<JS User Aggro>
 code
 code
 value = codigo;
</JS User Aggro>
```

### Exemplos

**Aggro baseado no HP atual do usuario**:
```
<JS User Aggro>
 value = user.hp * 0.5;
</JS User Aggro>
```

**Aggro baseado no nivel do usuario**:
```
<JS User Aggro>
 value = user.level * 10;
</JS User Aggro>
```

**Aggro aleatorio**:
```
<JS User Aggro>
 value = Math.randomInt(100) + 50;
</JS User Aggro>
```

**Aggro condicional**:
```
<JS User Aggro>
 if (user.isActor()) {
   value = 100;
 } else {
   value = 50;
 }
</JS User Aggro>
```

---

## `<JS Target Aggro>`

- **Uso**: Skill, Item Notetags
- **Efeito**: Executa codigo JavaScript para determinar o valor final de mudanca de aggro do alvo ao usar a skill/item.
- **Frequencia**: Aplica **multiplas vezes**, baseado no numero de hits.

### Variaveis Disponiveis

| Variavel | Tipo | Descricao |
|----------|------|-----------|
| `user` | Game_Battler | Quem esta usando a skill/item |
| `target` | Game_Battler | Quem esta recebendo o hit |
| `value` | Number | Valor final de mudanca de aggro (deve ser setado) |

### Sintaxe

```
<JS Target Aggro>
 code
 code
 value = codigo;
</JS Target Aggro>
```

### Exemplos

**Reduzir aggro do alvo baseado no dano**:
```
<JS Target Aggro>
 value = -Math.floor(value * 0.1);
</JS Target Aggro>
```

**Transferir aggro do alvo para o usuario**:
```
<JS Target Aggro>
 value = -(target._aggro || 0);
 user._aggro = (user._aggro || 0) + Math.abs(value);
</JS Target Aggro>
```

**Aggro baseado no HP restante do alvo**:
```
<JS Target Aggro>
 value = Math.floor(target.mhp * 0.2);
</JS Target Aggro>
```

---

## Diferencas Importantes

| Aspecto | JS User Aggro | JS Target Aggro |
|---------|--------------|-----------------|
| **Afeta** | Aggro do usuario | Aggro do alvo |
| **Frequencia** | 1x por uso | Por hit |
| **Uso tipico** | Aumentar propria ameaca | Manipular ameaca do alvo |
| **Multi-hit** | Nao acumula | Acumula por hit |

---

## Notas

- O valor de `value` deve ser um numero. Se nao for setado, pode ser `undefined` ou `NaN`.
- Variaveis RPG Maker MZ padrao como `$gameParty`, `$gameTroop`, etc. estao disponiveis.
- Propriedades internas do battler como `hp`, `mhp`, `mp`, `level`, `tp` estao acessiveis.
- O aggro interno geralmente e armazenado em propriedades como `_aggro` (verificar implementacao).
