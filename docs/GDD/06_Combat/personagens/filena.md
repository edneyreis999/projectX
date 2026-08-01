# Filena - Fighter (Punhos)

**Classe:** Fighter (Punhos)
**Arma Principal:** Luvas/Gantes
**Papel:** DPS físico móvel com alto controle de ritmo (Momentum)
**Papel Secundário:** Evasão/segurança pontual e setup de janela de dano para o time
**Referências:** Samira (Style Meter), Fiora (duelista técnica), Tifa (combo físico rápido), Juggernaut (Ultimate)
**Plugin Base:** VisuStella Enhanced TP System + Active Turn Battle

---

## Visão Geral

Anã jovem, atlética e ex-Splinter do time "Machados Enferrujados" de futebol rúnico. Sua experiência como recebedora de bolas conferiu-lhe extrema mobilidade, essencial para fechar distância rapidamente no combate.

---

## Estatísticas Base

| Atributo | Nível | nv30 | Descrição |
|----------|-------|------|-----------|
| **HP** | Alto | 3,200 | Resistência do trabalho nas minas |
| **MP** | Médio | — | Recursos para habilidades |
| **ATK** | Alto | 180 | Dano melee consistente |
| **DEF** | Médio | 85 | Proteção leve, foco em esquiva |
| **AGI** | Muito Alto | 160 | Mobilidade excepcional |
| **MAT** | Baixo | — | Sem uso de magia |

## Atributos Base de Combate

| Atributo | Valor | Padrão | Nota |
|----------|-------|--------|------|
| **Taxa de Acerto (HIT)** | 90% | 100% | -10% (depende de Thorin) |
| **Taxa de Evasão (EVA)** | 10% | 5% | +5% (móvel mas não extremamente evasiva) |
| **Taxa de Crítico (CRIT)** | 5% | 5% | Padrão |
| **Ataque Adicional** | +1 | 0 | Ataca 2x por turno (multi-hit inato) |

**Sinergia:** HIT baixo (90%) com multi-hits cria dependência de Thorin para precisão, mas ataque adicional garante pressão constante.

---

## Sistema de Dano MOBA (VisuStella Battle Core)

O projeto usa o **Damage Style MOBA** do VisuStella Battle Core. O campo `formula` das skills recebe um **multiplicador float** direto. O plugin calcula automaticamente: `Dano = formula × ATK × (100 / (100 + DEF_alvo))`.

**Regra crítica:** O campo `formula` é um multiplicador float, NÃO uma porcentagem inteira. `2.23` = multiplicador 2.23× do ATK bruto. Para detalhes completos, consulte `planos/021-balnceamento-status/filena/POSTMORTEM-FORMULAS-MOBA.md`.

| Tier | Dano Esperado (vs DEF 120) | Multiplicador MOBA |
|------|---------------------------|-------------------|
| Counter (Ripostar) | ~64 | `0.78` |
| T0 Gerador | ~90-99 | `1.10` ~ `1.21` |
| T1 Leve | ~146 | `1.79` |
| T2 Médio | ~183 | `2.23` |
| T3 Pesado | ~304 | `3.72` |
| T4 Finisher | ~540 | `6.60` |

*Referência: ATK Filena nv30 = 180 vs DEF 120 (Cristaleão).*

---

## Sistema de Recurso: Momentum & Embalo

A mecânica de Filena é construída sobre dois pilares: **Momentum**, o recurso que ela acumula, e **Embalo**, o bônus que ela ganha por manter o ritmo com ações consecutivas.

### Momentum (TP)

Momentum representa o "embalo" geral da Filena no combate. É o recurso (TP) que ela gasta para usar suas skills mais fortes (Spenders). Diferente de outros personagens, Filena não gera Momentum passivamente; ela precisa ser uma participante ativa no combate, primariamente através do **uso de skills geradoras** e de **contra-ataques via Ripostar** (sua passiva que reage a evasões). A decisão tática central para o jogador é quando e como gastar o Momentum acumulado.

### Embalo (Sistema de Combo)

Embalo é um bônus de performance que recompensa o uso consecutivo da mesma skill. Ele cria um mini-jogo de risco e recompensa no gerenciamento de ações.

