# Integração com Skill Learn System

## Visão Geral

O Skill Learn System (VisuStella MZ) oferece uma **via alternativa** de aprendizado de passivos. Em vez de cumprir condições orgânicas, atores podem **comprar** passivos diretamente usando recursos do jogo.

**Requisito**: VisuMZ_2_SkillLearnSystem instalado.

## Diferença Fundamental

| Aspecto | Unlock Conditions | Skill Learn System |
|---------|-------------------|-------------------|
| Como aprende | Cumpre condições durante gameplay | Paga recursos (AP/SP/JP/itens) |
| Requer listing | Learnable notetag | Learn Passive notetag (Class) |
| Condições obrigatórias | Sim | **Não** - bypass automático |
| Progresso visível | Condições com barra de progresso | Custo visível diretamente |
| Timing | Automático quando condições atendidas | Manual no menu |

## Moedas Aceitas

| Moeda | Notetag | Requer |
|-------|---------|--------|
| AP (Ability Points) | `<Learn AP Cost: x>` | Skill Learn System |
| SP (Skill Points) | `<Learn SP Cost: x>` | Skill Learn System |
| CP (Class Points) | `<Learn CP Cost: x>` | + Class Change System |
| JP (Job Points) | `<Learn JP Cost: x>` | + Class Change System |
| Gold | `<Learn Gold Cost: x>` | Skill Learn System |
| Items | `<Learn Item id Cost: x>` | Skill Learn System |
| Weapons | `<Learn Weapon id Cost: x>` | Skill Learn System |
| Armors | `<Learn Armor id Cost: x>` | Skill Learn System |

## Listagem no Skill Learn System

Passivos são listados no Skill Learn System via notetags nas **Classes**:

```xml
<!-- No Class (notetag) -->
<Learn Passive: id>
<Learn Passives: id, id, id>
<Learn Passives>
 id
 name
</Learn Passives>
```

**Importante**: Passivos no Skill Learn System **não aparecem** automaticamente na lista de unlearned do menu Passives, a menos que também tenham notetags learnable.

## Condições de Visibilidade e Requisitos

O Skill Learn System suporta condições para mostrar e habilitar passivos no menu:

### Show (visível mas bloqueado)
| Notetag | Descrição |
|---------|-----------|
| `<Learn Show Level: x>` | Requer level x para aparecer |
| `<Learn Show Skill: id>` | Requer ter aprendido skill para aparecer |
| `<Learn Show Switch: x>` | Requer switch ON para aparecer |

### Require (habilitado para compra)
| Notetag | Descrição |
|---------|-----------|
| `<Learn Require Level: x>` | Requer level x para comprar |
| `<Learn Require Skill: id>` | Requer ter aprendido skill para comprar |
| `<Learn Require Switch: x>` | Requer switch ON para comprar |

## Animação de Aprendizado

```xml
<!-- No State (notetag) -->
<Learn Skill Animation: id>       <!-- Animação ao aprender -->
<Learn Skill Fade Speed: x>       <!-- Velocidade do fade-in do ícone -->
<Learn Skill Picture: filename>   <!-- Imagem customizada em vez de ícone -->
<Picture: filename>               <!-- Imagem para outros plugins também -->
```

## Uso Combinado

É possível ter passivos em **ambos os sistemas** simultaneamente:
- Alguns passivos exclusivos do Skill Learn System
- Outros exclusivos via unlock conditions
- Ou passivos disponíveis em ambos (o primeiro método completado aprende)
