---
status: implemented
owner: Narrative Designer
quest: A Semifinal
document_kind: as-built dialogue contract
contract_version: 2.0.0
runtime_snapshot: 362e2da0
source_of_truth:
  - frontend/data/Map044.json
  - frontend/data/Map045.json
  - frontend/data/Map049.json
  - frontend/data/Map061.json
  - frontend/data/Map062.json
  - frontend/data/Map063.json
  - frontend/data/Map064.json
  - frontend/data/Map065.json
language: pt-BR
---

# A Semifinal — diálogos materializados

## Autoridade e regra de leitura

Este documento registra a copy efetivamente consumida pelos eventos da semifinal. Em caso de divergência, prevalece o texto serializado nos mapas listados no frontmatter. IDs 010 que não aparecem nos
eventos atuais são históricos e não constituem uma segunda fonte de copy.

Falas de progressão longa usam as cinco sessões VN atuais: a abertura em Map049 e quatro sessões em Map065. Gabs em mapas EX ficam restritas a retomada, bloqueio, ambientação, elipse narrada e ações
físicas.

## Abertura e Casa Forjaprata

### Map049 E1 — `ABERTURA_FORJAPRATA`

1. “Meu filho... Thorin...”
2. “Você precisa...”
3. “Rápido...”
4. “O QUÊ!?”

### Map045 E36 — apresentação de Rheed

| Anchor       | Copy exata                                                  |
| ------------ | ----------------------------------------------------------- |
| E36, Rheed   | “Então, crianças,<br> esta é a Casa da Família Forjaprata!” |
| E33, criança | “Parece de verdade...”                                      |
| E29, criança | “Uau!”                                                      |
| E36, Rheed   | “HAHAHAHA! agora vamos voltar para história”                |

### Map045 E11/E7/E20 — despertar e Funda

| Evento/estado            | Speaker | Copy exata                                           |
| ------------------------ | ------- | ---------------------------------------------------- |
| E11, retorno da abertura | Sáparo  | “O jogo já começou, seu babão.<br> É melhor correr!” |
| E7, `V29 = 10`           | Thorin  | “Eita, já ia esquecendo da minha funda...”           |
| E7, `V29 = 20`           | Thorin  | “Preciso encontrar minha Funda antes de sair.”       |
| E7, sem a arma equipada  | Thorin  | “Preciso equipar minha Funda antes de sair.”         |

Interações posteriores com Sáparo usam: “Passarinho que acorda cedo pega minhoca! Anda logo, Thorin, mete o pé!”.

## Corrida por Gildrat

### `DL-SEM-URGENT-THORIN-001`

- Consumidores: Map061 E7, E12, E14, E15, E16, E17, E21, E23 e E28 enquanto `V29 = 40`.
- Speaker: Thorin.
- Copy exata: “Agora não! Eu já estou atrasado. O Dragobur deve estar soltando fumaça pelo nariz.”

## Map065 — VNs da semifinal

### `SEMIFINAL_DRAGOBUR_ARRIVAL` — Map065 E1

| ID                                            | Speaker  | Copy exata                                                                                                               |
| --------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------ |
| `VN-SEM-DRAGOBUR-ARRIVAL-DRAGOBUR-011`        | Dragobur | “THORIN! Os Machados já estão perdendo, meu atacante resolveu passear por Gildrat e você aparece agora?!”                |
| `VN-SEM-DRAGOBUR-ARRIVAL-THORIN-011`          | Thorin   | “Eu apareci antes do fim. Me põe em campo que ainda dá para virar.”                                                      |
| `VN-SEM-DRAGOBUR-ARRIVAL-DRAGOBUR-HELMET-011` | Dragobur | “Em campo sem capacete? Nem se você fosse filho de todas as Grandes Casas ao mesmo tempo.”                               |
| `VN-SEM-DRAGOBUR-ARRIVAL-THORIN-HELMET-011`   | Thorin   | “Então me dá um. Ou aponta onde esconderam um.”                                                                          |
| `VN-SEM-DRAGOBUR-ARRIVAL-DRAGOBUR-ORDER-011`  | Dragobur | “Vestiário. Pegue um capacete velho, qualquer um que ainda proteja essa sua cabeça, equipe e volte. E não invente moda.” |

