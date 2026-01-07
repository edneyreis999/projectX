# Design de Cutscene

**Descrição:** Conjunto de cenas que acontecem em um curto perÃ­odo de tempo, com o jogador podendo ou nÃ£o interagir e fazer escolhas.
**Cutscene:** Assinando contrato.
**Mapa onde acontece:** Taverna
**Personagens Envolvidos:**

* [Balastrus] (ID: `08`)
* [Thorin] (ID: `011`)
* [Durgan] (ID: `?`)
* [Filena] (ID: `04`)

---

## 🎞️ Roteiro de Ações - Beat por Beat

| Cena | Personagem | Ação - movimento do personagem | Detalhes (parâmetros) | esperar (true/false) | Notas de Direção | Falas |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `Thorin_entra_na_taverna` | `Thorin` | `move` | `14,8` | `true` | Thorin se movimenta até o balcão da taverna | |
| `Thorin_pede_informacao` | `Thorin` | `talk` | `Conhece o Balastrus?` | `true` | Thorin pede informação para o dono da taverna | |
| `Durgan_responde` | `Durgan` | `talk` | `É o careca sentado na mesa.` | `true` | Durgan responde a Thorin | |
| `Foco_em_Balastrus` | `camera` | `foco` |  | `true` | Câmera foca em Balastrus | |
| `Foco_em_Thorin` | `camera` | `foco` |  | `true` | Câmera foca em Thorin novamente | |
| `Thorin_cumprimenta_Balastrus` | `Thorin` | `talk` | `É um prazer conhecê-lo, Senhor Balastrus.` | `true` | Thorin cumprimenta Balastrus | |
| `Balastrus_responde` | `Balastrus` | `talk` | `O prazer é todo seu, garoto! A reputação de seu pai o precede e, é claro, espero que você esteja à altura do legado da família.` | `true` | Balastrus responde | |
| `Thorin_mente_para_Balastrus` | `Thorin` | `talk` | `Direto ao ponto. Que ótimo, era o que eu estava esperando. Eu machuquei o braço direito na minha última partida de futebol rúnico, não serei de grande ajuda para o senhor. Se eu for nessa expedição, estará apenas desperdiçando recursos comigo.` | `true` | Thorin mente para Balastrus | |
| `Balastrus_revela_o_que_quer` | `Balastrus` | `talk` | `Essa é a sua melhor desculpa, filho?! Se eu comer uma sopa de letrinhas, cago um argumento melhor que o seu.` | `true` | Balastrus provoca Thorin | |
| `Thorin_persiste_na_mentira` | `Thorin` | `talk` | `É tudo verdade, senhor Balastrus. Eu mal conseguiria levantar uma picareta.` | `true` | Thorin tenta convencer Balastrus de que está falando a verdade | |
| `Filena_entra_na_taverna` | `Filena` | `move` | `2,6` | `true` | Filena entra na taverna e se senta na mesa deles | |
| `Foco_em_Filena` | `camera` | `foco` |  | `true` | Câmera foca em Filena | |
| `Filena_assina_o_contrato` | `Filena` | `talk` | `Vou aceitar o trabalho, mas quero entender os termos.` | `true` | Filena discute com Balastrus e acaba aceitando a proposta | |
| `Foco_em_Thorin` | `camera` | `foco` |  | `true` | Câmera foca em Thorin | |
| `Thorin_volta_atras` | `Thorin` | `talk` | `Pensando bem, senhor Balastrus, não posso deixar uma amiga sozinha nessa jornada. Meu braço ainda dói, mas posso aguentar, eu também vou nessa expedição.` | `true` | Thorin decide ir para a expedição e tenta sair da própria teia de mentiras na qual se enrolou | |
| `Balastrus_provoca_Thorin` | `Balastrus` | `talk` | `Você não me disse minutos atrás que não poderia sequer levantar uma picareta sem parecer que seu braço está sendo arrancado?` | `true` | Balastrus dá o cheque-mate em Thorin | |
| `Thorin_arranja_outra_desculpa` | `Thorin` | `talk` | `Aquilo foi só força de expressão. Como eu já disse, meu braço ainda dói, mas, não ferir o orgulho do povo anão de sermos os mais resistentes trabalhadores e, também sou incapaz de abandonar uma amiga!` | `true` | Thorin apela para o sentimentalismo | |
| `Foco_em_Filena` | `camera` | `foco` |  | `true` | Thorin olha para Filena e a câmera foca na expressão dela | |
| `Balastrus_aceita_os_contratos` | `Balastrus` | `talk` | `Como quiserem. Mas eu exijo que trabalhem e muito, se custarem uma drákel sequer do meu lucro porque estão fazendo corpo mole, vão pagar muito caro por isso. Vão até a Estrada do Cão-luar, entreguem os contratos assinados para Brok, meu lacaio que estará esperando por vocês. Ele lhes entregará os materiais que precisam. Agora, com licença.` | `true` | Balastrus se prepara para sair | |
| `Balastrus_se_retira` | `Balastrus` | `move` | `9,13` | `true` | Balastrus sai da Taverna | |
| `Thorin_conversa_Filena` | `Thorin` | `talk` | `Eu não esperava ver você aqui! Mas que bela coincidência!.` | `true` | Thorin tenta puxar assunto com Filena | |
| `Filena_responde_Thorin` | `Filena` | `talk` | `Coincidência?! Não existem coincidências, Thorin. O que existe são filhinhos de papai como você que não precisam trabalhar na vida e encaram tudo como uma nova e grande aventura, uma nova oportunidade para se provar, mas os meus, os anões pobres e esquecidos de Gildrat, estão morrendo de fome. Deve ser muito bom ter nascido rico, mas o mundo não gira em torno e você. Este trabalha é uma merda, é quase um trabalho-escravo, só não me restava mais escolha...` | `true` | Filena conversa com Thorin sobre o motivo de aceitar | |
| `Filena_se_retira` | `Filena` | `move` | `9,13` | `true` | Filena sai da Taverna | |

