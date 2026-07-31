# Domínio: Arte Técnica

## Estado do inventário

Cobertura estática terminal: animações/efeitos, memória/performance aparente e
referências asset-runtime estão `covered`; formatos, atlases e fontes estão
`mapped`. Contagens e dimensões não são medição de residência simultânea,
rendering, frame pacing ou qualidade visual.

Evidência aceita: packet `technical-artist-001` revisão 1. Classificação:
**metadados e referências estáticas; Playtest/profiling pendentes**.

## Inventário factual

- **Formatos:** 427 PNGs (379 em `img`, 48 textures de efeito), 120 `efkefc`,
  sete `efkmodel` e um WebM; nenhum formato visual criptografado observado.
  Fonte: `a`.
- **Animações/efeitos:** `Animations.json` tem 120 registros Effekseer e 120
  nomes únicos, todos com nome correspondente em `efkefc`; existem 455 timings
  de som e 328 de flash. Parâmetros de Battle/VisualState e comandos de evento
  também acionam animações. Fontes: `d`, `g`, `a`.
- **Risco — tilesets/atlases:** 15 Tilesets ocupam 97 slots; mapas usam oito
  IDs e 36 sheets únicos. Nove sheets de tilesets usados faltam e imagens
  customizadas têm dimensões não canônicas/reuso de slot. Fontes: `d`, `a`.
- **Risco — refs:** CE132/133 referenciam Animation ID 152 cinco vezes, embora
  Animations termine em 120. Mapas nomeiam 13 battlebacks, mas só pares
  Snowfield/Stone1/Stone2 existem; evidence de cena registra 12 busts ausentes.
  Fontes: `p`, `d`, `g`, `a`.
- **Risco — memória/performance:** dimensões dos PNGs equivalem a 485,2 MiB RGBA
  se todas as textures residissem simultaneamente, o que não é medição de carga.
  Cinco sheets sideview referenciados são 4003×2133 (~32,6 MiB decodificados
  cada). Preload do Core lista apenas Balloon/IconSet; PKD_AnimaX aguarda sheets;
  WebP/preload alternativo estão off. Fontes: `d`, `g`, `a`.

## Contrato de intake de assets visuais

Antes de integrar um asset, registre e valide tecnicamente:

- caminho de destino e capitalização exata do nome;
- dimensões em pixels e canal alpha esperado;
- pivot/âncora e safe area para o enquadramento de uso;
- dependências e referências que carregam ou exibem o arquivo;
- checksum do arquivo aceito, para distinguir revisões sem depender só do nome.

Esses checks verificam identidade e compatibilidade técnica. A validação
estética — composição, legibilidade, consistência visual, qualidade e adequação
à cena — é uma revisão separada e não pode ser inferida do checklist técnico.

## Coverage materializado

| Requisito | Profundidade | Estado | Evidência |
| --- | --- | --- | --- |
| `technical-artist.visual-assets-formats` | `map` | `mapped` | `fmt` |
| `technical-artist.animations-effects` | `deep` | `covered` | `ani` |
| `technical-artist.atlases` | `map` | `mapped` | `atl` |
| `technical-artist.memory-performance` | `deep` | `covered` | `mem` |
| `technical-artist.asset-runtime-references` | `deep` | `covered` | `ref` |
| `technical-artist.source-map` | `map` | `mapped` | `p`, `d`, `g`, `a` |

## Fontes e rastreabilidade

- `p`: packets comuns, técnicos, runtime, UX/UI, gameplay e scene aceitos;
  `docs/index.xml`
- `d`: `frontend/data/{Animations,Tilesets,Actors,Enemies,Skills,Items,Weapons,States,CommonEvents,Troops,Map*.json}`; parse
- `g`: `frontend/js/plugins.js`; envelope/configuração extraída
- `a`: `frontend/{img,effects,movies}`; nomes, tamanho e dimensões somente

## Próxima validação

Playtest/profiling de rendering, sheets ausentes, Animation 152, battlebacks,
busts, preload, cache, memória e frame pacing. Medir cenários reais e registrar
hardware, mapa/cena, pico de memória, tempos e artefatos visuais observados.
