# 008 - Classificacao e Score de Modificadores do Score System

**Versao:** 2.0
**Data:** 2026-04-11
**Escopo:** Classificacao objetiva e pontuacao numerica de todos os modificadores possiveis de uma skill nos 3 eixos do combate
**Baseado em:** DIRETRIZES-DESIGN-COMBAT-SYSTEM.md (Secao 1.3.2), GUIA-FERRAMENTAS-COMBAT-SYSTEM.md, FUNDAMENTOS-COMBAT-SYSTEM.md

---

## 1. Introducao

Este documento expande a **Secao 1.3 Hierarquia de Poder entre Skills** do DIRETRIZES-DESIGN-COMBAT-SYSTEM.md.

O objetivo e **classificar e pontuar** cada modificador que uma skill pode ter nos 3 eixos do combate (Efeito, Tempo, Recurso) em tres categorias:

| Classificacao | Significado | Impacto no Score |
|---------------|-------------|------------------|
| **Positivo (+)** | Adiciona poder ou utilidade a skill. Aumenta o score. | +pontos |
| **Neutro (0)** | Estado padrao/esperado. Nao altera o score. | 0 pontos |
| **Negativo (-)** | Adiciona custo, risco ou restricao a skill. Reduz o score. | -pontos |

**Principio:** Toda skill comeca com score 0. Modificadores positivos sobem o score, negativos descem. O score final determina o tier (ver Secao 7).

---

## 2. Convencao de Leitura

Cada modificador e documentado com:

```
### Nome do Modificador
**Eixo:** Efeito | Tempo | Recurso
**Ferramenta:** Tag ou parametro tecnico correspondente
**Tipo:** Fixo | On-hit (amplifica com multi-hit)

| Faixa de Valor | Classificacao | Score | Notas |
|----------------|---------------|-------|-------|
| valor          | +/-/0         | +/-N  | contexto |
```

**Tipo de modificador:**
- **Fixo:** O valor nao muda com multi-hit (ex: Armor Pen, Unblockable)
- **On-hit:** O valor e amplificado pelo numero de hits (ex: Life Steal, Crit Chance). Ver Secao 9 para regras de multiplicacao.

---

## 3. Modelo de Score

### 3.1 Formula

```
Score Final = [Soma(Pontos_Efeito) x 2.0] + Soma(Pontos_Tempo) + Soma(Pontos_Recurso) + Bonus_Sinergias
```

### 3.2 Ponderacao por Eixo

| Eixo | Peso | Justificativa |
|------|------|---------------|
| **Efeito** (Battle Core) | **x2.0** | O que a skill FAZ e a razao de ela existir. Efeito define impacto direto |
| **Tempo** (ATB) | **x1.0** | QUANDO acontece e custo temporário. Peso padrão |
| **Recurso** (TP System) | **x1.0** | QUANTO custa e custo de recurso. Peso padrão |

**Por que Efeito pesa o dobro:** Sem esse peso, uma skill com 3 modificadores de efeito moderado ficaria no mesmo tier que um gerador com speed+TP gain. O efeito deve ser o diferenciador principal.

### 3.3 Escala de Tiers por Score

| Score | Tier | Papel no Kit |
|-------|------|--------------|
| 1-50 | Tier 1 | Geradores, spenders leves, utilidade basica |
| 51-100 | Tier 2 | Spenders medios, setup, utilidade moderada |
| 101-150 | Tier 3 | Spenders pesados, finishers, utilidade forte |
| 151-200 | Tier 4 | Ultimates |

**Nomenclatura:** Skills de tier superior que sao evolucao direta de uma skill de tier anterior mantem o nome base com sufixo romano: Consumo de Foco I (Tier 1) -> Consumo de Foco II (Tier 2) -> Consumo de Foco III (Tier 3).

---

## 4. Eixo Efeito (Battle Core) — Tabelas de Pontuacao

O eixo de **Efeito** controla o que a skill faz quando acontece. Inclui dano, critico, penetracao, sustain, targeting e utilidade.

### 4.1 Multiplicador de Dano

**Ferramenta:** Campo `Damage Formula` do RPG Maker (usado como multiplicador na formula MOBA)
**Tipo:** Fixo

| Faixa de Valor | Classificacao | Score | Notas |
|----------------|---------------|-------|-------|
| < 0.8x | Negativo (-) | -8 | Dano muito abaixo do padrao. Raro, precisa de efeito forte |
| 0.8-0.9x | Negativo (-) | -5 | Dano abaixo do padrao |
| 1.0x | Neutro (0) | 0 | Multiplicador padrao de skill basica |
| 1.1-1.4x | Positivo (+) | +8 a +12 | Positivo leve. Spender leve |
| 1.5-2.0x | Positivo (+) | +15 a +25 | Positivo moderado. Spender medio |
| 2.1-3.0x | Positivo (++) | +28 a +40 | Positivo alto. Spender pesado |
| 3.0x+ | Positivo (+++) | +40 a +50 | Positivo muito alto. Finisher/Ultimate |

**Referencia de tiers (FUNDAMENTOS 8.3):**
- Tier 0-1: 0.8-1.2x
- Tier 2: 1.5-2.0x
- Tier 3: 2.0-3.0x
- Tier 4: 3.0x+

### 4.2 Armor Penetration

**Ferramenta:** `<Armor Pen: x%>`
**Tipo:** Fixo

| Faixa de Valor | Classificacao | Score | Notas |
|----------------|---------------|-------|-------|
| 0% | Neutro (0) | 0 | Sem penetracao (padrao) |
| 1-15% | Positivo (+) | +8 | Spender leve |
| 16-30% | Positivo (+) | +15 | Spender medio |
| 31-50% | Positivo (++) | +25 | Finisher |
| > 50% | Positivo (+++) | +30 | Muito alto |

### 4.3 Armor Reduction (Sacrificio Proprio)

**Ferramenta:** `<Armor Reduction: x%>` (forma abreviada: `<Armor Red: x%>`)
**Tipo:** Fixo

