# Compatibilidade - Action Sequence Camera Core

## Tier

**Tier 3** - Coloque este plugin abaixo de plugins com tier menor (0, 1, 2) no Plugin Manager.

## Requisitos Obrigatorios

| Plugin | Arquivo | Nota |
|--------|---------|------|
| Core Engine VisuStella MZ | `VisuMZ_0_CoreEngine` | Necessario para Easing |
| Battle Core VisuStella MZ | `VisuMZ_1_BattleCore` | Obrigatorio, nao inicia sem ele |

## Ordem no Plugin Manager

```
1. VisuMZ_0_CoreEngine          (Tier 0)
2. VisuMZ_1_BattleCore          (Tier 1)
3. ... (outros plugins tier 0-2)
4. VisuMZ_3_ActSeqCamera        (Tier 3) <-- Este plugin
```

## Conflitos Conhecidos

- Plugins que reescrevem `Spriteset_Battle.updatePosition` podem conflitar
- Acesso aos comandos e feito via Battle Core, nao diretamente por este plugin
- Mantenha o Battle Core atualizado para ter acesso a todos os comandos

## Dependencia de Easing

O parametro de Easing (Camera, Angle, Skew, Zoom) requer o Core Engine. Sem ele, as opcoes de easing podem nao estar disponiveis ou nao funcionar.

## Reset Automatico

Efeitos de camera sao resetados automaticamente durante a input phase. Isso e hardcoded e nao pode ser desabilitado.

Veja tambem:
- [referencia-rapida.md](referencia-rapida.md) - Tabela de comandos
