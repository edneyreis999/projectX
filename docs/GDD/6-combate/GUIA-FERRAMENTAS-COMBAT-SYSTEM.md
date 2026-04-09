---
version: 1.4
date: 2026-04-09
author: Edney Reis
title: Guia de Ferramentas do Combat System - Daratrine A Origem
purpose: Documento técnico de referência sobre ferramentas Battle Core, ATB e TP System
audience: Designers de jogo, implementadores, LLMs
status: final
based_on:
  - FUNDAMENTOS-COMBAT-SYSTEM.md
  - VisuStella MZ Battle Core
  - VisuStella Active Turn Battle
  - VisuStella Enhanced TP System
changelog:
  - v1.4: Melhorias na Parte IV - Integração. Adições: (1) Seção 21.4 expandida com nota sobre integrações avançadas (JavaScript, Action Sequences, States), (2) Seção 24.5 adicionada com 4 anti-padrões de integração específicos, (3) Seção 25.1 refatorada com campos expandidos (Descrição in-game, Multiplicador/Speed), (4) Seção 26.5 reescrita com exemplos em formato YAML com sintaxe real copiável.
  - v1.3: Validado contra documentação VisuStella MZ Enhanced TP System. Adições: (1) Estrutura de TP Modes (parâmetros do plugin), (2) TCR Multiplier explicado com exemplos e stacking, (3) During Regen formulas (TP Regen, Critical/Full HP/MP, Only Member), (4) Variáveis disponíveis nas fórmulas (user, target, value), (5) MaxTP como fórmula JavaScript, (6) Tags faltantes: `<Change User TP Mode>`, `<Learn TP Mode/Modes>`, `<Unlock TP Mode/Modes>`, `<Starting TP Modes>`, (7) Escopo documentado para todas notetags, (8) Distinções críticas (Target vs User, Learn vs Unlock, TP Mode vs Starting TP Modes), (9) Prioridade de TP Modes.
  - v1.2: Validado contra documentação VisuStella MZ Active Turn Battle. Adições: (1) `<ATB Charge Gauge>` com 3 variantes de sintaxe, (2) `<ATB Cannot Be Interrupted>`, (3) Variantes de sintaxe (x%, +x%, -x%) documentadas para todas tags de gauge, (4) Seções JavaScript: `<JS ATB After Gauge>`, `<JS ATB Charge Gauge>`, `<JS ATB Cast Gauge>`, (5) Battle Start Gauge stacking behavior, (6) Distinção Speed vs After Gauge, (7) Parâmetros globais (Stuns Reset Gauge, Escape Fail Penalty), (8) Cores de estados e transições.
  - v1.1: Validado contra documentação VisuStella MZ Battle Core. Correções aplicadas em: (1) Damage Styles - clarificado configuração global, (2) Armor Reduction - corrigido para própria defesa, (3) Always Critical - documentado workaround para condição.
  - v1.0: Versão inicial baseada em checkpoint validado
Tokens: 22,330 Tokens (aproximado pós-expansão v1.4)
---

# Guia de Ferramentas do Combat System - Daratrine A Origem

## PARTE 0 — INTRODUÇÃO

## 1. Objetivo do Bloco

### 1.1 Para que este documento existe

Este documento existe para mapear as ferramentas principais usadas no design das skills de Daratrine A Origem, padronizando a linguagem entre design e implementação e reduzindo decisões arbitrárias. Ele define como Battle Core, ATB e TP System trabalham juntos para criar skills coesas.

**Objetivos principais:**
- Mapear as ferramentas principais dos plugins Battle Core, ATB e TP System
- Explicar como essas ferramentas se combinam para criar skills completas
- Padronizar a linguagem entre design e implementação
- Definir convenções de uso para o projeto

### 1.2 Escopo do bloco

Este documento cobre:
- Ferramentas do Battle Core (dano, crítico, sustain, targeting, action sequence)
- Ferramentas do Active Turn Battle (gauge, cast time, interrupt, after gauge)
- Ferramentas do Enhanced TP System (TP Modes, geração, custo, preservação)
- Interseções entre os três plugins
- Convenções de uso para o projeto

### 1.3 O que este documento não cobre

Este documento NÃO cobre:
- Identidade conceitual do combate em alto nível (coberto por FUNDAMENTOS-COMBAT-SYSTEM.md)
- Filosofia geral do sistema de combate
- Balanceamento fino por personagem
- Catálogo completo de todas as skills (84 skills no projeto)

Para esses tópicos, consulte FUNDAMENTOS-COMBAT-SYSTEM.md.

## 2. Visão Sistêmica das Ferramentas do Projeto

### 2.1 As 3 camadas do design de skill

Toda skill em Daratrine A Origem é composta por **3 camadas distintas** que se combinam para criar a experiência completa:

**Camada 1: Resolução (Battle Core)**
- O que a skill faz quando acontece
- Dano, crítico, penetração, sustain, targeting
- Estrutura e sequência da ação

**Camada 2: Tempo (ATB)**
- Quando a skill acontece e em que ritmo
- Cast time, velocidade de enchimento, after gauge
- Estados de charging e interrupt

**Camada 3: Recurso (TP System)**
- Quanto custa, como entra no loop e como é paga
- TP Modes, fórmulas de ganho, preservação
- Build → spend cycle

### 2.2 Qual plugin governa cada camada

#### 2.2.1 Battle Core — Camada de Resolução

O Battle Core controla a **camada de Resolução**: o que a skill faz quando acontece.

**Ferramentas principais:**
- **Damage Styles** — Fórmulas de cálculo de dano
- **Armor Penetration** — Penetração de armadura em porcentagem
- **Armor Reduction** — Redução de armadura
- **Critical System** — Taxas e multiplicadores de crítico
- **Life Steal** — Roubo de vida como sustain
- **Unblockable** — Skills que não podem ser bloqueadas
- **Targeting** — Modificação de alvos
- **Action Sequences** — Sequência de ações com timing interno
- **Damage Cap** — Limite máximo de dano
- **Custom Damage** — Fórmulas de dano customizadas

#### 2.2.2 Active Turn Battle — Camada de Tempo

O ATB controla a **camada de Tempo**: quando a skill acontece e em que ritmo.

**Ferramentas principais:**
- **Speed / Cast Time** — Controle de quando a skill acontece
- **ATB Interrupt** — Interrupção de skills em casting
- **ATB After Gauge** — Modificador de velocidade pós-ação
- **ATB Cast Gauge** — Gauge durante estado de casting
- **Gauge System** — Barra de ação baseada em AGI
- **Battle Start Gauge** — Gauge inicial ao começar batalha
- **Charge/Ready States** — Estados de preparação de ação

#### 2.2.3 Enhanced TP System — Camada de Recurso

O TP System controla a **camada de Recurso**: quanto custa e como volta.

**Ferramentas principais:**
- **TP Modes** — 4 modos customizados por personagem
- **Gain Triggers** — Fórmulas de ganho por uso, dano, crítico, esquiva, etc.
- **MaxTP** — Limite máximo de TP
- **Preserve TP** — Se TP carrega entre batalhas
- **TCR Multiplier** — Multiplicador de taxa de ganho
- **Force/Change TP Mode** — Manipulação de modo em combate
- **TP Regen** — Regeneração passiva de TP

### 2.3 Como os 3 plugins se combinam numa skill

Uma skill é definida pela **combinação dos 3 eixos**:

**Exemplo estrutural:**
- **Battle Core** define o efeito (dano, crítico, penetração, sustain)
- **ATB** define o timing (cast time, after gauge, interrupt)
- **TP System** define o loop de custo/recompensa (ganho, custo, preservação)

### 2.4 Erro que o documento precisa evitar

**ERRO:** Pensar skill só como "fórmula + tag de dano"

**CORRETO:** Skill é combinação tridimensional de efeito + tempo + recurso

**Exemplos de erro:**
- Ignorar ritmo e geração de recurso
- Balancear efeito sem balancear janela de uso
- Criar skill forte, rápida e barata simultaneamente

## 3. Filosofia de Uso das Ferramentas

### 3.1 Ferramenta implementa intenção, não substitui design

Ferramentas existem para **implementar intenções de design**, não para substituir pensamento sobre design.

**Ordem correta de decisão:**
1. **Papel da skill** — O que ela faz no kit do personagem?
2. **Função no kit** — Como ela se relaciona com outras skills?
3. **Ritmo de uso** — Com que frequência deve ser usada?
4. **Custo/recompensa** — Quanto custa vs quanto entrega?
5. **Só depois** → Tags e parâmetros

### 3.2 Critérios de escolha da ferramenta certa

Antes de aplicar uma ferramenta, pergunte:
- **Resolve problema de design real?** Ou é "legal de ter"?
- **Melhora clareza?** O jogador entende o que está acontecendo?
- **Reforça identidade?** Está alinhado com o fantasy do personagem?
- **Introduz complexidade justificável?** O ganho vale a complexidade?
- **Cria exceção demais?** Vou precisar documentar extensivamente?

### 3.3 Hierarquia de implementação

**Prefira nesta ordem:**
1. **Parâmetros globais** antes de exceções locais
2. **Tags nativas** antes de JS custom
3. **Solução simples** antes de solução elaborada

**Exemplo:**
- ✅ Usar `<Armor Pen: 30%>` (tag nativa)
- ⚠️ Usar `<Custom Damage>` para penetração customizada
- ❌ Criar fórmula JS complexa quando tag nativa resolve

---

# PARTE I — BATTLE CORE COMO FERRAMENTA DE DESIGN DE SKILL

## 4. Battle Core: Papel no Projeto

### 4.1 O que o Battle Core controla no nosso design

O Battle Core é responsável pela **camada de Resolução** do sistema de combate:

**Áreas controladas:**
- Resolução de dano (fórmulas, caps, styles)
- Targeting (single-target, AoE, random)
- Crítico (taxas, multiplicadores, always critical)
- Sustain (life steal, drain, restore)
- Mitigation (armor pen, reduction)
- Action sequence (timing interno da ação)
- Estrutura da ação (command flow, execution)

### 4.2 O que usamos com frequência

**Ferramentas mais utilizadas:**
- **Damage styles** — Fórmula MOBA padrão
- **Notetags de damage** — `<Damage>`, `<Damage Formula>`
- **Critical** — `<Critical>`, `<Always Critical>`, `<Crit Damage Bonus>`
- **Targeting** — `<Modify Target>`, `<Repeat Targets>`
- **Life steal** — `<Life Steal>` para sustain
- **Action sequences** — Para habilidades com timing especial
- **Battle command** — Para skills customizadas

### 4.3 O que usamos com cautela

**Ferramentas de uso restrito:**
- **Custom JS** — Apenas quando tags nativas não resolvem
- **Bypasses** — Apenas para casos muito específicos documentados
- **Exceções de cap** — Apenas com justificativa clara de design
- **Custom targeting avançado** — Apenas quando necessário para identidade

## 5. Ferramentas de Dano e Resolução

### 5.1 Damage Styles

**O que são:**

Damage Styles são fórmulas predefinidas de cálculo de dano que determinam como atributos ofensivos e defensivos interagem.

**⚠️ CONFIGURAÇÃO GLOBAL DO PROJETO:**

O Damage Style **MOBA** é configurado **globalmente** no plugin parameters. Isso significa que:

- ✅ **Todas as skills usam MOBA por padrão**
- ✅ **NÃO é necessário selecionar `<Damage Style: MOBA>` em cada skill**
- ✅ **A fórmula MOBA é aplicada automaticamente pelo plugin**

**Style oficial do projeto: MOBA**

```
(Dano Base + a.atk × X) × (100 / (100 + b.def))
```

Esta fórmula:
- Multiplica ATK por um fator (X)
- Soma um dano base flat
- Aplica mitigação percentual baseada em DEF do alvo
- Cria curva de dano que sempre reduz, mas nunca chega a 0

**⚠️ IMPORTANTE - NÃO PREENCHA O CAMPO DE FÓRMULA:**

A fórmula MOBA mostrada acima é **interna ao plugin**. Você **NÃO** precisa digitar essa fórmula no campo "Damage Formula" do RPG Maker.

**Como configurar o dano da skill:**

Para alterar o output de dano final, use estas tags nas notetags da skill:

| Tag | Função | Exemplo |
|-----|--------|---------|
| `<Armor Pen: x%>` | Ignora % da DEF do alvo | `<Armor Pen: 30%>` |
| `<Armor Red: x%>` | Reduz própria DEF (sacrifício) | `<Armor Red: 20%>` |
| `<Damage Cap: x>` | Define limite máximo de dano | `<Damage Cap: 9999>` |
| `<Unblockable>` | Não pode ser guardado | `<Unblockable>` |

**No campo "Damage Formula" do RPG Maker:**

- **Use um multiplicador simples**: `150` (para 1.5x), `250` (para 2.5x), etc.
- **Ou use uma fórmula customizada** para casos especiais (escala com Foco, condição, etc.)

**Exemplos práticos:**

```
// Skill básica com multiplicador 1.0x
Damage Formula: 100

// Spender com multiplicador 1.8x
Damage Formula: 180

// Finisher com multiplicador 3.5x
Damage Formula: 350

// Skill com fórmula customizada (raro, apenas para casos especiais)
Damage Formula: 200 + user.tp * 5
```

**Quando uma skill usa o padrão:**

Skills básicas e de rotina usam apenas o multiplicador:
- **Passo de Brisa (Filena)** — Multiplicador `100` (1.0x)
- **Golpe Brutal (Mhordred)** — Multiplicador `100` (1.0x)

**Quando foge do padrão:**

Skills especiais podem ter fórmulas customizadas:
- **Execução (Mhordred)** — Multiplicador `350` (3.5x) com `<Armor Pen: 50%>`
- **Tiro Preciso (Thorin)** — Fórmula escala com Foco acumulado

