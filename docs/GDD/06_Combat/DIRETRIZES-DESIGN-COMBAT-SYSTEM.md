# Diretrizes de Design do Combat System - Daratrine A Origem

**Versão:** 1.0
**Data:** 2026-04-10
**Escopo:** Regras práticas de design para criação e balanceamento de skills, kits de personagens e sinergias
**Baseado em:** FUNDAMENTOS-COMBAT-SYSTEM.md, GUIA-FERRAMENTAS-COMBAT-SYSTEM.md, CLASSIFICACAO-MODIFICADORES.md

---

## Introdução

Este documento é o **COMO fazer** do sistema de combate. Para o PORQUÊ (filosofia, princípios, identidade, inimigos, balanceamento macro), consulte `FUNDAMENTOS-COMBAT-SYSTEM.md`. Para o O QUE (ferramentas técnicas, tags, parâmetros), consulte `GUIA-FERRAMENTAS-COMBAT-SYSTEM.md`. Para o QUANTO (pontuação numérica exata de cada modificador, fórmula de score e checklist de validação), consulte `CLASSIFICACAO-MODIFICADORES.md`.

Tópicos cobertos por FUNDAMENTOS (não repetidos aqui):
- Princípios de design (consistência, legibilidade, previsibilidade, recompensa por setup, profundidade vs complicação, exceção vs regra) → Seções 2-3
- Identidade e diferenciação de personagens → Seção 7
- Design de inimigos → Seção 9
- Balanceamento macro (TTK, métricas, assimetria) → Seção 8
- Legibilidade e clareza → Seções 2.2, 3.4

---

## 1. Diretrizes para Criação de Skills

### 1.1 Como uma Skill Deve Nascer

#### 1.1.1 Começar pela Função, Não pela Tag

A ordem correta de decisão ao criar uma skill é:

1. **Definir o papel** — O que a skill faz no kit? Qual problema resolve?
2. **Definir o efeito** — Como se manifesta mecanicamente?
3. **Escolher a ferramenta técnica** — Tags do Battle Core, ATB e TP System

**Ferramenta implementa intenção, não substitui design.** (GUIA FERRAMENTAS, Seção 3.1)

#### 1.1.2 Perguntas Obrigatórias Antes de Criar a Skill

Antes de implementar qualquer skill, responda:

1. **Qual problema essa skill resolve?** — Situação específica do combate
2. **Qual decisão ela cria?** — O jogador deve pensar antes de usar
3. **O que ela adiciona ao kit?** — Função que não existe ainda
4. **Ela reforça ou dilui a identidade do personagem?** — Deve ser reconhecível como parte do kit
5. **Por que essa skill existe e outra não poderia cumprir esse papel?** — Justificativa de existência

#### 1.1.3 Qual é o Tipo da Skill

Toda skill se encaixa em um destes tipos:

| Tipo | Função no Kit | Frequência Esperada |
|------|---------------|---------------------|
| **Básica** | Gerar recurso + manter loop | Toda rodada |
| **Spender** | Converter recurso em impacto | 2-3x por combate |
| **Finisher** | Virar o rumo do combate | 0-1x por combate |
| **Setup** | Habilitar poder futuro (individual ou time) | 1-2x por combate |
| **Reativa** | Responder ao inimigo / converter adversidade | Situacional |
| **Utilitária/Suporte** | Curar, buffar, limpar debuffs | Conforme necessidade |
| **Skill de conversão** | Transformar recurso de um tipo em outro | Específico do kit |

---

### 1.2 Função Tática das Skills

#### 1.2.1 Skills de Dano Consistente

**Função:** Manter o loop de recurso funcionando. Dano consistente não é fim em si — existe para que o ciclo de geração → acúmulo → gasto → recuperação nunca estagne.

**Quando são valiosas:**
- Entre janelas de burst (mantêm pressão)
- Quando TP está baixo e spenders não estão disponíveis
- Como fallback seguro em situações de recuperação

**Por que não devem dominar tudo:**
- Se consistência resolve tudo, burst perde propósito
- Se geradores são mais eficientes que spenders, o loop quebra

**Varia por arquétipo:**
- **Duelista (Filena):** Consistência via geradores rápidos com speed positivo
- **Guardião (Kilin):** Consistência via proteção e tanking sustentado
- **Bruiser (Mhordred):** Consistência via combate agressivo (take/deal damage)
- **Sniper (Thorin):** Consistência via disciplina e regeneração lenta

#### 1.2.2 Skills de Burst

