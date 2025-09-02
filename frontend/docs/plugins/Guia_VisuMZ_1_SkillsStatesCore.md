# Guia do Plugin: VisuMZ_1_SkillsStatesCore

**Objetivo:** Criar um guia completo para desenvolvedores sobre como usar o `VisuMZ_1_SkillsStatesCore` para aprimorar habilidades e estados com novos custos, cooldowns e efeitos.

## 1. Introdução ao Skills & States Core

### 1.1. O que é o Skills & States Core?

O plugin expande as funcionalidades de habilidades e estados, permitindo mecânicas como múltiplos custos, cooldowns, e efeitos de estado mais complexos.

### 1.2. Pré-requisitos:

É necessário ter o `VisuMZ_0_CoreEngine` instalado e posicionado antes deste plugin na lista de plugins.

## 2. Configurações do Plugin (Plugin Parameters)

### 2.1. Skill Settings:

- **Show All Costs**: Ative para que, se uma habilidade custa MP e TP, ambos os custos sejam exibidos na janela de habilidades.
- **Cooldowns Globais**: Permite configurar um tempo de recarga que afeta um grupo de habilidades.

### 2.2. State Settings:

- **Counter Font Size**: Ajusta o tamanho do número que aparece sobre um ícone de estado, indicando os turnos restantes.
- **State Icon Overlapping**: Gerencia como os ícones de estado são exibidos quando há múltiplos estados.

## 3. Guia de Recursos por Notetags (Database)

### 3.1. Notetags de Custo de Habilidade:

- `<HP Cost: x>`: A habilidade custa `x` de HP.
- `<HP Cost: x%>`: A habilidade custa `x%` do HP máximo.
- `<MP Cost: x>`: A habilidade custa `x` de MP.
- `<MP Cost: y%>`: A habilidade custa `y%` do MP máximo.
- `<TP Cost: x>`: A habilidade custa `x` de TP.
- `<Item Cost: id, amount>`: A habilidade consome `amount` do item com `id`.
- `<Gold Cost: x>`: A habilidade custa `x` de ouro.

**Como e quando implementar:**
- Crie uma habilidade 'Sacrifício' que consome 20% do HP do usuário com `<HP Cost: 20%>`.
- Crie uma habilidade de 'Alquimia' que requer 2 'Ervas' usando `<Item Cost: 4, 2>` (assumindo que o ID da Erva é 4).

### 3.2. Notetags de Cooldown de Habilidade:

- `<Cooldown: x Turns>`: A habilidade entra em recarga por `x` turnos.
- `<Skill Cooldown: id, x Turns>`: A habilidade `id` entra em recarga por `x` turnos.
- `<Global Cooldown: x Turns>`: Todas as habilidades com esta notetag entram em recarga por `x` turnos.

**Como e quando implementar:**
- Coloque `<Cooldown: 3 Turns>` em uma magia poderosa para que ela só possa ser usada a cada 3 turnos.
- Use `<Global Cooldown: 1 Turn>` em habilidades rápidas para que, ao usar uma, todas as outras com essa notetag entrem em cooldown por 1 turno.

### 3.3. Notetags de Efeitos de Habilidade:

- `<Learn Skill: id>`: O item ensina a habilidade com `id`.
- `<Require Skill: id>`: A habilidade requer que o usuário já conheça a habilidade com `id`.
- `<Forbid Skill: id>`: Impede o uso da habilidade se o usuário conhece a habilidade com `id`.

**Como e quando implementar:**
- Use `<Learn Skill: 55>` em um item 'Tomo de Magia' para que ele ensine uma nova habilidade ao ser usado.
- Use `<Require Skill: 50>` em uma habilidade 'Ultra Combo' para que ela só possa ser usada se o personagem já souber a habilidade 'Combo Inicial' (ID 50).

### 3.4. Notetags de Estado:

- `<Max Stacks: x>`: O estado pode se acumular até `x` vezes.
- `<State Immunity: id>`: O equipamento ou estado concede imunidade ao estado com `id`.
- `<State Break Chance: x% on Damage>`: O estado tem `x%` de chance de ser removido ao receber dano.

**Como e quando implementar:**
- Use `<Max Stacks: 5>` em um estado de 'Veneno' para permitir que ele se acumule até 5 vezes, aumentando o dano.
- Use `<State Immunity: 4>` em um equipamento para torná-lo imune a 'Silêncio'.
- Use `<State Break Chance: 50% on Damage>` em um estado 'Congelado' para que haja 50% de chance de o estado ser removido ao receber dano.

## 4. Guia de Recursos via JavaScript (Avançado)

### 4.1. Usar Notetags com JavaScript:

- `<JS HP Cost: code>`: Define um custo de HP customizado com código JavaScript.
- `<JS Skill Enable: code>`: Define uma condição de uso customizada com código JavaScript.
- `<JS State Effect: code>`: Define um efeito de estado customizado com código JavaScript.

**Exemplo prático (Custo):**
- Crie uma habilidade que custa todo o TP do usuário: `<JS TP Cost: user.tp>`.

**Exemplo prático (Habilitar):**
- Crie uma habilidade que só pode ser usada se o usuário estiver com o estado 'Fúria': `<JS Skill Enable: user.isStateAffected(10)>`.

**Exemplo prático (Estado):**
- Crie um estado 'Regeneração' que cura 5% do HP máximo por turno: `<JS State Effect: user.gainHp(Math.ceil(user.mhp * 0.05));>`.

### 4.2. Usar Script Calls em Eventos:

- `$gameActors.actor(1).clearCooldowns();`: Zera o cooldown de todas as habilidades do ator 1.
- `$gameTroop.members()[0].state(5).turns += 3;`: Adiciona 3 turnos ao estado de 'Veneno' (ID 5) no primeiro inimigo da tropa.
