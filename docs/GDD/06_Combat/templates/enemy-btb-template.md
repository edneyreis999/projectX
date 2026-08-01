# Template de Inimigo BTB - RPG Maker MZ
## Battle System - BTB VisuStella MZ

**Versão do Template:** 2.0
**Compatível com:** VisuStella MZ - Battle System BTB
**Status:** Pronto para Produção

---

## INTRODUÇÃO

Este template contém **APENAS** campos implementáveis via notetags do plugin BTB_VisuStella_MZ, sem requerer plugins adicionais ou scripting customizado.

---

## 1. METADADOS DE DESIGN (não afeta o BTB)

> **NOTA:** Esta seção contém informações úteis para documentação e organização, mas **NÃO** são configuráveis via notetags do plugin BTB.

| Campo | Descrição | Exemplo |
|-------|-----------|---------|
| **Nome** | Nome do inimigo | Lobo Alpha de Gelo |
| **ID** | ID único no database Enemies | 6 |
| **Região** | Localização no jogo | Minas de Kravens |
| **Tier** | Common \| Elite \| Boss | Elite |
| **Família** | Feras \| Arcanos \| Construtos \| Sombras | Feras |

---

## 2. PARÂMETROS BTB DO INIMIGO

Todos estes campos usam notetags na seção **Note** do inimigo no database Enemies.

### BP (Brave Points) - Configuração Básica

| Campo | Notetag | Descrição | Valores Possíveis |
|-------|---------|-----------|-------------------|
| **BP Inicial** | `<BTB Initial BP: ±x>` | BP no início do combate | -3 a +3 (padrão: 0) |
| **BP Máximo** | `<BTB Maximum BP: ±x>` | **Aumenta** o limite máximo de BP | +1, +2, +3... |
| **BP Mínimo** | `<BTB Minimum BP: ±x>` | **Diminui** o limite mínimo de BP | -1, -2, -3... |
| **BP Regen** | `<BTB BP Regen: +x>` | BP **ganho** por turno | Positivo (ex: +1, +2) |
| **BP Degen** | `<BTB BP Degen: -x>` | BP **perdido** por turno | Negativo (ex: -1, -2) |

### Máximo de Ações

| Campo | Notetag | Descrição | Valores Possíveis |
|-------|---------|-----------|-------------------|
| **Maximum Actions** | `<BTB Maximum Actions: ±x>` | **Aumenta** o máximo de ações via Brave | +1, +2, +3... |

### Exemplo de Note no Database Enemies:

```
<BTB Initial BP: +1>
<BTB Maximum BP: +1>
<BTB Minimum BP: -1>
<BTB BP Regen: +1>
<BTB Maximum Actions: +1>
```

---

## 3. RESTRIÇÕES BTB

Controla quais mecânicas BTB o inimigo pode usar.

| Campo | Notetag | Onde usar | Efeito |
|-------|---------|-----------|--------|
| **Cannot Brave** | `<BTB Cannot Brave>` | Enemy ou State | Inimigo NÃO pode usar comando Brave |
| **Cannot Fusion** | `<BTB Cannot Fusion>` | Enemy ou State | Inimigo NÃO pode executar Action Fusions |
| **Enable Fusion** | `<BTB Enable Fusion>` | Enemy ou State | Inimigo PODE executar Action Fusions (sobrescreve Cannot) |
| **Hide Brave** | `<BTB Hide Brave>` | Enemy ou State | Esconde comando Brave e valor de BP |

### Exemplo de Uso em Enemy:
```
<BTB Cannot Brave>
<BTB Cannot Fusion>
```

### Exemplo de Uso em State:
```
<BTB Cannot Brave>
```
> Quando o inimigo recebe este State, perde acesso ao Brave temporariamente.

---

## 4. APARÊNCIA NA FILA DE TURNOS

Controla como o inimigo aparece no Turn Order Display.

