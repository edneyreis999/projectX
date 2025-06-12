# Quest: A Noite da História

## 1. Visão Geral

* **Título interno:** a\_noite\_da\_historia
* **Premissa resumida:** Na Noite da História, Theodore Reed acolhe com bom humor a criança que chega atrasada — e, em homenagem a esse atraso, inicia sua narrativa ancestral com Thorin, um jovem anão que também acorda tarde no dia decisivo de sua vida.
* **Objetivo principal do jogador:** Alcançar a primeira fileira para interagir com Reed e iniciar a narrativa principal do jogo.
* **Emoção-âncora:** pertencimento, leveza, surpresa
* **Localizações centrais:** Praça de Daratrine
* **Personagens chave:** Theodore Reed (narrador), Jogador (criança)

## 2. Configuração Técnica Global

| Item              | Valor / Descrição                         |
| ----------------- | ----------------------------------------- |
| Switches globais  | N/A                                       |
| Variáveis globais | `v_nome_criança`, `v_A_Noite_da_História` |
| Plugins / Scripts | N/A                                       |
| Restrições gerais | N/A                                       |

## 3. Informações Básicas da Cena

* **Local e momento:** Praça de Daratrine, início da noite, clima festivo e mágico
* **Quem fala:** Theodore Reed
* **Quem ouve:** Jogador (criança anônima)
* **Relação prévia:** Nenhuma
* **Interação especial:** Reed sugere um nome (ex: "João"), e o jogador pode confirmar ou inserir outro
* **Conflito principal ou revelação:** Transição para o papel de Thorin — começo de uma grande aventura
* **Emoções principais:** Pertencimento, acolhimento, leveza (início); surpresa e ansiedade positiva (final)
* **Escolhas críticas:** Inserção do nome do jogador (armazenado em `v_nome_criança`)
* **Gatilho de início:** Jogador alcança a primeira fileira com brilho visual
* **Condição de encerramento:** Reed volta ao centro do palco e inicia o vídeo com a fala de transição
* **Assets:** Vídeo "Cutscene 1"
* **Integração técnica:** Mapa `map_019_Coreto_Base`, Evento `evt_cutscene_trigger`, Variável `v_nome_criança`

## 4. Cenas da Quest

### 4.1 Cena 1: Acolhida de Reed

* **Momento & clima:** início da noite, clima festivo e mágico
* **Resumo de premissa:** Durante a celebração, Reed acolhe o jogador com humor e o coloca no centro da narrativa que está prestes a começar.
* **Fluxo Cronológico:**

  * **Entrada:** Jogador entra na praça e deve chegar até a primeira fileira de crianças
  * **Evolução:** Reed interage, sugere um nome, faz piada com o atraso e permite inserção do nome
  * **Saída:** Reed retorna ao palco e anuncia o início da história com a frase sobre Gildrat → transição em vídeo

* **Emoções-chave por batida:**

| Batida                    | Emoção desejada            |
| ------------------------- | -------------------------- |
| Entrada na praça          | Curiosidade, encanto       |
| Caminhada até a fileira   | Pertencimento, acolhimento |
| Interação com Reed        | Humor, leveza, conexão     |
| Nomeação e personalização | Identificação, agency      |
| Retorno de Reed ao palco  | Surpresa, transição mágica |

* **Gatilho de início:** Jogador alcança a primeira fileira com brilho visual
* **Condições de término:** Reed retorna ao palco, fala a frase de transição e inicia o vídeo
* **Assets necessários:** vídeo "Cutscene 1"
* **Integração técnica local:**
  \| Item | ID / Nome | Observação |
  \|------|-----------|-----------|
  \| Mapa | `map_019_Coreto_Base` | Cena principal |
  \| Evento | `evt_cutscene_trigger` | Dispara o vídeo |
  \| Variável | `v_nome_criança` | Nome inserido pelo jogador |

## 5. Pendências & Riscos

| ❓ Pendência | Impacto | Próximo passo |
| ----------- | ------- | ------------- |
| Nenhuma     | ---     | ---           |

## 6. Histórico de Revisões

| Versão | Data       | Autor    | Mudança           |
| ------ | ---------- | -------- | ----------------- |
| 0.1    | 2025-06-12 | Curiosão | Documento inicial |