- **Como Funciona:** Usar uma skill (Gerador ou Spender) aplica um state de "Embalo" em Filena vinculado àquela skill. Se a próxima skill for a **mesma**, o Embalo se fortalece, concedendo um bônus de TP. Trocar de skill **quebra o Embalo** e zera o bônus.
- **Bônus de Embalo (unificado para Geradores e Spenders):**
    - Cada uso consecutivo da mesma skill gera **+4 TP extras** por stack (máximo 3 stacks = +12 TP extra).
    - **Para Geradores:** Funciona como **ganho extra** — gera mais TP do que o normal.
    - **Para Spenders:** Funciona como **desconto** — o TP ganho via Embalo parcialmente compensa o custo da skill, tornando-a mais barata efetivamente.
- **Decisão Tática:** O jogador deve decidir entre:
    1. **Manter o Embalo:** Usar a mesma skill repetidamente para máxima eficiência de recurso (gerar mais TP ou recuperar parte do gasto).
    2. **Quebrar o Embalo:** Trocar de skill para reagir a uma situação tática (usar um CC, focar um alvo específico), sacrificando a eficiência do Embalo.

**Implementação:** Cada skill ativa aplica um State de Embalo único (ex: State 200 para Passo de Brisa, State 201 para Rasteira). O State concede `<Gain TP: +4>` por stack. Ao usar uma skill diferente, um `<JS On Use Action>` remove todos os States de Embalo anteriores e aplica o State da nova skill.

Este sistema faz com que a profundidade do gameplay não venha de skills com tiers de poder diferentes, mas sim da maestria do jogador em manter ou quebrar o fluxo de combate para maximizar o impacto de um kit com poder base nivelado.

---

## Configuração do TP Mode (VisuStella Enhanced TP System)

### General

| Parâmetro | Valor | Justificativa |
|-----------|-------|---------------|
| **TP Mode Name** | `Momentum` | Identidade do modo |
| **Icon** | (definir no database) | Ícone de luva/vento |
| **MaxTP Formula** | `Math.min(100, 10 + Math.floor(user.level * 3))` | Escala por level. Cap de 100 no level 30. |
| **TCR Multiplier** | `1.2` | +20% ganho de TP. Reforça a identidade de duelista ágil. |
| **Preserve TP** | `true` | Momentum persiste entre combates. Reforça fantasia de "embalo contínuo". |

**Progressão de MaxTP por Level:**

| Level | MaxTP | Initial TP (15%) | Notas |
|-------|-------|-------------------|-------|
| 1 | 13 | ~2 | Começa limitada — precisa buildar Momentum |
| 5 | 25 | ~4 | Primeiros spenders leves viáveis |
| 10 | 40 | ~6 | Spenders médios liberados |
| 15 | 55 | ~8 | Spenders pesados acessíveis |
| 20 | 70 | ~10 | Momentum alto sustenta rotação |
| 25 | 85 | ~13 | Quase no cap |
| 30 | 100 | ~15 | **Cap atingido.** Full power. |

### TP Formulas (Geração de Momentum)

As fontes de geração foram simplificadas ao máximo. A única fonte ativa de Momentum é o uso de skills + o sistema de Embalo.

| Trigger | Fórmula | TP Médio | Justificativa |
|---------|---------|----------|---------------|
| **Initial TP** | `Math.floor(user.maxTp() * 0.15)` | 2-15 TP | Escala com o level (ver tabela acima). Funciona COM Preserve TP — TP residual + Initial = bom número no início de cada combate. |
| **Evasion** | `0` | 0 | Evasão pura não gera Momentum. O ganho de TP por evasão vem exclusivamente da passiva **Ripostar** (contra-ataque). |
| **Use Skill** | `8` | 8 TP | **Única fonte ativa de geração.** Usar qualquer skill gera TP. Base para o sistema de Embalo. |
| **TP Regen** | `0` | 0 | **Sem geração passiva.** Momentum deve ser ATIVO. |
| **Take HP Damage** | `0` | 0 | Não gera recurso ao sofrer dano. |
| **Critical Hit** | `0` | 0 | Removido — geração simplificada. |
| **Deal HP Damage** | `0` | 0 | Removido — geração simplificada. |
| **Enemy Death** | `0` | 0 | Removido — geração simplificada. |
| **Deal Enemy State** | `0` | 0 | Removido — geração simplificada. |
| **Deal Enemy Debuff** | `0` | 0 | Removido — geração simplificada. |
| **Win Battle** | `0` | 0 | Removido — geração simplificada. |
| **Critical HP** | `0` | 0 | Não recompensa estar em perigo. |
| **Only Member** | `0` | 0 | Não é last stand — ela foge, não tanka sozinha. |

