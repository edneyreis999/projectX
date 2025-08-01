# 🎮 Narrative Structure Document (NSD) - Fluxo Visual De Cenas

## 📄 Quest: Minerador Aprendiz

### 1️⃣ Resumo Geral *(Checkpoint 0)*

- [x] **Concluído**

- **Nome da quest**: Minerador Aprendiz
- **Importância na campanha**: Main
- **Arco narrativo**: Recusa do Chamado
- **Quest anterior**: Primeiro Contrato
- **Conflito central**: Thorin só quer terminar seu serviço como minerador e voltar para casa o mais rápido possível, mas acaba caindo em um andar esquecido da mina, onde enfrenta o Cristaleão — uma criatura ancestral — e descobre o Sigmetal, um minério raro há muito desaparecido, forçando-o a tomar uma decisão com implicações narrativas futuras.
- **Objetivo narrativo global**: Introduzir a primeira dungeon jogável com liberdade total de exploração, estabelecer o sistema de combate em grupo, apresentar o primeiro boss e criar a primeira escolha significativa do jogador.
- **Premissa resumida**: Após um novo sonho com sua mãe e sendo apressado por Tusk, Thorin desce à mina para cumprir sua primeira missão como minerador. Mas a descoberta de um minério esquecido e o surgimento de uma criatura antiga colocam sua lealdade e senso de dever à prova.
- **Resumo**: Thorin acorda perturbado com outro sonho urgente de sua mãe, e logo é chamado por Tusk para iniciar a expedição à Mina de Kravens. Após sair da barraca e ir à entrada da mina, recebe a instrução de coletar 10 Kravens. Acompanhado dos guardas que chegam atrasados em uma cena cômica, Thorin começa a explorar. Ao coletar o 9º minério, o chão desaba e ele enfrenta um boss oculto no andar inferior: o Cristaleão. Após vencê-lo e encontrar o raro minério Sigmetal, Thorin deve escolher entre entregá-lo diretamente ou ocultar a descoberta e cumprir a missão original. A escolha define como a missão será encerrada por Tusk.
- **Locais principais**:
  - Barraca de Thorin
  - Entrada da Mina de Kravens
  - Mina de Kravens – Andar 2 (mineração)
  - Mina de Kravens – Andar 3 (boss)
  - Clareira externa
- **NPCs principais**:
  - Thorin
  - Mãe de Thorin (em sonho)
  - Tusk
  - Kilin
  - Mhordred
  - Tharok
  - Cristaleão (boss)
  - Mineradores secundários

---

### 2️⃣ Pré-condições Narrativas *(Checkpoint 1)*

- [x] **Concluído**

| Tipo | Descrição |
|------|-----------|
| **Flags / Decisões anteriores** | Jogador concluiu a quest **“Primeiro Contrato”** e se deitou para dormir no acampamento. |
| **Estado emocional do protagonista** | Confuso e frustrado, perturbado com os sonhos recorrentes com sua mãe e ainda relutante quanto à missão de minerar. |
| **Limitações ou bloqueios** | O **andar 1** da mina está acessível, mas a escada para o **andar 2** permanece bloqueada até a cutscene com Tusk. O **andar 3** pode ser visitado, mas o Cristaleão ainda não se manifesta — apenas sua silhueta translúcida aparece, sem possibilidade de interação. |

### 3️⃣ Fluxo Visual Resumido *(Checkpoint 2)*

- [x] **Concluído**

