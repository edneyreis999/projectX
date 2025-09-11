# Plano de Pesquisa v1 — melhor-texto-imagem-jogos-q3-2025

1) Objetivo e Resultados esperados

- Objetivo: comparar modelos e ferramentas atuais de texto→imagem (set/2025) para uso em criação de jogos, produzindo um ranking por caso de uso com evidências e custos.
- Métrica de sucesso: ranking justificado por 5+ critérios, 20+ evidências citadas com data/fonte, custos por 1k imagens, e recomendações por caso (concept art 2D, pixel art, texturas PBR, ícones/UI, tiles isométricos, posters/key art).
- Abrangência: modelos fechados e open‑source acessíveis via API/UX pública e MCPs com foco em produção de ativos de jogos.
- Resultado: tabela comparativa + conjunto de prompts de teste + pasta de evidências (amostras, metadados, custos).

1) Escopo e Fora de Escopo

- Escopo: geração de imagens estáticas a partir de texto e/ou image+text; upscalers/variantes; controles (sketch/pose/edge/seg); in/outpainting; estilos relevantes a jogos; consistência de estilo multi‑imagem; geração de texturas (incl. seamless); suporte a transparência/alpha; parâmetros de reprodutibilidade (seed/CFG/steps) e APIs.
- Fora de escopo: vídeo (ex.: Runway Gen‑3, Pika) — apenas citar se influenciar roadmap de imagem; 3D mesh direto (NeRF/GSplat) — apenas quando impactar texturização; modelos puramente de edição local sem capacidade T2I.

3) Perguntas de Pesquisa

1. Qual modelo/ferramenta entrega maior qualidade perceptiva por caso de uso de jogo (concept art, pixel art, texturas PBR/tiling, ícones/UI, tiles isométricos, posters), mantendo aderência ao prompt e anatomia/coerência?
2. Quais suportam melhor consistência de estilo em séries (20+ imagens) e controle (referência de estilo/imagem, pose, negative prompts, ControlNet/LoRA)?
3. Quais oferecem melhor custo/latência/throughput e recursos de produção (API/MCP estável, seeds, batches, limites, disponibilidade regional, SLO)?
4. Quais possuem termos de uso/licenciamento mais adequados (comercial, direitos/indemnity, restrições de conteúdo, privacidade de ativos)?
5. Quais têm comunidade/ecossistema, modelos/LoRAs/estilos disponíveis e documentação madura para pipelines de jogos?
6. O que mudou nos últimos 90 dias (set/2025) em versões, qualidade e políticas?

4) Hipóteses e como falsificar

- H1: Modelos fechados SoTA (ex.: Midjourney, OpenAI Image, Google Imagen, Adobe Firefly, Ideogram) superam open‑source em anatomia e coerência de cenas complexas. Falsificação: estudos recentes ou benchmarks independentes onde SD3/SDXL‑turbo/Flux/Playground v2/others empatam ou superam com validação humana.
- H2: Para pixel art e ícones consistentes, ferramentas com controles fortes (ref de estilo, LoRA, ControlNet) e seeds reprodutíveis dominam. Falsificação: evidências de instabilidade de estilo/seed ou menor aderência vs. concorrentes.
- H3: Para texturas PBR/tiling, pipelines com suporte nativo a padrão/seamless e mapas (albedo/normal/roughness) são superiores. Falsificação: outputs com bleeding ou falhas de tiling comparativamente piores.
- H4: Custos e latência variam significativamente por provedor (>3×); open‑source hospedado pode ser mais econômico em lotes. Falsificação: paridade de custo/latência entre líderes.
- H5: Políticas e indemnity da Adobe Firefly continuam diferencial para estúdios; Falsificação: mudança de políticas concorrentes com garantias equivalentes.

5) Fontes e Critérios de Seleção

