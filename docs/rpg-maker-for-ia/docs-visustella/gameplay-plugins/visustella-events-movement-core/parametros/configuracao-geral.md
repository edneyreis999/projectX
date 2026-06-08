# Event Template Settings

Os **Event Templates** armazenam dados de mapas/eventos especificos como modelos (blueprints). Sao usados pelas notetags `<Copy Event>`, pelo comando de plugin **Morph Event** e pelo comando de plugin **Spawn Event**.

---

## Preloaded Maps

Lista de IDs de mapas que serao pre-carregados como mapas de template.

| Parametro | Tipo | Descricao |
|-----------|------|-----------|
| Preloaded Maps | Lista de inteiros | IDs dos mapas pre-carregados automaticamente como templates |

> **Nota:** Ao definir um Map ID em um template abaixo, ele e adicionado automaticamente a lista de preloaded maps.

---

## Templates List

Cada entrada na lista de templates define um blueprint de evento que pode ser referenciado por notetags e comandos de plugin.

| Parametro | Tipo | Descricao |
|-----------|------|-----------|
| Name | String | Nome do template. Serve como ponto de ancoragem para notetags e comandos de plugin referenciarem este template |
| Map ID | Inteiro | ID do mapa onde o evento template esta armazenado (adicionado automaticamente aos preloaded maps) |
| Event ID | Inteiro | ID do evento no mapa que serve como base para o template |

---

## JavaScript Hooks por Template

Cada template pode ter hooks JavaScript customizados que executam antes/depois de operacoes especificas.

| Hook | Momento da Execucao |
|------|---------------------|
| JS: Pre-Copy | Executado antes de copiar o evento deste template |
| JS: Post-Copy | Executado apos copiar o evento deste template |
| JS: Pre-Morph | Executado antes de transformar (morph) o evento neste template |
| JS: Post-Morph | Executado apos transformar (morph) o evento neste template |
| JS: Pre-Spawn | Executado antes de spawnar o evento deste template |
| JS: Post-Spawn | Executado apos spawnar o evento deste template |

---

## JavaScript Hooks Globais

Estes hooks sao executados para **TODAS** as operacoes de copia, morph e spawn, independentemente do template utilizado.

| Hook | Momento da Execucao |
|------|---------------------|
| JS: Pre-Copy | Executado antes de qualquer operacao de copia |
| JS: Post-Copy | Executado apos qualquer operacao de copia |
| JS: Pre-Morph | Executado antes de qualquer operacao de morph |
| JS: Post-Morph | Executado apos qualquer operacao de morph |
| JS: Pre-Spawn | Executado antes de qualquer operacao de spawn |
| JS: Post-Spawn | Executado apos qualquer operacao de spawn |

---

## Fluxo de Execucao dos Hooks

```
[Operacao solicitada (Copy/Morph/Spawn)]
  |
  +--> Hook Global: Pre-[Operacao]
  |
  +--> Hook do Template: Pre-[Operacao]
  |
  +--> Execucao da operacao
  |
  +--> Hook do Template: Post-[Operacao]
  |
  +--> Hook Global: Post-[Operacao]
```

> **Ordem:** Os hooks globais envolvem os hooks por template. O hook global Pre executa primeiro, seguido pelo hook do template Pre. Apos a operacao, o hook do template Post executa primeiro, seguido pelo hook global Post.
