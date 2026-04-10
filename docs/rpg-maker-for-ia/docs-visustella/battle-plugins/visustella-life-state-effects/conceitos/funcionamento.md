# Como Funcionam os Efeitos

## Auto Life

### Mecânica
Quando um battler morre enquanto possui um estado com `<Auto Life: x%>`:
1. O estado se remove automaticamente
2. Todos os outros estados com Auto Life também são removidos
3. O battler recupera x% do seu HP máximo
4. O battler retorna ao combate

### Casos de Uso
- Revive automático em batalhas difíceis
- Segurança contra mortes acidentais
- Mecânica de "segunda chance"

### Limitações
- Apenas um Auto Life pode ser ativado por vez
- Porcentagem é baseada no HP máximo
- Não previne morte, apenas reage a ela

## Curse

### Mecânica
Os efeitos de Curse funcionam bloqueando recuperação:
- **Curse HP**: Bloqueia qualquer recuperação de HP
- **Curse MP**: Bloqueia qualquer recuperação de MP
- **Curse TP**: Bloqueia qualquer recuperação de TP

### Interações
- Cura visual pode aparecer mas não recupera
- Funciona com itens, magias e regeneração
- Pode ser combinado (ex: Curse HP + Curse MP)

### Estratégia
- Deve ser usado com dano contínuo
- Efetivo contra inimigos com autocura
- Cria urgência no jogador

## Doom

### Mecânica
Quando um estado com `<Doom>` expira naturalmente:
1. O estado chega ao fim (timer esgota)
2. O battler recebe dano fatal
3. O battler morre

### Importante
- Apenas funciona quando expira **naturalmente**
- Remover o estado manualmente previne a morte
- Pode ser usado como countdown

### Casos de Uso
- Spells de "morte em 3 turnos"
- Urgência tática
- Mecânica de risco/recompensa

## Fragile

### Mecânica
Quando um battler com `<Fragile>` recebe dano direto de HP:
1. Qualquer quantidade de dano aciona o efeito
2. O battler morre instantaneamente
3. Não depende da quantidade de dano

### O que é "Dano Direto"
- Ataques físicos e mágicos
- Skills e items que causam dano
- **Não** inclui dano de eventos ou regeneração

### Estratégia
- Alto risco: qualquer dano é fatal
- Use com ataques que não causam dano direto
- Combina com ataques indiretos

## Guts

### Mecânica
Quando um battler com `<Guts>` receberia dano fatal:
1. O dano é reduzido para deixar exatamente 1 HP
2. O battler sobrevive com 1 HP
3. Se já tiver 1 HP, recebe dano normal

### Exceção Importante
Se o battler já estiver com 1 HP e receber dano:
- O efeito não ativa
- O battler morre normalmente

### Casos de Uso
- "Último golpe" sobrevivente
- Boss phases com múltiplas chances
- Mecânica anime-style de "não desisto"

## Undead

### Mecânica Complexa
O efeito Undead inverte várias interações:

#### Cura → Dano
- Magias de cura causam dano
- Itens de cura causam dano
- Regeneração causa dano

#### Morte → Cura
- Morte instantânea cura completamente
- Skills de "instant death" viram heal

#### Drain Invertido
- Efeitos de drenagem funcionam ao contrário
- O alvo drena HP do atacante

#### Exceção: Elementos
- Se o battler absorve um elemento
- Ataques desse elemento curam normalmente
- Permite "zombies que absorvem escuridão"

### Allow Undead Regen
Override específico para Undead:
- Permite que regeneração cure em vez de causar dano
- Aplicado via trait object adicional

## Death Transformations

### Mecânica
Quando um inimigo com `<Death Transform>` morre:
1. O inimigo atual é derrotado
2. Um novo inimigo aparece com HP/MP completos
3. O novo inimigo pode ter stats completamente diferentes

### Sistema de Peso
Ao definir múltiplas transformações:
```xml
<Death Transform>
Slime: 75    # 75% de chance
Goblin: 25   # 25% de chance
</Death Transform>
```

- Pesos maiores = mais frequente
- Sem peso especificado = peso igual
- Ordem não afeta a probabilidade

### Animações
- `Transform Animation: x` joga animação ID x
- Aplicado no ALVO da transformação
- Requer Core Engine

### Casos de Uso
- Bosses com múltiplas formas
- Inimigos que se dividem
- Surpresas táticas

## Interções Entre Efeitos

### Auto Life + Doom
- Doom mata → Auto Life revive
- Estados ambos removidos
- Battler retorna com 1 HP se não tiver mais Auto Life

### Undead + Curse
- Curse impede "cura" que viraria dano
- Combo pode anular Undead parcialmente

### Guts + Fragile
- Fragile ignora Guts (morte instantânea)
- Ordem de traits determina resultado

### Extinct + Auto Life
- Extinct suprime Auto Life
- Battler permanece morto
- Não afeta Death Transformations

## Próximos Passos

- Consulte [Notetags State-Only](../notetags/state-only.md) para implementação
- Veja [Notetags Trait-Objects](../notetags/trait-objects.md) para traits
- Configure [Parâmetros](../parametros/configuracoes.md) para feedback visual