| Campo | Notetag | Descrição | Exemplo |
|-------|---------|-----------|---------|
| **Turn Order Icon** | `<BTB Turn Order Icon: x>` | Ícone na fila de turnos (número do ícone) | `<BTB Turn Order Icon: 123>` |
| **Turn Order Face** | `<BTB Turn Order Face: filename, index>` | Face customizada na fila | `<BTB Turn Order Face: Monster, 0>` |

**IMPORTANTE:** O índice da face começa em **0**, não 1.

### Exemplo de Uso:
```
<BTB Turn Order Icon: 64>
<BTB Turn Order Face: WolfFace, 0>
```

---

## 5. SKILLS COM CUSTO BP

Configure o custo de BP de cada skill na seção **Note** da skill no database Skills.

### Notetags de Custo de BP

| Campo | Notetag | Descrição |
|-------|---------|-----------|
| **BP Cost** | `<BTB BP Cost: x>` | Custo de BP para usar a skill (valor positivo) |
| **Hide BP Cost** | `<BTB Hide BP Cost>` | Esconde o custo de BP da skill |

### Notetags de Manipulação de BP (Efeito da Skill)

> **ATENÇÃO:** Semântica de sinais padronizada conforme documentação oficial:
> - **Gain:** Valor **positivo** para ganhar BP
> - **Lose:** Valor **positivo** para perder BP (o plugin aplica o sinal)

| Campo | Notetag | Descrição |
|-------|---------|-----------|
| **User Set BP** | `<BTB User Set BP: x>` | Define BP do usuário para valor exato X |
| **Target Set BP** | `<BTB Target Set BP: x>` | Define BP do alvo para valor exato X |
| **User Gain BP** | `<BTB User Gain BP: +x>` | Usuário ganha X BP (valor positivo) |
| **User Lose BP** | `<BTB User Lose BP: +x>` | Usuário perde X BP (valor positivo) |
| **Target Gain BP** | `<BTB Target Gain BP: +x>` | Alvo ganha X BP (valor positivo) |
| **Target Lose BP** | `<BTB Target Lose BP: +x>` | Alvo perde X BP (valor positivo) |

### Exemplo de Skill com Custo BP:

```
<BTB BP Cost: 1>
<BTB Target Lose BP: 1>
```

Esta skill custa 1 BP para usar e **remove** 1 BP do alvo.

---

## 6. ACTION FUSIONS PARA INIMIGOS

Action Fusions são combinações de skills que criam uma nova skill mais poderosa. Os inimigos podem usá-las!

### Tipos de Fusion

| Tipo | Notetag | Descrição |
|------|---------|-----------|
| **Flexible** | `<BTB Flexible Fusion: skill1, skill2>` | Combina em qualquer ordem |
| **Strict** | `<BTB Strict Fusion: skill1, skill2, skill3>` | Combina **apenas** na ordem exata |

### Como Funciona para Inimigos:

1. **Crie uma dummy skill** que representa a Fusion (a skill que será executada)
2. **Adicione as notetags de Fusion** nessa dummy skill
3. **Crie uma skill de sequência** com `<BTB Multiple Actions>` para o inimigo
4. Quando o inimigo executar a sequência, o plugin **substituirá** pela Fusion automaticamente

### Exemplo de Action Fusion para Inimigo:

```
Skill: "Fire Strike" (ID 50)
Note:
<BTB Flexible Fusion: Attack, Fire>

Skill: "Enemy Fire Combo" (ID 51, usada pelo inimigo)
Note:
<BTB Multiple Actions: 1, 50>
```

> **Resultado:** Ao usar "Enemy Fire Combo", se as actions Attack e Fire forem enfileiradas, o plugin substituirá pela skill "Fire Strike".

### Exemplo de Strict Fusion:

```
Skill: "Shadow Flare Blade" (ID 60)
Note:
<BTB Strict Fusion: Shade II, Fire II, Attack>

Skill: "Boss Ultimate Attack" (ID 61, usada pelo chefe)
Note:
<BTB Multiple Actions: 45, 46, 1>
```

> **Resultado:** A Strict Fusion SÓ funcionará se a ordem for exatamente: Shade II (ID 45) → Fire II (ID 46) → Attack (ID 1).