| Faixa de Valor | Classificacao | Score | Notas |
|----------------|---------------|-------|-------|
| 0% | Neutro (0) | 0 | Sem sacrificio |
| 1-15% | Negativo (-) | -5 | Sacrificio leve |
| 16-30% | Negativo (-) | -10 | Sacrificio moderado |
| > 30% | Negativo (--) | -15 | Sacrificio alto |

**Importante:** Armor Reduction NAO e debuff no alvo. Reduz propria defesa como trade-off por poder ofensivo. (GUIA 6.2)

### 4.4 Unblockable

**Ferramenta:** `<Unblockable>`
**Tipo:** Fixo

| Faixa de Valor | Classificacao | Score | Notas |
|----------------|---------------|-------|-------|
| Nao | Neutro (0) | 0 | Pode ser guardado (padrao) |
| Sim | Positivo (+) | +15 | Ignora command Guard do alvo. Reservado para alto custo |

**Uso restrito:** Apenas em skills com custo massivo de TP e/ou cast time longo (GUIA 5.4)

### 4.5 HIT Rate (Taxa de Acerto)

**Ferramenta:** Parametro de HIT do RPG Maker
**Tipo:** Fixo

| Faixa de Valor | Classificacao | Score | Notas |
|----------------|---------------|-------|-------|
| < 90% | Negativo (-) | -10 | RNG forte contra. Chance alta de miss |
| 90-99% | Negativo (-) | -5 | RNG leve contra |
| 100% | Neutro (0) | 0 | Acerto padrao. Confiavel |
| > 100% | Positivo (+) | +5 | Acerto garantido com margem |

### 4.6 Chance de Critico

**Ferramenta:** `<Critical>`, `<Modify Critical Rate: +x%>`
**Tipo:** On-hit

| Faixa de Valor | Classificacao | Score | Notas |
|----------------|---------------|-------|-------|
| Base (5-8%) | Neutro (0) | 0 | Chance critica padrao sem bonus |
| +10-15% | Positivo (+) | +8 | Positivo leve |
| +16-25% | Positivo (+) | +12 | Positivo moderado |
| > 25% | Positivo (++) | +15 | Positivo alto |

**Nota:** No projeto, critico e excecao, nao regra. A maioria das skills NAO tem bonus de critico. (GUIA 7.1)

### 4.7 Always Critical

**Ferramenta:** `<Always Critical>` ou `<Custom Critical Eval>` (condicional)
**Tipo:** Fixo (nao amplifica com multi-hit — a skill SEMPRE critica, independente de hits)

| Faixa de Valor | Classificacao | Score | Notas |
|----------------|---------------|-------|-------|
| Nao | Neutro (0) | 0 | Usa taxa normal de critico |
| Condicional | Positivo (+) | +18 | Crita se condicao X (ex: alvo com State 140). Forca condicionada a setup |
| Incondicional | Positivo (+++) | +30 | Sempre critica. Muito forte. Reservado para casos raros |

### 4.8 Multiplicador de Critico

**Ferramenta:** `<Crit Damage Bonus>`
**Tipo:** Fixo

| Faixa de Valor | Classificacao | Score | Notas |
|----------------|---------------|-------|-------|
| 3.0x | Neutro (0) | 0 | Multiplicador padrao do projeto |
| 3.1-4.0x | Positivo (+) | +8 | Positivo leve (ex: 4.0x do Thorin) |
| > 4.0x | Positivo (+) | +12 | Positivo moderado |

### 4.9 Life Steal

**Ferramenta:** `<HP Life Steal: x%>`
**Tipo:** On-hit

| Faixa de Valor | Classificacao | Score | Notas |
|----------------|---------------|-------|-------|
| 0% | Neutro (0) | 0 | Sem life steal (padrao) |
| 5-10% | Positivo (+) | +8 | Sustain leve |
| 15-20% | Positivo (+) | +12 | Sustain moderado |
| 25%+ | Positivo (++) | +18 | Sustain alto |

**Referencia de tiers (GUIA 8.1):**
- 5-10%: Spender leve
- 15-20%: Spender medio
- 25%+: Finisher

### 4.10 Escopo / Scope (Alcance de Alvos)

**Ferramenta:** `<Modify Target>`, configuracao de targeting do RPG Maker
**Tipo:** Fixo

| Faixa de Valor | Classificacao | Score | Notas |
|----------------|---------------|-------|-------|
| ST (single target) | Neutro (0) | 0 | Um alvo apenas. Padrao |
| AoE (multiplos alvos) | Positivo (+) | +15 | Afeta multiplos alvos. Mais impacto total por acao |
| Aleatorio | Negativo (-) | -10 | Alvo(s) selecionado(s) aleatoriamente. Perde controle tatico |

### 4.11 Quantidade de Hits (Multi-Hit)

**Ferramenta:** `<Repeat Targets: x>`
**Tipo:** Especial (ver Secao 9 para regras de interacao com on-hit)

| Faixa de Valor | Classificacao | Score | Notas |
|----------------|---------------|-------|-------|
| 1 hit | Neutro (0) | 0 | Hit unico (padrao) |
| 2 hits | Positivo (+) | +12 | Mais dano total, mais triggers |
| 3 hits | Positivo (+) | +18 | Diminishing returns |
| 4+ hits | Positivo (+) | +22 | Plateau |

**Nota:** O score acima representa o dano total amplificado e o valor base do multi-hit. Efeitos on-hit (Life Steal, Crit, TP gain) sao multiplicados separadamente — ver Secao 9.1.

### 4.12 Crowd Control (CC)

**Ferramenta:** States com traits de restricao, debuff de parametros ou DoT
**Tipo:** On-hit (quando aplicavel por hit)

**Score base por tipo de CC (a 100% de chance):**

