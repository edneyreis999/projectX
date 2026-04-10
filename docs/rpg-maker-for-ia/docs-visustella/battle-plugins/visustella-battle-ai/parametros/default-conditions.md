# Parâmetros de Default Conditions

## Visão Geral

Você pode definir certas condições para serem usadas como padrão para todos os skills que não possuem `<All AI Conditions>` e `<Any AI Conditions>`. Se qualquer um desses notetags existir, nenhum destes padrões será usado para esses skills.

Localizado em: **Plugin Parameters > A.I. Default Conditions**

## Enable?

### All Conditions

Criar condições 'ALL' padrão para todos os skills sem notetags de A.I.?

**Opções**: `true` ou `false`

**Valor Padrão**: `false` (OFF)

**Como Funciona**:
- Quando `true`, todos os skills sem notetags específicos herdarão estas condições
- Quando `false`, skills sem notetags não têm condições (sempre usáveis)

---

### Any Conditions

Criar condições 'ANY' padrão para todos os skills sem notetags de A.I.?

**Opções**: `true` ou `false`

**Valor Padrão**: `false` (OFF)

**Como Funciona**:
- Quando `true`, todos os skills sem notetags específicos herdarão estas condições
- Quando `false`, skills sem notetags não têm condições (sempre usáveis)

---

## Categorias de Skills

### HP Damage

Skills que causam dano de HP.

**Parâmetros**:
- **All Conditions**: Condições 'ALL' padrão usadas para skills de dano de HP
- **Any Conditions**: Condições 'ANY' padrão usadas para skills de dano de HP

**Condições Típicas**:
```
HP Damage > 0
Target is Enemy
```

---

### MP Damage

Skills que causam dano de MP.

**Parâmetros**:
- **All Conditions**: Condições 'ALL' padrão
- **Any Conditions**: Condições 'ANY' padrão

**Condições Típicas**:
```
MP Damage > 0
Target is Enemy
```

---

### HP Recover

Skills que recuperam HP.

**Parâmetros**:
- **All Conditions**: Condições 'ALL' padrão
- **Any Conditions**: Condições 'ANY' padrão

**Condições Típicas**:
```
HP Recover > 0
Target is Actor
Target HP% < 1.0
```

---

### MP Recover

Skills que recuperam MP.

**Parâmetros**:
- **All Conditions**: Condições 'ALL' padrão
- **Any Conditions**: Condições 'ANY' padrão

**Condições Típicas**:
```
MP Recover > 0
Target is Actor
Target MP% < 1.0
```

---

### HP Drain

Skills que drenam HP.

**Parâmetros**:
- **All Conditions**: Condições 'ALL' padrão
- **Any Conditions**: Condições 'ANY' padrão

**Condições Típicas**:
```
HP Drain > 0
Target is Enemy
User HP% < 1.0
```

---

### MP Drain

Skills que drenam MP.

**Parâmetros**:
- **All Conditions**: Condições 'ALL' padrão
- **Any Conditions**: Condições 'ANY' padrão

**Condições Típicas**:
```
MP Drain > 0
Target is Enemy
User MP% < 1.0
```

---

### Add State

Skills que adicionam estados.

**Parâmetros**:
- **All Conditions**: Condições 'ALL' padrão usadas para skills relacionados
- **%1 - Valores dinâmicos** (ex: IDs de state)
- **Any Conditions**: Condições 'ANY' padrão usadas para skills relacionados
- **%1 - Valores dinâmicos** (ex: IDs de state)

**Condições Típicas**:
```
Target Not State %1
Target is Enemy
```

**Nota**: %1 é substituído pelo ID do state quando aplicado.

---

### Remove State

Skills que removem estados.

**Parâmetros**:
- **All Conditions**: Condições 'ALL' padrão
- **%1 - Valores dinâmicos** (ex: IDs de state)
- **Any Conditions**: Condições 'ANY' padrão
- **%1 - Valores dinâmicos** (ex: IDs de state)

**Condições Típicas**:
```
Target Has State %1
Target is Actor
```

---

### Add Buff

Skills que adicionam buffs.

**Parâmetros**:
- **All Conditions**: Condições 'ANY' padrão usadas para skills relacionados
- **%1 - Valores dinâmicos** (ex: params)
- **Any Conditions**: Condições 'ALL' padrão usadas para skills relacionados
- **%1 - Valores dinâmicos** (ex: params)

**Condições Típicas**:
```
Target Not %1 Max Buff
Target is Actor
```

**Nota**: Isso permite criar condições genéricas que se aplicam a qualquer parâmetro.

---

