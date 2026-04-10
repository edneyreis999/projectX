# Battleback - Notetags

## Visão Geral
Estas notetags permitem controlar os battlebacks que aparecem em diferentes regiões do mapa para random ou touch encounters.

## Lista de Notetags

### <Region x Battleback1: filename>
### <Region x Battleback2: filename>
- **Used for**: Map Notetags
- **Descrição**: Se o player iniciar uma batalha enquanto estiver standing na region 'x', o 'filename' battleback será usado
- **Parâmetros**:
  - `x`: número representando o region ID a ser usado
  - `filename`: nome do arquivo gráfico a ser usado (sem extensão)
    - Exemplo: para arquivo 'Castle1.png', use apenas 'Castle1' (sem '.png')
- **Notas**:
  - Isto irá override qualquer configuração de battleback especificada

## Ver Também

- [Parâmetros: Battleback Scaling Settings](../parametros/battleback-scaling.md) - Configurações de escala de battlebacks
- [Conceitos: Visão Geral](../conceitos/visao-geral.md) - Visão geral do Battle Core
