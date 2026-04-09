# Compatibilidade

Informações sobre compatibilidade do plugin VisuStella Active Turn Battle com outros plugins VisuStella.

## Requisitos Obrigatórios

### VisuMZ_1_BattleCore
**Status**: OBRIGATÓRIO

**Tier**: 1 (deve vir antes do Active Turn Battle)

**Descrição**: Core de batalha VisuStella. O Active Turn Battle é construído sobre o Battle Core.

**Link**: [Battle Core Documentation](../Battle_Core_VisuStella_MZ.md)

**Consequência de não instalar**: O plugin não funcionará

## Compatibilidade com Plugins VisuStella

### VisuMZ_0_CoreEngine
**Status**: OPCIONAL mas RECOMENDADO

**Tier**: 0 (deve vir antes)

**Funcionalidades habilitadas**:
- ✅ Animações de interrupt (Animation ID)
- ✅ Mirror/Mute animation settings
- ✅ Efeitos visuais avançados

**Sem Core Engine**:
- ❌ Animações de interrupt não funcionam
- ✅ Sistema ATB funcional (sem animações extras)

### VisuMZ_1_OptionsCore
**Status**: OPCIONAL

**Tier**: 1 (mesmo nível que Battle Core)

**Funcionalidades habilitadas**:
- ✅ Opção "Show ATB Gauges" no menu de opções
- ✅ Ajuste de velocidade do ATB no menu
- ✅ Toggle entre Active/Wait ATB

**Uso**: Permite players customizarem experiência ATB

### Outros Plugins VisuStella

**Geralmente compatível** com:
- VisuMZ_2_EnhancedTpSystem ✅
- VisuMZ_3_TechSkills ✅
- VisuMZ_4_BattleVoice ✅
- VisuMZ_5_Staff ✅
- VisuMZ_6_AbsorptionBarrier ✅
- VisuMZ_7_ActorPartySwitch ✅
- VisuMZ_8_BattleEquipment ✅

**Nota**: Sempre testar combinações específicas

## Ordem de Plugins

### Ordem Recomendada

```
┌─────────────────────────────────────┐
│ Tier 0                              │
│ └─ VisuMZ_0_CoreEngine              │
├─────────────────────────────────────┤
│ Tier 1                              │
│ ├─ VisuMZ_1_BattleCore              │
│ └─ VisuMZ_1_OptionsCore             │
├─────────────────────────────────────┤
│ Tier 2                              │
│ └─ VisuMZ_2_ActiveTurnBattle        │  ← Este plugin
├─────────────────────────────────────┤
│ Tier 3+                             │
│ └─ Outros plugins VisuStella        │
└─────────────────────────────────────┘
```

### Por Que a Ordem Importa

Plugins de tiers inferiores carregam primeiro e fornecem base para tiers superiores:

1. **Core Engine (Tier 0)**: Funções base usadas por todos
2. **Battle Core (Tier 1)**: Sistema de batalha base
3. **Active Turn Battle (Tier 2)**: Estende Battle Core com ATB

**Ordem incorreta** pode causar:
- ❌ Funcionalidades não funcionando
- ❌ Erros de "undefined function"
- ❌ Comportamento imprevisível

## Conflitos Conhecidos

### Plugins de Terceiros

**Cuidado com plugins que**:
- Modificam sistema de batalha nativo
- Alteram speed de batalha
- Customizam gauges de HP/MP/TP
- Adicionam novos sistemas de turnos

**Testar sempre**:
1. Instalar Active Turn Battle
2. Testar funcionalidade
3. Adicionar plugin de terceiro
4. Retestar
5. Se quebrar: possível conflito

### Plugins Yanfly (MZ)

**Compatibilidade**: Limitada

**Nota**: Plugins Yanfly são para MV, não MZ. Para MZ, use VisuStella (mesma equipe, versão MZ).

## Configurações Conflitantes

### Database > System

**ATB requer**: Time Progress (Active/Wait)

**Pode conflitar com**:
- Outros sistemas de batalha customizados
- Plugins que forçam DTB (Default Turn Battle)

### Sistema de Speed

**ATB modifica**:
- Como speed funciona
- Habilidades com speed negativo (casting)
- Fórmulas de velocidade

**Pode conflitar com**:
- Plugins que modificam JP_SPEED formulas
- Plugins que adicionam novos tipos de speed

## Resolução de Conflitos

### Debugging

1. **Desabilitar plugins suspeitos**
2. **Testar ATB isolado**
3. **Reabilitar um por um**
4. **Identificar plugin conflituoso**

### Soluções Possíveis

**Ordem de plugins**:
- Mover ATB para cima/baixo na lista
- Tentar diferentes posições

**Parâmetros**:
- Ajustar configurações conflitantes
- Desabilitar funcionalidades sobrepostas

**Alternativas**:
- Buscar plugin alternativo
- Contatar desenvolvedor do plugin

## Compatibilidade com Yanfly (MV)

**Pergunta comum**: "Posso usar plugins Yanfly MV no MZ?"

**Resposta**: Não diretamente. Plugins Yanfly são para RPG Maker MV.

**Solução**:
- Use VisuStella MZ (mesma equipe, versão MZ)
- Aguardar ports oficiais para MZ
- Usar alternativas para MZ

## Suporte Oficial

### VisuStella MZ

**Site**: [VisuStella.github.io](https://visustella.github.io/)

**Issues**: [GitHub Issues](https://github.com/VisuStella/VisuStella-MZ/issues)

**Antes de reportar**:
1. Verificar ordem de plugins
2. Testar com projeto limpo
3. Consultar documentação

### Comunidade

**Fóruns**:
- RPG Maker Web Forums
- Reddit r/RPGMaker

**Discord**:
- VisuStella Discord Server

## Ver Também

- [Requirements](../index.md#requisitos) - Requisitos obrigatórios
- [Troubleshooting](./troubleshooting.md) - Resolução de problemas
- [Configuration](../configuration/) - Configuração do plugin

## Checklist de Compatibilidade

Antes de usar Active Turn Battle:

- [ ] VisuMZ_1_BattleCore instalado (Tier 1)
- [ ] Battle System configurado para Time Progress
- [ ] Ordem de plugins correta (Tier 2)
- [ ] Core Engine instalado (opcional, para animações)
- [ ] Testado com projeto limpo
- [ ] Testado com outros plugins instalados
- [ ] Backup do projeto antes de usar em produção