**Função:** Punir vulnerabilidade do inimigo. Burst é a consequência de identificar uma janela de oportunidade e converter recurso em dano concentrado.

**Timing:** O burst deve ser usado quando o inimigo está exposto — HP baixo, marca ativa, debuff aplicado, ou em janela de vulnerabilidade mecânica.

**Risco:** Burst gasta recurso acumulado. Se o alvo morre antes do hit ou o burst falha, o investimento é perdido.

**Relação com setup:** Burst sem setup é gasto ineficiente. Burst com setup (marca + buff + stacks) é payoff máximo.

#### 1.2.3 Skills de Finisher

**Função:** Virar o rumo do combate. O finisher não é apenas "skill com número maior" — é o momento onde o investimento de toda a luta converge em uma ação decisiva.

**O que caracteriza um finisher:**
- Custo massivo de TP (-50 a -60 TP, ou barra cheia)
- Cast time longo (telegraph claro: -1500 a -2000 speed)
- After gauge negativo (janela de vulnerabilidade pós-uso)
- Efeito de alto impacto (dano devastador, proteção total, ou buff massivo)

**Quando usar:**
- Clímax do combate (70-95% da luta)
- Inimigo em estado vulnerável (HP baixo, marcado)
- Quando o payoff justifica o risco de commit total

**Como evitar que vire "skill com número maior":**
- Deve ter custo/risco em pelo menos 2 dos 3 eixos (Efeito, Tempo, Recurso)
- Deve ter efeito além de dano (Unblockable, life steal, buff de time)
- Deve criar janela de vulnerabilidade após uso (after gauge negativo)

**Exemplos:**
- Execução (Mhordred): -50 TP, -2000 speed, 50% pen, Unblockable, 20% life steal
- Estouro de Momentum (Filena): -60 TP, burst massivo
- Muralha Contra Impacto (Kilin): -50 TP, proteção de time com sacrifício pessoal

#### 1.2.4 Skills de Setup

**Função:** Habilitar poder futuro. O setup pode ser **individual** (habilita poder do próprio kit) ou **de time** (investimento em payoff futuro para outro personagem).

**Tipos de setup:**

| Tipo | Exemplo | Payoff |
|------|---------|--------|
| **Buffs** | Chamado do Mentor (Kilin, State 134) | Aliados ganham bônus de ATB/dano |
| **Marcas** | Marca do Guardião (Thorin, State 140) | Habilita dano/efeito extra em skills que consomem |
| **Vulnerabilidades** | Debuff de DEF no alvo | Amplifica dano de spenders |
| **Preparação de crítico** | Skill que aumenta taxa crítica | Habilita burst via crítico |
| **Preparação de execute** | Marca de HP baixo | Habilita finisher condicional |
| **Preparação de turno futuro** | Buff de speed/ATB | Próximo turno é mais rápido |

**Setup individual vs setup de time:**
- **Individual:** Habilita poder do próprio kit. Exemplo: Thorin marca o alvo → Thorin consome com Tiro Preciso
- **De time:** Investimento em payoff futuro que exige coordenação de 2+ membros. Exemplo: Filena marca → Thorin executa. O custo de setup de time é sacrifício de recursos pessoais.

#### 1.2.5 Skills Reativas

**Função:** Responder ao inimigo e/ou converter adversidade em vantagem.

**Tipos de reatividade:**

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| **Punição de ação inimiga** | Responde diretamente ao que o inimigo fez | Quebra de Camuflagem (Thorin) — responde a inimigo em stealth |
| **Conversão de adversidade** | Transforma situação adversa em vantagem | Mhordred com HP baixo causa mais dano |
| **Proteção reativa** | Responde a ameaça para proteger o time | Kilin toma dano no lugar de aliado |
| **Contra-ataque** | Responde a ataque que falhou | Filena contra-ataca inimigo que deu miss |
| **Interrupção** | Interrompe cast inimigo | Skills com `<ATB Interrupt>` |

**Princípio:** Reatividade no nosso sistema é "responder ao inimigo". A skill reativa ganha poder quando algo específico acontece no combate.

#### 1.2.6 Skills Utilitárias/Suporte

**Função:** Suporte direto ao time — curar conditions (sangramento), curar HP, aplicar buffs para party, limpeza de debuffs.

**Diferença de reativas:** Reativas ativam SE alguma coisa acontece (gatilho automático). Utilitárias podem ser usadas QUANDO alguma coisa acontece (decisão do jogador).

