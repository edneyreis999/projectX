# PRD — Mapa de Teste da Narrativa Sistêmica

## Visão geral

### Contexto

O time de narrativa precisa validar rapidamente variáveis sistêmicas da missão final de Daratrine - A Origem. Jogar o conteúdo completo leva de 1 a 2 horas, o que inviabiliza ciclos rápidos. Já existe um mapa de teste inicial em `frontend/data/Map021.json` e variáveis configuradas em `System.json`; este PRD orienta a conclusão da feature.

### Público-alvo

Time de narrativa e QA internos.

### Objetivo de negócio

Permitir validação acelerada das combinações de variáveis da narrativa sistêmica antes da missão “Defender Gildrat”.

### Sistema de implantação

RPG Maker MZ — mapa de teste iniciado manualmente via configuração do editor.

## Problema e oportunidade

Atualmente é necessário jogar entre uma e duas horas para chegar ao ponto de verificar variáveis de narrativa, o que bloqueia iterações. O mapa de teste permitirá configurar estados e validar cálculos em minutos, encurtando o ciclo de QA narrativo.

## Objetivos e métricas

| Objetivo | Métrica | Meta |
| --- | --- | --- |
| Reduzir tempo para testar variáveis sistêmicas | Tempo entre iniciar playtest e validar estado desejado | ≤ 5 minutos |
| Garantir acesso confiável ao mapa de teste | Tempo de carregamento do mapa | ≤ 5 segundos |

## Escopo

### Incluído

- Implementar todos os NPCs, variáveis e interações descritos em `dev-logs/mvp-narrativa-sistemica/npcs-mapa-teste.md` nas ilhas de Gildrat, Melios e Kravens.
- Ajustar eventos em `frontend/data/Map021.json` e variáveis em `System.json`; uso pontual de Common Events caso necessário.
- Mensagens genéricas de feedback para desbloqueios, resgates repetidos e pré-condições.
- Teleporte da cama de Gildrat para o mapa “Defender Gildrat”.

### Excluído

- Qualquer ajuste narrativo fora do mapa de teste.
- Alterações em arquivos além de `System.json`, `frontend/data/Map021.json` ou Common Events relacionados.
- Polimento visual, balanceamento de combate ou integração com fluxo da campanha principal.

## Requisitos funcionais

#### [RF-01] Desbloqueio de ilhas (prioridade: alta)

NPCs em Gildrat liberam acesso a Melios (`v_unlock_melios`) e Kravens (`v_unlock_kravens`).

**Fluxo principal**

- Jogador interage com NPC de desbloqueio.
- NPC exibe mensagem genérica de liberação.
- Variável correspondente é setada para 1.
- Evento que bloqueia passagem é removido, permitindo travessia.

**Fluxos alternativos e exceções**

- Tentar atravessar antes do desbloqueio: evento bloqueia passagem e exibe “Passagem para Melios bloqueada” ou “Passagem para Kravens bloqueada”.

**Erros previstos**

- Falha ao setar variável correta (deve seguir mapeamento do documento de NPCs).

#### [RF-02] Resgates e influência em Melios (prioridade: média)

Eventos em Melios ajustam `v_resgate_melios`, `v_influencia_corvos` e subvariáveis específicas.

**Fluxo principal**

- Jogador interage com NPCs (Kilin, Balastrus, Salvar Ambos, grupo principal e corvos isolados).
- Cada evento aplica incremento conforme `npcs-mapa-teste.md` e exibe mensagem simples de sucesso.

**Fluxos alternativos e exceções**

- Tentativa repetida após resgate: exibir “Você já me resgatou” (ou equivalente para grupo).
- Interação antes de desbloquear Melios: bloqueada pelo requisito de RF-01.

**Erros previstos**

- Variáveis incorretas ou valores fora do domínio (0–3 para `v_resgate_melios`, 0–8 para `v_influencia_corvos`).

#### [RF-03] Operações em Kravens (prioridade: média)

Eventos em Kravens controlam `v_resgate_borin`, `v_resgate_kravens` e `v_reforco_sigmetal`.

**Fluxo principal**

- Após desbloquear Kravens, jogador interage com Borin, grupo rebelde e sigmetal.
- Eventos ajustam variáveis conforme documento e exibem mensagem de sucesso.

**Fluxos alternativos e exceções**

- Tentativa repetida: “Você já me resgatou”.
- Interação antes do desbloqueio: bloqueada por RF-01.

**Erros previstos**

- Incremento incorreto de `v_resgate_kravens` (total deve respeitar domínio 0–2).

#### [RF-04] Preparação em Gildrat (prioridade: alta)

NPCs em Gildrat alteram variáveis de boa vontade, empatia, treinamento, moral, preparo e fôlego do time rúnico.

**Fluxo principal**

- Jogador interage com cada NPC listado no documento.
- Evento confere pré-condições (ex.: resgates em Kravens para liberar Filena).
- Variáveis são incrementadas conforme faixas definidas e mensagem genérica indica conclusão.

