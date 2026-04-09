# Mudanças no Core do RPG Maker MZ

> Alterações feitas pelo plugin nas funções nativas do RPG Maker MZ.

## Overview

O Enhanced TP System modifica (**overwrites**) várias funções do RPG Maker MZ para implementar os TP Modes. Estas mudanças são essenciais para entender o comportamento do sistema.

## Funções Modificadas

### 1. MaxTP Overwrite

**Antes:** Nenhuma forma de alterar MaxTP dinamicamente.

**Depois:**
- MaxTP é calculado baseado no TP Mode atual
- Permite fórmulas JavaScript customizadas
- MaxTP pode mudar se TP Mode mudar

**Implicação:** Não dependa de MaxTP sendo constante. Sempre cheque o TP Mode atual.

---

### 2. Preserve TP

**Antes:** Determinado pela presença do trait "Preserve TP".

**Depois:** Determinado pela propriedade "Preserve TP?" do TP Mode atual.

**Motivo:** Manter consistência com TP Modes e dar mais controle ao dev.

**Implicação:**
- Traits de Preserve TP são **ignorados** quando este plugin está ativo
- Configure preservação em cada TP Mode individualmente
- Um personagem pode preservar TP em um modo mas não em outro

---

### 3. Initial TP Gain (Início de Batalha)

**Antes:** Se "Preserve TP" estiver OFF, battlers recebiam quantidade aleatória de TP no início de batalha. Sem controle via editor.

**Depois:** Controle total via fórmula "Initial TP" do TP Mode. Independente de "Preserve TP".

**Fórmula:** Configurável em `TP Formulas > Generic > Initial TP`

**Implicação:** Você decide exatamente quanto TP cada modo começa, mesmo sem Preserve TP.

---

### 4. On Damage TP Gain

**Antes:** Ganho de TP ao receber/dar dano era hardcoded e aplicava a todos.

**Depois:** Removido ganho padrão. Controlado exclusivamente pelo TP Mode através de fórmulas:
- `Take HP Damage`
- `Deal HP Damage`
- `Ally HP Damage`

**Motivo:** Manter funcionalidade sob controle e evitar comportamentos inesperados.

**Implicação:** Se seu TP Mode não tem fórmulas de dano configuradas, **nenhum TP será ganho** ao receber/dar dano.

---

### 5. Sprite_Gauge Changes

**Alteração:** O sprite do gauge foi modificado para suportar gauge flash (pisca em cores diferentes).

**Implementação:**
- Gauges de TP agora têm layers separados
- Permite efeito de piscar sem afetar outros gauges

**Compatibilidade:** Deve ser compatível com a maioria dos plugins, exceto os que alteram completamente o gauge de TP.

---

## Impacto em Jogos Existentes

Se adicionando a um jogo em desenvolvimento:

1. **MaxTP:** Pode mudar se você estava usando MaxTP padrão (100)
2. **Preserve TP:** Traits de Preserve TP serão ignorados
3. **Initial TP:** Não mais aleatório se Preserve TP está off
4. **On Damage:** Precisa configurar fórmulas para ganho de TP via dano

## Ver Também

- [Visão Geral](visao-geral.md) - Contexto das mudanças
- [TP Modes](tp-modes.md) - Como configurar comportamento desejado
- [Fórmulas TP](../parametros/formulas-tp.md) - Todas as fórmulas disponíveis
