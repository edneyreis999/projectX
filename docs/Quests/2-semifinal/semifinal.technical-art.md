---
status: approved
owner: Technical Artist
quest: A Semifinal
contract_version: 1.0.0
asset_manifest: .compozy/tasks/011-semifinal-playtest-remediation/fixtures/assets/asset-manifest.json
technical_handoff: approved
human_visual_validation: pending
editor_validation: pending
runtime_playtest: pending
---

# A Semifinal — Contrato de Technical Art

## Autoridade, aprovação e fronteiras

Este documento é a autoridade de Technical Art para inventário, direção de geração, seleção de placeholder, formatos, dimensões, alpha, frames, pivots, safe areas e handoff asset-runtime da semifinal. Scene Presentation continua dona de staging e composição em cena; Narrative Design continua dona de identidade, expressão e intenção; Gameplay Engineering continua dono das referências finais em mapas, bancos, plugins e eventos; QA e Playtest continuam donos da evidência executada.

`status: approved` e `technical_handoff: approved` significam apenas que os arquivos estão materializados, identificados, estruturalmente carregáveis e ligados ao manifest. Não significam que RPG Maker MZ abriu os arquivos, que a composição ficou adequada em cena, que não há clipping, que o placeholder parece final ou que houve Playtest. Todas essas decisões permanecem `pending`.

Esta entrega não autoriza editar `frontend/data/*.json`, bancos, mapas, plugins, notetags, contratos de outras disciplinas ou evidência humana.

## Fontes consultadas

- `.compozy/tasks/011-semifinal-playtest-remediation/_spec.md`, `_user_stories.md`, `_dx.md`, `_tests.md`, `_tasks.md` e `task_02.md`.
- ADR-001, ADR-003, ADR-004 e ADR-007 da linhagem 011; ADR-005 informa o placeholder de batalha.
- `docs/domains/technical-artist/README.md` para o contrato de intake e a separação entre checks técnicos e estética.
- `docs/Quests/2-semifinal/semifinal.cutscene.md`, `semifinal.dialogos.md`, `semifinal.audio.md` e `semifinal.NSD.fluxo-cenas.md` para consumidores, estados, staging, speakers e fronteiras EX/VN.
- `frontend/data/Map044.json`, `Map061.json`, `Map062.json`, `Map063.json` e `Map064.json`, inspecionados somente em leitura.
- `frontend/img/characters/Estadio/Estadio1.png`, `Estadio2.png` e `Vestiario/Cabide.png` como fontes existentes.
- `frontend/img/pictures/Portraits/Futebol/`, `Portraits/Principal/`, `frontend/img/parallaxes/` e `frontend/img/sv_actors/Mhordred.png` como inventário de reuso.

## Conflitos resolvidos

1. `_spec.md` define o role machine-checkable `battler`; `_dx.md` lista apenas quatro roles no texto de intake. O schema de `_spec.md`, UT-049 e o requisito explícito de não omitir Mhordred prevalecem. `battler` integra o manifest e usa `frontend/img/sv_actors/Mhordred.png` como placeholder técnico.
2. A build atual ainda contém páginas V29 legadas que serão corrigidas pelo Gameplay writer downstream. Para esta task, reachability cobre os 14 estados canônicos e também registra os assets das páginas atualmente observáveis que o plano 011 torna alcançáveis; nenhuma página de Map010 fornece waiver.
3. O arquivo `Cabide.png` contém o estado de capacete e suporte. A tentativa de remover apenas o capacete via imagegen produziu fundo preto e drift de sheet, portanto foi rejeitada. `!$Armadura.png` usa `Cabide.png` como placeholder existente e permanece provisório; isso evita path ausente sem inventar aprovação visual.
4. Não existia background de estádio 1280×720 adequado. Foi gerado `VN_Semifinal_BG.png`, mas sua adequação para as quatro VNs continua pendente de revisão em editor, cena e Playtest.

