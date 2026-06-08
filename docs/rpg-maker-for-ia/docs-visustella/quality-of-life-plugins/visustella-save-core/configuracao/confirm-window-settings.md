# Save Confirm Window Settings

## Save Confirmation Window

Janela popup que dá feedback visual ao jogador sobre sucesso ou falha ao salvar/carregar.

## Parâmetros

### General

| Parâmetro | Descrição |
|---|---|
| **Enable Window?** | Habilitar a janela de confirmação de save? |
| **Pop Up Duration** | Duração da janela aberta em milissegundos |
| **JS: X, Y, W, H** | Código para determinar dimensões da janela |

### Vocabulary

| Parâmetro | Descrição |
|---|---|
| **Pop Up: Save Success** | Texto para "Save Success" (text codes permitidos) |
| **Pop Up: Save Failure** | Texto para "Save Failure" (text codes permitidos) |
| **Pop Up: Load Failure** | Texto para "Load Failure" (text codes permitidos) |

---

## Autosave Confirmation Window

Janela popup que notifica o jogador quando autosave ocorre.

### General

| Parâmetro | Descrição |
|---|---|
| **Enable Window?** | Habilitar a janela de confirmação de autosave? |
| **Pop Up Duration** | Duração da janela aberta em milissegundos |
| **Screen Position** | Posição na tela da janela |

### Posições Disponíveis

- Lower Left, Lower Center, Lower Right
- Middle Left, Middle Center, Middle Right
- Upper Left, Upper Center, Upper Right

### Vocabulary

| Parâmetro | Descrição |
|---|---|
| **Pop Up: Save Success** | Texto para "Autosave Success" (text codes permitidos) |
| **Pop Up: Save Failure** | Texto para "Autosave Failure" (text codes permitidos) |

---

## Autosave Options Settings

O plugin adiciona a opção "Autosave" ao menu de Options do jogo.

| Parâmetro | Descrição |
|---|---|
| **Add Option?** | Adicionar "Autosave" ao menu de Options? |
| **Adjust Window Height** | Ajustar automaticamente a altura da janela de options? |
| **Option Name** | Nome do comando no menu |
| **Default Value** | Valor padrão da opção |

> **Importante**: Se o jogador desativar "Autosave" no Options Menu, quaisquer Autosave requests e executions serão bloqueados.

## Relacionado

- [Autosave Settings](autosave-settings.md)
- [Autosave Commands](../comandos/autosave-commands.md)
