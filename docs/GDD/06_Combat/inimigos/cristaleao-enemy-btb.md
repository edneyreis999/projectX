# Template de Inimigo BTB - Cristaleão
## Battle System - BTB VisuStella MZ

**Versão do Template:** 1.3
**Compatível com:** VisuStella MZ - Battle System BTB
**Status:** Implementado
**Data:** 2026-03-19

---

## INTRODUÇÃO

Este documento contém a configuração completa do Boss **Cristaleão** para o sistema BTB, conforme implementado no jogo.

---

## 1. METADADOS DE DESIGN

| Campo | Descrição | Valor |
|-------|-----------|-------|
| **Nome** | Cristaleão | Cristaleão |
| **ID** | ID único no database Enemies | 17 |
| **Região** | Localização no jogo | Minas de Kravens - 3º Andar |
| **Tier** | Common \| Elite \| Boss | Boss (Primeiro do Jogo) |
| **Família** | Feras \| Arcanos \| Construtos \| Sombras | Arcanos/Híbrido |
| **Nível** | Nível do boss | 20 |

**Ciclo:** Predador Oculto
**Arquétipo:** Boss de Engano / Puzzle de Paciência

---

## 2. PARÂMETROS BASE DO INIMIGO

Parâmetros implementados para o boss nível 20 contra heróis nível 18.

| Parâmetro | Valor | Notas |
|-----------|-------|-------|
| **MHP (HP)** | 7,500 | ~4.4x HP médio dos heróis |
| **MMP (MP)** | 400 | ~3x MP médio dos heróis |
| **ATK (Ataque)** | 85 | ~1.35x ATK médio dos heróis |
| **DEF (Defesa)** | 60 | ~1.1x DEF média dos heróis |
| **MAT (M. Ataque)** | 40 | ~1.5x MAT médio dos heróis |
| **MDF (M. Defesa)** | 50 | ~1.3x MDF média dos heróis |
| **AGI (Agilidade)** | 75 | ~1.1x AGI média dos heróis |
| **LUK (Sorte)** | 110 | ~1.6x LUK média dos heróis |

**EXP:** 2,000
**Gold:** 500
**Battler Name:** Coreto_Cristaleao

### Atributos (Traits)

O Cristaleão possui os seguintes traits base (code: 22 - TRAIT_XPARAM):
- **HIT Rate:** 95% (dataId: 0, value: 0.95)
- **Evasion:** +5% (dataId: 1, value: 0.05)

---

## 3. PARÂMETROS BTB DO INIMIGO

Todos estes campos usam notetags na seção **Note** do inimigo no database Enemies.

### BP (Brave Points) - Configuração Básica

| Campo | Notetag | Descrição | Valores Configurados |
|-------|---------|-----------|---------------------|
| **BP Inicial** | `<BTB Initial BP: +1>` | BP no início do combate | +1 |
| **BP Máximo** | `<BTB Maximum BP: +3>` | Aumenta o limite máximo de BP | +3 (total: 4 BP) |
| **BP Mínimo** | `<BTB Minimum BP: -3>` | Diminui o limite mínimo de BP | -3 (vulnerabilidade) |
| **BP Regen** | `<BTB BP Regen: +1>` | BP ganho por turno | +1 |

### Máximo de Ações

| Campo | Notetag | Descrição | Valores Configurados |
|-------|---------|-----------|---------------------|
| **Maximum Actions** | `<BTB Maximum Actions: +3>` | Aumenta o máximo de ações via Brave | +3 |

### Notetag Completa no Database Enemies (Note):

```
<BTB Initial BP: +1>
<BTB Maximum BP: +3>
<BTB Minimum BP: -3>
<BTB BP Regen: +1>
<BTB Maximum Actions: +3>
<BTB Turn Order Icon: 98>
<BTB Turn Order Face: Nature, 0>
```

**Explicação:**
- **Initial BP +1:** Começa com vantagem
- **Maximum BP +3:** Pode carregar até +4 BP total (base 1 + bonus 3)
- **Minimum BP -3:** Pode ir vulnerável até -3 BP (janela de punição profunda)
- **BP Regen +1:** Recupera 1 BP por turno naturalmente
- **Maximum Actions +3:** Pode fazer até 4 ações sem Brave
- **Turn Order Icon 98:** Ícone customizado na fila de turnos
- **Turn Order Face Nature, 0:** Face customizada na fila (usando sprite Nature)

---

## 4. RESTRIÇÕES BTB