- Fontes‑alvo: documentação oficial e changelogs; posts/eng de produto; papers/benchmarks independentes; repositórios e hubs (Hugging Face, CivitAI — com cautela); reviews técnicos; galerias/leaderboards; comunidades dev‑art (ArtStation, Polycount, gamedev subreddits) com posts datados e exemplos.
- Critérios: atualidade (≤90 dias), confiabilidade/autoridade (site oficial, revisor técnico), replicabilidade (parâmetros e seeds explícitos), diversidade (≥3 fontes independentes por alegação), rastreabilidade (links, datas, citações diretas), imagens em resolução nativa sem filtros.

6) Método e Passos Operacionais

1. Mapear candidatos e versões (set/2025): Midjourney (v6+), OpenAI Image (model name vigente), Google Imagen 3, Adobe Firefly 3, Ideogram 2, Stability (SD3/SDXL‑turbo), Playground v2, Flux, Leonardo, Krea, Playground/Invoke/ComfyUI pipelines, Kandinsky/AltDiffusion (se relevantes), e outros emergentes. Registrar disponibilidade (web/API) e regiões.
2. Definir suíte de prompts de teste por caso:
   - Concept art 2D estilizado (fantasia sombria, sci‑fi limpo) em 1024–1536px.
   - Pixel art 64×64 e 128×128 (personagem, item, inimigo) com outline e paleta limitada.
   - UI/ícones: 20 ícones consistentes, fundo transparente, 256×256 e 512×512.
   - Texturas PBR: albedo/normal/roughness; versão seamless 512×512 e 1024×1024.
   - Tiles isométricos 256×256 seamless (grama, pedra, madeira) com variações.
3. Execução controlada:
   - Fixar seeds quando possível; registrar parâmetros (CFG/steps/guidance), referências de estilo/imagem, negativas.
   - Gerar 10 amostras por caso/provedor; medir latência, custo, taxa de erro/moderação.
4. Avaliação híbrida:
   - Humana: 3+ avaliadores com rubrica por critério (aderência ao prompt, anatomia/coerência, consistência de estilo, detalhamento, text legibility p/ ícones, seamless score p/ texturas, estética geral).
   - Automática: CLIPScore/BLIP‑based caption match, ImageReward/PickScore (se aplicável), detecção de tiling/edges, checagem de alpha, variação entre seeds (std/PSNR/SSIM entre variações).
   - Torneio par‑a‑par (Elo) por caso.
5. Síntese:
   - Tabelas: qualidade média, desvio, custo/1k imagens, latência p50/p95, features, TOS/licenças, API.
   - Recomendações por caso + riscos/limitações + próximos passos.

6) Riscos de Alucinação e Mitigações

- Versões e recursos mudam rápido: exigir datas precisas e changelogs oficiais; validar com 2+ fontes.
- Amostras “hero” de marketing: priorizar benchmarks independentes e reprodutíveis; coletar amostras próprias quando possível.
- Métricas visuais automáticas frágeis: combinar com avaliação humana e critérios específicos de jogo (seamless, paleta, legibilidade).
- Políticas/TOS complexas: citar seções específicas com data; não inferir direitos.
- Custo variável por região e plano: registrar moeda e data; normalizar para USD.

9) Critérios de Aceitação e Métricas

- Lista de candidatos com versões e disponibilidade confirmadas (≥10 provedores, 90‑day freshness).
- 6 casos de uso cobertos com 10 amostras cada por provedor (onde possível) OU justificativa de impedimento/moderação.
- Ranking por caso com justificativa e intervalo de confiança (baixa/média/alta) + custos e latência.
- 20+ fontes citadas, 70% independentes; todas com data e trechos.
- Repositório de evidências organizado e metadados completos.

10) Prompts para Gemini Deep Research (copiar e colar)

Contexto do sistema:
Você é Aelion Verdesábio, estrategista de pesquisa. Sua missão é comparar modelos/ferramentas de geração de imagens por texto no contexto de criação de jogos, com foco em qualidade visual por caso de uso, consistência de estilo, controles, custo/latência e políticas de uso. Trabalhe com rigor: cite fontes datadas e confiáveis, verifique mudanças dos últimos 90 dias (setembro/2025) e forneça evidências reprodutíveis.

