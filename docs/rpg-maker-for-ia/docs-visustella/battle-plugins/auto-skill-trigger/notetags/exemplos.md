# Exemplos de Auto Triggers

## Exemplos Básicos

### Battle Events
```
<Auto Trigger: Battle Start>
```
Skill triggera no início de cada batalha.

```
<Auto Trigger: Battle Win>
```
Skill triggera quando a batalha é vencida.

```
<Auto Trigger: Death>
```
Skill triggera momentos antes da morte do usuário.

---

### User Actions
```
<Auto Trigger: Attack User>
```
Skill triggera quando o usuário usa um ataque básico.

```
<Auto Trigger: Guard User>
```
Skill triggera quando o usuário defende.

---

### Target Reactions
```
<Auto Trigger: Physical Target>
```
Skill triggera quando o usuário é alvo de uma ação física.

```
<Auto Trigger: Magical Target>
```
Skill triggera quando o usuário é alvo de uma ação mágica.

---

### Team Reactions
```
<Auto Trigger: Certain Hit Ally>
```
Skill triggera quando o usuário é alvo de um ataque certo E é aliado do battler ativo.

```
<Auto Trigger: Item Enemy>
```
Skill triggera quando o usuário é alvo de uma ação de item E é inimigo do battler ativo.

---

## Exemplos com Skill Types

```
<Auto Trigger: Skill Type Magic Ally>
```
- Triggera quando um aliado é alvo de uma skill do tipo "Magic"
- [Nota: "Magic" deve ser exatamente o nome do Skill Type no database]

```
<Auto Trigger: Skill Type Special Enemy>
```
- Triggera quando um inimigo é alvo de uma skill do tipo "Special"

---

## Exemplos com Elementos

```
<Auto Trigger: Element Fire Friends>
```
- Triggera quando ocorre uma ação com elemento "Fire" E o battler ativo é aliado
- [Nota: "Fire" deve ser exatamente o nome do elemento no database]

```
<Auto Trigger: Element Ice Opponents>
```
- Triggera quando ocorre uma ação com elemento "Ice" E o battler ativo é opositor

---

## Exemplos com Chance

```
<Auto Trigger 50%: Attack Target>
```
- 50% de chance de triggerar quando o usuário é alvo de um ataque básico

```
<Auto Trigger 25%: Death>
```
- 25% de chance de triggerar momentos antes da morte

```
<Auto Trigger 75%: Element Fire User>
```
- 75% de chance de triggerar quando o usuário usa uma ação com elemento Fire

---

## Exemplos de Combinações

### Counter-Attack System
```
<Auto Trigger: Attack Target>
```
Usado em uma skill de counter-attack que triggera quando o personagem é atacado.

### Paladin's Protection
```
<Auto Trigger: Physical Ally>
```
Usado em uma skill de proteção que triggera quando um aliado sofre ataque físico.

### Mage's Revenge
```
<Auto Trigger: Magical Target>
```
Usado em uma skill de retaliação que triggera quando o mago é alvo de magia.

### Team Synergy
```
<Auto Trigger: Skill Type Healing Friends Only>
```
Usado em uma buff que triggera quando um aliado (exceto o próprio) usa skill de cura.

### Elemental Reaction
```
<Auto Trigger: Element Fire Enemy>
```
Usado em uma skill que triggera quando um inimigo usa ataque de fogo.

---

## Casos de Uso Avançados

### 1. Auto-Buff System
```
<Auto Trigger: Battle Start>
```
Skill que aplica buffs automáticos no início do combate.

### 2. Death Transformation
```
<Auto Trigger: Death>
```
Skill que transforma o personagem ou revive com HP antes de morrer.

### 3. Reactionary Skills
```
<Auto Trigger 100%: Physical Target>
<Auto Trigger 100%: Magical Target>
```
Skill que triggera contra qualquer ataque físico ou mágico.

### 4. Team Coordination
```
<Auto Trigger: Skill Type Magic Friends>
```
Skill que apoia aliados quando eles usam magia.

### 5. Enemy Counters
```
<Auto Trigger: Attack Opponents>
```
Skill que interfere quando inimigos atacam.

---

## Dicas de Design

### Para Prevenir Runaway
- Use triggers com chance (ex: `<Auto Trigger 50%: condition>`)
- Adicione custos de MP/TP nas skills
- Use cooldowns
- Configure limites adequados nos [Parâmetros](../referencia/parametros.md)

### Para Combates Táticos
- Combine triggers diferentes para criar combos
- Use "Friends Only" para excluir o próprio usuário
- Aproveite triggers por elemento para weakness/resistance
- Use "Ally"/"Enemy" para reações baseadas em time

### Para Personagens Únicos
- Use "Death" para mecânicas especiais de morte
- Combine com "User" triggers para auto-buffs
- Use "Target" triggers para counter-ataques

---

## Ver Também

- [Triggers](triggers.md) - Lista completa dos 60 tipos
- [Condições Especiais](condicoes.md) - Restrições e regras
- [Como Funciona](../conceitos/funcionamento.md) - Limites e runaway

---
Fonte: auto-skill-trigger.md#Notetags
