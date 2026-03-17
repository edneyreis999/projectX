# Guia de Design de Sistema de Batalha: Brave Turn Battle Avançado

## 1. Visão Geral do Sistema

O sistema de batalha Brave Turn Battle (BTB) é, em sua essência, um sistema de **economia de ações baseado em manipulação do tempo**. Ele transforma o recurso mais fundamental de um JRPG por turnos – o próprio turno – em uma moeda (Brave Points, ou BP) que pode ser gasta, economizada, emprestada e manipulada.

O fluxo central da batalha gira em torno de um ciclo de três fases para cada combatente:

1. **Acúmulo (Banking):** O jogador (ou IA) opta por realizar menos ações do que o permitido (usando `Guard` ou ações de baixo custo) para acumular BP. Esta é a fase de preparação e baixo risco.

2. **Explosão (Burst):** O jogador gasta o BP acumulado através do comando `Brave` para executar múltiplas ações em um único turno. Esta é a fase de risco/recompensa, onde o planejamento culmina em uma ofensiva massiva ou uma sequência de suporte crucial.

3. **Recuperação (Recovery):** Se um combatente "pega emprestado" turnos futuros, seu BP se torna negativo. Ele entra em um estado de vulnerabilidade, perdendo seus turnos de ação até que seu BP retorne a zero. Esta é a janela de punição.

Este ciclo cria uma cadência de tensão e alívio, onde o gerenciamento de BP é tão ou mais importante que o gerenciamento de HP e MP.

### A Fantasia de Jogo

A fantasia central do BTB é a do **comandante tático** que toma decisões cruciais no campo de batalha. O jogador não está apenas selecionando ataques; está gerenciando o fluxo temporal do combate, decidindo quando avançar agressivamente e quando recuar estrategicamente.

### Experiência Desejada

O jogador deve sentir:
- **Poder:** A capacidade de planejar e executar combinações devastadoras
- **Vulnerabilidade:** O peso real de arriscar turnos futuros
- **Antecipação:** A satisfação de prever movimentos inimigos e contra-atacar
- **Recuperação:** O alívio de escapar de uma situação de BP negativo

### Diferenciação de Outros Sistemas

| Sistema | Foco Principal | Decisão Central |
|---------|---------------|-----------------|
| **Turnos Tradicionais** | Troca de golpes sequencial | Qual ataque usar |
| **CTB (FFX)** | Ordem de turno baseada em velocidade | Quando agir |
| **Brave/Default Puro** | Gerenciamento de BP binário | Arriscar ou não |
| **BTB (Nosso Sistema)** | Integração de BP + Turn Order + Fusions | Quando, como e quanto arriscar |

## 2. Pilares de Design

Todo sistema robusto é construído sobre pilares claros. Para o nosso BTB, proponho os seguintes:

### Pilar 1: Tensão Rítmica (Risco vs. Recompensa)

**Por que existe:** Sem tensão, as decisões se tornam triviais. O sistema precisa constantemente forçar o jogador a escolher entre segurança e oportunidade.

**Tipo de decisão criada:**
- "Devo gastar meu BP agora para eliminar este inimigo perigoso, ou guardar para o chefe que virá depois?"
- "Devo usar Brave agora e ficar vulnerável, ou Guard e perder a janela de oportunidade?"

**Erro se ignorado:** O sistema se torna ou "sempre use Brave" (se a recompensa for muito alta) ou "nunca use Brave" (se o risco for muito severo). Sem tensão, não há estratégia.

### Pilar 2: Planejamento Tático Deliberado

**Por que existe:** A presença de uma Ordem de Turno (Turn Order) visível não é um enfeite, é o tabuleiro do jogo. Este pilar transforma a batalha em um quebra-cabeças espacial-temporal.

**Tipo de decisão criada:**
- "Vejo que meus três personagens agirão antes do chefe. Devo sincronizar um Burst?"
- "O inimigo rápido vai agir duas vezes antes de meu tanque. Preciso atrasá-lo."

**Erro se ignorado:** A Turn Order se torna apenas informativa, não estratégica. Jogadores ignoram a timeline e jogam "no automático".

### Pilar 3: Expressão do Jogador

**Por que existe:** Um sistema tático deve permitir múltiplos caminhos para a vitória. Jogadores diferentes devem ter estilos válidos.

**Tipo de decisão criada:**
- Jogador conservador: Prefere acumular BP lentamente, usar Guard frequentemente
- Jogador agressivo: Opera com BP negativo constantemente
- Jogador tático: Foca em manipular a ordem de turno

**Erro se ignorado:** Surgem "estratégias dominantes" que tornam todas as outras irrelevantes. O sistema perde profundidade.

### Pilar 4: Clareza Telegraphing

**Por que existe:** Para que decisões significativas existam, o jogador precisa ter informação suficiente. Telegraphing é a arte de comunicar intenções inimigas.

**Tipo de decisão criada:**
- "O inimigo está brilhando e carregando algo. Devo interromper ou me defender?"
- "O chefe telegrafou um ataque massivo para daqui a 3 turnos. Tenho tempo para preparar."

**Erro se ignorado:** Derrotas parecem injustas ("não tinha como saber"). Jogadores param de experimentar.

### Pilar 5: Recuperação e Contrajogo

**Por que existe:** Erros devem ser punidos, mas não de forma terminal. O jogador precisa ter ferramentas para se recuperar de decisões ruins.

**Tipo de decisão criada:**
- "Exagerei no Brave e estou com -3 BP. Como me proteger enquanto recupero?"
- "O inimigo me pegou de surpresa. Qual é minha rota de fuga tática?"

**Erro se ignorado:** Um único erro define toda a batalha. Jogadores se tornam excessivamente conservadores.

## 3. Economia de Ações e BP

Aqui detalhamos a matemática e as regras que governam o sistema.

### Estrutura Básica de BP

```
Turno N: BP = 0 → Ação normal → BP = 0
Turno N: BP = 0 → Guard → BP = +1
Turno N: BP = +2 → Brave x3 → BP = -1 (perde próximo turno)
```

### Taxa de Geração de BP

**Padrão:** Cada personagem/inimigo ganha **+1 BP** no início de seu turno de ação. Esta é a "renda" base do sistema.

**Comando `Guard`/`Default`:** Em vez de atacar, o personagem assume uma postura defensiva. Ele recebe dano reduzido (ex: 50%) e ganha **+1 BP adicional** (totalizando +2 BP naquele turno).

### Limites de BP

**BP Máximo:** Um limite superior é crucial para evitar o acúmulo infinito.

| Limite | Efeitos no Design |
|--------|-------------------|
| +1 BP | Sistema muito restritivo, pouca expressão |
| +2 BP | Balanceado, permite bursts moderados |
| +3 BP | Padrão recomendado, bursts significativos |
| +4 BP+ | Risco de degeneração, snowball de ações |

**BP Mínimo:** Um limite inferior define o quão "endividado" um personagem pode ficar.

| Limite | Efeitos no Design |
|--------|-------------------|
| -1 BP | Punição leve, risco baixo |
| -2 BP | Punição moderada |
| -3 BP | Padrão recomendado, risco significativo |
| -4 BP+ | Risco de death spiral |

### Custo das Ações

**Ação Padrão:** O primeiro comando em um turno não custa BP (consome a ação base).

**Comando `Brave`:** Cada ação extra executada no mesmo turno custa **1 BP**.

**Ações de Custo Variável:** Algumas skills podem custar mais de 1 BP.

```
Ataque Básico: Custo 0 BP (ação base)
Skill Forte: Custo 1 BP
Skill Épica: Custo 2 BP
Ultimate: Custo 3 BP
```

### Penalidade de BP Negativo

Quando um combatente tem BP < 0, ele não pode agir. No início de seu turno, ele ainda ganha +1 BP, mas sua ação é pulada.

**Exemplo de recuperação:**
```
Estado Inicial: BP = -3
Turno 1: Ação pulada, BP → -2
Turno 2: Ação pulada, BP → -1
Turno 3: Ação pulada, BP → 0
Turno 4: Pode agir normalmente
```

### Heurísticas de Balanceamento de BP

**Regra de Ouro do BP-ROI:**
Uma ação extra via `Brave` deve amplificar o resultado em **120-150%** em comparação com fazer as ações em turnos separados.

**Cálculo de exemplo:**
```
Opção A (Turnos Separados):
Turno 1: Ataque (100 dano)
Turno 2: Ataque (100 dano)
Total: 200 dano, 2 turnos

Opção B (Brave x1):
Turno 1: Ataque + Ataque
Custo: -1 BP (perde 1 turno futuro)
Total: 240 dano (120% de 200), mas perde próximo turno
```

Para valer a pena, a Opção B precisa de vantagens adicionais:
- Sinergia com buffs/debuffs
- Quebrar defesa do inimigo
- Sincronização com Turn Order

### Evitando Degeneração

**Snowball de Turnos:**
Ocorre quando um lado consegue acumular BP indefinidamente e executar bursts que o outro lado não pode responder.

