# HP Gauge - Notetags

## Visão Geral
Estas notetags permitem configurar se HP Gauges podem ser exibidos por enemies, independentemente das configurações de Plugin Parameters, além de permitir ajustar o posicionamento das UI elements acima dos battlers.

## Lista de Notetags

### <Show HP Gauge>
- **Used for**: Enemy Notetags
- **Descrição**: Sempre exibe o HP Gauge para o enemy, independentemente da configuração de defeat requirement
- **Notas**:
  - Não bypass as preferências do Options do jogador
  - Não bypass se enemy HP Gauges estiverem desabilitados como um todo

### <Hide HP Gauge>
- **Used for**: Enemy Notetags
- **Descrição**: Sempre esconde o HP Gauge para o enemy, independentemente da configuração de defeat requirement
- **Notas**:
  - Não bypass as preferências do Options do jogador

### <Battle UI Offset: +x, +y>
### <Battle UI Offset: -x, -y>
- **Used for**: Actor e Enemy Notetags
- **Descrição**: Ajusta o offset de HP Gauges e State Icons acima das cabeças de actors e enemies
- **Parâmetros**:
  - `x`: valor numérico que offset a coordenada x (negativo = esquerda, positivo = direita)
  - `y`: valor numérico que offset a coordenada y (negativo = cima, positivo = baixo)

### <Battle UI Offset X: +x>
### <Battle UI Offset X: -x>
- **Used for**: Actor e Enemy Notetags
- **Descrição**: Ajusta apenas o offset horizontal (eixo X) de HP Gauges e State Icons
- **Parâmetros**:
  - `x`: valor numérico (negativo = esquerda, positivo = direita)

### <Battle UI Offset Y: +y>
### <Battle UI Offset Y: -y>
- **Used for**: Actor e Enemy Notetags
- **Descrição**: Ajusta apenas o offset vertical (eixo Y) de HP Gauges e State Icons
- **Parâmetros**:
  - `y`: valor numérico (negativo = cima, positivo = baixo)

## Ver Também

- [Parâmetros: HP Gauge Settings](../parametros/hp-gauge.md) - Configurações globais de HP Gauges
- [Conceitos: Visão Geral](../conceitos/visao-geral.md) - Visão geral do Battle Core
