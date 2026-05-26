# Narrative Structure Document (NSD) - Fluxo Visual De Cenas

## Quest: Travessia Toxica

### 1 Resumo Geral (Checkpoint 0)

- [x] Concluido
- Nome da quest: Travessia Toxica
- Importancia na campanha: Main
- Arco narrativo: Prova do Limiar
- Quest anterior: Travessia Perigosa
- Conflito central: Um deslizamento bloqueia a rota de retorno e obriga o grupo a atravessar a Mina de Esgoto, onde tensoes internas, ambiente toxico e um boss adormecido transformam a retirada em sobrevivencia.
- Objetivo narrativo global: Converter o retorno de Kravens em uma travessia de alto risco, aprofundar conflitos entre Balastrus e os guardas, e encerrar com combate-chave antes da volta para a superficie.
- Premissa resumida: A avalanche corta a passagem no Mapa 3 e o grupo e forcado a buscar rota alternativa pela Mina de Esgoto (Mapa 24). Dentro da mina, pistas e documentos guiam a progressao enquanto a equipe discute estrategia e convivencia. No Mapa 25, a travessia acelera e uma quebra de memoria com Rheed reforca o tema do Simbolo de Tregua. No Mapa 26, ao avistar a saida, o grupo cruza uma camara com boss adormecido; o plano de evitar confronto falha e o combate encerra a quest.
- Resumo: Na Estrada do Cao Luar (Mapa 3), o grupo descobre que o caminho foi interditado por deslizamento. Sem rota externa segura, Thorin segue para a Mina de Esgoto (Mapa 24), onde a exploracao combina leitura de registros, orientacoes taticas e desgaste entre os membros. O avancar para o 2F (Mapa 25) mantem a pressao e inclui uma quebra de memoria narrada por Rheed sobre o Simbolo de Tregua. A descida final ao 3F (Mapa 26) parece abrir a fuga, mas um boss adormecido ocupa o unico caminho. A tensao entre Balastrus, Kilin e Mhordred escala ate o confronto, e a vitoria libera o retorno para a superficie.

- Locais principais
  - Estrada do Cao Luar (Mapa 3)
  - Mina de Esgoto 1F (Mapa 24)
  - Mina de Esgoto 2F (Mapa 25)
  - Mina de Esgoto 3F / Camara final (Mapa 26)
- NPCs principais
  - Thorin
  - Filena
  - Balastrus
  - Kilin
  - Mhordred
  - Rheed (quebra de memoria)
- Ameacas principais
  - Avalanche / deslizamento
  - Ambiente toxico da mina
  - Boss da camara final

---

### 2 Pre-condicoes Narrativas (Checkpoint 1)

- [x] Concluido

| Tipo                        | Descricao                                                                                                       |
| --------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Flags / Decisoes anteriores | Jogador concluiu a quest "Travessia Perigosa"                                                                   |
| Limitacoes ou bloqueios     | Progressao depende de `v_q_travessia_toxica_progress` (var 40), iniciando no mapa 3 e seguindo para 24, 25 e 26 |

---

### 3 Fluxo Visual Resumido (Checkpoint 2)

- [x] Concluido

```plaintext
Quest: Travessia Toxica
 +-- Cena 1: Estrada do Cao Luar - Rota bloqueada (Mapa 3)
 |      +-- Beat 1: Avalanche interrompe retorno e grupo busca rota alternativa
 +-- Cena 2: Mina de Esgoto 1F - Investigacao e tensao (Mapa 24)
 |      +-- Beat 1: Equipe entra na mina, coleta pistas e organiza estrategia
 +-- Cena 3: Mina de Esgoto 2F - Travessia e quebra de memoria (Mapa 25)
 |      +-- Beat 1: Avanco pelos corredores e interludio narrativo com Rheed
 +-- Cena 4: Mina de Esgoto 3F - Camara final e boss (Mapa 26)
        +-- Beat 1: Grupo tenta evitar confronto, falha e encerra a quest em batalha
```

#### Tabela de Cenas

| #   | Nome da Cena               | Premissa resumida (expandida)                                                                                                   |
| --- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Rota Interditada**       | O deslizamento fecha o caminho no mapa externo e obriga Thorin a liderar o grupo para dentro da mina.                           |
| 2   | **Mina em Estado Critico** | No 1F, o grupo alterna exploracao, leitura de registros e discussao sobre como atravessar o sistema subterraneo.                |
| 3   | **Memoria e Pressao**      | O 2F sustenta o ritmo de travessia e traz a quebra de memoria com Rheed, reforcando o simbolismo da tregua no meio do caos.     |
| 4   | **Camara do Boss**         | Ao encontrar a saida, o grupo precisa cruzar uma area com boss adormecido; o conflito desperta a ameaca e a luta define a fuga. |