**Podem estar em qualquer tier:**
- Tier 1-2: Cura leve, buff simples
- Tier 3: Cura significativa, buff de time
- Tier 4 (Ultimate): Proteção total da party (Muralha de Kilin), buff massivo

**Trade-off:** Skills de suporte sacrificam poder ofensivo por utilidade de time. O custo de oportunidade é claro: gastar TP em suporte significa não gastar em dano.

---

### 1.3 Hierarquia de Poder entre Skills

#### 1.3.1 O que Separa Básica, Spender e Finisher

| Dimensão | Básica (Tier 0-1) | Spender (Tier 2-3) | Finisher (Tier 4) |
|----------|-------------------|--------------------|--------------------|
| **Impacto** | Baixo | Moderado a alto | Devastador |
| **Custo** | Gera TP (+5 a +12) | Consome TP (-18 a -50) | Consome tudo (-50 a -60+) |
| **Frequência** | Toda rodada | 2-3x por combate | 0-1x por combate |
| **Exigência** | Nenhuma | Buildup prévio | Setup + buildup total |
| **Risco** | Nenhum | Moderado | Alto (vulnerabilidade pós-uso) |

#### 1.3.2 Sistema de Score para Balanceamento

Toda skill começa com **score 0**. O designer cataloga todos os modificadores possíveis distribuídos nos 3 eixos do combate — **Efeito (Battle Core)**, **Tempo (ATB)** e **Recurso (TP System)** — e atribui um valor de ponto a cada um.

> **Documento de referência:** As tabelas completas de pontuação numérica de cada modificador (por faixa de valor), a fórmula de score com pesos por eixo, regras de sinergia e o checklist de validação estão em `CLASSIFICACAO-MODIFICADORES.md`. As listas abaixo são resumo qualitativo.

**Modificadores positivos (+):**
- Multiplicador alto de dano
- Armor penetration
- Unblockable
- Crítico garantido
- Life steal
- AoE / multi-hit
- CC (crowd control)
- Taxa de crítico elevada
- Interrupção

**Modificadores negativos (-):**
- Cast time longo (speed negativo)
- Custo TP elevado
- After gauge negativo
- Armor Reduction (sacrifício próprio)
- Interruptível
- Condição de uso restritiva
- Escopo limitado (single target vs AoE)
- Debuff ao usuário

**Tiers por Score** (tabela completa com faixas de valores em `CLASSIFICACAO-MODIFICADORES.md`, Seção 3.3):

| Score | Tier | Papel |
|-------|------|-------|
| 1-50 | Tier 1 | Geradores, spenders leves |
| 51-100 | Tier 2 | Spenders médios, setup |
| 101-150 | Tier 3 | Spenders pesados, finishers |
| 151-200 | Tier 4 | Ultimates |

**Nomenclatura:** Skills de tier superior que são evolução direta de uma skill de tier anterior mantêm o nome base com sufixo romano: Consumo de Foco I (Tier 1) → Consumo de Foco II (Tier 2) → Consumo de Foco III (Tier 3).

#### 1.3.3 O que Não Pode Acontecer

- **Básica melhor que spender:** Se a skill básica tem mais payoff que o spender, o spender é inútil
- **Spender mais eficiente que finisher em todo contexto:** O finisher precisa de janela/situação onde é superior
- **Finisher sem janela ou contrapartida:** Todo finisher precisa de risco em pelo menos 1 eixo
- **Setup sem recompensa real:** Se o setup não habilita payoff visível, é desperdício de turno

---

### 1.4 Diretrizes de Custo, Tempo e Frequência

#### 1.4.1 Custo da Skill

O custo de TP é **uma ferramenta de balanceamento entre várias** — assim como speed, escopo de alvos, CC, taxa de crítico e interrupção. O poder (dano) também é apenas uma ferramenta. Todas essas ferramentas podem ser contrabalanceadas entre si.

**Princípios:**
- Custo deve refletir impacto real da skill no combate
- Custo alto sem payoff é punição vazia (skill nunca é usada)
- Custo baixo em skill dominante quebra rotação (spam inevitável)

#### 1.4.2 Frequência Esperada de Uso

A frequência **emerge do equilíbrio custo/geração**. Não há alvo fixo por skill — se o custo, a geração e o impacto estão equilibrados, a frequência natural emerge.

**Métricas de referência (FUNDAMENTOS 8.1):**
- Resource Fullness: Filena/Mhordred 2-3x por combate, Kilin 1-2x, Thorin 1x + preserve
- Skill Usage Variety: >60% do kit usado em combate típico (6+ skills diferentes)

