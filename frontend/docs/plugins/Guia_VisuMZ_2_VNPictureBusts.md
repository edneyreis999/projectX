# Guia do Plugin: VisuMZ_2_VNPictureBusts

**Objetivo:** Criar um guia completo para desenvolvedores sobre como usar o `VisuMZ_2_VNPictureBusts` para exibir "busts" (imagens de personagem) durante os diálogos, no estilo de Visual Novels.

## 1. Introdução ao VN Picture Busts

### 1.1. O que é o VN Picture Busts?

O plugin facilita a exibição de retratos de personagens em tela durante as caixas de mensagem, com transições, expressões e animações, de forma similar a uma Visual Novel.

### 1.2. Pré-requisitos:

É necessário ter o `VisuMZ_0_CoreEngine` instalado. O `VisuMZ_1_MessageCore` também é recomendado para uma melhor integração com as caixas de mensagem.

## 2. Configurações do Plugin (Plugin Parameters)

### 2.1. Default Settings:

- **Default Folder**: A pasta padrão onde as imagens dos busts estão localizadas (dentro de `img/pictures/`).
- **Default Position**: A posição padrão na tela onde os busts aparecerão (ex: `Left`, `Right`, `Center`).
- **Fade Speed**: A velocidade padrão da animação de fade-in/fade-out.
- **Default Opacity**: A opacidade padrão dos busts.

**Como usar:**
Ajuste a `Default Position` para `Right` se você prefere que os personagens apareçam no lado direito da tela por padrão.

### 2.2. Actor Bust Settings:

Esta seção foi removida em versões mais recentes do plugin. A associação de busts a atores agora é feita dinamicamente através dos comandos de plugin.

## 3. Guia de Códigos de Texto (Text Codes)

Os códigos de texto para controlar os busts são parte do plugin `VisuMZ_1_MessageCore`. Consulte a documentação deste plugin para uma lista completa de códigos.

**Exemplo de uso (assumindo que os códigos existem no MessageCore):**
- `\bustShow[1, Feliz, Left]`: Mostra o bust do Ator 1 com a expressão 'Feliz' no lado esquerdo.
- `\bustExpression[1, Triste]`: Muda a expressão do bust do Ator 1 para 'Triste'.

## 4. Guia de Comandos de Plugin (Plugin Commands)

### 4.1. Usar os Comandos de Bust:

- **BASIC: Enter Bust**: Mostra um bust na tela com uma animação de entrada.
- **BASIC: Exit Bust(s)**: Remove um ou mais busts da tela com uma animação de saída.
- **BASIC: Graphic Change**: Muda a imagem de um bust (útil para expressões).
- **MOVE: Move Bust(s) to Position**: Move um bust para uma posição pré-definida na tela.

**Fornecer exemplos práticos:**
- **`BASIC: Enter Bust`**: Use este comando para mostrar o bust de um personagem que não está falando, apenas reagindo à cena.
- **`MOVE: Move Bust(s) to Position`**: Crie um efeito de um personagem se aproximando da tela usando o comando `MOVE: Move Bust(s) to Coordinates` para alterar as coordenadas X e Y e a escala da imagem.

## 5. Guia de Recursos via JavaScript (Avançado)

### 5.1. Acessar e Modificar Busts:

O plugin oferece uma vasta gama de comandos de plugin que cobrem a maioria das necessidades. Para casos mais complexos, você pode usar o comando `Move Picture` do RPG Maker MZ para manipular os busts, já que eles são, na verdade, imagens.

**Exemplo prático:**
- Para mostrar um bust com configurações personalizadas, é recomendado usar o comando de plugin `BASIC: Enter Bust` e preencher os parâmetros desejados. O uso de scripts diretos para essa finalidade não é documentado e pode ser instável.
