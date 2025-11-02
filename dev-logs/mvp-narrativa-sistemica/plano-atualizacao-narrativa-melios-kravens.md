# Plano de Atualização Narrativa – Melios & Kravens

**Data**: 2025-11-02  
**Contexto**: Resultado de brainstorm (Zen Chat) + planejamento estruturado (Zen Planner) + consenso (Zen Consensus) para alinhar atualizações na documentação narrativa.

## Objetivos

- Refletir que Balastrus retorna com o grupo de Thorin para Gildrat após o resgate em Melios.
- Introduzir novas variáveis sistêmicas `v_unlock_kravens` e `v_unlock_melios`, detalhando os novos pontos de reputação dos Corvos em Melios.
- Renomear `v_pai_filena` para `v_resgate_borin`, mantendo significado e impactos.
- Atualizar `dev-logs/mvp-narrativa-sistemica/npcs-mapa-teste.md` e os arquivos pertinentes de `docs/GDD/3-historia/`.
- Remover o planejamento de recrutamento de Sáparo Boca-de-Corneta para o grupo do jogador, garantindo que a documentação reflita apenas sua presença como NPC não recrutável.

## Insights do Brainstorm (Zen Chat)

- Necessidade de justificar narrativamente a presença de Balastrus em Gildrat após o resgate, revisando diálogos e cenas que assumiam sua ausência.
- Garantir que qualquer script ou lógica que dependia de `v_pai_filena` seja mapeado antes da renomeação, com atenção a migrações de saves.
- As novas variáveis de desbloqueio exigem definição clara de gatilhos, feedback e sequência de liberação.
- Contador dos Corvos precisa de limites, thresholds e comunicação in-game.
- Com a retirada do recrutamento de Sáparo, revisar diálogos e notas que prometiam participação ativa no grupo, evitando inconsistências.

## Síntese do Consenso (Zen Consensus)

- **Acordo**: Plano em três fases (Mapear → Atualizar → Revisar) é robusto; usar ferramentas de busca global e revisão por pares.
- **Refinamentos**: Definir escopo detalhado antes de editar, explicitar fluxo de comunicação interequipes, operar em branch dedicada com revisão em PR.
- **Riscos**: Escopo subestimado, inconsistência de variáveis e perda de alinhamento com outras áreas (arte, programação, QA).

## Plano por Fases

### Fase 1 – Mapeamento e Preparação

- [x] Executar busca global por `Balastrus`, `Melios`, `v_pai_filena`, `Corvos` e `Sáparo` para identificar trechos impactados.
- [x] Catalogar arquivos GDD a serem atualizados (`timeline-historia-jogo-v5.md`, `historia-jornada-do-jogador.md`, `ultima-missao-do-jogo.md`, outros se citarem variáveis/Corvos).
- [x] Definir comportamento das novas variáveis de desbloqueio (`v_unlock_kravens`, `v_unlock_melios`): gatilho, domínio, efeito (desbloqueio de ilha / NPCs).
- [x] Detalhar a contagem dos Corvos: valor base do grupo principal (+5) + três indivíduos (+1 cada), total máximo e thresholds de influência.
- [x] Mapear trechos que mencionam recrutamento de Sáparo para ajustar linguagem para participação não jogável.
- [ ] Validar impacto em saves ou sistemas caso `v_pai_filena` já exista — especificar estratégia (migração, dupla leitura ou comunicação de quebra).

### Fase 2 – Atualizações de Conteúdo

- [x] Atualizar `dev-logs/mvp-narrativa-sistemica/npcs-mapa-teste.md`:
  - Refletir retorno de Balastrus a Gildrat após resgate.
  - Incluir novas variáveis de desbloqueio nas tabelas e resumos.
  - Ajustar domínio de `v_resgate_borin` e remover referências antigas.
  - Documentar pontos dos Corvos em Melios (grupo + individuais) e impacto.
  - Remover qualquer referência à variável ou feature de recrutamento do Sáparo, mantendo apenas notas de ambientação.
- [x] Revisar `docs/GDD/3-historia/timeline-historia-jogo-v5.md`:
  - Atualizar cenas do resgate para indicar retorno de Balastrus.
  - Inserir notas sobre desbloqueios de Kravens/Melios e contagem dos Corvos.
  - Ajustar narrativa do Sáparo para refletir presença não-recrutável, preservando seu papel como NPC de apoio.
- [x] Revisar `docs/GDD/3-historia/historia-jornada-do-jogador.md`:
  - Ajustar etapas onde Balastrus aparece pós-resgate.
  - Refletir nova nomenclatura da variável de Borin e desbloqueios.
  - Remover promessas de recrutamento do Sáparo e reforçar sua função narrativa alternativa, se necessário.
- [x] Revisar `docs/GDD/3-historia/ultima-missao-do-jogo.md`:
  - Atualizar tabelas de variáveis, incluindo novos campos e renomeações.
  - Especificar impacto dos Corvos; ajustar menções ao Sáparo para papéis não jogáveis, caso apareça.
- [ ] Verificar demais arquivos em `docs/GDD/3-historia/` (ex.: `historia-de-daratrine.md`, `prompt.md`) para garantir alinhamento e atualizar se necessário.

### Fase 3 – Revisão, Comunicação e Validação

- [ ] Fazer revisão cruzada das variáveis mencionadas (nomes, domínios, efeitos) assegurando consistência entre documentos.
- [ ] Solicitar revisão por pares da equipe de narrativa ou design para confirmar coerência.
- [ ] Registrar no changelog interno ou nota de commit as alterações de narrativa/variáveis.
- [ ] Validar que o plano permaneça atualizado após implementação, ajustando esta página se surgirem pendências.

## Checklist de Comunicação

- [ ] Enviar resumo das mudanças para o canal de narrativa antes do merge.
- [ ] Documentar estratégia para saves com a renomeação de `v_resgate_borin`.
- [ ] Coordenar com engenharia para implementar flags/variáveis (`v_unlock_*`) e remover qualquer hook de recrutamento do Sáparo.
- [ ] Informar QA sobre novos cenários de teste (desbloqueios, contagem dos Corvos) e confirmar que a feature de recrutamento foi descontinuada.

## Riscos e Mitigações

- **Migração de Saves**: risco de variáveis antigas persistirem. Mitigar com script de migração/documentação clara.
- **Escopo Oculto**: outros documentos ou sistemas podem usar a variável antiga. Mitigar com mapeamento completo e comunicação interequipes.
- **Inconsistência de Reputação dos Corvos**: assegurar que thresholds e feedback estejam descritos para UX/gameplay.
- **Menções residuais ao recrutamento de Sáparo**: revisar documentação e scripts para evitar expectativas quebradas no jogador.

## Próximos Passos Imediatos

1. Completar checklist da Fase 1 antes de qualquer edição.
2. Abrir branch dedicada (`feat/narrativa-melios-kravens`) e executar Fase 2.
3. Conduzir revisão da Fase 3 e atualizar este plano com status das tarefas.