### Múltiplas Combinações:

Uma Fusion pode ter múltiplas combinações possíveis:

```
Skill: "Flame Strike" (ID 55)
Note:
<BTB Flexible Fusion: Attack, Flame>
<BTB Flexible Fusion: Strike, Flame>
```

---

## 7. SEQUÊNCIAS DE MÚLTIPLAS AÇÕES

Permite que inimigos executem múltiplas ações em um único turno (simulando Brave).

### Notetag

| Notetag | Descrição |
|---------|-----------|
| `<BTB Multiple Actions: id, id, id>` | Executa skills por **ID** (RECOMENDADO) |
| `<BTB Multiple Actions: name, name>` | Executa skills por **nome** (NÃO recomendado) |

### Regras de Ouro:

1. ✅ **SEMpre use IDs** em produção (nomes podem mudar)
2. ⚠️ **SOMENTE para inimigos** (não funciona para actors)
3. 💎 **Cada ação consome 1 BP** do inimigo
4. 🚨 **Sem BP suficiente** = inimigo ficará vulnerável com BP negativo

### Exemplos:

```
Skill: "Double Attack"
Note:
<BTB Multiple Actions: 1, 1>

Skill: "Triple Strike"
Note:
<BTB Multiple Actions: 25, 26, 27>
```

### Uso Tático por Tier:

| Tier | Número de Ações | Risco |
|------|-----------------|------|
| Common | 2 ações | Baixo |
| Elite | 3-4 ações | Médio |
| Boss | 4-6 ações | Alto |

> **DICA:** Inimigos ficam vulneráveis após usar múltiplas ações (BP negativo). Use estrategicamente para criar janelas de oportunidade para o jogador.

---

## 8. HELP DESCRIPTION ESPECÍFICO BTB

Permite descrições diferentes de skills quando em BTB vs outros sistemas de batalha.

### Notetag

```
<BTB Help>
Descrição específica para BTB
Pode ter múltiplas linhas
</BTB Help>
```

### Exemplo:

```
<BTB Help>
Custa 1 BP. Este ataque
ignora 50% da defesa.
</BTB Help>
```

---

## 9. CONFIGURAÇÃO DE ACTIONS DA IA

A configuração de actions define como a IA do inimigo escolhe qual skill usar. Isso é feito na seção "Actions" do inimigo no database Enemies.

### Estrutura de uma Action

```json
{
  "skillId": 1,
  "rating": 5,
  "conditionType": 0,
  "conditionParam1": 0,
  "conditionParam2": 0
}
```

| Campo | Descrição | Valores Possíveis |
|-------|-----------|-------------------|
| **skillId** | ID da skill a ser usada | Qualquer ID de skill válido |
| **rating** | Peso de probabilidade (1-10) | Maior = mais chance de ser escolhida |
| **conditionType** | Tipo de condição | Ver tabela abaixo |
| **conditionParam1** | Parâmetro 1 da condição | Depende do conditionType |
| **conditionParam2** | Parâmetro 2 da condição | Threshold ou valor limite |

### Tipos de Condição (conditionType)

| Type | Nome | Descrição | Param1 | Param2 |
|------|------|-----------|--------|---------|
| **0** | Always | Sempre disponível | - | - |
| **1** | Turn | No turno X | Número do turno | - |
| **2** | Variable | Quando variável X | ID da variável | Valor threshold (0.0-1.0 = %) |
| **3** | State | Quando afetado por state | ID do state | - |
| **4** | Party Level | Quando nível da party | Nível mínimo | - |
| **5** | HP | Quando HP % | - | Threshold (0.0-1.0) |

### Sistema de Rating

O rating funciona como peso de probabilidade. Maior rating = maior chance da skill ser escolhida.

| Rating | Probabilidade | Uso Recomendado |
|--------|---------------|-----------------|
| 1-2 | Muito Baixa | Skills de contingência, debuffs fracos |
| 3-4 | Baixa | Skills secundárias, buffs situacionais |
| 5-6 | Média | Skills padrão do rotation |
| 7-8 | Alta | Skills principais do kit |
| 9-10 | Muito Alta | Skills de abertura, ultimate |

