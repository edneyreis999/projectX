# Fundamentos do Combat System de Daratrine A Origem

**Versão:** 1.0
**Data:** 2026-04-09
**Escopo:** Documento orientador de design para decisões de combate presente e futuras
**Tokens**: Esse documento consome 11,585 tokens para ser lido completamente.

---

## Introdução

Este documento consolida os princípios fundamentais do sistema de combate de Daratrine - A Origem, derivados de decisões tomadas durante o desenvolvimento das skills dos 4 personagens jogáveis (Filena, Kilin, Mhordred, Thorin). O combate foi projetado como um sistema de decisões táticas sobreposto à mecânica ATB do RPG Maker MZ, onde identidade de personagem, gestão de recursos e coordenação de time convergem.

O sistema defende que **combate é diálogo**: cada ação dos personagens deve enviar uma mensagem clara ao jogador, receber resposta do inimigo, e criar cadeias de causa-efeito legíveis. A profundidade vem da interação entre sistemas previsíveis, não de complexidade arbitrária.

Este não é um manifesto abstrato. É um direcionador técnico para que decisões futuras — novas skills, novos inimigos, novos sistemas — mantenham coerência com o que já foi estabelecido.

---

## 1. Objetivo do Combat System

### 1.1 Função no Jogo

O combate existe para traduzir a narrativa de **crescimento e cooperação** em mecânicas interativas. Cada luta deve ser um episódio onde:

- O jogador pratica **domínio** dos kits dos personagens
- A equipe coordena ações para superar desafios que indivíduos sozinhos não venceriam
- Erros criam consequências recuperáveis, não morte instantânea
- Execução correta cria sensação de **fluidez e potência**

### 1.2 Sensação Desejada

O combate deve sentir-se como **orquestração tática**: o jogador conduz quatro instrumentos que têm vozes distintas, ritmos próprios, e juntos criam harmonia. A sensação é de:

- **Controle**: O jogador entende por que ganhou ou perdeu
- **Progressão**: Vitórias vêm de melhoria de execução, não descoberta arbitrária
- **Emergência**: Momentos dramáticos surgem de tensões planejadas (HP baixo de Mhordred, setup de Thorin)
- **Recompensa**: Timing correto gera payoff visível e satisfatório

### 1.3 O Que Precisa Entregar

- **Clareza de feedback**: Cada ação comunica seu resultado imediatamente
- **Identidade nítida**: Cada personagem se sente único em todos os níveis de habilidade
- **Decisões significativas**: Escolha de skills importa tanto quanto timing
- **Curva de domínio**: Fácil de aprender, difícil de dominar (facilidade de entrada, profundidade de otimização)

### 1.4 O Que Não Deve Ser

- **Não é puzzle de solução única**: Não existe "skill certa" para cada situação
- **Não é RNG dependency**: Random existe, mas não dita vitórias/derrotas
- **Não é spam de teclas**: Macro otimizações não substituem tomada de decisão
- **Não é complicação por complicação**: Sistemas existem para criar depth, não barreira

---

## 2. Filosofia de Design do Combate

### 2.1 Consistência

**Princípio:** O jogador deve poder prever o resultado de suas ações antes de executá-las.

- Mesma skill na mesma situação → mesmo resultado (dentro de variância controlada)
- Fórmulas de dano seguem lógica MOBA: `formula × ATK × (100 / (100 + DEF))` → sempre calculável
- Cast times são fixos → o jogador sabe exatamente quando o personagem agirá
- TP generation segue regras claras → o jogador planeja buildup

**O que isso impede:** Skills que se comportam de forma imprevisível, danos que variam excessivamente, "surpresas" mecânicas que o jogador não poderia antecipar.

### 2.2 Legibilidade

**Princípio:** Estado do combate deve ser perceptível em um glance.

- HP bars claramente visíveis
- TP gauges com valores customizados (MOMENTUM, GUARDA, FÚRIA, FOCO)
- Buffs/debuffs com ícones e durações claras
- Estados de setup (Marca 140, Buff 134) evidentes na UI

**O que isso impede:** Estados ocultos, modificações de fórmula que não ficam visíveis, interações não-explicadas entre skills.

### 2.3 Previsibilidade com Espaço para Drama

**Princípio:** O que o jogador planeja deve funcionar; momentos dramáticos vêm de execução sob pressão, não de aleatoriedade.

- Fórmulas são determinísticas → mesmo resultado dado mesmos inputs
- Variação existe (damage variance, critical hits) mas dentro de bandas previsíveis
- "Wow moments" vêm de setups corretos, não sorte (ex.: Thorin com 5 Foco + Marca + Buff)
- Emergência vem de tensão planejada (Mhordred morrendo fica mais rápido), não evento aleatório

**O que isso impede:** Skills que "podem ou não funcionar" sem razão clara, efeitos aleatórios que mudam outcome de luta, mecânicas de RNG que não o jogador pode gerenciar.

### 2.4 Recompensa por Setup e Execução

**Princípio:** Poder vem de coordenação, não de spam ou exploit.

- Sinergias de time exigem múltiplas ações (Filena marca → Thorin executa)
- Spender skills só podem ser spamadas após buildup de geradores
- Finishers têm cast times longos → jogador arrisca tempo de setup
- Execução correta de loops (build → spend → repeat) gera payoff previsível

**O que isso impede:** Skills que são "melhores que todas" sem setup, rotas infinitas de dano, spam sem custo significativo.

### 2.5 Profundidade versus Complicação

**Princípio:** Adicionar complexidade só quando cria decisões interessantes.

- 4 TP Modes diferentes → cada personagem tem playstyle único
- 84 skills totais → cada skill tem propósito claro no kit
- States de sinergia (140, 134, etc.) → interações planejadas entre personagens
- Fórmulas MOBA com Armor Pen → sistema unificado de dano

**O que isso impede:** Adicionar "mais um recurso" sem propósito claro, skills que existem "só para existir", mecânicas que não conectam com o resto do sistema.

### 2.6 Exceção versus Regra

