# Notetags de Atores - TP Mode

> Notetags exclusivos para **personagens (actors)** relacionados ao aprendizado e desbloqueio de TP Modes.

## Visão Geral

Estes notetags aplicam-se apenas a Actors e permitem:
- Aprender novos TP Modes permanentemente
- Desbloquear TP Modes temporariamente
- Expandir a lista de modos disponíveis

---

## <Learn TP Mode: name>

**Escopo:** Skill (apenas)

Faz com que o ator **aprenda** permanentemente o TP Mode especificado ao aprender esta skill.

### Uso
```xml
<Learn TP Mode: Postura Avançada>
```

### Parâmetros
- `name`: Nome do TP Mode a ser aprendido

### Comportamento
- Só funciona quando a skill é **aprendida**
- Adicionar skill via trait **NÃO** ensina o TP Mode
- O modo fica permanentemente disponível para o ator
- Pode usar múltiplas cópias para ensinar múltiplos modos

### Exemplo
```xml
<!-- Skill: Advanced Guard Training -->
<Learn TP Mode: Muralha Suprema>

<!-- Skill: Dual W Mastery -->
<Learn TP Mode: Duelo de Lâminas>
<Learn TP Mode: Dança Mortal>
```

### Caso de Uso Típico

Personagem progredindo na história:
```xml
<!-- Level 10 Skill: Basic Combat -->
<Learn TP Mode: Combate Básico>

<!-- Level 20 Skill: Intermediate Combat -->
<Learn TP Mode: Combate Intermediário>

<!-- Level 30 Skill: Advanced Combat -->
<Learn TP Mode: Combate Avançado>
```

---

## <Learn TP Modes>

**Escopo:** Skill (apenas)

Versão em lista do `<Learn TP Mode>` - permite múltiplos modos em um único notetag.

### Uso
```xml
<Learn TP Modes>
  Guarda de Ferro
  Contra-ataque Perfeito
  Reflexos Sobrenaturais
</Learn TP Modes>
```

### Parâmetros
- Cada linha: nome de um TP Mode

### Comportamento
- Idêntico a múltiplos `<Learn TP Mode>` em uma skill
- Mais organizado para muitos modos

### Exemplo
```xml
<!-- Skill: Master Guardian Class -->
<Learn TP Modes>
  Guarda Básica
  Guarda Avançada
  Muralha Suprema
  Proteção Divina
</Learn TP Modes>
```

---

## <Unlock TP Mode: name>

**Escopo:** Skill, Item

**Desbloqueia** um TP Mode para o ator, permitindo seu uso (mas não aprende permanentemente).

### Uso
```xml
<Unlock TP Mode: Fúria do Dragão>
```

### Parâmetros
- `name`: Nome do TP Mode a desbloquear

### Comportamento
- Modo fica disponível para uso
- Diferente de `<Learn TP Mode>`:
  - **Learn**: Permanente, aprendido
  - **Unlock**: Temporário, pode ser revogado
- Pode usar múltiplas cópias

### Diferença: Learn vs Unlock

| Característica | Learn | Unlock |
|----------------|-------|--------|
| Permanência | Permanente | Temporário |
| Escopo | Skill apenas | Skill, Item |
| Transferência | Entre batalhas | Durante batalha/item |
| Uso típico | Progressão natural | Efeitos temporários |

### Exemplo
```xml
<!-- Skill: Dragon Form -->
<Unlock TP Mode: Fúria do Dragão>

<!-- Item: Rage Potion -->
<Unlock TP Mode: Frenesi Temporário>
```

---

## <Unlock TP Modes>

**Escopo:** Skill, Item

Versão em lista do `<Unlock TP Mode>`.

### Uso
```xml
<Unlock TP Modes>
  Modo Ofensivo
  Modo Defensivo
  Modo Balanceado
</Unlock TP Modes>
```

### Comportamento
- Idêntico a múltiplos `<Unlock TP Mode>`
- Mais organizado para muitos modos

---

## Fluxo de Aprendizado

```
Início de Jogo
   │
   ├─ <Starting TP Modes> → Modos iniciais disponíveis
   │
   ├─ Learn Skill (com <Learn TP Mode>)
   │      └─ Modo aprendido permanentemente
   │
   └─ Item/Skill (com <Unlock TP Mode>)
          └─ Modo desbloqueado temporariamente
```

## Exemplo Completo: Progressão de Personagem

```xml
<!-- Actor: Kilin -->
<Starting TP Modes>
  Guarda Básica
</Starting TP Modes>

<!-- Skill: Level 10 - Guardian Training -->
<Learn TP Mode: Guarda Avançada>

<!-- Skill: Level 20 - Iron Will -->
<Learn TP Modes>
  Postura de Ferro
  Muralha Contra Impacto
</Learn TP Modes>

<!-- Skill: Level 30 - Supreme Guardian -->
<Learn TP Mode: Proteção Suprema>

<!-- Item: Battle Stimulant -->
<Unlock TP Mode: Adrenalina Temporária>
```

---

## Ver Também

- [Notetags Gerais](gerais.md) - Notetags aplicáveis a todos
- [Referência Rápida](referencia-rapida.md) - Tabela completa
- [Plugin Commands](../comandos/atores.md) - Comandos de evento equivalentes