### Exemplos de Configuração

```
Action 1: Ataque padrão (sempre disponível, baixa prioridade)
{
  "skillId": 1,           // Attack
  "rating": 3,            // Média prioridade
  "conditionType": 0      // Always
}

Action 2: Buff de abertura (só no turno 1, máxima prioridade)
{
  "skillId": 15,          // Enfurecer
  "rating": 10,           // Máxima prioridade
  "conditionType": 1,     // Turn
  "conditionParam1": 1    // Turno 1
}

Action 3: Ultimate quando HP baixo
{
  "skillId": 20,          // Investida Devastadora
  "rating": 9,            // Muito alta prioridade
  "conditionType": 2,     // Variable
  "conditionParam1": 0,   // Variable 0 (HP do boss)
  "conditionParam2": 0.5  // Quando HP ≤ 50%
}

Action 4: Counter-attack quando atordoado
{
  "skillId": 25,          // Atordoamento
  "rating": 8,            // Alta prioridade
  "conditionType": 3,     // State
  "conditionParam1": 13   // State ID 13 (Atordoamento)
}

Action 5: AOE só em party level alto
{
  "skillId": 30,          // Sussurro Cristalino
  "rating": 4,            // Baixa prioridade
  "conditionType": 4,     // Party Level
  "conditionParam1": 51   // Quando party level ≥ 51
}
```

---

## 10. CONDIÇÕES JAVASCRIPT EM SKILLS

Skills podem ter condições customizadas via JavaScript, permitindo lógica complexa baseada em states, HP, BP, etc.

### Notetag <JS Skill Enable>

```
<JS Skill Enable>
  enabled = user.isStateAffected(7) && user.isStateAffected(51);
</JS Skill Enable>
```

### Variáveis Disponíveis

| Variável | Descrição |
|----------|-----------|
| `user` | O battler que está usando a skill (inimigo) |
| `target` | O alvo da skill (pode ser array em AOE) |
| `a` | Alias para `user` |
| `b` | Alias para `target` |

### Métodos Úteis

```javascript
// Verificar se afetado por state
user.isStateAffected(stateId)

// Verificar HP
user.hp < user.mhp * 0.5  // HP < 50%
user.hpRate() < 0.5       // Mesmo que acima

// Verificar MP/TP
user.mp > 100
user.tp >= 50

// Verificar BP (se plugin BTB ativo)
user._bp >= 3

// Verificar turnos de state
user.stateTurns(stateId) >= 2

// Verificar se está morto
user.isDead()

// Verificar se pode mover
user.canMove()
```

### Exemplos Práticos

```
// Skill só disponível quando enfurecido E camuflado
<JS Skill Enable>
  enabled = user.isStateAffected(7) && user.isStateAffected(51);
</JS Skill Enable>

// Skill só quando HP ≤ 30% E tem BP suficiente
<JS Skill Enable>
  enabled = user.hpRate() <= 0.3 && user._bp >= 3;
</JS Skill Enable>

// Skill de desespero: só quando HP ≤ 10%
<JS Skill Enable>
  enabled = user.hpRate() <= 0.1;
</JS Skill Enable>

// Counter-skill: só quando atordoado
<JS Skill Enable>
  enabled = user.isStateAffected(13);
</JS Skill Enable>
```

---

## 11. COMMON EVENTS EM SKILLS

Skills podem invocar Common Events via Effect Code 44, permitindo lógica complexa que não é possível apenas com efeitos padrão.

### Effect Code 44 - Common Event

```
Effects array:
  - Code: 44 (Common Event)
    Data ID: 21 (ID do Common Event)
    Value 1: 0
    Value 2: 0
```

### Para Usar Common Events em Skills:

1. **Crie o Common Event** no database (tab Common Events)
2. **Adicione o Effect Code 44** na skill
3. **Configure o Data ID** para o ID do Common Event

### Padrões de Uso

