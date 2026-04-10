# Parâmetros do Plugin - Auto Skill Trigger

## General Settings

Estas são as configurações gerais usadas para este plugin. São primariamente usadas para impor um limite no número de auto skill triggers que podem acontecer **por battler por turno**.

[Nota: Cada membro em batalha tem esse limite individualmente, não como um todo]

---

## Por Que Usar Limites?

### Risco de Runaway Effect
Auto skill triggers, quando deixados sem controle e reagindo a tudo, podem causar um **efeito runaway** onde o jogador não precisa mais inputar nada.

[Nota: Efeito runaway = reações em cadeia que tomam conta do combate]

### Recomendações de Design
É recomendado usar limites como:
- **MP costs**: Custos de MP para limitar uso frequente
- **TP costs**: Custos de TP
- **Cooldowns**: Tempos de recarga entre usos

Esses mecanismos ajudam a prevenir que o sistema fique fora de controle.

---

## Parâmetros Disponíveis

### Limit Per Turn (Turn-Based)

- **Sistema**: Turn-Based apenas
- **Descrição**: Quantos triggers por battler por turno?
- **Risco**: Maior risco de runaway auto triggers em contagens mais altas

[Nota: Aplica-se apenas a batalhas no sistema Turn-Based]

---

### Limit Per Turn (TPB-Based)

- **Sistema**: TPB-Based apenas
- **Descrição**: Quantos triggers por battler por turno?
- **Risco**: Maior risco de runaway auto triggers em contagens mais altas

[Nota: Aplica-se apenas a batalhas no sistema TPB (Time Progress Battle)]

---

## Configurações Recomendadas

### Conservador
- **Limit**: 1-2 por turno
- **Vantagem**: Minimal risco de runaway
- **Desvantagem**: Menos reações automáticas

### Equilibrado
- **Limit**: 3-5 por turno
- **Vantagem**: Bom balanço entre reatividade e controle
- **Desvantagem**: Ainda requer cuidados com design de skills

### Agressivo
- **Limit**: 10+ por turno
- **Vantagem**: Máxima reatividade
- **Desvantagem**: Alto risco de runaway se não bem gerido

### "Ilimitado"
- **Limit**: 100
- **Aviso**: Desenvolvedores não são responsáveis por efeitos runaway
- **Recomendação**: Use apenas se entender completamente os riscos

---

## Ver Também

- [Como Funciona](../conceitos/funcionamento.md) - Explicação detalhada dos limites
- [Compatibilidade](compatibilidade.md) - Sistemas de batalha compatíveis
- [Exemplos](../notetags/exemplos.md) - Dicas de design para prevenir runaway

---
Fonte: auto-skill-trigger.md#Plugin Parameters
