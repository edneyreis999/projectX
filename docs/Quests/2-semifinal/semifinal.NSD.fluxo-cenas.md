# 🎮 Narrative Structure Document (NSD) - Fluxo Visual De Cenas

## 📄 Quest: A Semifinal

### 1️⃣ Resumo Geral _(Checkpoint 0)_

\[x] **Concluído**

- **Nome da quest**: A Semifinal
- **Importância na campanha**: Main + Tutorial
- **Variável de controle geral**: [029] `v_qSemifinal_progress`
- **Controle local da Casa Forjaprata**: [111] `v_qTutorialFundaForjaprata_stage` (`0` → `10` → `20` → `90`, terminal local)
- **Arco narrativo**: Ato I — Mundo Comum
- **Quest anterior**: Noite da História
- **Conflito central**: A liberdade e paixão por futebol rúnico de Thorin entram em choque com a autoridade e o controle impostos por seu pai, o General Tordan.
- **Objetivo narrativo global**: Apresentar Thorin, destacando seu traço de irresponsabilidade, sua paixão e excelência no futebol rúnico, e instaurar o conflito entre a independência do protagonista
  e a autoridade de seu pai, o poderoso General Tordan.
- **Premissa resumida**: Após despertar de um pesadelo premonitório, o talentoso porém indisciplinado Thorin corre contra o tempo para garantir a vitória em um jogo de futebol rúnico. Mas durante a
  comemoração, um grupo de guardas reais, a mando de seu pai, exige que Thorin volte para casa.
- **Resumo**: Thorin, um jovem talentoso mas indisciplinado, acorda de um sonho premonitório e, atrasado, corre por Gildrat para participar da semifinal de futebol rúnico. Após garantir a vitória do
  seu time, sua celebração é interrompida por guardas reais enviados pelo pai, o General Tordan, destacando o conflito entre sua liberdade e a autoridade do pai.
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
  - Tordan
  - Kilin
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
| 3   | Corrida pelas Ruas    | Distrito Comercial → Bloqueio ao Castelo → Desviar de pedestres → Portão do estádio             | O jogador guia Thorin pelos bairros de Gildrat até chegar ao portão do estádio.                                          |
| 4   | Bronca no Gramado     | Portão do estádio → Treinador Dragobur aponta falta do capacete                                 | Dragobur dá uma bronca sobre o atraso e barra a entrada de Thorin ao notar que ele esqueceu o capacete.                  |
| 5   | Capacete Perdido      | Tentativa vestiário feminino (gag) → Vestiário masculino → Encontra e equipa capacete           | Entre gag no vestiário feminino e armários bagunçados, Thorin encontra e equipa o capacete antigo do treinador.          |
| 6   | Pronto pra Jogar      | Retorna a Dragobur → Liberação para campo                                                       | Capacete posto, Thorin recebe a permissão de Dragobur para entrar em campo.                                              |
| 7   | Gol da Virada         | Entrada em campo → Jogada decisiva → Gol da vitória                                             | Na sequência de jogo, Thorin marca o ponto decisivo que garante a vitória de seu time.                                   |
| 8   | Comemoração Cortada   | Torcida comemora → Guardas aparecem                                                             | A torcida vibra até guardas reais surgirem anunciando que Thorin deve acompanhá-los.                                     |
| 9   | Escolta Forçada       | Guardas escoltam Thorin → Saída do campo                                                        | Sob ordens de Tordan, os guardas escoltam Thorin de volta para casa, encerrando a missão.                                |

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

#### Cena 3 – Corrida pelas Ruas

| ID      | Titulo                    | Premissa Resumida                                                                | Tipo |
| ------- | ------------------------- | -------------------------------------------------------------------------------- | ---- |
| **3-A** | **Ponta-pé na Rua**       | Thorin cruza do Distrito Residencial para o Comercial; rua se abre à frente.     | 🎮   |
| **3-B** | **Vendedor Atrapalhante** | Mascate quase tromba em Thorin oferecendo mercadorias, forçando desvio rápido.   | 🎬   |
| **3-C** | **Bloqueio ao Castelo**   | Guarda impede acesso ao caminho do Castelo; reforça a limitação do mapa.         | 🎬   |
| **3-D** | **Descida Frenética**     | Thorin desvia de pedestres; HUD pisca “Você está atrasado!” — mantém a urgência. |
| **3-E** | **Visão do Estádio**      | Ao fim da rua, portão do estádio domina a câmera; transição para a próxima cena. | 🎬   |

#### Cena 4 – Bronca no Gramado

| ID      | Titulo                 | Premissa Resumida                                                                                                                        | Tipo |
| ------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| **4-A** | **Chegada ao Portão**  | Jogador ainda no controle: guia Thorin até Dragobur, que o encara com impaciência assim que ele se aproxima.                             | 🎮   |
| **4-B** | **Bronca Pública**     | Dragobur solta um sermão sobre disciplina e compromisso, atraindo olhares de parte da torcida — reforça a culpa de Thorin.               | 🎬   |
| **4-C** | **Cadê o Capacete?**   | Em diálogo, o treinador enfatiza que Thorin não está usando capacete e que, pelas regras de segurança, não pode entrar em campo sem ele. | 🎬   |
| **4-D** | **Ordem Sem Desculpa** | Dragobur aponta o vestiário e diz algo como “Capacete. Agora!” → novo objetivo: **“Encontre e equipe seu capacete”**.                    | 🎬   |
| **4-E** | **Rumo ao Vestiário**  | Jogador retoma a corrida com Thorin em direção aos vestiários, dando início à próxima cena.                                              | 🎮   |