O Cristaleão **NÃO** possui restrições de Brave ou Fusion. Ele pode usar todas as mecânicas BTB livremente.

---

## 5. APARÊNCIA NA FILA DE TURNOS

| Campo | Notetag | Descrição | Exemplo |
|-------|---------|-----------|---------|
| **Turn Order Icon** | `<BTB Turn Order Icon: 98>` | Ícone na fila de turnos | Cristal customizado |
| **Turn Order Face** | `<BTB Turn Order Face: Nature, 0>` | Face customizada na fila | Sprite Nature |

---

## 6. SKILLS DO CRISTALEÃO

### Skill 11: "Espinho Veloz"

```
ID: 11
Name: Espinho Veloz
Description: Ataque físico com chance de sangramento.
Animation ID: 1
Damage Formula: a.atk * 1.5
Damage Type: 1 (HP Damage)
Element ID: 1 (Physical)
Hit Type: 1 (Certain Hit)
Scope: 1 (One Enemy)
Variance: 0
Critical: False
MP Cost: 0
TP Cost: 0
TP Gain: 10
Speed: 0
Success Rate: 100%
Repeats: 1
Stype ID: 0
Required WType ID 1: 0
Required WType ID 2: 0
Message Type: 1

Effects:
  - Code: 21 (Add State)
    Data ID: 31 (Sangramento)
    Value 1: 0.3 (30% chance)

Note:
<BTB BP Cost: 1>
```

**Descrição:** Ataque físico que aplica **Sangramento** com 30% de chance. Custo de 1 BP.

#### State: "Sangramento" (ID: 31)

```
Name: Sangramento
Icon Index: 10
Auto Removal Timing: 0 (Action End)
Max Turns: 1
Min Turns: 1
Priority: 50
Remove At Battle End: false
Remove By Damage: false
Remove By Restriction: false
Remove By Walking: false
Motion: 1
Overlay: 0
Message Type: 1

Traits (code: 22 - TRAIT_XPARAM):
  - HP Regen: -10% (dataId: 7, value: -0.1)

Messages:
  1: "%1 está sangrando!"
  2: "%1 está sangrando!"
  4: "%1 não está mais sangrando!"
```

**Explicação:**
- Remove no final da ação do battler
- Dura 1 turno
- Reduz regeneração de HP em 10%
- Não remove ao fim da batalha

---

### Skill 12: "Camuflagem de Kraven"

```
ID: 12
Name: Camuflagem de Kraven
Description: O Cristaleão se funde com as paredes cristalinas.
Animation ID: 0
Damage Formula: 0
Damage Type: 0 (None)
Hit Type: 0 (None)
Scope: 11 (User)
MP Cost: 0
TP Cost: 0
TP Gain: 10
Speed: 0
Success Rate: 100%
Stype ID: 1

Effects:
  - Code: 21 (Add State)
    Data ID: 51 (Camuflagem)
    Value 1: 1 (100% chance)

Note:
<BTB BP Cost: 1>
```

**Efeito:** Aplica State "Camuflagem" a si mesmo com 100% de chance. Custo de 1 BP.

#### State: "Camuflagem" (ID: 51)

```
Name: Camuflagem
Icon Index: 98
Auto Removal Timing: 1 (Turn End)
Max Turns: 5
Min Turns: 4
Priority: 90
Remove At Battle End: false
Remove By Damage: false
Remove By Restriction: false
Remove By Walking: false
Motion: 0
Overlay: 0
Message Type: 1

Traits (code: 22 - TRAIT_XPARAM):
  - Evasion: +70% (dataId: 1, value: 0.7)

Messages:
  2: "Cristaleão aumentou a evasão"
  4: "Aqui precisa colocar o status de vulneravel" [PENDENTE]

Note:
(vazio na implementação atual)
```

**Explicação:**
- Remove entre 4-5 turnos (autoRemovalTiming: 1)
- Concede +70% de evasão (priority: 90)
- **IMPORTANTE:** message4 contém placeholder não implementado
- **Vulnerabilidade:** State é removido pelo Common Event 21 após Investida Devastadora

---

### Skill 13: "Sussurro Cristalino"

