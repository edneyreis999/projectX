---
status: implemented
owner: Narrative Designer
quest: A Semifinal
document_kind: as-built narrative flow
contract_version: 2.0.0
runtime_snapshot: 362e2da0
source_of_truth: frontend/data
language: pt-BR
---

# A Semifinal — fluxo narrativo materializado

## Autoridade e escopo

Este documento descreve o fluxo que está materializado no projeto. Em caso de conflito, prevalecem `frontend/data/CoretoQuests.json`, os mapas e bancos de `frontend/data/` e os plugins Coreto ativos.
Os pacotes `.compozy/tasks/010-semifinal-completa` e `.compozy/tasks/011-semifinal-playtest-remediation` permanecem como histórico de decisão e tooling, não como verdade superior ao runtime atual.

Copy exata pertence a `semifinal.dialogos.md`; comandos, posições e recovery pertencem a `semifinal.cutscene.md`; referências sonoras e visuais pertencem aos respectivos documentos disciplinares.

## Resumo

- Quest: `a-semifinal` / “A Semifinal”.
- Variável canônica: `V29`.
- Estado inicial: `0`.
- Estado terminal: `900`.
- Quest anterior: `noite-da-historia`, concluída em `V106 = 90` no mesmo handoff que inicia a semifinal.
- Próxima quest: `fim-de-jogo`, iniciada em `V27 = 1` durante a chegada exterior.
- Conflito: Thorin prioriza o futebol rúnico e sua autonomia; Thordan responde por meio da Guarda de Ferro.
- Resultado fixo: os Machados Enferrujados vencem, Thorin fica com o Elmo Velho e é levado por Killin e Mhordred até a Casa Forja-Prata.
- Decisão expressiva: Gentle evita combate; Resist inicia uma batalha real de Thorin e Filena contra Mhordred. Os dois caminhos convergem na mesma escolta.

## Máquina canônica da quest

Não existe mais uma submáquina funcional em `V111`. Esse ID ainda aparece em campos inativos de páginas herdadas, com `variableValid: false`, mas não controla o tutorial. Toda a semifinal, inclusive
funda, estádio e handoff, usa `V29`.

| Estado | Transição que chega ao estado | Dono materializado           | Resultado observável                                                |
| -----: | ----------------------------- | ---------------------------- | ------------------------------------------------------------------- |
|    `0` | estado inicial                | antes de Map022 E17          | semifinal ainda não iniciada                                        |
|   `10` | `START_STORY`                 | Map022 E17                   | handoff da Noite da História; abertura na Casa Forjaprata           |
|   `20` | `INTRODUCE_JOURNAL`           | Map045 E7                    | diário apresentado e objetivo da funda conhecido                    |
|   `30` | `FOUND_SLING`                 | Map045 E20                   | Funda recebida; comando de equipamento revelado                     |
|   `40` | `LEAVE_EQUIPPED`              | Map045 E7                    | Thorin sai equipado e começa a corrida ao estádio                   |
|   `50` | `ARRIVE_STADIUM`              | Map062 E20                   | chegada ao estádio; `People1` inicia                                |
|   `60` | `REQUIRE_HELMET`              | Map062 E2 após a primeira VN | Dragobur exige um capacete velho equipado                           |
|   `70` | `TAKE_HELMET`                 | Map063 E13                   | Armor 51 recebida e display da estátua alterado                     |
|   `80` | `EQUIP_HELMET`                | Map063 E13 ou Map062 E20     | equipamento reconhecido automaticamente e transformação apresentada |
|   `90` | `AUTHORIZE_FIELD`             | Map062 E2 após a segunda VN  | campo liberado                                                      |
|  `100` | `ENTER_FIELD`                 | Map064 E8                    | elipse narrada da partida armada                                    |
|  `110` | `ESTABLISH_VICTORY`           | Map064 E9                    | vitória estabelecida; finale do estádio armado                      |
|  `120` | `COMMIT_ESCORT`               | Map062 E6                    | escolta comprometida e transferência para Map044                    |
|  `900` | `ARRIVE_HOME`                 | Map044 E10                   | semifinal concluída; `fim-de-jogo.START` executado                  |

`completeQuestAtTerminal` está ativo. Os oito objetivos do diário usam os intervalos `20→30`, `30→50`, `50→60`, `60→70`, `70→80`, `80→90`, `90→110` e `120→900`.

## Fluxo de cenas

### 1. Handoff da Noite da História

Mapas: [022] `EX_Praca_Distrito_Residencial` → [045] `EX_Casa da Família Forjaprata`

Map022 E17, quando a história anterior alcança `20`, executa a saída de Rheed, Animation 35, fade, o vídeo `Cutscene 2`, `a-semifinal.START_STORY`, `noite-da-historia.ARRIVE_MAP045` e uma única
transferência para Map045 `(2,4)`. O mesmo handoff deixa a Noite da História em seu terminal `90` e a semifinal em `10`.

