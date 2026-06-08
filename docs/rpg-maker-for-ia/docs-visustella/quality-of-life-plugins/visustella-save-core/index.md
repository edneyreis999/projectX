# VisuStella Save Core — Índice

> Documentação catalogada do plugin Save Core (VisuStella MZ) para RPG Maker MZ.

## Sobre

Plugin Tier 1 que expande o sistema de saves com autosave, switches/variáveis globais, estilos visuais de menu e janelas de confirmação.

## Mapa de Seções

```
visustella-save-core/
├── conceitos/                    # Conceitos fundamentais
│   ├── visao-geral.md            # Visão geral, features, metadados
│   ├── global-switches-variables.md  # Switches/variáveis globais
│   └── save-styles.md            # Estilos visuais do menu de save
├── configuracao/                 # Parâmetros do plugin
│   ├── general-save-settings.md  # Settings gerais (save style, local mode, JS hooks)
│   ├── autosave-settings.md      # Configuração de autosave (tipos, requests)
│   ├── confirm-window-settings.md # Janelas de confirmação (save + autosave + options)
│   ├── actor-graphic-settings.md # Gráficos dos atores no menu
│   └── style-settings.md         # Configuração por estilo (rows, cols, JS draw)
├── comandos/                     # Plugin Commands
│   ├── autosave-commands.md      # Enable/Disable, Request, Execute, Force
│   └── save-commands.md          # Current Slot, Set Description, Set Picture
└── referencia/                   # Referência rápida
    ├── glossario.md              # Termos e definições
    └── troubleshooting.md        # Problemas comuns e soluções
```

## Caminho Recomendado de Leitura

1. `conceitos/visao-geral.md` — Entender o que o plugin faz
2. `conceitos/global-switches-variables.md` — Conceito de dados globais
3. `configuracao/general-save-settings.md` — Configuração básica
4. `configuracao/autosave-settings.md` — Entender autosave
5. `comandos/autosave-commands.md` — Como usar autosave via eventos
6. `comandos/save-commands.md` — Como manipular saves via eventos
7. Demais arquivos conforme necessidade

## Links Principais

- [Visão Geral](conceitos/visao-geral.md)
- [Autosave Commands](comandos/autosave-commands.md)
- [Troubleshooting](referencia/troubleshooting.md)
