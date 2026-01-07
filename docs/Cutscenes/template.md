# 📝 Design de Cutscene: [Nome da Cena]

**ID da Cena:** `nome_da_cena_no_csv` (ex: opening, battle_intro)
**Local:** [Nome do Mapa]
**Personagens Envolvidos:**

* [Nome] (ID: `lucas`)
* [Nome] (ID: `maria`)
* [Nome] (ID: `camera`)

---

## 🎞️ Roteiro de Ações

| Scene (ID) | Character (ID) | Action | Details (Parâmetros) | Wait (true/false) | 📝 Notas de Direção |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `nome_cena` | `camera` | `cinematic` | `true, true` | `true` | Inicia barras pretas |
| `nome_cena` | `camera` | `bgm` | `play, NOME_MUSICA, 90, true` | `true` | Toca música tema |
| `nome_cena` | `camera` | `focus on` | `ID_DO_PERSONAGEM` | `true` | Foca no protagonista |
| `nome_cena` | `ID_CHAR` | `move` | `x, y` | `true` | Move para posição inicial |
| `nome_cena` | `ID_CHAR` | `balloon` | `1` | `true` | Exclamação (!) |
| `nome_cena` | `ID_CHAR` | `talk` | `"Texto do diálogo aqui."` | `true` | Fala inicial |
| `nome_cena` | `ID_CHAR` | `move` | `x, y` | `false` | Move enquanto fala... |
| `nome_cena` | `ID_CHAR` | `talk` | `"Falo andando."` | `true` | ...termina de falar |
| `nome_cena` | `camera` | `cinematic` | `false, true` | `true` | Fim da cena |

---

## 📚 Referência Rápida de Comandos (Cutscene Director Pro)

### 🎥 Câmera & Visual

* **Foco:** `focus on` | [cite_start]*Detalhes:* `character_id` [cite: 56]
* **Zoom:** `zoom` ou `focus zoom` | [cite_start]*Detalhes:* `in` ou `out` [cite: 57, 58]
* **Barras Pretas:** `cinematic` | [cite_start]*Detalhes:* `true` (ativar) ou `false` (desativar) [cite: 58]
* **Tremer:** `shake` | [cite_start]*Detalhes:* (vazio) [cite: 52]
* **Flash:** `flash` | [cite_start]*Detalhes:* `r,g,b,duration` (ex: `255,255,255,30`) [cite: 53]
* **Tom:** `tone` | [cite_start]*Detalhes:* `r,g,b,gamma,duration` [cite: 54]

### 🎭 Personagem

* **Mover:** `move` | [cite_start]*Detalhes:* `x,y` [cite: 42]
* **Teleportar:** `teleport` | [cite_start]*Detalhes:* `x,y` [cite: 44]
* **Virar:** `turn` | [cite_start]*Detalhes:* `up`, `down`, `left`, `right` [cite: 43]
* **Falar:** `talk` | [cite_start]*Detalhes:* `"Texto entre aspas"` (Obrigatório aspas se usar vírgula) [cite: 46, 160]
* **Balão:** `balloon` | [cite_start]*Detalhes:* ID do ícone (1-8) [cite: 47]
* **Transparência:** `transparent` | [cite_start]*Detalhes:* `true` ou `false` [cite: 44]

### 🔊 Áudio

* **Música:** `bgm` | [cite_start]*Detalhes:* `play, filename, volume, loop` ou `fadeOut, duration` [cite: 60]
* **Som:** `sound` | [cite_start]*Detalhes:* `filename` (SE) [cite: 49]
* **Voz:** `voice` | [cite_start]*Detalhes:* `filename` [cite: 50]

### ⚙️ Sistema

* **Variável:** `var` | [cite_start]*Detalhes:* `ID, valor` [cite: 62]
* **Switch:** `switch` | [cite_start]*Detalhes:* `ID, on/off` [cite: 63]
* **Common Event:** `callCommon` | [cite_start]*Detalhes:* `ID` [cite: 64]
* **Espera Manual:** `wait` | [cite_start]*Detalhes:* `frames` [cite: 66]

---
