---
estetica:
humor:
tags:
  - Artstyle
---
# Tone & Vibe: Direção Criativa

## 1. Voz Narrativa (Diction) e Valor Literário

O jogo utiliza a linguagem como ferramenta de imersão e desenvolvimento de habilidades de leitura. Cada núcleo narrativo possui uma identidade própria de voz, ritmo e vocabulário:
1. **O Pragmático (Gildrat):** Vocabulário técnico e burocrático, focado em pesos, medidas, contratos e linhagens. Frases mais secas e diretas, refletindo a rigidez da cultura anã. O humor aqui é ácido e surge da burocracia ou da arrogância das elites. 
	-  *Objetivo Narrativo: Transmitir peso social; pressão coletiva; sensação de estrutura opressiva; orgulho imperial; rigidez cultural.*
	- *Objetivo Cultural: Desenvolver a interpretação de textos formais e instrumentais.*

2. **O Onírico (Reino da Mana/Thorin/Mélia):** Quando Thorin acessa seu dom ou tem visões, a linguagem torna-se metafórica, fluida e arcaica. O mundo "fala" através de sensações, cores (a terra avermelhada) e avisos da natureza (o canto das gralhas).
	- Objetivo Narrativo: Criar um contraste com o mundo real, com estranhamento, melancolia; conexão emocional com o passado, com a mãe, com o desconhecido.
	- *Objetivo Cultural: Contato com a prosa poética e simbolismo literário.*

3. **A Moldura Narrativa (Theodore Rheed):** Uma voz acolhedora, mas com peso histórico, como alguém que conta uma tragédia já sabendo o fim, mas enfatizando a esperança.
	- *Objetivo Narrativo: Gerar intimidade; pertencimento; reflexão emocional;*
	- *Objetivo Cultural: Valorização da tradição oral e da figura do mediador de leitura.*


>**Nota: essas características precisam ser trazidas nos templates dos personagens, com descrições específicas para cada um dos personagens
## 2. Palavras-chave
 
1. **Contraste:** Gildrat é movida pelo choque entre forças opostas: terra e metal, magia e tecnologia, tradição e expansão. O Futebol Rúnico representa liberdade e pertencimento popular em oposição à rigidez industrial de Gildrat.
2. **Peso:** O mundo anão é marcado pelo peso do trabalho, das linhagens e das expectativas sociais. Cada escolha carrega consequências emocionais dentro de um destino que parece inevitável.
3. **Memória:** A memória existe nos monumentos, nas tradições orais, nos sonhos e na própria terra. Contar histórias é uma forma de preservar identidade diante do esquecimento.
4. **Ruptura:** O jogo retrata um mundo onde antigas relações com a terra foram substituídas por mineração, controle e expansão. A quebra do selo simboliza o retorno violento de tudo aquilo que foi reprimido.
5. **Inevitabilidade:** O jogador não impede o colapso do mundo, apenas decide como os personagens irão enfrentá-lo. O foco da narrativa está naquilo que ainda vale a pena preservar quando o fim já começou.
    
---
##  3. Elementos Culturais e Impacto Visual

Esta seção justifica a estética do jogo como um veículo de **preservação do patrimônio histórico-cultural e ambiental**.
#### 3.1. Estética de Bestiário e Códice
O visual monocromático em **sépia** e o uso de **hachuras** referenciam manuscritos medievais e diários de exploradores. Esta escolha transforma a interface em um objeto de estudo histórico-visual, despertando o interesse do jogador por arquivos, bibliotecas e pela estética do livro como artefato cultural.
#### 3.2. A Gralha-azul: "Semeadora de Memórias"
- **Símbolo Narrativo:** Atua como guia espiritual e mensageira entre o mundo físico e o Reino da Mana. 
- **Valor Cultural:** Utiliza o papel ecológico real da ave (semeadora de araucárias) como metáfora para a **continuidade cultural/de memória**. Ao associar seu canto à memória ancestral e à fauna nativa, o jogo promove o folclore regional e a conscientização ambiental através da fantasia

