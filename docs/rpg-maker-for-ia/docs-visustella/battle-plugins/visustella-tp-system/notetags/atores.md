# Notetags para Atores - Enhanced TP System

Notetags específicas para actors (não aplicáveis a enemies).

## Learning TP Modes

Notetags para fazer actors aprenderem novos TP Modes.

---

### `<Learn TP Mode: name>`

**Usado em:** Skill

**Função:** Faz o actor selecionado aprender o TP Mode quando a skill é aprendida.

**Parâmetros:**
- `name` - Nome de um TP Mode

**Exemplo:**
```
<Learn TP Mode: Berserker>
```

**Notas Importantes:**
- Aprender a skill é **requerido** para o TP Mode ser aprendido
- Adicionar a skill via trait **NÃO** ensina o TP Mode
- Use múltiplas cópias para aprender múltiplos modes

**Múltiplos Modos:**
```
<Learn TP Mode: Berserker>
<Learn TP Mode: Tactician>
```

---

### `<Learn TP Modes>` ... `</Learn TP Modes>`

**Usado em:** Skill

**Função:** Faz o actor aprender múltiplos TP Modes ao aprender a skill.

**Parâmetros:**
- `name` - Nome de um TP Mode por linha

**Exemplo:**
```
<Learn TP Modes>
 Berserker
 Tactician
 Healer
</Learn TP Modes>
```

---

## Unlocking TP Modes

Notetags para desbloquear TP Modes (aprender sem precisar aprender a skill).

---

### `<Unlock TP Mode: name>`

**Usado em:** Skill, Item

**Função:** Faz o actor desbloquear o TP Mode especificado.

**Parâmetros:**
- `name` - Nome de um TP Mode

**Exemplo:**
```
<Unlock TP Mode: Cautious>
```

**Notas:**
- Use múltiplas cópias para desbloquear múltiplos modes
- Diferente de Learn: não precisa aprender a skill

---

### `<Unlock TP Modes>` ... `</Unlock TP Modes>`

**Usado em:** Skill, Item

**Função:** Desbloqueia múltiplos TP Modes de uma vez.

**Parâmetros:**
- `name` - Nome de um TP Mode por linha

**Exemplo:**
```
<Unlock TP Modes>
 Cautious
 Desperate
 Defensive
</Unlock TP Modes>
```

---

## Forcing TP Mode

Notetag para forçar um TP Mode específico.

---

### `<Force TP Mode: name>`

**Usado em:** Actor, Class, Weapon, Armor, Enemy, State

**Função:** Força o battler a usar o TP Mode nomeado em batalha.

**Parâmetros:**
- `name` - Nome de um TP Mode

**Exemplo:**
```
<Force TP Mode: Berserker>
```

**Notas Importantes:**
- Aplicado **fora de batalha** também (desde v1.06)
- Priority baseada em ordem de trait objects
- Múltiplos Force TP Modes = priority ao último na ordem

**Casos de Uso:**
- States que mudam comportamento (ex: Enrage → Berserker)
- Equipment que impõe style (ex: Heavy Armor → Defensive)
- Classes com TP fixo

---

## Diferença: Learn vs Unlock

| Aspecto | Learn | Unlock |
|---------|-------|--------|
| Via Skill? | Sim (aprender skill) | Sim (usar/ser alvo) |
| Via Item? | Não | Sim |
| Requisito | Deve aprender skill | Nenhum |
| Trait Function? | Não ensina | N/A |

---

## Documentação Relacionada

- [Notetags Gerais](gerais.md) - Notetags comuns
- [Comandos de Atores](../comandos/atores.md) - Plugin Commands
- [Modos de TP](../parametros/modos.md) - Criar TP Modes
