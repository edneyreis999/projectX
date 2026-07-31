# Domínio: Apresentação de Cenas

## Estado do inventário

Cobertura estática terminal: staging, câmera/transições e timing/cues estão
`covered`; sprites/busts, backgrounds/CGs e fontes estão `mapped`. Composição,
pacing, sincronização, mix, limpeza e percepção visual não foram validados.

Evidência aceita: packet `scene-presentation-designer-001` revisão 1.
Classificação: **inventário de cenas/assets/calls; Playtest humano pendente**.

## Inventário factual

- **Staging:** specs de quests definem beats de cutscene/gameplay, blocking,
  pans, zooms, fades e handoffs. Mapas têm 1.051 textos, 75 escolhas e 988 move
  routes; staging se concentra em Melios, Ekios, Cão Luar, Kravens e Casa
  Forjaprata. Fontes: `n`, `e`.
- **Câmera/transições:** MapCameraZoom ativo tem 101 calls (23 tile, 23 event,
  26 wait, 26 player, três zoom/wait). Dados têm 99 fade-outs, 96 fade-ins, 56
  tints, dez flashes e 18 shakes. ActSeqCamera ativo tem 19 calls em
  CE159/162/163 com resets. Fontes: `e`, `g`.
- **Risco — busts:** VNPictureBusts usa âncora 0.5/1, escala 100% e normalmente
  20 frames, com 327 enters e 208 exits, sobretudo IDs 1–4. Dos 71 busts únicos,
  59 existem e 12 faltam (`Evil_2`, `Evil_6`, `People3_*`); dimensões variam de
  504×672 a 408/418×560. Fontes: `e`, `g`, `a`.
- **Risco — backgrounds/CGs:** não há parallax. Três pares de battleback locais
  1000×740 existem, enquanto mapas nomeiam outros. `Cutscene 2.webm` (15 MB) é
  chamado nos Maps4/5; nenhum registro de CG foi encontrado. Fontes: `e`, `a`.
- **Risco — cues:** 228 waits favorecem 60f (47), 30f (44), 15f (29), 20f (28)
  e 120f (22). Mapas chamam 28 BGM, três BGS, 22 ME e 153 SE; alguns arquivos
  estão ausentes. Fontes: `e`, `g`, `a`.

## Lifecycle EX/VN/Cutscene da Noite da História

O fluxo separa responsabilidades entre mapas: Map022 e Map045 são contextos
EX, enquanto Map046 é o contexto VN. Staging físico, composição da party e a
transferência terminal permanecem em EX; diálogo, escolhas, entrada de nome e
transições da quest executam em VN.

Cada sessão deve parear `EnterVisualNovel` com `FinishVisualNovel`, e cada lock
de `Cutscene` deve parear `begin` com `finish`. O EV030 pode executar a
transição `START` somente quando `V106 == 0`, evitando reinício em reentrada.
O fluxo termina no Map045, coordenadas `(2, 4)`.

Use este lifecycle ao editar mapas ou eventos desse fluxo, sessão VN, locks de
cutscene, transferências e continuidade entre os contextos físico e VN.

## Composição e cleanup de Pictures em Map046

Na composição da cena, Rheed ocupa a Picture 1 à direita e a criança ocupa a
Picture 2 à esquerda. Mudanças de expressão usam `GraphicChange` sobre a
presença já estabelecida; não repetem a entrada do bust. As ramificações de
diálogo devem reconvergir no fluxo comum para que a continuação não dependa da
escolha anterior.

A Cut-In usa a Picture 10 como camada transitória. Ela deve ser apagada antes
de B11, impedindo que a imagem atravesse o próximo beat ou permaneça visível
depois da cena. Esse cleanup é específico da Picture 10 e não autoriza apagar
ou reposicionar outras Pictures ativas.

## Teardown de efeitos transitórios em Map022

Interromper ou apagar o evento controlador impede apenas novos ticks. Um efeito
transitório já criado continua ativo até receber cleanup seletivo por alvo ou
owner; portanto, o teardown do controlador não substitui a remoção explícita do
efeito em andamento.

Nesse mapa, o Event31 é o controlador e o balão pertence ao Event30. O encerramento
deve parar/apagar o Event31 e remover seletivamente do Event30 o balão criado por
esse fluxo, preservando efeitos não relacionados do mesmo alvo e de outros
eventos.

## Coverage materializado

| Requisito | Profundidade | Estado | Evidência |
| --- | --- | --- | --- |
| `scene-presentation-designer.scenes-staging` | `deep` | `covered` | `stg` |
| `scene-presentation-designer.camera-transitions` | `deep` | `covered` | `cam` |
| `scene-presentation-designer.sprites-busts` | `map` | `mapped` | `bust` |
| `scene-presentation-designer.backgrounds-cgs` | `map` | `mapped` | `bg` |
| `scene-presentation-designer.timing-cues` | `deep` | `covered` | `cue` |
| `scene-presentation-designer.source-map` | `map` | `mapped` | `p`, `n`, `e`, `g`, `a` |

## Fontes e rastreabilidade

- `p`: packets aceitos e `docs/index.xml`
- `n`: `docs/Quests/{1,5,6,11,13}/**;GDD/3-historia/**`
- `e`: `frontend/data/{System,MapInfos,CommonEvents,Troops,Map*.json}`; parse
- `g`: `frontend/js/plugins.js`; estrutura/configuração extraída
- `a`: `frontend/{img,audio,movies}`; metadados

## Próxima validação

Playtest humano das cenas concentradas, câmera, resets, fades, busts ausentes,
battlebacks e vídeo. Registrar pacing, sincronização, mix, composição,
transições e cleanup observados; não inferir qualidade pela contagem estática.
