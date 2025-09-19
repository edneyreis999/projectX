# Plano de Alteração — Sistema de Magia (v3)

Objetivo

- Elevar a explicação do sistema de magia em Ekios incorporando uma ontologia clara: reino paralelo (fonte), barreira (cicatriz), ressonância/sonhos e riscos de intrusão; detalhar telepatia e falar com os mortos como expressões da mesma sintonia; alinhar exemplos, custos e consequências sociais sem citar nomes próprios externos.

Escopo e Saídas

- Não alterar `frontend/docs/GDD/2-world-building/magia.md` diretamente.
- Criar uma nova versão: `frontend/docs/GDD/2-world-building/magia.v3.md` copiando o conteúdo atual de `magia.md` e adicionando/ajustando as melhorias descritas abaixo.
- Atualizar referências cruzadas em narrativa após a aprovação da v3 (sem editar agora):
  - `frontend/docs/GDD/GDD.Narrative-geral.md` (sec. 5) — linkar explicação do poder de Thorin às seções “Ressonância & Ecos” e “Ancoragem”.
  - Registrar notas para S2/S7 conforme decisões já logadas em `zord/sessoes/ekios-world/ekios-world-v2.log.md`.

Entradas de referência

- Base técnica externa: `temp-gdd-ekios/Dragon Age_ Magia.docx` (conceitos a adaptar, NUNCA copiar nomes próprios).
- Documento alvo: `frontend/docs/GDD/2-world-building/magia.md` (base v2).
- Contexto narrativo: `frontend/docs/GDD/GDD.Narrative-geral.md` (poder do Thorin, sec. 5).
- Decisões de worldbuilding: `zord/sessoes/ekios-world/ekios-world-v2.log.md` (canal onírico do antagonista; tríade como interferência; evento em Mélius).

Diretrizes de adaptação (o que excluir do DOC externo)

- Excluir totalmente da análise: “Quem Pode Praticar Magia e Por Quê” (regra de anões desconectados), “As Quatro Escolas Fundamentais”, “Em lore vs. mecânica”, “A Ordem dos Templários”, “Exemplos Canônicos”, “Princípios para Adaptação em Mesa”, “Pontos de Incerteza” e “Referências”.
- Proibir nomes próprios externos na v3 (ex.: mundos, ordens, substâncias, deidades). Em vez disso, usar termos neutros: “reino espiritual/onírico”, “barreira/cicatriz”, “força antimágica”, “reagentes/catalisadores”.

Diretrizes de adaptação (o que aproveitar e como renomear)

- Fonte da magia: reino paralelo de pensamento/emoção onde intenção molda efeito → “Reino Anímico”.
- Barreira entre reinos: separação variável, mais fina em locais de morte/emoção/magia → “Barreira” ou “Cicatriz do Mundo”.
- Ressonância: alguns indivíduos sintonizam-se conscientemente ao Reino Anímico (sonhos lúcidos, visões) → base de telepatia e fala com os mortos (“Ecos”).
- Intrusão: entidades do Reino Anímico podem tentar atravessar quando a Barreira afina → “Intrusão de Entidades Ecoicas”.
- Catalisadores: mapeiam para “Pedras de Runas Mágicas” e “Selos rúnicos” já existentes no GDD.

Plano (tarefas imperativas)

1) Preparar a nova versão

- Copiar `frontend/docs/GDD/2-world-building/magia.md` para `frontend/docs/GDD/2-world-building/magia.v3.md`.
- No topo do arquivo novo, ajustar o título para “Magia em Ekios — v3”.
- Inserir um aviso breve: “Documento em revisão; nomes externos foram generalizados.”

2) Introduzir “Ontologia da Magia” antes de “Fundamentos”

- Criar seção “Ontologia da Magia: Reino Anímico, Barreira e Mana”.
- Descrever:
  - Reino Anímico: realidade maleável por intenção/emoção; mana é energia extraída da interface com esse reino.
  - Barreira (Cicatriz): separa os reinos; variação de espessura por trauma, morte, emoções, uso maciço de magia.
  - Efeito ambiental: Barreira fina potencializa magia e aumenta instabilidade/custo de controle.

3) Integrar “Ressonância & Ecos” na taxonomia e em telepatia

- Criar seção “Ressonância & Ecos (Telepatia e Falar com os Mortos)”.
- Definir que telepatia e necrocomunicação usam a mesma faixa de ressonância anímica; “falar com os mortos” acessa impressões/fragmentos ecoados, não garante presença integral do falecido.
- Mapear para Sintaxe Rúnica: adicionar exemplos de selos/âncoras mentais (ex.: “mente elo”, “âncora memória”, “eco nomeado”).
- Estabelecer limites: alcance curto/ancoragem por toque/objeto pessoal aumentam estabilidade; distância e Barreira fina amplificam risco de intrusão.

4) Detalhar “Intrusão de Entidades” e contramedidas

- Criar subseção “Intrusão e Ancoragem”.
- Especificar sintomas de intrusão: lapsos de linguagem rúnica, ruído sensorial, mudança de temperatura interna.
- Definir contramedidas:
  - Ancoragem rítmica (batidas/cantos/padrões respiratórios) como “contracanto” que estabiliza ressonância.
  - Selos rúnicos de proteção (círculos, mantras longos) reduzem taxa de falha; Pedras de Estabilização obrigatórias em ritos de ressonância.