**Solução:**
- Limites rígidos de BP máximo
- Inimigos com habilidades de "dreno de BP"
- Chefes que punem bursts excessivos

**Combos Sem Resposta:**
Ocorre quando um personagem pode eliminar inimigos antes que eles possam agir.

**Solução:**
- Inimigos com imunidade temporal
- Contra-ataques automáticos após receber X hits
- Mecânicas de "fases" que resetam aggro

**Defesa Dominante:**
Ocorre quando Guard é tão bom que nunca vale a pena usar Brave.

**Solução:**
- Inimigos que ignoram defesa temporária
- Mecânicas que punem staying idle
- Bosses com "execution mechanics" que forçam burst

**Stalling Eterno:**
Ocorre quando ambos os lados podem se curar/defender indefinidamente.

**Solução:**
- Recursos finitos (MP)
- Enrage mechanics em chefs
- Debuffs cumulativos que favorecem ofensiva

## 4. Ordem de Turno e Legibilidade

Inspirado em *Final Fantasy X*, a ordem de turno é o campo de batalha.

### Atributo Chave: Agilidade (AGI)

AGI é o principal fator que determina a frequência e a posição na fila de turnos.

**Fórmula base (simplificada):**
```
Tick Count = Base_Ticks × (AGI_Base / AGI_Atual)
```

### Custo de Ações (Tick Speed)

Nem todas as ações são iguais. Podemos introduzir um sistema de "peso" ou "ticks".

| Tipo de Ação | Tick Cost | Efeito na Ordem |
|--------------|-----------|-----------------|
| Ação Leve | 0.7× | Próximo turno vem mais rápido |
| Ação Padrão | 1.0× | Normal |
| Ação Pesada | 1.5× | Próximo turno vem mais lento |
| Ação Épica | 2.0× | Próximo turno vem bem mais lento |

### Manipulação da Ordem de Turno

Habilidades que interagem diretamente com a fila são taticamente cruciais.

**Habilidades de Delay:**
```
Temporal Bash: Dano físico + empurra alvo 2 posições atrás na fila
Quick Sand: Magia de terra + reduz AGI do alvo em 20% por 2 turnos
```

**Habilidades de Aceleração:**
```
Haste: Aumenta AGI em 30% por 3 turnos
Adrenaline Shot: Próxima ação tem Tick Cost de 0.5×
```

### Diretrizes para Timing

**Ações Rápidas:**
- Devem ter impacto menor
- Servem para setup ou interrupção
- Exemplos: poke, delay, aplicação de debuff leve

**Ações Lentas e Poderosas:**
- Devem ser telegrafadas
- Requerem compromisso de plano
- Exemplos: magias épicas, ataques carregados

**Preparação:**
- Skills que melhoram ações futuras
- Devem ter sinergia óbvia
- Exemplos: buffs, setup de fusão

**Interrupção:**
- Habilidades que cancelam ações inimigas
- Devem ter custo ou limitação
- Exemplos: stun, silence, delay forçado

**Punição por Greed:**
- Contra-ataques que ativam após Brave excessivo
- Ensina moderação
- Exemplos:反击, vengeance

### O Que o Jogador Precisa Prever

**Previsível (Deve ser claro):**
- Ordem dos próximos 6-8 turnos
- Quem vai agir antes/depois de quem
- Quando um inimigo em BP negativo retornará

**Incerto (Aceitável):**
- Ações aleatórias de inimigos (dentro de padrões)
- Critical hits
- Efeitos de status proc chance

## 5. Arquétipos de Personagens da Party

Os personagens devem ser projetados para explorar facetas específicas do sistema BTB.

### 1. Striker/Burst DPS

**Função Tática:** Dedicado a causar dano massivo em janelas de oportunidade.

**Relação com BP:**
- Consome BP agressivamente
- Skills mais fortes custam BP
- Precisa de "battery" support

**Relação com Turn Order:**
- Prefere agir depois de setup (debuffs aplicados)
- Vulnerável durante recuperação de BP negativo

**Perfil de Risco:** Alto. Fica exposto após bursts.

**Pontos Fortes:**
- Maior dano por turno potencial
- Pode eliminar ameaças rapidamente
- Excelente contra alvos únicos

**Fraquezas:**
- Dependente de setup
- Vulnerável em BP negativo
- Ineficiente sem apoio

**Skills que Fazem Sentido:**
```
Power Strike: 180% dano, custo 1 BP
Execute: 300% dano, só funciona se alvo < 30% HP, custo 2 BP
Chain Attack: 80% dano x3, todos no mesmo alvo, custo 2 BP
```

**Skills que Quebram o Sistema:**
- Dano muito alto sem custo significativo
- Skills que ignorem completely BP mechanics

### 2. Tank/Guardião

**Função Tática:** Absorver dano e proteger a equipe, especialmente durante recuperações de BP.

**Relação com BP:**
- Opera confortavelmente em BP negativo
- Usa Guard estrategicamente
- Skills que mitigam dano durante vulnerabilidade

**Relação com Turn Order:**
- Precisa agir antes de ataques inimigos massivos
- Pode manipular ordem para interceptar

**Perfil de Risco:** Baixo a Médio. Designado para assumir risco.

**Pontos Fortes:**
- Sobrevive bursts inimigos
- Permite que DPS seja agressivo
- Controla aggro

**Fraquezas:**
- Dano individual baixo
- Dependente de healers
- Pode ser ignorado por inimigos inteligentes

**Skills que Fazem Sentido:**
```
Fortress Stance: +50% DEF por 1 turno, custo 0 BP
Provoke: Força 3 inimigos a te atacar por 2 turnos, custo 1 BP
Last Stand: Enquanto BP < 0, +30% DEF/MDEF (passiva)
```

**Skills que Quebram o Sistema:**
- Invulnerabilidade total
- Provocação que não pode ser removida

### 3. Controlador de Turno (Tempo Controller)

**Função Tática:** Manipula a ordem de turno para criar janelas de oportunidade.

**Relação com BP:**
- Usa BP moderadamente
- Foca em ações rápidas
- Não precisa de bursts

**Relação com Turn Order:**
- Core identity - manipula a fila diretamente
- Alta AGI

**Perfil de Risco:** Médio. Controle indireto.

**Pontos Fortes:**
- Cria setups para time
- Atrasa ameaças
- Acelera aliados

**Fraquezas:**
- Dano individual baixo
- Menos eficaz sozinho
- Requer coordenação

**Skills que Fazem Sentido:**
```
Delay Strike: 100% dano + empurra alvo 2 posições, custo 0 BP
Haste: Aliado ganha +30% AGI por 3 turnos, custo 1 BP
Quick Step: Ação imediata, mas empurra usuário para final da fila, custo 1 BP
```

### 4. Suporte de BP (Battery)

**Função Tática:** Gera e distribui BP para a equipe.

**Relação com BP:**
- Gera BP extra
- Transfere BP para aliados
- Recupera BP de time

**Relação com Turn Order:**
- Prefere agir antes de DPS que precisa de BP
- AGI média-alta

**Perfil de Risco:** Médio. Enable role.

**Pontos Fortes:**
- Permite bursts mais frequentes
- Recupera time de erros
- Essencial para combos complexos

**Fraquezas:**
- Pouco dano próprio
- Alvo prioritário
- Sem time, pouco útil

**Skills que Fazem Sentido:**
```
Rally Cry: Time ganha +1 BP cada, custo 2 BP (inicialmente +2 próprio)
Transfer: Usuário perde 1 BP, aliado ganha 1 BP, custo 0 BP
Recharge: Remove 1 ponto de BP negativo de aliado, custo 1 BP
```

### 5. Breaker/Debuffer

**Função Tática:** Aplica debuffs que tornam inimigos vulneráveis a bursts.

**Relação com BP:**
- Usa BP para cadeias de debuff
- Precisa de múltiplas ações

**Relação com Turn Order:**
- Precisa agir antes do DPS
- Média AGI

**Perfil de Risco:** Médio. Setup role.

**Pontos Fortes:**
- Multiplica dano de time
- Cria janelas de oportunidade
- Controla ameaças

**Fraquezas:**
- Sem time, pouco impacto
- Debuffs podem falhar
- Inimigos podem ser imunes

**Skills que Fazem Sentido:**
```
Armor Break: -30% DEF por 3 turnos, custo 0 BP
Power Break: -30% ATK por 3 turnos, custo 0 BP
Vulnerability: Alvo recebe +20% dano de próximo elemento, custo 1 BP
```

### 6. Healer Reativo

**Função Tática:** Responde a dano recebido, cura emergencial.

**Relação com BP:**
- Guarda BP para emergências
- Pode usar Brave para curas múltiplas

**Relação com Turn Order:**
- Precisa agir após ataques inimigos
- Baixa-média AGI

**Perfil de Risco:** Médio. Response role.

**Pontos Fortes:**
- Mantém time vivo
- Remove debuffs
- Cura em emergência

