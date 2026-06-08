# Performance e Limitações

## Warnings de Performance

### Repeat Animations

- Abuso de `<Repeat Animation: x>` pode **comprometer seriamente** a performance
- `<Repeat Animation Cycle: x>` com valores baixos aumenta a carga no engine
- O Cycle Time padrão nos Plugin Parameters deve ser mantido em valores razoáveis

### Breathing Effects

- Notetags de Breathing são **EXPERIMENTAIS** — glitches gráficos são esperados
- Combinação de Rate X/Y altos com Speed baixo pode causar distorções extremas

## Comportamento com Passive State Conditions

Todos os efeitos visuais deste plugin são **cacheados** quando usados com Passive State Conditions. Isso significa:

- O efeito **não** é aplicado instantaneamente
- Atualiza apenas no **próximo battler refresh cycle**
- Isso é intencional para prevenir lag e overload do engine

Afeta as seguintes notetags:
- `<Repeat Animation: x>`
- `<State Motion: TYPE>`
- `<State Motion Lock>`
- `<State Tone: r, g, b, gray>`
- `<Visual Opacity: x>`
- `<Visual Rainbow: +x>`
- `<Visual Hover Effect>`

## Visual Opacity + Action Sequences

O nível de opacidade do `<Visual Opacity>` **acumula** com opacidade alterada via Action Sequence Plugin Commands. Considerar isso ao usar ambos juntos para não tornar o battler invisível acidentalmente.

## State Tone — Resolução de Conflitos

Se múltiplos states com `<State Tone>` estão ativos simultaneamente, apenas o state com **maior prioridade** é aplicado. States de menor prioridade são ignorados.

## State Motion — Resolução de Conflitos

Idem ao tone: apenas o motion do state de **maior prioridade** é reproduzido, mesmo que states de menor prioridade tenham motions definidos.

## Navegação

- [← Glossário](glossario.md)
