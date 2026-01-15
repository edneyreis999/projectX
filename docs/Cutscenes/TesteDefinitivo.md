# Design de Cutscene

**DescriÇõÇœo:** Cena de abertura em que Kilin e Mhordred brincam com truques de teletransporte enquanto o jogador reaparece no amanhecer.
**Cutscene:** `amanhecer_km`
**Mapa onde acontece:** `[044]` (`frontend/data/Map044.json`)

**Personagens Envolvidos:**

* [Kilin] (Actor ID: `[1]`)
* [Mhordred] (Actor ID: `[2]`)
* [Jogador] (Actor ID: `[a definir]`)

**Bustos Envolvidos:**

* [Kilin] (ID: `[B_KILIN]`, arquivo: `Portraits/Principal/Kilin`, considerar Auto-Reverse na virada à direita)
* [Mhordred] (ID: `[B_MHORDRED]`, arquivo: `Portraits/Principal/Mhordred`)
* [Jogador] (ID: `[B_PLAYER]`, arquivo: `Portraits/Principal/Player`)

---

## Roteiro de AÇõÇæos - Beat por Beat

| Cena | Personagem | Acao - movimento do personagem | Detalhes (parametros) | esperar (true/false) | Notas de Direcao |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `opening` | `camera` | `bgm` | `play,Field1,70,true` | `true` | Ativa trilha suave para o amanhecer. |
| `opening` | `camera` | `var` | `1,1` | `false` | Ajuste de estado inicial. |
| `opening` | `camera` | `switch` | `1,on` | `false` | Libera a camada de personalidade do prólogo. |
| `opening` | `kilin` | `focus zoom` | `in` | `true` | Foco inicial para suavizar o rosto. |
| `opening` | `kilin` | `move to` | `10,8` | `true` | Entrada controlada de Kilin no quadro. |
| `opening` | `sistema` | `wait` | `15` | `true` | Estabiliza posição antes das reações faciais. |
| `opening` | `kilin` | `sound` | `Bell1` | `false` | Marcação sonora de chegada. |
| `opening` | `kilin` | `turn` | `up` | `false` | Vira o rosto para o céu; busto sai e entra com expressão curiosa. |
| `opening` | `kilin` | `balloon` | `1` | `true` | Exibe expressão amigável antes do diálogo. |
| `opening` | `kilin` | `talk` | `"Que manhã mais bonita!"` | `true` | Busto animado com sorriso aberto. |
| `opening` | `camera` | `voice` | `Bell1` | `true` | Sustenta a atmosfera leve com efeitos vocais. |
| `opening` | `mhordred` | `focus zoom` | `in` | `true` | Aproxima o rosto de Mhordred para contraste. |
| `opening` | `mhordred` | `move to` | `13,8` | `true` | Mhordred aparece no lado oposto. |
| `opening` | `sistema` | `wait` | `15` | `true` | Pausa para reacomodar os bustos. |
| `opening` | `mhordred` | `sound` | `Bell2` | `false` | Sinaliza sua entrada. |
| `opening` | `mhordred` | `turn` | `left` | `false` | Gira o busto na direção de Kilin; considerar Auto-Reverse. |
| `opening` | `mhordred` | `balloon` | `2` | `true` | Expressão de surpresa leve. |
| `opening` | `mhordred` | `talk` | `"Kilin! Você acordou cedo!"` | `true` | Tom brincalhão. |
| `opening` | `kilin` | `turn` | `right` | `false` | Retorno do foco de Kilin; busto acompanha a virada. |
| `opening` | `kilin` | `sound` | `Bell3` | `false` | Ritmo de resposta. |
| `opening` | `kilin` | `focus zoom` | `in` | `true` | Redução do zoom para reforçar a fala. |
| `opening` | `kilin` | `talk` | `"Ei! Nem sempre me atraso!"` | `true` | Riso leve com expressão confiante. |
| `opening` | `mhordred` | `talk` | `"E ontem?"` | `true` | Sinaliza curiosidade. |
| `opening` | `kilin` | `balloon` | `3` | `true` | Ícone de confiança. |
| `opening` | `kilin` | `sound` | `Item1` | `false` | Marca a sequência de piada. |
| `opening` | `kilin` | `talk` | `"Foi sono estratégico!"` | `true` | Busto sorri com leve orgulho. |
| `opening` | `mhordred` | `talk` | `"Sono estratégico?"` | `true` | Expressão de dúvida. |
| `opening` | `kilin` | `shake` | `true` | `false` | Trepidação leve para mostrar emoção. |
| `opening` | `kilin` | `sound` | `Blow1` | `false` | Sopro cômico. |
| `opening` | `kilin` | `talk` | `"Meu estômago está protestando!"` | `true` | Busto demonstra desconforto divertido. |
| `opening` | `camera` | `flash` | `255,255,255,30` | `true` | Brilho repentino para destacar a piada. |
| `opening` | `camera` | `sound` | `Lightning1` | `false` | Efeito sonoro correspondente. |
| `opening` | `mhordred` | `balloon` | `1` | `true` | Reage em tom de surpresa. |
| `opening` | `mhordred` | `talk` | `"Uau! O que foi isso?"` | `true` | Busto arregalado. |
| `opening` | `camera` | `tone` | `255,180,120,80,60` | `true` | Tom quente para enfatizar o humor. |
| `opening` | `camera` | `sound` | `Chime1` | `false` | Notas suaves reforçam a luz. |
| `opening` | `kilin` | `talk` | `"Agora tudo tem um brilho aconchegante!"` | `true` | Expressão sonhadora. |
| `opening` | `mhordred` | `talk` | `"Isso é bem acolhedor!"` | `true` | Complementa o momento. |
| `opening` | `kilin` | `talk` | `"Veja esse truque de mágica!"` | `true` | Transição para ação. |
| `opening` | `kilin` | `sound` | `Magic1` | `false` | Indica concentração. |
| `opening` | `kilin` | `invisibilidade` | `on` | `false` | Busto sai para manter regra de rota; novo aspecto preparado. |
| `opening` | `sistema` | `wait` | `1` | `true` | Pausa curta antes do comentário surreal. |
| `opening` | `kilin` | `talk` | `"Ta-dá! Estou invisível!"` | `true` | Exuberância enquanto reaparece. |
| `opening` | `mhordred` | `talk` | `"Você está apenas transparente!"` | `true` | Riso contido. |
| `opening` | `kilin` | `invisibilidade` | `off` | `false` | Reexibição do busto com brilho normal. |
| `opening` | `kilin` | `turn` | `right` | `false` | Pequena virada para mostrar confiança. |
| `opening` | `kilin` | `sound` | `Item1` | `false` | Marcação de ênfase. |
| `opening` | `kilin` | `talk` | `"Tá bom! Veja isso!"` | `true` | Antecipação do próximo truque. |
| `opening` | `kilin` | `move to` | `11,8` | `false` | Kilin se reposiciona para o salto. |
| `opening` | `sistema` | `wait` | `15` | `true` | Garante que a câmera estabilize antes do teletransporte. |
| `opening` | `camera` | `flash` | `0,255,255,20` | `true` | Luz azul para o efeito. |
| `opening` | `camera` | `sound` | `Teleport1` | `false` | Som de deslocamento. |
| `opening` | `kilin` | `talk` | `"Teletransporte!"` | `true` | Busto com expressão triunfante. |
| `opening` | `mhordred` | `turn` | `left` | `false` | Volta o olhar para o novo posicionamento. |
| `opening` | `mhordred` | `sound` | `Bell1` | `false` | Confirma reação. |
| `opening` | `mhordred` | `talk` | `"Impressionante!"` | `true` | Busto sorridente. |
| `opening` | `mhordred` | `move to` | `12,8` | `false` | Mhordred ajusta a distância. |
| `opening` | `sistema` | `wait` | `15` | `true` | Tempo para o próximo foco. |
| `opening` | `camera` | `sound` | `Teleport1` | `false` | Eco do truque anterior. |
| `opening` | `mhordred` | `talk` | `"Eu também consigo teletransportar!"` | `true` | Auto-confiança do busto. |
| `opening` | `kilin` | `talk` | `"Você consegue fazer o jogador desaparecer?"` | `true` | Desafios com olhar malicioso. |
| `opening` | `kilin` | `sound` | `Magic1` | `false` | Indica foco. |
| `opening` | `player` | `invisibilidade` | `on` | `false` | Jogador some brevemente; busto sai. |
| `opening` | `sistema` | `wait` | `1` | `true` | Pausa para descartar o desaparecimento. |
| `opening` | `mhordred` | `talk` | `"O jogador desapareceu!"` | `true` | Expressão preocupada. |
| `opening` | `kilin` | `talk` | `"E agora eles reaparecerão!"` | `true` | Vontade de resolver. |
| `opening` | `camera` | `sound` | `Teleport1` | `false` | Indício do retorno. |
| `opening` | `player` | `move to` | `13,7` | `false` | Reposicionamento do jogador. |
| `opening` | `sistema` | `wait` | `15` | `true` | Retém a composição visual. |
| `opening` | `player` | `turn` | `down` | `false` | Alinha o corpo para o centro da cena. |
| `opening` | `player` | `invisibilidade` | `off` | `false` | Busto retorna com expressão curiosa. |
| `opening` | `mhordred` | `balloon` | `3` | `true` | Ícone de vitória. |
| `opening` | `mhordred` | `sound` | `Item1` | `false` | Chamado para o encerramento. |
| `opening` | `mhordred` | `talk` | `"Você ganhou esta rodada!"` | `true` | Senso de camaradagem. |
| `opening` | `kilin` | `balloon` | `1` | `true` | Reativa o sorriso leve. |
| `opening` | `kilin` | `sound` | `Bell2` | `false` | Persistência sonora. |
| `opening` | `kilin` | `talk` | `"Vitória!"` | `true` | Declaração curta e animada. |
| `opening` | `mhordred` | `talk` | `"Mostre o caminho!"` | `true` | Abre espaço para o jogador liderar. |
| `opening` | `camera` | `bgm` | `fadeOut,120` | `true` | Encerramento suave da trilha. |
| `opening` | `camera` | `tone` | `255,255,255,0,60` | `true` | Deslize para tons neutros. |
| `opening` | `camera` | `sound` | `Chime1` | `false` | Última nota cintilante. |
| `opening` | `kilin` | `move to` | `6,7` | `false` | Kilin recua para posição inicial. |
| `opening` | `sistema` | `wait` | `15` | `true` | Tempo de respiro antes do corte final. |
| `opening` | `mhordred` | `move to` | `7,7` | `true` | Mhordred acompanha a saída. |
| `opening` | `sistema` | `wait` | `15` | `true` | Mantém equilíbrio visual. |
| `opening` | `mhordred` | `sound` | `Bell3` | `false` | Marca o fim da ação. |
| `opening` | `camera` | `cinematic` | `false` | `true` | Remove as barras pretas de forma gradual. |
| `opening` | `camera` | `focus zoom` | `out` | `true` | afasta a lente. |
| `opening` | `camera` | `focus on` | `player` | `true` | Centraliza no personagem principal. |
| `opening` | `camera` | `var` | `2,1` | `false` | Atualiza variável de estado pós-cena. |
| `opening` | `camera` | `switch` | `2,on` | `false` | Libera parâmetros seguintes. |
| `opening` | `camera` | `callCommon` | `1` | `false` | Ativa o evento comum de transição. |

---

## Sequência recomendada de diálogos e bustos

1. Envolva cada bloco de falas contínuas com `start_dialog` imediatamente antes de o busto ser exibido e `finish_dialog` após o último diálogo do personagem, garantindo que nenhum comando de `balloon` ocorra entre esses dois marcadores.
2. Antes de qualquer movimentação (`move to`, `teleport`), invisibilidade ou mudança de direção (`turn`), coloque o busto na saída (`exit`) e reintroduza-o (`enter`/`change`) já com a nova expressão ou posicionamento desejado.
3. O busto correspondente deve estar ativo sempre que o personagem falar, portanto reinstale-o antes de novas falas e ajuste expressões via `change` quando um `balloon` ou efeito emocional for necessário.
4. Especialmente para viradas laterais como as de Kilin, avalie o uso de `Auto-Reverse` em `h_mirror` para manter a coerência visual do busto enquanto o personagem se move.
5. Sequências de rota encadeadas com o mesmo personagem devem ser condensadas em um único `move to`, com o `wait` aplicado apenas depois do último deslocamento, para preservar o ritmo da câmera.