**Fraquezas:**
- Recurso limitado (MP)
- Não previne dano
- Alvo prioritário

**Skills que Fazem Sentido:**
```
Heal: Cura 200 HP, custo 0 BP
Group Heal: Cura 150 HP a todos, custo 1 BP
Restore: Remove todos os debuffs de aliado, custo 1 BP
```

### 7. Healer Preditivo

**Função Tática:** Prepara time para dano futuro, mitiga proativamente.

**Relação com BP:**
- Usa BP para buffs e shields
- Planeja à frente

**Relação com Turn Order:**
- Precisa agir antes de ataques inimigos
- Média AGI

**Perfil de Risco:** Médio. Prevenção role.

**Pontos Fortes:**
- Previne dano
- Mais eficiente que reativo
- Permite bursts mais ousados

**Fraquezas:**
- Requer previsão
- MP limitado
- Overheal possível

**Skills que Fazem Sentido:**
```
Shield: Cria barreira de 300 HP por 2 turnos, custo 1 BP
Regen: 50 HP/turno por 3 turnos, custo 1 BP
Resistance: +30% resistência mágica por 3 turnos, custo 0 BP
```

### 8. Híbridos

Personagens que combinam elementos de múltiplos arquétipos.

**Exemplo: Battlemage**
- Dano mágico moderado
- Algumas habilidades de controle
- Pode funcionar como backup debuffer

**Exemplo: Paladin**
- Tank com cura moderada
- Pode se sustentar
- Menos defesa que tank puro, mais utilidade

## 6. Arquétipos de Inimigos e Chefes

### Inimigos Comuns

**1. The Spiker**
Passa vários turnos usando `Guard` ou ações fracas, telegrafando um acúmulo de BP.

**Objetivo de Design:** Forçar o jogador a reconhecer padrões e decidir entre interromper ou se preparar.

**Skills:**
```
Charge: Guard + +1 BP adicional (total +3 BP), telegrafado
Release: Consome todo BP para ataque massivo em área
```

**Contra-jogo:** Stun, delay, ou defesa preparada.

**2. The Swarmer**
Usa `Brave` para invocar aliados ou usar múltiplas ações de baixo impacto.

**Objetivo de Design:** Testar gerenciamento de múltiplos alvos.

**Skills:**
```
Summon Minion: Custo 1 BP, invoca inimigo fraco
Multi-Slash: 4 ataques de 25% dano cada, custo 3 BP
```

**Contra-jogo:** AOE, focar no summoner primeiro.

**3. The Denier/Leecher**
Focado em atacar o BP do jogador.

**Objetivo de Design:** Forçar adaptação da estratégia de acúmulo.

**Skills:**
```
BP Drain: 80% dano + rouba 1 BP se alvo tiver BP positivo
 Suppress: Próximo turno, alvo não ganha BP (debuff)
```

**Contra-jogo:** Imunidade a dreno, alternar estratégia.

**4. The Counter-Attacker**
Reage a sequências de `Brave`.

**Objetivo de Design:** Ensinar moderação.

**Skills:**
```
Vengeance Passive: Após receber 3+ hits em 1 turno, contra-ataca com 150% dano
Thorns Passive: Reflete 20% de dano físico recebido
```

**Contra-jogo:** Não usar Brave indiscriminadamente, usar ataques únicos fortes.

### Elites

Elites combinam múltiplos arquétipos ou têm versões aprimoradas.

**Exemplo: Elite Spiker**
- Acumula BP mais rápido
- Tem shield enquanto carrega
- Quando solta, causa debuff também

### Chefes

Chefes devem ser testes completos do sistema BTB.

**1. Chefes com Fases de BP**
Mudam padrão de ataque com base em BP atual.

```
BP Positivo (+3): Fase ofensiva, usa ataque mais forte
BP Neutro (0): Fase de suporte, aplica buffs
BP Negativo (-2): Fase vulnerável, recebe +20% dano
```

**2. Chefes que Puniem Overcommit**
```
Mechanic: Após receber X actions em 1 turno:
- Contra-ataca em área
- Ganha shield temporário
- Drena BP de quem atacou
```

**3. Chefes com Enrage**
```
Mechanic: Se o jogador leva mais de Y turnos:
- Inimigo ganha +1 BP por turno
- Ataques ficam mais fortes
- Começa a usar Brave agressivamente
```

**4. Chefes com Lacaios-Bateria**
```
Mechanic: Lacaios não atacam, apenas:
- Geram BP (+2 por turno)
- Transferem BP para chefe
- Se todos lacaios mortos, chefe perde acesso a Brave
```

**5. Chefes com Attack Patterns Telegraphed**
```
Turn 1: "O chefe começa a brilhar com energia escura..."
Turn 2: Continua brilhando, BP +2
Turn 3: "O chefe está prestes a soltar um ataque devastador!"
Turn 4: Ataque massivo (pode ser interrompido com stun ou forçando BP negativo)
```

### Famílias de Inimigos

**Família 1: Feras**
- Foco em ataques físicos
- Algumas têm "berserk" quando HP baixo
- Testam tank e healers

**Família 2: Arcanos**
- Foco em magia
- Manipulam BP e turn order
- Testam controllers e breakers

**Família 3: Construtos**
- Alta defesa
- Imunes a certos debuffs
- Testam sustained DPS

**Família 4: Sombras**
- Alta esquiva
- Roubam BP
- Testam precisão e adaptação

## 7. Design de Skills para a Party

### Princípios Gerais

**1. Clareza de Função**
Cada skill deve ter um propósito claro e único.

**2. Interação com BP**
Skills devem interagir com o sistema de forma significativa.

**3. Trade-offs Claros**
Power deve vir com custo ou risco.

### Categorias de Skills

#### Skills de Dano

**Função:** Reduzir HP do inimigo.

**Saudável quando:**
- Tem custo de apropriação (MP, BP, setup)
- Tem contra-jogo possibilidade
- Se integra em combos

**Opressiva quando:**
- Dano muito alto sem custo
- Sem interação com BP
- Sem contrajogo possível

**Limites:**
- Dano básico: 100-120% de valor base
- Dano + custo MP: 150-180%
- Dano + custo 1 BP: 220-280%
- Dano + custo 2 BP: 350-450%

**Exemplos:**
```
Quick Slash: 70% dano, ação rápida (0.7× ticks)
Power Attack: 180% dano, ação lenta (1.5× ticks), custo 1 MP
Berserker's Rage: 250% dano, custo 1 BP, usuário fica vulnerável por 1 turno
```

#### Skills de Defesa

**Função:** Mitigar dano recebido.

**Saudável quando:**
- Tem custo de oportunidade
- Não pode ser mantida 100% do tempo
- Tem counter-play inimiga

**Opressiva quando:**
- Invulnerabilidade total
- Pode ser mantida indefinidamente
- Sem custo de manutenção

**Exemplos:**
```
Shield Block: Próximo ataque físico causa 50% menos dano, custo 0 BP
Iron Will: +40% DEF por 2 turnos, custo 1 BP
Reflect: 30% do dano recebido é refletido por 1 turno, custo 2 BP
```

#### Skills de Cura

**Função:** Restaurar HP ou remover debuffs.

**Saudável quando:**
- Cura é menos eficiente que ofensa (força agressão)
- Tem custo de MP significativo
- Não pode spam infinitamente

**Opressiva quando:**
- Cura mais que dano inimigo
- Permite stalling eterno
- Sem custo de MP

**Exemplos:**
```
Minor Heal: Restaura 150 HP, custo 5 MP
Major Heal: Restaura 400 HP, custo 15 MP, custo 1 BP
Regeneration: 50 HP/turno por 3 turnos, custo 8 MP
```

#### Skills de Suporte

**Função:** Melhorar performance de aliados.

**Saudável quando:**
- Requer coordenação
- Tem duração limitada
- Não é aplicável em todos os cenários

**Opressiva quando:**
- Buffs muito fortes
- Sem duração/limite
- Stack infinitamente

**Exemplos:**
```
Haste: +30% AGI por 3 turnos, custo 8 MP
Bless: +20% todos os stats por 2 turnos, custo 10 MP, custo 1 BP
Focus: Próximo ataque crítico garanti, custo 0 BP
```

#### Skills de Debuff

**Função:** Reduzir performance de inimigos.

**Saudável quando:**
- Chance de acerto < 100%
- Inimigos podem ser imunes
- Duração limitada

**Opressiva quando:**
- 100% chance de acerto
- Sem imunidade inimiga
- Duração muito longa

**Exemplos:**
```
Slow: -20% AGI por 3 turnos, 80% acerto, custo 6 MP
Poison: 50 dano/turno por 3 turnos, 75% acerto, custo 8 MP
Armor Break: -25% DEF por 2 turnos, 85% acerto, custo 0 BP
```

#### Skills de Controle

**Função:** Manipular turn order ou impedir ações.

