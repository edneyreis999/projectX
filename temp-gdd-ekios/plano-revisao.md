# Plano de Revisão de Coerência (Replicável)

Objetivo
- Fornecer um procedimento replicável para revisar a coerência de qualquer arquivo crucial (regras de sistema, história, locais, raças, itens) contra o restante da documentação de Ekios.
- Produzir sempre dois artefatos: 1) relatório de revisão `temp-gdd-ekios/<nome-revisao>.md` com conclusões e sugestões; 2) lista clara de ações propostas (patches) e decisões canônicas a aprovar.

Escopo
- Aplica-se a arquivos em `temp-gdd-ekios/**` e pode ser estendido a `frontend/docs/**` quando houver.
- Foca em: nomenclatura canônica, geografia, cronologia, regras de magia/sistema, categorias/taxonomia, itens/artefatos, coerência cultural por raça, e consistência com calendários/estações.

Entradas necessárias
- Arquivo(s) alvo (ex.: `temp-gdd-ekios/magia.v2.md`).
- Lista opcional de “invariantes” do domínio (se existente em `temp-gdd-ekios/canon/*.md|yaml`).

Saídas esperadas
- `temp-gdd-ekios/<nome-revisao>.md` com: escopo, alinhamentos, divergências, decisões canônicas recomendadas, propostas de edição por arquivo.
- Opcional: atualização do dicionário canônico (nomes próprios, topônimos, termos de sistema).

Procedimento (passo a passo)
1) Delimite o escopo da revisão
- Identifique o arquivo alvo e classifique o tipo: “Regras de sistema”, “História/Timeline”, “Local/Topônimo”, “Raça/Cultura”, “Item/Artefato”.
- Liste temas que podem impactar outros arquivos (ex.: magia: pedras, ilusão, teleporte, afinidade/maestria; história: guerras, selos, datas, personagens).

2) Monte o mapa de dependências
- Para cada tema do alvo, relacione diretórios/arquivos prováveis:
  - Raças: `raca-*.md`
  - História/Guerras: `historia-*.md`, `primeira-grande-guerra.md`, `timeline-ekios.md`
  - Locais: `arcaror.md`, `gildrat.md`, `mina-de-melios.md`
  - Sistema de magia/itens: `magia.md`, `magia.v2.md`, referências a “Pedras …”, poções, selos.
  - Metadados globais: `astrologia-e-marcação-de-tempo.md` (estações/anos)

3) Colete termos e entidades do alvo
- Extraia: nomes próprios, topônimos, itens, categorias, números-limite (ex.: “até 10×”), proibições/limites (“ilusão só telepática”, “sem selamento”).
- Identifique palavras‑chave a buscar (ex.: “Pedras”, “Ilusão”, “Teletransporte”, “Arcaror”, “Melios”).

4) Faça varredura cruzada no repositório
- Busque termos com ripgrep e confira contexto:
  - rg -n "Pedras|Rúnic|Abenço" temp-gdd-ekios
  - rg -n "Arcaror|Gildrat|Melios|Mélios" temp-gdd-ekios
  - rg -n "Ilusão|telepat|teletrans" temp-gdd-ekios
- Registre onde há divergência de escrita, ausência de cobertura, números distintos, ou regras incompatíveis.

5) Valide contra invariantes do domínio
- Use (ou crie) uma lista de invariantes. Exemplo geral para Ekios:
  - Magia: fonte é mana; ao zerar, drena energia vital; 5 naturezas elementares; combinações possíveis; sem técnicas de selamento; ilusão preferencialmente telepática.
  - Itens: pedras mágicas amplificam; nomes canônicos estáveis; matéria‑prima de Melios.
  - Geografia: posições canônicas de cidades; biomas coerentes.
  - Cronologia: sequência “rompimento do selo → alerta → queda de Gildrat → formação de Daratrine → virada da guerra”.
  - Nomes próprios: ortografia única por personagem/lugar.

6) Classifique achados por severidade
- Alta: contradições diretas (A vs. não‑A), ex.: Arcaror “oeste” vs. “leste”.
- Média: discrepâncias de nomenclatura/alias sem nota de equivalência, ex.: “Pedras Abençoadas” vs. “Pedras de Runas Mágicas”.
- Baixa: cobertura incompleta, exemplos faltantes, nota ausente.

7) Elabore decisões canônicas propostas
- Para cada grupo (pedras, ilusão, topônimos, nomes próprios), proponha: nome oficial, aliases aceitos, nota de uso, e onde aplicar.

8) Produza o relatório `<nome-revisao>.md`
- Estruture em: Escopo, Resumo, Alinhamentos, Divergências e riscos, Sugestões de alterações, Decisões canônicas, Propostas de edição por arquivo, Observações finais.
- Referencie caminhos de arquivo (ex.: `temp-gdd-ekios/magia.md`) e, se possível, o trecho/heading.

9) Esboce patch plan (opcional)
- Liste mudanças por arquivo com micro‑tarefas objetivas (renomear termo, adicionar nota, mover exemplo).
- Se houver automações, inclua comandos de busca/replace seguros e revisões manuais a fazer.

10) Valide e circularize
- Cheque se propostas não violam invariantes.
- Se nomes canônicos forem alterados, atualize o dicionário/arquivo de cânone.
- Submeta para aprovação e, após concordância, aplique patches.

Checklist de qualidade
- [ ] Nenhuma contradição geográfica ou cronológica remanescente.
- [ ] Nomes próprios e topônimos padronizados (uma ortografia).
- [ ] Regras de magia/proibições idênticas entre arquivos relevantes.
- [ ] Itens/artefatos com nomenclatura e efeitos consistentes.
- [ ] Glossários/aliases adicionados quando houver termos históricos legados.
- [ ] Exemplos e notas raras (teletransporte, sangue) explicitadas onde necessário.

Modelo de nome de revisão
- `revisao-coerencia-<tema>-<data>.md` (ex.: `revisao-coerencia-magia-v2-2025-09-19.md`).

Observações
- Em caso de conflito difícil (dois arquivos igualmente “canônicos”), prefira:
  1) O documento “v2” mais recente e abrangente do tema, se ele consolidar regras.
  2) O arquivo historicamente normativo (por ex., timeline oficial) se o tema for cronologia.
- Mantenha notas de alias quando um termo antigo ainda existir em partes do GDD (ex.: “Pedras Abençoadas” → “Pedras de Runas Mágicas”).