```plaintext
Quest: O Eco do Cristaleão
 ├── Cena 1: Sonho Recorrente — Premissa: A mãe de Thorin reaparece em sonho, reforçando a urgência de impedir Damburr.
 │      ├── Beat 1: Alerta Onírico — Thorin sonha com sua mãe insistindo para ele agir rápido. (🎬)
 │      ├── Beat 2: Acordar Interrompido — Tusk invade a barraca dizendo que ele está atrasado. (🎬)
 │      └── Beat 3: Sair da Barraca — Jogador controla Thorin até a entrada da mina. (🎮)
 ├── Cena 2: Briefing na Entrada — Premissa: Tusk explica a missão de mineração e introduz o mistério do Sigmetal.
 │      ├── Beat 1: Caminhada até a mina — Tusk caminha rumo à entrada da caverna. (🎬)
 │      ├── Beat 2: Instruções de Tusk — Fala sobre os 10 Kravens e o raro Sigmetal. (🎬)
 │      └── Beat 3: Rumo ao Andar 2 — Jogador leva Thorin até a escada. (🎮)
 ├── Cena 3: Guardas Atrasados — Premissa: Os guardas chegam atrasados, cena cômica com o "piriri" do Tharok.
 │      └── Beat 1: Interrupção Engraçada — Guardas surgem pedindo para esperar, rindo da situação. (🎬)
 ├── Cena 4: Mineração Subterrânea — Premissa: Thorin coleta os Kravens enquanto tenta terminar logo o serviço.
 │      ├── Beat 1: Início da coleta — Jogador começa a minerar os Kravens. (🎮)
 │      ├── Beat 2: Falas de progresso — Thorin comenta que está quase terminando. (🎮)
 │      └── Beat 3: Quase lá... — Thorin solta uma fala de alívio/confiança (“Agora vai dar tudo certo...”) (🎬)
 ├── Cena 5: Queda Inesperada — Premissa: O chão desaba e Thorin cai para um andar esquecido da mina.
 │      └── Beat 1: Desabamento — Cutscene mostra Thorin caindo para o andar 3. (🎬)
 ├── Cena 6: Boss Oculto — Premissa: Thorin encontra o Cristaleão oculto na parede do terceiro andar.
 │      ├── Beat 1: Vulto Translúcido — Jogador vê a criatura na parede e pode interagir. (🎮)
 │      ├── Beat 2: Alternativa de emboscada — Se tentar sair sem interagir, batalha inicia com desvantagem. (🎮)
 │      ├── Beat 3: Combate com o Cristaleão — Batalha contra o primeiro boss. (🎮)
 │      └── Beat 4: Drop do Sigmetal — Jogador coleta o minério raro após a vitória. (🎮)
 ├── Cena 7: Escolha do Jogador — Premissa: Thorin deve decidir como concluir sua missão.
 │      ├── Beat 1: Volta ao Andar 1 — Jogador sobe de volta com 9 Kravens + 1 Sigmetal. (🎮)
 │      ├── Beat 2: Opção A: Entregar o Sigmetal a Tusk. (🎮)
 │      ├── Beat 3: Opção B: Voltar ao Andar 2 e pegar o 10º Kraven. (🎮)
 │      └── Beat 4: Entrega final a Tusk — Tusk encerra a expedição. (🎬)
 └── Cena 8: Saída da Mina — Premissa: Jogador encontra Tusk na clareira para encerrar a missão.
        └── Beat 1: Caminho até a clareira — Jogador vai até Tusk e interage para concluir a quest. (🎮)
```

#### Tabela de Cenas

| # | Nome da Cena               | Premissa resumida (expandida)                                                                                                                                                          |
| - |----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1 | **Sonho Recorrente**       | Thorin sonha novamente com sua mãe, que o alerta para agir rápido e deter Damburr. Ao acordar, Tusk invade sua barraca apressando-o para a expedição.                                |
| 2 | **Rumo à Mina de Kravens** | O jogador guia Thorin até a entrada da mina; cutscene mostra Tusk à frente, indicando o caminho.                                                                                       |
| 3 | **Briefing de Tusk**       | Tusk instrui os mineradores sobre o minério Kraven e menciona o raro Sigmetal. Thorin recebe sua missão: minerar 10 Kravens e reportar qualquer anomalia.                              |
| 4 | **Atrasados com Piriri**   | Ao tentar descer, os guardas surgem atrasados por causa de Tharok, que abusou do assado na noite anterior. Cena cômica antes do início da mineração.                                   |
| 5 | **Minerando Kravens**      | Thorin minera os Kravens no segundo andar. A cada minério, ele comenta estar mais próximo de terminar. Ao pegar o nono, o chão treme e ele despenca para um nível abaixo.             |
| 6 | **Cristaleão Desperto**    | Thorin encontra o vulto de uma criatura na parede. Ao interagir (ou tentar fugir), inicia uma batalha com o Cristaleão, o primeiro boss do jogo.                                      |
| 7 | **O Dilema do Sigmetal**   | Após derrotar o Cristaleão e obter o Sigmetal, Thorin deve escolher entre entregar esse minério ou completar a tarefa inicial coletando o 10º Kraven.                                 |
| 8 | **Saída da Mina**          | Tusk encerra a expedição após a entrega. Thorin deve reencontrá-lo na clareira para concluir oficialmente a missão com base na escolha feita.                                          |