**Saudável quando:**
- Alto custo de MP/BP
- Duração curta
- Inimigos podem resistir

**Opressiva quando:**
- Stunlock infinito
- Sem custo de manutenção
- Sem resistência possível

**Exemplos:**
```
Stun: Alvo perde próximo turno, 60% acerto, custo 12 MP
Delay: Empurra alvo 2 posições na fila, 90% acerto, custo 4 MP
Sleep: Alvo não age até ser atacado, 50% acerto, dura 2 turnos, custo 10 MP
```

#### Skills de Utilidade

**Função:** Fornecer opções táticas fora de dano/cura.

**Exemplos:**
```
Escape: 80% chance de fugir de batalha, custo 0 BP
Steal: Tenta roubar item, 70% sucesso, custo 0 BP
Analyze: Revela HP e fraquezas de alvo, custo 0 BP
```

#### Skills de Setup

**Função:** Preparar terreno para ações futuras.

**Exemplos:**
```
Charge: Próximo ataque físico causa +100% dano, dura até próximo turno, custo 1 BP
Elemental Weapon: Próximos 3 ataques causam dano de fogo, custo 1 MP
Mark: Marca alvo; próximo ataque de aliado contra alvo causa +50% dano, custo 0 BP
```

#### Skills de Payoff

**Função:** Capitalizar em setup prévio.

**Exemplos:**
```
Execute: 300% dano se alvo < 30% HP, caso contrário 100% dano, custo 2 BP
Release: Consome todos os marks/charges em alvo para dano massivo, custo 1 BP + variável
```

#### Skills de Manipulação de BP

**Função:** Gerenciar economia de ações.

**Exemplos:**
```
Brave Share: Todos os aliados ganham +1 BP, usuário perde 2 BP, custo 0 MP
BP Drain: Rouba 1 BP do alvo, custo 8 MP
BP Gift: Dá 1 BP seu para aliado, custo 0 BP
```

#### Skills de Manipulação da Ordem de Turno

**Função:** Controlar quando cada combatente age.

**Exemplos:**
```
Haste: +30% AGI por 3 turnos, custo 8 MP
Quick Step: Próxima ação vem 50% mais rápido, custo 1 BP
Delay Strike: Empurra alvo 2 posições atrás na fila, custo 4 MP
```

#### Skills de Risco Alto

**Função:** Grande poder com grande risco.

**Exemplos:**
```
Desperate Attack: 400% dano, mas usuário fica com -3 BP, custo 0 MP
Russian Roulette: 50% chance de 300% dano, 50% chance de 50% dano self, custo 1 BP
All In: Consome todo HP restante (deixa 1 HP) para causar 10× dano, custo 0 BP
```

#### Skills de Segurança/Recuperação

**Função:** Permitir recover de erros.

**Exemplos:**
```
Safe Haven: Remove 2 pontos de BP negativo de aliado, custo 2 BP
Emergency Heal: Cura 25% HP máximo, só pode usar quando < 30% HP, custo 0 BP
Second Wind: Quando nocauteado, revive com 30% HP uma vez por batalha (passiva)
```

## 8. Combinações de Skills e Sinergias

### Setup + Payoff

**Combo: Armor Break → Burst**

**Loop Tático:**
1. Breaker usa `Armor Break` (-30% DEF)
2. Battery usa `Rally Cry` (todos ganham +1 BP)
3. Striker usa `Brave` x3 + `Power Strike` (180% dano ×3 vs DEF quebrada)

**Por que é divertido:** Coordenação, preparação, gratificação.

**Riscos:** Se inimigo agir entre setup e payoff, pode ajustar.

**Balanceamento:** Debuffs têm duração limitada, requer timing.

### Defesa + Contra-ataque

**Combo: Tank Provoca + DPS Quebra**

**Loop Tático:**
1. Tank usa `Provoke` (todos inimigos focam nele)
2. Tank usa `Fortress Stance` (+50% DEF)
3. DPS livremente usa `Brave` x3 contra inimigo distraído

**Por que é divertido:** Proteção permite agressão calculada.

**Riscos:** Tank pode cair se não tiver healer support.

**Balanceamento:** Provocação não funciona em todos os inimigos (bosses imunes).

### Manipulação de BP + Burst

**Combo: Battery Charge → Striker Execute**

**Loop Tático:**
1. Battery usa `Focus Energy` (+2 BP próprio via Guard)
2. Battery usa `BP Gift` (transfere 1 BP para Striker)
3. Striker (agora com +3 BP) usa `Brave` x4 + Ultimate

**Por que é divertido:** Combinação otimizada, máxima eficiência.

**Riscos:** Múltiplos turnos de setup, janela de contra-ataque.

**Balanceamento:** Inimigos com dreno de BP podem interromper.

### Manipulação de Turno + Controle

**Combo: Delay → Setup → Burst**

**Loop Tático:**
1. Controller usa `Delay Strike` (atrasa boss 3 posições)
2. Time inteiro age antes do boss
3. Breaker aplica debuffs, Battery gera BP
4. Striker executa burst massivo
5. Boss finalmente age, já severamente danificado

**Por que é divertido:** Controle total de fluxo, planejamento antecipado.

**Riscos:** Se delay falhar, time exposto.

**Balanceamento:** Skills de delay têm chance < 100% e custos significativos.

### Debuff + Execução

**Combo: Poison + Execute**

**Loop Tático:**
1. Debuffer aplica `Poison` (50 dano/turno × 3)
2. Time usa ataques moderados para baixar HP
3. Quando inimigo < 30%, Striker usa `Execute` (300% dano)

**Por que é divertido:** Paciência recompensada, timing preciso.

**Riscos:** Poison pode curar se inimigo for imune/curar.

**Balanceamento:** Execute tem alto custo de BP.

### Sustain + Preparação

**Combo: Regen → Guard → Brave**

**Loop Tático:**
1. Healer aplica `Regen` (50 HP/turno × 3)
2. Personagem usa `Guard` por 2 turnos (ganha +4 BP total, regen cura)
3. Personagem usa `Brave` x4 com HP cheio e BP cheio

**Por que é divertido:** Recuperação ativa, não só passiva.

**Riscos:** 2 turnos sem agredir pode dar inimigo tempo de setup.

**Balanceamento:** Regen não cura o suficiente para compensar dano massivo.

### Action Fusion Combos

**Combo: Fire + Fire → Explosion**

**Loop Tático:**
1. Mago usa `Fire` (setup)
2. Mago usa `Fire` (setup)
3. Sistema detecta fusão, substitui por `Inferno` (dano massivo em área)

**Por que é divertido:** Descoberta, experimentação, recompensa por conhecimento.

**Riscos:** Se fusão falhar, desperdiçou turnos.

**Balanceamento:** Fusões têm requisitos claros e recompensa proporcional.

### Sinergias Saudáveis vs. Perigosas

**Saudáveis:**
- Requerem coordenação de múltiplos personagens
- Têm contrajogo claro
- Requerem timing preciso
- Recompensa proporcional ao risco

**Perigosas:**
- Um personagem sozinho faz tudo
- Sem contrajogo possível
- Timing muito flexível
- Recompensa desproporcional

## 9. Action Fusion

### O Conceito

Action Fusion é uma mecânica onde sequências específicas de ações se fundem em uma ação mais poderosa. Isso adiciona uma camada de complexidade e recompensa o aprendizado do sistema.

### Tipos de Fusão

**Fusão Estrita:**
Requer uma sequência exata de habilidades.

```
Fire → Fire → Physical Attack
↓
Inferno Blade: Dano massivo de fogo + Physical a todos os inimigos
```

**Fusão Flexível:**
Requer tipos de ações, independente da ordem.

```
Qualquer Skill de Fogo + Qualquer Skill de Vento
↓
Firestorm: Dano de fogo em área + chance de confusion
```

### Diretrizes de Design

**O que Aumenta Profundidade:**
- Fusões com sinergia temática
- Combinações intuitivas
- Recompensa proporcional ao setup
- Múltiplas fusões por personagem (não apenas uma)

**O que Aumenta Complexidade Inútil:**
- Fusões obscuras sem dicas
- Combinações muito específicas (Fire Level 2 → Ice Level 3 → Fire Level 2)
- Fusões que são piores que usar skills separadas
- Fusões ocultas (sem documentação)

### Exemplos de Fusões Boas

**Combustion (Fogo + Fogo)**
```
Setup: Fire → Fire
Fusion: Combustion
Effect: 200% dano de fogo em todos os inimigos
Why: Simples, intuitivo, recompensa spam de um elemento
```

**Freeze Shard (Gelo + Vento)**
```
Setup: Ice → Wind
Fusion: Freeze Shard
Effect: 150% dano + 80% chance de stun por 1 turno
Why: Combinação elementar makes sense, efeito útil
```

**Healing Bloom (Cura × 2)**
```
Setup: Minor Heal → Minor Heal
Fusion: Bloom
Effect: Cura 500 HP a todos os aliados (economia de MP)
Why: Recompensa preparação, economiza recurso
```

