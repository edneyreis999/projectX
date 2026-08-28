---
title: "ADR — Autoridade entre contratos, materialização e runtime"
type: architecture-decision-record
status: accepted
date: "2026-08-26"
decision_scope: "Contratos disciplinares, writers, fixtures, runtime e evidências de implementação"
---

# ADR — Autoridade entre contratos, materialização e runtime

## Status

Aceita em 2026-08-26.

## Contexto

Uma feature pode distribuir sua intenção entre contratos disciplinares,
fixtures, writers, dados do RPG Maker, plugins e evidências de validação. Sem
uma ordem de autoridade explícita, mais de uma dessas superfícies pode parecer
canônica.

Esse conflito ocorreu na semifinal. Os documentos disciplinares começaram
como fontes autorais, mas depois foram reescritos como registros manuais do
runtime. As fixtures canônicas e os writers não acompanharam a mudança. O
resultado foi um pipeline no qual:

- os documentos declaravam que o runtime prevalecia;
- o Narrative writer ainda podia restaurar cópias anteriores dos documentos;
- o Gameplay writer rejeitava os documentos por divergência de fingerprint;
- a evidência estática continuava marcada como aprovada para um snapshot
  anterior;
- não havia uma autoridade única para resolver a divergência.

O ownership disciplinar já separa diálogo, fluxo narrativo, cutscene, áudio,
arte técnica e implementação de gameplay. Faltava definir como essas
autoridades se relacionam com os artefatos que materializam e verificam suas
decisões.

## Decisão

### 1. Contratos disciplinares aprovados são fontes de intenção

O projeto adota o modelo **contract-first** para conteúdo e comportamento que
possuem contrato disciplinar.

Um contrato aprovado registra a intenção que deve ser materializada. Runtime,
fixtures, hashes, inventários, planos de writer e evidências não podem
substituí-lo como fonte de intenção apenas porque foram produzidos depois.

Cada contrato deve identificar pelo menos:

- seu owner disciplinar;
- seu status de aprovação;
- sua versão;
- seu escopo e suas fronteiras de implementação.

Ausência ou ambiguidade nesses campos bloqueia a materialização. A mera
presença de um arquivo em `docs/` não o torna aprovado.

### 2. Cada disciplina aprova sua própria intenção

O owner declarado possui a aprovação final sobre o conteúdo de seu contrato.
Para os contratos atuais de quest:

| Superfície | Autoridade |
| --- | --- |
| Diálogo e fluxo narrativo | Narrative Designer |
| Beats, staging, câmera, movimentos e recovery de cutscene | Scene Presentation Designer |
| Cues e critérios de áudio | Audio Designer |
| Assets, requisitos visuais e critérios de arte técnica | Technical Artist |
| Materialização em dados, plugins e comportamento verificável | Gameplay Engineer |

O Gameplay Engineer pode bloquear a implementação ao encontrar inviabilidade,
inconsistência ou risco técnico, mas não pode alterar silenciosamente a
intenção de outra disciplina. Uma mudança que afete mais de um contrato exige
aprovação de todos os owners afetados.

Conflitos retornam ao contrato de origem ou a uma decisão aprovada. Eles não
são resolvidos escolhendo a superfície que foi editada mais recentemente.

### 3. Materialização flui do contrato para o runtime

O fluxo autorizado é:

```text
contrato disciplinar aprovado
              │
              ▼
writer ou implementação com escopo declarado
              │
              ▼
runtime materializado
              │
              ▼
testes e evidências vinculados à revisão validada
```

Writers e implementações consomem os contratos e alteram apenas seus targets
declarados. Um writer não pode usar uma fixture, snapshot ou cópia interna para
sobrescrever o contrato que deveria consumir.

Fixtures, fingerprints e inventários podem proteger o processo contra drift,
concorrência ou mutação parcial. Esses artefatos são derivados: sua validade
depende da versão aprovada do contrato e eles devem ser regenerados quando a
fonte mudar.

### 4. Divergência do runtime é uma não conformidade

Quando o runtime divergir de um contrato aprovado, a divergência é tratada
como defeito de implementação até que o owner aprove uma mudança de intenção.

Se a implementação revelar que o contrato é inviável, inseguro ou
indesejável, o fluxo é:

1. registrar o conflito e seus impactos;
2. encaminhá-lo aos owners afetados;
3. revisar e aprovar o contrato;
4. materializar a nova revisão;
5. regenerar derivados e evidências;
6. validar novamente no mesmo HEAD.

Não se deve converter silenciosamente o contrato em descrição do runtime para
obter convergência.

### 5. Estado as-built pertence à validação derivada

Testes, validadores e evidências registram o que foi materializado e o que foi
comprovado. Eles devem distinguir validação estática, editor, runtime e
observação humana.

Uma documentação as-built pode existir quando houver necessidade operacional,
mas deve:

- ocupar caminho e tipo distintos dos contratos autorais;
- ser gerada automaticamente;
- registrar gerador, versão e hashes das fontes;
- tornar-se obsoleta quando qualquer input coberto mudar;
- nunca ser target de um writer contract-first que também a trate como fonte.

