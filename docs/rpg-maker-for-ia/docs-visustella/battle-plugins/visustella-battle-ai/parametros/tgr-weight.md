# Parâmetros de TGR Weight

## Visão Geral

Estes Plugin Parameters permitem definir se você quer influência de peso ao decidir alvos para ações e o quanto influenciar o peso TGR por.

Localizado em: **Plugin Parameters > A.I. => TGR Weight Settings**

## Weight

### Element Rate => TGR

Faz com que todas as A.I. considerem taxas elementais ao considerar peso TGR por padrão?

**Opções**: `true` ou `false`

**Valor Padrão**: `false` (OFF)

**Como Funciona**:
- Quando `true`, todas as A.I. consideram fraquezas/resistências elementais
- Alvos com fraquezas elementais recebem peso TGR maior
- Alvos com resistências elementais recebem peso TGR menor

---

#### Influence Rate

Isso determina o nível padrão de influência que taxas elementais têm no peso TGR.

**Configuração**: Float (valor decimal)

**Valor Padrão**: `1.0`

**Valores Comuns**:
- `0.5` - Influência baixa (pouca consideração de elementos)
- `1.0` - Influência normal (consideração padrão)
- `1.5` - Influência alta (prioriza exploração de fraquezas)
- `2.0` - Influência muito alta (foca extensivamente em elementos)

---

### EVA Rate => TGR

Faz com que todas as A.I. considerem taxas EVA ao considerar peso TGR por padrão?

**Opções**: `true` ou `false`

**Valor Padrão**: `false` (OFF)

**Como Funciona**:
- Quando `true`, todas as A.I. consideram esquiva física
- Alvos com alta esquiva física recebem peso TGR menor
- Alvos com baixa esquiva física recebem peso TGR maior

---

#### Influence Rate

Isso determina o nível padrão de influência que taxas EVA têm no peso TGR.

**Configuração**: Float (valor decimal)

**Valor Padrão**: `1.0`

**Valores Comuns**:
- `0.5` - Influência baixa (ataca mesmo com alta esquiva)
- `1.0` - Influência normal (considera esquiva normalmente)
- `1.5` - Influência alta (evita alvos com alta esquiva)

---

### MEV Rate => TGR

Faz com que todas as A.I. considerem taxas MEV ao considerar peso TGR por padrão?

**Opções**: `true` ou `false`

**Valor Padrão**: `false` (OFF)

**Como Funciona**:
- Quando `true`, todas as A.I. consideram esquiva mágica
- Alvos com alta esquiva mágica recebem peso TGR menor
- Alvos com baixa esquiva mágica recebem peso TGR maior

---

#### Influence Rate

Isso determina o nível padrão de influência que taxas MEV têm no peso TGR.

**Configuração**: Float (valor decimal)

**Valor Padrão**: `1.0`

**Valores Comuns**:
- `0.5` - Influência baixa (usa magias mesmo com alta esquiva)
- `1.0` - Influência normal (considera esquiva mágica normalmente)
- `1.5` - Influência alta (evita alvos com alta esquiva mágica)

---

### PDR Rate => TGR

Faz com que todas as A.I. considerem taxas PDR ao considerar peso TGR por padrão?

**Opções**: `true` ou `false`

**Valor Padrão**: `false` (OFF)

**Como Funciona**:
- Quando `true`, todas as A.I. consideram resistência física
- Alvos com alta resistência física recebem peso TGR menor
- Alvos com baixa resistência física recebem peso TGR maior

---

#### Influence Rate

Isso determina o nível padrão de influência que taxas PDR têm no peso TGR.

**Configuração**: Float (valor decimal)

**Valor Padrão**: `1.0`

**Valores Comuns**:
- `0.5` - Influência baixa (ataca mesmo com alta resistência)
- `1.0` - Influência normal (considera resistência normalmente)
- `1.5` - Influência alta (prioriza alvos vulneráveis)

---

### MDR Rate => TGR

Faz com que todas as A.I. considerem taxas MDR ao considerar peso TGR por padrão?

**Opções**: `true` ou `false`

**Valor Padrão**: `false` (OFF)

**Como Funciona**:
- Quando `true`, todas as A.I. consideram resistência mágica
- Alvos com alta resistência mágica recebem peso TGR menor
- Alvos com baixa resistência mágica recebem peso TGR maior

---

#### Influence Rate

Isso determina o nível padrão de influência que taxas MDR têm no peso TGR.

**Configuração**: Float (valor decimal)

**Valor Padrão**: `1.0`

**Valores Comuns**:
- `0.5` - Influência baixa (usa magias mesmo com alta resistência)
- `1.0` - Influência normal (considera resistência normalmente)
- `1.5` - Influência alta (prioriza alvos vulneráveis)

---

## Exemplos de Configuração

### Configuração Padrão (Sem Influência)