### Exemplos de Fusões Ruins

**Obscure Chain**
```
Setup: Fire Level 2 → Ice Level 3 → Thunder Level 1 → Attack
Fusion: ????
Problem: Muito específico, difícil de lembrar, pouco intuitivo
```

**Worse Than Separate**
```
Setup: Poison → Poison
Fusion: Double Poison
Effect: 100 dano/turno (vs 50×2 = 100, mesma coisa, mais setup)
Problem: Não há benefício, desperdício de turno
```

### Regras para Balanceamento

**Número de Fusões:**
- Por personagem: 3-5 fusões únicas
- Por equipe: 10-15 fusões totais (algumas compartilhadas)

**Transparência:**
- Fusões descobertas aparecem em um "grimoire" ou menu
- Interface sugere fusões possíveis durante setup
- Fusões elementares devem ser intuitivas

**Previsibilidade:**
- Fusões estritas devem ser telegrafadas na interface
- Fusões flexíveis devem ter dicas visuais

**Custo de Oportunidade:**
- Fusão deve ser ~30-50% mais forte que usar skills separadas
- Se muito forte, remove estratégia (sempre usar fusão)
- Se muito fraca, nunca usada

**Impacto Visual/Cognitivo:**
- Fusões devem ter animação única
- Nome e efeito devem ser claros
- Não sobrecarregar a UI com indicações de fusão

## 10. Progressão e Curva de Complexidade

O sistema deve ser introduzido em camadas, permitindo que o jogador domine cada mecânica antes de adicionar a próxima.

### Early Game (Níveis 1-10)

**Mecânicas Introduzidas:**
- Comandos básicos: Attack, Guard, Brave
- Turn Order básica
- HP/MP management

**Encontros:**
- Inimigos simples sem uso de BP
- Foco em entender que Brave = ações futuras

**Skills Disponíveis:**
- 3-4 skills por personagem
- Skills básicas de dano, cura, defesa
- Sem interações complexas com BP

**Exemplo de Tutorial:**
1. Primeira batalha: Attack only
2. Segunda batalha: Introduz Guard
3. Terceira batalha: Introduz Brave, força jogador a usar
4. Chefe do tutorial: Requer uso de Guard + Brave para vencer

### Mid Game (Níveis 11-25)

**Mecânicas Introduzidas:**
- Ações de custo variável (skills que custam BP)
- Manipulação básica de Turn Order (Delay, Haste)
- Debuffs e sua interação com Burst

**Encontros:**
- Inimigos começam a usar Guard e Brave
- Elites com padrões de BP
- Primeiros chefes com mecânicas de BP

**Skills Disponíveis:**
- 6-8 skills por personagem
- Primeiras skills de custo de BP
- Skills de manipulação de turno

**Exemplo de Progressão:**
```
Level 10: Desbloqueia primeira skill que custa 1 BP
Level 15: Encontra primeiro inimigo que usa Brave
Level 20: Primeira skill de Delay
Level 25: Primeiro chefe com fases de BP
```

### Late Game (Níveis 26-40)

**Mecânicas Introduzidas:**
- Action Fusion
- Manipulação avançada de BP (dreno, transferência)
- Interdependência de party members

**Encontros:**
- Inimigos com múltiplos arquétipos
- Elites com mecânicas complexas
- Chefes com múltiplas fases e mecânicas de BP

**Skills Disponíveis:**
- 10-12 skills por personagem
- Fusões específicas por personagem
- Skills avançadas de manipulação

**Exemplo de Progressão:**
```
Level 28: Introdução de Action Fusion através de quest/tutorial
Level 32: Primeira skill de dreno de BP
Level 36: Primeira skill que transfere BP
Level 40: Chefe final que testa todas as mecânicas
```

### Endgame/Post-game

**Mecânicas Introduzidas:**
- Combinações avançadas de Action Fusion
- Passivas que interagem com BP
- Challenges especiais (super bosses)

**Encontros:**
- Super bosses com mecânicas únicas
- Challenges de "no damage", "speedrun"
- Inimigos que forçam arquétipos específicos

### Escalando Complexidade

**Princípio: Adicione, não substitua.**

Novas mecânicas devem se adicionar às existentes, não torná-las obsoletas.

**Exemplo de Evolução de Personagem:**

| Nível | Skills | Complexidade |
|-------|--------|--------------|
| 1 | Attack, Minor Heal, Guard | Básico |
| 10 | + Poison, Cure | + Debuffs |
| 20 | + Haste, Delay Strike | + Turno manipulation |
| 30 | + BP Gift, Group Heal | + BP management |
| 40 | + Fusion skills, Ultimate | + Mastery |

### Pedagogia de Introdução

**Ordem Sugerida:**
1. Brave/Guard/BP (base)
2. Leitura da ordem de turno (visão espacial)
3. Setup e payoff (planejamento)
4. Manipulação de BP (economia)
5. Action Fusion (combinação)
6. Interações avançadas (mastery)

**Por que essa ordem:**
- Cada mecânica se baseia na anterior
- Complexidade crescente
- Permite experimentação gradual

## 11. Balanceamento Prático

### Framework de Balanceamento

#### Métricas Qualitativas

**Diversidade de Estratégias:**
- Quantas abordagens válidas existem para cada encounter?
- Todos os arquétipos são úteis?

**Clareza de Feedback:**
- O jogador entende por que ganhou/perdeu?
- Telegraphing é adequado?

**Pacing de Combate:**
- Batalhas têm duração adequada?
- Existe tensão e alívio?

#### Métricas Quantitativas

**Damage Per Action (DPA):**
Dano médio por ação de um personagem.

```
DPA = Total Damage / Number of Actions
```

**Damage Per BP (DPBP):**
Dano médio por ponto de BP gasto.

```
DPBP = Total Damage / BP Spent
```

**Action Efficiency Ratio (AER):**
Comparação entre usar Brave vs turnos separados.

```
AER = (Damage with Brave) / (Damage in separate turns)
Target: 1.2 - 1.5
```

**Survivability Index (SI):**
Quantidade de tempo que um personagem pode sobreviver.

```
SI = (Total HP × Defense Factor) / (Enemy DPA × Attacks Per Turn)
```

#### Perguntas de Teste

**Para Skills de Dano:**
- [ ] A skill é usada quando disponível?
- [ ] A skill tem momento de uso óbvio?
- [ ] A skill tem contrajogo do inimigo?
- [ ] A skill se integra em combos?

**Para Skills de Defesa:**
- [ ] A defesa é necessária em algum momento?
- [ ] A defesa tem custo de oportunidade?
- [ ] A defesa pode ser superada?

**Para Sistema BP:**
- [ ] Brave é usado regularmente?
- [ ] Guard é usado estrategicamente?
- [ ] BP negativo é punidor mas recuperável?

#### Sinais de Meta Quebrado

**Snowball Signs:**
- Primeiro lado a usar Brave vence sempre
- Um lado consegue acumular BP infinitamente

**Stalling Signs:**
- Batalhas podem durar indefinidamente
- Cura > dano inimigo consistentemente

**Dominant Strategy Signs:**
- Sempre usar o mesmo combo
- Alguns arquétipos nunca são usados

### Balanceamento por Categoria

#### Dano por Ação

**Heurística:**
```
Base Damage = 100 (ataque padrão)
Light Skill = 120-150%
Medium Skill = 160-200%
Heavy Skill = 220-300%
Ultimate = 400%+
```

#### Dano por BP

**Heurística:**
```
0 BP (base action): 100% efficiency
1 BP cost: Must be 220-280% total value
2 BP cost: Must be 350-450% total value
3 BP cost: Must be 500-700% total value
```

**Exemplo:**
```
Fire (0 BP): 80 damage
Fire + (1 BP): Should be 176-224 damage
Fire ++ (2 BP): Should be 280-360 damage
```

#### Valor Defensivo por Turno

**Heurística:**
```
Guard deve mitigar pelo menos 50% do dano médio de um hit
Shield deve absorver 1-2 hits completos
Buff de DEF deve reduzir dano em 25-40%
```

#### Valor de Cura em Burst

**Heurística:**
```
Cura básica: 15-20% do HP máximo
Cura +1 BP: 25-35% do HP máximo
Cura +2 BP: 40-60% do HP máximo
Group Heal: 60-80% do valor de single target
```

#### Controle de Turno

**Heurística:**
```
Delay: 2-3 posições na fila
Haste: 25-35% de aumento de AGI
Stun: 1 turno máximo, 50-70% chance de sucesso
```

#### Habilidades de Recuperação

**Heurística:**
```
Remover 1 ponto de BP negativo: Valor = 1 turno de ação
Remover todos os BP negativos: Valor muito alto, custo alto também
Revive: 30-50% HP, custo muito alto (MP + BP)
```

#### Skills de Boss

**Heurística:**
```
Ataque básico: 15-25% do HP máximo de um tank
Ataque carregado (telegraphed): 40-60% do HP máximo
Ultimate: 80-100% (deve ser sobrevivível com preparação)
```

