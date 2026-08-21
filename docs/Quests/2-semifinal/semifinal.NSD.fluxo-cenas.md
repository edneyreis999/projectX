# 🎮 Narrative Structure Document (NSD) - Fluxo Visual De Cenas

## 📄 Quest: A Semifinal

> **Autoridade atual:** fluxo narrativo reconciliado pela spec corretiva `.compozy/tasks/011-semifinal-playtest-remediation/_spec.md` e seus ADRs. O pacote 010 permanece baseline histórico. Falas finais pertencem a `semifinal.dialogos.md`; staging, áudio e runtime pertencem às disciplinas responsáveis.

### 1️⃣ Resumo Geral _(Checkpoint 0)_

\[x] **Concluído**

- **Nome da quest**: A Semifinal
- **Importância na campanha**: Main + Tutorial
- **Variável de controle geral**: [029] `v_qSemifinal_progress`
- **Controle local da Casa Forjaprata**: [111] `v_qTutorialFundaForjaprata_stage` (`0` → `10` → `20` → `90`, terminal local)
- **Arco narrativo**: Ato I — Mundo Comum
- **Quest anterior**: Noite da História
- **Conflito central**: A liberdade e paixão por futebol rúnico de Thorin entram em choque com a autoridade e o controle impostos por seu pai, o General Thordan.
- **Objetivo narrativo global**: Apresentar Thorin, destacando seu traço de irresponsabilidade, sua paixão e excelência no futebol rúnico, e instaurar o conflito entre a independência do protagonista
  e a autoridade de seu pai, o poderoso General Thordan.
- **Premissa resumida**: Após despertar de um pesadelo premonitório, o talentoso porém indisciplinado Thorin corre contra o tempo para garantir a vitória em um jogo de futebol rúnico. Mas durante a
  comemoração, um grupo de guardas reais, a mando de seu pai, exige que Thorin volte para casa.
- **Resumo**: Thorin, um jovem talentoso mas indisciplinado, acorda de um sonho premonitório e, atrasado, corre por Gildrat para participar da semifinal de futebol rúnico. Após garantir a vitória do
  seu time, sua celebração é interrompida por guardas reais enviados pelo pai, o General Thordan, destacando o conflito entre sua liberdade e a autoridade do pai.
- **Locais principais**:

  - Casa da Família Forjaprata,
  - Distrito Residencial,
  - Distrito comercial de Gildrat,
  - Campo de futebol rúnico
  - Vestiário do campo

- **NPCs principais**:
  - Thorin
  - Mélia (mãe de Thorin)
  - Sáparo-boca-de-corneta
  - Theodore Rheed e as crianças da Noite da História (na apresentação da Casa Forjaprata)
  - Dragobur
  - Filena
  - Thordan
  - Killin
  - Mhordred
  - Companheiros de time
  - Time adversário
  - Torcida nas arquibancadas
  - Pessoas do vestiário

---

### 2️⃣ Pré-condições Narrativas _(Checkpoint 1)_

- [x] **Concluído**

| Tipo                                 | Descrição                                                                           |
| ------------------------------------ | ----------------------------------------------------------------------------------- |
| **Flags / Decisões anteriores**      | “Noite da História” deve ter chegado ao estado terminal `90`; o nome da criança já foi definido na VN. |
| **Estado emocional do protagonista** | Apressado e ansioso, recém-desperto de um pesadelo                                  |
| **Limitações ou bloqueios**          | No Distrito Comercial, acesso ao caminho do Castelo e ao World Map estão bloqueados |

---

## 3️⃣ Fluxo Visual De Cenas Resumido _(Checkpoint 2)_

- [ ] **Concluído**

### Tabela de Cenas

