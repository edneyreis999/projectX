# Domínio: Design Narrativo

## Estado do inventário

Cobertura estática terminal: personagens, premissa/cânone, lugares/lore,
arcos/diálogos e rotas/finais estão `covered`; fontes estão `mapped`. A
divergência entre finais antigos e intenção aprovada de 2026 e a reachability
das rotas permanecem abertas.

Evidência aceita: packet `narrative-designer-001` revisão 1. Classificação:
**cânone e intenção documental; reachability/tom/pacing em runtime pendentes**.

## Inventário factual

- **Personagens:** Thorin é protagonista; Filena, Kilin e Mhordred são aliados
  jogáveis; Tordan é pai/general; Balastrus passa de antagonista a aliado
  redimido. Actors 3–6 correspondem estaticamente à party. Fontes: `g`, `q`,
  `o`, `e`.
- **Premissa/cânone:** Rheed enquadra a Gildrat anterior a Daratrine; mineração
  rompe o selo de Melios, liberta os Ignotos e expõe a herança proibida de Mana
  de Thorin. A intenção aprovada em 2026 fixa a catástrofe e usa escolhas para
  moldar identidade/relações. Fontes: `g`, `o`.
- **Lugares e lore:** Ekios, Gildrat, Kravens, Melios, mina do esgoto e o eixo
  Coreto/Daratrine conectam casta, mineração, memória ancestral, Ignotos,
  queda e refúgio. Fontes: `g`, `q`, `o`, `e`.
- **Arco e voz:** rebelde do futebol → minerador → ruptura do selo → preparação
  de facções → defesa/possessão. Vozes: Gildrat pragmática, Thorin/Mélia
  oníricos e Rheed oral. Texto de mapas não valida tom ou pacing. Fontes: `g`,
  `q`, `o`, `e`.
- **Risco — rotas/finais:** Sigmetal, Filena/Conselho e cinco trilhas de
  preparação ramificam e convergem na defesa/purificação. GDD antigo traz
  finais múltiplos A/B/C; intenção aprovada de 2026 fixa eventos centrais com
  variantes de epílogo. Reachability não testada. Fontes: `g`, `q`, `o`, `e`.
- **Risco de fonte:** o índice não cobria documentos narrativos detalhados;
  Obsidian mistura intenção aprovada, duplicatas/templates e material de Game
  Jam não relacionado. Fontes: `p`, `g`, `q`, `o`, `x`.

## Cânone de Rheed e metáfora de Thorin

`Rheed` é a grafia canônica do personagem em textos e assets novos. O arquivo
legado `Reed final.png` mantém nome e caminho inalterados enquanto continuar
sendo referenciado; a diferença de grafia é uma compatibilidade técnica, não
uma variante narrativa do nome.

A associação verbal entre Thorin e uma montanha é uma metáfora de presença,
força ou firmeza. Ela não estabelece que Thorin seja literalmente uma montanha
nem adiciona esse vínculo ao lore do mundo.

## Coverage materializado

| Requisito | Profundidade | Estado | Evidência |
| --- | --- | --- | --- |
| `narrative-designer.characters` | `deep` | `covered` | `c` |
| `narrative-designer.premise-canon` | `deep` | `covered` | `p` |
| `narrative-designer.places-lore` | `deep` | `covered` | `l` |
| `narrative-designer.arcs-dialogue` | `deep` | `covered` | `a` |
| `narrative-designer.routes-endings` | `deep` | `covered` | `r`; conflito/gate preservado |
| `narrative-designer.source-map` | `map` | `mapped` | `s` |

## Fontes e rastreabilidade

- `p`: packets/coverage aceitos e `docs/index.xml`
- `g`: `docs/GDD` de narrativa, mundo, história e personagens; durável
- `q`: `docs/Quests/**`; intenção durável
- `o`: Obsidian, Core Concept e Tone aprovados em maio de 2026; intenção
- `e`: JSONs selecionados em `frontend/data`; parse estático
- `x`: duplicatas/templates/Game Jam no Obsidian; exploratório/excluído

## Próxima validação

Decisão humana de cânone sobre finais e destino de Mhordred; Playtest das rotas,
convergências, tom e pacing. A validação deve separar intenção aprovada, GDD
histórico e conteúdo realmente alcançável.
