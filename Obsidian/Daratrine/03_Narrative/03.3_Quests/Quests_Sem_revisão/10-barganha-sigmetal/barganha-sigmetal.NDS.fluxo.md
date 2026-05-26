# Narrative Structure Document (NSD) - Fluxo Visual De Cenas

## Quest: Barganha Sigmetal

### 1 Resumo Geral (Checkpoint 0)

- [x] Concluido
- Nome da quest: Barganha Sigmetal
- Importancia na campanha: Main
- Arco narrativo: Recusa do Chamado
- Quest anterior: Travessia Tóxica
- Conflito central: Após sobreviverem à travessia por Ekios, o grupo chega junto na Estrada do Cão-luar. O deposito dos minerais no baú vira ponto de tensão porque o destino do Sigmetal ainda pode ser
  decidido.
- Objetivo narrativo global: Consolidar o retorno da expedição, formalizar a entrega dos Kravens, registrar a decisão do Sigmetal e encerrar o ciclo com o pagamento adiado para a manhã seguinte.
- Premissa resumida: Thorin, Kilin, Mhordred, Filena e Balastrus chegam juntos ao ponto de reunião. Brutus já está lidando com os outros expedicionários que chegaram na frente. Balastrus assume
  diretamente a cobranca da entrega referente a Thorin (jogador) e Filena, provoca o grupo e direciona o fluxo para a taverna no dia seguinte.
- Resumo: O grupo chega unido a Estrada do Cão-luar e organiza a entrega dos minerais coletados. Os Kravens precisam ser depositados para liberar o avançar da cena. Em seguida, Thorin define o destino
  do Sigmetal (entregar ou esconder/desconversar), o que altera a reação de Balastrus.

- Locais principais

  - Estrada do Cão-luar (Map 17)
  - Ponto do baú de deposito da expedição
  - Distrito Comercial
  - Distrito Residencial
  - Casa dos Forjaprata

- NPCs principais
  - Thorin
  - Kilin
  - Mhordred
  - Filena
  - Balastrus
  - Expedicionários anões
  - Sáparo
  - Mélia
- Itens / recursos narrativos
  - Kravens (lote da expedição)
  - Sigmetal (item raro e decisão)

---

### 2 Pré-condições Narrativas (Checkpoint 1)

- [x] Concluido

| Tipo                                                                                 | Descricao                                                                                             |
| ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| Flags / Jogador concluiu a quest "Travessia Tóxica" e retornou com Balastrus no time |
| Limitacoes ou bloqueios                                                              | Progressao depende de depositar os Kravens no baú; pagamento permanece bloqueado até a manhã seguinte |

---

### 3 Fluxo Visual Resumido (Checkpoint 2)

```plaintext
Quest: Barganha Sigmetal
 +-- Cena 1: Retorno e organização na Estrada do Cão-luar
 |      +-- Beat 1: Chegada conjunta do grupo (Thorin, Kilin, Mhordred, Filena e Balastrus)
 |      +-- Beat 2: Balastrus assume a cobranca e organiza o depósito
 |      +-- Beat 3: Depósito obrigatório dos Kravens no baú da expedição
 |      +-- Beat 4: Escolha sobre o destino do Sigmetal
 |      +-- Beat 5: Reação de Balastrus (elogio, provocação ou suspeita)
 |      +-- Beat 6: Pagamento adiado e ordem para encontro na taverna
 +-- Cena 2: Dispersão e caminho para casa
 |      +-- Beat 1: Grupo é dispensado; aliados se separam
 |      +-- Beat 2: Thorin cruza os distritos de volta para casa
 +-- Cena 3: Encerramento do dia
        +-- Beat 1: Thorin nota a ausência de Tordan
        +-- Beat 2: Conversa com Sáparo e inquietação
        +-- Beat 3: Sono e gancho onirico com Mélia
```

#### Tabela de Cenas

