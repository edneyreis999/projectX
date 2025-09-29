# Coreto_MissionSave — Saves por Missão/Evento

Objetivo: criar um save dedicado no início de cada missão ou em pontos de evento específicos, sem abrir a tela de save, usando slots fixos e previsíveis.

## Requisitos

- RPG Maker MZ com `VisuMZ_0_CoreEngine` e `VisuMZ_1_SaveCore`.
- Ajuste o `Max Save Files` do SaveCore para cobrir os maiores slots usados por este plugin (veja parâmetros abaixo).

## Instalação

- Arquivo do plugin: `frontend/js/plugins/Coreto_MissionSave.js`
- Ative-o no Gerenciador de Plugins (após o CoreEngine/SaveCore).

## Parâmetros

- `Base dos Slots de Missão` (padrão: 21)
- `Quantidade de Slots de Missão` (padrão: 30)
- `Base dos Slots de Evento` (padrão: 51)
- `Quantidade de Slots de Evento` (padrão: 20)
- `Mapeamentos Fixos (Missões)`: lista opcional `{ id, slot }` para fixar slots por missão
- `Mapeamentos Fixos (Eventos)`: lista opcional `{ id, slot }` para fixar slots por evento

Se você não fornecer `slotId` nos comandos, o plugin calcula o slot = `base + (hash(chave) % quantidade)`. Para slots explícitos, informe `slotId`.

Exemplo de cobertura: com base 21, count 30 → slots 21..50. Ajuste o SaveCore `Max Save Files ≥ 50` (ou mais, se usar eventos base 51..).

## Comandos de Plugin

- Save Mission Start (`saveMissionStart`)
  - `missionId` (string, obrigatório): ex. `m1_prologo`, `m2_floresta`.
  - `slotId` (número, opcional): define o slot 1-based; 0 usa cálculo por hash.

- Save Event Point (`saveEventPoint`)
  - `eventKey` (string, obrigatório): ex. `ev_caverna_portao`.
  - `slotId` (número, opcional): define o slot 1-based; 0 usa cálculo por hash.

- Delete Mission Save (`deleteMissionSave`)
  - `missionId`, `slotId` (mesma lógica)

- Delete Event Save (`deleteEventSave`)
  - `eventKey`, `slotId` (mesma lógica)

## Uso no Evento (exemplos)

- Início de missão: Adicione o comando de plugin `Save Mission Start` com `missionId = m1_prologo`.
- Checkpoint de evento: Adicione `Save Event Point` com `eventKey = ev_caverna_portao`.
- Para deletar o save dedicado (modo hardcore): chame `Delete Mission Save` com o mesmo `missionId`.

## Integração com SaveCore (opcional, exibir rótulos)

Este plugin insere `info.coretoTag` no objeto de informações do save (global info). Em `VisuMZ_1_SaveCore → Data & Info Settings → Info Data`, você pode adicionar linhas para exibir a tag:

- Label: `Missão/Evento:`
- JS Value (exemplo robusto):

  ```js
  (function() {
    const gi = DataManager._globalInfo;
    const id = this.savefileId ? this.savefileId() : this._savefileId; // compat
    const tag = gi && gi[id] && gi[id].coretoTag;
    if (!tag) return '';
    return tag.missionKey || tag.eventKey || '';
  })()
  ```

- JS Show: `return true;`

Observação: o contexto de JS do SaveCore pode variar; o snippet acima tenta acessar o `savefileId` atual e ler `DataManager._globalInfo`.

## Notas

- Os saves são feitos de forma assíncrona; os comandos retornam rapidamente. Evite encadear teleports imediatamente após o save no mesmo frame.
- Se preferir slots 100% definidos manualmente, sempre preencha `slotId` e ignore a faixa/hash.
- Colisões por hash são raras mas possíveis; para missões críticas, use `slotId` explícito.

## Mapeamento fixo pronto (sugestão)

Sugestão inicial já embutida no plugin (pode ser ajustada no código ou via parâmetros):

- Missões: `m1_prologo → 21`, `m2_floresta → 22`, `m3_caverna → 23`, `m4_castelo → 24`.
- Eventos: `ev_caverna_portao → 51`, `ev_castelo_ponte → 52`, `ev_vila_festival → 53`.

Como configurar via parâmetros (RPG Maker MZ):

- Abra o Gerenciador de Plugins → `Coreto_MissionSave`
- Em `Mapeamentos Fixos (Missões)` clique em `[…]` e adicione itens:
  - Id: `m1_prologo`; Slot: `21`
  - Id: `m2_floresta`; Slot: `22`
  - (repita conforme sua lista real)
- Em `Mapeamentos Fixos (Eventos)`, idem (ex.: `ev_caverna_portao → 51`).
