# Referência - Compatibilidade

## Dependências

### Obrigatórias (Tier inferior)
| Plugin | Tier | Função |
|--------|------|--------|
| Core Engine VisuStella MZ | 0 | Base do sistema VisuStella |
| Skills and States Core VisuStella MZ | 1 | Sistema de skills e states expandido |

### Opcionais (funcionalidades extras)
| Plugin | Tier | Funcionalidade desbloqueada |
|--------|------|---------------------------|
| Elements and Status Menu Core | 1 | Notetag `<Equip Passive Learn Defeat name Trait: x>` |
| Skill Learn System | 2 | Compra de passivos com AP/SP/JP/CP/itens/gold |
| Class Change System | 2 | Custo em CP e JP no Skill Learn System |
| Items and Equips Core | 1 | Status de passivos na janela de loja |
| Message Core | 1 | Word wrap nas descrições de unlock |

## Ordem no Plugin Manager

```
Core Engine VisuStella MZ          (Tier 0)
Skills and States Core VisuStella  (Tier 1)
├── Elements and Status Menu Core  (Tier 1, opcional)
├── Items and Equips Core          (Tier 1, opcional)
├── Message Core                   (Tier 1, opcional)
├── Class Change System            (Tier 2, opcional)
├── Skill Learn System             (Tier 2, opcional)
└── Equip Passive System           (Tier 2) ← Este plugin
```

Colocar sempre **abaixo** de plugins de tier inferior e **acima** de plugins de tier superior.

## Interações Notáveis

### Skill Learn System
- Passivos no SLS **não requerem** unlock conditions
- Passivos SLS podem **não aparecer** no menu Passives sem notetags learnable separadas
- Custos CP/JP só funcionam com Class Change System também presente

### Elements and Status Menu Core
- Adiciona condição de unlock por trait set
- Apenas uma notetag adicional (`Defeat name Trait`)

### States como Base
- Traits de state são **completamente funcionais** em passivos equipados
- Auto-removal timing do state original NÃO afeta passivos equipados
- Overlays e motions do state funcionam normalmente