| Tipo de CC | Efeito | Score Base | Notas |
|------------|--------|------------|-------|
| **Stun** | Alvo nao pode agir. Gauge para/reseta | +25 | Hard CC. Mais forte. State 13 |
| **Slow** | Gauge do alvo enche mais devagar | +8 | Soft CC. Nao impede acao |
| **Sangramento** | DoT fisico (HP Regen negativa) | +10 | State 31. HP Regen -10%, ignora DEF |
| **Poison** | DoT magico/quimico | +8 | Soft CC. DoT |
| **Marcacao** | +HIT e +Crit Rate para quem ataca o alvo | +12 | State 140. Amplifica ofensa do time |
| **Cegueira** | Reduz HIT do alvo (miss) | +10 | State 5. HIT Rate -50% |
| **Confusao** | Alvo ataca aliados aleatoriamente | +15 | Hard CC. Reseta gauge |
| **Adormecido** | Alvo nao age, mas acorda ao levar dano | +12 | Hard CC condicional. Remove By Damage: true |
| Nao | — | 0 | Sem CC |

**Regra de % de Chance de Aplicacao:**

O score do CC e multiplicado pela chance de aplicacao:

```
Score do CC = Score Base x (% Chance / 100)
```

| CC (Score Base) | 100% chance | 70% chance | 50% chance | 30% chance |
|-----------------|-------------|------------|------------|------------|
| Stun (+25) | +25 | +18 | +12 | +8 |
| Confusao (+15) | +15 | +10 | +8 | +5 |
| Marcacao (+12) | +12 | +8 | +6 | +4 |
| Sangramento (+10) | +10 | +7 | +5 | +3 |
| Cegueira (+10) | +10 | +7 | +5 | +3 |
| Slow (+8) | +8 | +6 | +4 | +2 |
| Poison (+8) | +8 | +6 | +4 | +2 |

**Separacao de camadas:** HIT Rate (se a skill acerta) e CC Chance (se o State e aplicado ao acertar) sao independentes. Probabilidade final = HIT Rate x CC Chance.

**Regra de duracao:** CC com duracao > 3 turnos recebe +50% no score base. CC em AoE recebe +50% adicional (cumulativo com duracao).

### 4.13 Interrupt

**Ferramenta:** `<ATB Interrupt>`
**Tipo:** Fixo

| Faixa de Valor | Classificacao | Score | Notas |
|----------------|---------------|-------|-------|
| Nao | Neutro (0) | 0 | Nao interrompe |
| Sim | Positivo (+) | +10 | Interrompe skills em casting do alvo. Counterplay ativo |

### 4.14 Buffs ao Usuario

**Ferramenta:** MECH: Add Buff (VisuStella Battle Core)
**Tipo:** Fixo
**Regra:** Cada stack = +25% no parametro. Valor fixo, configuravel globalmente via `JS: Buff/Debuff Rate` no Skills & States Core. A skill escolhe quais parametros e quantos stacks — nao escolhe a porcentagem.

| Stacks x Params | Classificacao | Score | Notas |
|-----------------|---------------|-------|-------|
| Nao | Neutro (0) | 0 | Sem buffs ao usuario |
| 1 stack, 1 param (+25%) | Positivo (+) | +8 | Buff simples. Ex: ATK +25% |
| 2 stacks, 1 param (+50%) ou 1 stack, 2 params | Positivo (+) | +12 | Buff moderado |
| 3 stacks, 1 param (+75%) ou 2+ stacks, 2+ params | Positivo (++) | +15 | Buff significativo |

### 4.15 Debuffs ao Alvo

**Ferramenta:** MECH: Add Debuff (VisuStella Battle Core)
**Tipo:** Fixo (a menos que aplicado por hit — ver CC)
**Regra:** Cada stack = -25% no parametro. Valor fixo, configuravel globalmente via `JS: Buff/Debuff Rate` no Skills & States Core. A skill escolhe quais parametros e quantos stacks — nao escolhe a porcentagem.

| Stacks x Params | Classificacao | Score | Notas |
|-----------------|---------------|-------|-------|
| Nao | Neutro (0) | 0 | Sem debuffs ao alvo |
| 1 stack, 1 param (-25%) | Positivo (+) | +8 | Debuff simples. Ex: DEF -25% |
| 2 stacks, 1 param (-50%) ou 1 stack, 2 params | Positivo (+) | +12 | Debuff moderado |
| 3 stacks, 1 param (-75%) ou 2+ stacks, 2+ params | Positivo (++) | +15 | Debuff forte |
| 2+ stacks, 3+ params | Positivo (+++) | +18 | Debuff composto massivo |

### 4.16 Debuffs ao Usuario

**Ferramenta:** MECH: Add Debuff (VisuStella Battle Core) — auto-aplicado
**Tipo:** Fixo
**Regra:** Cada stack = -25% no parametro. Valor fixo, configuravel globalmente via `JS: Buff/Debuff Rate` no Skills & States Core.

| Stacks x Params | Classificacao | Score | Notas |
|-----------------|---------------|-------|-------|
| Nao | Neutro (0) | 0 | Sem debuffs ao usuario |
| 1 stack, 1 param (-25%) | Negativo (-) | -8 | Trade-off aceitavel. Ex: DEF -25% |
| 2 stacks, 1 param (-50%) ou 1 stack, 2 params | Negativo (-) | -12 | Custo moderado |
| 3 stacks, 1 param (-75%) ou 2+ stacks, 2+ params | Negativo (--) | -15 | Custo significativo |

### 4.17 Cura Direta / Drain

**Ferramenta:** Mecanica de Drain (GUIA 8.2) / formulas de cura
**Tipo:** Fixo

| Faixa de Valor | Classificacao | Score | Notas |
|----------------|---------------|-------|-------|
| Nao | Neutro (0) | 0 | Sem cura |
| Leve (10-20% HP) | Positivo (+) | +12 | Sustain de time |
| Moderada (25-40% HP) | Positivo (+) | +20 | Cura significativa |
| Forte (50%+ HP) | Positivo (++) | +28 | Cura massiva |

### 4.18 Buffs para Aliados

**Ferramenta:** States com traits positivas aplicadas a aliados
**Tipo:** Fixo

