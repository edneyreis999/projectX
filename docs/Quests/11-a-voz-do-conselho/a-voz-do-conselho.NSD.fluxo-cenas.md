# Narrative Structure Document (NSD) - Fluxo Visual De Cenas

## Quest: A Voz do Conselho

### 1 Resumo Geral (Checkpoint 0)

- [x] Concluido
- Nome da quest: A Voz do Conselho
- Importancia na campanha: Main
- Arco narrativo: Encontro com o Mentor / Travessia do Primeiro Limiar
- Quest anterior: A Travessia Perigosa
- Conflito central: Depois de Kravens, Thorin entra no circuito politico de Gildrat, tenta reagir a ausencia de Filena e e forçado a seguir Balastrus entre conselho, decreto imperial e novo choque com
  os Corvos.
- Objetivo narrativo global: Conectar a volta de Kravens ao conselho imperial, transformar o conflito com Filena em pauta de estado e abrir a frente de Melios com confronto direto contra os Corvos.
- Premissa resumida: Thorin desperta na Casa dos Forjaprata e percebe a ausencia incomum de Thordan. Na taverna, Balastrus paga a expedicao, revela que Filena partiu para tentar um resgate e convoca
  Thorin para a reuniao do conselho. No castelo, o debate sobre crise social escala com a chegada de Filena acusada de roubo de dinamites. A crise vira combate, gera sentenca politica e culmina no
  decreto para Melios. O grupo se reorganiza, avanca pela rota de Ekios e encontra os Corvos na entrada de Melios, onde a disputa por autoridade explode em batalha.
- Resumo: Em casa (Mapa 6), Thorin e puxado por pressagios e pela ausencia de Thordan. Na taverna (Mapa 12), Balastrus liquida o pagamento, corta qualquer desvio de rota e leva Thorin para o castelo
  via Distrito Residencial (Mapa 7). Na Sala do Conselho (Mapa 11), Dambur tenta sustentar o controle do imperio diante de revoltas. Filena invade o debate como acusada por uso de explosivos e
  denuncia opressao; Thorin reage, a tensao vira confronto e a disputa abre espaco para Balastrus garantir Melios. Apos a audiencia, o grupo marcha por Ekios (Mapa 3), cruza para a entrada de Melios e
  encontra os Corvos (Mapa 40). O decreto real e apresentado, a negociacao falha e o combate sela o fim da quest, liberando a progressao do arco seguinte.

- Locais principais
  - Casa dos Forjaprata (Mapa 6)
  - Taverna de Gildrat (Mapa 12)
  - Distrito Residencial Nobre / acesso ao castelo (Mapa 7)
  - Sala do Conselho de Gildrat (Mapa 11)
  - Rota de Ekios / transicao para Melios (Mapa 3)
  - Entrada de Melios / Clareira de Melios (Mapa 40)
- NPCs principais
  - Thorin
  - Balastrus
  - Filena
  - Dambur
  - Thordan
  - Killin
  - Mhordred
  - Corvinus e guarda dos Corvos

---

### 2 Pre-condicoes Narrativas (Checkpoint 1)

- [x] Concluido

| Tipo                        | Descricao                                                                                                                 |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Flags / Decisoes anteriores | Jogador concluiu a quest "A Travessia Perigosa"                                                                           |
| Limitacoes ou bloqueios     | Progressao de cena depende da variavel `v_q_voz_conselho_progress` (v35), com avancos entre os mapas 6, 12, 7, 11, 3 e 40 |

---

### 3 Fluxo Visual Resumido (Checkpoint 2)

- [x] Concluido

```plaintext
Quest: A Voz do Conselho
 +-- Cena 1: Casa dos Forjaprata (Mapa 6)
 |      +-- Beat 1: Pressagio, ausencia de Thordan e partida urgente
 +-- Cena 2: Taverna de Gildrat (Mapa 12)
 |      +-- Beat 1: Pagamento, noticia de Filena e convocacao ao conselho
 +-- Cena 3: Distrito Residencial / caminho ao castelo (Mapa 7)
 |      +-- Beat 1: Thorin e pressionado a encarar o conselho
 +-- Cena 4: Conselho imperial - crise politica (Mapa 11)
 |      +-- Beat 1: Debate sobre revoltas e tentativa de Dambur de manter controle
 +-- Cena 5: Conselho imperial - caso Filena e decisao (Mapa 11)
 |      +-- Beat 1: Filena e acusada, tensao vira combate e Balastrus garante Melios
 +-- Cena 6: Reagrupamento e marcha para Melios (Mapa 3)
 |      +-- Beat 1: Grupo reorganiza rota e avanca para a entrada de Melios
 +-- Cena 7: Entrada de Melios - confronto com os Corvos (Mapa 40)
        +-- Beat 1: Decreto e contestado, negociacao falha e combate encerra a quest
```

