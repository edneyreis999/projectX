# Notetags - Skill Learn System Integration

Notetags para integração com o Skill Learn System (VisuMZ_2_SkillLearnSystem). Permitem comprar passivos em vez de cumprir condições.

**Requer**: VisuMZ_2_SkillLearnSystem instalado.

## Listagem no Skill Learn (Class Notetags)

```xml
<!-- Por ID -->
<Learn Passive: id>
<Learn Passives: id, id, id>

<!-- Por Nome -->
<Learn Passive: name>
<Learn Passives: name, name, name>

<!-- Múltiplas linhas -->
<Learn Passives>
  id
  id
  name
  name
</Learn Passives>
```
- Class Notetags
- Define quais passivos podem ser comprados pelo actor através desta classe

## Custos (State Notetags)

### Pontos

```xml
<Learn AP Cost: x>    <!-- Ability Points -->
<Learn SP Cost: x>    <!-- Skill Points -->
<Learn CP Cost: x>    <!-- Class Points (requer Class Change System) -->
<Learn JP Cost: x>    <!-- Job Points (requer Class Change System) -->
<Learn Gold Cost: x>  <!-- Gold -->
```

### Itens/Equipamentos

```xml
<Learn Item id Cost: x>       <!-- Por ID -->
<Learn Item name Cost: x>     <!-- Por Nome -->
<Learn Weapon id Cost: x>
<Learn Weapon name Cost: x>
<Learn Armor id Cost: x>
<Learn Armor name Cost: x>
```
- Múltiplas cópias da notetag são permitidas para custos combinados

## Condições de Show (visível mas travado)

```xml
<!-- Level mínimo para aparecer -->
<Learn Show Level: x>

<!-- Skill pré-requisito para aparecer -->
<Learn Show Skill: id>
<Learn Show All Skills: id, id, id>
<Learn Show Any Skills: id, id, id>

<!-- Switch para aparecer -->
<Learn Show Switch: x>
<Learn Show All Switches: x, x, x>
<Learn Show Any Switches: x, x, x>
```

| Variante | Lógica |
|----------|--------|
| `(vazio)` | Skill/switch específico |
| `All` | TODOS devem estar presentes |
| `Any` | QUALQUER um basta |

## Condições de Require (habilitado para compra)

```xml
<!-- Level mínimo para comprar -->
<Learn Require Level: x>

<!-- Skill pré-requisito para comprar -->
<Learn Require Skill: id>
<Learn Require All Skills: id, id, id>
<Learn Require Any Skills: id, id, id>

<!-- Switch para comprar -->
<Learn Require Switch: x>
<Learn Require All Switches: x, x, x>
<Learn Require Any Switches: x, x, x>
```

## Animação de Aprendizado

```xml
<!-- Animação(ões) ao aprender -->
<Learn Skill Animation: id>
<Learn Skill Animation: id, id, id>

<!-- Velocidade do fade-in do ícone -->
<Learn Skill Fade Speed: x>
<!-- Menor = mais lento, Maior = mais rápido -->

<!-- Imagem customizada em vez de ícone -->
<Learn Skill Picture: filename>
<Picture: filename>  <!-- versão genérica para outros plugins -->
<!-- filename sem extensão, arquivo em /img/pictures/ -->
```
