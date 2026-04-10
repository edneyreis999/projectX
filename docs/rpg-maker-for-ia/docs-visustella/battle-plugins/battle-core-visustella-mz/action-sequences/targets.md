# Targets - Action Sequence

## Visão Geral
Action Sequences para controle manual de seleção de alvos em Action Sequences "target by target".

**Nota:** Estes comandos são usados quando você precisa processar cada alvo individualmente em vez de todos de uma vez.

## Comandos Disponíveis

### TARGET: Current Index
Define o índice atual para este valor.
Então decide pular para um label (opcional).

**Parâmetros:**
- **Set Index To**: Define índice de targeting para este valor
  - 0 é o índice inicial de um grupo de alvos
- **Jump To Label**: Se um alvo for encontrado após mudança de índice, pula para este label

**Exemplo:**
```
TARGET: Current Index
  Set Index To: 0
  Jump To Label: Process Target
```

### TARGET: Next Target
Move índice para frente por 1 para selecionar novo alvo atual.
Então decide pular para um label (opcional).

**Parâmetros:**
- **Jump To Label**: Se um alvo for encontrado após mudança de índice, pula para este label

**Exemplo:**
```
LABEL: Loop Start
TARGET: Next Target
  Jump To Label: Process Target

LABEL: Process Target
# Processar alvo atual aqui...
MECH: Action Effect
  Targets: Current Target

# Voltar ao loop
JUMP TO LABEL: Loop Start
```

### TARGET: Previous Target
Move índice para trás por 1 para selecionar novo alvo atual.
Então decide pular para um label (opcional).

**Parâmetros:**
- **Jump To Label**: Se um alvo for encontrado após mudança de índice, pula para este label

**Exemplo:**
```
TARGET: Previous Target
  Jump To Label: Process Target
```

### TARGET: Random Target
Define índice aleatoriamente para determinar novo alvo atual.
Então decide pular para um label (opcional).

**Parâmetros:**
- **Force Random?**: Índice não pode ser seu valor anterior após randomização
- **Jump To Label**: Se um alvo for encontrado após mudança de índice, pula para este label

**Exemplo:**
```
TARGET: Random Target
  Force Random?: true
  Jump To Label: Process Target
```

## Casos de Uso

### Processar Cada Alvo Individualmente
```
# Configuração inicial
TARGET: Current Index
  Set Index To: 0
  Jump To Label: Start

LABEL: Loop
# Processar alvo atual
ANIM: Show Animation
  Targets: Current Target
  Animation ID: 1

MECH: Action Effect
  Targets: Current Target

# Próximo alvo
TARGET: Next Target
  Jump To Label: Loop
```

### Seleção Aleatória de Alvo
```
TARGET: Random Target
  Force Random?: true
  Jump To Label: Attack

LABEL: Attack
ANIM: Show Animation
  Targets: Current Target
  Animation ID: 10

MECH: Action Effect
  Targets: Current Target
```

### Loop Através de Todos os Alvos
```
LABEL: Start Loop
TARGET: Next Target
  Jump To Label: Process

LABEL: Process
# Código aqui para cada alvo
MECH: Action Effect
  Targets: Current Target

# Continuar loop
JUMP TO LABEL: Start Loop
```

## Notas
- Usado para Action Sequences "target by target"
- Current Target refere-se ao alvo atualmente selecionado pelo índice
- Labels são usados para criar loops e condicionais
- Next Target incrementa o índice (0 → 1 → 2...)
- Previous Target decrementa o índice (2 → 1 → 0...)
- Random Target seleciona um índice aleatório válido
- Force Random evita selecionar o mesmo alvo duas vezes seguidas
- Jump To Label é opcional mas geralmente necessário para loops

## Quando Usar

### Use Target Commands Quando:
- Você precisa processar cada alvo individualmente
- Quer criar efeitos diferentes para cada alvo
- Precisa de loops através de alvos
- Quer seleção aleatória de alvo

### Use Targets Normais Quando:
- Todos os alvos recebem o mesmo tratamento
- Processamento em lote é suficiente
- Não precisa de controle individual

## Veja Também
- `mechanics.md` - Comandos de mecânica que usam alvos
- `action-sets.md` - Configuração de Action Sequences
- Documentação de Action Sequences do Battle Core para sintaxe completa
