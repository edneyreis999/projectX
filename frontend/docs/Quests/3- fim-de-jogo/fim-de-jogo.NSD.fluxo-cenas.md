# 🎮 Narrative Structure Document (NSD) - Fluxo Visual De Cenas

## 📄 Quest: Fim de Jogo

### 1️⃣ Resumo Geral *(Checkpoint 0)*

* [x] **Concluído**
* **Nome da quest**: Fim de Jogo
* **Importância na campanha**: Main
* **Arco narrativo**: Recusa do Chamado
* **Quest anterior**: A Semifinal
* **Conflito central**: Thorin tenta afirmar seu valor no Futebol Rúnico enquanto o pai, General Tordan, impõe um trabalho “de verdade” e mantém controle absoluto sobre sua vida.
* **Objetivo narrativo global**: Provar talento e autonomia de Thorin versus a autoridade de Tordan.
* **Premissa resumida**: Após a semifinal, Thorin é escoltado para casa, discute com Tordan, exibe o troféu, é ridicularizado e termina forçado a encontrar Balastros para uma expedição às minas de Kravens.
* **Resumo**: Thorin é escoltado por dois guardas imperiais até o Distrito Residencial e o jogador retoma o controle apenas para atravessar a rua até a Casa Forja Prata 🎮. Assim que entra, uma cutscene assume 🎬: Tordan já o aguarda na cozinha. O diálogo oferece três tons possíveis (respeitoso, sarcástico ou rebelde), mas sempre converge quando Thorin pega o troféu da semifinal na sala de troféus e o exibe ao pai. Tordan ri, rotula o prêmio de “sucata brilhante” e decreta que futebol rúnico não é futuro; impõe, então, que ao amanhecer Thorin se apresente a Balastros na taverna para partir numa expedição às minas de Kravens. No corredor, Sáparo-boca-de-corneta aparece apenas para zombar — “Olha o campeão voltando no cabresto!” — acentuando a humilhação. Sem alternativas imediatas, Thorin sobe ao quarto 🎮; a missão encerra com ele deitado, dividido entre obedecer ou lutar pelos próprios sonhos, indo na manhã seguinte treinar com Filena a jogada especial que estavam bolando.
* **Locais principais**:

  * Distrito Residencial
  * Casa da Família Forja Prata (entrada, cozinha/sala de jantar, corredor, quarto de Thorin)
* **NPCs principais**:

  * General Tordan
  * Guardas Imperiais
  * Sáparo-boca-de-corneta

---

### 2️⃣ Pré-condições Narrativas *(Checkpoint 1)*

* [x] **Concluído**

| Tipo                            | Descrição                                                                                 |
| ------------------------------- | ----------------------------------------------------------------------------------------- |
| **Flags / Decisões anteriores** | Jogador concluiu a quest "A Semifinal"                                                    |
| **Limitações ou bloqueios**     | Nenhum requisito adicional; missão inicia automaticamente após "A Semifinal" ao anoitecer |

---

### 3️⃣ Fluxo Visual Resumido *(Checkpoint 2)*

* [x] **Concluído**

```plaintext
Quest: Fim de Jogo
 ├── Cena 1: Chegada sob Vigilância — Guardas deixam Thorin no Distrito; comandante comenta ordens do pai.
 │      ├── Beat 1: Escolta a Pé — Guardas conduzem Thorin (🎬)
 │      ├── Beat 2: “Ordens do Pai” — Comandante justifica (🎬)
 │      ├── Beat 3: Liberação de Controle (🎮)
 │      ├── Beat 4: Travessia da Rua — Indignação de Thorin (🎮)
 │      └── Beat 5: À Porta — Trigger (🎮)
 ├── Cena 2: Porta do Destino — Entrada na Casa Forja Prata.
 │      ├── Beat 1: Interagir com a Porta (🎮)
 │      ├── Beat 2: Primeiro Passo no Hall (🎮)
 │      ├── Beat 3: Fechadura Ecoa (🎬)
 │      ├── Beat 4: Olhar para a Cozinha (🎬)
 │      └── Beat 5: Transição de Controle (🎬)
 ├── Cena 3: Choque na Cozinha — Discussão com Tordan.
 │      ├── Beat 1: Entrada na Cozinha (🎬)
 │      ├── Beat 2: Ferida de Classe (🎬)
 │      ├── Beat 3: Ramificação de Diálogo (🎬)
 │      ├── Beat 4: Convergência – Defesa do Sonho (🎬)
 │      ├── Beat 5: Desdém de Tordan (🎬)
 │      └── Beat 6: Objetivo Atualizado (🎮)
 ├── Cena 4: Busca do Troféu — Thorin procura troféu antigo de Tordan.
 │      ├── Beat 1: De Volta ao Corredor (🎮)
 │      ├── Beat 2: Sáparo no Puleiro (🎬)
 │      ├── Beat 3: Busca na Cômoda (🎮)
 │      ├── Beat 4: Troféu do Passado (🎮)
 │      ├── Beat 5: Reflexão Instantânea (🎬)
 │      └── Beat 6: Volta à Cozinha (🎮)
 ├── Cena 5: Troféu Desprezado — Tordan ridiculariza troféu.
 │      ├── Beat 1: Entrega Solene (🎬)
 │      ├── Beat 2: Retrato Revelador (🎬)
 │      ├── Beat 3: Desprezo Público (🎬)
 │      ├── Beat 4: Humilhação (🎬)
 │      └── Beat 5: Objetivo Mudado (🎮)
 ├── Cena 6: Sentença às Minas — Ordem de trabalho.
 │      ├── Beat 1: Levantada de Autoridade (🎬)
 │      ├── Beat 2: Ordem Irrevogável (🎬)
 │      ├── Beat 3: Saída & Porta Fechada (🎬)
 │      ├── Beat 4: Corredor Livre (🎮)
 │      ├── Beat 5: Caminho Solitário (🎮)
 │      └── Beat 6: Deitar e Encerrar (🎬)
 └── Cena 7: Silêncio no Quarto — Thorin reflete e dorme.
        ├── Beat 1: Entrar no Quarto (🎮)
        ├── Beat 2: Pensamento Único (🎬)
        └── Beat 3: Dormir & Encerrar (🎬)
```

