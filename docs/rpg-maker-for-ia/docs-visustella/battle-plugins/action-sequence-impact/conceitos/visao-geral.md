# Visão Geral - Action Sequence Impact

## Identificação

- **Nome**: Action Sequence Impact
- **Arquivo do Plugin**: `VisuMZ_3_ActSeqImpact`
- **Tier**: 3 (colocar abaixo de plugins de tier menor: 0, 1, 2)
- **Autor**: VisuStella MZ (efeitos adicionais por Manu Gaming)

## Propósito

Adiciona efeitos visuais de impacto em batalha usando Pixi JS Filters. Cria distinção visual para ações como acertos críticos, defesas e esquivas, além de fornecer novas Action Sequences para o Battle Core.

## Requisitos

### Plugins Obrigatórios (ordem no Plugin Manager, acima deste plugin)

| Plugin | Observação |
|--------|-----------|
| Pixi JS Filters | Tier 0. Download separado — não vem com VisuStella. Desempenho varia por dispositivo |
| Core Engine VisuStella MZ | Base do engine |
| Battle Core VisuStella MZ | Necessário para Action Sequences |

### Compatibilidade

- RPG Maker MZ apenas (não funciona em MV ou versões anteriores)
- Os comandos de Action Sequence são acessados pelo **Battle Core** (não por este plugin diretamente)
- Pixi JS Filters pode ter desempenho diferente em diferentes máquinas/dispositivos

## Funcionalidades Principais

1. **Efeitos Visuais Automáticos** — Ativados em eventos de combate (crítico, dodge, guard)
2. **Action Sequences IMPACT** — Comandos de efeito visual para usar no Battle Core
3. **Action Sequences INJECT** — Injeção de spritesheet animations customizadas em battlers

## Resumo dos Efeitos

| Efeito | Tipo | Automático | Action Sequence |
|--------|------|:----------:|:--------------:|
| Bizarro Inversion | Filtro de cor | - | Sim |
| Color Break | Chromatic aberration | Sim (crítico) | Sim |
| Desaturation | Preto e branco | - | Sim |
| Motion Blur | Desfoque de movimento | Sim (dodge) | Sim (screen e target) |
| Negative Inversion | Inversão de cores | - | Sim |
| Oversaturation | Saturação extrema | - | Sim |
| Shockwave | Ondas de choque | Sim (guard) | Sim (ponto, target, centro) |
| Motion Trail | Rastro de movimento | - | Sim (create/remove) |
| Time Scale | Câmera lenta/rápida | - | Sim |
| Time Stop | Pausa temporal | - | Sim |
| Zoom Blur | Desfoque radial | - | Sim (ponto, target) |

## Notas Importantes

- Efeitos visuais aplicados ao **battlefield** afetam tudo que está nele (sprites, imagens). UI e pictures fora do battlefield **não** são afetados
- Battle animations podem ou não ser afetadas dependendo da configuração
- Time Scale afeta apenas batalha; efeitos param durante input phase ou quando há mensagens
