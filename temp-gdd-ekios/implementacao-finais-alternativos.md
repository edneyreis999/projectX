# Documento de Implementação — Final Alternativo 2: “Cerco de Variáveis”

## Resumo geral da ideia

O **Final Alternativo 2 – Cerco de Variáveis** transforma o desfecho da história (Cena 14) em um **cerco dinâmico**, onde o resultado da batalha final depende diretamente das **decisões tomadas ao longo do jogo**.  
O jogador não apenas assiste ao clímax, mas **vive as consequências acumuladas** das escolhas feitas em Kravens, Melios, e nos arcos políticos anteriores.  
O cerco é conduzido por um **Índice de Preparação (IP)** — um sistema de flags e variáveis que altera eventos, falas, mortes e até o resultado moral do final.

Essa abordagem mantém o mesmo cenário da sua timeline (batalha em Gildrat, General Ignoto, overchannel de Thorin etc.), mas introduz **camadas de causalidade e impacto emocional**, fazendo o jogador sentir que o desfecho é consequência de todo o percurso.

---

## Como a ideia funciona

O **Cerco de Variáveis** é estruturado como um sistema de **acúmulo de preparo** e **resolução adaptativa**:

1. **Cada decisão anterior define flags de mundo**:  
   - `v_sigmetal_destino`: destino do Sigmetal define qualidade do armamento.  
   - `pai_filena_respeita_thorin`: define presença da Milícia de Kravens.  
   - `sáparo_recrutado`: ativa táticas de distração.  
   - `corvos_aliados`: define suporte mágico especial.  
   - `resgate_melios_sucesso`: altera moral e presença da Guarda de Ferro.  

2. **Essas flags alimentam um índice numérico** — o **Índice de Preparação (IP)**.  
   Cada valor positivo ou negativo influencia diretamente a dificuldade e o desfecho da Cena 14.

3. **Durante a batalha**, o IP é testado contra um limiar e altera o resultado:
   - IP alto → vitória tática e coesa, sem overchannel.  
   - IP médio → vitória parcial, com uso de poder onírico.  
   - IP baixo → vitória pírrica (perdas pesadas).  
   - IP muito baixo → derrota parcial, setup para o próximo jogo.

4. **O sistema também muda o tom dramático**:
   - Falas, música e planos de câmera se adaptam conforme o IP.  
   - O comportamento dos NPCs e a reação do povo expressam o *veredicto moral* do final.  

---

## Como adaptar trechos da história já existentes

| Elemento Original | Adaptação para o Cerco de Variáveis |
| ----------------- | ----------------------------------- |
| **Entrega do Sigmetal** (Cena 7) | Define qualidade do armamento: quanto mais ético e transparente o destino (colocar no baú de Kravens ou dividir com Balastrus), maior bônus no IP. |
| **Pai de Filena em Kravens** (Cena 13) | Se salvo e respeita Thorin, a Milícia de Kravens reforça a Linha 2 na Cena 14. |
| **Recrutamento de Sáparo** (Cena 11e) | Se o mascote for recrutado, ativa um evento especial: distrai parte dos Ignotos e reduz perdas. |
| **Corvos de Melios** (Cena 9) | Caso o jogador opte pela conciliação, eles entregam “cargas de canto” que atravessam o campo de mana do General Ignoto. |
| **Resgate de Kilin** (Cena 12) | Se bem-sucedido e sem muitas baixas, aumenta a eficiência da Guarda de Ferro em campo (melhor defesa). |

O resultado final é um sistema narrativo **modular**: cada ramificação já existente na sua timeline alimenta o cerco de Gildrat de forma orgânica, sem alterar a cronologia — apenas revalorizando eventos passados.

---

## Como adaptar a Cena 14

### 1. Estrutura geral

Divida a Cena 14 em **cinco segmentos reativos**:

1. **Preparação**  
   - Thorin e Filena coordenam a fortificação de Gildrat.  
   - O jogador pode visitar NPCs-chave (Balastrus, Kravens, Corvos) para confirmar suporte.  
   - UI diegética mostra “**Vantagem do Cerco: [Barra IP]**”.

