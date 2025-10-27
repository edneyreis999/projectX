# Guia do Plugin VisuMZ_1_MessageCore

**Objetivo:** Criar um guia completo para desenvolvedores sobre como usar o `VisuMZ_1_MessageCore` para aprimorar o sistema de mensagens, janelas e diálogos do jogo.

## 1. Introdução ao Message Core

### 1.1. O que é o Message Core?

O plugin expande drasticamente as capacidades do sistema de mensagens do RPG Maker, adicionando novos códigos de texto, customização de janelas e muito mais.

### 1.2. Pré-requisitos:

É necessário ter o `VisuMZ_0_CoreEngine` instalado e ativo.

## 2. Configurações do Plugin (Plugin Parameters)

### 2.1. General Settings:

- **O que faz:** Permite configurar as configurações globais, como velocidade padrão do texto, tamanho da fonte e linhas por janela.
- **Como usar:** Ajuste o `Default Rows` para 3 se você prefere janelas de mensagem menores e mais compactas.

### 2.2. Name Box Settings:

- **O que faz:** Detalha como customizar a "caixa de nome" que aparece acima da janela de mensagem.
- **Como usar:** Altere as cores padrão da caixa de nome para combinar com a paleta de cores da sua interface. Use o parâmetro `Name Box Padding` para dar mais espaço ao redor do texto do nome.

### 2.3. Message Window Settings:

- **O que faz:** Explica como mudar a aparência da janela de mensagem, incluindo posição, opacidade e o uso de "windowskins" customizadas.
- **Como usar:** Configure a `Default Position` para 'Top' para que as mensagens apareçam na parte superior da tela, ideal para notificações.

## 3. Guia de Códigos de Texto (Text Codes)

### 3.1. Códigos de Controle de Janela:

- `\px<x>`: Define a posição X do texto.
- `\py<y>`: Define a posição Y do texto.
- `\rows<x>`: Define o número de linhas da janela de mensagem.
- `\name<text>`: Mostra o nome do personagem na caixa de nome.
- **Como usar:** Use `\name<Harold>` no início de uma mensagem para mostrar o nome 'Harold' na caixa de nome. Use `\rows<1>` para criar uma janela de notificação de uma única linha.

### 3.2. Códigos de Aparência do Texto:

- `\fontSize<x>`: Altera o tamanho da fonte.
- `\fontFace<name>`: Altera a fonte.
- `\outlineColor<color>`: Altera a cor do contorno do texto.
- **Como usar:** Use `\fontSize<40>GRITO!!!\fontSize<default>` para fazer uma palavra parecer um grito. Use `\c[10]Texto Amarelo\c[0]` para mudar a cor de uma parte do texto.

### 3.3. Códigos de Ícones e Imagens:

- `\i[x]`: Mostra o ícone de número `x`.
- `\face<name, index>`: Mostra o rosto do personagem.
- `\pic<name>`: Mostra uma imagem da pasta `img/pictures/`.
- **Como usar:** Use `Você recebeu 100 \i[314]!` para mostrar o ícone de ouro ao lado da quantidade.

### 3.4. Códigos de Controle de Fluxo:

- `\wait<frames>`: Pausa a mensagem por um número de frames.
- `\.` : Pausa curta.
- `\|`: Pausa longa.
- `\^`: Não espera por input do jogador.
- **Como usar:** Use `Olá\. tudo bem?` para criar uma pequena pausa após 'Olá'.

## 4. Guia de Comandos de Plugin (Plugin Commands)

### 4.1. Usar os Comandos de Mensagem:

- `Set Message Speed`: Crie um item 'Livro Antigo' que, ao ser lido, usa este comando para diminuir a velocidade do texto, simulando uma leitura cuidadosa.
- `Set NameBox Position`: Altera a posição da caixa de nome.

## 5. Guia de Recursos por Notetags (Database)

### 5.1. Atores:

- `<Name: text>`: Use `<Name: Sir Harold>` na notetag do ator Harold. Agora, sempre que você usar `\n<1>` no texto, ele será substituído por 'Sir Harold' em vez de apenas 'Harold'.

## 6. Guia de Recursos via JavaScript (Avançado)

### 6.1. Usar JavaScript nos Códigos de Texto:

- `\js<script>`: Crie uma mensagem que mostra a quantidade de ouro do jogador dinamicamente: `Você tem \js<$gameParty.gold()> moedas de ouro.`

### 6.2. Usar Script Calls em Eventos:

- Adicionar uma escolha a uma lista de opções dinamicamente:
  ```javascript
  $gameMessage.addChoice('Opção A', 'handlerA');
  if ($gameSwitches.value(20)) {
    $gameMessage.addChoice('Opção Secreta', 'handlerSecret');
  }
  ```
