# Guia do Plugin: VisuMZ_4_AttachedPictures

**Objetivo:** Criar um guia completo para desenvolvedores sobre como usar o `VisuMZ_4_AttachedPictures` para anexar imagens a personagens, eventos no mapa ou a coordenadas fixas da tela.

## 1. Introdução ao Attached Pictures

### 1.1. O que é o Attached Pictures?

O plugin `VisuMZ_4_AttachedPictures` permite que imagens (pictures) "sigam" um alvo, como o jogador, um evento, ou permaneçam fixas na tela, independentemente do movimento da câmera. Isso é útil para criar elementos de interface, como balões de status sobre personagens, ícones de missão, ou até mesmo barras de vida de chefes que ficam fixas na tela.

### 1.2. Pré-requisitos

É necessário ter o plugin `VisuMZ_0_CoreEngine` instalado e ativado no seu projeto, posicionado acima do `VisuMZ_4_AttachedPictures` na lista de plugins.

## 2. Configurações do Plugin (Plugin Parameters)

Este plugin tem configurações mínimas, focando-se principalmente nos comandos de plugin para sua funcionalidade.

### 2.1. Default Settings

Não há configurações significativas que precisem ser alteradas para o uso básico do plugin. A maior parte da configuração é feita via comandos de evento.

## 3. Guia de Comandos de Plugin (Plugin Commands)

A funcionalidade principal do plugin é operada através de comandos de plugin que você pode usar nos seus eventos.

### 3.1. Comandos de Anexação

#### `Attach Picture to Character`

Este comando anexa uma imagem a um personagem (jogador ou evento) no mapa. A imagem seguirá o personagem.

- **Exemplo Prático:** Para mostrar um balão de exclamação sobre um NPC que tem uma missão, primeiro use o comando de evento `Show Picture` para criar a imagem. Em seguida, use `Attach Picture to Character` para anexar a imagem ao evento do NPC.

#### `Attach Picture to Screen`

Este comando anexa uma imagem a uma posição fixa na tela. A imagem não se moverá com a câmera.

- **Exemplo Prático:** Para criar uma barra de vida para um chefe que fica fixa no topo da tela, use `Show Picture` para a imagem da barra e, em seguida, `Attach Picture to Screen` para fixá-la nas coordenadas X e Y desejadas.

#### `Clear Picture Attach`

Este comando remove a anexação de uma imagem, fazendo com que ela desapareça ou volte ao seu comportamento padrão.

- **Exemplo Prático:** Quando a missão do NPC for concluída, use este comando para desanexar e apagar o balão de exclamação que estava sobre ele.

## 4. Guia de Recursos por Notetags (Database & Events)

Você pode usar notetags nos comentários dos eventos para anexar imagens automaticamente quando o mapa é carregado.

### 4.1. Notetags de Evento

- `<Attach Picture On Load: PictureId, Filename>`
- `<Attach Picture On Load: PictureId, Filename, X, Y>`

- **Como e quando implementar:** Em um evento de baú, você pode usar a notetag `<Attach Picture On Load: 10, sparkle>` no comentário do evento. Isso fará com que uma imagem de brilho (do arquivo `sparkle.png` na sua pasta de imagens) apareça automaticamente sobre o baú quando o mapa carregar, usando a Picture ID 10.

## 5. Guia de Recursos via JavaScript (Avançado)

Para usuários avançados, é possível manipular as imagens anexadas via chamadas de script (JavaScript).

### 5.1. Acessar e Modificar Anexos

#### Anexar a um Evento

```javascript
const character = this.character(10); // Pega o evento com ID 10
$gameScreen.picture(5).attachTo(character, 0, -48); // Anexa a imagem 5 sobre a cabeça do evento.
```

#### Anexar à Tela

```javascript
$gameScreen.picture(6).attachToScreen(100, 50); // Anexa a imagem 6 na posição (100, 50) da tela.
```

#### Limpar Anexação

```javascript
$gameScreen.picture(5).clearAttach(); // Remove a anexação da imagem 5.
```
