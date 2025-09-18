# Plano — Contextualizar respostas do Rugol v3 (sem códigos soltos Sx)

Objetivo: eliminar respostas e logs com referências isoladas a Sx (ex.: “S7, S11, S9”); comunicar sempre o nome da seção + código + 1 linha de contexto; e publicar uma nova persona aprimorada `zord/agentes/entrevistadores/persona-Rugol-v3.md` sem alterar a v2.

## Tasks (no imperativo)

1) Mapear códigos Sx para nomes canônicos do template

- Ler `frontend/docs/GDD/templates/gdd-parte-2-construindo-o-mundo-template.md` e consolidar o dicionário Sx→Nome (exato ao template).
- Publicar o mapa dentro da persona v3 e do comando de invocação, para uso consistente:
  - S1 → Visão Geral do Mundo
  - S2 → História e Linha do Tempo
  - S3 → Geografia e Biomas
  - S4 → Cultura e Sociedade
  - S5 → Facções, Poder e Economia
  - S6 → Tecnologia/Magia e Regras do Sistema
  - S7 → Ecologia e Criaturas
  - S8 → Regiões Jogáveis e Mapeamento
  - S9 → Clima, Dia/Noite e Estados Ambientais
  - S11 → Gating e Progressão no Mundo
- Nota: não há S10 no template atual; não criar mapeamento para S10.

2) Padronizar como referir seções nas respostas e no log

- Exigir formato “Nome da Seção (Sx) — frase de 1 linha sobre o conteúdo afetado”.
- Proibir Sx isolado sem nome/contexto nas saídas do Rugol.
- Exigir, ao citar várias seções, listar cada uma em linha própria com o formato padronizado.

3) Criar nova persona v3 em `zord/agentes/entrevistadores/persona-Rugol-v3.md`

- Partir do conteúdo atual da v2 (copiar como base) sem editar `persona-Rugol-v2.md`.
- Em “Condução Adaptativa”, substituir “mapear seções Sx” por “mapear seções pelo NOME + (Sx) e registrar 1 linha de contexto por seção afetada”.
- Em “Protocolo de Sessão”, exigir que o log registre seções pelo nome + código + resumo, nunca só o código.
- Em “Política de Atualização do Formulário”, instruir a usar nome+código nas marcações [adiar]/[detalhar] e nas atualizações.
- Em “Sinais de Qualidade”, adicionar item: “Saídas autoexplicativas: nenhuma referência a Sx aparece sem nome e contexto”.
- Inserir seção “Formato de saída do Rugol (autoexplicativo)” com regras para síntese, perguntas e referência ao formulário por nome+código + 1 linha de contexto.
 - Sincronizar nomenclatura de S8 para “Regiões Jogáveis e Mapeamento” (template atual é agnóstico de engine).

4) Atualizar o comando de invocação em `zord/comandos/invocar-rugol-o-entrevistador.md`

- Trocar o bloco “Seções impactadas (Sx) e tipo de impacto” por “Seções impactadas (nome + código) e tipo de impacto”.
- Trocar o bloco “Atualizações no formulário” para exigir “Nome da Seção (Sx): item → alteração (ou [adiar]/[detalhar]: motivo)”.
- Inserir o dicionário Sx→Nome no topo do arquivo (ou seção auxiliar “Referência rápida”).
- Sincronizar o nome da S8 para “Regiões Jogáveis e Mapeamento” (agnóstico de engine); evitar “no RPG Maker MZ”.

5) Inserir exemplos antes/depois na persona v3

- Exemplo (antes): “S7 | preencher” → (depois): “Ecologia e Criaturas (S7) — preencher: criaturas por bioma, gatilhos e vestígios canônicos”.
- Exemplo (antes): “S11 | [adiar]” → (depois): “Gating e Progressão no Mundo (S11) — [adiar]: defesa detalhada de Daratrine ficará para depois (escopo)”.
- Exemplo (antes): “S4 | [detalhar]” → (depois): “Cultura e Sociedade (S4) — [detalhar]: costumes/tabus do acampamento multi‑raças; marcas linguísticas mínimas”.

6) Ajustar a redação das perguntas quando citarem seções

- Preferir: “Ecologia e Criaturas (S7)” em vez de “S7”.
- Quando a pergunta envolver 2+ seções, separar em bullets com nome+código e motivo da relação.

7) Revisar o log ativo `zord/sessoes/ekios-world/ekios-world-v2.log.md`

- Reescrever os cabeçalhos “Seções impactadas” e “Atualizações no formulário” das próximas entradas para o novo padrão (não retrabalhar histórico, apenas daqui em diante).
- Garantir que “Próximos passos” também usem nome+código e uma frase de objetivo por seção.

8) Garantir “Formato de saída do Rugol (autoexplicativo)” na persona v3

- Exigir que toda resposta ao entrevistado contenha: síntese do entendimento, perguntas/follow‑ups e, se houver referência a formulário, usar nome+código + 1 linha de contexto.
- Reforçar que a audiência não precisa abrir o template para entender a mensagem.

9) Publicar a v3 sem alterar a v2

- Manter `persona-Rugol-v2.md` intacta para histórico/compatibilidade.
- Documentar na v3 a data e o motivo da criação (contextualização de Sx e clareza de outputs).

10) Critérios de Aceitação

- Nenhuma referência a Sx aparece isolada nas respostas ou logs gerados pelo Rugol.
- “Seções impactadas” e “Atualizações no formulário” sempre listam nome + (Sx) + 1 linha de contexto.
- O entrevistado confirma que entende as respostas sem consultar o template.
- Existe `zord/agentes/entrevistadores/persona-Rugol-v3.md` com as mudanças e `persona-Rugol-v2.md` permanece inalterado.
- O comando de invocação e a persona v3 exibem o dicionário Sx→Nome atualizado.

11) Comunicação e manutenção

- Registrar no log de mudanças do projeto a criação da v3 (com link para a persona e comando de invocação).
- Anotar no README/Guia de sessões onde consultar a referência rápida Sx→Nome.
- Agendar revisão após 2 sessões para garantir aderência.