| #   | Nome da Cena                                     | Premissa resumida (expandida)                                                                                                                                            |
| --- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | **Retorno e organizacao na Estrada do Cão-luar** | Com o grupo reunido após a travessia, Balastrus conduz a prestação de contas. O depósito dos Kravens no baú é obrigatório, e o jogador define como lidar com o Sigmetal. |
| 2   | **Dispersao e caminho para casa**                | A reunião se encerra sem pagamento imediato. O grupo se desfaz e Thorin retorna sozinho pelos distritos de Gildrat.                                                      |
| 3   | **Encerramento do dia**                          | Em casa, Thorin processa os eventos do retorno, interage com Sáparo e encerra a quest com o gancho narrativo do sonho.                                                   |

#### Beats por Cena

##### Cena 1 - Retorno e organização na Estrada do Cao-Luar

| ID  | Titulo                       | Premissa Resumida                                                                                                                                       | Tipo |
| --- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| 1-A | Chegada conjunta             | Thorin chega com Kilin, Mhordred, Filena e Balastrus. A cena reforca que todos atravessaram juntos e estão presentes no acerto final.                   | CS   |
| 1-B | Cobranca direta de Balastrus | Sem intermedio de Brutus, Balastrus puxa a conversa, pressiona por resultados e direciona os expedicionários ao ponto de depósito.                      | CS   |
| 1-C | Deposito dos Kravens no baú  | O jogador controla Thorin e deposita o lote de Kravens da expedição. Esse passo destrava a continuidade da cena.                                        | JOG  |
| 1-D | Decisão do Sigmetal          | Thorin escolhe entre entregar o Sigmetal para Balastrus ou desconversar/guardar. A escolha altera falas e flags narrativas.                             | JOG  |
| 1-E | Reação e provocação          | Balastrus reage ao resultado da entrega: pode exaltar Thorin, cutucar o grupo ou insinuar desconfianca sobre o Sigmetal ausente.                        | CS   |
| 1-F | Pagamento adiado             | Mantendo a essencia antiga do evento do baú, Balastrus encerra o acerto e manda todos irem a Taverna da Pedra Vulcânica na manha seguinte para receber. | CS   |
| 1-G | Caloteiro miserável!         | Filena se enfurece com Balastrus por não acertar as contas de imediado depois de ter cobrado tanto deles na mina.                                       | CS   |

##### Cena 2 - Dispersão e caminho para casa

| ID  | Titulo           | Premissa Resumida                                                                                      | Tipo |
| --- | ---------------- | ------------------------------------------------------------------------------------------------------ | ---- |
| 2-A | Grupo dispensado | Kilin, Mhordred e Filena se despedem; o grupo deixa de atuar em bloco após o fechamento da negociação. | CS   |
| 2-B | Travessia urbana | O jogador controla Thorin no retorno pelo Distrito Comercial e Residencial até a casa dos Forjaprata.  | JOG  |

##### Cena 3 - Encerramento do dia

| ID  | Titulo                  | Premissa Resumida                                                                                                    | Tipo |
| --- | ----------------------- | -------------------------------------------------------------------------------------------------------------------- | ---- |
| 3-A | Casa silenciosa         | Thorin chega em casa e percebe um clima incomum, com ausencia de Tordan no fim do dia.                               | JOG  |
| 3-B | Conversa com Sáparo     | Thorin verbaliza dúvidas e desconforto sobre os acontecimentos recentes enquanto tenta organizar os proximos passos. | JOG  |
| 3-C | Sono e gancho narrativo | Thorin dorme e a cena fecha com o sonho envolvendo Mélia, abrindo o proximo movimento do arco.                       | CS   |

## 5 Fluxo de Gameplay (resumo)

Estrada do Cão-luar: Chegada conjunta -> Cobrança de Balastrus -> Depósito obrigatório dos Kravens no baú -> Escolha sobre Sigmetal -> Reação condicional -> Pagamento adiado para a taverna.

Retorno noturno: Dispersão do grupo -> Caminho pelos distritos -> Casa dos Forjaprata -> Conversa com Sáparo -> Sono e sonho com Mélia.
