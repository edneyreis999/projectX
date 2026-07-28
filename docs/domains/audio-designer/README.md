# Domínio: Áudio

## Estado do inventário

Cobertura estática terminal: música, ambience, SFX e triggers/cues estão
`covered`; assets, configuração e fontes estão `mapped`. Referências ausentes e
gaps entre intenção e arquivos foram preservados. Playback, loops, mix e
qualidade perceptível dependem de Playtest/revisão humana.

Evidência aceita: packet `audio-designer-001` revisão 1. Classificação:
**assets/config/calls estáticos; áudio perceptível não validado**.

## Inventário factual

- **Risco — música:** System define BGM de título/batalha/veículo; três mapas
  autoplay `Town1`; eventos fazem 28 plays e dois fades. Doze nomes são
  referenciados e nove OGG estéreo/44.1 kHz existem. `Battle2`, `Battle5`,
  `Dungeon5` e `Town4` faltam; `Theme5` não tem caller verificado. Fontes: `d`,
  `a`.
- **Risco — ambience:** nenhum mapa autoplay BGS. Três calls pedem `Wind1`
  duas vezes e `Rain2` uma vez, mas `audio/bgs` está vazio;
  `VisuMZ_4_AmbienceSounds` está inativo. Fontes: `d`, `g`, `a`.
- **Risco — efeitos:** oito ME estéreo OGG resolvem todas as refs. Há 151 SE
  OGG (127 mono, 24 estéreo), com 22 triggers ME e 153 SE em mapas, 20 SE em
  CEs, dois em move routes e 455 timings de som em animações. `Decision3` e
  `Shock1` faltam; `Hammer` e `Magic3` não têm caller verificado. Fontes: `d`,
  `a`.
- **Fato — configuração:** OptionsCore ativo expõe volumes master/BGM/BGS/ME/SE
  e quatro listas de UI-SFX; ConfigManager persiste volumes. Só 17 dos 43 nomes
  alternativos de UI SFX configurados existem. Fontes: `g`, `a`.
- **Risco — documentação:** docs pedem música clássica adaptativa, SFX de
  inimigos e cues de quests, mas não há tabela estável cue→arquivo→trigger.
  SFX de estilhaço/explosão/tremor do Cristaleão estão TODO. Fontes: `n`, `d`.

## Coverage materializado

| Requisito | Profundidade | Estado | Evidência |
| --- | --- | --- | --- |
| `audio-designer.music` | `deep` | `covered` | `mus` |
| `audio-designer.ambience` | `deep` | `covered` | `amb` |
| `audio-designer.sfx` | `deep` | `covered` | `fx` |
| `audio-designer.audio-assets` | `map` | `mapped` | `a` |
| `audio-designer.triggers-cues` | `deep` | `covered` | `mus`, `amb`, `fx`, `doc` |
| `audio-designer.sound-configuration` | `map` | `mapped` | `cfg` |
| `audio-designer.source-map` | `map` | `mapped` | `p`, `d`, `g`, `a`, `n` |

## Fontes e rastreabilidade

- `p`: packets comuns, técnicos, de game/scene/runtime aceitos
- `d`: `frontend/data/{System,CommonEvents,Map*,Animations}.json`
- `g`: `frontend/js/{plugins.js,rmmz_managers.js,rmmz_windows.js}`; estruturado
- `a`: `frontend/audio/{bgm,bgs,me,se}`; metadados
- `n`: `docs/GDD/{GDD.geral,enemy SFX};docs/Quests/{2,3,4}`

## Próxima validação

Playtest e revisão auditiva de todos os buses, loops, fades, cues, UI-SFX e
referências ausentes. Verificar mix, clipping, transições e coerência com a
intenção, registrando hardware, volumes, cenas e resultado observável.