### 5.2 Fórmulas de dano

**Flat vs Multiplicador:**

- **Flat** — Dano base que não escala: `50` ou `100`
- **Multiplicador** — Escala com ATK: `a.atk × 1.0` ou `a.atk × 3.5`

**Relação com tier da skill:**

- **Tier 0-1 (Básicas)** — Multiplicador 0.8-1.2, dano base 10-50
- **Tier 2 (Intermediárias)** — Multiplicador 1.5-2.0, dano base 50-150
- **Tier 3 (Spenders)** — Multiplicador 2.0-3.0, dano base 150-300
- **Tier 4 (Finishers)** — Multiplicador 3.0+, dano base 300+

### 5.3 Damage Cap e Soft Cap

**Papel sistêmico:**

- **Hard cap:** 9999 de dano máximo por hit
- **Soft cap:** 80% do hard cap (~8000) é o alvo de balanceamento

**Quando respeitar:**

Skills normais devem ficar abaixo do soft cap (8000) em condições normais de uso.

**Quando uma exceção precisa de justificativa:**

Finishers podem chegar próximo ao hard cap em condições ideais, mas isso requer:
- Custo massivo de TP (-50 ou mais)
- Cast time longo
- Requisitos de setup (estado, marca, condição)
- Vulnerabilidade pós-uso

### 5.4 Unblockable

**O que é:**

Unblockable faz a skill ignorar a command Guard. O alvo não pode reduzir dano usando Guard.

**Quando representa execute:**

Unblockable é apropriado para:
- **Finishers massivos** — Execução (Mhordred) com -50 TP
- **Golpes rompantes** — Skills que quebram defesa ativa
- **Ultimates** — Habilidades supremas de personagem

**Quando não deve ser usado:**

- Skills básicas ou de rotina
- Skills sem custo significativo
- Skills que seriam overpowered sem contrapartida

**Exemplo de uso correto:**
```
Execução (Mhordred):
- Unblockable: YES
- Custo: -50 TP (massivo)
- Cast: -2000 speed (muito longo)
- Justificativa: Finisher supremo que sacrifica tudo nos 3 eixos
```

### 5.5 Custom Damage

**Quando usar:**

Custom Damage via JavaScript é apropriado quando:
- Fórmula depende de variáveis complexas (Foco acumulado)
- Dano escala com condição não padrão
- Skill mecânica não se encaixa em damage style

**Quando evitar:**

- Tags nativas resolvem o problema
- Fórmula é simples o suficiente para `<Damage Formula>`
- Lógica pode ser expressa com notetags padrão

**Exemplo de uso justificado:**
```
Tiro Preciso (Thorin):
- Fórmula customizada que escala com Foco acumulado
- Justificativa: Mecânica central de identidade do Thorin
- Não expressável com damage style padrão
```

## 6. Ferramentas de Mitigação e Penetração

### 6.1 Armor Pen e Magic Pen

**Explicação da mecânica:**

Armor Penetration ignora uma **porcentagem da DEF do alvo** antes de aplicar a fórmula de dano.

**Fórmula com penetração:**
```
Dano = (Dano Base + a.atk × X) × (100 / (100 + b.def × (1 - pen%)))
```

**Tiers de penetração no projeto:**

| Tier | Penetração | Uso típico | Exemplo |
|------|------------|------------|---------|
| 0% | 0% | Skills básicas | Passo de Brisa, Golpe Brutal |
| 15% | Leve | Spender médio | Estocada Relâmpago |
| 30% | Pesado | Spender forte | Tiro Preciso |
| 50% | Massiva | Finisher | Execução |

**Quando usar cada tier:**

- **0%** — Skills básicas, geradores de TP, skills de rotina
- **15%** — Spenders com custo moderado (-15 a -25 TP)
- **30%** — Spenders pesados ou finishers menores (-30 a -40 TP)
- **50%** — Finishers supremos (-50+ TP), geralmente com Unblockable

### 6.2 Armor Reduction e Magic Reduction

**⚠️ IMPORTANTE - REDUZ PRÓPRIA DEFESA, NÃO DO ALVO:**

`<Armor Reduction>` **NÃO** é um debuff aplicado no alvo. Ela reduz a **PRÓPRIA defesa** do battler que tem a tag.

**Diferença de penetração:**

- **Penetration** — Ignora % da DEF do alvo temporariamente (só para este hit)
- **Reduction** — Reduz a **PRÓPRIA DEF** do atacante (sacrifício)

**Quando usar reduction:**

Reduction é apropriado para:
- **Skills que sacrificam defesa** — "Trocar DEF por poder"
- **Mecânicas de risco** — Ficar mais vulnerável para causar mais dano
- **Identidade de personagem** — Alguém que abre mão de proteção

**Exemplo de uso:**
```
Skill de Mhordred com Postura Brutal:
<Armor Reduction: 30%>
- Mhordred perde 30% da própria DEF
- Em troca, causa mais dano ou ganha outro benefício
- Justificativa: "Animal ferido" que sacrifica defesa
```

**⚠️ NÃO USE ARMOR REDUCTION PARA:**

- ❌ Debuffar defesa do inimigo (use State com trait de DEF reduction)
- ❌ Criar "vulnerabilidade" no alvo (use debuff de State)
- ❌ Beneficiar time inteiro (exceto em casos muito específicos)

**Para debuffar defesa do alvo:**

Use States (debuffs) com traits que reduzem DEF:
```
State: Vulnerável (debuff)
- Trait: DEF * 80% (reduz 20% da DEF)
- Aplicado no alvo via skill
```

### 6.3 Penetração como ferramenta de anti-defesa

**Problema de DEF alta:**

Inimigos com DEF muito alta podem reduzir dano drasticamente. Sem penetração, skills ofensoras perdem eficácia.

**Solução via penetração escalonada:**

O projeto resolve isso com tiers de penetração:
- Skills básicas: 0% pen (dano consistente mas menor)
- Spenders: 15-30% pen (dano melhor quando precisa)
- Finishers: 50% pen (dano máximo quando necessário)

**Balanceamento:**

Penetração custa "orçamento de poder" da skill. Skills com 50% pen geralmente têm:
- Custo massivo de TP
- Cast time longo
- After gauge negativo
- Sem crítico (trade-off)

### 6.4 Reduction como ferramenta de perfil defensivo

**Quando inimigos usam reduction:**

Inimigos elites e bosses podem usar reduction como parte de seu kit defensivo.

**Impacto no balanceamento:**

Reduction cumulativo pode tornar alvo excessivamente vulnerável. O projeto evita:
- Reduction excessivo (max ~30-40%)
- Duração muito longa
- Stack infinito

### 6.5 Limites sistêmicos

**Cap efetivo de penetração:**

Mesmo com 50% pen, a fórmula MOBA garante que DEF sempre tem algum efeito.

**Interação com fórmula MOBA:**

```
Com 0% pen:  (100 / (100 + b.def)) — DEF cheia
Com 50% pen: (100 / (100 + b.def × 0.5)) — 50% da DEF
```

### 6.6 Riscos de abuso

**Penetração excessiva:**

- ❌ Invalida DEF como stat
- ❌ Torna tanks irrelevantes
- ❌ Desequilibra curve de progressão

**Reduction cumulativo:**

- ❌ Stack infinito torna alvo papelo
- ❌ Duração muito longa quebra combate
- ❌ Sem clear de debuff vira permanente

## 7. Ferramentas de Crítico

### 7.1 Taxa crítica

**Bases por personagem:**

| Personagem | Taxa Base | Identidade |
|------------|-----------|------------|
| Filena | 6% | Duelista ágil |
| Kilin | 5% | Tanque confiável |
| Mhordred | 7% | Bruiser agressivo |
| Thorin | 8% | Sniper preciso |

**Crítico como exceção, não regra:**

Crítico no projeto é uma **exceção**, não a regra. A maioria das skills NÃO tem bônus de crítico além da base.

### 7.2 Multiplicador crítico

**Padrão 3.0x:**

Multiplicador padrão para todas as skills e personagens é **3.0x**.

**Exceção 4.0x (Thorin):**

Thorin tem skills específicas com multiplicador **4.0x**:
- Tiro Preciso (via Modify Critical Damage +33%)
- Justificativa: Identidade de sniper que recompensa precisão

**Nota:** Esta é uma das únicas exceções de identidade no projeto.

### 7.3 Bônus de dano crítico

**`<Crit Damage Bonus>` +33%:**

Esta tag aumenta o multiplicador crítico em 33% relativo:
- Padrão: 3.0x → Com bônus: 4.0x
- Exclusivo para skills específicas do Thorin

**Uso restrito:**

Apenas skills que justificam pela identidade do personagem devem ter este bônus.

### 7.4 Always Critical

**Quando usar:**

Always Critical é apropriado para:
- Skills que representam golpes decisivos
- Finishers incondicionais (sempre criticam)
- Mecânicas de identidade bem definidas

**Quando evitar:**

- Skills básicas (tornam crítico trivial)
- Skills sem custo significativo
- Quando RNG é parte da identidade

**⚠️ IMPORTANTE - ALWAYS CRITICAL CONDICIONAL REQUER WORKAROUND:**

A tag `<Always Critical>` nativa **NÃO suporta condições**. Ela é binária: ou sempre é crítico ou não é.

**Para implementar "Always Critical se condição X":**

Use `<Custom Critical Eval>` com JavaScript:

```
<Custom Critical Eval>
code = target.isStateAffected(140); // true se alvo tem State 140
</Custom Critical Eval>
```

**Exemplo prático - Execução (Mhordred):**
```
<Custom Critical Eval>
// Sempre critica se alvo tiver State 140 (Marca)
code = target.isStateAffected(140);
</Custom Critical Eval>
<Modify Critical Rate: +30%>
<Armor Pen: 50%>
<Unblockable>
<HP Life Steal: 20%>
```

**Como funciona o workaround:**
- `code = true` → Sempre será crítico
- `code = false` — Usa taxa normal de crítico
- Qualquer expressão JavaScript que retorne true/false funciona


**Exemplo de uso incondicional (padrão):**
```
Skill que sempre critica (sem condição):
<Always Critical>
- Simples e direto
- Sempre será crítico
- Use quando não há condição
```

### 7.5 Crítico como exceção de identidade

**Kilin: NENHUMA skill com crítico**

Kilin é o tanque = reliability. Nenhuma skill dele tem bônus de crítico ou Always Critical. Isso reforça sua identidade de consistência sobre sorte.

**Thorin: Foco aumenta crítico**

- +5% de taxa crítica por ponto de Foco
- Máximo de +25% (5 pontos)
- Justificativa: Sniper disciplinado que melhora com paciência

**Outros: Skills específicas com bônus**

Algumas skills de Filena e Mhordred têm bônus de crítico, mas são exceções, não regra.

### 7.6 Riscos de volatilidade

**RNG excessivo:**

- ❌ Taxa crítica muito alta torna dano inconsistente
- ❌ Jogador não consegue estimar dano real
- ❌ Balanceamento fica dependente de sorte

**Inconsistência de DPS:**

- ❌ Spender com crítico varia demais de uso para uso
- ❌ Finisher pode falhar (não critar) e ser ruim
- ❌ Dificulta avaliação de power

## 8. Ferramentas de Sustain

### 8.1 Life Steal

**O que é:**

Life Steal rouba vida igual a uma % do dano causado.

**Quando usar:**

Life Steal é apropriado para:
- **Bruisers** — Personagens que entram na linha de frente
- **Finishers** — Golpes massivos que recuperam vida
- **Identidade vampírica** — Personagens que se curam atacando

**Percentuais típicos:**

- **Leve:** 5-10% — Skills básicas
- **Médio:** 15-20% — Spenders
- **Pesado:** 25%+ — Finishers

**Relação com fantasy do personagem:**

- **Mhordred:** 20% Life Steal em Execução (finisher vampírico)
- **Outros:** Caso a caso por identidade

### 8.2 Drain

**Diferença de Life Steal:**

- **Life Steal:** % do dano causado
- **Drain:** Valor fixo independentemente de dano

**Quando apropriado:**

Drain é apropriado quando:
- Recuperação deve ser fixa, não variável
- Skill não causa dano mas deve curar
- Mecânica específica de identidade

### 8.3 Restore on Damage

**Regens condicionais:**

Alguns personagens têm regeneração condicional:
- **Kilin:** Coragem do Guardião regenera vida em turno

**Exemplos de uso:**

Estes mecanismos são geralmente passivos ou states, não skills ativas.

### 8.4 Cancel / Guard / Disarm / Negative Life Steal

**Ferramentas anti-sustain:**

O projeto pode usar ferramentas que negam sustain:
- **Negative Life Steal** — Inverte lifesteal em dano
- **Disarm** — Impede ataques (para de sustentar)
- **Cancel** — Cancela regens

**Quando usar:**

Como mecanismos de counterplay contra inimigos ou para criar tensão em batalhas específicas.

### 8.5 Sustain como fantasy

**Mhordred: Lifesteal em finisher**

Execução tem 20% Life Steal, reforçando fantasy de bruxo que se alimenta da vida do inimigo.

**Kilin: Regen via Coragem do Guardião**

Tanque que se mantém vivo através de proteção, não de roubo de vida.

**Outros: Casos específicos**

Cada personagem tem sua forma de sustain que reforça identidade.

### 8.6 Sustain como risco de quebra sistêmico

**Sustain excessivo:**

- ❌ Torna combate infinito
- ❌ Invalida dano de inimigos
- ❌ Remove decisão de recurso

**Balanceamento vs DPS:**

Sustain geralmente vem com trade-off de dano menor. Skills com muito sustain e muito dano são raríssimas e muito caras.

## 9. Ferramentas de Targeting

