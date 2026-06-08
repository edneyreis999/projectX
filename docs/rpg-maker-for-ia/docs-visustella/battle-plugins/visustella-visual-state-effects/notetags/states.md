# Notetags — States

Todas as notetags abaixo são para **State Notetags** (inseridas no campo Note do database de States), salvo indicação contrária.

---

## Popup

### `<Hide State Popup>`

Oculta todos os popups visuais deste state.

### `<State Popup>`

```
<State Popup>
 text color: c
 flash color: r, g, b, a
 flash duration: d
</State Popup>
```

- Cada linha é **opcional** — se omitida, usa o padrão dos Plugin Parameters
- **text color**: `#rrggbb` para cor customizada ou número para cor do Window Skin
- **flash color**: valores 0–255 para red, green, blue, alpha
- **flash duration**: número de frames da duração do flash

**Exemplos:**

```
<State Popup>
 text color: 3
</State Popup>

<State Popup>
 text color: #abcdef
 flash color: 255, 255, 0, 160
</State Popup>
```

---

## Animações

### `<Add Animation: x>`

Animação reproduzida quando o state é **aplicado**.

- Substituir `x` pelo ID da animação
- Não funciona para states sem ícone nem para o state de morte

### `<Erase Animation: x>`

Animação reproduzida quando o state é **removido**.

- Substituir `x` pelo ID da animação
- Não funciona para states sem ícone nem para o state de morte

### `<Repeat Animation: x>`

Animação reproduzida em intervalos enquanto o battler estiver afetado.

- **Usável em**: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
- Substituir `x` pelo ID da animação
- O battler alterna entre as várias repeating animations disponíveis
- Com Passive State Conditions: efeito atualiza no próximo refresh cycle (cache anti-lag)
- **WARNING**: Abuso pode comprometer a performance

### `<Repeat Animation Cycle: x>`

Define o ciclo/duração da repeating animation deste state.

- **Usável em**: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
- Substituir `x` pelo número de frames antes de avançar para a próxima animação
- **WARNING**: Valores baixos podem comprometer a performance

---

## Overlay Customizado

### `<Custom Overlay: filename>`

Usa uma imagem customizada como state overlay em vez do arquivo padrão `img/system/States`.

- Substituir `filename` pelo nome do arquivo em `img/system/` (sem extensão)
- Especificações da imagem:
  - Largura: 768px
  - Altura: 96px
  - Total de frames: 8
- Para tamanhos diferentes, recomenda-se usar `<Repeat Animation: x>` com animações Effekseer

---

## Motion

### `<State Motion: TYPE>`

Define qual motion reproduzir quando o battler está afetado.

Tipos disponíveis:
`Walk` | `Wait` | `Chant` | `Guard` | `Damage` | `Evade` | `Thrust` | `Swing` | `Missile` | `Skill` | `Spell` | `Item` | `Escape` | `Victory` | `Dying` | `Abnormal` | `Sleep` | `Dead`

- Apenas o motion do state de **maior prioridade** é reproduzido
- Com Passive State Conditions: atualiza no próximo refresh cycle

### `<State Motion Lock>`

Congela a animação do battler enquanto o state estiver ativo.

- Com Passive State Conditions: atualiza no próximo refresh cycle

---

## Efeitos Visuais

### `<State Tone: red, green, blue, gray>`

Aplica coloração (tone) ao battler.

- **red, green, blue**: -255 a 255
- **gray**: 0 a 255
- Se múltiplos states com tone, o de **maior prioridade** é aplicado
- Com Passive State Conditions: atualiza no próximo refresh cycle

### `<Visual Opacity: x>` / `<Visual Opacity: x%>`

Altera a opacidade do sprite principal do battler.

- `x`: 0–255 (nível de opacidade)
- `x%`: 0%–100% (porcentagem)
- **NÃO** afeta UI elements (HP Gauges, State Icons, shadow)
- Acumula com opacidade alterada por Action Sequence Plugin Commands
- Com Passive State Conditions: atualiza no próximo refresh cycle

### `<Visual Rainbow: +x>` / `<Visual Rainbow: -x>`

Aplica efeito de arco-íris (rainbow shifting) ao battler.

- `+x`: shift mais rápido | `-x`: shift mais lento
- **NÃO** afeta UI elements
- Empilhado sobre mudanças de hue existentes
- Com Passive State Conditions: atualiza no próximo refresh cycle

---

## Navegação

- [← Mudanças Core](../conceitos/mudancas-core.md)
- [Hover Notetags →](hover.md)
- [Referência Rápida →](referencia-rapida.md)
