# DragonBones Union - Documentação Catalogada

## Visão Geral

Bem-vindo à documentação catalogada do **DragonBones Union** para RPG Maker MZ. Esta documentação foi organizada para facilitar navegação e recuperação de informações sobre o sistema de animação esquelética DragonBones.

## O que é DragonBones?

DragonBones permite que seus jogos usem animação esquelética, onde personagens são representados por skins/texturas e um conjunto digital de ossos interconectados (esqueleto), criando movimentos suaves e leves.

**Versão**: 5.7.002b

## Documento Original

- Fonte: `docs/rpg-maker-for-ia/docs-visustella/dragon-bones.md`

## Estrutura da Documentação

```
dragonbones-union/
├── conceitos/              # Conceitos fundamentais
│   ├── visao-geral.md     # Introdução e visão geral
│   ├── armatures.md       # Naming correto de armatures
│   ├── comportamentos.md  # Comportamentos das armatures
│   ├── problemas-comuns.md # Problemas e soluções
│   └── map-sprites.md     # Armatures como sprites do mapa
│
├── configuracao/           # Parâmetros do Plugin
│   ├── general-settings.md      # Configurações gerais
│   ├── battler-settings.md      # Configurações de battler
│   ├── map-sprite-settings.md   # Configurações de map sprite
│   └── experimental-settings.md # Configurações experimentais
│
├── notetags/               # Notetags e Comment Tags
│   ├── introduction.md    # Introdução aos notetags
│   ├── battlers.md        # Notetags para battlers
│   └── map-sprites.md     # Notetags para map sprites
│
├── plugin-commands/        # Plugin Commands
│   ├── introduction.md    # Introdução aos comandos
│   └── comandos.md        # Lista completa de comandos
│
└── referencia/             # Referências e informações adicionais
    ├── compatibilidade.md # Compatibilidade com plugins VisuStella
    └── terms-of-use.md    # Termos de uso oficial
```

## Caminhos Sugeridos de Leitura

### Para Iniciantes
1. Comece com [Visão Geral](conceitos/visao-geral.md)
2. Entenda [Armatures e Naming](conceitos/armatures.md)
3. Aprenda [Comportamentos](conceitos/comportamentos.md)
4. Revise [Problemas Comuns](conceitos/problemas-comuns.md)

### Para Configuração de Batalha
1. [Battler Settings](configuracao/battler-settings.md)
2. [Notetags Battler](notetags/battlers.md)
3. [Plugin Commands - Battler](plugin-commands/comandos.md#battler-plugin-commands)

### Para Map Sprites
1. [Map Sprites - Conceitos](conceitos/map-sprites.md)
2. [Map Sprite Settings](configuracao/map-sprite-settings.md)
3. [Notetags Map Sprites](notetags/map-sprites.md)
4. [Plugin Commands - Map Sprite](plugin-commands/comandos.md#map-sprite-plugin-commands)

### Para Pictures
1. [Plugin Commands - Picture](plugin-commands/comandos.md#picture-plugin-commands)

### Para Configuração Geral
1. [General Settings](configuracao/general-settings.md)
2. [Compatibilidade](referencia/compatibilidade.md)

## Áreas Principais

### 1. Sistema de Animação
- [Visão Geral](conceitos/visao-geral.md) - O que é DragonBones
- [Armatures](conceitos/armatures.md) - Entendendo armatures
- [Comportamentos](conceitos/comportamentos.md) - Como funcionam

### 2. Configuração
- [General Settings](configuracao/general-settings.md) - Configurações gerais do plugin
- [Battler Settings](configuracao/battler-settings.md) - Configurações de batalha
- [Map Sprite Settings](configuracao/map-sprite-settings.md) - Configurações do mapa

### 3. Uso Avançado
- [Notetags](notetags/) - Configurações estáticas via database
- [Plugin Commands](plugin-commands/) - Controle dinâmico durante o jogo
- [Problemas Comuns](conceitos/problemas-comuns.md) - Troubleshooting

### 4. Referência
- [Compatibilidade](referencia/compatibilidade.md) - Compatibilidade VisuStella
- [Terms of Use](referencia/terms-of-use.md) - Termos de uso oficial

## Links Rápidos

| Área | Arquivo Principal |
|------|-------------------|
| Introdução | [Visão Geral](conceitos/visao-geral.md) |
| Configuração | [General Settings](configuracao/general-settings.md) |
| Battlers | [Battler Settings](configuracao/battler-settings.md) |
| Map Sprites | [Map Sprite Settings](configuracao/map-sprite-settings.md) |
| Notetags | [Introdução Notetags](notetags/introduction.md) |
| Comandos | [Introdução Commands](plugin-commands/introduction.md) |
| Troubleshooting | [Problemas Comuns](conceitos/problemas-comuns.md) |

## Metadados

- **Sistema**: DragonBones Union
- **Tipo**: Animation System
- **Versão DragonBones**: 5.7.002b
- **Engine**: RPG Maker MZ
- **Tier**: 2
- **Plugin Obrigatório**: pixi5-dragonbones (v5.7.0-2b)

## Documentos LLMs

- [llms.txt](llms.txt) - Guia de navegação para LLMs
- [llms-full.txt](llms-full.txt) - Documento completo de navegação
- [chunks.json](chunks.json) - Chunks semânticos para recuperação
