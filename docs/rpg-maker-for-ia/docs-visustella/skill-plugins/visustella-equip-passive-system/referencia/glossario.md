# Glossário

## Termos do Sistema

| Termo | Definição |
|-------|-----------|
| **Equip Passive** | State do RPG Maker que pode ser equipado como passivo pelo actor |
| **Passive Capacity** | Recurso limitado que determina quantos passivos um actor pode equipar simultaneamente |
| **Capacity Cost** | Custo em capacidade de cada passivo ao equipar |
| **Learnable** | Passivo listado como disponível para aprendizado (via notetag) |
| **Unlearned** | Passivo learnable que ainda não foi aprendido pelo actor |
| **Learned** | Passivo já aprendido pelo actor, disponível para equipar |
| **Equipped** | Passivo aprendido e atualmente ativo no actor (state aplicado) |
| **Unlock Condition** | Condição de gameplay que deve ser cumprida para aprender organicamente |
| **Branching** | Mecanismo onde aprender um passivo desbloqueia outros |
| **Link** | Conexão entre skill e passivo (aprender skill aprende passivo) |
| **Masking** | Ocultar nome/ícone de passivo não aprendido com caracteres substitutos |
| **Skill Learn System (SLS)** | Plugin opcional para comprar passivos em vez de unlock orgânico |

## Tipos de Notetag por Contexto

| Contexto | Onde é aplicado |
|----------|----------------|
| **State Notetag** | Inserido no campo Notes de um State no database |
| **Actor Notetag** | Inserido no campo Notes de um Actor no database |
| **Class Notetag** | Inserido no campo Notes de uma Class no database |
| **Skill Notetag** | Inserido no campo Notes de uma Skill no database |

## Parâmetros do RPG Maker MZ

| Abreviação | Nome | Tipo |
|------------|------|------|
| MaxHP | Maximum HP | Param |
| MaxMP | Maximum MP | Param |
| ATK | Attack | Param |
| DEF | Defense | Param |
| MAT | Magic Attack | Param |
| MDF | Magic Defense | Param |
| AGI | Agility | Param |
| LUK | Luck | Param |
| HIT | Hit Rate | X-Param |
| EVA | Evasion Rate | X-PARAM |
| CRI | Critical Rate | X-PARAM |
| CEV | Critical Evasion | X-PARAM |
| MEV | Magic Evasion | X-PARAM |
| MRF | Magic Reflection | X-PARAM |
| CNT | Counter Attack | X-PARAM |
| HRG | HP Regeneration | X-PARAM |
| MRG | MP Regeneration | X-PARAM |
| TRG | TP Regeneration | X-PARAM |
| TGR | Target Rate | S-Param |
| GRD | Guard Effect | S-Param |
| REC | Recovery Effect | S-Param |
| PHA | Pharmacology | S-Param |
| MCR | MP Cost Rate | S-Param |
| TCR | TP Charge Rate | S-Param |
| PDR | Physical Damage Rate | S-Param |
| MDR | Magical Damage Rate | S-Param |
| FDR | Floor Damage Rate | S-Param |
| EXR | Experience Rate | S-Param |

## Moedas do Skill Learn System

| Moeda | Abreviação | Requer |
|-------|-----------|--------|
| Ability Points | AP | Skill Learn System |
| Skill Points | SP | Skill Learn System |
| Class Points | CP | + Class Change System |
| Job Points | JP | + Class Change System |
