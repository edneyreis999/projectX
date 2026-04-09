# Notetags Gerais - TP Mode

> Notetags que aplicam a **atores e inimigos** para configuração de TP Modes.

## Visão Geral

Estes notetags são usados no Database do RPG Maker MZ (Actors, Enemies, States, Skills, Items) para configurar comportamentos relacionados a TP Modes.

---

## <TP Mode: name>

**Escopo:** Actor, Enemy, State

Define o TP Mode **inicial** para este battler.

### Uso
```xml
<TP Mode: Momentum>
```

### Parâmetros
- `name`: Nome do TP Mode conforme definido nos parâmetros do plugin

### Comportamento
- Aplicado no início da batalha
- Pode ser sobrescrito por `<Force TP Mode>`
- Para States: aplica enquanto state estiver ativo

### Exemplo
```xml
<!-- Actor: Filena -->
<TP Mode: Momentum>

<!-- Enemy: Slime -->
<TP Mode: Basic>
```

---

## <Starting TP Modes>

**Escopo:** Actor (apenas)

Adiciona TP Modes à lista de modos **disponíveis** para o ator desde o início.

### Uso
```xml
<Starting TP Modes>
  Momentum
  Foco de Combate
  Ritmo Acelerado
</Starting TP Modes>
```

### Parâmetros
- Cada linha: nome de um TP Mode

### Comportamento
- Jogador pode selecionar estes modos em Scene_Skill (se habilitado)
- Diferente de `<TP Mode>` (que define o modo inicial)
- Pode ser expandido via `<Learn TP Mode>` ou `<Unlock TP Mode>`

### Exemplo
```xml
<!-- Actor: Filena -->
<Starting TP Modes>
  Momentum
  Duelo Ágil
</Starting TP Modes>
```

---

## <Change Target TP Mode: name>

**Escopo:** Skill, Item

Muda o TP Mode do **alvo** quando este skill/item é usado com sucesso.

### Uso
```xml
<Change Target TP Mode: Frenesi>
```

### Parâmetros
- `name`: Nome do TP Mode para aplicar

### Comportamento
- Ação deve **acertar** o alvo (hit)
- Se falhar (miss), TP Mode não muda
- Aplica se skill não tiver "Certain Hit"

### Exemplo
```xml
<!-- Skill: Berseker Rage -->
<Change Target TP Mode: Fúria>
```

---

## <Change User TP Mode: name>

**Escopo:** Skill, Item

Muda o TP Mode do **usuário** quando este skill/item é usado.

### Uso
```xml
<Change User TP Mode: Postura Defensiva>
```

### Parâmetros
- `name`: Nome do TP Mode para aplicar

### Comportamento
- Aplica independentemente de sucesso/falha
- Útil para habilidades de auto-mudança de stance

### Exemplo
```xml
<!-- Skill: Enter Guard Stance -->
<Change User TP Mode: Guarda Fortificada>
```

---

## <Force TP Mode: name>

**Escopo:** Actor, Class, Weapon, Armor, Enemy, State

**Força** o battler a usar o TP Mode especificado, sobrescrevendo outras configurações.

### Uso
```xml
<Force TP Mode: Frenesi Sangrento>
```

### Parâmetros
- `name`: Nome do TP Mode forçado

### Comportamento
- **Sobrescreve** qualquer outro TP Mode
- Aplica dentro e fora de batalha
- Prioridade baseada na ordem de traits se múltiplos
- States com este notetag prevalecem

### Exemplos
```xml
<!-- State: Enraged -->
<Force TP Mode: Fúria Incontrolável>

<!-- Armor: Berserker's Ring -->
<Force TP Mode: Modo Frenesi>
```

---

## Diferenças Importantes

### <TP Mode> vs <Force TP Mode>

| Característica | <TP Mode> | <Force TP Mode> |
|----------------|-----------|-----------------|
| Escopo | Actor, Enemy, State | Actor, Class, Weapon, Armor, Enemy, State |
| Prioridade | Normal | Máxima |
| Sobrescrito por | Force TP Mode | Nada |
| Uso típico | Configuração inicial | Traits impositivos |

### <Change Target> vs <Change User>

| Característica | Target | User |
|----------------|--------|------|
| Afeta | Alvo da skill | Usuário da skill |
| Requer sucesso? | Sim | Não |
| Caso de uso | Debuff inimigo | Auto-buff |

---

## Ver Também

- [Notetags de Atores](atores.md) - Notetags exclusivos para personagens
- [Referência Rápida](referencia-rapida.md) - Tabela completa de notetags
- [Plugin Commands](../comandos/atores.md) - Comandos equivalentes para eventos