| Faixa de Valor | Classificacao | Score | Notas |
|----------------|---------------|-------|-------|
| Nao | Neutro (0) | 0 | Sem buffs para aliados |
| Individual (1 aliado) | Positivo (+) | +15 | Suporte direcionado |
| Time inteiro | Positivo (++) | +25 | Impacto multiplicado |

### 4.19 Remocao de Debuffs / Limpeza

**Ferramenta:** Mecanica de remocao de states
**Tipo:** Fixo

| Faixa de Valor | Classificacao | Score | Notas |
|----------------|---------------|-------|-------|
| Nao | Neutro (0) | 0 | Sem limpeza |
| 1 debuff especifico | Positivo (+) | +10 | Utilidade defensiva |
| Todos (cleanse) | Positivo (+) | +18 | Premium |

---

## 5. Eixo Tempo (ATB) — Tabelas de Pontuacao

O eixo de **Tempo** controla quando a skill acontece e a cadencia pos-acao.

### 5.1 Speed / Cast Time

**Ferramenta:** Parametro `Speed` do RPG Maker / ATB

| Faixa de Valor | Classificacao | Score | Notas |
|----------------|---------------|-------|-------|
| > 0 (speed positivo) | Positivo (+) | +5 a +10 | Skill rapida/instantanea. Sem vulnerabilidade |
| 0 (speed zero) | Neutro (0) | 0 | Velocidade padrao |
| -1 a -500 | Negativo (-) | -5 a -12 | Cast curto. Risco moderado |
| -501 a -1000 | Negativo (-) | -12 a -22 | Cast medio. Risco significativo |
| -1001 a -2000 | Negativo (--) | -22 a -35 | Cast longo. Risco massivo |
| < -2000 | Negativo (---) | -35 a -45 | Cast muito longo. Commit total |

**Referencia (DIRETRIZES 1.4.3):**
- Instantanea (>= 0): Sem vulnerabilidade
- Cast leve (-250 a -500): Risco moderado
- Cast medio (-750 a -1000): Risco significativo
- Cast longo (-1250 a -2000): Risco massivo

### 5.2 After Gauge

**Ferramenta:** `<ATB After Gauge: x%>`, `<ATB After Gauge: +x%>`, `<ATB After Gauge: -x%>`

| Faixa de Valor | Classificacao | Score | Notas |
|----------------|---------------|-------|-------|
| > 0% (positivo) | Positivo (+) | +5 a +8 | Proximo turno mais rapido |
| 0% | Neutro (0) | 0 | Sem modificacao pos-acao (padrao) |
| -1% a -20% | Negativo (-) | -5 a -10 | Desacelera moderadamente |
| -21% a -40% | Negativo (--) | -10 a -18 | Punição severa. Janela de vulnerabilidade |
| < -40% | Negativo (---) | -18 a -25 | Recuperacao muito lenta |

### 5.3 Cannot Be Interrupted

**Ferramenta:** `<ATB Cannot Be Interrupted>`

| Faixa de Valor | Classificacao | Score | Notas |
|----------------|---------------|-------|-------|
| Nao | Neutro (0) | 0 | Pode ser interrompida (padrao) |
| Sim | Positivo (+) | +10 | Protege o investimento de cast |

**Nota:** So faz sentido classificar se a skill TEM cast time (speed < 0). Skills com speed >= 0 nao sao interrompiveis por definicao.

### 5.4 Interruptibilidade (Risco)

**Ferramenta:** Implicito pelo Speed < 0

| Faixa de Valor | Classificacao | Score | Notas |
|----------------|---------------|-------|-------|
| Nao (speed >= 0) | Neutro (0) | 0 | Sem cast time, nao e interrompivel |
| Nao (tem Cannot Be Interrupted) | Neutro (0) | 0 | Tem cast mas e protegido |
| Sim (sem protecao) | Negativo (-) | -8 | Pode ser cancelada por `<ATB Interrupt>` |

---

## 6. Eixo Recurso (TP System) — Tabelas de Pontuacao

O eixo de **Recurso** controla quanto a skill custa e como se encaixa no loop de TP.

### 6.1 Custo de TP

**Ferramenta:** Parametro `TP Cost` do RPG Maker

| Faixa de Valor | Classificacao | Score | Notas |
|----------------|---------------|-------|-------|
| 0 (sem custo) | Neutro (0) | 0 | Nao consume TP |
| 1-15 | Negativo (-) | -5 a -12 | Spender leve |
| 16-30 | Negativo (-) | -12 a -22 | Spender medio |
| 31-50 | Negativo (--) | -22 a -35 | Spender pesado / finisher |
| > 50 | Negativo (---) | -35 a -45 | Ultimate |

### 6.2 Ganho de TP

**Ferramenta:** `<Gain TP: +x>`, trigger do TP Mode "Use Skill"

| Faixa de Valor | Classificacao | Score | Notas |
|----------------|---------------|-------|-------|
| 0 | Neutro (0) | 0 | Nem gera nem consome TP via esta skill |
| +5-8 | Positivo (+) | +5 | Positivo leve |
| +10-12 | Positivo (+) | +8 | Positivo moderado |
| > 12 | Positivo (+) | +10 | Positivo alto (raro) |

**Referencia (GUIA 18.1):**
- +5 a +8 TP: Geradores basicos
- +10 a +12 TP: Geradores premium

### 6.3 Condicao de Uso

**Ferramenta:** JavaScript condicional, requisitos de state, requisitos de HP/TP

| Faixa de Valor | Classificacao | Score | Notas |
|----------------|---------------|-------|-------|
| Nenhuma condicao | Neutro (0) | 0 | Pode ser usada a qualquer momento (padrao) |
| Condicao restritiva | Negativo (-) | -8 a -12 | Requer setup previo. Limita janela de uso |
| Condicao muito restritiva | Negativo (--) | -12 a -18 | Requer multiplos setups ou condicao rara |

### 6.4 Consome Beneficio Proprio / Marca

