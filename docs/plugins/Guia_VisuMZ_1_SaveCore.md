# Guia do Plugin VisuMZ_1_SaveCore

**Objetivo:** Criar um guia completo para desenvolvedores sobre como usar o `VisuMZ_1_SaveCore` para personalizar a cena de salvar e carregar o jogo.

## 1. Introdução ao Save Core

### 1.1. O que é o Save Core?

O plugin oferece controle total sobre a aparência e funcionalidade da tela de save/load, incluindo o número de slots, as informações exibidas e o layout.

### 1.2. Pré-requisitos:

É necessário ter o `VisuMZ_0_CoreEngine` instalado e ativo.

## 2. Configurações do Plugin (Plugin Parameters)

### 2.1. General Settings:

- **O que faz:** Permite alterar o número máximo de saves, o número de slots visíveis e o texto exibido para arquivos vazios ou corrompidos.
- **Como usar:** Aumente o `Max Save Files` para 50 para dar aos jogadores mais espaço para salvar. Altere o `Visible Save Files` para 5 para mostrar mais slots na tela de uma vez.

### 2.2. Data & Info Settings:

- **O que faz:** Detalha como configurar as informações que aparecem em cada slot de save (ex: nome do mapa, ouro, nível do líder).
- **Como usar (Adicionar Ouro):**
  - Na lista `Info Data`, adicione uma nova entrada:
    - `Label`: `Ouro:`
    - `JS Value`: `return $gameParty.gold();`
    - `JS Show`: `return true;`
- **Como usar (Adicionar Localização):**
  - Adicione outra entrada:
    - `Label`: `Local:`
    - `JS Value`: `return $gameMap.displayName() || $dataMapInfos[$gameMap.mapId()].name;`
    - `JS Show`: `return true;`

### 2.3. Layout & Appearance Settings:

- **O que faz:** Explica como customizar a posição e o layout das janelas (lista de saves, janela de informações, janela de ajuda).
- **Como usar:** Configure o `Layout Type` para 'Horizontal' para criar uma tela de save onde os slots são pré-visualizações lado a lado, semelhante a muitos jogos de console.

## 3. Guia de Comandos de Plugin (Plugin Commands)

### 3.1. Usar os Comandos de Save:

- **`Open Save Screen`**: Abre a tela de salvar.
- **`Open Load Screen`**: Abre a tela de carregar.
- **`Delete Save File`**: Crie um modo 'Hardcore' que, ao dar Game Over, usa este comando para apagar o save do jogador.
- **`Disable Saving`**: Use este comando antes de uma seção crítica do jogo (como uma masmorra final) para impedir que o jogador salve.
- **`Save To File ID`**: Crie um ponto de 'Auto-Save' que salva silenciosamente o progresso do jogador no slot 99, sem abrir a tela de save.

## 4. Guia de Recursos por Notetags (Database)

Este plugin não utiliza notetags de forma proeminente.

## 5. Guia de Recursos via JavaScript (Avançado)

### 5.1. Entendendo o `DataManager`:

O `DataManager` é o objeto global que gerencia a criação e leitura dos dados de save.

### 5.2. Scripts de Valor (`JS Value`):

- **Nível do Líder:**
  ```javascript
  return $gameParty.leader() ? $gameParty.leader().level : 0;
  ```
- **Tempo de Jogo:**
  ```javascript
  return $gameSystem.playtimeText();
  ```

### 5.3. Acessar Informações de um Save:

- **Verificar o nível do jogador no save do slot 1:**
  ```javascript
  DataManager.loadSavefileInfo(1).level
  ```
  (Nota: requer carregamento assíncrono, o uso é mais complexo).