#### 1.4.3 Tempo de Execução

Speed/cast time representa **vulnerabilidade + moeda de troca** nos 3 eixos.

**Skills lentas (speed negativo):**
- Criam janela de vulnerabilidade (telegraph visível)
- A vulnerabilidade pode ser trocada por poder, custo reduzido, ou utilidade
- Quanto mais negativo o speed, maior o telegraph e o risco

**Skills rápidas (speed positivo ou zero):**
- São seguras (sem janela de vulnerabilidade)
- Devem ser balanceadas com dano baixo, custo alto, ou possível debuff ao usuário
- Speed positivo não é "grátis" — o orçamento de poder é gasto em velocidade

| Tipo de Execução | Speed | Característica |
|------------------|-------|----------------|
| Instantânea | ≥ 0 | Sem janela de vulnerabilidade |
| Cast leve | -250 a -500 | Telegraph curto, risco moderado |
| Cast médio | -750 a -1000 | Telegraph visível, risco significativo |
| Cast longo | -1250 a -2000 | Telegraph claro, risco massivo |
| Interruptível | Qualquer speed < 0 | Pode ser cancelada por `<ATB Interrupt>` |
| Commit alto | Speed < 0 + After Gauge < 0 | Vulnerável durante E após uso |

#### 1.4.4 Relação entre Frequência e Poder

- Quanto mais frequente, mais estável (payoff previsível, baixo risco)
- Quanto menos frequente, maior pode ser o payoff (payoff alto, alto risco)
- **O problema não é a força isolada — é a força repetível**

---

### 1.5 Diretrizes de Risco e Recompensa

#### 1.5.1 Tipos de Risco

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| Custo alto | Investimento massivo de TP | Execução (-50 TP) |
| Cast time | Janela de vulnerabilidade durante cast | Execução (-2000 speed) |
| Vulnerabilidade | After gauge negativo, DEF reduzida | Postura Brutal (-30% DEF) |
| Condição de uso | Requer setup prévio | Tiro Preciso (requer marca + buff + foco) |
| Dependência de setup | Precisa de ações de outros | Thorin precisa de marca do time |
| Janela curta | Timing restrito para uso | Punir janela de vulnerabilidade do boss |
| Pouca flexibilidade | Skill é boa em 1 situação, ruim em outras | Disparo Arriscado (panic button) |

#### 1.5.2 Tipos de Recompensa

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| Dano alto | Payoff numérico massivo | Execução (3.5x multiplicador) |
| Sustain | Recuperação de HP | Execução (20% life steal) |
| Controle | CC, stun, interrupt | Quebra de Camuflagem |
| Execução garantida | Unblockable, Always Critical | Execução (Unblockable + condicional crit) |
| Aceleração de vantagem | Buff de speed/ATB para time | Muralha (+30% speed time) |
| Reset de pressão | Remover debuffs, curar, recuperar | Skills de suporte |

#### 1.5.3 Regra de Ouro

**Toda skill começa com score 0.** Modificadores positivos e negativos nos 3 eixos (Efeito, Tempo, Recurso) determinam o tier final (ver `CLASSIFICACAO-MODIFICADORES.md` para a fórmula completa e pontuação de cada modificador).

- Nenhuma skill deve ser forte demais, rápida demais, barata demais e segura demais ao mesmo tempo
- Pelo menos 1 dos 3 eixos deve ter custo quando a skill é poderosa
- O score final deve estar dentro da banda do tier pretendido (ver Seção 1.3.2 e `CLASSIFICACAO-MODIFICADORES.md`, Seção 7)

---

## 2. Diretrizes para Design de Kits de Personagem

### 2.1 O que é um Kit Saudável

*(Derivado de FUNDAMENTOS Seção 7.1 — 5 Camadas de Identidade)*

Um kit saudável possui:
- **Núcleo claro:** Fantasy central que orienta todas as decisões de design
- **Papéis distinguíveis:** Funções mecânicas distintas (não faz "tudo um pouco")
- **Curva de poder coerente:** Progressão de tier lógica (geradores → spenders → finisher)
- **Cria decisões:** Jogador escolhe entre opções significativas a cada turno
- **Não resolve tudo sozinho:** Tem fraquezas que o time cobre

#### 2.1.1 O Kit Precisa Ter um Centro

*(Derivado de FUNDAMENTOS Seção 7.1 — Camada 1: Fantasia Central)*

