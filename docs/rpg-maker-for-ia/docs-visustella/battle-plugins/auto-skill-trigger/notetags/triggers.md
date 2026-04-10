# Tipos de Auto Triggers

## Visão Geral

O notetag `<Auto Trigger: condition>` transforma uma skill em uma Auto Trigger Skill, que será usada automaticamente quando a condição for atendida.

### Sintaxe Básica
```
<Auto Trigger: condition>
```

### Sintaxe com Chance
```
<Auto Trigger x%: condition>
```
- Replace `x` com um valor numérico representando a chance de sucesso (0-100)
[Nota: Apenas variante com chance tem probabilidade. A variante sem chance é 100%]

---

## Categorias de Triggers

### 1. Battle Events

#### Battle Start
- **Trigger**: Skill quando a batalha começa
- **Uso típico**: Buffs iniciais, setups tácticos

#### Battle Win
- **Trigger**: Skill quando a batalha é vencida
- **Uso típico**: Celebrações, recuperação pós-combate

#### Death
- **Trigger**: Skill momentos antes da morte do usuário
- **Especial**: Se o usuário recuperar HP suficiente, não morre. Mas outros efeitos de Death ainda ocorrem.
- **Uso típico**: Último ataque, transformação, ressurreição

---

### 2. User Actions

#### Attack User
- **Trigger**: Quando o usuário usa um ataque básico

#### Guard User
- **Trigger**: Quando o usuário defende

#### Item User
- **Trigger**: Quando o usuário usa qualquer item

#### Physical User
- **Trigger**: Quando o usuário realiza qualquer ação física

#### Magical User
- **Trigger**: Quando o usuário realiza qualquer ação mágica

#### Certain Hit User
- **Trigger**: Quando o usuário realiza uma ação de ataque certo

#### Skill Type name User
- **Trigger**: Quando o usuário realiza uma skill do Skill Type nomeado
- **Exemplo**: `<Auto Trigger: Skill Type Magic User>` - triggera quando usa skills mágicas

#### Element name User
- **Trigger**: Quando o usuário realiza uma ação com o elemento tipo nomeado
- **Exemplo**: `<Auto Trigger: Element Fire User>` - triggera quando usa ataques de fogo

---

### 3. Target Reactions

#### Attack Target
- **Trigger**: Quando o usuário é alvo de um ataque básico
- **Nota**: Veja *Note1* sobre escopo original

#### Guard Target
- **Trigger**: Quando o usuário é alvo de uma ação de defesa

#### Item Target
- **Trigger**: Quando o usuário é alvo de uma ação de item

#### Physical Target
- **Trigger**: Quando o usuário é alvo de uma ação física

#### Magical Target
- **Trigger**: Quando o usuário é alvo de uma ação mágica

#### Certain Hit Target
- **Trigger**: Quando o usuário é alvo de uma ação de ataque certo

#### Skill Type name Target
- **Trigger**: Quando o usuário é alvo de uma skill pelo Skill Type nomeado

#### Element name Target
- **Trigger**: Quando o usuário é alvo de uma ação com o elemento tipo nomeado

---

### 4. Ally Reactions

#### Attack Ally
- **Trigger**: Quando o usuário é alvo de um ataque básico E é aliado do battler ativo
- **Nota**: Veja *Note1* sobre escopo original

#### Guard Ally
- **Trigger**: Quando o usuário é alvo de uma ação de defesa E é aliado do battler ativo

#### Item Ally
- **Trigger**: Quando o usuário é alvo de uma ação de item E é aliado do battler ativo

#### Physical Ally
- **Trigger**: Quando o usuário é alvo de uma ação física E é aliado do battler ativo

#### Magical Ally
- **Trigger**: Quando o usuário é alvo de uma ação mágica E é aliado do battler ativo

#### Certain Hit Ally
- **Trigger**: Quando o usuário é alvo de uma ação de ataque certo E é aliado do battler ativo

#### Skill Type name Ally
- **Trigger**: Quando o usuário é alvo de uma skill pelo Skill Type nomeado E é aliado do battler ativo

#### Element name Ally
- **Trigger**: Quando o usuário é alvo de uma ação com o elemento tipo nomeado E é aliado do battler ativo

---

### 5. Enemy Reactions

#### Attack Enemy
- **Trigger**: Quando o usuário é alvo de um ataque básico E é inimigo do battler ativo

#### Guard Enemy
- **Trigger**: Quando o usuário é alvo de uma ação de defesa E é inimigo do battler ativo

#### Item Enemy
- **Trigger**: Quando o usuário é alvo de uma ação de item E é inimigo do battler ativo

