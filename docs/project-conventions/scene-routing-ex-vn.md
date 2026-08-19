---
title: "ADR — Convenção de roteamento de cenas EX/VN"
type: architecture-decision-record
status: accepted
date: "2026-08-19"
decision_scope: "Classificação e nomenclatura de mapas de exploração e visual novel"
---

# ADR — Convenção de roteamento de cenas EX/VN

## Status

Aceita em 2026-08-19.

## Contexto

A arquitetura atual separa a apresentação de cenas entre dois tipos de mapa:

- mapas de exploração, responsáveis por navegação, interação ambiental e
  staging físico;
- mapas de visual novel, responsáveis por diálogos críticos, escolhas e
  transições narrativas.

Documentos de planejamento já tratavam mapas anteriores à convenção como
referência ou legado, mas não havia uma regra canônica que permitisse
classificá-los apenas pelo nome. Também existia o prefixo histórico `NV_` em
mapas cuja função e metadados eram de visual novel, embora o prefixo vigente
seja `VN_`.

Sem uma decisão explícita, inventários e planos de migração poderiam tratar
nomes sem prefixo de forma inconsistente ou interpretar `NV_` como uma terceira
categoria arquitetural.

## Decisão

Todo mapa registrado em `frontend/data/MapInfos.json` cujo nome não começa com
`EX_` nem com `VN_` é classificado como **mapa legado em relação à arquitetura
atual de roteamento de cenas**.

Os prefixos canônicos são:

| Prefixo | Papel arquitetural |
| --- | --- |
| `EX_` | Exploração, navegação, interação ambiental e staging físico |
| `VN_` | Visual novel, diálogo crítico, escolhas e transições narrativas |

`NV_` é um prefixo legado e inconsistente para mapas funcionalmente VN. Ele não
define um terceiro tipo. Quando um mapa `NV_` fizer parte de uma migração
aprovada, seu nome deve ser normalizado para `VN_` e sua função deve permanecer
coerente com o metadado `<CoretoMapType:VN>`.

A regra de nomenclatura classifica o mapa para fins de inventário, manutenção e
migração. Ela não substitui a verificação do papel funcional em metadados,
eventos, transferências e demais integrações.

## Consequências

- Mapas sem `EX_` ou `VN_` devem ser identificados como legados em análises,
  inventários e planos novos.
- Novos mapas pertencentes a essa arquitetura devem usar `EX_` ou `VN_` desde a
  criação.
- Um mapa legado pode continuar funcional e permanecer no projeto como
  referência. A classificação não significa que ele esteja obsoleto, quebrado
  ou autorizado para exclusão.
- Mapas legados não devem ser renomeados, duplicados ou migrados em massa. Cada
  migração precisa de escopo aprovado e deve preservar transferências,
  referências por ID, estado persistente e comportamento de runtime.
- Nomes `NV_` encontrados em documentos históricos devem ser entendidos como
  referências a mapas VN anteriores à normalização. Documentação nova deve usar
  `VN_`.
- Em caso de conflito entre nome e `<CoretoMapType:...>`, o conflito deve ser
  registrado e corrigido por uma migração explícita; não se deve inferir que a
  alteração do nome, isoladamente, corrige o runtime.

## Fora de escopo

Esta ADR não:

- determina quais mapas legados serão migrados ou removidos;
- autoriza alterações em `frontend/data/*.json`;
- define IDs, destinos de transferência ou conteúdo de cenas;
- torna todo diálogo em mapa `EX_` inválido: falas ambientais e cutscenes curtas
  podem permanecer em EX, enquanto narrativa crítica deve ser roteada para VN.

## Evidências promovidas

- [`planos/008-compozy-init/analise-tecnica.md`](../../planos/008-compozy-init/analise-tecnica.md): mapas antigos sem os prefixos atuais permanecem apenas como referência; os mapas VN então nomeados com `NV_` já possuíam metadado VN.
- [`planos/008-compozy-init/decisoes-consolidadas-p0-p1-p2.md`](../../planos/008-compozy-init/decisoes-consolidadas-p0-p1-p2.md): mapas legados de referência não devem ser renomeados indiscriminadamente e `NV_` deve ser normalizado para `VN_`.
- [`planos/010-guia-migracao-nova-arquitetura/analise-migracao-semi-final.md`](../../planos/010-guia-migracao-nova-arquitetura/analise-migracao-semi-final.md): mapas sem `EX_` ou `VN_`, como Distrito Comercial e Estádio, são classificados como “Legado atual”.
- [`docs/domains/scene-presentation-designer/README.md`](../domains/scene-presentation-designer/README.md): staging físico permanece em EX, enquanto diálogo, escolhas e transições da quest executam em VN.
