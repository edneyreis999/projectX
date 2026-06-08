# Plugin Parameters - Options Menu

Configuracoes do menu de opcoes do jogador relacionadas a camera em batalha.

## Settings

| Parametro | Descricao |
|-----------|-----------|
| Add Option? | Adiciona a opcao "Battle Camera" ao menu de opcoes do jogo |
| Adjust Window Height | Ajusta automaticamente a altura da janela de opcoes |
| Options Name | Nome do comando exibido no menu (ex: "Battle Camera") |

## Comportamento

Quando o jogador desliga a Battle Camera:
- Todos os efeitos deste plugin sao desabilitados
- A camera permanece estatica na posicao padrao
- Efeitos so retornam quando o jogador liga novamente

## Use Case

Essa opcao existe para acessibilidade - jogadores com motion sickness podem desativar movimentos de camera sem perder funcionalidade de jogo.

Veja tambem:
- [conceitos/opcoes-jogador.md](../conceitos/opcoes-jogador.md) - Contexto sobre motion sickness