#### Beats por Cena

##### Cena 1 - Rota Interditada (Mapa 3)

| ID    | Titulo                                     | Premissa Resumida                                                           | Tipo |
| ----- | ------------------------------------------ | --------------------------------------------------------------------------- | ---- |
| 1-A   | Avalanche                                  | O grupo fica preso apos um deslizamento de pedras e perde a rota principal. | CS   |
| 1-B   | The other way                              | Thorin e equipe concluem que precisam abrir um caminho alternativo.         | CS   |
| 1-C/A | Mercenario                                 | Mhordred culpa Balastrus por manter a expedicao em condicoes extremas.      | CS   |
| 1-C/B | Consequencias                              | Kilin reforca que Balastrus respondera pelo risco assumido.                 | CS   |
| 1-D   | Voce sabe com quem esta falando?           | Balastrus rebate os guardas e insiste em sua autoridade.                    | CS   |
| 1-E   | Nao adianta chorar sobre o leite derramado | O grupo aceita a passagem pela montanha e parte para a Mina de Esgoto.      | JOG  |

##### Cena 2 - Mina em Estado Critico (Mapa 24)

| ID | Titulo | Premissa Resumida | Tipo |
| --- | --- | --- | --- |
| 1-F | E melhor nos separar e procurar por pistas! | A equipe entra no 1F e inicia varredura por informacoes da estrutura. | JOG |
| 1-G | Livro antigo | Thorin encontra um registro tecnico que sugere rotas e mecanismos da mina. | JOG |
| 1-H | Livro dos Mineradores Ferrosos | Filena interpreta o livro e direciona os proximos passos do grupo. | CS |
| 1-I/A | A boa estrategia e sempre o melhor ataque | Kilin exige coordenacao e eficiencia para atravessar o setor. | CS |
| 1-I/B | Orgulho de guerreiro | Mhordred rejeita planejamento excessivo e prefere confronto direto. | CS |
| 1-I/C | Mesmo barco | Filena impoe cooperacao para manter o grupo vivo. | CS |
| 1-I/D | Cade o Balastrus? | Thorin nota o sumico de Balastrus durante a progressao. | CS |
| 1-J | Enigma sujo | Filena explica como superar o trecho de puzzle/mecanismo da mina. | CS |

##### Cena 3 - Memoria e Pressao (Mapa 25)

| ID  | Titulo                 | Premissa Resumida                                                                             | Tipo |
| --- | ---------------------- | --------------------------------------------------------------------------------------------- | ---- |
| 2-A | Corredores de drenagem | O grupo avanca pelo 2F rumo a descida final, com pressao constante de combate e deslocamento. | JOG  |
| 2-B | Quebra de memoria      | Rheed interrompe o fluxo da acao e relaciona a travessia ao Simbolo de Tregua.                | CS   |
| 2-C | Retorno ao foco        | A lembranca termina e a equipe retoma a marcha para o 3F.                                     | JOG  |

##### Cena 4 - Camara do Boss (Mapa 26)

| ID  | Titulo                  | Premissa Resumida                                                                 | Tipo |
| --- | ----------------------- | --------------------------------------------------------------------------------- | ---- |
| 3-A | Boss adormecido         | O grupo encontra a camara final e percebe que a ameaca principal esta adormecida. | CS   |
| 3-B | Do grego, estrategia    | Filena tenta articular uma passagem sem combate direto.                           | CS   |
| 3-C | Lugar estranho          | Mhordred comenta o medo do que Gildrat esconde sob a cidade.                      | CS   |
| 3-D | Sarcasmo                | Balastrus corta a discussao e pressiona avancar.                                  | CS   |
| 3-E | Terra a vista, marujos! | Thorin identifica a saida e acelera a tentativa de fuga.                          | CS   |
| 3-F | Alivio                  | Filena reage ao vislumbre de escapatoria.                                         | CS   |
| 3-G | Sem paciencia           | Balastrus volta a provocar o grupo na reta final.                                 | CS   |
| 3-H | Criancas briguentas     | Kilin encerra a discussao, mas a tensao desperta o confronto final.               | JOG  |
| 3-I | Saida liberada          | Vitoria no combate e retorno para a superficie encerram a quest.                  | JOG  |