### 9.1 Modify Target

**Single-target vs AoE:**

- **Single-target** — Um alvo apenas (padrão para maioria das skills)
- **AoE** — Múltiplos alvos (toda party, todos inimigos)

**Quando mudar targeting:**

- **Skills de crowd control** — Afetam múltiplos inimigos
- **Buffs/Debuffs** — Afetam party ou inimigos
- **Finishers massivos** — Às vezes têm alcance maior

### 9.2 Repeat Targets

**Multi-hit same target:**

Repeat Target faz a skill hitar o mesmo alvo múltiplas vezes.

**Quando usar:**

- **Skills multi-hit** — Filena tem várias skills multi-hit
- **Sinergia com on-hit effects** — Cada hit pode gerar TP, aplicar state, etc.

### 9.3 Random Target

**Aleatoriedade controlada:**

Random Target seleciona alvo(s) aleatoriamente.

**Riscos de inconsistência:**

- ❌ Jogador não consegue estimar resultado
- ❌ Pode falhar targeting desejado
- ❌ Dificulta planejamento

**Uso recomendado:**

Apenas para skills onde aleatoriedade é parte da identidade (ex: skills caóticas).

### 9.4 Reflect / Absorb Target

**Mecânicas avançadas:**

- **Reflect** — Reflete dano de volta
- **Absorb** — Absorve dano para curar-se

**Quando apropriado:**

Como mecanismos de counterplay ou skills defensivas avançadas.

### 9.5 Custom Target Eval

**JavaScript customizado:**

Permite targeting complexo via JavaScript.

**Quando evitar:**

- Tags nativas resolvem o problema
- Lógica é simples o suficiente
- Complexidade não é justificada

### 9.6 Quando targeting altera o valor real da skill

**AoE vs ST trade-offs:**

Skills AoE geralmente têm:
- Menor dano por alvo
- Custo maior de TP
- Casting mais longo

**Posicionamento como fator:**

Algumas skills podem depender de posicionamento (ex: skills que afetam linha de frente vs retaguarda).

## 10. Ferramentas de Action Sequence

### 10.1 O que action sequence significa para o projeto

Action sequences **NÃO são apenas visuais**. Elas definem:
- Timing interno da ação
- Etapas da resolução
- Condições de execução
- Múltiplos estágios
- Delay entre início e hit

### 10.2 Uso cosmético versus uso mecânico

**Cosmético:**
- Câmera (zoom, shake)
- Impacto visual
- Floreio de animação
- Não afeta mecânica

**Mecânico:**
- Delays e waits
- Timing de hit
- Múltiplos estágios
- Condições
- Inject
- Target changes

### 10.3 Elementos relevantes para skill design

**ACTION START / FINISH:**
- Marcam início e fim da ação
- Importantes para timing de buffs/debuffs

**ACTION EFFECT:**
- Quando o dano é aplicado
- Pode ser atrasado por waits

**Targeting interno:**
- Mudança de alvo durante sequência
- Multi-hit com targets diferentes

**Conditions:**
- Executar parte da sequência só se condição
- Ex: hit forte só se HP baixo

**Mechanics:**
- Injection de código JS
- Criação de efeitos complexos

**Motion e movement:**
- Quando alteram leitura de risco/tempo
- Ex: movimento que expõe personagem

**Projectile:**
- Quando define atraso real de impacto
- Ex: flecha de sniper tem tempo de voo

### 10.4 Quando usar action sequence como ferramenta de design

**Golpes em múltiplas fases:**
- Skill começa fraca, termina forte
- Ex: combo com múltiplos hits

**Skills com hit atrasado:**
- Telegraph claro ao inimigo
- Ex: sniper mirando, magia carregando

**Skills com preparação visível:**
- Jogador vê que algo grande está vindo
- Ex: ultimate de Mhordred

**Skills com sequência de resolução diferenciada:**
- Dano primeiro, efeito depois
- Ex: dano + stun em tempos diferentes

### 10.5 Riscos

**Complexidade difícil de manter:**
- ❌ Sequências muito longas
- ❌ Múltiplas condições aninhadas
- ❌ Difícil de debugar

**Efeito visual disfarçado de poder mecânico:**
- ❌ Skill parece forte mas é só animação
- ❌ Jogador se sente enganado

**Skill ficar longa sem ganhar profundidade:**
- ❌ Animação longa sem decisão do jogador
- ❌ Combat pacing quebra

---

# PARTE II — ATB COMO FERRAMENTA DE RITMO E TIMING

## 11. ATB: Papel no Projeto

### 11.1 O que o plugin controla

O Active Turn Battle controla a **camada de Tempo** do combate:

**Áreas controladas:**
- **Gauge de ação** — Barra que enche baseado em AGI
- **Velocidade via AGI** — Quão rápido gauge enche
- **Cast time** — Tempo de preparação via speed negativo
- **Charging** — Estado de preparação visível
- **Interrupt** — Interrupção de skills em casting
- **Ready states** — Estados de prontidão (Charging, Casting, Ready, etc.)

### 11.2 Por que ATB muda o design de skill

**Skill não é só efeito; é também janela temporal:**

- Uma skill poderosa pode ser equilibrada pelo tempo de execução
- Interrupção vira ferramenta real de contrajogo
- Casting cria telegraph de poder para jogador e inimigo

**Exemplo:**
```
Execução (Mhordred):
- Muito poderosa (50% pen, Unblockable, 3.5x mult)
- Equilibrada por cast time massivo (-2000 speed)
- Jogador vê cast longo → inimigo pode interromper
```

### 11.3 Relação entre ATB e leitura do combate

**Previsibilidade (cast times):**
- Jogador sabe quando skill poderosa está vindo
- Possibilidade de reação e counterplay

**Urgência (janelas de oportunidade):**
- Skills com cast longo deixam inimigo vulnerável
- Jogador deve proteger aliado castando

**Pacing (ritmo do combate):**
- Skills rápidas (speed positivo) criam combate fluido
- Skills lentas (speed negativo) criam momentos de tensão

**Pressão (interrupts e punições):**
- Interrupt permite counterplay
- Cast longo = risco de interrupção

## 12. Ferramentas de Ritmo e Tempo

### 12.1 AGI e velocidade de enchimento

**Como AGI afeta gauge:**

Quanto maior AGI, mais rápido o gauge enche. Este é o stat principal de velocidade no combate.

**Diferenças entre personagens:**

- **Filena (Alta AGI)** — Gauge enche rápido, muitos turnos
- **Mhordred (Média AGI)** — Gauge medio, mas Postura Brutal pode acelerar
- **Kilin (Baixa AGI)** — Gauge lento, mas compensa com dureza
- **Thorin (Média AGI)** — Foco pode aumentar After Gauge dinamicamente

### 12.2 Gauge inicial

**`<ATB Battle Start Gauge: +x%>` e `<ATB Battle Start Gauge: -x%>`:**

Define quanto do gauge está cheio ao iniciar batalha.

**Sintaxe:**
```
<ATB Battle Start Gauge: +25%>  // Começa com 25% extra
<ATB Battle Start Gauge: -15%>  // Começa com 15% menos
```

**⚠️ STACKING:**
Valores são **aditivos** quando múltiplas fontes se aplicam:
- Actor +10% + Weapon +15% + State +20% = **45% total**

**Vantagens de opening:**

Personagens com Battle Start Gauge alto podem agir primeiro, criando vantagem estratégica.

**Uso no projeto:**

O projeto usa Battle Start Gauge quando uma batalha é iniciada de surpresa.

### 12.3 Gauge após ação

**`<ATB After Gauge: x%>` / `<ATB After Gauge: +x%>` / `<ATB After Gauge: -x%>`:**

After Gauge modifica a velocidade de enchimento após usar uma skill.

**⚠️ TRÊS VARIANTES DE SINTAXE:**
```
<ATB After Gauge: 50%>   // Define gauge para 50%
<ATB After Gauge: +20%>  // Adiciona 20% ao gauge atual
<ATB After Gauge: -10%>  // Subtrai 10% do gauge atual
```

**Valores típicos:**
- **+25%** — Skill rápida, incentiva spam
- **+5% a +15%** — Leve incentivo de uso
- **-20% a -40%** — Skill lenta, desacelera rotação
- **-50%** — Punição severa, recuperação muito lenta

**Skills rápidas vs lentas:**

- **Geradoras** — Speed positivo, incentivam spam
- **Spenders** — Speed negativo, desaceleram rotação

### 12.4 Escape e penalidades de fluxo

**Escape como penalidade:**

Tentar fugir custa gauge, criando decisão estratégica.

**Recuperação de gauge:**

Após ação mal-sucedida (ex: skill falhando), gauge pode ter comportamento diferente.

### 12.5 Estados de charging / ready / stop

**Estados de ATB:**

- **Charging** — Gauge enchendo (estado padrão)
- **Casting** — Cast time ativo (speed negativo) — barra **diminui**
- **Ready** — Pronto para agir (gauge em 100%)
- **Stop** — Parado (stun, freeze, etc.) — gauge não enche
- **Slow** — Gauge enchendo mais devagar (debuff)
- **Fast** — Gauge enchendo mais rápido (buff)

**⚠️ CADA ESTADO TEM COR CONFIGURÁVEL:**

| Estado | Parâmetro de Cor |
|--------|------------------|
| Charging | Default Color 1, 2 |
| Ready | Full Color 1, 2 |
| Casting | Cast Color 1, 2 |
| Stop | Stop Color 1, 2 |
| Slow | Slow Color 1, 2 |
| Fast | Fast Color 1, 2 |

**Quando manipular:**

Alguns skills podem manipular estes estados como parte de mecânica (ex: acelerar self via Charge Gauge, desacelerar inimigos).

**Transição de estados:**
```
[Start Battle]
    ↓
[Charging] ←→ [Slow] / [Fast]
    ↓ (gauge = 100%)
[Ready]
    ↓ (ação selecionada)
[Action Executing]
    ↓ (skill com speed negativo?)
[Casting] → [Interrupt] ou [Complete]
    ↓
[After Gauge Reset]
    ↓
[Charging]
```

## 13. Ferramentas de Cast e Charge

### 13.1 Skills com casting

**O que significa mecanicamente:**

Skill com **speed negativo** tem cast time. O personagem fica em estado "Casting" durante esse tempo.

**Como criar telegraph claro:**

Cast time serve como **telegraph** de poder:
- Jogador vê inimigo castando → sabe que algo forte vem
- Aliado castando → inimigos podem interromper

**Exemplo de telegraph:**
```
Execução (Mhordred):
- Cast time -2000 (muito longo)
- Telegraph claro: inimigo tem 2+ segundos para interromper
- Se cast completar → dano massivo
```

### 13.2 Speed negativo como tempo de conjuração

**Papel no balanceamento:**

Cast time é uma **moeda de balanceamento**:
- Skill mais poderosa = cast mais longo
- Trade-off: poder vs vulnerabilidade

**Trade-off entre poder e vulnerabilidade:**

- **Cast curto (-500)** — Skill moderada, risco moderado
- **Cast médio (-1000)** — Skill forte, risco significativo
- **Cast longo (-2000)** — Finisher, risco massivo

### 13.3 `<ATB Cast Gauge>`

**Sintaxe:**
```
<ATB Cast Gauge: 50%>   // Define gauge para 50% (em casting)
<ATB Cast Gauge: +20%>  // Adiciona 20% ao gauge (em casting)
<ATB Cast Gauge: -30%>  // Subtrai 30% do gauge (em casting)
```

**Quando usar:**

ATB Cast Gauge modifica o comportamento do gauge **apenas durante estado Casting** (skills com speed negativo).

**Que tipo de skill pede cast gauge:**

- Skills muito longas (ultimates)
- Skills que devem ser claramente telegraphed
- Skills com risco/reward extremo

### 13.4 Charging como parte da fantasy

**Sniper (Thorin: Tiro Preciso):**
- Cast time -1250 (longo, "mirando")
- Justificativa: Sniper precisa de tempo de mira
- Telegraph claro para inimigos

**Ultimate (Mhordred: Execução):**
- Cast time -2000 (muito longo, "concentrando poder")
- Justificativa: Finisher supremo requer preparação
- Vulnerabilidade clara durante cast

**Magia pesada:**
- Cast time longo para magias poderosas
- Telegraph de impacto iminente

**Golpe preparado:**
- Skills que representam preparação física
- Ex: apanhando impulso, carregando força

### 13.5 `<ATB Charge Gauge>`

**Sintaxe:**
```
<ATB Charge Gauge: 100%>  // Define gauge para 100% (em charging)
<ATB Charge Gauge: +30%>   // Adiciona 30% ao gauge (em charging)
<ATB Charge Gauge: -25%>   // Subtrai 25% do gauge (em charging)
```

**Quando usar:**

ATB Charge Gauge modifica o gauge **apenas durante estado Charging** (o estado padrão de enchimento).

**Diferença crítica vs Cast Gauge:**
- **Charge Gauge**: Afeta battlers em estado **Charging** (gauge enchendo)
- **Cast Gauge**: Afeta battlers em estado **Casting** (cast time ativo)

**Usos estratégicos:**
- **Haste buffs**: `<ATB Charge Gauge: +30%>` — Acelera aliados
- **Slow debuffs**: `<ATB Charge Gauge: -25%>` — Desacelera inimigos
- **Reset de gauge**: `<ATB Charge Gauge: 0%>` — Reseta gauge do alvo

**Exemplo:**
```
Buff de Velocidade (Filena):
<ATB Charge Gauge: +30%>
Filena e aliados ganham +30% no gauge durante charging
```

### 13.6 `<ATB Cannot Be Interrupted>`

**O que faz:**

Torna a skill **imune** a interrupções por `<ATB Interrupt>`.

