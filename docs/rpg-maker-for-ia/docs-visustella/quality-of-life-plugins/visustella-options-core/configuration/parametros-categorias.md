# Parametros - Options Categories

Permite adicionar, editar e remover categorias e suas opcoes no Options Menu Scene.

## Estrutura de uma Categoria

| Campo | Descricao |
|-------|-----------|
| Name | Nome exibido na Category Window. Suporta text codes. |
| Icon | Icone da categoria. Usar 0 para nenhum. |
| JS: Show/Hide | Codigo JS para determinar visibilidade da categoria. |
| Options List | Lista de opcoes dentro desta categoria. |

## Estrutura de uma Opcao (Listed Options)

Adicionar ou alterar opcoes requer conhecimento de JavaScript.

### Basic

| Campo | Descricao |
|-------|-----------|
| Symbol | Simbolo unico da opcao quando selecionada. Deve ser unico entre todas as opcoes. |
| Icon | Icone da opcao. Usar 0 para nenhum. |
| STR: Text | Texto exibido. Se preenchido, ignora `JS: Text`. |
| JS: Text | Codigo JS para determinar o texto exibido. |

### Accessibility

| Campo | Descricao |
|-------|-----------|
| JS: Show/Hide | Codigo JS para determinar se a opcao e visivel. |
| JS: Enable | Codigo JS para determinar se a opcao pode ser alterada (habilitada/desabilitada). **Nao** determina o valor ON/OFF. |
| JS: Ext | Codigo JS para determinar o valor `ext` da opcao. |

### Functions

| Campo | Descricao |
|-------|-----------|
| JS: Draw Option | Codigo JS para desenhar o item no List Window. |
| JS: Process OK | Codigo JS executado quando OK e pressionado com a opcao selecionada. |
| JS: Cursor Right | Codigo JS executado quando Right e pressionado com a opcao selecionada. |
| JS: Cursor Left | Codigo JS executado quando Left e pressionado com a opcao selecionada. |

### Data

| Campo | Descricao |
|-------|-----------|
| JS: Default Value | Codigo JS para determinar o valor padrao da opcao (define ON/OFF padrao). |
| JS: Save Option | Codigo JS executado ao salvar a configuracao da opcao. |
| JS: Load Option | Codigo JS executado ao carregar a configuracao da opcao. |

## Diagrama de Fluxo de uma Opcao

```
[Load Game]
    │
    ▼
JS: Load Option ──► [Option Visible?]
                         │
                    JS: Show/Hide
                         │
                    [Option Enabled?]
                         │
                    JS: Enable
                         │
                    [Display in List]
                         │
                    JS: Draw Option
                         │
              ┌──────────┴──────────┐
              │                     │
        JS: Cursor Left      JS: Cursor Right
              │                     │
              └──────────┬──────────┘
                         │
                    JS: Process OK
                         │
                    JS: Save Option
                         │
                    [Save Game]
```