```
ID: 13
Name: Sussurro Cristalino
Description: Sussurro místico que reduz a precisão da party.
Animation ID: 0
Damage Formula: 0
Damage Type: 0 (None)
Hit Type: 0 (None)
Scope: 2 (All Enemies)
MP Cost: 0
TP Cost: 0
TP Gain: 10
Speed: 0
Success Rate: 70%
Stype ID: 0

Effects:
  - Code: 21 (Add State)
    Data ID: 5 (Cegueira)
    Value 1: 0.7 (70% chance)

Note:
<BTB BP Cost: 1>
<BTB Help>Sussurro místico que reduz a precisão da party.
Chance de aplicar -30% HIT por 2 turnos.</BTB Help>
```

**Descrição:** Debuff de precisão. Aplica **Cegueira** que reduz HIT em 50%.

**Chance real de aplicação:** 70% (determinado pelo SuccessRate da skill).

#### State: "Cegueira" (ID: 5)

```
Name: Cegueira
Icon Index: 3
Auto Removal Timing: 1 (Turn End)
Max Turns: 5
Min Turns: 3
Priority: 60
Remove At Battle End: true
Remove By Damage: false
Remove By Restriction: false
Remove By Walking: false
Motion: 1
Overlay: 2 (olho fechado)
Message Type: 1

Traits (code: 22 - TRAIT_XPARAM):
  - HIT Rate: -50% (dataId: 0, value: -0.5)

Messages:
  1: "%1 foi cegado!"
  2: "%1 está cego!"
  4: "%1 não está mais cego!"
```

**Explicação:**
- Remove entre 3-5 turnos
- Reduz HIT rate em 50%
- Overlay 2 (ícone de olho fechado)

---

### Skill 14: "Investida Devastadora"

```
ID: 14
Name: Investida Devastadora
Description: ATAQUE MORTAL. Consome todo BP acumulado.
Animation ID: 1
Damage Formula: (a.atk * 4) + 200
Damage Type: 1 (HP Damage)
Element ID: 0 (None)
Hit Type: 1 (Certain Hit)
Scope: 2 (All Enemies)
Variance: 0
Critical: False
MP Cost: 0
TP Cost: 0
TP Gain: 10
Speed: 0
Success Rate: 100%
Stype ID: 0

Effects:
  - Code: 44 (Common Event)
    Data ID: 21

Note:
<BTB BP Cost: 1>
<BTB User Set BP: 0>
<JS Skill Enable>
  enabled = user.isStateAffected(7) && user.isStateAffected(51);
</JS Skill Enable>
<BTB Help>ATAQUE MORTAL. Consome todo BP acumulado.
Dano escala com BP. Use DEFENDER quando ele estiver carregando!
Só disponível com Fúria e Camuflagem ativos!</BTB Help>
```

**Explicação:**
- **Disponibilidade:** Só disponível quando Cristaleão tem Fúria (state 7) **E** Camuflagem (state 51) ativos
- **BP Cost:** 1 - Consome 1 BP para usar
- **User Set BP: 0** - Zera BP após uso
- **Fórmula:** Dano base (ATK * 4) + dano fixo de 200
- **Effect Code 44:** Invoca Common Event 21
- **Elemento:** Físico

**Exemplo de dano:**
- Sem bônus: 85 * 4 + 200 = 540 dano base
- Com Fúria (+30% ATK): 110.5 * 4 + 200 = 642 dano base

---

### Skill 15: "Enfurecer"

```
ID: 15
Name: Enfurecer
Description: (vazia)
Animation ID: 0
Damage Formula: 0
Damage Type: 0 (None)
Hit Type: 0 (None)
Scope: 11 (User)
MP Cost: 0
TP Cost: 0
TP Gain: 0
Speed: 5 (prioridade alta)
Success Rate: 100%
Stype ID: 0

Effects:
  - Code: 21 (Add State)
    Data ID: 7 (Fúria)
    Value 1: 1 (100% chance)

Note:
(vazio na implementação atual)
```

**Efeito:** Aplica **Fúria** a si mesmo com 100% de chance. Sem custo de BP.

#### State: "Fúria" (ID: 7)

```
Name: Fúria
Icon Index: 5
Auto Removal Timing: 1 (Turn End)
Max Turns: 3
Min Turns: 3
Priority: 70
Remove At Battle End: true
Remove By Damage: false
Remove By Restriction: false
Remove By Walking: false
Motion: 1
Overlay: 4 (raiva)
Message Type: 1

Traits (code: 21 - TRAIT_PARAM):
  - DEF: ×0.7 (-30% de defesa) - dataId: 3, value: 0.7
  - ATK: ×1.3 (+30% de ataque) - dataId: 2, value: 1.3
  - AGI: ×1.3 (+30% de agilidade) - dataId: 6, value: 1.3

Messages:
  1: "%1 está furioso!"
  2: "%1 está furioso!"
  4: "%1 não está mais furioso!"
```