**Princípio:** O especial deve ser especial porque o regra é clara.

- **Regra:** Skills não têm crítico → **Exceção:** Skills assinatura específicas
- **Regra:** Dano segue fórmula padrão → **Exceção:** Finishers com Unblockable
- **Regra:** Cada personagem tem seu TP → **Exceção:** Transferência de Ritmo (Filena → Thorin)
- **Regra:** Cast times negativos atrasam → **Exceção:** Sinergias que transformam cast em bônus (Thorin Tiro Preciso)

**O que isso impede:** Tudo ser exceção (caos), nada ser exceção (monotonia), exceções que não se conectam com regras estabelecidas.

---

## 3. Pilares do Sistema de Combate de Daratrine

### 3.1 Identidade Forte por Personagem

**O que defende:** Cada um dos 4 personagens deve ser imediatamente reconhecível pelo gameplay, independentes de gear, nível, ou situação.

| Personagem | Identidade Central | Mecânica Definidora |
|------------|-------------------|---------------------|
| **Filena** | Duelista Ágil | Momentum com Evasion, mobile, burst windows |
| **Kilin** | Guardião Mentor | Guarda (50 TP), tank tomando dano, proteção de aliados |
| **Mhordred** | Brutamontes Sanguinário | Fúria (TCR 1.5), take/deal damage gera, risco ao morrer |
| **Thorin** | Atirador Disciplinado | Foco (Preserve ON), precisão, setup-dependente |

**Por que é importante:** Sem identidade nítida, personagens são intercambiáveis → o jogador não cria preferência, não forma conexão emocional, e o time perde personalidade.

**Como afeta decisões de design:**
- Novas skills devem reforçar a identidade, não diluir
- Cross-over mecânico entre personagens é permitido, mas cada um deve manter "alma" única
- Balanceamento preserva diferenças, não nivela todos ao mesmo padrão médio

**O que impede:** Personagens que fazem "tudo um pouco", skills que existem em todos os kits sem diferenciação, tendência de homogeneização por facilidade de balanceamento.

### 3.2 Decisão Antes de Execução

**O que defende:** A profundidade tática vem de planejamento, não de reflexos. O jogador deve decidir o que fazer antes de pressionar o botão.

- **Geradores vs Spenders:** Decisão macro → buildup ou gastar?
- **Qual spender usar:** -20 TP agora ou guardar para -60 TP?
- **Setup de time:** Filena marca agora ou guardar Momentum?
- **Posicionamento:** Dash para vantagem ou manter para cast?

**Por que é importante:** Isso transforma combate de "reflexo" em "estratégia". O jogador pensa,-planeja, executa, avalia. Habilidades de planejamento são recompensadas igual ou mais que reflexos.

**Como afeta decisões de design:**
- Cast times (speed negativo) existem para criar janelas de decisão
- TP costs devem tornar cada gasto significativo
- Informação deve estar disponível antes de escolher (UI clara, states visíveis)

**O que impede:** Skills instantâneas sem trade-off, spam sem custo, rotinas fixed que eliminam escolha.

### 3.3 Poder com Contrapartida

**O que defende:** Toda ação poderosa tem custo. Não existe "almoço grátis".

| Tipo de Poder | Contrapartida |
|---------------|---------------|
| **Finisher (-60 TP)** | Buildup massivo necessário |
| **Burst damage** | Cast time longo (telegraph) |
| **Unblockable** | Custo TP alto ou setup específico |
| **Critical boost** | Restrito a skills assinatura |
| **Team utility** | Sacrifica recursos pessoais |
| **Fúria (TCR 1.5)** | Preserve OFF (rebuild constante) |
| **Foco Preserve ON** | Sem burst generation, regeneração lenta |

**Por que é importante:** Cria equilíbrio natural. Se algo é poderoso, jogador assume risco/custo para usar. Se algo é seguro, payoff é moderado. Isso permite coexistência de skills fracas/fortes no mesmo kit sem obsolescência.

**Como afeta decisões de design:**
- Ao criar skill nova, perguntar: "qual é o custo?" (cast, TP, setup, risco)
- Ao buffar skill, considerar qual contrapartida deve aumentar
- Ao nerfar skill, verificar se contrapartida já justifica poder

**O que impede:** Skills que são "melhores em tudo" (muito dano + instantâneo + sem custo + sem risco), tendência de power creep sem trade-offs correspondentes.

### 3.4 Clareza para o Jogador

**O que defende:** O sistema nunca deve esconder informação que o jogador precisa para tomar decisões informadas.

- **Dano calculável:** Fórmula MOBA permite jogador estimar resultado
- **TP costs visíveis:** Jogador sabe exatamente quanto cada skill custa
- **Cast times explícitos:** Jogador sabe quando personagem agirá
- **States identificados:** Buffs/debuffs têm nomes, ícones, durações
- **Sinergias documentadas:** States 140/134/etc. têm efeitos descritos

**Por que é importante:** Reduz frustração de "eu não sabia que isso fazia isso". Aumenta senso de controle. Permite jogador planejar com confiança.

**Como afeta decisões de design:**
- Skills nunca devem ter efeitos "escondidos" (sem feedback visual/UI)
- Interações complexas entre skills devem ser comunicadas (descrição, tooltip)
- Valores numéricos são preferíveis a descritores vagos ("muito dano" vs "3.5x ATK")

**O que impede:** Skills com efeitos misteriosos, interações não-documentadas, systems que o jogador só entende após trial-and-error exaustivo.

---

## 4. Estrutura Macro do Sistema

### 4.1 Loop Central de Combate

O combate de Daratrine segue um loop universal aplicado a todos os personagens:

```
GERAÇÃO → ACÚMULO → GASTO → RECUPERAÇÃO → REPETIÇÃO
   ↓         ↓        ↓         ↓
 TP+     TP Cheio  TP-     Regeneração/
Stats   Ativo     Spender  Novo ciclo
```

**Cada personagem interpreta este loop à sua maneira:**