### 2. Pesadelo e apresentação da Casa Forjaprata

Mapas: [045] `EX_Casa da Família Forjaprata` → [049] `VN_Casa_Forjaprata` → [045]

1. Map045 E11 mantém Thorin dormindo, toca `Theme3`, `Wind2` e `Magic2`, faz fade e entra em `ABERTURA_FORJAPRATA`.
2. Map049 E1 valida a sessão e o estado `10`, mostra `Pesadelo1_1` a `Pesadelo1_4` e entrega as quatro falas do pesadelo.
3. Antes do retorno, a VN liga o self switch A de Rheed e das dezoito crianças em Map045.
4. Map045 E36 apresenta o grupo por opacidade crescente após uma única Animation 35. Rheed move-se, apresenta a casa e espera as Gabs; E35/E39 giram, E33 salta e E29 reage.
5. Uma segunda página reduz a opacidade do grupo, prepara Sáparo e o despertar e deixa páginas de recovery estáveis.

Essa apresentação usa self switches locais. Ela não avança `V29`; a quest permanece em `10` até o jogador tentar sair.

### 3. Despertar, diário e Funda

Mapa: [045] `EX_Casa da Família Forjaprata`

1. Sáparo interrompe o sono com “O jogo já começou, seu babão. É melhor correr!”.
2. Na primeira tentativa de sair em `10`, Thorin lembra da Funda, o diário abre e `INTRODUCE_JOURNAL` leva a `20`.
3. Em `20`, o baú E20 concede a arma 1, revela o comando `equip` e executa `FOUND_SLING`, chegando a `30`.
4. Em `30`, a porta só aceita a saída se o ator 3 estiver com a arma 1 equipada.
5. `LEAVE_EQUIPPED` leva a `40` e transfere Thorin para Map044 `(5,22)`. A página posterior continua impedindo a saída sem a Funda equipada.

### 4. Corrida por Gildrat

Mapas: [044] `EX_Distrito Residencial Nobre` → [061] `EX_Distrito_Comercial`

Map044 E18 leva ao Map061 `(4,1)`. Durante `V29 = 40`, E7, E12, E14, E15, E16, E17, E21, E23 e E28 interceptam suas ações normais com a mesma Gab urgente. As páginas usam `ForceGab=true` e
`BypassAntiRepeat=true`; fora de `40`, retomam o comportamento herdado. E3/E5/E20 continuam sendo as entradas válidas do estádio e levam ao Map062 `(1,7)`.

### 5. Chegada e ordem de Dragobur

Mapas: [062] `EX_Estadio` → [065] `VN_Semifinal` → [062]

Map062 E20 detecta a chegada em `40`, inicia `People1`, executa `ARRIVE_STADIUM` e devolve controle em `50`. Dragobur E2 abre `SEMIFINAL_DRAGOBUR_ARRIVAL`; a VN informa atraso, derrota parcial, falta
de capacete e a ordem de buscar um capacete velho qualquer no vestiário. O retorno pelo label `SEMIFINAL_AFTER_ARRIVAL_VN` executa `REQUIRE_HELMET`, mostra a Gab de continuidade e chega a `60`.

E19 permanece como barreira física até `90`. As saídas E15–E17 para o Distrito Comercial também ficam bloqueadas entre `60` e `110`.

### 6. Vestiário, gag e Elmo Velho

Mapa: [063] `EX_Vestiario`

- E6 identifica o vestiário masculino em `60`.
- E7 oferece uma vez, de `50` até antes de `120`, o gag do vestiário feminino: câmera em E2, zoom 200%, balloons, bust, Gab, pausa, reações, Animation 39, `Damage3`, recuo de Thorin e retorno a 100%.
  Self switch A troca a repetição pela linha curta, sem novo impacto.
- E13 já é visível em `50` com filler sem mutação.
- Em `60`, E13 apresenta sete Gabs, concede Armor 51 somente se o inventário ainda não a contém, toca `Open1`, executa `TAKE_HELMET` e abre `Scene_Equip`.
- Em `70`, uma página Parallel reconhece Armor 51 realmente equipada no ator 3. Ela executa `EQUIP_HELMET` e arma um self switch local.
- Em `80`, uma página Autorun estável recua Thorin dois passos, aproxima a câmera a 200%, toca `Equip1`, Animation 91 `Vento 1`, shake, retorna a 100% e entrega as três Gabs “Serviu!” / “Quer
  dizer...” / “Se eu não respirar muito fundo.”.
- Map062 E20 possui a mesma detecção e apresentação para o caso de o jogador equipar depois de voltar ao estádio.

### 7. Bronca e autorização

Mapas: [062] `EX_Estadio` → [065] `VN_Semifinal` → [062]

