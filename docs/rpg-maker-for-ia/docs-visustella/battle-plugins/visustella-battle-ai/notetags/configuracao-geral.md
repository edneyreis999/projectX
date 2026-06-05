# Notetags de Configuração Geral

## Visão Geral

Estes notetags configuram as definições gerais de A.I. relacionadas para inimigos e qualquer ator que use A.I. (requer Auto Battle e tem uma A.I. referenciada).

## Lista de Notetags

### <AI Style: x>

**Uso**: Class, Enemy Notetags

Define o estilo de A.I. usado pela unidade.

**Parâmetros**:
- Substitua `x` por um dos seguintes estilos:
  - `Classic` - Estilo tradicional com base em ratings
  - `Gambit` - Prioridade top-down da lista de skills
  - `Casual` - Foco apenas em condições
  - `Random` - Seleção completamente aleatória

**Exemplos**:
```html
<AI Style: Classic>
<AI Style: Gambit>
<AI Style: Casual>
<AI Style: Random>
```

**Notas**:
- Para atores, coloque este notetag na classe associada
- Para atores, não se aplica se não houver lista de A.I. referenciada
- Configure o inimigo de referência através dos Plugin Parameters ou usando `<Reference AI: Enemy id>`

**Veja também**: [A.I. Styles](../conceitos/ai-styles.md)

---

### <AI Level: x>

**Uso**: Actor, Enemy Notetags

Define o nível de inteligência da unidade.

**Parâmetros**:
- Substitua `x` por um número de **0 a 100**
- Níveis mais altos = mais estritos sobre condições
- Níveis mais baixos = mais flexíveis sobre condições

**Exemplos**:
```html
<AI Level: 100>   <!-- Nunca desobedece condições -->
<AI Level: 75>    <!-- Geralmente estrito -->
<AI Level: 50>    <!-- Moderadamente estrito -->
<AI Level: 25>    <!-- Frequentemente ignora condições -->
<AI Level: 0>     <!-- Praticamente ignora todas -->
```

**Comportamento**:
- Com A.I. Level 100, a IA nunca desobedecerá uma condição
- Com A.I. Levels menores, a IA pode possivelmente ignorar certas condições e agir como se fossem cumpridas
- A.I. Level não afeta styles Casual e Random

---

### <AI Rating Variance: x>

**Uso**: Actor, Enemy Notetags

Define a quantidade de variância ao determinar ações de A.I. por rating.

**Parâmetros**:
- Substitua `x` por um número entre **0 e 9**
- **0** para nenhuma variância
- Números menores para menos variância
- Números maiores para mais variância

**Exemplos**:
```html
<AI Rating Variance: 0>    <!-- Sem variância - segue rating rigidamente -->
<AI Rating Variance: 2>    <!-- Pouca variância -->
<AI Rating Variance: 5>    <!-- Variância moderada -->
<AI Rating Variance: 9>    <!-- Máxima variância -->
```

**Notas**:
- Apenas afeta o estilo Classic
- Ratings podem variar até X níveis abaixo do rating original
- Usado para criar mais variedade nas ações escolhidas

---

### <Reference AI: Enemy id>
### <Reference AI: name>

**Uso**: Class Notetags

Faz com que qualquer ator usando esta classe que tenha o trait Auto Battle use o padrão de ataque de um inimigo específico (ratings, condições, etc.) para determinar qual skill usar na batalha.

**Parâmetros**:
- Substitua `id` por um número representando o ID do inimigo
- Substitua `name` pelo nome do inimigo

**Exemplos**:
```html
<Reference AI: Enemy 5>    <!-- Referencia inimigo ID 5 -->
<Reference AI: Goblin>     <!-- Referencia inimigo chamado "Goblin" -->
```

**Restrições para Atores**:
Atores só podem usar skills que normalmente teriam acesso:
- ✅ Atores precisam ter **APRENDIDO** a skill
- ✅ Atores precisam ter acesso ao **TIPO DE SKILL**
- ✅ Atores precisam ter os **RECURSOS** para pagar pela skill

**Troubleshooting**:
Se você não conseguir descobrir por que um ator Auto Battle não pode usar uma skill específica:
1. Desligue Auto Battle
2. Veja se você pode usar a skill normalmente
3. Verifique se o ator aprendeu a skill
4. Verifique se o tipo de skill está disponível
5. Verifique se há MP/TP suficiente

---

### <No Reference AI>

**Uso**: Class Notetags

Previne a classe de usar qualquer inimigo como seu padrão de A.I. referenciado (incluindo o definido nos Plugin Parameters).

**Exemplo**:
```html
<No Reference AI>
```

**Uso Típico**:
- Quando você quer que uma classe específica use Auto Battle padrão
- Quando você configurou uma referência global mas quer excluir uma classe

---

## Exemplos de Uso Combinado

### Inimigo Inteligente com Gambit Style

```html
<AI Style: Gambit>
<AI Level: 90>
<AI Rating Variance: 0>
```

Este inimigo:
- Usa Gambit style (segue ordem da lista de skills)
- É muito inteligente (raramente ignora condições)
- Não tem variância de rating (não aplicável a Gambit, mas configurado)

### Classe de Ator com Referência

```html
<Reference AI: Enemy 10>
<AI Level: 70>
```

Atores desta classe:
- Usam padrões do inimigo ID 10
- São razoavelmente inteligentes

### Inimigo Casual e Imprevisível

```html
<AI Style: Casual>
<AI Level: 30>
```

Este inimigo:
- Usa Casual style (foca apenas em condições)
- Não é muito inteligente (frequentemente ignora condições)
- Resultado em comportamento imprevisível

### Inimigo com Comportamento Tradicional

```html
<AI Style: Classic>
<AI Level: 100>
<AI Rating Variance: 3>
```

Este inimigo:
- Usa Classic style (tradicional do RPG Maker)
- É perfeitamente inteligente (nunca ignora condições)
- Tem alguma variância de rating para variedade

## Veja Também

- **[Condições de Skills](condicoes-skills.md)** - Notetags para condições ALL/ANY
- **[TGR Weight](tgr-weight.md)** - Notetags para influência de peso
- **[Targeting](targeting.md)** - Notetags para seleção específica de alvos
- **[A.I. Styles](../conceitos/ai-styles.md)** - Explicação detalhada dos estilos