| Fase | Filena (Momentum) | Kilin (Guarda) | Mhordred (Fúria) | Thorin (Foco) |
|------|-------------------|----------------|-----------------|---------------|
| **Geração** | Evasion (+12 TP), Geradores (+6/+10/+12 TP) | Tomar dano (value/20), Proteger (+12 TP) | Take/Deal damage, Critical Hit (+8 TP) | Critical Hit (+10 TP), Geradores (+5/+8/+10 TP) |
| **Acúmulo** | TCR 1.2 (rápido), Preserve ON | MaxTP 50 (menor), Preserve OFF | TCR 1.5 (muito rápido), Preserve OFF | TP Regen +2, Preserve ON |
| **Gasto** | -20/-60 TP (burst windows) | -15/-50 TP (sacrifício) | -25/-60 TP (burst explosivo) | -25/-50 TP (execução) |
| **Recuperação** | Evasion multi-trigger, Enemy Death +8 TP | TP Regen +3, Ally Death +20 TP | Combatendo (take/deal), Enemy Death +15 TP | Regen lento, Preserve ON |

**Por que esta estrutura importa:** Cria ritmo previsível. Jogador aprende o "samba" de cada personagem. Há momento de buildup (tensão crescente) e momento de payoff (explosão controlada).

### 4.2 Ritmo e Cadência das Lutas

Combates seguem uma curva de tensão planejada:

```
ABERTURA (0-15%):
  → Geradores iniciais, setup de buffs, posicionamento
  → Velocidade: Moderada (testando o inimigo)

DESENVOLVIMENTO (15-70%):
  → Loop principal build-spend
  → Velocidade: Acelerando (mais spenders, mais sinergias)
  → Decisões: Gastar agora ou guardar para clímax?

CLÍMAX (70-95%):
  → Finishers, ultimates, sacrifícios
  → Velocidade: Máxima (tudo ou nada)

RESOLUÇÃO (95-100%):
  → Últimos spenders, limpeza
  → Velocidade: Desacelerando para encerrar
```

**Como isso se manifesta em cada personagem:**

| Personagem | Abertura | Clímax | Característica |
|------------|----------|--------|----------------|
| **Filena** | Passo de Brisa/Golpe Cadenciado (speed positivo) | Estouro de Momentum (-60 TP) OU Transferência | Build rápido, payoff explosivo |
| **Kilin** | Levantar Guarda/Proteger Aliado | Muralha Contra Impacto (-50 TP, +30% time) | Abertura defensiva, clímax de sacrifício |
| **Mhordred** | Golpe Brutal (mais rápido se ferido) | Execução (-50 TP) OU Grito de Guerra (-60 TP) | Começa fraco, termina explosivo |
| **Thorin** | Tiro de Aquecimento/Rajada Controlada | Tiro Preciso (setup completo) | Setup lento, execução devastadora |

### 4.3 Papel dos Recursos

**TP como Ferramenta de Decisão, não Limite Arbitrário**

TP não é apenas "mana para usar skills". É o principal sistema de decisão do combate:

- **Filena (Momentum):** TP é ritmo — quanto mais Momentum, mais forte/faster
- **Kilin (Guarda):** TP é sacrifício — Guarda existe para proteger, não para gastar em si mesmo
- **Mhordred (Fúria):** TP é volatilidade — enche rápido, gasta rápido, deve ser gerado constantemente
- **Thorin (Foco):** TP é investimento — Preserve ON permite planejar dungeons inteiras com Foco acumulado

**Implicações de design:**
- TP costs devem criar decisões (agora ou depois?)
- TP generation deve reforçar identidade (Evasion para Filena, Take Damage para Kilin)
- MaxTP varia (50 para Kilin) → densidade de recurso importa
- Preserve ON/OFF → estratégia de curto vs longo prazo

### 4.4 Janela de Burst e Janela de Setup

**Burst Window:** Momento onde personagem causa dano máximo em tempo curto

- **Filena:** 2-3 spenders em rápida sucessão (estocada + dança + estouro)
- **Mhordred:** Postura Brutal + Extravasar/Consumo III (crescimento brutal)
- **Thorin:** Tiro Preciso com setup completo (marca + buff + 5 Foco)

**Setup Window:** Momento de preparação antes de burst

- **Filena:** Geradores + Evasion (construir Momentum rápido)
- **Kilin:** Levantar Guarda + tomar dano (encher Guarda lentamente)
- **Mhordred:** Combater (take/deal damage) para encher Fúria
- **Thorin:** Geradores + regeneração lenta (construir Foco com disciplina)

**Trade-off fundamental:** Investir tempo em setup → burst mais devastador. Sem setup → dano consistente mas sem explosão. Jogador decide em cada situação.

---

## 5. Taxonomia das Decisões do Jogador

### 5.1 Decisões de Curto Prazo (Dentro do Turno Atual)

Decisões tomadas em escala de segundos, reativas ao estado atual do combate:

- **Qual skill usar agora?** (gerador ou spender?)
- **Qual alvo priorizar?** (boss ou adds? marcado ou não?)
- **Posicionamento necessário?** (dash para safety ou manter para cast?)
- **Defender ou agredir?** (Kilin protege ou ataca? Filena esquiva ou counter?)

**Impacto:** Determina fluxo imediato do combate. Decisão errada → perda de resources ou positioning advantage. Decisão certa → payoff tático imediato.

### 5.2 Decisões de Médio Prazo (Próximos 2-4 Turnos)

Decisões que planejam o futuro próximo da luta:

- **Gastar TP agora ou guardar para finisher?** (spender vs buildup)
- **Usar ultimate agora ou salvar para situação mais crítica?** (timing de ult)
- **Setup de sinergia vale o custo?** (Filena marca para Thorin = sacrifício de TP)
- **Entrar/Manter postura arriscada?** (Postura Brutal de Mhordred = -30% DEF)

**Impacto:** Determina outcome de fase da luta. Decisão certa → momentum vantajoso. Decisão errada → Recovery dificultado.

### 5.3 Decisões de Longo Prazo (Dentro da Luta Completa)

Decisões que afetam estratégia geral do combate:

- **Qual personagem priorizar resources?** (buffs/debuffs concentrados)
- **Conservar recursos para próxima luta?** (Preserve ON de Thorin/Filena)
- **Aceitar debuff temporário por vantagem permanente?** (Postura Brutal = risco contínuo)
- **Sacrificar um personagem para salvar time?** (Mhordred sem proteção aceitando tank)

**Impacto:** Determina resultado final do combate. Decisão certa → vitória com margem. Decisão errada → derrota ou victory pyrrhic.

### 5.4 Decisões Indesejadas que o Sistema Não Deve Incentivar

O sistema de combate não deve forçar o jogador a tomar decisões que:

- **Contrariam a identidade do personagem:** Filena tankando, Kilin fazendo burst, Thorin frontline
- **Priorizam boring gameplay:** Spam apenas da skill mais forte, ignorando 80% do kit
- **Criam false choices:** Opção A é sempre melhor que B em todas as situações
- **Incentivam passividade:** "Deixe o inimigo vir" é melhor que "agir proativamente"
- **Punem experimentation:** Tentar nova skill/estratégia sempre é punido severamente

---

## 6. Função de Cada Arquétipo no Sistema

### 6.1 Dano Consistente (Sustained DPS)

**Personagem:** Filena (parcialmente), Thorin (sem setup)

**Papel no sistema:**
- Manter pressão constante no inimigo
- Garantir que progresso da luta nunca estagna
- Recursos de backup quando burst não é disponível

**Características:**
- Geradores fortes → acesso frequente a spenders
- Custo moderado de skills → pode manter cycles longos
- Confiança em dano → não depende de grandes janelas

**O que não deve fazer:** Supercar finishers (não é seu papel), sustentação de time, tank.

### 6.2 Burst / Finisher (Burst Damage)

**Personagem:** Mhordred (principal), Filena (burst windows), Thorin (com setup)

**Papel no sistema:**
- Criar clímax de luta (momento de "tudo ou nada")
- Finalizar inimigos rapidamente antes de mecanicas perigosas
- Punir alvos marcados/vulneráveis

**Características:**
- Finishers com custo massivo (-50 a -60 TP)
- Cast times longos (telegraphs) + payoff alto
- Dependência de setup (marca, buff, stacks)
- Momentos dramáticos de explosão de dano

**O que não deve fazer:** Pressão constante (sempre disponível), sustentação sem custo, tank.

### 6.3 Tank / Bruiser (Proteção e Agressão)

**Personagem:** Kilin (Tank), Mhordred (Bruiser)

**Papel no sistema:**
- Absorver dano que mataria aliados
- Criar janelas de segurança para time executar
- Aplicar aggro/controlar atenção de inimigos

**Características:**
- Recursos gerados tomando dano (Kilin: value/20, Mhordred: value/5)
- Skills de proteção com custo pessoal (Proteger Aliado, Muralha)
- Trade-off ofensa/defesa (Kilin cede velocidade, Mhordred cede DEF)

**Diferença Tank vs Bruiser:**
- **Tank (Kilin):** Foco em sobrevivência, proteção direta, buffs defensivos
- **Bruiser (Mhordred):** Foco em dano recebido/causado simultaneamente, risco de morrer para dano alto

### 6.4 Suporte / Setup (Preparação e Coordenação)

**Personagem:** Filena (marca), Kilin (buffs), Thorin (debuffs)

**Papel no sistema:**
- Aplicar states que amplificam time (140 Marca, 134 Buff)
- Criar condições para burst de outros
- Remover debuffs/counter mechanics específicas

**Características:**
- Custo TP moderado para team utility
- Sem dano massivo mas habilita dano de outros
- Sinergias multiplicativas (Filena → Thorin, Kilin → Thorin)

**O que não deve fazer:** Sustentação forte (não é healer), burst independente, tank.

### 6.5 Sustentação / Attrition (Recuperação e Longo Prazo)

**Personagem:** Mhordred (life steal skill único)

**Papel no sistema:**
- Permitir lutas longas sem curas externas
- Recompensa aggression (life steal vem de causar dano)
- Criar estratégia alternative (whittle down inimigo)

**Características:**
- Mecânicas de self-sustain limitadas (não healer full)
- Dependência de causar dano (Execução com 20% life steal)
- Trade-off: skill de sustain custa TP que poderia ser dano

**Importante:** Daratrine NÃO tem healer dedicado. Sustentação é limitada e estratégica, não mainstay.

---

## 7. Regras de Identidade Mecânica

### 7.1 O Que Define a Alma de um Personagem

**Identidade mecânica** de um personagem é definida por cinco camadas:

**Camada 1 — Fantasia Central:** O conceito narrativo traduzido em gameplay
- Filena: "Duelista ágil que embala o combate" → Momentum + mobility + burst windows
- Kilin: "Guardião mentor que protege" → Guarda + sacrifício pessoal + team buffs
- Mhordred: "Brutamontes sanguinário que cresce com ferimento" → Fúria + risk/reward + take/deal damage
- Thorin: "Atirador disciplinado que converte precisão em poder" → Foco + setup + execution

**Camada 2 — Resource Unique:** O TP mode que ninguém mais tem
- Filena: Evasion gera (+12 TP, maior do jogo)
- Kilin: MaxTP 50 (único barra menor), Ally Damage gera
- Mhordred: TCR 1.5 (50% mais rápido), Take/Deal Damage geram
- Thorin: Preserve ON (único mantém entre battles), Critical Hit +10 TP

**Camada 3 — Loop de Gameplay:** A sequence ótima de ações
- Filena: Gerar rápido → burst windows → dash → repeat
- Kilin: Tomar dano → proteger → sacrificar → repeat
- Mhordred: Combater → encher Fúria → spender massivo → repeat
- Thorin: Setup → buildup → execute (com setup) → repeat

