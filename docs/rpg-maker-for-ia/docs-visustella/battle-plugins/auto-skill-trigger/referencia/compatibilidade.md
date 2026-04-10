# Compatibilidade - Auto Skill Trigger

## VisuStella MZ Compatibility

Embora este plugin seja compatível com a maioria da biblioteca VisuStella MZ, ele não é compatível com plugins específicos ou features específicas.

---

## Battle Systems Incompatíveis

### FTB - Free Turn Battle
- **Status**: ❌ INCOMPATÍVEL
- **Motivo**: Estrutura de turnos do FTB é altamente incompatível com a forma que Auto Skill Triggers funcionam

### ETB - Event Turn Battle
- **Status**: ❌ INCOMPATÍVEL
- **Motivo**: Estrutura de turnos do ETB é altamente incompatível com a forma que Auto Skill Triggers funcionam

### PTB - Press Turn Battle
- **Status**: ❌ INCOMPATÍVEL
- **Motivo**: Estrutura de turnos do PTB é altamente incompatível com a forma que Auto Skill Triggers funcionam

[Nota: A incompatibilidade se deve à estrutura fundamental de como turnos são processados nesses battle systems]

---

## Requisitos de Plugin

### Plugin Obrigatório
- **VisuMZ_1_BattleCore** (Tier 1)
  - Este plugin requer o VisuMZ_1_BattleCore instalado no Plugin Manager para funcionar
  - O jogo não pode iniciar com este plugin ativado sem o plugin listado

### Ordem de Plugins
- Este é um **Tier 3 plugin**
- Coloque-o abaixo de plugins de tier menor na lista do Plugin Manager
- Ordem recomendada: Tier 0 → Tier 1 → Tier 2 → **Tier 3** → Tier 4 → Tier 5
- Isso garante melhor compatibilidade com o resto da biblioteca VisuStella MZ

---

## RPG Maker Compatibility

### Plataforma
- **RPG Maker MZ**: ✅ COMPATÍVEL
- **Outras versões**: ❌ INCOMPATÍVEL

[Nota: Este plugin é feito especificamente para RPG Maker MZ e não funcionará em outras iterações]

---

## Ver Também

- [Requisitos](requisitos.md) - Detalhes completos sobre requisitos
- [Parâmetros](parametros.md) - Configurações do plugin

---
Fonte: auto-skill-trigger.md#VisuStella MZ Compatibility
