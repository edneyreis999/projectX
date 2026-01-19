# Análise do Banco de Dados de Inimigos - Ekios

**Data**: 2026-01-10
**Autor**: Claude Code
**Objetivo**: Documentação preparatória para implementação do banco de dados de inimigos baseado no GDD

---

## 1. Backup Realizado

**Arquivo original**: `frontend/data/Enemies.json`
**Backup criado**: `frontend/data/backup/Enemies_backup_2026-01-10_00-50-18.json`
**Status**: ✅ Backup verificado e idêntico ao original

---

## 2. Famílias de Inimigos (GDD - Ekios)

### 2.1. Fauna de Caverna
**Localizações**: Minas de Kravens, Minas Abandonadas
**Características**: Criaturas naturais adaptadas à escuridão; comportamento animal (patrulha, emboscada, fuga); não cooperam com outras famílias

**Membros da Família**:
1. **Morcego de Caverna** (Lv 5-6)
   - HP: 15-20
   - Ataque: 8-10
   - Defesa: 5-7
   - Comportamento: Ataque em grupo, voo rápido
   - Habilidade: Fuga em Bando (foge se 50% do grupo morrer)

2. **Aranha Mineira** (Lv 6-7)
   - HP: 25-30
   - Ataque: 10-12
   - Defesa: 8-10
   - Habilidade: Teia Pegajosa (slow 2 turnos, 70% chance)
   - Veneno fraco: -5 HP/turno por 3 turnos

3. **Aranha Gigante** (Lv 7-9)
   - HP: 40-50
   - Ataque: 14-16
   - Defesa: 10-12
   - Habilidade: Teia Paralisante (paralisa 2 turnos, 60% chance)
   - Veneno médio: -10 HP/turno por 3 turnos

4. **Rato Gigante Mutante** (Lv 7-9)
   - HP: 35-45
   - Ataque: 12-14
   - Defesa: 8-10
   - Habilidade: Força da Horda (+20% ATK se 3+ ratos vivos)
   - Variação rara: Rato Alfa (elite menor que buffa aliados)

---

### 2.2. Criaturas Tóxicas
**Localizações**: Esgoto de Gildrat
**Características**: Organismos adaptados a ambientes contaminados; ataques causam debuffs (veneno, dissolução de armadura); lentos mas resistentes

**Membros da Família**:
1. **Rato de Esgoto** (Lv 10-11)
   - HP: 30-40
   - Ataque: 12-14
   - Defesa: 8-10
   - Habilidade: Mordida Doente (estado Doença: -10% DEF, 3 turnos, 50% chance)
   - Comportamento: Ataque em enxame

2. **Limo Ácido** (Lv 11-12)
   - HP: 60-70
   - Ataque: 10-12
   - Defesa: 15-18
   - Habilidade: Dissolução Ácida (-15% DEF física, 5 turnos)
   - Trait: Velocidade -30%, HP alto, resistente a físico

3. **Fungo Venenoso Gigante** (Lv 13-14)
   - HP: 80-90
   - Ataque: 15-18
   - Defesa: 12-15
   - Habilidade: Nuvem de Esporos (AOE, veneno -15 HP/turno, 4 turnos)
   - Mecânica: Imóvel, precisa quebrar cabeça para derrotar

4. **Gosma Tóxica** (Lv 13-14)
   - HP: 70-80
   - Ataque: 13-16
   - Defesa: 16-19
   - Habilidade: Divisão (ao receber AOE, divide em 2 Limos Ácidos com 30% HP cada)
   - Ácido contínuo

---

### 2.3. Construtos e Guardiões
**Localizações**: Ruínas de Melios, Ruínas Antigas
**Características**: Criaturas mágicas artificiais; patrulha rígida; resistentes a físico; não fogem; protegem áreas/objetos específicos

**Membros da Família**:
1. **Guardião Menor de Pedra** (Lv 15-17)
   - HP: 100-120
   - Ataque: 18-20
   - Defesa: 20-22 (30% redução de dano físico)
   - Habilidade: Ataque pesado (knockback)
   - Comportamento: Patrulha rígida, não foge

2. **Elemental de Terra** (Lv 16-18)
   - HP: 90-110
   - Ataque: 16-18
   - Defesa: 22-25 (40% red. físico, 25% fraqueza mágica)
   - Habilidade: Projétil Rochoso (elemento Terra)
   - Resistência elemental

3. **Guardião Ancião** (Lv 18-19)
   - HP: 150-180
   - Ataque: 22-25
   - Defesa: 25-28
   - Mecânica: Armadura de Pedra (precisa 3x dano crítico ou quebrar via habilidade)
   - Habilidade: Golpe Esmagador (atinge linha frontal)

