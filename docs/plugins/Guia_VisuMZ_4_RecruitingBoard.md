# Guia do Plugin: VisuMZ_4_RecruitingBoard

**Objetivo:** Criar um guia completo para desenvolvedores sobre como usar o `VisuMZ_4_RecruitingBoard` para implementar um quadro de recrutamento onde o jogador pode contratar novos membros para o grupo.

## 1. Introdução ao Recruiting Board

### 1.1. O que é o Recruiting Board?
O plugin `VisuMZ_4_RecruitingBoard` cria uma cena, geralmente acessada em tavernas ou guildas, onde o jogador pode visualizar e contratar novos atores para o seu grupo, pagando um custo em ouro. A lista de atores disponíveis pode ser personalizada cada vez que a cena é aberta.

### 1.2. Pré-requisitos:
Para o correto funcionamento deste plugin, é necessário ter o `VisuMZ_0_CoreEngine` instalado e devidamente configurado em seu projeto.

## 2. Configurações do Plugin (Plugin Parameters)

As configurações do plugin permitem ajustar o comportamento padrão e a aparência da cena de recrutamento.

### 2.1. General Settings
- **`Default Cost Per Level`**: Define o custo padrão por nível para atores que não possuem uma notetag de custo específico. Por exemplo, se o valor for `1000`, um ator de nível 5 custará 5000 de ouro.

### 2.2. Background Settings
- **`Background Image`**: Permite configurar uma imagem de fundo para a cena do quadro de recrutamento, personalizando a sua aparência.

### 2.3. Vocabulary Settings
- Permite customizar os textos exibidos na cena, como o título (`Board Title`) e os nomes dos comandos (`Recruit`, `Dismiss`).

## 3. Guia de Comandos de Plugin (Plugin Commands)

Os comandos de plugin são usados para abrir a cena do quadro de recrutamento.

### 3.1. Open Recruiting Board
- **`Open Recruiting Board`**: Abre a cena de recrutamento.
  - **`Actor ID(s)`**: Uma lista dos IDs dos atores que estarão disponíveis para recrutamento.
  - **`Discount Rate`**: Uma taxa de desconto que pode ser aplicada aos custos de recrutamento. Por exemplo, um valor de `0.1` representa 10% de desconto.
  - **Exemplo prático:**
    > Crie um evento de quadro de avisos em uma taverna. No evento, use o comando `Open Recruiting Board` e adicione os IDs dos atores que você deseja que apareçam na lista. Você pode, por exemplo, ter diferentes quadros em diferentes cidades, cada um com uma lista de heróis locais.

## 4. Guia de Recursos por Notetags (Database)

As notetags permitem um controle mais refinado sobre o custo de cada ator.

### 4.1. Atores
- **`<Recruit Cost Per Level: x>`**: Define o custo de recrutamento do ator como `x` multiplicado pelo seu nível.
  - **Exemplo:** `<Recruit Cost Per Level: 500>` fará com que um ator de nível 10 custe 5000 de ouro.

- **`<Fixed Recruit Cost: x>`**: Define um custo fixo de `x` para recrutar o ator, independentemente do seu nível. Esta notetag tem prioridade sobre a `Recruit Cost Per Level`.
  - **Exemplo:** `<Fixed Recruit Cost: 2000>` fará com que o ator sempre custe 2000 de ouro.

- **`<Recruit Description: text>`**: Adiciona um texto descritivo para o ator, que será exibido na cena de recrutamento.
  - **Exemplo:** `<Recruit Description: Um guerreiro habilidoso da região norte.>`

## 5. Guia de Recursos via JavaScript (Avançado)

Para desenvolvedores que preferem controle via script, é possível abrir a cena de recrutamento diretamente.

### 5.1. Abrir a Cena de Recrutamento
- **Abrir a cena:**
  ```javascript
  SceneManager.push(Scene_RecruitingBoard);
  ```
- **Preparando a cena com atores e desconto:**
  ```javascript
  const actorIds = [1, 5, 8]; // IDs dos atores
  const discount = 0.0; // 0% de desconto
  SceneManager.push(Scene_RecruitBoard);
  SceneManager.prepareNextScene(actorIds, discount);
  ```
