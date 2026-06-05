# Notetags de TGR Weight

## Visão Geral

TGR (Target Rate) é um parâmetro especial do RPG Maker MZ que representa a taxa de alvo. Quanto maior o TGR de alguém, mais provável que se torne o alvo de um ataque. Estes notetags configuram quanta influência no peso TGR atores e inimigos colocam ao determinar alvos válidos para suas ações.

## Lista de Notetags

### <AI Element Rate Influence: x.x>

**Uso**: Actor, Enemy Notetags

Define quanta influência de peso TGR é dada baseado na taxa element.

**Parâmetros**:
- Substitua `x.x` por um valor numérico representando a taxa de influência

**Exemplos**:
```html
<AI Element Rate Influence: 1.0>
<AI Element Rate Influence: 0.5>
<AI Element Rate Influence: 2.0>
```

**Como Funciona**:
- Se um alvo recebe mais dano de um ataque elemental, o peso TGR aumenta para aquele skill
- Quanto maior o dano elemental recebido, mais o peso TGR aumenta
- Valores maiores = mais influência

---

### <Bypass AI Element Rate Influence>

**Uso**: Actor, Enemy Notetags

Faz com que o ator/inimigo não considere taxas elementais ao calcular pesos TGR para determinar alvos de ações.

**Exemplo**:
```html
<Bypass AI Element Rate Influence>
```

**Uso Típico**:
- Quando você não quer que a IA considere fraquezas elementais
- Para inimigos que atacam aleatoriamente sem considerar elementos

---

### <AI EVA Influence: x.x>

**Uso**: Actor, Enemy Notetags

Define quanta influência de peso TGR é dada baseado na taxa EVA (Evasion - Esquiva Física).

**Parâmetros**:
- Substitua `x.x` por um valor numérico representando a taxa de influência

**Exemplos**:
```html
<AI EVA Influence: 1.0>
<AI EVA Influence: 0.5>
<AI EVA Influence: 2.0>
```

**Como Funciona**:
- Quanto maior a esquiva física do alvo potencial, menor o peso TGR
- Valores maiores = mais influência (mais provável evitar alvos com alta esquiva)
- Aplicável para skills físicas

---

### <Bypass AI EVA Influence>

**Uso**: Actor, Enemy Notetags

Faz com que o ator/inimigo não considere taxas EVA ao calcular pesos TGR.

**Exemplo**:
```html
<Bypass AI EVA Influence>
```

**Uso Típico**:
- Quando você não quer que a IA considere esquiva física
- Para ataques que sempre acertam

---

### <AI MEV Influence: x.x>

**Uso**: Actor, Enemy Notetags

Define quanta influência de peso TGR é dada baseado na taxa MEV (Magic Evasion - Esquiva Mágica).

**Parâmetros**:
- Substitua `x.x` por um valor numérico representando a taxa de influência

**Exemplos**:
```html
<AI MEV Influence: 1.0>
<AI MEV Influence: 0.5>
<AI MEV Influence: 2.0>
```

**Como Funciona**:
- Quanto maior a esquiva mágica do alvo potencial, menor o peso TGR
- Valores maiores = mais influência (mais provável evitar alvos com alta esquiva mágica)
- Aplicável para skills mágicas

---

### <Bypass AI MEV Influence>

**Uso**: Actor, Enemy Notetags

Faz com que o ator/inimigo não considere taxas MEV ao calcular pesos TGR.

**Exemplo**:
```html
<Bypass AI MEV Influence>
```

**Uso Típico**:
- Quando você não quer que a IA considere esquiva mágica
- Para magias que sempre acertam

---

### <AI PDR Influence: x.x>

**Uso**: Actor, Enemy Notetags

Define quanta influência de peso TGR é dada baseado na taxa PDR (Physical Damage Rate).

**Parâmetros**:
- Substitua `x.x` por um valor numérico representando a taxa de influência

**Exemplos**:
```html
<AI PDR Influence: 1.0>
<AI PDR Influence: 0.5>
<AI PDR Influence: 2.0>
```

**Como Funciona**:
- Quanto maior o dano físico recebido, mais o peso TGR aumenta
- Funciona de forma similar à influência elementar
- Aplicável para ataques físicos

---

### <Bypass AI PDR Influence>

