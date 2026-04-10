# Parâmetros de Configuração Geral

## Visão Geral

Estes parâmetros determinam as configurações globais para uso geral de Battle A.I. Localizados em: **Plugin Parameters > A.I. General Settings**

## A.I. Style

### Actor Style

Qual estilo de A.I. você quer que atores referenciados usem?

**Nota**: Isso não se aplica a atores não referenciados.

**Opções**:
- `Classic` - Estilo tradicional com base em ratings
- `Gambit` - Prioridade top-down da lista
- `Casual` - Foco apenas em condições
- `Random` - Seleção aleatória

**Valor Padrão**: Classic

**Veja também**: [A.I. Styles](../conceitos/ai-styles.md)

---

### Enemy Style

Qual estilo de A.I. você quer que inimigos usem?

**Opções**:
- `Classic` - Estilo tradicional com base em ratings
- `Gambit` - Prioridade top-down da lista
- `Casual` - Foco apenas em condições
- `Random` - Seleção aleatória

**Valor Padrão**: Classic

---

## A.I. Level

### Actor A.I. Level

Nível de A.I. padrão usado para A.I. de atores.

**Configuração**: Níveis de 0-100. Maior é mais estrito.

**Valores**:
- `100` - Nunca desobedece condições
- `75-99` - Geralmente estrito
- `50-74` - Moderadamente estrito
- `25-49` - Frequentemente ignora condições
- `1-24` - Raramente segue condições
- `0` - Praticamente ignora todas

**Valor Padrão**: 50

**Notas**:
- Apenas afeta styles Classic e Gambit
- Styles Casual e Random ignoram A.I. Level

---

### Enemy A.I. Level

Nível de A.I. padrão usado para A.I. de inimigos.

**Configuração**: Níveis de 0-100. Maior é mais estrito.

**Valor Padrão**: 50

---

## A.I. Ratings

### Actor Rating Variance

O quanto permitir variância do rating de A.I.?

**Configuração**: 0 para nenhuma variância. Números maiores para mais variância.

**Valores**: 0-9

**Valor Padrão**: 3

**Como Funciona**:
- Ratings podem variar até X níveis abaixo do original
- Apenas afeta o estilo Classic
- Usado para criar variedade nas ações escolhidas

---

### Enemy Rating Variance

O quanto permitir variância do rating de A.I. para inimigos?

**Configuração**: 0 para nenhuma variância. Números maiores para mais variância.

**Valores**: 0-9

**Valor Padrão**: 3

---

## Reference

### Actor => AI Reference

Qual A.I. de inimigo o ator deve referenciar por padrão?

**Configuração**: Use 0 para nenhuma referência.

**Valores**: ID do inimigo (1, 2, 3, etc.) ou 0

**Valor Padrão**: 0

**Como Funciona**:
- Define qual inimigo os atores com Auto Battle devem copiar
- Se 0, atores usam Auto Battle padrão do RPG Maker
- Pode ser sobrescrito por notetag `<Reference AI: Enemy id>` na classe

**Exemplo**: Se definido como `5`, todos os atores com Auto Battle usarão o padrão de ações do inimigo ID 5.

---

## Knowledge

### Learn Knowledge

Requer que inimigos/atores testem o conhecimento dos oponentes antes de usar condições específicas.

**Opções**: `true` ou `false`

**Valor Padrão**: `true` (ON)

**Como Funciona**:
- Quando `true`: Inimigos não conhecem fraquezas/resistências no início
- Inimigos devem testar ataques elementais para aprender taxas elementais
- Inimigos devem testar ataques físicos para aprender esquiva
- Inimigos devem testar ataques mágicos para aprender esquiva mágica
- Quando `false`: Inimigos conhecem tudo imediatamente (oniscientes)

**Impacto no Jogo**:
- `true`: Mais realista, inimigos aprendem durante a batalha
- `false`: Mais difícil, inimigos exploram fraquezas imediatamente

---

### Unknown Element Rate

O que a A.I. deve tratar taxas elementais desconhecidas como?

**Configuração**: Taxa elemental (float)

**Valor Padrão**: 1.0

**Valores Comuns**:
- `1.0` - Assume neutro (sem fraqueza/resistência)
- `0.5` - Assume resistência (mais cauteloso)
- `1.5` - Assume fraqueza (mais agressivo)
- `2.0` - Assume fraqueza extrema