#### Tabela de Cenas

| #   | Nome da Cena                  | Premissa resumida (expandida)                                                                                         |
| --- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 1   | **Pressagio em Casa**         | Thorin desperta inquieto, percebe que Thordan nao voltou e e empurrado para agir rapido.                               |
| 2   | **Acerto na Taverna**         | Balastrus paga a equipe, informa que Filena partiu para um resgate e arrasta Thorin para o conselho.                  |
| 3   | **Antes do Conselho**         | No trajeto ao castelo, Killin e Mhordred testam a postura de Thorin diante da pressao politica.                        |
| 4   | **Crise no Conselho**         | Dambur e os conselheiros discutem revoltas, escassez e perda de controle do imperio.                                  |
| 5   | **Filena no Centro da Crise** | A acusacao contra Filena explode em conflito; Thorin se envolve e Balastrus converte o caos em concessao para Melios. |
| 6   | **Marcha para Melios**        | Com a decisao tomada, o grupo se recompone em rota e parte para a frente de Melios.                                   |
| 7   | **Covil de Corvos**           | Corvinus rejeita a tomada da mina; Balastrus exibe o decreto e o impasse termina em batalha.                          |

#### Beats por Cena

##### Cena 1 - Pressagio em Casa (Mapa 6)

| ID  | Titulo                        | Premissa Resumida                                                        | Tipo |
| --- | ----------------------------- | ------------------------------------------------------------------------ | ---- |
| 1-A | Ausencia                      | Thorin percebe que Thordan nao voltou para casa e estranha a situacao.    | JOG  |
| 1-B | Pressagio                     | O sonho com Melia reforca urgencia e risco iminente.                     | CS   |
| 1-C | Inquietacao                   | Thorin internaliza o peso dos sinais e decide agir.                      | CS   |
| 1-D | Camarao que dorme a onda leva | Saparo provoca Thorin pelo atraso e lembra do compromisso com Balastrus. | CS   |
| 1-E | RUN, Thorin! RUN!             | Thorin se prepara e sai correndo para a taverna.                         | JOG  |

##### Cena 2 - Acerto na Taverna (Mapa 12)

| ID  | Titulo                   | Premissa Resumida                                                           | Tipo |
| --- | ------------------------ | --------------------------------------------------------------------------- | ---- |
| 2-A | Foi sem querer querendo  | Thorin chega atrasado e tenta justificar a demora.                          | CS   |
| 2-B | Tartaruga paralitica     | Balastrus corta as desculpas e reafirma hierarquia.                         | CS   |
| 2-C | Choque de realidade      | Thorin recebe valor abaixo do esperado e questiona o contexto social.       | CS   |
| 2-D | Super-heroina barata     | Balastrus diz que Filena saiu para um resgate em Kravens usando explosivos. | CS   |
| 2-E | O mundo e dos gados      | Thorin quer ir atras de Filena, mas e interrompido.                         | CS   |
| 2-F | Adolescentes apaixonados | Balastrus obriga Thorin a acompanha-lo para o conselho.                     | CS   |
| 2-G | E hora do show           | Killin sinaliza que a reuniao do conselho sera tensa.                        | CS   |

##### Cena 3 - Antes do Conselho (Mapa 7)

| ID  | Titulo             | Premissa Resumida                                                        | Tipo |
| --- | ------------------ | ------------------------------------------------------------------------ | ---- |
| 3-A | Coragem            | Killin pressiona Thorin a sustentar o nome Forjaprata diante do conselho. | CS   |
| 3-B | Covardia           | Mhordred provoca Thorin e aumenta a pressao pessoal.                     | CS   |
| 3-C | Piada              | Thorin responde que nao vai fugir das responsabilidades.                 | CS   |
| 3-D | Entrada no castelo | Grupo cruza o acesso do castelo e inicia a audiencia.                    | JOG  |

