---
status: approved
owner: Technical Artist
quest: A Semifinal
document_kind: technical art contract
contract_version: 2.0.0
authority_model: contract-first
implementation_baseline_reviewed: 362e2da0
asset_manifest: docs/Quests/2-semifinal/tooling/fixtures/assets/asset-manifest.json
structural_validation: passed
human_visual_validation: passed
editor_validation: passed
human_validation_evidence: planos/012-add-harness/PLAYTEST-2026-08-28.md
---

# A Semifinal — contrato de Technical Art

## Autoridade

Este documento é a fonte aprovada para assets, referências, placeholders e critérios visuais da semifinal. Gameplay Engineering materializa os paths e consumidores declarados sem substituir a decisão
do Technical Artist. Divergências do runtime ou dos bytes são não conformidades até que uma nova versão seja aprovada.

O manifest aprovado contém 26 entradas com paths e SHA-256 esperados. A coincidência estrutural prova integridade de arquivo, não adequação estética em editor ou jogo.

## Superfícies consumidoras

| Superfície                        | Uso visual aprovado                                                                |
| --------------------------------- | ---------------------------------------------------------------------------------- |
| Map062 EX_Estadio                 | Dragobur, Filena, Machados, Martelos, reservas, Killin e Mhordred; finale EX/VN    |
| Map063 EX_Vestiario               | quatro jogadoras, display íntegro/alterado da estátua, gag e transformação do elmo |
| Map064 EX_Campo_de_Futebol_Runico | companheiros, adversários e Rheed; elipse da vitória                               |
| Map065 VN_Semifinal               | background 1280×720 e busts das quatro sessões                                     |
| Battle Troop 19                   | battler side-view de Mhordred                                                      |
| menus/equipamento                 | IconSet slot 132 e skin OldHelmet de Thorin                                        |

## Character sheets do estádio

Os sprites extraídos de Estadio1.png/Estadio2.png usam 154×282 RGBA, com grade 3×4 e pivot inferior central.

| Asset                 | Referências serializadas atuais             |
| --------------------- | ------------------------------------------- |
| Estadio/$Companheiro1 | Map064 E1                                   |
| Estadio/$Companheiro2 | Map062 E4; Map064 E3                        |
| Estadio/$Adversario1  | Map062 E8; Map064 E4                        |
| Estadio/$Adversario2  | Map064 E7                                   |
| Estadio/$Adversario3  | Map062 E7; Map064 E5                        |
| Estadio/$Adversario4  | Map064 E6; placeholder duplicado/provisório |
| Estadio/$Torcedor1    | Map062 E10                                  |
| Estadio/$Torcedor2    | Map062 E9                                   |
| Estadio/$Torcedor3    | Map062 E11                                  |

Map064 conserva páginas herdadas adicionais com Actor3/People4. A tabela acima registra referências da família Estadio, não afirma qual página vence para todo valor externo de V61.

## Vestiário e estátua

| Asset                            | Resolução/estado          | Consumidor                                 |
| -------------------------------- | ------------------------- | ------------------------------------------ |
| Estadio/Vestiario/$Menina1       | existente, 154×282 RGBA   | Map063 E5                                  |
| Estadio/Vestiario/$Menina2       | existente, 154×282 RGBA   | Map063 E3                                  |
| Estadio/Vestiario/$Menina3       | existente, 154×282 RGBA   | Map063 E4                                  |
| Estadio/Vestiario/$Menina4       | existente, 154×282 RGBA   | Map063 E2                                  |
| Estadio/Vestiario/!$Capacete.png | existente, 144×384 RGBA   | Map063 E13 em V29 50/60                    |
| Estadio/Vestiario/!$Armadura.png | placeholder, 144×384 RGBA | Map063 E13 em V29 70/80                    |
| Estadio/Vestiario/Cabide.png     | fallback existente        | fonte byte-idêntica dos dois objetos acima |

Os três arquivos Cabide, !$Capacete e !$Armadura têm o mesmo SHA-256:

0a6cb74a791962805dfe59428d9f47d2a2102c887f292a8bae6e2a30fc504635

Os placeholders !$Capacete e !$Armadura possuem bytes idênticos. Essa identidade estrutural, isoladamente, não prova que a estátua pareça sem o capacete; o resultado em contexto foi aceito no reteste
de 2026-08-28. Uma substituição futura permanece opcional até que novo feedback humano demonstre necessidade.

## Elmo Velho, ícone e skin

Armor 51 deve preservar:

| Campo             | Valor                                             |
| ----------------- | ------------------------------------------------- |
| nome              | Elmo Velho                                        |
| descrição         | “Elmo velho que Dragobur usava quando mais novo.” |
| iconIndex         | 132                                               |
| etypeId / atypeId | 3 / 3                                             |
| notetag           | xAnimaSet OldHelmet                               |
| parâmetros        | todos zero                                        |
| preço             | 0                                                 |

O slot 132 do IconSet.png foi restaurado. O arquivo atual é 512×640 RGBA, SHA-256 b18655161c41e6219b2f5298025caeb719cd55291a8e1b44bb7513be58d9ba96.

Actor 3 Thorin declara xAnimaSet Armor e xAnimaSet OldHelmet. O evento de transformação não chama ChangePlayerAnimationSet; a aparência depende do vínculo da armadura com AnimaX. O bust usado nas VNs
depois do elmo é Portraits/Principal/Thorin Helmet.png.

## VN_Semifinal

Background:

- path: frontend/img/parallaxes/VN_Semifinal_BG.png;
- dimensões: 1280×720;
- modo: RGB sem alpha;
- SHA-256: 0470589a8e863ba3a998b61f854d74865024247b1811276cf6a9d9485139ae39;
- consumidor: parallax de Map065;
- origem: geração por imagegen, redimensionada de 1672×941;
- safe area autorada: x 72, y 500, largura 1136, altura 172.

### Busts por sessão

| Sessão                           | Busts referenciados                                                         |
| -------------------------------- | --------------------------------------------------------------------------- |
| SEMIFINAL_DRAGOBUR_ARRIVAL       | Treinador; Thorin Helmet                                                    |
| SEMIFINAL_DRAGOBUR_AUTHORIZATION | Treinador; Thorin Helmet                                                    |
| SEMIFINAL_CELEBRATION            | Futebol/Companheiro1; Futebol/Adversario1; Thorin Helmet; Filena; Treinador |
| SEMIFINAL_GUARD_INTERVENTION     | Treinador; Kilin; Thorin Helmet; Mhordred; Filena                           |

Os busts acima devem coincidir com o manifest. Map065 alterna um bust por vez no Picture ID 1 e limpa IDs 1–10 antes de FinishVisualNovel.

## Mhordred na batalha Resist

Enemy 91 usa:

- nome e battlerName Mhordred;
- Sideview Battler Mhordred;
- Sideview Idle Motion wait;
- ATB Field Gauge Face Bosses, 0;
- sem notetag TP Mode Boss;
- parâmetros 50000 HP, 5000 MP e 500 nos demais;
- apenas Skill 1 na lista de ações.

O asset frontend/img/sv_actors/Mhordred.png existe, mede 676×547 RGBA e tem SHA-256 b78570b443ae133bf48de9441515403215dcee2ff42d3ad621baf6dd6b62311f. Ele continua classificado como placeholder: o
arquivo é um sheet side-view de ator reaproveitado como battler de inimigo. O resultado em contexto foi aceito no reteste humano de 2026-08-28.

## Placeholders e limitações aceitas

| Asset            | Estado estrutural      | Limitação conhecida após o aceite humano                             |
| ---------------- | ---------------------- | -------------------------------------------------------------------- |
| !$Armadura       | carregável e hasheado  | permanece byte-idêntico ao display com capacete                      |
| $Adversario4     | carregável e hasheado  | permanece uma duplicação provisória                                  |
| Mhordred battler | carregável e hasheado  | permanece um sheet de ator reaproveitado como inimigo                |
| VN_Semifinal_BG  | carregável e hasheado  | composição e safe area foram aceitas somente no contexto testado     |
| busts            | existentes e hasheados | expressão, direção, escala e clipping foram aceitos no fluxo testado |

## Requisitos preservados

Gameplay Engineering deve preservar:

1. case exato dos paths;
2. slot 132 de Armor 51;
3. vínculo OldHelmet entre ator e armadura;
4. parallax de Map065;
5. busts consumidos pelas quatro páginas VN;
6. Enemy 91/Troop 19 e o battler Mhordred;
7. distinção entre integridade estrutural e aceite visual.

Editor e reteste humano observaram V29 50/60/70/80, a transformação nos dois owners possíveis, as quatro VNs, a elipse no campo e a batalha Resist. Os gates visual e de editor passaram na evidência
`planos/012-add-harness/PLAYTEST-2026-08-28.md`; `structural_validation` permanece uma alegação separada.
