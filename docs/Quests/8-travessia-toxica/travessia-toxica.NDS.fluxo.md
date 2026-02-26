# Narrative Structure Document (NSD) - Fluxo Visual De Cenas

## Quest: Travessia Toxica

### 1 Resumo Geral (Checkpoint 0)

- [x] Concluido
- Nome da quest: Travessia Toxica
- Importancia na campanha: Main
- Arco narrativo: Recusa do Chamado
- Quest anterior: Travessia Perigosa
- Conflito central: O grupo encontra uma mina abandonada adaptada como esgoto de Gildrat, infestada por mutacoes venenosas, e precisa atravessa-la porque a avalanche bloqueou todas as rotas externas.
- Objetivo narrativo global: Introduzir a primeira quebra de memoria com Rheed e as criancas, construir atmosfera claustrofobica, reforcar a ameaca das mutacoes e apresentar o Simbolo da Tregua como
  mecanica antes do retorno a Gildrat.
- Premissa resumida: Thorin e o grupo entram na Mina do Esgoto para escapar da nevasca. A primeira parte da mina e dividida em 3 andares com combates mais faceis e um puzzle de valvulas que exige
  deixar um membro segurando uma valvula. A necessidade obriga o grupo a aceitar Balastrus como 5o membro. Depois, enfrentam o chefe Pestesporo, mas a saida para a superficie fica bloqueada.
- Resumo: A nevasca obriga o grupo a usar a Mina do Esgoto. Na primeira parte, dividida em 3 andares, os combates sao mais leves e o fluxo foca em exploracao, puzzle de valvulas e registros. No
  puzzle, um membro precisa segurar uma valvula para manter o fluxo e abrir a passagem, forcando o grupo a soltar Balastrus e usa-lo como 5o membro. A quebra de memoria leva ao Coreto com Rheed e as
  criancas, onde Thorin encontra o Simbolo da Tregua. A segunda parte aprofunda o perigo com lodo toxico e escuridao. A travessia termina na Camara de Decantacao, onde o Pestesporo desperta e e
  derrotado, mas a saida para a superficie fica bloqueada.

- Locais principais
  - Entrada da Mina do Esgoto
  - Coreto (quebra de memoria com Rheed e as criancas)
  - Anel de Manutencao (1F)
  - Galerias de Drenagem (2F)
  - Camara de Decantacao Anoxica
- NPCs principais
  - Thorin
  - Kilin
  - Mhordred
  - Filena
  - Balastrus
  - Rheed
  - Criancas
- Criaturas principais
  - Pestesporo (boss)
  - Slimes toxicos
  - Vermes do lodo
  - Cogumelos esporulantes

---

### 2 Pre-condicoes Narrativas (Checkpoint 1)

- [x] Concluido

| Tipo                        | Descricao                                                                                                     |
| --------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Flags / Decisoes anteriores | Jogador concluiu a quest "Travessia Perigosa"                                                                 |
| Limitacoes ou bloqueios     | Caminho principal do Mapamundi bloqueado por avalanche e deslizamento; entrada da Mina do Esgoto desbloqueada |

---

### 3 Fluxo Visual Resumido (Checkpoint 2)

```plaintext
Quest: Travessia Toxica
 +-- Cena 1: Entrada e 3 Andares do Anel de Manutencao
 |      +-- Beat 1: Entrada da mina sob neve e decisao de avancar
 |      +-- Beat 2: Discussao inicial, corda em Balastrus e conversa Thorin/Filena
 |      +-- Beat 3: Combates leves e exploracao nos 3 andares
 |      +-- Beat 4: Puzzle de valvulas exige deixar um membro segurando a valvula
 |      +-- Beat 5: Balastrus vira 5o membro por necessidade
 |      +-- Beat 6: Leitura de registros e runas do esgoto
 |      +-- Beat 7: Quebra de memoria com Rheed e criancas no Coreto
 |      +-- Beat 8: Encontro do Simbolo da Tregua
 |      +-- Beat 9: Explicacao da mecanica do Simbolo da Tregua
 +-- Cena 2: Galerias de Drenagem
 |      +-- Beat 1: Travessia por passadicos sobre lodo toxico
 |      +-- Beat 2: Combates com mutacoes venenosas
 |      +-- Beat 3: Apagar das luzes e avancar com lamparina
 +-- Cena 3: Camara de Decantacao Anoxica
        +-- Beat 1: Revelacao do ambiente e do Pestesporo
        +-- Beat 2: Confronto contra o boss
        +-- Beat 3: Saida para a superficie bloqueada
```

#### Tabela de Cenas

| #   | Nome da Cena                                  | Premissa resumida (expandida)                                                                                                                                                                                                                                                                                                                 |
| --- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Entrada e 3 Andares do Anel de Manutencao** | Forcados a se abrigar da nevasca, o grupo entra na Mina do Esgoto. A primeira parte e dividida em 3 andares, com combates mais faceis, exploracao e puzzle de valvulas que exige deixar um membro segurando a valvula e aceitar Balastrus como 5o membro. O trecho culmina na quebra de memoria com Rheed e no encontro do Simbolo da Tregua. |
| 2   | **Galerias de Drenagem**                      | A descida intensifica o perigo com passadicos sobre lodo toxico, mutacoes venenosas e escuridao total, exigindo uma fonte de luz limitada para avancar.                                                                                                                                                                                       |
| 3   | **Camara de Decantacao Anoxica**              | O grupo chega a camara final e enfrenta o Pestesporo. A vitoria ocorre, mas a saida para a superficie esta bloqueada.                                                                                                                                                                                                                         |