### Remove Buff

Skills que removem buffs.

**Parâmetros**:
- **All Conditions**: Condições 'ANY' padrão
- **%1 - Valores dinâmicos** (ex: params)
- **Any Conditions**: Condições 'ALL' padrão
- **%1 - Valores dinâmicos** (ex: params)

**Condições Típicas**:
```
Target Has %1 Buff
Target is Enemy
```

---

### Add Debuff

Skills que adicionam debuffs.

**Parâmetros**:
- **All Conditions**: Condições 'ANY' padrão
- **%1 - Valores dinâmicos** (ex: params)
- **Any Conditions**: Condições 'ALL' padrão
- **%1 - Valores dinâmicos** (ex: params)

**Condições Típicas**:
```
Target Not %1 Max Debuff
Target is Enemy
```

---

### Remove Debuff

Skills que removem debuffs.

**Parâmetros**:
- **All Conditions**: Condições 'ANY' padrão
- **%1 - Valores dinâmicos** (ex: params)
- **Any Conditions**: Condições 'ALL' padrão
- **%1 - Valores dinâmicos** (ex: params)

**Condições Típicas**:
```
Target Has %1 Debuff
Target is Actor
```

---

## Exemplos de Uso

### Exemplo 1: Default Conditions Básicas

```
Enable?
- All Conditions: true
- Any Conditions: false

HP Damage
- All Conditions: Target is Enemy

HP Recover
- All Conditions: Target is Actor, Target HP% < 0.80
```

**Resultado**: Skills de dano só usam em inimigos. Skills de cura só usam em atores com HP < 80%.

---

### Exemplo 2: Default Conditions Inteligentes

```
Enable?
- All Conditions: true
- Any Conditions: false

HP Damage
- All Conditions: Target is Enemy, Target HP% > 0.10

Add State (Poison)
- All Conditions: Target Not State Poison, Target is Enemy

Remove State (Poison)
- All Conditions: Target Has State Poison, Target is Actor
```

**Resultado**: IA mais inteligente que evita desperdício (não ataca alvos morrendo, não envenena já envenenados, etc.).

---

### Exemplo 3: Mixed All/Any

```
Enable?
- All Conditions: true
- Any Conditions: true

HP Recover
- All Conditions: Target is Actor, Target HP% < 0.90
- Any Conditions: Target HP% < 0.50, Target Has State Critical Wounds
```

**Resultado**: Cura se HP < 90% E for ator. Prioriza se HP < 50% OU tem estado crítico.

---

## Boas Práticas

### 1. Seja Conservador

Default conditions devem ser **conservadoras**, não restritivas demais.

```
✅ Bom: Target HP% < 0.80 (cura se HP < 80%)
❌ Ruim: Target HP% < 0.30 (só cura se HP < 30%)
```

### 2. Use All Conditions para Restrições

Use All Conditions para restringir quando um skill pode ser usado.

```
All Conditions: Target is Enemy, Target HP% > 0.10
```

### 3. Use Any Conditions para Priorização

Use Any Conditions para priorizar certas situações.

```
Any Conditions: Target HP% < 0.25, Target Has State Execute
```

### 4. Use %1 para Genéricos

Para Add/Remove State e Buffs/Debuffs, use %1 para criar condições genéricas.

```
All Conditions: Target Not State %1
```

Isso se aplica a qualquer state, tornando as condições reutilizáveis.

### 5. Teste Extensivamente

Default conditions afetam **todos** os skills sem notetags. Teste extensivamente para evitar comportamentos indesejados.

---

## Troubleshooting

### Skills Não Estão Sendo Usados

**Problema**: IA nunca usa certos skills.

**Solução**: Verifique se as default conditions são muito restritivas.

```
❌ Muito restritivo: Target HP% < 0.10, Target MP% < 0.10, Target Has State Critical
✅ Menos restritivo: Target HP% < 0.50
```

### Skills Sempre Sendo Usados

**Problema**: IA sempre usa certos skills, ignorando outros.

**Solução**: Adicione restrições ou use Any Conditions para criar prioridade.

### Condições Não Funcionam

**Problema**: Default conditions não parecem funcionar.

**Solução**: Verifique se:
1. `Enable? > All Conditions` ou `Any Conditions` está `true`
2. Os skills não têm notetags `<All AI Conditions>` ou `<Any AI Conditions>` (notetags individuais sobrescrevem padrões)

## Veja Também

- **[Condições de Skills](../notetags/condicoes-skills.md)** - Notetags individuais
- **[Configuração Geral](configuracao-geral.md)** - Parâmetros globais
