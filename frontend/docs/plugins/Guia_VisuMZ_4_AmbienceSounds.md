# Guia do Plugin: VisuMZ_4_AmbienceSounds

**Objetivo:** Criar um guia completo para desenvolvedores sobre como usar o `VisuMZ_4_AmbienceSounds` para criar sons de ambiente imersivos que emanam de eventos específicos no mapa.

## 1. Introdução ao Ambience Sounds

### 1.1. O que é o Ambience Sounds?

O plugin `VisuMZ_4_AmbienceSounds` permite que eventos no mapa toquem efeitos sonoros (SE) em intervalos de tempo, criando uma atmosfera sonora dinâmica. O volume e o pan (balanço de áudio esquerdo/direito) desses sons mudam de acordo com a distância do jogador em relação ao evento, proporcionando uma experiência de áudio imersiva.

É ideal para criar sons localizados, como o crepitar de uma fogueira, o som de uma cachoeira, ou o murmúrio de uma multidão, que ficam mais altos à medida que o jogador se aproxima.

### 1.2. Pré-requisitos

Para que este plugin funcione, é recomendado ter o `VisuMZ_0_CoreEngine` instalado para garantir a melhor compatibilidade com a biblioteca VisuStella.

## 2. Configurações do Plugin (Plugin Parameters)

As configurações do plugin definem os valores padrão para todos os sons de ambiente. Esses valores podem ser sobrescritos individualmente em cada evento usando notetags.

### 2.1. Defaults

- **Interval:** O tempo padrão (em frames) entre a reprodução de cada som. 60 frames = 1 segundo.
- **Proximity:** A distância máxima padrão (em tiles) que o jogador pode estar de um evento para ouvir o som.
- **Volume, Pitch, Pan:** As configurações de áudio padrão para os sons de ambiente.

### 2.2. Variance

- **Interval, Volume, Pitch Variance:** Define a porcentagem de variação para cada propriedade. Por exemplo, uma variação de 20% (0.20) no volume fará com que cada som toque com um volume ligeiramente diferente, tornando o ambiente menos repetitivo.

## 3. Guia de Comandos de Plugin (Plugin Commands)

Este plugin não utiliza comandos de plugin. Toda a configuração é feita através de notetags nos eventos.

## 4. Guia de Recursos por Notetags (Database)

As notetags são a principal forma de configurar os sons de ambiente. Elas podem ser colocadas na caixa de notas de um evento (para valer em todas as páginas) ou em um comentário em uma página específica do evento.

### 4.1. Notetags de Evento

- **`<Ambience SFX: name, volume, pitch, pan>`**
  Adiciona um efeito sonoro ao evento. Você pode adicionar várias notetags para que o evento escolha um som aleatório de sua lista a cada intervalo.
  - `name`: Nome do arquivo de áudio na pasta `/audio/se/`.
  - `volume`, `pitch`, `pan`: (Opcionais) Valores específicos para este som.

- **`<Ambience Interval: x>`**
  Define o intervalo (em frames) entre os sons para este evento.

- **`<Ambience Distance: x>` ou `<Ambience Proximity: x>`**
  Define a distância máxima (em tiles) para ouvir o som deste evento.

- **`<Ambience Volume Variance: x%>`**
- **`<Ambience Pitch Variance: x%>`**
- **`<Ambience Interval Variance: x%>`**
  Definem a porcentagem de variação para as propriedades de áudio e intervalo deste evento específico.

**Como e quando implementar:**

Para um evento de fogueira, você pode usar as seguintes notetags:
```
<Ambience SFX: Fire1, 80>
<Ambience SFX: Fire2, 80>
<Ambience Interval: 30>
<Ambience Distance: 5>
<Ambience Volume Variance: 10%>
```
Isso fará com que a fogueira toque os sons `Fire1` ou `Fire2` a cada 30 frames, audíveis a até 5 tiles de distância, com uma pequena variação de volume.

## 5. Guia de Recursos via JavaScript (Avançado)

Este plugin não foi projetado para ser controlado diretamente via JavaScript. A interação é feita primariamente através das notetags nos eventos para manter a simplicidade e o foco no design de mapas.
