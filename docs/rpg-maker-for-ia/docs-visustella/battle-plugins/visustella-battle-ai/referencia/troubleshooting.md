# Troubleshooting - Battle A.I.

## Problemas Comuns e Soluções

### $gameTroop.turnCount() Não Funciona

#### Problema

Battle A.I. conditions **NÃO suportam** `$gameTroop.turnCount()`, `user.turnCount()` ou `target.turnCount()` para A.I. Conditions.

#### Sintoma

Você criou uma condição com `turnCount()` mas a IA nunca a cumpre, ou o jogo falha.

#### Causa

A razão é porque ações são determinadas **antes** do turn count aumentar. É assim que o RPG Maker MZ lida com isso por padrão.

O código do RPG Maker MZ:

```javascript
Game_Battler.prototype.turnCount = function() {
    if (BattleManager.isTpb()) {
        return this._tpbTurnCount;
    } else {
        return $gameTroop.turnCount() + 1;  // Sempre +1
    }
};
```

Isso significa que o turn count sempre estará 1 turno acima. Ao determinar a ação inicialmente, a combinação parecerá correta. Porém, quando o turno realmente começar e chegar ao turno do inimigo/ator, a verificação de turn count será diferente e retornará informação incorreta.

#### Solução 1: Use o Editor de Ações (Recomendado)

Use o editor de ações do RPG Maker (aba Enemy > Action Patterns) para aplicar uma condição de Turn em vez de usar condições de A.I.

#### Solução 2: Feature Experimental On-The-Spot A.I.

⚠️ **AVISO**: Esta é uma feature **experimental** e pode causar problemas.

Habilite em: **Plugin Parameters > A.I. General Settings > Experimental > On-The-Spot A.I.**

E defina como `true` (sem as aspas).

Isso:
- Forçosamente remove o +1 do count
- Força inimigos a reavaliar ações no início de seus turnos
- Vem com efeitos colaterais que podem dar vantagens/desvantagens à IA

**Efeitos Colaterais**:
- Action Speed pode ser abusada
- A.I. pode escolher uma ação rápida fraca e depois trocar por uma lenta forte
- Não há correção própria devido a como on-the-spot A.I. funciona
- É mal adaptado para battle systems relativos à velocidade

**Se você habilitar este Plugin Parameter**, então usar o código JavaScript turnCount deve funcionar novamente devido à normalização de como a propriedade turn é calculada.

---

### Auto Battle Actor Não Usa Skills

#### Problema

Atores com Auto Battle não usam certas skills que você espera que eles usem.

#### Possíveis Causas

**1. Skill Não Aprendida**

Atores só podem usar skills que aprenderam.

❌ **Errado**: Esperar que ator use skill nível 50 quando está nível 10
✅ **Certo**: Verificar se ator aprendeu a skill

**2. Tipo de Skill Não Disponível**

Atores precisam ter acesso ao tipo de skill.

❌ **Errado**: Skill em tipo "Black Magic" mas classe não pode usar
✅ **Certo**: Verificar se classe tem acesso ao tipo de skill

**3. Recursos Insuficientes**

Atores precisam ter MP/TP suficiente.

❌ **Errado**: Skill custa 50 MP mas ator tem 10 MP
✅ **Certo**: Verificar se ator tem recursos para pagar

**4. Condições Não Cumpridas**

Se usando referência de IA, condições podem não ser cumpridas.

❌ **Errado**: Condição "Target HP% < 0.30" mas todos aliados com HP > 30%
✅ **Certo**: Ajustar condições ou verificar HP dos aliados

#### Como Diagnosticar

1. **Desligue Auto Battle** temporariamente
2. **Verifique se o ator pode usar a skill normalmente**
3. **Se não conseguir**, o problema não é da IA:
   - Verifique se a skill foi aprendida
   - Verifique se o tipo de skill está disponível
   - Verifique se há MP/TP suficiente
4. **Se conseguir**, o problema é da IA:
   - Verifique as condições da skill
   - Verifique o A.I. Level (pode estar ignorando condições)
   - Verifique o A.I. Style (pode estar priorizando outras skills)

---

### Inimigo Nunca Usa Certa Skill

#### Problema

Inimigo nunca usa uma skill específica, mesmo que pareça apropriada.

#### Possíveis Causas

**1. Rating Muito Baixo**

No estilo Classic, skills com rating baixo raramente são usadas.

❌ **Errado**: Rating 1 em meio a skills rating 5-9
✅ **Certo**: Aumentar rating ou reduzir variância

**2. Condições Muito Restritivas**

Conditions podem ser muito difíceis de cumprir.

❌ **Errado**: `<All AI Conditions>` com 10+ condições
✅ **Certo**: Reduzir condições ou usar `<Any AI Conditions>`

**3. A.I. Level Muito Alto**

Com A.I. Level 100, inimigos podem esperar demais pelas condições perfeitas.

❌ **Errado**: A.I. Level 100 com condições complexas
✅ **Certo**: Reduzir A.I. Level ou simplificar condições

**4. Gambit Style com Ordem Errada**

No estilo Gambit, skills no fundo da lista raramente são usadas.

❌ **Errado**: Skill importante no final da lista
✅ **Certo**: Mover skill para cima da lista

#### Como Diagnosticar

