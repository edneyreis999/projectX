# Notetags - Hiding

Notetags que controlam a visibilidade de passivos na lista do menu Passives.

## Ocultar Quando Não Aprendido

```xml
<!-- Sempre oculto (bypassa Plugin Parameter) -->
<Hide If Not Learned Equip Passive>
```
- State Notetag
- Oculta o passivo da listagem independentemente das configurações do Plugin Parameter

## Ocultar Condicionalmente (baseado em outros passivos)

```xml
<!-- Oculta quando UM passivo específico é aprendido -->
<Hide If Learned Equip Passive: id>
<Hide If Learned Equip Passive: name>

<!-- Oculta quando TODOS os passivos listados são aprendidos -->
<Hide If Learned All Equip Passives: id, id, id>
<Hide If Learned All Equip Passives: name, name, name>

<!-- Oculta quando QUALQUER passivo listado é aprendido -->
<Hide If Learned Any Equip Passives: id, id, id>
<Hide If Learned Any Equip Passives: name, name, name>
```

### Variações

| Variante | Condição para ocultar |
|----------|----------------------|
| `(vazio)` | Quando o passivo nomeado é aprendido |
| `All` | Quando TODOS os listados são aprendidos |
| `Any` | Quando QUALQUER um dos listados é aprendido |

### Casos de Uso

- **Exclusão mútua**: Ocultar passivo básico quando o avançado é aprendido
- **Evolução**: Substituir passivo antigo por novo
- **Poda da árvore**: Ocultar caminhos não escolhidos em sistema de branching