Perguntas obrigatórias ao desenhar um kit:
1. **Qual a fantasy do personagem?** (conceito narrativo → gameplay)
2. **Qual sua principal forma de criar valor?** (como contribui para o time)
3. **Onde está sua recompensa?** (quais ações geram payoff)
4. **Onde está sua limitação?** (quais situações são difíceis)

#### 2.1.2 O Kit Precisa Ter um Loop Identificável

*(Derivado de FUNDAMENTOS Seção 4.1 — Loop Central de Combate)*

Todo kit deve ter sequência identificável:
1. **Como ele entra em combate** (abertura)
2. **Como ele constrói vantagem** (buildup)
3. **Como ele converte vantagem** (payoff)
4. **Como ele se recupera depois do pico** (recuperação)

---

### 2.2 Distribuição Interna de Poder no Kit

#### 2.2.1 Onde Colocar Consistência

**Geradores e spenders leves (Tier 0-1)** fornecem a base estável do kit.

A consistência **varia por arquétipo:**
- **Duelista:** Geradores rápidos com speed positivo (Passo de Brisa)
- **Guardião:** Proteção sustentada e tanking (Levantar Guarda)
- **Bruiser:** Combate agressivo como gerador (Golpe Brutal + Fúria)
- **Sniper:** Disciplina e regeneração lenta (Tiro de Aquecimento + Foco)

#### 2.2.2 Onde Colocar Burst

**Spenders médios e pesados (Tier 2-3)** são a capacidade de burst do kit.

Burst é a conversão de recurso acumulado em janela de impacto:
- Tier 2: Spenders médios (-18 a -30 TP), dano forte, speed -500/-750
- Tier 3: Spenders pesados (-35 a -50 TP), dano muito forte, speed -1000/-1250

#### 2.2.3 Onde Colocar Setup

**Skills de tier baixo com payoff futuro.**

Setup individual (habilita poder próprio) e setup de time (investimento para payoff de outro) ambos ficam em tier baixo, onde o custo é acessível e o trade-off é claro.

#### 2.2.4 Onde Colocar Utilidade

**Pode estar em todos os tiers, inclusive ultimate.**

Skills de suporte não são restritas a tier baixo. O custo e impacto determinam o tier:
- Tier 1-2: Cura leve, buff simples
- Tier 3: Cura significativa, buff de time
- Tier 4 (Ultimate): Proteção total (Muralha de Kilin), buff massivo

#### 2.2.5 Onde Colocar Assinatura do Personagem

A assinatura **não é uma skill isolada** — é o **TP Mode + ecossistema do kit**.

A assinatura real está em como o personagem joga (loop de gameplay), não em uma skill específica. O TP Mode define o ritmo, a geração de recurso e o estilo. O ecossistema de skills serve ao modo.

**Exemplos:**
- **Filena:** Momentum + mobilidade + burst windows = assinatura
- **Kilin:** Guarda + sacrifício pessoal + proteção = assinatura
- **Mhordred:** Fúria + risk/reward + agressão = assinatura
- **Thorin:** Foco + disciplina + precisão = assinatura

#### 2.2.6 O que Evitar

*(Derivado de FUNDAMENTOS Seção 7.3 — O que Descaracteriza um Kit)*

- **Assinatura espalhada demais:** Se o ecossistema não tem foco, o personagem é genérico
- **Força distribuída sem foco:** Todas as skills são "boas" mas nenhuma é memorável
- **Kit que só funciona quando tudo encaixa perfeitamente:** Se precisa de setup completo para ser útil, falha em situações normais
- **Todas as skills "boas", mas nenhuma memorável:** Kit sem climax, sem momento "uau"

---

### 2.3 Regras de Identidade Mecânica

*(Derivado de FUNDAMENTOS Seção 7 — Regras de Identidade Mecânica)*

#### 2.3.1 O que Define Identidade

Identidade mecânica é definida por (FUNDAMENTOS 7.1):

1. **Fantasia Central** — Conceito narrativo traduzido em gameplay
2. **Resource Unique** — TP Mode que ninguém mais tem
3. **Loop de Gameplay** — Sequência ótima de ações
4. **Assinatura de Skills** — Skills que só existem naquele kit
5. **Diferenciais Numéricos** — Valores únicos que reforçam identidade

#### 2.3.2 O que Não Define Identidade Sozinho

- Elemento/temática visual
- Animação da skill
- Nome da skill
- Alvo único vs área
- Classe temática sem reflexo mecânico

#### 2.3.3 Como Proteger a Identidade do Personagem

