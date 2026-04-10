# Mechanics - Notetags

## Visão Geral
As Mechanics-Related Notetags consistem principalmente de **JavaScript Notetags** que permitem rodar código JavaScript em momentos específicos durante a batalha.

**Nota**: Todas as JavaScript Notetags Mechanics-Related foram documentadas em [`Enemy - Notetags`](./enemy.md#javascript-notetags-mechanics-related), pois elas são usadas principalmente por Enemy Notetags mas também podem ser usadas por Actor, Class, Weapon, Armor, e State Notetags.

## Categorias de Mechanics JavaScript Notetags

### Battle Lifecycle
- **JS Pre-Start Battle / JS Post-Start Battle** - No início da batalha
- **JS Pre-Start Turn / JS Post-Start Turn** - No início do turno
- **JS Pre-End Action / JS Post-End Action** - No final da ação
- **JS Pre-End Turn / JS Post-End Turn** - No final do turno
- **JS Pre-End Battle / JS Post-End Battle** - No final da batalha

### Action & Damage
- **JS Pre-Start Action / JS Post-Start Action** - No início da ação
- **JS Pre-Apply / JS Post-Apply** - Na aplicação do hit
- **JS Pre-Apply as User/Target** - Na aplicação do hit (como user/target)
- **JS Pre-Damage / JS Post-Damage** - Antes/depois do damage
- **JS Pre-Damage as User/Target** - Antes/depois do damage (como user/target)

### Regeneration
- **JS Pre-Regenerate / JS Post-Regenerate** - Na regeneração de HP/MP

### Battle Outcomes
- **JS Battle Victory** - Quando a batalha é vencida
- **JS Escape Success** - Quando a fuga tem sucesso
- **JS Escape Failure** - Quando a fuga falha
- **JS Battle Defeat** - Quando a batalha é perdida

## Uso

Todas estas notetags seguem o mesmo padrão:

```javascript
<JS Pre-Start Battle>
 code
 code
 code
</JS Pre-Start Battle>
```

### Variáveis Comuns
- **`user`** - Aquele afetado pelo trait object
- **`target`** - Aquele recebendo a skill/item hit (em notetags de action/damage)
- **`value`** - Damage sendo calculado ou dealt (em notetags de damage)

### Requisitos de Conhecimento
Estas notetags são destinadas a usuários com **conhecimento de JavaScript**. Como você usa estas é inteiramente sua responsabilidade e dependerá de sua habilidade de entender o código usado e driven para cada caso.

## Ver Também

- [Enemy - Notetags](./enemy.md#javascript-notetags-mechanics-related) - Documentação completa de todas as Mechanics JavaScript Notetags
- [Parâmetros: Mechanics Settings](../parametros/mechanics.md) - Configurações globais de Mechanics
- [Conceitos: Visão Geral](../conceitos/visao-geral.md) - Visão geral do Battle Core