#### Padrão 1: Remover States (Vulnerabilidade)

```
Skill: "Investida Devastadora" (ID 14)
Effects:
  - Code: 44 (Common Event)
    Data ID: 21

Common Event 21: "Investida Devastadora"
  1. Remove State 51 (Camuflagem) do usuário
  2. Remove State 13 (Atordoamento) do usuário
```

**Resultado:** Boss perde evasão após usar a skill, ficando vulnerável.

#### Padrão 2: Aplicar Múltiplos States

```
Skill: "Magma Aura" (ID 25)
Effects:
  - Code: 21 (Add State)
    Data ID: 30 (Burn)
  - Code: 44 (Common Event)
    Data ID: 25

Common Event 25: "Magma Aura Extra"
  1. Apply State 31 (Defense Down) to all enemies
  2. Apply State 32 (Magic Down) to all enemies
```

#### Padrão 3: Manipular Variáveis

```
Skill: "Berserk" (ID 30)
Effects:
  - Code: 44 (Common Event)
    Data ID: 30

Common Event 30: "Berserk Logic"
  1. Set Variable [Boss Rage] += 1
  2. If Variable [Boss Rage] >= 3:
     - Apply State 99 (Enrage) to user
     - Show Message: "BOSS ENTRA EM FÚRIA ABSOLUTA!"
```

### Comandos Úteis do Common Event

| Comando | Code | Parâmetros | Uso |
|---------|------|------------|-----|
| **Remove State** | 333 | `[-1, slot, stateId]` | Remove state do usuário |
| **Apply State** | 322 | `[-1, stateId]` | Aplica state no usuário |
| **Set Variable** | 121 | `[variableId, value]` | Define variável |
| **Show Message** | 101 | `-` | Exibe mensagem |
| **Play SE** | 122 | `[filename]` | Toca som |

### Parâmetros do Remove State (Code 333)

```
[-1, slot, stateId]
```

| Parâmetro | Descrição |
|-----------|-----------|
| **-1** | Target = usuário da skill |
| **slot** | 0 ou 1 (não usado para enemies) |
| **stateId** | ID do state a remover |

---

## 12. PADRÃO DE VULNERABILIDADE

Um padrão comum em bosses BTB é criar janelas de vulnerabilidade usando a interação Skill → Common Event → State.

### Fluxo Completo:

```
┌─────────────────────────────────────────────────────────────┐
│              CICLO DE VULNERABILIDADE                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. BOSS USA BUFF                                           │
│     └─> Skill A aplica State X (Buff/Proteção)             │
│                                                             │
│  2. PERÍODO DE SEGURANÇA                                    │
│     └─> State X ativo: boss tem vantagens                  │
│                                                             │
│  3. BOSS USA ULTIMATE                                       │
│     └─> Skill B invoca Common Event Y                      │
│                                                             │
│  4. COMMON EVENT REMOVE STATE X                            │
│     └─> Boss perde buff/proteção                           │
│                                                             │
│  5. JANELA DE VULNERABILIDADE ⚡                            │
│     └─> Boss sem buff, recebe mais dano                    │
│         JOGADOR DEVE ATACAR AGORA!                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Implementação Exemplo:

```
State 51: Camuflagem
- Evasion: +70%
- Priority: 90

Skill 12: Camuflagem de Kraven
- Effect: Apply State 51 (100%)
- BP Cost: 1

Skill 14: Investida Devastadora
- Effect: Call Common Event 21
- JS Enable: user.isStateAffected(7) && user.isStateAffected(51)
- BP Cost: 1
- Damage: (ATK * 4) + 200

Common Event 21:
- Remove State 51 (Camuflagem) do usuário
- Remove State 13 (Atordoamento) do usuário

