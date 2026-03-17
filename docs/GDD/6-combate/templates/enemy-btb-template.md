# Template de Inimigo BTB - RPG Maker MZ
## Battle System - BTB VisuStella MZ

**Versão do Template:** 1.0
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

## 9. EXEMPLO COMPLETO DE INIMIGO

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

## 10. REFERÊNCIA RÁPIDA DE NOTETAGS

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

## 11. PADRÕES DE PRODUÇÃO

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

## 12. CHECKLIST DE VALIDAÇÃO

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

## 13. DICA DE BALANCEAMENTO

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

## FIM DO TEMPLATE

**Documentação Oficial:** https://www.yanfly.moe/wiki/Battle_System_-_BTB_VisuStella_MZ

**Plugin Requerido:** VisuStella MZ - Battle System BTB

**Contato para dúvidas:** Entre em contato com o time de desenvolvimento