| #   | Nome da Cena          | Cronologia (ordem dos eventos)                                                                  | Premissa                                                                                                                 |
| --- | --------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| 1   | Pesadelo e Casa Forjaprata | Thorin adormecido → quatro quadros do pesadelo → retorno ao quarto → Rheed e as crianças materializam → apresentação da casa → reações infantis → grupo desaparece | Conectar a moldura narrativa da Noite da História ao primeiro cenário da vida de Thorin. |
| 2   | Alvorada Atrasada     | Thorin desperta → Sáparo avisa → tentativa de sair introduz o diário → pegar e equipar a funda → saída para o Distrito Residencial | Thorin acorda atrasado e precisa recuperar a funda antes de deixar a Casa Forjaprata. |
| 3   | Corrida Urgente por Gildrat | Distrito comercial → nove bloqueios contextuais no V40 → rota do estádio | A urgência permanece legível sem transferências laterais nem Gabs empilhadas. |
| 4   | Bronca de Dragobur | EX fecha o field gate → VN de chegada/bronca/resposta → Gab de retomada → ordem ao vestiário | Dragobur pede um capacete velho comum e Thorin recebe um objetivo inequívoco. |
| 5   | Estátua da Seleção de Ouro | Gag opcional → estátua íntegra → erro obrigatório de Thorin → estado alterado → equipamento manual | Thorin improvisa com o elmo histórico que Dragobur não pediu. |
| 6   | Autorização para o Campo | Retorno equipado → VN de bronca e defesa de Thorin → autorização pragmática → Gab de retomada | O erro escala a comédia e Dragobur cede porque precisa do atacante antes do fim. |
| 7   | Elipse Narrada da Virada | Campo EX → Rheed/crianças → derrota parcial → entrada → gol → vitória | Os quatro fatos causais substituem a partida jogável sem simular gameplay. |
| 8   | Celebração Interrompida | EX posiciona → VN celebra/rivaliza/presenteia → EX troca rivais por guardas → VN ordena/escolhe → EX Gentle ou batalha Resist → convergência | Classe, pertencimento e coerção recebem foco sem apagar a geografia do estádio. |
| 9   | Escolta e Handoff Exterior | Filena permanece → somente Thorin sai carregado → chegada fora da casa → próxima quest | A semifinal termina na chegada observável e devolve controle no exterior. |

### Beats por Cena

#### Cena 1 – Pesadelo e Casa Forjaprata

Mapas: [045] `EX_Casa da Família Forjaprata` → [049] `VN_Casa_Forjaprata` → [045] `EX_Casa da Família Forjaprata`

> **Status:** este recorte está implementado. A descrição abaixo registra o comportamento atual dos eventos.

| ID | Título | Premissa resumida | Tipo |
| --- | --- | --- | --- |
| **1-A** | **Thorin adormecido** | Na Casa Forjaprata, Thorin permanece com a animação de sono enquanto música, vento e efeito mágico preparam a passagem para a VN. | 🎬 |
| **1-B** | **Quatro quadros do pesadelo** | A VN exibe `Pesadelo1_1` a `Pesadelo1_4`, com fades entre os quadros e as falas “Meu filho... Thorin...”, “Você precisa...”, “Rápido...” e “O QUÊ!?”. | 🎬 |
| **1-C** | **Retorno à casa** | A VN termina e ativa Rheed e dezoito crianças na origem [045], mantendo Thorin no quarto como cenário da história contada. | 🎬 |
| **1-D** | **Materialização do grupo** | Rheed e as crianças surgem gradualmente após uma única Animação 35. | 🎬 |
| **1-E** | **Rheed toma posição** | Rheed anda para a esquerda, para cima e novamente para a esquerda, termina em `(9,5)`, vira-se para baixo e só então fala. | 🎬 |
| **1-F** | **Apresentação da Casa Forjaprata** | Rheed diz: “Então, crianças, esta é a Casa da Família Forjaprata!”. A Gab é não forçada e sua conclusão é aguardada. | 🎬 |
| **1-G** | **Reações das crianças** | E35 e E39 giram rapidamente; E33 olha para cima, salta e diz “Parece de verdade...”; E29 diz “Uau!” e gira mais devagar, com pausas. Todas terminam voltadas para cima. | 🎬 |
| **1-H** | **Retorno à história** | Depois de todas as reações, Rheed diz: “HAHAHAHA! agora vamos voltar para história”. A conclusão da Gab é aguardada antes do fade. | 🎬 |
| **1-I** | **Desaparecimento e limpeza** | Rheed e as crianças perdem opacidade e são retirados da cena; o cleanup também prepara Mélia e Sáparo para o despertar, sem repetir a animação de materialização. | 🎬 |