**Explicação:**
- **DEF ×0.7 (-30%)**: Mais vulnerável a danos (trade-off)
- **ATK ×1.3 (+30%)**: Dano físico aumentado
- **AGI ×1.3 (+30%)**: Ação mais rápida na fila de turnos
- Duração: 3 turnos fixos
- **NÃO remove por dano** (removeByDamage: false)
- **NÃO afeta controle** (restriction: 0)

---

## 7. ACTION PATTERNS DA IA

Configuração das actions do Cristaleão no database Enemies:

```json
"actions": [
  {
    "skillId": 11,
    "rating": 1,
    "conditionType": 0,
    "conditionParam1": 0,
    "conditionParam2": 0
  },
  {
    "skillId": 13,
    "rating": 1,
    "conditionType": 4,
    "conditionParam1": 51,
    "conditionParam2": 0
  },
  {
    "skillId": 12,
    "rating": 3,
    "conditionType": 0,
    "conditionParam1": 0,
    "conditionParam2": 0
  },
  {
    "skillId": 14,
    "rating": 5,
    "conditionType": 0,
    "conditionParam1": 0,
    "conditionParam2": 0
  },
  {
    "skillId": 15,
    "rating": 7,
    "conditionType": 1,
    "conditionParam1": 1,
    "conditionParam2": 0
  },
  {
    "skillId": 15,
    "rating": 3,
    "conditionType": 2,
    "conditionParam1": 0,
    "conditionParam2": 0.5
  }
]
```

### Tabela de Actions e Condições

| Skill ID | Nome | Rating | Condition Type | Condition Params | Quando é Usado |
|----------|------|--------|----------------|------------------|----------------|
| 11 | Espinho Veloz | 1 | 0 (Always) | - | Sempre disponível, baixa prioridade |
| 13 | Sussurro Cristalino | 1 | 4 (Party Level) | param1: 51 | Quando nível da party ≥ 51 |
| 12 | Camuflagem de Kraven | 3 | 0 (Always) | - | Sempre disponível, média prioridade |
| 14 | Investida Devastadora | 5 | 0 (Always) | - | Sempre disponível, alta prioridade |
| 15 | Enfurecer | 7 | 1 (Turn) | param1: 1 | **Turno 1** - máxima prioridade |
| 15 | Enfurecer | 3 | 2 (Variable) | param1: 0, param2: 0.5 | Quando HP ≤ 50% |

### Sistema de Rating (Probabilidade)

- **Rating 7:** Muitíssima alta probabilidade (usado no Turno 1 para Enfurecer)
- **Rating 5:** Alta probabilidade (Investida Devastadora)
- **Rating 3:** Média probabilidade (Camuflagem, Enfurecer em HP baixo)
- **Rating 1:** Baixa probabilidade (Espinho Veloz, Sussurro Cristalino)

---

## 8. COMMON EVENTS

### Common Event 21: "Investida Devastadora"

O Cristaleão utiliza um Common Event para manipular states após usar a skill Investida Devastadora.

```
ID: 21
Name: Investida Devastadora
Trigger: 0 (None)
Switch ID: 1

List:
  1. Code: 333 (Remove State)
     Parameters: [-1, 1, 51]
     Remove State 51 (Camuflagem) do usuário

  2. Code: 333 (Remove State)
     Parameters: [-1, 0, 13]
     Remove State 13 (Atordoamento) do usuário

  3. Code: 0 (End)
```

**Efeito Prático:**
- **REMOVE State 51 (Camuflagem)** após a Investida Devastadora ser executada
- Cristaleão perde +70% de evasão
- Boss fica **VULNERÁVEL** (State 7 Fúria permanece ativo com DEF reduzida)
- Remove State 13 como medida de segurança (limpa atordoamento)

**Parâmetros do Code 333 (Remove State):**
- Param1 (-1): Target = usuário da skill (Cristaleão)
- Param2 (1/0): Slot do state
- Param3 (51/13): ID do state a remover

---

## 9. CICLO DE COMPORTAMENTO

