# Condições de Unlock

## Como Funcionam

Atores com passivos **learnable** (listados via notetag) podem cumpri-los durante o gameplay. Quando TODAS as condições de um passivo são atendidas, ele é aprendido automaticamente.

**Importante**: O contador de condições começa no momento em que o passivo é listado como learnable, NÃO retroativo.

## Categorias de Condições

### Level
| Notetag | Descrição |
|---------|-----------|
| `<Equip Passive Learn Level: x>` | Actor deve alcançar level x |

### Resultados de Batalha
| Notetag | Descrição |
|---------|-----------|
| `<Equip Passive Learn Battles: x>` | Participar de x batalhas |
| `<Equip Passive Learn Victories: x>` | Vencer x batalhas |
| `<Equip Passive Learn Escapes: x>` | Fugir de x batalhas |
| `<Equip Passive Learn Defeats: x>` | Perder x batalhas |

### Ações em Batalha
| Notetag | Descrição |
|---------|-----------|
| `<Equip Passive Learn Attack Times: x>` | Atacar x vezes |
| `<Equip Passive Learn Guard Times: x>` | Defender x vezes |
| `<Equip Passive Learn Use Skills: x>` | Usar x skills (qualquer tipo) |
| `<Equip Passive Learn Use Physical Skills: x>` | Usar x skills físicas |
| `<Equip Passive Learn Use Magical Skills: x>` | Usar x skills mágicas |
| `<Equip Passive Learn Use Certain Hit Skills: x>` | Usar x skills certain hit |
| `<Equip Passive Learn Use Items: x>` | Usar x itens |

### Skill Type Específico
| Notetag | Descrição |
|---------|-----------|
| `<Equip Passive Learn SType id: x>` | Usar x skills do tipo (por ID) |
| `<Equip Passive Learn SType name: x>` | Usar x skills do tipo (por nome) |

### Críticos e Evasão
| Notetag | Descrição |
|---------|-----------|
| `<Equip Passive Learn Inflict Critical Times: x>` | Causar x críticos |
| `<Equip Passive Learn Receive Critical Times: x>` | Receber x críticos |
| `<Equip Passive Learn Miss Times: x>` | Errar x ataques |
| `<Equip Passive Learn Evade Times: x>` | Esquivar x ataques |

### Elementos
| Notetag | Descrição |
|---------|-----------|
| `<Equip Passive Learn Inflict Element id Damage: x>` | Causar x danos elementais (por ID) |
| `<Equip Passive Learn Inflict Element name Damage: x>` | Causar x danos elementais (por nome) |
| `<Equip Passive Learn Receive Element id Damage: x>` | Receber x danos elementais (por ID) |
| `<Equip Passive Learn Receive Element name Damage: x>` | Receber x danos elementais (por nome) |

### States
| Notetag | Descrição |
|---------|-----------|
| `<Equip Passive Learn Inflict State id: x>` | Causar state x vezes (por ID) |
| `<Equip Passive Learn Inflict State name: x>` | Causar state x vezes (por nome) |
| `<Equip Passive Learn Receive State id: x>` | Receber state x vezes (por ID) |
| `<Equip Passive Learn Receive State name: x>` | Receber state x vezes (por nome) |

### Traits (requer Elements and Status Menu Core)
| Notetag | Descrição |
|---------|-----------|
| `<Equip Passive Learn Defeat name Trait: x>` | Derrotar x inimigos com trait set específico |

### Dano e Cura Total
| Notetag | Descrição |
|---------|-----------|
| `<Equip Passive Learn Inflict Total Damage: x>` | Causar x de dano total |
| `<Equip Passive Learn Receive Total Damage: x>` | Receber x de dano total |
| `<Equip Passive Learn Inflict Total Healing: x>` | Causar x de cura total |
| `<Equip Passive Learn Receive Total Healing: x>` | Receber x de cura total |

### Kills, Deaths, Assists
| Notetag | Descrição |
|---------|-----------|
| `<Equip Passive Learn Kill Count: x>` | Matar x inimigos diretamente |
| `<Equip Passive Learn Death Count: x>` | Morrer x vezes |
| `<Equip Passive Learn Assist Count: x>` | Estar presente em x mortes de inimigos |

### Recursos e Parâmetros
| Notetag | Descrição |
|---------|-----------|
| `<Equip Passive Learn Have Gold: x>` | Ter x gold no momento |
| `<Equip Passive Learn Have Item id: x>` | Ter x unidades do item (por ID) |
| `<Equip Passive Learn Have Weapon id: x>` | Ter x unidades da arma (por ID) |
| `<Equip Passive Learn Have Armor id: x>` | Ter x unidades do equipamento (por ID) |
| `<Equip Passive Learn Reach Param name: x>` | Alcançar x no parâmetro base (MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK) |
| `<Equip Passive Learn Reach XParam name: x%>` | Alcançar x% no X-Param (HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG) |
| `<Equip Passive Learn Reach SParam name: x%>` | Alcançar x% no S-Param (TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR) |

## Texto Customizado de Condição

```xml
<!-- No State (notetag) -->
<Equip Passive Learn Condition Text>
  texto personalizado
  para exibição no help window
</Equip Passive Learn Condition Text>
```

Se não definido, o plugin gera automaticamente usando os Plugin Parameters de formato.
