# VisuStella Save Core — Visão Geral

## Informações do Plugin

- **Nome**: Save Core
- **Autor**: VisuStella
- **Tier**: 1 (deve ficar abaixo de plugins de tier inferior no Plugin Manager)
- **Requisito**: RPG Maker MZ

## Propósito

O Save Core expande o sistema de saves do RPG Maker MZ com controle sobre autosave, estilos visuais do menu de save, switches/variáveis globais e janelas de confirmação.

## Funcionalidades Principais

| Funcionalidade | Descrição |
|---|---|
| **Tipos de Save** | Standard (qualquer slot), Slot-Locked (slot dedicado no New Game), Single (apenas um slot) |
| **Autosave** | Arquivo dedicado, sobrescrever arquivo atual, ou ambos. Controlado por estágios (Request → Execute → Force) |
| **Global Switches/Variables** | Switches e variáveis que mantêm estado consistente entre todos os saves e new games |
| **Save Confirm Window** | Janela popup visual informando sucesso ou falha ao salvar/carregar |
| **Estilos de Menu** | List (horizontal), Vertical (colunas), Box (grade), Large (tela cheia) |
| **Descrição e Imagem** | Texto descritivo e imagem customizáveis por save file |
| **Actor Graphic** | Exibição de face, map sprite ou sideview battler dos atores no menu |

## Integração com o Sistema

- **Autosave Options**: Adiciona opção "Autosave" no menu de Options, permitindo ao jogador ativar/desativar
- **JavaScript Hooks**: Código JS customizável para sucesso/falha de save, load e autosave
- **Text Codes**: Suporta `\V[x]`, `\N[x]`, `\P[x]` (save-local) e outros text codes no contexto ativo

## Links Relacionados

- [Global Switches e Variables](global-switches-variables.md)
- [Estilos de Save](save-styles.md)
- [Comandos de Autosave](../comandos/autosave-commands.md)
- [Configuração Geral](../configuracao/general-save-settings.md)