---

## Referências Rápidas de Comandos (Cutscene Director Pro)

### Câmera & Visual

* **Foco:** `focus on` | [cite_start]*Detalhes:* `character_id` [cite: 56]
* **Zoom:** `zoom` ou `focus zoom` | [cite_start]*Detalhes:* `in` ou `out` [cite: 57, 58]
* **Barras Pretas:** `cinematic` | [cite_start]*Detalhes:* `true` (ativar) ou `false` (desativar) [cite: 58]
* **Tremer:** `shake` | [cite_start]*Detalhes:* (vazio) [cite: 52]
* **Flash:** `flash` | [cite_start]*Detalhes:* `r,g,b,duration` (ex: `255,255,255,30`) [cite: 53]
* **Tom:** `tone` | [cite_start]*Detalhes:* `r,g,b,gamma,duration` [cite: 54]

### Personagem

* **Mover:** `move` | [cite_start]*Detalhes:* `x,y` [cite: 42]
* **Teleportar:** `teleport` | [cite_start]*Detalhes:* `x,y` [cite: 44]
* **Virar:** `turn` | [cite_start]*Detalhes:* `up`, `down`, `left`, `right` [cite: 43]
* **Falar:** `talk` | [cite_start]*Detalhes:* `"Texto entre aspas"` (ObrigatÃ³rio aspas se usar vÃ­rgula) [cite: 46, 160]
* **Balão:** `balloon` | [cite_start]*Detalhes:* ID do Ã­cone (1-8) [cite: 47]
* **Transparência:** `transparent` | [cite_start]*Detalhes:* `true` ou `false` [cite: 44]

### Áudio

* **Música:** `bgm` | [cite_start]*Detalhes:* `play, filename, volume, loop` ou `fadeOut, duration` [cite: 60]
* **Som:** `sound` | [cite_start]*Detalhes:* `filename` (SE) [cite: 49]
* **Voz:** `voice` | [cite_start]*Detalhes:* `filename` [cite: 50]

### Sistema

* **Variável:** `var` | [cite_start]*Detalhes:* `ID, valor` [cite: 62]
* **Switch:** `switch` | [cite_start]*Detalhes:* `ID, on/off` [cite: 63]
* **Common Event:** `callCommon` | [cite_start]*Detalhes:* `ID` [cite: 64]
* **Espera Manual:** `wait` | [cite_start]*Detalhes:* `frames` [cite: 66]