### Tabelas Conceituais

#### Tabela de Custo de Ações

| Ação | Custo de BP | Multiplicador de Dano | Custo de MP | Tick Cost |
|------|-------------|----------------------|-------------|-----------|
| Attack | 0 | 1.0× | 0 | 1.0× |
| Quick Attack | 0 | 0.7× | 0 | 0.7× |
| Power Attack | 1 | 2.5× | 5 | 1.5× |
| Magic | 0 | 1.2× | 8 | 1.2× |
| Heavy Magic | 2 | 4.0× | 20 | 2.0× |

#### Tabela de Balanceamento de Encontros

| Dificuldade | HP Inimigo | Dano por Hit | Uso de BP | Mecânicas Especiais |
|-------------|-----------|--------------|-----------|---------------------|
| Muito Fácil | 50-100 | 5-10 | Não | Nenhuma |
| Fácil | 100-200 | 10-20 | Não | 1 debuff |
| Médio | 200-400 | 20-40 | Guard | 2-3 debuffs |
| Difícil | 400-800 | 40-80 | Guard + Brave | Counter patterns |
| Muito Difícil | 800-1500 | 80-150 | Brave + Manipulação | Fases de BP |
| Boss | 3000-10000 | 100-200 | Full BTB | Mecânicas únicas |

### Fórmulas Heurísticas

**Para determinar se uma skill está balanceada:**

```
Skill Value = (Damage × Target Factor) + (Utility × Utility Weight) - (Cost Factors)

Onde:
- Target Factor: 1.0 (single) / 0.6× per additional target
- Utility Weight: 50-100 (dependendo de tipo)
- Cost Factors: (BP × 50) + (MP / 2) + (Setup Turns × 100)

Target Value:
0 BP: ~100
1 BP: ~220-280
2 BP: ~350-450
```

## 12. Pegadinhas e Erros Comuns

### 1. Invalidar Guard

**Problema:** Skills ou inimigos tornam Guard inútil.

**Sintoma:** Jogadores nunca usam Guard.

**Causa:** Inimigos causam dano muito alto (Guard não mitiga o suficiente) ou inimigos ignoram defesa completamente.

**Correção:**
- Garantir que Guard mitigue pelo menos 50-60% do dano médio
- Limitar inimigos que ignoram defesa a <20% do total
- Dar benefícios adicionais a Guard (ganho extra de BP, passivas)

### 2. Brave Sempre Correto

**Problema:** Brave é sempre a melhor opção.

**Sintoma:** Jogadores usam Brave em todos os turnos, nunca Guard.

**Causa:** Recompensa de Brave é muito alta / risco é muito baixo.

**Correção:**
- Aumentar punição de BP negativo
- Adicionar inimigos que punem Brave (counter-attackers)
- Reduzir multiplicador de dano de ações extra

### 3. Punição Severa Demais

**Problema:** Um erro coloca o jogador em death spiral.

**Sintoma:** Jogadores se tornam excessivamente conservadores.

**Causa:** BP negativo é muito punidor, inimigos focam quem está vulnerável.

**Correção:**
- Reduzir dano recebido durante BP negativo (passiva de tank)
- Dar skills de recuperação de emergência
- Limitar quantos inimigos podem focar um alvo

### 4. Excesso de Manipulação de BP

**Problema:** Demasiadas skills que alteram BP.

**Sintoma:** Sistema de BP torna-se caótico e imprevisível.

**Causa:** Muitos inimigos com dreno/roubo de BP, demasiadas skills de transferência.

**Correção:**
- Limitar habilidades de manipulação a 1-2 por personagem
- Inimigos com manipulação devem ser raros
- Dar imunidade/passivas contra manipulação excessiva

### 5. Telegraphing Confuso

**Problema:** Jogadores não conseguem prever ações inimigas.

**Sintoma:** Derrotas parecem injustas, "não tinha como saber".

**Causa:** Ataques massivos sem aviso, animações não comunicam intenção.

**Correção:**
- Todo ataque massivo deve ser telegrafado (1-2 turnos de aviso)
- Animações devem comunicar claramente (carregando, brilhando)
- Interface deve indicar quando inimigo está "perigoso"

### 6. Complexidade Combinatória Excessiva

**Problema:** Muitas combinações possíveis, torna-se opressivo.

**Sintoma:** Jogadores sentem que precisam de uma planilha para jogar.

**Causa:** Action Fusions demais, debuffs que stack, muitas interações.

**Correção:**
- Limitar Action Fusions a 3-5 por personagem
- Debuffs não devem stack (refresh duração)
- Interface deve sugerir combos óbvios

### 7. Snowball Irrecuperável

**Problema:** Primeiro lado a usar Brave vence, o outro não se recupera.

**Sintoma:** Batalhas decididas no primeiro turno.

**Causa:** Brave permite dano muito alto sem resposta.

**Correção:**
- Limitar BP máximo inicial
- Inimigos com mecânicas de recuperação
- Contra-ataques automáticos após receber X hits

### 8. Batalhas Longas Demais

**Problema:** Encontros normais levam 10+ minutos.

**Sintoma:** Jogadores ficam exaustos, grinding torna-se tortura.

**Causa:** HP de inimigos muito alto, dano do jogador muito baixo.

**Correção:**
- Reduzir HP de inimigos comuns
- Aumentar dano base do jogador
- Limitar uso de Guard por inimigos

### 9. Falta de Ferramentas de Recuperação

**Problema:** Jogadores cometem um erro e não conseguem se recuperar.

**Sintoma:** Restart é a única opção após erro.

**Causa:** Sem skills de escape, recuperação de emergência, ou reset.

**Correção:**
- Adicionar skills de "fuga" ou "reset parcial"
- Permitir recuperação de BP negativo com custo
- Dar items consumíveis de emergência

### 10. Estratégia Dominante Única

**Problema:** Um combo/arquétipo é claramente superior.

**Sintoma:** Jogadores ignoram 80% das skills.

**Causa:** Balanceamento pobre, falta de contrajogo.

**Correção:**
- Enfraquecer estratégia dominante
- Fortalecer alternativas
- Adicionar inimigos que punem estratégia dominante especificamente

## 13. Diretrizes de UX, Telegraphing e Feedback

### O Que a Interface Precisa Comunicar

**1. BP Atual e Projetado**
```
┌─────────────────┐
│ Knight          │
│ ❤️ 1200/1500    │
│ 💙 150/200      │
│ ⚡ +2 BP (next: +1)  │
└─────────────────┘
```

**2. Risco de BP Negativo**
```
┌─────────────────┐
│ Knight          │
│ ⚡ -2 BP        │
│ ⚠️ Skip next 2 turns  │
└─────────────────┘
```

**3. Ordem de Turno Prevista**
```
Turn Order (next 8 turns):
1. 🧙 Mage (Ally)
2. 👹 Goblin (Enemy)
3. ⚔️ Knight (Ally)
4. 👹 Goblin Chief (Enemy)
5. 💊 Healer (Ally)
...
```

**4. Consequência da Ação Escolhida**
```
┌─────────────────────────┐
│ ⚔️ Power Attack         │
│ 180% physical damage    │
│ Cost: 1 BP              │
│ Effect: You will skip 1 turn │
└─────────────────────────┘
```

**5. Fusões Possíveis**
```
Current queue: Fire → Ice → [Selecting...]
💡 Hint: Add Thunder for "Tri-Element Fusion"
```

**6. Estados Perigosos**
```
⚠️ WARNING: Goblin Chief is charging!
Turns until attack: 2
Recommended: Guard or Delay
```

**7. Inimigos Prestes a Punir Greed**
```
⚠️ COUNTER READY: This enemy will counter
if attacked more than 2 times this turn.
```

### Melhorando Clareza sem Matar Profundidade

**Mostrar Informação Progressivamente:**
- Novatos veem informações básicas
- Experientes podem acessar informações detalhadas

**Destacar Informação Crítica:**
- Telegraphs de ataques massivos devem ser visuais
- Estados de BP negativo devem ser óbvios

**Permitir Customização:**
- Jogadores podem escolher nível de detalhe na UI

### Elementos Visuais de Telegraphing

**Para Inimigos Carregando:**
- Aura crescente ao redor do inimigo
- Barra de progresso visível
- Texto flutuante: "Charging..."

**Para Contra-ataques:**
- Pose diferente quando "ready"
- Sparkle/brilho quando counter ativo
- Ícone de "danger" sobre inimigo

**Para BP Status:**
- Positivo: Azul brilhante, para cima
- Negativo: Vermelho rachado, para baixo
- Zero: Neutro

## 14. Processo de Criação do Roster de Skills

### Framework Passo a Passo

**Passo 1: Definir Pilares do Personagem**

