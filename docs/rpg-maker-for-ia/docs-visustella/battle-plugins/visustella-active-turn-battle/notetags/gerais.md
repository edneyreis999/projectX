# Notetags: Gerais (General ATB-Related Notetags)

## Overview

Notetags gerais do sistema ATB para funcionalidades básicas como help text customizado e controle de exibição de gauges.

---

## <ATB Help>

### Descrição
Altera o texto de help de uma skill/item **apenas quando o jogo está em modo ATB**.

### Uso
```
<ATB Help>
description
description
</ATB Help>
```

### Onde Usar
- **Skills**
- **Items**

### Parâmetros
- `description`: Texto de help específico para ATB
- Pode ter múltiplas linhas

### Propósito
Permitir skills/items terem descrições diferentes baseadas no battle system.

### Exemplos

#### Exemplo Básico
```ruby
# Database: Skill "Fireball"
<ATB Help>
Lança uma bola de fogo.
Tempo de cast: 5s.
</ATB Help>

# Help normal:
"Lança uma bola de fogo infligindo dano."
```

**Resultado:**
- TPB/DBS: "Lança uma bola de fogo infligindo dano."
- ATB: "Lança uma bola de fogo. Tempo de cast: 5s."

#### Exemplo com Speed Positivo
```ruby
# Database: Skill "Quick Heal"
<ATB Help>
Cura HP e permite
ação mais rápida no
próximo turno (+50%).
</ATB Help>

# Help normal:
"Cura HP do alvo."
```

#### Exemplo com Speed Negativo
```ruby
# Database: Skill "Meteoro"
<ATB Help>
Dano massivo a todos.
Cast time: 20s.
Pode ser interrompido.
</ATB Help>

# Help normal:
"Causa dano a todos os inimigos."
```

#### Multi-line
```ruby
<ATB Help>
Skill de haste.
Acelera próximo turno
em 30% da gauge.

Custo: 15 MP
Tempo de recarga: 0
</ATB Help>
```

### Uso Recomendado
- Skills com cast time (explicar duração)
- Skills com speed positivo (explicar efeito)
- Skills que funcionam diferente em ATB vs TPB

---

## <Hide ATB Gauge>

### Descrição
Esconde a ATB Gauge de um enemy.

### Uso
```
<Hide ATB Gauge>
```

### Onde Usar
- **Enemies** (apenas)

### Comportamento
- ATB Gauge do enemy **não** é exibida
- Override de configuração "Show Sprite Gauges"

### Propósito
- Ocultar gauges de enemies surpresa
- Criar desafio adicional
- Estética (enemies especiais)

### Exemplos

#### Enemy Surpresa
```ruby
# Database: Enemy "Assassin"
<Hide ATB Gauge>

# Resultado:
# Jogador não vê quando assassin vai agir
```

#### Boss Múltiplas Fases
```ruby
# Database: Enemy "Boss Core"
<Hide ATB Gauge>

# Database: Enemy "Boss True Form"
# Sem notetag (gauge visível)

# Resultado:
# Primeira fase: gauge oculta
# Segunda fase: gauge visível
```

#### Enemies Decorativos
```ruby
# Database: Enemy "Summon"
<Hide ATB Gauge>

# Resultado:
# Summon não mostra gauge (apenas visual)
```

### Limitações
- **Apenas enemies**: Actors não podem usar esta notetag
- **Não afeta Status Window**: Apenas sprite gauges
- **Não afeta Field Gauge**: Se Field Gauge estiver ativo, enemy ainda aparece lá

### Combinação com Outras Notetags

#### com ATB Field Gauge Icon
```ruby
<Hide ATB Gauge>
<ATB Field Gauge Icon: 0>

# Resultado:
# - Sprite gauge: escondida
# - Field Gauge: aparece com ícone 0 (vazio)
```

### Consulte Também
- [Parâmetros: Gauge](../configuration/parametros-gauge.md) - Show Sprite Gauges
- [Notetags: Field Gauge](field-gauge.md) - Customizar Field Gauge

---

## Exemplos Práticos

### Skill de Haste
```ruby
# Database: Skill "Haste"
Speed: 1000
<ATB Help>
Acelera próximo turno
em 50% da gauge.

Custo: 20 MP
</ATB Help>

<ATB After Gauge: +50%>

# Resultado:
# - Help em ATB explica o efeito
# - Skill deixa battler mais rápido
```

### Skill de Cast
```ruby
# Database: Skill "Ultimate"
Speed: -2000
<ATB Help>
Skill ultimate.
Cast: 33s.
Dano massivo.

⚠️ Pode ser interrompido!
</ATB Help>

# Resultado:
# - Help explica cast time
# - Aviso sobre interrupt
```

### Enemy Oculto
```ruby
# Database: Enemy "Ghost"
<Hide ATB Gauge>
<ATB Battle Start Gauge: +100%>

# Resultado:
# - Gauge não visível
# - Começa com gauge cheia (surpresa!)
```

---

## Troubleshooting

### <ATB Help> Não Funciona

#### Problema
Help text não muda em ATB.

#### Soluções
1. Verifique que battle system está em **TPB mode**
2. Verifique ortografia da notetag
3. Certifique-se que plugin está **ON**

### <Hide ATB Gauge> Não Funciona

#### Problema
Enemy ainda mostra gauge.

#### Soluções
1. Verifique "Show Sprite Gauges" está **true**
2. Verifique que notetag está em **Enemy**, não em Troop
3. Confirme que enemy não está em **Field Gauge**

### Texto Quebrado

#### Problema
Text help aparece quebrado.

#### Soluções
1. Use quebras de linha apropriadas
2. Mantenha linhas curtas (< 40 caracteres)
3. Teste em jogo para verificar

---

## Consulte Também

- [Notetags: Field Gauge](field-gauge.md) - Marcadores customizados
- [Notetags: Gauge Manipulation](gauge-manipulation.md) - Manipular gauges
- [Notetags: JavaScript](javascript.md) - Fórmulas customizadas
