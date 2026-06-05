# Script Calls

Script calls para usuarios com conhecimento JavaScript.

## Trait Set-Related

### battler.hasTraitSet(typeName)

Retorna `true` ou `false` se o battler possui um trait set especifico.

- Verifica todas as 10 categorias de trait set (elements, subelements, gender, race, nature, alignment, blessing, curse, zodiac, variant)
- Se qualquer uma corresponder, retorna `true`
- `battler` = `Game_Actor` ou `Game_Enemy`
- `typeName` = string com o nome do trait set (ex: 'male', 'female', 'goblin', 'human')

### Exemplos

```javascript
// Verificar se o ator 1 tem trait 'male'
$gameActors.actor(1).hasTraitSet('male')

// Verificar se o leader do party tem trait 'female'
$gameParty.leader().hasTraitSet('female')

// Verificar se o primeiro inimigo tem trait 'goblin'
$gameTroop.members()[0].hasTraitSet('goblin')
```

Veja tambem:
- [Trait Sets Conceito](../conceitos/trait-sets.md)
- [Trait Set Tipos](../parametros/trait-set-tipos.md)