**Ferramenta:** States removidos pos-uso, efeitos que removem stacks

| Faixa de Valor | Classificacao | Score | Notas |
|----------------|---------------|-------|-------|
| Nao | Neutro (0) | 0 | Nao consome beneficio acumulado |
| Sim | Negativo (-) | -10 | Consome marca, buff, ou stacks. O investimento previo e gasto |

**Exemplo:** Tiro Preciso consome a marca (State 140) para obter bonus de dano. O custo inclui a acao de setup previa.

---

## 7. Regras de Balanceamento

### 7.1 Relacao Score x Tier

| Score | Tier | Papel no Kit |
|-------|------|--------------|
| 1-50 | Tier 1 | Geradores, spenders leves, utilidade basica |
| 51-100 | Tier 2 | Spenders medios, setup, utilidade moderada |
| 101-150 | Tier 3 | Spenders pesados, finishers, utilidade forte |
| 151-200 | Tier 4 | Ultimates |

### 7.2 Minimo de Negativos por Tier

| Tier | Min. Negativos | Regra |
|------|----------------|-------|
| Tier 1 | 0 | Geradores podem ser puro positivo |
| Tier 2 | 1 | Pelo menos 1 negativo em qualquer eixo |
| Tier 3 | 2 | Pelo menos 2 negativos |
| Tier 4 | 3 | Pelo menos 3 negativos em eixos diferentes (nao pode ser so custo TP) |

### 7.3 Cap de Modificadores

- Maximo de **8 modificadores positivos** por skill. Os adicionais contam com x0.5.
- Evita skills "tudo em um" que acumulam utilidade demais.

### 7.4 AoE + CC Tax

CC em AoE recebe **+50% no score do CC**. Stun em AoE e desproporcionalmente forte e deve custar proporcionalmente.

Exemplo: Stun (+25) em AoE = +25 x 1.5 = +37.5 -> +38 pts.

### 7.5 Anti-Distorcoes

- **Basica melhor que spender:** Se score da basica e >= score do spender, o spender e inutil. Revisar.
- **Multi-hit subavaliado:** Multi-hit com efeitos on-hit e amplificado (ver Secao 9). Nao subestimar.
- **CC forte com custo insuficiente:** Todo hard CC (Stun, Confusao) em Tier 2+ exige pelo menos 2 negativos em outros eixos.
- **Combos ofensivos explosivos:** Se a soma de Multiplicador + Armor Pen + Always Crit excede +80 pts no efeito, exigir pelo menos 3 negativos.
- **Suporte injustamente fraco:** Cura, buffs de aliado e limpeza ja tem pontos base mais altos que equivalentes ofensivos leves. Nao aplicar multiplicador extra — resolver na raiz.

---

## 8. Regras de Sinergia

### 8.1 Classificacao: On-hit vs Fixo

Modificadores sao divididos em dois tipos para interacao com multi-hit:

| Tipo | Modificadores | Regra com Multi-Hit |
|------|---------------|---------------------|
| **On-hit** | Life Steal, Chance Critico, Ganho TP, CC (on-hit) | Score multiplicado por hits (ver 9.1) |
| **Fixo** | Armor Pen, Unblockable, Armor Reduction, Buffs, Debuffs, Cura, Multiplicador Dano | Nao multiplicam com hits |

### 8.2 Bonus de Sinergia (Fixos)

Combinacoes de modificadores que criam valor combinado maior que a soma:

| Combinacao | Bonus | Justificativa |
|------------|-------|---------------|
| AoE + qualquer CC | +8 pts (sobre o CC) | CC em multiplos alvos e desproporcional |
| Always Critical + Crit Mult > 3.0x | +6 pts | Dano explosivo |
| Speed < 0 + Cannot Be Interrupted | Reduz negativo de Speed em 50% | Mitiga o risco do cast |
| Condicao de uso + Consome beneficio | +5 pts (sobre o negativo) | Duplo custo de recurso |

### 8.3 Modificadores On-Hit e Multi-Hit

Ver Secao 9.1 para a regra completa de multiplicacao on-hit.

---

## 9. Multi-Hit: Regras Especiais

### 9.1 Multiplicacao de Efeitos On-Hit

Quando uma skill tem multi-hit (2+ hits), os modificadores **on-hit** tem seu score amplificado:

```
Score On-Hit Amplificado = Score Base x (1 + 0.8 x (hits - 1))
```

Isso aplica diminishing returns: o primeiro hit vale 100%, o segundo 80%, o terceiro 60%, etc.

| Hits | Multiplicador Efetivo | Exemplo (Life Steal +8) |
|------|----------------------|------------------------|
| 1 | x1.0 | 8 |
| 2 | x1.8 | 14 |
| 3 | x2.6 | 21 |
| 4 | x3.4 | 27 |
| 5+ | x4.2 (cap) | 34 |

**Modificadores on-hit que amplificam:**
- Life Steal: cada hit ativa Life Steal separadamente
- Chance de Critico: cada hit rola critico separado
- Ganho de TP: cada hit pode gerar TP
- CC on-hit: cada hit pode aplicar o State (se a skill aplica CC por hit)

**Modificadores que NAO amplificam:**
- Armor Penetration: pen de 20% e a mesma em cada hit
- Unblockable: ou e Unblockable ou nao e
- Multiplicador de Dano: o dano por hit e o mesmo. O dano TOTAL ja e capturado pelo score flat do Multi-Hit
- Buffs/Debuffs fixos: aplicam uma vez, nao por hit

### 9.2 Interacao com a Formula

Na pratica, substituir o score on-hit base pelo score amplificado:

**Sem multi-hit:** Score LS 10% = +8
**Com 3 hits:** Score LS 10% = +8 x 2.6 = +21
**Com 2 hits:** Score LS 10% = +8 x 1.8 = +14

Isso SUBSTITUI o bônus de sinergia fixo — nao soma os dois.

---

## 10. Tabela Consolidada de Classificacao e Score

