# Notetags - Referência Rápida

## Índice por Alvo

### State Notetags
| Notetag | Categoria | Descrição |
|---------|-----------|-----------|
| `<Equip Passive Cost: x>` | Setup | Custo de capacidade |
| `<Equip Passive Icon: x>` | Setup | Ícone customizado |
| `<Equip Passive Name: name>` | Setup | Nome customizado |
| `<Help Description>` | Setup | Texto de ajuda |
| `<Branch Learn Equip Passive: id>` | Setup | Branch direto |
| `<Branch Learnable Equip Passive: id>` | Setup | Branch learnable |
| `<Mask If Not Learned Equip Passive>` | Masking | Forçar máscara |
| `<No Mask If Not Learned Equip Passive>` | Masking | Forçar visível |
| `<Equip Passive Mask Name: name>` | Masking | Nome mascarado customizado |
| `<Hide If Not Learned Equip Passive>` | Hiding | Sempre oculto |
| `<Hide If Learned Equip Passive: id>` | Hiding | Oculto se aprendido |
| `<Equip Passive Learn Condition Text>` | Unlock | Texto customizado de condição |
| `<Equip Passive Learn Level: x>` | Unlock | Requer level |
| `<Equip Passive Learn Battles/Victories/Escapes/Defeats: x>` | Unlock | Resultados de batalha |
| `<Equip Passive Learn Attack/Guard Times: x>` | Unlock | Ações básicas |
| `<Equip Passive Learn Use Skills/Items: x>` | Unlock | Uso de skills/itens |
| `<Equip Passive Learn Inflict/Receive Critical Times: x>` | Unlock | Críticos |
| `<Equip Passive Learn Inflict/Receive Element id Damage: x>` | Unlock | Dano elemental |
| `<Equip Passive Learn Inflict/Receive State id: x>` | Unlock | States |
| `<Equip Passive Learn Defeat name Trait: x>` | Unlock | Trait set kills |
| `<Equip Passive Learn Inflict/Receive Total Damage/Healing: x>` | Unlock | Dano/cura total |
| `<Equip Passive Learn Kill/Death/Assist Count: x>` | Unlock | Kills/deaths/assists |
| `<Equip Passive Learn Have Gold/Item/Weapon/Armor: x>` | Unlock | Recursos |
| `<Equip Passive Learn Reach Param/XParam/SParam: x>` | Unlock | Parâmetros |
| `<Learn AP/SP/CP/JP/Gold Cost: x>` | SLS | Custos de compra |
| `<Learn Item/Weapon/Armor id Cost: x>` | SLS | Custos em itens |
| `<Learn Show Level/Skill/Switch: x>` | SLS | Condições de visibilidade |
| `<Learn Require Level/Skill/Switch: x>` | SLS | Condições de compra |
| `<Learn Skill Animation: id>` | SLS | Animação de aprendizado |
| `<Learn Skill Fade Speed: x>` | SLS | Velocidade do fade |
| `<Learn Skill Picture: filename>` | SLS | Imagem customizada |

### Actor Notetags
| Notetag | Descrição |
|---------|-----------|
| `<Learnable Equip Passive: id>` | Adiciona à lista learnable |
| `<Learned Equip Passive: id>` | Pré-aprendido ao entrar no party |
| `<Already Equip Passive: id>` | Pré-aprendido e equipado |

### Class Notetags
| Notetag | Descrição |
|---------|-----------|
| `<Learnable Equip Passive: id>` | Adiciona à lista learnable |
| `<Learn Passive: id>` | Listado no Skill Learn System |

### Skill Notetags
| Notetag | Descrição |
|---------|-----------|
| `<Link Learn Equip Passive: id>` | Aprende passivo ao aprender skill |
| `<Link Learnable Equip Passive: id>` | Adiciona learnable ao aprender skill |

## Legenda

- **Setup**: Configuração básica do passivo
- **Masking**: Controle de visibilidade mascarada
- **Hiding**: Ocultação de passivos
- **Unlock**: Condições de desbloqueio orgânico
- **SLS**: Integração com Skill Learn System
