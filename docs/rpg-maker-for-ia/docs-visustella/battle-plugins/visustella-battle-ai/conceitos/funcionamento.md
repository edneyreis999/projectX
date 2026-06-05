# Funcionamento da Battle A.I.

## Visão Geral

A Battle A.I. do VisuStella opera através de um processo complexo de tomada de decisão que considera múltiplos fatores: A.I. Style, A.I. Levels, Rating Variance, A.I. Conditions e TGR Weight. Este documento explica como a IA determina ações e seleciona alvos.

## Processo de Determinação de Ações

### Fluxo de Decisão

O processo de decisão da IA varia conforme o A.I. Style selecionado:

```
┌─────────────────────────────────────────────────────────────────┐
│                    INÍCIO DO TURNO                              │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────┐
        │ Verificar Action Pattern │
        │ (Condições do Editor)    │
        └────────────┬─────────────┘
                     │
            NÃO CUMPRIDO ✗          CUMPRIDO ✓
                     │                   │
                     ▼                   ▼
            ┌─────────────┐    ┌─────────────────────┐
            │ Descartar    │    │ Verificar Usabilidade │
            │ Action       │    │ (Custo, Enable, etc.)  │
            └─────────────┘    └──────────┬──────────┘
                                       │
                              NÃO USÁVEL ✗    USÁVEL ✓
                                       │            │
                                       ▼            ▼
                              ┌─────────────┐  ┌─────────────────┐
                              │ Descartar   │  │ Verificar A.I.   │
                              │ Action      │  │ Conditions       │
                              └─────────────┘  │ (se aplicável)    │
                                               └────────┬─────────┘
                                                        │
                                         NÃO CUMPRIDO ✗    CUMPRIDO ✓
                                                        │            │
                                                        ▼            ▼
                                               ┌─────────────┐  ┌────────────────┐
                                               │ Descartar   │  │ Aplicar Priori- │
                                               │ Action      │  │ dade/Randomiza │
                                               └─────────────┘  │ por A.I. Style │
                                                                └────────┬───────┘
                                                                         │
                                                                         ▼
                                                                ┌────────────────┐
                                                                │ Selecionar Action│
                                                                └────────────────┘
```

### Fatores Considerados

1. **Action Pattern Conditions**: Condições definidas no editor de inimigos
2. **Usabilidade**: Custo de MP/TP, skill habilitada, etc.
3. **A.I. Conditions**: Condições customizadas via notetags
4. **A.I. Style**: Determina como priorizar ações
5. **A.I. Level**: Pode fazer ignorar condições (nível baixo)
6. **Rating Variance**: Variação nas prioridades (Classic Style)

## Sistema de Seleção de Alvos

### TGR (Target Rate) Weight

O TGR é um parâmetro especial do RPG Maker MZ que representa "Target Rate". Quanto maior o TGR, mais provável que a unidade seja escolhida como alvo.

#### Fatores que Influenciam TGR

**1. Elemental Rate Influence**

- Se um alvo recebe mais dano de um ataque elemental, o peso TGR aumenta para aquele skill
- Quanto maior o dano elemental recebido, mais o peso TGR aumenta
- Requer que a tropa inimiga tenha "conhecimento" sobre fraquezas elementais

**2. Evasion (EVA) Influence**

- Taxas de esquiva física reduzem o peso TGR
- Quanto maior a esquiva do alvo potencial, menor o peso TGR
- Aplicável para skills físicas

**3. Magic Evasion (MEV) Influence**

- Taxas de esquiva mágica reduzem o peso TGR
- Quanto maior a esquiva mágica do alvo potencial, menor o peso TGR
- Aplicável para skills mágicas

**4. PDR/MDR Influence**

- PDR (Physical Damage Rate) e MDR (Magical Damage Rate)
- Funciona de forma similar aos influenciadores elementais

### Sistema de Knowledge

Por padrão, as configurações de Plugin Parameter fazem com que a influência de peso TGR exija que a tropa inimiga tenha "conhecimento" sobre:

