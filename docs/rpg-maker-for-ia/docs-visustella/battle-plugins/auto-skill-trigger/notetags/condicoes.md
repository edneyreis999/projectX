# Condições Especiais e Restrições

## Notetag: <No Auto Skill Trigger>

### Uso
- **Usado em**: Skill Notetags, Item Notetags, State Notetags

### Função
Previne que Auto Skill Triggers ocorram ao usar esta skill ou item.

[Nota: Útil para skills que não devem triggerar reações automáticas, como summons ou habilidades passivas]

### Exemplo
```
<No Auto Skill Trigger>
```
Coloque este notetag em uma skill que você não quer que cause reações automáticas.

---

## Regras Importantes

### 1. Previnição de Loop Infinito
Skills marcadas com Auto Trigger **não podem triggerar outros Auto Skill Triggers**. Isso é uma proteção automática para prevenir loops infinitos.

[Nota: Se Skill A tem Auto Trigger e é triggerada, Skill A não pode triggerar Skill B que também tem Auto Trigger]

### 2. Múltiplos Triggers
Uma mesma skill pode ter múltiplos Auto Triggers. A skill será triggerada quando **qualquer um** das condições for atendida.

### 3. Condição de Usabilidade
A skill deve ser usável normalmente fora da ocasião do trigger para que possa ser triggerada. Isso significa:
- Deve houver MP/TP suficiente
- Cooldowns devem ser respeitados
- Outras condições de uso normais se aplicam

### 4. Escopo Original (*Note1*)
Ser o alvo de uma ação significa que o alvo potencial deve ser parte do **escopo original**, independentemente de como os alvos são mudados depois por Action Sequences.

[Nota: Action Sequences podem mudar os alvos, mas o trigger só considera quem estava no escopo original]

---

## Compatibilidade com Outros Sistemas

### Incompatibilidades

Os seguintes battle systems são **incompatíveis** com Auto Skill Triggers:

- **Battle System - FTB** (Free Turn Battle)
- **Battle System - ETB** (Event Turn Battle)
- **Battle System - PTB** (Press Turn Battle)

#### Motivo da Incompatibilidade
Esses battle systems possuem estruturas de turno que os tornam altamente incompatíveis com a forma que Auto Skill Triggers funcionam.

[Nota: A estrutura de turnos desses sistemas não se alinha com o sistema de triggers do Auto Skill Trigger]

---

## Ver Também

- [Triggers](triggers.md) - Tipos de triggers disponíveis
- [Exemplos](exemplos.md) - Exemplos práticos
- [Compatibilidade](../referencia/compatibilidade.md) - Detalhes sobre incompatibilidades

---
Fonte: auto-skill-trigger.md#Notetags