*(Derivado de FUNDAMENTOS Seção 7.3-7.4)*

- **Não dar todas as ferramentas para todos:** Cada personagem tem ferramentas exclusivas
- **Não importar mecânicas-chave de outro personagem sem critério:** Cross-over é permitido se mantém a "alma"
- **Não resolver fraqueza estrutural toda vez que ela incomoda:** Fraquezas definem identidade
- **Numbers são tuning, identity é structure:** Buffar/nerfar valores é seguro; adicionar/remover mecânicas é perigoso

---

### 2.4 Tipos de Personagens e suas Exigências de Design

**Abordagem:** Arquétipos narrativos (Duelista, Guardião, Bruiser, Sniper) combinados com funções mecânicas (Consistência, Burst, Setup, Sustain, Crítico, Híbrido).

#### 2.4.1 Personagem de Consistência

**Arquétipo:** Sniper (Thorin sem setup), Duelista (Filena parcialmente)

**Exigências de design:**
- Geradores fortes que mantêm pressão constante
- Custo moderado para manter ciclos longos
- Confiabilidade: não depende de grandes janelas
- **Não deve:** Superar finishers em dano, sustentar o time, tank

#### 2.4.2 Personagem de Burst

**Arquétipo:** Bruiser (Mhordred principal), Duelista (Filena burst windows)

**Exigências de design:**
- Finishers com custo massivo e payoff proporcional
- Dependência de setup (marca, buff, stacks)
- Janelas dramáticas de explosão de dano
- **Não deve:** Ter burst sempre disponível, sustentar sem custo, tank

#### 2.4.3 Personagem de Setup

**Arquétipo:** Duelista (Filena marca), Guardião (Kilin buffs)

**Exigências de design:**
- Skills que aplicam states para amplificar time
- Custo TP moderado para team utility
- Sem dano massivo mas habilita dano de outros
- **Não deve:** Sustentação forte, burst independente, tank

#### 2.4.4 Personagem de Sustain

**Arquétipo:** Bruiser (Mhordred life steal)

**Exigências de design:**
- Mecânicas de self-sustain limitadas (não healer full)
- Dependência de causar dano para se curar
- Trade-off: skill de sustain custa TP que poderia ser dano
- **Nota:** Daratrine NÃO tem healer dedicado. Sustentação é limitada e estratégica.

#### 2.4.5 Personagem de Crítico

**Arquétipo:** Sniper (Thorin — Foco aumenta crítico)

**Exigências de design:**
- Crítico como exceção de identidade, não regra geral
- +5% taxa crítica por stack de Foco (max +25%)
- Multiplicador de crítico diferenciado (4.0x vs 3.0x padrão)
- **Não deve:** Ter crítico como fonte principal de DPS sem setup

#### 2.4.6 Personagem Híbrido

**Arquétipo:** Bruiser (Mhordred — dano + tanking)

**Exigências de design:**
- O híbrido **alterna entre especialidades** — não é simultaneamente ambos
- Em um turno foca em dano, em outro absorve dano para gerar recurso
- A alternância é uma escolha tática do jogador

#### 2.4.7 Regras para Híbridos

1. **Híbrido alterna entre especialidades** — nunca é simultaneamente tank e DPS no mesmo turno
2. **Precisa ter prioridade clara** — Mhordred prioriza dano; tanking é consequência
3. **Precisa pagar pela flexibilidade** — HP baixo é risco, DEF reduzida é trade-off
4. **A alternância é decisão do jogador** — escolher quando tankar vs quando atacar

---

## 3. Diretrizes para Sinergia entre Personagens

### 3.1 O que é uma Boa Sinergia

**Princípio:** Sinergia poderosa mas **nunca obrigatória**.

Uma boa sinergia:
- Cria recompensa por coordenação (payoff visível quando time trabalha junto)
- Não apaga valor individual (cada personagem funciona sem sinergia)
- Aumenta profundidade sem criar dependência absoluta

#### 3.1.1 Sinergia Saudável

| Tipo | Exemplo |
|------|---------|
| Setup + payoff | Filena marca → Thorin executa |
| Marca + execução | State 140 → Tiro Preciso consome |
| Proteção + cast | Kilin protege → Mhordred casta seguro |
| Debuff + burst | Vulnerabilidade no alvo → spender pesado |
| Geração + conversão | Kilin toma dano → gera TP → protege aliado |

#### 3.1.2 Sinergia Doentia

