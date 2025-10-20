# Guia do Plugin: VisuMZ_4_MapCameraZoom

## 1. Introdução ao Map Camera Zoom

### 1.1. O que é o Map Camera Zoom?

O plugin `VisuMZ_4_MapCameraZoom` permite aumentar ou diminuir o zoom da câmera do mapa dinamicamente. Isso pode ser feito tanto por comandos de evento quanto por configurações específicas do mapa, sendo uma ferramenta poderosa para criar efeitos cinemáticos ou simplesmente ajustar a visão do jogo para o jogador.

### 1.2. Pré-requisitos

É necessário ter o plugin `VisuMZ_0_CoreEngine` instalado e ativado para que o `VisuMZ_4_MapCameraZoom` funcione corretamente.

## 2. Configurações do Plugin (Plugin Parameters)

As configurações globais de zoom podem ser ajustadas diretamente nos parâmetros do plugin.

### 2.1. General Settings

- **Default Zoom**: Define o nível de zoom padrão para todos os mapas do jogo. Um valor de `1.0` representa 100% (sem zoom), `1.5` representa 150%, e assim por diante.
- **Zoom Speed**: Controla a velocidade padrão das transições de zoom.
- **Minimum Zoom**: Define o nível mínimo de zoom que a câmera pode atingir.
- **Maximum Zoom**: Define o nível máximo de zoom que a câmera pode atingir.

**Como usar:**
Para que todos os mapas comecem com um leve zoom, você pode definir o `Default Zoom` como `1.5`. Use `Minimum Zoom` e `Maximum Zoom` para limitar o quão perto ou longe a câmera pode ir, evitando que o jogador veja áreas indesejadas do mapa.

## 3. Guia de Comandos de Plugin (Plugin Commands)

Os comandos de plugin permitem controlar o zoom da câmera em tempo real durante o jogo.

### 3.1. Usar os Comandos de Zoom

- **Set Camera Zoom**: Altera o nível de zoom da câmera para um valor específico.
  - **Scale**: A escala de zoom desejada (por exemplo, `2.5` para 250%).
  - **Duration**: O número de frames que a transição de zoom levará. `60` frames equivalem a 1 segundo.

- **Reset Camera Zoom**: Retorna o zoom da câmera para o valor padrão do mapa.
  - **Duration**: O número de frames para a transição de volta ao zoom padrão.

**Exemplos práticos:**
- **`Set Camera Zoom`**: Em uma cutscene, para focar lentamente no rosto de um personagem, use este comando com `Scale` para `2.5` e `Duration` para `120` para um zoom suave de 2 segundos.
- **`Reset Camera Zoom`**: Após a cutscene, use este comando para retornar o zoom ao normal, com uma `Duration` de `60` para uma transição suave.

## 4. Guia de Recursos por Notetags (Database)

As notetags permitem definir o comportamento do zoom para mapas específicos.

### 4.1. Mapas

- **`<Map Zoom: x>`**: Define o nível de zoom padrão para o mapa. Substitua `x` pelo valor de zoom desejado (por exemplo, `<Map Zoom: 0.8>` para 80% de zoom).
- **`<Disable Map Zoom>`**: Desativa a funcionalidade de zoom para o mapa, impedindo que o jogador altere o zoom.

**Como e quando implementar:**
- Em um mapa de uma cidade grande, use a notetag `<Map Zoom: 0.8>` para que a câmera comece mais afastada, dando uma visão geral melhor.
- Em um mapa de interior, use `<Map Zoom: 1.2>` para uma visão mais próxima e detalhada.
- Use `<Disable Map Zoom>` em um mapa de puzzle para impedir que o jogador altere o zoom e mantenha o foco na resolução do puzzle.

## 5. Guia de Recursos via JavaScript (Avançado)

Para um controle mais granular, o zoom da câmera pode ser manipulado via chamadas de script.

### 5.1. Acessar e Modificar o Zoom

- **Definir o zoom:**
  ```javascript
  $gameMap.setZoom(2.0, 60); // Define o zoom para 2x com duração de 60 frames.
  ```

- **Obter o nível de zoom atual:**
  ```javascript
  // Em um Conditional Branch, verifique o nível de zoom atual:
  $gameMap.zoomScale() > 1.5
  ```

- **Resetar o zoom:**
  ```javascript
  $gameMap.resetZoom(60); // Reseta o zoom com duração de 60 frames.
  ```