### 10.1 Eixo Efeito (Battle Core) — Peso x2.0

| # | Modificador | Neutro (0) | Positivo (+) | Negativo (-) | Tipo |
|---|-------------|------------|--------------|--------------|------|
| 1 | Multiplicador de Dano | 1.0x (0 pts) | +8 a +50 | -5 a -8 | Fixo |
| 2 | Armor Penetration | 0% (0 pts) | +8 a +30 | — | Fixo |
| 3 | Armor Reduction | — | — | -5 a -15 | Fixo |
| 4 | Unblockable | Nao (0 pts) | +15 | — | Fixo |
| 5 | HIT Rate | 100% (0 pts) | +5 | -5 a -10 | Fixo |
| 6 | Chance de Critico | Base (0 pts) | +8 a +15 | — | On-hit |
| 7 | Always Critical | Nao (0 pts) | +18 (cond.) / +30 (incond.) | — | Fixo |
| 8 | Mult. Critico | 3.0x (0 pts) | +8 a +12 | — | Fixo |
| 9 | Life Steal | 0% (0 pts) | +8 a +18 | — | On-hit |
| 10 | Escopo (Scope) | ST (0 pts) | +15 (AoE) | -10 (random) | Fixo |
| 11 | Quantidade de Hits | 1 (0 pts) | +12 / +18 / +22 | — | Especial |
| 12 | Crowd Control (CC) | Nao (0 pts) | +8 a +25 (x % chance) | — | On-hit |
| 13 | Interrupt | Nao (0 pts) | +10 | — | Fixo |
| 14 | Buffs ao Usuario | Nao (0 pts) | +8 a +15 (stacks x params) | — | Fixo |
| 15 | Debuffs ao Alvo | Nao (0 pts) | +8 a +18 (stacks x params) | — | Fixo |
| 16 | Debuffs ao Usuario | Nao (0 pts) | — | -8 a -15 (stacks x params) | Fixo |
| 17 | Cura Direta / Drain | Nao (0 pts) | +12 a +28 | — | Fixo |
| 18 | Buffs para Aliados | Nao (0 pts) | +15 a +25 | — | Fixo |
| 19 | Remocao de Debuffs | Nao (0 pts) | +10 a +18 | — | Fixo |

### 10.2 Eixo Tempo (ATB) — Peso x1.0

| # | Modificador | Neutro (0) | Positivo (+) | Negativo (-) |
|---|-------------|------------|--------------|--------------|
| 1 | Speed / Cast Time | 0 (0 pts) | +5 a +10 | -5 a -45 |
| 2 | After Gauge | 0% (0 pts) | +5 a +8 | -5 a -25 |
| 3 | Cannot Be Interrupted | Nao (0 pts) | +10 | — |
| 4 | Interruptivel (risco) | Nao (0 pts) | — | -8 |

### 10.3 Eixo Recurso (TP System) — Peso x1.0

| # | Modificador | Neutro (0) | Positivo (+) | Negativo (-) |
|---|-------------|------------|--------------|--------------|
| 1 | Custo de TP | 0 (0 pts) | — | -5 a -45 |
| 2 | Ganho de TP | 0 (0 pts) | +5 a +10 | — |
| 3 | Condicao de Uso | Nenhuma (0 pts) | — | -8 a -18 |
| 4 | Consome Beneficio | Nao (0 pts) | — | -10 |

---

## 11. Exemplos Praticos de Classificacao e Score

### 11.1 Passo de Brisa (Filena) — Gerador Basico, Tier 1

| Modificador | Valor | Classificacao | Score Base | Peso Eixo | Score Liquido |
|-------------|-------|---------------|------------|-----------|---------------|
| Multiplicador | 1.0x | Neutro | 0 | x2 | 0 |
| Speed | +1000 | Positivo | +8 | x1 | +8 |
| Ganho TP | +10 | Positivo | +8 | x1 | +8 |
| Escopo | ST | Neutro | 0 | x2 | 0 |
| HIT | 100% | Neutro | 0 | x2 | 0 |
| Armor Pen | 0% | Neutro | 0 | x2 | 0 |

**Calculo:** 0 + 8 + 8 + 0 + 0 + 0 = **16**
**Tier 1** (1-50) — Gerador de recurso rapido com dano padrao. Correto para seu papel.

---

### 11.2 Estocada Relampago (Filena) — Spender Medio, Tier 2

| Modificador | Valor | Classificacao | Score Base | Peso Eixo | Score Liquido |
|-------------|-------|---------------|------------|-----------|---------------|
| Multiplicador | 1.5x | Positivo | +20 | x2 | +40 |
| Armor Pen | 20% | Positivo | +12 | x2 | +24 |
| Chance Critico | +20% | Positivo | +12 | x2 | +24 |
| Speed | -500 | Negativo | -10 | x1 | -10 |
| Custo TP | -20 | Negativo | -15 | x1 | -15 |
| Escopo | ST | Neutro | 0 | x2 | 0 |

**Calculo:** 40 + 24 + 24 - 10 - 15 + 0 = **63**
**Tier 2** (51-100) — Spender medio com burst condicional via critico. Custo TP moderado e cast curto como contrapeso.

---

### 11.3 Execucao (Mhordred) — Finisher, Tier 3

| Modificador | Valor | Classificacao | Score Base | Peso Eixo | Score Liquido |
|-------------|-------|---------------|------------|-----------|---------------|
| Multiplicador | 3.5x | Positivo alto | +45 | x2 | +90 |
| Armor Pen | 50% | Positivo alto | +25 | x2 | +50 |
| Unblockable | Sim | Positivo | +15 | x2 | +30 |
| Always Critical | Condicional (State 140) | Positivo | +18 | x2 | +36 |
| Life Steal | 20% | Positivo | +12 | x2 | +24 |
| Speed | -2000 | Negativo alto | -35 | x1 | -35 |
| After Gauge | -40% | Negativo alto | -18 | x1 | -18 |
| Custo TP | -50 | Negativo alto | -35 | x1 | -35 |
| Consome Marca | Sim | Negativo | -10 | x1 | -10 |
| Sinergia: Always Crit + Crit (1) | — | Bonus | +6 | x2 | +12 |