**Uso**: Actor, Enemy Notetags

Faz com que o ator/inimigo não considere taxas PDR ao calcular pesos TGR.

**Exemplo**:
```html
<Bypass AI PDR Influence>
```

---

### <AI MDR Influence: x.x>

**Uso**: Actor, Enemy Notetags

Define quanta influência de peso TGR é dada baseado na taxa MDR (Magical Damage Rate).

**Parâmetros**:
- Substitua `x.x` por um valor numérico representando a taxa de influência

**Exemplos**:
```html
<AI MDR Influence: 1.0>
<AI MDR Influence: 0.5>
<AI MDR Influence: 2.0>
```

**Como Funciona**:
- Quanto maior o dano mágico recebido, mais o peso TGR aumenta
- Funciona de forma similar à influência elementar
- Aplicável para ataques mágicos

---

### <Bypass AI MDR Influence>

**Uso**: Actor, Enemy Notetags

Faz com que o ator/inimigo não considere taxas MDR ao calcular pesos TGR.

**Exemplo**:
```html
<Bypass AI MDR Influence>
```

## Sistema de Knowledge

Por padrão, as configurações de Plugin Parameter fazem com que a influência de peso TGR exija que a tropa inimiga tenha "conhecimento" sobre:

### O que é Knowledge?

Inimigos não sabem automaticamente as fraquezas e resistências do grupo. Eles precisam "aprender" através de testes:

- **Element Rates**: A tropa deve acertar atores com ataques elementais para aprender suas fraquezas/resistências
- **Evasion**: A tropa deve usar ataques físicos para aprender a esquiva dos atores
- **Magic Evasion**: A tropa deve usar ataques mágicos para aprender a esquiva mágica dos atores
- **PDR/MDR**: A tropa deve testar para aprender as taxas de dano físico/mágico

### Como Knowledge Funciona

1. **Início da Batalha**: Inimigos não conhecem fraquezas (taxas tratadas como "Unknown Element Rate")
2. **Durante a Batalha**: Inimigos testam diferentes ataques
3. **Aprendizado**: Quando acertam com um elemento, aprendem a taxa elementar
4. **Adaptação**: A IA adapta a seleção de alvos baseado no conhecimento adquirido

### Configurar Unknown Element Rate

Configure em: **Plugin Parameters > A.I. General Settings > Knowledge > Unknown Element Rate**

Isso define como a IA trata taxas elementais desconhecidas:
- `1.0` = Assume neutro (sem fraqueza/resistência)
- `0.5` = Assume resistência (mais cauteloso)
- `1.5` = Assume fraqueza (mais agressivo)

## Exemplos de Uso

### Inimigo Inteligente com Fraquezas Elementais

```html
<AI Element Rate Influence: 1.5>
<AI EVA Influence: 1.0>
<AI MEV Influence: 1.0>
```

Este inimigo:
- Foca muito em fraquezas elementais (1.5x influência)
- Considera esquiva física e mágica
- Aprende e adapta durante a batalha

### Inimigo Bruto (Ignora Defesas)

```html
<Bypass AI EVA Influence>
<Bypass AI MEV Influence>
```

Este inimigo:
- Não considera esquiva física ou mágica
- Ataca sem se importar com taxas de acerto
- Comportamento mais previsível

### Mago Elemental

```html
<AI Element Rate Influence: 2.0>
<Bypass AI EVA Influence>
<AI MDR Influence: 1.0>
```

Este inimigo:
- Foca extensivamente em fraquezas elementais (2.0x)
- Ignora esquiva física (magias sempre acertam)
- Considera resistência mágica

### Guerreiro Físico

```html
<Bypass AI Element Rate Influence>
<AI EVA Influence: 1.5>
<AI PDR Influence: 1.5>
<Bypass AI MEV Influence>
```

Este inimigo:
- Ignora elementos (só ataque físico)
- Considera muito esquiva física (1.5x)
- Considera resistência física
- Ignora esquiva mágica

## Veja Também

- **[Funcionamento da IA](../conceitos/funcionamento.md)** - Como TGR afeta seleção de alvos
- **[Targeting](targeting.md)** - Seleção específica de alvos
- **[Parâmetros de TGR Weight](../parametros/tgr-weight.md)** - Configuração global