**Camada 4 — Assinatura de Skills:** Skills que só existem naquele kit
- Filena: Transferência de Ritmo (sacrifício para time), Estouro de Momentum (finisher)
- Kilin: Muralha Contra Impacto (ultimate defensivo), Proteger Aliado (único skill de tank direto)
- Mhordred: Execução (único life steal massivo), Grito de Guerra (sacrifício ofensivo)
- Thorin: Tiro Preciso (assinatura com setup complexo), Disparo Arriscado (panic button com trade-off)

**Camada 5 — Diferenciais Numéricos:** Valores únicos que reforçam identidade
- Filena: TCR 1.2 (rápido mas não explosivo), MaxTP 100 com Preserve ON
- Kilin: MaxTP 50 (único barra menor), Preserve OFF
- Mhordred: TCR 1.5 (único mais rápido), Take Damage value/5 (4x mais que Kilin)
- Thorin: Preserve ON (único mantém Foco), Critical Hit +10 TP (maior bônus)

### 7.2 Como Personagens Realmente Se Diferenciam

**Diferenciação não é apenas:** "Um causa mais dano, outro tem mais HP".

**Verdadeira diferenciação vem de:**

1. **Forma como geram recurso:**
   - Filena: Evasion + Use Skill (ativo, requer técnica)
   - Kilin: Take Damage + Ally Damage (passivo, requer tank)
   - Mhordred: Take/Deal Damage (combatente, requer estar no thick of it)
   - Thorin: Critical Hit + Use Skill + Regen lenta (disciplinado, requer paciência)

2. **Velocidade de acesso a poder:**
   - Filena: Rápida (TCR 1.2) mas preserve ON → consistente
   - Kilin: Lenta (TCR 1.0) e Preserve OFF → rebuild every fight
   - Mhordred: Muito rápida (TCR 1.5) mas Preserve OFF → explosiva mas volátil
   - Thorin: Lenta (Regen +2) mas Preserve ON -> investimento longo prazo

3. **Natureza dos spenders:**
   - Filena: Burst windows (-20 TP) + finisher (-60 TP)
   - Kilin: Proteção (-15 a -50 TP) + sacrifício pessoal
   - Mhordred: Spenders massivos (-50 TP) + life steal (1 skill)
   - Thorin: Spenders de precisão (-25 a -50 TP) + setup-dependence

4. **Relação com time:**
   - Filena: Enabler (marca para Thorin, transfere Momentum)
   - Kilin: Protector (toma dano, acelera time com Muralha)
   - Mhordred: Leader ofensivo (Grito de Guerra acelera todos)
   - Thorin: Finisher dependente (requer marca + buff do time)

### 7.3 O Que Descaracteriza um Kit

**Um personagem perde identidade quando:**

1. **Recebe mecânica que contradiz fantasy:**
   - Filena recebendo tank skill → quebra duelista ágil
   - Kilin recebendo burst massivo → compete com bruisers
   - Mhordred recebendo sustain sem aggression → quebra sanguinário
   - Thorin recebendo技能 sem precisão/setup → quebra atirador disciplinado

2. **Perde diferencial único:**
   - Se todos ganham Preserve ON → Thorin perde identidade
   - Se todos ganham Evasion +12 TP → Filena perde identidade
   - Se todos ganham TCR 1.5 → Mhordred perde identidade
   - Se todos ganham Ally Damage gera → Kilin perde identidade

3. **Skills homogeneizam:**
   - Se todos os spenders são -20 TP → não há decisão
   - Se todas as geradores são +10 TP → não há diferenciação
   - Se todos têm finisher -60 TP → não há variedade de payoff

4. **Sinergias genéricas substituem específicas:**
   - Se todos podem marcar → Filena/Thorin perdem sinergia única
   - Se todos podem buffar time → Kilin perde utilidade única
   - Se todos podem transferir recurso → Filena perde assinatura

### 7.4 Como Expandir sem Perder Identidade

**Regras para adicionar skills/content sem diluir personagens:**

1. **Nova skill deve reforçar fantasy existente:**
   - Filena nova skill → mobility ou burst ou evasion
   - Kilin nova skill → proteção ou buff defensivo ou tank
   - Mhordred nova skill → dano explosivo ou risk/reward ou life steal
   - Thorin nova skill → precisão ou setup ou execute

2. **Nova mecânica deve coexistir com existentes:**
   - Se Filena ganha nova forma de gerar TP → não pode invalidar Evasion/Use Skill
   - Se Kilin ganha nova forma de proteger → não pode invalidar Proteger Aliado
   - Se Mhordred ganha nova forma de burst → não pode invalidar Execução
   - Se Thorin ganha nova forma de setup → não pode invalidar Tiro Preciso

3. **Cross-over é permitido se mantém "alma":**
   - Filena pode ter light sustain (ex.: life steal leve) → mas não vira healer
   - Kilin pode ter damage skill → mas não vira DPS principal
   - Mhordred pode ter utility → mas não perde aggressiveness
   - Thorin pode ter AoE → mas não perde precisão single-target

4. **Numbers são tuning, identity é structure:**
   - Buffar/nerfar valores é seguro (balanceamento)
   - Adicionar/remover mecânicas é perigoso (identidade)
   - Sempre perguntar: "Esta skill continua sendo reconhecível como [personagem]?"

---

## 8. Fundamentos de Balanceamento

### 8.1 Definição de Balanceamento em Daratrine

**Balanceamento não significa "todos são iguais".**

Em Daratrine, balanceamento significa:
- Cada personagem tem moments de shine e weakness
- Nenhum personagem é dominante em todas as situações
- Todo inimigo pode ser derrotado com qualquer comp (com skill adequado)
- Decisões importam mais que comp pura

**Métricas de balanceamento:**

| Métrica | Definição | Target |
|---------|-----------|--------|
| **Time to Kill (TTK)** | Turnos para eliminar boss padrão | 8-12 turnos (4 chars × 2-3 spenders cada) |
| **Resource Fullness** | Vezes que personagem enche TP por combate | 2-3x (Filena/Mhordred), 1-2x (Kilin), 1x + preserve (Thorin) |
| **Skill Usage Variety** | % de kit usado em combate típico | >60% (6+ skills diferentes) |
| **Synergy Frequency** | Vezes que sinergias de time são usadas | 2-4x por combate (mínimo) |
| **Death Rate** | % de combates com personagem morrendo | 10-20% (Kilin < 5%, Mhordred 20-30%) |