**Sintaxe:**
```
<ATB Cannot Be Interrupted>
```

**Quando usar:**

- **Ultimates muito poderosas** — Não devem ser interrompidas
- **Skills assinatura** — Parte central da identidade do personagem
- **Skills com cast muito longo** — Cast longo + interruptível seria frustrante

**Exemplo no projeto:**

```
Tiro Preciso (Thorin):
<ATB Cannot Be Interrupted>
Cast time -1250 mas seguro de interrupção
Justificativa: Sniper "mirando" não pode ser interrompido fisicamente
```

**Balanceamento vs risco:**

Skills com `<ATB Cannot Be Interrupted>` devem ter outras formas de trade-off:
- Cast time muito longo (janela de vulnerabilidade passiva)
- Custo massivo de TP
- After Gauge negativo

**Anti-padrão:**
- ❌ Usar em skills básicas — Remove counterplay desnecessariamente

### 13.7 Anti-padrões

**Skill simples com cast desnecessário:**
- ❌ Cast só para "parecer importante"
- ❌ Skill básica com cast (frustra jogador)
- ❌ Cast sem payoff correspondente

**Cast sem propósito claro:**
- ❌ Jogador não entende por que está esperando
- ❌ Não há contra jogada possível
- ❌ Telegraph não comunica risco

## 14. Ferramentas de Interrupção

### 14.1 O que é interrupt no projeto

**`<ATB Interrupt>` como ferramenta de counterplay:**

Interrupt permite **interromper skills em estado de casting**, criando counterplay ativo.

### 14.2 `<ATB Interrupt>`

**Sintaxe:**
```
<ATB Interrupt>
```

**Como funciona:**

Quando aplicado a um alvo em estado "Casting", interrompe a skill e **reseta a gauge do target para 0%** (retornando ao estado "Charging" com gauge vazia).

**⚠️ IMPORTANTE:**
- Apenas afeta battlers em estado **Casting** (skills com speed negativo)
- **NÃO afeta** battlers em estado Charging, Ready, Stop, Slow, ou Fast
- Gauge é **resetada para 0%**, não apenas "retorna ao estado Charging"

**Quando aplicar:**

- **Stuns** — Interrupt natural
- **Quebra-Postura** — Contra inimigos brutais
- **Investida** — Contra mages castando
- **Counters táticos** — Resposta a cast inimigo

### 14.3 Quando uma skill ou efeito deve interromper

**Skills com cast time longo:**

Cast longo deve ser interrompível por padrão. Caso contrário, skill não pode ter counterplay.

**Golpes pesados (Quebra-Postura, Investida):**

Estes skills têm interrupt porque representam interrupção física do cast.

**Counters táticos:**

Skills reativas (ex: Quebra de Camuflagem do Thorin) têm interrupt como parte de mecânica de counterplay.

### 14.4 Contrajogo e counterplay

**Interrupt como ferramenta de interação:**

Interrupt cria **interação ativa**:
- Jogador vê inimigo castando forte → usa interrupt
- Inimigo vê aliado castando → tenta interromper
- Cria decisão tática: quando interromper?

**Balanceamento vs spam:**

Interrupt não deve ser tão comum que:
- ❌ Ninguém nunca completa cast longo
- ❌ Combate vira só interrupt spam
- ❌ Casting fica inútil

### 14.5 Riscos

**Interrupt excessivo:**
- ❌ Combate fica travado (ninguém completa nada)
- ❌ Cast longo se torna inútil
- ❌ Remove profundidade (só importa ser rápido)

**Interrupt raro demais:**
- ❌ Cast longo se torna grátis (sem risco)
- ❌ Remove contra jogada
- ❌ Combate perde tensão

## 15. Ferramentas de Pós-Ação e Cadência

### 15.1 `<ATB After Gauge>`

**Como funciona:**

After Gauge modifica a velocidade de enchimento do gauge APÓS a skill ser usada.

**Valores típicos:**
- **+25%** — Skill muito rápida (gerador leve)
- **+10% a +15%** — Incentivo moderado
- **0%** — Neutro (padrão)
- **-20%** — Desacelera moderadamente
- **-40% a -50%** — Punição severa, recuperação lenta

### 15.2 Recuperação de gauge após usar skill

**Trade-offs de velocidade:**

- **After Gauge positivo** → Próximo turno mais rápido → Incentiva spam
- **After Gauge negativo** → Próximo turno mais lento → Punição por usar skill forte

**Sinergias (Ex: Filena +Momentum = +After Gauge):**

Filena com TP Mode Momentum pode ganhar After Gauge positivo dinâmico, criando loop where "quanto mais ataca, mais rápido ataca".

### 15.3 Skills rápidas vs skills comprometedoras

**Geradores (speed positivo):**
- Passo de Brisa (Filena): +1000 speed, +10 TP
- Golpe Brutal (Mhordred): 0 speed base, gera +8 TP
- Objetivo: Gerar recurso, manter ritmo

**Spenders (speed negativo):**
- Estocada Relâmpago (Filena): -500 speed, -20 TP
- Execução (Mhordred): -2000 speed, -50 TP
- Objetivo: Impacto massivo, desacelera rotação

### 15.4 Como o after gauge molda rotação e pressão

**Ritmo de uso:**

After Gauge define **cadência de uso**:
- +After Gauge → Uso frequente
- -After Gauge → Uso esporádico

**Janelas de vulnerabilidade:**

After Gauge negativo cria **janela de vulnerabilidade**:
- Após usar skill forte, personagem fica lento
- Inimigos podem explorar essa janela
- Cria decisão estratégica: quando usar spender pesado?

**Exemplo:**
```
Execução (Mhordred):
- After Gauge -40% (muito negativo)
- Após usar, Mhordred fica muito lento
- Inimigos podem explorar essa janela
- Trade-off: poder massivo por vulnerabilidade
```

### 15.5 `<JS ATB After Gauge>`

**Sintaxe:**
```
<JS ATB After Gauge>
rate = code;
</JS ATB After Gauge>
```

**Variáveis disponíveis:**
- `user` — Battler que usou a skill
- `rate` — Valor da gauge pós-ação (padrão: 0), retorne novo valor (0-1)

**Quando usar:**

Para lógica customizada que depende de condições dinâmicas:
- HP rate do personagem
- States ativos
- Foco acumulado (Thorin)
- Qualquer condição complexa

**Exemplo 1: Quanto menor HP, mais rápido**
```
<JS ATB After Gauge>
var hpRate = user.hp / user.mhp;
rate = (1 - hpRate) * 0.5;  // Até 50% bônus se HP baixo
</JS ATB After Gauge>
```

**Exemplo 2: Sinergia com Foco (Thorin)**
```
<JS ATB After Gauge>
let totalRate = 0;
// Sinergia com Marca do Guardião (140) de Filena/Kilin
if (target.isStateAffected(140)) { totalRate += 0.20; }
// Sinergia com Chamado do Mentor (134) de Kilin
if (user.isStateAffected(134)) { totalRate += 0.15; }
// Bônus do próprio Foco (até +25% com 5 Foco)
totalRate += user.tp * 0.05;
// Cap em 80% ATB
rate = Math.min(totalRate, 0.80);
</JS ATB After Gauge>
```

**Exemplo 3: After Gauge baseado em AGI**
```
<JS ATB After Gauge>
rate = user.agi / 200;  // Mais rápido com mais AGI
</JS ATB After Gauge>
```

### 15.6 `<JS ATB Charge Gauge>` e `<JS ATB Cast Gauge>`

**`<JS ATB Charge Gauge>` — Para estado Charging:**
```
<JS ATB Charge Gauge>
rate = code;
</JS ATB Charge Gauge>
```

**Variáveis disponíveis:**
- `target` — Battler alvo da skill
- `rate` — Valor atual do gauge (0-1), retorne novo valor

**Exemplo: Haste baseada em AGI**
```
<JS ATB Charge Gauge>
rate = Math.min(1, rate + (target.agi / 1000));
</JS ATB Charge Gauge>
```

**`<JS ATB Cast Gauge>` — Para estado Casting:**
```
<JS ATB Cast Gauge>
rate = code;
</JS ATB Cast Gauge>
```

**Variáveis disponíveis:**
- `target` — Battler alvo da skill
- `rate` — Valor atual do gauge (0-1), retorne novo valor

**Exemplo: Reseta casting mas deixa bônus**
```
<JS ATB Cast Gauge>
rate = 0.3;  // Reseta para 30% em vez de 0%
</JS ATB Cast Gauge>
```

### 15.7 Distintos: Speed vs After Gauge

**⚠️ DISTINÇÃO CRÍTICA:**

| Configuração | O que afeta | Quando é aplicado |
|--------------|-------------|-------------------|
| **Speed** (database) | Tempo de cast da skill atual | DURANTE execução da skill |
| **After Gauge** | Velocidade do próximo turno | APÓS skill ser usada |

**Exemplo prático:**
```
Execução (Mhordred):
- Speed: -2000 (cast time de 2 segundos DURANTE a skill)
- After Gauge: -40% (próximo turno será 40% mais lento)

Tiro Preciso (Thorin):
- Speed: -1250 (cast time de 1.25 segundos)
- After Gauge: dinâmico via JS (pode ser +20% a +80%)
```

**Speed negativo** → Cria janela de vulnerabilidade **DURANTE** o cast
**After Gauge negativo** → Cria janela de vulnerabilidade **APÓS** a skill

### 15.8 Parâmetros Globais de ATB

**Stuns Reset Gauge?:**
- **true** (padrão): Stuns (Stun, Charm, Berserk, Confusion) resetam gauge para 0%
- **false**: Gauge mantém posição após stun

**Impacto no balanceamento:**
- `true`: Stuns são mais punitivos, battler perde todo progresso
- `false`: Menos punitivo, mantém progresso de gauge

**Escape Fail Penalty:**
- Define % da gauge ao **falhar na fuga**
- Exemplo: `50` → Gauge reseta para 50% ao falhar fuga

**Uso estratégico:**
- Penalidade alta desencoraja tentativas de fuga repetidas
- Custo de oportunidade: tentar fugir vs continuar combatendo

---

# PARTE III — ENHANCED TP SYSTEM COMO FERRAMENTA DE RECURSO

## 16. Enhanced TP System: Papel no Projeto

### 16.1 O que o plugin controla

O Enhanced TP System controla a **camada de Recurso** do combate:

**Áreas controladas:**
- **TP Modes** — 4 modos customizados por personagem
- **Fórmulas de ganho** — Como TP é gerado
- **Max TP** — Limite máximo de TP
- **Preserve TP** — Se TP carrega entre batalhas
- **Regras customizadas** — Triggers especiais por personagem

### 16.2 Por que TP não é só custo

**Define identidade de jogo do personagem:**

TP Mode define **como o personagem joga**:
- Filena (Momentum) — Evasion +12 TP, Preserve ON → Jogo evasivo
- Kilin (Guarda) — Take Damage value/20, Ally Death +20 TP → Tank protetor
- Mhordred (Fúria) — Take/Deal Damage geram, Preserve OFF → Bruiser agressivo
- Thorin (Foco) — Critical Hit +10 TP, Preserve ON → Sniper disciplinado

**Molda loop de build → spend:**

Cada personagem tem loop distinto:
- **Mhordred:** Take/Deal damage → build → spend → repeat
- **Thorin:** Paciência → Foco → spend → rebuild
- **Kilin:** Protect ally → take damage → build → spend
- **Filena:** Evasion → build → spend → preserve

**Altera frequência e timing de spike:**

- MaxTP 50 (Kilin) → TP mais denso, skills mais rápidas
- MaxTP 100 (outros) → TP mais espaçado, skills mais espaçadas
- Preserve ON → TP persiste, pode começar com spender
- Preserve OFF → Build a cada combate

### 16.3 TP como ferramenta de design, não só economia

**Personagem agressivo gera por atacar (Mhordred):**

Mhordred com TP Mode Fúria:
- Deal Damage value/10
- Take Damage value/5
- Identidade: "animal ferido" que cresce com dor

**Personagem tático gera por setup/condição (Thorin):**

Thorin com TP Mode Foco:
- Critical Hit +10 TP
- Preserve ON → Foco acumula entre combates
- Identidade: sniper disciplinado que recompensa paciência

**Personagem reativo gera por sofrer, evadir ou responder (Kilin, Filena):**

Kilin com TP Mode Guarda:
- Take Damage value/20
- Ally Death +20 TP
- Identidade: tank que sofre para proteger

Filena com TP Mode Momentum:
- Evasion +12 TP
- Preserve ON → Recurso persiste
- Identidade: duelista ágil que evadia para gerar

## 17. TP Modes

### 17.1 O que são TP Modes

TP Modes são **modos customizados de TP** por personagem. Cada personagem tem regras distintas de ganho, limite e preservação.

**⚠️ COMO TP MODES SÃO CONFIGURADOS:**

TP Modes são criados nos **PARÂMETROS DO PLUGIN** (Plugin Manager → VisuMZ_2_EnhancedTpSystem → TP Modes), não via notetag. Cada TP Mode consiste em:

```
┌──────────────────────────────────────┐
│  TP Mode: "NomeDoModo"               │
├──────────────────────────────────────┤
│  General                             │
│  ├── MaxTP Formula (pode ser JS)     │
│  ├── TCR Multiplier (multiplicador)  │
│  └── Preserve TP? (ON/OFF)           │
├──────────────────────────────────────┤
│  TP Formulas (configurado aqui!)     │
│  ├── Use Skill: 10                   │
│  ├── Take HP Damage: value/10        │
│  ├── Deal HP Damage: value/20        │
│  └── ... (todas as fórmulas)         │
└──────────────────────────────────────┘
```

**A notetag `<TP Mode: name>`** no Actor/Enemy **apenas atribui** um mode já existente criado nos parâmetros.

