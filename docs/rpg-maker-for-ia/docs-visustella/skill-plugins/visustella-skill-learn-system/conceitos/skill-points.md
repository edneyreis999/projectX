# Skill Points (SP)

## O que sao

Skill Points (SP) sao um recurso exclusivo de atores, introduzido pelo Skill Learn System, usado como moeda para aprender skills. Funciona de forma identica ao AP, porem como recurso separado.

## Caracteristicas

- **Recurso por ator**: cada ator tem seu proprio SP
- **Compartilhamento opcional**: SP pode ser compartilhado entre todas as classes ou individual por classe
- **Maximo configuravel**: pode ter limite ou ser ilimitado (0 = ilimitado)
- **Icone customizavel**: visivel em menus quando ha espaco (resolucao minima 1280x720 recomendada)

## Como Adquirir SP

| Fonte | Descricao | Configuracao |
|-------|-----------|-------------|
| Acao em batalha | Por hit de acao | Plugin Parameters > SP > Per Action Hit |
| Level Up | Ao subir de nivel | Plugin Parameters > SP > Per Level Up |
| Inimigo derrotado | Por inimigo derrotado | Plugin Parameters > SP > Per Enemy Defeated |
| Notetag em Skill/Item | Quando usado em batalha | `<SP Gain: x>` / `<User SP Gain: x>` |
| Notetag em Skill/Item (target) | Alvo recebe SP | `<Target SP Gain: x>` |
| Plugin Command | Ganho, adicao, perda, set | SP: Gain/Add/Lose/Set |

## Modificadores de Ganho

Os modificadores seguem a formula:

```
SP Final = (1 + Plus) * Rate + Flat
```

- **Plus** (`<SP Plus: +x%>`): soma aditivamente com outros Plus
- **Rate** (`<SP Rate: x%>`): multiplica com outros Rate
- **Flat** (`<SP Flat: +x%>`): soma aditivamente com outros Flat

**Importante**: modificadores NAO se aplicam quando SP e diretamente adicionado, perdido ou setado (Add/Lose/Set).

## Onde SP Aparece

- Menu de Skills (quando "Learn" esta selecionado)
- Tela de Vitoria (se configurado)
- Victory Aftermath (se plugin instalado)

## Funcoes JavaScript para Drawing

```javascript
// Dentro de um objeto Window
this.drawSkillPoints(value, x, y, width, align);
this.drawActorSkillPoints(actor, classID, x, y, width, align);
```

- `classID`: usar 0 para classe atual ou se SP e compartilhado
- `align`: 'left', 'center', ou 'right'
