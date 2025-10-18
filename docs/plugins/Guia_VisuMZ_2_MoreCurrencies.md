# Guia do Plugin: VisuMZ_2_MoreCurrencies

**Objetivo:** Criar um guia completo para desenvolvedores sobre como usar o `VisuMZ_2_MoreCurrencies` para adicionar, gerenciar e exibir múltiplas moedas no jogo, além do ouro padrão.

## 1. Introdução ao More Currencies

### 1.1. O que é o More Currencies?

O plugin permite a criação de um número ilimitado de moedas personalizadas, que são vinculadas a variáveis do jogo. Isso permite que lojas especiais usem moedas diferentes, como cristais, pontos de honra, ou qualquer outra coisa que você possa imaginar.

### 1.2. Pré-requisitos:

É necessário ter o `VisuMZ_0_CoreEngine` e `VisuMZ_1_ItemsEquipsCore` instalados e posicionados antes deste plugin na lista de plugins.

## 2. Configurações do Plugin (Plugin Parameters)

### 2.1. Currency List:

Para criar uma nova moeda, você deve adicioná-la na lista de parâmetros do plugin. Cada moeda tem as seguintes propriedades:

- **Variable ID**: O ID da variável do jogo que armazenará a quantidade desta moeda.
- **Name**: O nome da moeda (ex: "Cristais Mágicos").
- **Icon**: O ícone que representará a moeda.
- **Text Color**: A cor do texto para exibir a quantidade da moeda.
- **Format**: O formato de como a moeda será exibida. Use `{value}` para a quantidade e `{icon}` para o ícone.

**Como usar:**
Para criar uma moeda 'Cristais Mágicos' vinculada à Variável 30:
- `Variable ID`: `30`
- `Name`: `Cristais Mágicos`
- `Icon`: `180` (ícone de cristal)
- `Text Color`: `14`
- `Format`: `{value} {icon}`

## 3. Guia de Comandos de Plugin (Plugin Commands)

### 3.1. Usar os Comandos de Moeda:

- **Gain Currency**: Adiciona uma quantidade de uma moeda específica ao jogador.
- **Lose Currency**: Remove uma quantidade de uma moeda específica do jogador.
- **Set Currency**: Define a quantidade de uma moeda específica para um valor exato.
- **Show/Hide Currency Window**: Mostra ou esconde a janela de moedas na tela.

**Exemplos práticos:**
- **`Gain Currency`**: Crie um baú que, ao ser aberto, usa este comando para dar ao jogador `10` `Cristais Mágicos`.
- **`Show/Hide Currency Window`**: Use `Show Currency Window` para exibir temporariamente a quantidade de moedas na tela após o jogador ganhar ou perder alguma.

## 4. Guia de Recursos por Notetags (Database)

### 4.1. Itens, Armas e Armaduras:

- `<Variable id Buy Cost: y>`: O item custa `y` da moeda vinculada à variável `id` para ser comprado.
- `<Variable id Sell Cost: y>`: O jogador recebe `y` da moeda vinculada à variável `id` ao vender o item.
- `<Variable id Cost: y>`: Define o custo para compra e venda (a venda será uma porcentagem do valor de compra).

**Como e quando implementar:**
- Para fazer uma 'Espada Lendária' custar 50 'Cristais Mágicos' em uma loja, use a notetag `<Variable 30 Cost: 50>` no item (assumindo que a variável da moeda é 30).

### 4.2. Inimigos:

Este plugin não lida diretamente com drops de inimigos. Para fazer inimigos droparem moedas, você pode usar um plugin de drops customizado ou usar um evento comum no final da batalha que verifica o último inimigo derrotado e dá a moeda via comando de plugin.

## 5. Guia de Recursos via JavaScript (Avançado)

### 5.1. Acessar e Modificar Moedas:

- **Acessar a quantidade de uma moeda:**
  - `$gameVariables.value(id)`: Retorna a quantidade da moeda vinculada à variável `id`.

- **Modificar a quantidade de uma moeda:**
  - `$gameVariables.setValue(id, value)`: Define a quantidade da moeda vinculada à variável `id` para `value`.

**Exemplo prático (Acessar):**
- Em um Conditional Branch, verifique se o jogador tem pelo menos 100 Cristais: `$gameVariables.value(30) >= 100`.

**Exemplo prático (Modificar):**
- Use um Script Call para dar ao jogador uma quantidade de cristais igual ao nível do herói: `$gameVariables.setValue(30, $gameVariables.value(30) + $gameActors.actor(1).level);`