### Curva de Geração (Ritmo Esperado)

**Ciclo típico de Build (~3 ações com Embalo):**
- Skill 1 (gerador): +8 TP (Use Skill) = 8 TP, Embalo Nv.1
- Skill 2 (mesmo gerador): +8 TP (Use Skill) + Embalo Nv.1 (+4 TP) = 12 TP, Embalo Nv.2
- Skill 3 (mesmo gerador): +8 TP (Use Skill) + Embalo Nv.2 (+8 TP) = 16 TP, Embalo Nv.3
- **Total por ciclo: ~36 TP** (com TCR 1.2: ~43 TP)

**Com Ripostar (contra-ataque por evasão):** +5 TP por evasão contra-atacada. Adiciona ~5-10 TP por turno se o inimigo atacar e errar.

**Para chegar a 45+ TP (Spenders Pesados):** ~1.5 ciclos = 4-5 ações = 2-3 turnos de build ativo com Embalo.

---

## Integração com o ATB

### Momentum como Modificador Dinâmico de After Gauge

A integração central usa `<JS ATB After Gauge>` para que o After Gauge de cada skill seja calculado dinamicamente baseado no TP atual:

```javascript
<JS ATB After Gauge>
// Momentum acelera After Gauge: cada 10 TP = +2% de bônus
var momentumBonus = Math.floor(user.tp / 10) * 0.02;
rate = Math.min(momentumBonus, 0.30);
</JS ATB After Gauge>
```

| TP Atual | After Gauge Bônus | Efeito Prático |
|----------|-------------------|----------------|
| 0-9 TP | 0% | Sem bônus (base) |
| 30 TP | +6% | Turnos levemente mais rápidos |
| 50 TP | +10% | Ritmo acelerado |
| 70 TP | +14% | Pre-Ultimate: muito ágil |
| 100 TP | +20% (cap 30%) | Full momentum: máxima velocidade |

**Implementação:** Aplicado via STATE permanente da Filena (state que contém a tag `<JS ATB After Gauge>`), ativado por plugin command no setup do personagem.

### Diagrama do Loop ATB-Momentum-Embalo

```
[Início do Combate]
    | (Preserve ON: pode ter TP residual)
[Charging]
    |
[Ready] -> [Passo de Brisa: +8 TP, inicia Embalo Nv.1]
    | (Momentum cresce)
[Charging mais rápido] <-- Momentum After Gauge bônus ativo
    |
[Ready] -> [Passo de Brisa: +8 TP + Embalo Nv.2 (+4 TP)]
    | (Geração acelerada pelo Embalo)
[Ready] -> [Passo de Brisa: +8 TP + Embalo Nv.3 (+8 TP) = +16 TP]
    | (36+ TP acumulado)
[Ready] -> [Spender Leve: -15 TP + Embalo +4 TP, quebra Embalo do gerador]
    | (TP líquido: -15 + 4 = -11 TP, novo Embalo do Spender Nv.1)
[Ready] -> [Mesmo Spender: -15 TP + Embalo Nv.2 (+8 TP)]
    | (TP líquido: -15 + 8 = -7 TP, cada vez mais barato)
    |
    | (45+ TP acumulado)
[Ready] -> [Spender Pesado: -45 TP, quebra Embalo]
    |
[Charging LENTO] <-- After Gauge negativo + TP baixo (sem bônus Momentum)
    | (vulnerabilidade)
[Rebuild via geradores com Embalo + Ripostar contra-ataques]
```

---

## Kit de Skills

Filena usa **luvas/gantes** como arma. Todos os nomes e descrições refletem golpes de impacto, punhos e combos manuais — sem referências a lâminas ou cortes.