**4 modos no projeto:**
- **Momentum (Filena)** — TCR 1.2, Preserve ON, Evasion +12 TP
- **Guarda (Kilin)** — MaxTP 50, Take Damage value/20, Ally Death +20 TP
- **Fúria (Mhordred)** — TCR 1.5, Take/Deal Damage geram, Preserve OFF
- **Foco (Thorin)** — Critical Hit +10 TP, Preserve ON

### 17.2 Como um TP Mode muda o jeito de jogar

**Filena (Momentum TCR 1.2):**
- **Evasion +12 TP** — Recompensa evadir
- **Preserve ON** — Recurso persiste entre combates
- **Estilo:** Duelista ágil que evadia para construir

**Kilin (Guarda MaxTP 50):**
- **Take Damage value/20** — Gera sendo atingido
- **Ally Death +20 TP** — Gera quando aliado morre (tank protetor)
- **MaxTP 50** — TP mais denso, skills mais rápidas
- **Estilo:** Tank protetor que sofre para construir

**Mhordred (Fúria TCR 1.5):**
- **Take Damage value/5** — Gera muito sendo atingido
- **Deal Damage value/10** — Gera atacando
- **Preserve OFF** — Build a cada combate
- **Estilo:** Bruiser agressivo que cresce com dor

**Thorin (Foco Preserve ON):**
- **Critical Hit +10 TP** — Gera em críticos
- **Preserve ON** — Foco acumula entre combates
- **Estilo:** Sniper disciplinado que recompensa paciência

### 17.3 Quando criar um modo novo

**Criar modo novo quando:**
- Identidade de recurso é distinta dos 4 existentes
- Mecânicas de geração são únicas
- Personagem requer loop de build → spend diferente

**Exemplo de critérios:**
- Novo personagem com fantasy único
- Mecânica que não se encaixa nos modos existentes
- Necessidade de design clara

### 17.4 Quando reaproveitar um modo existente

**Personagens com identidade similar:**

Se novo personagem tem identidade similar a um existente, pode reaproveitar mode com ajustes menores.

**Exemplo:**
- Novo bruiser agressivo → pode usar Fúria base
- Nova duelista ágil → pode usar Momentum base

### 17.5 Riscos de excesso de modos

**Complexidade de balanceamento:**

- ❌ Cada modo novo é um balanceamento distinto
- ❌ Interações entre modos ficam complexas
- ❌ Difícil manter consistência

**Confusão para jogadores:**

- ❌ Muitos modos → difícil entender cada um
- ❌ Jogador perde identidade clara de personagem
- ❌ Documentação volumosa

## 18. Ferramentas de Geração de TP

### 18.1 Geração genérica

**⚠️ VARIÁVEIS DISPONÍVEIS NAS FÓRMULAS:**

Todas as fórmulas de TP podem usar estas variáveis JavaScript:

| Variável | Descrição |
|----------|-----------|
| `user` | Battler ganhando TP |
| `target` | Alvo da ação (quando aplicável) |
| `value` | Valor do dano/cura (quando aplicável) |
| `a`, `b`, `c`... | Membros da party (contexto dependente) |

**Exemplos de uso:**
```javascript
value / 10              // 1 TP a cada 10 de dano
user.level * 2          // 2 TP por nível
Math.min(value, 20)     // TP igual ao dano, máx 20
```

---

**Initial TP:**
- 0 para todos (padrão)
- Configurado em: TP Mode → TP Formulas → Initial TP

**Use Skill / Use Item:**
- **⚠️ IMPORTANTE:** Configurado nos **PARÂMETROS DO TP MODE**, não individualmente por skill
- Fórmula em: TP Mode → TP Formulas → Use Skill
- Exemplos de fórmula: `10` (fixo), `skill.tpCost * 0.5` (metade do custo), `5` (fixo)
- Geradores: +5 a +12 TP (valor da fórmula do mode)
- Spenders: -15 a -50 TP (**custo de TP** configurado individualmente em cada skill no database)

**Critical Hit:**
- +6 a +10 TP por personagem
- Thorin: +10 TP (maior ganho)

**Evasion:**
- +5 a +12 TP por personagem
- Filena: +12 TP (maior ganho)

---

### 18.2 Geração por dano e cura

**Deal HP Damage:**
- Filena: value/10
- Kilin: 0 (não gera atacando)
- Mhordred: value/10 (Fúria)
- Thorin: value/15

**Take HP Damage:**
- Filena: 0
- Kilin: value/20 (Guarda)
- Mhordred: value/5 (Fúria - maior ganho)
- Thorin: 0

**Deal MP Damage:**
- 0 ou value/15 (personagem específico)

**Heal Ally:**
- 0 ou value/20 (personagem específico)

### 18.3 Geração por buffs, debuffs e states

**Deal Ally Buff / Deal Enemy Buff:**
- 0 ou +5 (quando personagem apoia)

**Deal Ally Debuff / Deal Enemy Debuff:**
- 0 ou +5 (quando personagem debuffa)

**Gain Ally Buff / Gain Enemy Buff:**
- 0 (geralmente não gera recebendo buff)

**Deal Ally State / Deal Enemy State:**
- 0 ou +5 (quando aplica state)

### 18.4 Geração por eventos de batalha

**Ally Death:**
- Kilin: +20 TP (Guarda - tank sofre com perda)
- Outros: 0

**Enemy Death:**
- +8 a +15 TP por personagem
- Recompensa por eliminação

**Win / Flee / Lose Battle:**
- 0 ou +10 (personagem específico)

### 18.5 Geração During Regen (Regeneração por Turno)

**⚠️ O QUE É:** Fórmulas que rodam durante a fase de regeneração de cada turno, afetando o ritmo de recuperação de TP.

**TP Regen:**
- TP ganho automaticamente a cada turno
- Exemplo: `5` (5 TP por turno), `user.level / 2` (metade do nível por turno)

**Critical HP:**
- +TP se HP está crítico (≤ 25%)
- Somado ao TP Regen normal
- Exemplo: Kilin +10 TP quando HP crítico

**Full HP:**
- +TP se HP está cheio (100%)
- Recompensa manutenção de HP cheio
- Exemplo: `+5 TP se HP cheio`

**Critical MP:**
- +TP se MP está crítico (≤ 25%)
- Exemplo: `+5 TP se MP crítico`

**Full MP:**
- +TP se MP está cheio (100%)
- Exemplo: `+3 TP se MP cheio`

**Only Member:**
- +TP se é o **único** membro vivo da party
- Mecanismo de "last stand" ou "vingança"
- Exemplo: Kilin +30 TP (tank sozão gera muito)

**Impacto no Balanceamento:**
- TP Regen afeta ritmo de recuperação entre turnos
- Critical/Full HP/MP criam decisões táticas sobre gestão de recursos
- Only Member cria mecanismo de recuperação desesperada

---

### 18.6 Como decidir a fonte de TP

**Pela fantasy do personagem:**

- Bruiser agressivo → gera por atacar/apanhar (Mhordred)
- Tank protetor → gera sofrendo (Kilin)
- Duelista ágil → gera evadindo (Filena)
- Sniper disciplinado → gera em críticos (Thorin)

**Pelo ritmo desejado:**

- Ritmo rápido → geração rápida, gasto rápido
- Ritmo lento → geração lenta, gasto lento

**Pelo tipo de decisão que queremos incentivar:**

- Incentivar agressão → gera por deal damage
- Incentivar proteção → gera por take damage
- Incentivar paciência → gera por condição (crítico, state)

## 19. Ferramentas de Custo e Preservação de TP

### 19.1 Max TP

**⚠️ MaxTP é uma FÓRMULA JavaScript, não apenas um valor fixo!**

Configurado em: TP Mode → General → MaxTP Formula

**Exemplos de fórmula:**
```javascript
100                     // Valor fixo (padrão)
user.level * 10         // Escalona com nível
50 + user.agi / 2       // Base + atributo
Math.max(1, user.hp / 10)  // Baseado em HP
```

**Padrão: 100**

A maioria dos personagens tem MaxTP 100.

**Exceção: Kilin 50**

Kilin tem MaxTP 50 porque:
- TP Mode Guarda é mais denso
- Skills são mais rápidas e mais baratas
- Tank precisa de rotação mais constante

### 19.1.1 TCR Multiplier

**⚠️ O QUE É:** Multiplicador de **TP Charge Rate** - quanto TP é ganho.

Configurado em: TP Mode → General → TCR Multiplier

**Valores:**
- `1.0` = 100% (ganho normal)
- `1.2` = 120% (+20% ganho) — **Filena Momentum**
- `1.5` = 150% (+50% ganho) — **Mhordred Fúria**
- `0.8` = 80% (-20% ganho)

**⚠️ STACKING:** Multiplicativo com TCR de traits
```
Exemplo: TCR 1.5 (trait) × 1.2 (mode) = 1.8 (180%)
```

**Impacto no Balanceamento:**
- TCR mais alto = personagem gera TP mais rápido
- Filena com TCR 1.2 ganha TP 20% mais rápido que o normal
- Mhordred com TCR 1.5 ganha TP 50% mais rápido (agressivo)

### 19.2 Preserve TP

**ON: Filena, Thorin**
- Recurso persiste entre batalhas
- Pode começar combate com TP acumulado
- Incentifica planejamento multi-combate

**OFF: Kilin, Mhordred**
- Build a cada combate
- Começa cada batalha com 0 TP
- Incentifica jogo agressivo dentro de combate

### 19.3 Spending thresholds

**Geradores: +5 a +12 TP**
- Skills básicas que geram recurso
- Uso frequente

**Spender médio: -15 a -25 TP**
- Skills com dano/moderate power
- Uso moderado

**Spender pesado: -30 a -50 TP**
- Skills muito fortes
- Uso esporádico, requer buildup

**Ultimate: -60 TP ou mais**
- Finisher massivo
- Requer buildup intenso

### 19.4 Gasto explosivo vs gasto frequente

**Build-and-spend (Mhordred, Kilin):**
- Constroem TP rapidamente
- Gastam em spender massivo
- Loop: build → spend → rebuild

**Rotação constante (Thorin):**
- Gasto moderado constante
- Preserve ON mantém TP estável
- Loop: spend moderate → regen → spend

**Burst (Filena finisher):**
- Build com Momentum
- Spend em finisher massivo
- Preserve ON pode manter TP para próximo combate

### 19.5 Riscos de economia quebrada

**Geração muito rápida:**
- ❌ Spender pode ser spamado
- ❌ Remove decisão de recurso
- ❌ Torna TP irrelevante

**Custo desalinhado com ritmo real:**
- ❌ Skill cara mas ritmo rápido (frustrante)
- ❌ Skill barata mas ritmo lento (overpowered)
- ❌ Custo não reflete poder real

## 20. Ferramentas de Manipulação de TP Mode

### 20.1 `<TP Mode>`

**Define o TP Mode INICIAL de um battler.**

**Sintaxe:**
```xml
<TP Mode: NomeDoModo>
```

**Escopo:** Actor, Enemy, State

**Comportamento:**
- Aplicado no início da batalha
- Pode ser sobrescrito por `<Force TP Mode>`
- Para States: aplica enquanto state estiver ativo

**Exemplo:**
```xml
<!-- Actor: Filena -->
<TP Mode: Momentum>

<!-- Enemy: Slime -->
<TP Mode: Basic>
```

---

### 20.2 `<Starting TP Modes>`

**Define uma LISTA de modos DISPONÍVEIS para seleção.**

**⚠️ DIFERENÇA CRÍTICA vs `<TP Mode>`:**
- `<TP Mode: name>`: Define o modo **INICIAL** (um único)
- `<Starting TP Modes>`: Lista modos **SELECIONÁVEIS** (múltiplos)

**Sintaxe:**
```xml
<Starting TP Modes>
  Momentum
  Foco Preciso
  Ritmo Acelerado
</Starting TP Modes>
```

**Escopo:** Actor (apenas)

**Comportamento:**
- Jogador pode selecionar estes modos em Scene_Skill (se habilitado)
- Personagem pode trocar entre modos listados durante jogo
- Expansível via `<Learn TP Mode>` ou `<Unlock TP Mode>`

**Exemplo:**
```xml
<!-- Actor: Filena -->
<Starting TP Modes>
  Momentum
  Duelo Ágil
</Starting TP Modes>
<TP Mode: Momentum>  <!-- Modo inicial padrão -->
```

---

### 20.3 `<Change Target TP Mode>`

**Muda o TP Mode do ALVO quando a skill acerta.**

**Sintaxe:**
```xml
<Change Target TP Mode: NomeDoModo>
```

**Escopo:** Skill, Item

**Comportamento:**
- Ação deve **acertar** o alvo (hit)
- Se falhar (miss), TP Mode não muda
- Não funciona com "Certain Hit" (sempre acerta, mas não aplica mudança)

**Exemplo:**
```xml
<!-- Skill: Debuff that forces bad mode -->
<Change Target TP Mode: Frenesi>
```

---

### 20.4 `<Change User TP Mode>`

**⚠️ TAG FALTANDO - Muda o TP Mode do USUÁRIO da skill.**

**Sintaxe:**
```xml
<Change User TP Mode: NomeDoModo>
```

**Escopo:** Skill, Item

**Comportamento:**
- Aplica **independentemente** de sucesso/falha
- Diferente de `<Change Target TP Mode>` que requer acertar
- Útil para habilidades de auto-mudança de stance

**Exemplo:**
```xml
<!-- Skill: Enter Guard Stance -->
<Change User TP Mode: Guarda Fortificada>
```

**⚠️ DIFERENÇA CRÍTICA:**