```
Element Rate => TGR: false
EVA Rate => TGR: false
MEV Rate => TGR: false
PDR Rate => TGR: false
MDR Rate => TGR: false
```

**Resultado**: IA não considera fraquezas, resistências ou esquiva. Comportamento mais aleatório.

---

### Configuração Elementos

```
Element Rate => TGR: true
├─ Influence Rate: 1.5
EVA Rate => TGR: false
MEV Rate => TGR: false
PDR Rate => TGR: false
MDR Rate => TGR: false
```

**Resultado**: IA foca em exploração de fraquezas elementais. Mais dano, mas menos estratégico.

---

### Configuração Inteligente

```
Element Rate => TGR: true
├─ Influence Rate: 1.2
EVA Rate => TGR: true
├─ Influence Rate: 1.0
MEV Rate => TGR: true
├─ Influence Rate: 1.0
PDR Rate => TGR: true
├─ Influence Rate: 0.8
MDR Rate => TGR: true
├─ Influence Rate: 0.8
```

**Resultado**: IA considera tudo de forma equilibrada. Explora fraquezas mas evita desperdício.

---

### Configuração Tática

```
Element Rate => TGR: true
├─ Influence Rate: 1.0
EVA Rate => TGR: true
├─ Influence Rate: 1.5
MEV Rate => TGR: true
├─ Influence Rate: 1.5
PDR Rate => TGR: true
├─ Influence Rate: 0.5
MDR Rate => TGR: true
├─ Influence Rate: 0.5
```

**Resultado**: IA muito tática. Evita ataques que podem errar (alta influência de esquiva), foca em alvos que podem ser acertados.

---

### Configuração Bruta

```
Element Rate => TGR: true
├─ Influence Rate: 2.0
EVA Rate => TGR: false
MEV Rate => TGR: false
PDR Rate => TGR: true
├─ Influence Rate: 1.5
MDR Rate => TGR: true
├─ Influence Rate: 1.5
```

**Resultado**: IA brutam. Explora fraquezas elementais extensivamente, ignora esquiva, foca em causar dano máximo.

---

## Interação com Notetags

### Notetags Sobrescrevem Parâmetros

Notetags individuais podem sobrescrever estas configurações globais:

```html
<AI Element Rate Influence: 2.0>    <!-- Sobrescreve global -->
<Bypass AI EVA Influence>            <!-- Ignora global -->
```

### Prioridade

1. **Notetags individuais** (maior prioridade)
2. **Plugin Parameters** (padrão para todos)

### Exemplo

```
Plugin Parameters:
├─ Element Rate => TGR: true
│  └─ Influence Rate: 1.0

Enemy Notetag:
└─ <AI Element Rate Influence: 2.0>
```

**Resultado**: Este inimigo específico tem influência de 2.0, todos os outros têm 1.0.

---

## Boas Práticas

### 1. Comece Conservador

Comece com influências baixas ou desabilitadas e aumente conforme necessário.

```
✅ Bom: Começar com 0.5-1.0
❌ Ruim: Começar com 2.0+
```

### 2. Teste Extensivamente

TGR Weight pode fazer com que a IA se comporte de formas inesperadas. Teste com diferentes formações de grupo.

### 3. Considere o Tipo de Inimigo

- **Inimigos Inteligentes**: Altas influências (1.5+)
- **Inimigos Brutos**: Baixas influências (0.5-1.0)
- **Inimigos Caóticos**: Influências desabilitadas

### 4. Equilibre com Knowledge

Se `Learn Knowledge` está `true` em [Configuração Geral](configuracao-geral.md), considere:
- Influências altas + Knowledge = IA muito inteligente
- Influências baixas + Knowledge = IA moderada
- Influências altas sem Knowledge = IA onisciente (muito difícil)

---

## Troubleshooting

### IA Não Usa Skills Elementais

**Problema**: IA nunca usa skills elementais em inimigos vulneráveis.

**Solução**: Verifique se `Element Rate => TGR` está `true` e `Influence Rate` está alto o suficiente (1.0+).

### IA Sempre Erra Ataques

**Problema**: IA sempre usa ataques físicos em inimigos com alta esquiva.

**Solução**: Habilite `EVA Rate => TGR` e aumente `Influence Rate` para 1.5+.

### IA Não Cura Atores Certo

**Problema**: IA não cura os atores que precisam de cura.

**Solução**: Verifique se as influências não estão interferindo. Considere usar notetags `<AI Target: Lowest HP%>` em skills de cura.

---

## Veja Também

- **[Notetags de TGR Weight](../notetags/tgr-weight.md)** - Sobrescrever parâmetros globalmente
- **[Funcionamento da IA](../conceitos/funcionamento.md)** - Como TGR afeta seleção de alvos
- **[Configuração Geral](configuracao-geral.md)** - Sistema de Knowledge
