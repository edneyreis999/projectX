## [Cutscene Director Pro Intro] — Algoritmo de Eventos (Opção B aplicada)

**Gatilho:** Autorun (Página 1)
**Atores:** Lucas (Evento ID `1`), Maria (Evento ID `2`), Player (Transparency ON)
**Local:** Interseção principal do vilarejo

### Anti-repetição (aplicado)

* **Página 1 (Autorun):** executa a cutscene, depois liga **Self Switch A = ON** e **Erase Event**.
* **Página 2 (condição: Self Switch A ON):** vazia.

---

| Passo | Ator/Alvo            | Tipo de Ação | Detalhes da Ação / Parâmetros                                                                                        |
| :---- | :------------------- | :----------- | :------------------------------------------------------------------------------------------------------------------- |
| 01    | Sistema              | Câmera       | Zoom In (termina antes do 1º diálogo).                                                                               |
| 02    | Sistema              | Sistema      | Change Player Transparency: ON.                                                                                      |
| 03    | Sistema              | Sistema      | Conditional Branch: Self Switch A is ON → Erase Event / Exit Event Processing.                                       |
| 04    | Maria (ID 2)         | Diálogo      | “Bom dia… pra você, né? Chegou atrasado de novo.”                                                                    |
| 05    | Lucas (ID 1)         | Diálogo      | “Olha que manhã perfeita! Eu… só estava… apreciando.”                                                                |
| 06    | Maria (ID 2)         | Diálogo      | “Ontem também teve ‘manhã perfeita’?”                                                                                |
| 07    | Lucas (ID 1)         | Diálogo      | “Foi sono estratégico. Totalmente planejado.”                                                                        |
| 08    | Sistema              | Som          | Play SE: ronco de estômago.                                                                                          |
| 09    | Sistema              | Efeito       | Screen Shake (curto).                                                                                                |
| 10    | Sistema              | Efeito       | Tint Screen: sépia (curto).                                                                                          |
| 11    | Sistema              | Sistema      | Wait (curto).                                                                                                        |
| 12    | Sistema              | Efeito       | Tint Screen: voltar ao normal (rápido).                                                                              |
| 13    | Maria (ID 2)         | Diálogo      | “Que foi isso?!”                                                                                                     |
| 14    | Lucas (ID 1)         | Diálogo      | “Meu estômago tá protestando!”                                                                                       |
| 15    | Lucas (ID 1)         | Diálogo      | “E eu precisava testar os novos efeitos de partícula.”                                                               |
| 16    | Lucas (ID 1)         | Efeito       | Change Opacity: 0.                                                                                                   |
| 17    | Lucas (ID 1)         | Movimento    | Set Event Location: teleporta 1 tile pro lado.                                                                       |
| 18    | Lucas (ID 1)         | Efeito       | Change Opacity: 255.                                                                                                 |
| 19    | Sistema              | Sistema      | Wait (perceptível; pós-teleporte).                                                                                   |
| 20    | Maria (ID 2)         | Diálogo      | “Tá achando que só você sabe fazer truque?”                                                                          |
| 21    | Maria (ID 2)         | Efeito       | Play Animation: Cura/Verde (no alvo como no vídeo).                                                                  |
| 22    | Sistema              | Som          | Play SE (cura).                                                                                                      |
| 23    | Sistema              | Sistema      | Wait (perceptível).                                                                                                  |
| 24    | Lucas (ID 1)         | Efeito       | Play Animation: Fogo (no alvo como no vídeo).                                                                        |
| 25    | Sistema              | Som          | Play SE (fogo).                                                                                                      |
| 26    | Sistema              | Sistema      | Wait (perceptível).                                                                                                  |
| 27    | Lucas (ID 1)         | Sistema      | Exibir “VITÓRIA” flutuante sobre Lucas (~1s).                                                                        |
| 28    | Sistema              | Sistema      | Wait ~60 frames (≈1s).                                                                                               |
| 29    | Lucas (ID 1)         | Movimento    | Jump (no lugar), sincronizado.                                                                                       |
| 30    | Maria (ID 2)         | Movimento    | Jump (no lugar), sincronizado.                                                                                       |
| 31    | Maria (ID 2)         | Diálogo      | “Vamos nessa. Guia o caminho!”                                                                                       |
| 32    | Maria (ID 2)         | Movimento    | Turn Up.                                                                                                             |
| 33    | Maria (ID 2)         | Movimento    | Move Up (inicia saída).                                                                                              |
| 34    | Sistema              | Câmera       | Scroll Map Up (acompanha).                                                                                           |
| 35    | Lucas (ID 1)         | Sistema      | Wait ~30 frames (≈0,5s).                                                                                             |
| 36    | Lucas (ID 1)         | Movimento    | Turn Up.                                                                                                             |
| 37    | Lucas (ID 1)         | Movimento    | Move Up (segue).                                                                                                     |
| 38    | Sistema              | Câmera       | Zoom Out (lento ~3s).                                                                                                |
| 39    | Sistema              | Sistema      | Fade Out (simultâneo ao Zoom Out).                                                                                   |
| 40    | Sistema              | Sistema      | Wait (curto; garantir preto total).                                                                                  |
| 41    | Sistema              | Sistema      | Fade In (retorna visão do mapa).                                                                                     |
| 42    | Sistema              | Sistema      | Change Player Transparency: OFF.                                                                                     |
| 43    | Sistema              | Sistema      | (Opcional) Set Move Route: Player → Direction Fix OFF / Through OFF (se você alterou em outro lugar; não informado). |
| 44    | Evento (controlador) | Sistema      | Control Self Switch: A = ON.                                                                                         |
| 45    | Evento (controlador) | Sistema      | Erase Event.                                                                                                         |

---

### Nota técnica importante (sobre o Autorun + Fade In)

* Se você fizer **Fade In** e **Transparency OFF** enquanto a câmera ainda está “scrollando” ou os NPCs ainda caminham, pode dar sensação estranha de “voltei no meio da tomada”. O fluxo acima pressupõe que o **Fade Out encerra visualmente** e o Fade In já é “pós-cena” (câmera estabilizada).
* Se no seu projeto o Scroll Map ainda estiver ativo, insira um **Wait** um pouco maior antes do Fade In (ex.: 30–60 frames) para garantir estabilidade.

Se você quiser, eu também adapto este algoritmo para o formato “comandos JSON do MZ” (codes 101/401/205/230/261 etc.), mas para isso você precisa me dizer se vai implementar tudo em **um único evento controlador** ou se Lucas/Maria também têm páginas próprias participando da cena.
