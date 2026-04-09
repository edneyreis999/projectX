# Referência Rápida - Notetags TP Mode

> Tabela completa de todos os notetags do Enhanced TP System.

## Notetags por Escopo

| Notetag | Escopo | Descrição | Linha |
|---------|--------|-----------|-------|
| **Gerais** | | | |
| `<TP Mode: name>` | Actor, Enemy, State | Define TP Mode inicial | [Geral][1] |
| `<Starting TP Modes>` | Actor | Lista de modos disponíveis | [Geral][1] |
| `<Change Target TP Mode: name>` | Skill, Item | Muda modo do alvo (se acertar) | [Geral][1] |
| `<Change User TP Mode: name>` | Skill, Item | Muda modo do usuário | [Geral][1] |
| `<Force TP Mode: name>` | Actor, Class, Weapon, Armor, Enemy, State | Força modo específico | [Geral][1] |
| **Atores** | | | |
| `<Learn TP Mode: name>` | Skill | Aprende modo permanentemente | [Ator][2] |
| `<Learn TP Modes>` | Skill | Lista de modos a aprender | [Ator][2] |
| `<Unlock TP Mode: name>` | Skill, Item | Desbloqueia modo temporariamente | [Ator][2] |
| `<Unlock TP Modes>` | Skill, Item | Lista de modos a desbloquear | [Ator][2] |

## Sintaxe Resumida

### TP Mode Inicial
```xml
<TP Mode: NomeDoModo>
```

### Lista de Modos Disponíveis
```xml
<Starting TP Modes>
  Modo 1
  Modo 2
</Starting TP Modes>
```

### Mudar Modo via Skill/Item
```xml
<!-- Muda alvo (precisa acertar) -->
<Change Target TP Mode: NovoModo>

<!-- Muda usuário (incondicional) -->
<Change User TP Mode: NovoModo>
```

### Forçar Modo (Trait)
```xml
<Force TP Mode: ModoForçado>
```

### Aprender Modo (Skill)
```xml
<!-- Único modo -->
<Learn TP Mode: ModoAprendido>

<!-- Múltiplos modos -->
<Learn TP Modes>
  Modo 1
  Modo 2
  Modo 3
</Learn TP Modes>
```

### Desbloquear Modo (Skill/Item)
```xml
<!-- Único modo -->
<Unlock TP Mode: ModoDesbloqueado>

<!-- Múltiplos modos -->
<Unlock TP Modes>
  Modo 1
  Modo 2
</Unlock TP Modes>
```

## Casos de Uso Rápidos

### Personagem com Modo Único
```xml
<!-- Database: Actor -->
<TP Mode: Momentum>
```

### Personagem com Múltiplos Modos Selecionáveis
```xml
<!-- Database: Actor -->
<Starting TP Modes>
  Momentum
  Foco Preciso
  Ritmo Acelerado
</Starting TP Modes>
<TP Mode: Momentum>  <!-- Modo padrão -->
```

### Skill que Muda Próprio Modo
```xml
<Change User TP Mode: Postura Defensiva>
```

### Skill que Muda Modo do Alvo
```xml
<Change Target TP Mode: Envenenado>
```

### State que Força Modo
```xml
<!-- Database: State -->
<Force TP Mode: Frenesi Incontrolável>
```

### Skill que Ensina Novo Modo
```xml
<!-- Database: Skill -->
<Learn TP Mode: Guarda Avançada>
```

### Item que Desbloqueia Modo Temporário
```xml
<!-- Database: Item -->
<Unlock TP Mode: Fúria Temporária>
```

## Equivalência com Plugin Commands

| Notetag | Plugin Command Equivalente |
|---------|---------------------------|
| `<Change Target/User TP Mode>` | `Actor: Change TP Mode` |
| `<Unlock TP Mode>` | `Actor: Unlock TP Mode` |
| `<Learn TP Mode>` | (sem equivalente) |
| `<Force TP Mode>` | (sem equivalente, usa traits) |

## Observações Importantes

1. **Nomes de Modo**: Devem corresponder exatamente aos nomes definidos nos parâmetros do plugin
2. **Case Sensitive**: "Momentum" ≠ "momentum"
3. **Prioridade**: `<Force TP Mode>` > `<Change TP Mode>` > `<TP Mode>`
4. **Aprendizado**: `<Learn>` requer aprender a skill; traits não ensinam modos

---

## Ver Também

- [Notetags Gerais](gerais.md) - Documentação completa dos notetags gerais
- [Notetags de Atores](atores.md) - Documentação completa dos notetags de atores
- [Plugin Commands](../comandos/atores.md) - Comandos equivalentes para eventos

[1]: gerais.md
[2]: atores.md
