# Comandos de Movimento

Comandos para mover busts por coordenadas, posições predeterminadas ou resetar.

Todos os campos "Picture ID(s)" aceitam código JavaScript.

---

## MOVE: Move Bust(s) By Coordinates

Move bust(s) relativamente às coordenadas atuais.

| Parâmetro | Descrição |
|-----------|-----------|
| **Picture ID(s)** | ID(s) da(s) Picture(s). Aceita JS. |
| **Move By X** | Negativo: esquerda; Positivo: direita; "Unchanged" para nenhum. Aceita JS. |
| **Move By Y** | Negativo: acima; Positivo: abaixo; "Unchanged" para nenhum. Aceita JS. |
| **Move Easing** | Tipo de easing para o movimento |
| **Flip Direction** | Inverter direção ao mover? |
| **Duration** | Duração em frames para o movimento |

---

## MOVE: Move Bust(s) By Position

Move bust(s) relativamente à posição atual (0-10).

| Parâmetro | Descrição |
|-----------|-----------|
| **Picture ID(s)** | ID(s) da(s) Picture(s). Aceita JS. |
| **Move By Position** | Negativo: esquerda; Positivo: direita; "Unchanged" para nenhum. Aceita JS. Resulta entre 0 e 10. |
| **Move Easing** | Tipo de easing para o movimento |
| **Flip Direction** | Inverter direção ao mover? |
| **Duration** | Duração em frames para o movimento |

---

## MOVE: Move Bust(s) to Coordinates

Move bust(s) para coordenadas exatas.

| Parâmetro | Descrição |
|-----------|-----------|
| **Picture ID(s)** | ID(s) da(s) Picture(s). Aceita JS. |
| **Target X** | Coordenada X alvo. "Unchanged" sem mudanças. Aceita JS. |
| **Target Y** | Coordenada Y alvo. "Unchanged" sem mudanças. Aceita JS. |
| **Move Easing** | Tipo de easing para o movimento |
| **Flip Direction** | Inverter direção ao mover? |
| **Duration** | Duração em frames para o movimento |

---

## MOVE: Move Bust(s) to Position

Move bust(s) para uma posição predeterminada (0-10).

| Parâmetro | Descrição |
|-----------|-----------|
| **Picture ID(s)** | ID(s) da(s) Picture(s). Aceita JS. |
| **Target Position** | Posição predeterminada alvo (0 a 10). Aceita JS. |
| **Move Easing** | Tipo de easing para o movimento |
| **Flip Direction** | Inverter direção ao mover? |
| **Duration** | Duração em frames para o movimento |

---

## MOVE: Reset Bust(s) to Position

Reseta bust(s) para a posição atual (útil após offsets).

| Parâmetro | Descrição |
|-----------|-----------|
| **Picture ID(s)** | ID(s) da(s) Picture(s). Aceita JS. |
| **Move Easing** | Tipo de easing para o movimento |
| **Flip Direction** | Inverter direção ao mover? |
| **Duration** | Duração em frames para o movimento |

---

## Navegação

- [Anterior: Comandos Fade](fade.md)
- [Próximo: Comandos de Escala](escala.md)