**Fluxos alternativos e exceções**

- Tentativa antes de requisito mínimo para Filena: exibir “A Filena está preocupada em salvar rebeldes em Kravens, não pode fazer isso agora”.
- Tentativa repetida: “Você já concluiu isso”.

**Erros previstos**

- Variável excedendo limites (`v_boa_vontade_thordan` ≤ 5, `v_preparo_militar` ≤ 9, etc.).

#### [RF-05] Teleporte final (prioridade: alta)

A cama na Casa Forja Prata encerra o teste.

**Fluxo principal**

- Jogador interage com a cama a qualquer momento.
- Evento salva estado (se aplicável) e teleporta para o mapa “MvP Defesa Gildrat”.

**Fluxos alternativos e exceções**

- Nenhum; cama sempre disponível.

**Erros previstos**

- Teleporte falha ou aponta para mapa incorreto.

## Requisitos não funcionais

- **Performance:** mapa deve carregar e ficar jogável em até 5 segundos.
- **Disponibilidade:** execução local no editor é suficiente; não exigido em builds externas.
- **Segurança e autorização:** evitar alterações involuntárias em variáveis fora do escopo; eventos devem manipular apenas IDs previstos.
- **Observabilidade:** não requer logs adicionais além do feedback em diálogo.
- **Confiabilidade e integridade:** confiar no reset automático do RPG Maker ao iniciar playtest; certificar-se de que eventos não deixam switches presos.
- **Compatibilidade e portabilidade:** direcionado ao RPG Maker MZ.
- **Compliance:** não aplicável.
- **Acessibilidade:** sem requisitos extras além das mensagens textuais genéricas existentes.

## Arquitetura e abordagem

- **Abordagem:** eventos locais em `Map021` responsáveis por cada interação, utilizando variáveis pré-configuradas em `System.json`. Common Events opcionais apenas para lógica compartilhada.
- **Componentes:**
  - `frontend/data/Map021.json` — eventos e layout do mapa de teste.
  - `frontend/data/System.json` — definição das variáveis (`Switches` e `Variables`) necessárias.
  - (Opcional) Common Events para resets ou utilidades específicas.
- **Integrações:** nenhuma integração externa; utiliza somente recursos padrão do RPG Maker MZ.

## Decisões e trade-offs

#### Decisão: eventos locais no mapa

- **Justificativa:** mantém a lógica visível e coesa dentro do mapa de teste.
- **Trade-off:** reutilização limitada; replicar lógica em outros mapas exigirá duplicação manual.

#### Decisão: diálogos genéricos de feedback

- **Justificativa:** foco na validação sistêmica, evitando esforço narrativo adicional.
- **Trade-off:** testers dependem da documentação para compreender significado narrativo de cada interação.

## Dependências

Não há dependências externas; variáveis e mapa já existem e o jogo inicia diretamente no mapa de teste.

## Riscos e mitigação

#### Implementação incorreta impede execução do jogo

- **Probabilidade:** média
- **Impacto:** alto — impede validação das variáveis e bloqueia testes narrativos.
- **Mitigação:**
  - Revisar o mapa no editor antes de finalizar.
  - Realizar playtest percorrendo interações principais.
  - Manter cópias incrementais (`Map021-atual.json`, `System-atual.json`) antes de grandes alterações.
- **Plano de contingência:** restaurar manualmente a última cópia funcional dos arquivos versionados localmente e refazer ajustes seguindo checklist.

## Critérios de aceitação

- Todas as variáveis descritas em `dev-logs/mvp-narrativa-sistemica/npcs-mapa-teste.md` podem ser configuradas antes de interagir com a cama.
- Qualquer sequência de decisões (ordem de interações) funciona sem travas ou loops.
- Mensagens de feedback aparecem corretamente para bloqueios, repetições e pré-condições da Filena.
- A cama teleporta invariavelmente para “MvP Defesa Gildrat”.
- O mapa carrega e fica jogável em até 5 segundos.

## Testes e validação

### Tipos de teste obrigatórios

- Playtest manual completo cobrindo desbloqueios, resgates, interações de Gildrat e teleporte.
- Verificação do tempo de carregamento (≤ 5 s) ao iniciar o mapa.

### Estratégia de validação

- Checklist de QA manual:
  1. Iniciar o jogo e confirmar carregamento do mapa de teste em até 5 segundos sem erros.
  2. Validar desbloqueios de Melios e Kravens, incluindo feedback de bloqueio.
  3. Executar todos os resgates e coletas em Melios e Kravens, verificando valores de variáveis e mensagens de repetição.
  4. Testar pré-condições da Filena (bloqueada antes de resgates em Kravens, liberada após).
  5. Percorrer combinações de decisões em ordem variada, garantindo que todas permanecem disponíveis.
  6. Usar a cama para teleporte e confirmar chegada em “MvP Defesa Gildrat”.

---

_Documento gerado em 2025-11-02._
