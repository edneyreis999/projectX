# Notetags de Mapa — VisuStella Events & Movement Core

Notetags aplicadas diretamente nas configuracoes de nota do mapa. Afetam todo o mapa independentemente de eventos ou paginas.

---

## 1. Movimento Diagonal

Habilita ou desabilita o movimento diagonal dos personagens no mapa.

### `<Diagonal Movement: On>`

```text
<Diagonal Movement: On>
```

Ativa o movimento diagonal para este mapa especifico, permitindo que o jogador e eventos se movam nas 8 direcoes.

### `<Diagonal Movement: Off>`

```text
<Diagonal Movement: Off>
```

Desativa o movimento diagonal para este mapa, restringindo o movimento a 4 direcoes (cima, baixo, esquerda, direita).

**Notas de uso:**
- Substitui a configuracao global de movimento diagonal para este mapa.
- Pode ser trocado dinamicamente via eventos se necessário, mas a notetag e avaliada no carregamento do mapa.

---

## 2. Controle de Regiao

Define regioes que permitem ou proibem passagem, e regioes de ancoragem para veiculos. Todas as notetags de regiao suportam multiplos valores separados por virgula.

### `<type Allow Region: x>`

```text
<Walk Allow Region: 1>
<Player Allow Region: 2, 3, 4>
<Event Allow Region: 5>
<Vehicle Allow Region: 6, 7>
<Boat Allow Region: 8>
<Ship Allow Region: 9>
<Airship Allow Region: 10>
<All Allow Region: 11, 12>
```

Permite passagem no(s) tile(s) marcado(s) com a regiao especificada, mesmo que o tile originalmente nao permita passagem.

**Tipos disponiveis:**

| Tipo       | Afeta                          |
|------------|--------------------------------|
| `All`      | Todos (jogador, eventos, veiculos) |
| `Walk`     | Jornada a pe (jogador + eventos) |
| `Player`   | Apenas o jogador               |
| `Event`    | Apenas eventos                 |
| `Vehicle`  | Todos os veiculos              |
| `Boat`     | Apenas barco                   |
| `Ship`     | Apenas navio                   |
| `Airship`  | Apenas aeronave                |

### `<type Forbid Region: x>`

```text
<Walk Forbid Region: 1>
<Player Forbid Region: 2, 3>
<Event Forbid Region: 5>
<Vehicle Forbid Region: 6>
<All Forbid Region: 11, 12>
```

Proibe passagem no(s) tile(s) marcado(s) com a regiao especificada, mesmo que o tile originalmente permita passagem.

**Mesmos tipos disponiveis** da notetag `Allow Region`.

### `<type Dock Region: x>`

```text
<Boat Dock Region: 1>
<Ship Dock Region: 2, 3>
<Airship Dock Region: 4>
<Vehicle Dock Region: 5>
```

Define regioes onde veiculos podem ancorar/desembarcar. Sem essa notetag, veiculos so podem ancorar em tiles de praia/terra conforme regras padrao do RPG Maker.

**Tipos disponiveis:** `Boat`, `Ship`, `Airship`, `Vehicle`.

**Notas de uso:**
- Regioes `Allow` e `Forbid` conflitantes no mesmo tile: `Forbid` tem prioridade.
- `Dock Region` e independente de `Allow`/`Forbid`.
- Valores de regiao vao de 1 a 255.

---

## 3. Common Events ao Carregar Mapa

Executa Common Events automaticamente quando o mapa e carregado.

### `<Map Load Common Event: x>`

```text
<Map Load Common Event: 5>
```

Executa o Common Event de ID `x` toda vez que o mapa e carregado (transicao de mapa diferente).

### `<Map Load Common Events: x, x, x>`

```text
<Map Load Common Events: 3, 7, 12>
```

Executa multiplos Common Events em sequencia ao carregar o mapa.

**Notas de uso:**
- **NAO** e acionado em transferencias dentro do mesmo mapa (same-map transfers).
- Os Common Events executam na ordem listada, antes do fade-in.
- Uso tipico: configurar variaveis do mapa, spawnar eventos dinamicos, tocar musica ambiente.

---

## 4. Salvar Localizacoes de Eventos

### `<Save Event Locations>`

```text
<Save Event Locations>
```

Salva as posicoes de **todos** os eventos do mapa. Quando o jogador sair e retornar ao mapa, os eventos estarao nas posicoes salvas em vez de suas posicoes originais.

**Notas de uso:**
- Aplica-se a todos os eventos do mapa automaticamente.
- Para salvar apenas eventos especificos, use a notetag `<Save Event Location>` no evento individual (ver `eventos.md`).
- As posicoes sao salvas no save file do jogador.

---

## 5. Visibilidade do Jogador

Controla se o sprite do jogador e visivel no mapa.

### `<Hide Player>`

```text
<Hide Player>
```

Forca a ocultacao do sprite do jogador. Tem prioridade sobre comandos de evento `Change Transparency`.

### `<Show Player>`

```text
<Show Player>
```

Forca a exibicao do sprite do jogador. Tem prioridade sobre comandos de evento.

**Notas de uso:**
- Mutuamente exclusivas: usar ambas no mesmo mapa causara comportamento indefinido.
- Afeta tambem os seguidores (followers) quando o jogador e ocultado/exibido.
- A prioridade e: notetag > comando de evento > configuracao padrao.

---

## 6. Visibilidade dos Seguidores

Controla se os seguidores (party members following the player) sao visiveis.

### `<Hide Followers>`

```text
<Hide Followers>
```

Oculta os sprites dos seguidores independentemente da configuracao de formacao.

### `<Show Followers>`

```text
<Show Followers>
```

Exibe os sprites dos seguidores.

**Notas de uso:**
- Mutuamente exclusivas entre si.
- Independente de `<Hide Player>` / `<Show Player>` — controlam seguidores separadamente.
- Util para mapas onde apenas o jogador principal deve aparecer.

---

## 7. Notetags JavaScript

Executa codigo JavaScript customizado no carregamento ou saida do mapa.

### `<JS On Map Load> code </JS On Map Load>`

```text
<JS On Map Load>
$gameVariables.setValue(1, 0);
$gameSystem._weatherType = "none";
</JS On Map Load>
```

Executa o codigo JavaScript ao carregar o mapa, **antes** do fade-in completo.

**Notas de uso:**
- O codigo roda no contexto global do RPG Maker (acesso a `$gameVariables`, `$gameSwitches`, etc.).
- Executa toda vez que o mapa carrega, incluindo loads de save neste mapa.
- Ideal para inicializar variaveis de cena ou resetar estados.

### `<JS On Map Exit> code </JS On Map Exit>`

```text
<JS On Map Exit>
$gameVariables.setValue(2, $gameMap eventId());
</JS On Map Exit>
```

Executa o codigo JavaScript ao sair do mapa, **apos** o fade-out completo.

**Notas de uso:**
- O codigo roda apos a tela escurecer completamente.
- Util para limpar estados ou salvar dados antes da transicao.
- Executa mesmo em transicoes para menus de batalha (se aplicavel pelo contexto).
