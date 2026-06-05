# Como Funciona o Auto Skill Trigger

## Limites por Turno

O sistema impõe limites no número de auto skill triggers que podem ocorrer **por battler por turno**. Cada membro em combate tem esse limite individualmente, não como um grupo inteiro.

[Nota: "Per battler" significa que cada personagem/inimigo tem seu próprio contador independente]

### Propósito dos Limites

Os limites existem porque auto skill triggers, quando sem restrições e reagindo a tudo, podem causar um **efeito runaway** onde o jogador não precisa mais inputar nenhuma ação.

[Nota: Efeito runaway = quando reações em cadeia tomam conta do combate, deixando o jogador sem controle]

### Recomendações de Design

É recomendado usar mecanismos de limitação como:
- **MP costs**: Custos de MP
- **TP costs**: Custos de TP
- **Cooldowns**: Tempos de recarga

Esses mecanismos ajudam a prevenir que o sistema fique fora de controle.

### Triggers "Ilimitados"

Se você deseja triggers aparentemente ilimitadas:
- Configure os limites para 100 ou valores altos
- **Aviso**: Os desenvolvedores não são responsáveis por efeitos runaway quando o risco já foi mencionado

## Limites em Diferentes Sistemas de Batalha

### Turn-Based
- **Parâmetro**: Limit Per Turn (Turn-Based)
- Quais triggers por battler por turno em sistemas baseados em turnos?
- Maior risco de runaway auto triggers em contagens mais altas

### TPB-Based (Time Progress)
- **Parâmetro**: Limit Per Turn (TPB-Based)
- Quais triggers por battler por turno em sistemas baseados em tempo
- Maior risco de runaway auto triggers em contagens mais altas

## Prevenção de Loops Infinitos

O sistema possui proteções integradas:

1. **Skills com Auto Trigger não podem triggerar outros Auto Skill Triggers**
   - Isso previne loops infinitos de reações em cadeia

2. **Skills devem ser usáveis normalmente**
   - A skill marcada deve estar em condições normais de uso (custos, cooldowns, etc.)

## Ver Também

- [Triggers](../notetags/triggers.md) - Tipos de triggers disponíveis
- [Condições Especiais](../notetags/condicoes.md) - Restrições e notetags especiais
- [Parâmetros](../referencia/parametros.md) - Configuração dos limites

---
Fonte: auto-skill-trigger.md#Plugin Parameters