#### Cena 2 – Alvorada Atrasada

Mapa: [045] `EX_Casa da Família Forjaprata`

> **Status:** o despertar, o tutorial da funda e a saída da casa estão implementados. Esta revisão não altera a especificação das cenas posteriores.

| ID | Título | Premissa resumida | Tipo |
| --- | --- | --- | --- |
| **2-A** | **Despertar** | Após a saída de Rheed e das crianças, a apresentação retorna ao quarto, a animação de sono termina e Thorin recupera o controle da cena. | 🎬 |
| **2-B** | **Aviso de Sáparo** | Sáparo diz: “O jogo já começou, seu babão. É melhor correr!”. Em interações seguintes, reforça a pressa com uma Gab própria. | 🎬 |
| **2-C** | **Semifinal em andamento** | [029] `v_qSemifinal_progress` passa a `2` e a descrição de save é atualizada para `aSemifinal`. | 🎬 |
| **2-D** | **Tentativa de sair** | Se Thorin tentar sair com o tutorial no estado `0`, percebe que esqueceu a funda; a transição `INTRODUCE_JOURNAL` leva o estado a `10`, ativa a quest e abre o diário. | 🎮 |
| **2-E** | **Encontrar a funda** | No estado `10`, o jogador abre o baú em `(19,14)`, recebe a arma Funda, revela o comando de equipamentos e avança por `FOUND_SLING` para o estado `20`. | 🎮 |
| **2-F** | **Equipar antes de sair** | A porta impede a saída enquanto a Funda não estiver equipada por Thorin e apresenta uma Gab explicando o requisito. | 🎮 |
| **2-G** | **Saída da Casa Forjaprata** | Com a Funda equipada, `LEAVE_EQUIPPED` encerra o tutorial local em `90` e Thorin é transferido para [044] `EX_Distrito Residencial Nobre`, em `(5,22)`. Uma página de recuperação repete a validação do equipamento caso a transferência seja interrompida. | 🎮 |

> O registry controla a visibilidade dos objetivos 1 e 2 de `aSemifinal`. O
> objetivo 2 (“Corra até o estádio...”) fica visível em `20`, mas sua conclusão
> permanece externa a esta submáquina porque ocorre no fluxo geral da quest,
> fora da Casa Forjaprata. Por isso `completedAt` é `null` e
> `completeQuestAtTerminal` é `false`: o terminal `90` encerra apenas o tutorial
> local, não a quest `aSemifinal` inteira.

#### Cena 3 – Corrida Urgente por Gildrat

Mapa: [061] `EX_Distrito_Comercial`

| ID | Título | Premissa resumida | Tipo |
| --- | --- | --- | --- |
| **3-A** | **Urgência assumida** | Thorin entra no distrito atrasado e mantém o estádio como destino legível. | 🎮 |
| **3-B** | **Família de bloqueios V40** | Map061 E12, E21, E7, E28, E23, E14, E15, E16 e E17 impedem a ação/transferência normal e usam uma Gab urgente contextual. | 🎮 |
| **3-C** | **Sem empilhamento** | Repetir ou alternar bloqueios substitui a Gab anterior; nenhum evento cria estado, recompensa ou transferência. | 🎮 |
| **3-D** | **Fim do bloqueio** | Fora do V40, a família urgente deixa de mascarar o comportamento canônico aprovado de cada evento. | 🎮 |
| **3-E** | **Entrada no estádio** | A rota canônica leva ao estádio atual e encerra o estado de corrida somente pela chegada observável. | 🎮 |

#### Cena 4 – Bronca de Dragobur

Mapas: [062] `EX_Estadio` → `VN_Semifinal` → [062] `EX_Estadio`

