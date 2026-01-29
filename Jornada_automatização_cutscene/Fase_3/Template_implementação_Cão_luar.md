# Design de Cutscene

**Descrição:** Segunda parte da quest Primeiro Contrato: Thorin sai da Taverna, atravessa o Distrito Comercial e encontra o grupo na Estrada do Cão-luar; entrega do contrato, conflitos com Borin e divisão de times até a partida para Kravens.
**Cutscene:** Caminho ao Encontro e Partida
**Mapa onde acontece:**

* Estrada do Cão Luar - frontend/data/Map017.json

**Personagens Envolvidos:**

* Thorin (Jogador) (ID: `player`)
* Balastrus (ID: `4`)
* Filena (ID: `23`)
* Borin (ID: `29`)
* Brutus (ID: `3`) (lacaio de Balastrus)
* Kilin (ID: `8`) (guarda real)
* Mhordred (ID: `9`) (guarda real)
* Tharok (ID: `10`) (guarda real)

**Bustos Envolvidos:**

* Thorin (ID: `1`, arquivo: `Portraits/Principal/Thorin.png`)
* Balastrus (ID: `2`, arquivo: `Portraits/Principal/Balastrus.png`)
* Filena (ID: `2`, arquivo: `Portraits/Principal/Filena.png`)
* Borin (ID: `2`, arquivo: `Portraits/Principal/Borin.png`)
* Brutus (ID: `2`, arquivo: `Portraits/Principal/Tusk.png`) (placeholder)
* Kilin (ID: `2`, arquivo: `Portraits/Principal/Kilin.png`)
* Mhordred (ID: `2`, arquivo: `Portraits/Principal/Mhordred.png`)
* Tharok (ID: `2`, arquivo: `Portraits/Principal/Tharok.png`)

## Observações

* Sempre que for usar o plugin de bustos, há um exemplo que você pode seguir como referência no mapa 12 - frontend/data/Map012.json.
* Brutus deve substituir o personagem Tusk no mapa 17.
* Inserir Borin na cena (não confundir com o NPC Borrin).
* IDs de personagens são os já existentes nas outras cenas.
* Para personagens sem busto oficial, usar qualquer busto disponível.
* Posições no Map017: Brutus (16,13), Filena (15,13), Borin (14,13), Balastrus (18,12), Kilin (22,17), Mhordred (22,16), Tharok (22,15).
* Sempre que subir o número da variável, usar `fade out`, trocar variável, `fade in`.

## Variáveis Utilizadas na cena

* v_q_primeiro_contrato_progress (ID `30`) = `5` (inicio da caminhada)
* v_q_primeiro_contrato_progress (ID `30`) = `6` (chegada à Estrada do Cão-luar)
* v_q_primeiro_contrato_progress (ID `30`) = `7` (entrega do contrato ao lacaio)
* v_q_primeiro_contrato_progress (ID `30`) = `8` (divisão de times / início da marcha)

## Posições de Bustos

* Os bustos de Thorin devem sempre estar na posição 1.
* Os bustos dos demais personagens ficam na posição 5.

## 🎞️ Roteiro de Ações - Beat por Beat

