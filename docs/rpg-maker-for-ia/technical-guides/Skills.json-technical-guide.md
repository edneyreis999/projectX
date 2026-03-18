# Skills.json Technical Guide
## RPG Maker MZ - Guia Técnico Completo para IA

**Versão:** 1.2 (JavaScript Hooks adicionados)
**Data:** 2026-03-18
**Validado contra:** `frontend/js/rmmz_objects.js` (RPG Maker MZ v1.8.0)
**Plugin VisuStella:** Skills & States Core

---

## ÍNDICE

1. [Visão Geral](#visão-geral)
2. [Estrutura do Objeto Skill](#estrutura-do-objeto-skill)
3. [Campos do JSON Explicados](#campos-do-json-explicados)
4. [Sistema de Damage](#sistema-de-damage)
5. [Sistema de Effects](#sistema-de-effects)
6. [Sistema de Scope](#sistema-de-scope)
7. [Validação de Código Fonte](#validação-de-código-fonte)
8. [Templates de Skills](#templates-de-skills)
9. [Anti-Patterns Comuns](#anti-patterns-comuns)
10. [🔵 VISUSTELLA: Funcionalidades Adicionais](#visustella-funcionalidades-adicionais)

---

## ⚠️ AVISO IMPORTANTE: VISUSTELLA

Este projeto utiliza o plugin **VisuStella Skills & States Core**. Este plugin adiciona e modifica significativamente o comportamento de skills no RPG Maker MZ.

**Consulte a seção [VisuStella: Funcionalidades Adicionais](#visustella-funcionalidades-adicionais) para mais detalhes.**

---

## VISÃO GERAL

O `Skills.json` do RPG Maker MZ contém todas as habilidades (skills) do jogo. Cada skill é um objeto JSON com 24 campos que controlam todos os aspectos da habilidade: dano, custos, efeitos, animações, escopo, etc.

### Localização no Código

```javascript
// Fonte: rmmz_objects.js:1365
Game_Item.prototype.object = function() {
    if (this.isSkill()) {
        return $dataSkills[this._itemId];  // Array global de skills
    }
    // ...
};
```

### Carregamento

```javascript
// Fonte: rmmz_objects.js:1480
Game_Action.prototype.setSkill = function(skillId) {
    this._item.setObject($dataSkills[skillId]);
};
```

---

## ESTRUTURA DO OBJETO SKILL

### Estrutura Completa

```json
{
  "id": 1,
  "animationId": 0,
  "damage": {
    "critical": false,
    "elementId": 0,
    "formula": "0",
    "type": 0,
    "variance": 20
  },
  "description": "",
  "effects": [],
  "hitType": 0,
  "iconIndex": 0,
  "message1": "",
  "message2": "",
  "mpCost": 0,
  "name": "",
  "note": "",
  "occasion": 0,
  "repeats": 1,
  "requiredWtypeId1": 0,
  "requiredWtypeId2": 0,
  "scope": 1,
  "speed": 0,
  "stypeId": 0,
  "successRate": 100,
  "tpCost": 0,
  "tpGain": 0,
  "messageType": 1
}
```

### Legenda de Campos

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `id` | Number | Sim | Identificador único da skill |
| `name` | String | Sim | Nome exibido da skill |
| `description` | String | Não | Descrição exibida no menu |
| `iconIndex` | Number | Não | Índice do ícone (0-9999) |
| `stypeId` | Number | Sim | ID do Skill Type (categoria) |
| `scope` | Number | Sim | Escopo de alvos (1-14) |
| `mpCost` | Number | Sim | Custo de MP |
| `tpCost` | Number | Sim | Custo de TP |
| `tpGain` | Number | Sim | TP ganho ao usar |
| `animationId` | Number | Sim | ID da animação (-1 = nenhuma) |
| `messageType` | Number | Sim | Tipo de mensagem (1-4) |
| `message1` | String | Não | Mensagem linha 1 |
| `message2` | String | Não | Mensagem linha 2 |
| `requiredWtypeId1` | Number | Sim | Weapon Type ID requerido 1 |
| `requiredWtypeId2` | Number | Sim | Weapon Type ID requerido 2 |
| `hitType` | Number | Sim | Tipo de acerto (0-2) |
| `successRate` | Number | Sim | Taxa de sucesso (0-100) |
| `repeats` | Number | Sim | Número de repetições (1+) |
| `speed` | Number | Sim | Modificador de velocidade |
| `occasion` | Number | Sim | Quando pode ser usado (0-2) |
| `damage` | Object | Sim | Objeto de configuração de dano |
| `effects` | Array | Sim | Array de efeitos adicionais |
| `note` | String | Não | Notetags para plugins |

---

## CAMPOS DO JSON EXPLICADOS

### 1. id

**Tipo:** Number
**Obrigatório:** Sim
**Valor Padrão:** Auto-incremento

Identificador único da skill. Deve ser único em todo o arquivo.

**⚠️ IMPORTANTE:** Nunca altere o ID de skills existentes. Isso pode quebrar referências em classes, inimigos, eventos, etc.

### 2. name

**Tipo:** String
**Obrigatório:** Sim

Nome exibido da skill em menus e batalha.

**Uso no código:**
```javascript
// rmmz_objects.js:4554
Game_Actor.prototype.learnSkill = function(skillId) {
    // ...
    $gameMessage.add(TextManager.obtainSkill.format(skill.name));
};
```

### 3. description

**Tipo:** String
**Obrigatório:** Não
**Valor Padrão:** `""`

Descrição exibida quando o jogador visualiza a skill no menu. Aceita texto simples.

**⚠️ NOTA:** Não processa códigos de escape. Use apenas texto UTF-8.

### 4. iconIndex

**Tipo:** Number
**Obrigatório:** Não
**Valor Padrão:** `0`

Índice do ícone exibido ao lado da skill. O sistema usa o ícone do `System.json` para este índice.

- `0` = Sem ícone
- `1-9999` = Índice no arquivo de ícones

### 5. stypeId

**Tipo:** Number
**Obrigatório:** Sim
**Valor Padrão:** `0`

ID do Skill Type (categoria) a que esta skill pertence. Define em quais menus a skill aparece.

**Uso no código:**
```javascript
// rmmz_objects.js:1617
Game_Action.prototype.isMagicSkill = function() {
    if (this.isSkill()) {
        return $dataSystem.magicSkills.includes(this.item().stypeId);
    }
    return false;
};
```

**Validação de uso:**
```javascript
// rmmz_objects.js:3236
!this.isSkillTypeSealed(skill.stypeId)
```

**Relação com System.json:**
```json
// System.json
{
  "skillTypes": [
    { "id": 0, "name": "(None)" },
    { "id": 1, "name": "Magia" },
    { "id": 2, "name": "Habilidade Especial" }
  ],
  "magicSkills": [1, 2]  // Skills com estes stypeId são consideradas "mágicas"
}
```

### 6. scope

**Tipo:** Number
**Obrigatório:** Sim
**Range:** 1-14

Define quem pode ser afetado pela skill.

#### Tabela de Scopes

| Valor | Nome | Descrição | needsSelection |
|-------|------|-----------|----------------|
| 1 | One Enemy | Um inimigo (seleção manual) | Sim |
| 2 | All Enemies | Todos os inimigos | Não |
| 3 | One Random Enemy | Um inimigo aleatório | Não |
| 4 | 2 Random Enemies | 2 inimigos aleatórios | Não |
| 5 | 3 Random Enemies | 3 inimigos aleatórios | Não |
| 6 | 4 Random Enemies | 4 inimigos aleatórios | Não |
| 7 | One Ally | Um aliado (seleção manual) | Sim |
| 8 | All Allies | Todos os aliados | Não |
| 9 | One Dead Ally | Um aliado morto (seleção manual) | Sim |
| 10 | All Dead Allies | Todos os aliados mortos | Não |
| 11 | User | Apenas o usuário | Não |
| 12 | One Ally (User excluded) | Um aliado exceto usuário (seleção) | Sim |
| 13 | All Allies (User excluded) | Todos aliados exceto usuário | Não |
| 14 | Random Ally | Um aliado aleatório | Não |

**Uso no código:**
```javascript
// rmmz_objects.js:1539-1553
Game_Action.prototype.isForUser = function() {
    return this.checkItemScope([11]);
};

Game_Action.prototype.isForOne = function() {
    return this.checkItemScope([1, 3, 7, 9, 11, 12]);
};

Game_Action.prototype.isForAll = function() {
    return this.checkItemScope([2, 8, 10, 13, 14]);
};

Game_Action.prototype.needsSelection = function() {
    return this.checkItemScope([1, 7, 9, 12]);
};
```

**Seleção de alvos:**
```javascript
// rmmz_objects.js:1721-1731
Game_Action.prototype.targetsForFriends = function() {
    const unit = this.friendsUnit();
    if (this.isForUser()) {
        return [this.subject()];
    } else if (this.isForDeadFriend()) {
        return this.targetsForDead(unit);
    } else if (this.isForAliveFriend()) {
        return this.targetsForAlive(unit);
    } else {
        return this.targetsForDeadAndAlive(unit);
    }
};
```

### 7. mpCost

**Tipo:** Number
**Obrigatório:** Sim
**Range:** 0-9999
**Valor Padrão:** `0`

Custo de MP para usar a skill. Multiplicado pela taxa de conservação de MP (MCR) do battler.

**Cálculo no código:**
```javascript
// rmmz_objects.js:3198-3200
Game_BattlerBase.prototype.skillMpCost = function(skill) {
    return Math.floor(skill.mpCost * this.mcr);  // mcr = MP Cost Rate
};
```

**Validação:**
```javascript
// rmmz_objects.js:3206-3209
Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
    return this.mp >= this.skillMpCost(skill) && this.tp >= this.skillTpCost(skill);
};
```

### 8. tpCost

**Tipo:** Number
**Obrigatório:** Sim
**Range:** 0-100
**Valor Padrão:** `0`

Custo de TP para usar a skill. TP (Tension Point) é um recurso limitado acumulado em batalha.

**Cálculo no código:**
```javascript
// rmmz_objects.js:3202-3204
Game_BattlerBase.prototype.skillTpCost = function(skill) {
    return skill.tpCost;  // Sem multiplicadores
};
```

### 9. tpGain

**Tipo:** Number
**Obrigatório:** Sim
**Range:** 0-100
**Valor Padrão:** `0`

TP ganho pelo usuário ao usar a skill. Multiplicado pela taxa de ganho de TP (TCR).

**Cálculo no código:**
```javascript
// rmmz_objects.js:2228-2230
Game_Action.prototype.applyItemUserEffect = function(/*target*/) {
    const value = Math.floor(this.item().tpGain * this.subject().tcr);
    this.subject().gainSilentTp(value);
};
```

### 10. animationId

**Tipo:** Number
**Obrigatório:** Sim
**Range:** -1, 0-9999
**Valor Padrão:** `0`

ID da animação tocada quando a skill é usada.

- `-1` = Animação do ataque padrão (weapon)
- `0` = Sem animação
- `1+` = ID da animação no database

**Uso no código:**
```javascript
// rmmz_objects.js:103-118
Game_Temp.prototype.requestAnimation = function(targets, animationId, mirror = false) {
    if ($dataAnimations[animationId]) {
        const request = {
            targets: targets,
            animationId: animationId,
            mirror: mirror
        };
        this._animationQueue.push(request);
        for (const target of targets) {
            if (target.startAnimation) {
                target.startAnimation();
            }
        }
    }
};
```

### 11. messageType

**Tipo:** Number
**Obrigatório:** Sim
**Range:** 1-4
**Valor Padrão:** `1`

Define como a mensagem de uso da skill é exibida.

| Valor | Efeito |
|-------|--------|
| 1 | Normal (usa message1 + message2) |
| 2 | Skill é usada sem mensagem |
| 3 | Skill é usada sem mensagem (inimigo) |
| 4 | Mensagem customizada (usa apenas message2) |

### 12. message1

**Tipo:** String
**Obrigatório:** Não
**Valor Padrão:** `""`

Primeira linha de mensagem quando a skill é usada. Usa `%1` como placeholder para o nome do usuário.

**Exemplo:** `"%1 usou Fireball!"`

**Uso no código:**
```javascript
// rmmz_objects.js:4789-4792
Game_Actor.prototype.showAddedStates = function() {
    for (const state of this.result().addedStateObjects()) {
        if (state.message1) {
            $gameMessage.add(state.message1.format(this._name));
        }
    }
};
```

### 13. message2

**Tipo:** String
**Obrigatório:** Não
**Valor Padrão:** `""`

Segunda linha de mensagem quando a skill é usada. Usado principalmente para mensagens de estados.

### 14. requiredWtypeId1 / requiredWtypeId2

**Tipo:** Number
**Obrigatório:** Sim
**Range:** 0+
**Valor Padrão:** `0`

ID do Weapon Type requerido para usar esta skill. Permite criar skills que só podem ser usadas com certos tipos de armas.

**Lógica de validação:**
```javascript
// rmmz_objects.js:4370-4380
Game_Actor.prototype.isSkillWtypeOk = function(skill) {
    const wtypeId1 = skill.requiredWtypeId1;
    const wtypeId2 = skill.requiredWtypeId2;
    if (
        (wtypeId1 === 0 && wtypeId2 === 0) ||
        (wtypeId1 > 0 && this.isWtypeEquipped(wtypeId1)) ||
        (wtypeId2 > 0 && this.isWtypeEquipped(wtypeId2))
    ) {
        return true;
    }
    return false;
};
```

**Casos de uso:**
- `0, 0` = Sem requisito de arma (padrão)
- `1, 0` = Requer Weapon Type 1
- `1, 2` = Requer Weapon Type 1 OU 2
- `1, 1` = Requer Weapon Type 1 (redundante, use `1, 0`)

### 15. hitType

**Tipo:** Number
**Obrigatório:** Sim
**Range:** 0-2
**Valor Padrão:** `0`

Define como a skill calcula acerto/evasão.

| Valor | Constante | Descrição |
|-------|-----------|-----------|
| 0 | HITTYPE_CERTAIN | Acerto certo (100% hit, ignora evasion) |
| 1 | HITTYPE_PHYSICAL | Físico (usa HIT do attacker, EVA do defender) |
| 2 | HITTYPE_MAGICAL | Mágico (100% HIT base, usa MEV do defender) |

**Código fonte:**
```javascript
// rmmz_objects.js:1420-1422
Game_Action.HITTYPE_CERTAIN = 0;
Game_Action.HITTYPE_PHYSICAL = 1;
Game_Action.HITTYPE_MAGICAL = 2;

// rmmz_objects.js:1595-1605
Game_Action.prototype.isCertainHit = function() {
    return this.item().hitType === Game_Action.HITTYPE_CERTAIN;
};

Game_Action.prototype.isPhysical = function() {
    return this.item().hitType === Game_Action.HITTYPE_PHYSICAL;
};

Game_Action.prototype.isMagical = function() {
    return this.item().hitType === Game_Action.HITTYPE_MAGICAL;
};
```

**Cálculo de hit rate:**
```javascript
// rmmz_objects.js:1885-1892
Game_Action.prototype.itemHit = function(/*target*/) {
    const successRate = this.item().successRate;
    if (this.isPhysical()) {
        return successRate * 0.01 * this.subject().hit;
    } else {
        return successRate * 0.01;  // Certain hit ou Magical
    }
};
```

**Cálculo de evasion:**
```javascript
// rmmz_objects.js:1894-1902
Game_Action.prototype.itemEva = function(target) {
    if (this.isPhysical()) {
        return target.eva;  // Evasão física
    } else if (this.isMagical()) {
        return target.mev;  // Evasão mágica
    } else {
        return 0;  // Certain hit = 0 evasion
    }
};
```

### 16. successRate

**Tipo:** Number
**Obrigatório:** Sim
**Range:** 0-100
**Valor Padrão:** `100`

Taxa base de sucesso da skill (em %). Modificada por hitType conforme acima.

**Uso no código:**
```javascript
// rmmz_objects.js:1886
const successRate = this.item().successRate;
```

### 17. repeats

**Tipo:** Number
**Obrigatório:** Sim
**Range:** 1+
**Valor Padrão:** `1`

Número de vezes que a skill é aplicada. Cada repetição é uma aplicação completa (dano + efeitos).

**Cálculo no código:**
```javascript
// rmmz_objects.js:1507-1512
Game_Action.prototype.numRepeats = function() {
    let repeats = this.item().repeats;
    if (this.isAttack()) {
        repeats += this.subject().attackTimesAdd();  // Bônus de ataque múltiplo
    }
    return Math.floor(repeats);
};
```

**Aplicação de repetições:**
```javascript
// rmmz_objects.js:1679-1686
Game_Action.prototype.repeatTargets = function(targets) {
    const repeatedTargets = [];
    const repeats = this.numRepeats();
    for (const target of targets) {
        if (target) {
            for (let i = 0; i < repeats; i++) {
                repeatedTargets.push(target);
            }
        }
    }
    return repeatedTargets;
};
```

### 18. speed

**Tipo:** Number
**Obrigatório:** Sim
**Range:** Qualquer número
**Valor Padrão:** `0`

Modificador de velocidade da action na ordem de batalha (TPB - Time Progress Battle).

- Valores positivos = Ação mais rápida
- Valores negativos = Ação mais lenta (cast time)

**Cálculo de cast time:**
```javascript
// rmmz_objects.js:3557-3562
Game_Battler.prototype.tpbRequiredCastTime = function() {
    const actions = this._actions.filter(action => action.isValid());
    const items = actions.map(action => action.item());
    const delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);
    return Math.sqrt(delay) / this.tpbSpeed();
};
```

**⚠️ IMPORTANTE:** Valores negativos em `speed` criam cast time. Valores positivos aceleram a ação.

### 19. occasion

**Tipo:** Number
**Obrigatório:** Sim
**Range:** 0-2
**Valor Padrão:** `0`

Define quando a skill pode ser usada.

| Valor | Nome | Usável em Batalha | Usável no Mapa |
|-------|------|-------------------|----------------|
| 0 | Always | Sim | Sim |
| 1 | Battle Only | Sim | Não |
| 2 | Menu Only | Não | Sim |

**Validação no código:**
```javascript
// rmmz_objects.js:3218-3224
Game_BattlerBase.prototype.isOccasionOk = function(item) {
    if ($gameParty.inBattle()) {
        return item.occasion === 0 || item.occasion === 1;
    } else {
        return item.occasion === 0 || item.occasion === 2;
    }
};
```

### 20. damage

**Tipo:** Object
**Obrigatório:** Sim

Objeto que define as propriedades de dano da skill.

#### Estrutura do Damage

```json
{
  "critical": false,
  "elementId": 0,
  "formula": "0",
  "type": 0,
  "variance": 20
}
```

---

## SISTEMA DE DAMAGE

### damage.type

**Tipo:** Number
**Range:** 0-6
**Valor Padrão:** `0`

Define o tipo de dano/recuperação.

| Valor | Tipo | Descrição | isHpEffect | isMpEffect |
|-------|------|-----------|------------|------------|
| 0 | None | Sem dano | Não | Não |
| 1 | HP Damage | Dano de HP | Sim | Não |
| 2 | MP Damage | Dano de MP | Não | Sim |
| 3 | HP Recover | Recuperação de HP | Sim | Não |
| 4 | MP Recover | Recuperação de MP | Não | Sim |
| 5 | HP Drain | Drena HP | Sim | Não |
| 6 | MP Drain | Drena MP | Não | Sim |

**Verificação no código:**
```javascript
// rmmz_objects.js:1563-1593
Game_Action.prototype.checkDamageType = function(list) {
    return list.includes(this.item().damage.type);
};

Game_Action.prototype.isHpEffect = function() {
    return this.checkDamageType([1, 3, 5]);
};

Game_Action.prototype.isMpEffect = function() {
    return this.checkDamageType([2, 4, 6]);
};

Game_Action.prototype.isDamage = function() {
    return this.checkDamageType([1, 2]);
};

Game_Action.prototype.isRecover = function() {
    return this.checkDamageType([3, 4]);
};

Game_Action.prototype.isDrain = function() {
    return this.checkDamageType([5, 6]);
};
```

### damage.critical

**Tipo:** Boolean
**Valor Padrão:** `false`

Se `true`, a skill pode causar critical hit (dano x3).

**Cálculo de critical rate:**
```javascript
// rmmz_objects.js:1904-1908
Game_Action.prototype.itemCri = function(target) {
    return this.item().damage.critical
        ? this.subject().cri * (1 - target.cev)  // CRI * (1 - CEV)
        : 0;
};
```

**Aplicação de critical:**
```javascript
// rmmz_objects.js:1920-1924
if (this.item().damage.type > 0) {
    result.critical = Math.random() < this.itemCri(target);
    const value = this.makeDamageValue(target, result.critical);
    this.executeDamage(target, value);
}

// rmmz_objects.js:1946-1948
if (critical) {
    value = this.applyCritical(value);  // value * 3
}
```

### damage.elementId

**Tipo:** Number
**Range:** -1, 0+
**Valor Padrão:** `0`

ID do elemento do dano.

- `-1` = Normal attack (usa attackElements do attacker)
- `0` = None (não aplica modificação elemental)
- `1+` = ID do elemento

**Cálculo de elemento rate:**
```javascript
// rmmz_objects.js:1969-1975
Game_Action.prototype.calcElementRate = function(target) {
    if (this.item().damage.elementId < 0) {
        // Normal attack - usa todos os elementos da arma
        return this.elementsMaxRate(target, this.subject().attackElements());
    } else {
        // Elemento específico
        return target.elementRate(this.item().damage.elementId);
    }
};

// rmmz_objects.js:1936
let value = baseValue * this.calcElementRate(target);
```

**Element Rate no target:**
```javascript
// rmmz_objects.js:2897-2899
Game_BattlerBase.prototype.elementRate = function(elementId) {
    return this.traitsPi(Game_BattlerBase.TRAIT_ELEMENT_RATE, elementId);
};
```

### damage.formula

**Tipo:** String
**Valor Padrão:** `"0"`

Fórmula JavaScript para cálculo do dano base. Executada em contexto sandbox.

**Variáveis disponíveis:**
- `a` = Attacker (sujeito da ação)
- `b` = Target (alvo da ação)
- `v` = Array de variáveis do jogo ($gameVariables._data)
- `this` = Game_Action

**Execução no código:**
```javascript
// rmmz_objects.js:1955-1967
Game_Action.prototype.evalDamageFormula = function(target) {
    try {
        const item = this.item();
        const a = this.subject();  // eslint-disable-line no-unused-vars
        const b = target;          // eslint-disable-line no-unused-vars
        const v = $gameVariables._data; // eslint-disable-line no-unused-vars
        const sign = ([3, 4].includes(item.damage.type) ? -1 : 1);
        const value = Math.max(eval(item.damage.formula), 0) * sign;
        // NaN check e valor mínimo
        return isNaN(value) ? 0 : value;
    } catch (e) {
        return 0;
    }
};
```

**Fórmulas comuns:**
```javascript
"a.atk * 4 - b.def * 2"  // Dano físico básico
"a.mat * 2 - b.mdf * 1"  // Dano mágico básico
"100 + a.level * 10"     // Dano fixo + level
"b.mhp * 0.25"           // 25% do HP máximo do target
```

### damage.variance

**Tipo:** Number
**Range:** 0-100
**Valor Padrão:** `20`

Variação percentual do dano final. Adiciona aleatoriedade ao dano.

**Cálculo no código:**
```javascript
// rmmz_objects.js:1990-1994
Game_Action.prototype.applyVariance = function(damage, variance) {
    const amp = Math.floor(Math.max((Math.abs(damage) * variance) / 100, 0));
    const v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;
    return damage >= 0 ? damage + v : damage - v;
};

// rmmz_objects.js:1949
value = this.applyVariance(value, item.damage.variance);
```

**Exemplos:**
- `0` = Sem variação (dano fixo)
- `20` = Variação padrão (±20%)
- `50` = Variação alta (±50%)

---

## SISTEMA DE EFFECTS

Array de efeitos adicionais aplicados quando a skill acerta. Cada efeito é um objeto com 4 campos.

### Estrutura de um Effect

```json
{
  "code": 21,
  "dataId": 1,
  "value1": 1,
  "value2": 0
}
```

### codes Disponíveis

```javascript
// rmmz_objects.js:1406-1418
Game_Action.EFFECT_RECOVER_HP = 11;
Game_Action.EFFECT_RECOVER_MP = 12;
Game_Action.EFFECT_GAIN_TP = 13;
Game_Action.EFFECT_ADD_STATE = 21;
Game_Action.EFFECT_REMOVE_STATE = 22;
Game_Action.EFFECT_ADD_BUFF = 31;
Game_Action.EFFECT_ADD_DEBUFF = 32;
Game_Action.EFFECT_REMOVE_BUFF = 33;
Game_Action.EFFECT_REMOVE_DEBUFF = 34;
Game_Action.EFFECT_SPECIAL = 41;
Game_Action.EFFECT_GROW = 42;
Game_Action.EFFECT_LEARN_SKILL = 43;
Game_Action.EFFECT_COMMON_EVENT = 44;
```

### Aplicação dos Effects

```javascript
// rmmz_objects.js:2056-2098
Game_Action.prototype.applyItemEffect = function(target, effect) {
    switch (effect.code) {
        case Game_Action.EFFECT_RECOVER_HP:
            this.itemEffectRecoverHp(target, effect);
            break;
        case Game_Action.EFFECT_RECOVER_MP:
            this.itemEffectRecoverMp(target, effect);
            break;
        case Game_Action.EFFECT_GAIN_TP:
            this.itemEffectGainTp(target, effect);
            break;
        case Game_Action.EFFECT_ADD_STATE:
            this.itemEffectAddState(target, effect);
            break;
        case Game_Action.EFFECT_REMOVE_STATE:
            this.itemEffectRemoveState(target, effect);
            break;
        case Game_Action.EFFECT_ADD_BUFF:
            this.itemEffectAddBuff(target, effect);
            break;
        case Game_Action.EFFECT_ADD_DEBUFF:
            this.itemEffectAddDebuff(target, effect);
            break;
        case Game_Action.EFFECT_REMOVE_BUFF:
            this.itemEffectRemoveBuff(target, effect);
            break;
        case Game_Action.EFFECT_REMOVE_DEBUFF:
            this.itemEffectRemoveDebuff(target, effect);
            break;
        case Game_Action.EFFECT_SPECIAL:
            this.itemEffectSpecial(target, effect);
            break;
        case Game_Action.EFFECT_GROW:
            this.itemEffectGrow(target, effect);
            break;
        case Game_Action.EFFECT_LEARN_SKILL:
            this.itemEffectLearnSkill(target, effect);
            break;
        case Game_Action.EFFECT_COMMON_EVENT:
            this.itemEffectCommonEvent(target, effect);
            break;
    }
};
```

### EFFECT_RECOVER_HP (11)

Recupera HP do target.

**dataId:** 0 (não usado)
**value1:** Porcentagem (0-1) ou valor fixo
**value2:** Porcentagem do HP máximo

```javascript
// Exemplo: Cura 100 HP fixo + 10% do MaxHP
{"code": 11, "dataId": 0, "value1": 100, "value2": 10}
```

### EFFECT_RECOVER_MP (12)

Recupera MP do target.

**dataId:** 0 (não usado)
**value1:** Valor fixo
**value2:** Porcentagem do MaxMP

### EFFECT_GAIN_TP (13)

Dá TP ao target.

**dataId:** 0 (não usado)
**value1:** Valor de TP

### EFFECT_ADD_STATE (21)

Adiciona um state ao target.

**dataId:** ID do state (1+)
**value1:** Chance (0-1)
**value2:** 0

```javascript
// Exemplo: 50% de chance de aplicar Poison (state 4)
{"code": 21, "dataId": 4, "value1": 0.5, "value2": 0}
```

### EFFECT_REMOVE_STATE (22)

Remove um state do target.

**dataId:** ID do state
**value1:** 100 (chance, sempre 100%)
**value2:** 0

### EFFECT_ADD_BUFF (31)

Adiciona buff em um parâmetro.

**dataId:** Parâmetro (0-7)
- 0: MaxHP, 1: MaxMP, 2: ATK, 3: DEF, 4: MAT, 5: MDF, 6: AGI, 7: LUK

**value1:** 0 (não usado)
**value2:** Turns (0 = até o fim da batalha)

### EFFECT_ADD_DEBUFF (32)

Adiciona debuff em um parâmetro.

Mesma estrutura que ADD_BUFF.

### EFFECT_REMOVE_BUFF (33) / EFFECT_REMOVE_DEBUFF (34)

Remove buff/debuff.

**dataId:** Parâmetro
**value1/value2:** Não usados

### EFFECT_SPECIAL (41)

Efeito especial.

**dataId:** 0 = Escape (fugir de batalha)

```javascript
// Exemplo: Skill de fuga
{"code": 41, "dataId": 0, "value1": 0, "value2": 0}
```

### EFFECT_GROW (42)

Aumenta parâmetro permanentemente.

**dataId:** Parâmetro (0-7, mesmo que buff)
**value1:** Valor de crescimento
**value2:** 0

### EFFECT_LEARN_SKILL (43)

Aprende uma skill (apenas para actors).

**dataId:** ID da skill
**value1:** 0
**value2:** 0

### EFFECT_COMMON_EVENT (44)

Chama um Common Event.

**dataId:** ID do Common Event
**value1:** 0
**value2:** 0

```javascript
// Exemplo: Chama Common Event 5
{"code": 44, "dataId": 5, "value1": 0, "value2": 0}
```

---

## SISTEMA DE SCOPE

Detalhamento completo do campo `scope` e como ele afeta a seleção de alvos.

### Grupos de Scope

#### Inimigos (Opponents)
- **1**: One Enemy (seleção manual)
- **2**: All Enemies
- **3-6**: 1-4 Random Enemies

#### Aliados (Friends)
- **7**: One Ally (seleção manual, vivo)
- **8**: All Allies (vivos)
- **9**: One Dead Ally (seleção manual)
- **10**: All Dead Allies
- **11**: User (apenas usuário)
- **12**: One Ally exceto User (seleção manual)
- **13**: All Allies exceto User
- **14**: Random Ally

### Verificações de Scope

```javascript
// rmmz_objects.js:1523-1557
Game_Action.prototype.isForOpponent = function() {
    return this.checkItemScope([1, 2, 3, 4, 5, 6]);
};

Game_Action.prototype.isForFriend = function() {
    return this.checkItemScope([7, 8, 9, 10, 11, 12, 13, 14]);
};

Game_Action.prototype.isForEveryone = function() {
    return this.checkItemScope([2, 8, 10, 13, 14]);
};

Game_Action.prototype.isForAliveFriend = function() {
    return this.checkItemScope([7, 8, 11, 14]);
};

Game_Action.prototype.isForDeadFriend = function() {
    return this.checkItemScope([9, 10]);
};

Game_Action.prototype.isForUser = function() {
    return this.checkItemScope([11]);
};

Game_Action.prototype.isForOne = function() {
    return this.checkItemScope([1, 3, 7, 9, 11, 12]);
};

Game_Action.prototype.isForRandom = function() {
    return this.checkItemScope([3, 4, 5, 6]);
};

Game_Action.prototype.isForAll = function() {
    return this.checkItemScope([2, 8, 10, 13, 14]);
};

Game_Action.prototype.needsSelection = function() {
    return this.checkItemScope([1, 7, 9, 12]);
};
```

### Seleção de Alvos

```javascript
// rmmz_objects.js:1665-1677
Game_Action.prototype.makeTargets = function() {
    const targets = [];
    if (!this._forcing && this.subject().isConfused()) {
        targets.push(this.confusionTarget());
    } else if (this.isForEveryone()) {
        targets.push(...this.targetsForEveryone());
    } else if (this.isForOpponent()) {
        targets.push(...this.targetsForOpponents());
    } else if (this.isForFriend()) {
        targets.push(...this.targetsForFriends());
    }
    return this.repeatTargets(targets);
};
```

---

## CAMPO NOTE (Notetags)

O campo `note` aceita texto livre que pode ser processado por plugins via notetags.

### Processamento de Notetags

```javascript
// rmmz_managers.js:186-198
DataManager.extractMetadata = function(data) {
    const regExp = /<([^<>:]+)(:?)([^>]*)>/g;
    data.meta = {};
    for (;;) {
        const match = regExp.exec(data.note);
        if (match) {
            if (match[2] === ":") {
                data.meta[match[1]] = match[3];  // <tag:valor>
            } else {
                data.meta[match[1]] = true;     // <tag>
            }
        } else {
            break;
        }
    }
};
```

### Uso

```json
{
  "note": "<CustomEffect><DamageMultiplier: 1.5><HideInMenu>"
}

// Acessível via:
skill.meta.CustomEffect  // true
skill.meta.DamageMultiplier  // "1.5"
skill.meta.HideInMenu  // true
```

---

## VALIDAÇÃO DE CÓDIGO FONTE

### Validação de Uso de Skill

```javascript
// rmmz_objects.js:3226-3238
Game_BattlerBase.prototype.canUse = function(item) {
    return (
        item &&
        this.isOccasionOk(item) &&
        this.meetsUsableItemConditions(item) &&
        this.isSkillWtypeOk(item) &&
        this.canPaySkillCost(item) &&
        !this.isSkillSealed(item.id) &&
        !this.isSkillTypeSealed(item.stypeId)
    );
};
```

### Checks de Validação

1. **isOccasionOk**: verifica `occasion` vs contexto
2. **meetsUsableItemConditions**: verifica condições especiais
3. **isSkillWtypeOk**: verifica weapon requirements
4. **canPaySkillCost**: verifica MP/TP
5. **isSkillSealed**: verifica se skill está selada
6. **isSkillTypeSealed**: verifica se skill type está selado

---

## TEMPLATES DE SKILLS

### Template 1: Ataque Físico Básico

**💡 Exemplo prático:** [Corte Rápido (Slash)](../designe-guides/designe-skills-example-guide.md#exemplo-1-corte-rápido-slash) - Um ataque básico confiável com custo zero.

```json
{
  "id": 100,
  "name": "Slash",
  "description": "A powerful sword strike.",
  "iconIndex": 76,
  "stypeId": 0,
  "scope": 1,
  "mpCost": 0,
  "tpCost": 0,
  "tpGain": 5,
  "animationId": 1,
  "messageType": 1,
  "message1": "%1 attacks!",
  "message2": "",
  "requiredWtypeId1": 1,
  "requiredWtypeId2": 0,
  "hitType": 1,
  "successRate": 100,
  "repeats": 1,
  "speed": 0,
  "occasion": 0,
  "damage": {
    "critical": true,
    "elementId": -1,
    "formula": "a.atk * 4 - b.def * 2",
    "type": 1,
    "variance": 20
  },
  "effects": [],
  "note": ""
}
```

### Template 2: Magia de Dano (HP Damage)

**💡 Exemplo prático:** [Bola de Fogo (Fireball)](../designe-guides/designe-skills-example-guide.md#exemplo-5-bola-de-fogo-fireball) - Magia de dano básica com escalamento por nível.

```json
{
  "id": 101,
  "name": "Fireball",
  "description": "Hurls a ball of fire at one enemy.",
  "iconIndex": 64,
  "stypeId": 1,
  "scope": 1,
  "mpCost": 8,
  "tpCost": 0,
  "tpGain": 2,
  "animationId": 52,
  "messageType": 1,
  "message1": "%1 casts Fireball!",
  "message2": "",
  "requiredWtypeId1": 0,
  "requiredWtypeId2": 0,
  "hitType": 2,
  "successRate": 100,
  "repeats": 1,
  "speed": 0,
  "occasion": 1,
  "damage": {
    "critical": false,
    "elementId": 3,
    "formula": "a.mat * 4 + a.level * 5",
    "type": 1,
    "variance": 10
  },
  "effects": [],
  "note": ""
}
```

### Template 3: Cura (HP Recover)

**💡 Exemplo prático:** [Cura (Heal)](../designe-guides/designe-skills-example-guide.md#exemplo-6-cura-heal) - Skill de cura essencial para qualquer grupo.

```json
{
  "id": 102,
  "name": "Heal",
  "description": "Restores HP to one ally.",
  "iconIndex": 81,
  "stypeId": 1,
  "scope": 7,
  "mpCost": 4,
  "tpCost": 0,
  "tpGain": 0,
  "animationId": 47,
  "messageType": 1,
  "message1": "%1 casts Heal!",
  "message2": "",
  "requiredWtypeId1": 0,
  "requiredWtypeId2": 0,
  "hitType": 0,
  "successRate": 100,
  "repeats": 1,
  "speed": 0,
  "occasion": 0,
  "damage": {
    "critical": false,
    "elementId": 0,
    "formula": "200 + a.mat * 2",
    "type": 3,
    "variance": 20
  },
  "effects": [],
  "note": ""
}
```

### Template 4: Buff de Ataque

**💡 Exemplo prático:** [Provocação (Taunt)](../designe-guides/designe-skills-example-guide.md#exemplo-8-provocação-taunt) - Buff de ataque em grupo com custo zero.

```json
{
  "id": 103,
  "name": "Taunt",
  "description": "Increases ATK for all allies.",
  "iconIndex": 82,
  "stypeId": 0,
  "scope": 8,
  "mpCost": 0,
  "tpCost": 0,
  "tpGain": 10,
  "animationId": 0,
  "messageType": 1,
  "message1": "%1 taunts!",
  "message2": "",
  "requiredWtypeId1": 0,
  "requiredWtypeId2": 0,
  "hitType": 0,
  "successRate": 100,
  "repeats": 1,
  "speed": 0,
  "occasion": 1,
  "damage": {
    "critical": false,
    "elementId": 0,
    "formula": "0",
    "type": 0,
    "variance": 20
  },
  "effects": [
    {"code": 31, "dataId": 2, "value1": 0, "value2": 3}
  ],
  "note": ""
}
```

### Template 5: Skill com Chance de State

**💡 Exemplo prático:** [Golpe Envenenado (Poison Strike)](../designe-guides/designe-skills-example-guide.md#exemplo-4-golpe-envenenado-poison-strike) - Ataque físico com chance de aplicar veneno.

```json
{
  "id": 104,
  "name": "Poison Strike",
  "description": "Attack that may poison.",
  "iconIndex": 76,
  "stypeId": 0,
  "scope": 1,
  "mpCost": 3,
  "tpCost": 0,
  "tpGain": 4,
  "animationId": 1,
  "messageType": 1,
  "message1": "%1 uses Poison Strike!",
  "message2": "",
  "requiredWtypeId1": 0,
  "requiredWtypeId2": 0,
  "hitType": 1,
  "successRate": 100,
  "repeats": 1,
  "speed": 0,
  "occasion": 1,
  "damage": {
    "critical": true,
    "elementId": 0,
    "formula": "a.atk * 3 - b.def * 2",
    "type": 1,
    "variance": 20
  },
  "effects": [
    {"code": 21, "dataId": 4, "value1": 0.4, "value2": 0}
  ],
  "note": ""
}
```

### Template 6: Habilidade com Cast Time

**💡 Exemplo prático:** [Golpe Carregado (Charged Strike)](../designe-guides/designe-skills-example-guide.md#exemplo-3-golpe-carregado-charged-strike) - Ataque poderoso com tempo de cast.

```json
{
  "id": 105,
  "name": "Charged Strike",
  "description": "Powerful attack that takes time to charge.",
  "iconIndex": 76,
  "stypeId": 0,
  "scope": 1,
  "mpCost": 0,
  "tpCost": 0,
  "tpGain": 10,
  "animationId": 1,
  "messageType": 1,
  "message1": "%1 charges power!",
  "message2": "",
  "requiredWtypeId1": 0,
  "requiredWtypeId2": 0,
  "hitType": 1,
  "successRate": 100,
  "repeats": 1,
  "speed": -2000,
  "occasion": 1,
  "damage": {
    "critical": true,
    "elementId": 0,
    "formula": "a.atk * 6 - b.def * 2",
    "type": 1,
    "variance": 10
  },
  "effects": [],
  "note": ""
}
```

### Template 7: Multi-Hit Skill

```json
{
  "id": 106,
  "name": "Flurry",
  "description": "Strikes multiple times.",
  "iconIndex": 76,
  "stypeId": 0,
  "scope": 1,
  "mpCost": 5,
  "tpCost": 0,
  "tpGain": 8,
  "animationId": 1,
  "messageType": 1,
  "message1": "%1 unleashes a flurry!",
  "message2": "",
  "requiredWtypeId1": 0,
  "requiredWtypeId2": 0,
  "hitType": 1,
  "successRate": 95,
  "repeats": 3,
  "speed": 0,
  "occasion": 1,
  "damage": {
    "critical": true,
    "elementId": 0,
    "formula": "a.atk * 2 - b.def * 1",
    "type": 1,
    "variance": 25
  },
  "effects": [],
  "note": ""
}
```

### Template 8: Skill de Fuga

```json
{
  "id": 107,
  "name": "Escape",
  "description": "Attempts to flee from battle.",
  "iconIndex": 98,
  "stypeId": 0,
  "scope": 11,
  "mpCost": 0,
  "tpCost": 0,
  "tpGain": 0,
  "animationId": 0,
  "messageType": 1,
  "message1": "%1 attempts to escape!",
  "message2": "",
  "requiredWtypeId1": 0,
  "requiredWtypeId2": 0,
  "hitType": 0,
  "successRate": 100,
  "repeats": 1,
  "speed": 2000,
  "occasion": 1,
  "damage": {
    "critical": false,
    "elementId": 0,
    "formula": "0",
    "type": 0,
    "variance": 20
  },
  "effects": [
    {"code": 41, "dataId": 0, "value1": 0, "value2": 0}
  ],
  "note": ""
}
```

---

**💡 Dica:** Quer ver exemplos práticos de skills completas com descrições detalhadas de uso em jogo? Confira o [Guia de Design de Skills - Exemplos Práticos](../designe-guides/designe-skills-example-guide.md) para 20 exemplos implementados com explicações de quando e por que usar cada skill.

---

## ANTI-PATTERNS COMUNS

### 1. Alterar ID de Skill Existente

❌ **ERRADO:**
```json
// Skill ID 1 é sempre "Attack" - alterar quebra o jogo
{"id": 1, "name": "Fireball", ...}
```

✅ **CORRETO:**
```json
// Use um novo ID
{"id": 100, "name": "Fireball", ...}
```

### 2. Fórmula de Dano Inválida

❌ **ERRADO:**
```json
"formula": "a.atk * 4 - b.def * 2;"  // Ponto e vírgula causa erro
"formula": "return a.atk * 4"        // return é inválido
```

✅ **CORRETO:**
```json
"formula": "a.atk * 4 - b.def * 2"
```

### 3. Element ID Inválido

❌ **ERRADO:**
```json
"elementId": 9999  // Element não existe no database
```

✅ **CORRETO:**
```json
"elementId": 3     // Element ID válido
// OU
"elementId": -1    // Normal attack (usa elementos da arma)
```

### 4. Scope Incompatível com Hit Type

❌ **ERRADO:**
```json
{
  "scope": 11,     // User (apenas usuário)
  "hitType": 1,    // Physical
  "damage": {
    "type": 1      // HP Damage
  }
}
// Auto-dano físico usa DEF do attacker, resultando em dano baixo ou zero
```

✅ **CORRETO:**
```json
{
  "scope": 11,
  "hitType": 0,    // Certain Hit para skills no usuário
  "damage": {
    "type": 1
  }
}
```

### 5. Effects Sem Dano

❌ **ERRADO:**
```json
{
  "damage": {"type": 0, ...},  // Sem dano
  "effects": []
}
// Skill não faz nada
```

✅ **CORRETO:**
```json
{
  "damage": {"type": 0, ...},
  "effects": [
    {"code": 31, "dataId": 2, "value1": 0, "value2": 3}  // Buff de ATK
  ]
}
```

### 6. Occession Errado

❌ **ERRADO:**
```json
{
  "name": "Fireball",
  "occasion": 2,  // Menu Only
  "damage": {"type": 1}  // HP Damage
}
// Fireball não pode ser usado em batalha
```

✅ **CORRETO:**
```json
{
  "name": "Fireball",
  "occasion": 1,  // Battle Only
  "damage": {"type": 1}
}
```

### 7. Repeats com Dano de Drain

❌ **ERRADO:**
```json
{
  "repeats": 3,
  "damage": {"type": 5}  // HP Drain
}
// Drain é aplicado 3x, pode quebrar balanceamento
```

### 8. Critical com Magical Hit Type

❌ **ERRADO:**
```json
{
  "hitType": 2,     // Magical
  "damage": {
    "critical": true,  // Magical skills não podem critical
    "type": 1
  }
}
```

✅ **CORRETO:**
```json
{
  "hitType": 2,
  "damage": {
    "critical": false,
    "type": 1
  }
}
```

### 9. Variance Muito Alta

❌ **ERRADO:**
```json
"variance": 100  // ±100% de variação
// Dano pode variar de 0 a 2x do valor base
```

✅ **CORRETO:**
```json
"variance": 20   // ±20% (padrão)
```

### 10. Missing stypeId

❌ **ERRADO:**
```json
{
  "stypeId": 0,   // (None)
  "name": "Fireball"
}
// Skill não aparece em nenhuma categoria
```

✅ **CORRETO:**
```json
{
  "stypeId": 1,   // Magic
  "name": "Fireball"
}
```

---

## CHEAT SHEET DE REFERÊNCIA RÁPIDA

### Damage Type Quick Reference

| Type | Nome | isDamage | isRecover | isDrain |
|------|------|----------|-----------|---------|
| 0 | None | ❌ | ❌ | ❌ |
| 1 | HP Damage | ✅ | ❌ | ❌ |
| 2 | MP Damage | ✅ | ❌ | ❌ |
| 3 | HP Recover | ❌ | ✅ | ❌ |
| 4 | MP Recover | ❌ | ✅ | ❌ |
| 5 | HP Drain | ✅ | ❌ | ✅ |
| 6 | MP Drain | ✅ | ❌ | ✅ |

### Hit Type Quick Reference

| Hit Type | usa HIT? | usa EVA? | usa MEV? | pode Critical? |
|----------|----------|----------|----------|----------------|
| 0 (Certain) | ❌ | ❌ | ❌ | ❌ |
| 1 (Physical) | ✅ | ✅ | ❌ | ✅ |
| 2 (Magical) | ❌ | ❌ | ✅ | ❌ |

### Scope Quick Reference

| Scope | Alvo | needsSelection | isForOpponent |
|-------|------|----------------|---------------|
| 1 | One Enemy | ✅ | ✅ |
| 2 | All Enemies | ❌ | ✅ |
| 3-6 | 1-4 Random Enemies | ❌ | ✅ |
| 7 | One Ally (vivo) | ✅ | ❌ |
| 8 | All Allies (vivos) | ❌ | ❌ |
| 9 | One Dead Ally | ✅ | ❌ |
| 10 | All Dead Allies | ❌ | ❌ |
| 11 | User | ❌ | ❌ |
| 12 | One Ally (exceto user) | ✅ | ❌ |
| 13 | All Allies (exceto user) | ❌ | ❌ |
| 14 | Random Ally | ❌ | ❌ |

### Effect Codes Quick Reference

| Code | Nome | dataId | value1 | value2 |
|------|------|--------|--------|--------|
| 11 | Recover HP | 0 | valor | % MaxHP |
| 12 | Recover MP | 0 | valor | % MaxMP |
| 13 | Gain TP | 0 | valor | 0 |
| 21 | Add State | stateId | chance (0-1) | 0 |
| 22 | Remove State | stateId | 100 | 0 |
| 31 | Add Buff | param (0-7) | 0 | turns |
| 32 | Add Debuff | param (0-7) | 0 | turns |
| 33 | Remove Buff | param (0-7) | 0 | 0 |
| 34 | Remove Debuff | param (0-7) | 0 | 0 |
| 41 | Special | 0 (escape) | 0 | 0 |
| 42 | Grow | param (0-7) | valor | 0 |
| 43 | Learn Skill | skillId | 0 | 0 |
| 44 | Common Event | eventId | 0 | 0 |

### Param IDs (para Buff/Debuff/Grow)

| ID | Parâmetro |
|----|-----------|
| 0 | MaxHP |
| 1 | MaxMP |
| 2 | ATK |
| 3 | DEF |
| 4 | MAT |
| 5 | MDF |
| 6 | AGI |
| 7 | LUK |

---

## 🔵 VISUSTELLA: FUNCIONALIDADES ADICIONAIS

**⚠️ AVISO:** Esta seção descreve funcionalidades adicionadas pelo plugin **VisuStella Skills & States Core**. Estas funcionalidades só estarão disponíveis se o plugin estiver instalado e ativo.

### Visão Geral

O plugin VisuStella Skills & States Core estende significativamente as funcionalidades de skills do RPG Maker MZ, adicionando:

- **Múltiplos Skill Types** por skill
- **Custom Skill Cost Types** (HP, Gold, Items, etc.)
- **Skill Toggles** (skills ligáveis/desligáveis)
- **Passive States** via skills
- **Controle de visibilidade/usabilidade** via switches/skills
- **Custos dinâmicos** via JavaScript
- **Gauges customizáveis** para novos cost types

---

### Múltiplos Skill Types

No RPG Maker MZ base, cada skill só pode pertencer a um skill type (`stypeId`). O VisuStella permite que uma skill apareça em múltiplos skill types.

#### Notetags

```javascript
<Skill Type: x>
<Skill Types: x,x,x>

<Skill Type: name>
<Skill Types: name, name, name>
```

- **Uso:** Skill Notetags (campo `note`)
- **x:** ID do Skill Type (número)
- **name:** Nome do Skill Type (string)

**Exemplo:**
```json
{
  "id": 100,
  "name": "Fireball",
  "stypeId": 1,
  "note": "<Skill Types: 1, 2, 3>"
}
```

**⚠️ IMPACTO NO JSON:** O campo `stypeId` continua sendo o skill type "primário", mas a skill aparecerá em todos os skill types listados no notetag.

---

### Custom Skill Cost Types

O VisuStella move todos os custos de skills para Plugin Parameters, permitindo criar novos tipos de custos além de MP e TP.

#### Tipos de Custos Disponíveis

- **HP** - Custo em HP
- **MP** - Custo em MP (padrão)
- **TP** - Custo em TP (padrão)
- **Gold** - Custo em Gold
- **Potion** - Custom resource type
- **Custom** - Qualquer tipo customizado via Plugin Parameters

#### Notetags de Custo

```javascript
<type Cost: x>
<type Cost: x%>
```

- **type:** Tipo de custo (HP, MP, TP, Gold, Potion, ou custom)
- **x:** Valor fixo ou porcentagem

**Exemplos:**
```json
{
  "name": "Life Burn",
  "mpCost": 10,
  "note": "<HP Cost: 50><MP Cost: 10>"
}

{
  "name": "Expensive Spell",
  "mpCost": 0,
  "note": "<Gold Cost: 100>"
}
```

**⚠️ SOBRESCREVE:** O campo `mpCost` JSON ainda é usado, mas o VisuStella adiciona custos adicionais via notetags.

#### Custo Percentual

```javascript
<type Cost: x%>
```

Calcula o custo como porcentagem do valor máximo do recurso.

**Exemplo:**
```json
{
  "name": "Blood Sacrifice",
  "note": "<HP Cost: 25%>"
}
```

---

### Skill Costs em Outros Objetos

Custos de skills podem ser modificados por actors, classes, weapons, armors, enemies e states.

```javascript
<type Cost: +x>
<type Cost: -x>
<type Cost: x%>
```

**Exemplo (em State):**
```json
{
  "id": 10,
  "name": "Mana Surge",
  "note": "<MP Cost: -50%>"
}
```

---

### Item Costs

Skills podem consumir items ao serem usadas.

```javascript
<Item Cost: x name>
<Weapon Cost: x name>
<Armor Cost: x name>

<Item Cost: x% name>
<Weapon Cost: x% name>
<Armor Cost: x% name>
```

**Exemplo:**
```json
{
  "name": "Throw Potion",
  "note": "<Item Cost: 1 Potion>"
}
```

---

### JavaScript Skill Costs

Custos dinâmicos calculados via JavaScript.

```javascript
<JS type Cost>
  code
  code
  cost = code;
</JS type Cost>
```

**Variáveis disponíveis:**
- `user` - Usuário da skill
- `skill` - Skill sendo usada
- `cost` - Custo final (deve ser atribuído)

**Exemplo:**
```javascript
<JS HP Cost>
  cost = user.mhp * 0.1 + user.level * 5;
</JS HP Cost>
```

---

### Custom Cost Text

Texto customizado para exibição do custo.

```javascript
<Custom Cost Text>
  text
</Custom Cost Text>
```

**Exemplo:**
```json
{
  "name": "Ultimate",
  "note": "<Custom Cost Text>\\C[17]ALL MP\\C[0]</Custom Cost Text>"
}
```

---

### Skill Accessibility

Controle de visibilidade e usabilidade de skills baseado em condições.

#### Hide/Show por Contexto

```javascript
<Hide in Battle>
<Hide outside Battle>
```

**Exemplo:**
```json
{
  "name": "Escape",
  "occasion": 1,
  "note": "<Hide outside Battle>"
}
```

#### Hide/Show por Switches

```javascript
<Show Switch: x>
<Show All Switches: x,x,x>
<Show Any Switches: x,x,x>

<Hide Switch: x>
<Hide All Switches: x,x,x>
<Hide Any Switches: x,x,x>
```

**Exemplo:**
```json
{
  "name": "Secret Technique",
  "note": "<Show Switch: 10>"
}
```

#### Hide/Show por Skills

```javascript
<Show if learned Skill: x>
<Show if learned All Skills: x,x,x>
<Show if learned Any Skills: x,x,x>

<Show if has Skill: x>
<Show if have All Skills: x,x,x>
<Show if have Any Skills: x,x,x>

<Hide if learned Skill: x>
<Hide if learned All Skills: x,x,x>
<Hide if learned Any Skills: x,x,x>

<Hide if has Skill: x>
<Hide if have All Skills: x,x,x>
<Hide if have Any Skills: x,x,x>
```

**⚠️ IMPORTANTE:** "learned" = skills aprendidas permanentemente. "has" = skills disponíveis (incluindo temporárias via traits).

#### Enable/Disable por Switches

```javascript
<Enable Switch: x>
<Enable All Switches: x,x,x>
<Enable Any Switches: x,x,x>

<Disable Switch: x>
<Disable All Switches: x,x,x>
<Disable Any Switches: x,x,x>
```

**Exemplo:**
```json
{
  "name": "Berserk",
  "note": "<Enable Switch: 20><Disable Switch: 21>"
}
```

#### JavaScript Visibility/Enable

```javascript
<JS Skill Show>
  code
  code
  visible = code;
</JS Skill Show>

<JS Skill Enable>
  code
  code
  enabled = code;
</JS Skill Enable>
```

**Variáveis disponíveis:**
- `user` - Usuário com a skill
- `skill` - Skill sendo verificada
- `visible` - Boolean (return `true` para mostrar)
- `enabled` - Boolean (return `true` para habilitar)

---

### Skill Toggles

Skills que podem ser ligadas/desligadas pelo jogador, ativando/desativando passive states.

#### Notetag Toggle

```javascript
<Toggle>
```

**Uso:** Skill Notetags

**Comportamento:**
- Toggle skills **não consomem ação** na batalha
- Custo é pago **apenas ao ligar** (OFF → ON)
- Desligar (ON → OFF) não custa nada
- Inimigos não podem usar toggles (sempre ON para eles)
- Funciona melhor com `<Passive State: x>`

**Exemplo:**
```json
{
  "id": 200,
  "name": "Stance: Offensive",
  "mpCost": 10,
  "note": "<Toggle><Passive State: 50>"
}
```

**⚠️ COMPATIBILIDADE:** Toggle skills não funcionam com:
- Active Chain Skills
- Evolution Matrix Skills
- Input Combo Skills
- Field Skills
- Item Amplify/Concoct/Throw Skills
- Skill Containers

#### JavaScript Check

```javascript
user.isSkillToggled($dataSkills[skillId])
```

---

### Passive States via Skills

Skills podem conceder passive states ao usuário.

#### Notetag Passive State

```javascript
<Passive State: x>
<Passive States: x,x,x>

<Passive State: name>
<Passive States: name, name, name>
```

**Uso:** Actor, Class, Skill, Weapon, Armor, Enemy Notetags

**⚠️ IMPORTANTE:**
- A skill deve ser **aprendida** pelo target (não dada via trait)
- Passive states via skills NÃO são afetadas por turns/steps/removal
- `a.isStateAffected(x)` retorna `false` para passive states
- Use `a.states().includes($dataStates[x])` para verificar

**Exemplo:**
```json
{
  "id": 300,
  "name": "Passive: Regeneration",
  "note": "<Passive State: 15>"
}
```

---

### List Name Customizado

Nome diferente para a skill quando exibida na lista.

```javascript
<List Name: name>
```

**Exemplo:**
```json
{
  "id": 400,
  "name": "Fire",
  "note": "<List Name: \\I[64]Fire Lv.\\V[10]>"
}
```

---

### ID Sort Priority

Controla a ordem de classificação no Skill Menu.

```javascript
<ID Sort Priority: x>
```

- **x:** Valor de prioridade (padrão: 50)
- Maior valor = mais acima na lista
- Menor valor = mais abaixo na lista

**Exemplo:**
```json
{
  "name": "Ultimate Attack",
  "note": "<ID Sort Priority: 100>"
}
```

---

### Resumo de Notetags VisuStella para Skills

| Notetag | Uso | Descrição |
|---------|-----|-----------|
| `<Skill Type: x>` | Skill | Adiciona skill type adicional |
| `<List Name: text>` | Skill | Nome customizado na lista |
| `<ID Sort Priority: x>` | Skill | Prioridade de ordenação |
| `<type Cost: x>` | Skill | Custo customizado |
| `<type Cost: x%>` | Skill | Custo percentual |
| `<Item Cost: x name>` | Skill | Consome item |
| `<Custom Cost Text>` | Skill | Texto customizado do custo |
| `<JS type Cost>` | Skill | Custo dinâmico via JS |
| `<Hide in Battle>` | Skill | Esconde em batalha |
| `<Hide outside Battle>` | Skill | Esconde fora de batalha |
| `<Show Switch: x>` | Skill | Mostra se switch ON |
| `<Hide Switch: x>` | Skill | Esconde se switch ON |
| `<Show if learned Skill: x>` | Skill | Mostra se skill aprendida |
| `<Show if has Skill: x>` | Skill | Mostra se skill disponível |
| `<Enable Switch: x>` | Skill | Habilita se switch ON |
| `<Disable Switch: x>` | Skill | Desabilita se switch ON |
| `<JS Skill Show>` | Skill | Visibilidade via JS |
| `<JS Skill Enable>` | Skill | Habilitar via JS |
| `<Toggle>` | Skill | Transforma em toggle skill |
| `<Passive State: x>` | Skill | Concede passive state |

---

### ⚠️ AVISOS ESPECIAIS VISUSTELLA

#### Passive States Não São "States"

**⚠️ NÃO É BUG:**
```javascript
a.isStateAffected(10)  // Retorna FALSE para passive states
```

**Use instead:**
```javascript
a.states().includes($dataStates[10])  // Retorna TRUE para passive states
```

#### Skill Costs são Processados Diferente

No VisuStella, **todos** os custos são processados via Plugin Parameters, incluindo MP e TP do JSON base.

#### Display de Custos

- **Base MZ:** Apenas TP (se disponível) ou MP
- **VisuStella:** TODOS os custos são exibidos em ordem

#### Gauge Replacement

Classes podem ter gauges substituídas por outros cost types (HP → Gold, etc.)

---

## 🔵 VISUSTELLA: JAVASCRIPT HOOKS PARA SKILLS

Os JavaScript Hooks permitem executar código customizado em momentos específicos do ciclo de vida de uma skill. Para documentação completa de hooks de States, veja **States-technical-guide.md > Seção VISUSTELLA: JAVASCRIPT HOOKS**.

---

### Hooks Disponíveis no Campo `note` das Skills

#### Hook 1: `<JS Pre-Damage Start>`

Executa **antes de calcular o dano** da skill.

```json
{
  "id": 100,
  "name": "Execute",
  "note": "<JS Pre-Damage Start>\nif (target.hpRate() < 0.25 && this.isPhysical()) {\n  this._item.damage.formula = '9999'; // Dano fatal\n}\n</JS Pre-Damage Start>"
}
```

**Variáveis disponíveis:**
- `user` - Usuário da skill
- `target` - Alvo da skill
- `this` - Game_Action (a ação sendo executada)

**Casos de uso:**
- Modificar fórmula de dano baseado em condições
- Cancelar dano se condição for atendida
- Multiplicador de dano condicional
- Modificar elemento dinamicamente

**Exemplo prático - Dano aumentado contra debuffs:**
```json
{
  "id": 101,
  "name": "Exploit Weakness",
  "note": "<JS Pre-Damage Start>\n// +50% dano se alvo tem debuff\nvar debuffCount = target._buffs.reduce(function(count, buff) {\n  return count + (buff < 0 ? 1 : 0);\n}, 0);\nif (debuffCount > 0) {\n  var baseFormula = this._item.damage.formula;\n  this._item.damage.formula = '(' + baseFormula + ') * 1.5';\n}\n</JS Pre-Damage Start>"
}
```

---

#### Hook 2: `<JS Post-Damage End>`

Executa **depois de aplicar o dano** da skill.

```json
{
  "id": 102,
  "name": "Vampiric Strike",
  "note": "<JS Post-Damage End>\n// Recupera 30% do dano causado como HP\nvar hpDamage = Math.abs(target.result().hpDamage);\nif (hpDamage > 0) {\n  user.gainHp(Math.floor(hpDamage * 0.3));\n}\n</JS Post-Damage End>"
}
```

**Casos de uso:**
- Lifesteal/Drain customizado
- Efeitos de recoil
- Aplicar states baseado no dano causado
- Mecânicas de "execute" (matar se HP < X%)
- Counter-effects no usuário

**Exemplo prático - Explosão ao matar:**
```json
{
  "id": 103,
  "name": "Death Burst",
  "scope": 2,
  "note": "<JS Post-Damage End>\n// Se matou o alvo, causa dano em área aos outros\nif (!target.isAlive() && target.result().hpDamage < 0) {\n  var burstDamage = user.mat * 2;\n  target.opponentsUnit().aliveMembers().forEach(function(enemy) {\n    if (enemy !== target) {\n      enemy.gainHp(-burstDamage);\n    }\n  });\n}\n</JS Post-Damage End>"
}
```

---

#### Hook 3: `<JS Before Eval>`

Executa **antes de avaliar a fórmula de dano**.

```json
{
  "id": 104,
  "name": "Power Charge",
  "note": "<JS Before Eval>\n// Dobra o dano se o usuário está abaixo de 30% HP\nif (user.hpRate() < 0.3) {\n  this._item.damage.formula = '(' + this._item.damage.formula + ') * 2';\n}\n</JS Before Eval>"
}
```

**Diferença para Pre-Damage Start:**
- `Before Eval`: Apenas antes de avaliar a fórmula
- `Pre-Damage Start`: Antes de todo o processo de cálculo de dano

---

#### Hook 4: `<JS After Eval>`

Executa **depois de avaliar a fórmula de dano**.

```json
{
  "id": 105,
  "name": "Controlled Strike",
  "note": "<JS After Eval>\n// Limita o dano a no máximo 50% do HP atual do alvo\nvar maxDamage = Math.floor(target.hp * 0.5);\nif (this._result.damage > maxDamage) {\n  this._result.damage = maxDamage;\n}\n</JS After Eval>"
}
```

---

#### Hook 5: `<JS On Use>`

Executa quando a skill é **usada** (após pagamento de custos).

```json
{
  "id": 106,
  "name": "Mana Burn",
  "note": "<JS On Use>\n// Consome 10% do MP atual além do custo base\nuser.gainMp(-Math.floor(user.mp * 0.1));\n</JS On Use>"
}
```

**Casos de uso:**
- Custos adicionais dinâmicos
- Efeitos colaterais no usuário
- Ativar switches
- Contar usos de skill

**Exemplo prático - Skill com cooldown:**
```json
{
  "id": 107,
  "name": "Meteor",
  "note": "<JS Skill Show>\nvisible = !$gameParty._meteorCooldown;\n</JS Skill Show>\n<JS Skill Enable>\nenabled = !$gameParty._meteorCooldown;\n</JS Skill Enable>\n<JS On Use>\n$gameParty._meteorCooldown = true;\n// Agenda reset do cooldown após 3 turnos\n$gameTroop._meteorCooldownTurns = $gameTroop.turnCount() + 3;\n</JS On Use>"
}
```

**Nota:** Para resetar o cooldown, seria necessário um evento paralelo ou Passive State verificando turnos.

---

### Hooks em States que Afetam Skills

Muitos hooks que afetam skills estão nos **States**, não na skill em si. Veja **States-technical-guide.md** para:

- `<JS On Add State>` - Skill que aplica state com efeito adicional
- `<JS On Expire State>` - Efeito quando state da skill expira
- `<JS On Turn Start/End>` - Skills passivas que agem por turno
- `<JS Pre/Post-Regenerate>` - Modificar regeneração

---

### Exemplos Completos de Skills com JS Hooks

**💡 Dica:** Para mais exemplos de skills usando JS Hooks, veja o [Guia de Design de Skills](../designe-guides/designe-skills-example-guide.md#skills-com-visustella-js-hooks).

#### Exemplo 1: Skill com Dano Condicional

```json
{
  "id": 200,
  "name": "Last Stand",
  "description": "Dano massivo, mas só funciona com menos de 25% HP.",
  "stypeId": 0,
  "scope": 1,
  "mpCost": 0,
  "hitType": 1,
  "damage": {
    "critical": true,
    "formula": "a.atk * 5",
    "type": 1,
    "variance": 10
  },
  "note": "<JS Pre-Damage Start>\n// Só causa dano se HP < 25%\nif (user.hpRate() >= 0.25) {\n  this._item.damage.formula = '0';\n}\n</JS Pre-Damage Start>\n<JS Skill Show>\nvisible = user.hpRate() < 0.25;\n</JS Skill Show>"
}
```

---

#### Exemplo 2: Skill com Lifesteal Percentual

```json
{
  "id": 201,
  "name": "Soul Drain",
  "description": "Causa dano e recupera HP baseado no dano causado.",
  "stypeId": 1,
  "scope": 1,
  "mpCost": 15,
  "hitType": 2,
  "damage": {
    "formula": "a.mat * 3 + a.level * 10",
    "type": 1
  },
  "note": "<JS Post-Damage End>\n// Recupera 40% do dano como HP\nvar hpDamage = Math.abs(target.result().hpDamage);\nif (hpDamage > 0) {\n  user.gainHp(Math.floor(hpDamage * 0.4));\n}\n</JS Post-Damage End>"
}
```

---

#### Exemplo 3: Skill que Remove Buffs e Causa Dano

```json
{
  "id": 202,
  "name": "Dispel Strike",
  "description": "Remove todos os buffs do alvo e causa dano extra.",
  "stypeId": 0,
  "scope": 1,
  "mpCost": 10,
  "hitType": 1,
  "damage": {
    "formula": "a.atk * 2",
    "type": 1
  },
  "note": "<JS Pre-Damage Start>\n// Conta buffs e aumenta dano\nvar buffCount = 0;\nfor (var i = 0; i < 8; i++) {\n  if (target._buffs[i] > 0) buffCount++;\n}\nif (buffCount > 0) {\n  var baseFormula = this._item.damage.formula;\n  this._item.damage.formula = '(' + baseFormula + ') * (1 + ' + buffCount + ' * 0.2)';\n}\n</JS Pre-Damage Start>",
  "effects": [
    {"code": 33, "dataId": 0, "value1": 0, "value2": 0},
    {"code": 33, "dataId": 1, "value1": 0, "value2": 0},
    {"code": 33, "dataId": 2, "value1": 0, "value2": 0},
    {"code": 33, "dataId": 3, "value1": 0, "value2": 0},
    {"code": 33, "dataId": 4, "value1": 0, "value2": 0},
    {"code": 33, "dataId": 5, "value1": 0, "value2": 0},
    {"code": 33, "dataId": 6, "value1": 0, "value2": 0},
    {"code": 33, "dataId": 7, "value1": 0, "value2": 0}
  ]
}
```

---

### Tabela de Referência Rápida - JS Hooks em Skills

| Hook | Plugin | Quando Executa | Variáveis |
|------|--------|----------------|-----------|
| `<JS Pre-Damage Start>` | Battle Core | Antes de calcular dano | user, target, this |
| `<JS Post-Damage End>` | Battle Core | Depois de aplicar dano | user, target, this |
| `<JS Before Eval>` | Battle Core | Antes de eval fórmula | user, target, this |
| `<JS After Eval>` | Battle Core | Depois de eval fórmula | user, target, this |
| `<JS On Use>` | Skills & States | Ao usar skill | user, skill |

---

## CONCLUSÃO

Este guia foi validado contra o código fonte do RPG Maker MZ v1.8.0. Todos os snippets de código foram extraídos de `frontend/js/rmmz_objects.js` e `frontend/js/rmmz_managers.js`.

A seção VisuStella foi baseada na documentação oficial do plugin VisuStella Skills & States Core.

Para criar/modificar skills com segurança:

1. **Use templates** como ponto de partida
2. **Valide todos os IDs** referenciados (element, state, animation, etc.)
3. **Teste a fórmula de dano** antes de aplicar
4. **Verifique a compatibilidade** de scope/hitType/damage type
5. **Consulte este guia** para entender o impacto de cada campo
6. **Se usando VisuStella:** Consulte a seção de funcionalidades adicionais

**Changelog v1.1:**
- Adicionada seção completa sobre VisuStella Skills & States Core
- Documentados 17+ notetags específicos para skills
- Adicionados exemplos de uso para cada funcionalidade
- Adicionados avisos sobre comportamentos específicos do VisuStella

**Changelog v1.2:**
- Adicionada seção completa de JavaScript Hooks para Skills
- Documentados 5 hooks principais com exemplos práticos
- Cross-reference com States guide para hooks adicionais
- Exemplos de skills com lógica condicional complexa
- Tabela de referência rápida de JS hooks

---

**Última atualização:** 2026-03-18
**Versão:** 1.1 (VisuStella adicionado)
**Validado por:** Edney
