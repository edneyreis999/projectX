# Troubleshooting - VisuStella Events & Movement Core

Guia de solucao para problemas comuns do plugin VisuStella Events & Movement Core.

---

## 1. Shadows nao aparecem

**Problema:** Sprites de eventos nao exibem sombra no mapa.

**Causa:** Sprites com `!` no inicio do nome do arquivo sao tratados como **object characters** pelo RPG Maker MZ. Object characters NAO recebem sombra por padrao, pois geralmente representam objetos de cenário (baus, portas, etc.).

**Solucao:**
- Renomeie o arquivo removendo o `!` do inicio (ex.: `!NPC.png` para `NPC.png`) para que o sprite seja tratado como character e receba sombra automaticamente.
- Alternativamente, se precisar manter o `!`, use a notetag `<Hide Shadow>` explicitamente para controlar o comportamento, ou ajuste manualmente a sombra via eventos.

---

## 2. VS8 sprites com animacao incorreta

**Problema:** Sprites no formato VS8 apresentam animacoes quebradas, frames incorretos ou poses erradas.

**Causa:** O layout do sprite sheet nao segue o formato exato exigido pelo VS8.

**Solucao:**
- Verifique se o sprite sheet possui **16 blocos de 3 frames** cada, seguindo o layout VS8 padrao (walk, dash, carry, ladder, rope, emote).
- Confirme que o nome do arquivo contem **obrigatoriamente** `[VS8]` (ex.: `Actor1[VS8].png`).
- Certifique-se de que as dimensoes totais da imagem estao corretas: `(cellWidth * 3) x (cellHeight * 16)` para o formato basico.

---

## 3. Self Switches nao funcionam entre mapas

**Problema:** Tentativa de acessar Self Switches de um evento que esta em outro mapa retorna valores incorretos ou indefinidos.

**Causa:** Self Switches sao **scoped** pela tupla `(mapID, eventID, switchID)`. Elas nao sao globais e o editor nao fornece acesso direto entre mapas.

**Solucao:**
- Use as script calls com o mapID correto:
  ```javascript
  getSelfSwitchValue(mapID, eventID, switchID)
  setSelfSwitchValue(mapID, eventID, switchID, value)
  ```
- Para dados que precisam ser acessiveis em qualquer mapa, considere usar **Reference Switches** (com `((Nome))` no nome) ao inves de Self Switches.

---

## 4. Eventos spawnados desaparecem ao trocar de mapa

**Problema:** Eventos criados via Spawn Event desaparecem quando o jogador sai e retorna ao mapa.

**Causa:** Por padrao, eventos spawnados sao **temporarios** e sao removidos da memoria ao descarregar o mapa.

**Solucao:**
- Use **"Preserve Spawn: Yes"** no Plugin Command de Spawn Event para que o evento seja preservado entre visitas ao mesmo mapa.
- Se precisar de persistencia permanente, considere usar variaveis globais para rastrear o estado e recriar eventos via evento comum ou mapa.

---

## 5. Event Popup nao funciona

**Problema:** Event Popups nao sao exibidos acima de eventos, jogador ou tiles.

**Causa:** Event Popups dependem do plugin **VisuMZ_1_MessageCore** para funcionar.

**Solucao:**
- Verifique se o plugin VisuMZ_1_MessageCore esta **instalado e ativo** na lista de plugins do projeto.
- Confirme que esta acima do Events & Movement Core na ordem de plugins.
- Lembre-se: Event Popups **nao funcionam durante batalhas**.

---

## 6. Pathfinding imperfeito

**Problema:** Eventos usando pathfinding (`Move To: x, y`) tomam rotas subotimas ou falham ao encontrar caminho.

**Causa:** O pathfinding usa o algoritmo **padrao do RPG Maker MZ**, que nao e garantido encontrar o caminho mais curto em todos os cenarios.

**Solucao:**
- Para movimento mais confiavel e previsivel, use **Move Routes manuais** com roteiro fixo.
- Simplifique o layout do mapa para facilitar o calculo de rota.
- Use `Crash Move To` como alternativa quando eventos precisam forcar passagem por areas com obstaculos simples.