4. **Sombra Errante** (Lv 19)
   - HP: 80-100
   - Ataque: 20-23
   - Defesa: 15-18 (intangível, ignora armadura)
   - Habilidade: Sussurro do Medo (-20% ATK, 4 turnos, todos)
   - Foreshadowing da energia selada

---

### 2.4. Predadores de Superfície
**Localizações**: World Map, Cordilheira Gelada, Estrada do Cão-Luar
**Características**: Fauna gelada com variações mágicas; cooperação em matilhas; Alphas buffam aliados

**Membros da Família**:
1. **Lobo Jovem** (Lv 1-2) - TUTORIAL
   - HP: ~70 (usando fórmula: 50 + level × 20)
   - Ataque: ~12
   - Habilidade: Fuga Instintiva (foge se HP <30%)
   - Comportamento: Troops de 2-3 unidades

2. **Lobo de Gelo** (Lv 3-5)
   - HP: 45-55 (GDD) / ~130 (fórmula Lv 4)
   - Ataque: 14-16
   - Defesa: 12-14
   - Habilidade: Cooperação em Matilha (+15% ATK se 3+ lobos)
   - Mordida gélida

3. **Lobo Alpha de Gelo** (Lv 5-8)
   - HP: 90-110 (GDD) / ~225 (boss, fórmula Lv 5 × 1.5)
   - Ataque: 20-22
   - Defesa: 16-18
   - Habilidade: Uivo Gélido (-10% velocidade, 3 turnos, todos)
   - Buff: Líder de Matilha (+20% ATK para lobos aliados)
   - Drop: Cristais de gelo + item narrativo raro

4. **Urso Colossal** (Lv 8-9)
   - HP: 140-160
   - Ataque: 24-26
   - Defesa: 18-20
   - Habilidade: Investida (knockback + stun 1 turno)
   - Territorial; pedra/cristais nas costas
   - Drop: Item narrativo

---

### 2.5. Humanoides Hostis
**Localizações**: Transversal (World Map, Minas Abandonadas)
**Características**: Bandidos anões (exilados) e goblins renegados; táticos; usam cobertura; chamam reforços

**Membros da Família**:
1. **Goblin Saqueador** (Lv 2-4)
   - HP: 30-40
   - Ataque: 12-14
   - Defesa: 8-10
   - Habilidade: Arco curto (dano à distância)
   - Fuga rápida (+30% velocidade ao fugir)
   - Comportamento: Emboscada

2. **Bandido Anão Renegado** (Lv 3-5)
   - HP: 60-75
   - Ataque: 16-18
   - Defesa: 14-16
   - Habilidade: Machado pesado
   - Chama Reforços (se HP <50%, 2-3 aliados em 3-5 turnos)
   - Armadura de ferro anã

---

## 3. Progressão por Região

### 3.1. Estrada do Cão-Luar (Lv 1-5) - World Map/Tutorial
**Tipo**: Encontros aleatórios na superfície
**Objetivo de Design**: Ensinar loop básico de combate

**Inimigos**:
- Lobo Jovem (Lv 1-2)
- Goblin Saqueador (Lv 2-4)
- Lobo de Gelo (Lv 3-5)
- Bandido Anão Renegado (Lv 3-5)
- Lobo Alpha de Gelo (Lv 5, raro)

**Encounter Rate**:
- Áreas próximas a Gildrat (Lv 1-2): alto
- Estrada do Cão-Luar (Lv 2-4): médio
- Cordilheira remota (Lv 4-5): baixo

**Gate Narrativo**: Jogador deve atingir Lv 5 antes de entrar em Kravens

---

### 3.2. Minas de Kravens (Lv 5-10) - Primeira Dungeon
**Tipo**: Dungeon fechada, mineração ativa
**Boss**: Cristaleão (Lv 10)

**Inimigos**:
- **Túneis Ativos**: Morcego de Caverna (Lv 5-6), Aranha Mineira (Lv 6-7)
- **Andar Esquecido**: Aranha Gigante (Lv 7-9), Rato Gigante Mutante (Lv 7-9)
- **Boss**: Cristaleão (Lv 10) - Camaleão de minérios com mecânicas de:
  - Quebra de partes
  - Telégrafos (Projeção de Fragmentos, Investida, Explosão AOE)
  - Fases (100%-60%-30%)

**Recompensa Boss**: 1x Sigmetal + 100 Ludos

**Gate Narrativo**: Completar Kravens antes do Esgoto

---

### 3.3. Esgoto de Gildrat (Lv 10-15) - Segunda Dungeon
**Tipo**: Infraestrutura urbana degradada, tóxica
**Boss**: Pestesporo (Lv 15)