| ID | Título | Premissa resumida | Tipo |
| --- | --- | --- | --- |
| **4-A** | **Entrada fisicamente fechada** | Dragobur E2 e o E19 sem imagem ocupam dois tiles; E19 em `(12,5)` mantém colisão e fala contextual até V90. | 🎮 |
| **4-B** | **VN de chegada** | `SEMIFINAL_DRAGOBUR_ARRIVAL` apresenta atraso, derrota parcial, confiança de Thorin, segurança e respostas dos dois. | 🎬 VN |
| **4-C** | **Pedido correto** | Dragobur manda Thorin buscar um capacete velho comum no vestiário; não aponta a estátua da Seleção de Ouro. | 🎬 VN |
| **4-D** | **Retomada** | A VN conclui em V60 e uma Gab ancora o próximo passo no EX; repetição em V60/V70 reforça busca/equipamento sem replay. | 🎮 |

#### Cena 5 – Estátua da Seleção de Ouro

Mapa: [063] `EX_Vestiario`

| ID | Título | Premissa resumida | Tipo |
| --- | --- | --- | --- |
| **5-A** | **Corredor dos vestiários** | O vestiário masculino permanece como rota principal; o feminino é um desvio opcional. | 🎮 |
| **5-B** | **Gag protegido** | A primeira interação preserva retratos, reações, movimento, impacto, som, recuo e a linha exata `DL-SEM-GAG-LOCKER-001`; repetição não duplica a coreografia. | 🎬 |
| **5-C** | **Estátua íntegra** | Thorin reconhece o marco da Seleção de Ouro e percebe que o elmo histórico cabe nele, embora Dragobur tenha pedido um capacete comum. | 🎮 |
| **5-D** | **Erro obrigatório** | Sem alternativa quest-valid, Thorin improvisa e retira o elmo da estátua; o display muda de forma persistente e o item não duplica. | 🎬 |
| **5-E** | **Equipamento manual** | O jogador equipa o capacete correto em Thorin e recebe a reação leve `DL-SEM-HELMET-THORIN-FIT-001`. | 🎮 |
| **5-F** | **Retorno** | Inventário sem equipamento, capacete errado ou equipamento em outro ator não encerram o requisito. | 🎮 |

#### Cena 6 – Autorização para o Campo

Mapas: [062] `EX_Estadio` → `VN_Semifinal` → [062] `EX_Estadio`

| ID | Título | Premissa resumida | Tipo |
| --- | --- | --- | --- |
| **6-A** | **VN de bronca** | `SEMIFINAL_DRAGOBUR_AUTHORIZATION` deixa claro em V80 que Dragobur pediu um capacete velho comum, não o elmo da estátua do Time de Ouro. | 🎬 VN |
| **6-B** | **Defesa de Thorin** | Thorin explica a pressa, o encaixe perfeito e a certeza de que ele e o elmo farão história; depois se faz de desentendido. | 🎬 VN |
| **6-C** | **Autorização pragmática** | Dragobur cede porque o jogo está acabando e precisa do atacante; V90 libera E19, a Gab de continuidade aponta o campo e o elmo ainda não é presenteado. | 🎮 |

#### Cena 7 – Elipse Narrada da Virada

Mapa: [064] `EX_Campo_de_Futebol_Runico`

| ID | Título | Premissa resumida | Tipo |
| --- | --- | --- | --- |
| **7-A** | **Moldura no campo** | Rheed e as crianças aparecem sobre o cenário EX reconhecível; a sequência não é VN. | 🎬 |
| **7-B** | **Time perdendo** | `DL-SEM-MATCH-RHEED-LOSING-001` estabelece a desvantagem. | 🎬 |
| **7-C** | **Entrada de Thorin** | `DL-SEM-MATCH-RHEED-ENTRY-001` estabelece que Thorin entrou em campo. | 🎬 |
| **7-D** | **Gol da virada** | `DL-SEM-MATCH-RHEED-GOAL-001` atribui a Thorin a jogada decisiva. | 🎬 |
| **7-E** | **Vitória** | `DL-SEM-MATCH-RHEED-VICTORY-001` conclui que os Machados Enferrujados venceram; as crianças apenas apoiam a leitura. | 🎬 |
| **7-F** | **Retorno ao pós-jogo** | A moldura é limpa depois dos quatro fatos e o fluxo retorna diretamente à celebração. | 🎬 |