#### Tabela de Cenas

| # | Nome da Cena           | Cronologia (ordem dos eventos)                                                              | Premissa                                                                                |
| - | ---------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| 1 | Chegada sob Vigilância | Guarda acompanha Thorin → Comandante justifica ordens → Jogador atravessa rua até porta     | Guardas deixam Thorin em casa e comentam as ordens de Tordan.                           |
| 2 | Porta do Destino       | Interagir com porta → Hall escuro → Porta fecha → Tordan revelado                           | Thorin entra na Casa Forja Prata, isolando-se do mundo externo.                         |
| 3 | Choque na Cozinha      | Tordan condena futebol → Diálogo ramificado → Defesa do sonho → Desdém do pai               | Thorin confronta o pai sobre o sonho de jogar futebol rúnico e o preconceito de classe. |
| 4 | Busca do Troféu        | Objetivo “lembrar Tordan” → Sáparo zomba → Thorin encontra troféu juvenil do pai → Reflexão | Thorin busca um troféu antigo para lembrar Tordan de seus próprios sonhos.              |
| 5 | Troféu Desprezado      | Entrega do troféu → Retrato reflete nostalgia → Desprezo público → Humilhação               | Tordan despreza seu próprio troféu e o sonho de Thorin, aprofundando o conflito.        |
| 6 | Sentença às Minas      | Tordan impõe trabalho → Saída brusca → Porta trancada → Corredor livre                      | Tordan obriga Thorin a trabalhar nas minas sob Balastros, selando a ordem.              |
| 7 | Silêncio no Quarto     | Thorin entra no quarto → Pensamento único → Dorme                                           | Thorin pondera seus sonhos antes de adormecer, encerrando a missão.                     |

#### Beats por Cena

##### Cena 1 – Chegada sob Vigilância

| # | Nome do Beat              | Premissa Resumida                                                                                                                              | Tipo |
| - | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| 1 | **Escolta a Pé**          | Guardas imperiais conduzem Thorin a pé até o Distrito Residencial e o largam diante de casa.                                                   | 🎬   |
| 2 | **“Ordens do Pai”**       | Comandante pede desculpas e lembra que só cumpre as ordens de Tordan.                                                                          | 🎬   |
| 3 | **Liberação de Controle** | HUD reaparece; destino marcado na porta da Casa Forja Prata.                                                                                   | 🎮   |
| 4 | **Travessia da Rua**      | Jogador guia Thorin; ele solta uma frase de indignação meio “menino mimado” enquanto atravessa (“Pelo amor dos deuses… não sou prisioneiro!”). | 🎮   |
| 5 | **À Porta**               | Trigger ao tocar a porta; prepara a cutscene seguinte.                                                                                         | 🎮   |

##### Cena 2 – Porta do Destino

| # | Nome do Beat           | Premissa Resumida                                                                     | Tipo |
| - | ---------------------- | ------------------------------------------------------------------------------------- | ---- |
| 1 | Interagir com a Porta  | Jogador pressiona a interação; Thorin empurra a porta e entra.                        | 🎮   |
| 2 | Primeiro Passo no Hall | Jogador dá dois ou três passos para dentro; a câmera revela o corredor mal-iluminado. | 🎮   |
| 3 | Fechadura Ecoa         | Porta se fecha sozinha com estrondo abafado (sinal de “confinado em casa”).           | 🎬   |
| 4 | Olhar para a Cozinha   | Câmera faz leve pan mostrando Tordan de costas, já à mesa.                            | 🎬   |
| 5 | Transição de Controle  | Fade curto; cutscene da Cena 3 (Choque na Cozinha) é disparada.                       | 🎬   |

##### Cena 3 – Choque na Cozinha