- **Element Rates**: A tropa deve acertar atores com ataques elementais para aprender
- **Evasion**: A tropa deve usar ataques físicos para aprender a esquiva
- **Magic Evasion**: A tropa deve usar ataques mágicos para aprender a esquiva mágica

Isso significa que inimigos podem "aprender" as fraquezas e resistências do grupo ao longo da batalha.

### Bypass de TGR Influence

Você pode fazer com que a IA ignore influências de TGR através de notetags:

- `<Bypass AI Element Rate Influence>` - Ignora influência elementar
- `<Bypass AI EVA Influence>` - Ignora influência de esquiva física
- `<Bypass AI MEV Influence>` - Ignora influência de esquiva mágica
- `<Bypass AI PDR Influence>` - Ignora influência de PDR
- `<Bypass AI MDR Influence>` - Ignora influência de MDR

### Seleção Específica de Alvos

Além do sistema de TGR, você pode usar notetags para seleção específica:

```html
<AI Target: Highest HP>     <!-- Alvo com maior HP atual -->
<AI Target: Lowest HP%>     <!-- Alvo com menor % de HP -->
<AI Target: First>          <!-- Primeiro candidato válido -->
<AI Target: Last>           <!-- Último candidato válido -->
```

Estes notetags fazem a IA ignorar influências de TGR em favor de um alvo específico.

## A.I. Levels

A.I. Levels controlam o quão estrita a IA é em relação às condições:

- **Nível 100**: A IA nunca desobedece uma condição
- **Níveis 50-99**: A IA é geralmente estrita, mas pode ocasionalmente ignorar
- **Níveis 1-49**: A IA é mais flexível e frequentemente ignora condições
- **Nível 0**: A IA praticamente ignora todas as condições

### Efeito por A.I. Style

- **Classic/Gambit**: A.I. Level afeta se conditions são ignoradas
- **Casual/Random**: A.I. Level não tem efeito

## Auto Battle A.I. para Actors

Atores com Auto Battle podem usar padrões de IA de inimigos:

### Configuração de Referência

Use `<Reference AI: Enemy id>` na classe do ator para referenciar um inimigo específico.

### Restrições para Atores

Ao usar A.I. de inimigos, atores só podem usar skills que:
- ✅ Tenham aprendido
- ✅ Tenham acesso ao tipo de skill
- ✅ Tenham recursos para pagar (MP/TP)

### Sem Referência

Se um ator não tiver referência de IA, ele usará as avaliações padrão de Auto Battle do RPG Maker.

## On-The-Spot A.I. (Experimental)

Feature experimental que faz inimigos/atores determinarem ações no momento em que é seu turno, em vez de pré-determinar.

### ⚠️ Avisos Importantes

- **Pode causar problemas** com battle systems baseados em velocidade
- **Action Speed pode ser abusada**: A IA pode escolher uma ação rápida fraca e depois trocar por uma lenta forte
- **Não é bem testada**: Use por sua conta e risco
- **Incompatível com certos battle systems**

### Ativar

Habilite em: **Plugin Parameters > A.I. General Settings > Experimental > On-The-Spot A.I.**

### Benefício

Permite usar `$gameTroop.turnCount()` em condições JavaScript, o que normalmente não funciona.

## Limitações Conhecidas

### $gameTroop.turnCount()

⚠️ **Battle A.I. conditions NÃO suportam** `$gameTroop.turnCount()` ou `user.turnCount()` ou `target.turnCount()`.

**Solução**: Use o editor de ações do RPG Maker para criar condições de turno.

**Workaround**: Habilite "On-The-Spot A.I." (experimental) para usar turnCount em JavaScript.

## Veja Também

- **[A.I. Styles](ai-styles.md)** - Como cada estilo afeta a determinação de ações
- **[Notetags de Condições](../notetags/condicoes-skills.md)** - Como criar condições complexas
- **[Notetags de TGR Weight](../notetags/tgr-weight.md)** - Como configurar influência de peso
- **[Troubleshooting](../referencia/troubleshooting.md)** - Problemas comuns e soluções