Resultado:
1. Boss usa Camuflagem → State 51 ativo (EVA +70%)
2. Boss usa Investida Devastadora → Common Event 21 remove State 51
3. Boss fica vulnerável (EVA 0%, State 7 ainda ativo com DEF -30%)
4. Jogador deve atacar nesta janela!
```

---

## 13. EXEMPLO COMPLETO DE INIMIGO

### Inimigo: "Lobo Alpha de Gelo" (Elite)

#### No Database Enemies (Note do inimigo):

```
<BTB Initial BP: 0>
<BTB Maximum BP: +1>
<BTB Minimum BP: -2>
<BTB BP Regen: +1>
<BTB Turn Order Icon: 64>
<BTB Turn Order Face: WolfFace, 0>
```

#### Skills Configuradas:

**Skill: "Investida Congelante" (ID 15)**
```
Damage Formula: a.atk * 1.5
Note:
<BTB BP Cost: 0>
```

**Skill: "Fúria do Alpha" (ID 16 - Fusion)**
```
Damage Formula: a.atk * 2.5
Scope: All Enemies
Note:
<BTB BP Cost: 2>
<BTB Flexible Fusion: 1, 1, 1>
```

**Skill: "Triple Attack Sequence" (ID 17 - usada pela AI)**
```
Note:
<BTB Multiple Actions: 1, 1, 1>
```

#### Configuração da AI (Action Patterns):

| Action | Condition | Rating |
|--------|-----------|--------|
| Attack | Always | 5 |
| Investida Congelante (ID 15) | HP < 70% | 4 |
| Triple Attack Sequence (ID 17) | HP < 50% | 3 |

**Resultado esperado:**
- Inimigo começa com 0 BP
- Pode acumular até +1 BP além do padrão (usando Guard)
- Quando HP < 50%, usa Triple Attack Sequence
- Se estiver com BP suficiente, pode executar Fúria do Alpha via Fusion

---

## 14. REFERÊNCIA RÁPIDA DE NOTETAGS

### Para Inimigos (Enemy Note):

```
<BTB Initial BP: ±x>
<BTB Maximum BP: +x>
<BTB Minimum BP: -x>
<BTB BP Regen: +x>
<BTB BP Degen: -x>
<BTB Maximum Actions: +x>
<BTB Cannot Brave>
<BTB Cannot Fusion>
<BTB Enable Fusion>
<BTB Hide Brave>
<BTB Turn Order Icon: x>
<BTB Turn Order Face: filename, index>
```

### Para Skills (Skill Note):

```
<BTB BP Cost: x>
<BTB Hide BP Cost>
<BTB User Set BP: x>
<BTB Target Set BP: x>
<BTB User Gain BP: +x>
<BTB User Lose BP: +x>
<BTB Target Gain BP: +x>
<BTB Target Lose BP: +x>
<BTB Help>Descrição BTB</BTB Help>
<BTB Flexible Fusion: id, id>
<BTB Strict Fusion: id, id, id>
<BTB Multiple Actions: id, id, id>
```

### Para States (State Note):

```
<BTB Initial BP: ±x>
<BTB Maximum BP: +x>
<BTB Minimum BP: -x>
<BTB BP Regen: +x>
<BTB Maximum Actions: +x>
<BTB Cannot Brave>
<BTB Cannot Fusion>
<BTB Enable Fusion>
<BTB Hide Brave>
```

### Para Items (Item Note):

```
<BTB BP Cost: x>
<BTB Hide BP Cost>
<BTB User Set BP: x>
<BTB Target Set BP: x>
<BTB User Gain BP: +x>
<BTB User Lose BP: +x>
<BTB Target Gain BP: +x>
<BTB Target Lose BP: +x>
<BTB Help>Descrição BTB</BTB Help>
<BTB Flexible Fusion: id, id>
<BTB Strict Fusion: id, id, id>
```

---

## 15. PADRÕES DE PRODUÇÃO

### Regras Obrigatórias:

1. ✅ **SEMpre usar IDs** em `<BTB Multiple Actions>` e Fusions
2. ✅ IDs são mais seguros que nomes (evita bugs por renomeação)
3. ✅ Valores de Lose BP são sempre **positivos** (o plugin aplica o sinal)

### Convenção de Nomenclatura:

| Tipo de Skill | Prefixo | Exemplo |
|---------------|---------|---------|
| Sequência de ações | `[SEQ]` | `[SEQ] Triple Strike` |
| Fusion trigger | `[FUS]` | `[FUS] Fire Strike Trigger` |
| Skill de inimigo | `[ENEMY]` | `[ENEMY] Boss Ultimate` |

### Onde Colocar Cada Notetag:

| Notetag | Enemy Note | Skill Note | State Note | Item Note |
|---------|------------|------------|------------|------------|
| BP Initial/Max/Min/Regen | ✅ | ❌ | ✅ | ❌ |
| BP Cost | ❌ | ✅ | ❌ | ✅ |
| Multiple Actions | ❌ | ✅ (inimigos) | ❌ | ❌ |
| Fusions | ❌ | ✅ | ❌ | ✅ |
| Cannot Brave/Fusion | ✅ | ❌ | ✅ | ❌ |
| Turn Order Icon/Face | ✅ | ❌ | ❌ | ❌ |

---

## 16. CHECKLIST DE VALIDAÇÃO

Ao criar um inimigo BTB, verificar:

- [ ] **Versão do template** está atualizada
- [ ] BP Inicial definido (ou assume padrão do sistema)
- [ ] BP Máximo/Mínimo configurados corretamente (valores positivos aumentam máximo, negativos diminuem mínimo)
- [ ] Skills têm custo de BP configurado
- [ ] Skills com manipulação de BP usam valores **positivos** para Lose
- [ ] Múltiplas ações **usam IDs** (nunca nomes)
- [ ] Action Fusions têm combinações definidas por **ID**
- [ ] Turn Order icon/face configurado (se desejado)
- [ ] Restrições BTB aplicadas (se necessário)
- [ ] **Testado em batalha** para verificar BP behavior

---

## 17. DICA DE BALANCEAMENTO

### Custos de BP Recomendados por Tier:

| Tier | Custo Máximo de Skill | Múltiplas Ações |
|------|----------------------|-----------------|
| Common | 0-1 BP | 2 ações |
| Elite | 1-2 BP | 3-4 ações |
| Boss | 2-3 BP | 4-6 ações |

### Exemplo de Balanceamento:

```
Common (Lobo Jovem):
- BP Inicial: 0
- Skills: 0-1 BP de custo
- Máximo ações: 2

