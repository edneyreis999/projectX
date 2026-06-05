# Comandos Plugin: Sistema (System Plugin Commands)

## Overview

Comandos de plugin para controlar a visibilidade e comportamento do **ATB Field Gauge** durante eventos.

---

## System: ATB Field Gauge Visibility

### Descrição
Controla se o ATB Field Gauge está visível ou oculto.

### Plugin Command
```
System: ATB Field Gauge Visibility
```

### Parâmetros

#### Visibility
- **Tipo**: Select
- **Descrição**: Estado de visibilidade do Field Gauge
- **Opções**:
  - **Show**: Mostra o Field Gauge
  - **Hide**: Esconde o Field Gauge

### Comportamento
- **Show**: Field Gauge aparece (se "Use Field Gauge?" está true)
- **Hide**: Field Gauge desaparece temporariamente
- Não afeta configuração de "Use Field Gauge?"

### Exemplos de Evento

#### Mostrar Field Gauge
```
Plugin Command: System: ATB Field Gauge Visibility
└─ Visibility: Show

# Resultado:
# Field Gauge aparece na batalha
```

#### Esconder Field Gauge
```
Plugin Command: System: ATB Field Gauge Visibility
└─ Visibility: Hide

# Resultado:
# Field Gauge é ocultado
```

#### Toggle com Switch
```
Conditional Branch: Switch[1] == ON
  Plugin Command: System: ATB Field Gauge Visibility
  └─ Visibility: Show
: Else
  Plugin Command: System: ATB Field Gauge Visibility
  └─ Visibility: Hide
: Branch End

# Resultado:
# Switch controla visibilidade
```

---

## Casos de Uso

### Cutscenes Batalha

```
# Event: Cutscene starts
Plugin Command: System: ATB Field Gauge Visibility
└─ Visibility: Hide

# (Cutscene acontece)

# Event: Cutscene ends
Plugin Command: System: ATB Field Gauge Visibility
└─ Visibility: Show

# Resultado:
# Field Gauge oculto durante cutscene
```

### Fases de Boss

```
# Troop Page 1 (Fase 1)
# Field Gauge visível

# Troop Page 2 (Fase 2 - Boss enfurecido)
Plugin Command: System: ATB Field Gauge Visibility
└─ Visibility: Hide

# Resultado:
# Field Gauge oculto para aumentar dificuldade/tensão
```

### Tutoriais

```
# Event: Tutorial de batalha
Text: "Bem-vindo à batalha!"
Text: "O Field Gauge mostra o progresso de todos..."

Plugin Command: System: ATB Field Gauge Visibility
└─ Visibility: Show

Text: "Observe como os marcadores se movem..."

# Event: Tutorial termina
# (Field Gauge permanece visível)
```

### Batalhas Especiais

```
# Event: Batalha cega (escuridão)
Plugin Command: System: ATB Field Gauge Visibility
└─ Visibility: Hide

# (Todas gauges ocultas para aumentar dificuldade)

# Event: Efeito de escuridão termina
Plugin Command: System: ATB Field Gauge Visibility
└─ Visibility: Show
```

---

## Interação com Outras Configurações

### Use Field Gauge?

```
Plugin Parameters > Field Gauge Settings > Use Field Gauge?: false
```

- Se **false**, comando de visibilidade **não tem efeito**
- Field Gauge nunca aparece

### Plugin Parameters vs Plugin Commands

#### Plugin Parameters (Permanent)
```
Plugin Parameters > Use Field Gauge?: true
# Configuração permanente
```

#### Plugin Commands (Temporary)
```
Plugin Command: System: ATB Field Gauge Visibility > Hide
# Override temporário
```

### Ordem de Precedência
```
Plugin Parameters (Base)
  ↓
Plugin Commands (Override temporário)
  ↓
End of Battle (Reseta para Plugin Parameters)
```

---

## Exemplos Práticos

### Sistema de Dificuldade

```
# Event: Início de batalha
Conditional Branch: Variable[Difficulty] == 0  # Fácil
  Plugin Command: System: ATB Field Gauge Visibility
  └─ Visibility: Show
: Else
  Plugin Command: System: ATB Field Gauge Visibility
  └─ Visibility: Hide
: Branch End

# Resultado:
# Fácil: Field Gauge visível (mais info)
# Difícil: Field Gauge oculto (menos info)
```

### Cinematic Battles

```
# Event: Batalha cinematográfica
# (Troop Event)

# Turn 0: Intro
Plugin Command: System: ATB Field Gauge Visibility
└─ Visibility: Hide

Text: "O poderoso boss aparece..."

# Turn 1: Battle começa
Plugin Command: System: ATB Field Gauge Visibility
└─ Visibility: Show

# Resultado:
# Intro dramática sem UI, batalha com UI
```

### Surprise Attacks

```
# Event: Surprise attack (enemies emboscam)

# Turn 0
Plugin Command: System: ATB Field Gauge Visibility
└─ Visibility: Hide

Text: "Surpresa! Enemies atacam!"

# Turn 1
Plugin Command: System: ATB Field Gauge Visibility
└─ Visibility: Show

# Resultado:
# Primeiro turno sem Field Gauge (surpresa)
```

### Progressive Reveal

```
# Event: Batalha em fases

# Fase 1 (4 enemies)
Plugin Command: System: ATB Field Gauge Visibility
└─ Visibility: Show

# Fase 2 (2 enemies derrotados, 2 restam)
Plugin Command: System: ATB Field Gauge Visibility
└─ Visibility: Show

# Fase 3 (Boss reveal)
Plugin Command: System: ATB Field Gauge Visibility
└─ Visibility: Hide

# Resultado:
# Field Gauge oculto apenas para boss (tensão)
```

---

## Troubleshooting

### Field Gauge Não Aparece

#### Possíveis Causas
1. **Use Field Gauge?**: false
2. **Comando não executado**: Event page não ativada
3. **Override por outro comando**: Comando mais recente prevalece

#### Soluções
1. Verifique Plugin Parameters
2. Use "Show" command explicitamente
3. Verifique ordem de execução dos eventos

### Field Gauge Não Esconde

#### Possíveis Causas
1. **Use Field Gauge?**: false (já está oculto)
2. **Comando em página errada**: Event page não ativa
3. **Conflito com outro plugin**: Outro plugin mostrando UI

#### Soluções
1. Verifique que Field Gauge está visível antes
2. Verifique condições da Event Page
3. Desative outros plugins temporariamente

### Estado Não Persiste

#### Comportamento Esperado
- Visibilidade **reseta** ao fim da batalha
- Plugin Commands são **temporários**

#### Solução
- Use Plugin Parameters para configuração permanente
- Reaplique Plugin Commands em cada batalha se necessário

---

## Consulte Também

- [Comandos Plugin: Atores](atores.md) - Comandos para actors
- [Comandos Plugin: Inimigos](inimigos.md) - Comandos para enemies
- [Parâmetros: Field Gauge](../configuration/parametros-field-gauge.md) - Configuração permanente
