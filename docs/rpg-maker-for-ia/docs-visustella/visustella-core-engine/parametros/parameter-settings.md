# Plugin Parameters: Parameter Settings

## Configuracao Geral

- **Displayed Parameters**: Lista de parametros exibidos no Equip e Status Menu
- **Extended Parameters**: Lista para cenas estendidas (outros plugins VisuStella)

## Basic Parameters

| Abrev | Nome | Uso |
|-------|------|-----|
| MHP | MaxHP | Health maximo. Acima de 0 = vivo, 0 = morto |
| MMP | MaxMP | Magic maximo. Custo de skills/spells |
| ATK | Attack | Poder de ataque fisico (damage formulas) |
| DEF | Defense | Defesa fisica (damage formulas) |
| MAT | Magic Attack | Poder de ataque magico |
| MDF | Magic Defense | Defesa magica |
| AGI | Agility | Posicao na ordem de turnos |
| LUK | Luck | Taxa de sucesso de states/buffs/debuffs |

### Settings
- **Show Actor Level?**: Exibir level do ator
- **Convert JS To Base?**: Auto-converter JS notetags para base params (previne loops infinitos)
- **HP Crisis Rate**: Ratio de HP considerado critico
- **JS: Formula**: Formula para calcular total dos 8 basic params
- **Parameter Caps**: MaxHP Cap, MaxMP Cap, ATK Cap, DEF Cap, MAT Cap, MDF Cap, AGI Cap, LUK Cap (formulas, NAO levantam limites do editor)

## X Parameters

| Abrev | Nome | Descricao |
|-------|------|-----------|
| HIT | Hit Rate% | Taxa de acerto fisico |
| EVA | Evasion Rate% | Taxa de esquiva fisica |
| CRI | Critical Hit Rate% | Chance de critico |
| CEV | Critical Evasion% | Reducao de critico recebido (CRI * (1 - CEV)) |
| MEV | Magic Evasion% | Esquiva magica |
| MRF | Magic Reflect% | Chance de refletir magia |
| CNT | Counter Attack% | Chance de contra-atacar |
| HRG | HP% Regeneration | % de MaxHP regenerado por turno |
| MRG | MP% Regeneration | % de MaxMP regenerado por turno |
| TRG | TP% Regeneration | % de MaxTP regenerado por turno |

- **JS: Formula**: Formula para calcular total dos 10 X params
- **Vocabulary**: Nome in-game para cada X param

## S Parameters

| Abrev | Nome | Descricao |
|-------|------|-----------|
| TGR | Target Rate | Chance de ser alvo de ataques single-target |
| GRD | Guard Effect | Efetividade de guard (damage / (2 * GRD)) |
| REC | Recovery Effect | Efetividade de heals |
| PHA | Pharmacology | Efetividade de items |
| MCR | MP Cost Rate | Multiplicador de custo MP |
| TCR | TP Charge Rate | Velocidade de ganho de TP |
| PDR | Physical Damage Rate | Dano fisico recebido |
| MDR | Magical Damage Rate | Dano magico recebido |
| FDR | Floor Damage Rate | Dano de chao recebido |
| EXR | Experience Rate | Ganho de experiencia |

- **JS: Formula**: Formula para calcular total dos 10 S params
- **Vocabulary**: Nome in-game para cada S param

## Icons
- **Draw Icons?**: Desenhar icons ao lado de nomes de parametros
- Icons individuais para cada Basic/X/S parameter

## Custom Parameters

Permite adicionar parametros customizados ao jogo (requer JavaScript).

### Custom Parameter
- **Parameter Name**: Nome do parametro
- **Abbreviation**: Abreviacao (evitar caracteres especiais e numeros)
- **Icon**: Icon do parametro
- **Type**: Integer ou Float
- **JS: Value**: Codigo para retornar o valor (variavel `user` disponivel)

### Usando Custom Parameters
- **Em menus**: Adicionar abbreviation nos Displayed Parameters do Core Engine/Status Menu Core (case insensitive)
- **Em damage formulas**: `a.str - b.con` (case sensitive, referenciar por abbreviation)
- **Valores**: Anexados ao `Game_Battlerbase` prototype

### Instrucoes
- [Adding Custom Parameters to VisuStella Menus](#): Inserir abbreviation nos fields de displayed parameters
- [Using Custom Parameters as Mechanics](#): Referenciar por abbreviation em damage formulas
- [Setting Custom Parameter Values](#): Usar JS code no campo JS: Value com variavel `user`
