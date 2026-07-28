# Domínio: Level Design

## Estado do inventário

Cobertura estática terminal: áreas, navegação, gating/encounters, pacing e POIs
estão `covered`; fontes de layout estão `mapped`. O grafo é estrutural e não
prova reachability, pacing percebido, legibilidade ou ausência de softlock.

Evidência aceita: packet `level-designer-001` revisão 1. Classificação:
**topologia estática; Playtest humano pendente**.

## Inventário factual

- **Áreas:** 48 `MapInfos` organizam Ekios/Gildrat, minas do esgoto e de
  Kravens/Melios, interiores, final e áreas de teste/release. Existem 50
  arquivos de mapa: Map023 está ausente e 058–060 não têm `MapInfo`. Fonte:
  `m`.
- **Risco — navegação:** 149 transfers code201 foram mapeados; oito destinos
  apontam para alvo ausente ou fora dos limites. O início Map057 (20,7) não tem
  aresta code201 direta de entrada ou saída. Fontes: `m`, `s`.
- **Gating/encounters:** hubs e minas usam gates de variável/página;
  `encounterList` só está preenchida em Maps034/047/057 com step 999; batalhas
  scriptadas concentram-se em Maps038/041/053/055/057. Fontes: `m`, `d`.
- **Risco — pacing:** esgoto 24→25→26 e Kravens 30/33/47/48/28 formam
  dungeons multi-mapa. Finais 36→37→38→41 e 21→55→53 coexistem. Map035 mede
  100×90, contém 95 eventos e 70 páginas autorun. Fonte: `m`.
- **POIs:** NPCs de quest em Maps007/008/011/017/052; válvulas, alavancas,
  minério e área oculta nas minas; 19 marcadores de quest no Map036. Commands
  ativos de EventsMoveCore/MapCameraZoom tornam fluxo e apresentação dependentes
  de Playtest. Fontes: `m`, `v`, `d`.

## Coverage materializado

| Requisito | Profundidade | Estado | Limite |
| --- | --- | --- | --- |
| `level-designer.maps-areas` | `deep` | `covered` | topologia e papéis |
| `level-designer.navigation` | `deep` | `covered` | grafo estático; Playtest pendente |
| `level-designer.gating-encounters` | `deep` | `covered` | gates e superfícies mapeados |
| `level-designer.spatial-pacing` | `deep` | `covered` | estrutura; feel pendente |
| `level-designer.points-of-interest` | `deep` | `covered` | POIs de eventos inventariados |
| `level-designer.layout-sources` | `map` | `mapped` | gap de catálogo preservado |

## Fontes e rastreabilidade

- `p`: packets aceitos, state e README do domínio — lidos
- `m`: `frontend/data/MapInfos.json; structured Map*.json` — parse válido
- `s`: `frontend/data/System.json` — parse válido
- `d`: `docs/index.xml; GDD.geral; quest 13 index` — world docs detalhados não
  catalogados na investigação
- `v`: `frontend/js/plugins.js; map code357 inventory` — estrutura/configuração

## Próxima validação

Playtest do início Map057, oito transfers inválidos, duas cadeias de final,
dungeons, Map035 e POIs. Validar reachability, pacing, leitura, câmera/movimento
e ausência de softlock com passos e evidência observável.