| Tipo | Descrição |
|------|-----------|
| Dependência obrigatória | Personagem só funciona com outro específico |
| Combo dominante | Invalida variação de time |
| Payoff explosivo sem contrapartida | Recompensa desproporcional ao investimento |

**Teste prático:** Remover um personagem do time não deve tornar outro inutilizável. Se Thorin sem Filena/Kilin perde mais de 50% de eficácia, há dependência doentia.

---

### 3.2 Tipos de Sinergia

#### 3.2.1 Sinergia de Setup

**Definição:** Um personagem aplica marca/buff/debuff e outro consome em payoff direto.

**Características:**
- Setup + payoff direto: um prepara, outro executa
- Custo de oportunidade: quem faz setup sacrifica ação ofensiva
- Payoff visível: o jogador vê o resultado da coordenação

**Exemplo:** Filena aplica Marca (State 140) → Thorin consome com Tiro Preciso (bônus de dano + After Gauge)

#### 3.2.2 Sinergia de Tempo

**Definição:** Sincronização de ATB para combo encadeado.

**Características:**
- Personagens coordenam timing para ações em sequência rápida
- Ferramentas: `<ATB Charge Gauge>`, `<ATB After Gauge>`, Battle Start Gauge
- Payoff: combo encadeado que o inimigo não consegue responder

**Exemplo:** Filena usa Transferência de Ritmo (+50% ATB para aliado) → aliado age imediatamente em sequência

#### 3.2.3 Sinergia de Recurso

**Definição:** Cadeia de geração cooperativa — loop cooperativo de TP onde as ações de um personagem alimentam o poder de outro.

**Características:**
- Ações de um membro geram recurso que beneficia outro
- Cadeia de geração: Kilin toma dano → gera TP → protege aliado → aliado atacou seguro
- Não é transferência direta de TP, mas loop cooperativo

#### 3.2.4 Sinergia de Estado

**Definição:** States que amplificam o resultado de outros.

**Características:**
- States ativos simultaneamente criam payoff multiplicativo
- Marca + Buff + Stacks → resultado amplificado
- Exemplo: State 140 (Marca) + State 134 (Buff) → Thorin recebe ambos os benefícios

#### 3.2.5 Sinergia de Execução

**Definição:** Burst concentrado em janela compartilhada + cadeia de execução encadeada.

**Características:**
- Personagens combinam dano concentrado no mesmo alvo em janela curta
- A execução pode ser simultânea (burst compartilhado) ou encadeada (cadeia de ações)
- Exemplo: Filena marca → Thorin aplica debuff → Mhordred executa

#### 3.2.6 Sinergia Explícita vs Implícita

- **Explícita:** Um efeito cita ou alimenta outro diretamente (Marca 140 → Tiro Preciso)
- **Implícita:** Ritmos e funções se encaixam naturalmente (Kilin tank + Filena DPS)

---

### 3.3 Regras para Desenhar Sinergia

*(Derivado de FUNDAMENTOS Seções 3.2, 5.2, 5.4)*

1. **Sinergia deve ser poderosa, mas nunca obrigatória** — time deve funcionar sem ela
2. **Deve existir payoff visível** — jogador vê recompensa da coordenação
3. **Deve haver oportunidade de contrajogo** — inimigo pode interferir no setup
4. **Não deve tornar irrelevantes decisões individuais** — cada jogador ainda decide por si

---

## 4. Anti-Padrões + Critérios de Revisão

### 4.1 Anti-Padrões de Skill

| Anti-Padrão | Descrição | Detecção via Score System |
|-------------|-----------|---------------------------|
| Skill sem função clara | Não responde "que problema resolve?" | Score ok mas falha nas perguntas obrigatórias (1.1.2) |
| Skill redundante | Faz a mesma coisa que outra no kit | Score ok mas sobreposição de função |
| Skill sempre correta | Não há situação onde NÃO usar | Score baixo demais (muito positiva nos 3 eixos) |
| Skill forte demais para o custo | Payoff desproporcional ao investimento | Score acima da banda do tier pretendido |
| Skill que só funciona em teoria | Edge case que nunca acontece na prática | Score ok mas condição irrealista |
| Skill complexa sem payoff | Mecânica elaborada sem recompensa proporcional | Score ok mas complexidade sem decisão |

### 4.2 Anti-Padrões de Kit

**Detecção:** Ausência de TP Mode claro + loop identificável + identidade distinta.

