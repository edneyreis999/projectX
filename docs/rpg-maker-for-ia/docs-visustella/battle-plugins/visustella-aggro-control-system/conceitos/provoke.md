# Provoke

## O que e

Provoke e uma mecanica baseada em **states** que forca o alvo afetado a atacar apenas o provocador quando usa acoes de unico alvo (single target).

## Como Funciona

1. Um battler aplica um state com `<Provoke>` no notetag em um alvo inimigo
2. O alvo provocado so pode selecionar o provocador como alvo para acoes single-target
3. Se multiplos provoke states existirem, o provocador e determinado pelo **state com maior prioridade** no database
4. O provoke dura enquanto o state durar
5. Se o state for reaplicado, o provocador muda para quem reaplicou

## Comportamento Detalhado

### Para Atores (Jogador)
- Quando o jogador seleciona um alvo e o actor esta provocado por um inimigo, a selecao e limitada apenas ao provocador
- O jogador nao pode escolher outro alvo para acoes single-target

### Para Inimigos (AI)
- Inimigos provocados sao forçados a atacar o provocador
- AI nao consegue bypassar provoke naturalmente (so com notetag)

### Remocao Automatica
- States com `<Provoke>` se removem automaticamente se o **provocador morrer**
- Isso evita que o provoke persista sem um alvo valido

## Bypass

A notetag `<Bypass Provoke>` permite ignorar completamente o efeito de provoke:

- **Em Trait Objects** (Actor, Class, Weapon, Armor, Enemy, State): A unidade ignora todos os provoke effects
- **Em Skills/Items**: A acao ignora provoke effects, permitindo selecionar alvos normalmente

## Visual (Requer Battle Core)

Quando Battle Core esta instalado:
- **Provoke Lines**: Linhas animadas conectando provocador ao provocado
- Configuravel: cor, opacidade, altura do arco, velocidade de flutuacao
- Pode ser desabilitado via Plugin Parameters ou Options Menu

## Notetags Relacionadas

| Notetag | Uso | Descricao |
|---------|-----|-----------|
| `<Provoke>` | State | Faz o state provocar o alvo |
| `<Provoke Height Origin: x%>` | Actor, Enemy | Altura do ponto de origem das linhas |
| `<Bypass Provoke>` | Trait Objects, Skills, Items | Ignora provoke |

Veja [Notetags Provoke](../notetags/provoke.md) para detalhes completos.

## Configuracao Visual

Ajustado em **Plugin Parameters > Provoke Settings**:
- Show Priority Lines?
- Line Settings (Arc Height, Blend Mode, Color, Opacity, Parts)
- Options Menu integration

Veja [Parametros Provoke](../parametros/provoke-settings.md) para todos os parametros.
