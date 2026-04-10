# Introdução ao VisuStella Battle A.I.

## Visão Geral

O plugin **VisuStella Battle A.I.** transforma o sistema primitivo de IA do RPG Maker MZ em uma experiência mais inteligente e sofisticada. Ele implementa novos componentes-chave no processo de tomada de decisão de inimigos e atores com Auto Battle:

- **A.I. Styles**: Diferentes estilos para configurar o comportamento da IA
- **A.I. Levels**: Níveis de inteligência (0-100)
- **Rating Variance**: Controle de variância nas avaliações de ações
- **A.I. Conditions**: Condições específicas para uso de skills
- **Influencing TGR Weight**: Influência de peso na seleção de alvos

## Recursos Principais

### Funcionalidades Principais

- **Diferentes A.I. Styles**: Permite configurar de várias formas o comportamento de inimigos
- **A.I. Levels**: Define níveis de IA globalmente ou individualmente
- **Rating Variance**: Prioriza ações ou as randomiza conforme necessário
- **Notetags**: Modificação individual por unidade
- **A.I. Conditions**: Cria condições específicas para uso de skills
- **Sistema ALL/ANY**: Condições que exigem todas ou apenas uma das condições
- **Variedade de Condições**: Grande seleção de notetags de condição
- **Default Conditions**: Configurações padrão via Plugin Parameters
- **TGR Weight Influence**: Torna certos alvos mais desejáveis para ações específicas

### Aplicações

- **Inimigos**: IA mais inteligente e desafiadora
- **Auto Battle Actors**: Atores podem usar padrões de IA de inimigos
- **Skills Personalizados**: Condições complexas para quando usar habilidades
- **Seleção de Alvos**: Escolha inteligente baseada em fraquezas e resistências

## Requisitos

### Requisitos de Sistema

- **Engine**: RPG Maker MZ (não funciona em outras versões)
- **Plugin Obrigatório**: VisuMZ_1_BattleCore
- **Tier**: 3 (deve ser colocado abaixo de plugins Tier 0, 1, 2)

### Compatibilidade

Este plugin requer o plugin listado acima instalado no Plugin Manager do seu jogo para funcionar. Não é possível iniciar o jogo com este plugin habilitado sem os plugins obrigatórios.

## Principais Mudanças no Sistema

### Auto Battle A.I. para Actors

Com este plugin, existe a opção de permitir que certas classes referenciem padrões de IA de inimigos específicos para decidir quais skills usar durante a batalha. Se a opção de referência não for usada, o ator usará as avaliações padrão de Auto Battle.

### A.I. Styles

Existem atualmente quatro estilos diferentes de A.I.:

1. **Classic**: Estilo tradicional do RPG Maker MZ
2. **Gambit**: Estilo baseado em prioridade top-down
3. **Casual**: Abordagem mais leve focada apenas em condições
4. **Random**: Seleção completamente aleatória

Atores e inimigos podem usar diferentes estilos globalmente ou individualmente através de notetags.

### A.I. Levels

Inimigos e atores podem receber diferentes níveis de A.I.:

- **Nível 100**: A IA nunca desobedece uma condição
- **Níveis menores**: Podem ignorar certas condições e agir como se fossem cumpridas
- **Maior Nível**: Mais estrita sobre condições
- **Menor Nível**: Mais flexível sobre condições

### A.I. Rating Variance

No editor de banco de dados do RPG Maker, ao decidir os padrões de ação de um inimigo, você pode decidir o "rating" da ação (1 a 9, onde 9 é a prioridade mais alta). O RPG Maker, por padrão, às vezes reduz o rating alguns níveis para permitir ratings menores e contornar o sistema de prioridade.

Este plugin permite definir o nível de variância através de Plugin Parameters globalmente ou notetags individualmente.

### A.I. Conditions para Uso de Skills

Inimigos e qualquer ator que use Auto Battle A.I. com referência só podem usar certas skills enquanto condições específicas forem cumpridas:

- **Condições 'ALL'**: Exigem que todas as condições do conjunto sejam cumpridas
- **Condições 'ANY'**: Exigem que pelo menos uma condição do conjunto seja cumprida

Variedade de condições podem ser inseridas em cada conjunto de condições para situações muito específicas. Isso também ajuda a filtrar quais alvos escolher.

### TGR Weight na Seleção de Alvos da IA

TGR é um parâmetro especial no RPG Maker MZ que representa "Target Rate". Quanto maior o TGR de alguém, mais provável que se torne alvo de um ataque.

Este plugin permite que várias coisas influenciem o peso TGR:

- **Elemental Influence**: Baseado em taxa de dano elemental recebido
- **Evasion Rates**: Taxas de esquiva física e mágica reduzem o peso TGR

Por padrão, o sistema de peso TGR exige que a tropa inimiga tenha "conhecimento" sobre as propriedades elementais, de esquiva e esquiva mágica do grupo.

## Estrutura da Documentação

- **[A.I. Styles](ai-styles.md)** - Detalhamento dos 4 estilos disponíveis
- **[Notetags](../notetags/configuracao-geral.md)** - Implementação prática
- **[Parâmetros](../parametros/configuracao-geral.md)** - Configuração global
- **[Troubleshooting](../referencia/troubleshooting.md)** - Problemas comuns

## Próximos Passos

1. Entenda os **[A.I. Styles](ai-styles.md)** disponíveis
2. Configure os **[Parâmetros Globais](../parametros/configuracao-geral.md)**
3. Implemente **[Notetags](../notetags/configuracao-geral.md)** individualmente
4. Configure **[Condições de Skills](../notetags/condicoes-skills.md)** avançadas
