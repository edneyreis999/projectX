# Event Timer, Follower Control e Self Data - Comandos de Plugin

Plugin: **VisuStella Events & Movement Core**

---

## Event Timer - Comandos de Timer de Evento

### Event Timer: Change Speed

Altera a velocidade de execucao do timer em frames. Valores negativos diminuem a velocidade, positivos aumentam.

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Speed` | Inteiro | Velocidade do timer em frames (negativo = diminui, positivo = aumenta) | Sim |

### Event Timer: Expire Event Assign

Define um Common Event especifico para ser executado quando o timer expirar. Isso sobrescreve o comportamento padrao de expiracao.

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Common Event ID` | Inteiro | ID do Common Event a executar na expiracao | Sim |

### Event Timer: Expire Event Clear

Limpa o Common Event de expiracao atribuido, revertendo ao comportamento padrao de expiracao do timer.

### Event Timer: Frames Gain

Adiciona ou remove tempo do timer.

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Frames` | Inteiro | Quantidade de frames a ganhar/perder | Sim |
| `Seconds` | Inteiro | Quantidade de segundos a ganhar/perder | Sim |
| `Minutes` | Inteiro | Quantidade de minutos a ganhar/perder | Sim |
| `Hours` | Inteiro | Quantidade de horas a ganhar/perder | Sim |

### Event Timer: Frames Set

Define o tempo exato do timer.

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Frames` | Inteiro | Valor em frames | Sim |
| `Seconds` | Inteiro | Valor em segundos | Sim |
| `Minutes` | Inteiro | Valor em minutos | Sim |
| `Hours` | Inteiro | Valor em horas | Sim |

### Event Timer: Pause

Pausa o timer sem para-lo. O tempo pausado e mantido e pode ser retomado.

### Event Timer: Resume

Retoma o timer a partir do ponto em que foi pausado.

### Notas do Timer

- **Pause** difere de parar o timer: o tempo e preservado e pode ser retomado com **Resume**.
- **Expire Event Assign** e util para criar eventos customizados de timeout (ex.: puzzles com limite de tempo).
- Velocidade do timer afeta quantos frames avancam por tick. Valores negativos fazem o timer contar mais devagar.

---

## Follower Control - Comandos de Controle de Seguidores

### Follower: Set Global Chase

Ativa ou desativa o comportamento de perseguicao para **todos** os seguidores do grupo.

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Value` | Booleano | Ativar perseguicao global dos followers? | Nao |

### Follower: Set Target Chase

Ativa ou desativa o comportamento de perseguicao para um seguidor especifico.

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Follower ID` | Inteiro | ID do follower | Sim |
| `Value` | Booleano | Ativar perseguicao deste follower? | Nao |

### Follower: Set Control

Faz com que os comandos de evento (como Move Route) direcionados a "This Event" ou "Player" sejam aplicados a um follower especifico.

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Follower ID` | Inteiro | ID do follower a ser controlado (`0` = jogador) | Sim |

### Follower: Reset

Reseta todos os controles de follower, retornando ao comportamento padrao de perseguicao.

### Notas do Follower Control

- **Set Control** e util para criar cenas onde um follower se move independentemente do jogador.
- Apos usar `Set Control`, lembre-se de usar `Reset` para restaurar o comportamento normal.
- `Follower ID` inicia em `0` para o primeiro follower (segundo membro do grupo).

---

## Global Switch/Variable - Comandos de Switch/Variable Global

### Global Switch: Get Self Switch A B C D

Obtem o valor de um self switch (A, B, C ou D) e o armazena em um switch global.

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Map ID` | Inteiro | ID do mapa do evento | Sim |
| `Event ID` | Inteiro | ID do evento | Sim |
| `Letter` | Selecao | Letra do self switch (A, B, C, D) | Nao |
| `Target Switch ID` | Inteiro | ID do switch global que recebera o valor | Sim |

### Global Switch: Get Self Switch ID

Obtem o valor de um self switch pelo seu ID numerico e o armazena em um switch global.

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Map ID` | Inteiro | ID do mapa do evento | Sim |
| `Event ID` | Inteiro | ID do evento | Sim |
| `Switch ID` | Inteiro | ID do self switch (numerico) | Sim |
| `Target Switch ID` | Inteiro | ID do switch global que recebera o valor | Sim |

### Global Variable: Get Self Variable ID

Obtem o valor de uma self variable e o armazena em uma variavel global.

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Map ID` | Inteiro | ID do mapa do evento | Sim |
| `Event ID` | Inteiro | ID do evento | Sim |
| `Variable ID` | Inteiro | ID da self variable | Sim |
| `Target Variable ID` | Inteiro | ID da variavel global que recebera o valor | Sim |

---

## Self Data/Switch/Variable - Comandos de Dados Proprios

### Self Data: Reset All

Reseta **todos** os self switches e self variables de um mapa inteiro.

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Map ID` | Inteiro | ID do mapa a ser resetado | Sim |

### Self Switch: A B C D

Altera o valor de um self switch (A, B, C ou D) de um evento.

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Map ID` | Inteiro | ID do mapa (`0` = mapa atual) | Sim |
| `Event ID` | Inteiro | ID do evento (`0` = evento atual) | Sim |
| `Letter` | Selecao | Letra do self switch (A, B, C, D) | Nao |
| `Value` | Booleano | Valor do self switch (ON/OFF) | Nao |

### Self Switch: Switch ID

Altera o valor de um self switch pelo seu ID numerico.

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Map ID` | Inteiro | ID do mapa (`0` = mapa atual) | Sim |
| `Event ID` | Inteiro | ID do evento (`0` = evento atual) | Sim |
| `Switch ID` | Inteiro | ID do self switch (numerico) | Sim |
| `Value` | Booleano | Valor do self switch (ON/OFF) | Nao |

### Self Variable: Variable ID

Altera o valor de uma self variable de um evento.

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Map ID` | Inteiro | ID do mapa (`0` = mapa atual) | Sim |
| `Event ID` | Inteiro | ID do evento (`0` = evento atual) | Sim |
| `Variable ID` | Inteiro | ID da self variable | Sim |
| `Value` | Inteiro | Novo valor da self variable | Sim |

### Notas Gerais

- **Self Switches/Self Variables** sao dados locais por evento, armazenados no save file. Diferem dos switches/variaveis globais por serem isolados por (Map ID, Event ID).
- **Self Data: Reset All** e util para reiniciar puzzles ou estados de mapa sem afetar o progresso global do jogo.
- Os comandos `Get` permitem transferir dados de self switches/variables para switches/variaveis globais, possibilitando condicoes em common events ou outros mapas.
- Sempre use `0` para Map ID ou Event ID quando quiser referenciar o mapa ou evento atual.