## Contrato de reachability

O resolver 011-local avalia a última página elegível nos estados V29 `0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 900`. Ele coleta `page.image.characterName`, argumentos aninhados de comandos de plugin e os consumidores semânticos abaixo. Switches, self-switches, itens, atores e variáveis que não sejam V29 entram por um `conditionResolver` explícito; não são presumidos como verdade para ocultar ou inventar página.

Os quatro consumidores VN são:

| Sessão | Background | Busts mínimos | Safe-area crítica |
| --- | --- | --- | --- |
| `SEMIFINAL_DRAGOBUR_ARRIVAL` | `VN_Semifinal_BG.png` | Thorin e Dragobur | caixa inferior livre; speakers nas bordas |
| `SEMIFINAL_DRAGOBUR_AUTHORIZATION` | `VN_Semifinal_BG.png` | Thorin com elmo e Dragobur | leitura da reação sem cobrir texto |
| `SEMIFINAL_CELEBRATION` | `VN_Semifinal_BG.png` | Thorin, Dragobur, Filena, Machados e Martelos | alternância de grupo sem caricatura de classe |
| `SEMIFINAL_GUARD_INTERVENTION` | `VN_Semifinal_BG.png` | Thorin, Filena, Killin e Mhordred | choice e patente legíveis; cleanup total |

O manifest registra somente paths reais. Um missing alcançável retorna `reference_missing` mesmo se Map010 tiver usado o mesmo nome.

## Inventário e decisões

### Character sheets do estádio

`Estadio1.png` e `Estadio2.png` são atlases RGBA de 616×564. Cada destino `$` foi derivado por crop sem resampling de 154×282, preservando o bloco 3×4, alpha, frame geometry e pivot inferior central. O manifest registra o crop exato em `source`.

| Destinos | Fonte | Resolução | Consumidores |
| --- | --- | --- | --- |
| `$Adversario1`–`$Adversario4` | `Estadio1.png` | existing/retargeted; `$Adversario4` é placeholder duplicado provisório | Map062 E7/E8; Map064 E4–E7 |
| `$Companheiro1`–`$Companheiro2` | `Estadio1.png` | existing/retargeted | Map062 E4; Map064 E1/E3 |
| `$Torcedor1`–`$Torcedor3` | `Estadio1.png` / `Estadio2.png` | existing/retargeted | Map062 E9/E10/E11 |

### Vestiário e estátua

| Destino | Fonte | Resolução | Estado/consumidor |
| --- | --- | --- | --- |
| `$Menina1`–`$Menina4` | quadrantes inferiores de `Estadio2.png` | existing/retargeted | Map063 E2–E5 |
| `!$Capacete.png` | `Vestiario/Cabide.png` byte-idêntico | existing/retargeted | Map063 E13 em V60 |
| `!$Armadura.png` | `Vestiario/Cabide.png`, registrado no manifest como fallback técnico | placeholder | Map063 E13 em V70/V80 |
| `IconSet.png`, slot 132 | slot 132 do `IconSet.png` legado em `5540b524` | existing/retargeted | Armor 51 `Elmo Velho` |

Os objetos `!$` mantêm 144×384 RGBA, células 48×96 e pivot inferior central. O placeholder de armadura pode carregar, mas ainda pode falhar semanticamente por mostrar o capacete; isso é deliberadamente visível na matriz humana e não é tratado como asset final.

O banco já apontava Armor 51 para `iconIndex: 132`, mas esse slot estava transparente no `IconSet.png` atual. A remediação restaura exatamente o tile legado de 32×32 no mesmo índice e verifica que nenhum pixel fora do slot mudou; adequação e leitura no menu continuam pendentes de Playtest humano.

### VNs e busts

