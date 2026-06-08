# Comandos Fade

Comandos para controlar opacidade e fade de busts.

Todos os campos "Picture ID(s)" aceitam código JavaScript.

---

## FADE: Fade In Bust(s)

Traz a opacidade do(s) bust(s) para 255.

| Parâmetro | Descrição |
|-----------|-----------|
| **Picture ID(s)** | ID(s) da(s) Picture(s). Aceita JS. |
| **Duration** | Duração em frames para o fade in |

---

## FADE: Fade Out Bust(s)

Traz a opacidade do(s) bust(s) para 0.

| Parâmetro | Descrição |
|-----------|-----------|
| **Picture ID(s)** | ID(s) da(s) Picture(s). Aceita JS. |
| **Duration** | Duração em frames para o fade out |
| **Auto-Erase?** | Apagar automaticamente o(s) bust(s) após fade out completo? |

---

## FADE: Opacity By X, Bust(s)

Ajusta a opacidade do(s) bust(s) relativamente (valor aditivo).

| Parâmetro | Descrição |
|-----------|-----------|
| **Picture ID(s)** | ID(s) da(s) Picture(s). Aceita JS. |
| **Adjust Opacity** | Quantidade de ajuste. Negativo: diminui; Positivo: aumenta. Aceita JS. |
| **Duration** | Duração em frames para o fading |

---

## FADE: Opacity To X, Bust(s)

Traz a opacidade do(s) bust(s) para um valor customizado.

| Parâmetro | Descrição |
|-----------|-----------|
| **Picture ID(s)** | ID(s) da(s) Picture(s). Aceita JS. |
| **Target Opacity** | Valor de opacidade desejado (0 a 255) |
| **Duration** | Duração em frames para o fading |

---

## Navegação

- [Anterior: Comandos Básicos](basicos.md)
- [Próximo: Comandos de Movimento](movimento.md)
