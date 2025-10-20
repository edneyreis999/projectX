# Guia do Plugin: VisuMZ_4_RandomizeShop

**Objetivo:** Criar um guia completo para desenvolvedores sobre como usar o `VisuMZ_4_RandomizeShop` para criar lojas com inventários aleatórios que podem mudar com o tempo.

## 1. Introdução ao Randomize Shop

### 1.1. O que é o Randomize Shop?
O plugin `VisuMZ_4_RandomizeShop` permite que o conteúdo das lojas seja selecionado aleatoriamente a partir de uma lista de itens pré-definida. Além disso, oferece a funcionalidade de reabastecimento periódico, fazendo com que o inventário da loja mude de tempos em tempos.

### 1.2. Pré-requisitos:
Para o correto funcionamento deste plugin, é necessário ter o `VisuMZ_0_CoreEngine` instalado e devidamente configurado em seu projeto.

## 2. Configurações do Plugin (Plugin Parameters)

As configurações globais do plugin permitem definir como e quando as lojas aleatórias serão reabastecidas.

### 2.1. Restock Settings:
- **`Restock Type`**: Define o gatilho para o reabastecimento. As opções são:
    - `Time`: Reabastece com base no tempo de jogo.
    - `Steps`: Reabastece a cada X passos dados pelo jogador.
    - `Switch`: Reabastece quando uma Switch específica é ativada.

- **Como usar:**
  > Para que todas as lojas aleatórias reabasteçam seu inventário a cada 1000 passos, configure o `Restock Type` para `Steps` e o `Restock Steps` para `1000`.

## 3. Guia de Comandos de Plugin (Plugin Commands)

Os comandos de plugin oferecem controle manual sobre o reabastecimento das lojas.

### 3.1. Usar os Comandos de Loja:
- **`Restock All Shops`**: Força o reabastecimento de todas as lojas aleatórias do jogo.
  - **Exemplo prático:**
    > Crie um evento de "Anúncio do Mercador" que, quando ativado, executa este comando para simular a chegada de novas mercadorias em todas as lojas.

- **`Clear All Shop Restocks`**: Impede que as lojas reabasteçam seu inventário.
  - **Exemplo prático:**
    > Utilize este comando para "congelar" o inventário de todas as lojas, o que pode ser útil em uma quest de escassez de recursos.

## 4. Guia de Recursos por Comentários de Evento

A maneira mais comum de configurar uma loja aleatória é através de comentários no evento de `Shop Processing`.

### 4.1. Criar um Inventário Aleatório:
As notetags, neste plugin, são inseridas como comentários no evento da loja.

- **Sintaxe do Pool de Itens:**
  - Inicie com o comentário: `<Random Shop Pool>`
  - Adicione itens no formato: `Tipo ID: Chance%` ou `Tipo ID: Quantidade, Chance%`
    - `Tipo`: Pode ser `Item`, `Weapon` ou `Armor`.
    - `ID`: O ID do item, arma ou armadura no banco de dados.
    - `Chance%`: A probabilidade do item aparecer na loja.
    - `Quantidade`: (Opcional) A quantidade de itens que estarão disponíveis. Pode ser um número fixo ou um intervalo (ex: `1-3`).
  - Finalize com o comentário: `</Random Shop Pool>`

- **Sintaxe do Estoque:**
  - Use o comentário `<Random Shop Stock: X>` para definir quantos itens do pool serão selecionados para a loja.

- **Exemplo prático:**
  > Comentário 1: `<Random Shop Pool>`
  > Comentário 2: `Item 1: 100%` (Poção sempre aparece)
  > Comentário 3: `Weapon 5: 50%` (Espada de Ferro tem 50% de chance)
  > Comentário 4: `Armor 10: 1-3, 75%` (1 a 3 Elmos de Couro com 75% de chance)
  > Comentário 5: `</Random Shop Pool>`
  > Comentário 6: `<Random Shop Stock: 2>`
  >
  > **Resultado:** A loja terá a Poção (garantida) e mais um item aleatório, que pode ser a Espada de Ferro ou os Elmos de Couro.

## 5. Guia de Recursos via JavaScript (Avançado)

Para desenvolvedores que preferem controle via script, o plugin oferece funções para gerenciar as lojas.

### 5.1. Acionar Funções com Script:
- **Reabastecer todas as lojas:**
  ```javascript
  $gameSystem.restockAllShops();
  ```

- **Limpar o reabastecimento de todas as lojas:**
  ```javascript
  $gameSystem.clearAllShopRestocks();
  ```
