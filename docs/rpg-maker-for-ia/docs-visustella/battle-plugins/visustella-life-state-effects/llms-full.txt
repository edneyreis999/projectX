# VisuStella MZ - Life State Effects - Documentação Completa

## Sumário

Esta documentação cobre o plugin **Life State Effects** da VisuStella para RPG Maker MZ, um sistema que implementa efeitos mecânicos de estado de vida inspirados em JRPGs tradicionais.

## Áreas Principais

### 1. Conceitos (conceitos/)
**Arquivos**: introducao.md, funcionamento.md

A área de conceitos apresenta:
- Introdução ao plugin e seus propósitos
- Explicação detalhada de cada efeito (Auto Life, Curse, Doom, etc.)
- Como cada efeito afeta a jogabilidade
- Interações entre diferentes efeitos

### 2. Notetags (notetags/)
**Arquivos**: state-only.md, trait-objects.md, enemy-only.md

A área de notetags documenta:
- **State-Only Effects**: Notetags exclusivas para states (Auto Life, Doom, Extinct)
- **Trait-Object Effects**: Notetags para traits (Curse, Fragile, Guts, Undead, Allow Undead Regen)
- **Enemy-Only Effects**: Notetags exclusivas para inimigos (Death Transform, Transform Animation)

### 3. Parâmetros (parametros/)
**Arquivos**: configuracoes.md

A área de parâmetros cobre:
- Configurações de animação para cada efeito
- Configurações de popup visual
- Ajustes de cor, duração e exibição

### 4. Referência (referencia/)
**Arquivos**: glossario.md, troubleshooting.md

A área de referência fornece:
- Glossário de termos e conceitos
- Solução de problemas comuns
- Compatibilidade com outros plugins

## Relação Entre Áreas

```
Conceitos → Notetags → Parâmetros → Referência
   ↓           ↓          ↓           ↓
Entender   Implementar   Configurar  Consultar
```

1. **Conceitos** fornecem entendimento base
2. **Notetags** mostram como implementar cada efeito
3. **Parâmetros** permitem customizar apresentação
4. **Referência** auxilia em dúvidas e problemas

## Navegação Recomendada

**Para Iniciantes:**
1. Leia `conceitos/introducao.md` para overview
2. Estude `conceitos/funcionamento.md` para detalhes
3. Consulte `notetags/` para implementação

**Para Implementação:**
1. Identifique o efeito desejado em `conceitos/funcionamento.md`
2. Encontre a notetag correspondente em `notetags/`
3. Configure em `parametros/configuracoes.md`

**Para Solução de Problemas:**
1. Consulte `referencia/troubleshooting.md`
2. Verifique configurações em `parametros/configuracoes.md`
3. Revise notetags em `notetags/`

## Links e Referências

- **Plugin Parent**: VisuMZ_1_BattleCore
- **Plugin Parent**: VisuMZ_1_SkillsStatesCore
- **Core Engine**: VisuMZ_0_CoreEngine (opcional, para animações)

## Notas de Compatibilidade

- Requer RPG Maker MZ
- Plugin Tier 3 (coloque abaixo de tiers 0, 1, 2)
- Algumas funcionalidades requerem Core Engine
