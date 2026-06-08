# Quick Commands

## Funcionalidade

Menu de comandos JavaScript customizáveis para testes rápidos. Os comandos variam conforme a scene atual.

## Disponibilidade
- Varia conforme a scene em que o jogador está

## Comandos Customizáveis

Os comandos são configurados via **Plugin Parameters**. Cada comando possui:

| Campo | Descrição |
|-------|-----------|
| **Name** | Nome do comando exibido no menu |
| **Icon** | Índice do ícone (icon index) |
| **Help** | Texto de ajuda exibido ao selecionar |
| **Close Debugger on Select** | Se fecha o debugger ao executar a ação |
| **JS: Visibility** | Código JS para determinar se o comando é visível (condicional por scene, estado, etc.) |
| **JS: Action** | Código JS executado quando o comando é selecionado |

## Configuração

Adicionar, remover ou alterar comandos em:
`Plugin Parameters > Quick Commands`

## Exemplos de Uso

- Dar/remove gold rapidamente
- Alterar nível de personagens
- Forçar condições climáticas
- Resetar switches em massa
- Qualquer operação JS executável no contexto do jogo

## Detalhes Técnicos

- Visibility e Action são avaliados como código JavaScript no contexto do `$game*` global
- Use para automatizar testes repetitivos durante desenvolvimento