#### 3.3. Bio-indicadores e Alertas Ambientais 
**Possíveis exemplos a serem decididos:** Corvos; fogo-fátuo; gralha-azul.
Atuam como sinalizadores de desequilíbrio ecológico próximo ao selo ancestral. Mecanicamente, eles funcionam como **bio-indicadores narrativos**, ensinando o jogador a interpretar sinais da natureza para a tomada de decisões e sobrevivência.

*IDEIA: fogo-fátuo: pode ser um boss que o jogador tem que derrotar para destruir o selo; por ordem de Balastros*
- *podem defender o Thorin do Profeta*
- *tipo "espíritos bons" do mundo da mana que tentam proteger o thorin*
*IDEIA 2: corvos podem ser gralhas*

---
## 3. Artstyle — ilustrações 

==(fiz a partir do doc: documento_de_artstyle_v2.md; 
- confirmar com o Lucas

> [!ABSTRACT]  Objetivo: padronizar técnica e parâmetros para produzir ilustrações consistentes com os arquivos existentes em `frontend/img/pictures/Portraits/Principal`


## 1) Especificações técnicas (alvo de exportação)
- Formato: PNG
- Fundo: transparente
- Interlacing: desativado (non‑interlaced)
## 2) Paleta e atmosfera

  - Paleta: monocromática em sépia (preto + marrom)
  - Linhas/traço: preto puro `#000000`
  - Sombras densas: marrom escuro `#2A221B` a `#3B2F2F`
  - Realces suaves/“papel”: camada de cor `#F0E2C1` a `#F5E6C8` (blend Multiply/Overlay, 20–35%)
  - Contraste: alto, sombras bem marcadas, quase sem gradientes suaves
  - Clima: bestiário/gravura medieval com sensação de pergaminho

## 3) Traço e sombreamento

 - Linha externa (contorno principal): 8 px (4 px)
 - Linhas internas (detalhes): 4 px (2 px) — use variação 3–5 px conforme área
 - Hachuras (linhas paralelas):
	  - Ângulos preferenciais: 30°, 45°, 60°; cruzar em 90° para áreas mais escuras
	  - Espaçamento em 1×: 4–6 px entre linhas (em 2×: 8–12 px)
	  - Reserve 1–2 pixels de “respiro” entre hachura e contorno para legibilidade
 - Pontilhismo: use para transições suaves em áreas pequenas (bochechas, dobras)
 - Textura: sugerir desgaste/rugosidade com hachuras curtas e pontilhismo, evitando “ruído” excessivo

**Ferramentas:
- Pincel duro, antialias ligado, opacidade 100% para contorno
- Pincel de textura (baixa opacidade/fluxo) apenas em camadas de sombra/efeito  
## 5) Composição e fundo
- Fundo transparente; evite silhuetas irregulares recortadas no limite da imagem
- Evite texturas fortes atrás do personagem; a leitura deve ser do contorno e das hachuras

## 6) Fluxo de trabalho (Krita/Photoshop/GIMP)

1. **Canvas base em 2×: 1008 × 1344 px, sRGB**
2. **Camadas sugeridas (de baixo para cima):**
   - 01‑Guia (regras/linhas de proporção, baixa opacidade)
   - 02‑Rascunho (sketch)
   - 03‑Linha (contorno preto)
   - 04‑Sombra (hachuras/pontilhismo, marrom escuro)
   - 05‑Luz (branco/borracha para abrir volume, opcional)
   - 06‑Sépia (cor sólida `#F0E2C1`/`#F5E6C8`, Multiply/Overlay 20–35%)
   - 07‑Ajustes (Curves/Levels para garantir contraste alto)
1. **Finalização:**
   - Limpe vazamentos de tinta além do contorno
   - Garanta “respiro” entre áreas de hachura e linhas principais
1. **Redução: redimensione para 504 × 672 px**
   - Filtro: Bicubic Sharper/Lanczos
   - Verifique não introduzir halos nas linhas
1. **Exportação:**
   - PNG, RGBA, sRGB, non‑interlaced, fundo transparente
   - Nome do arquivo conforme padrão atual

## 7) Padrões de consistência visual

- Espessura relativa do contorno e estilo de hachura iguais entre personagens
- Direção de luz idêntica em todos os ilustrações
- Mesma altura de olhos e recorte de ombros para “família visual”
- Paleta sépia uniforme (reutilize a camada 06‑Sépia como referência de opacidade)