Tarefa específica:

1) Mapear e listar, com versões atuais (set/2025) e disponibilidade (web/API): Midjourney (v6+), OpenAI Image (nome do modelo vigente), Google Imagen 3, Adobe Firefly 3, Ideogram 2, Stability (SD3/SDXL‑turbo), Playground v2, Flux, Leonardo, Krea, Kandinsky, e outros relevantes. Inclua novidades dos últimos 90 dias.
2) Para cada provedor, coletar: qualidade (com amostras e referências), controles (ref de imagem/estilo, LoRA, ControlNet, in/outpainting, transparência/alpha, tiling), reprodutibilidade (seed), custo estimado por 1k imagens 1024×1024, latência típica, limites/rate, API e SDKs, TOS/licenças/indemnity, restrições de conteúdo/moderação.
3) Produzir um ranking por caso de uso de jogo: concept art 2D, pixel art 64–128 px, ícones/UI com fundo transparente, texturas PBR/tiling 512–1024 px, tiles isométricos 256 px, posters/key art. Para cada caso: top‑3 com justificativas, exemplos e pontos fracos.
4) Destacar alterações recentes (≤90 dias) que mudem o ranking. Informar incertezas e itens controversos.

Guardrails (do/don’t):

- Não invente versões ou capacidades; sempre inclua fonte e data. Se não encontrar confirmação, marque como “incerto”.
- Priorize fontes oficiais, changelogs e análises técnicas independentes; evite posts sem data ou sem parâmetros reprodutíveis.
- Inclua pelo menos 2 fontes independentes para cada alegação importante; quando conflitarem, descreva o conflito e a decisão.
- Forneça exemplos visuais com links diretos (quando permitido) e informe parâmetros quando disponíveis.
- Atente a TOS/licenças e indemnity; cite a seção e a data.

Formato de saída (obrigatório):

1) Resumo executivo (5–8 bullets) com ranking geral e por caso.
2) Tabela comparativa por provedor: versão, qualidade por caso (qualitativa), controles, seed, custo/1k, latência, API, TOS/licenças.
3) Seção “Mudanças recentes (≤90 dias)”.
4) Recomendações por caso, riscos e próximos passos.
5) Apêndice: lista de fontes com citação completa (título, autor, URL, data pub./atualização, data de acesso, trecho citado).
6) JSON final embutido em bloco de código com o seguinte shape: {
  "timestamp": "YYYY-MM-DD",
  "candidatos": [
    {"nome": "Midjourney", "versao": "v?", "web": true, "api": false, "mudancas_90d": ["..."]}
  ],
  "ranking": {
    "concept_art": ["..."],
    "pixel_art": ["..."],
    "icones_ui": ["..."],
    "texturas_pbr": ["..."],
    "tiles_isometricos": ["..."],
    "posters_keyart": ["..."]
  },
  "custos": {"provedor": {"por_1k_1024": 0}},
  "latencias": {"provedor": {"p50_ms": 0, "p95_ms": 0}},
  "evidencias": [{
    "provedor": "...",
    "caso": "...",
    "link": "...",
    "data": "YYYY-MM-DD",
    "parametros": {"prompt": "...", "negativas": "...", "seed": 0, "cfg": 0, "steps": 0}
  }],
  "fontes": [{"titulo": "...", "autor": "...", "url": "...", "data_publicacao": "YYYY-MM-DD", "data_acesso": "YYYY-MM-DD", "trecho": "..."}]
}

Passos de validação/auto‑checagem:

1) Liste todas as alegações quantitativas/qualitativas e suas fontes; para cada uma, verifique se há pelo menos duas fontes independentes recentes.
2) Releia o ranking por caso e identifique possíveis vieses (ex.: priorizar marketing sample). Ajuste se necessário.
3) Cheque datas e versões; se qualquer item estiver desatualizado (>90 dias), sinalize como potencialmente inválido.
4) Apresente incertezas explícitas e itens que requerem coleta de amostras próprias.