| Anti-Padrão | Descrição |
|-------------|-----------|
| Kit sem centro | Sem fantasy clara, sem loop identificável |
| Kit completo demais | Faz tudo bem, sem fraquezas |
| Kit dependente de uma única skill | Se skill X é removida, kit colapsa |
| Kit com assinatura difusa | Poderia ser de qualquer personagem |
| Kit com excesso de exceções | Mais exceções que regras |

### 4.3 Anti-Padrões de Sinergia

**Detecção:** Remover um personagem do time torna outro inutilizável.

| Anti-Padrão | Descrição |
|-------------|-----------|
| Dependência obrigatória | Personagem A sem B perde >50% de eficácia |
| Combo dominante | Sinergia tão forte que invalida variação de time |
| Payoff explosivo sem contrapartida | Setup barato com payoff desproporcional |
| Sinergia escondida demais | Interação existe mas jogador não descobre |

### 4.4 Anti-Padrões de Inimigo

*(Derivado de FUNDAMENTOS Seção 9.3)*

| Anti-Padrão | Descrição |
|-------------|-----------|
| Boss esponja | Só tem HP, sem mecânicas interessantes |
| Elite injusto | Mata sem aviso, sem counterplay |
| Inimigo que anula ferramentas sem aviso | Imune a tipo de dano sem indicação |
| Combate que vira cheque numérico | Ganha por stats, não por estratégia |

### 4.5 Anti-Padrões de Balanceamento

**Detecção:** Mesma solução usada para 3+ problemas diferentes.

| Anti-Padrão | Descrição |
|-------------|-----------|
| Buffar dano como solução padrão | Toda skill fraca recebe mais dano em vez de função |
| Resolver tudo com custo menor | Reduzir TP cost é a única ferramenta usada |
| Resolver tudo com crit | Adicionar crítico para consertar dano baixo |
| Resolver tudo com sustain | Curar mais em vez de resolver causa real |
| Corrigir falta de identidade com mais mecânicas | Adicionar sistemas em vez de fortalecer o núcleo |

---

### 4.6 Checklist de Aprovação — Skill

Para toda skill nova, verificar:

- [ ] **Tem função?** — Responde "que problema resolve?"
- [ ] **Reforça identidade?** — É reconhecível como parte do kit
- [ ] **Cria decisão?** — Jogador pensa antes de usar
- [ ] **Tem custo coerente?** — Score dentro da banda do tier
- [ ] **Tem janela coerente?** — Timing/speed proporcional ao poder
- [ ] **Tem payoff coerente?** — Recompensa proporcional ao investimento
- [ ] **Score dentro do tier?** — Score final encaixa no tier pretendido (1.3.2). Checklist completo de validação em `CLASSIFICACAO-MODIFICADORES.md`, Seção 13

### 4.7 Checklist de Aprovação — Kit

- [ ] **Tem centro?** — Fantasy central clara
- [ ] **Tem loop?** — Sequência identificável de abertura/buildup/payoff/recuperação
- [ ] **Tem assinatura?** — TP Mode + ecossistema únicos
- [ ] **Tem fraqueza?** — Situações onde o personagem struggle
- [ ] **Tem espaço de mastery?** — Fácil de aprender, difícil de dominar

### 4.8 Checklist de Aprovação — Inimigo

*(Derivado de FUNDAMENTOS Seção 9)*

- [ ] **Ensina ou testa algo útil?** — Valida aspecto do combat system
- [ ] **Tem contrajogo?** — Todo ataque perigoso tem counter
- [ ] **Tem leitura?** — Telegraphs claros, patterns aprendíveis
- [ ] **Não invalida arbitrariamente o jogador?** — Não one-shot sem aviso, não exige comp específica

### 4.9 Sinais de Retrabalho Necessário

| Sinal | Descrição |
|-------|-----------|
| Sobreposição de função | Skills fazem a mesma coisa no kit |
| Quebra de identidade | Skill contradiz a fantasy do personagem |
| Excesso de poder | Score fora da banda do tier |
| Falta de payoff | Setup/risco sem recompensa proporcional |
| Complexidade desnecessária | Mecânica que não cria decisão |
| Baixa legibilidade | Efeito não é compreensível pelo jogador |
| Mesma solução repetida | Balanceamento usa a mesma ferramenta para tudo |

---

**Fim do Documento de Diretrizes de Design do Combat System**

[[CLASSIFICACAO-MODIFICADORES#3. Modelo de Score|Modelo de score de modificadores]]
[[FUNDAMENTOS-COMBAT-SYSTEM|Fundamentos do sistema de combate]]
