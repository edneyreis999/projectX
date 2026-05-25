# Parametros - Ability Points Settings

## Mechanics
- **Shared Ability Points**: Compartilhar AP entre todas as classes ou ter AP individual por classe.
- **Maximum**: Quantidade maxima de AP. Usar 0 para ilimitado.

## Visual
- **Show In Menus?**: Exibir AP em menus compativeis. Requer resolucao minima de 1280x720.
- **Icon**: Icone para representar AP.

## Vocabulary
- **Full Text**: Texto completo (ex: "Ability Points").
- **Abbreviated Text**: Abreviacao (ex: "AP").
- **Menu Text Format**: Formato de exibicao. `%1` = Valor, `%2` = Abbr, `%3` = Icone, `%4` = Texto completo.

## Gain

| Configuracao | Descricao | Aceita JS? |
|-------------|-----------|-----------|
| Per Action Hit | AP ganho por hit de acao | Sim |
| Per Level Up | AP ganho por level up | Sim |
| Per Enemy Defeated | AP ganho por inimigo derrotado | Sim |

- **Alive Actors?** (sub-opcao de Per Enemy Defeated): Atores precisam estar vivos para receber AP de inimigos derrotados.

## Victory
- **Show During Victory?**: Mostrar AP ganho durante a tela de vitoria.
- **Victory Text**: Texto exibido sem Victory Aftermath. `%1` = Ator, `%2` = Ganho, `%3` = Abbr, `%4` = Texto completo.
- **Aftermath Display?** (requer VisuMZ_3_VictoryAftermath): Mostrar AP como recurso principal nas janelas de atores.
- **Aftermath Text**: Texto no Victory Aftermath. `%1` = Ganho, `%2` = Abbr, `%3` = Texto completo.

## Funcoes JavaScript para Drawing

```javascript
// Desenhar valor de AP diretamente
this.drawAbilityPoints(value, x, y, width, align);

// Desenhar AP de um ator para uma classe especifica
this.drawActorAbilityPoints(actor, classID, x, y, width, align);
```
- `classID`: 0 para classe atual ou se AP e compartilhado
- `align`: 'left', 'center', 'right'
