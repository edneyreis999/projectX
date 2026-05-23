# DragonBones Union - LLMs Full Navigation

## Sumário Executivo

DragonBones Union é um plugin para RPG Maker MZ que adiciona suporte completo para animações esqueletais (skeletal animation) usando a biblioteca DragonBones v5.7.002b. Permite usar armatures Dragonbones como battlers, pictures e map sprites, com controle via notetags e plugin commands.

## Metadados

- **Sistema**: DragonBones Union
- **Tipo**: Animation System (Skeletal Animation)
- **Versão**: DragonBones 5.7.002b
- **Engine**: RPG Maker MZ apenas
- **Tier**: 2 (coloque abaixo de plugins tier 0, 1)
- **Requisito**: pixi5-dragonbones v5.7.0-2b (Tier 0)

## Descrição dos Documentos

### Conceitos (conceitos/)

#### visao-geral.md
**Conteúdo**: Introdução ao DragonBones, o que é animação esquelética, recursos principais, requisitos, versão, links para documentação oficial.
**Para quem**: Iniciantes, anyone nova ao DragonBones
**Tópicos**: Skeletal animation, skins/textures, esqueleto (skeleton), battlers, pictures, map sprites

#### armatures.md
**Conteúdo**: Como encontrar o nome correto da armature no editor DragonBones, solução para erro "Cannot Read property 'parent' of null".
**Para quem**: Usuários tendo problemas com naming
**Tópicos**: DragonBones editor, Properties, Name field, erro de naming

#### comportamentos.md
**Conteúdo**: Comportamentos das armatures quando carregadas, ancoragem, propriedades compartilhadas.
**Para quem**: Todos usuários
**Tópicos**: Loaded animation, idle, anchor point, root/pivot point, propriedades de sprite (opacity, scale, rotation, tint), blend modes não suportados

#### problemas-comuns.md
**Conteúdo**: Problemas comuns e soluções (FPS desynchs, particles not appearing, unwanted animation frames).
**Para quem**: Todos usuários, especialmente troubleshooting
**Tópicos**: FPS desync (60fps, animation timelines), loading times, particles (root vs anchor), motion refresh, idle bypass

#### map-sprites.md
**Conteúdo**: Limitações e propriedades específicas de armatures como map sprites (99 vértices, clipping, motion priority, animações direcionais, velocidade de animação vs movimento).
**Para quem**: Usuários de map sprites
**Tópicos**: 99 vertices limit, Tilemap clipping, motion priority lists (jump, walk, idle, etc.), direcionais (NumPad), walk/dash rate vs movement speed

### Configuração (configuracao/)

#### general-settings.md
**Conteúdo**: Configurações gerais aplicáveis a todos os usos de DragonBones.
**Para quem**: Setup inicial
**Tópicos**: Assets path, Loaded animation, Looping animations, Skeletal/Texture data keys and extensions (_ske.json, _tex.json, _tex.png)

#### battler-settings.md
**Conteúdo**: Configurações padrão para battlers DragonBones.
**Para quem**: Setup de batalha
**Tópicos**: Default settings (offset X/Y, scale X/Y, width/height, flip), Enemy hue affected, Idle bypass list, Default motions (walk, wait, chant, etc.)

#### map-sprite-settings.md
**Conteúdo**: Configurações padrão para map sprites DragonBones.
**Para quem**: Setup de mapa
**Tópicos**: Default settings (offset, scale, flip, time scale, size), Motion settings (idle, walk, dash, jump, ladder, rope), Walk timer

#### experimental-settings.md
**Conteúdo**: Configurações experimentais.
**Para quem**: Usuários avançados
**Tópicos**: Enemy stances (requer VisuMZ_1_BattleCore), não disponível no core base

### Notetags (notetags/)

#### introduction.md
**Conteúdo**: Introdução aos notetags e comment tags.
**Para quem**: Novos usuários
**Tópicos**: O que são notetags, tipos (Battler vs Map Sprite), Notetags vs Comment tags, limite de 6 linhas para comments

#### battlers.md
**Conteúdo**: Notetags completos para Actors/Enemies na batalha.
**Para quem**: Setup de battlers
**Tópicos**: Dragonbones Battler, Scale, Offset, Size, Time Scale, Motion tags (walk, wait, etc.), Settings container, Hue tags

#### map-sprites.md
**Conteúdo**: Notetags completos para Actors/Events no mapa.
**Para quem**: Setup de map sprites
**Tópicos**: Dragonbones Sprite, Scale, Offset, Time Scale, Walk/Dash Rate, Size, Flip tags, Motion tags (idle, walk, dash, etc.), Settings container

### Plugin Commands (plugin-commands/)

#### introduction.md
**Conteúdo**: Introdução aos plugin commands e quando usá-los.
**Para quem**: Controle dinâmico
**Tópicos**: Diferença entre notetags (static) e commands (dynamic), categorias (Battler, Map Sprite, Picture)

#### comandos.md
**Conteúdo**: Lista completa de todos os plugin commands.
**Para quem**: Referência de commands
**Tópicos**: Battler commands (Actor Change Settings), Map Sprite commands (Actor/Event/Follower/Player Change Settings, Play/Stop Animation), Picture commands (Setup, Play Animation, Offset, Scale, Time Scale)

### Referência (referencia/)

#### compatibilidade.md
**Conteúdo**: Compatibilidade com plugins VisuStella.
**Para quem**: Usuários de múltiplos plugins VisuStella
**Tópicos**: VisuMZ_3_StateTooltips (hitbox behavior), Dragonbones battlers não têm hitbox automática

#### terms-of-use.md
**Conteúdo**: Termos de uso oficiais VisuStella.
**Para quem**: Compliance
**Tópicos**: Uso gratuito/comercial, créditos "VisuStella", edição permitida, redistribuição proibida, responsabilidade, patches de compatibilidade, produtos pagos/equipe

## Relação Entre Áreas

**Conceitos → Configuração**: Entender conceitos antes de configurar parâmetros
**Configuração → Notetags**: Parâmetros definem defaults, notetags sobrescrevem por sprite
**Notetags → Plugin Commands**: Notetags para configuração estática (database), commands para dinâmica (runtime)
**Problemas Comuns → Todas**: Referência para troubleshooting

## Navegação Recomendada

### Path: Novo Usuário Completo
1. conceitos/visao-geral.md (o que é)
2. conceitos/armatures.md (naming correto)
3. conceitos/comportamentos.md (como funciona)
4. conceitos/problemas-comuns.md (evitar problemas)
5. configuracao/general-settings.md (setup inicial)
6. Escolher: Battler ou Map Sprite path

### Path: Foco Batalha
1. configuracao/battler-settings.md
2. notetags/battlers.md
3. plugin-commands/comandos.md (battler commands)

### Path: Foco Mapa
1. conceitos/map-sprites.md (limitações importantes!)
2. configuracao/map-sprite-settings.md
3. notetags/map-sprites.md
4. plugin-commands/comandos.md (map sprite commands)

## Palavras-chave Principais

- DragonBones, armature, skeletal animation, skeleton, bones
- Battler, Enemy, Actor, battle, motion
- Map sprite, character, event, follower, player
- Picture, show picture
- Notetag, comment tag, plugin command
- Scale, offset, size, time scale
- Idle, walk, dash, jump, attack, animation
- Motion, priority, directional, NumPad
- Hitbox, tooltip, compatibility
- VisuStella MZ, tier, plugin parameter

## Documentos Originais

Fonte original: docs/rpg-maker-for-ia/docs-visustella/dragon-bones.md
Processado em: 2025-04-10
Sistema: DragonBones Union Plugin para RPG Maker MZ