| Cena | Personagem | Ação - movimento do personagem | Detalhes (parâmetros) | esperar (true/false) | Notas de Direção | Falas |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `2A_distrito_comercial` | `system` | `objective` | `Ir até a Estrada do Cão-luar` | `true` | Atualizar objetivo após sair da Taverna | |
| `2A_distrito_comercial` | `system` | `fade out` | `?` | `true` | Início da transição de variável | |
| `2A_distrito_comercial` | `system` | `var` | `v_q_primeiro_contrato_progress, 5` | `true` | Início da caminhada | |
| `2A_distrito_comercial` | `system` | `fade in` | `?` | `true` | Fim da transição de variável | |
| `2A_distrito_comercial` | `Thorin` | `script` | `player_control on` | `true` | Jogador atravessa o Distrito Comercial | |
| `2B_chegada_cao_luar` | `system` | `script` | `transfer to Map017 (Estrada do Cão Luar)` | `true` | Transição para a Estrada do Cão-luar | |
| `2B_chegada_cao_luar` | `Thorin` | `script` | `move to ?,?` | `true` | Thorin chega ao ponto de encontro | |
| `2B_chegada_cao_luar` | `system` | `fade out` | `?` | `true` | Início da transição de variável | |
| `2B_chegada_cao_luar` | `system` | `var` | `v_q_primeiro_contrato_progress, 6` | `true` | Chegada à Estrada do Cão-luar | |
| `2B_chegada_cao_luar` | `system` | `fade in` | `?` | `true` | Fim da transição de variável | |
| `3A_fura_olho` | `camera` | `focus on` | `Borin` | `true` | Thorin vê Borin conversando com Filena | |
| `3A_fura_olho` | `camera` | `focus on` | `Filena` | `true` | Reforçar o ciúme de Thorin | |
| `3B_entrega_contrato` | `Thorin` | `script` | `move to ?,?` | `true` | Thorin vai até o lacaio de Balastrus | |
| `3B_entrega_contrato` | `Brutus` | `talk` | `?` | `true` | Lacaio provoca Thorin antes da entrega | `?` |
| `3C_insulto` | `Brutus` | `talk` | `?` | `true` | Entrega da picareta e carta de acesso | `?` |
| `3C_insulto` | `system` | `fade out` | `?` | `true` | Início da transição de variável | |
| `3C_insulto` | `system` | `var` | `v_q_primeiro_contrato_progress, 7` | `true` | Contrato entregue ao lacaio | |
| `3C_insulto` | `system` | `fade in` | `?` | `true` | Fim da transição de variável | |
| `3D_interrompe_conversa` | `Thorin` | `script` | `move to ?,?` | `true` | Thorin se aproxima de Borin e Filena | |
| `3E_filhinho_de_papai` | `Borin` | `talk` | `?` | `true` | Borin confronta Thorin | `?` |
| `3F_obedece_quem_tem_juizo` | `Balastrus` | `talk` | `?` | `true` | Balastrus manda calar e organiza o grupo | `?` |
| `4A_oracao` | `Thorin` | `talk` | `?` | `true` | Thorin sussurra que quer ficar com Filena | `?` |
| `4B_nao_se_pode_ter_tudo` | `Borin` | `talk` | `?` | `true` | Borin provoca Thorin após divisão inicial | `?` |
| `4C_guardioes` | `Kilin` | `talk` | `?` | `true` | Guardas chegam e discutem com Balastrus | `?` |
| `4C_guardioes` | `Mhordred` | `talk` | `?` | `true` | Continuação da discussão | `?` |
| `4D_enxerido` | `system` | `choice` | `Aproximar para ouvir?` | `true` | Jogador escolhe se aproxima ou não | |
| `4E_mudanca_de_mare` | `Balastrus` | `talk` | `?` | `true` | Balastrus muda a escala e inicia a marcha | `?` |
| `4E_mudanca_de_mare` | `Filena` | `talk` | `?` | `true` | Filena reage por estar no mesmo time | `?` |
| `4E_mudanca_de_mare` | `system` | `fade out` | `?` | `true` | Início da transição de variável | |
| `4E_mudanca_de_mare` | `system` | `var` | `v_q_primeiro_contrato_progress, 8` | `true` | Divisão de times / início da marcha | |
| `4E_mudanca_de_mare` | `system` | `fade in` | `?` | `true` | Fim da transição de variável | |
| `4E_mudanca_de_mare` | `system` | `script` | `start march / party formation` | `true` | Partida para Kravens | |

---

## Regras

* Sempre que faltar informação, pergunte.
* O comando Balão (balloon de expressao) não pode ser executado entre os comandos `start_dialog` e `finished_dialog`.
* Durante os diálogos, as expressões dos atores devem ser representadas por alterações no busto.
* Sempre que um comando de `move`, `transparent` ou `turn` for usado, os bustos devem sair da tela.
* O busto do personagem correspondente sempre deve aparecer quando ele falar.
* Sempre aplicar `wait` quando um balão for usado antes de um busto entrar em cena.
* Sempre aplicar `wait` em comandos de rota de movimento; se houver varios comandos de rota seguidos, aplique o `wait` apenas no último da sequência.
* Toda ação de rota de movimento seguida e com o mesmo personagem deve ser condensada em um único comando.
* Sempre utilizar antes de cada fala no sistema de bustos os Switches de Numero 43 a 46, que são selecionados com base no ID de cada busto. Sempre que o ID de busto for 1, o Switche usado será o 43, sempre que o busto tiver ID 2, o Switche 44, quando o busto usado tiver o ID 3, o Switche 45 deve estar ativo e, sempre que o busto utilizado corresponder ao ID 4, o Switche número 46 será obrigatório antes da fala daquele personagem.

## Referências Rápidas de Comandos (Cutscene Director Pro)

### Câmera & Visual

* **Foco:** `focus on` | *Detalhes:* `character_id`
* **Zoom:** `zoom` ou `focus zoom` | *Detalhes:* `in` ou `out`
* **Barras Pretas:** `cinematic` | *Detalhes:* `true` (ativar) ou `false` (desativar)
* **Tremer:** `shake` | *Detalhes:* (vazio)
* **Flash:** `flash` | *Detalhes:* `r,g,b,duration` (ex: `255,255,255,30`)
* **Tom:** `tone` | *Detalhes:* `r,g,b,gamma,duration`

### Personagem

* **Mover:** `move` | *Detalhes:* `x,y`
* **Teleportar:** `teleport` | *Detalhes:* `x,y`
* **Virar:** `turn` | *Detalhes:* `up`, `down`, `left`, `right`
* **Falar:** `talk` | *Detalhes:* "Texto entre aspas" (Obrigatorio aspas se usar virgula)
* **Balão:** `balloon` | *Detalhes:* ID do icone (1-8)
* **Transparência:** `transparent` | *Detalhes:* `true` ou `false`

### Áudio

* **Música:** `bgm` | *Detalhes:* `play, filename, volume, loop` ou `fade out, duration`
* **Som:** `sound` | *Detalhes:* `filename` (SE)
* **Voz:** `voice` | *Detalhes:* `filename`

### Sistema

* **Variável:** `var` | *Detalhes:* `ID, valor`
* **Switch:** `switch` | *Detalhes:* `ID, on/off`
* **Common Event:** `callCommon` | *Detalhes:* `ID`
* **Espera Manual:** `wait` | *Detalhes:* `frames`