##### Cena 1 – Sonho Recorrente

| # | Beat                            | Controle |
| - |---------------------------------|----------|
| 1 | Thorin sonha com sua mãe dizendo que ele precisa agir logo para deter Damburr. | 🎬 |
| 2 | Ele acorda confuso com a recorrência dos sonhos. | 🎬 |
| 3 | Tusk invade a barraca e o pressiona dizendo que estão esperando por ele. | 🎬 |
| 4 | Thorin retoma o controle e se levanta. | 🎮 |

##### Cena 2 – Rumo à Mina de Kravens

| # | Beat | Controle |
| - |------|----------|
| 1 | Jogador assume o controle e leva Thorin para fora da barraca. | 🎮 |
| 2 | Cutscene mostra Tusk quase chegando na entrada da mina. | 🎬 |
| 3 | Jogador segue com Thorin até a entrada e entra na mina. | 🎮 |

##### Cena 3 – Briefing de Tusk

| # | Beat | Controle |
| - |------|----------|
| 1 | Thorin entra na mina e cutscene começa com Tusk reunindo os mineradores. | 🎬 |
| 2 | Tusk explica a missão: cada um deve coletar 10 minérios de Kraven. | 🎬 |
| 3 | Tusk comenta sobre o minério raro Sigmetal e reforça a importância de reportá-lo. | 🎬 |
| 4 | Jogador assume o controle e pode explorar o andar 1 até alcançar a escada para o andar 2. | 🎮 |

##### Cena 4 – Atrasados com Piriri

| # | Beat | Controle |
| - |------|----------|
| 1 | Jogador clica para descer ao segundo andar da mina. | 🎮 |
| 2 | Cutscene interrompe com os guardas correndo até Thorin. | 🎬 |
| 3 | Os guardas reclamam de Tharok, que exagerou no assado e atrasou todos. | 🎬 |
| 4 | Cena termina com os guardas se juntando ao grupo. | 🎬 |

##### Cena 5 – Minerando Kravens

| # | Beat | Controle |
| - |------|----------|
| 1 | Jogador começa a minerar Kravens no segundo andar. | 🎮 |
| 2 | Após o sexto minério, Thorin comenta que está quase terminando. | 🎮 |
| 3 | Após o sétimo e oitavo minério, ele reforça essa sensação com falas de alívio. | 🎮 |
| 4 | No nono minério, Thorin solta uma frase confiante (“Agora vai dar tudo certo...”). | 🎬 |
| 5 | O chão treme e uma cutscene mostra Thorin despencando para o andar inferior. | 🎬 |

##### Cena 6 – Cristaleão Desperto

| # | Beat | Controle |
| - |------|----------|
| 1 | Thorin se levanta no andar 3 da mina, em uma área isolada. | 🎬 |
| 2 | Jogador avista um vulto translúcido na parede. | 🎮 |
| 3 | O jogador pode interagir com o vulto — isso inicia a batalha normalmente. | 🎮 |
| 4 | Alternativamente, se tentar sair da sala, a batalha é iniciada automaticamente com desvantagem. | 🎮 |
| 5 | Combate contra o Cristaleão — o primeiro boss do jogo. | 🎮 |
| 6 | Ao derrotá-lo, o Cristaleão dropa um minério de Sigmetal. | 🎮 |

##### Cena 7 – O Dilema do Sigmetal

| # | Beat | Controle |
| - |------|----------|
| 1 | Jogador sobe de volta para o andar 1 com 9 Kravens e 1 Sigmetal. | 🎮 |
| 2 | Escolha do jogador: entregar o Sigmetal a Tusk, ou retornar ao andar 2 para minerar o 10º Kraven. | 🎮 |
| 3 | Após escolher, o jogador entrega os minérios a Tusk. | 🎮 |
| 4 | Cutscene: Tusk reage à entrega, encerrando a expedição. | 🎬 |

##### Cena 8 – Saída da Mina

| # | Beat | Controle |
| - |------|----------|
| 1 | Jogador vê Tusk aguardando na clareira de Kravens. | 🎮 |
| 2 | Thorin se dirige até ele manualmente. | 🎮 |
| 3 | Ao interagir com Tusk, cutscene final encerra a missão com base na escolha feita. | 🎬 |
