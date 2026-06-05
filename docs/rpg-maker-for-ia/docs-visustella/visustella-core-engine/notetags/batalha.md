# Notetags: Configuracoes de Batalha

Forca configuracoes de batalha especificas por mapa ou troop. Inserir em noteboxes de mapas ou nomes de troops. Se ambos presentes, prioridade vai para troop name.

## Battle View

### Front View
```
<FV>
<Front View>
<Battle View: FV>
<Battle View: Front View>
```
- **Usado em**: Map Notetags, Troop Name Tags, Troop Comment Tags
- Muda para front view. Requer imagens em `img/enemies/`

### Side View
```
<SV>
<Side View>
<Battle View: SV>
<Battle View: Side View>
```
- **Usado em**: Map Notetags, Troop Name Tags, Troop Comment Tags
- Muda para side view. Requer imagens em `img/sv_enemies/` e `sv_actor` nos atores

## Battle Systems

### DTB (Default Turn Battle)
```
<DTB>
<Battle System: DTB>
```

### TPB (Time Progress Battle)
```
<TPB Active> / <ATB Active>
<TPB Wait> / <ATB Wait>
```
- Requer VisuMZ_2_BattleSystemATB para ATB labels

### VisuStella Battle Systems
```
<BTB> / <Battle System: BTB>
<CTB> / <Battle System: CTB>
<ETB> / <Battle System: ETB>
<FTB> / <Battle System: FTB>
<OTB> / <Battle System: OTB>
<PTB> / <Battle System: PTB>
<STB> / <Battle System: STB>
```
- Requer plugin de battle system respectivo instalado

## Battle Grid

```
<Grid> / <Battle Grid>
<No Grid> / <No Battle Grid>
```
- **Usado em**: Map Notetags, Troop Name Tags, Troop Comment Tags
- Requer VisuMZ_2_BattleGridSystem
- Se nenhum encontrado, usa default dos Plugin Parameters

## Troop Comment Tags
Para Troop Comment Tags: o tag precisa aparecer em um comment em qualquer pagina do Troop (mesmo paginas que nao rodam).
