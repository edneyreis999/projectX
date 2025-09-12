# Plano de Pesquisa v1 — MJv6-Mapas-Daratrine

1) Objetivo e Resultados esperados (SMART)

- Objetivo: aprender e operacionalizar Midjourney v6+ para acelerar a criação de concepts de mapas mantendo o estilo já definido pelo artista, produzindo prompts reprodutíveis que combinam imagens de referência do style guide + narrativa detalhada.
- Resultados: 12–20 concepts válidos em 7–10 dias; redução de 40–60% no tempo por concept vs. baseline manual; consistência de estilo ≥ 4/5 em avaliação cega do artista; biblioteca de 5–8 templates de prompt com exemplos e seeds.
- Entregáveis: kit de prompts (Markdown), guia de uso no Discord (passo a passo), seed bank, planilha de rastreio e checklist de revisão de estilo.

2) Escopo e Fora de Escopo

- Escopo: uso do Midjourney v6+ via Discord; configuração /settings; composição de prompts com múltiplas imagens de referência (estilo e layout); parâmetros essenciais (`--style raw`, `--stylize`, `--chaos`, `--ar`, `--seed`, `--iw`, `--no`), Remix Mode, Vary (Region), Upscale e variações; estratégia para consistência entre múltiplos mapas.
- Fora de escopo: treino de modelos próprios (SD/LoRA), automações externas, texturas PBR dedicadas, questões contratuais de plano/licenciamento; pipelines SD/ComfyUI (apenas referência contextual).

3) Perguntas de Pesquisa (MECE)

- Configuração: como habilitar v6, Remix, variação e registrar seeds no Discord? Como organizar o workflow em DM vs. servidor próprio?
- Estilo: quantas imagens de referência usar (2–5)? Como equilibrar peso de imagens (`--iw`) vs. texto para preservar o “traço” do artista?
- Controle: quando usar `--style raw` e qual faixa de `--stylize` maximiza aderência sem “lavar” o estilo? Qual impacto de `--chaos` na exploração inicial?
- Consistência: como reaproveitar seeds e “prompts-casca” para séries de mapas? Como padronizar proporções (`--ar`) por tipo de entrega (key art, captura 16:9, quadrado)?
- Composição: como ancorar layout/landmarks (ex.: rascunho/esboço) e ainda manter o estilo? Como usar Vary (Region) para ajustes locais?
- Limites: o que MJ não faz bem para mapas (ex.: tipografia coerente, grade exata)? Quais riscos de ToS/licença ao usar imagens do nosso style guide (direitos próprios vs. terceiros)?

4) Hipóteses e como falsificar

- H1: 3–5 imagens do style guide + `--style raw` + `--stylize` 50–120 produzem ≥ 4/5 de aderência ao estilo.
  - Falsificação: A/B cego pelo artista entre (a) com refs e (b) sem refs; se (a) ≤ 3/5, hipótese refutada.
- H2: Fixar `--seed` e reaproveitar “prompt-casca” mantém consistência de família de mapas (paleta/traço) com variação controlada.
  - Falsificação: avaliação cega de 6 outputs com e sem seed fixo; se consistência percebida não aumentar, hipótese refutada.
- H3: Um rascunho simples (thumbnail/lineart) como imagem de referência adicional melhora preservação de composição (≥ 80% de landmarks iguais).
  - Falsificação: medição por sobreposição (overlay) de 5 casos; se desvio estrutural > 20% persistir, refutar.

5) Fontes e Critérios de Seleção

- Fontes-alvo: documentação oficial do Midjourney (model settings, parâmetros v6), changelogs/announcements, guias da comunidade com demonstrações reproduzíveis, vídeos com prompts e seeds no descritivo.
- Critérios: atualidade (v6+), autoridade (docs oficiais ou criadores reconhecidos), reprodutibilidade (prompt + seed + imagens/links), exemplos visuais comparáveis a mapas/isométricos/ilustração painterly.

6) Método e Passos Operacionais

- Preparação
  - Conta e acesso: entrar no Discord do Midjourney; confirmar plano ativo; preferir canal privado/servidor próprio para organização.
  - /settings: selecionar “Model v6”; ativar “Remix mode” quando for iterar microajustes; começar com “High Variation Mode: off”.
  - Organização: criar pasta local “MJv6-Mapas” com subpastas /refs (estilo, layout), /outputs (por data), /seeds (CSV/MD).

- Curadoria de Referências
  - Estilo: 3–5 imagens do style guide do artista (direitos próprios); cobrir paleta, pincelada, densidade de detalhe.
  - Layout (opcional): 1 rascunho simples do mapa (miniatura com landmarks) exportado como PNG.
  - Upload: arrastar as imagens no Discord para obter URLs; checar que os links sejam acessíveis no prompt.

- Template de Prompt (casca)
  - Estrutura: [imagens de estilo 2–5] + [imagem de layout opcional] + [descrição detalhada do narrative design] + [constraints estéticas] + [parâmetros].
  - Parâmetros-base sugeridos: `--v 6 --style raw --stylize 80 --chaos 10 --ar 3:2 --seed <fixo>` e `--iw` 0.5–1.5 por imagem de estilo (ajustar empiricamente). Usar `--no` para proibir elementos.

- Loop de Iteração
  - Exploração: gerar 1–2 grids; selecionar 2 melhores; usar Upscale para detalhar; ativar Remix para pequenos ajustes textuais ou de parâmetros.
  - Ajuste Fino: Vary (Region) para corrigir áreas (ex.: rios, montanhas, vilas) sem perder o estilo global.
  - Controle de Estilo: se “lavado”, reduzir `--stylize` e/ou elevar peso das imagens (`--iw`). Se preso demais, aumentar `--chaos` levemente (10→15) para explorações.
  - Registro: salvar prompt+seed+parâmetros+thumb no CSV/Markdown; exportar outputs finais com nomenclatura padrão.

