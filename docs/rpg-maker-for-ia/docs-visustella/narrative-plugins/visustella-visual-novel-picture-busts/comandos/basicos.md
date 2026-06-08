# Comandos Básicos

Comandos fundamentais para entrar, sair, trocar gráficos, espelhar, alterar origem e reproduzir animações em busts.

Todos os campos "Picture ID" aceitam código JavaScript.

---

## BASIC: Enter Bust

Entra UM bust na tela. Anda um pouco de trás e faz fade in.

| Parâmetro | Descrição |
|-----------|-----------|
| **Picture ID** | ID da Picture associada ao bust. Aceita JS. |
| **Picture File** | Arquivo de imagem do bust |
| **Origin** | `Upper Left`, `Center`, `Bust` |
| **Screen Position** | Posição de 0 a 10 (ver [Posicionamento](../conceitos/como-funciona-busts.md)) |
| **Start Offset X** | Posição inicial de entrada. Negativo: atrás; Positivo: frente. Aceita JS. |
| **Start Offset Y** | Posição inicial de entrada. Negativo: acima; Positivo: abaixo. Aceita JS. |
| **Entrance Easing** | Tipo de easing para a entrada |
| **Horizontal Mirror** | `None`, `Mirror`, `Auto`, `Auto-Reverse` |
| **Duration** | Duração em frames para a entrada |

---

## BASIC: Exit Bust(s)

Saída genérica para bust(s). Anda para trás e faz fade out.

| Parâmetro | Descrição |
|-----------|-----------|
| **Picture ID(s)** | ID(s) da(s) Picture(s). Aceita JS. |
| **End Offset X** | Posição final de saída. Negativo: atrás; Positivo: frente. Aceita JS. |
| **End Offset Y** | Posição final de saída. Negativo: acima; Positivo: abaixo. Aceita JS. |
| **Exit Easing** | Tipo de easing para a saída |
| **Flip Direction** | Inverter direção ao sair? |
| **Duration** | Duração em frames para a saída |
| **Auto-Erase?** | Apagar automaticamente o(s) bust(s) após fade out completo? |

---

## BASIC: Graphic Change

Troca o gráfico de UM bust **sem alterar** nenhuma outra propriedade. Útil para trocar expressões faciais ou poses rapidamente.

| Parâmetro | Descrição |
|-----------|-----------|
| **Picture ID** | ID da Picture associada ao bust. Aceita JS. |
| **Picture File** | Novo arquivo de imagem |

---

## BASIC: Mirror Bust(s)

Altera a direção do(s) bust(s) via escala horizontal.

| Parâmetro | Descrição |
|-----------|-----------|
| **Picture ID(s)** | ID(s) da(s) Picture(s). Aceita JS. |
| **Horizontal Mirror** | `None`, `Mirror`, `Auto`, `Auto-Reverse`, `Toggle` |

---

## BASIC: Origin Change Bust(s)

Altera a origem/âncora do(s) bust(s).

| Parâmetro | Descrição |
|-----------|-----------|
| **Picture ID(s)** | ID(s) da(s) Picture(s). Aceita JS. |
| **Origin** | `Upper Left`, `Center`, `Bust` (valor "Bust" baseado nos Plugin Parameters) |
| **Duration** | Duração em frames para a mudança de origem |

---

## BASIC: Play Animation on Bust(s)

Reproduz uma Battle Animation sobre o(s) bust(s). Normalmente Battle Animations aparecem atrás de pictures, mas este plugin cria efeitos especiais para reproduzi-las sobre os busts.

| Parâmetro | Descrição |
|-----------|-----------|
| **Picture ID(s)** | ID(s) da(s) Picture(s). Aceita JS. |
| **Battle Animation ID** | ID da Battle Animation a reproduzir |
| **Mirror Animation?** | Espelhar o efeito da animação? |
| **Wait For Animation?** | Esperar até a animação terminar antes de continuar? |

---

## Navegação

- [Voltar: Conceitos](../conceitos/como-funciona-busts.md)
- [Próximo: Comandos Fade](fade.md)