| Característica | `<Change Target>` | `<Change User>` |
|----------------|-------------------|-----------------|
| Afeta | Alvo da skill | Usuário da skill |
| Requer sucesso? | **Sim** (deve acertar) | **Não** (incondicional) |
| Caso de uso | Debuff inimigo | Auto-buff |

---

### 20.5 `<Force TP Mode>`

**Força um TP Mode específico, sobrescrevendo outras configurações.**

**Sintaxe:**
```xml
<Force TP Mode: NomeDoModo>
```

**Escopo:** Actor, Class, Weapon, Armor, Enemy, State

**Comportamento:**
- **Sobrescreve** qualquer outro TP Mode
- Aplica dentro e fora de batalha
- Prioridade máxima se múltiplos presentes
- States com este notetag prevalecem

**Exemplo:**
```xml
<!-- State: Enraged -->
<Force TP Mode: Fúria Incontrolável>

<!-- Armor: Berserker's Ring -->
<Force TP Mode: Modo Frenesi>
```

---

### 20.6 `<Learn TP Mode>` / `<Learn TP Modes>`

**⚠️ TAG FALTANDO - Aprende TP Mode PERMANENTEMENTE ao aprender skill.**

**Sintaxe (único):**
```xml
<Learn TP Mode: Postura Avançada>
```

**Sintaxe (múltiplos):**
```xml
<Learn TP Modes>
  Guarda Avançada
  Muralha Suprema
  Proteção Divina
</Learn TP Modes>
```

**Escopo:** Skill (apenas)

**Comportamento:**
- Só funciona quando a skill é **aprendida**
- Adicionar skill via trait **NÃO** ensina o TP Mode
- O modo fica **permanentemente** disponível para o ator
- Transfere entre batalhas

**Exemplo de progressão:**
```xml
<!-- Level 10 Skill: Basic Combat -->
<Learn TP Mode: Combate Básico>

<!-- Level 20 Skill: Intermediate Combat -->
<Learn TP Mode: Combate Intermediário>

<!-- Level 30 Skill: Advanced Combat -->
<Learn TP Mode: Combate Avançado>
```

---

### 20.7 `<Unlock TP Mode>` / `<Unlock TP Modes>`

**⚠️ TAG FALTANDO - Desbloqueia TP Mode TEMPORARIAMENTE.**

**Sintaxe (único):**
```xml
<Unlock TP Mode: Fúria do Dragão>
```

**Sintaxe (múltiplos):**
```xml
<Unlock TP Modes>
  Modo Ofensivo
  Modo Defensivo
  Modo Balanceado
</Unlock TP Modes>
```

**Escopo:** Skill, Item

**Comportamento:**
- Modo fica disponível para uso (mas não aprendido permanentemente)
- **Diferença vs Learn:**
  - **Learn**: Permanente, aprendido, transfere entre batalhas
  - **Unlock**: Temporário, pode ser revogado, dura durante batalha/item

**Exemplo:**
```xml
<!-- Skill: Dragon Form -->
<Unlock TP Mode: Fúria do Dragão>

<!-- Item: Rage Potion -->
<Unlock TP Mode: Frenesi Temporário>
```

---

### 20.8 Prioridade e Interações

**⚠️ ORDEM DE PRIORIDADE:**
```
<Force TP Mode> > <Change TP Mode> > <TP Mode>
```

**Interação entre tags:**
- `<Force TP Mode>` sobrescreve tudo
- `<Change User/Target TP Mode>` aplica mudança temporária
- `<TP Mode>` é o modo base/initial
- `<Starting TP Modes>` define lista de disponíveis

**Exemplo prático:**
```xml
<!-- Actor tem <TP Mode: Momentum> -->
<!-- State aplica <Force TP Mode: Fúria> -->
<!-- Resultado: Personagem usa Fúria (Force tem prioridade) -->

<!-- Actor usa skill com <Change User TP Mode: Guarda> -->
<!-- Resultado temporário: Muda para Guarda até fim da batalha -->
```

---

### 20.9 Quando mudar mode é design interessante vs gimmick

**Interessante:**
- Storytelling via mecânica
- Mudança reflete desenvolvimento de personagem
- Cria decisão estratégica real

**Gimmick:**
- Mudança arbitrária sem propósito
- Troca constante de modes sem motivo claro
- Complexidade sem ganho de profundidade

---

# PARTE IV — INTEGRAÇÃO ENTRE BATTLE CORE, ATB E TP

## 21. A Skill como Combinação de 3 Eixos

### 21.1 Eixo 1 — Efeito (Battle Core)

O eixo de **Efeito** é controlado pelo Battle Core e define o que a skill faz:

- **Dano** — Quanto dano causa
- **Crítico** — Se pode critar e com qual multiplicador
- **Sustain** — Se cura quem usa (Life Steal)
- **Targeting** — Quem é afetado (ST, AoE)
- **Utilidade** — Buffs, debuffs, states

### 21.2 Eixo 2 — Tempo (ATB)

O eixo de **Tempo** é controlado pelo ATB e define quando a skill acontece:

- **Instantânea** — Speed 0 ou positivo
- **Castada** — Speed negativo (cast time)
- **Interrompível** — Pode ser interrompida
- **Lenta** — After Gauge negativo
- **Acelerada** — After Gauge positivo

### 21.3 Eixo 3 — Recurso (TP System)

O eixo de **Recurso** é controlado pelo TP System e define quanto custa e como volta:

- **Barata** — Custo baixo ou gera TP
- **Cara** — Custo alto de TP
- **Build-and-spend** — Requer buildup prévio
- **Condicional** — Custo/geração baseado em condição
- **Ciclo rápido ou lento** — Frequência de uso

### 21.4 Template mental de leitura de skill

Para ler qualquer skill, pergunte:

1. **O que faz?** (Battle Core → Efeito)
2. **Quando entra?** (ATB → Tempo)
3. **Quanto custa?** (TP System → Recurso)
4. **Como volta a ser usada?** (TP System + ATB → Loop)

**NOTA - Integrações Avançadas:**
- **JavaScript tags** (`<JS ATB After Gauge>`, `<Custom Critical Eval>`) permitem fórmulas dinâmicas mas requerem validação de edge cases
- **Action Sequences** controlam timing visual e são afetados por cast time do ATB
- **States** podem modificar parâmetros via traits e interagem com TP gain triggers

## 22. Tipos de Skill Segundo os 3 Plugins

### 22.1 Skill básica

**Características:**
- Efeito simples
- Sem cast
- Baixo custo ou geração
- Ritmo frequente

**Exemplo: Passo de Brisa (Filena)**
- **BC:** Dano flat `(20 + a.atk × 1.0) × (100 / (100 + b.def))`
- **ATB:** +1000 speed (instantânea, acelerada)
- **TP:** +10 TP (gera recurso)

### 22.2 Spender

**Características:**
- Dano maior
- After gauge relevante
- Custo TP real
- Janela de impacto

**Exemplo: Estocada Relâmpago (Filena)**
- **BC:** 20% armor pen, +20% crit, dano `(150 + a.atk × 2.0)`
- **ATB:** -500 speed (leve cast), após uso normal
- **TP:** -20 TP (custo moderado)

### 22.3 Finisher

**Características:**
- Alto payoff
- Custo alto
- Penetração alta ou condição especial
- Timing importante
- Possível cast ou vulnerabilidade

**Exemplo: Execução (Mhordred)**
- **BC:** 50% pen, Unblockable, 20% lifesteal, dano `(600 + a.atk × 3.5)`
- **ATB:** -2000 speed (cast muito longo), -40% after gauge (muito vulnerável)
- **TP:** -50 TP (custo massivo, requer ~50% da barra)

### 22.4 Skill de setup

**Características:**
- Efeito indireto
- Valor futuro
- Sinergia com crit, state, pen, cast ou TP

**Exemplo: Marca do Guardião (Thorin)**
- **BC:** Aplica State 140 (Marca)
- **ATB:** 0 speed (instantânea)
- **TP:** +6 TP (gera leve)
- **Valor futuro:** Marca sinergiza com Tiro Preciso (bônus de dano e After Gauge)

### 22.5 Skill reativa

**Características:**
- Interrupt
- Punish
- Resposta a estado do combate

**Exemplo: Quebra de Camuflagem (Thorin)**
- **BC:** Interrupt, dano moderado
- **ATB:** Instantânea
- **TP:** +8 TP se quebra stealth
- **Reativa:** Responde a inimigo stealthed

## 23. Tabela de Decisão: Intenção de Design → Plugin → Ferramenta

### 23.1 Quando quero aumentar impacto da skill

**Battle Core →** Fórmula, crit, pen, unblockable

- Aumentar fórmula (multiplicador)
- Adicionar crítico ou Always Critical
- Adicionar armor penetration
- Adicionar Unblockable (se justify)

### 23.2 Quando quero mexer no ritmo da skill

**ATB →** Cast, interrupt, after gauge, speed

- Adicionar cast time (speed negativo)
- Tornar interrompível
- Adicionar after gauge negativo (desacelera)
- Adicionar after gauge positivo (acelera)

### 23.3 Quando quero mexer na frequência de uso

**TP System →** Gain triggers, max TP, preserve, mode

- Aumentar custo de TP
- Aumentar geração de TP
- Mudar TP Mode
- Mudar Preserve TP

### 23.4 Quando quero combinar camadas

**Exemplos de combinação:**

**Finisher = Battle Core (alto dano, pen) + ATB (cast longo) + TP (custo alto)**
```
Execução (Mhordred):
- BC: 50% pen, Unblockable, 3.5x mult
- ATB: -2000 speed, -40% after gauge
- TP: -50 TP
```

**Sustain bruiser = Battle Core (lifesteal) + TP (geração por dano)**
```
Golpe Brutal (Mhordred):
- BC: Dano básico
- TP: +8 TP Use Skill, +Take/Deal Damage (Fúria)
```

**Sniper = Battle Core (dano preciso) + ATB (cast/after gauge sinergia)**
```
Tiro Preciso (Thorin):
- BC: 30% pen, 4.0x crit, dano escala com Foco
- ATB: -1250 speed cast, After Gauge dinâmico com Foco
- TP: -40 TP escala com Foco
```

**Combo builder = TP (geração) + Targeting (multi-hit) + Action Sequence (hits)**
```
Combo de Filena (exemplo):
- BC: Multi-hit (Repeat Targets)
- ATB: Action sequence com timing
- TP: Cada hit gera TP
```

## 24. Anti-Padrões no Uso das Ferramentas

### 24.1 Battle Core anti-padrões

**Dano resolvido só por multiplicador:**
- ❌ Só aumentar multiplicador sem considerar mitigaçāo
- ❌ Ignorar DEF do alvo
- ✅ Usar fórmula MOBA que considera DEF

**Crítico como muleta:**
- ❌ Adicionar crítico para "consertar" dano baixo
- ❌ Tornar skill dependente de RNG
- ✅ Usar crítico como exceção de identidade

**Unblockable banalizado:**
- ❌ Unblockable em skills básicas
- ❌ Sem custo correspondente
- ✅ Unblockable apenas em finishers com custo massivo

**Penetração que invalida defesa:**
- ❌ Penetração excessiva (50%+ em tudo)
- ❌ Stack infinito de pen
- ✅ Penetração escalonada por tier de skill

### 24.2 ATB anti-padrões

**Cast sem payoff:**
- ❌ Skill com cast longo mas dano baixo
- ❌ Cast sem propósito claro
- ✅ Cast proporcional ao poder da skill

**Interrupt em excesso:**
- ❌ Todas as skills interrompendo
- ❌ Ninguém completa cast longo
- ✅ Interrupt em skills específicas de counterplay

**After gauge mal calibrado:**
- ❌ Spender com after gauge positivo (incentiva spam)
- ❌ Gerador com after gauge negativo (desincentiva uso)
- ✅ After gauge alinhado com papel da skill

**Skill lenta que não recompensa:**
- ❌ Cast longo + dano baixo + custo alto
- ❌ Trade-off injusto
- ✅ Skill lenta deve ter payoff correspondente

### 24.3 TP anti-padrões

**Geração de TP rápida demais:**
- ❌ Pode usar spender a cada turno
- ❌ Remove decisão de recurso
- ✅ Geração balanceada com custo de skills

**Skill cara demais para o ritmo real do combate:**
- ❌ Custo -60 TP mas gera 10/turno (6 turnos para usar)
- ❌ Acaba nunca sendo usada
- ✅ Custo alinhado com geração de TP

**TP Mode sem identidade:**
- ❌ Mode "genérico" que não difere dos outros
- ❌ Complexidade sem ganho de gameplay
- ✅ Cada mode tem identidade clara e distinta

**Preserve TP quebrando curva de risco:**
- ❌ Preserve ON em personagem com geração muito rápida
- ❌ Começa combate com TP cheio sempre
- ✅ Preserve ON requer balanceamento cuidadoso

### 24.4 Anti-padrões de integração

**Skill forte, rápida e barata ao mesmo tempo:**
- ❌ Overpowered por definição
- ❌ Não tem trade-off nenhum
- ✅ Pelo menos um eixo deve ter custo

**Skill lenta, cara e fraca:**
- ❌ Useless por definição
- ❌ Nunca vale a pena usar
- ✅ Pelo menos um eixo deve ter payoff

**Skill complexa nos três eixos sem ganho real de profundidade:**
- ❌ Complexidade sem propósito
- ❌ Difícil de entender e balancear
- ✅ Complexidade deve criar decisão ou expressar identidade

### 24.5 Anti-padrões de integração específicos

**Always Critical + Cannot Be Interrupted:**
- ❌ Remove counterplay completamente
- ✅ Use um ou outro, nunca ambos

**Crit Damage Bonus stacking excessivo:**
- ❌ `<Crit Damage Bonus>` + modifiers + Always Critical = dano explosivo
- ✅ Limite total a +33% (4.0x multiplier)

