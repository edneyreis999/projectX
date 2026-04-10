# Notetags: Enemy-Only Effects

Estas notetags funcionam **apenas em Enemies** do database.

## Death Transform

### Sintaxe
```
<Death Transform>
 name: weight
 name: weight
 name: weight
</Death Transform>
```

### Onde Usar
- Enemy Notetags (apenas)

### Parâmetros
- **name**: Nome do enemy database para transformar
- **weight**: (opcional) Peso para probabilidade
  - Maior peso = mais frequente
  - Sem peso = peso padrão igual

### Como Funciona
1. Enemy morre em batalha
2. Sistema roleta baseado em weight
3. Enemy transforma no escolhido
4. Novo enemy aparece com HP/MP completos

### Exemplos

#### Transformação Única
```
<Death Transform>
Slime
</Death Transform>
```

#### Transformação com Pesos
```
<Death Transform>
Slime: 75    # 75% de chance
Goblin: 25   # 25% de chance
</Death Transform>
```

#### Múltiplas Sem Pesos
```
<Death Transform>
Slime
Goblin
</Death Transform>
# Ambos com 50% de chance
```

#### Mix de Pesos
```
<Death Transform>
Slime: 10
Goblin       # Peso padrão
Orc: 5
</Death Transform>
```

### Sistema de Probabilidade

```
Probabilidade = weight / (soma de todos os weights)
```

**Exemplo:**
```
Slime: 75    → 75% (75/100)
Goblin: 25   → 25% (25/100)
```

**Sem pesos explícitos:**
```
Slime        → 50% (1/2)
Goblin       → 50% (1/2)
```

### Notas Importantes
- Nome deve ser **exato** do database
- Transformação ocorre imediatamente na morte
- HP/MP ficam completos
- States resetam

---

## Transform Animation

### Sintaxe
```
<Transform Animation: x>
```

### Onde Usar
- Enemy Notetags (apenas)

### Requisitos
- **VisuMZ_0_CoreEngine** deve estar instalado

### Parâmetros
- **x**: ID da animação do database

### Como Funciona
1. Enemy com `<Death Transform>` morre
2. Transformação ocorre
3. **Animação toca no ALVO** (novo enemy)
4. Animação ID x é exibida

### Importante
- Notetag vai no **ALVO** da transformação
- **NÃO** vai no enemy original
- Requer Core Engine instalado

### Exemplos

#### No Enemy Alvo
```
# Enemy: Slime_Reborn
<Transform Animation: 45>
```

#### Combo com Death Transform
```
# Enemy: Goblin_Morto tem Death Transform
<Death Transform>
Slime_Reborn
</Death Transform>

# Enemy: Slime_Reborn tem animação
<Transform Animation: 45>
```

### Casos de Uso
- Efeitos visuais de "rebirth"
- Transformações dramáticas
- Feedback visual claro

### Dicas
- Use animações comuns (ex: explosion, summon)
- Combine com popups para clareza
- Teste para garantir que animação apareça

---

## Interações Entre Notetags Enemy-Only

### Death Transform + Extinct
```
# Extinct NÃO suprime Death Transformations
# Enemy ainda se transforma mesmo com Extinct
```

### Death Transform + Doom
```
# Enemy com Doom morre
# Death Transform ocorre normalmente
# Timer de Doom reseta na transformação
```

### Death Transform + Transform Animation
```
# Enemy A tem Death Transform para Enemy B
# Enemy B tem Transform Animation: x
# Resultado: Enemy A morre → Enemy B aparece + animação x
```

---

## Comparativo: Enemy-Only Effects

| Efeito | Gatilho | Resultado | Requisitos |
|--------|---------|-----------|------------|
| Death Transform | Morte | Transforma com HP/MP full | - |
| Transform Animation | Transformação | Toca animação ID x | Core Engine |

---

## Exemplos Práticos

### Boss com 2 Formas
```
# Enemy: Boss_Forma1
<Death Transform>
Boss_Forma2: 100
</Death Transform>

# Enemy: Boss_Forma2
<Transform Animation: 50>
```

### Inimigo Aleatório
```
# Enemy: Mystery_Egg
<Death Transform>
Slime: 40
Bat: 30
Goblin: 20
Orc: 10
</Death Transform>

# Cada transformável tem sua própria animação
# Enemy: Slime
<Transform Animation: 1>

# Enemy: Bat
<Transform Animation: 2>

# Enemy: Goblin
<Transform Animation: 3>

# Enemy: Orc
<Transform Animation: 4>
```

### Egg Division
```
# Enemy: Egg_Slime
<Death Transform>
Slime
Slime
Slime
</Death Transform>
# Transforma em um dos 3 slimes (33% cada)
```

---

## Próximos Passos

- Veja [State-Only Effects](state-only.md) para efeitos de estados
- Consulte [Trait-Object Effects](trait-objects.md) para traits
- Configure [Parâmetros](../parametros/configuracoes.md) para visuais
