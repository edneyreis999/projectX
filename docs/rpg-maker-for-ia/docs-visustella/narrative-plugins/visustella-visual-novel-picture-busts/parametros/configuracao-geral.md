# Parâmetros de Configuração Geral

Configurações que governam os valores padrão dos Picture Busts.

Acessível via **Plugin Parameters** no Plugin Manager.

---

## Anchor Settings

Configuração da âncora/origem dos busts.

| Parâmetro | Descrição |
|-----------|-----------|
| **Anchor X** | Âncora/origem X. `0.0` = esquerda, `0.5` = centro, `1.0` = direita |
| **Anchor Y** | Âncora/origem Y. `0.0` = topo, `0.5` = meio, `1.0` = fundo |

**Padrão recomendado**: X=0.5, Y=1.0 (Center Bottom) — funciona melhor com busts posicionados no fundo da tela.

---

## Scale Settings

Configuração de escala padrão dos busts.

| Parâmetro | Descrição |
|-----------|-----------|
| **Scale X** | Ajuste de escala X. Valor: 100 = 100% = 1.0 |
| **Scale Y** | Ajuste de escala Y. Valor: 100 = 100% = 1.0 |
| **Mirror Horizontally** | Quais posições serão espelhadas horizontalmente? Busts devem encarar o centro da tela. |

---

## Screen Positioning

Código JavaScript para calcular coordenadas X/Y de cada posição (0-10).

| Parâmetro | Descrição |
|-----------|-----------|
| **JS: Position X** | Código JS para calcular coordenada X de cada posição da tela |
| **JS: Position Y** | Código JS para calcular coordenada Y de cada posição da tela |

Ver [Posicionamento Predeterminado](../conceitos/como-funciona-busts.md) para entender o layout padrão.

**Nota**: Não recomendado alterar sem conhecimento de JavaScript.

---

## Tone

Configurações de tom para os comandos Bright e Dim.

| Parâmetro | Descrição |
|-----------|-----------|
| **Bright Tone** | Tom de brilho. Formato: `[Red, Green, Blue, Gray]` |
| **Dim Tone** | Tom de escurecimento. Formato: `[Red, Green, Blue, Gray]` |

---

## Navegação

- [Anterior: Comandos Tone/Tint](../comandos/tone-tint.md)
- [Próximo: Glossário](../referencia/glossario.md)