Todas as skills são projetadas para terem um score final no **Tier 1 (1-50)**. A diferença entre "Leve", "Médio" e "Pesado" não está no score, mas sim no **custo de Momentum**, no **papel tático** (dano vs. utilidade) e nos **trade-offs** exigidos do jogador. Cada skill de dano lista sua **Fórmula MOBA** (multiplicador float para o campo `formula` do VisuStella).

Spender Leves focam em **CC (20-40% chance)**, enquanto Spender Pesados focam em **dano puro**. Isso garante que cada tipo de spender tenha um nicho tático claro.

### Passivas

#### **1. Fluxo Contínuo**
- **Tipo:** Passiva
- **Descrição:** O Momentum acumulado por Filena acelera sua recuperação pós-ação. Habilita o `<JS ATB After Gauge>` no state permanente.
- **Implementação:** State permanente com a tag de After Gauge dinâmico.

#### **2. Ripostar**
- **Tipo:** Passiva
- **Descrição:** Ao evadir de um ataque, Filena executa um contra-ataque imediato no agressor com as luvas.
- **Efeito:** Counter com fórmula MOBA `0.78` + gera 5 TP. **Esta é a única fonte de TP por evasão.** Dano: 0.78 × ATK × mit = ~64 mitigado (vs DEF 120).
- **Implementação:** Via `<Counter Control>` do VisuStella Battle Core, triggerado por evasão bem-sucedida. Campo `formula`: `0.78`. Skill ID 46.

### Geradores

#### **3. Passo de Brisa**
- **Tipo:** Gerador (Dano)
- **Descrição:** Um golpe rápido e ágil que gera Momentum. Uma punhada direta aproveitando a velocidade da duelista. Ideal para iniciar ou manter o Embalo.
- **Score Breakdown:**

| Modificador | Valor | Score | Eixo |
|-------------|-------|-------|------|
| Multiplicador Dano | 1.0x | 0 | Efeito |
| Speed | +1000 | +8 | Tempo |
| Ganho TP | +8 (Use Skill) | 0 | Recurso |

- **Subtotal Efeito:** 0 × 2 = **0**
- **Subtotal Tempo:** **+8**
- **Subtotal Recurso:** **0**
- **Score Final: 8** — **Tier 1**

**Embalo:** +4 TP por stack (máx 3 stacks). No Nv.3: +8 (base) + 12 (embalo) = +20 TP por uso.

**Fórmula MOBA:** `1.21` — Dano = 1.21 × ATK × mit = ~99 mitigado (vs DEF 120). Skill ID 47.

---

#### **4. Golpe Marcador**
- **Tipo:** Gerador (Setup)
- **Descrição:** Um impacto calculado com a luva que aplica "Marcação" no alvo, aumentando HIT e Crit Rate de todos os ataques contra ele.
- **Score Breakdown:**

| Modificador | Valor | Score | Eixo |
|-------------|-------|-------|------|
| Multiplicador Dano | 0.9x | -5 | Efeito |
| CC: Marcação | 100% chance | +12 | Efeito |
| Speed | +500 | +5 | Tempo |
| Ganho TP | +8 (Use Skill) | 0 | Recurso |

- **Subtotal Efeito:** (-5 + 12) × 2 = **+14**
- **Subtotal Tempo:** **+5**
- **Subtotal Recurso:** **0**
- **Score Final: 19** — **Tier 1**

**Embalo:** +4 TP por stack (máx 3 stacks). Setup para o time inteiro — mantê-lo via Embalo é taticamente forte.

**Fórmula MOBA:** `1.10` — Dano = 1.10 × ATK × mit = ~90 mitigado (vs DEF 120). Skill ID 48.

---

### Spenders Leves (Foco em CC)

#### **5. Rasteira**
- **Tipo:** Spender Leve (CC)
- **Descrição:** Um golpe baixo com a perna ou luva que visa desestabilizar o oponente. Chance de aplicar Slow.
- **Score Breakdown:**

| Modificador | Valor | Score | Eixo |
|-------------|-------|-------|------|
| Multiplicador Dano | 1.1x | +8 | Efeito |
| CC: Slow | 40% chance | +8 × 0.4 = +3 | Efeito |
| Custo TP | -15 | -10 | Recurso |