**Calculo:** 90 + 50 + 30 + 36 + 24 + 12 - 35 - 18 - 35 - 10 = **144**
**Tier 3** (101-150) — Finisher pesado com alto custo em todos os eixos. 5 positivos altos vs 4 negativos altos. Requer setup (marca) para full power.

---

### 11.4 Golpe Atordoante — Dano + Stun, Tier 1

Skill generica de guerreiro que causa dano padrao e atordoa o alvo.

| Modificador | Valor | Classificacao | Score Base | Peso Eixo | Score Liquido |
|-------------|-------|---------------|------------|-----------|---------------|
| Multiplicador | 1.0x | Neutro | 0 | x2 | 0 |
| Stun | Sim, 100%, 2 turnos | Positivo | +25 | x2 | +50 |
| Speed | 0 | Neutro | 0 | x1 | 0 |
| Custo TP | 0 | Neutro | 0 | x1 | 0 |

**Calculo:** 0 + 50 + 0 + 0 = **50**
**Tier 1 alto** — Sem dano extra, sem custo. O unico poder e o Stun. Utilidade pura: o jogador escolhe entre esta skill (controle) ou um gerador (dano + TP).

**Para elevar a Tier 2:**
Adicionar Multiplicador 1.3x (+10x2=+20) e Custo TP -15 (-10):

| Modificador Novo | Score Liquido |
|------------------|---------------|
| Multiplicador 1.3x | +20 |
| Custo TP -15 | -10 |

**Novo total:** 50 + 20 - 10 = **60** — Tier 2. Spender medio com dano + CC, agora com custo de recurso.

---

### 11.5 Golpe Triplo — Multi-Hit, Tier 1 -> Tier 2 -> Ultimate

**Tier 1 (Gerador):**

| Modificador | Valor | Score Base | Peso Eixo | Score Liquido |
|-------------|-------|------------|-----------|---------------|
| Multiplicador | 1.0x | 0 | x2 | 0 |
| 2 hits | Sim | +12 | x2 | +24 |
| Speed | 0 | 0 | x1 | 0 |
| Custo TP | 0 | 0 | x1 | 0 |

**Calculo:** 0 + 24 + 0 + 0 = **24** — Tier 1. Dois hits de dano padrao sem custo. Gera mais triggers de TP, mas sem burst.

**Tier 2 (Spender Medio):**
Adicionar Multiplicador 1.3x, Crit Chance +15%, Custo TP -12:

| Modificador | Score Base | Peso Eixo | Score Liquido |
|-------------|------------|-----------|---------------|
| Multiplicador 1.3x | +10 | x2 | +20 |
| 2 hits | +12 | x2 | +24 |
| Crit Chance +15% (on-hit, 2 hits) | +8 x 1.8 = +14 | x2 | +28 |
| Custo TP -12 | -8 | x1 | -8 |

**Calculo:** 20 + 24 + 28 - 8 = **64** — Tier 2. Spender com multi-hit + crit chance amplificado por hits. Sinergia natural.

**Como Ultimate (Tier 4):**

| Modificador | Valor | Score Base | Peso Eixo | Score Liquido |
|-------------|-------|------------|-----------|---------------|
| Multiplicador | 2.5x | +35 | x2 | +70 |
| 3 hits | Sim | +18 | x2 | +36 |
| Always Critical | Condicional (marca) | +18 | x2 | +36 |
| Life Steal | 20% | +12 x 2.6 (on-hit, 3 hits) = +31 | x2 | +62 |
| Unblockable | Sim | +15 | x2 | +30 |
| AoE | Sim | +15 | x2 | +30 |
| Speed | -2000 | -35 | x1 | -35 |
| After Gauge | -40% | -18 | x1 | -18 |
| Custo TP | -55 | -40 | x1 | -40 |
| Consome Marca | Sim | -10 | x1 | -10 |
| Sinergia: AoE + CC (2) | — | — | — | — |

**Calculo:** 70 + 36 + 36 + 62 + 30 + 30 - 35 - 18 - 40 - 10 = **161**
**Tier 4** — Ultimate com multi-hit em AoE, crit condicional, life steal amplificado por hits, Unblockable. Alto custo em todos os eixos: cast longo, after gauge severo, TP massivo, consome marca. Precisa de setup completo para full power.

---

### 11.6 Manto Purificador — Remove Sangramento, Tier 1 -> Tier 2

**Tier 1 (Utilidade Basica):**

| Modificador | Valor | Score Base | Peso Eixo | Score Liquido |
|-------------|-------|------------|-----------|---------------|
| Remocao debuffs (sangramento) | 1 especifico | +10 | x2 | +20 |
| Speed | 0 | 0 | x1 | 0 |
| Custo TP | 0 | 0 | x1 | 0 |

**Calculo:** 20 + 0 + 0 = **20** — Tier 1. Utilidade defensiva pura. Remove sangramento sem custo. Skill reativa — usada quando alguem esta sangrando.

**Para Tier 2 (Suporte Forte):**
Adicionar Cleanse completo (+18x2=+36), Cura Leve 15% (+12x2=+24), Custo TP -15 (-10):

| Modificador | Score Base | Peso Eixo | Score Liquido |
|-------------|------------|-----------|---------------|
| Cleanse (todos debuffs) | +18 | x2 | +36 |
| Cura Leve 15% HP | +12 | x2 | +24 |
| Custo TP -15 | -10 | x1 | -10 |

**Novo total:** 36 + 24 - 10 = **50** — Tier 1 alto. Para chegar a Tier 2, adicionar buff leve:

| Modificador Extra | Score Base | Peso Eixo | Score Liquido |
|-------------------|------------|-----------|---------------|
| Buff aliado (DEF 1 stack/+25%, 1 aliado) | +15 | x2 | +30 |