### 8.2 Assimetria Saudável

**Assimetria é feature, não bug.**

Personagens são **intencionalmente diferentes**, e isso cria situações onde:

- **Filena** shine vs mobs rápidos, sofre vs bosses punem dash
- **Kilin** shine vs burst/single-target, sofre vs sustained damage/DoT
- **Mhordred** shine vs bosses permite uptime, sofre vs one-shot mechanics
- **Thorin** shine vs bosses evasivos, sofre vs rushes/melee overwhelms

**Assimetria saudável significa:**
- Diferença de performance em situações diferentes: 30-50% aceitável
- Diferença de performance em mesma situação: <10% (balanceamento fino)
- Ninguém é useless em qualquer situação
- Ninguém é dominate em todas as situações

**Assimetria não saudável (deve ser evitada):**
- Personagem A é 2x melhor que B em 80% das situações
- Situação onde personagem é literalmente inútil
- Personagem só é útil em 1 situação muito específica (niche extremo)

### 8.3 Hierarquia de Poder entre Ações

**Todas as skills NÃO são iguais.** Elas existem em uma hierarquia intencional:

**TIER 0 — Geradores (Básico)**
- Custo: +5 a +12 TP
- Dano: Baixo (a.atk × 1.0, 0% pen)
- Função: Encher barra, pouco dano
- Cast: Speed 0 ou +500/+1000 (rápido)
- Exemplo: Passo de Brisa, Golpe de Escudo

**TIER 1 — Spender Leve**
- Custo: -8 a -15 TP
- Dano: Moderado (a.atk × 1.2, 0-15% pen)
- Função: Dano consistente, upkeep
- Cast: Speed 0 ou -250
- Exemplo: Investida (Dash), Consumo de Foco I

**TIER 2 — Spender Médio**
- Custo: -18 a -30 TP
- Dano: Forte (a.atk × 1.5, 15-20% pen)
- Função: Dano principal, combate
- Cast: Speed -500/-750
- Exemplo: Estocada Relâmpago, Golpe de Oportunidade

**TIER 3 — Spender Pesado**
- Custo: -35 a -50 TP
- Dano: Muito forte (a.atk × 2.2, 30% pen)
- Função: Burst massivo, changer de rumo
- Cast: Speed -1000/-1250
- Exemplo: Extravasar, Consumo de Foco III

**TIER 4 — Finisher/Ultimate**
- Custo: -60 TP ou barra cheia
- Dano: Devastador (a.atk × 3.5, 50% pen)
- Função: Clímax, execução, ultimate de time
- Cast: Speed -1500/-2000 (telegraph pesado)
- Exemplo: Estouro de Momentum, Execução, Muralha Contra Impacto

**Importante:** Hierarquia não significa que skills menores são inúteis. Cada tier tem propósito específico. Geradores são necessários. Spenders leves são úteis quando TP é escasso. Finishers são decisivos mas custosos.

### 8.4 Risco, Custo e Recompensa

**Triade de balanceamento de skills:**

| Dimensão | Definição | Exemplo Alto | Exemplo Baixo |
|----------|-----------|--------------|---------------|
| **Risco** | Chance de falhar/ser punido | Cast -2000 (pode ser interrompido) | Cast 0 (instantâneo) |
| **Custo** | Investment de recursos | -60 TP (barra cheia) | -8 TP (gasto leve) |
| **Recompensa** | Payoff se executado | 9999 damage, -40% ATB | 500 damage, sem efeito extra |

**Princípio de equilíbrio:**
- **Alto risco + Alto custo + Alta recompensa** = Finisher/Ultimate (Execução, Estouro)
- **Alto risco + Baixo custo + Baixa recompensa** = Não existe (frustrante)
- **Baixo risco + Alto custo + Baixa recompensa** = Não existe (trap)
- **Baixo risco + Baixo custo + Moderada recompensa** = Gerador (Passo de Brisa)

**Skills devem seguir esta lógica:**
- Cast longo (risco) → payoff compensador
- Custo massivo (investimento) → dano/efeito proporcional
- Instantâneo (sem risco) → dano moderado ou custo simbólico

**Exemplos de balanceamento correto:**
- **Mhordred Execução:** Cast -2000 (alto risco), -50 TP (alto custo), Unblockable + 50% pen + 20% life steal (alta recompensa)
- **Filena Transferência:** Cast 0 (sem risco), -100% TP (alto custo), +50% ATB para aliado (alta recompensa)
- **Thorin Disparo Arriscado:** Cast 0 (sem risco), 0 TP (sem custo), -50% After Gauge + quebra Foco (penalty = trade-off)

### 8.5 Consistência versus Volatilidade

**Trade-off fundamental em game design de combate:**

**Consistência (Low Variance):**
- Mesmo input → mesmo resultado (dentro de banda pequena)
- Dano calculável, previsível
- Crítico como exceção (5-8% base, skills específicas)
- Exemplo: Thorin sem setup, Kilin gerador

**Volatilidade (High Variance):**
- Input → resultado pode variar muito
- Dano depende de multi-hit, crítico, execution conditions
- Crítico como regra (taxas altas, multiplicadores altos)
- Exemplo: Mhordred com Fúria cheia, Thorin com 5 Foco + setup

**Daratrine escolhe:**
- **Base: Consistência** → jogador pode planejar
- **Spikes de volatilidade** → momentos dramáticos (crítico de Thorin setup)
- **Controle de volatilidade** → cap de crítico (60-70%), variance limits

**Decisões de design:**
- Consistência é default → fórmulas determinísticas
- Volatilidade é reward, not substitute → setups corretos permitem spikes
- RNG existe mas é gerenciável → crítico não é 50% base por acidente

---

## 9. Papel dos Inimigos no Balanceamento

### 9.1 Inimigos como Validadores do Sistema

Inimigos NÃO são apenas "obstáculos a serem superados". Eles são **ferramentas de validação** do combat system:

**O que inimigos validam:**
- Se o sistema de dano funciona (mobs morrem em tempo esperado)
- Se os personagens são balanceados (ninguém one-shot tudo sem esforço)
- Se as sinergias funcionam (time coordena e é recompensado)
- Se existe depth estratégica (inimigos diferentes exigem abordagens diferentes)

**Como inimigos validam:**
- **Mobs:** Validam basic effectiveness (skills funcionam?)
- **Elites:** Validam resource management (sáber gerir TP?)
- **Mini-bosses:** Validam coordenação de time (sinergias funcionam?)
- **Bosses:** Validam mastery completo (conhecimento de kits + execução perfeita)

### 9.2 O Que Inimigos Devem Ensinar

Cada categoria de inimigo existe para ensinar algo ao jogador:

**Mobs Comuns:**
- Ensinam: Loop básico de combate, geradores vs spenders
- Não devem: Matar em 1 hit, exigir cooldowns/resource perfeitos
- Características: HP baixo, dano baixo, sem mecânicas complexas

**Elites:**
- Ensinam: Gerenciamento de TP, positioning, quando usar spender
- Não devem: Exigir burst massivo, punir experimentação
- Características: HP médio, damage médio, 1-2 mecânicas (debuff, simple pattern)

**Mini-Bosses:**
- Ensinam: Coordenação de time, setup de sinergias, timing de ultimates
- Não devem: Exigir comp específica, one-shot party sem aviso
- Características: HP alto, damage alto, padrões reconhecíveis, janelas de vulnerabilidade

**Bosses Principais:**
- Ensinam: Mastery dos kits, adaptação a mudanças, execução sob pressão
- Não devem: Ser impossíveis sem trial-and-error exaustivo,要求 perfeição RNG
- Características: Muito HP, damage alto, múltiplas fases, mecânicas que mudam, telegraphs claros

### 9.3 O Que Inimigos NÃO Devem Fazer

Inimigos violam o sistema quando:

**Violações de Design:**

1. **Matar sem aviso (One-shot)**
   - **Erro:** Boss tem attack que mata full HP party sem chance de reagir
   - **Correto:** Telegraph claro (cast time, visual), oportunidade de defender/esquivar

2. **Exigir Comp Específica**
   - **Erro:** Inimigo só pode ser derrotado com Filena + Thorin
   - **Correto:** Qualquer comp pode vencer, comps diferentes têm estratégias diferentes

3. **Invalidar Skills Inteiros**
   - **Erro:** Boss é immune a physical → Mhordred/Filena/Thorin físicos são useless
   - **Correto:** Imunidades parciais (ex.: resistant to bleed, não immune)

4. **RNG Dependency**
   - **Erro:** Vitória depende de crítico no momento certo
   - **Correto:** Crítico acelera, mas não determina, vitória

5. **Trial-and-Error Exaustivo**
   - **Erro:** Só vence após morrer 10 vezes para memorizar patterns
   - **Correto:** Primeira tentativa ensina patterns, vitória vem de execução, não memorização

### 9.4 Papel por Tipo de Inimigo

**Por dificuldade (Armor Reduction):**

| Tipo | Armor Reduction | Função |
|------|-----------------|--------|
| **Mobs comuns** | 0% | Sandbox, teach basics |
| **Elites** | 10-20% | Test armor penetration de spenders |
| **Mini-bosses** | 25-30% | Requer finishers/armor pen alto |
| **Bosses principais** | 40-50% | Requer setup completo + pen max |

**Por tipo (Especiais):**

| Tipo | Modificador | Função |
|------|-------------|--------|
| **Blindados/Couraçados** | +10-20% Armor | Testa armor penetration system |
| **Mágicos/Espirituais** | -10% Armor (vulneráveis), +10-20% Magic | Testa uso de magic pen, dá vantagem a phys |
| **Humanoides** | Base | Balanço padrão |

**Importante:** Inimigos não devem ter apenas HP/dano diferentes. Eles devem testar **aspectos diferentes do sistema**:

- Elites com alto DEF → testam Armor Pen tiers
- Inimigos evasivos → testam Hit Rate/Critical de Thorin
- Inimigos com burst → testam proteção de Kilin
- Inimigos com DoT → testam sustain/attrition
- Inimigos com adds → testam AoE vs single-target

### 9.5 Balanceamento de Inimigos vs Personagens

**Diretrizes para balancear inimigos:**

**Regra 1 — Time to Kill Consistente:**
- Mobs devem morrer em 1-2 geradores + 1 spender
- Elites devem morrer em 2-3 spenders por personagem
- Mini-bosses devem requerer 1-2 finishers ou 4-6 spenders
- Bosses devem requerer 2+ finishers + coordenação

**Regra 2 — Damage per Turn Ameaçador mas Fair:**
- Mobs: 5-10% HP max por hit → party pode tank several hits
- Elites: 10-15% HP max por hit → positioning/defensas importa
- Mini-bosses: 15-20% HP max por hit → erros são punidos
- Bosses: 20-30% HP max por hit → mistakes + mechanics wipe party

**Regra 3 — Mecânicas Legíveis:**
- Todo attack perigoso tem telegraph (cast time, animation, tell visual)
- Todo pattern pode ser aprendido em 1-2 vistas
- Todo one-shot potential tem counter (defend, esquivar, interrupt)

**Regra 4 — Progressão de Desafio:**
- Inimigos early game ensinam basics
- Inimigos mid-game testam coordenação
- Inimigos late-game testam mastery
- Inimigos post-game/testam optimization

---

## 10. Critérios de Qualidade do Sistema

### 10.1 Sinais de que o Combate Funciona

**Indicadores de sucesso:**

**Sinais Positivos de Gameplay:**
1. **Uso variado de skills:** Jogador usa 6+ skills diferentes em combate típico
2. **Coordenação natural:** Jogador coordena time sem ser forçado por tutorial
3. **Decisões de resource:** Jogador decide deliberadamente quando gastar TP
4. **Setup e payoff:** Jogador planeja setups (marca + buff) e é recompensado
5. **Adaptação a inimigos:** Jogador muda estratégia baseado no tipo de inimigo
6. **Retry com melhoria:** Após derrota, jogador tenta estratégia diferente (não mesmo spam)
7. **Expressão de skill:** Jogadores experientes se diferenciam de novatos por execution, não gear

