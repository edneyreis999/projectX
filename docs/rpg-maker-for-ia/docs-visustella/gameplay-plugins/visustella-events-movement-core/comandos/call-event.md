# Call Event - Comandos de Plugin

Plugin: **VisuStella Events & Movement Core**

---

## Call Event: Remote Read

Executa a pagina de um evento diferente no evento ATUAL. Os comandos de "This Event" se aplicam ao evento que fez a chamada, nao ao evento alvo.

Funciona de forma semelhante ao sistema de chamada de common events a partir de map events do RPG Maker 2003.

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Map ID` | Inteiro | ID do mapa do evento alvo. Use `0` para o mapa atual. | Sim |
| `Event ID` | Inteiro | ID do evento alvo. Use `0` para o evento atual. | Sim |
| `Page ID` | Inteiro | Pagina do evento remoto a ser executada. | Sim |

### Exemplo de Uso

```
Plugin Command: Call Event: Remote Read
  Map ID: 5
  Event ID: 12
  Page ID: 2
```

Executa a pagina 2 do evento 12 do mapa 5, mas os comandos que referenciam "This Event" afetam o evento que originou a chamada.

### Notas

- **Comportamento de escopo**: Comandos como "This Event" dentro da pagina remota executam no contexto do evento chamador, nao do evento remoto.
- Todos os parametros aceitam expressoes JavaScript.
- Util para reutilizar logica de eventos sem duplicar paginas inteiras.
- Caso o mapa ou evento especificado nao exista, o comando falhara silenciosamente.
