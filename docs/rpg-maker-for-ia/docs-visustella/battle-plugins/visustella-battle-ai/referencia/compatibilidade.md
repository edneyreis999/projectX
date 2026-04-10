# Compatibilidade - Battle A.I.

## Requisitos de Sistema

### Engine

- **RPG Maker MZ**: Obrigatório
- **Outras Versões**: Este plugin **NÃO** funciona em outras iterações do RPG Maker (XP, VX, VX Ace, MV)

---

### Requisitos de Plugin

#### VisuMZ_1_BattleCore (Obrigatório)

Este plugin **requer** o plugin VisuMZ_1_BattleCore instalado no Plugin Manager do seu jogo para funcionar.

**O que acontece sem Battle Core**:
- Você não pode iniciar o jogo com este plugin habilitado
- Erro de plugin ausente será exibido

**Instalação Correta**:
1. Baixe VisuMZ_1_BattleCore de VisuStella.com
2. Instale no Plugin Manager **antes** de Battle A.I.
3. Certifique-se que ambos estão habilitados

---

## Tier System

### Tier 3

Este plugin é um **Tier 3** plugin.

**O que isso significa**:
- Deve ser colocado **abaixo** de plugins de menor valor tier
- Ordem recomendada: 0, 1, 2, **3**, 4, 5
- Isso garante melhor compatibilidade com a biblioteca VisuStella MZ

**Plugin Manager Order**:
```
├─ VisuMZ_0_CoreEngine (Tier 0)
├─ VisuMZ_1_BattleCore (Tier 1)
├─ [Outros plugins Tier 0-2]
├─ VisuMZ_0_BattleAICore (Tier 3) ← Este plugin
├─ [Outros plugins Tier 3+]
```

**Por que isso importa**:
- Plugins de menor tier frequentemente carregam primeiro
- Ordem incorreta pode causar conflitos
- Plugins dependentes podem não funcionar

---

## Compatibilidade com Battle Systems

### Battle Systems Oficiais VisuStella

Este plugin é compatível com os seguintes battle systems:

- **STB** (Standard Turn Battle)
- **ATB** (Active Time Battle)
- **BTB** (Brave Turn Battle)
- **FTB** (Force Turn Battle)
- **ETB** (Event Turn Battle)
- **PTB** (Press Turn Battle)

**Nota**: Alguns battle systems podem ter interações específicas:
- **ATB/BTB**: On-The-Spot A.I. pode ter problemas
- **FTB/ETB/PTB**: Compatibilidade adicionada em versões mais recentes

---

## Compatibilidade com Outros Plugins VisuStella

### VisuMZ_0_CoreEngine

**Recomendado para**:
- Usar `Level` em condições de A.I. para inimigos
- Funcionalidades estendidas de parâmetros

**Compatibilidade**: Total

---

### VisuMZ_1_SkillsStatesCore

**Requerido para**:
- Condições `Highest Positive State Count`
- Condições `Highest Negative State Count`
- Condições `Lowest Positive State Count`
- Condições `Lowest Negative State Count`

**Compatibilidade**: Total

**Nota**: Sem este plugin, condições de State Count não funcionam.

---

### VisuMZ_1_SkillCooldowns

**Compatibilidade**: Melhorada na versão 1.27

**Nota**: Compatibilidade adicionada com `<Once Per Turn>` notetag.

---

### Battle Grid System

**Compatibilidade**: Melhorada na versão 1.28

**Nota**: Compatibilidade adicionada com escopos (scopes) do Battle Grid System.

---

## Compatibilidade com Plugins de Terceiros

### Yanfly Engine Plugins (MV)

⚠️ **Não Compatível**

- Este é um plugin para RPG Maker **MZ**
- Plugins MV não funcionam em MZ
- Use equivalentes VisuStella MZ

---

### Plugins MV Converteridos

⚠️ **Use com Cautela**

- Plugins MV convertidos podem ter problemas
- VisuStella MZ não garante compatibilidade
- Teste extensivamente

---

## Problemas Conhecidos de Compatibilidade

### On-The-Spot A.I. e Battle Systems

**Problema**: On-The-Spot A.I. pode causar problemas com battle systems baseados em velocidade.