| # | Nome do Beat                   | Premissa Resumida                                                                                                                | Tipo |
| - | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | ---- |
| 1 | Entrada na Cozinha             | Thorin cruza o batente; Tordan à mesa, brasão do exército sobre o peito.                                                         | 🎬   |
| 2 | Ferida de Classe               | Tordan esbraveja que viu o filho “brincando de esporte de subúrbio” e diz que isso mancha o nome da família.                     | 🎬   |
| 3 | Ramificação de Diálogo         | Jogador escolhe tom **(Respeitoso / Sarcástico / Rebelde)**; linhas mudam, mas Tordan insiste no argumento de vergonha e legado. | 🎬   |
| 4 | Convergência – Defesa do Sonho | Thorin retruca que quer traçar o próprio caminho; menciona que o futebol rúnico também exige coragem.                            | 🎬   |
| 5 | Desdém de Tordan               | “Coragem? O Império precisa de generais, não de saltimbancos suburbanos!” — Tordan finaliza com a humilhação.                    | 🎬   |
| 6 | Objetivo Atualizado            | UI pinga meta “Mostrar o troféu a Tordan”; controle volta ao jogador.                                                            | 🎮   |

##### Cena 4 – Busca do Troféu

| # | Nome do Beat             | Premissa resumida                                                                                         | Tipo |
| - | ------------------------ | --------------------------------------------------------------------------------------------------------- | ---- |
| 1 | **De Volta ao Corredor** | HUD exibe objetivo “Encontre algo que faça Tordan lembrar quem já foi”.                                   | 🎮   |
| 2 | **Sáparo no Puleiro**    | Sáparo-boca-de-corneta, empoleirado ao lado da cama, provoca: “Cadê seu uniforme de minerador, campeão?”. | 🎬   |
| 3 | **Busca na Cômoda**      | Jogador explora o quarto e descobre um troféu antigo de Tordan (campeão juvenil de futebol rúnico).       | 🎮   |
| 4 | **Troféu do Passado**    | Thorin pega o troféu do pai; close-up mostra o nome de Tordan gravado.                                    | 🎮   |
| 5 | **Reflexão Instantânea** | Thorin sussurra: “Se ele lembrar que também sonhou, talvez entenda…”.                                     | 🎬   |
| 6 | **Volta à Cozinha**      | Objetivo atualizado: “Entregue o troféu a Tordan”; jogador retorna ao cômodo anterior.                    | 🎮   |

##### Cena 5 – Troféu Desprezado

| # | Nome do Beat          | Premissa resumida                                                                                     | Tipo |
| - | --------------------- | ----------------------------------------------------------------------------------------------------- | ---- |
| 1 | **Entrega Solene**    | Thorin estende ao pai o troféu juvenil marcado com “Tordan”.                                          | 🎬   |
| 2 | **Retrato Revelador** | Na janela de diálogo, o portrait de Tordan pisca um instante de nostalgia antes de endurecer de novo. | 🎬   |
| 3 | **Desprezo Público**  | Tordan ergue o troféu, chama-o de “sucata brilhante” e o larga sobre a mesa com estardalhaço.         | 🎬   |
| 4 | **Humilhação**        | “Futebol de subúrbio nunca trouxe honra a ninguém” — ele reafirma a vergonha familiar.                | 🎬   |
| 5 | **Objetivo Mudado**   | Close em Thorin cerrando o punho; HUD exibe nova meta “Confronte Tordan ou recue”.                    | 🎮   |

##### Cena 6 – Sentença às Minas

| # | Nome do Beat                | Premissa resumida                                                                                                                                    | Tipo |
| - | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| 1 | **Levantada de Autoridade** | Tordan ergue-se da cadeira, impondo presença sobre Thorin.                                                                                           | 🎬   |
| 2 | **Ordem Irrevogável**       | Portrait de Tordan mostra frieza enquanto decreta: “Amanhã ao amanhecer apresentar-se-á a Balastros na taverna. Aprendiz de minerador. Ponto final.” | 🎬   |
| 3 | **Saída & Porta Fechada**   | Tordan vira de costas, dá dois - três passos; quick fade-out/fade-in revela-o já dentro do próprio quarto, porta sendo trancada.                     | 🎬   |
| 4 | **Corredor Livre**          | Cutscene termina; controle volta ao jogador, HUD: “Volte para seu quarto e descanse”.                                                                | 🎮   |
| 5 | **Caminho Solitário**       | Jogador conduz Thorin pelo corredor vazio até o quarto dele.                                                                                         | 🎮   |
| 6 | **Deitar e Encerrar**       | Thorin deita; tela escurece, missão termina.                                                                                                         | 🎬   |

##### Cena 6 – Silêncio no Quarto

| # | Nome do Beat          | Premissa resumida                                                                   | Tipo |
| - | --------------------- | ----------------------------------------------------------------------------------- | ---- |
| 1 | **Entrar no Quarto**  | Jogador conduz Thorin porta adentro; luz fraca, ambiente silencioso.                | 🎮   |
| 2 | **Pensamento Único**  | Ao interagir com a cama, surge um balão de pensamento: “Nem a pau que eu vou nessa taverna amanhã…”. | 🎬   |
| 3 | **Dormir & Encerrar** | Tela escurece, som abafado da torcida ao fundo; quest concluída.                    | 🎬   |
