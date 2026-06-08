# Master Volume Shortcut Settings

Atalho para ajustar o volume mestre sem abrir o menu de opcoes.

## Atalho

**Ctrl + PageUp** / **Ctrl + PageDn** - Aumenta/diminui o volume mestre.

Requer Options Core instalado para que os jogadores possam ajustar o volume mestre.

## Parametros

### Shortcut

| Parametro | Descricao |
|-----------|-----------|
| Enabled? | Habilitar ou desabilitar o atalho |
| Shortcut Change Value | Quantidade de mudanca por pressionada. Volume mestre varia entre 0 e 100. |

### Sound Effects > Volume Up

| Parametro | Descricao |
|-----------|-----------|
| Filename | Arquivo de efeito sonoro tocado ao aumentar |
| Volume | Volume do efeito sonoro |
| Pitch | Pitch do efeito sonoro |
| Pan | Pan do efeito sonoro |

### Sound Effects > Volume Down

| Parametro | Descricao |
|-----------|-----------|
| Filename | Arquivo de efeito sonoro tocado ao diminuir |
| Volume | Volume do efeito sonoro |
| Pitch | Pitch do efeito sonoro |
| Pan | Pan do efeito sonoro |

## Rebind Plugin Parameters

### General Settings

| Parametro | Descricao |
|-----------|-----------|
| Enable Rebinding? | Habilitar remapeamento de teclado e gamepad (requer CoreEngine) |
| Keyboard Bindings | Teclas que podem ser remapeadas e ordem de exibicao |
| Gamepad Bindings | Botoes que podem ser remapeados e ordem de exibicao |
| JS: Reset Gamepad | Determina como o mapa do gamepad deve ser ao resetar |

### Vocabulary - Button Vocab

Textos para representar cada tipo de input. Text codes permitidos.

| Campo | Descricao |
|-------|-----------|
| Up / Left / Down / Right | Texto para direcoes |
| OK / Escape / Cancel / Menu | Texto para acoes |
| Page Up / Page Down / Shift / Tab | Texto para navegacao |

### Vocabulary - Formats

| Campo | Descricao |
|-------|-----------|
| Button Format | Formato para botoes sem atribuicao. `%1` = Button ID. Text codes permitidos. |
| D-Pad Format | Formato para botoes direcionais. `%1` = Direcao. Text codes permitidos. |

### Vocabulary - Button Assist

| Campo | Descricao |
|-------|-----------|
| Shift: Remove | Texto do assist para remover |
| Shift: Reset | Texto do assist para resetar |
| OK: Select | Texto do assist para selecionar |
| Cancel: Exit | Texto do assist para sair |

### Vocabulary - Help Descriptions

| Campo | Descricao |
|-------|-----------|
| Select for Keyboard | Descricao de ajuda para selecionar botao do teclado |
| Keyboard Instruct | Instrucao para pressionar uma tecla |
| Forbidden Key | Mensagem quando tecla nao pode ser usada |
| Select for Gamepad | Descricao de ajuda para selecionar botao do gamepad |
| Gamepad Instructions | Instrucao para pressionar botao do gamepad |
| Forbidden Button | Mensagem quando botao nao pode ser remapeado |
| No Gamepad Detected | Mensagem quando nenhum gamepad e detectado |

### Window Settings

| Parametro | Descricao |
|-----------|-----------|
| Window_Help > Background Type | Tipo de fundo da janela de ajuda |
| Window_KeyRebinds > Background Type | Tipo de fundo da janela de remapeamento |
| Window_KeyRebinds > Key Type Align | Alinhamento de texto para tipos de tecla |
| Window_KeyRebinds > Rebind Key Align | Alinhamento de texto para teclas remapeadas |
| Window_KeyRebinds > JS: X, Y, W, H | Dimensoes da janela via codigo JS |
| Window_RebindHelp > Background Type | Tipo de fundo da janela de ajuda de remapeamento |
| Window_RebindHelp > JS: X, Y, W, H | Dimensoes da janela via codigo JS |
