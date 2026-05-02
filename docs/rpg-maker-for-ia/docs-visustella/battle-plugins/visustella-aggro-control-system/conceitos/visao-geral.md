# VisuStella Aggro Control System - Visao Geral

## Identificacao

| Campo | Valor |
|-------|-------|
| **Nome** | Aggro Control System |
| **Autor** | VisuStella MZ |
| **Tier** | 2 |
| **Requisitos** | RPG Maker MZ |
| **Extras** | Core Engine + Battle Core (para visuais) |

## Proposito

O Aggro Control System adiciona ao RPG Maker MZ tres mecanicas para controlar como inimigos selecionam alvos:

1. **Provoke** - Forca o alvo a atacar apenas o provocador
2. **Taunt** - Redireciona acoes de tipo especifico (fisico/magico/certain hit) para o taunter
3. **Aggro** - Sistema numerico de ameaco que determina probabilidade de ser atacado

## Mecanicas Principais

### Provoke
- Baseado em **states** (estados)
- O alvo provocado so pode atacar o provocador com acoes single-target
- Suporta multiplas provocacoes (prioridade pelo valor do state)
- Removido automaticamente se o provocador morrer
- Pode ser bypassado com `<Bypass Provoke>`

### Taunt
- Aplicavel em quase qualquer **trait object** (actor, class, weapon, armor, enemy, state)
- Tipos: Global, Physical, Magical, Certain Hit
- Inimigos so podem selecionar taunters como alvo
- Pode ser bypassado com `<Bypass Taunt>`

### Aggro
- Valor numerico acumulativo durante batalha
- Pode ser aumentado por dano, cura, skills, items ou notetags
- Quanto maior o aggro, maior a chance de ser alvo
- Opcao de sempre focar o alvo de maior aggro
- Gauge visivel sobre sprites dos actors

## Ordem de Prioridade

```
Provoke > Taunt > Aggro
```

Se um inimigo esta provocado, ele SEMPRE ataca o provocador primeiro. So considera taunt e aggro se nao houver provoke ativo.

## Funcionalidades Visuais

- **Provoke Lines**: Linhas animadas mostrando conexao provocador->provocado (requer Battle Core)
- **Taunt Animations**: Animacoes ciclicas sobre units com taunt (requer Core Engine + Battle Core)
- **Aggro Gauge**: Barra de aggro sobre sprites dos actors e no Battle Status Window

## Casos de Uso Tipicos

| Papel | Mecanica | Exemplo |
|-------|----------|---------|
| Tanque | Taunt + Aggro alto | Guerreiro que atrai todos os ataques |
| Provocador | Provoke state | Skill que forca o boss a atacar apenas o tanque |
| DPS Furtivo | Aggro baixo | Ladino com multiplicador de aggro reduzido |
| Healer | Gerenciamento de aggro | Cura gera aggro, precisa ser controlado |
| Boss Mecanica | Target Highest Aggro | Boss que SEMPRE foca o membro com mais aggro |

## Navegacao

- [Provoke](./provoke.md) - Detalhes da mecanica de provoke
- [Taunt](./taunt.md) - Detalhes da mecanica de taunt
- [Aggro](./aggro.md) - Detalhes da mecanica de aggro
- [Prioridades](./prioridades.md) - Como as prioridades interagem