---

## 7. Move Synch com delay

**Problema:** Eventos configurados com Move Synch parecem nao responder ou respondem com atraso em relacao ao alvo.

**Causa:** A notetag `<Move Synch Delay: x>` pode estar configurada com um valor alto de delay.

**Solucao:**
- Verifique a notetag `<Move Synch Delay: x>` no evento e reduza o valor de x (em frames) para diminuir o atraso.
- Se nenhum delay esta configurado explicitamente, verifique os **Plugin Parameters** globais para o valor padrao de Move Synch Delay.
- Confirme se o tipo de Move Synch (Random, Approach, Mimic, etc.) esta correto para o comportamento desejado.

---

## 8. Region-based activation nao dispara

**Problema:** Eventos configurados com Activation Region/Area nao sao ativados quando o jogador entra na region marcada.

**Causa:** Regions podem nao estar pintadas corretamente ou o tipo de trigger pode estar incorreto.

**Solucao:**
- Verifique se as **regions estao efetivamente pintadas** no mapa usando a camada de regions do editor.
- Confirme se o **tipo de trigger** do evento (Action Button, Player Touch, Event Touch, etc.) esta correto para o tipo de activation desejado.
- Atencao: **nao e possivel combinar diferentes tipos de activation tags** no mesmo evento. Escolha apenas um tipo de activation.

---

## 9. Custom Page Conditions nao funcionam

**Problema:** Condicoes customizadas de pagina de evento nao sao avaliadas corretamente.

**Causa:** As condicoes podem estar no formato errado ou usando notetags ao inves de comment tags.

**Solucao:**
- As Custom Page Conditions DEVEM estar em **Comment tags** (comentarios de evento), **nao em Notetags**.
- Use o formato correto:
  ```
  <Page Conditions>
  <Conditions Met>
  // logica de Conditional Branch aqui
  </Conditions Met>
  </Page Conditions>
  ```
- Certifique-se de que os comentarios estao na **pagina correta** do evento (cada pagina tem suas proprias condicoes).

---

## 10. Labels nao aparecem em mobile

**Problema:** Event Labels nao sao exibidos em builds mobile (Android/iOS).

**Causa:** A funcionalidade de labels pode nao estar habilitada para mobile nos Plugin Parameters.

**Solucao:**
- Acesse **Plugin Parameters > Event Label Settings**.
- Verifique se a opcao **"Mobile-Enabled?"** esta ativada.
- Confirme se o range de visibilidade do label e adequado para resolucoes mobile.

---

## 11. Diagonal movement nao funciona

**Problema:** Jogador ou eventos nao se movem em diagonais (8 direcoes).

**Causa:** Movimento diagonal pode nao estar habilitado globalmente ou no mapa especifico.

**Solucao:**
- Verifique se **8-directional movement** esta habilitado nos Plugin Parameters globais do Events & Movement Core.
- Para habilitar apenas em mapas especificos, use a notetag do mapa:
  ```
  <Diagonal Movement: On>
  ```
- Confirme que o sprite do personagem suporta 8 direcoes (formato VS8 ou layout adequado).

---

## 12. Tags de Switch/Variable sao mutuamente exclusivas

**Problema:** Erro ao usar multiplas tags como `<JS>`, `<Self>`, `<Map>` e `<Global>` na mesma Switch ou Variable.

**Causa:** Estas tags definem o **tipo de escopo** da Switch/Variable e sao mutuamente exclusivas por design.

**Solucao:**
- Cada Switch ou Variable pode ter **apenas uma** tag de escopo: `<JS>`, `<Self>`, `<Map>` ou `<Global>`.
- Escolha a tag adequada para o caso de uso:
  - `<Self>` para dados isolados por evento
  - `<Map>` para dados isolados por mapa
  - `<Global>` para dados globais (comportamento padrao)
  - `<JS>` para Switches/Variaveis calculadas dinamicamente
- Se precisar de comportamento combinado, use **script calls** manuais para ler/escrever valores de diferentes escopos.
