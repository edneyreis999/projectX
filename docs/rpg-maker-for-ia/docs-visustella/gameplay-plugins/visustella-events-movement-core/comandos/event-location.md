# Event Location - Comandos de Plugin

Plugin: **VisuStella Events & Movement Core**

---

## Comandos de Localizacao de Evento

### Event Location: Save

Memoriza a posicao atual de um evento para que ela seja mantida na proxima carga do mapa.

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Event ID` | Inteiro | ID do evento cuja posicao sera salva | Sim |

### Event Location: Delete

Remove a posicao salva de um evento, fazendo-o retornar a posicao padrao definida no editor.

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Map ID` | Inteiro | ID do mapa (`0` = mapa atual) | Sim |
| `Event ID` | Inteiro | ID do evento (`0` = evento atual) | Sim |

### Event Location: Create

Cria um ponto de spawn personalizado para um evento, sobrescrevendo a posicao padrao.

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Map ID` | Inteiro | ID do mapa | Sim |
| `Event ID` | Inteiro | ID do evento | Sim |
| `X Coordinate` | Inteiro | Coordenada X no mapa | Sim |
| `Y Coordinate` | Inteiro | Coordenada Y no mapa | Sim |
| `Direction` | Inteiro | Direcao do evento (2=baixo, 4=esquerda, 6=direita, 8=cima) | Sim |
| `Page ID` | Inteiro | (Opcional) Pagina do evento | Sim |
| `Move Route Index` | Inteiro | (Opcional) Indice da move route | Sim |

---

## Spawn Event - Comandos de Spawn de Evento

### Spawn Event: Spawn At X, Y

Spawna um evento em coordenadas especificas.

**Passo 1 - Identificacao do Template:**

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Template Name` | Texto | Nome do template de spawn | Nao |
| `Map ID` | Inteiro | ID do mapa do evento template | Sim |
| `Event ID` | Inteiro | ID do evento template | Sim |

**Passo 2 - Posicionamento:**

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `X Coordinate` | Inteiro | Coordenada X no mapa | Sim |
| `Y Coordinate` | Inteiro | Coordenada Y no mapa | Sim |
| `Check Event Collision` | Booleano | Verificar colisao com outros eventos? | Nao |
| `Check Passability` | Booleano | Verificar passabilidade do tile? | Nao |
| `Preserve Spawn` | Booleano | Preservar spawn ao trocar de mapa? | Nao |

**Passo 3 - Switch de Sucesso:**

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Success Switch ID` | Inteiro | Switch ID para resultado (`0` = ignorar, OFF = falhou, ON = sucesso) | Sim |

### Spawn Event: Spawn At Region

Spawna um evento em uma posicao aleatoria dentro de uma regiao.

- Mesmos parametros do `Spawn At X, Y`, exceto que utiliza **Region ID(s)** no lugar de coordenadas X/Y.
- Aceita multiplos Region IDs separados por virgula.

### Spawn Event: Spawn At Terrain Tag

Spawna um evento em uma posicao aleatoria dentro de tiles com uma terrain tag especifica.

- Mesmos parametros do `Spawn At X, Y`, exceto que utiliza **Terrain Tag(s)** (0-7) no lugar de coordenadas X/Y.
- Aceita multiplos Terrain Tags separados por virgula.

### Spawn Event: Despawn Event ID

Remove um evento spawned pelo seu Event ID.

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Event ID` | Inteiro | ID do evento spawned a ser removido | Sim |

### Spawn Event: Despawn At X, Y

Remove todos os eventos spawned nas coordenadas especificadas.

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `X Coordinate` | Inteiro | Coordenada X | Sim |
| `Y Coordinate` | Inteiro | Coordenada Y | Sim |

### Spawn Event: Despawn Region(s)

Remove todos os eventos spawned dentro de regioes especificas.

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Region ID(s)` | Texto | IDs das regioes (separados por virgula) | Nao |

### Spawn Event: Despawn Terrain Tag(s)

Remove todos os eventos spawned em tiles com terrain tags especificas.

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Terrain Tag(s)` | Texto | Terrain tags (0-7, separados por virgula) | Nao |

### Spawn Event: Despawn Everything

Remove **todos** os eventos spawned no mapa atual. Nao possui parametros adicionais.

---

## Morph Event - Comandos de Transformacao de Evento

### Morph Event: Change

Transforma um evento em outro, alterando sua aparencia e propriedades.

**Passo 1 - Evento Alvo:**

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Map ID` | Inteiro | ID do mapa do evento a ser transformado | Sim |
| `Event ID` | Inteiro | ID do evento a ser transformado (`0` = evento atual) | Sim |

**Passo 2 - Template de Transformacao:**

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Template Name` | Texto | Nome do template | Nao |
| `Map ID` | Inteiro | ID do mapa do evento template | Sim |
| `Event ID` | Inteiro | ID do evento template | Sim |
| `Preserve Morph` | Booleano | Preservar morph ao trocar de mapa? | Nao |

### Morph Event: Remove

Remove o efeito de morph de um evento, restaurando sua aparencia original.

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Map ID` | Inteiro | ID do mapa do evento | Sim |
| `Event ID` | Inteiro | ID do evento (`0` = evento atual) | Sim |
| `Remove Preservation` | Booleano | Remover tambem a preservacao do morph? | Nao |

### Notas Gerais

- **Spawn** cria novos eventos dinamicamente no mapa; **Morph** transforma eventos existentes.
- **Preserve Spawn/Morph** faz o efeito sobreviver a transicoes de mapa.
- O **Success Switch ID** no spawn permite criar logica condicional baseada no sucesso ou falha do spawn.
- Terrain Tags variam de 0 a 7 no RPG Maker MZ.
- Region IDs podem ser consultados no editor de mapa (modo Region).
