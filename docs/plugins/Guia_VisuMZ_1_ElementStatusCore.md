# Guia do Plugin VisuMZ_1_ElementStatusCore

**Objetivo:** Criar um guia completo para desenvolvedores sobre como usar o plugin `VisuMZ_1_ElementStatusCore`. Abordar a customização de elementos, taxas elementares, e a exibição de status no jogo.

## 1. Introdução ao Element & Status Core

### 1.1. O que é o Element & Status Core?

O plugin expande o sistema de elementos e status, permitindo maior controle sobre fraquezas, resistências e como as informações são apresentadas ao jogador.

### 1.2. Pré-requisitos

É necessário ter o `VisuMZ_0_CoreEngine` instalado e ativo.

## 2. Configurações do Plugin (Plugin Parameters)

### 2.1. Element Settings

- **O que faz:** Permite configurar ícones para elementos, customizar cores e definir textos padrão.
- **Como usar:** Associe um ícone de fogo ao elemento 'Fogo' para que ele apareça em menus de habilidades e status, melhorando a interface visual.

### 2.2. Status Menu Settings

- **O que faz:** Detalha as opções para exibir taxas elementares no menu de status do ator.
- **Como usar:** Ative a exibição de resistências elementares para que o jogador possa ver facilmente que um personagem é forte contra 'Gelo' e fraco contra 'Trovão'.

### 2.3. Enemy Select Settings

- **O que faz:** Mostra as fraquezas e resistências de um inimigo ao selecioná-lo em batalha (requer `Battle Core`).
- **Como usar:** Ative esta opção para que, ao mirar em um inimigo, o jogador veja ícones indicando sua vulnerabilidade a 'Fogo', incentivando o uso de estratégias elementares.

## 3. Guia de Recursos por Notetags (Database)

### 3.1. Atores, Classes, Inimigos, Equipamentos e Estados

- **Notetags:**
  - `<Element Rate: x, y%>`: Define a taxa de dano elemental. `x` é o ID ou nome do elemento, `y` é a porcentagem.
  - `<Element Absorb: x>`: Faz com que o personagem absorva o dano do elemento `x`, curando-se.
  - `<Element Reflect: x>`: Reflete o dano do elemento `x` de volta ao atacante.
- **Como e quando implementar:**
  - Use `<Element Rate: Fogo, 200%>` na notetag de um inimigo do tipo 'Planta' para torná-lo vulnerável a ataques de fogo.
  - Use `<Element Absorb: Água>` em um equipamento para criar uma armadura que cura o usuário ao receber dano de água.

### 3.2. Habilidades e Itens

- **Notetags:**
  - `<Element: x>`: Define o elemento de uma habilidade/item.
  - `<Element: +x>`: Adiciona um elemento a uma habilidade/item.
  - `<Element: -x>`: Remove um elemento de uma habilidade/item.
- **Como e quando implementar:**
  - Adicione `<Element: +Luz>` e `<Element: -Trevas>` na notetag de uma habilidade 'Espada Sagrada' para que ela cause dano de ambos os elementos simultaneamente.

### 3.3. Customizando a Exibição

- **Notetags:**
  - `<Hide Element Rate: x>`: Oculta a taxa elemental `x` da janela de status.
  - `<Show Element Rate: x>`: Mostra a taxa elemental `x` na janela de status.
- **Como e quando implementar:**
  - Se um chefe tem uma fraqueza secreta, use `<Hide Element Rate: Sagrado>` na notetag do inimigo para que essa vulnerabilidade não seja exibida na janela de seleção de alvo.

## 4. Guia de Recursos via JavaScript (Avançado)

### 4.1. Usar Notetags com JavaScript

- **Notetags:**
  - `<JS Element Rate: x, code>`: Usa um código JavaScript para definir a taxa elemental.
- **Exemplo prático:**
  - Crie um estado 'Encharcado' que dobra o dano de 'Trovão'. Use a notetag `<JS Element Rate: Trovão, rate * 2>` no estado.

### 4.2. Usar Script Calls em Eventos

- **O que faz:** Permite acessar dados elementares de um battler.
- **Exemplo prático:**
  - Use um Script Call para verificar a resistência de um inimigo a um elemento e exibir uma mensagem:

  ```javascript
  if ($gameTroop.members()[0].elementRate(4) > 1) {
    $gameMessage.add('O inimigo parece fraco contra Fogo!');
  }
  ```
