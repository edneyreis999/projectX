# GUIA TÉCNICO COMPLETO: STATES.JSON - RPG MAKER MZ

**Propósito:** Documentação técnica para LLMs criarem/modificarem states com precisão.

**Fonte de validação:** `frontend/js/rmmz_objects.js` (código do engine)

**Última atualização:** 2026-03-18
**Versão:** 1.3 (JavaScript Hooks completos + exemplos práticos)

---

## ÍNDICE

1. [Visão Geral da Estrutura](#visão-geral-da-estrutura)
2. [Campos de Remoção Automática](#campos-de-remoção-automática)
3. [Campos de Duração](#campos-de-duração)
4. [Campos de Restrição](#campos-de-restrição)
5. [Campos de Prioridade](#campos-de-prioridade)
6. [Campos de Traits](#campos-de-traits)
7. [Campos Visuais](#campos-visuais)
8. [Campos de Mensagem](#campos-de-mensagem)
9. [O Campo `note` e Notetags](#o-campo-note-e-notetags)
10. [Templates por Tipo de State](#templates-por-tipo-de-state)
11. [Anti-Patterns Comuns](#anti-patterns-comuns)
12. [Referência Rápida](#referência-rápida)

---

## ⚠️ AVISO: PLUGIN VISUSTELLA INSTALADO

**Este projeto utiliza o plugin VisuStella Skills & States Core.**

O plugin adiciona **30+ novas funcionalidades** ao sistema de States, incluindo:

- Sistema de Categorias para States
- States Passivos com condições
- Regras de Re-aplicação customizáveis
- JavaScript hooks para eventos de state
- DOT/HOT customizado via JavaScript

**Documentação completa:** Veja `VisuStella-SkillsStatesCore-comparison.md`

**Resumo rápido de alterações principais:**

| Funcionalidade | Base MZ | Com VisuStella |
|----------------|---------|----------------|
| Re-aplicação | Sempre reset | Ignore/Reset/Greater/Add |
| Turnos | Sem exibição | Exibe + cores customizáveis |
| Morte | Remove todos | Exceto `<No Death Clear>` |
| Categorias | Não existe | `<Category: nome>` |
| Passivos | Não existe | `<Passive State: x>` |

**Para LLMs:** SEMPRE considere que VisuStella está ativo ao criar/modificar states neste projeto.

---

## 🔴 URGENTE: CORREÇÕES VALIDADAS CONTRA CÓDIGO FONTE

**Data de validação:** 2026-03-18
**Fonte:** `frontend/js/rmmz_objects.js` v1.8.1

### 1. SPARAM (code: 23) Usa `traitsPi` (MULTIPLICATIVO)

**Erro no guia anterior:** Documentado como `traitsSum` (aditivo)

**Código fonte validado (rmmz_objects.js:2893-2895):**
```javascript
Game_BattlerBase.prototype.sparam = function(sparamId) {
    return this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);
};
```

**Consequência:** SPARAM é **multiplicativo**, igual a PARAM.

| SPARAM ID | Parâmetro | Comportamento |
|-----------|-----------|---------------|
| 0-4 | TARGET_RATE, EFFECT_RATE, etc. | **Multiplicativo** (traitsPi) |
| 9 | PHYSICAL_DAMAGE | **Multiplicativo** - 1.2 = +20% dano recebido |
| 10 | MAGICAL_DAMAGE | **Multiplicativo** - 0.8 = -20% dano recebido |

### 2. Tabela de `restriction` CORRIGIDA

**Erro no guia anterior:** Valores 1-2 descritos como "Attack Only" e "Magic Only"

**Código fonte validado (rmmz_objects.js:3114-3121):**
```javascript
Game_BattlerBase.prototype.canMove = function() {
    return this.isAppeared() && this.restriction() < 4;
};

Game_BattlerBase.prototype.isConfused = function() {
    return (
        this.isAppeared() && this.restriction() >= 1 && this.restriction() <= 3
    );
};

Game_BattlerBase.prototype.confusionLevel = function() {
    return this.isConfused() ? this.restriction() : 0;
};
```

**Tabela CORRETA:**

| Valor | Significado Real | Uso |
|-------|------------------|-----|
| `0` | None | Sem restrição |
| `1` | Confusion Level 1 | Ataca aleatoriamente (auto-battle) |
| `2` | Confusion Level 2 | Ataca aleatoriamente (auto-battle) |
| `3` | Confusion Level 3 | Ataca aleatoriamente (auto-battle) |
| `4` | Cannot Move | Imóvel/Atordoado/Sono (perde turno) |

**NOTA:** A AI controla ações quando `restriction` é 1-3. O nível indica a "intensidade" da confusão, mas todos resultam em auto-battle.

### 4. Comportamento VISUSTELLA: Action End Update

**ATENÇÃO:** Com VisuStella instalado, o comportamento de `autoRemovalTiming: 1` (Action End) **MUDA**:

**Plugin Parameter:** `State Settings > Action End Update: true`

**Comportamento modificado:**
```
- SEM VisuStella: State expira no "final do turno do battler"
- COM VisuStella: State expira após CADA AÇÃO do battler
```

**Consequências:**
- Se battler tem 3 ações por turno, state com `autoRemovalTiming: 1` dura **3 turnos menos**
- Se battler não pode agir (`restriction: 4`), state **NÃO expira** (nunca diminui turnos)

**EXCEÇÃO AUTOMÁTICA (VisuStella):**
States com `restriction: 4` (Cannot Move) + `autoRemovalTiming: 1` são **automaticamente convertidos** para `autoRemovalTiming: 2` (Turn End) quando `Action End Update` está ativo.

**Código VisuStella (validado na documentação):**
```
"Action End auto-removal timings for states with 'Cannot Move' restrictions
will be turned into 'Turn End' auto-removal timings while the 'Action End Update'
is enabled."
```

### 3. Templates CORRIGIDOS

#### Template 1/2: BUFF/DEBUFF - `chanceByDamage` Removido

**Problema:** `chanceByDamage: 100` com `removeByDamage: false` é contraditório

**Correção:**
```json
"removeByDamage": false,
"chanceByDamage": 0,  // ← CORRIGIDO: 0 quando removeByDamage é false
```

#### Template 3: DOT - `autoRemovalTiming` Corrigido

**Problema:** `autoRemovalTiming: 0` ignora `maxTurns`

**Correção:**
```json
"autoRemovalTiming": 1,  // ← CORRIGIDO: 1 ou 2 para expirar por tempo
"maxTurns": 5,           // ← Agora funciona corretamente
"minTurns": 5,
```

#### Template 5: SONO - `releaseByDamage` Removido

**Problema:** Campo obsoleto do RPG Maker MV

**Correção:**
```json
// REMOVIDO: "releaseByDamage": true,  // Não tem efeito em MZ
"removeByDamage": true,   // ← Este é o campo correto
"chanceByDamage": 100,    // ← 100% de chance ao receber dano
```

### 4. Resumo das Correções

| Item | Antes (Errado) | Depois (Correto) |
|------|---------------|------------------|
| SPARAM agregação | `traitsSum` (aditivo) | `traitsPi` (multiplicativo) |
| restriction 1 | "Attack Only" | Confusion Level 1 |
| restriction 2 | "Magic Only" | Confusion Level 2 |
| restriction 3 | "Cannot Act (Confusion)" | Confusion Level 3 |
| Template BUFF | `chanceByDamage: 100` | `chanceByDamage: 0` |
| Template DOT | `autoRemovalTiming: 0` | `autoRemovalTiming: 1` |
| Template SONO | `releaseByDamage: true` | (removido - obsoleto) |

---

## 🔵 VISUSTELLA: FUNCIONALIDADES ADICIONAIS

O plugin **VisuStella Skills & States Core** adiciona funcionalidades que **NÃO existem** no engine base MZ. Estas devem ser usadas no campo `note` do State.

### Action End Update (Mudança de Comportamento)

**Plugin Parameter:** `State Settings > Action End Update: true`

| Comportamento | Sem VisuStella | Com VisuStella |
|---------------|----------------|-----------------|
| `autoRemovalTiming: 1` | Expira no final do turno | Expira após CADA ação |

**Exceção automática:** States com `restriction: 4` + `autoRemovalTiming: 1` são convertidos para `autoRemovalTiming: 2` para evitar softlock.

### Reapply Rules (Regras de Re-aplicação)

**Plugin Parameter:** `State Settings > Reapply Rules: Reset`

**Override por state:**
```json
"note": "<Reapply Rules: Add>"
```

| Regra | Efeito ao Re-aplicar |
|-------|---------------------|
| `Ignore` | Não altera turnos |
| `Reset` | Recalcula turnos (padrão) |
| `Greater` | Mantém maior valor |
| `Add` | Soma turnos ao existente |

### Maximum Turns (Limite Máximo)

**Plugin Parameter:** `State Settings > Maximum Turns: 99`

**Override por state:**
```json
"note": "<Max Turns: 50>"
```

### Categorias (Category System)

```json
"note": "<Category: Poison>\n<Category: DOT>\n<Negative State>"
```

**Usos combinados:**
- `<State Poison Category Remove: 1>` - Remove 1 state da categoria via Skill/Item
- `<Resist State Categories: Poison, Fire>` - Resistência a categorias inteiras
- `<Remove Other Stance States>` - Remove states de outras categorias

### JS Hooks (Eventos de State)

```json
"note": "<JS On Add State>\nuser.gainMp(50);\n</JS On Add State>"
```

| Evento | Quando Executa |
|---------|----------------|
| `<JS On Add State>` | Ao adicionar state |
| `<JS On Erase State>` | Ao remover manualmente |
| `<JS On Expire State>` | Ao expirar por turno |

**Variáveis disponíveis:** `user`, `target`, `origin`, `state`

### Custom DOT/HOT (Dano/Regeneração Customizada)

```json
"note": "<JS HP Slip Damage>\ndamage = Math.floor(target.mhp * 0.1);\n</JS HP Slip Damage>\n<JS Slip Refresh>"
```

**Variações:**
- `<JS HP Slip Damage>` - Dano de PV
- `<JS MP Slip Heal>` - Cura de PM
- `<JS Slip Refresh>` - Recalcula a cada turno (importante!)

**⚠️ AVISO:** Não usar mecânicas de jogo (addState, buffs) aqui. Apenas cálculos numéricos.

### Passive Conditions (Condições para Passivos)

```json
"note": "<Passive Condition Class: 1>\n<Passive Condition Switch ON: 5>\n<JS Passive Condition>\ncondition = user.level >= 10;\n</JS Passive Condition>"
```

**Condições disponíveis:**
- `<Passive Condition Class: ID>` - Classe específica
- `<Passive Condition Switch ON: ID>` - Switch ativo
- `<Passive Condition All Switches ON: ID, ID, ID>` - Todas as switches ON
- `<Passive Condition Any Switch ON: ID, ID, ID>` - Qualquer switch ON
- `<JS Passive Condition>` - Condição JavaScript customizada

### Positive/Negative States

```json
"note": "<Positive State>"  // Cor verde/azul
"note": "<Negative State>"  // Cor vermelha/laranja
```

Automaticamente adiciona às categorias "Positive" ou "Negative".

### No Death Clear / No Recover All Clear

```json
"note": "<No Death Clear>\n<No Recover All Clear>"
```

- `<No Death Clear>` - State **NÃO** remove ao morrer
- `<No Recover All Clear>` - State **NÃO** remove ao usar Recover All

**Uso típico:** Maldições, estados permanentes, debuffs de história.

### Group Defeat

```json
"note": "<Group Defeat>"
```

Party é considerada derrotada se **TODOS** tiverem este state.

**Uso típico:** Petrificação, Congelamento group-wide.

---

---

## VISÃO GERAL DA ESTRUTURA

O arquivo `States.json` é um array onde o índice 0 é `null` (1-based indexing).

```json
[
  null,
  {"id": 1, "autoRemovalTiming": 0, ...},
  {"id": 2, "autoRemovalTiming": 2, ...}
]
```

**Regras estruturais:**
- Índice 0 SEMPRE é `null`
- `id` deve corresponder ao índice do array
- Estados não utilizados devem ter campos vazios mas válidos

---

## CAMPOS DE REMOÇÃO AUTOMÁTICA

### 1. `autoRemovalTiming` (0-2)

**Define QUANDO o state pode ser removido automaticamente por turnos.**

```javascript
// Fonte: rmmz_objects.js:3738-3747
Game_Battler.prototype.removeStatesAuto = function(timing) {
    for (const state of this.states()) {
        if (
            this.isStateExpired(state.id) &&
            state.autoRemovalTiming === timing
        ) {
            this.removeState(state.id);
        }
    }
};
```

**Valores:**

| Valor | Significado | Quando Remove |
|-------|-------------|---------------|
| `0` | NUNCA | Não remove por tempo (state permanente) |
| `1` | Turno do battler | No final do turno do battler |
| `2` | Turno geral | No final do turno (timing alternativo) |

**Consequências técnicas:**
- `0` com `maxTurns > 1`: state NUNCA expira por tempo
- `1` ou `2` sem `maxTurns`: state expira em 1 turno (mínimo)
- Diferença entre `1` e `2` é sutil; ambos funcionam para batalha

---

### 2. `removeByDamage` (boolean)

**Define se o state PODE ser removido ao receber dano.**

```javascript
// Fonte: rmmz_objects.js:3757-3766
Game_Battler.prototype.removeStatesByDamage = function() {
    for (const state of this.states()) {
        if (
            state.removeByDamage &&
            Math.randomInt(100) < state.chanceByDamage
        ) {
            this.removeState(state.id);
        }
    }
};
```

**Consequências técnicas:**
- `false` = NUNCA remove por dano, **ignora** `chanceByDamage`
- `true` = verifica `chanceByDamage` a cada dano recebido
- Chamado por `onDamage()` após cada hit de skill/magia

---

### 3. `chanceByDamage` (0-100)

**Probabilidade de remoção ao receber dano.**

**FÓRMULA:**
```javascript
Math.randomInt(100) < state.chanceByDamage
```

**Valores típicos:**

| Valor | Probabilidade |
|-------|---------------|
| `0` | Nunca remove (mesmo com `removeByDamage: true`) |
| `25` | 25% de chance por hit |
| `50` | 50% de chance por hit |
| `100` | Sempre remove no primeiro hit |

**Consequências técnicas:**
- Cada hit de skill multi-hit verifica separadamente
- Funciona mesmo com dano 0 (desde que seja um ataque)
- **SÓ funciona se** `removeByDamage: true`

---

### 4. `removeAtBattleEnd` (boolean)

**Remove o state ao fim da batalha.**

```javascript
// Fonte: rmmz_objects.js:3724-3730
Game_Battler.prototype.removeBattleStates = function() {
    for (const state of this.states()) {
        if (state.removeAtBattleEnd) {
            this.removeState(state.id);
        }
    }
};
```

**Consequências técnicas:**
- `false` = state persiste após batalha
- `true` = state sempre removido ao fim da batalha
- Chamado por `onBattleEnd()`

**CRÍTICO:** States de CC DEVEM ter `removeAtBattleEnd: true`

---

### 5. `removeByWalking` (boolean)

**Remove o state após dar `stepsToRemove` passos no mapa.**

```javascript
// Fonte: rmmz_objects.js:4777-4783
Game_Actor.prototype.updateStateSteps = function(state) {
    if (state.removeByWalking) {
        if (this._stateSteps[state.id] > 0) {
            if (--this._stateSteps[state.id] === 0) {
                this.removeState(state.id);
            }
        }
    }
};
```

**Consequências técnicas:**
- `false` = state não afeta passos
- `true` = decrementa `stepsToRemove` a cada passo
- **SÓ funciona para actors** (não enemies)
- **IGNORADO** completamente em batalha

---

### 6. `removeByRestriction` (boolean)

**Remove o state quando o battler fica restrito.**

```javascript
// Fonte: rmmz_objects.js:3663-3672
Game_Battler.prototype.onRestrict = function() {
    Game_BattlerBase.prototype.onRestrict.call(this);
    this.clearTpbChargeTime();
    this.clearActions();
    for (const state of this.states()) {
        if (state.removeByRestriction) {
            this.removeState(state.id);
        }
    }
};
```

**Consequências técnicas:**
- `false` = state persiste mesmo com restrição
- `true` = remove quando `restriction` > 0
- Útil para buffs que quebram ao ficar CC

---

### 7. `releaseByDamage` (boolean - **OBSOLETO**)

**Campo LEGADO do RPG Maker MV. NÃO tem efeito em MZ.**

O código que usava este campo foi removido em MZ. O campo pode existir no JSON mas é **completamente ignorado** pelo engine.

---

## CAMPOS DE DURAÇÃO

### 8. `minTurns` (1+)

**Número mínimo de turnos que o state dura.**

```javascript
// Fonte: rmmz_objects.js:2678-2682
Game_BattlerBase.prototype.resetStateCounts = function(stateId) {
    const state = $dataStates[stateId];
    const variance = 1 + Math.max(state.maxTurns - state.minTurns, 0);
    this._stateTurns[stateId] = state.minTurns + Math.randomInt(variance);
};
```

**FÓRMULA DE DURAÇÃO:**
```javascript
duração = minTurns + Math.randomInt(1 + maxTurns - minTurns)
```

**Exemplos:**

| minTurns | maxTurns | Duração possível |
|----------|----------|------------------|
| 3 | 5 | 3, 4 ou 5 turnos |
| 3 | 3 | SEMPRE 3 turnos |
| 1 | 5 | 1, 2, 3, 4 ou 5 turnos |

---

### 9. `maxTurns` (1+)

**Número máximo de turnos que o state dura.**

Trabalha junto com `minTurns` para criar variação aleatória.

**Consequências técnicas:**
- `maxTurns < minTurns` = tratado como `maxTurns = minTurns`
- Sem `autoRemovalTiming` válido, `maxTurns` é **ignorado**
- Turnos decrementam a cada `updateStateTurns()`

---

### 10. `stepsToRemove` (1+)

**Número de passos para remover (requer `removeByWalking: true`).**

**Consequências técnicas:**
- Cada passo no mapa decrementa contador
- Contador reinicia se state re-aplicado
- Valores típicos: 50-100 passos
- 100 passos ≈ 50 segundos de caminhada

---

## CAMPOS DE RESTRIÇÃO

### 11. `restriction` (0-4)

**Define o tipo de restrição de ação do battler.**

```javascript
// Fonte: rmmz_objects.js:3146-3149
Game_BattlerBase.prototype.restriction = function() {
    const restrictions = this.states().map(state => state.restriction);
    return Math.max(0, ...restrictions);  // ← Pega o MAIOR valor
};

// Fonte: rmmz_objects.js:3114-3121
Game_BattlerBase.prototype.canMove = function() {
    return this.isAppeared() && this.restriction() < 4;
};

Game_BattlerBase.prototype.isConfused = function() {
    return (
        this.isAppeared() && this.restriction() >= 1 && this.restriction() <= 3
    );
};

Game_BattlerBase.prototype.confusionLevel = function() {
    return this.isConfused() ? this.restriction() : 0;
};
```

**Valores (VALIDADOS contra código fonte):**

| Valor | Nome | Efeito |
|-------|------|--------|
| `0` | None | Sem restrição |
| `1` | Confusion Level 1 | Ataca aleatoriamente (auto-battle) |
| `2` | Confusion Level 2 | Ataca aleatoriamente (auto-battle) |
| `3` | Confusion Level 3 | Ataca aleatoriamente (auto-battle) |
| `4` | Cannot Move | Imóvel/Atordoado/Sono (perde turno) |

**Consequências técnicas:**
- Múltiplos states: usa **MAIOR** valor
- `restriction: 4` = battler perde turno completamente (`canMove()` retorna false)
- `restriction: 1-3` = AI assume controle (auto-battle), ataca aleatoriamente
- `confusionLevel()` retorna o valor de `restriction` quando 1-3
- **NÃO existe "Attack Only" ou "Magic Only"** no engine base MZ

---

## CAMPOS DE PRIORIDADE

### 12. `priority` (0-100+)

**Define ordem de exibição e qual state "vence" em conflitos visuais.**

```javascript
// Fonte: rmmz_objects.js:3135-3144
Game_BattlerBase.prototype.sortStates = function() {
    this._states.sort((a, b) => {
        const p1 = $dataStates[a].priority;
        const p2 = $dataStates[b].priority;
        if (p1 !== p2) {
            return p2 - p1;  // ← Ordem DECRESCENTE
        }
        return a - b;  // ← Empate: menor ID primeiro
    });
};
```

**Consequências técnicas:**
- States ordenados por **prioridade DECRESCENTE**
- Maior prioridade = exibido primeiro na UI
- Maior prioridade = define `motion` e `overlay` visual
- Empate = menor ID ganha

**Valores recomendados:**

| Prioridade | Tipo de State |
|------------|---------------|
| 0-20 | Passivos de mapa (buffs exploratórios) |
| 21-40 | Buffs passivos de batalha |
| 41-60 | Debuffs leves |
| 61-79 | Debuffs moderados/CC leve |
| 80-89 | CC pesado |
| 90-100 | CC crítico/Morte |
| 100+ | Estados de sistema (Substitute, etc.) |

---

## CAMPOS DE TRAITS

### 13. `traits` (array)

**Array de objetos que modificam atributos/comportamento.**

**ESTRUTURA:**
```json
{
  "code": 21,    // Tipo de trait (ver tabela abaixo)
  "dataId": 3,   // ID do dado específico
  "value": 1.3   // Valor da modificação
}
```

---

### SISTEMA DE AGREGAÇÃO DE TRAITS

**FÓRMULAS:**

```javascript
// Fonte: rmmz_objects.js:2831-2837
Game_BattlerBase.prototype.traitsPi = function(code, id) {
    return this.traitsWithId(code, id).reduce((r, trait) => r * trait.value, 1);
    // ← MULTIPLICA todos os valores (começa com 1)
};

Game_BattlerBase.prototype.traitsSum = function(code, id) {
    return this.traitsWithId(code, id).reduce((r, trait) => r + trait.value, 0);
    // ← SOMA todos os valores (começa com 0)
};

Game_BattlerBase.prototype.traitsSumAll = function(code) {
    return this.traits(code).reduce((r, trait) => r + trait.value, 0);
    // ← SOMA todos os valores de todos os dataIds
};

Game_BattlerBase.prototype.traitsSet = function(code) {
    return this.traits(code).reduce((r, trait) => r.concat(trait.dataId), []);
    // ← Retorna array de dataIds
};
```

**REGRAS DE AGREGAÇÃO:**

| Método | Uso | Exemplo |
|--------|-----|---------|
| `traitsPi` | Multiplicativo | DEF × 0.7 × 1.1 = 0.77 |
| `traitsSum` | Aditivo por dataId | HIT + 0.1 + 0.2 = +0.3 |
| `traitsSumAll` | Aditivo total | Todos ATTACK_SPEED somados |
| `traitsSet` | Conjunto | Array de IDs (imunes, etc.) |

---

### TABELA COMPLETA DE TRAIT CODES

| Code | Constante | Método | Descrição |
|------|-----------|--------|-----------|
| 11 | TRAIT_ELEMENT_RATE | traitsPi | Taxa de dano de elemento (0.5 = -50%, 2.0 = +100%) |
| 12 | TRAIT_DEBUFF_RATE | traitsPi | Taxa de receber debuff (0.5 = metade suscetível) |
| 13 | TRAIT_STATE_RATE | traitsPi | Taxa de receber state (0 = imune, 1 = normal) |
| 14 | TRAIT_STATE_RESIST | traitsSet | Estados completamente imunes (array de IDs) |
| 21 | TRAIT_PARAM | traitsPi | Parâmetros base (MHP, ATK, DEF, etc.) |
| 22 | TRAIT_XPARAM | traitsSum | Parâmetros estendidos (HIT, EVA, CRI, etc.) |
| 23 | TRAIT_SPARAM | **traitsPi** | Parâmetros especiais (TARGET_RATE, DAMAGE, etc.) |
| 31 | TRAIT_ATTACK_ELEMENT | traitsSet | Elementos de ataque (array de IDs) |
| 32 | TRAIT_ATTACK_STATE | traitsSum | States infligidos ao atacar (probabilidade) |
| 33 | TRAIT_ATTACK_SPEED | traitsSumAll | Bônus de velocidade de ataque |
| 34 | TRAIT_ATTACK_TIMES | traitsSumAll | Ataques extras por turno |
| 35 | TRAIT_ATTACK_SKILL | traitsSet | Skill de ataque substituto (array de IDs) |
| 41 | TRAIT_STYPE_ADD | traitsSet | Adiciona tipo de skill (array de IDs) |
| 42 | TRAIT_STYPE_SEAL | traitsSet | Bloqueia tipo de skill (array de IDs) |
| 43 | TRAIT_SKILL_ADD | traitsSet | Adiciona skill específica (array de IDs) |
| 44 | TRAIT_SKILL_SEAL | traitsSet | Bloqueia skill específica (array de IDs) |
| 51 | TRAIT_EQUIP_WTYPE | traitsSet | Pode equipar arma (array de IDs) |
| 52 | TRAIT_EQUIP_ATYPE | traitsSet | Pode equipar armadura (array de IDs) |
| 53 | TRAIT_EQUIP_LOCK | traitsSet | Trava slot de equipamento |
| 54 | TRAIT_EQUIP_SEAL | traitsSet | Bloqueia slot de equipamento |
| 55 | TRAIT_SLOT_TYPE | - | Altera tipo de slot (dual wield, etc.) |
| 61 | TRAIT_ACTION_PLUS | traitsSum | Chance de ação extra por turno |
| 62 | TRAIT_SPECIAL_FLAG | traitsSet | Flags especiais (auto-battle, guard, etc.) |
| 63 | TRAIT_COLLAPSE_TYPE | - | Tipo de animação de colapso |
| 64 | TRAIT_PARTY_ABILITY | traitsSet | Habilidades de party (encounter rate, etc.) |

---

### PARAM IDs (0-7) para TRAIT_PARAM (code: 21)

**Uso:** Modifica atributos base (multiplicativo)

```javascript
// Fonte: rmmz_objects.js:2871-2875
Game_BattlerBase.prototype.paramRate = function(paramId) {
    return this.traitsPi(Game_BattlerBase.TRAIT_PARAM, paramId);
};
```

| ID | Parâmetro | Descrição |
|----|-----------|-----------|
| 0 | MHP | PV Máximo (Hit Points) |
| 1 | MMP | PM Máximo (Magic Points) |
| 2 | ATK | Ataque Físico |
| 3 | DEF | Defesa Física |
| 4 | MAT | Ataque Mágico |
| 5 | MDF | Defesa Mágica |
| 6 | AGI | Agilidade |
| 7 | LUK | Sorte |

**Exemplos:**
```json
// DEF -30% (multiplicativo)
{"code": 21, "dataId": 3, "value": 0.7}

// ATK +50% (multiplicativo)
{"code": 21, "dataId": 2, "value": 1.5}

// MHP +100% (dobro de vida)
{"code": 21, "dataId": 0, "value": 2.0}
```

---

### XPARAM IDs (0-9) para TRAIT_XPARAM (code: 22)

**Uso:** Modifica parâmetros estendidos (aditivo)

```javascript
// Fonte: rmmz_objects.js:2889-2893
Game_BattlerBase.prototype.xparam = function(xparamId) {
    return this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);
};
```

| ID | Parâmetro | Descrição | Valor Base |
|----|-----------|-----------|------------|
| 0 | HIT | Chance de Acerto | 0% |
| 1 | EVA | Evasão Física | 0% |
| 2 | CRI | Chance de Crítico | 0% |
| 3 | CEV | Evasão de Crítico | 0% |
| 4 | MEV | Evasão Mágica | 0% |
| 5 | MRF | Reflexão Mágica | 0% |
| 6 | CNT | Contra-ataque | 0% |
| 7 | HRG | Regeneração PV% por turno | 0% |
| 8 | MRG | Regeneração PM% por turno | 0% |
| 9 | TRG | Regeneração PT% por turno | 0% |

**Exemplos:**
```json
// EVA +50% (aditivo)
{"code": 22, "dataId": 1, "value": 0.5}

// Regeneração de 10% PV por turno
{"code": 22, "dataId": 7, "value": 0.1}

// CRI +30% (crítico)
{"code": 22, "dataId": 2, "value": 0.3}
```

---

### SPARAM IDs para TRAIT_SPARAM (code: 23)

**Uso:** Modifica parâmetros especiais (**multiplicativo**, igual a PARAM)

```javascript
// Fonte: rmmz_objects.js:2893-2895
Game_BattlerBase.prototype.sparam = function(sparamId) {
    return this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);
};
```

| ID | Parâmetro | Descrição |
|----|-----------|-----------|
| 0 | TARGET_RATE | Taxa de alvo (agro) |
| 1 | EFFECT_RATE | Taxa de efeito de status |
| 2 | ELEMENT_RATE | Taxa de dano elemental (global) |
| 3 | DEBUFF_RATE | Taxa de debuff (global) |
| 4 | PARAM_RATE | Taxa de buffs (global) |
| 5 | PARAM_BUFF_RATE | Taxa de buffs de atributo |
| 6 | HP_COST | Custo de PV |
| 7 | MP_COST | Custo de PM |
| 8 | TP_COST | Custo de PT |
| 9 | PHYSICAL_DAMAGE | Dano físico recebido |
| 10 | MAGICAL_DAMAGE | Dano mágico recebido |
| 11 | FLOOR_DAMAGE | Dano de chão/andar |
| 12 | EXPERIENCE | Experiência ganha |

**Exemplos:**
```json
// Reduz custo de PM em 25%
{"code": 23, "dataId": 7, "value": 0.25}

// Aumenta efeito de status em 50%
{"code": 23, "dataId": 1, "value": 0.5}
```

---

### EXEMPLOS DE TRAITS COMUNS

```json
// =================== ATRIBUTOS ===================
// DEF -30%
{"code": 21, "dataId": 3, "value": 0.7}

// ATK +30%, DEF -30%, AGI +30%
{"code": 21, "dataId": 2, "value": 1.3},
{"code": 21, "dataId": 3, "value": 0.7},
{"code": 21, "dataId": 6, "value": 1.3}

// =================== EXTENDIDOS ===================
// EVA +70%
{"code": 22, "dataId": 1, "value": 0.7}

// Regeneração de 10% PV/PM/PT por turno
{"code": 22, "dataId": 7, "value": 0.1},  // HP
{"code": 22, "dataId": 8, "value": 0.1},  // MP
{"code": 22, "dataId": 9, "value": 0.1}   // TP

// =================== ESPECIAIS ===================
// 50% chance de ação extra
{"code": 61, "dataId": 0, "value": 0.5}

// Custo de PM reduzido em 25%
{"code": 23, "dataId": 7, "value": 0.25}

// =================== IMUNIDADES ===================
// Imune a state 5 (Cegueira)
{"code": 14, "dataId": 5, "value": 1}

// Taxa zero de receber state 8 (Confusão)
{"code": 13, "dataId": 8, "value": 0}

// =================== ELEMENTAL ===================
// 50% de dano de elemento 1 (fogo)
{"code": 11, "dataId": 1, "value": 0.5}

// 200% de dano de elemento 2 (gelo - fraqueza)
{"code": 11, "dataId": 2, "value": 2.0}
```

---

## CAMPOS VISUAIS

### 14. `iconIndex` (0-255)

**Ícone exibido na UI de status.**

**Consequências técnicas:**
- `0` = sem ícone (invisível na UI)
- Usa system charset do RPG Maker
- Exibido na barra de status do battler
- Ícones 1-16: Reserved (Poison, Blind, Silence, etc.)

**Ícones padrão:**
- `1`: Morte (caveira)
- `2`: Veneno
- `3`: Cegueira
- `4`: Silêncio
- `5`: Fúria
- `6`: Confusão
- `7`: Sedução/Charm
- `8`: Sono
- `9`: Paralisia

---

### 15. `motion` (0-3)

**Animação de battler no campo de batalha (side-view).**

```javascript
// Fonte: rmmz_objects.js:3176-3183
Game_BattlerBase.prototype.stateMotionIndex = function() {
    const states = this.states();
    if (states.length > 0) {
        return states[0].motion;  // ← Usa state de MAIOR prioridade
    } else {
        return 0;
    }
};
```

**Valores:**

| Valor | Animação | Uso |
|-------|----------|-----|
| `0` | Normal | Padrão |
| `1` | Loop de doente | Enfraquecido, veneno |
| `2` | Loop de andando | Incomum em states |
| `3` | Morte/colapso | Apenas death state |

**Consequências técnicas:**
- State de **maior prioridade** define animação
- Apenas UMA animação ativa por vez
- Ignorado em front-view battles

---

### 16. `overlay` (0-10)

**Efeito visual sobreposto ao sprite do battler.**

```javascript
// Fonte: rmmz_objects.js:3185-3192
Game_BattlerBase.prototype.stateOverlayIndex = function() {
    const states = this.states();
    if (states.length > 0) {
        return states[0].overlay;  // ← Usa state de MAIOR prioridade
    } else {
        return 0;
    }
};
```

**Valores:**

| Valor | Efeito | Cor |
|-------|--------|-----|
| `0` | Nenhum | Transparente |
| `1` | Branco | Brilho/pureza |
| `2` | Amarelo | Enfraquecido |
| `3` | Verde | Veneno/Doença |
| `4` | Azul | Calm/Mágico |
| `5` | Vermelho | Fúria/Raiva |
| `6` | Rosa | Charm/Sedução |
| `7` | Roxo | Confusão |
| `8` | Cinza | Paralisia/Stone |
| `9` | Laranja | Buff/Regeneração |
| `10` | Azul escuro | Atordoamento |

**Consequências técnicas:**
- State de **maior prioridade** define overlay
- Apenas UM overlay ativo por vez
- Aplica colorização sobre sprite

---

## CAMPOS DE MENSAGEM

### 17-20. `message1`, `message2`, `message3`, `message4`

**Mensagens exibidas quando o state é aplicado/removido.**

- `message1`: Exibido quando state é **aplicado** (inicial)
- `message2`: Exibido quando state **já estava ativo** (re-aplicado)
- `message3`: Exibido no **turno seguinte** (durante efeito)
- `message4`: Exibido quando state é **removido**

**Placeholders disponíveis:**
- `%1` = Nome do battler
- `%2` = Nome do state

**Exemplos:**
```json
"message1": "%1 foi envenenado!",
"message2": "%1 está envenenado!",
"message4": "%1 não está mais envenenado!"
```

**Consequências técnicas:**
- Strings vazias = sem mensagem
- Usam janela de mensagem do battle log
- `message3` raramente usado em MZ

---

### 21. `messageType` (1-4)

**Tipo de mensagem exibida.**

**Valores:**
- `1` = Janela de mensagem normal (padrão)
- `2` = Toast/notificação
- `3` = Popup
- `4` = Custom (via plugin)

**Consequências técnicas:**
- Na maioria dos casos, use `1`
- Valores 2-4 requerem plugins para funcionalidade

---

## CAMPOS DE METADATA

### 22. `id` (1+)

**Identificador único do state.**

**Regras:**
- Deve ser único
- Deve corresponder ao índice do array
- Referenciado em skills, items, enemies, classes
- Nunca reutilizar IDs deletados

---

### 23. `name` (string)

**Nome do state exibido na UI.**

**Consequências técnicas:**
- Exibido no tooltip de status
- Usado em mensagens com `%2`
- Deve ser curto (< 20 caracteres)
- Use nomes descritivos

---

### 24. `note` (string)

**Campo livre para plugins e anotações - E O PODER DO VISUSTELLA.**

**⚠️ IMPORTANTE:** Neste projeto, o campo `note` é usado extensivamente pelo plugin **VisuStella Skills & States Core** para adicionar funcionalidades avançadas.

**Documentação completa:** Veja `VisuStella-SkillsStatesCore-comparison.md`

---

## VISUSTELLA: NOTETAGS MAIS IMPORTANTES

### Categorização e Identificação

```json
"note": "<Category: Poison>\n<Category: DOT>\n<Positive State>"
```

| Notetag | Descrição |
|----------|-----------|
| `<Category: nome>` | Adiciona state à categoria |
| `<Positive State>` | Marca como positivo (cor verde/azul) |
| `<Negative State>` | Marca como negativo (cor vermelha) |

---

### Regras de Remoção Especiais

```json
"note": "<No Death Clear>\n<No Recover All Clear>\n<Group Defeat>"
```

| Notetag | Descrição |
|----------|-----------|
| `<No Death Clear>` | **NÃO** remove ao morrer |
| `<No Recover All Clear>` | **NÃO** remove ao usar Recover All |
| `<Group Defeat>` | Party derrotada se TODOS tiverem este state |

---

### Regras de Re-aplicação

```json
"note": "<Reapply Rules: Add>"
```

| Notetag | Descrição |
|----------|-----------|
| `<Reapply Rules: Ignore>` | Não altera turnos ao re-aplicar |
| `<Reapply Rules: Reset>` | Recalcula turnos (padrão) |
| `<Reapply Rules: Greater>` | Mantém maior valor |
| `<Reapply Rules: Add>` | Soma turnos ao existente |

---

### Exibição de Turnos

```json
"note": "<Hide State Turns>\n<Turn Color: 5>\n<Max Turns: 10>"
```

| Notetag | Descrição |
|----------|-----------|
| `<Hide State Turns>` | Esconde contagem de turnos |
| `<Turn Color: X>` | Cor específica (Window Skin color) |
| `<Turn Color: #rrggbb>` | Cor hexadecimal |
| `<Max Turns: X>` | Limite máximo de turnos |

---

### Exclusão de Outros States

```json
"note": "<Remove Other Stance States>"
```

**Remove states de outras categorias ao aplicar este state.**

Útil para: Stances, Forms (apenas um ativo por vez).

---

### Passive States

```json
"note": "<Passive Stackable>\n<Passive Condition Class: 1>"
```

**Para ser usado como PASSIVE (em Actor/Class/Weapon/Armor/Enemy):**

| Notetag | Descrição |
|----------|-----------|
| `<Passive Stackable>` | Permite múltiplas instâncias |
| `<Passive Condition Class: ID>` | Só ativo com classe X |
| `<Passive Condition Switch ON: X>` | Só ativo com switch X ON |
| `<JS Passive Condition>` | Condição JavaScript customizada |

**⚠️ AVISO:** Passive States **NÃO** funcionam com `isStateAffected()` - use `states().includes($dataStates[X])`.

---

### JavaScript Hooks

```json
"note": "<JS On Add State>\nuser.hp -= 100;\n</JS On Add State>"
```

| Notetag | Quando Executa |
|----------|----------------|
| `<JS On Add State>` | Ao adicionar state |
| `<JS On Erase State>` | Ao remover manualmente |
| `<JS On Expire State>` | Ao expirar por turno |

**Variáveis disponíveis:**
- `user`: Battler ativo
- `target`: Battler afetado
- `origin`: Quem aplicou
- `state`: State sendo afetado

---

### Custom Slip Damage (DOT)

```json
"note": "<JS HP Slip Damage>\ndamage = Math.floor(target.mhp * 0.1);\n</JS HP Slip Damage>\n<JS Slip Refresh>"
```

| Notetag | Descrição |
|----------|-----------|
| `<JS HP Slip Damage>` | Dano de PV customizado |
| `<JS MP Slip Damage>` | Dano de PM customizado |
| `<JS TP Slip Damage>` | Dano de PT customizado |
| `<JS HP Slip Heal>` | Cura de PV customizada |
| `<JS Slip Refresh>` | Recalcula a cada turno |

**⚠️ AVISO:** Não usar mecânicas de jogo (addState, buffs) aqui. Apenas cálculos.

---

## EXEMPLOS COMPLETOS DE `note`

### Exemplo 1: Debuff de Veneno com DOT Customizado

```json
"note": "<Category: Poison>\n<Category: DOT>\n<Negative State>\n<Reapply Rules: Add>\n<JS HP Slip Damage>\ndamage = Math.floor(target.mhp * 0.05 + user.mat);\nif (target.isStateAffected(10)) damage *= 2;\n</JS HP Slip Damage>\n<JS Slip Refresh>"
```

**O que faz:**
- Categoriza como "Poison" e "DOT"
- Marca como negativo (cor vermelha)
- Re-aplicação soma turnos (empilha)
- Dano = 5% PV Máximo + MAT do origin
- Dano dobrado se também tiver state 10
- Recalcula a cada turno (não cacheia)

---

### Exemplo 2: Passive Conditional

```json
"note": "<Passive Stackable>\n<Passive Condition Class: 1>\n<Passive Condition Switch ON: 5>\n<JS Passive Condition>\ncondition = user.level >= 10;\n</JS Passive Condition>"
```

**O que faz:**
- Pode ser aplicado múltiplas vezes (stacking)
- Só ativo se classe = 1
- Só ativo se Switch 5 = ON
- Só ativo se level >= 10
- **TODAS** condições devem ser verdadeiras

---

### Exemplo 3: Maldição Permanente

```json
"note": "<Category: Curse>\n<Negative State>\n<No Death Clear>\n<No Recover All Clear>\n<Max Turns: 99>\n<Hide State Turns>"
```

**O que faz:**
- Categoriza como "Curse"
- Marca como negativo
- **NÃO** remove ao morrer
- **NÃO** remove ao usar Recover All
- Limite de 99 turnos
- Esconde contagem de turnos

---

### Exemplo 4: Buff com Efeito ao Expirar

```json
"note": "<Positive State>\n<Reapply Rules: Greater>\n<JS On Expire State>\nuser.gainMp(user.mmp * 0.5);\n</JS On Expire State>"
```

**O que faz:**
- Marca como positivo (cor azul)
- Re-aplicação mantém maior duração
- Ao expirar, recupera 50% do PM Máximo

---

### Exemplo 5: Stance Exclusiva

```json
"note": "<Category: Stance>\n<Positive State>\n<Remove Other Stance States>\n<Max Turns: 10>"
```

**O que faz:**
- Categoriza como "Stance"
- Marca como positivo
- Remove outras stances ao aplicar
- Limite de 10 turnos

---

## FORMATOS COMUNS (NÃO-VISUSTELLA)

```json
"note": "<BTB Initial BP: +1>\n<BTB BP Regen: +1>"
"note": "Este personagem recebe dano no lugar do aliado protegido."
```

---

## CONSEQUÊNCIAS TÉCNICAS DO `note`

- **Engine base:** Ignora completamente
- **Com VisuStella:** Parseia notetags e modifica comportamento
- **Com outros plugins:** Pode conter tags especiais
- **Performance:** Notetags são cacheadas ao carregar jogo

---

## ANTI-PATTERNS ESPECÍFICOS DO `note`

### 1. Esquecer `<JS Slip Refresh>` para DOT dinâmico

```json
// ❌ ERRADO - Cacheia valor inicial
"note": "<JS HP Slip Damage>\ndamage = target.atk;\n</JS HP Slip Damage>"

// ✅ CORRETO - Recalcula a cada turno
"note": "<JS HP Slip Damage>\ndamage = target.atk;\n</JS HP Slip Damage>\n<JS Slip Refresh>"
```

---

### 2. Usar mecânicas de jogo em Slip Damage

```json
// ❌ ERRADO - Não funciona corretamente
"note": "<JS HP Slip Damage>\ntarget.addState(5);\ndamage = 100;\n</JS HP Slip Damage>"

// ✅ CORRETO - Apenas cálculos
"note": "<JS HP Slip Damage>\ndamage = target.atk * 2;\n</JS HP Slip Damage>"
```

Para mecânicas, usar `<JS On Add State>` ou `<JS Pre-Regenerate>` do Battle Core.

---

### 3. Tentar remover Passive States

```json
// ❌ ERRADO - Passive states não são removidos
a.removeState(10);

// ✅ CORRETO - Remover condições
$gameSwitches.setValue(5, false);
```

---

## TABELA RÁPIDA DE NOTETAGS

| Categoria | Notetag | Onde Usar |
|-----------|---------|-----------|
| Identificação | `<Category: X>` | State |
| Identificação | `<Positive/Negative State>` | State |
| Remoção | `<No Death Clear>` | State |
| Remoção | `<Group Defeat>` | State |
| Re-aplicação | `<Reapply Rules: X>` | State |
| Exibição | `<Hide State Turns>` | State |
| Exibição | `<Turn Color: X>` | State |
| Exclusão | `<Remove Other X States>` | State |
| Passivo | `<Passive Stackable>` | State |
| Passivo | `<Passive Condition X: Y>` | State |
| JavaScript | `<JS On Add/Erase/Expire>` | State |
| JavaScript | `<JS X Slip Damage/Heal>` | State |
| JavaScript | `<JS Slip Refresh>` | State |

---

---

**💡 Dica:** Quer ver exemplos práticos de states usados em conjunto com skills? Confira o [Guia de Design de Skills - Exemplos Práticos](../designe-guides/designe-skills-example-guide.md) para exemplos completos de states como Veneno Tóxico, Modo Berserk, Sobrecarga Mágica e mais.

---

## TEMPLATES POR TIPO DE STATE

### Template 1: BUFF DE ATRIBUTO

```json
{
  "id": 99,
  "autoRemovalTiming": 2,
  "chanceByDamage": 0,
  "iconIndex": 64,
  "maxTurns": 5,
  "message1": "%1 sente-se mais forte!",
  "message4": "O efeito acabou.",
  "minTurns": 5,
  "motion": 0,
  "name": "Força Aumentada",
  "note": "",
  "overlay": 0,
  "priority": 50,
  "removeAtBattleEnd": true,
  "removeByDamage": false,
  "removeByRestriction": false,
  "removeByWalking": false,
  "restriction": 0,
  "stepsToRemove": 100,
  "traits": [
    {"code": 21, "dataId": 2, "value": 1.5}
  ],
  "messageType": 1
}
```

---

### Template 2: DEBUFF DE ATRIBUTO

```json
{
  "id": 100,
  "autoRemovalTiming": 1,
  "chanceByDamage": 0,
  "iconIndex": 65,
  "maxTurns": 4,
  "message1": "%1 foi enfraquecido!",
  "message4": "%1 recuperou suas forças.",
  "minTurns": 3,
  "motion": 1,
  "name": "Enfraquecido",
  "note": "",
  "overlay": 2,
  "priority": 60,
  "removeAtBattleEnd": true,
  "removeByDamage": false,
  "removeByRestriction": false,
  "removeByWalking": false,
  "restriction": 0,
  "stepsToRemove": 100,
  "traits": [
    {"code": 21, "dataId": 2, "value": 0.7}
  ],
  "messageType": 1
}
```

---

### Template 3: DOT (DANO SOBRE TEMPO)

```json
{
  "id": 101,
  "autoRemovalTiming": 1,
  "chanceByDamage": 100,
  "iconIndex": 2,
  "maxTurns": 5,
  "message1": "%1 foi envenenado!",
  "message2": "%1 está envenenado!",
  "message4": "%1 não está mais envenenado!",
  "minTurns": 5,
  "motion": 1,
  "name": "Envenenado",
  "note": "",
  "overlay": 3,
  "priority": 50,
  "removeAtBattleEnd": true,
  "removeByDamage": false,
  "removeByRestriction": false,
  "removeByWalking": false,
  "restriction": 0,
  "stepsToRemove": 100,
  "traits": [
    {"code": 22, "dataId": 7, "value": -0.1}
  ],
  "messageType": 1
}
```

---

### Template 4: CC LEVE (CEGUEIRA)

```json
{
  "id": 102,
  "autoRemovalTiming": 1,
  "chanceByDamage": 0,
  "iconIndex": 3,
  "maxTurns": 5,
  "message1": "%1 foi cegado!",
  "message2": "%1 está cego!",
  "message4": "%1 não está mais cego!",
  "minTurns": 3,
  "motion": 1,
  "name": "Cegueira",
  "note": "",
  "overlay": 2,
  "priority": 60,
  "removeAtBattleEnd": true,
  "removeByDamage": false,
  "removeByRestriction": false,
  "removeByWalking": false,
  "restriction": 0,
  "stepsToRemove": 100,
  "traits": [
    {"code": 22, "dataId": 0, "value": -0.5}
  ],
  "messageType": 1
}
```

---

### Template 5: CC PESADO (SONO)

```json
{
  "id": 103,
  "autoRemovalTiming": 1,
  "chanceByDamage": 100,
  "iconIndex": 8,
  "maxTurns": 5,
  "message1": "%1 adormeceu!",
  "message2": "%1 adormeceu!",
  "message3": "%1 está dormindo.",
  "message4": "%1 desperta!",
  "minTurns": 3,
  "motion": 2,
  "name": "Adormecido",
  "note": "",
  "overlay": 7,
  "priority": 90,
  "removeAtBattleEnd": true,
  "removeByDamage": true,
  "removeByRestriction": false,
  "removeByWalking": false,
  "restriction": 4,
  "stepsToRemove": 100,
  "traits": [
    {"code": 22, "dataId": 1, "value": -1}
  ],
  "messageType": 1
}
```

---

### Template 6: REGENERAÇÃO

```json
{
  "id": 104,
  "autoRemovalTiming": 2,
  "chanceByDamage": 0,
  "iconIndex": 72,
  "maxTurns": 4,
  "message1": "%1 está regenerando!",
  "message4": "A regeneração acabou.",
  "minTurns": 4,
  "motion": 0,
  "name": "Regeneração",
  "note": "",
  "overlay": 0,
  "priority": 40,
  "removeAtBattleEnd": true,
  "removeByDamage": false,
  "removeByRestriction": false,
  "removeByWalking": false,
  "restriction": 0,
  "stepsToRemove": 100,
  "traits": [
    {"code": 22, "dataId": 7, "value": 0.1}
  ],
  "messageType": 1
}
```

---

### Template 7: PASSIVO DE MAPA

```json
{
  "id": 105,
  "autoRemovalTiming": 0,
  "chanceByDamage": 100,
  "iconIndex": 72,
  "maxTurns": 1,
  "message1": "",
  "message2": "",
  "message3": "",
  "message4": "",
  "minTurns": 1,
  "motion": 0,
  "name": "Reduzir Batalhas",
  "note": "",
  "overlay": 0,
  "priority": 20,
  "removeAtBattleEnd": false,
  "removeByDamage": false,
  "removeByRestriction": false,
  "removeByWalking": false,
  "restriction": 0,
  "stepsToRemove": 100,
  "traits": [
    {"code": 64, "dataId": 0, "value": 1}
  ],
  "messageType": 1
}
```

---

## ANTI-PATTERNS COMUNS

### Anti-Pattern 1: `removeByDamage: false` com `chanceByDamage: 50`

```json
// ❌ ERRADO
{
  "removeByDamage": false,
  "chanceByDamage": 50
}

// ✅ CORRETO
{
  "removeByDamage": true,
  "chanceByDamage": 50
}
```

**Problema:** `chanceByDamage` é **ignorado** se `removeByDamage` é false.

---

### Anti-Pattern 2: CC com `removeAtBattleEnd: false`

```json
// ❌ ERRADO - CC persiste após batalha
{
  "name": "Confusão",
  "restriction": 3,
  "removeAtBattleEnd": false
}

// ✅ CORRETO
{
  "name": "Confusão",
  "restriction": 3,
  "removeAtBattleEnd": true
}
```

**Problema:** Player fica com CC após batalha (bug crítico de UX).

---

### Anti-Pattern 3: `maxTurns: 5` sem `autoRemovalTiming` válido

```json
// ❌ ERRADO - Nunca expira
{
  "autoRemovalTiming": 0,
  "maxTurns": 5
}

// ✅ CORRETO
{
  "autoRemovalTiming": 1,
  "maxTurns": 5
}
```

**Problema:** State nunca expira por tempo (permanentemente ativo).

---

### Anti-Pattern 4: Usar `code: 12` para buff de DEF

```json
// ❌ ERRADO - Code 12 é DEBUFF_RATE, não PARAM
{
  "traits": [{"code": 12, "dataId": 3, "value": 0.7}]
}

// ✅ CORRETO
{
  "traits": [{"code": 21, "dataId": 3, "value": 0.7}]
}
```

**Problema:** Code 12 modifica **taxa de receber debuff**, não DEF.

---

### Anti-Pattern 5: `priority: 0` para state importante

```json
// ❌ ERRADO - Pode ser ocultado
{
  "name": "Morte",
  "restriction": 4,
  "priority": 0
}

// ✅ CORRETO
{
  "name": "Morte",
  "restriction": 4,
  "priority": 100
}
```

**Problema:** States de maior prioridade sobrescrevem visuais.

---

### Anti-Pattern 6: Usar `releaseByDamage`

```json
// ❌ ERRADO - Campo obsoleto
{
  "releaseByDamage": true
}

// ✅ CORRETO - Use removeByDamage
{
  "removeByDamage": true,
  "chanceByDamage": 100
}
```

**Problema:** `releaseByDamage` é legado MV, **não funciona em MZ**.

---

### Anti-Pattern 7: State de CC sem `restriction`

```json
// ❌ ERRADO - CC sem restrição
{
  "name": "Atordoado",
  "restriction": 0
}

// ✅ CORRETO
{
  "name": "Atordoado",
  "restriction": 4
}
```

**Problema:** Battler ainda pode agir mesmo estando "atordoado".

---

## REFERÊNCIA RÁPIDA

### Cheat Sheet de Campos

| Campo | Tipo | Valores Comuns | Uso |
|-------|------|----------------|-----|
| `autoRemovalTiming` | int | 0, 1, 2 | Quando remove por tempo |
| `removeByDamage` | bool | true/false | Pode remover por dano? |
| `chanceByDamage` | int | 0-100 | Chance de remover por dano |
| `removeAtBattleEnd` | bool | true/false | Remove ao fim da batalha? |
| `removeByWalking` | bool | true/false | Remove por passos? |
| `removeByRestriction` | bool | true/false | Remove ao ficar restrito? |
| `minTurns` | int | 1+ | Turnos mínimos |
| `maxTurns` | int | 1+ | Turnos máximos |
| `stepsToRemove` | int | 1+ | Passos para remover |
| `restriction` | int | 0-4 | Tipo de restrição |
| `priority` | int | 0-100+ | Ordem de exibição |
| `motion` | int | 0-3 | Animação de battler |
| `overlay` | int | 0-10 | Efeito visual |
| `iconIndex` | int | 0-255 | Ícone na UI |

---

### Cheat Sheet de Trait Codes

| Code | Nome | Método | Uso |
|------|------|--------|-----|
| 11 | ELEMENT_RATE | Pi | Dano elemental |
| 12 | DEBUFF_RATE | Pi | Suscetibilidade a debuff |
| 13 | STATE_RATE | Pi | Suscetibilidade a state |
| 14 | STATE_RESIST | Set | Imunidade a states |
| **21** | **PARAM** | **Pi** | **Atributos base** |
| **22** | **XPARAM** | **Sum** | **Atributos estendidos** |
| **23** | **SPARAM** | **Pi** | **Parâmetros especiais** |
| 61 | ACTION_PLUS | Sum | Ações extras |
| 62 | SPECIAL_FLAG | Set | Auto-battle, guard, etc. |

---

### Param IDs (code: 21)

```
0: MHP  1: MMP  2: ATK  3: DEF  4: MAT  5: MDF  6: AGI  7: LUK
```

---

### XParam IDs (code: 22)

```
0: HIT  1: EVA  2: CRI  3: CEV  4: MEV  5: MRF  6: CNT
7: HRG  8: MRG  9: TRG
```

---

### Restriction Values

```
0: None                  1: Confusion Lv.1
2: Confusion Lv.2        3: Confusion Lv.3
4: No Move (Stun/Sleep)
```

---

### Priority Ranges

```
0-20:   Map passives
21-40:  Battle buffs
41-60:  Light debuffs
61-79:  Moderate debuffs
80-89:  Heavy CC
90-100: Critical CC/Death
100+:   System states
```

---

## 🔵 VISUSTELLA: JAVASCRIPT HOOKS - GUIA COMPLETO

Os JavaScript Hooks do VisuStella permitem executar código customizado em momentos específicos do ciclo de vida de states e skills. Isso possibilita criar mecânicas complexas que não são possíveis com o JSON base.

---

### hooks DO SKILLS & STATES CORE

Estes hooks estão disponíveis **apenas com o plugin VisuStella Skills & States Core**.

#### Hook 1: `<JS On Add State>`

Executa código quando um state é **adicionado** ao battler.

```json
"note": "<JS On Add State>\nuser.gainMp(50);\nif (user.isActor()) user.gainExp(100);\n</JS On Add State>"
```

**Variáveis disponíveis:**
- `user` - Battler ativo (quem recebeu o state)
- `target` - Battler afetado (geralmente igual a `user`)
- `origin` - Quem aplicou o state (pode ser diferente de user)
- `state` - O objeto State sendo aplicado

**Casos de uso:**
- Dar recursos (HP/MP/TP) ao receber buff
- Aplicar efeitos visuais ou sonoros
- Modificar atributos dinamicamente
- Ativar switches
- Chamar Common Events

**Exemplo prático - State que explode ao ser aplicado:**
```json
{
  "id": 50,
  "name": "Reactive Shield",
  "note": "<JS On Add State>\n// Cura 20% HP ao receber shield\nuser.gainHp(Math.floor(user.mhp * 0.2));\n// Reproduz som de shield\n$gameSystem.setSaveCountMusic('Shield3');\n</JS On Add State>"
}
```

---

#### Hook 2: `<JS On Erase State>`

Executa código quando um state é **removido manualmente** (não por expiração).

```json
"note": "<JS On Erase State>\nuser.addState(5); // Aplica Poison quando curado\n</JS On Erase State>"
```

**Diferença para On Expire:**
- `On Erase`: Removido manualmente (skill/item, evento)
- `On Expire`: Expirou por turnos

**Exemplo prático - Maldição que espalha:**
```json
{
  "id": 51,
  "name": "Cursed Mark",
  "note": "<JS On Erase State>\n// Ao remover manualmente, aplica debuff mais fraco\nuser.addState(52);\n</JS On Erase State>\n<JS On Expire State>\n// Ao expirar naturalmente, não faz nada\n</JS On Expire State>"
}
```

---

#### Hook 3: `<JS On Expire State>`

Executa código quando um state **expira por turnos**.

```json
"note": "<JS On Expire State>\nuser.gainMp(user.mmp * 0.5); // Recupera 50% MP ao expirar\n</JS On Expire State>"
```

**Casos de uso:**
- Efeitos "post-buff" (recuperar recursos quando buff acaba)
- Punir quando debuff expira (take damage)
- Transicionar para outro state
- Ativar mecanismo de combo

**Exemplo prático - Overload:**
```json
{
  "id": 52,
  "name": "Magical Overload",
  "minTurns": 3,
  "maxTurns": 3,
  "autoRemovalTiming": 1,
  "note": "<Positive State>\n<JS On Add State>\n// +50% MAT enquanto ativo\n</JS On Add State>\n<JS On Expire State>\n// Ao expirar: perde 20% HP actual\nuser.gainHp(-Math.floor(user.hp * 0.2));\n</JS On Expire State>",
  "traits": [
    {"code": 21, "dataId": 4, "value": 1.5}
  ]
}
```

---

#### Hook 4: `<JS HP/MP/TP Slip Damage/Heal>`

Customiza o cálculo de DOT/HOT (Damage/Heal Over Time).

```json
"note": "<JS HP Slip Damage>\ndamage = Math.floor(target.mhp * 0.1);\nif (target.isStateAffected(10)) damage *= 2;\n</JS HP Slip Damage>"
```

**⚠️ REGRAS IMPORTANTES:**

1. **Apenas cálculos numéricos** - Não usar mecânicas de jogo aqui
2. **Deve atribuir à variável `damage` ou `heal`**
3. **Usar `<JS Slip Refresh>`** para recalcular a cada turno

```json
// ❌ ERRADO - Usa mecânicas de jogo
"note": "<JS HP Slip Damage>\ndamage = 100;\nif (damage > 0) target.addState(5);\n</JS HP Slip Damage>"

// ✅ CORRETO - Apenas cálculo
"note": "<JS HP Slip Damage>\ndamage = 100;\nif (target.hp < target.mhp * 0.5) damage *= 2;\n</JS HP Slip Damage>\n<JS Slip Refresh>"
```

**Variáveis disponíveis:**
- `user` - Origin do state (quem aplicou)
- `target` - Battler recebendo o dano
- `state` - State sendo processado
- `damage` / `heal` - Valor final a ser aplicado (DEVE ser atribuído)

**Exemplo prático - Poison progressivo:**
```json
{
  "id": 53,
  "name": "Toxic Poison",
  "minTurns": 5,
  "maxTurns": 5,
  "autoRemovalTiming": 2,
  "note": "<Category: DOT>\n<Negative State>\n<JS HP Slip Damage>\n// Dano aumenta a cada turno baseado em turnos restantes\nvar turns = user._stateTurns[state.id];\ndamage = Math.floor(target.mhp * 0.05 + (5 - turns) * 20);\n</JS HP Slip Damage>\n<JS Slip Refresh>",
  "overlay": 3,
  "iconIndex": 2
}
```

---

#### Hook 5: `<JS Slip Refresh>`

Força recálculo do DOT/HOT a cada turno (em vez de cachear).

```json
"note": "<JS HP Slip Damage>\ndamage = target.atk * 2;\n</JS HP Slip Damage>\n<JS Slip Refresh>"
```

**Quando usar:**
- DOT baseado em atributos que podem mudar
- DOT que aumenta/diminui com o tempo
- DOT condicional (baseado em HP, states, etc.)

---

#### Hook 6: `<JS Passive Condition>`

Condição customizada para passive states.

```json
"note": "<Passive State: 53>\n<JS Passive Condition>\ncondition = user.level >= 10 && user.hp > user.mhp * 0.5;\n</JS Passive Condition>"
```

**Variáveis disponíveis:**
- `user` - Battler sendo verificado
- `condition` - Boolean (deve retornar `true` ou `false`)

**Exemplo prático - Berserk Mode:**
```json
{
  "id": 54,
  "name": "Berserk Mode (Passive)",
  "note": "<Passive Stackable>\n<JS Passive Condition>\n// Ativo apenas quando HP < 30%\ncondition = user.hp < user.mhp * 0.3;\n</JS Passive Condition>",
  "traits": [
    {"code": 21, "dataId": 2, "value": 2.0},  // ATK +100%
    {"code": 21, "dataId": 3, "value": 0.5},  // DEF -50%
    {"code": 23, "dataId": 7, "value": 0.5}   // MP Cost -50%
  ]
}
```

---

### hooks DO BATTLE CORE

Estes hooks requerem o plugin **VisuStella Battle Core**. Eles são usados para mecânicas de batalha avançadas.

#### Hook 7: `<JS Pre-Damage Start>`

Executa **antes** de calcular o dano de um ataque.

```json
"note": "<JS Pre-Damage Start>\nif (target.hp < target.mhp * 0.3) {\n  this._item.damage.formula = 'a.atk * 6'; // Dano aumentado\n}\n</JS Pre-Damage Start>"
```

**Variáveis disponíveis:**
- `user` - Atacante
- `target` - Alvo do ataque
- `this` - Game_Action (a ação sendo executada)

**Casos de uso:**
- Modificar fórmula de dano baseado em condições
- Cancelar dano em condições específicas
- Aplicar efeitos pré-dano

---

#### Hook 8: `<JS Post-Damage End>`

Executa **depois** de aplicar o dano.

```json
"note": "<JS Post-Damage End>\nif (target.result().hpDamage > 0) {\n  user.gainHp(target.result().hpDamage);\n}\n</JS Post-Damage End>"
```

**Casos de uso:**
- Lifesteal customizado
- Efeitos de recoil
- Aplicar states baseado no dano causado
- Mecânicas de "execute" (matar instantaneamente se HP < X%)

**Exemplo prático - Execute:**
```json
{
  "id": 100,
  "name": "Execute",
  "note": "<JS Post-Damage End>\n// Se o alvo ficou com < 20% HP e recebeu dano físico, mata instantaneamente\nif (target.isAlive() && target.hpRate() < 0.2 && this.isPhysical() && target.result().hpDamage > 0) {\n  target.setHp(0);\n}\n</JS Post-Damage End>"
}
```

---

#### Hook 9: `<JS On Battle Start>`

Executa quando a batalha **começa**.

```json
"note": "<Passive State: 55>\n<JS On Battle Start>\nuser.gainTp(50); // Começa com 50 TP\n</JS On Battle Start>"
```

**Casos de uso:**
- Dar recursos iniciais
- Aplicar states de batalha
- Modificar atributos temporariamente

---

#### Hook 10: `<JS On Battle End>`

Executa quando a batalha **termina**.

```json
"note": "<Passive State: 56>\n<JS On Battle End>\nif ($gameParty.inBattle()) {\n  user.gainHp(user.mhp); // Cura completamente ao vencer\n}\n</JS On Battle End>"
```

---

#### Hook 11: `<JS On Turn Start>`

Executa no **início de cada turno** do battler.

```json
"note": "<Passive State: 57>\n<JS On Turn Start>\nif (user._turnCount % 2 === 0) {\n  user.addBuff(2, 1); // Aumenta ATK a cada 2 turnos\n}\n</JS On Turn Start>"
```

**Casos de uso:**
- Buffs acumulativos por turno
- Regeneração condicional
- Mecânicas de "charge"

**Exemplo prático - Ataque Acumulativo:**
```json
{
  "id": 58,
  "name": "Rising Power",
  "note": "<Passive Stackable>\n<JS On Turn Start>\n// Aumenta ATK em 10% a cada turno (max 5 stacks)\nvar stacks = user._risingPowerStacks || 0;\nif (stacks < 5) {\n  stacks++;\n  user._risingPowerStacks = stacks;\n  user.addBuff(2, 99); // Buff permanente até reset\n}\n</JS On Turn Start>\n<JS On Battle End>\nuser._risingPowerStacks = 0;\n</JS On Battle End>"
}
```

---

#### Hook 12: `<JS On Turn End>`

Executa no **final de cada turno** do battler.

```json
"note": "<Passive State: 59>\n<JS On Turn End>\nif (user.hpRate() < 0.5) {\n  user.gainHp(Math.floor(user.mhp * 0.05));\n}\n</JS On Turn End>"
```

---

#### Hook 13: `<JS Pre-Regenerate>`

Executa **antes** da fase de regeneração (DOT/HOT, regen natural).

```json
"note": "<Passive State: 60>\n<JS Pre-Regenerate>\n// Dobra regeneração se HP < 50%\nif (user.hpRate() < 0.5) {\n  user._hrg *= 2;\n}\n</JS Pre-Regenerate>"
```

**Casos de uso:**
- Modificar valores de regeneração
- Aplicar states baseados em HP atual
- Cancelar regeneração em condições específicas

---

#### Hook 14: `<JS Post-Regenerate>`

Executa **depois** da fase de regeneração.

```json
"note": "<Passive State: 61>\n<JS Post-Regenerate>\n// Se regenerou mais de 100 HP, aplica buff\nif (user._result.hpDamage < -100) {\n  user.addBuff(0, 2); // Buff de MHP por 2 turnos\n}\n</JS Post-Regenerate>"
```

---

### Exemplos Práticos Para os 20 Cenários

#### Cenário 5: Poison 5% HP Máx por 5 turnos

```json
{
  "id": 200,
  "name": "Deadly Poison",
  "minTurns": 5,
  "maxTurns": 5,
  "autoRemovalTiming": 2,
  "note": "<Category: DOT>\n<Negative State>\n<JS HP Slip Damage>\ndamage = Math.floor(target.mhp * 0.05);\n</JS HP Slip Damage>\n<JS Slip Refresh>",
  "iconIndex": 2,
  "overlay": 3
}
```

**Skill correspondente:**
```json
{
  "id": 300,
  "name": "Poison Dart",
  "stypeId": 1,
  "scope": 1,
  "mpCost": 5,
  "damage": {"type": 1, "formula": "a.agi * 2", "variance": 10},
  "effects": [
    {"code": 21, "dataId": 200, "value1": 1.0, "value2": 0}
  ]
}
```

---

#### Cenário 6: Dano + chance maior de bleeding se < 30% HP

```json
{
  "id": 301,
  "name": "Vicious Strike",
  "stypeId": 0,
  "scope": 1,
  "hitType": 1,
  "damage": {
    "type": 1,
    "critical": true,
    "formula": "a.atk * 3 - b.def * 1"
  },
  "note": "<JS Post-Damage End>\n// 20% base, 50% se alvo < 30% HP\nvar bleedChance = target.hpRate() < 0.3 ? 0.5 : 0.2;\nif (Math.random() < bleedChance) {\n  target.addState(201);\n}\n</JS Post-Damage End>"
}
```

---

#### Cenário 10: Dano de fogo + burn que reduz DEF

**State de Burn:**
```json
{
  "id": 202,
  "name": "Burn",
  "minTurns": 3,
  "maxTurns": 4,
  "autoRemovalTiming": 1,
  "note": "<Category: Fire>\n<Negative State>\n<JS HP Slip Damage>\ndamage = Math.floor(target.mhp * 0.03 + user.mat);\n</JS HP Slip Damage>\n<JS Slip Refresh>",
  "traits": [
    {"code": 21, "dataId": 3, "value": 0.7}
  ],
  "iconIndex": 66,
  "overlay": 5
}
```

**Skill de Fireball:**
```json
{
  "id": 302,
  "name": "Fireball",
  "stypeId": 1,
  "scope": 2,
  "mpCost": 12,
  "hitType": 2,
  "damage": {
    "type": 1,
    "elementId": 1,
    "formula": "a.mat * 3 + a.level * 5"
  },
  "effects": [
    {"code": 21, "dataId": 202, "value1": 0.4, "value2": 0}
  ]
}
```

---

#### Cenário 14: Buff acumulativo de ATK por turno (max 3)

```json
{
  "id": 203,
  "name": "Rising Power (Passive)",
  "note": "<Passive Stackable>\n<JS On Turn Start>\n// Inicializa contador se não existe\nif (typeof user._risingPowerCount === 'undefined') {\n  user._risingPowerCount = 0;\n}\n// Aumenta até 3 stacks\nif (user._risingPowerCount < 3) {\n  user._risingPowerCount++;\n  user.addBuff(2, 99); // ATK buff (quase permanente)\n}\n</JS On Turn Start>\n<JS On Battle End>\n// Reset ao fim da batalha\nuser._risingPowerCount = 0;\n</JS On Battle End>",
  "priority": 50
}
```

---

#### Cenário 15: Marca alvo para receber mais dano crítico

```json
{
  "id": 204,
  "name": "Marked for Death",
  "minTurns": 2,
  "maxTurns": 2,
  "autoRemovalTiming": 1,
  "note": "<Category: Mark>\n<Negative State>\n<JS On Add State>\n// Aumenta aggro para que este battler seja priorizado\nuser._aggroModifier = 2.0;\n</JS On Add State>\n<JS On Expire State>\nuser._aggroModifier = 1.0;\n</JS On Expire State>",
  "traits": [
    {"code": 22, "dataId": 3, "value": 0.3}, // +30% CRI recebido
    {"code": 23, "dataId": 0, "value": 1.5}  // +50% TARGET_RATE
  ],
  "overlay": 10
}
```

---

#### Cenário 17: Troca HP por MP

```json
{
  "id": 303,
  "name": "Life to Mana",
  "stypeId": 1,
  "scope": 11,
  "mpCost": 0,
  "damage": {"type": 0},
  "note": "<JS On Add State (Skill)>\n// Troca 20% HP atual por MP\nvar hpCost = Math.floor(user.hp * 0.2);\nvar mpGain = hpCost * 2;\nuser.gainHp(-hpCost);\nuser.gainMp(mpGain);\n</JS On Add State>"
}
```

---

#### Cenário 18: Dano + reduz contra-ataque

**State de Vulnerabilidade:**
```json
{
  "id": 205,
  "name": "Exposed",
  "minTurns": 1,
  "maxTurns": 1,
  "autoRemovalTiming": 1,
  "note": "<Category: Debuff>\n<Negative State>",
  "traits": [
    {"code": 22, "dataId": 6, "value": -0.5}, // -50% CNT (Contra-ataque)
    {"code": 23, "dataId": 1, "value": 1.3}  // +30% efeito de status
  ]
}
```

**Skill:**
```json
{
  "id": 304,
  "name": "Sweeping Strike",
  "scope": 2,
  "effects": [
    {"code": 21, "dataId": 205, "value1": 0.5, "value2": 0}
  ]
}
```

---

### Tabela de Referência Rápida - JS Hooks

| Hook | Plugin | Quando Executa | Variáveis Principais |
|------|--------|----------------|---------------------|
| `<JS On Add State>` | S&S Core | Ao adicionar state | user, target, origin, state |
| `<JS On Erase State>` | S&S Core | Ao remover manualmente | user, target, origin, state |
| `<JS On Expire State>` | S&S Core | Ao expirar por turnos | user, target, origin, state |
| `<JS HP Slip Damage>` | S&S Core | Na fase de regeneração | user, target, damage |
| `<JS Slip Refresh>` | S&S Core | Flag para recalcular DOT | - |
| `<JS Passive Condition>` | S&S Core | Verificar passive state | user, condition |
| `<JS Pre-Damage Start>` | Battle Core | Antes de calcular dano | user, target, this |
| `<JS Post-Damage End>` | Battle Core | Depois de aplicar dano | user, target, this |
| `<JS On Battle Start>` | Battle Core | Ao iniciar batalha | user |
| `<JS On Battle End>` | Battle Core | Ao terminar batalha | user |
| `<JS On Turn Start>` | Battle Core | Início do turno | user |
| `<JS On Turn End>` | Battle Core | Fim do turno | user |
| `<JS Pre-Regenerate>` | Battle Core | Antes da regeneração | user |
| `<JS Post-Regenerate>` | Battle Core | Depois da regeneração | user |

---

**💡 Dica:** Quer ver exemplos práticos de skills e states usados em conjunto em combate? Confira o [Guia de Design de Skills - Exemplos Práticos](../designe-guides/designe-skills-example-guide.md) para 20 exemplos completos de skills com states correspondentes e explicações de uso estratégico.

---

## CONCLUSÃO

Este guia fornece todas as informações técnicas necessárias para criar ou modificar states no RPG Maker MZ com **precisão validada contra o código fonte do engine** e **funcionalidades do VisuStella Skills & States Core**.

**Principais aprendizados (Engine Base):**
1. `removeByDamage` deve ser `true` para `chanceByDamage` funcionar
2. `autoRemovalTiming` deve ser `1` ou `2` para `maxTurns` funcionar
3. `priority` define visuais de motion/overlay (maior valor vence)
4. `restriction: 4` = battler perde turno completamente
5. `restriction: 1-3` = Confusion (AI assume controle)
6. Traits têm diferentes métodos de agregação (Pi vs Sum vs Set)
7. **SPARAM (code: 23) usa `traitsPi` (multiplicativo), NÃO `traitsSum`**

**Principais aprendizados (VisuStella):**
1. **Action End Update** muda comportamento de `autoRemovalTiming: 1` (por ação, não turno)
2. **Reapply Rules** permitem controlar comportamento ao re-aplicar states
3. **Categories** permitem manipular groups de states
4. **JS Hooks** executam código em eventos específicos (add/erase/expire)
5. **Custom DOT/HOT** via `<JS HP Slip Damage>` + `<JS Slip Refresh>`
6. **Passive Conditions** para states ativos sob condições específicas

**Correções na v1.1 (validadas contra código fonte):**
- SPARAM agregação: `traitsSum` → `traitsPi` (multiplicativo)
- Tabela `restriction`: "Attack Only/Magic Only" → "Confusion Level 1-3"
- Templates: removido `chanceByDamage` contraditório em buffs/debuffs
- Template DOT: `autoRemovalTiming: 0` → `1` (para expirar corretamente)
- Template SONO: removido `releaseByDamage` (campo obsoleto)

**Adições na v1.2 (VisuStella validado):**
- Seção completa sobre funcionalidades do VisuStella
- Action End Update comportamento documentado
- Reapply Rules, Maximum Turns, Categories documentados
- JS Hooks e Custom DOT/HOT documentados
- Passive Conditions documentadas

**Adições na v1.3 (JavaScript Hooks completos):**
- Documentação completa de 14 JS Hooks (Skills & States + Battle Core)
- Exemplos práticos para os 20 cenários comuns
- Tabela de referência rápida de todos os hooks
- `<JS Pre-Damage Start/End>` para modificar cálculo de dano
- `<JS On Turn Start/End>` para mecânicas por turno
- `<JS Pre/Post-Regenerate>` para customizar regeneração
- Exemplos de buffs acumulativos, marcas, DOT dinâmicos

**Para referência futura:**
- Código fonte: `frontend/js/rmmz_objects.js`
- Linhas 2678-2682: `resetStateCounts()` (duração)
- Linhas 3757-3766: `removeStatesByDamage()` (remoção por dano)
- Linhas 3738-3747: `removeStatesAuto()` (remoção por tempo)
- Linhas 3135-3144: `sortStates()` (prioridade)
- Linhas 2831-2837: `traitsPi()` / `traitsSum()` (agregação)
- Linhas 2893-2895: `sparam()` - confirma uso de `traitsPi`
- Linhas 3114-3121: `canMove()`, `isConfused()`, `confusionLevel()` - restrição
- VisuStella: `VisuStella-SkillsStatesCore-comparison.md`

---

**Documento criado em:** 2026-03-18
**Versão:** 1.2 (Correções + VisuStella)
**Validado contra:** RPG Maker MZ v1.8.1 + VisuStella MZ Skills & States Core