**Inimigos**:
- **Túneis Superiores**: Rato de Esgoto (Lv 10-11), Limo Ácido (Lv 11-12)
- **Câmara de Decantação**: Fungo Venenoso Gigante (Lv 13-14), Gosma Tóxica (Lv 13-14)
- **Boss**: Pestesporo (Lv 15) - Fungo colossal com mecânicas de:
  - Invocação de fungos menores
  - AOE (Esporos Venenosos, Chuva de Esporos)
  - Explosão final (escape obrigatório)

**Recompensa Boss**: Liberação de passagem + 150 Ludos

**Gate Narrativo**: Obter mandato do Conselho antes de Melios

---

### 3.4. Ruínas de Melios (Lv 15-20) - Terceira Dungeon
**Tipo**: Mina sagrada proibida
**Bosses**: Corvos de Melios (Lv 20, humano) + Guardião Colossal de Pedra (Lv 20)

**Inimigos**:
- **Corredores**: Guardião Menor de Pedra (Lv 15-17), Elemental de Terra (Lv 16-18)
- **Câmara do Selo**: Guardião Ancião (Lv 18-19), Sombra Errante (Lv 19)
- **Boss 1**: Corvos de Melios (Lv 20) - Facção rebelde, boss fight humano
- **Boss 2**: Guardião Colossal de Pedra (Lv 20) - Construto gigante com mecânicas de:
  - Pilares rúnicos (puzzle)
  - Invulnerabilidade temporária
  - Golpe Colossal telegrafado

**Mecânica Especial**: Visão limitada (fog of war)

**Recompensa Boss**: Acesso a minérios raros + 250 Ludos + Fragmento do Selo

**Gate Narrativo**: Quebra do Selo desbloqueia Lv 25-30

---

### 3.5. Regiões Pós-Selo (Lv 25-30) - Conteúdo Avançado
**Tipo**: Conteúdo futuro (não implementado neste escopo)
**Inimigos**: Ignotos (criaturas sombrias liberadas após quebra do selo)

**Nota**: Este documento cobre apenas o período **ANTES** da quebra do selo de Melios.

---

## 4. Estrutura do Banco de Dados Atual

### 4.1. Análise Técnica

**Arquivo**: `frontend/data/Enemies.json`
**Tamanho**: 64KB
**Linhas**: 2129
**Total de inimigos**: 100

**Formato RPG Maker MZ**:
```json
[
  null,  // Index 0 é sempre null (convenção RPG Maker)
  {
    "id": 1,
    "name": "Goblin",
    "battlerName": "Goblin",
    "battlerHue": 0,
    "exp": 10000,
    "gold": 5000,
    "params": [1, 0, 25, 20, 20, 20, 20, 20],  // [HP, MP, ATK, DEF, MATK, MDEF, AGI, LUK]
    "actions": [
      {
        "skillId": 1,
        "rating": 5,
        "conditionType": 0,
        "conditionParam1": 0,
        "conditionParam2": 0
      }
    ],
    "traits": [
      {"code": 22, "dataId": 0, "value": 0.95},
      {"code": 22, "dataId": 1, "value": 0.05}
    ],
    "dropItems": [
      {"dataId": 1, "kind": 0, "denominator": 1}
    ],
    "note": ""
  },
  // ... mais 99 inimigos
]
```

**Campos por inimigo**:
- `id`: Identificador único (1-100)
- `name`: Nome do inimigo
- `battlerName`: Nome do sprite de batalha
- `battlerHue`: Matiz de cor do sprite (0 = original)
- `exp`: Experiência concedida ao derrotar
- `gold`: Ludos (ouro) dropado
- `params`: Array de 8 stats [HP, MP, ATK, DEF, MATK, MDEF, AGI, LUK]
- `actions`: Array de ações (skills) que o inimigo pode usar
- `traits`: Características especiais (resistências, fraquezas)
- `dropItems`: Itens dropados (dataId, kind, denominator)
- `note`: Notas/metadados (geralmente vazio)

### 4.2. Inimigos Atuais (Placeholder/Teste)

Os inimigos atuais são placeholders genéricos do RPG Maker MZ:
- Goblin
- Gnomo (Gnome)
- Corvo (Crow)
- Treant
- E outros 96 inimigos de teste

**Status**: Todos esses inimigos serão **substituídos** pelo novo banco de dados baseado no GDD.

---

## 5. Fórmulas de Progressão (GDD)

### 5.1. Stats Base (Inimigos Regulares)

| Stat | Fórmula | Exemplo Lv 5 | Exemplo Lv 15 |
|------|---------|--------------|---------------|
| HP | 50 + (level × 20) | 150 | 350 |
| MP | 0 (fixed) | 0 | 0 |
| ATK | 10 + (level × 2) | 20 | 40 |
| DEF | 10 + (level × 2) | 20 | 40 |
| MATK | 10 + (level × 2) | 20 | 40 |
| MDEF | 10 + (level × 2) | 20 | 40 |
| AGI | 10 + (level × 2) | 20 | 40 |
| LUK | 10 + (level × 2) | 20 | 40 |

