# Guia do Plugin VisuMZ_1_ItemsEquipsCore

**Objetivo:** Criar um guia completo para desenvolvedores sobre como usar o `VisuMZ_1_ItemsEquipsCore` para aprimorar os sistemas de itens, equipamentos e inventário.

## 1. Introdução ao Items & Equips Core

### 1.1. O que é o Items & Equips Core?

O plugin moderniza a gestão de itens e equipamentos, permitindo novos tipos de slots, customização de inventário e muito mais.

### 1.2. Pré-requisitos:

É necessário ter o `VisuMZ_0_CoreEngine` instalado e ativo.

## 2. Configurações do Plugin (Plugin Parameters)

### 2.1. Item Settings:

- **O que faz:** Permite configurar a capacidade máxima de itens, a organização do inventário e a exibição de novas informações.
- **Como usar:** Aumente o `Max Items` para 999 para permitir que os jogadores carreguem mais itens. Configure `Item Sort` para organizar automaticamente o inventário por tipo.

### 2.2. Equipment Settings:

- **O que faz:** Detalha como criar novos tipos de slots de equipamento (ex: 'Amuleto', 'Anel').
- **Como usar:** Adicione um novo `Equip Type` chamado 'Anel'. Depois, vá para a aba 'Types' no banco de dados e adicione 'Anel' à lista de 'Equip Types'. Agora os atores podem equipar anéis.

### 2.3. Scene Settings:

- **O que faz:** Explica como customizar a aparência das cenas de Itens e Equipamentos.
- **Como usar:** Altere o `Command Window` na cena de equipamentos para mostrar os comandos 'Equip', 'Optimize', e 'Clear' na horizontal, economizando espaço na tela.

## 3. Guia de Comandos de Plugin (Plugin Commands)

### 3.1. Usar os Comandos de Itens e Equipamentos:

- **`Change Max Items`**: Dê ao jogador uma 'Mochila Maior' que, ao ser usada, executa este comando para aumentar permanentemente a capacidade do inventário.
- **`Gain/Lose Item`**: Adiciona ou remove um item do inventário.
- **`Force Equip`**: Crie uma cutscene onde um personagem é forçado a equipar uma 'Espada Amaldiçoada' usando o comando `Force Equip`.
- **`Has Item/Armor/Weapon`**: Use este comando com um 'Conditional Branch' para verificar se o jogador possui um item-chave necessário para abrir uma porta.

## 4. Guia de Recursos por Notetags (Database)

### 4.1. Itens:

- **`<Max Item: x>`**: Use na notetag de um item-chave para garantir que o jogador só possa ter uma unidade dele.
- **`<Cannot Drop>`**: Impede que o item seja descartado.
- **`<Cannot Sell>`**: Impede a venda de itens de quest.

### 4.2. Armas e Armaduras (Equipamentos):

- **`<Equip Slot: x>`**: Use `<Equip Slot: Anel>` em um item para designá-lo como um anel.
- **`<Equip Requirement: user.level > 20>`**: Cria uma espada que só pode ser equipada por personagens acima do nível 20.
- **`<Seal Equip Slot: Shield>`**: Use em uma arma de duas mãos para impedir o uso de escudos com ela.

### 4.3. Atores e Classes:

- **`<Equip Slot: x, y, z>`**: Use `<Equip Slot: Weapon, Shield, Head, Body, Accessory, Ring, Ring>` na notetag de uma classe 'Guerreiro' para dar a ela dois slots de anel.
- **`<Cannot Equip Type: Weapon>`**: Use em uma classe 'Monge' para que ela só possa lutar desarmada.

## 5. Guia de Recursos via JavaScript (Avançado)

### 5.1. Usar Notetags com JavaScript:

- **`<JS Equip Requirement: user.mhp > 1000>`**: Cria um elmo que só pode ser equipado por personagens com mais de 1000 de HP máximo.
- **`<JS On Equip: user.learnSkill(50);>`**: Cria uma arma que ensina uma habilidade ao ser equipada.
- **`<JS On Unequip: user.forgetSkill(50);>`**: Faz com que o personagem esqueça a habilidade ao desequipar a arma.

### 5.2. Usar Script Calls em Eventos:

- **Verificar se o jogador tem mais de 10 poções:**
  ```javascript
  if ($gameParty.numItems($dataItems[1]) > 10) { ... }
  ```
- **Remover todos os equipamentos de um ator:**
  ```javascript
  $gameActors.actor(1).clearEquipments();
  ```