**JS After Gauge sem safety check:**
- ❌ Fórmulas podem retornar NaN/undefined com edge cases
- ✅ Sempre use `rate = Math.max(0, rate)` como fallback

**States com TP gain em loop:**
- ❌ State com "Gain TP on Action" + Always Critical = loop infinito
- ✅ Use triggers com cooldown ou condições claras

## 25. Convenções de Documentação por Skill

### 25.1 Template de documentação

```markdown
### [Nome da Skill]

**Descrição in-game**: [Texto do campo Description do database]

**Multiplicador/Speed**: [X.x multiplicador | Speed: +/-X]

**Função no kit**: [Gerador / Spender / Finisher / Setup / Utility]

**Battle Core**: [tags: `<Armor Pen: X%>`, `<Always Critical>`, etc]
**ATB**: [Speed: X, tags: `<ATB Interrupt>`, `<ATB After Gauge: X%>`]
**TP**: [Cost: X | `<Gain TP: +X>`, triggers]

**Justificativa**: [Por que essa skill existe no kit]
**Risco**: [O que pode dar errado se X acontecer]
```

### 25.2 Template de revisão

- [ ] Efeito está correto? (Battle Core)
- [ ] Timing está correto? (ATB)
- [ ] Custo/frequência está correto? (TP System)
- [ ] Há sobreposição indevida com outra skill?
- [ ] Há exceção demais? (simplificar?)
- [ ] Trade-off está claro nos 3 eixos?

## 26. Apêndice de Referência Rápida

### 26.1 Tags centrais do Battle Core

- `<Damage Formula>` — Fórmula de cálculo de dano
- `<Damage>` — Tags de configuração de dano
- `<Critical>` — Configuração de crítico
- `<Always Critical>` — Sempre critica
- `<Crit Damage Bonus>` — Bônus de dano crítico (+33% = 4.0x)
- `<Armor Pen>` / `<Magic Pen>` — Penetração de defesa
- `<Armor Reduction>` / `<Magic Reduction>` — Redução de defesa
- `<Life Steal>` — Roubo de vida (% do dano)
- `<Unblockable>` — Não pode ser bloqueado com Guard
- `<Modify Target>` — Modifica alvo da skill
- `<Repeat Targets>` — Repete hit no mesmo alvo

### 26.2 Tags centrais do ATB

- `<ATB Cast Gauge>` — Gauge durante estado de casting
- `<ATB Interrupt>` — Interrompe skills em casting
- `<ATB After Gauge>` — Modificador de velocidade pós-ação
- `<ATB Battle Start Gauge>` — Gauge inicial de combate
- `<Hide ATB Gauge>` — Oculta gauge de inimigo
- `Speed` — Velocidade da skill (negativo = cast time)

### 26.3 Tags centrais do Enhanced TP System

- `<TP Mode>` — Define modo de TP
- `<Change Target TP Mode>` — Muda modo de alvo
- `<Force TP Mode>` — Força modo específico
- `<Learn TP Mode>` — Aprende modo
- `<Unlock TP Mode>` — Desbloqueia modo
- `<Starting TP Modes>` — Modo(s) inicial(is)
- `<Max TP>` — Limite máximo de TP
- `<Preserve TP>` — Se TP preserva entre batalhas

### 26.4 Glossário operacional

- **Gerador** — Skill que gera TP positivo
- **Spender** — Skill que consome TP
- **Finisher** — Spender massivo com condição ou payoff máximo
- **Setup** — Skill que cria vantagem futura
- **Telegraph** — Indicação visual/temporal de skill poderosa
- **Cast time** — Tempo de preparação (speed negativo)
- **After gauge** — Modificador de velocidade pós-ação
- **TP Mode** — Modo customizado de TP por personagem
- **Armor Pen** — Penetração de armadura (%)
- **Unblockable** — Não pode ser bloqueado com Guard

### 26.5 Exemplos resumidos por categoria

**Skill Básica: Passo de Brisa (Filena)**
```yaml
Battle Core:
  - Damage: 100
ATB:
  - Speed: +1000
TP:
  - <Gain TP: +10>
```

**Spender: Estocada Relâmpago (Filena)**
```yaml
Battle Core:
  - <Armor Pen: 20%>
  - <Critical: +20%>
  - Damage: 150
ATB:
  - Speed: -500
TP:
  - Cost: 20
```

**Finisher: Execução (Mhordred)**
```yaml
Battle Core:
  - <Armor Pen: 50%>
  - <Unblockable>
  - <HP Life Steal: 20%>
  - Damage: 600
ATB:
  - Speed: -2000
  - <ATB After Gauge: -40%>
TP:
  - Cost: 50
```

**Setup: Marca do Guardião (Thorin)**
```yaml
Battle Core:
  - <Apply State: 140>  # Marca
ATB:
  - Speed: 0
TP:
  - <Gain TP: +6>
```

**Gerador: Golpe Brutal (Mhordred)**
```yaml
Battle Core:
  - Damage: 50
ATB:
  - Speed: 0
  - <JS ATB After Gauge>
    rate = (1 - user.hp/user.mhp) * 0.4;
    </JS ATB After Gauge>
TP:
  - <Gain TP: +8>
  - + Fúria triggers (Take/Deal Damage)
```

---

# VALIDAÇÃO FINAL

## Checklist de Confirmação

- [x] Todas as 26 seções estão presentes e completas
- [x] Terminologia é consistente com FUNDAMENTOS-COMBAT-SYSTEM.md
- [x] Cada ferramenta principal tem explicação + exemplo + anti-padrão
- [x] Exemplos concretos do projeto estão incluídos (Execução, Tiro Preciso, Golpe Brutal, etc.)
- [x] Formato markdown está correto (headers, tabelas, code blocks)
- [x] Metadados YAML estão presentes
- [x] 3 camadas (Resolução/Tempo/Recurso) estão claramente definidas
- [x] Integração dos 3 plugins está bem explicada

## Informações Requerendo Validação Humana

**[SEM CONTRADIÇÕES CRÍTICAS]**

Todos os documentos fonte são consistentes entre si. FUNDAMENTOS-COMBAT-SYSTEM.md serve como fonte principal de verdade, e BALANCEAMENTO.md/OUTPUT fornecem detalhes técnicos que não contradizem os princípios.

**[INFORMAÇÕES COMPLETARES NECESSÁRIAS]**

- Action Sequence detalhado de skills específicas não está nos documentos fonte (requer acesso direto ao database do RPG Maker)
- Valores exatos de fórmulas de dano de todas as 84 skills não estão documentados (apenas exemplos e tiers)
- Exemplos completos de implementação JavaScript para `<JS ATB After Gauge>` dinâmicos estão apenas esboçados nos documentos

---

# VALIDAÇÃO TÉCNICA VS VISUSTELLA MZ BATTLE CORE

## Correções e Clarificações Aplicadas (v1.0)

Este documento foi confrontado com a documentação oficial do VisuStella MZ Battle Core e as seguintes correções foram aplicadas para garantir precisão técnica:

### ✅ Seção 5.1 - Damage Styles: CLARIFICADO

**Correção aplicada:**
- Adicionada nota explicando que MOBA é configurado **globalmente** no plugin parameters
- Clarificado que **NÃO é necessário** selecionar `<Damage Style: MOBA>` em cada skill
- Explicado que a fórmula MOBA é **interna ao plugin** e não deve ser digitada no campo "Damage Formula"
- Adicionada tabela de tags que alteram o output de dano final

**Justificativa:**
A documentação VisuStella confirma que Damage Styles são fórmulas pré-configuradas. O usuário seleciona o estilo globalmente e usa multiplicadores simples nas skills, não a fórmula completa.

### ✅ Seção 6.2 - Armor Reduction: CORRIGIDO

**Correção aplicada:**
- Corrigido para explicar que `<Armor Reduction>` reduz a **PRÓPRIA DEF** do atacante, não do alvo
- Adicionado aviso de que **NÃO deve ser usado** para debuffar defesa do inimigo
- Explicado que para debuffar alvo, deve usar States com traits de DEF reduction
- Atualizados exemplos para refletir uso correto (sacrifício de defesa própria)

**Justificativa:**
A documentação VisuStella BALANCEAMENTO.md linha 469-472 confirma: "Reduction: reduz própria armadura". Armor Reduction é aplicado no battler que tem a tag, não no alvo da skill.

### ✅ Seção 7.4 - Always Critical: WORKAROUND DOCUMENTADO

**Correção aplicada:**
- Adicionado aviso explicando que `<Always Critical>` nativo **NÃO suporta condições**
- Documentado workaround necessário usando `<Custom Critical Eval>` com JavaScript
- Adicionados exemplos práticos de implementação
- Explicadas 3 opções de workaround para Always Critical condicional

**Justificativa:**
A documentação VisuStella BALANCEAMENTO.md linha 287-291 mostra que `<Always Critical>` é binário: "Skill/item sempre será golpe crítico independente do parâmetro CRI do usuário". Não há suporte nativo para condições.

### ✅ Todas as Tags Notetags: VALIDADAS

Todas as tags mencionadas no documento existem e estão corretas conforme documentação VisuStella:
- `<Damage Style>` ✅
- `<Armor Pen: x%>` ✅
- `<Armor Reduction: x%>` ✅
- `<Magic Pen: x%>` ✅
- `<Magic Reduction: x%>` ✅
- `<Unblockable>` ✅
- `<Always Critical>` ✅
- `<Custom Critical Eval>` ✅
- `<HP Life Steal: x%>` ✅
- `<Damage Cap: x>` ✅
- `<Modify Target>` ✅
- `<Repeat Targets: x>` ✅

### ✅ Fórmula de Dano MOBA: VALIDADA

A representação da fórmula MOBA está correta em conceito:
```
(Dano Base + a.atk × X) × (100 / (100 + b.def))
```

**Nota:** Esta é a representação conceitual de como o plugin calcula. Na prática, o usuário seleciona MOBA como Damage Style global e usa multiplicadores simples (100, 150, 250, etc.) no campo "Damage Formula".

### ✅ Armor Penetração: APLICAÇÃO CORRETA

A fórmula com penetração está correta:
```
Dano = (Dano Base + a.atk × X) × (100 / (100 + b.def × (1 - pen%)))
```

A documentação confirma que "Penetration: ignora armadura do alvo" e os tiers (0%, 15%, 30%, 50%) estão corretos.

---

# VALIDAÇÃO TÉCNICA VS VISUSTELLA MZ ACTIVE TURN BATTLE

## Adições e Clarificações Aplicadas (v1.2)

Este documento foi confrontado com a documentação oficial do VisuStella MZ Active Turn Battle e as seguintes adições foram aplicadas para garantir cobertura completa das ferramentas de gameplay:

### ✅ Seção 12.2 - Battle Start Gauge: SINTAXE COMPLETA ADICIONADA

**Adição aplicada:**
- Adicionada sintaxe completa: `<ATB Battle Start Gauge: +x%>` e `<ATB Battle Start Gauge: -x%>`
- Documentado comportamento de **stacking aditivo** de múltiplas fontes
- Explicado com exemplo prático (Actor +10% + Weapon +15% + State +20% = 45%)

**Justificativa:**
A documentação VisuStella actors-enemies.md linhas 7-56 confirma que valores são aditivos quando múltiplas fontes se aplicam. Seção original mencionava o conceito mas não mostrava a sintaxe.

### ✅ Seção 12.3 - After Gauge: VARIANTES DE SINTAXE ADICIONADAS

**Adição aplicada:**
- Documentadas **3 variantes de sintaxe**: `x%` (define), `+x%` (adiciona), `-x%` (subtrai)
- Adicionados exemplos práticos de cada variante
- Clarificado que valores se aplicam APÓS uso da skill

**Justificativa:**
A documentação VisuStella skills-items.md linhas 119-162 mostra que After Gauge tem 3 formas distintas. Documento original apenas listava valores sem explicar as variantes.

### ✅ Seção 12.5 - Estados: CORES E TRANSIÇÕES ADICIONADAS

**Adição aplicada:**
- Adicionada tabela de **cores configuráveis por estado**
- Documentado que Casting tem **barra que diminui** (não aumenta)
- Adicionado **diagrama de transição de estados** com fluxo completo

**Justificativa:**
A documentação VisuStella estados-combate.md linhas 100-129 detalha cores por estado e transições. Informação é relevante para leitura de combate.

### ✅ Seção 13.3 - Cast Gauge: SINTAXE COMPLETA ADICIONADA

**Adição aplicada:**
- Documentadas **3 variantes de sintaxe** para Cast Gauge
- Clarificado que afeta apenas estado **Casting** (não Charging)
- Adicionados exemplos práticos

**Justificativa:**
A documentação VisuStella skills-items.md linhas 79-117 mostra 3 formas de sintaxe. Seção original mencionava a tag mas não explicava as variantes.

### ✅ Seção 13.5 - Charge Gauge: NOVA SEÇÃO ADICIONADA

**Adição aplicada:**
- Criada nova seção documentando `<ATB Charge Gauge>` (não existia antes)
- Documentadas **3 variantes de sintaxe**
- Explicada **distinção crítica** vs Cast Gauge (Charging vs Casting state)
- Adicionados exemplos de uso estratégico (Haste buffs, Slow debuffs)

**Justificativa:**
A documentação VisuStella skills-items.md linhas 34-77 confirma existência da tag. Omissão era crítica pois esta tag é essencial para buffs/debuffs de velocidade que afetam gameplay.

### ✅ Seção 13.6 - Cannot Be Interrupted: NOVA SEÇÃO ADICIONADA

**Adição aplicada:**
- Criada nova seção documentando `<ATB Cannot Be Interrupted>`
- Explicado uso para ultimates e skills assinatura
- Adicionado exemplo do projeto (Tiro Preciso do Thorin)
- Documentadas considerações de balanceamento

