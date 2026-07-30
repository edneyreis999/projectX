---
doc_id: "asset-manifest-vn-map046-v1"
version: "1.0.0"
status: "awaiting-assets"
last_updated: "2026-07-28"
scope: "Manifesto final de intake dos assets aprovados para a VN do Map046"
not_scope: "Criação ou edição de imagens, implementação em runtime, alteração de plugins/dados, Playtest ou aprovação perceptível"
authority: "Decisões humanas aprovadas deste handoff; technical-analysis.md; sintese.xml"
canonical_source: "planos/004-ambientacao-VN/analise/asset-manifest.md"
intended_llm_task: "validation-contract"
source_priority:
  - "decisões humanas aprovadas: Rheed canônico, Dulgarin em Confirmar e pacote criativo integral"
  - "planos/004-ambientacao-VN/analise/technical-analysis.md"
  - "planos/004-ambientacao-VN/analise/sintese.xml"
  - "POV e cross-review de technical-artist"
confidence: "high"
known_conflicts: []
replaced_by: null
---

# Manifesto final de assets — VN do Map046

## Estado e ação necessária

**Status: `awaiting-assets`.** O pacote criativo integral foi aprovado. O usuário deve adicionar os cinco assets novos abaixo exatamente nos paths congelados. Nenhum asset deve ser criado por este workflow e nenhuma alteração em `frontend/data/Map046.json` pode começar antes de todos os validators de presença passarem.

Decisões congeladas:

- `Rheed` é a grafia canônica para novos assets; o legado `Reed final.png` permanece inalterado.
- O ramo Confirmar estabelecerá `Dulgarin` em Actor 1 na implementação futura; isso não altera o conteúdo deste intake.
- Background, três expressões e Cut-In B10 estão aprovados.
- Fumaça, VFX, vídeo, áudio novo e nova arte de choice estão excluídos.

## Assets existentes — reuso obrigatório

| ID | Função | Path exato | Contrato de reuso |
| --- | --- | --- | --- |
| EXIST-01 | Busto neutro do contador | `frontend/img/pictures/Portraits/Principal/Reed final.png` | PNG RGBA 408×560; Picture ID 1; **não renomear**. |
| EXIST-02 | Busto neutro da criança | `frontend/img/pictures/Portraits/Principal/CriancaOrc_.png` | PNG RGBA 408×560; Picture ID 2; não renomear. |
| EXIST-03 | Choice normal | `frontend/img/pictures/Choices/InnButton_01.png` | PNG RGBA 388×101; preservar o papel configurado pelo plugin. |
| EXIST-04 | Choice hover | `frontend/img/pictures/Choices/InnButton_00.png` | PNG RGBA 392×104; preservar o papel configurado pelo plugin. |

Esses arquivos já existem. O intake deve confirmar path, case, decode e metadata sem movê-los ou editá-los.

## Assets novos — adicionar ao projeto

### NEW-BG-01 — Background noturno

- **Path e filename exatos:** `frontend/img/parallaxes/VN046_NoiteHistoria_BG.png`
- **Dimensões/formato:** 1280×720; PNG opaco. Se exportado como RGBA, todos os pixels devem ter alpha 255.
- **Finalidade/beat:** background único e estável de B01 a B11; camada de map parallax abaixo dos bustos.
- **Briefing visual:** noite comunitária neutra em Daratrine, íntima e acolhedora; formas arquitetônicas e silhuetas genéricas, sem landmark canônico inventado; luz quente concentrada no centro, preenchimento frio suave e bordas mais escuras. Usar formas grandes e baixa frequência visual atrás dos personagens. Não incluir texto, brasões, Gildrat como local presente, batalha, fumaça ou elemento narrativo não confirmado.
- **Pivô/safe area:** origem top-left em `(0,0)`; sem scaling. Manter conteúdo essencial a pelo menos 64 px das bordas. Reservar os 220 px inferiores com pouco detalhe e contraste. Evitar pontos luminosos e detalhes críticos atrás das posições de busto 1, 5 e 9.
- **Dependências:** usar como parallax, não como Show Picture; briefing e pacote criativo já aprovados; fill, contraste e lifetime continuam sujeitos a Playtest.
- **Validator de presença:** arquivo com case exato; decode PNG válido; dimensões 1280×720; opacidade total; checksum registrado. Falhar o intake se qualquer condição divergir.

