# Guia do Plugin: VisuMZ_4_MapDamageEffect

**Objetivo:** Criar um guia completo para desenvolvedores sobre como usar o `VisuMZ_4_MapDamageEffect` para customizar os efeitos visuais de dano e cura diretamente no mapa, fora do combate.

## 1. Introdução ao Map Damage Effect

### 1.1. O que é o Map Damage Effect?

O plugin `VisuMZ_4_MapDamageEffect` permite substituir o efeito de flash vermelho padrão que ocorre ao receber dano no mapa (como em pântanos ou por status de veneno) por efeitos mais elegantes e customizáveis. Com ele, é possível definir cores, gradientes ou até mesmo imagens para os efeitos de dano, variando de acordo com a região do mapa ou o status que está causando o dano.

### 1.2. Pré-requisitos:

É necessário ter o plugin `VisuMZ_0_CoreEngine` instalado e ativado para o correto funcionamento deste plugin.

## 2. Configurações do Plugin (Plugin Parameters)

As configurações do plugin permitem definir os efeitos visuais padrão para dois tipos de dano no mapa:

- **Floor Damage:** Dano recebido ao pisar em determinados tiles do mapa.
- **Slip Damage:** Dano recebido por status (como veneno) enquanto o jogador se move pelo mapa.

Para cada um desses tipos, você pode customizar:

- **Damage Appearance:**
  - `Hex Color`: A cor do efeito em formato hexadecimal (ex: `#ed1c24` para vermelho).
  - `Gradient Length`: O tamanho do gradiente do efeito.
  - `Image Filename`: Uma imagem customizada da pasta `img/pictures/` para ser usada como efeito. Se uma imagem for definida, a cor e o gradiente serão ignorados.
- **Damage Animation:**
  - `Opacity`: A opacidade inicial do efeito (de 1 a 255).
  - `Total Duration`: A duração do efeito em frames.
  - `Blend Mode`: O modo de mesclagem do efeito (Normal, Additive, Multiply, Screen).
  - `Once Parallel`: Um Evento Comum para ser executado em paralelo uma única vez quando o efeito é ativado (requer `VisuMZ_0_CoreEngine`).

**Como usar:** Para diferenciar o dano de veneno (Slip Damage) do dano de chão (Floor Damage), você pode configurar o `Hex Color` de `Slip Damage` para um tom de roxo (ex: `#8560a8`) e o de `Floor Damage` para um tom de vermelho.

## 3. Guia de Comandos de Plugin (Plugin Commands)

O plugin oferece um comando para acionar um efeito visual de dano no mapa artificialmente, sem que haja dano real.

### 3.1. Usar o Comando de Dano no Mapa:

O comando `Visual: Map Damage Effect` pode ser usado em eventos para mostrar um efeito visual customizado.

- **Parâmetros:**
  - **Damage Appearance:**
    - `Hex Color`: Cor do efeito.
    - `Gradient Length`: Tamanho do gradiente.
    - `Image Filename`: Imagem para o efeito.
  - **Damage Animation:**
    - `Opacity`: Opacidade inicial.
    - `Total Duration`: Duração em frames.
    - `Blend Mode`: Modo de mesclagem.
    - `Once Parallel`: Evento comum a ser executado.

**Exemplo prático (Armadilha Visual):** Crie um evento de armadilha no chão. Quando o jogador pisar nele, use este comando com uma cor vermelha e um som para simular o disparo de uma armadilha, sem causar dano real ao jogador.

## 4. Guia de Recursos por Notetags (Database)

As notetags permitem customizar os efeitos de dano para regiões específicas do mapa ou para status específicos.

### 4.1. Mapas:

- **`<Map Damage Effect Region x Color: #rrggbb>`:** Define uma cor de efeito específica para a região `x`.
- **`<Map Damage Effect Region x Image: filename>`:** Define uma imagem de efeito para a região `x`.
- **`<Floor Damage Formula Region x>`:** Permite definir uma fórmula de dano customizada em JavaScript para a região `x`.

**Como e quando implementar:** Em um mapa com tiles de lava, marque-os com uma região (ex: região 1). Nas propriedades do mapa, adicione a notetag `<Map Damage Effect Region 1 Color: #ff8c00>` para que, ao pisar na lava, o efeito seja laranja em vez do vermelho padrão.

### 4.2. Status:

- **`<Map Damage Effect Color: #rrggbb>`:** Define uma cor de efeito para o dano causado por este status no mapa.
- **`<Map Damage Effect Image: filename>`:** Define uma imagem de efeito para o dano causado por este status.

**Como e quando implementar:** No status "Veneno", adicione a notetag `<Map Damage Effect Color: #9400d3>` para que o efeito de dano de veneno no mapa seja roxo.

## 5. Guia de Recursos via JavaScript (Avançado)

É possível usar JavaScript para criar fórmulas de dano de chão mais complexas.

### 5.1. Fórmulas de Dano Customizadas:

Com a notetag de mapa `<Floor Damage Formula Region x>`, você pode escrever um código JavaScript para calcular o dano que o jogador receberá ao pisar em um tile da região `x`.

- **Exemplo prático (Dano baseado na vida máxima):**
  ```
  <Floor Damage Formula Region 1>
   damage = a.mhp * 0.1; // Causa 10% da vida máxima como dano
  </Floor Damage Formula Region 1>
  ```
  Neste exemplo, ao pisar em um tile da região 1, o jogador receberá um dano equivalente a 10% de sua vida máxima. A variável `a` representa o ator recebendo o dano.
