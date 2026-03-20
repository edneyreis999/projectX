# Guia de Design de Skills - Exemplos Práticos

**Propósito:** Fornecer exemplos práticos de skills para inspiração e referência em jogos RPG Maker MZ.

**Última atualização:** 2026-03-18

**Documentação técnica:**
- [Skills.json Technical Guide](../technical-guides/Skills.json-technical-guide.md)
- [States Technical Guide](../technical-guides/States-technical-guide.md)

---

## ÍNDICE DE EXEMPLOS

### Skills de Dano Físico
1. [Corte Rápido (Slash)](#exemplo-1-corte-rápido-slash)
2. [Fúria de Golpes (Flurry)](#exemplo-2-fúria-de-golpes-flurry)
3. [Golpe Carregado (Charged Strike)](#exemplo-3-golpe-carregado-charged-strike)
4. [Golpe Envenenado (Poison Strike)](#exemplo-4-golpe-envenenado-poison-strike)

### Skills Mágicas
5. [Bola de Fogo (Fireball)](#exemplo-5-bola-de-fogo-fireball)
6. [Cura (Heal)](#exemplo-6-cura-heal)
7. [Drenagem de Alma (Soul Drain)](#exemplo-7-drenagem-de-alma-soul-drain)

### Skills de Buff/Debuff
8. [Provocação (Taunt)](#exemplo-8-provocação-taunt)
9. [Golpe Dissipador (Dispel Strike)](#exemplo-9-golpe-dissipador-dispel-strike)
10. [Escudo Reativo (Reactive Shield)](#exemplo-10-escudo-reativo-reactive-shield)

### Skills Especiais
11. [Investida Final (Last Stand)](#exemplo-11-investida-final-last-stand)
12. [Rajada de Morte (Death Burst)](#exemplo-12-rajada-de-morte-death-burst)
13. [Fuga (Escape)](#exemplo-13-fuga-escape)

### Skills com VisuStella JS Hooks
14. [Explorar Fraqueza (Exploit Weakness)](#exemplo-14-explorar-fraqueza-exploit-weakness)
15. [Sobrecarga Mágica (Magical Overload)](#exemplo-15-sobrecarga-mágica-magical-overload)
16. [Veneno Tóxico (Toxic Poison)](#exemplo-16-veneno-tóxico-toxic-poison)
17. [Poder Ascendente (Rising Power)](#exemplo-17-poder-ascendente-rising-power)
18. [Modo Berserk (Berserk Mode)](#exemplo-18-modo-berserk-berserk-mode)
19. [Marca da Morte (Execute)](#exemplo-19-marca-da-morte-execute)
20. [Dardo Venenoso (Poison Dart)](#exemplo-20-dardo-venenoso-poison-dart)

---

## SKILLS DE DANO FÍSICO

### Exemplo 1: Corte Rápido (Slash)

**Nome da skill:** Corte Rápido (Slash)

**Descrição:** O usuário desfere um golpe preciso com sua arma.

**Efeito principal:** Causa dano físico médio em um inimigo.

**Quem ela afeta:** 1 inimigo.

**Custo:** 0 MP (ataque básico).

**Status aplicado:** Nenhum.

**Limitação:** Requer arma do tipo 1 (espada).

**Por que ela é interessante:** Essa skill é o ataque básico confiável que equilibra custo zero com dano consistente. Permite ao jogador sempre ter uma opção ofensiva disponível sem gastar recursos.

**Código:**

```json
{
  "id": 100,
  "name": "Corte Rápido",
  "description": "Um golpe preciso com sua arma.",
  "iconIndex": 76,
  "stypeId": 0,
  "scope": 1,
  "mpCost": 0,
  "tpCost": 0,
  "tpGain": 5,
  "animationId": 1,
  "messageType": 1,
  "message1": "%1 ataca!",
  "message2": "",
  "requiredWtypeId1": 1,
  "requiredWtypeId2": 0,
  "hitType": 1,
  "successRate": 100,
  "repeats": 1,
  "speed": 0,
  "occasion": 0,
  "damage": {
    "critical": true,
    "elementId": -1,
    "formula": "a.atk * 4 - b.def * 2",
    "type": 1,
    "variance": 20
  },
  "effects": [],
  "note": ""
}
```

---

### Exemplo 2: Fúria de Golpes (Flurry)

**Nome da skill:** Fúria de Golpes (Flurry)

**Descrição:** O usuário desferem uma série rápida de golpes consecutivos.

**Efeito principal:** Causa dano físico baixo múltiplas vezes em um inimigo.

**Quem ela afeta:** 1 inimigo.

**Custo:** 5 MP.

**Status aplicado:** Nenhum.

**Limitação:** Taxa de sucesso reduzida (95%) devido à dificuldade de acertar múltiplos golpes.

**Por que ela é interessante:** Essa skill é excelente contra inimigos com baixa defesa, pois cada golpe calcula a defesa separadamente. A variação alta adiciona um elemento de risco/recompensa.

**Código:**

```json
{
  "id": 106,
  "name": "Fúria de Golpes",
  "description": "Uma série rápida de golpes consecutivos.",
  "iconIndex": 76,
  "stypeId": 0,
  "scope": 1,
  "mpCost": 5,
  "tpCost": 0,
  "tpGain": 8,
  "animationId": 1,
  "messageType": 1,
  "message1": "%1 desferem uma fúria de golpes!",
  "message2": "",
  "requiredWtypeId1": 0,
  "requiredWtypeId2": 0,
  "hitType": 1,
  "successRate": 95,
  "repeats": 3,
  "speed": 0,
  "occasion": 1,
  "damage": {
    "critical": true,
    "elementId": 0,
    "formula": "a.atk * 2 - b.def * 1",
    "type": 1,
    "variance": 25
  },
  "effects": [],
  "note": ""
}
```

---

### Exemplo 3: Golpe Carregado (Charged Strike)

**Nome da skill:** Golpe Carregado (Charged Strike)

**Descrição:** Um ataque poderoso que leva tempo para ser carregado.

**Efeito principal:** Causa dano físico alto em um inimigo.

**Quem ela afeta:** 1 inimigo.

**Custo:** 0 MP.

**Status aplicado:** Nenhum.

**Limitação:** Tempo de cast lento (speed: -2000), usuário agirá depois de todos os outros.

**Por que ela é interessante:** Introduz uma mecânica de risco/recompensa temporal. O jogador deve antecipar o turno do inimigo e usar a skill no momento certo para maximizar seu dano.

**Código:**

```json
{
  "id": 105,
  "name": "Golpe Carregado",
  "description": "Um ataque poderoso que leva tempo para carregar.",
  "iconIndex": 76,
  "stypeId": 0,
  "scope": 1,
  "mpCost": 0,
  "tpCost": 0,
  "tpGain": 10,
  "animationId": 1,
  "messageType": 1,
  "message1": "%1 carrega poder!",
  "message2": "",
  "requiredWtypeId1": 0,
  "requiredWtypeId2": 0,
  "hitType": 1,
  "successRate": 100,
  "repeats": 1,
  "speed": -2000,
  "occasion": 1,
  "damage": {
    "critical": true,
    "elementId": 0,
    "formula": "a.atk * 6 - b.def * 2",
    "type": 1,
    "variance": 10
  },
  "effects": [],
  "note": ""
}
```

---

### Exemplo 4: Golpe Envenenado (Poison Strike)

**Nome da skill:** Golpe Envenenado (Poison Strike)

**Descrição:** O usuário desfere um golpe rápido com chance de envenenar o alvo.

**Efeito principal:** Causa dano físico médio em um inimigo.

**Quem ela afeta:** 1 inimigo.

**Custo:** 3 MP.

**Status aplicado:** 40% de chance de aplicar Poison (state 4) por 3 turnos.

**Limitação:** Se o alvo for imune a veneno, a skill causa apenas o dano normal.

**Por que ela é interessante:** Combina dano imediato com dano ao longo do tempo, dando mais opções estratégicas ao jogador, principalmente em batalhas contra inimigos com muito HP. [Veja o exemplo da implementação](../technical-guides/Skills.json-technical-guide.md#template-5-skill-com-chance-de-state)

**Código:**

```json
{
  "id": 104,
  "name": "Golpe Envenenado",
  "description": "Um golpe com chance de envenenar o alvo.",
  "iconIndex": 76,
  "stypeId": 0,
  "scope": 1,
  "mpCost": 3,
  "tpCost": 0,
  "tpGain": 4,
  "animationId": 1,
  "messageType": 1,
  "message1": "%1 usa Golpe Envenenado!",
  "message2": "",
  "requiredWtypeId1": 0,
  "requiredWtypeId2": 0,
  "hitType": 1,
  "successRate": 100,
  "repeats": 1,
  "speed": 0,
  "occasion": 1,
  "damage": {
    "critical": true,
    "elementId": 0,
    "formula": "a.atk * 3 - b.def * 2",
    "type": 1,
    "variance": 20
  },
  "effects": [
    {"code": 21, "dataId": 4, "value1": 0.4, "value2": 0}
  ],
  "note": ""
}
```

---

## SKILLS MÁGICAS

### Exemplo 5: Bola de Fogo (Fireball)

**Nome da skill:** Bola de Fogo (Fireball)

**Descrição:** Arremessa uma bola de fogo em um inimigo.

**Efeito principal:** Causa dano mágico alto em um inimigo.

**Quem ela afeta:** 1 inimigo.

**Custo:** 8 MP.

**Status aplicado:** Nenhum.

**Limitação:** Só pode ser usada em batalha.

**Por que ela é interessante:** A magia de dano básica balanceada. O dano escala tanto com MAT quanto com nível, permitindo que permaneça útil durante todo o jogo. [Veja o exemplo da implementação](../technical-guides/Skills.json-technical-guide.md#template-2-magia-de-dano-hp-damage)

**Código:**

```json
{
  "id": 101,
  "name": "Bola de Fogo",
  "description": "Arremessa uma bola de fogo em um inimigo.",
  "iconIndex": 64,
  "stypeId": 1,
  "scope": 1,
  "mpCost": 8,
  "tpCost": 0,
  "tpGain": 2,
  "animationId": 52,
  "messageType": 1,
  "message1": "%1 usa Bola de Fogo!",
  "message2": "",
  "requiredWtypeId1": 0,
  "requiredWtypeId2": 0,
  "hitType": 2,
  "successRate": 100,
  "repeats": 1,
  "speed": 0,
  "occasion": 1,
  "damage": {
    "critical": false,
    "elementId": 3,
    "formula": "a.mat * 4 + a.level * 5",
    "type": 1,
    "variance": 10
  },
  "effects": [],
  "note": ""
}
```

---

### Exemplo 6: Cura (Heal)

**Nome da skill:** Cura (Heal)

**Descrição:** Restaura HP de um aliado.

**Efeito principal:** Recupera HP de um aliado.

**Quem ela afeta:** 1 aliado.

**Custo:** 4 MP.

**Status aplicado:** Nenhum.

**Limitação:** Nenhuma.

**Por que ela é interessante:** Essencial para qualquer grupo que tenha um curandeiro. A fórmula combina cura fixa com cura baseada em MAT, permitindo que seja útil desde o início até o fim do jogo. [Veja o exemplo da implementação](../technical-guides/Skills.json-technical-guide.md#template-3-cura-hp-recover)

**Código:**

```json
{
  "id": 102,
  "name": "Cura",
  "description": "Restaura HP de um aliado.",
  "iconIndex": 81,
  "stypeId": 1,
  "scope": 7,
  "mpCost": 4,
  "tpCost": 0,
  "tpGain": 0,
  "animationId": 47,
  "messageType": 1,
  "message1": "%1 usa Cura!",
  "message2": "",
  "requiredWtypeId1": 0,
  "requiredWtypeId2": 0,
  "hitType": 0,
  "successRate": 100,
  "repeats": 1,
  "speed": 0,
  "occasion": 0,
  "damage": {
    "critical": false,
    "elementId": 0,
    "formula": "200 + a.mat * 2",
    "type": 3,
    "variance": 20
  },
  "effects": [],
  "note": ""
}
```

---

### Exemplo 7: Drenagem de Alma (Soul Drain)

**Nome da skill:** Drenagem de Alma (Soul Drain)

**Descrição:** Drena a força vital do alvo, convertendo dano em vida para o usuário.

**Efeito principal:** Causa dano mágico em um inimigo e recupera HP do usuário.

**Quem ela afeta:** 1 inimigo (dano) + usuário (cura).

**Custo:** 15 MP.

**Status aplicado:** Nenhum.

**Limitação:** Requer VisuStella Battle Core para o efeito de lifesteal.

**Por que ela é interessante:** Oferece uma estratégia de sobrevivência para magos ofensivos. Permite que o jogador se mantenha vivo enquanto causa dano, reduzindo a necessidade de dedicar turnos à cura. [Veja o exemplo da implementação](../technical-guides/Skills.json-technical-guide.md#exemplo-2-skill-com-lifesteal-percentual)

**Código:**

```json
{
  "id": 201,
  "name": "Drenagem de Alma",
  "description": "Drena a força vital do alvo.",
  "iconIndex": 67,
  "stypeId": 1,
  "scope": 1,
  "mpCost": 15,
  "tpCost": 0,
  "tpGain": 0,
  "animationId": 56,
  "messageType": 1,
  "message1": "%1 usa Drenagem de Alma!",
  "message2": "",
  "requiredWtypeId1": 0,
  "requiredWtypeId2": 0,
  "hitType": 2,
  "successRate": 100,
  "repeats": 1,
  "speed": 0,
  "occasion": 1,
  "damage": {
    "critical": false,
    "elementId": 0,
    "formula": "a.mat * 3 + a.level * 10",
    "type": 1,
    "variance": 15
  },
  "effects": [],
  "note": "<JS Post-Damage End>\n// Recupera 40% do dano como HP\nvar hpDamage = Math.abs(target.result().hpDamage);\nif (hpDamage > 0) {\n  user.gainHp(Math.floor(hpDamage * 0.4));\n}\n</JS Post-Damage End>"
}
```

---

## SKILLS DE BUFF/DEBUFF

### Exemplo 8: Provocação (Taunt)

**Nome da skill:** Provocação (Taunt)

**Descrição:** O usuário provoca todos os inimigos, aumentando o ataque dos aliados.

**Efeito principal:** Aumenta o ATK de todos os aliados por 3 turnos.

**Quem ela afeta:** Todos os aliados.

**Custo:** 0 MP.

**Status aplicado:** Buff de ATK (code 31, dataId 2) por 3 turnos.

**Limitação:** Só pode ser usada em batalha.

**Por que ela é interessante:** Essencial para combates longos ou contra chefes. O custo zero permite uso frequente, e o buff em grupo afeta múltiplos aliados simultaneamente. [Veja o exemplo da implementação](../technical-guides/Skills.json-technical-guide.md#template-4-buff-de-ataque)

**Código:**

```json
{
  "id": 103,
  "name": "Provocação",
  "description": "Aumenta o ataque de todos os aliados.",
  "iconIndex": 82,
  "stypeId": 0,
  "scope": 8,
  "mpCost": 0,
  "tpCost": 0,
  "tpGain": 10,
  "animationId": 0,
  "messageType": 1,
  "message1": "%1 provoca os inimigos!",
  "message2": "",
  "requiredWtypeId1": 0,
  "requiredWtypeId2": 0,
  "hitType": 0,
  "successRate": 100,
  "repeats": 1,
  "speed": 0,
  "occasion": 1,
  "damage": {
    "critical": false,
    "elementId": 0,
    "formula": "0",
    "type": 0,
    "variance": 20
  },
  "effects": [
    {"code": 31, "dataId": 2, "value1": 0, "value2": 3}
  ],
  "note": ""
}
```

---

### Exemplo 9: Golpe Dissipador (Dispel Strike)

**Nome da skill:** Golpe Dissipador (Dispel Strike)

**Descrição:** Um golpe que remove todos os buffs do alvo e causa dano extra baseado neles.

**Efeito principal:** Remove todos os buffs de um inimigo e causa dano físico.

**Quem ela afeta:** 1 inimigo.

**Custo:** 10 MP.

**Status aplicado:** Nenhum.

**Limitação:** O dano extra depende do número de buffs do alvo.

**Por que ela é interessante:** Contra-ataque ideal contra inimigos que usam buffs. Remove buffs defensivos para aumentar o dano recebido e ainda causa dano extra baseado nos buffs removidos. [Veja o exemplo da implementação](../technical-guides/Skills.json-technical-guide.md#exemplo-3-skill-que-remove-buffs-e-causa-dano)

**Código:**

```json
{
  "id": 202,
  "name": "Golpe Dissipador",
  "description": "Remove todos os buffs do alvo e causa dano extra.",
  "iconIndex": 76,
  "stypeId": 0,
  "scope": 1,
  "mpCost": 10,
  "tpCost": 0,
  "tpGain": 5,
  "animationId": 1,
  "messageType": 1,
  "message1": "%1 usa Golpe Dissipador!",
  "message2": "",
  "requiredWtypeId1": 0,
  "requiredWtypeId2": 0,
  "hitType": 1,
  "successRate": 100,
  "repeats": 1,
  "speed": 0,
  "occasion": 1,
  "damage": {
    "critical": false,
    "elementId": 0,
    "formula": "a.atk * 2",
    "type": 1,
    "variance": 15
  },
  "effects": [
    {"code": 33, "dataId": 0, "value1": 0, "value2": 0},
    {"code": 33, "dataId": 1, "value1": 0, "value2": 0},
    {"code": 33, "dataId": 2, "value1": 0, "value2": 0},
    {"code": 33, "dataId": 3, "value1": 0, "value2": 0},
    {"code": 33, "dataId": 4, "value1": 0, "value2": 0},
    {"code": 33, "dataId": 5, "value1": 0, "value2": 0},
    {"code": 33, "dataId": 6, "value1": 0, "value2": 0},
    {"code": 33, "dataId": 7, "value1": 0, "value2": 0}
  ],
  "note": "<JS Pre-Damage Start>\n// Conta buffs e aumenta dano\nvar buffCount = 0;\nfor (var i = 0; i < 8; i++) {\n  if (target._buffs[i] > 0) buffCount++;\n}\nif (buffCount > 0) {\n  var baseFormula = this._item.damage.formula;\n  this._item.damage.formula = '(' + baseFormula + ') * (1 + ' + buffCount + ' * 0.2)';\n}\n</JS Pre-Damage Start>"
}
```

---

### Exemplo 10: Escudo Reativo (Reactive Shield)

**Nome da skill:** Escudo Reativo (Reactive Shield)

**Descrição:** Cria um escudo que cura 20% do HP máximo ao ser aplicado.

**Efeito principal:** Aplica um state que cura o usuário e protege contra danos.

**Quem ela afeta:** Usuário.

**Custo:** 0 MP.

**Status aplicado:** Escudo Reativo (state 99) por 5 turnos.

**Limitação:** Nenhuma.

**Por que ela é interessante:** Oferece proteção imediata através da cura inicial e buffs defensivos. O efeito de "escudo" é representado pelos buffs de DEF/MDF que duram enquanto o state estiver ativo. É uma skill defensiva versátil para personagens tanque. [Veja o exemplo da implementação](../technical-guides/States-technical-guide.md#exemplo-prático---buff-com-efeito-ao-expirar)

**Código (Skill):**

```json
{
  "id": 150,
  "name": "Escudo Reativo",
  "description": "Cria um escudo que protege e cura.",
  "iconIndex": 83,
  "stypeId": 1,
  "scope": 11,
  "mpCost": 0,
  "tpCost": 0,
  "tpGain": 5,
  "animationId": 48,
  "messageType": 1,
  "message1": "%1 cria um escudo mágico!",
  "message2": "",
  "requiredWtypeId1": 0,
  "requiredWtypeId2": 0,
  "hitType": 0,
  "successRate": 100,
  "repeats": 1,
  "speed": 1000,
  "occasion": 1,
  "damage": {
    "critical": false,
    "elementId": 0,
    "formula": "0",
    "type": 0,
    "variance": 20
  },
  "effects": [
    {"code": 21, "dataId": 99, "value1": 1.0, "value2": 0}
  ],
  "note": ""
}
```

**State correspondente (id 99):**

```json
{
  "id": 99,
  "autoRemovalTiming": 2,
  "chanceByDamage": 0,
  "iconIndex": 64,
  "maxTurns": 5,
  "message1": "%1 recebeu proteção!",
  "message4": "O escudo se dissipou.",
  "minTurns": 5,
  "motion": 0,
  "name": "Escudo Reativo",
  "note": "<Positive State>\n<JS On Add State>\nuser.gainHp(Math.floor(user.mhp * 0.2));\n</JS On Add State>",
  "overlay": 9,
  "priority": 50,
  "removeAtBattleEnd": true,
  "removeByDamage": false,
  "removeByRestriction": false,
  "removeByWalking": false,
  "restriction": 0,
  "stepsToRemove": 100,
  "traits": [
    {"code": 21, "dataId": 3, "value": 1.3},
    {"code": 21, "dataId": 5, "value": 1.3}
  ],
  "messageType": 1
}
```

---

## SKILLS ESPECIAIS

### Exemplo 11: Investida Final (Last Stand)

**Nome da skill:** Investida Final (Last Stand)

**Descrição:** Um ataque desesperado que só funciona quando o usuário está com pouca vida.

**Efeito principal:** Causa dano físico massivo em um inimigo.

**Quem ela afeta:** 1 inimigo.

**Custo:** 0 MP.

**Status aplicado:** Nenhum.

**Limitação:** Só causa dano se o usuário tiver menos de 25% HP.

**Por que ela é interessante:** Uma opção de "último recurso" que pode virar o jogo quando o personagem está prestes a cair. O risco é alto, mas a recompensa é um dano massivo. [Veja o exemplo da implementação](../technical-guides/Skills.json-technical-guide.md#exemplo-1-skill-com-dano-condicional)

**Código:**

```json
{
  "id": 200,
  "name": "Investida Final",
  "description": "Um ataque desesperado com pouco HP. Causa dano massivo.",
  "iconIndex": 76,
  "stypeId": 0,
  "scope": 1,
  "mpCost": 0,
  "tpCost": 0,
  "tpGain": 0,
  "animationId": 1,
  "messageType": 1,
  "message1": "%1 desferem uma investida final!",
  "message2": "",
  "requiredWtypeId1": 0,
  "requiredWtypeId2": 0,
  "hitType": 1,
  "successRate": 100,
  "repeats": 1,
  "speed": 0,
  "occasion": 1,
  "damage": {
    "critical": true,
    "formula": "a.atk * 5",
    "type": 1,
    "variance": 10
  },
  "effects": [],
  "note": "<JS Pre-Damage Start>\n// Só causa dano se HP < 25%\nif (user.hpRate() >= 0.25) {\n  this._item.damage.formula = '0';\n}\n</JS Pre-Damage Start>\n<JS Skill Show>\nvisible = user.hpRate() < 0.25;\n</JS Skill Show>"
}
```

---

### Exemplo 12: Rajada de Morte (Death Burst)

**Nome da skill:** Rajada de Morte (Death Burst)

**Descrição:** Se a skill matar o alvo, causa uma explosão que atinge todos os inimigos.

**Efeito principal:** Causa dano mágico em um inimigo, com dano em área se matar.

**Quem ela afeta:** 1 inimigo (primário) + todos os inimigos (explosão).

**Custo:** 20 MP.

**Status aplicado:** Nenhum.

**Limitação:** O dano em área só ocorre se o alvo primário for morto.

**Por que ela é interessante:** Excelente contra grupos de inimigos fortes. Se o jogador conseguir eliminar um, a explosão pode enfraquecer ou matar os demais. É uma skill de "finishing move". [Veja o exemplo da implementação](../technical-guides/Skills.json-technical-guide.md#hook-2-js-post-damage-end)

**Código:**

```json
{
  "id": 103,
  "name": "Rajada de Morte",
  "description": "Se matar o alvo, causa explosão em área.",
  "iconIndex": 65,
  "stypeId": 1,
  "scope": 2,
  "mpCost": 20,
  "tpCost": 0,
  "tpGain": 0,
  "animationId": 56,
  "messageType": 1,
  "message1": "%1 lança Rajada de Morte!",
  "message2": "",
  "requiredWtypeId1": 0,
  "requiredWtypeId2": 0,
  "hitType": 2,
  "successRate": 100,
  "repeats": 1,
  "speed": 0,
  "occasion": 1,
  "damage": {
    "critical": false,
    "elementId": 0,
    "formula": "a.mat * 3",
    "type": 1,
    "variance": 15
  },
  "effects": [],
  "note": "<JS Post-Damage End>\n// Se matou o alvo, causa dano em área aos outros\nif (!target.isAlive() && target.result().hpDamage < 0) {\n  var burstDamage = user.mat * 2;\n  target.opponentsUnit().aliveMembers().forEach(function(enemy) {\n    if (enemy !== target) {\n      enemy.gainHp(-burstDamage);\n    }\n  });\n}\n</JS Post-Damage End>"
}
```

---

### Exemplo 13: Fuga (Escape)

**Nome da skill:** Fuga (Escape)

**Descrição:** Tenta fugir da batalha.

**Efeito principal:** Tenta encerrar a batalha fugindo.

**Quem ela afeta:** Usuário.

**Custo:** 0 MP.

**Status aplicado:** Nenhum.

**Limitação:** Pode falhar dependendo dos inimigos e taxa de fuga.

**Por que ela é interessante:** Uma opção de emergência quando a batalha está muito difícil. A velocidade alta (2000) garante que o usuário tentará fugir antes dos inimigos agirem. [Veja o exemplo da implementação](../technical-guides/Skills.json-technical-guide.md#template-8-skill-de-fuga)

**Código:**

```json
{
  "id": 107,
  "name": "Fuga",
  "description": "Tenta fugir da batalha.",
  "iconIndex": 98,
  "stypeId": 0,
  "scope": 11,
  "mpCost": 0,
  "tpCost": 0,
  "tpGain": 0,
  "animationId": 0,
  "messageType": 1,
  "message1": "%1 tenta fugir!",
  "message2": "",
  "requiredWtypeId1": 0,
  "requiredWtypeId2": 0,
  "hitType": 0,
  "successRate": 100,
  "repeats": 1,
  "speed": 2000,
  "occasion": 1,
  "damage": {
    "critical": false,
    "elementId": 0,
    "formula": "0",
    "type": 0,
    "variance": 20
  },
  "effects": [
    {"code": 41, "dataId": 0, "value1": 0, "value2": 0}
  ],
  "note": ""
}
```

---

## SKILLS COM VISUSTELLA JS HOOKS

### Exemplo 14: Explorar Fraqueza (Exploit Weakness)

**Nome da skill:** Explorar Fraqueza (Exploit Weakness)

**Descrição:** Um ataque que causa dano extra contra alvos com debuffs.

**Efeito principal:** Causa dano físico em um inimigo, aumentado se o alvo tiver debuffs.

**Quem ela afeta:** 1 inimigo.

**Custo:** 5 MP.

**Status aplicado:** Nenhum.

**Limitação:** O dano extra depende do número de debuffs do alvo.

**Por que ela é interessante:** Recompensa estratégia: o jogador pode primeiro aplicar debuffs e então usar esta skill para dano massivo. Funciona como um "finisher". [Veja o exemplo da implementação](../technical-guides/Skills.json-technical-guide.md#exemplo-prático---dano-aumentado-contra-debuffs)

**Código:**

```json
{
  "id": 101,
  "name": "Explorar Fraqueza",
  "description": "Causa +50% dano por cada debuff do alvo.",
  "iconIndex": 76,
  "stypeId": 0,
  "scope": 1,
  "mpCost": 5,
  "tpCost": 0,
  "tpGain": 5,
  "animationId": 1,
  "messageType": 1,
  "message1": "%1 explora as fraquezas do alvo!",
  "message2": "",
  "requiredWtypeId1": 0,
  "requiredWtypeId2": 0,
  "hitType": 1,
  "successRate": 100,
  "repeats": 1,
  "speed": 0,
  "occasion": 1,
  "damage": {
    "critical": true,
    "elementId": 0,
    "formula": "a.atk * 3",
    "type": 1,
    "variance": 15
  },
  "effects": [],
  "note": "<JS Pre-Damage Start>\n// +50% dano se alvo tem debuff\nvar debuffCount = target._buffs.reduce(function(count, buff) {\n  return count + (buff < 0 ? 1 : 0);\n}, 0);\nif (debuffCount > 0) {\n  var baseFormula = this._item.damage.formula;\n  this._item.damage.formula = '(' + baseFormula + ') * (1 + ' + debuffCount + ' * 0.5)';\n}\n</JS Pre-Damage Start>"
}
```

---

### Exemplo 15: Sobrecarga Mágica (Magical Overload)

**Nome da skill (State):** Sobrecarga Mágica

**Descrição:** Aumenta o poder mágico drasticamente, mas causa dano ao expirar.

**Efeito principal:** +50% MAT enquanto ativo, -20% HP ao expirar.

**Quem ela afeta:** Usuário.

**Custo:** 0 MP (é um state passivo).

**Status aplicado:** Nenhum.

**Limitação:** Dura 3 turnos, depois causa dano ao usuário.

**Por que ela é interessante:** Uma mecânica de risco/recompensa: o jogador ganha poder massivo por 3 turnos, mas sofre as consequências depois. Ideal para "bursts" de dano contra chefes. [Veja o exemplo da implementação](../technical-guides/States-technical-guide.md#exemplo-prático---overload)

**Código:**

```json
{
  "id": 52,
  "name": "Sobrecarga Mágica",
  "description": "+50% MAT por 3 turnos, depois -20% HP.",
  "minTurns": 3,
  "maxTurns": 3,
  "autoRemovalTiming": 1,
  "note": "<Positive State>\n<JS On Add State>\n// +50% MAT enquanto ativo\n</JS On Add State>\n<JS On Expire State>\n// Ao expirar: perde 20% HP atual\nuser.gainHp(-Math.floor(user.hp * 0.2));\n</JS On Expire State>",
  "iconIndex": 64,
  "overlay": 9,
  "priority": 60,
  "removeAtBattleEnd": true,
  "removeByDamage": false,
  "removeByRestriction": false,
  "removeByWalking": false,
  "restriction": 0,
  "traits": [
    {"code": 21, "dataId": 4, "value": 1.5}
  ],
  "messageType": 1
}
```

---

### Exemplo 16: Veneno Tóxico (Toxic Poison)

**Nome da skill (State):** Veneno Tóxico

**Descrição:** Um veneno que fica mais forte a cada turno.

**Efeito principal:** Causa dano de 5% HP Máx + bônus por turno restante.

**Quem ela afeta:** Alvo.

**Custo:** 5 MP (skill que aplica).

**Status aplicado:** Veneno Tóxico por 5 turnos.

**Limitação:** O dano aumenta com o tempo, incentivando cura rápida.

**Por que ela é interessante:** Cria urgência: o jogador precisa curar o veneno rapidamente ou o alvo sofrerá dano crescente. A mecânica de DOT progressivo é mais interessante que DOT fixo. [Veja o exemplo da implementação](../technical-guides/States-technical-guide.md#exemplo-prático---poison-progressivo)

**Código (State):**

```json
{
  "id": 53,
  "name": "Veneno Tóxico",
  "description": "Veneno que aumenta o dano a cada turno.",
  "minTurns": 5,
  "maxTurns": 5,
  "autoRemovalTiming": 2,
  "note": "<Category: DOT>\n<Negative State>\n<JS HP Slip Damage>\n// Dano aumenta a cada turno baseado em turnos restantes\nvar turns = user._stateTurns[state.id];\ndamage = Math.floor(target.mhp * 0.05 + (5 - turns) * 20);\n</JS HP Slip Damage>\n<JS Slip Refresh>",
  "iconIndex": 2,
  "overlay": 3,
  "priority": 65,
  "removeAtBattleEnd": true,
  "removeByDamage": false,
  "removeByRestriction": false,
  "removeByWalking": false,
  "restriction": 0,
  "traits": [],
  "messageType": 1
}
```

---

### Exemplo 17: Poder Ascendente (Rising Power)

**Nome da skill (State):** Poder Ascendente

**Descrição:** Aumenta o ataque a cada turno, acumulando até 5 vezes.

**Efeito principal:** +1 stack de ATK por turno (máximo 5).

**Quem ela afeta:** Usuário (state passivo).

**Custo:** Nenhum (é um state passivo).

**Status aplicado:** Buffs de ATK cumulativos.

**Limitação:** Reinicia ao fim da batalha.

**Por que ela é interessante:** Recompensa batalhas longas: quanto mais tempo a batalha durar, mais forte o usuário fica. É ideal para personagens "guerreiros" que podem aguentar combates prolongados. [Veja o exemplo da implementação](../technical-guides/States-technical-guide.md#exemplo-prático---ataque-acumulativo)

**Código:**

```json
{
  "id": 58,
  "name": "Poder Ascendente",
  "description": "Aumenta ATK a cada turno (max 5).",
  "note": "<Passive Stackable>\n<JS On Turn Start>\n// Aumenta ATK em 10% a cada turno (max 5 stacks)\nvar stacks = user._risingPowerStacks || 0;\nif (stacks < 5) {\n  stacks++;\n  user._risingPowerStacks = stacks;\n  user.addBuff(2, 99);\n}\n</JS On Turn Start>\n<JS On Battle End>\nuser._risingPowerStacks = 0;\n</JS On Battle End>",
  "iconIndex": 76,
  "overlay": 9,
  "priority": 50,
  "removeAtBattleEnd": false,
  "removeByDamage": false,
  "removeByRestriction": false,
  "removeByWalking": false,
  "restriction": 0,
  "traits": [],
  "messageType": 1
}
```

---

### Exemplo 18: Modo Berserk (Berserk Mode)

**Nome da skill (State):** Modo Berserk

**Descrição:** O usuário entra em fúria, ganhando ataque massivo mas perdendo defesa.

**Efeito principal:** +100% ATK, -50% DEF, só ativo quando HP < 30%.

**Quem ela afeta:** Usuário (state passivo condicional).

**Custo:** Nenhum (é um state passivo).

**Status aplicado:** Nenhum (modifica atributos via traits).

**Limitação:** Só ativo quando HP < 30%.

**Por que ela é interessante:** Cria uma mecânica interessante de "desespero": quando o personagem está prestes a morrer, ele se torna extremamente ofensivo mas também mais vulnerável. [Veja o exemplo da implementação](../technical-guides/States-technical-guide.md#exemplo-prático---berserk-mode)

**Código:**

```json
{
  "id": 54,
  "name": "Modo Berserk",
  "description": "Fúria que aumenta ataque e reduz defesa quando HP baixo.",
  "note": "<Passive Stackable>\n<JS Passive Condition>\n// Ativo apenas quando HP < 30%\ncondition = user.hp < user.mhp * 0.3;\n</JS Passive Condition>",
  "iconIndex": 5,
  "overlay": 5,
  "priority": 70,
  "removeAtBattleEnd": false,
  "removeByDamage": false,
  "removeByRestriction": false,
  "removeByWalking": false,
  "restriction": 0,
  "traits": [
    {"code": 21, "dataId": 2, "value": 2.0},
    {"code": 21, "dataId": 3, "value": 0.5},
    {"code": 23, "dataId": 7, "value": 0.5}
  ],
  "messageType": 1
}
```

---

### Exemplo 19: Marca da Morte (Execute)

**Nome da skill:** Marca da Morte (Execute)

**Descrição:** Um golpe fatal que mata instantaneamente inimigos feridos.

**Efeito principal:** Causa dano físico, mata se alvo ficar < 20% HP.

**Quem ela afeta:** 1 inimigo.

**Custo:** 12 MP.

**Status aplicado:** Nenhum.

**Limitação:** Só mata se o alvo receber dano físico e ficar < 20% HP.

**Por que ela é interessante:** Uma ferramenta eficiente para eliminar inimigos fortalecidos que estão próximos da morte. Em vez de desperdiçar vários ataques para reduzir os últimos pontos de vida, o jogador pode usar esta skill para finalizar rapidamente. [Veja o exemplo da implementação](../technical-guides/States-technical-guide.md#exemplo-prático---execute)

**Código:**

```json
{
  "id": 100,
  "name": "Marca da Morte",
  "description": "Mata instantaneamente se alvo ficar < 20% HP.",
  "iconIndex": 99,
  "stypeId": 0,
  "scope": 1,
  "mpCost": 12,
  "tpCost": 0,
  "tpGain": 10,
  "animationId": 1,
  "messageType": 1,
  "message1": "%1 usa Marca da Morte!",
  "message2": "",
  "requiredWtypeId1": 0,
  "requiredWtypeId2": 0,
  "hitType": 1,
  "successRate": 100,
  "repeats": 1,
  "speed": 0,
  "occasion": 1,
  "damage": {
    "critical": true,
    "elementId": 0,
    "formula": "a.atk * 4",
    "type": 1,
    "variance": 15
  },
  "effects": [],
  "note": "<JS Post-Damage End>\n// Se o alvo ficou com < 20% HP e recebeu dano físico, mata instantaneamente\nif (target.isAlive() && target.hpRate() < 0.2 && this.isPhysical() && target.result().hpDamage > 0) {\n  target.setHp(0);\n}\n</JS Post-Damage End>"
}
```

---

### Exemplo 20: Dardo Venenoso (Poison Dart)

**Nome da skill:** Dardo Venenoso (Poison Dart)

**Descrição:** Arremessa um dardo envenenado que aplica Veneno Tóxico.

**Efeito principal:** Causa dano físico baixo + aplica Veneno Tóxico (5% HP/turno, progressivo).

**Quem ela afeta:** 1 inimigo.

**Custo:** 5 MP.

**Status aplicado:** 100% de chance de aplicar Veneno Tóxico (state 53) por 5 turnos.

**Limitação:** O dano direto é baixo, o dano real vem do DOT.

**Por que ela é interessante:** Combina dano imediato com DOT progressivo que aumenta com o tempo. O jogador pode aplicar esta skill no início do combate e deixar o veneno fazer o trabalho enquanto foca em outros alvos. [Veja o exemplo da implementação](../technical-guides/States-technical-guide.md#cenário-5-poison-5-hp-máx-por-5-turnos)

**Código:**

```json
{
  "id": 300,
  "name": "Dardo Venenoso",
  "description": "Aplica Veneno Tóxico no alvo.",
  "iconIndex": 2,
  "stypeId": 1,
  "scope": 1,
  "mpCost": 5,
  "tpCost": 0,
  "tpGain": 2,
  "animationId": 50,
  "messageType": 1,
  "message1": "%1 usa Dardo Venenoso!",
  "message2": "",
  "requiredWtypeId1": 0,
  "requiredWtypeId2": 0,
  "hitType": 2,
  "successRate": 100,
  "repeats": 1,
  "speed": 0,
  "occasion": 1,
  "damage": {
    "critical": false,
    "elementId": 0,
    "formula": "a.agi * 2",
    "type": 1,
    "variance": 10
  },
  "effects": [
    {"code": 21, "dataId": 53, "value1": 1.0, "value2": 0}
  ],
  "note": ""
}
```

---

## ESTADOS DE APOIO

Alguns exemplos neste guia utilizam states específicos que devem ser criados no `States.json`. Abaixo estão os IDs dos states mencionados:

| State ID | Nome | Descrição |
|----------|------|-----------|
| 4 | Poison | Veneno básico (3 turnos) |
| 52 | Cursed Mark | Maldição que aplica debuff mais fraco ao ser curada |
| 53 | Toxic Poison | Veneno progressivo (5% HP + bônus por turno) |
| 54 | Berserk Mode | Modo berserk passivo (HP < 30%) |
| 58 | Rising Power | Buff acumulativo de ATK |
| 99 | Reactive Shield | Escudo que cura e dá defesa |

---

## REFERÊNCIA CRUZADA

Este guia faz parte da documentação técnica de RPG Maker MZ. Para detalhes sobre implementação:

- **Skills.json Technical Guide** - Documentação completa de todos os campos de skills [Ver documentação técnica](../technical-guides/Skills.json-technical-guide.md)

- **States Technical Guide** - Documentação completa de todos os campos de states e JavaScript Hooks [Ver documentação técnica](../technical-guides/States-technical-guide.md)

---

**Última atualização:** 2026-03-18
**Versão:** 1.0
**Autor:** Sistema de Documentação RPG Maker MZ