| Questão | Resposta Exemplo |
|---------|------------------|
| Qual é o arquétipo? | Burst DPS |
| Qual é a fantasia? | "Guerreiro que canaliza energia furiosa" |
| Qual é o elemento? | Fogo/Físico |
| Qual é a personalidade? | Impulsivo, protetor |

**Passo 2: Distribuir Papéis por Tier**

| Tier | Número de Skills | Foco |
|------|------------------|------|
| Early (1-10) | 3-4 | Básico + 1 interação com BP |
| Mid (11-25) | 6-8 | Custo de BP + manipulação básica |
| Late (26-40) | 10-12 | Fusões + mastery |
| Ultimate | 1-2 | Assinatura do personagem |

**Passo 3: Budget de Poder por Tier**

```
Early Skills: 100-150% value (vs 100% attack)
Mid Skills: 180-250% value (com custo de MP/BP)
Late Skills: 300-500% value (com custo significativo)
Ultimate: 700-1000% value (custo massivo)
```

**Passo 4: Número de Skills por Função**

Para um personagem com 10 skills:
- 3-4 skills de dano (variedade de situações)
- 2-3 skills de utilidade (buff, debuff, movimento)
- 1-2 skills de interação com BP
- 1 skill de ultimate/signature

**Passo 5: Cadência de Desbloqueio**

```
Level 1: Attack + 1 starting skill
Level 3: +1 skill
Level 6: +1 skill
Level 10: +1 skill (mid-tier intro)
Level 15: +1 skill
Level 20: +1 skill (introduz custo de BP)
Level 25: +1 skill
Level 30: +1 skill (fusion intro)
Level 35: +1 skill
Level 40: Ultimate skill
```

**Passo 6: Validação em Playtest**

| Critério | Teste |
|----------|-------|
| Todas as skills são usadas? | Ver logs de combate |
| Existe momento óbvio para cada skill? | Observar jogadores |
| Skills se integram em combos? | Testar party composition |
| Alguma skill é dominante? | Comparar uso stats |

### Checklist de Produção

**Para cada skill:**
- [ ] Nome temático e memorável
- [ ] Efeito claro e único
- [ ] Custo apropriado (MP/BP/setup)
- [ ] Interage com sistema BTB
- [ ] Tem contra-jogo possível
- [ ] Balanceada vs outras skills do tier
- [ ] Animação e efeitos sonoros
- [ ] Descrição clara para o jogador
- [ ] Integra com combos do personagem
- [ ] Testada em múltiplos cenários

**Para o personagem completo:**
- [ ] Identidade clara e distinta
- [ ] Todos os arquétipos cobertos (para party completa)
- [ ] Progressão satisfatória
- [ ] Nenhuma skill obsoleta
- [ ] Synergy interna (skills trabalham juntas)
- [ ] Synergy externa (combina com outros personagens)
- [ ] Balanceado vs outros personagens
- [ ] Divertido de jogar

## 15. Framework de Playtest

### Cenários de Playtest Específicos

**Teste 1: Uso Excessivo de Brave**

**Setup:**
- Encontro com 3 inimigos médios
- Party completa
- Inimigos não punem Brave inicialmente

**Observar:**
- Com que frequência Brave é usado?
- O que acontece quando o personagem fica com BP negativo?
- O jogador se recupera ou é punido demais?

**Perguntas:**
- "Você sentiu que usou Brave demais ou de menos?"
- "O que faria se inimigos pudessem punir Brave?"

**Teste 2: Uso Excessivo de Guard**

**Setup:**
- Encontro com 1 inimigo forte
- Party completa
- Inimigo causa dano moderado-alto

**Observar:**
- Com que frequência Guard é usado?
- Guard é suficiente para mitigar dano?
- Player sente que está "perdendo tempo" com Guard?

**Perguntas:**
- "Você sentiu que usar Guard foi estratégico ou passivo?"
- "Em que situação você não usaria Guard?"

**Teste 3: Relevância da Ordem de Turno**

**Setup:**
- Encontro com inimigos de velocidades variadas
- Party com personagens lentos e rápidos
- Inclui inimigo com skill de Delay

**Observar:**
- O jogador consulta a Turn Order?
- O jogador tenta manipular a ordem?
- Delay/Haste skills são usadas?

**Perguntas:**
- "A ordem de turno influenciou suas decisões?"
- "Você sentiu que poderia prever quando agiria?"

**Teste 4: Viabilidade de Arquétipos**

**Setup:**
- Múltiplas parties com diferentes composições
- Mesmo conjunto de encontros para cada party

**Observar:**
- Todas as composições podem vencer?
- Algum arquétipo é obrigatório?
- Algum arquétipo é inútil?

**Perguntas:**
- "Qual personagem você sentiu ser essencial?"
- "Qual personagem você sentiu ser desnecessário?"

**Teste 5: Clareza das Janelas de Burst**

**Setup:**
- Encontro com boss que tem fases de BP
- Player precisa identificar janelas de oportunidade

**Observar:**
- O jogador reconhece quando o boss está vulnerável?
- O jogador usa Brave nas janelas corretas?
- O jogador se prepara para fases ofensivas do boss?

**Perguntas:**
- "Você entendeu quando era o momento de atacar?"
- "O que indicou que era uma boa janela?"

**Teste 6: Justiça de Bosses**

**Setup:**
- Boss com mecânicas complexas
- Múltiplas tentativas permitidas

**Observar:**
- Taxa de vitória após X tentativas
- Onde a maioria falha?
- O que causa mais frustration?

**Perguntas:**
- "A derrota pareceu justa?"
- "O que você poderia ter feito diferente?"

**Teste 7: Recuperação Após Erro**

**Setup:**
- Encontro onde erro inicial é provável
- Ferramentas de recuperação disponíveis

**Observar:**
- Após erro, o jogador se recupera?
- Quais ferramentas são usadas?
- O jogador desiste ou tenta se recuperar?

**Perguntas:**
- "Você sentiu que poderia se recuperar do erro?"
- "O que ajudou/impediu a recuperação?"

### Perguntas de Observação

**Durante o combate:**
- O jogador parece confuso?
- O jogador hesita frequentemente?
- O jogador consulta a Turn Order?
- O jogador tenta novos approaches ou repete o mesmo?

**Após o combate:**
- "Qual foi a decisão mais difícil que você tomou?"
- "Houve momento em que você se sentiu sem opções?"
- "O que mais te surpreendeu?"
- "O que você mudaria na sua abordagem?"

### Interpretação dos Resultados

**Indicadores de Saúde:**
- Diversidade de abordagens entre jogadores
- Todas as skills sendo usadas em algum momento
- Jogadores experimentando e adaptando
- Taxa de vitória balanceada (60-80% para encontros normais)

**Indicadores de Problema:**
- Todos os jogadores usando a mesma estratégia
- Algumas skills nunca sendo usadas
- Jogadores repetindo o mesmo padrão
- Taxa de vitória muito alta ou muito baixa
- Expressão de frustration sem learning

## 16. Recomendações Finais

### Princípios de Ouro

1. **Clareza Antes de Profundidade:** Um sistema simples que funciona é melhor que um sistema complexo que confunde.

2. **Risco Deve Ser Recompensado:** Se Brave é punido sempre, ninguém vai usar. Se nunca é punido, torna-se trivial.

3. **Diversidade é Segurança:** Nunca dependa de uma única estratégia funcionando. Múltiplos caminhos = replay value.

4. **O Jogador Deve Entender Por Que Perdeu:** Telegraphing, feedback claro, padrões reconhecíveis.

5. **A Cada Complexidade, Uma Ferramenta:** Se você adiciona uma mecânica complexa, adicione também ferramentas para lidar com ela.

6. **Teste, Teste, Teste:** Seu balanceamento inicial estará errado. Aceite isso e itere.

7. **O Ritmo é Rei:** O ciclo de acumular-explodir-recuperar deve ser satisfatório. Se as batalhas parecem monótonas ou caóticas, revise.

8. **Proteja a Expressão:** Se os jogadores encontrarem uma estratégia "quebrada" mas divertida, considere balancear em vez de remover.

9. **Corte sem Piedade:** Se uma mecânica não está funcionando e não pode ser consertada, remova-a. Não se apegue.

10. **O Divertido é o Certo:** No fim, o objetivo é que o jogo seja divertido. Se uma regra conflita com diversão, a regra está errada.

### O Que Proteger a Todo Custo

- **A tensão de risco/recompensa do sistema BP**
- **A clareza da Turn Order como ferramenta estratégica**
- **A diversidade de arquétipos viáveis**
- **A capacidade de recuperação após erros**
- **A sensação de planejamento recompensado**

### O Que Cortar Sem Dó

- **Mecânicas que só adicionam complexidade sem profundidade**
- **Skills que ninguém usa (em vez de tentar "consertar")**
- **Encontros que duram mais de 5 minutos sem motivo**
- **Action Fusions que são muito obscuras**
- **Sistemas que competem com BTB em vez de complementar**

---

## Resumo Executivo (1 Página)

**Sistema de Batalha: Brave Turn Battle Avançado**

