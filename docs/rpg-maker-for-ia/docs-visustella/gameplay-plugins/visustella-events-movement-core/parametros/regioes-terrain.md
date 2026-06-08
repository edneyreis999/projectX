# Region Rulings, Common Event on OK/Touch e Terrain Tag Settings

---

## Region Rulings

Configuracoes de regioes (0-255) que controlam permissoes e restricoes de passagem. As regioes sao definidas na camada de regioes do editor de mapas do RPG Maker MZ.

---

### Allow Regions (Regioes Permitidas)

Regioes onde a passagem e **permitida**, mesmo que o tile originalmente nao seja passavel.

| Parametro | Descricao |
|-----------|-----------|
| All Allow | Permite passagem geral para a regiao especificada |
| Walk Allow | Permite caminhada na regiao |
| Player Allow | Permite passagem do jogador |
| Event Allow | Permite passagem de eventos |
| Vehicle Allow | Permite passagem de todos os veiculos |
| Boat Allow | Permite passagem do barco |
| Ship Allow | Permite passagem do navio |
| Airship Allow | Permite passagem da aeronave |

Cada parametro aceita uma lista de IDs de regiao (0-255).

---

### Forbid Regions (Regioes Proibidas)

Regioes onde a passagem e **bloqueada**, mesmo que o tile originalmente seja passavel.

| Parametro | Descricao |
|-----------|-----------|
| All Forbid | Bloqueia passagem geral para a regiao especificada |
| Walk Forbid | Bloqueia caminhada na regiao |
| Player Forbid | Bloqueia passagem do jogador |
| Event Forbid | Bloqueia passagem de eventos |
| Vehicle Forbid | Bloqueia passagem de todos os veiculos |
| Boat Forbid | Bloqueia passagem do barco |
| Ship Forbid | Bloqueia passagem do navio |
| Airship Forbid | Bloqueia passagem da aeronave |

Cada parametro aceita uma lista de IDs de regiao (0-255).

---

### Dock Regions (Regioes de Ancoragem)

Regioes onde veiculos podem ancorar (dock) ao pousar.

| Parametro | Descricao |
|-----------|-----------|
| Vehicle Dock | Regioes onde qualquer veiculo pode ancorar |
| Boat Dock | Regioes onde o barco pode ancorar |
| Ship Dock | Regioes onde o navio pode ancorar |
| Airship Dock | Regioes onde a aeronave pode ancorar |
| Only Region Dockable | Quando ativado, veiculos so podem ancorar em regioes designadas como dock |

Cada parametro de dock aceita uma lista de IDs de regiao (0-255).

> **Nota:** `Only Region Dockable` e um booleano global que restringe o ancoragem exclusivamente as regioes de dock definidas acima.

---

## Common Event on OK Button

Configura Common Events que sao ativados ao pressionar o botao OK (Enter/Espaço) estando sobre ou em frente a tiles marcados com regioes.

### Regioes

| Parametro | Tipo | Descricao |
|-----------|------|-----------|
| Regions 1-255 | Inteiro | ID do Common Event a ser ativado para cada regiao (0 = nenhum) |

### Target Tile (Tile Alvo)

Define qual tile sera verificado ao pressionar OK.

| Opcao | Descricao |
|-------|-----------|
| Tile in front of player | Verifica o tile **a frente** do jogador (direcao em que esta olhando) |
| Tile player is standing on | Verifica o tile **onde o jogador esta pisando** |

---

## Common Event on Touch

Common Events acionados automaticamente ao pisar em tiles marcados com regioes especificas. Usado para pisos de dano, armadilhas, teletransportes e outros efeitos por toque.

> **AVISO:** Areas com touch events ativos **nao permitem** encontros aleatorios (random encounters). Isso evita conflitos entre o evento de toque e a batalha.

### Regioes

| Parametro | Tipo | Descricao |
|-----------|------|-----------|
| Regions 1-255 | Inteiro | ID do Common Event a ser ativado ao pisar na regiao (0 = nenhum) |

---

## Terrain Tag Settings

Terrain Tags sao usados no **Database > Tilesets** para marcar tiles com propriedades especificas. Cada tile pode receber um terrain tag numerico.

### Terrain Tag ID's

| Parametro | Tipo | Descricao |
|-----------|------|-----------|
| Rope | Inteiro | Numero do terrain tag que identifica tiles de corda/escada interativos |

> **Uso:** Ao definir o terrain tag de um tile como o valor configurado em `Rope`, o sistema reconhece esse tile como uma corda, ativando comportamentos especificos como animacao de escalada e restricoes de movimento.

---

## Resumo de IDs de Regiao

| Faixa de Regiao | Uso |
|-----------------|-----|
| 0 | Sem regiao (padrao) |
| 1-255 | Disponivel para Allow, Forbid, Dock, OK Button e Touch |
| 0 (em Common Event) | Desativa o trigger para aquela regiao |

> **Boa pratica:** Organize regioes por categoria (ex: 1-50 para passagem, 51-100 para triggers, 101-150 para docks) para evitar conflitos entre Allow/Forbid e Common Events.