### 5.2. Stats de Bosses (+50%)

| Stat | Fórmula Boss | Exemplo Lv 10 (Cristaleão) |
|------|--------------|---------------------------|
| HP | (50 + level × 20) × 1.5 | 375 |
| ATK-LUK | (10 + level × 2) × 1.5 | 45 |

### 5.3. Recompensas

| Reward | Fórmula | Exemplo Lv 10 |
|--------|---------|---------------|
| Gold (Ludos) | level × 5 | 50 |
| EXP | level × 8 | 80 |

---

## 6. Estrutura Proposta (Optimized Dense)

### 6.1. Layout do Novo Banco

```
Enemies.json (Array)
├── [0] null (placeholder RPG Maker MZ)
├── [1] Separator: === ESTRADA DO CÃO-LUAR ===
├── [2-6] Enemies Lv 1-5 (5 inimigos)
├── [7-11] Empty slots (5 vazios)
├── [12] Separator: === MINAS DE KRAVENS ===
├── [13-17] Enemies Lv 5-10 (5 inimigos)
├── [18-22] Empty slots (5 vazios)
├── [23] Separator: === ESGOTO DE GILDRAT ===
├── [24-28] Enemies Lv 10-15 (5 inimigos)
├── [29-33] Empty slots (5 vazios)
├── [34] Separator: === RUÍNAS DE MELIOS ===
├── [35-40] Enemies Lv 15-20 (6 inimigos)
├── [41-45] Empty slots (5 vazios)
├── [46] Separator: === REGIÕES PÓS-SELO ===
└── [47-100] Reserved for future (54 vazios)
```

### 6.2. Formato de Separadores

```json
{
  "id": 1,
  "name": "=== ESTRADA DO CÃO-LUAR ===",
  "battlerName": "",
  "battlerHue": 0,
  "exp": 0,
  "gold": 0,
  "params": [1, 0, 1, 1, 1, 1, 1, 1],
  "actions": [{"skillId": 1, "rating": 5, "conditionType": 0, "conditionParam1": 0, "conditionParam2": 0}],
  "traits": [],
  "dropItems": [{"dataId": 0, "kind": 0, "denominator": 1}],
  "note": ""
}
```

### 6.3. Formato de Slots Vazios

```json
null
```

---

## 7. Próximos Passos

1. ✅ **Backup criado**: `Enemies_backup_2026-01-10_00-50-18.json`
2. ✅ **GDD analisado**: 5 famílias, 5 regiões, progressão Lv 1-30
3. ✅ **Estrutura atual documentada**: 100 inimigos placeholder
4. ⏳ **Implementação**: Criar novo banco de dados seguindo TechSpec
5. ⏳ **Formatação**: Executar `npm run format:json`
6. ⏳ **Validação**: Testar no RPG Maker MZ

---

## 8. Resumo Executivo

### Famílias Implementadas (5)
1. **Fauna de Caverna**: Morcegos, Aranhas, Ratos (4 tipos)
2. **Criaturas Tóxicas**: Ratos de Esgoto, Limos, Fungos, Gosmas (4 tipos)
3. **Construtos/Guardiões**: Guardiões de Pedra, Elementais, Sombras (4 tipos)
4. **Predadores de Superfície**: Lobos, Ursos (4 tipos)
5. **Humanoides Hostis**: Goblins, Bandidos Anões (2 tipos)

### Regiões Implementadas (5)
1. **Estrada do Cão-Luar** (Lv 1-5): 5 tipos de inimigos
2. **Minas de Kravens** (Lv 5-10): 5 tipos + boss Cristaleão
3. **Esgoto de Gildrat** (Lv 10-15): 5 tipos + boss Pestesporo
4. **Ruínas de Melios** (Lv 15-20): 6 tipos + 2 bosses
5. **Regiões Pós-Selo** (Lv 25-30): Reservado para Ignotos

### Total de Inimigos Únicos
- **Inimigos regulares**: 18 tipos
- **Bosses**: 4 tipos (Cristaleão, Pestesporo, Corvos de Melios, Guardião Colossal)
- **Total**: 22 tipos + variações (Rato Alfa, etc.)

### Estrutura do Banco
- **IDs utilizados**: 1-46 (separadores + inimigos + bosses)
- **IDs vazios**: 47-100 (reservados para expansão)
- **Separadores visuais**: 5 (um por região)
- **Slots vazios entre regiões**: 5 por região (expansão futura)

---

**FIM DA ANÁLISE**