- **Subtotal Efeito:** (8 + 3) × 2 = **+22**
- **Subtotal Tempo:** **0**
- **Subtotal Recurso:** **-10**
- **Score Final: 12** — **Tier 1**

**Embalo:** +4 TP por stack (máx 3 stacks). No Nv.3: gasta 15 TP mas recupera 12 TP via Embalo = **custo efetivo de 3 TP**. Spender de CC muito barato se mantido.

**Fórmula MOBA:** `1.79` — Dano = 1.79 × ATK × mit = ~146 mitigado (vs DEF 120). Skill ID 49.

---

#### **6. Punho Cegante**
- **Tipo:** Spender Leve (CC)
- **Descrição:** Um soco rápido na altura dos olhos do inimigo, com chance de aplicar Cegueira.
- **Score Breakdown:**

| Modificador | Valor | Score | Eixo |
|-------------|-------|-------|------|
| Multiplicador Dano | 1.1x | +8 | Efeito |
| CC: Cegueira | 30% chance | +10 × 0.3 = +3 | Efeito |
| Custo TP | -15 | -10 | Recurso |

- **Subtotal Efeito:** (8 + 3) × 2 = **+22**
- **Subtotal Tempo:** **0**
- **Subtotal Recurso:** **-10**
- **Score Final: 12** — **Tier 1**

**Embalo:** +4 TP por stack (máx 3 stacks). CC defensivo — reduz HIT do inimigo em -50%.

**Fórmula MOBA:** `1.79` — Dano = 1.79 × ATK × mit = ~146 mitigado (vs DEF 120). Skill ID 50.

---

### Spenders Médios

#### **7. Combo Duplo**
- **Tipo:** Spender Médio (Dano)
- **Descrição:** Uma sequência de dois golpes rápidos com as luvas. Dano total superior, mas sem utilidade adicional.
- **Score Breakdown:**

| Modificador | Valor | Score | Eixo |
|-------------|-------|-------|------|
| Multiplicador Dano | 1.0x | 0 | Efeito |
| Quantidade de Hits | 2 hits | +12 | Efeito |
| After Gauge | -5% | -5 | Tempo |
| Custo TP | -25 | -18 | Recurso |

- **Subtotal Efeito:** (0 + 12) × 2 = **+24**
- **Subtotal Tempo:** **-5**
- **Subtotal Recurso:** **-18**
- **Score Final: 1** — **Tier 1**

**Embalo:** +4 TP por stack (máx 3 stacks). No Nv.3: gasta 25 TP mas recupera 12 TP via Embalo = **custo efetivo de 13 TP**. Dano total 2.0x por custo reduzido.

**Fórmula MOBA:** `2.23` — Dano = 2.23 × ATK × mit = ~183 mitigado POR HIT (vs DEF 120). Total 2 hits: ~366. Skill ID 51.

---

#### **8. Golpe Atordoante**
- **Tipo:** Spender Médio (CC)
- **Descrição:** Um impacto forte no ponto certo que pode atordoar o oponente. Sem dano extra — o poder está no Stun.
- **Score Breakdown:**

| Modificador | Valor | Score | Eixo |
|-------------|-------|-------|------|
| Multiplicador Dano | 1.0x | 0 | Efeito |
| CC: Stun | 100% chance | +25 | Efeito |
| Custo TP | -25 | -18 | Recurso |

- **Subtotal Efeito:** (0 + 25) × 2 = **+50**
- **Subtotal Tempo:** **0**
- **Subtotal Recurso:** **-18**
- **Score Final: 32** — **Tier 1**

**Embalo:** +4 TP por stack (máx 3 stacks). Stun é o hard CC mais forte do kit. Hard CC puro — o jogador escolhe entre dano (Combo Duplo) ou controle (Golpe Atordoante).

**Fórmula MOBA:** `2.23` — Dano = 2.23 × ATK × mit = ~183 mitigado (vs DEF 120). Skill ID 52.

---

### Spenders Pesados (Foco em Dano Puro)