2. **Atração e explosões (3 linhas)**  
   - A execução das linhas de dinamite muda conforme IP:  
     - IP alto → 3ª linha detona parcialmente o General.  
     - IP médio → General bloqueia a explosão (como no roteiro original).  
     - IP baixo → falha crítica, e os anões são forçados a recuar antes da 3ª detonação.

3. **Guerra aberta**  
   - Reforços chegam ou não conforme flags.  
   - Com Kravens e Corvos aliados, há cutscenes de apoio (flechas flamejantes ou cânticos).  
   - Sem aliados, civis são mortos em campo e a música muda para tom desesperado.

4. **Overchannel de Thorin (condicional)**  
   - Só ocorre se IP < 70.  
   - Thorin precisa arriscar o poder onírico; cena idêntica à versão atual, mas marcada como *“vitória forçada”*.

5. **Decisão de Mhordred**  
   - Escolha permanece (Evacuar ou Selar).  
   - As consequências mudam conforme IP:  
     - IP alto → ambas resultam em vitória com diferentes repercussões morais.  
     - IP baixo → qualquer escolha custa vidas e agrava a tensão do epílogo.

### 2. Pós-batalha (assembleia em campo)

Logo após o colapso do distrito:

- **Mini-assembleia** entre sobreviventes, Filena, Balastrus e Tordan.  
- O tom depende do IP e da escolha final:
  - IP alto → o povo aclama Thorin e a “Ordem da Trégua” é sugerida.  
  - IP médio → mistura de alívio e medo; Damburr pede “julgamento ao amanhecer”.  
  - IP baixo → o povo lamenta os mortos e questiona o comando; surgem rumores de traição.  

### 3. Pós-créditos

Troque o simples “exército no horizonte” por um **twist temático**:

- Em vez de um novo inimigo, mostre **as consequências da vitória**.  
- O Profeta observa um **fragmento da canção da mãe de Thorin** ecoando nas muralhas — e hesita.  
- O jogador entende: **o verdadeiro poder não é a magia de Thorin, mas o que ele aprendeu com o selo e o povo**.  

---

## Tópicos para responder “Como”

### Fortalecer Ressurreição  

- Insira diálogo antes do overchannel onde Thorin verbaliza o aprendizado:  
  > “Não lutamos para dominar. Lutamos para lembrar quem fomos.”  
- O *Elixir* é o **Cântico de Ressonância** — uma nova técnica de forja aprendida com os Corvos, capaz de selar as fendas oníricas.  
- Epílogo mostra Thorin forjando algo pequeno (um pingente, uma runa) com esse conhecimento — sinal de que ele trouxe algo do “Reino da Mana”.

---

### Veredicto temático agora: assembleia breve no campo  

- Substitui o tribunal posterior por uma **assembleia dos sobreviventes**.  
- Filena lidera a palavra; Balastrus tenta se justificar.  
- O diálogo do povo muda conforme IP:  
  - IP alto → “Um novo começo para Gildrat!”  
  - IP baixo → “Quantos mais vão morrer por promessas de poder?”  
- O jogador sente o peso moral da guerra **sem corte expositivo**.

---

### Dilema final como espelho do tema (vida vs cidade)  

- **Evacuar soldados** → prioriza os vivos, mas causa destruição material.  
- **Selar rota** → salva a cidade, mas sacrifica soldados.  
- A reação do povo após a assembleia reflete essa escolha.  
- Em IP alto, há reconhecimento de sacrifício.  
- Em IP baixo, a decisão vira polêmica pública.

---

### Somar flags em um Índice de Preparação  

- Variáveis com pesos (exemplo base):  

  ```js
  v_sigmetal_destino = 0–3; // 0 egoísta, 3 altruísta
  pai_filena_respeita_thorin = +2;
  sáparo_recrutado = +1;
  corvos_aliados = +3;
  resgate_melios_sucesso = +2;