**Visão Geral:** Um sistema de combate por turnos focado na **economia de ações e manipulação do tempo**. O recurso central são os **Brave Points (BP)**, que representam turnos que podem ser guardados para uso futuro ou emprestados do futuro, criando um ciclo de **Acúmulo, Explosão e Recuperação**.

**Pilares de Design:**
1. **Tensão Rítmica:** Cada decisão de gastar ou guardar BP é um cálculo de risco vs. recompensa.
2. **Planejamento Tático:** Uma Ordem de Turno visível transforma a batalha em um quebra-cabeças espacial-temporal.
3. **Expressão do Jogador:** O sistema suporta múltiplos estilos de jogo através de arquétipos distintos.
4. **Clareza Telegraphing:** Informação adequada permite decisões significativas.
5. **Recuperação e Contrajogo:** Erros são punidos, mas recuperáveis.

**Mecânicas Centrais:**
- **Economia de BP:** +1 BP por turno, Guard concede +1 BP adicional, Brave gasta BP para ações extras.
- **Limites:** +3 BP máximo, -3 BP mínimo (recomendado).
- **Turn Order Dinâmica:** AGI e peso de ações determinam ordem.
- **Arquétipos:** Striker, Tank, Tempo Controller, Battery, Breaker, Healer Reativo, Healer Preditivo, Híbridos.
- **Action Fusion:** Sequências específicas se fundem em ações mais poderosas.

**Filosofia de Balanceamento:**
- **BP-ROI:** Ações com custo de BP devem ser 120-150% mais valiosas que ações separadas.
- **Trade-offs:** Todo poder tem custo (MP, BP, setup, risco).
- **Counter-play:** Toda estratégia dominante tem contrajogo.

**Progressão:**
Early (Brave/Guard básico) → Mid (Custo de BP, debuffs) → Late (Fusions, manipulação avançada) → Endgame (Mastery).

---

## Kit Inicial de Implementação

### 12 Ideias de Skills para Personagens

1. **Investida Temporal (Quick Strike):** 70% dano, ação rápida (0.7× ticks), move usuário para frente na fila.

2. **Risco Calculado:** 300% dano físico, define BP do usuário para -2 instantaneamente.

3. **Doar Coragem (BP Gift):** Usuário perde 1 BP, aliado alvo ganha 1 BP.

4. **Barreira Protetora (Shield):** Cria escudo de 300 HP em aliado. Se usado via Brave, aplica a todos aliados com 150 HP cada.

5. **Golpe de Sifão (BP Drain):** 100% dano físico. Se alvo tiver BP positivo, rouba 1 BP.

6. **Preparar Terreno (Focus):** Próximo skill de dano ignora 50% da defesa inimiga. Custo: 1 BP. Dura até próximo turno.

7. **Soco Atrasado (Heavy Strike):** 250% dano físico, mas move usuário para o final da ordem de turno (2.0× ticks).

8. **Rebobinar (Cleanse):** Remove debuff mais recente de aliado e cura 100 HP.

9. **Sacrifício:** Nocauteia usuário, restaura 100% HP/MP/BP de todos outros aliados.

10. **Eco Mágico (Magic Echo):** A última magia de alvo único lançada pelo usuário é repetida sem custo de MP. Custo: 2 BP.

11. **Chamado à Batalha (Rally Cry):** Todos aliados ganham +1 BP. Custo: 2 BP inicial + 15 MP.

12. **Foco Absoluto (Precision):** Garante crítico nos próximos 3 ataques. Define BP para -1.

### 12 Ideias de Skills para Inimigos

1. **Fúria Acumulada (Charge Up):** Passa 1 turno carregando (ganha +2 BP). Próximo turno: ataque massivo (400% dano) consome todo BP.

2. **Dreno de Vontade (BP Drain):** 80% dano mágico. Se alvo tem BP positivo, rouba 1 BP.

3. **Multi-Agulhas (Multi-Needle):** Custa 2 BP. Ataca 3 alvos aleatórios com 60% dano cada + 50% chance poison.

4. **Chamado do Bando (Summon):** Custo 1 BP. Invoca aliado mais fraco.

5. **Muralha de Ferro (Iron Wall):** Custo 1 BP. Por 1 turno, contra-ataca qualquer ataque físico com 150% dano.

6. **Maldição Temporal (Time Curse):** Aplica debuff: alvo não ganha BP por 2 turnos. 70% chance.

7. **Desespero do Perdedor (Desperation):** Passiva: Quando HP < 30%, ganha +3 BP instantaneamente (1× por batalha).

8. **Roubo de Turno (Turn Theft):** Ataque rápido (100% dano). Empurra alvo para o final da ordem de turno.

9. **Devorar Tempo (Time Devour):** 150% dano. Se nocauteia alvo, inimigo ganha +2 BP.

10. **Comando em Uníssono (Unison Command):** Inimigo "líder" gasta 1 BP. Todos aliados atacam o mesmo alvo (coordenado).

11. **Escudo de BP (BP Shield):** Cria barreira que só pode ser danificada por personagens com BP positivo. Dura 2 turnos.

12. **Inversão (Inversion):** Troca valor de BP com alvo (se inimigo tem -2 e jogador +2, eles trocam). 50% chance.

### 6 Ideias de Passivas

1. **Premeditação:** Começa batalha com +1 BP.

2. **Resiliência (Resilience):** Recebe 30% menos dano enquanto BP < 0.

3. **Oportunista (Opportunist):** Causa 20% mais dano a alvos com BP negativo.

4. **Inspiração (Inspiration):** Sempre que usa Guard, um aliado aleatório também ganha +1 BP.

5. **Sede de Sangue (Bloodlust):** Ganha +1 BP sempre que derrota um inimigo.

6. **Mente Calma (Calm Mind):** Imune a efeitos de roubo/destruição de BP.

### 6 Ideias de Mecânicas de Boss

1. **Fases de BP:** Muda padrão de ataque e fraqueza ao atingir +3 BP (ofensiva), 0 BP (suporte), -3 BP (vulnerável).

2. **Lacaio-Battery (Minion Battery):** Lacaios não atacam, apenas geram +2 BP por turno e transferem para chefe. Matar lacaios corta acesso a Brave do chefe.

3. **Fechadura de Ações (Action Lock):** Após receber 4+ ações em 1 turno, torna-se imune a dano até próximo turno. Punição por overcommit.

4. **Dívida Compartilhada (Shared Debt):** Todo dano recebido também causa perda de 1 BP a quem atacou.

5. **Ataque Final Telegrafado:** Começa a carregar ataque de "game over" em 5 turnos. Única forma de parar: forçar BP negativo (interrompe carregamento).

6. **Adaptação Tática:** Gana resistência ao último tipo de dano recebido em cadeia de Brave (reseta após 2 turnos).

### 10 Regras de Balanceamento Inicial

1. **Valor Base:** Ação padrão (Attack) = 100 de valor de poder.

2. **Custo de MP:** Skill com custo de MP deve ter 150+ valor de poder.

3. **Custo de 1 BP:** Skill deve ter 250+ valor de poder (2.5× ação base).

4. **Custo de 2 BP:** Skill deve ter 400+ valor de poder.

5. **Guard:** Deve reduzir dano em pelo menos 50% para valer a pena.

6. **Geração de BP:** Sempre +1 BP por turno. Não mude isso - é o coração do sistema.

7. **HP de Inimigo:** Brave x3 de DPS deve causar 60-70% do HP (não one-shot, mas ameaça séria).

8. **Cura:** Deve ser ligeiramente menos eficiente que dano (para favorecer ofensiva).

9. **Debuffs:** 70-80% chance base, não 100%. Permite falha ocasional.

10. **Encontros Normais:** Inimigos não devem ter Brave > x1 (2 ações). Reserve para elites/bosses.

### 10 Red Flags de Design (Sinais de Problema)

1. **Guard Nunca Usado:** Dano de inimigo muito baixo ou Brave muito bom.

2. **Brave Nunca Usado:** Custo/risco muito alto ou recompensa muito baixa.

3. **Solo Dominante:** Um personagem sozinho vence tudo com Brave x3 repetidamente.

4. **Turn Order Ignorada:** Velocidade e manipulação não impactam o suficiente.

5. **BP Negativo = Morte:** Punição muito severa, sem recuperação possível.

6. **Mesma Estratégia Sempre:** A melhor abordagem é idêntica para todos encontros.

7. **"Não Sei Por Que Perdi":** Falta de clareza e telegraphing.

8. **Action Fusions Ignoradas:** Muito secretas, fracas ou difíceis.

9. **Bosses 2-Turnos ou 30-Minutos:** Picos de dano ou HP desbalanceados.

10. **Suportes "Inúteis":** Battery/Tempo Controllers não considerados valiosos vs dano bruto.

---

**Fim do Guia**

Este documento serve como referência viva. Revise e atualize conforme o jogo evolui e os playtests revelarem novas insights.

Boa sorte com o desenvolvimento!