**Novo total:** 50 + 30 = **80** — Tier 2. Skill de suporte completa que limpa debuffs, cura e buffa. Spender de suporte com custo de TP.

---

### 11.7 Sopro Venenoso — CC com Chance Parcial, Tier 1

Skill que causa dano leve com 30% de chance de envenenar o alvo.

| Modificador | Valor | Score Base | Peso Eixo | Score Liquido |
|-------------|-------|------------|-----------|---------------|
| Multiplicador | 1.0x | 0 | x2 | 0 |
| Poison | 30% chance | +8 x 0.3 = +2 | x2 | +4 |
| Speed | 0 | 0 | x1 | 0 |
| Custo TP | 0 | 0 | x1 | 0 |

**Calculo:** 0 + 4 + 0 + 0 = **4** — Tier 1 baixissimo. Dano padrao com CC fraco e incerto. Correto: 30% de poison e utilidade marginal.

**Se Poison fosse 100% chance:** +8 x 2 = +16 total. Tier 1 medio. A diferenca de % chance e significativa no score.

---

## 12. Notas sobre Interacoes entre Modificadores

Alguns modificadores amplificam ou mitigam outros:

1. **Multi-hit + Life Steal:** Cada hit ativa life steal -> on-hit amplificado (ver Secao 9.1)
2. **Multi-hit + Chance Critico:** Cada hit rola critico -> on-hit amplificado (ver Secao 9.1)
3. **AoE + Custo TP alto:** Custo mais justificavel porque afeta multiplos alvos
4. **Speed negativo + Cannot Be Interrupted:** Mitiga o risco do cast time -> negativo de tempo reduzido em 50% (ver Secao 8.2)
5. **Always Critical + Multiplicador Critico alto:** Combinacao de dano extremo -> +6 pts sinergia
6. **Condicao de uso + Consome beneficio:** Duplo negativo de recurso -> payoff deve ser muito alto
7. **Armor Reduction + Life Steal:** Sacrifica DEF mas recupera HP -> risk/reward direto

---

## 13. Checklist de Validacao de Skill

Ao criar ou validar uma skill, preencher:

```
Skill: [nome]
Personagem: [nome]
Tipo: [Basica / Spender / Finisher / Setup / Reativa / Suporte / Conversao]

EIXO EFEITO (x2):
[ ] Multiplicador de Dano: [valor] -> Score: [N]
[ ] Armor Penetration: [valor] -> Score: [N]
[ ] Armor Reduction: [valor] -> Score: [N]
[ ] Unblockable: [sim/nao] -> Score: [N]
[ ] HIT Rate: [valor] -> Score: [N]
[ ] Chance Critico: [valor] -> Score: [N] (on-hit: sim/nao)
[ ] Always Critical: [sim/condicional/nao] -> Score: [N]
[ ] Mult. Critico: [valor] -> Score: [N]
[ ] Life Steal: [valor] -> Score: [N] (on-hit: sim/nao)
[ ] Escopo: [ST/AoE/Random] -> Score: [N]
[ ] Multi-Hit: [1/2/3/4+] -> Score: [N]
[ ] CC: [tipo, %chance, duracao] -> Score: [N] (on-hit: sim/nao)
[ ] Interrupt: [sim/nao] -> Score: [N]
[ ] Buffs ao Usuario: [stacks x params] -> Score: [N]
[ ] Debuffs ao Alvo: [stacks x params] -> Score: [N]
[ ] Debuffs ao Usuario: [stacks x params] -> Score: [N]
[ ] Cura Direta: [valor] -> Score: [N]
[ ] Buffs para Aliados: [tipo, alvo] -> Score: [N]
[ ] Remocao Debuffs: [tipo] -> Score: [N]

Subtotal Efeito: [N] x 2 = [N x2]

EIXO TEMPO (x1):
[ ] Speed/Cast Time: [valor] -> Score: [N]
[ ] After Gauge: [valor] -> Score: [N]
[ ] Cannot Be Interrupted: [sim/nao] -> Score: [N]
[ ] Interruptivel: [sim/nao] -> Score: [N]

Subtotal Tempo: [N]

EIXO RECURSO (x1):
[ ] Custo TP: [valor] -> Score: [N]
[ ] Ganho TP: [valor] -> Score: [N]
[ ] Condicao de Uso: [tipo] -> Score: [N]
[ ] Consome Beneficio: [sim/nao] -> Score: [N]

Subtotal Recurso: [N]

SINERGIAS:
[ ] Multi-hit x On-hit: [detalhar] -> Bonus: [N]
[ ] AoE + CC: [detalhar] -> Bonus: [N]
[ ] Always Crit + Crit Mult: [detalhar] -> Bonus: [N]
[ ] Speed < 0 + Cannot Be Interrupted: [detalhar] -> Bonus: [N]
[ ] Condicao + Consome: [detalhar] -> Bonus: [N]

Subtotal Sinergias: [N]

SCORE FINAL: [Efeito x2] + [Tempo] + [Recurso] + [Sinergias] = [TOTAL]
TIER: [1/2/3/4]

VALIDACAO:
[ ] Min. negativos por tier atendido? [sim/nao]
[ ] Max. 8 positivos? [sim/nao]
[ ] Nenhuma anti-distorcao violada? [sim/nao]
```

---

## 14. Proximos Passos

1. Aplicar este sistema de score a todas as skills existentes dos 4 personagens
2. Validar se as skills estao nos tiers corretos conforme DIRETRIZES
3. Ajustar pesos ou pontos base se playtests revelarem distorcoes
4. Usar o checklist (Secao 13) como template obrigatorio para novas skills

---

**Fim do Documento de Classificacao e Score de Modificadores**

[[DIRETRIZES-DESIGN-COMBAT-SYSTEM#4.6 Checklist de Aprovação — Skill|Checklist qualitativo de aprovação de skill]]
[[FUNDAMENTOS-COMBAT-SYSTEM#8. Fundamentos de Balanceamento|Fundamentos de balanceamento]]
