# Guia do Plugin: VisuMZ_4_SkillShop

**Objetivo:** Criar um guia completo para desenvolvedores sobre como usar o `VisuMZ_4_SkillShop` para implementar lojas onde os jogadores podem comprar habilidades (skills) para seus personagens.

## 1. Introdução ao Skill Shop

### 1.1. O que é o Skill Shop?

O plugin `VisuMZ_4_SkillShop` cria uma cena de loja especializada onde os atores do grupo podem aprender novas habilidades. O custo para aprender essas habilidades pode ser em ouro ou em moedas customizadas (através do plugin `VisuMZ_2_MoreCurrencies`).

### 1.2. Pré-requisitos

Para o correto funcionamento deste plugin, é necessário ter o `VisuMZ_0_CoreEngine` instalado e devidamente configurado em seu projeto.

## 2. Configurações do Plugin (Plugin Parameters)

As configurações do plugin permitem ajustar o comportamento padrão e a aparência da loja de habilidades.

### 2.1. General Settings

- **`Command Name`**: Altera o nome do comando para aprender a habilidade na janela de confirmação. Por exemplo, você pode mudar de "Learn" para "Aprender Magia" em uma loja de magos.
- **`Default Cost`**: Define um custo padrão em ouro para todas as habilidades que não tiverem um custo específico definido em suas notetags.

## 3. Guia de Comandos de Plugin (Plugin Commands)

Os comandos de plugin são a principal forma de interagir com o sistema de loja de habilidades.

### 3.1. Open Skill Shop

- **`Open Skill Shop`**: Este comando abre a cena da loja de habilidades.
  - **`Skill ID(s)`**: Uma lista das IDs das habilidades que estarão disponíveis para compra nesta loja específica.
  - **`Discount Rate`**: Permite aplicar uma taxa de desconto. Por exemplo, um valor de `0.1` representa um desconto de 10%.
  - **Exemplo prático:**
    > Crie um NPC "Mestre de Armas" que, ao ser interagido, executa o comando `Open Skill Shop`. Nos parâmetros do comando, adicione as IDs das habilidades de espada que você deseja vender. Você pode criar diferentes mestres em diferentes cidades, cada um com sua própria lista de habilidades.

## 4. Guia de Recursos por Notetags (Database)

As notetags são usadas diretamente nas habilidades no banco de dados para definir custos, condições e restrições.

### 4.1. Habilidades (Skills)

- **`<Skill Shop Cost: x>`**: Define o custo da habilidade como `x` de ouro.
  - **Exemplo:** `<Skill Shop Cost: 300>`

- **`<Currency Y Cost: z>`**: (Requer `VisuMZ_2_MoreCurrencies`) Define um custo em uma moeda customizada. `Y` é o ID da variável da moeda e `Z` é a quantidade.
  - **Exemplo:** `<Variable 30 Cost: 5>` fará a habilidade custar 5 "Cristais Mágicos", se a variável 30 for usada para essa moeda.

- **`<Skill Shop Require Class: id>`**: Restringe a habilidade para que apenas classes específicas possam aprendê-la. Você pode usar o ID ou o nome da classe.
  - **Exemplo:** `<Skill Shop Require Class: 4>` ou `<Skill Shop Require Classes: Paladin, Cleric>`

- **`<Skill Shop Require Level: x>`**: Exige que o ator tenha no mínimo o nível `x` para aprender a habilidade.
  - **Exemplo:** `<Skill Shop Require Level: 10>`

- **`<Skill Shop Require Learned Skill: id>`**: Exige que o ator já tenha aprendido outra habilidade específica.
  - **Exemplo:** `<Skill Shop Require Learned Skill: 55>`

- **`<Skill Shop Require Switch: x>`**: Faz com que a habilidade só apareça na loja se a switch `x` estiver ligada.
  - **Exemplo:** `<Skill Shop Require Switch: 25>`

## 5. Guia de Recursos via JavaScript (Avançado)

Para maior flexibilidade, é possível interagir com a loja de habilidades através de scripts.

### 5.1. Gerenciar a Loja com Script

- **Abrir a loja de habilidades:**

  ```javascript
  SceneManager.push(Scene_SkillShop);
  ```

- **Abrir a loja com uma lista de habilidades e desconto:**

  ```javascript
  const skillIds = [51, 52, 53]; // IDs das Habilidades
  const discount = 0.2; // 20% de desconto
  SceneManager.push(Scene_SkillShop);
  SceneManager.prepareNextScene(skillIds, discount);
  ```