#### Cena 8 – Celebração Interrompida

Mapas: [062] `EX_Estadio` → `VN_Semifinal` → [062] `EX_Estadio` → `VN_Semifinal` → [062] `EX_Estadio`

| ID | Título | Premissa resumida | Tipo |
| --- | --- | --- | --- |
| **8-A** | **Saída e posições** | O time sai do campo em EX; jogadores param o movimento aleatório e Machados, Martelos, Dragobur, Filena e Thorin chegam às posições de festa. | 🎬 EX |
| **8-B** | **VN de celebração** | `SEMIFINAL_CELEBRATION` reúne alegria do time, provocações classistas dos Martelos de Bronze, respostas dos Machados/Thorin, felicidade de Dragobur e Filena e presente permanente do elmo. | 🎬 VN |
| **8-C** | **Troca espacial** | A VN limpa; os Martelos saem em EX; somente depois Killin e Mhordred entram e se posicionam. | 🎬 EX |
| **8-D** | **VN dos guardas** | `SEMIFINAL_GUARD_INTERVENTION` traz a patente de Killin e a ordem de Thordan; Thorin, Mhordred, Dragobur e Filena respondem; Filena rejeita a coerção sobre o companheiro e o coletivo. | 🎬 VN |
| **8-E** | **Gentle ou Resist** | A escolha e a reação imediata encerram a VN sem flag persistente. Gentle volta à custódia EX; Resist volta à EX para batalha real. | 🎮 |
| **8-F** | **Batalha Resist** | Thorin e Filena enfrentam somente Mhordred; derrota mecânica é o resultado normal, vitória excepcional também reconverge, e não há Game Over. | ⚔️ |
| **8-G** | **Convergência** | Depois de Gentle ou cleanup da batalha, Filena fica com o time, Killin lidera e Mhordred ajuda a levar apenas Thorin. | 🎬 EX |

#### Cena 9 – Escolta e Handoff Exterior

Mapas: [062] `EX_Estadio` → [044] `EX_Distrito Residencial Nobre`

| ID | Título | Premissa resumida | Tipo |
| --- | --- | --- | --- |
| **9-A** | **Destino declarado** | A formação da Guarda estabelece a Casa Forja-Prata como destino; Filena se despede e permanece no estádio. | 🎬 |
| **9-B** | **Transferência única** | Killin e Mhordred levam Thorin carregado uma única vez ao exterior da casa; nenhum outro membro do time acompanha. | 🎬 |
| **9-C** | **Chegada observável** | “A Semifinal” só termina quando Thorin chega do lado de fora; então `Fim de Jogo` começa. | 🎬 |
| **9-D** | **Controle exterior** | Thorin recupera controle fora da casa; a entrada e o confronto com Thordan pertencem à próxima quest. | 🎮 |

## Decisão expressiva do jogador

- Gentle: `VN-SEM-CHOICE-GENTLE-011`; nenhuma batalha; custódia e escolta em EX.
- Resist: `VN-SEM-CHOICE-RESIST-011` + `VN-SEM-CHOICE-RESIST-FILENA-011`; batalha Thorin+Filena contra Mhordred; derrota normal e vitória excepcional chamam a mesma saída.
- Resultado fixo: os dois caminhos convergem em `GAB-SEM-ESCORT-011`, V120 e retorno exterior apenas de Thorin com Killin/Mhordred.

## Fonte atual de copy

Todas as falas finais, intenções, fatos e IDs de branch estão em `semifinal.dialogos.md`. Este NSD governa o fluxo narrativo e não substitui os contratos de Audio Design, Scene Presentation ou Gameplay Engineering.