**Sinais Positivos de Design:**
1. **Cada personagem tem fans:** Jogadores desenvolvem preferência por kits diferentes
2. **Metagame saudável:** Não existe "melhor personagem" universally
3. **Discussão estratégica:** Comunidade discute estratégias, não apenas glitches
4. **Momentum de domínio:** Jogador sente que está melhorando (não apenas gear)
5. **Rejogabilidade:** Combates permanecem interessantes após repetição

**Sinais Positivos de Balanceamento:**
1. **Win rate variado:** Todos os personagens têm win rate similar (45-55%)
2. **Time to kill consistente:** Bosses similares levam tempo similar para derrotar
3. **Nenhum personagem é required:** Todas as comps podem vencer conteúdo
4. **Nenhum personagem é useless:** Mesmo em desvantagem, todos contribuem
5. **Skill expression gap:** Jogadores skilled podem superar desvantagens

### 10.2 Sintomas de Falha Sistêmica

**Sinais de que o sistema precisa de ajuste:**

**Sintomas de Gameplay:**
1. **Spam de 1-2 skills:** Jogador ignora 80% do kit (só usa mais forte)
2. **Decisão trivial:** Uma skill é sempre melhor em todas as situações
3. **Recurso irrelevante:** TP não importa, jogador spam sem consequência
4. **Inimigo ignora player:** Não importa o que jogador faz, resultado é o mesmo
5. **Trial-and-error:** Só vence após memorizar, não entender
6. **RNG dependency:** Vitória/derrota depende de crítico/evade, não decisão

**Sintomas de Design:**
1. **Personagens intercambiáveis:** Não faz diferença quem está no time
2. **Sinergias forçadas:** Jogador coordena apenas porque sistema exige, não é recompensado
3. **Complexidade arbitrária:** Mecânicas existem mas não adicionam profundidade
4. **Identidade diluída:** Personagens não se sentem únicos
5. **False choices:** A opção "correta" é óbvia, não real decisão

**Sintomas de Balanceamento:**
1. **Dominance:** Um personagem/time comp é 2x melhor que outros
2. **Uselessness:** Um personagem é literalmente não-functional em conteúdo
3. **Impossible:** Bosses só podem ser derrotados com comp específica ou RNG perfeito
4. **Trivial:** Content é tão fácil que decisão não importa
5. **Unfair:** Morte feels cheep (sem counter, sem telegraph)

### 10.3 Perguntas-Guia para Decisões Futuras

**Ao adicionar nova skill/personagem/inimigo, pergunte:**

**Sobre Identidade:**
- [ ] Isso reforça a identidade do personagem ou dilui?
- [ ] Isso mantém diferenciação entre personagens ou homogeneiza?
- [ ] Isso cria niche exclusivo ou overlap com existente?
- [ ] Isso é reconhecível como parte do kit ou poderia ser de任何人?

**Sobre Balanceamento:**
- [ ] Qual é o custo? (TP, cast, setup, risco)
- [ ] Qual é a recompensa? (dano, efeito, utility)
- [ ] Trade-off é justo? (risco ≈ recompensa)
- [ ] Isso invalida skills existentes? (power creep)
- [ ] Isso é mandatory ou optional? (required vs bonus)

**Sobre Gameplay:**
- [ ] Isso cria decisão interessante ou é obvious?
- [ ] Isso adiciona profundidade ou complicação?
- [ ] Isso é legível para o jogador ou oculto?
- [ ] Isso é consistente ou volatility arbitrária?
- [ ] Isso recompensa skill ou spam/reflex?

**Sobre Inimigos:**
- [ ] Isso valida algum aspecto do sistema?
- [ ] Isso ensina algo ao jogador?
- [ ] Isso tem counter? (não unfair)
- [ ] Isso é diferente de outros inimigos? (variedade)
- [ ] Isso scale corretamente? (não impossible/trivial)

**Sobre Sistema:**
- [ ] Isso conecta com o que já existe? (sinergia)
- [ ] Isso segue patterns estabelecidos? (consistência)
- [ ] Isso pode ser comunicado claramente? (legibilidade)
- [ ] Isso é future-proof? (escalabilidade)
- [ ] Isso é simples de entender, difícil de master? (depth)

---

## Conclusão: Princípios-Mãe do Sistema

O combat system de Daratrine - A Origem é fundamentado em **seis princípios-mãe** que orientam todas as decisões:

### 1. Identidade é Sagrada
Cada personagem tem uma alma mecânica única definida por fantasy, resource, loop de gameplay, skills assinatura, e diferenciais numéricos. Esta identidade nunca deve ser sacrificada por conveniência de balanceamento.

### 2. Decisão Antes de Ação
A profundidade do combate vem de planejamento, não reflexos. Cast times, TP costs, e setups existem para criar janelas de decisão, não ser meros delays.

### 3. Todo Poder Tem Preço
Skills poderosas têm custo de TP, cast time, setup, ou risco. Não existe almoço grátis. Payoff proporcional a investment cria equilíbrio natural.

### 4. Clareza é Poder
O jogador nunca deve adivinhar. Fórmulas são deterministicas, informações são visíveis, e feedback é imediato. Mistério não é depth.

### 5. Assimetria é Feature, não Bug
Personagens são diferentes de propósito. Situações onde A shine e B struggle são设计好的, não bugs. O que deve ser evitado é dominance (sempre shine) e uselessness (nunca shine).

### 6. Inimigos Validam o Sistema
Cada categoria de inimigo existe para testar aspectos diferentes do combat system. Mobs ensinam basics, bosses testam mastery. Inimigos devem ser fair, legíveis, e superáveis por skill, não trial-and-error.

---

**Fim do Documento de Fundamentos do Combat System**
