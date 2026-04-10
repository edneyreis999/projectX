# Notetags: Field Gauge (ATB Field Gauge-Related Notetags)

## Overview

Notetags para customizar marcadores de battlers no **ATB Field Gauge**. Requer que Field Gauge esteja habilitado nos parâmetros.

---

## Requisitos

```
Plugin Parameters > Field Gauge Settings > Use Field Gauge?: true
```

Se Field Gauge não estiver habilitado, estas notetags não têm efeito.

---

## <ATB Field Gauge Icon: x>

### Descrição
Muda o marcador do battler para um **ícone específico** no Field Gauge.

### Uso
```
<ATB Field Gauge Icon: x>
```

### Onde Usar
- **Actors**
- **Enemies**

### Parâmetros
- `x`: Índice do ícone no IconSet (0-N)

### Propósito
Override do ícone padrão para battlers específicos.

### Exemplos

#### Actor com Ícone Específico
```ruby
# Database: Actor 1 "Hero"
<ATB Field Gauge Icon: 1>

# Resultado:
# Marcador no Field Gauge é ícone 1 (Sword)
```

#### Enemy com Ícone Específico
```ruby
# Database: Enemy "Goblin"
<ATB Field Gauge Icon: 96>

# Resultado:
# Marcador no Field Gauge é ícone 96 (Monster)
```

#### Classes com Ícones Diferentes
```ruby
# Database: Class "Warrior"
<ATB Field Gauge Icon: 2> # Axe

# Database: Class "Mage"
<ATB Field Gauge Icon: 3> # Staff

# Resultado:
# Cada classe tem ícone diferente no Field Gauge
```

### Ícones Comuns
```
0   : Vazio
1   : Sword
2   : Axe
3   : Staff
4   : Knife
96  : Monster (comum para enemies)
97  : Ghost
98  : Demon
```

---

## <ATB Field Gauge Face: filename, index>

### Descrição
Muda o marcador do battler para uma **face específica** no Field Gauge.

### Uso
```
<ATB Field Gauge Face: filename, index>
```

### Onde Usar
- **Actors**
- **Enemies**

### Parâmetros
- `filename`: Nome do arquivo na pasta `img/faces/` (sem extensão)
- `index`: Índice da face (0-7)

### Layout de Faces
```
Index: 0 1 2 3
       ─ ─ ─ ─
     0 │┌─┬─┬─┬─┐
     1 ││ │ │ │ │
     2 │├─┼─┼─┼─┤
     3 ││ │ │ │ │
     4 │├─┼─┼─┼─┤
     5 ││ │ │ │ │
     6 │├─┼─┼─┼─┤
     7 ││ │ │ │ │
       │└─┴─┴─┴─┘
```

### Propósito
Usar faces customizadas para battlers no Field Gauge.

### Exemplos

#### Actor com Face Específica
```ruby
# Database: Actor 1 "Hero"
<ATB Field Gauge Face: Actor1, 0>

# Resultado:
# Marcador é a face (0,0) do arquivo Actor1.png
```

#### Enemy com Face Customizada
```ruby
# Database: Enemy "Dragon"
<ATB Field Gauge Face: Monster, 3>

# Resultado:
# Marcador é a face (0,3) do arquivo Monster.png
```

#### Party com Faces Diferentes
```ruby
# Actor 1
<ATB Field Gauge Face: Actor1, 0>

# Actor 2
<ATB Field Gauge Face: Actor2, 1>

# Actor 3
<ATB Field Gauge Face: Actor3, 2>

# Resultado:
# Cada actor tem sua face única no Field Gauge
```

### Nomes de Arquivos
```
Actor1    // Actor1.png
Actor2    // Actor2.png
Monster   // Monster.png
Boss      // Boss.png
Nature    // Nature.png
People    // People.png
```

### Sem Extensão
❌ Errado:
```
<ATB Field Gauge Face: Actor1.png, 0>
```

✓ Certo:
```
<ATB Field Gauge Face: Actor1, 0>
```

---

## Combinações

### Override de Sprite Type

Estas notetags **override** a configuração de Sprite Type dos parâmetros:

#### Parâmetros
```
Marker Sprites > Actors > Sprite Type: Icon
Default Icon: 1
```

#### Notetag
```ruby
# Database: Actor 1
<ATB Field Gauge Icon: 5>

# Resultado:
# Actor 1 usa ícone 5 em vez de ícone 1
```

### Múltiplos Battlers

#### Actors com Ícones Únicos
```ruby
# Actor 1 (Warrior)
<ATB Field Gauge Icon: 2>  # Axe

# Actor 2 (Mage)
<ATB Field Gauge Icon: 3>  # Staff

# Actor 3 (Healer)
<ATB Field Gauge Icon: 4>  # Wand

# Resultado:
# Cada classe com ícone diferente
```

#### Enemies com Ícones por Tipo
```ruby
# Enemy: Slime
<ATB Field Gauge Icon: 96>  # Monster

# Enemy: Bat
<ATB Field Gauge Icon: 97>  # Ghost

# Enemy: Goblin
<ATB Field Gauge Icon: 98>  # Demon

# Resultado:
# Cada tipo de enemy com ícone diferente
```

---

## Exemplos Práticos

### Sistema de Classes Visuais

```ruby
# Class: Warrior
<ATB Field Gauge Icon: 2>  # Axe

# Class: Mage
<ATB Field Gauge Icon: 3>  # Staff

# Class: Thief
<ATB Field Gauge Icon: 4>  # Knife

# Class: Healer
<ATB Field Gauge Icon: 5>  # Bow

# Resultado:
# Field Gauge mostra ícone da classe de cada actor
```

### Boss com Face Única

```ruby
# Enemy: "Final Boss"
<ATB Field Gauge Face: BossFace, 0>
<ATB Field Gauge Icon: 98>  # Fallback

# Resultado:
# Se face existe: usa BossFace.png
# Se não existe: usa ícone 98 (Demon)
```

### Enemies Mensageiros

```ruby
# Enemy: "Scout"
<ATB Field Gauge Face: Enemy, 5>  # Face com "!"

# Resultado:
# Marcador mostra "!" indicando enemy especial
```

---

## Troubleshooting

### Marcador Não Muda

#### Problema
Notetag não muda o marcador.

#### Soluções
1. Verifique **Use Field Gauge?**: true
2. Verifique ortografia da notetag
3. Confirme que índice/índice existem
4. Reinicie o jogo (algumas mudanças requerem restart)

### Face Não Aparece

#### Problema
Face não aparece no marcador.

#### Soluções
1. Verifique que arquivo existe em `img/faces/`
2. Verifique que índice é válido (0-7)
3. Confirme que sprite type permite faces

### Ícone Errado

#### Problema
Ícone errado aparece.

#### Soluções
1. Verifique índice do ícone
2. Use IconSet.png para referência
3. Teste índices próximos (ex: 96, 97, 98)

---

## Consulte Também

- [Parâmetros: Field Gauge](../configuration/parametros-field-gauge.md) - Configuração completa
- [Features: Field Gauge](../features/field-gauge.md) - Como funciona
- [Comandos Plugin](../comandos-plugin/) - Dynamic changes
