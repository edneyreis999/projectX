# General Save Settings

## General

| Parâmetro | Descrição | Opções |
|---|---|---|
| **Save Style** | Estilo de save do jogo | Standard, Slot-Locked, Single |
| **Max Save Files** | Número máximo de save files | Numérico |
| **Autosave Counts?** | Contar autosave no máximo de saves | Boolean |

### Save Styles

- **Standard**: Salva livremente em qualquer slot
- **Slot-Locked**: Seleciona um slot dedicado no New Game
- **Single**: Apenas um slot disponível

## Local Mode

| Parâmetro | Descrição |
|---|---|
| **Local Mode?** | No cliente local, usar arquivos ou forage keys |
| **Filename Format** | Formato do nome do arquivo (`%1` = Save File ID) |
| **Extension Format** | Formato da extensão (`%1` = Save Name) |

## Forage Key

| Parâmetro | Descrição |
|---|---|
| **Forage Key Format** | Formato da key na memória (`%1` = Game ID, `%2` = Save Name) |
| **Forage Key Test** | Key usada para testar se salvar em forage key é possível |

## Vocabulary

| Parâmetro | Descrição |
|---|---|
| **Help: Slot-Locked** | Texto de ajuda para seleção slot-locked inicial |

## JavaScript Hooks

| Parâmetro | Descrição |
|---|---|
| **JS: On Save Success** | Código executado quando save tem sucesso |
| **JS: On Save Failure** | Código executado quando save falha |
| **JS: On Load Success** | Código executado quando load tem sucesso |
| **JS: On Load Failure** | Código executado quando load falha |

## Requisitos

- **Tier 1**: Deve ficar abaixo de plugins de tier inferior (0) no Plugin Manager
- **RPG Maker MZ**: Não funciona em outras versões do RPG Maker

## Relacionado

- [Visão Geral](../conceitos/visao-geral.md)
- [Autosave Settings](autosave-settings.md)
- [Confirm Window Settings](confirm-window-settings.md)