Um registro manual do runtime no mesmo caminho do contrato disciplinar é
proibido.

## Consequências

### Benefícios

- existe uma única direção de autoridade entre intenção e implementação;
- o ownership disciplinar permanece verificável;
- writers não restauram decisões antigas sobre contratos mais novos;
- divergências do runtime produzem diagnóstico, não inversão de fonte;
- evidências podem registrar o estado materializado sem competir com a
  intenção autoral;
- revisões passam a mostrar se a mudança começou no contrato correto.

### Custos e restrições

- mudanças de intenção exigem aprovação antes da materialização;
- fixtures e fingerprints derivados precisam acompanhar cada revisão
  aprovada;
- writers existentes que tratam cópias internas como fonte precisam ser
  invertidos ou aposentados;
- contratos e runtime temporariamente divergentes bloqueiam aplicação,
  evidência e release;
- critérios perceptivos continuam dependendo de observação humana, mesmo
  quando a estrutura estática coincide com o contrato.

## Alternativas rejeitadas

### Runtime-first para a semifinal

Rejeitado porque removeria a autoridade das disciplinas sobre diálogo, fluxo,
cutscene, áudio e arte técnica. Também exigiria aposentar ou inverter todos os
writers contract-first e criar extratores capazes de gerar documentação sem
edição manual.

Runtime-first pode ser adotado por outro domínio somente por ADR própria de
migração, com owner, extrator, destino gerado e remoção de qualquer writer que
restaure intenção anterior.

### Contratos manuais tratados como as-built

Rejeitado porque o mesmo arquivo não pode expressar intenção aprovada e, ao
mesmo tempo, declarar que uma implementação divergente prevalece. Esse modelo
oculta não conformidades e cria competição entre edição manual, fixtures e
writers.

### Hashes ou fixtures como fonte canônica

Rejeitado porque esses artefatos provam identidade de bytes, não aprovação
disciplinar. Eles protegem uma revisão aprovada, mas não possuem autoridade
para escolher seu conteúdo.

## Adoção na semifinal

Esta decisão resolve o bloqueio A-01 da remediação da semifinal. Os cinco
documentos `2.0.0` em `docs/Quests/2-semifinal/` serão tratados como contratos
disciplinares no fluxo contract-first:

- `semifinal.dialogos.md`;
- `semifinal.NSD.fluxo-cenas.md`;
- `semifinal.cutscene.md`;
- `semifinal.audio.md`;
- `semifinal.technical-art.md`.

A adequação do frontmatter e das seções de autoridade desses documentos, a
validação narrativa read-only e a reconciliação do Gameplay writer pertencem
ao bloqueio A-02 e aos gates posteriores. Esta ADR não declara essas etapas
concluídas.

As tasks 010/011 permanecem baselines históricos imutáveis. Writer, manifesto
de assets e validação ativos vivem em `docs/Quests/2-semifinal/tooling`; o
manifesto do plano 012 preserva os hashes dos pacotes históricos sem criar uma
dependência de execução.

## Fora de escopo

Esta ADR não:

- altera os cinco contratos da semifinal;
- modifica writers, manifestos, runtime ou dados do RPG Maker;
- define o schema final de aprovação dos contratos;
- define um caminho definitivo para documentação as-built gerada;
- regenera evidência estática;
- executa ou aprova playtest humano;
- autoriza mudanças em plugins VisuStella vendorizados.

## Fontes consultadas e conflitos promovidos

- [ADR de máquinas de estado canônicas](./quest-state-machines.md): estabelece
  fonte única, transições semânticas e separação entre contrato, apresentação
  e validação.
- [ADR de roteamento EX/VN](./scene-routing-ex-vn.md): separa papéis
  arquiteturais e exige migração explícita para corrigir conflitos.
- [Guia de criação de mapas EX/VN](../architecture/quest-state-machine-map-guide.md):
  materializa decisões arquiteturais sem substituir sua autoridade.
- [Handoff da convergência da semifinal](../../planos/012-add-harness/HANDOFF.md):
  registra o bloqueio A-01 e recomenda contract-first para a semifinal.
- [Análise de mudanças de ADR](../../planos/012-add-harness/ADR-CHANGES.md):
  identifica a ambiguidade entre contract-first e runtime-first. Esta ADR
  resolve a ambiguidade em favor de contract-first para contratos
  disciplinares.
- [Manifesto de proveniência da semifinal](../../planos/012-add-harness/SEMIFINAL-TOOLING-PROVENANCE.json):
  registra os hashes dos pacotes históricos 010/011 e a decisão de não
  consumi-los em runtime. O contrato de execução histórico da task 011 definiu
  writers, validação estática e gates humanos, mas ainda permitia ao Narrative
  writer escrever contratos a partir de canonical fixtures; o A-02 removeu
  essa inversão. A spec histórica preservava o ownership por disciplina e
  separava validação automatizada de aprovação humana.
