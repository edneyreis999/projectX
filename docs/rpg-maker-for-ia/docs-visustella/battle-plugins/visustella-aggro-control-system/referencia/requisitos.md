# Requisitos e Compatibilidade

## Requisitos Obrigatorios

| Requisito | Versao |
|-----------|--------|
| RPG Maker MZ | Qualquer versao |

O plugin funciona standalone com apenas o RPG Maker MZ.

## Requisitos Opcionais (Funcionalidades Extras)

| Plugin | Funcionalidade Desbloqueada |
|--------|-----------------------------|
| VisuMZ_0_CoreEngine | Animacoes de Taunt |
| VisuMZ_1_BattleCore | Provoke Priority Lines, Taunt Animations, Aggro Gauge visual |

### Funcionalidades sem plugins extras
- Sistema de Provoke (mecanica)
- Sistema de Taunt (mecanica)
- Sistema de Aggro (mecanica)
- Todas as notetags
- Todos os Plugin Commands
- Plugin Parameters basicos

### Funcionalidades que requerem plugins extras
- Provoke Priority Lines (visual) -> Battle Core
- Taunt Animations (visual) -> Core Engine + Battle Core
- Aggro Gauge visual -> Configuravel via parametros

## Tier do Plugin

**Tier 2** - Deve ser colocado **abaixo** de plugins com tier menor na lista do Plugin Manager.

Ordem recomendada:
```
Tier 0: Core Engine
Tier 1: Battle Core
Tier 2: Aggro Control System  <-- Aqui
Tier 3+: Outros plugins
```

## Ordem no Plugin Manager

Colocar **acima** de:
- Plugins com tier 3 ou maior

Colocar **abaixo** de:
- Core Engine (Tier 0)
- Battle Core (Tier 1)
- Outros plugins Tier 0-1

## Compatibilidade

- Compativel com outros plugins VisuStella MZ
- Pode haver conflitos com plugins de AI customizada que modificam target selection
- Notetags especificas (`<Bypass *>`) podem interferir com outros sistemas de targeting