### NEW-POR-01 — Rheed pensativo

- **Path e filename exatos:** `frontend/img/pictures/Portraits/Principal/Rheed_VN046_Pensativo.png`
- **Dimensões/formato:** 408×560; PNG RGBA com straight alpha e fundo totalmente transparente fora do personagem.
- **Finalidade/beat:** B02; esforço de memória antes da escolha `qualSeuNome`.
- **Briefing visual:** preservar personagem, figurino, paleta, pose e acabamento de `Reed final.png`. Expressão com sobrancelha elevada, olhar investigativo e boca fechada em meio-sorriso; pensativo sem parecer confuso, preocupado ou hostil. Não adicionar glow, sombra projetada, fundo ou mudança de costume.
- **Pivô/safe area:** bottom-center, anchor `(0.5,1.0)`, pivô de referência `(204,560)`. Preservar head placement, silhueta, alpha edge e contato inferior do legado. Manter todo pixel visível dentro de `x=0..407`, `y=0..559`, sem cortar cabelo, mãos ou roupa.
- **Dependências:** `Reed final.png` é a base visual e não deve ser renomeado; a grafia nova obrigatória é `Rheed`.
- **Validator de presença:** path/case exatos; decode PNG válido; 408×560; canal alpha presente; conteúdo não vazio; contato inferior e registro aprovados por overlay contra `Reed final.png`; checksum registrado.

### NEW-POR-02 — Rheed solene

- **Path e filename exatos:** `frontend/img/pictures/Portraits/Principal/Rheed_VN046_Solene.png`
- **Dimensões/formato:** 408×560; PNG RGBA com straight alpha e fundo transparente.
- **Finalidade/beat:** B08–B11; passagem de afeto por Daratrine para Gildrat, Thorin e o convite ritual da poção.
- **Briefing visual:** mesma identidade, figurino, paleta, pose e acabamento do legado. Suavizar o sorriso, relaxar a testa e dar ao olhar uma qualidade afetuosa, reverente e segura. Não transformar solenidade em tristeza, medo ou rigidez; não alterar o corpo ou o costume de forma perceptível.
- **Pivô/safe area:** bottom-center, anchor `(0.5,1.0)`, pivô de referência `(204,560)`. Repetir exatamente o contrato de registro, silhueta, head placement, alpha edge e contato inferior de NEW-POR-01.
- **Dependências:** `Reed final.png` como base visual; grafia `Rheed` congelada; deve permitir swap sem salto em Picture ID 1.
- **Validator de presença:** path/case exatos; decode PNG válido; 408×560; alpha presente; conteúdo não vazio; overlay aprovado contra `Reed final.png`; checksum registrado.

### NEW-POR-03 — Criança orc surpresa

- **Path e filename exatos:** `frontend/img/pictures/Portraits/Principal/CriancaOrc_VN046_Surpresa.png`
- **Dimensões/formato:** 408×560; PNG RGBA com straight alpha e fundo transparente.
- **Finalidade/beat:** B04 do ramo Confirmar; reação curta ao contador acertar `Dulgarin`.
- **Briefing visual:** preservar personagem, figurino, paleta, pose, proporções e acabamento de `CriancaOrc_.png`. Abrir mais os olhos, deixar a boca ligeiramente entreaberta e permitir leve elevação dos ombros. A leitura deve ser surpresa genuína e curiosa, nunca medo, horror ou choro.
- **Pivô/safe area:** bottom-center, anchor `(0.5,1.0)`, pivô de referência `(204,560)`. Preservar head placement, silhueta, alpha edge e contato inferior do neutro; manter todo pixel visível dentro do canvas sem clipping.
- **Dependências:** `CriancaOrc_.png` é a base visual e permanece inalterado; deve permitir swap sem salto em Picture ID 2.
- **Validator de presença:** path/case exatos; decode PNG válido; 408×560; alpha presente; conteúdo não vazio; overlay aprovado contra `CriancaOrc_.png`; checksum registrado.

### NEW-CUT-01 — Cut-In de introdução de Thorin

