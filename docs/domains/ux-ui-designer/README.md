# Domínio: UX/UI

## Estado do inventário

Cobertura estática terminal para sete requisitos: seis `deep` estão `covered` e
o mapa de fontes está `mapped`. Readability, contraste, input, timing,
feedback perceptível e restauração de save continuam pendentes de validação
humana/runtime.

Evidência aceita: packet `ux-ui-designer-001` revisão 1. Classificação:
**inventário estático; acessibilidade e percepção não certificadas**.

## Inventário factual

- **Fluxos:** título com New/Continue/Options/Exit; menu com
  Skill/Options/Save/End. Journal de quests depende do switch 50 e tracker usa
  `J`/`T`. Fontes: `s`, `g`.
- **Diálogo:** 1.068 textos, 1.063 normais, 1.066 na parte inferior, 651 com
  nome e 387 com face; 76 escolhas, 24 chamadas de visual choice e 327 entradas
  de bust para 208 saídas. Fontes: `s`, `g`.
- **Risco — HUD/feedback:** gauges HP/ATB, state tooltips, quest tracker,
  visuais de state/weakness e feedback TP existem; MP está oculto. Battle Log
  oculta linhas de resultado/state. A clareza pedida pelo GDD não foi validada.
  Fontes: `g`, `a`, `d`.
- **Risco — save:** Save Core configura 20 slots, confirmações e autosave em
  `file0` após batalha/transfer/menu; há um caller de save em evento. Sete saves
  versionados e quatro legados coexistem; restauração não testada. Fontes: `g`,
  `s`, `e`.
- **Risco — acessibilidade:** 1280×720, fonte 26, button assist, rebind de
  input, wrap e velocidade de texto existem. Localização está desligada e
  rótulos PT/EN se misturam. Fontes: `s`, `g`, `a`.

## Contrato da escolha qualSeuNome

No fluxo `qualSeuNome`, **Confirmar** define o nome do Actor 1 como `Dulgarin`.
**Corrigir** preserva e reabre a entrada de nome com limite máximo de oito
caracteres, permitindo que o jogador revise o valor antes de confirmar.

Ao manter esse fluxo, preserve as ramificações, seus efeitos existentes e o
comportamento de Cancel. Alterar o rótulo, a ordem visual ou a apresentação não
deve fazer uma opção executar os efeitos da outra nem transformar Cancel em
confirmação implícita.

## Coverage materializado

| Requisito | Profundidade | Estado | Limite |
| --- | --- | --- | --- |
| `ux-ui-designer.ux-flows` | `deep` | `covered` | estático |
| `ux-ui-designer.hud-menus` | `deep` | `covered` | estático |
| `ux-ui-designer.dialog-boxes-ui-states` | `deep` | `covered` | estático |
| `ux-ui-designer.visual-feedback` | `deep` | `covered` | humano pendente |
| `ux-ui-designer.save-load-ui` | `deep` | `covered` | restauração pendente |
| `ux-ui-designer.observed-accessibility` | `deep` | `covered` | humano pendente |
| `ux-ui-designer.source-map` | `map` | `mapped` | fontes localizadas |

## Fontes e rastreabilidade

- `p`: packets aceitos e `index.xml`
- `d`: GDD geral e de combate; README de UX
- `s`: `System`, `CommonEvents`, `MapInfos`, `Map*`
- `g`: `plugins.js`; plugins Coreto de UI
- `a`: UI de quests PKD; assets de UI; fontes
- `e`: `rmmz_objects.js`; `save/`

## Próxima validação

Playtest humano de todos os fluxos, HUD, escolha, teclado/gamepad, leitura,
contraste, tempo de texto, consistência PT/EN e feedback de combate. Testar
save/load e restauração de formatos versionados/legados com evidência separada.