Fato materializado: Dragobur pede um capacete velho comum. Ele não indica a estátua nem presenteia o elmo nesta cena.

### `SEMIFINAL_DRAGOBUR_AUTHORIZATION` — Map065 E2

| ID                                         | Speaker  | Copy exata                                                                                                        |
| ------------------------------------------ | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `VN-SEM-DRAGOBUR-AUTH-ANGER-011`           | Dragobur | “ERA PARA VOCÊ PEGAR UM CAPACETE VELHO NO VESTIÁRIO, NÃO O CAPACETE DA ESTÁTUA DO TIME DE OURO!”                  |
| `VN-SEM-DRAGOBUR-AUTH-THORIN-011`          | Thorin   | “Eu estava com pressa. Esse serviu certinho. E tenho certeza de que eu e o capacete vamos fazer história juntos.” |
| `VN-SEM-DRAGOBUR-AUTH-THORIN-INNOCENT-011` | Thorin   | “Além disso... se ele estava numa estátua, ninguém estava usando.”                                                |
| `VN-SEM-DRAGOBUR-AUTH-YIELD-011`           | Dragobur | “O jogo está acabando e eu preciso do meu atacante. Entra antes que eu decida escalar a estátua no seu lugar.”    |

### `SEMIFINAL_CELEBRATION` — Map065 E3

| ID                                     | Speaker           | Copy exata                                                                                                               |
| -------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `VN-SEM-CELEBRATION-TEAM-011`          | Time dos Machados | “MACHADOS! MACHADOS! THORIN!”                                                                                            |
| `VN-SEM-CELEBRATION-RIVAL-CLASS-011`   | Martelo de Bronze | “Bonita a festa. Quando um time de bairro precisa do filho de uma Grande Casa para vencer, até a ferrugem parece ouro.”  |
| `VN-SEM-CELEBRATION-RIVAL-SPONSOR-011` | Outro Martelo     | “Sem patrocinador, sem equipamento e sem nome. Aí aparece um nobre e vocês chamam de mérito.”                            |
| `VN-SEM-CELEBRATION-THORIN-011`        | Thorin            | “Meu sobrenome não marcou o gol. E patrocínio de Casa Mineradora também não joga por vocês.”                             |
| `VN-SEM-CELEBRATION-FILENA-011`        | Filena            | “Ele correu com os Machados. Perdeu o fôlego com os Machados. A vitória é nossa. Engulam isso juntos.”                   |
| `VN-SEM-CELEBRATION-DRAGOBUR-011`      | Dragobur          | “Chega. Hoje meu time fez história com o que tinha — inclusive um atacante atrasado e um capacete roubado da decoração.” |
| `VN-SEM-CELEBRATION-GIFT-011`          | Dragobur          | “Fica com ele, Thorin. Depois desse gol, o capacete escolheu um dono tão teimoso quanto o anterior.”                     |
| `VN-SEM-CELEBRATION-THORIN-GIFT-011`   | Thorin            | “Eu avisei. Nós dois ainda vamos fazer história.”                                                                        |

O presente altera a propriedade narrativa de Armor 51. O runtime não concede uma segunda cópia do item.

### `SEMIFINAL_GUARD_INTERVENTION` — Map065 E4

| ID                               | Speaker  | Copy exata                                                                                                                                                                     |
| -------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `VN-SEM-GUARD-DRAGOBUR-011`      | Dragobur | “A comemoração ainda não acabou. Quem chamou a Guarda de Ferro?”                                                                                                               |
| `VN-SEM-GUARD-KILLIN-ORDER-011`  | Killin   | “Thorin Forja-Prata. Sou Killin, Capitã da Guarda de Ferro. Por ordem direta do General Thordan, você volta para casa conosco. Agora.”                                         |
| `VN-SEM-GUARD-THORIN-011`        | Thorin   | “Meu pai não manda no estádio. E não manda no meu time.”                                                                                                                       |
| `VN-SEM-GUARD-MHORDRED-011`      | Mhordred | “Ele mandou em nós. Para hoje, isso basta.”                                                                                                                                    |
| `VN-SEM-GUARD-FILENA-MOTIVE-011` | Filena   | “Não basta. Vocês entram na nossa festa, tratam o time como se não existisse e esperam que ele abaixe a cabeça. Se levarem Thorin à força, vão ter que passar por mim também.” |

