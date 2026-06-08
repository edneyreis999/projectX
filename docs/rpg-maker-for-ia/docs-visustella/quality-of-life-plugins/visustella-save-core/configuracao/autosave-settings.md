# Autosave Settings

## Pré-requisito

Autosave requer **Database → System 1 → [x] Enable Autosave** habilitado no RPG Maker MZ.

## General

| Parâmetro | Descrição | Opções |
|---|---|---|
| **Autosave Type** | Tipo de autosave | Autosave File, Current File, Autosave File + Current File |
| **Start Enabled?** | Iniciar com autosave habilitado | Boolean |

### Tipos de Autosave

- **Autosave File**: Arquivo dedicado para autosaves
- **Current File**: Sobrescreve o save file atual
- **Autosave File + Current File**: Ambos os comportamentos acima

## Requests

| Parâmetro | Descrição |
|---|---|
| **Requires Save Enable?** | Autosave requests exigem que saving esteja habilitado? |
| **Request after Battle?** | Solicitar autosave após batalha? |
| **Request on Transfer?** | Solicitar autosave após transferência de mapa? |
| **Request on Menu Open?** | Solicitar autosave ao abrir o menu principal? |
| **Request on Menu Exit?** | Solicitar autosave ao sair do menu principal? |

> **Nota**: Requests são solicitações de autosave (Stage 1). Elas podem ser negadas se autosave estiver desabilitado ou se o jogador desativou a opção no menu Options.

## JavaScript Hooks

| Parâmetro | Descrição |
|---|---|
| **JS: On Success** | Código executado quando autosave tem sucesso |
| **JS: On Failure** | Código executado quando autosave falha |

## Estágios de Autosave

O autosave opera em três estágios com níveis crescentes de força:

| Estágio | Plugin Command | Respeita Enable/Disable | Respeita Options Menu |
|---|---|---|---|
| **Stage 1: Request** | `Autosave: Request` | Sim | Sim |
| **Stage 2: Execute** | `Autosave: Execute` | Não | Sim |
| **Stage 3: Force** | `Autosave: Force` | Não | Não |

Veja detalhes em [Autosave Commands](../comandos/autosave-commands.md).

## Relacionado

- [Autosave Commands](../comandos/autosave-commands.md)
- [Autosave Confirm Window](confirm-window-settings.md)
- [Autosave Options](#) — veja [Visão Geral](../conceitos/visao-geral.md)
