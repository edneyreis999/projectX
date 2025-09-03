# Guia do Plugin VisuMZ_1_EventsMoveCore

**Objetivo:** Criar um guia completo para desenvolvedores sobre como usar o `VisuMZ_1_EventsMoveCore` para aprimorar a movimentação de eventos, incluindo movimento diagonal, perseguição e fuga.

## 1. Introdução ao Events & Move Core

### 1.1. O que é o Events & Move Core?

O plugin melhora a IA de movimento dos eventos, permitindo comportamentos mais complexos e realistas sem a necessidade de rotas de movimento complexas.

### 1.2. Pré-requisitos:

É necessário ter o `VisuMZ_0_CoreEngine` instalado e ativo.

## 2. Configurações do Plugin (Plugin Parameters)

### 2.1. Diagonal Movement:

- **O que faz:** Permite habilitar o movimento diagonal para eventos e para o jogador.
- **Como usar:** Ative `Player Diagonal` e `Event Diagonal` para permitir um movimento mais fluido em 8 direções em todo o jogo.

### 2.2. Event Vision:

- **O que faz:** Detalha como funcionam os "cones de visão" dos eventos para detectar o jogador.
- **Como usar:** Configure `Vision Style` para 'Line' para que os guardas em seu jogo só possam ver o jogador em uma linha reta à sua frente, criando uma mecânica de stealth.

### 2.3. Chase & Flee:

- **O que faz:** Explica as configurações de perseguição e fuga, como distância de ativação e velocidade.
- **Como usar:** Ajuste o `Chase Speed` para `+1` para criar um inimigo no mapa que se move mais rápido que o jogador quando o avista.

## 3. Guia de Comandos de Plugin (Plugin Commands)

### 3.1. Usar os Comandos de Movimento:

- **`Event Chase Player`**: Use este comando em um evento de 'Cachorro' para que ele persiga o jogador assim que ele entrar em uma determinada área.
- **`Event Flee Player`**: Faz com que um evento fuja do jogador.
- **`Event Stop Chase/Flee`**: Para a perseguição ou fuga de um evento.
- **`Event Move To`**: Crie uma cutscene onde um personagem anda até uma coordenada específica do mapa usando `Event Move To: x, y`.
- **`Change Event Speed`**: Faça um evento de 'Tartaruga' se mover mais lentamente usando `Change Event Speed: this, -2`.

## 4. Guia de Recursos por Notetags (Database & Events)

### 4.1. Notetags de Movimento:

- **`<Always Chase>`**: Coloque na notetag de um evento de 'Zumbi' para que ele persiga o jogador incondicionalmente.
- **`<Sight Range: x>`**: Define o alcance de visão do evento para `x` tiles.
- **`<Chase Speed: +y>`**: Aumenta a velocidade de perseguição do evento em `y`.

### 4.2. Notetags de Gatilho (Triggers):

- **`<On Sight>`**: Use em um evento de guarda. Na página do evento, crie um gatilho de 'Switch' (ex: 'Alerta') que é ativado quando o jogador é visto.
- **`<On Lose Sight>`**: Ativa um gatilho quando o evento perde o jogador de vista.
- **`<On Chase Start>`**: Ativa um gatilho quando o evento começa a perseguir o jogador.

### 4.3. Notetags de Comportamento:

- **`<No Diagonal>`**: Use em um evento que se move sobre trilhos para garantir que ele só se mova em 4 direções.
- **`<Through On>`**: Permite que o evento atravesse paredes e outros obstáculos.
- **`<Direction Fix>`**: Impede que o evento mude de direção.

## 5. Guia de Recursos via JavaScript (Avançado)

### 5.1. Usar Script Calls em Eventos:

- **Mover um evento em direção a outro:**
  ```javascript
  $gameMap.event(1).moveTowardEvent($gameMap.event(2));
  ```
- **Verificar se um evento pode ver o jogador:**
  ```javascript
  if ($gameMap.event(5).canSeePlayer()) {
    // Lógica a ser executada
  }
  ```
