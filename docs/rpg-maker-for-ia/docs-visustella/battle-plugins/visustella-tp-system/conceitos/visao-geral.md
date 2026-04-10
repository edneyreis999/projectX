# Visão Geral - Enhanced TP System

## O Problema do TP Base

O sistema de TP do RPG Maker MZ é bastante limitado. Muito do sistema de TP é hardcoded (codificado de forma rígida), dando aos usuários muito pouco controle sobre:

- Quanto TP um battler pode receber de ações específicas
- Situações que geram TP
- Configurações de ganho de TP

## O que o Plugin Faz

Este plugin oferece a habilidade de ajustar:

- Quanto TP os battlers adquirem de várias ações
- Diferentes **TP Modes** (modos de TP)
- Permitir que jogadores selecionem qual TP Mode usar para cada actor

## Recursos Principais

### TP Modes
- Atores e inimigos podem ter diferentes formas de gerar TP em batalha
- 30 TP Modes predefinidos para usar e/ou aprender
- Cada mode tem suas próprias fórmulas de ganho de TP

### Aprendizado e Desbloqueio
- Funcionalidade para skills e items mudarem o TP Mode de um alvo
- Ensinar novos TP modes para actors ao aprenderem novas skills
- Desbloquear novos TP Modes ao ser alvo de skills/items

### Trait Objects
- States podem forçar um TP Mode específico quando aplicados
- Prioridade baseada na ordem de trait objects se múltiplos efeitos presentes

### Visual do Gauge
- TP Gauge pode piscar em várias cores ao atingir certos percentuais
- Cores customizáveis por mode

### Interface do Jogador
- Integrado no Scene_Skill
- Jogadores podem mudar TP Mode durante o jogo

## Versão e Requisitos

- **Versão:** 1.17 (Setembro 18, 2025)
- **Target:** RPG Maker MZ
- **Tier:** 2
- **Compatibilidade:** VisuStella MZ library

## Documentação Relacionada

- [Mudanças no Core](mudancas-core.md) - O que foi alterado no RPG Maker
- [Modos de TP](../parametros/modos.md) - Como configurar modes
- [Fórmulas de TP](../parametros/formulas.md) - Fórmulas de ganho