- **Path e filename exatos:** `frontend/img/pictures/CutIns/VN046_ThorinIntroducao_CutIn.png`
- **Dimensões/formato:** 1280×720; PNG. RGBA 32-bit é aceito, inclusive com alpha totalmente opaco; não embutir texto.
- **Finalidade/beat:** B10; único pico visual da VN no momento em que Thorin é apresentado.
- **Briefing visual:** Thorin em meia figura ou três quartos, ocupando aproximadamente 55–65% da área útil, com pose firme/cabeça-dura e olhar direcionado para dentro do quadro. Usar referência canônica aprovada do personagem. O fundo pode sugerir Gildrat apenas por formas abstratas, pedra e calor de forja, com contraste quente/frio moderado. Não representar montanha literal, discussão com montanha, batalha, brasões, arquitetura específica, spoiler, multidão ou gag caricatural.
- **Pivô/safe area:** centro, anchor `(0.5,0.5)`, pivô de referência `(640,360)`. Manter o foco dentro de `x=96..1184`, `y=48..520`; reservar os 200 px inferiores com baixa informação se a message window permanecer visível.
- **Dependências:** referência canônica de Thorin; uso aprovado somente em B10; slot de Picture ID permanece decisão de implementação após inventário de ownership. O asset não autoriza reservar ID nem alterar runtime.
- **Validator de presença:** path/case exatos; decode PNG válido; 1280×720; checksum registrado; revisão humana confirma safe area, ausência de texto e conformidade com a referência/briefing antes de liberar implementação.

## Exclusões vinculantes

Não adicionar nem solicitar nesta entrega:

- fumaça, overlay de poção, VFX ou Picture ID 4;
- vídeo ou animação frame a frame;
- BGM, BGS, ME, SE ou outro áudio novo;
- nova arte para `qualSeuNome` ou substitutos de `InnButton_00/01`;
- novo sprite, tileset, ícone, text overlay ou asset não listado em NEW-BG-01, NEW-POR-01, NEW-POR-02, NEW-POR-03 e NEW-CUT-01.

## Checklist do usuário

- [ ] Adicionei NEW-BG-01 exatamente como `frontend/img/parallaxes/VN046_NoiteHistoria_BG.png`.
- [ ] Adicionei NEW-POR-01 exatamente como `frontend/img/pictures/Portraits/Principal/Rheed_VN046_Pensativo.png`.
- [ ] Adicionei NEW-POR-02 exatamente como `frontend/img/pictures/Portraits/Principal/Rheed_VN046_Solene.png`.
- [ ] Adicionei NEW-POR-03 exatamente como `frontend/img/pictures/Portraits/Principal/CriancaOrc_VN046_Surpresa.png`.
- [ ] Adicionei NEW-CUT-01 exatamente como `frontend/img/pictures/CutIns/VN046_ThorinIntroducao_CutIn.png`.
- [ ] Mantive `Reed final.png`, `CriancaOrc_.png` e `InnButton_00/01.png` sem rename ou edição.
- [ ] Confirmei as dimensões, formato, alpha, pivô e safe areas descritos para cada asset.
- [ ] Não adicionei fumaça/VFX, vídeo, áudio ou nova choice art a este pacote.
- [ ] Informei ao executor que os cinco assets estão disponíveis para o intake local.

## Gate de presença e próximo estado

O executor deve verificar os cinco paths exatos, case, decode, dimensões, alpha aplicável e checksum; variantes de busto exigem overlay e o Cut-In exige revisão humana do briefing. O status só pode mudar de `awaiting-assets` depois que todos os checks passarem.

Estimativa técnica: se os cinco bustos do conjunto final, background, Cut-In e os dois estados de choice residissem simultaneamente como RGBA, o total teórico seria aproximadamente **11,694 MiB**, sem engine/UI, duplicação de cache ou transições. Isso é orçamento estático, não medição de memória ou performance. A implementação deve preloadar apenas o conjunto necessário e manter profiling/Playtest pendentes.

## Fontes

- `planos/004-ambientacao-VN/analise/technical-analysis.md`
- `planos/004-ambientacao-VN/analise/sintese.xml`
- `planos/004-ambientacao-VN/analise/agentes/technical-artist.xml`
- `planos/004-ambientacao-VN/analise/agentes/technical-artist-review.xml`
- Decisões humanas aprovadas deste handoff: Rheed canônico; legado preservado; Confirmar define Dulgarin; pacote criativo integral; sem fumaça, vídeo ou áudio.
