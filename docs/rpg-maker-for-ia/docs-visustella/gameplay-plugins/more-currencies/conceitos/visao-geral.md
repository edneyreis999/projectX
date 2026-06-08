# Visão Geral — More Currencies

## O que é

Plugin VisuStella MZ (Tier 2) que expande a cena de shop do RPG Maker MZ, permitindo criar itens que podem ser comprados/vendidos usando **items, weapons, armors, variáveis ou gold** — isoladamente ou em qualquer combinação. Com isso, gold deixa de ser a única moeda do jogo.

## Funcionalidades Principais

- **Compra multi-moeda**: Itens podem ser comprados usando items, weapons, armors, variables, gold ou qualquer combinação desses
- **Venda multi-moeda**: Venda também pode gerar retorno em diferentes tipos de recursos
- **Janela de transação aprimorada**: A janela `Window_ShopNumber` foi reformulada para mostrar detalhes completos da transação (quantidade possuída, quantidade gasta, resultado líquido)
- **Janela de listagem de venda**: Mostra a quantidade que o jogador recebe por unidade vendida
- **Sistema de Proxy**: Permite que shops vendam o "mesmo item" usando diferentes combinações de moedas (ver [[proxy-system]])

## Requisitos

- **RPG Maker MZ** (não funciona em outras versões)
- **Core Engine VisuStella MZ** (deve estar acima deste plugin no Plugin Manager)
- **Items and Equips Core VisuStella MZ** (deve estar acima deste plugin no Plugin Manager)
- **Tier 2**: Colocar abaixo de plugins de tier inferior (0, 1) no Plugin Manager

## Mudanças Principais no Engine

### Window_ShopNumber

O conteúdo visual desta janela foi completamente reformulado para exibir:
- Quanto o jogador possui de cada recurso
- Quanto será envolvido na transação
- O resultado líquido após a transação

Os elementos visuais foram reorganizados para acomodar as novas informações.

### Proxy Items

Itens proxy são substitutos temporários para outros itens. Quando adquiridos via shopping, transformam-se no item original. Ver detalhes em [[proxy-system]].

## Fluxo de Uso Típico

1. Configure as notetags de custo nos itens/weapons/armors do database
2. Itens com notetags de custo aparecerão nas shops com os custos personalizados
3. O jogador visualiza os custos e recursos na janela de transação reformulada
4. Transações usam as moedas configuradas ao invés de apenas gold

## Relacionamentos

- Integra-se com [[../configuracao/parametros-gerais.md|Plugin Parameters]] para taxas de venda automáticas
- Usa [[../notetags/cost-notetags.md|Cost Notetags]] para definir custos personalizados
- Suporta [[../notetags/proxy-notetags.md|Proxy Notetags]] para shops com múltiplas moedas para o mesmo item
