# Visão Geral - Enhanced TP System

> **Objetivo**: Transformar o limitado sistema TP do RPG Maker MZ em um sistema modular e customizável através de TP Modes.

## Problema: Limitações do TP Nativo

O sistema TP (Tension Points) nativo do RPG Maker MZ é extremamente limitado:
- Muito do comportamento é **hardcoded**
- Pouco controle sobre quanto TP battlers ganham
- Sem maneira fácil de criar diferentes estilos de geração de TP
- Preservação de TP atrelada unicamente a traits
- Ganho de TP inicial inconsistente e não configurável

## Solução: Enhanced TP System

Este plugin da VisuStella resolve essas limitações introduzindo **TP Modes** - conjuntos de regras que definem completamente o comportamento de TP para um personagem ou inimigo.

### O que é um TP Mode?

Um TP Mode é uma configuração que define:
- **MaxTP**: Máximo de TP (pode ser fórmula JavaScript)
- **TCR Multiplier**: Multiplicador de ganho de TP
- **Preserve TP**: Se TP é preservado entre batalhas
- **Fórmulas de Ganho**: Quanto TP é ganho em diversas situações
- **Aparência**: Label, cores e efeitos visuais do gauge

## Funcionalidades Principais

### 1. TP Modes Diversos
- Atores e inimigos podem ter maneiras diferentes de gerar TP
- **30 modos predefinidos** incluídos como referência
- Crie seus próprios modos customizados

### 2. Troca Dinâmica
- Habilite jogadores a selecionar TP Mode via Scene_Skill
- Aprenda novos modos ao aprender skills
- Desbloqueie modos ao ser alvo de skills/items
- Force modos específicos via traits (ex: States)

### 3. Gauge Flash
- Gauge pisca em cores customizadas ao atingir certos percentuais
- Requer VisuStella MZ Skills & States Core
- Configurável por TP Mode

### 4. Controle Total
- Configure **exatamente** quanto TP é ganho em cada situação
- Fórmulas JavaScript para comportamentos dinâmicos
- Substitui completamente o sistema hardcoded

## Casos de Uso

### Diferentes Estilos de Personagem
```
Filena → "Momentum" (gera TP ao atacar rapidamente)
Kilin → "Guarda" (gera TP ao defender aliados)
Mhordred → "Fúria" (gera TP ao tomar dano)
Thorin → "Foco" (gera TP ao atacar com precisão)
```

### Inimigos Únicos
- Bosses podem ter modos TP especiais
- Minions podem ter modos mais simples
- Diferentes fações com mecânicas distintas

### Progressão de Jogo
- Personagens começam com modo básico
- Novos modos desbloqueiam ao progredir
- Jogador escolhe estilo de jogo

## Ver Também

- [TP Modes](tp-modes.md) - Entenda a mecânica em detalhes
- [Mudanças Core](mudancas-core.md) - O que foi alterado no RPG Maker
- [Modos TP](../parametros/modos-tp.md) - Como criar e configurar
