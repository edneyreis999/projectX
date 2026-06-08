# Rebind de Teclado e Gamepad

Requer **VisuMZ_0_CoreEngine** para funcionar.

O Options Core adiciona cenas dedicadas onde jogadores podem remapear teclado e controles.

## Limitacoes do Teclado

Nem todas as teclas sao elegiveis para remapeamento. Apenas as seguintes sao permitidas:

- **Numeros** - 1 ate 0 (linha superior)
- **Simbolos** - Tilde (~), Minus (-), Plus/Equals (+/=)
- **Letras** - A ate Z
- **Especiais** - `[ ] \ ; ' < > /`

### Razao das Limitacoes

Evitar conflitos com teclas de sistema (function keys, caps lock, etc.). Essas teclas funcionam como controles secundarios, enquanto os controles padrao (setas, Enter, Space, Escape, Numpad) permanecem fixos. Isso impede que o jogador se tranque fora da cena de remapeamento.

## Limitacoes do Gamepad

Limitacoes muito menores. A unica restricao e o **D-Pad**, que nao pode ser remapeado.

### Por que D-Pad e bloqueado

Acoes do D-Pad podem ser hardcoded em alguns controles e e melhor nao altera-las.

### Diferenca vs Teclado

Gamepads **nao podem remover teclas individuais** dos bindings (ao contrario do teclado). Isso porque nao ha fallback key que previna um softlock. Em vez disso, o gamepad tem funcao de **reset do controle**.

## Atualizacao Retroativa do WASD

### Problema

Se voce habilitou o rebinding de teclado/controller e habilitou o "WASD Movement" do Core Engine **depois** que o projeto ja tem `config.rmmzsave` na pasta `/save/`, os novos controles WASD **NAO** serao atualizados retroativamente.

### Solucoes

1. **Manual** - Va nos keybindings e adicione manualmente (setas continuam funcionando). Pode precisar ajustar "Shift Right" tambem.
2. **Deletar config** - Delete `config.rmmzsave` de `/save/` e o jogo gerara um novo com os controles WASD atualizados.

### Quem e afetado

Apenas jogadores que ja comecaram a jogar com uma versao anterior ao "WASD Movement" e ja possuem `config.rmmzsave`. Novos jogadores nao sao afetados.
