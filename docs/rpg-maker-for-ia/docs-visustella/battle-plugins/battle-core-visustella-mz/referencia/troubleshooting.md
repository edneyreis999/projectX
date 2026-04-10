# Troubleshooting - Battle Core

## Problemas Comuns e Soluções

### Action Sequences

#### Action Sequence não executa
**Sintomas**: Action Sequence configurada mas não roda

**Possíveis Causas**:
- Plugin desativado
- Erro de sintaxe na Action Sequence
- Conflict com outro plugin

**Soluções**:
1. Verifique se Battle Core está **ativado**
2. Verifique sintaxe da Action Sequence
3. Desative outros plugins temporariamente para testar
4. Verifique console (F8) por erros JavaScript

#### Action Sequence interrompida
**Sintomas**: Action Sequence para no meio da execução

**Possíveis Causas**:
- Missing assets (imagens, animações)
- Target inválido
- Erro em um dos comandos

**Soluções**:
1. Verifique se todos os assets existem
2. Verifique se targets são válidos
3. Teste a Action Sequence em partes isoladas

### Damage Issues

#### Dano não é aplicado
**Sintomas**: Action executa mas não causa dano

**Possíveis Causas**:
- Damage formula incorreta
- Target inválido
- Skill/item sem dano configurado

**Soluções**:
1. Verifique a damage formula
2. Verifique se o target é válido
3. Verifique se a skill/item tem damage type configurado

#### Damage muito baixo/alto
**Sintomas**: Dano fora do esperado

**Possíveis Causas**:
- Stats desbalanceadas
- Damage Style incorreto
- Multiplier errado

**Soluções**:
1. Verifique stats do attacker e defender
2. Verifique Damage Style configurado
3. Ajuste multiplier/power constant

### Visual Issues

#### Sprites não aparecem
**Sintomas**: Battlers invisíveis

**Possíveis Causas**:
- Missing sprites
- Opacity setada para 0
- Sprite hidden

**Soluções**:
1. Verifique se os arquivos de sprite existem
2. Verifique comandos de opacity
3. Verifique comandos de visibility

#### Animações não tocam
**Sintomas**: Animações não reproduzem

**Possíveis Causas**:
- Database animations não configuradas
- Comando de animação faltando
- Timing incorreto

**Soluções**:
1. Verifique animações no database
2. Adicione comandos ANIMATION na Action Sequence
3. Ajuste timing (WAIT)

#### HP Gauges não mostram
**Sintomas**: HP Gauges invisíveis

**Possíveis Causas**:
- Desabilitado nos plugin parameters
- Opções do jogador
- Notetag `<Hide HP Gauge>`

**Soluções**:
1. Verifique Plugin Parameters > HP Gauge Settings
2. Verifique opções do jogador (Options)
3. Verifique notetags no enemy

### Performance Issues

#### Batalha lenta
**Sintomas**: FPS baixo durante batalha

**Possíveis Causas**:
- Muitos Action Sequences complexas
- Muitos battlers
- Muitos efeitos visuais

**Soluções**:
1. Simplifique Action Sequences
2. Reduza número de battlers em troops
3. Otimize efeitos visuais

#### Lag em attacks específicos
**Sintomas**: Lag ao usar certas skills

**Possíveis Causas**:
- Action Sequence muito complexa
- Muitas animações simultâneas
- Memory leak

**Soluções**:
1. Simplifique a Action Sequence
2. Reduza animações simultâneas
3. Limpa cache se necessário

### Plugin Conflicts

#### Funciona sem Battle Core, quebra com ele
**Sintomas**: Plugin X funciona isolado, quebra quando Battle Core está presente

**Soluções**:
1. Verifique se o plugin é compatível com Battle Core
2. Ajuste ordem dos plugins (Battle Core depois de CoreEngine)
3. Contate autor do plugin X para compatibility patch

#### Boost effects não aplicam
**Sintomas**: Boosts (de plugins Boost) não funcionam

**Causa**: Boost effects não ocorrem para Action Sequences exceto "MECH: Action Effect"

**Solução**:
Use "MECH: Boost Store Data" e processe via Common Events

### Auto Battle Issues

#### Auto Battle não funciona
**Sintomas**: Battlers não agem automaticamente

**Possíveis Causas**:
- Auto Battle desabilitado
- Command não adicionado à window
- AI problemática

**Soluções**:
1. Verifique Plugin Parameters > Auto Battle Settings
2. Verifique se Auto Battle command está na command list
3. Verifique configuração de AI

## Debug Tips

### Console (F8)
Sempre verifique o console (F8 durante playtest) por erros JavaScript. Erros no console frequentemente indicam:
- Sintaxe incorreta em notetags
- Missing assets
- Plugin conflicts

### Isolamento de Problemas
Para isolar problemas:
1. Crie um **novo projeto limpo**
2. Instale apenas Battle Core
3. Teste o problema
4. Se resolvido, adicione plugins um por um
5. Identifique qual plugin causa o conflict

### Backup Sempre
**Sempre** faça backup antes de:
- Atualizar plugins
- Fazer mudanças grandes
- Testar novos systems

## Quando Pedir Ajuda

Se o problema persistir:

1. **Verifique a documentação**:
   - [Compatibilidade](./compatibilidade.md)
   - [Parâmetros](../parametros/)
   - [Notetags](../notetags/)

2. **Busque no fórum VisuStella**

3. **Forneça informações**:
   - Versão do plugin
   - Lista de plugins em uso
   - Passos para reproduzir
   - Screenshots se aplicável
   - Erros do console

## Ver Também

- [Referência: Compatibilidade](./compatibilidade.md) - Plugins incompatíveis
- [Conceitos: Major Changes](../conceitos/major-changes.md) - Mudanças que podem afetar seu projeto
