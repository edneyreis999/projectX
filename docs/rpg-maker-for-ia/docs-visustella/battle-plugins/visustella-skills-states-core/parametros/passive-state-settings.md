# Plugin Parameters - Passive State Settings

Configurações para passive states globais e condições. Ver [passive-states-explicacao.md](../conceitos/passive-states-explicacao.md) para conceitos.

---

## List

| Parâmetro | Descrição |
|-----------|-----------|
| **Global Passives** | Lista de passive states para TODOS (actors e enemies) |
| **Actor-Only Passives** | Lista de passive states apenas para actors |
| **Enemy Passives** | Lista de passive states apenas para enemies |

---

## Cache

| Parâmetro | Default | Descrição |
|-----------|---------|-----------|
| **Switch Refresh?** | false | Refresh de battle members quando switches mudam em battle. **Atenção**: não fazer spam de switch changes para evitar lag |
| **Variable Refresh?** | false | Refresh de battle members quando variables mudam em battle. **Atenção**: não fazer spam de variable changes para evitar lag |

### Por que os defaults são false?
Os defaults foram alterados para false (desde v1.35) para prevenir lag spikes inesperados para desenvolvedores unfamiliar com a mecânica de cache.

---

## Global JS Effects

| Parâmetro | Descrição |
|-----------|-----------|
| **JS: Condition Check** | Código JavaScript para condição global de passive states |

---

## Notas Importantes

### Passive States e Detecção
Passive states **NÃO são detectados** por:
- `a.isStateAffected(id)` - Retorna false
- Conditional Branch state check

**Use**: `a.states().includes($dataStates[id])` para detectar ambos.

### Passive States e Manipulação
Funções `addState`, `eraseState`, `removeState` **NÃO funcionam** em passive states. JS On Add/Erase/Expire notetags também não disparam.

### Limitações de JS Passive Condition
Não use condições que dependam de:
- Outro passive state
- Trait de outro state
- Parâmetro alterado por state
- Equip cujo tipo vem de state
