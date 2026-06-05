# Prioridades

## Hierarquia de Targeting

O Aggro Control System segue uma hierarquia estrita de prioridade para determinar alvos:

```
1. Provoke  (maior prioridade)
2. Taunt
3. Aggro    (menor prioridade)
```

## Como Funciona na Pratica

### Cenario 1: Provoke Ativo
```
Inimigo tem Provoke de Actor A
Actor B tem Taunt ativo
Actor C tem Aggro 999

Resultado: Inimigo ataca Actor A (provocador)
```
Provoke SEMPRE ganha. Taunt e Aggro sao ignorados.

### Cenario 2: Sem Provoke, com Taunt
```
Nenhum Provoke ativo
Actor A tem Physical Taunt
Actor B tem Aggro 999
Actor C tem Aggro 10

Resultado: Se acao for fisica, ataca Actor A (taunter)
           Se acao nao for fisica, usa Aggro (Actor B provavelmente)
```
Taunt filtra por tipo de acao. Aggro so e considerado para tipos sem taunt.

### Cenario 3: Apenas Aggro
```
Nenhum Provoke ativo
Nenhum Taunt ativo
Actor A tem Aggro 500
Actor B tem Aggro 100
Actor C tem Aggro 50

Resultado:
  - Weighted: Probabilidade proporcional (A tem mais chance)
  - Highest: Sempre Actor A
```

## Interacao entre Mecanicas

### Multiplos Provokes
- **Vence** o state com maior prioridade no database
- Se prioridades iguais, o mais recente

### Multiplos Taunters
- Time oposto pode escolher entre qualquer taunter
- Todos sao alvos validos

### Bypass
- `<Bypass Provoke>` remove a unidade da cadeia de provoke
- `<Bypass Taunt>` remove a unidade da cadeia de taunt
- `<Bypass Highest Aggro>` muda de "sempre maior" para "weighted"
- Bypasss sao verificados em cada nivel da hierarquia

## Fluxo de Decisao (AI Inimiga)

```
1. Verificar se ha provoke ativo no inimigo
   ├── Sim -> Bypass Provoke existe?
   │   ├── Sim -> Ir para passo 2
   │   └── Nao -> Atacar provocador. FIM.
   └── Nao -> Ir para passo 2

2. Verificar se ha taunters no time oposto para o tipo de acao
   ├── Sim -> Bypass Taunt existe?
   │   ├── Sim -> Ir para passo 3
   │   └── Nao -> Selecionar entre taunters. FIM.
   └── Nao -> Ir para passo 3

3. Usar Aggro para determinar alvo
   ├── Target Highest Aggro ativo?
   │   ├── Sim -> Bypass Highest Aggro existe?
   │   │   ├── Sim -> Usar weighted. FIM.
   │   │   └── Nao -> Atacar maior aggro. FIM.
   │   └── Nao -> Usar weighted (padrao). FIM.
```

## Implicacoes para Design de Combate

1. **Provoke e o controle mais forte** - Use para mecanicas de boss que DEVEM focar o tanque
2. **Taunt e seletivo por tipo** - Permite tanques parciais (ex: tanque magico apenas)
3. **Aggro e o mais flexivel** - Permite dinamica natural com DPS/healers competindo por ameaca
4. **Bypasss permitem quebrar regras** - Skills especiais que ignoram provoke/taunt adicionam profundidade
