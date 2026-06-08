# Glossário — Save Core

| Termo | Definição |
|---|---|
| **Save Style** | Modo de save: Standard, Slot-Locked ou Single |
| **Save Menu Style** | Aparência visual do menu: List, Vertical, Box, Large |
| **Autosave** | Salvamento automático do jogo em pontos específicos |
| **Autosave File** | Arquivo dedicado exclusivamente para autosaves |
| **Current File** | O save file atualmente em uso pelo jogador |
| **Forage Key** | Chave de armazenamento usada ao salvar em memória (modo web/NW.js) |
| **Global Switch** | Switch cujo estado persiste em todos os saves e new games |
| **Global Variable** | Variable cujo valor persiste em todos os saves e new games |
| **Slot-Locked** | Modo onde o jogador seleciona um slot dedicado no New Game |
| **Save Confirm Window** | Popup que confirma sucesso/falha ao salvar |
| **Autosave Confirm Window** | Popup que notifica quando autosave ocorre |
| **Stage 1 (Request)** | Autosave condicional — respeita todas as configurações |
| **Stage 2 (Execute)** | Autosave parcialmente forçado — ignora Enable/Disable mas respeita Options |
| **Stage 3 (Force)** | Autosave totalmente forçado — ignora tudo exceto Database |
| **Text Codes** | Códigos como `\V[x]`, `\N[x]`, `\P[x]` usados em descrições |
| **Tier 1** | Nível de prioridade do plugin — deve ficar abaixo de Tier 0 |

## Tags de Switch/Variable

| Tag | Efeito | Compatibilidade |
|---|---|---|
| `<Global>` | Estado global entre todos os saves | Mutuamente exclusiva |
| `<JS>` | Definido por código JavaScript | Mutuamente exclusiva |
| `<Self>` | Escopo local/contextual | Mutuamente exclusiva |

## Relacionado

- [Troubleshooting](troubleshooting.md)
- [Visão Geral](../conceitos/visao-geral.md)