#### **9. Punho Devastador**
- **Tipo:** Spender Pesado (Dano Puro)
- **Descrição:** Um soco poderoso que ignora parte da armadura inimiga. Exige breve tempo de preparação, sendo interruptível.
- **Score Breakdown:**

| Modificador | Valor | Score | Eixo |
|-------------|-------|-------|------|
| Multiplicador Dano | 1.5x | +20 | Efeito |
| Armor Penetration | 25% | +15 | Efeito |
| Speed | -500 | -10 | Tempo |
| Interruptível | Sim | -8 | Tempo |
| Custo TP | -35 | -25 | Recurso |

- **Subtotal Efeito:** (20 + 15) × 2 = **+70**
- **Subtotal Tempo:** -10 - 8 = **-18**
- **Subtotal Recurso:** **-25**
- **Score Final: 27** — **Tier 1**

**Embalo:** +4 TP por stack (máx 3 stacks). No Nv.3: gasta 35 TP mas recupera 12 TP via Embalo = **custo efetivo de 23 TP**. O spender de dano mais eficiente se mantido com Embalo.

**Fórmula MOBA:** `3.72` — Dano = 3.72 × ATK × mit = ~304 mitigado (vs DEF 120). Skill ID 53.

---

#### **10. Ira da Duelista**
- **Tipo:** Spender Pesado (Risco/Recompensa)
- **Descrição:** Filena se buffa com ATK mas sacrifica sua defesa. O golpe seguinte é devastador mas a deixa vulnerável.
- **Score Breakdown:**

| Modificador | Valor | Score | Eixo |
|-------------|-------|-------|------|
| Multiplicador Dano | 1.8x | +25 | Efeito |
| Buff Próprio | ATK +50% (2 stacks) | +12 | Efeito |
| Debuff Próprio | DEF -50% (2 stacks) | -12 | Efeito |
| After Gauge | -25% | -12 | Tempo |
| Custo TP | -40 | -28 | Recurso |

- **Subtotal Efeito:** (25 + 12 - 12) × 2 = **+50**
- **Subtotal Tempo:** **-12**
- **Subtotal Recurso:** **-28**
- **Score Final: 10** — **Tier 1**

**Embalo:** +4 TP por stack (máx 3 stacks). Alto risco: DEF -50% + After Gauge -25% = vulnerabilidade severa. Melhor usada quando o inimigo está com CC (Stun do Golpe Atordoante).

**Fórmula MOBA:** `6.60` — Dano = 6.60 × ATK × mit = ~540 mitigado (vs DEF 120). Skill ID 54.

---

### Ultimate

#### **11. Dança dos Ventos**
- **Tipo:** Finisher / Ultimate
- **Inspiração:** Omnislash (Juggernaut/Dota)
- **Descrição:** Filena entra em frenesi, desferindo uma rajada de 4 golpes com as luvas em alvos aleatórios. O dano por golpe é moderado e incontrolável, mas o potencial de dano total é alto. Exige enorme custo de Momentum e a deixa vulnerável após o uso.
- **Score Breakdown:**

| Modificador | Valor | Score | Eixo |
|-------------|-------|-------|------|
| Multiplicador Dano | 1.4x | +12 | Efeito |
| Quantidade de Hits | 4 hits | +22 | Efeito |
| Escopo | Aleatório | -10 | Efeito |
| Cannot Be Interrupted | Sim | +10 | Tempo |
| Speed | -500 | -10 | Tempo |
| After Gauge | -20% | -10 | Tempo |
| Custo TP | -45 | -32 | Recurso |

- **Subtotal Efeito:** (12 + 22 - 10) × 2 = **+48**
- **Subtotal Tempo:** +10 - 10 - 10 = **-10**
- **Subtotal Recurso:** **-32**
- **Score Final: 6** — **Tier 1**

**Dano total:** 4 hits × 1.4x = **5.6x de multiplicador total** — massivo, mas distribuído aleatoriamente.

**Nota:** Dança dos Ventos SEMPRE quebra o Embalo (é Ultimate — o jogador sacrifica a eficiência acumulada pelo burst). O jogador escolhe entre manter Embalo para rotação sustentada ou sacrificar tudo por este burst explosivo.

