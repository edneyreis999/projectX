# Parâmetros - Fórmulas de TP - Enhanced TP System

Fórmulas que determinam quanto TP é ganho em várias situações.

## Variáveis Disponíveis

Todas as fórmulas têm acesso a:
- `user` - Battler ganhando TP
- `value` - Valor do dano/cura (quando aplicável)
- Funções JavaScript padrão

## Seção: Generic

Fórmulas básicas de situações comuns.

---

### Initial TP

**Função:** TP ganho no **início da batalha**.

**Momento:** Antes do primeiro turn.

**Variáveis:** `user` disponível

**Exemplos:**
- `0` → Sempre começa com 0
- `user.maxTp() * 0.1` → 10% do MaxTP
- `Math.randomInt(20)` → Random 0-19

**Notas:**
- Funciona mesmo com Preserve TP = false
- Veja [Mudanças no Core](../conceitos/mudancas-core.md#initial-tp-gain-in-battle-reworked)

---

### Critical Hit

**Função:** TP ganho ao **landing a critical hit**.

**Momento:** Quando attack/skill causa critical.

**Variáveis:** `user`, `target`

**Exemplos:**
- `10` → Ganha 10 TP
- `value / 10` → 10% do dano

---

### Evasion

**Função:** TP ganho ao **evadir uma ação**.

**Momento:** Quando action é evadida.

**Variáveis:** `user`

**Exemplos:**
- `5` → Ganha 5 TP por evasion

---

### Use Item

**Função:** TP ganho ao **usar item em batalha**.

**Momento:** Quando item é consumido.

**Variáveis:** `user`, `item`

**Exemplos:**
- `3` → Ganha 3 TP por item

---

### Use Skill

**Função:** TP ganho ao **usar skill (não Attack/Guard)**.

**Momento:** Quando skill é usada.

**Variáveis:** `user`, `skill`

**Exemplos:**
- `5` → Ganha 5 TP por skill
- `skill.tpCost * 0.5` → Metade do custo recuperado

---

## Seção: During Regen

Fórmulas executadas durante regeneração de turno.

---

### TP Regen

**Função:** TP ganho **cada turn**.

**Momento:** Regeneration phase.

**Variáveis:** `user`

**Exemplos:**
- `2` → Ganha 2 TP por turn
- `user.maxTp() * 0.05` → 5% do MaxTP

---

### Critical HP

**Função:** TP extra quando HP é **crítico (≤25%)**.

**Momento:** Durante regen.

**Variáveis:** `user`

**Exemplos:**
- `5` → +5 TP se HP ≤ 25%
- `user.hp < user.mhp * 0.25 ? 10 : 0` → 10 TP se crítico

---

### Full HP

**Função:** TP extra quando HP está **cheio**.

**Momento:** Durante regen.

**Variáveis:** `user`

**Exemplos:**
- `3` → +3 TP se HP cheio

---

### Critical MP

**Função:** TP extra quando MP é **crítico (≤25%)**.

**Momento:** Durante regen.

**Variáveis:** `user`

**Exemplos:**
- `4` → +4 TP se MP ≤ 25%

---

### Full MP

**Função:** TP extra quando MP está **cheio**.

**Momento:** Durante regen.

**Variáveis:** `user`

**Exemplos:**
- `2` → +2 TP se MP cheio

---

### Only Member

**Função:** TP extra quando **último membro vivo**.

**Momento:** Durante regen.

**Variáveis:** `user`

**Exemplos:**
- `10` → +10 TP se solo

---

## Seção: HP Damage

Fórmulas relacionadas a dano de HP.

**Variável especial:** `value` = dano recebido/causado

---

### Take HP Damage

**Função:** TP ao **receber dano de HP**.

**Variáveis:** `user`, `value`

**Exemplos:**
- `value / 10` → 10% do dano em TP
- `Math.max(1, value / 20)` → Mínimo 1 TP

---

### Deal HP Damage

**Função:** TP ao **causar dano de HP**.

**Variáveis:** `user`, `value`

**Exemplos:**
- `value / 15` → 6.67% do dano

---

### Ally HP Damage

**Função:** TP quando **ally recebe dano**.

**Variáveis:** `user`, `value`

**Exemplos:**
- `value / 30` → 3.33% do dano ao ally

---

## Seção: HP Heal

Fórmulas relacionadas a cura de HP.

**Variável especial:** `value` = cura recebida/causada

---

### Take HP Heal

**Função:** TP ao **receber cura de HP**.

**Variáveis:** `user`, `value`

**Exemplos:**
- `value / 20` → 5% da cura em TP

---

### Deal HP Heal

**Função:** TP ao **causar cura de HP**.

**Variáveis:** `user`, `value`

**Exemplos:**
- `value / 25` → 4% da cura em TP

---

### Ally HP Heal

**Função:** TP quando **ally recebe cura**.

**Variáveis:** `user`, `value`

**Exemplos:**
- `value / 30` → 3.33% da cura ao ally

---

## Seção: MP Damage

Fórmulas relacionadas a dano de MP.

**Variável especial:** `value` = dano de MP

---

### Take MP Damage

**Função:** TP ao **receber dano de MP**.

**Variáveis:** `user`, `value`

**Exemplos:**
- `value / 5` → 20% do dano de MP

---

### Deal MP Damage

**Função:** TP ao **causar dano de MP**.

**Variáveis:** `user`, `value`

**Exemplos:**
- `value / 8` → 12.5% do dano

---

### Ally MP Damage

**Função:** TP quando **ally recebe dano de MP**.

**Variáveis:** `user`, `value`

**Exemplos:**
- `value / 10` → 10% do dano

---

## Seção: MP Heal

Fórmulas relacionadas a cura de MP.

**Variável especial:** `value` = cura de MP

---

### Take MP Heal

**Função:** TP ao **receber cura de MP**.

**Variáveis:** `user`, `value`

**Exemplos:**
- `value / 10` → 10% da cura

---

### Deal MP Heal

**Função:** TP ao **causar cura de MP**.

**Variáveis:** `user`, `value`

**Exemplos:**
- `value / 15` → 6.67% da cura

---

### Ally MP Heal

**Função:** TP quando **ally recebe cura de MP**.

**Variáveis:** `user`, `value`

**Exemplos:**
- `value / 20` → 5% da cura

---

## Seção: Buffs

Fórmulas relacionadas a buffs.

**Nota:** Apenas Item/Skill Effects, não código.

---

### Deal Ally Buff

**Função:** TP ao **dar buff em ally**.

**Variáveis:** `user`

**Exemplos:**
- `2` → 2 TP por buff

---

### Deal Enemy Buff

**Função:** TP ao **dar buff em enemy**.

**Variáveis:** `user`

**Exemplos:**
- `1` → 1 TP por buff (estranho, mas possível)

---

### Gain Ally Buff

**Função:** TP ao **receber buff de ally**.

**Variáveis:** `user`

**Exemplos:**
- `3` → 3 TP por buff recebido

---

### Gain Enemy Buff

**Função:** TP ao **receber buff de enemy**.

**Variáveis:** `user`

**Exemplos:**
- `0` → Sem TP (normalmente)

---

## Seção: Debuffs

Fórmulas relacionadas a debuffs.

---

### Deal Ally Debuff

**Função:** TP ao **dar debuff em ally**.

**Variáveis:** `user`

**Exemplos:**
- `1` → 1 TP (táticas sujas...)

---

### Deal Enemy Debuff

**Função:** TP ao **dar debuff em enemy**.

**Variáveis:** `user`

**Exemplos:**
- `4` → 4 TP por debuff

---

### Gain Ally Debuff

**Função:** TP ao **receber debuff de ally**.

**Variáveis:** `user`

**Exemplos:**
- `0` → Sem TP

---

### Gain Enemy Debuff

**Função:** TP ao **receber debuff de enemy**.

**Variáveis:** `user`

**Exemplos:**
- `2` → 2 TP por debuff

---

## Seção: States

Fórmulas relacionadas a states.

---

### Deal Ally State

**Função:** TP ao **aplicar state em ally**.

**Variáveis:** `user`

**Exemplos:**
- `0` → Normalmente 0

---

### Deal Enemy State

**Função:** TP ao **aplicar state em enemy**.

**Variáveis:** `user`

**Exemplos:**
- `5` → 5 TP por state

---

### Gain Ally State

**Função:** TP ao **receber state de ally**.

**Variáveis:** `user`

**Exemplos:**
- `0` → Sem TP

---

### Gain Enemy State

**Função:** TP ao **receber state de enemy**.

**Variáveis:** `user`

**Exemplos:**
- `3` → 3 TP por state recebido

---

## Seção: Death

Fórmulas relacionadas a morte.

---

### Ally Death

**Função:** TP quando **ally morre**.

**Variáveis:** `user`

**Notas:**
- Não importa quem matou
- Todos os allies vivos ganham TP

**Exemplos:**
- `10` → 10 TP quando ally morre

---

### Enemy Death

**Função:** TP quando **enemy morre**.

**Variáveis:** `user`

**Notas:**
- Não importa quem matou
- Todos os battlers vivos ganham TP

**Exemplos:**
- `5` → 5 TP por enemy morto

---

## Seção: Battle

Fórmulas de fim de batalha.

---

### Win Battle

**Função:** TP ao **vencer batalha**.

**Variáveis:** `user`

**Exemplos:**
- `20` → 20 TP ao vencer

---

### Flee Battle

**Função:** TP ao **fugir da batalha**.

**Variáveis:** `user`

**Exemplos:**
- `0` → Sem TP ao fugir (normal)

---

### Lose Battle

**Função:** TP ao **perder a batalha**.

**Variáveis:** `user`

**Exemplos:**
- `0` → Sem TP ao perder (Game Over)

---

## Validação de Fórmulas

**Versão 1.15+:** Fórmulas inválidas retornam 0 e mostram erro no console.

**Erros Comuns:**
- `NaN` - Not a Number
- `undefined` - Variável não existe
- `null` - Valor nulo

**Segurança:** Sempre retorna 0 em caso de erro (não quebra o jogo).

---

## Documentação Relacionada

- [Modos de TP](modos.md) - Estrutura de TP Modes
- [Configuração Geral](configuracao-geral.md) - Defaults
- [Mudanças no Core](../conceitos/mudancas-core.md) - On Damage TP Gain
