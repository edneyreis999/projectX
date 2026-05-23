# States como Base dos Equip Passives

## Conceito Fundamental

Equip Passives são **states do RPG Maker MZ** com notetags especiais que os tornam equipáveis. Isso significa que todo passivo herda:

- **Traits**: Parameter bonuses, element rates, state resistances, skill additions, etc.
- **Motions**: Battle animations específicas quando o state está ativo
- **Overlays**: Efeitos visuais sobre o sprite do actor
- **Auto-removal**: Regras de remoção automática do state original (NÃO se aplicam a passivos equipados)

## Capacidade (Passive Capacity)

Cada actor possui uma capacidade máxima de passivos equipados. Cada passivo consome um valor de capacidade (cost).

- **Capacidade Formula**: Plugin Parameter que define o cálculo da capacidade máxima
- **Default Cost**: Custo padrão quando não definido por notetag
- **Min/Max Cap**: Limites mínimo e máximo de capacidade
- **Check Over-Capacity**: Verifica automaticamente quando EXP muda

### Custo de Capacidade

```xml
<!-- No State (notetag) -->
<Equip Passive Cost: x>
```

Se não definido, usa o valor padrão do Plugin Parameter `Default Capacity Cost`.

## Equipar/Desequipar

- Passivos são equipados/desequipados pelo comando "Passives" na Skill Scene
- O sistema impede equipar passivos que excedam a capacidade
- Ativar `Auto-Equip on Learn` equipa automaticamente ao aprender

## Ícone e Nome Customizados

Passivos podem ter ícone e nome diferentes quando exibidos no menu de passivos:

```xml
<!-- No State (notetag) -->
<Equip Passive Icon: x>
<Equip Passive Name: name>
```

Útil para states que precisam de ícone oculto na lista de states normal, mas visível no menu de passivos.

## Branching

Quando um passivo é aprendido, ele pode automaticamente:

1. **Aprender** outros passivos (sem necessidade de condições)
2. **Adicionar** à lista de learnable (ficam disponíveis para unlock)

```xml
<!-- No State (notetag) - aprende diretamente -->
<Branch Learn Equip Passive: id>

<!-- No State (notetag) - adiciona como learnable -->
<Branch Learnable Equip Passive: id>
```

## Link com Skills

Skills podem também desencadear aprendizado de passivos:

```xml
<!-- No Skill (notetag) - aprende ao aprender a skill -->
<Link Learn Equip Passive: id>

<!-- No Skill (notetag) - adiciona como learnable -->
<Link Learnable Equip Passive: id>
```
