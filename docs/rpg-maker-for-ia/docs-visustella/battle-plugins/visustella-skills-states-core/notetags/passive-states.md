# Notetags - Passive States

Notetags para criar e configurar estados passivos. Ver [passive-states-explicacao.md](../conceitos/passive-states-explicacao.md) para detalhes conceituais.

---

## Aplicar Passive State

```
<Passive State: x>
<Passive States: x,x,x>
<Passive State: name>
<Passive States: name, name, name>
```

- **Usado em**: Actor, Class, Skill, Weapon, Armor, Enemy Notetags
- Aplica passive state(s) ao actor/enemy relacionado
- `x` = State ID | `name` = State name
- **Nota**: Se aplicando via skill, deve ser uma skill **aprendida** (não via trait)

---

## Passive Stackable

```
<Passive Stackable>
```

- **Usado em**: State Notetags
- Permite que o passive state seja adicionado múltiplas vezes
- Sem esta tag, apenas uma instância do passive state é permitida

---

## Passive Condition - Class

```
<Passive Condition Class: id>
<Passive Condition Classes: id, id, id>
<Passive Condition Class: name>
<Passive Condition Classes: name, name, name>
```

- **Usado em**: State Notetags
- Condição: class atual do actor deve corresponder a um dos valores
- `id` = Class ID | `name` = Class name

---

## Passive Condition - Multiclass

```
<Passive Condition Multiclass: id>
<Passive Condition Multiclass: id, id, id>
<Passive Condition Multiclass: name>
<Passive Condition Multiclass: name, name, name>
```

- **Usado em**: State Notetags
- **Requer**: VisuMZ_2_ClassChangeSystem
- Condição: qualquer multiclass do actor deve corresponder

---

## Passive Condition - Switch ON

```
<Passive Condition Switch ON: x>
<Passive Condition All Switches ON: x,x,x>
<Passive Condition Any Switch ON: x,x,x>
```

- **Usado em**: State Notetags
- **All**: Condição atendida quando TODOS os switches ON
- **Any**: Condição atendida quando QUALQUER switch ON

---

## Passive Condition - Switch OFF

```
<Passive Condition Switch OFF: x>
<Passive Condition All Switches OFF: x,x,x>
<Passive Condition Any Switch OFF: x,x,x>
```

- **Usado em**: State Notetags
- **All**: Condição atendida quando TODOS os switches OFF
- **Any**: Condição atendida quando QUALQUER switch OFF

---

## JS Passive Condition

```
<JS Passive Condition>
 code
 condition = code;
</JS Passive Condition>
```

- **Usado em**: State Notetags
- `condition` = boolean (true/false)
- Variáveis: `user` (afetado pelo passive), `state` (passive state)
- **Todas as outras passive conditions devem ser atendidas primeiro**

### Limitações Importantes
O sistema tem **failsafes** contra loops infinitos. As seguintes cadeias **NÃO funcionam**:
- Passive state que requer outro passive state
- Passive state que requer trait de outro state
- Passive state que requer parâmetro alterado por outro state
- Passive state que requer equip cujo tipo vem de outro state

---

## Script Calls para State Display

```javascript
// Obter display value
battler.getStateDisplay(stateId)

// Definir display value
battler.setStateDisplay(stateId, value)

// Limpar display
battler.clearStateDisplay(stateId)
```
