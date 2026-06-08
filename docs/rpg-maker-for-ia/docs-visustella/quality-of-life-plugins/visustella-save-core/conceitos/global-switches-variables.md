# Global Switches e Global Variables

## Conceito

Global Switches e Global Variables são switches/variáveis que existem no **mesmo estado em todos os save files**. Se a Switch 40 for declarada como Global e estiver ON, ela estará ON em qualquer save ou new game.

## Como Declarar

Insira `<Global>` no **nome** da Switch ou Variable no Database do RPG Maker MZ.

Exemplo:
```
Nome da Switch: <Global> BossDerrotado
Nome da Variable: <Global> TotalInimigosMortos
```

## Restrição de Tags

As tags são **mutuamente exclusivas**. Não é possível combinar `<Global>` com `<JS>` ou `<Self>` no mesmo switch/variable.

| Tag | Escopo |
|---|---|
| `<Global>` | Todos os saves e new games |
| `<JS>` | Definido por código JavaScript |
| `<Self>` | Escopo local/contextual |

## Casos de Uso Comuns

- Conquistas desbloqueadas (persistem entre saves)
- Progresso global do jogo (ex: CG gallery, bestiário)
- Configurações de dificuldade escolhidas no primeiro playthrough
- Flags de new game+

## Relacionado

- [Visão Geral](visao-geral.md)
- [Comandos de Save](../comandos/save-commands.md)