- Proibir “posse total permanente” (já alinha com v2).

5) Modelar “Espessura da Barreira” como modificador de custo/risco

- Adicionar tabela simples de referência narrativa:
  - Barreira espessa: -10% potência, -10% risco; magia mais estável.
  - Barreira normal: baseline.
  - Barreira fina: +10–30% potência, +20–50% risco de intrusão/colapso.
- Inserir ganchos diegéticos: ruínas antigas, campos de batalha, minas sagradas → tendência a Barreira fina.

6) Ajustar “Fundamentos” e “Custos, Esgotamento e Riscos”

- Incluir “Controle/Estabilidade” como recurso narrativo afetado pela Barreira e pela duração de mantras.
- Relacionar sinais de exaustão com dessintonia de ressonância (zumbido, calor interno, ecos mentais residuais).

7) Atualizar “Taxonomia de Técnicas”

- Em “Telepatia”: detalhar comunicação, sugestão leve e compartilhamento de impressões como usos de ressonância; vincular limites por ancoragem.
- Em “Sábias (entidades vinculadas)”: incluir nota de que pactos estáveis operam por ressonância controlada com regras/condições que evitam intrusão.

8) Adicionar 2 exemplos novos em “Exemplos de Conjuração”

- “Vínculo onírico curto” (comunicação em sonho lúcido com aliado próximo): sequência rúnica, custo baixo, risco de eco residual.
- “Sussurro aos ancestrais” (falar com os mortos via item-âncora): sequência rúnica com “eco nomeado”, custo moderado, risco médio em Barreira fina.

9) Criar seção “Consequências Sociais e Normas”

- Descrever reações culturais: medo de ritos de ressonância em público, necessidade de autorização ritual; analogia a “forças antimágicas” como contrapeso social (sem nome próprio externo).
- Inserir sistema narrativo: “Suspeita/Notoriedade” para abuso ostensivo de magia em áreas sagradas/controladas.

10) Glossário e Notas

- Adicionar entradas: Reino Anímico; Barreira/Cicatriz; Ressonância; Eco; Intrusão; Ancoragem; Contracanto.
- Nota de design: nomes externos foram generalizados para termos neutros do mundo de Ekios.

11) Vincular com a narrativa (sem editar agora)

- Preparar, ao final, uma lista de trechos a linkar quando a v3 for aprovada:
  - GDD.Narrative (sec. 5): reforçar que o poder de Thorin opera por ressonância; a tríade com Elmartin e Mélia cria interferência/contracanto.
  - S2 (quebra do selo): registrar que locais de Barreira fina impulsionam riscos e projeções.
  - S7 (ecologia dos Ignotos): anotar que o canal do antagonista opera por projeções/sonhos ecoados e é sabotado por contracanto/ressonância.

Critérios de aceitação (DoD)

- O arquivo `magia.v3.md`:
  - [ ] mantém toda a estrutura funcional de v2 (sintaxe rúnica, elementos, custos, exemplos existentes);
  - [ ] acrescenta Ontologia (Reino Anímico/Barreira) com impacto mecânico claro;
  - [ ] define Ressonância/Ecos e seus limites (telepatia, falar com mortos);
  - [ ] integra riscos de Intrusão e contramedidas práticas (ancoragem/contracanto);
  - [ ] inclui 2 novos exemplos completos de conjuração e atualiza Glossário;
  - [ ] não contém nomes próprios externos;
  - [ ] inclui aviso de versão e nota de generalização de termos.

Checklist de execução

- [ ] Copiar v2 → v3 e ajustar cabeçalho.
- [ ] Inserir Ontologia e Barreira (com tabela de risco/potência).
- [ ] Inserir Ressonância & Ecos e limites/âncoras.
- [ ] Detalhar Intrusão e contramedidas (contracanto).
- [ ] Atualizar Fundamentos/Custos com Controle/Estabilidade.
- [ ] Atualizar Taxonomia (Telepatia/Sábias) coerente com ressonância.
- [ ] Adicionar 2 exemplos novos e atualizar Glossário.
- [ ] Revisar proibições (sem ilusão tangível/posse permanente) permanecem válidas.
- [ ] Revisão final: busca por nomes próprios externos (ver comandos abaixo).

Comandos de apoio (varredura)

- rg -n "Thedas|Fade|V[eé]u|templ[aá]ri|Chantr|lyrium" frontend/docs/GDD/2-world-building/magia.v3.md
- rg -n "Profeta das Sombras|Dambur|Balastrus" frontend/docs/GDD/GDD.Narrative-geral.md

Plano de rollback por etapa

- Se a Ontologia conflitar com v2: comentar a seção e manter apenas a tabela de modificação ambiental; reavaliar termos.
- Se Ressonância/Ecos complicarem Telepatia: reduzir a seção a notas explicativas, sem alterar taxonomia.
- Se Intrusão/contracanto destoarem de tom: mover para Anexos como opcional de campanha.

Estimativa

- Redação v3: 2–3 horas.
- Revisão/coerência e links: 1 hora.
- Aprovação: 0,5 hora.

Observações

- Esta alteração melhora clareza temática (fonte da magia, riscos) e dá suporte direto ao arco de Thorin (comunicação com mortos) e ao canal onírico do antagonista, preservando a identidade de Ekios.
