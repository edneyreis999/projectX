# Guia do Plugin VisuMZ_1_MainMenuCore

**Objetivo:** Criar um guia completo para desenvolvedores sobre como usar o `VisuMZ_1_MainMenuCore` para personalizar a cena do menu principal do jogo.

## 1. Introdução ao Main Menu Core

### 1.1. O que é o Main Menu Core?

O plugin oferece controle total sobre a aparência e funcionalidade do menu principal, permitindo adicionar, remover ou reorganizar comandos e janelas.

### 1.2. Pré-requisitos:

É necessário ter o `VisuMZ_0_CoreEngine` instalado e ativo.

## 2. Configurações do Plugin (Plugin Parameters)

### 2.1. Main Menu Command List:

- **O que faz:** Permite adicionar, remover ou reorganizar os comandos do menu principal.
- **Como adicionar um Comando:**
  - Para adicionar um comando 'Bestiário' que abre um evento comum, adicione uma nova entrada na lista:
    - `Symbol`: `bestiary`
    - `Text`: `Bestiário`
    - `JS Show`: `return true;` (sempre visível)
    - `JS Enable`: `return $gameSwitches.value(50);` (só habilitado se a Switch 50 estiver ON)
    - `JS Ext`: `SceneManager.push(Scene_Map); $commonEvent.play(10);` (chama o evento comum 10)
- **Como remover um Comando:**
  - Para remover o comando 'Formation', simplesmente delete a entrada correspondente da lista de comandos.
- **Como reorganizar Comandos:**
  - Para mover o comando 'Save' para o topo do menu, recorte e cole sua entrada no início da lista.

### 2.2. Window Settings:

- **O que faz:** Permite ajustar a posição, layout e aparência da janela de comandos e da janela de status dos personagens.
- **Como usar:** Configure o `Command Layout` para 'Horizontal' e ajuste o `Command Columns` para 4 para criar um menu com ícones na parte inferior da tela, estilo console.

## 3. Guia de Comandos de Plugin (Plugin Commands)

### 3.1. Usar os Comandos de Menu:

- **`Hide Main Menu Command`**: Use o comando `Hide Main Menu Command: formation` no início do jogo se você não quer que o jogador possa alterar a formação do grupo.
- **`Enable Main Menu Command`**: Após o jogador obter um diário, use `Enable Main Menu Command: quest` para habilitar o comando 'Diário de Missões' no menu.

## 4. Guia de Recursos por Notetags (Database)

### 4.1. Atores e Classes:

- **`<Hide In Menu>`**: Use a notetag em um 'ator' que funciona como um personagem de suporte temporário para que ele não apareça na janela de status do menu principal.

## 5. Guia de Recursos via JavaScript (Avançado)

### 5.1. Usar JavaScript nos Parâmetros do Plugin:

- **`JS Show`**: Faça o comando 'Opções' aparecer apenas no mapa-múndi. Use: `return $gameMap.mapId() === 5;`
- **`JS Enable`**: Habilite o comando 'Salvar' apenas se o jogador não estiver em batalha. Use: `return !$gameParty.inBattle();`
- **`JS Ext`**: Crie um comando 'Suicídio' que causa Game Over. Use: `return SceneManager.goto(Scene_Gameover);`

### 5.2. Usar Script Calls em Eventos:

- **Ligar uma switch que habilita um comando de menu:**
  ```javascript
  $gameSwitches.setValue(50, true);
  ```
