# GDD: Personagem — Template

<!-- Somente TEMPLATE. Não descreva conteúdo final aqui. -->

- Público-alvo: equipe de desenvolvimento e design
- Base considerada: “Parte III: Povoando o Mundo — Personagens e Arcos” (documento interno citado)
- Escopo: definir UM personagem (identidade narrativa + comportamento em jogo), mantendo linguagem agnóstica de engine

## Narrativa

### 1) Identidade & Papel

- Nome
- Apelidos
- Títulos
- Papel (protagonista/antagonista/aliado/mentor)
- Arquétipo (junguiano/narrativo)
- Afiliação/Facção (se houver)
- Status social
- Logline (1 frase, verbo ativo, sem nomes próprios)
- Virtudes (3)
- Vícios (2)
- Defeito operacional
- Objetivo consciente (Want)
- Necessidade oculta (Need)
- Medo/Limite

### 2) Biografia & Motivação

- Origem (resumo)
- Ferida/Escassez
- The Lie (Crença Falha)
- The Truth (Realização)
- Eventos formadores (2–3) e impacto no comportamento atual
- Conflito Interno (ex.: Dever vs. Desejo)
- Conflito Externo (ex.: vs. instituição/oponente)
- Valores
- tabus
- gatilhos emocionais
- Segredos e riscos se expostos

### 3) Arco Dramático

- Batidas: Setup, Incidente Incitante, Virada 1, Meio, Crise, Clímax, Desfecho
- Para cada batida: evento gatilho (narrativo), objetivo da cena, consequência
- E–C–R: pelo menos 2 decisões críticas com retorno posterior

### 4) Relações (Mapa)

- Mapa de Relacionamentos (subtabela):
  - Nome/Referência
  - Tipo (Aliado/Rival/Mentor/Dependente)
  - Estado Inicial
  - Evolução/condições de mudança
  - Estado Final
- Vínculos com facções/grupos (se houver) e compromissos
- Descrição da relação (tensões/contradições e arco da relação)

### 5) Aparência & Voz

- Silhueta, trajes/ícones, marcas visuais
- Expressões/gestos recorrentes, maneirismos
- Diretrizes de fala (ritmo, vocabulário, muletas)
- 3 exemplos de fala em tons distintos (neutro, tensão, intimidade)

## Jogo

### 6) Estados do Personagem

- Estados globais (ex.: aliado, hostil, disponível, derrotado)
  - Para cada estado: o que representa, efeitos na gameplay (o que habilita/restringe), exemplo prático de ocorrência
- Estados locais por área/cena (presença/ausência, condição de disponibilidade)
  - Para cada estado local: quando aparece, o que muda na interação, exemplo prático
- Indicadores (numéricos ou por níveis) — opcional
  - Para cada indicador: nome, o que é, o que controla na gameplay, exemplo prático (ex.: “confiança” de 0–100 libera diálogo especial ao atingir 40)
- Estado inicial e condições de transição entre estados/indicadores

### 7) Interações & Diálogo (Árvores + E–C–R)

- Estados de fala por condição (linhas, variações, fallback)
- Árvores de escolha por contexto, com E–C–R (Escolha → Consequência → Retorno)
- Efeitos por escolha: alterar estados ou indicadores; conceder itens/moeda; acionar rotina/evento
- Exemplo prático de indicador (sem nomenclatura técnica): “Reconhecer esforço” aumenta o indicador de confiança; ao atingir um patamar definido, libera nova opção de diálogo

### 8) Comportamento/Rotina (se aplicável)

- Agenda (dia/noite/condições), posições-chave, deslocamento/caminho
- Regras de disponibilidade (ex.: só aparece em condição X)
- Ações reativas (ex.: foge, acompanha, ajuda) por condição

### 9) Implementação & Testes

- Tarefas (cenas/objetos relevantes, estados/condições a criar ou verificar)
- Quests associadas ao personagem (IDs/nomes) e pontos de entrada
- Ganchos de diálogo chave (cenas/locais)
- Impacto das escolhas do jogador neste personagem (efeitos e onde retornam)
- Dependências externas (módulos/extensões) e alternativas agnósticas
- Casos de teste: passos, estado inicial, ação, estado esperado (estados/indicadores/efeitos)