- Consistência entre Mapas
  - Reusar seed bank (3–5 seeds “boas” por bioma/tema).
  - Fixar `--ar` e conjunto de refs por “família” de mapas.
  - Manter “vocabulário” do prompt-casca estável; alterar apenas termos de conteúdo (bioma, clima, pontos de interesse).

- Validação com Artista
  - Checklist de estilo: paleta, traço/pincelada, densidade de detalhe, coerência de luz, leitura de gameplay.
  - Aceitação: ≥ 4/5 na soma dos critérios; feedback vira ajuste no prompt-casca.

7) Evidências e Rastreabilidade

- Registro mínimo por execução: data, prompt completo, seed, imagens (links), parâmetros usados, thumbs 4-up e upscale final.
- Planilha (CSV/MD): colunas [id, bioma/tema, refs, prompt, seed, stylize, chaos, ar, iw, score artista, observações].
- Citação de fontes (quando conectados): link direto para docs/announcements; screenshots de /settings e parâmetros.

8) Riscos de Alucinação e Mitigações

- Prompt vago → usar narrativa detalhada (bioma, clima, landmarks, hierarquia visual) e imagens de estilo.
- Estilo “lavado” pelo modelo → `--style raw`, baixar `--stylize` (ex.: 50–80), subir `--iw` nas imagens de estilo.
- Inconsistência entre peças → fixar `--seed`, congelar prompt-casca, limitar mudanças por iteração, padronizar `--ar`.
- Deriva de composição → incluir rascunho/layout como imagem; usar Vary (Region) para correções localizadas.
- Questões legais/ToS → usar apenas imagens de sua autoria/direitos; evitar refs de terceiros; checar licenças.

1) Prompts para Gemini Deep Research

- a) Contexto do sistema
  - Você é um assistente de pesquisa focado em Midjourney v6 para concept art de mapas em estilo painterly top down de jogos de RPG digital classicos, com ênfase em consistência de estilo a partir de imagens de referência do artista.

- b) Tarefa específica
  - Produzir um guia prático e atualizado para: (1) configurar MJ v6 no Discord; (2) compor prompts com 2–5 imagens de estilo + 0–1 imagem de layout; (3) ajustar `--style raw`, `--stylize`, `--chaos`, `--ar`, `--seed`, `--iw`, `--no`; (4) usar Remix e Vary (Region) para refino; (5) criar um “prompt-casca” reusável para séries de mapas; (6) melhores práticas de consistência entre múltiplos mapas.

- c) Guardrails (do/don’t, limites, verificação)
  - Do: citar docs oficiais do Midjourney e changelogs v6; incluir exemplos de prompts com imagem-URL dummy e seeds; explicar trade-offs de cada parâmetro; indicar quando features mudaram entre v5/v6.
  - Don’t: usar fontes sem data/autoridade; confundir parâmetros obsoletos; sugerir uso de imagens sem direitos.
  - Verificação: para cada recomendação, incluir link, trecho/print, e um microteste reprodutível (prompt+seed) com resultado esperado.

- d) Formato de resposta e campos obrigatórios
  - Seções: Configuração, Referências, Template de Prompt, Parâmetros (tabela rápida), Fluxo de Iteração, Exemplos (2) e Contraexemplo (1), Checklist de Consistência, FAQ.
  - Para cada exemplo: prompt completo, explicação de cada parte, seed e por que os parâmetros.

- e) Passos de validação/auto-checagem
  - Conferir se todos os parâmetros existem e são válidos no v6 atual.
  - Testar `--style raw` vs. default com o mesmo prompt; reportar diferenças.
  - Variar `--stylize` (50, 80, 120) e `--chaos` (0, 10, 20) e comparar aderência x diversidade.

—

Exemplos de Prompt (para uso no Discord do MJ)

- Exemplo 1 (com refs de estilo)
  - `[url_ref_estilo_1] [url_ref_estilo_2] isometric hand-painted fantasy map of an ancient forest valley, coherent gameplay landmarks (village, river crossing, watchtower), atmospheric depth, soft brushwork, cohesive color script, painterly edges per Daratrine style, no modern elements, no text overlays --v 6 --style raw --stylize 80 --chaos 10 --ar 3:2 --seed 23157 --iw 1.2 --no copyright text`

- Exemplo 2 (com layout + estilo)
  - `[url_layout_rascunho] [url_ref_estilo_1] [url_ref_estilo_2] isometric hand-painted desert frontier map, canyon ridges, oasis, caravan route, warm palette, subtle ornamentation, consistent scale, clean silhouettes, readable POIs, per Daratrine art bible --v 6 --style raw --stylize 60 --chaos 8 --ar 16:9 --seed 10403 --iw 1.0 --no sci-fi`

- Contraexemplo (ruim)
  - `fantasy map` (vago; sem refs; sem constraints) → alto risco de estilo genérico e landmarks incoerentes.

Checklist Rápido de Execução

1) /settings → v6 ativo; considerar Remix: on para iterações.
2) Subir 2–5 refs de estilo (e 0–1 layout); copiar URLs.
3) Montar prompt-casca com narrativa detalhada + constraints + parâmetros.
4) Gerar, escolher 2 melhores; Upscale; Vary (Region) para correções locais.
5) Registrar prompt, seed, parâmetros e thumbs; avaliar com artista (≥ 4/5).

Observações finais

- Ambiente atual sem internet: este plano marca pontos de verificação e microtestes; ao conectar, validar cada parâmetro na documentação oficial do Midjourney v6 e anexar links/capturas.
