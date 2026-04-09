# Sound Effects Configuration

Efeitos sonoros para eventos do sistema ATB.

## Visão Geral

O sistema de sons permite feedback audível para eventos importantes de ATB, como completar a gauge, começar casting, ser interrompido, etc.

## Eventos de Som Disponíveis

| Evento | Quando Toca | Uso Recomendado |
|--------|-------------|-----------------|
| Gauge Full | Gauge atinge 100% | Indicar que battler pode agir |
| Cast Start | Battler começa casting | Alertar que skill está sendo conjurada |
| Cast Complete | Casting termina sem interrupção | Confirmar que skill será executada |
| Interrupt | Battler é interrompido | Feedback negativo de cancelamento |

## Configuração de SE (Sound Effects)

Cada evento de som usa o sistema padrão SE do RPG Maker MZ:

### Formato
```
Name: "filename"
Volume: 90
Pitch: 100
Pan: 0
```

### Parâmetros

**Name**: Nome do arquivo de áudio (sem extensão)
- Localizado em `audio/se/`
- Formatos suportados: .ogg, .wav

**Volume**: 0-100
- `0` = mudo
- `100` = volume máximo

**Pitch**: 50-150
- `100` = pitch normal
- `< 100` = mais grave
- `> 100` = mais agudo

**Pan**: -100 a 100
- `0` = centro
- Negativo = esquerda
- Positivo = direita

## Sons Recomendados por Evento

### Gauge Full
**Propósito**: Alertar que battler pode agir

**Sons recomendados**:
- `Cursor` - Sutil, indica prontidão
- `Decision` - Confirmação
- `Bell` - Chamada para ação

**Volume**: 70-80 (não muito alto)

**Pitch**: 100-110 (ligeiramente agudo chama atenção)

### Cast Start
**Propósito**: Alertar que magia está sendo conjurada

**Sons recomendados**:
- `Charge` - Sons de carga
- `Wind` - Efeito mágico
- `System` som customizado de "mana"

**Volume**: 60-70 (sutil)

**Pitch**: 90-100 (grave para buildup)

### Cast Complete
**Propósito**: Confirmar que magia será lançada

**Sons recomendados**:
- `Flash` - Impacto visual sonoro
- `Attack` - Preparação de ataque
- `Magic` som customizado

**Volume**: 80-90

**Pitch**: 100-120 (agudo para conclusão)

### Interrupt
**Propósito**: Feedback negativo de cancelamento

**Sons recomendados**:
- `Cancel` - Cancelamento claro
- `Buzz` - Som de erro
- `Break` - Quebra de algo

**Volume**: 90-100 (alto para gravidade)

**Pitch**: 80-100 (grave para "falha")

## Exemplos de Configuração

### Configuração Padrão Equilibrada
```
Gauge Full:
  Name: "Cursor"
  Volume: 80
  Pitch: 100
  Pan: 0

Cast Start:
  Name: "Charge"
  Volume: 70
  Pitch: 95
  Pan: 0

Cast Complete:
  Name: "Flash"
  Volume: 85
  Pitch: 105
  Pan: 0

Interrupt:
  Name: "Cancel"
  Volume: 100
  Pitch: 90
  Pan: 0
```

### Configuração Mínima (Apenas Crítico)
```
Gauge Full: (vazio)
Cast Start: (vazio)
Cast Complete: (vazio)
Interrupt:
  Name: "Cancel"
  Volume: 100
  Pitch: 90
  Pan: 0
```

### Configuração Estratégica (Todos Audíveis)
```
Gauge Full:
  Name: "Bell"
  Volume: 75
  Pitch: 110
  Pan: 0

Cast Start:
  Name: "Wind"
  Volume: 60
  Pitch: 90
  Pan: 0

Cast Complete:
  Name: "Magic"
  Volume: 90
  Pitch: 100
  Pan: 0

Interrupt:
  Name: "Buzz"
  Volume: 100
  Pitch: 80
  Pan: 0
```

## Sons Customizados

### Adicionando Sons Próprios

1. **Criar arquivo de áudio** (.ogg ou .wav)
2. **Colocar em**: `audio/se/`
3. **Configurar no plugin**: Use apenas o nome do arquivo

### Exemplo de Som Customizado
```
# Se você tem "my_charge_sound.ogg" em audio/se/

Cast Start:
  Name: "my_charge_sound"
  Volume: 70
  Pitch: 100
  Pan: 0
```

## Pan Espacial

### Usando Pan para Indicar Posição

**Battlers à esquerda**:
```
Gauge Full:
  Name: "Cursor"
  Pan: -50  ← Som mais à esquerda
```

**Battlers à direita**:
```
Gauge Full:
  Name: "Cursor"
  Pan: 50  ← Som mais à direita
```

**Nota**: Pan estático não considera posição real do battler

## Boas Práticas

### Feedback Audível

**Dê prioridade a eventos críticos**:
1. Interrupt (mais importante)
2. Cast Complete (importante)
3. Gauge Full (útil mas não crítico)
4. Cast Start (opcional)

### Evitar Fadiga Auditiva

**Não use**:
- Sons muito altos (> 95)
- Sons constantes (a cada frame)
- Sons irritantes/repetitivos

**Prefira**:
- Sons sutis (volume 60-80)
- Sons distintos para cada evento
- Sons que "sentem" bem repetidos

### Teste com Jogadores

Sons são subjetivos. Teste com múltiplos jogadores para garantir que:
- Sons são audíveis mas não irritantes
- Pitch/volume são confortáveis
- Sons não "sobrecarregam" durante batalhas

## Ver Também

- [Interrupts](./interrupts.md) - Configurar sistema de interrupção
- [Configuration](./index.md) - Outras configurações

## Troubleshooting

**Som não toca**: Verificar se:
1. Nome do arquivo está correto (sem extensão)
2. Arquivo existe em `audio/se/`
3. Volume não está em 0
4. Evento está acontecendo (ex: cast está realmente sendo interrompido)

**Sons muito baixos**: Aumentar volume parameter

**Sons muito altos**: Diminuir volume parameter (max 100)