- Background gerado: `frontend/img/parallaxes/VN_Semifinal_BG.png`, 1280×720 RGB sem alpha. Safe area de texto: `(72,500,1136,172)` no canvas 1280×720.
- Reuso principal: `Thorin Helmet.png`, `Treinador.png`, `Filena.png`, `Kilin.png`, `Mhordred.png`.
- Reuso coletivo: `Portraits/Futebol/Companheiro1.png` e `Adversario1.png` como identidades mínimas de Machados e Martelos.
- Todos os busts preservam pixels e alpha existentes; o manifest não afirma que expressão, escala ou direção de olhar já passaram em cena.

Prompt final do background, executado com built-in imagegen:

> RPG Maker MZ VN background; wide runic-football stadium interior in a dwarven working district; stone-and-metal architecture, rune-marked pitch, modest stands, warm afternoon light; inked fantasy storybook style in muted sepia/ochre; lower 32% quiet for dialogue and both edges free for busts; no foreground people, text, logo, watermark, UI or modern branding.

O resultado original 1672×941 foi resampled uma vez para 1280×720 e o checksum final está no manifest.

### Battler

`frontend/img/sv_actors/Mhordred.png` existe, é RGBA 676×547 e foi selecionado como placeholder load-safe do futuro Enemy de Mhordred/Troop 19. O role `battler` está aprovado para handoff técnico. Compatibilidade real do sheet com o renderer inimigo, escala, pivot, leitura da força e duração perceptiva da batalha continuam pendentes.

## Manifest e verdade técnica

O manifest `semifinal-assets/v1` registra por entrada:

- role incluindo `battler`;
- path repo-relative e case-sensitive;
- dimensões e alpha lidos do PNG;
- anchor e safe area no canvas 1280×720;
- consumidores semânticos;
- SHA-256 dos bytes finais;
- resolution `existing`, `generated` ou `placeholder`;
- fonte/crop/fallback quando aplicável, com todo fallback registrado também como entrada do manifest;
- `technicalArtistReview: approved` e `humanVisualReview: pending`.

O resolver pode provar schema, path exato, PNG estrutural, checksum, dimensões, alpha, consumidor, reachability e fallback existente. Ele não pode aprovar estilo, composição, clipping, legibilidade, coerência contextual, deployment real ou adequação do placeholder.

## Matriz de inspeção humana pendente

Nenhum resultado abaixo foi executado.

| Grupo | Editor | Cena 1280×720 | Playtest | Critérios humanos |
| --- | --- | --- | --- | --- |
| jogadores e reservas do estádio | pending | pending | pending | frames/direções, escala, pivot, limites horizontais, distinção e colisão percebida |
| jogadoras do vestiário | pending | pending | pending | identidade, animação, clipping, contexto e navegação |
| `!$Capacete` | pending | pending | pending | leitura do elmo, estado V60, pivot e interação |
| `!$Armadura` placeholder | pending | pending | pending | ausência perceptível do elmo; reprovar se o fallback comunicar estado errado |
| `VN_Semifinal_BG` | pending | pending | pending | estilo, safe area, contraste, gate/festa/guardas e continuidade EX/VN |
| busts VN | pending | pending | pending | speaker, expressão, direção de olhar, escala, clipping e choice |
| battler Mhordred placeholder | pending | pending | pending | load real, compatibilidade do renderer, escala, pivot e leitura de poder |

Cada execução futura deve registrar observação, resultado, evidência, tester e data. Um pass estrutural não altera nenhum `pending` desta matriz.

## Handoff para Gameplay e QA

Gameplay deve consumir o hash atual deste contrato e do manifest, validar as referências finais depois de planejar as páginas canônicas e bloquear qualquer divergência com erro estável. Nenhum writer pode escolher outro path silenciosamente, usar nome com case diferente, omitir o battler ou restaurar a whitelist herdada de Map010.

QA deve abrir os assets no editor e nas cenas reais, cobrir os estados V50/V60/V70/V80/V90/V110/V120 e as quatro VNs, e manter placeholders como provisórios até decisão humana explícita.