#### Physical Enemy
- **Trigger**: Quando o usuário é alvo de uma ação física E é inimigo do battler ativo

#### Magical Enemy
- **Trigger**: Quando o usuário é alvo de uma ação mágica E é inimigo do battler ativo

#### Certain Hit Enemy
- **Trigger**: Quando o usuário é alvo de uma ação de ataque certo E é inimigo do battler ativo

#### Skill Type name Enemy
- **Trigger**: Quando o usuário é alvo de uma skill pelo Skill Type nomeado E é inimigo do battler ativo

#### Element name Enemy
- **Trigger**: Quando o usuário é alvo de uma ação com o elemento tipo nomeado E é inimigo do battler ativo

---

### 6. Friends (Team Observers)

#### Attack Friends
- **Trigger**: Quando um ataque básico ocorre E o battler ativo está no time aliado do usuário

#### Guard Friends
- **Trigger**: Quando uma ação de defesa ocorre E o battler ativo está no time aliado do usuário

#### Item Friends
- **Trigger**: Quando uma ação de item ocorre E o battler ativo está no time aliado do usuário

#### Physical Friends
- **Trigger**: Quando uma ação física ocorre E o battler ativo está no time aliado do usuário

#### Magical Friends
- **Trigger**: Quando uma ação mágica ocorre E o battler ativo está no time aliado do usuário

#### Certain Hit Friends
- **Trigger**: Quando uma ação de ataque certo ocorre E o battler ativo está no time aliado do usuário

#### Skill Type name Friends
- **Trigger**: Quando uma skill pelo Skill Type nomeado ocorre E o battler ativo está no time aliado do usuário

#### Element name Friends
- **Trigger**: Quando uma ação com o elemento tipo nomeado ocorre E o battler ativo está no time aliado do usuário

---

### 7. Friends Only (Team Observers, Self-Excluded)

#### Attack Friends Only
- **Trigger**: Como Attack Friends, mas o battler ativo **não pode ser o próprio usuário**

#### Guard Friends Only
- **Trigger**: Como Guard Friends, mas o battler ativo **não pode ser o próprio usuário**

#### Item Friends Only
- **Trigger**: Como Item Friends, mas o battler ativo **não pode ser o próprio usuário**

#### Physical Friends Only
- **Trigger**: Como Physical Friends, mas o battler ativo **não pode ser o próprio usuário**

#### Magical Friends Only
- **Trigger**: Como Magical Friends, mas o battler ativo **não pode ser o próprio usuário**

#### Certain Hit Friends Only
- **Trigger**: Como Certain Hit Friends, mas o battler ativo **não pode ser o próprio usuário**

#### Skill Type name Friends Only
- **Trigger**: Como Skill Type name Friends, mas o battler ativo **não pode ser o próprio usuário**

#### Element name Friends Only
- **Trigger**: Como Element name Friends, mas o battler ativo **não pode ser o próprio usuário**

---

### 8. Opponents (Enemy Team Observers)

#### Attack Opponents
- **Trigger**: Quando um ataque básico ocorre E o battler ativo está no time opositor do usuário

#### Guard Opponents
- **Trigger**: Quando uma ação de defesa ocorre E o battler ativo está no time opositor do usuário

#### Item Opponents
- **Trigger**: Quando uma ação de item ocorre E o battler ativo está no time opositor do usuário

#### Physical Opponents
- **Trigger**: Quando uma ação física ocorre E o battler ativo está no time opositor do usuário

#### Magical Opponents
- **Trigger**: Quando uma ação mágica ocorre E o battler ativo está no time opositor do usuário

#### Certain Hit Opponents
- **Trigger**: Quando uma ação de ataque certo ocorre E o battler ativo está no time opositor do usuário

#### Skill Type name Opponents
- **Trigger**: Quando uma skill pelo Skill Type nomeado ocorre E o battler ativo está no time opositor do usuário

#### Element name Opponents
- **Trigger**: Quando uma ação com o elemento tipo nomeado ocorre E o battler ativo está no time opositor do usuário

---

## Nota Importante (*Note1*)

**Ser o alvo de uma ação significa que o alvo potencial deve ser parte do escopo original**, independentemente de como os alvos são mudados depois por Action Sequences.

[Nota: Isso determina quem é considerado "alvo" para fins de trigger. O escopo original é definido antes de qualquer modificação por Action Sequences]

---

## Ver Também

- [Condições Especiais](condicoes.md) - Restrições e notetags especiais
- [Exemplos](exemplos.md) - Exemplos práticos de uso

---
Fonte: auto-skill-trigger.md#Notetags
