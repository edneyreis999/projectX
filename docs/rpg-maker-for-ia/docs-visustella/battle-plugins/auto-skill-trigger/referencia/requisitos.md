# Requisitos - Auto Skill Trigger

## Requisitos de Plataforma

### RPG Maker MZ
- **Status**: Obrigatório
- **Versão**: RPG Maker MZ
- **Compatibilidade**: Este plugin é feito para RPG Maker MZ
- **Outras versões**: Não funcionará em outras iterações do RPG Maker

[Nota: Este é um plugin exclusivo para RPG Maker MZ]

---

## Plugins Obrigatórios

### VisuMZ_1_BattleCore
- **Status**: Obrigatório
- **Tier**: 1
- **Descrição**: Battle Core da VisuStella MZ

Este plugin requer o **VisuMZ_1_BattleCore** instalado na lista do Plugin Manager do seu jogo para funcionar.

### Consequências
- Você não pode iniciar seu jogo com este plugin ativado sem os plugins listados
- O plugin não funcionará corretamente sem o Battle Core

---

## Classificação Tier

### Tier 3 Plugin
Este plugin é um plugin **Tier 3**.

### Ordem Recomendada no Plugin Manager
Coloque este plugin abaixo de plugins de tier menor:
```
Tier 0 → Tier 1 → Tier 2 → [Tier 3] → Tier 4 → Tier 5
```

### Propósito da Ordem
Isso garante que seus plugins terão a melhor compatibilidade com o resto da biblioteca VisuStella MZ.

[Nota: A ordem dos plugins afeta como eles interagem entre si. Plugins de tiers maiores dependem de plugins de tiers menores]

---

## Checklist de Instalação

### Antes de Usar
- [ ] RPG Maker MZ está instalado
- [ ] VisuMZ_1_BattleCore está instalado
- [ ] VisuMZ_1_BattleCore está posicionado em Tier 1
- [ ] Este plugin está posicionado em Tier 3 (abaixo de tiers 0, 1, 2)
- [ ] Plugins incompatíveis (FTB, ETB, PTB) não estão ativos

### Verificação de Compatibilidade
- [ ] Battle system padrão (não FTB/ETB/PTB)
- [ ] Limites por turno configurados
- [ ] Skills com Auto Trigger têm custos/cooldowns

---

## Ver Também

- [Compatibilidade](compatibilidade.md) - Battle systems incompatíveis
- [Parâmetros](parametros.md) - Configuração dos limites
- [Introdução](../conceitos/introducao.md) - Visão geral do sistema

---
Fonte: auto-skill-trigger.md#Requirements
