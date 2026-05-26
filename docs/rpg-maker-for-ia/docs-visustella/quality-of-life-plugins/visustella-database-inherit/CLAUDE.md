# VisuStella Database Inherit - Guia para LLMs

## Sistema
- **Nome**: VisuStella Database Inherit
- **Proposito**: Permitir heranca de propriedades entre objetos do banco de dados RPG Maker MZ via notetags
- **Tier**: 4 (colocar abaixo de plugins de tier 0-3)

## Principais Areas

1. **Conceitos**: Mecanismo de heranca em 7 etapas e regra de ordem de IDs
2. **Notetags**: 64 notetags em 8 categorias para controlar heranca granular
3. **Configuracao**: Parametros do plugin para customizar comportamento

## Arquivos Importantes

- `conceitos/visao-geral.md` - Fluxo completo de heranca
- `conceitos/ordem-heranca.md` - Regra critica sobre IDs (LER PRIMEIRO)
- `notetags/referencia-rapida.md` - Tabela resumo de todas as notetags
- `configuration/parametros-plugin.md` - Configuracao global

## Ordem de Navegacao

1. `conceitos/visao-geral.md`
2. `conceitos/ordem-heranca.md`
3. `notetags/referencia-rapida.md`
4. Notetags especificas por tipo de heranca
5. `configuration/parametros-plugin.md`

## Conceitos-Chave

- **Parent**: Objeto de origem das propriedades
- **Child**: Objeto que recebe as propriedades (contem a notetag)
- **Extend**: Adicionar ao existente (soma de valores)
- **Overwrite**: Substituir o existente
- **Regra de Ouro**: Herde sempre de IDs menores que o child
