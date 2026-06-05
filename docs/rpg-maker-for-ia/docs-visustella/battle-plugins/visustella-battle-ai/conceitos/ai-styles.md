# A.I. Styles - Estilos de Inteligência Artificial

## Visão Geral

Existem atualmente **quatro estilos diferentes de A.I.** que determinam como a IA age e se comporta. Você pode mudar o estilo de A.I. usado globalmente através dos Plugin Parameters ou individualmente para classes e inimigos através do uso de notetags.

## Estilos Disponíveis

### 1. Classic Style

O estilo **"Classic"** é o estilo tradicional e padrão do RPG Maker MZ. Ele coloca ênfase no sistema de Rating, onde skills com ratings mais altos recebem mais prioridade do que skills com ratings mais baixos dentro da variância.

#### Regras

- ✅ Condições do Action Pattern devem ser cumpridas
- ✅ Skill deve ser usável (capaz de pagar custo e não estar desabilitada)
- ✅ Condições de A.I. do skill devem ser cumpridas
- ✅ Prioridade dada a ações com Ratings mais altos
- ⚙️ Rating variância determinado por Plugin Parameters e/ou notetags
- ⚙️ A.I. Level pode afetar se as A.I. Conditions serão ignoradas
- 🎲 Após aplicar Ratings, Rating Variances e A.I. Conditions, se ainda houver múltiplas ações disponíveis, escolha aleatoriamente
- ❌ Se nenhuma ação for válida, não faça nada

#### Quando Usar

- Quando você quer o comportamento tradicional do RPG Maker
- Para inimigos comuns com padrões de ataque simples
- Quando o sistema de rating já é suficiente

---

### 2. Gambit Style

O estilo **"Gambit"** é o estilo do Yanfly Engine Plugin's Battle A.I. Core. Ele desce a lista de skills com prioridade top-down contanto que elas cumpram as condições do Action Pattern e A.I. conditions. Ratings serão ignorados.

#### Regras

- ✅ Prioridade começa do topo da lista de skills e vai para o fundo
- ✅ Condições do Action Pattern devem ser cumpridas
- ✅ Skill deve ser usável (capaz de pagar custo e não estar desabilitada)
- ✅ Condições de A.I. do skill devem ser cumpridas
- ✅ Prioridade dada a ações localizadas mais acima na lista
- ❌ Ações em direção ao fundo da lista terão prioridade mais baixa
- ❌ Ratings e Rating Variance não têm influência na escolha de ações
- ⚙️ A.I. Level pode afetar se as A.I. Conditions serão ignoradas
- ❌ Se nenhuma ação for válida, não faça nada

#### Quando Usar

- Para criar padrões de ataque previsíveis e ordenados
- Quando você quer controle total sobre a ordem das habilidades
- Similar ao sistema de Gambits de Final Fantasy XII

---

### 3. Casual Style

O estilo **"Casual"** toma uma abordagem mais leve para A.I. Ele ignora o sistema de Ratings e não se importa com a ordem das ações também. Em vez disso, a única coisa que este estilo de A.I. se importa são as A.I. Conditions. Todas as ações válidas depois disso são escolhidas aleatoriamente.

#### Regras

- ✅ Condições do Action Pattern devem ser cumpridas
- ✅ Skill deve ser usável (capaz de pagar custo e não estar desabilitada)
- ✅ Condições de A.I. do skill devem ser cumpridas
- ❌ Não há sistema de prioridade para Ratings ou Ordem
- ❌ A.I. Level não importa aqui
- 🎲 Uma ação aleatória será selecionada de um grupo de ações válidas restantes
- ❌ Se nenhuma ação for válida, não faça nada

#### Quando Usar

- Para inimigos com comportamento mais imprevisível
- Quando as condições são mais importantes que a ordem
- Para combates mais casuais e divertidos

---

### 4. Random Style

O estilo **"Random"** simplesmente não se importa com ratings ou ordem. Ele só se importa se as skills podem ser usadas (capazes de pagar pelo custo) e condições do Action Pattern. Ele não se importa com A.I. Conditions, Ratings, ou Ordem.

#### Regras

- ✅ Condições do Action Pattern devem ser cumpridas
- ✅ Skill deve ser usável (capaz de pagar custo e não estar desabilitada)
- ❌ Condições de A.I. do skill são ignoradas
- ❌ Não há sistema de prioridade para Ratings ou Ordem
- ❌ A.I. Level não importa aqui
- 🎲 Uma ação aleatória será selecionada de um grupo de ações válidas restantes
- ❌ Se nenhuma ação for válida, não faça nada

#### Quando Usar

- Para inimigos completamente imprevisíveis
- Quando você quer comportamento caótico
- Para inimigos fracos ou simples

---

## Comparação dos Estilos

| Característica | Classic | Gambit | Casual | Random |
|----------------|---------|--------|--------|--------|
| **Prioridade** | Ratings | Ordem | Nenhuma | Nenhuma |
| **Conditions** | ✅ Sim | ✅ Sim | ✅ Sim | ❌ Não |
| **AI Level** | ✅ Sim | ✅ Sim | ❌ Não | ❌ Não |
| **Rating Variance** | ✅ Sim | ❌ Não | ❌ Não | ❌ Não |
| **Previsibilidade** | Média | Alta | Baixa | Muito Baixa |
| **Aleatoriedade** | Média | Nenhuma | Alta | Muito Alta |

## Configuração

### Via Plugin Parameters (Global)

Configure o estilo padrão para atores e inimigos em:
- **Plugin Parameters > A.I. General Settings > A.I. Style > Actor Style**
- **Plugin Parameters > A.I. General Settings > A.I. Style > Enemy Style**

### Via Notetags (Individual)

Use o notetag `<AI Style: x>` em:
- **Classes**: Para afetar atores com Auto Battle
- **Inimigos**: Para afetar inimigos individuais

Substitua `x` por: `Classic`, `Gambit`, `Casual`, ou `Random`

## Exemplos de Uso

### Classic Style (Padrão)
```html
<AI Style: Classic>
```
Use para comportamento tradicional do RPG Maker.

### Gambit Style (Prioridade)
```html
<AI Style: Gambit>
```
Use quando a ordem das skills na database deve ser seguida rigidamente.

### Casual Style (Condicional)
```html
<AI Style: Casual>
```
Use quando condições são mais importantes que prioridade.

### Random Style (Caótico)
```html
<AI Style: Random>
```
Use para inimigos imprevisíveis e caóticos.

## Veja Também

- **[Introdução](introducao.md)** - Visão geral do sistema
- **[Configuração via Notetags](../notetags/configuracao-geral.md)** - Implementação de A.I. Styles
- **[Configuração via Parâmetros](../parametros/configuracao-geral.md)** - Configuração global
