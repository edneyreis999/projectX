# Auto Movement - Comandos de Plugin

Plugin: **VisuStella Events & Movement Core**

---

## Auto Movement: Events

Permite ou impede que eventos se movam automaticamente no mapa.

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Value` | Booleano | Permitir que eventos se movam automaticamente? | Nao |

### Exemplo de Uso

```
Plugin Command: Auto Movement: Events
  Value: ON   → Permite movimento automatico dos eventos
  Value: OFF  → Impede movimento automatico dos eventos
```

### Notas

- Este comando afeta **todos** os eventos do mapa atual.
- Quando desativado, eventos com tipo de movimento "Auto" ou "Random" terao seu movimento interrompido.
- Util para cinematics ou cenas onde o desenvolvedor deseja controlar manualmente o posicionamento dos eventos.
