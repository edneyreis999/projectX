# Dash - Comandos de Plugin

Plugin: **VisuStella Events & Movement Core**

---

## Dash Enable: Toggle

Ativa ou desativa a capacidade de correr (dash) nos mapas.

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Value` | Booleano | O que alterar o dash para? | Nao |

### Exemplo de Uso

```
Plugin Command: Dash Enable: Toggle
  Value: ON   → Permite que o jogador corra nos mapas
  Value: OFF  → Impede que o jogador corra nos mapas
```

### Notas

- Este comando sobrescreve a configuracao de dash do mapa atual.
- Util para cenas onde o jogador nao deve correr (interiores, cenas de tensao, dialogos forcados).
- O estado do dash pode ser reativado a qualquer momento com outro comando.
- Nao afeta a velocidade base de movimento do jogador, apenas a capacidade de acelerar (dash).