O Visual Choice usa as chaves internas `recuar1` e `brigar2`:

| Branch           | Portador temporário                          | Copy exata                                                               |
| ---------------- | -------------------------------------------- | ------------------------------------------------------------------------ |
| Gentle           | `$gameTemp._semifinalGuardChoice = "gentle"` | Thorin: “Eu vou. Mas deixem o time terminar de comemorar.”               |
| Resist           | `$gameTemp._semifinalGuardChoice = "resist"` | Thorin: “Eu não vou fingir que isso é justo. Filena, fica atrás de mim.” |
| Resist, resposta | mesmo branch                                 | Filena: “Nem pensar. A gente enfrenta isso junto.”                       |

Nenhuma fala de Killin/Mhordred reage dentro da VN depois da escolha. A diferenciação seguinte é física: Gentle segue sem batalha; Resist forma a party temporária e abre o combate.

## Gabs EX do estádio e do vestiário

### Dragobur, field gate e continuidade

| Mapa/evento/estado                   | Copy exata                                                                                                                        |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| Map062 E2, retorno da primeira VN    | “Vestiário, Thorin. Pegue um capacete velho, equipe e volte rápido.”                                                              |
| Map062 E2, `60`                      | “Não basta carregar o capacete debaixo do braço, Thorin. Equipe o velho elmo e volte aqui.”                                       |
| Map062 E2, `70`, Armor 51 equipada   | “Agora sim. Esse capacete merece uma conversa antes de você entrar em campo.”                                                     |
| Map062 E2, `70/80`, requisito falhou | “Não basta carregar o capacete. Equipe o elmo da estátua e volte aqui.”                                                           |
| Map062 E2, retorno da autorização    | “Campo liberado, atacante. Vai antes que o jogo acabe sem você.”                                                                  |
| Map062 E2, `90+`                     | “Meu velho capacete... Da seleção de ouro. Continua feio, continua inteiro e, por algum milagre, coube em você. Campo, atacante!” |
| Map062 E19, `50`                     | “Fale comigo antes de entrar em campo, Thorin.”                                                                                   |
| Map062 E19, `60`                     | “Vestiário, Thorin. Um capacete velho. E rápido!”                                                                                 |
| Map062 E19, `70`                     | “Equipe o capacete velho, Thorin. Só então você entra em campo.”                                                                  |
| Map062 E19, `80`                     | “Volte aqui, Thorin. Quero ver esse capacete antes de liberar o campo.”                                                           |
| Map062 E15–E17, `60..110`            | “Não posso ir embora agora. Preciso pegar o capacete e entrar em campo.”                                                          |
| Map062 E18/E21, gate sem equipamento | “Não basta carregar o capacete debaixo do braço, Thorin. Equipe o velho elmo e volte aqui.”                                       |

### Companheiros e reservas no estádio

| Evento/estado    | Copy exata                                         |
| ---------------- | -------------------------------------------------- |
| Map062 E9, `50`  | “Os Machados estavam esperando por você, Thorin.”  |
| Map062 E9, `60`  | “Vai, Thorin. O vestiário fica logo ali.”          |
| Map062 E9, `90`  | “Agora sim. Corre para o campo!”                   |
| Map062 E10, `50` | “Estamos perdendo. Precisamos do nosso atacante.”  |
| Map062 E10, `60` | “Capacete primeiro. A partida ainda não acabou.”   |
| Map062 E10, `90` | “Dragobur liberou. Vai virar esse jogo!”           |
| Map062 E11, `50` | “O que está fazendo aí? Vai falar com o Dragobur!” |
| Map062 E11, `60` | “Encontra um capacete e volta rápido.”             |
| Map062 E11, `90` | “Vai lá jogar, Thorin!”                            |

### Vestiário

| ID/consumidor                                           | Speaker  | Copy exata                                                                                                  |
| ------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| `DL-SEM-LOCKER-THORIN-001`, Map063 E6                   | Thorin   | “Vestiário certo. Cheiro errado. Como é que meia molhada consegue ter vontade própria?”                     |
| `DL-SEM-GAG-LOCKER-001`, Map063 E7 primeira vez         | jogadora | “Você não tem nenhuma decência?! Saia já daqui, seu miserável!”                                             |
| `DL-SEM-GAG-LOCKER-REPEAT-001`, Map063 E7 repeat        | Thorin   | “Não. Essa porta já me explicou tudo. Com bastante impacto.”                                                |
| `DL-SEM-STATUE-PREQUEST-FILLER-011`, Map063 E13 em `50` | Thorin   | “A estátua do Dragobur parece estar me julgando por chegar atrasado. E ela nem sabe que o jogo já começou.” |