Em `80`, Dragobur E2 só abre `SEMIFINAL_DRAGOBUR_AUTHORIZATION` se Armor 51 continuar equipada em Thorin. A VN esclarece que ele pediu um capacete velho comum, ouve a justificativa de Thorin e cede
porque precisa do atacante. O retorno pelo label `SEMIFINAL_AFTER_AUTHORIZATION_VN` executa `AUTHORIZE_FIELD`, chega a `90` e mostra a Gab que aponta o campo.

### 8. Elipse da partida

Mapas: [062] → [064] `EX_Campo_de_Futebol_Runico` → [062]

E18/E21 liberam o campo com Armor 51 equipada. Map064 E8 executa `ENTER_FIELD`, chegando a `100`. E9 então:

1. inicia um ciclo `Coreto_Cutscene` e toca Animation 35 no jogador;
2. usa Rheed E9 e o anchor E4 para as seis Gabs;
3. estabelece, nessa ordem, derrota parcial, entrada de Thorin, gol da virada e vitória;
4. toca `Victory1` somente depois da última barrier;
5. põe E4–E7 em opacidade zero;
6. executa `ESTABLISH_VICTORY`, termina o lock e transfere para Map062 `(11,7)`.

O runtime não simula a partida, não abre batalha e não materializa uma sequência adicional de jogadas.

### 9. Celebração, rivais e Guarda de Ferro

Mapas: [062] → [065] → [062] → [065] → [062]

Map062 E6 é o único Autorun do finale em `110`.

1. E5/E14 são reposicionados ainda invisíveis; time e rivais ocupam posições estáveis.
2. `SEMIFINAL_CELEBRATION` apresenta o coro dos Machados, o ataque classista dos Martelos, as respostas do time, o orgulho de Dragobur e o presente narrativo do elmo. Não há novo grant de Armor 51.
3. No retorno EX, a câmera acompanha E7/E8. Os rivais movem-se a `(2,6)/(2,8)`; Killin e Mhordred recebem imagem e movem-se a `(1,7)/(1,8)`.
4. Duas Gabs filler marcam o cruzamento. Os rivais saem para `(0,6)/(0,8)` e ficam transparentes.
5. A câmera passa para Killin; os guardas chegam a `(11,10)/(12,10)`.
6. `SEMIFINAL_GUARD_INTERVENTION` contém ordem, resposta, motivação de Filena e escolha.

### 10. Gentle, Resist e convergência

- Gentle grava temporariamente `$gameTemp._semifinalGuardChoice = "gentle"` e volta ao EX sem batalha.
- Resist grava `"resist"`, volta ao EX, adiciona Filena (ator 4) e abre Battle Processing contra Troop 19, com escape desativado e derrota permitida.
- Troop 19 contém apenas Enemy 91 `Mhordred`. Vitória excepcional e derrota normal saltam para o mesmo cleanup.
- O cleanup restaura HP máximo de Thorin e Filena, remove Filena da party e reidrata as imagens de Killin/Mhordred.
- A variável temporária é apagada; nenhum branch é persistido em switch ou variável de quest.

Na convergência, Killin e Filena falam por Gab. Killin/Mhordred formam-se em `(10,7)/(12,7)` ao redor de Thorin `(11,7)`; depois o trio anda para `(7,7)/(8,7)/(9,7)` e termina voltado para oeste. O
fade ocorre antes de `COMMIT_ESCORT`; em seguida tocam `Move1`, `FinishCutscene` e a única transferência para Map044 `(5,23)`.

### 11. Chegada exterior

Mapa: [044] `EX_Distrito Residencial Nobre`

Map044 E10, em `120`, abre lock, faz fade in, foca o jogador, entrega a fala exterior de Thorin e espera sua conclusão. Só então executa `ARRIVE_HOME`, inicia `fim-de-jogo.START` e encerra o lock.

Killin E16 e Mhordred E15 ficam visíveis e interativos tanto em `120` quanto em `900`. A última página elegível condicionada a `V32 >= 1` faz o cleanup posterior e os oculta. A semifinal devolve
controle fora da casa; entrada e confronto com Thordan pertencem à próxima quest.

## Contratos de continuidade

- Quatro VNs da semifinal usam Map065 e retornam ao mesmo evento de origem por labels transitórios; a abertura continua usando Map049.
- `Coreto_QuestVN` restaura BGM, BGS, tela, menu, save, transparência e followers capturados na origem.
- Todas as cutscenes físicas que usam `Coreto_Cutscene` encerram o lock antes de entrar em VN e o readquirem apenas no label de retorno.
- O estado terminal `900` impede repetição de presente, escolha, batalha, commit e transferência.
- A validação perceptiva pós-remediação não está codificada no runtime e continua separada deste snapshot as-built.