## Jornada do Herói

### Metadados da História

- Título provisório
- Gênero: RPG old-school, fantasia sombria
- Público-alvo: adolescentes e jovens adultos
- Logline (1 frase, verbo ativo, contraste)
- Premissa (tese em causa → efeito)
- Tema(s) primário e secundários
- Tom e atmosfera
- Motivos/símbolos recorrentes

---

### Ato I — Setup (Partida)

Objetivo do Ato

- Apresentar mundo comum, protagonista, lacunas internas e a promessa da aventura; forçar decisão que rompa o status quo.

Estágios da Jornada (Act I)

- Mundo Comum
  - O que mostrar: rotina; competência/limitação; falhas que pedem mudança
  - Campos: cena(s) de abertura; detalhe visual/sonoro de identidade; falta que dói
- Chamado à Aventura
  - O que mostrar: evento/convite/ameaça que exige ação.
  - Campos: incidente; custo de ignorar; oportunidade percebida.
- Recusa do Chamado
  - O que mostrar: medo, racionalização, barreiras externas.
  - Campos: argumento interno; consequência da recusa; pressão crescente.
- Encontro com o Mentor
  - O que mostrar: conselho, ferramenta, princípio; limites do mentor.
  - Campos: lição em 1 frase; presente simbólico; preço a pagar.
- Travessia do Primeiro Limiar
  - O que mostrar: decisão irreversível e novo mundo/regra.
  - Campos: gesto de compromisso; nova regra aprendida; ponto de não retorno.

---

### Ato II — Confronto (Iniciação)

Objetivo do Ato

- Testar o protagonista; aprofundar vínculos e antagonismos; aproximar do coração do conflito; enfrentar provação central.

Estágios da Jornada (Act II)

- Testes, Aliados e Inimigos
  - O que mostrar: progressos e tropeços; formação do grupo; primeiros antagonismos.
  - Campos: 2–3 testes; aliado-chave; inimigo ou obstáculo recorrente.
- Aproximação da Caverna Oculta
  - O que mostrar: preparação; dúvidas; riscos elevados.
  - Campos: plano e falhas do plano; segredo revelado; custo antecipado.
- Provação Suprema (Ordeal)
  - O que mostrar: crise que ameaça tudo; morte simbólica/real; escolha definidora.
  - Campos: o que está em jogo; decisão impossível; perda/transformação.
- Recompensa (Apreensão do Elixir)
  - O que mostrar: ganho concreto/simbólico; nova compreensão.
  - Campos: o que se ganha; novo poder/conhecimento; custo residual.

---

### Ato III — Resolução (Retorno)

Objetivo do Ato

- Levar as consequências ao ápice; integrar a transformação; retornar com algo que cura o mundo comum.

Estágios da Jornada (Act III)

- Caminho de Volta
  - O que mostrar: retaliação do antagonista; urgência; fechamento de subtramas.
  - Campos: prazo/pressão; sacrifício necessário; reconciliações/rupturas.
- Ressurreição (Clímax)
  - O que mostrar: prova final que exige a nova versão do herói; síntese de tema e escolha.
  - Campos: confronto definitivo; demonstração da mudança; resolução do conflito central.
- Retorno com o Elixir
  - O que mostrar: cura/benefício para a comunidade; novo status quo.
  - Campos: elixir (o que muda no mundo); imagem final espelhando a inicial; gancho ou epílogo (opcional).

---

### Pacing & Estrutura de Tensão

- Midpoint: revelação/derrota parcial que inverte direção
- Pinch Points: pressões do antagonista (1 no início do Ato II, 1 antes da Aproximação)
- Escalada de riscos: emocional → relacional → existencial
- Ganchos de fim de ato: pergunta aberta clara e relevante

### Temas em Ação

- Tema primário: manifestações em cenas (diálogo, ação, símbolo)
- Temas secundários: 2 exemplos práticos cada

### Quadro de Cenas (rascunho)

Para cada cena, preencher:

- Ato e título da cena
- Local e tempo
- Personagens presentes
- Objetivo dramático da cena
- Conflito (interno/externo)
- Virada/saída (o que muda)
- Imagem/gesto simbólico (se houver)

<!-- Fim do template -->