Map063 E13 em `60` apresenta, nessa ordem:

1. “A seleção de ouro...”
2. “E esse é o velho capacete do Dragobur.”
3. “Ele vai me matar por chegar tarde.”
4. “Ou por mexer nisso.”
5. “Talvez pelos dois.”
6. “Desculpa, seleção de ouro.”
7. “O presente precisa mais disto do que a estátua.”

A apresentação automática pós-equipamento, em Map063 E13 ou Map062 E20, usa três Gabs:

1. “Serviu!”
2. “Quer dizer...”
3. “Se eu não respirar muito fundo.”

Depois do self switch de apresentação ser limpo, a interação de recovery de Map063 E13 contém a versão compacta: “Serviu! Quer dizer... se eu não respirar muito fundo.”.

## Elipse da partida — Map064 E9

| ID                               | Speaker/anchor | Copy exata                                                                                              |
| -------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------- |
| `DL-SEM-MATCH-RHEED-LOSING-001`  | Rheed, E9      | “Quando Thorin alcançou o campo, os Machados Enferrujados já estavam atrás no placar.”                  |
| `DL-SEM-MATCH-CHILDREN-001`      | reação, E4     | “Aí não!”                                                                                               |
| `DL-SEM-MATCH-RHEED-ENTRY-001`   | Rheed, E9      | “Mas o atacante atrasado finalmente entrou — de capacete torto, fôlego curto e olhos presos na virada.” |
| `DL-SEM-MATCH-RHEED-GOAL-001`    | Rheed, E9      | “No último avanço, Thorin encontrou a brecha e marcou o gol da virada.”                                 |
| `DL-SEM-MATCH-RHEED-VICTORY-001` | Rheed, E9      | “E assim, quando o apito final soou, os Machados Enferrujados tinham vencido a semifinal.”              |
| `DL-SEM-MATCH-CHILDREN-002`      | reação, E4     | “EU SABIA!”                                                                                             |

## Saída dos rivais, escolta e chegada

| Consumidor                     | Speaker              | Copy exata                                                                                         |
| ------------------------------ | -------------------- | -------------------------------------------------------------------------------------------------- |
| Map062 E6, saída dos rivais    | Martelo de Bronze/E7 | “Se vieram assistir à semifinal, chegaram tarde.”                                                  |
| Map062 E6, entrada dos guardas | Mhordred/E14         | “Não viemos pelo jogo.”                                                                            |
| Map062 E6, convergência        | Killin/E5            | “Formação. Mhordred à retaguarda. Levaremos Thorin à Casa Forja-Prata.”                            |
| Map062 E6, despedida           | Filena/E3            | “A gente termina a comemoração quando você voltar. Isso não acaba aqui.”                           |
| Map044 E10, chegada            | Thorin               | “Da semifinal para a porta de casa. Meu pai realmente sabe estragar uma vitória sem nem aparecer.” |
| Map044 E15, `120/900`          | Mhordred             | “Você conseguirá dormir bem à noite sabendo que seu pai nos puniu por sua causa?! Entre logo!”     |
| Map044 E16, `120/900`          | Killin               | “Vá, Thorin. O tempo está passando!”                                                               |

As Gabs de Killin e Mhordred em Map044 usam `ForceGab=true` e `BypassAntiRepeat=true`, não aguardam `WaitForGab` e desaparecem quando a página de cleanup `V32 >= 1` vence.

## Itens explicitamente não materializados

- A copy antiga “Vamos levar Thorin até a Casa Forja-Prata” não está no runtime; a linha atual usa “Levaremos Thorin à Casa Forja-Prata”.
- As reações EX antigas de Killin/Mhordred imediatamente após Gentle/Resist não existem no fluxo atual.
- IDs `BR-SEM-*` e demais entradas 010 que não aparecem acima são rastreabilidade histórica, não copy alternativa.
- O documento não promove resultado de playtest. Ele apenas espelha texto, anchors e consumo presentes no código.