**Battle Systems Afetados**:
- ATB (Active Time Battle)
- BTB (Brave Turn Battle)
- Outros sistemas baseados em speed/action speed

**Sintomas**:
- Ações mudam inesperadamente
- Speed abuse acontece
- Turnos não funcionam corretamente

**Solução**: Desabilitar On-The-Spot A.I. se você usa esses battle systems.

---

### Auto Skill Triggers

**Problema**: Infinite loop possíveis com Auto Skill Triggers.

**Correção**: Atualizado para melhor compatibilidade na versão 1.23.

**Solução**: Certifique-se de estar usando versão 1.23 ou superior.

---

### Action Patterns com turnCount()

**Problema**: `$gameTroop.turnCount()` não funciona em A.I. conditions.

**Causa**: Ações são determinadas antes do turn count aumentar.

**Solução**:
1. Use o editor de ações do RPG Maker para condições de turno
2. Ou habilite On-The-Spot A.I. (experimental)

---

## Performance

### Impacto na Performance

**Uso de CPU**: Moderado

**Fatores que Afetam Performance**:
- Número de inimigos com A.I. ativa
- Complexidade das condições
- Sistema de Knowledge (Learn Knowledge habilitado)
- On-The-Spot A.I. (aumenta uso de CPU)

**Otimização**:
- Use condições simples quando possível
- Evite muitas condições por skill
- Considere desabilitar Learn Knowledge para melhor performance

---

## Bugs e Limitações Conhecidas

### turnCount() em A.I. Conditions

**Limitação**: `$gameTroop.turnCount()` não funciona em A.I. conditions.

**Workaround**: Use On-The-Spot A.I. (experimental)

**Status**: Por design, não será "corrigido"

---

### Charme e Confusão

**Bug Corrigido**: Battlers encantados não desaparecem mais ao atacar uns aos outros (versão 1.02).

---

### Skills com <Target: x Random Any>

**Bug Corrigido**: Inimigos agora podem usar skills com `<Target: x Random Any>` (versão 1.21).

---

## Atualizações Recentes

### Versão 1.29 (Março 20, 2025)

**Bug Fixes!**
- Fixed a problem with TPB actions causing conflicts in AI registration of certain abilities

### Versão 1.28 (Janeiro 16, 2025)

**Compatibility Update!**
- Added better compatibility with Battle Grid System regarding scopes

### Versão 1.27 (Novembro 14, 2024)

**Compatibility Update!**
- Added better compatibility with Skill Cooldowns' `<Once Per Turn>` notetag

---

## Verificar Compatibilidade

### Checklist de Instalação

Antes de usar este plugin, verifique:

- [ ] Usando RPG Maker MZ (não MV ou anterior)
- [ ] VisuMZ_1_BattleCore instalado
- [ ] Battle A.I. colocado **abaixo** de Battle Core no Plugin Manager
- [ ] Plugins Tier 0, 1, 2 colocados acima
- [ ] Testado com battle system desejado
- [ ] Versão do plugin é recente (1.20+)

---

### Teste de Compatibilidade

Para testar compatibilidade:

1. **Crie um novo projeto de teste**
2. **Instale apenas plugins essenciais**
3. **Adicione Battle A.I.**
4. **Teste funcionalidades básicas**
5. **Adicione outros plugins um por vez**
6. **Teste após cada adição**

---

## Obter Suporte

### Suporte Oficial

- **Website**: VisuStella.com
- **Documentação**: Help files oficiais
- **Atualizações**: Downloads oficiais

### Relatar Bugs

Se você encontrar um bug:

1. **Verifique se está usando a versão mais recente**
2. **Consulte o [Troubleshooting](troubleshooting.md)**
3. **Verifique o [Changelog](changelog.md)** para correções recentes
4. **Relate em VisuStella.com** com detalhes:
   - Versão do plugin
   - Versão do RPG Maker MZ
   - Plugins instalados
   - Passos para reproduzir
   - Screenshot/Error message

---

## Veja Também

- **[Troubleshooting](troubleshooting.md)** - Problemas comuns e soluções
- **[Changelog](changelog.md)** - Histórico de versões
- **[Termos de Uso](termos-uso.md)** - Licença e permissões
