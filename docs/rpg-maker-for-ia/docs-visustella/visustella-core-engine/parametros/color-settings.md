# Plugin Parameters: Color Settings

Controle sobre cores usadas no jogo. Usa numeros para cores do Window Skin ou `#rrggbb` para hex codes.

Se o Window Skin for trocado mid-game, as cores ainda usarao o Window Skin default (cache para reduzir lag).

## Basic Colors
Cores globais que raramente mudam:

| Parametro | Uso |
|-----------|-----|
| Normal | Texto padrao |
| System | Texto de sistema |
| Crisis | Texto de estado critico |
| Death | Texto de morte |
| Gauge Back | Fundo de gauges |
| HP Gauge | Cor do gauge de HP |
| MP Gauge | Cor do gauge de MP |
| MP Cost | Cor do custo de MP |
| Power Up | Texto de buff |
| Power Down | Texto de debuff |
| CT Gauge | Cor do gauge de CT |
| TP Gauge | Cor do gauge de TP |
| Pending Color | Cor pendente |
| EXP Gauge | Cor do gauge de EXP |
| MaxLv Gauge | Cor do gauge de level max |

## Alpha Colors
Cores com transparencia, formato `rgba(red, green, blue, alpha)`:
- red/green/blue: 0-255 (integer)
- alpha: 0-1 (decimal)

| Parametro | Uso |
|-----------|-----|
| Window Font Outline | Outline do texto nas janelas |
| Gauge Number Outline | Outline dos numeros de gauge |
| Dim Color | Cor de dimming |
| Item Back Color | Cor de fundo de items |

## Conditional Colors (JavaScript)
Determinam cores baseadas em condicoes. Requer conhecimento JS.

| Parametro | Uso |
|-----------|-----|
| JS: Actor HP Color | Determina cor de HP para actors |
| JS: Actor MP Color | Determina cor de MP para actors |
| JS: Actor TP Color | Determina cor de TP para actors |
| JS: Parameter Change | Cor para mudancas de parametro |
| JS: Damage Colors | Cor para tipos de dano |
