# Mecanica de Aprendizado de Skills

## Como Funciona

O aprendizado de skills pelo Skill Learn System segue um pipeline de verificacoes:

### 1. Definicao de Skills Aprendiveis

Skills aprendiveis sao definidas **nas Classes** via notetags:

```
<Learn Skill: id>
<Learn Skills: id, id, id>
<Learn Skills>
 id
 id
</Learn Skills>
```

### 2. Condicoes de Exibicao (Show Conditions)

Determinam se a skill **aparece** no menu. Se nao atendidas, a skill fica invisivel.

- **Level**: `<Learn Show Level: x>` - nivel minimo para aparecer
- **Skills**: `<Learn Show Skill: id>` - skill pre-requisito visivel
  - Variante `All`: todas as skills listadas devem ser conhecidas
  - Variante `Any`: qualquer uma das skills listadas basta
- **Switches**: `<Learn Show Switch: x>` - switch deve estar ON
  - Variante `All`: todos os switches devem estar ON
  - Variante `Any`: qualquer switch ON basta
- **JS**: `<JS Learn Show>` - condicao dinamica via JavaScript

### 3. Condicoes de Requisito (Require Conditions)

Determinam se a skill esta **habilitada** para aprendizado. A skill aparece porem nao pode ser selecionada.

- **Level**: `<Learn Require Level: x>` - nivel minimo para habilitar
- **Skills**: `<Learn Require Skill: id>` - skill pre-requisito aprendida
  - Variante `All` e `Any` disponiveis
- **Switches**: `<Learn Require Switch: x>` - switch deve estar ON
  - Variante `All` e `Any` disponiveis
- **JS**: `<JS Learn Requirements>` - condicao dinamica

### 4. Custos de Aprendizado

Se a skill esta visivel e habilitada, o jogador precisa ter os recursos para aprende-la:

- **AP**: `<Learn AP Cost: x>` ou `<JS Learn AP Cost>`
- **SP**: `<Learn SP Cost: x>` ou `<JS Learn SP Cost>`
- **Gold**: `<Learn Gold Cost: x>`
- **Items**: `<Learn Item id Cost: x>`
- **Weapons**: `<Learn Weapon id Cost: x>`
- **Armors**: `<Learn Armor id Cost: x>`
- **CP** (requer ClassChangeSystem): `<Learn CP Cost: x>` ou `<JS Learn CP Cost>`
- **JP** (requer ClassChangeSystem): `<Learn JP Cost: x>` ou `<JS Learn JP Cost>`
- **Custo composto**: `<Learn Skill Costs> ... </Learn Skill Costs>`

### 5. Confirmacao e Animacao

Apos selecionar e confirmar:
- Uma animacao e reproduzida (configuravel)
- O icone da skill aparece com fade-in
- Um efeito sonoro toca
- `<JS On Learn Skill>` executa codigo customizado

## Diferenca: Show vs Require

| Aspecto | Show Condition | Require Condition |
|---------|---------------|-------------------|
| Efeito | Skill fica invisivel | Skill fica desabilitada |
| Quando verificar | Antes de mostrar na lista | Ao tentar selecionar |
| Ambas podem coexistir | Sim | Sim |
| JS notetag | `<JS Learn Show>` | `<JS Learn Requirements>` |

## Customizacao de Texto

- `<JS Learn Show List Text>`: texto customizado na lista quando show condition
- `<JS Learn Show Detail Text>`: texto customizado no detalhe quando show condition
- `<JS Learn Requirements List Text>`: texto customizado na lista de requisitos
- `<JS Learn Requirements Detail Text>`: texto customizado no detalhe de requisitos