**Como Funciona**:
- Quando `Learn Knowledge` está `true`, inimigos não conhecem taxas elementais inicialmente
- Este parâmetro define como eles tratam elementos desconhecidos
- `1.0` = assume que o alvo não é vulnerável nem resistente
- `0.5` = assume que o alvo é resistente (evita usar)
- `1.5+` = assume que o alvo é vulnerável (prioriza usar)

**Estratégia**:
- Para inimigos inteligentes: `1.0` (cauteloso, testa primeiro)
- Para inimigos agressivos: `1.5` (assume fraqueza, arrisca-se)
- Para inimigos保守: `0.5` (assume resistência, é mais defensivo)

---

## Experimental

### On-The-Spot A.I.

⚠️ **Feature Experimental** - A.I. inimigos/atores determinam ações no momento quando é seu turno.

**Opções**: `true` ou `false`

**Valor Padrão**: `false` (OFF)

**⚠️ AVISOS IMPORTANTES**:

Esta feature é **experimental** e pode causar problemas:

1. **Problemas com Battle Systems**: Pode causar problemas com battle systems baseados em velocidade
2. **Abuso de Action Speed**: A.I. pode escolher uma ação rápida fraca e depois trocar por uma lenta forte
3. **Não Bem Testada**: Pode ter efeitos colaterais inesperados
4. **Incompatível com Certos Systems**: Pode não funcionar bem com todos os battle systems

**Benefício**:
- Permite usar `$gameTroop.turnCount()` em condições JavaScript
- Normalmente, turnCount() não funciona em A.I. conditions
- Ao habilitar, normaliza como a propriedade turn é calculada

**Quando Usar**:
- Se você PRECISA usar turnCount em condições
- Se você entende os riscos e aceitas as consequências
- Em projetos onde speed abuse não é um problema

**Quando NÃO Usar**:
- Em projetos com battle systems complexos (ATB, BTB, etc.)
- Se você não entende completamente os riscos
- Em projetos comerciais sem testes extensivos

---

### No Idle Chant

⚠️ **Requer**: On-The-Spot A.I. habilitado

Para battlers A.I., desabilita animações de idle chant devido à inconsistência.

**Opções**: `true` ou `false`

**Valor Padrão**: `false` (OFF)

**Como Funciona**:
- Quando `true`, battlers A.I. não fazem animação de chant (casting)
- Isso evita animações inconsistentes quando ações são redeterminadas
- Apenas afeta battlers controlados por A.I.

## Exemplos de Configuração

### Configuração Padrão (Equilibrada)

```
Actor Style: Classic
Enemy Style: Classic
Actor A.I. Level: 50
Enemy A.I. Level: 50
Actor Rating Variance: 3
Enemy Rating Variance: 3
Actor => AI Reference: 0
Learn Knowledge: true
Unknown Element Rate: 1.0
On-The-Spot A.I.: false
```

**Resultado**: Comportamento equilibrado, inimigos aprendem fraquezas durante a batalha.

---

### Configuração Desafiadora

```
Actor Style: Gambit
Enemy Style: Gambit
Actor A.I. Level: 90
Enemy A.I. Level: 100
Actor Rating Variance: 0
Enemy Rating Variance: 0
Actor => AI Reference: 5
Learn Knowledge: false
Unknown Element Rate: 1.5
On-The-Spot A.I.: false
```

**Resultado**: Inimigos muito inteligentes, conhecem fraquezas imediatamente, nunca erram.

---

### Configuração Casual

```
Actor Style: Casual
Enemy Style: Casual
Actor A.I. Level: 30
Enemy A.I. Level: 30
Actor Rating Variance: 5
Enemy Rating Variance: 5
Actor => AI Reference: 0
Learn Knowledge: true
Unknown Element Rate: 1.0
On-The-Spot A.I.: false
```

**Resultado**: Comportamento casual e imprevisível, inimigos aprendem mas cometem erros.

---

### Configuração Caótica

```
Actor Style: Random
Enemy Style: Random
Actor A.I. Level: 0
Enemy A.I. Level: 0
Actor Rating Variance: 9
Enemy Rating Variance: 9
Actor => AI Reference: 0
Learn Knowledge: false
Unknown Element Rate: 2.0
On-The-Spot A.I.: false
```

**Resultado**: Completamente caótico, totalmente aleatório, inimigos não aprendem.

## Veja Também

- **[Parâmetros de Default Conditions](default-conditions.md)** - Condições padrão para skills
- **[Parâmetros de TGR Weight](tgr-weight.md)** - Configuração de influência de peso
- **[Notetags de Configuração Geral](../notetags/configuracao-geral.md)** - Sobrescrever parâmetros globalmente