#### Cena 5 – Capacete Perdido

| ID      | Titulo                      | Premissa Resumida                                                                                                                                                 | Tipo |
| ------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| **5-A** | **Corredor dos Vestiários** | Jogador conduz Thorin até o corredor que divide vestiários feminino e masculino — estabelece bifurcação e liberdade de explorar.                                  | 🎮   |
| **5-B** | **Gag do Feminino**         | Se tentar abrir a porta do vestiário feminino, as jogadoras o barram com uma piada leve; momento cômico opcional.                                                 | 🎬   |
| **5-C** | **Entrada no Masculino**    | Thorin abre a porta do vestiário masculino e comenta: “Nossa, que cheiro de cueca!” — ambienta o local e adiciona humor.                                          | 🎬   |
| **5-D** | **Encontrar Capacete**      | O jogador controla Thorin, direcionando-o até o manequim onde está o capacete runicamente marcado com iniciais de Dragobur; prompt de interação “Pegar Capacete”. | 🎮   |
| **5-E** | **Capacete Antigo**         | Uma cutscene mostra o jogador retirando o capacete do manequim e vestindo. Pop-up aparece na porção superior da tela com o escrito "você recebeu um elmo"         | 🎬   |
| **5-F** | **Menu de Equipamento**     | Ao pegar o item, abre-se o menu de inventário; o jogador deve selecionar manualmente o capacete para equipar — reforça tutorial de equipamento.                   | 🎮   |
| **5-G** | **Retorno ao Campo**        | HUD atualiza: “Volte ao treinador”; Thorin sai do vestiário rumo ao gramado para a próxima cena.                                                                  | 🎮   |

#### Cena 6 – Pronto pra Jogar

| ID      | Titulo                      | Premissa Resumida                                                                                                                                                                                                                                                                             | Tipo  |
| ------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **6-A** | **Reencontro com Dragobur** | Jogador conduz Thorin de volta a Dragobur.                                                                                                                                                                                                                                                    | 🎮    |
| **6-B** | **Lenda do Capacete**       | Dragobur inspeciona o capacete e faz um aceno de aprovação. Ele conta que aquele era seu capacete quando o time venceu, pela primeira e única vez, o campeonato que o levou à Liga Profissional; os jogadores da época tatuaram “Dragobur” na runa frontal — reforça valor simbólico do item. | 🎬    |
| **6-C** | **Rumo ao campo**           | Jogador conduz Thorin de volta à entrada do campo.                                                                                                                                                                                                                                            | 🎮    |
| **6-D** | **Entrada em Campo**        | Cutscene (sem controle): Thorin corre pelo gramado até sua posição inicial, recebendo cumprimentos dos companheiros.                                                                                                                                                                          | 🎬    |
| **6-E** | **Tutorial**                | Jogador controla Thorin seguindo um passo a passo indicado pelo jogo. [ver material de tutorial]                                                                                                                                                                                              | 🎮 📝 |

#### Cena 7 – Comemoração Cortada

| ID      | Titulo                  | Premissa Resumida                                                                                                                             | Tipo |
| ------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| **7-A** | **Explosão da Torcida** | Arquibancadas entram em frenesi; confetes mágicos e cantos ecoam, sublinhando a magnitude da virada.                                          | 🎬   |
| **7-B** | **Herói do Time**       | Companheiros e Dragobur erguem Thorin nos ombros; câmera gira 360° — reforça a vitória e o vínculo de equipe.                                 | 🎬   |
| **7-C** | **Momento com Filena**  | Filena encara Thorin com sorriso orgulhoso e trocam um high-five/flerte rápido — humaniza o protagonista antes da virada de tom.              | 🎬   |
| **7-D** | **Entrada dos Guardas** | Portão lateral range; tropa de guardas reais marcha coordenada, tambores soam, torcida vai silenciando — introduz tensão imediata.            | 🎬   |
| **7-E** | **Ordem de Tordan**     | Capitão da guarda anuncia, em voz firme, que Thorin deve acompanhar o pelotão “em nome do General Tordan” — conflito de autoridade explícito. | 🎬   |
| **7-F** | **Escolha de Diálogo**  | Prompt oferece duas respostas: **Gentil (“Tudo bem, vou com vocês”)** ou **Resistir (“Não têm esse direito!”)** — dá agência ao jogador.      | 🎮   |
| **7-G** | **Cercado**             | Independentemente da escolha, guardas formam círculo e conduzem Thorin rumo à saída — prepara transição de cena.                              | 🎬   |

**Decisão do Jogador:**

- Gentil (“Tudo bem, vou com vocês”).
- Resistir (“Não têm esse direito!”). Afeta apenas falas e tom; Thorin é escoltado de qualquer forma.