```
┌─────────────────────────────────────────────────────────────────┐
│                    CICLO DO CRISTALEÃO                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  TURNO 1                     TURNO 2+                           │
│  ┌─────────┐                ┌─────────┐                        │
│  │ENFURECER│                │CAMUFLAGEM│                       │
│  │Rating 7 │───────┬───────▶│Rating 3 │                        │
│  │Aplica   │       │        │+70% EVA │                        │
│  │State 7  │       │        │State 51 │                        │
│  │(Fúria)  │       │        └─────────┘                        │
│  │-30% DEF │       │            │                             │
│  │+30% ATK │       │            ▼                             │
│  │+30% AGI │       │        ┌─────────┐                        │
│  └─────────┘       │        │ ACUMULA │                        │
│                    │        │   BP    │                        │
│                    │        └─────────┘                        │
│                    │            │                             │
│                    │            ▼                             │
│                    │        ┌─────────────────────────┐        │
│                    │        │ STATES ATIVOS:          │        │
│                    │        │ • State 7 (Fúria)       │        │
│                    │        │ • State 51 (Camuflagem) │        │
│                    │        └─────────────────────────┘        │
│                    │            │                             │
│                    │            ▼                             │
│                    │        ┌─────────────────────────┐        │
│                    │        │ INVESTIDA DEVASTADORA   │        │
│                    │        │ • Disponível (JS check) │        │
│                    │        │ • Dano massivo          │        │
│                    │        │ • Common Event 21       │        │
│                    │        └─────────────────────────┘        │
│                    │            │                             │
│                    │            ▼                             │
│                    │        ┌─────────────────────────┐        │
│                    │        │ VULNERABILIDADE!        │        │
│                    │        │ • State 51 REMOVIDO     │        │
│                    │        │ • EVA 0%                │        │
│                    │        │ • State 7 ATIVO         │        │
│                    │        │   (DEF -30%)            │        │
│                    │        └─────────────────────────┘        │
│                    │            │                             │
│                    │            ▼                             │
│                    │        ┌─────────────────────────┐        │
│                    │        │ JANELA DE ATAQUE        │        │
│                    │        │ (Boss recebe +dano)     │        │
│                    │        └─────────────────────────┘        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Fase 1: Enfurecer (Turno 1)
- **Action:** Enfurecer (Rating 7 - máxima prioridade)
- **Efeitos do State 7 (Fúria):**
  - DEF ×0.7 = **-30% DEFESA** (boss recebe mais dano)
  - ATK ×1.3 = +30% ATAQUE
  - AGI ×1.3 = +30% AGILIDADE
- **Duração:** 3 turnos
- **Jogador deve:** Preparar para a camuflagem

### Fase 2: Camuflagem (Turnos 2+)
- **Action:** Camuflagem de Kraven (Rating 3)
- **Efeitos do State 51 (Camuflagem):**
  - EVA +70% (boss esquiva mais)
- **Duração:** 4-5 turnos
- **Durante esta fase:** Boss pode usar Sussurro Cristalino (se party level ≥ 51)
- **Jogador deve:** Defender/Default para ganhar BP, usar buffs

### Fase 3: Investida Devastadora (Quando States 7 E 51 ativos)
- **Action:** Investida Devastadora (Rating 5)
- **Condição JS:** `user.isStateAffected(7) && user.isStateAffected(51)`
- **Efeitos:**
  - Dano: (ATK × 4) + 200
  - Invoca Common Event 21
  - **REMOVE State 51 (Camuflagem)**
  - Reseta BP para 0
- **Jogador deve:** Usar mitigação (Kilin DEFENDER + TAUNT)

### Fase 4: Vulnerabilidade (PÓS-Investida) ⚡
- **Status:** State 51 REMOVIDO, State 7 (Fúria) ATIVO
- **Efeitos:**
  - EVA 0% (sem camuflagem)
  - DEF -30% (Fúria ainda ativa)
  - **Boss recebe DANO AUMENTADO**
- **Duração:** Até State 7 expirar (3 turnos totais desde Enfurecer)
- **Jogador deve:** **BRAVE TODOS OS DPS! Queimar todo BP acumulado**

---

## 10. VARIAÇÕES POR HP

### HP ≤ 50%
- **Action adicional:** Enfurecer (Rating 3)
- **Condition:** Variable 0 ≤ 0.5 (HP do boss)
- **Efeito:** Boss pode recastar Fúria mesmo se já estiver com o state ativo

### Party Level ≥ 51
- **Action adicional:** Sussurro Cristalino (Rating 1)
- **Condition:** Party Level ≥ 51
- **Efeito:** Aplica Cegueira (-50% HIT) em todos os inimigos

---

## 11. TELEGRAPHIA E SINAIS

| Fase | Visual | Som | Diálogo | Status de Implementação |
|------|--------|-----|---------|-------------------------|
| **Enfurecer** | Cristaleão brilha em vermelho | Rugido gutural | "Cristaleão entra em fúria!" | ❌ NÃO IMPLEMENTADO |
| **Camuflagem** | Boss translúcido, só olhos brilham | Zumbido baixo e constante | "Vocês acham que conseguem me alcançar?" | ❌ NÃO IMPLEMENTADO |
| **Vulnerabilidade** | Boss pisca, cristal do pece abre | Vidro quebrando, "shatter" | "Os cristais perdem o brilho... essa é sua chance!" | ❌ NÃO IMPLEMENTADO |
| **Ataque** | Brilha branco/vermelho, campo reluz | Explosão, tremor | "Cristaleão emana uma onda arcana... brace-se!" | ❌ NÃO IMPLEMENTADO |

---

## 12. CHECKLIST DE IMPLEMENTAÇÃO

### No Database Enemies:
- [x] Criar Enemy ID 17 (Cristaleão)
- [x] Configurar parâmetros base (HP: 7500, ATK: 85, etc.)
- [x] Adicionar traits base (HIT 95%, Evasion +5%)
- [x] Adicionar notetags BTB na seção Note
- [x] Configurar Action Patterns da IA

### No Database Skills:
- [x] Criar Skill ID 11 "Espinho Veloz"
- [x] Criar Skill ID 12 "Camuflagem de Kraven"
- [x] Criar Skill ID 13 "Sussurro Cristalino"
- [x] Criar Skill ID 14 "Investida Devastadora"
- [x] Criar Skill ID 15 "Enfurecer"

### No Database States:
- [x] Criar State ID 5 "Cegueira"
- [x] Criar State ID 7 "Fúria"
- [x] Criar State ID 31 "Sangramento"
- [x] Criar State ID 51 "Camuflagem"

### No Database Common Events:
- [x] Criar Common Event ID 21 "Investida Devastadora"
- [x] Adicionar comandos para remover State 51 e State 13

### Visual e Áudio:
- [x] Criar/Importar sprite do Cristaleão (Coreto_Cristaleao)
- [x] Criar/Importar face para Turn Order (Nature, 0)
- [ ] Configurar animações (camuflagem, exposição, ataque)
- [ ] Adicionar efeitos sonoros (shatter, explosão, tremor)
- [ ] Adicionar diálogos de telegrafia

### Pendências de Implementação:
- [ ] **[URGENTE]** Substituir message4 do State 51 por mensagem apropriada
- [ ] **[URGENTE]** Implementar indicadores visuais de:
  - Boss enfurecido (ícone, animação, aura)
  - Boss camuflado (ícone, transparência, brilho)
  - Boss vulnerável (ícone de "exposto", animação)
- [ ] Implementar Common Event ou mensagem para indicar vulnerabilidade

---

## 13. REFERÊNCIA RÁPIDA DE NOTETAGS

### Para Inimigo (Enemy Note):

```
<BTB Initial BP: +1>
<BTB Maximum BP: +3>
<BTB Minimum BP: -3>
<BTB BP Regen: +1>
<BTB Maximum Actions: +3>
<BTB Turn Order Icon: 98>
<BTB Turn Order Face: Nature, 0>
```

### Para Skills (Skill Note):

```
<BTB BP Cost: 1>
<BTB User Set BP: 0>
<BTB Help>Descrição BTB</BTB Help>
<JS Skill Enable>
  enabled = user.isStateAffected(7) && user.isStateAffected(51);
</JS Skill Enable>
```

---

## 14. RESUMO DE IDS

| Tipo | ID | Nome |
|------|----|----|
| Enemy | 17 | Cristaleão |
| Skill | 11 | Espinho Veloz |
| Skill | 12 | Camuflagem de Kraven |
| Skill | 13 | Sussurro Cristalino |
| Skill | 14 | Investida Devastadora |
| Skill | 15 | Enfurecer |
| State | 5 | Cegueira |
| State | 7 | Fúria |
| State | 31 | Sangramento |
| State | 51 | Camuflagem |
| Common Event | 21 | Investida Devastadora |

---

## FIM DO DOCUMENTO

**Boss:** Cristaleão
**ID:** 17
**Nível:** 20
**Ciclo:** Predador Oculto
**Versão:** 1.3
**Data:** 2026-03-19
**Status:** Implementado

**Documentação de Referência:**
- Template: enemy-btb-template.md
- Plugin: VisuStella MZ - Battle System BTB