#### Beats por Cena

##### Cena 1 - Entrada e 3 Andares do Anel de Manutencao

| ID  | Titulo                  | Premissa Resumida                                                                                                                                                                                                                                                                                                                        | Tipo |
| --- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| 1-A | Entrada soterrada       | O Jogador controla Thorin, que encontra a entrada da mina sob a neve e segue com o grupo por nao haver outra rota. Filena reforca que nao podem recuar.                                                                                                                                                                                  | JOG  |
| 1-B | Discussao acalorada     | No inicio da cena, Kilin e Mhordred discutem com Balastrus, o amarram com uma corda e se recusam a solta-lo. Ao mesmo tempo, Thorin conversa com Filena sobre Gildrat e as castas mais pobres.                                                                                                                                           | CS   |
| 1-C | Boas vindas tóxica      | O 1 andar da mina já oferece combate ao jogador, ainda que menos desafiador. Enquanto anda e verifica as máquinas o time entra em combate, com excessão de Balastrus.                                                                                                                                                                    | JOG  |
| 1-D | Quebra-cabeças metálico | O Jogador controla Thorin, que resolve o puzzle de valvulas para drenar lodo e abrir passagens. Cada etapa exige deixar um membro segurando uma das valvulas espalhadas pelo mapa para manter o fluxo e finalizar o quebra-cabeca.                                                                                                       | JOG  |
| 1-E | Inimigo do meu inimigo  | Sobra uma das válvulas que precisa ser pressionada ao mesmo tempo que as outras para que o quebra-cabeças funcione. Balastrus argumenta que o grupo não tem escolha. Por necessidade, eles o soltam.                                                                                                                                     | CS   |
| 1-F | O 5 elemento            | Balastrus se torna o 5 membro jogavel, permitindo Thorin prossiga com a resolução do problema.                                                                                                                                                                                                                                           | CS   |
| 1-G | Rebeldia                | Apos a tensao inicial, a passagem para o segundo andar se abre, Kilin chama Thorin para uma conversa longe dos outros e diz para ter cuidado com Balastrus. Menciona pela primeira vez as rebelioes em Gildrat e que grande parte do problema são contratantes mercenários e tiranos como ele. Filena fica desconfortavel com o assunto. | CS   |
| 1-H | Quebra de memoria       | A realidade da mina se dissipa e a cena corta para o Coreto, com Rheed e as criancas. Ele fala para elas sobre o símbolo de Trégua e a aventura que Thorin e os outros estão prestes a enfrentar. O grupo avança para o 2 andar.                                                                                                         | CS   |

##### Cena 2 - Galerias de Drenagem

| ID  | Titulo                  | Premissa Resumida                                                                                                                                                                                         | Tipo |
| --- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| 2-A | Nós não somos vampiros! | No 2 andar da mina as batalhas são mais acentuadas e, há um agravante. A visibilidade é muito baixa. O lugar é completamente escuro.                                                                      | JOG  |
| 2-B | Balastrus ao resgate.   | Após a primeira batalha no 2 andar, Thorin reclama da situação e Balastrus surge com um apetrecho, um tipo novo de luminária cientificamente desenvolvida que é capaz de clarear um pouco ao redor deles. | CS   |
| 2-C | Simbolo da Trégua       | O Jogador controla Thorin, que ganha o item Simbolo da Tregua após batalhar ao menos 5 vezes.                                                                                                             | JOG  |
| 2-D | Passadicos sobre lodo   | O Jogador controla Thorin, que atravessa passadicos estreitos sobre lodo toxico, com visibilidade baixa e aparicao frequente de monstros.                                                                 | JOG  |

##### Cena 3 - Camara de Decantacao Anoxica

| ID  | Titulo                  | Premissa Resumida                                                                                                                                                                                                                                                   | Tipo |
| --- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| 3-A | Camara final            | A camara e revelada, a visibilidade e restaurada e uma saida se apresenta, porem, o Pestesporo, cogumelo mutante gigante, aparece adormecido no centro.                                                                                                             | CS   |
| 3-B | O peixe morre pela boca | Balastrus e os guardas voltam a discutir, fazendo muito barulho e, com isso, despertando o Pestesporo.                                                                                                                                                              | JOG  |
| 3-C | Liberdade!              | Com o Pestesporo derrotado a saída finalmente está ao alcance. O grupo deixa a Mina do Esgoto e volta para a superfície. Assim que saem, a passagem pela qual atravessaram é bloqueada por um novo deslizamente de pedras. Eles não podem entrar novamente na mina. | CS   |

## 5 Fluxo de Gameplay (resumo)

Nivel 1-3 (combate leve): Entrada soterrada -> Discussao e corda em Balastrus -> Exploracao e combates leves -> Registros e sinalizacoes -> Casa de Valvulas (membro segurando valvula) -> Balastrus
como 5o membro -> Quebra de memoria no Coreto -> Simbolo da Tregua -> Descida ao Nivel 4.

Nivel 4 (combate intenso): Passadicos sobre lodo -> Salas de gradeamento -> Corredores de condensado -> Camara do boss -> Saida para a superficie bloqueada.
