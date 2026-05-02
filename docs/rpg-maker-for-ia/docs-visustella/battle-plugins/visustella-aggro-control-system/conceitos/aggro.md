# Aggro

## O que e

Aggro e um valor numerico que determina a probabilidade/prioridade de um membro do party ser atacado por inimigos. Quanto maior o aggro, maior a chance de ser alvo.

## Como Funciona

### Acumulacao de Aggro

O aggro e acumulativo durante a batalha e pode ser gerado por:

1. **Dano causado** - Aggro proporcional ao dano HP causado em inimigos
2. **Cura realizada** - Aggro proporcional ao HP recuperado em aliados
3. **Notetags em Skills/Items** - Valores fixos ao usar acao
4. **Notetags em Trait Objects** - Bonus/malus passivos
5. **Plugin Commands** - Alteracao direta via eventos

### Configuracao de Prioridade

O parametro **Priority: Highest TGR** define como inimigos escolhem alvos:

- **Weighted** (padrao): Inimigos escolhem alvo baseado no peso do aggro (probabilidade)
- **Highest**: Inimigos SEMPRE atacam o membro com maior aggro

### Aggro Gauge

O aggro gauge mostra o valor **relativo** do membro comparado ao resto do party:

- Gauge vazio = aquele membro tem o **menor** aggro do party (nao necessariamente zero)
- Gauge cheio = aquele membro tem o **maior** aggro do party
- Todos cheios = aggro igual entre todos os membros

**Importante**: O aggro NAO "reseta". Se parecer que voltou a zero, e porque aquele membro passou a ter o menor aggro relativo.

## Modificadores de Aggro

### Aggro Passivo (Trait Objects)
Notetags em Actor, Class, Weapon, Armor, Enemy, State:
```
<Aggro: +x>    // Aumenta aggro passivo
<Aggro: -x>    // Reduz aggro passivo
```

### Multiplicador de Aggro
```
<Aggro Multiplier: x%>    // Multiplica o aggro percebido
```
- Multiplos multiplicadores sao **multiplicativos**
- Exemplo: 150% + 150% = 225% (nao 300%)

### Aggro via Skills/Items
```
<User Aggro: +x>     // Aumenta aggro do usuario ao usar
<Target Aggro: +x>   // Aumenta aggro do alvo ao atingir
```

**Diferenca importante**:
- `<User Aggro>`: aplica **1 vez por uso**, independente de quantos hits
- `<Target Aggro>`: aplica **por hit**, multiplos hits = multiplos aumentos

### JavaScript Notetags
Para logica dinamica:
```
<JS User Aggro>
 value = user.hp * 0.5;
</JS User Aggro>
```

## Bypass e Forcar Alvo

| Notetag | Efeito |
|---------|--------|
| `<Bypass Highest Aggro>` | Ignora a regra de "sempre alvo mais alto", usa peso |
| `<Target Highest Aggro>` | Forca SEMPRE focar o alvo com maior aggro |

- `<Bypass Highest Aggro>` tem prioridade sobre `<Target Highest Aggro>`
- Funciona em Actor, Class, Skill, Item, Weapon, Armor, Enemy, State

## Visualizacao

### Aggro Gauge no Battler Sprite
- Exibido sobre o sprite SV do actor
- Configuravel: cores, largura, posicao, escala

### Aggro Gauge no Battle Status Window
- Exibido na janela de status de batalha
- Configuravel: cores, posicao, offset

## Plugin Commands para Aggro

- **Actor: Change Aggro** - Altera aggro de um actor por quantidade
- **Actor: Set Aggro** - Define aggro de um actor para valor exato
- **Enemy: Change Aggro** - Altera aggro de um inimigo por quantidade
- **Enemy: Set Aggro** - Define aggro de um inimigo para valor exato

Veja [Comandos Atores](../comandos/atores.md) e [Comandos Inimigos](../comandos/inimigos.md).

## Configuracao

Ajustado em **Plugin Parameters > Aggro Settings**:
- Priority: Highest TGR
- Aggro Per Damage / Heal
- Gauge visual settings

Veja [Parametros Aggro](../parametros/aggro-settings.md) para todos os parametros.