##### Cena 4 - Crise no Conselho (Mapa 11)

| ID  | Titulo                      | Premissa Resumida                                                     | Tipo |
| --- | --------------------------- | --------------------------------------------------------------------- | ---- |
| 4-A | Eu sou o REI!               | Dambur impõe autoridade e nega perda de controle.                     | CS   |
| 4-B | Revolucao                   | Conselheiros confrontam o discurso com revoltas em Gildrat.           | CS   |
| 4-C | Mao do Imperador            | Thordan endurece o tom para sustentar o poder imperial.                | CS   |
| 4-D | Sem saida                   | O conselho expoe falta de alternativas politicas e materiais.         | CS   |
| 4-E | Gildrat nao sera desafiada! | Dambur dobra a aposta contra os rebeldes.                             | CS   |
| 4-F | Convidados                  | Dambur nota Balastrus e autoriza o relatorio da expedicao.            | CS   |
| 4-G | Resultados/Sigmetal         | Balastrus apresenta resultados de Kravens e sua vantagem operacional. | CS   |
| 4-H | Salvo pelo gongo            | O relatorio vira escudo politico para Dambur encerrar a pressao.      | CS   |

##### Cena 5 - Filena no Centro da Crise (Mapa 11)

| ID  | Titulo                               | Premissa Resumida                                                               | Tipo |
| --- | ------------------------------------ | ------------------------------------------------------------------------------- | ---- |
| 5-A | Dinamite nao e brinquedo de criancas | Guardas interrompem a sessao e apresentam a ocorrencia com Filena e explosivos. | CS   |
| 5-B | Quem voce pensa que e?!              | Dambur reage como ofensa direta ao imperio.                                     | CS   |
| 5-C | A senhorita e uma espertinha!        | Balastrus interroga Filena sobre acesso a dinamites.                            | CS   |
| 5-D | Porcos opressores!                   | Filena acusa o sistema de castas e denuncia abandono dos trabalhadores presos.  | CS   |
| 5-E | Eu vou silencia-la!                  | Um guarda ameaca calar Filena a forca.                                          | CS   |
| 5-F | Thorin ao resgate!                   | Thorin desafia o guarda para impedir agressao contra Filena.                    | CS   |
| 5-G | Eu vou acabar com voce, garoto!      | O guarda impõe confronto e a disputa vira batalha.                              | JOG  |
| 5-H | Xeque-mate politico                  | Apos o choque, Balastrus negocia a concessao de Melios com Thorin na expedicao. | CS   |

##### Cena 6 - Marcha para Melios (Mapa 3)

| ID  | Titulo             | Premissa Resumida                                                      | Tipo |
| --- | ------------------ | ---------------------------------------------------------------------- | ---- |
| 6-A | Pe na estrada      | Balastrus apressa o grupo e antecipa resistencia dos Corvos em Melios. | CS   |
| 6-B | Travessia de Ekios | O grupo segue pela rota de transicao ate a entrada de Melios.          | JOG  |

##### Cena 7 - Covil de Corvos (Mapa 40)

| ID  | Titulo                          | Premissa Resumida                                                             | Tipo |
| --- | ------------------------------- | ----------------------------------------------------------------------------- | ---- |
| 7-A | Tempos sombrios                 | Corvinus contextualiza a crise interna dos Corvos em Melios.                  | CS   |
| 7-B | O corvo de uma unica asa        | Maus pressagios reforcam o clima de confronto iminente.                       | CS   |
| 7-C | Covil de corvos                 | Os Corvos identificam a chegada do grupo como invasao hostil.                 | CS   |
| 7-D | Batalha iminente                | Corvinus cobra explicacoes por entrada sem permissao.                         | CS   |
| 7-E | Decreto real                    | Balastrus apresenta o decreto imperial e reivindica controle da frente.       | CS   |
| 7-F | Honra                           | A guarda dos Corvos recusa a legitimidade de Balastrus e chama para o embate. | CS   |
| 7-G | Eu nao faria isso se fosse voce | Mhordred responde com intimidacao direta e arma o inicio da luta.             | JOG  |
| 7-H | Clareira liberada               | A batalha termina, os Corvos recuam e a progressao da campanha e destravada.  | JOG  |
