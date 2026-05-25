# Ability Points (AP)

## O que sao

Ability Points (AP) sao um recurso exclusivo de atores, introduzido pelo Skill Learn System, usado como moeda para aprender skills.

## Caracteristicas

- **Recurso por ator**: cada ator tem seu proprio AP
- **Compartilhamento opcional**: AP pode ser compartilhado entre todas as classes ou individual por classe
- **Maximo configuravel**: pode ter limite ou ser ilimitado (0 = ilimitado)
- **Icone customizavel**: visivel em menus quando ha espaco (resolucao minima 1280x720 recomendada)

## Como Adquirir AP

| Fonte | Descricao | Configuracao |
|-------|-----------|-------------|
| Acao em batalha | Por hit de acao | Plugin Parameters > AP > Per Action Hit |
| Level Up | Ao subir de nivel | Plugin Parameters > AP > Per Level Up |
| Inimigo derrotado | Por inimigo derrotado | Plugin Parameters > AP > Per Enemy Defeated |
| Notetag em Skill/Item | Quando usado em batalha | `<AP Gain: x>` / `<User AP Gain: x>` |
| Notetag em Skill/Item (target) | Alvo recebe AP | `<Target AP Gain: x>` |
| Plugin Command | Ganho, adicao, perda, set | AP: Gain/Add/Lose/Set |

## Modificadores de Ganho

Os modificadores seguem a formula:

```
AP Final = (1 + Plus) * Rate + Flat
```

- **Plus** (`<AP Plus: +x%>`): soma aditivamente com outros Plus
- **Rate** (`<AP Rate: x%>`): multiplica com outros Rate
- **Flat** (`<AP Flat: +x%>`): soma aditivamente com outros Flat

**Importante**: modificadores NAO se aplicam quando AP e diretamente adicionado, perdido ou setado (Add/Lose/Set).

## Onde AP Aparece

- Menu de Skills (quando "Learn" esta selecionado)
- Tela de Vitoria (se configurado)
- Victory Aftermath (se plugin instalado)

## Funcoes JavaScript para Drawing

```javascript
// Dentro de um objeto Window
this.drawAbilityPoints(value, x, y, width, align);
this.drawActorAbilityPoints(actor, classID, x, y, width, align);
```

- `classID`: usar 0 para classe atual ou se AP e compartilhado
- `align`: 'left', 'center', ou 'right'
