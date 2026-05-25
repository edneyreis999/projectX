# API JavaScript

## Funcoes de Drawing

### Ability Points

```javascript
// Desenhar valor de AP
this.drawAbilityPoints(value, x, y, width, align);

// Desenhar AP de um ator para uma classe
this.drawActorAbilityPoints(actor, classID, x, y, width, align);
```

### Skill Points

```javascript
// Desenhar valor de SP
this.drawSkillPoints(value, x, y, width, align);

// Desenhar SP de um ator para uma classe
this.drawActorSkillPoints(actor, classID, x, y, width, align);
```

### Parametros Comuns

| Param | Tipo | Descricao |
|-------|------|-----------|
| `value` | number | Valor numerico a exibir |
| `actor` | Game_Actor | Objeto do ator |
| `classID` | number | ID da classe. 0 = classe atual ou compartilhado |
| `x` | number | Coordenada X |
| `y` | number | Coordenada Y |
| `width` | number | Largura da area de desenho |
| `align` | string | 'left', 'center', ou 'right' |

---

## Variaveis em JS Notetags

### Custos Dinamicos
```javascript
// Disponivel em: <JS Learn AP/SP/CP/JP Cost>
user   // Game_Actor - ator que vai aprender
skill  // Object - skill sendo aprendida
cost   // number - RETORNO: custo calculado
```

### Condicoes de Exibicao
```javascript
// Disponivel em: <JS Learn Show>
user     // Game_Actor
skill    // Object
visible  // boolean - RETORNO: true para mostrar
```

```javascript
// Disponivel em: <JS Learn Show List/Detail Text>
user  // Game_Actor
skill // Object
text  // string - RETORNO: texto customizado
```

### Condicoes de Requisito
```javascript
// Disponivel em: <JS Learn Requirements>
user    // Game_Actor
skill   // Object
enabled // boolean - RETORNO: true para habilitar
```

```javascript
// Disponivel em: <JS Learn Requirements List/Detail Text>
user  // Game_Actor
skill // Object
text  // string - RETORNO: texto customizado
```

### Ao Aprender
```javascript
// Disponivel em: <JS On Learn Skill>
user  // Game_Actor - ator aprendendo
skill // Object - skill sendo aprendida
// Sem retorno - executar acoes desejadas
```
