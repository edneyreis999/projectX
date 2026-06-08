# Comment Tags de Pagina — VisuStella Events & Movement Core

Comment tags sao inseridas dentro de paginas de eventos (event pages), paginas de tropa (troop pages) e paginas de common events. Diferem das notetags por afetarem apenas a pagina especifica onde sao inseridas.

---

## 1. Condicoes Customizadas de Pagina

O sistema de condicoes customizadas permite criar condicoes de ativacao de pagina que nao estao disponiveis nas condicoes padrao do RPG Maker. Usa a logica do comando **Conditional Branch** (Condicao) do RPG Maker.

### `<Page Conditions> conditions </Page Conditions>`

```text
<Page Conditions>
... condicoes ...
</Page Conditions>
```

Bloco que contem as condicoes customizadas para a pagina. As condicoes dentro do bloco seguem a mesma logica dos comandos de evento `If...Else...End` do RPG Maker.

### `<Condition Met>`

```text
<Condition Met>
```

Marca que as condicoes do bloco foram satisfeitas. Deve ser colocada dentro de um branch `If` valido dentro do bloco `<Page Conditions>`.

### Escopo de Aplicacao

As condicoes customizadas funcionam em tres contextos:

| Contexto            | Local de Insercao                        |
|---------------------|------------------------------------------|
| Map Event Pages     | Paginas de eventos de mapa               |
| Troop Pages         | Paginas de grupos de inimigos (batalha)  |
| Common Event Pages  | Paginas de common events                 |

---

## 2. Exemplo de Uso

### Exemplo: Evento de mapa que so aparece se o ator tem equipamento especifico

Estrutura visual no editor do RPG Maker:

```
◆Comment：<Page Conditions>
◆If：Reid has equipped Potion Sword
  ◆Comment：If Reid has equipped the Potion Sword
：       ：<Condition Met>
  ◆
：End
◆Comment：</Page Conditions>
```

### Exemplo: Condicao com variavel e switch

```
◆Comment：<Page Conditions>
◆If：Switch [0010: Quest Ativa] is ON
  ◆If：Variable [0005: Progresso] >= 3
    ◆Comment：<Condition Met>
    ◆
  ：End
  ◆
：End
◆Comment：</Page Conditions>
```

Neste exemplo, a pagina so e ativada se a switch 10 estiver ON **e** a variavel 5 for maior ou igual a 3.

### Exemplo: Condicao em Troop Page

```
◆Comment：<Page Conditions>
◆If：Variable [0020: Turno da Batalha] >= 5
  ◆Comment：<Condition Met>
  ◆
：End
◆Comment：</Page Conditions>
```

Permite ativar uma pagina de tropa baseada em condicoes customizadas, alem das condicoes padrao de turno e HP.

### Exemplo: Condicao em Common Event

```
◆Comment：<Page Conditions>
◆If：Script: $gameParty.numItems($dataItems[15]) > 0
  ◆Comment：<Condition Met>
  ◆
：End
◆Comment：</Page Conditions>
```

Permite que um common event condicional verifique inventario ou qualquer outra condicao via script.

---

## 3. Comment Tags vs Notetags

E fundamental entender a diferenca entre notetags e comment tags para o correto funcionamento:

| Aspecto             | Notetag                            | Comment Tag                       |
|---------------------|------------------------------------|-----------------------------------|
| **Local**           | Campo "Note" do evento             | Comentario dentro de uma pagina   |
| **Escopo**          | Todas as paginas do evento         | Apenas a pagina do comentario     |
| **Avaliacao**       | Ao carregar o mapa                 | Ao avaliar a pagina especifica    |
| **Sintaxe**         | Identica                           | Identica                          |

### Regras gerais:

1. **Notetags** sao inseridas no campo "Note" do evento (janela de edicao do evento, aba superior). Afetam **todas as paginas** do evento.

2. **Comment tags** sao inseridas como comentarios (`◆Comment`) dentro de uma pagina especifica do evento. Afetam **apenas aquela pagina**.

3. A maioria das notetags de evento documentadas em `eventos.md` possui variantes como comment tag. Excecoes notaveis:
   - `<Playtest>` — funciona **apenas** como notetag, nao como comment tag.

4. Quando uma notetag e uma comment tag da mesma funcionalidade coexistem no mesmo evento, a **comment tag da pagina ativa tem prioridade** sobre a notetag geral.

### Exemplo de coexistencia:

```
Note do Evento:
  <Icon: 10>           ← Aplica-se a todas as paginas

Pagina 1 (Comment):
  <Icon: 20>           ← Pagina 1 mostra icone 20 (sobrescreve a notetag)

Pagina 2:
  (sem comment tag)    ← Pagina 2 mostra icone 10 (usa a notetag)
```

---

## 4. Boas Praticas

1. **Prefira comment tags para comportamento por pagina.** Se o comportamento varia entre paginas, use comment tags em vez de notetags.

2. **Prefira notetags para propriedades fixas.** Se uma propriedade (como hitbox ou escala) nunca muda entre paginas, use notetag para evitar duplicacao.

3. **Evite conflitos.** Nao misture notetags e comment tags conflitantes (ex.: `<Hide Shadow>` como notetag e `<Show Shadow>` como comment tag) — o comportamento depende da ordem de avaliacao e pode ser imprevisivel.

4. **Condicoes customizadas sao poderosas mas custosas.** Cada bloco `<Page Conditions>` e avaliado a cada frame. Condicoes complexas (scripts, loops) podem impactar performance. Use condicoes simples quando possivel.