1. **Verifique o A.I. Style**
   - Classic: Verifique ratings
   - Gambit: Verifique ordem da lista
   - Casual/Random: Verifique condições

2. **Verifique as Condições**
   - Use `<All AI Conditions>` para requisitos obrigatórios
   - Use `<Any AI Conditions>` para situações ideais
   - Teste com condições simplificadas

3. **Verifique o A.I. Level**
   - Nível 100: Nunca desobedece (pode esperar demais)
   - Nível 50-75: Equilibrado
   - Nível 0-50: Pode ignorar condições

---

### Inimigo Sempre Usa a Mesma Skill

#### Problema

Inimigo sempre usa a mesma skill, ignorando outras opções.

#### Possíveis Causas

**1. Rating Muito Alto**

No estilo Classic, skill com rating muito alto sempre é prioridade.

❌ **Errado**: Uma skill rating 9, outras rating 1-3
✅ **Certo**: Ajustar ratings para mais variedade

**2. Rating Variance Zero**

Com variância zero, não há aleatoriedade.

❌ **Errado**: Rating Variance: 0
✅ **Certo**: Aumentar para 3-5

**3. Condições Muito Permissivas**

Conditions são cumpridas muito facilmente.

❌ **Errado**: `<All AI Conditions>` com `Always`
✅ **Certo**: Adicionar restrições

**4. Gambit Style com Skill no Topo**

No estilo Gambit, skills no topo sempre são prioridade.

❌ **Errado**: Skill forte no topo da lista
✅ **Certo**: Mover para baixo ou ajustar ordem

#### Soluções

1. **Ajustar Ratings**: Equilibrar ratings entre skills
2. **Aumentar Variance**: Permitir mais aleatoriedade
3. **Adicionar Condições**: Restringir quando a skill pode ser usada
4. **Mudar A.I. Style**: Considerar Casual ou Random para mais variedade

---

### Atores Auto Battle Não Seguem Referência

#### Problema

Atores com Auto Battle não estão seguindo o padrão do inimigo referenciado.

#### Possíveis Causas

**1. Notetag `<No Reference AI>` na Classe**

Se a classe tem este notetag, ela ignora a referência global.

**Solução**: Remover o notetag se você quer referência.

**2. Referência Global é 0**

Se `Actor => AI Reference` está 0, não há referência.

**Solução**: Defina para o ID do inimigo desejado.

**3. Notetag Individual na Classe**

Se a classe tem `<Reference AI: Enemy id>`, ele sobrescreve o global.

**Solução**: Ajustar ou remover o notetag.

---

### IA Não Considera Fraquezas Elementais

#### Problema

Inimigos não exploram fraquezas elementais dos atores.

#### Possíveis Causas

**1. Element Rate => TGR Desabilitado**

Se `Element Rate => TGR` está `false`, IA não considera elementos.

**Solução**: Habilite em Plugin Parameters > TGR Weight Settings.

**2. Influence Rate Muito Baixo**

Se `Influence Rate` é muito baixo (ex: 0.1), influência é mínima.

**Solução**: Aumentar para 1.0+.

**3. Learn Knowledge Desabilitado**

Se `Learn Knowledge` está `false`, mas você quer que inimigos aprendam, configure.

**Solução**: Habilitar em Plugin Parameters > A.I. General Settings > Knowledge.

**4. Bypass Individual**

Se inimigo tem `<Bypass AI Element Rate Influence>`, ignora elementos.

**Solução**: Remover o notetag.

---

### JavaScript Conditions Falham

#### Problema

Condições JavaScript não funcionam como esperado.

#### Causa Comum

JavaScript **não pode ser usado sem operadores de comparação** para reduzir erros.

❌ **Errado**:
```
$gameSwitches.value(42)
```

✅ **Certo**:
```
$gameSwitches.value(42) === true
```

#### Sintaxe Correta

Sempre use operadores de comparação:
- `===` (igual)
- `!==` (diferente)
- `>` (maior que)
- `<` (menor que)
- `>=` (maior ou igual)
- `<=` (menor ou igual)

---

### On-The-Spot A.I. Causa Problemas

#### Sintomas

- Ações mudam inesperadamente
- Speed abuse acontece
- Battle systems não funcionam corretamente

#### Solução

**Desabilitar On-The-Spot A.I.**:

Vá para: **Plugin Parameters > A.I. General Settings > Experimental > On-The-Spot A.I.**

Defina como `false` (sem as aspas).

#### Quando Usar On-The-Spot A.I.

Apenas use se:
- Você PRECISA usar `$gameTroop.turnCount()` em condições
- Você entende os riscos completamente
- Você testou extensivamente
- Seu projeto não é afetado por speed abuse

---

## Obter Ajuda

Se você encontrou um problema não listado aqui:

1. **Verifique a Documentação Original**
2. **Consulte o Changelog** para ver se o problema foi corrigido
3. **Visite VisuStella.com** para suporte oficial
4. **Verifique Compatibilidade** com outros plugins

---

## Veja Também

- **[Compatibilidade](compatibilidade.md)** - Requisitos e compatibilidade
- **[Changelog](changelog.md)** - Histórico de versões e correções
- **[Funcionamento da IA](../conceitos/funcionamento.md)** - Como a IA toma decisões