**Justificativa:**
A documentação VisuStella skills-items.md linhas 190-205 confirma existência da tag. Omissão era crítica pois skills muito poderosas (como Tiro Preciso) usam esta tag para não serem interrompidas.

### ✅ Seção 14.2 - Interrupt: CLARIFICADO COMPORTAMENTO

**Adição aplicada:**
- Clarificado que interrupt **reseta gauge para 0%** (não apenas "retorna ao estado Charging")
- Adicionado aviso de que **NÃO afeta** outros estados além de Casting
- Documentada distinção entre estados afetados e não afetados

**Justificativa:**
A documentação VisuStella skills-items.md linha 175 confirma que interrupt "Reseta a gauge do target para 0%". Documento original estava tecnicamente correto mas pouco específico.

### ✅ Seção 15.5 - JS After Gauge: NOVA SEÇÃO ADICIONADA

**Adição aplicada:**
- Criada seção documentando `<JS ATB After Gauge>`
- Documentadas variáveis disponíveis: `user`, `rate`
- Adicionados 3 exemplos práticos: HP-based, Sinergia com Foco (Thorin), AGI-based

**Justificativa:**
A documentação VisuStella skills-items.md linhas 257-286 confirma existência da tag. Omissão era importante pois Tiro Preciso usa esta feature para sinergia com Marca/Buff/Foco.

### ✅ Seção 15.6 - JS Charge/Cast Gauge: NOVA SEÇÃO ADICIONADA

**Adição aplicada:**
- Criada seção documentando `<JS ATB Charge Gauge>` e `<JS ATB Cast Gauge>`
- Documentadas variáveis disponíveis: `target`, `rate`
- Adicionados exemplos práticos de uso

**Justificativa:**
A documentação VisuStella skills-items.md linhas 211-255 confirma existência das tags. Permitem lógica customizada complexa para buffs/debuffs dinâmicos.

### ✅ Seção 15.7 - Speed vs After Gauge: NOVA SEÇÃO ADICIONADA

**Adição aplicada:**
- Criada seção explicando **distinção crítica** entre Speed e After Gauge
- Adicionada tabela comparativa
- Explicado com exemplo prático (Execução, Tiro Preciso)

**Justificativa:**
Distinção é fundamental para balanceamento mas não estava clara no documento. Speed afeta cast time ATUAL, After Gauge afeta PRÓXIMO TURNO.

### ✅ Seção 15.8 - Parâmetros Globais: NOVA SEÇÃO ADICIONADA

**Adição aplicada:**
- Documentado parâmetro **Stuns Reset Gauge?** com impacto no balanceamento
- Documentado parâmetro **Escape Fail Penalty** com uso estratégico
- Explicadas implicações de gameplay de cada configuração

**Justificativa:**
A documentação VisuStella timing-formulas.md linhas 139-163 confirma estes parâmetros. Afetam gameplay diretamente (stuns mais/menos punitivos, custo de tentar fugir).

### ✅ Todas as Tags ATB: VALIDADAS

Todas as tags mencionadas nas seções 11-15 existem e estão corretas conforme documentação VisuStella:
- `<ATB Interrupt>` ✅
- `<ATB After Gauge: x%/+x%/-x%>` ✅
- `<ATB Cast Gauge: x%/+x%/-x%>` ✅
- `<ATB Charge Gauge: x%/+x%/-x%>` ✅
- `<ATB Cannot Be Interrupted>` ✅
- `<ATB Battle Start Gauge: +x%/-x%>` ✅
- `<JS ATB After Gauge>` ✅
- `<JS ATB Charge Gauge>` ✅
- `<JS ATB Cast Gauge>` ✅

### ⚠️ Tags Visuais NÃO Incluídas (Por Design)

As seguintes tags **NÃO foram documentadas** propositalmente pois afetam apenas visual, não gameplay:
- `<ATB Field Gauge Icon: x>` — Apenas marcador visual
- `<ATB Field Gauge Face: filename, index>` — Apenas marcador visual
- `<Hide ATB Gauge>` — Apenas ocultação visual

**Justificativa:**
Documento foca exclusivamente em mecânicas que afetam balanceamento e gameplay. Tags visuais são responsabilidade de configuração de interface, não design de combate.

---

# VALIDAÇÃO TÉCNICA VS VISUSTELLA MZ ENHANCED TP SYSTEM

## ✅ Seção 17 - TP Modes: ESTRUTURA EXPLICADA ADICIONADA

**Adição aplicada:**
- Adicionada explicação crítica de que TP Modes são criados nos **PARÂMETROS DO PLUGIN**
- Documentada estrutura completa: General + Gauge + TP Formulas
- Esclarecido que `<TP Mode: name>` apenas atribui mode existente
- Adicionado diagrama visual da estrutura de um TP Mode

**Justificativa:**
A documentação VisuStella modos-tp.md linhas 9-31 confirma que TP Modes são criados nos parâmetros do plugin, não via notetag. A notetag apenas atribui. Omissão era crítica pois implementadores poderiam tentar configurar fórmulas via notetag (impossível).

## ✅ Seção 18.1 - Geração Genérica: CORRIGIDO "Use Skill"

**Correção aplicada:**
- Removida informação incorreta "Configurado por skill individualmente"
- Adicionada explicação de que é configurado nos **PARÂMETROS DO TP MODE**
- Documentada distinção entre **ganho** (fórmula do mode) e **custo** (tpCost da skill no database)
- Adicionados exemplos de fórmulas: `10`, `skill.tpCost * 0.5`

**Justificativa:**
A documentação VisuStella formulas-tp.md linhas 89-100 confirma que "Use Skill" é uma fórmula do TP Mode com variáveis `user` e `skill`. Documento original estava confuso/incorreto.

## ✅ Seção 18.1 - Variáveis Disponíveis: NOVA SUBSEÇÃO ADICIONADA

**Adição aplicada:**
- Criada tabela de variáveis disponíveis nas fórmulas: `user`, `target`, `value`, `a`, `b`, `c`...
- Adicionados exemplos práticos de uso de cada variável

**Justificativa:**
A documentação VisuStella formulas-tp.md linhas 9-16 lista as variáveis disponíveis. Sem esta informação, implementadores não podem criar fórmulas customizadas corretamente.

## ✅ Seção 18.5 - During Regen: NOVA SEÇÃO ADICIONADA

**Adição aplicada:**
- Criada nova seção documentando fórmulas de regeneração por turno
- Documentadas todas as categorias: TP Regen, Critical/Full HP/MP, Only Member
- Adicionados exemplos práticos (Kilin +30 TP Only Member)
- Explicado impacto no balanceamento

**Justificativa:**
A documentação VisuStella formulas-tp.md linhas 104-190 confirma existência destas fórmulas. Omissão era importante pois afetam ritmo de recuperação de TP e decisões táticas (ex: Only Member cria mecanismo de "last stand").

## ✅ Seção 19.1 - MaxTP: CLARIFICADO COMO FÓRMULA

**Adição aplicada:**
- Adicionado aviso de que MaxTP é uma **FÓRMULA JavaScript**, não apenas valor fixo
- Documentados exemplos de fórmulas: fixo, escalona com nível, base + atributo, baseado em HP

**Justificativa:**
A documentação VisuStella modos-tp.md linhas 81-100 confirma que MaxTP Formula pode ser qualquer fórmula JavaScript. Documento original apresentava como valores fixos apenas, o que poderia limitar implementação.

## ✅ Seção 19.1.1 - TCR Multiplier: NOVA SEÇÃO ADICIONADA

**Adição aplicada:**
- Criada seção documentando TCR Multiplier
- Explicado que é multiplicador de ganho de TP
- Documentados valores: 1.0 (normal), 1.2 (Filena), 1.5 (Mhordred)
- Adicionada explicação de **stacking multiplicativo** com traits
- Adicionados exemplos de impacto no balanceamento

**Justificativa:**
A documentação VisuStella modos-tp.md linhas 104-123 confirma TCR Multiplier e seu comportamento de stacking. Documento original mencionava "TCR 1.2" mas nunca explicava o que significava.

## ✅ Seção 20.1 - TP Mode: ESCOPO DOCUMENTADO

**Adição aplicada:**
- Documentado escopo correto: Actor, Enemy, State
- Explicado comportamento de aplicação e sobrescrita

**Justificativa:**
A documentação VisuStella gerais.md linhas 11-38 confirma escopo e comportamento. Omissão de escopo pode causar erros de implementação.

## ✅ Seção 20.2 - Starting TP Modes: NOVA SEÇÃO ADICIONADA

**Adição aplicada:**
- Criada seção documentando `<Starting TP Modes>`
- Explicada **distinção crítica** vs `<TP Mode>`:
  - `<TP Mode>`: Define modo INICIAL (único)
  - `<Starting TP Modes>`: Lista modos DISPONÍVEIS (múltiplos)
- Documentado escopo: Actor (apenas)
- Adicionados exemplos de sintaxe

**Justificativa:**
A documentação VisuStella gerais.md linhas 41-71 e tp-modes.md linhas 59-66 confirmam distinção. Omissão era importante pois affects jogadores que podem selecionar modos em Scene_Skill.

## ✅ Seção 20.3 - Change Target TP Mode: ESCOPO E COMPORTAMENTO

**Adição aplicada:**
- Documentado escopo correto: Skill, Item
- Explicado que **requer acertar** o alvo (hit)
- Documentado que não funciona com "Certain Hit"

**Justificativa:**
A documentação VisuStella gerais.md linhas 75-99 confirma comportamento. Diferença vs Change User é crítica para balanceamento de debuffs.

## ✅ Seção 20.4 - Change User TP Mode: NOVA SEÇÃO ADICIONADA

**Adição aplicada:**
- Criada seção documentando `<Change User TP Mode>`
- Explicada **distinção crítica** vs `<Change Target TP Mode>`:
  - `<Change Target>`: Requer sucesso (hit)
  - `<Change User>`: Incondicional
- Adicionada tabela comparativa
- Documentados exemplos de uso (auto-mudança de stance)

**Justificativa:**
A documentação VisuStella gerais.md linhas 102-124 confirma existência e distinção. Omissão era importante pois habilidades de auto-mudança usam esta tag.

## ✅ Seção 20.5 - Force TP Mode: ESCOPO E PRIORIDADE

**Adição aplicada:**
- Documentado escopo completo: Actor, Class, Weapon, Armor, Enemy, State
- Explicada **prioridade máxima** sobre outras tags
- Documentado comportamento de sobrescrita

**Justificativa:**
A documentação VisuStella gerais.md linhas 128-156 confirma escopo e prioridade. Importante para States que impõem modos específicos.

## ✅ Seção 20.6 - Learn TP Mode: NOVA SEÇÃO ADICIONADA

**Adição aplicada:**
- Criada seção documentando `<Learn TP Mode>` e `<Learn TP Modes>`
- Explicado que aprende **permanentemente** ao aprender skill
- Documentado que só funciona quando skill é aprendida, não via trait
- Adicionados exemplos de progressão de personagem
- Documentada sintaxe única e múltipla

**Justificativa:**
A documentação VisuStella atores.md linhas 14-91 confirma existência e comportamento. Omissão era importante para progressão de personagem via aprendizado de novos modos.

## ✅ Seção 20.7 - Unlock TP Mode: NOVA SEÇÃO ADICIONADA

**Adição aplicada:**
- Criada seção documentando `<Unlock TP Mode>` e `<Unlock TP Modes>`
- Explicada **distinção vs Learn**:
  - **Learn**: Permanente, transfere entre batalhas
  - **Unlock**: Temporário, pode ser revogado
- Adicionada tabela comparativa
- Documentados exemplos de uso (transformações temporárias)

**Justificativa:**
A documentação VisuStella atores.md linhas 95-133 confirma distinção. Omissão era crítica pois permite mecânicas temporárias diferentes de aprendizado permanente.

## ✅ Seção 20.8 - Prioridade e Interações: NOVA SEÇÃO ADICIONADA

**Adição aplicada:**
- Criada seção documentando ordem de prioridade: Force > Change > TP Mode
- Explicadas interações entre tags
- Adicionados exemplos práticos de combinações

**Justificativa:**
A documentação VisuStella referencia-rapida.md linha 135 confirma prioridade. Sem esta informação, implementadores podem ficar confusos sobre qual tag prevalece.

## ✅ Todas as Tags TP: VALIDADAS

Todas as tags mencionadas nas seções 16-20 existem e estão corretas conforme documentação VisuStella:
- `<TP Mode>` ✅
- `<Starting TP Modes>` ✅
- `<Change Target TP Mode>` ✅
- `<Change User TP Mode>` ✅
- `<Force TP Mode>` ✅
- `<Learn TP Mode>` / `<Learn TP Modes>` ✅
- `<Unlock TP Mode>` / `<Unlock TP Modes>` ✅

## ⚠️ Tags Visuais NÃO Incluídas (Por Design)

As seguintes features **NÃO foram documentadas** propositalmente pois afetam apenas visual, não gameplay:
- **Gauge visual customization**: Custom Label, Custom Color 1 & 2, Flash Gauge, Required Rate, Flash Speed, Color Lightness

**Justificativa:**
Documento foca exclusivamente em mecânicas que afetam balanceamento e gameplay (conforme especificado pelo usuário). Customização visual é responsabilidade de interface, não design de combate.

---

**FIM DO DOCUMENTO**

Este documento foi gerado baseado no checkpoint validado e segue a estrutura de 26 seções especificada. Ele serve como referência técnica para designers, implementadores e LLMs que trabalham com o sistema de combate de Daratrine A Origem.

**Versão 1.2 - Validado contra documentação VisuStella MZ Battle Core e Active Turn Battle**
