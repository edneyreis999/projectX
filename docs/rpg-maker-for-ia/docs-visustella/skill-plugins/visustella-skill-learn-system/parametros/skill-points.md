# Parametros - Skill Points Settings

## Mechanics
- **Shared Skill Points**: Compartilhar SP entre todas as classes ou ter SP individual por classe.
- **Maximum**: Quantidade maxima de SP. Usar 0 para ilimitado.

## Visual
- **Show In Menus?**: Exibir SP em menus compativeis. Requer resolucao minima de 1280x720.
- **Icon**: Icone para representar SP.

## Vocabulary
- **Full Text**: Texto completo (ex: "Skill Points").
- **Abbreviated Text**: Abreviacao (ex: "SP").
- **Menu Text Format**: Formato de exibicao. `%1` = Valor, `%2` = Abbr, `%3` = Icone, `%4` = Texto completo.

## Gain

| Configuracao | Descricao | Aceita JS? |
|-------------|-----------|-----------|
| Per Action Hit | SP ganho por hit de acao | Sim |
| Per Level Up | SP ganho por level up | Sim |
| Per Enemy Defeated | SP ganho por inimigo derrotado | Sim |

- **Alive Actors?** (sub-opcao de Per Enemy Defeated): Atores precisam estar vivos para receber SP de inimigos derrotados.

## Victory
- **Show During Victory?**: Mostrar SP ganho durante a tela de vitoria.
- **Victory Text**: Texto exibido sem Victory Aftermath. `%1` = Ator, `%2` = Ganho, `%3` = Abbr, `%4` = Texto completo.
- **Aftermath Display?** (requer VisuMZ_3_VictoryAftermath): Mostrar SP como recurso principal nas janelas de atores.
- **Aftermath Text**: Texto no Victory Aftermath. `%1` = Ganho, `%2` = Abbr, `%3` = Texto completo.

## Funcoes JavaScript para Drawing

```javascript
// Desenhar valor de SP diretamente
this.drawSkillPoints(value, x, y, width, align);

// Desenhar SP de um ator para uma classe especifica
this.drawActorSkillPoints(actor, classID, x, y, width, align);
```
- `classID`: 0 para classe atual ou se SP e compartilhado
- `align`: 'left', 'center', 'right'