**Fórmula MOBA:** `6.60` — Dano = 6.60 × ATK × mit = ~540 mitigado POR HIT (vs DEF 120). Total 4 hits aleatórios: ~2,160. Skill ID 55.

---

### Tabela Consolidada do Kit

| # | Nome | Tipo | Papel | TP Cost | MOBA | Dano Mitigado | CC/Efeito | Speed | Score | Tier |
|---|------|------|-------|---------|------|---------------|-----------|-------|-------|------|
| 1 | Fluxo Contínuo | Passiva | After Gauge dinâmico | — | — | — | — | — | — | — |
| 2 | Ripostar | Passiva | Counter ao evadir | — | `0.78` | ~64 | +5 TP | — | — | — |
| 3 | Passo de Brisa | Gerador | Dano + TP | 0 | `1.21` | ~99 | — | +1000 | 8 | T1 |
| 4 | Golpe Marcador | Gerador | Setup + TP | 0 | `1.10` | ~90 | Marcação 100% | +500 | 19 | T1 |
| 5 | Rasteira | Spender Leve | CC | -15 | `1.79` | ~146 | Slow 40% | 0 | 12 | T1 |
| 6 | Punho Cegante | Spender Leve | CC | -15 | `1.79` | ~146 | Cegueira 30% | 0 | 12 | T1 |
| 7 | Combo Duplo | Spender Médio | Dano | -25 | `2.23` | ~183/hit (2) | — | -5% AG | 1 | T1 |
| 8 | Golpe Atordoante | Spender Médio | CC | -25 | `2.23` | ~183 | Stun 100% | 0 | 32 | T1 |
| 9 | Punho Devastador | Spender Pesado | Dano Puro | -35 | `3.72` | ~304 | Armor Pen 25% | -500 | 27 | T1 |
| 10 | Ira da Duelista | Spender Pesado | Risco/Recomp | -40 | `6.60` | ~540 | ATK+50%, DEF-50% | -25% AG | 10 | T1 |
| 11 | Dança dos Ventos | Ultimate | Burst | -45 | `6.60` | ~540/hit (4) | Random Target | -500, -20% AG | 6 | T1 |

**AG = After Gauge. Dano mitigado calculado com ATK 180 vs DEF 120 (Cristaleão).**

---

## Sinergias de Grupo

- **Thorin:** HIT baixo de Filena (90%) pede Marcação de Thorin. Golpe Marcador (+HIT/Crit no alvo) complementa o setup de Thorin.
- **Kilin:** Protege Filena enquanto ela avança. Ira da Duelista (DEF -50%) pede cobertura de tanque.
- **Balastrus:** Suporte de área combo com mobilidade da Filena.

---

## Validação

- [x] **Mecânica de Embalo unificada:** Geradores e Spenders ganham o mesmo bônus (+4 TP/stack). Para geradores é ganho extra; para spenders funciona como desconto.
- [x] **Evasão não gera Momentum diretamente:** Evasion = 0. O único TP por evasão vem da passiva Ripostar (counter com +5 TP).
- [x] **MaxTP escala por level:** `Math.min(100, 10 + Math.floor(user.level * 3))`. Cap de 100 no level 30. Progressão natural.
- [x] **Initial TP explicado:** 15% do MaxTP, escala com level (2 TP no level 1, 15 TP no level 30).
- [x] **Spender Leves = CC, Spender Pesados = Dano:** Nichos táticos claros.
- [x] **Skills renomeadas para tema luvas/gantes:** Sem referências a lâminas ou cortes. Todos os golpes são de impacto/combate corpo a corpo.
- [x] **Golpe Atordoante:** Stun 100% (hard CC) substitui Ferida Exposta. Faz mais sentido com luvas — impacto atordoante.
- [x] **Kit de 11 skills:** Todas com score no Tier 1 (1-50).
- [x] **Ultimate Omnislash implementada:** Dança dos Ventos — 4 hits aleatórios, 5.6x dano total, Cannot Be Interrupted.
- [x] **Ripostar (counter ao evadir) implementada:** Passiva que contra-ataca ao evadir, gerando 5 TP — única fonte de TP por evasão.

[[02_Atlas_Folk/02.2_Personagens/Filena|Perfil narrativo de Filena]]