Elite (Lobo Alpha):
- BP Inicial: +1
- Skills: 1-2 BP de custo
- Máximo ações: 4

Boss (Lobo Ancião):
- BP Inicial: +2
- Skills: 2-3 BP de custo
- Máximo ações: 6
- BP Regen: +2
```

---

## 18. OBSERVAÇÕES SOBRE STATES

### Campo message4

O campo `message4` de um State é exibido quando o state é removido. Este campo pode conter:

- **Mensagem de remoção:** "%1 recuperou-se!" ou "%1 não está mais cego!"
- **Placeholder pendente:** Texto indicando funcionalidade não implementada

**Exemplo de placeholder:**
```
message4: "Aqui precisa colocar o status de vulneravel"
```

Quando encontrar placeholders em states, isso indica:
- Funcionalidade planejada mas não implementada
- Necessidade de revisão por um designer

### Priority de States

O campo `priority` determina qual state é exibido primeiro quando múltiplos states estão ativos. Valores maiores = maior prioridade.

```
State 7: Fúria (Priority: 70)
State 51: Camuflagem (Priority: 90)

Resultado: Camuflagem será exibida primeiro (maior priority)
```

### autoRemovalTiming

| Valor | Nome | Descrição |
|-------|------|-----------|
| 0 | Action End | Remove no final da ação do battler |
| 1 | Turn End | Remove no final do turno do battler |
| 2 | Damage | Remove ao receber dano |

---

## FIM DO TEMPLATE

**Documentação Oficial:** https://www.yanfly.moe/wiki/Battle_System_-_BTB_VisuStella_MZ

**Plugin Requerido:** VisuStella MZ - Battle System BTB

**Contato para dúvidas:** Entre em contato com o time de desenvolvimento
