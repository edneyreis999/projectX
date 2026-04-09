# Troubleshooting

Problemas comuns e soluções ao usar o plugin VisuStella Active Turn Battle.

## Problemas Visuais

### Gauges Não Aparecem

**Sintoma**: Barras de ATB não são exibidas sobre battlers

**Possíveis causas**:
1. ⚠️ **Battle System incorreto**
   - **Solução**: Database > System 1 > Battle System
   - Selecionar: "Time Progress (Active)" ou "Time Progress (Wait)"

2. ⚠️ **Show Sprite Gauges desativado**
   - **Solução**: Plugin Parameters > General Gauge Settings
   - Ativar "Show Sprite Gauges" para Actors/Enemies

3. ⚠️ **Hide ATB Gauge notetag**
   - **Solução**: Remover `<Hide ATB Gauge>` de enemies

### Cores Não Mudam

**Sintoma**: Gauge sempre mesma cor, independente do estado

**Possíveis causas**:
1. ⚠️ **Slow Rate/Fast Rate não configurados**
   - **Solução**: Ajustar limiares em Plugin Parameters
   - Slow Rate: 0.8 (ou menor)
   - Fast Rate: 1.2 (ou maior)

2. ⚠️ **Cores não definidas**
   - **Solução**: Verificar Gauge Color Settings
   - Definir cores para cada estado (Default, Full, Cast, etc.)

### Field Gauge Não Aparece

**Sintoma**: Field Gauge não é exibido

**Possíveis causas**:
1. ⚠️ **Use Field Gauge? desativado**
   - **Solução**: Plugin Parameters > Field Gauge Settings
   - Ativar "Use Field Gauge?"

2. ⚠️ **Posição fora da tela**
   - **Solução**: Ajustar Offset X/Y
   - Verificar Display Position

## Problemas de Comportamento

### Battlers Nunca Agem

**Sintoma**: Barras nunca chegam a 100%

**Possíveis causas**:
1. ⚠️ **JS: Speed retornando 0 ou valor muito baixo**
   - **Solução**: Verificar Plugin Parameters > Mechanics Settings
   - JS: Speed deve retornar valor > 0
   - Padrão: `user.agi`

2. ⚠️ **JS: Acceleration muito baixa**
   - **Solução**: Aumentar valor de JS: Acceleration
   - Padrão: `1.0`

### Battlers Agem Muito Rápido

**Sintoma**: Turnos acontecem instantaneamente

**Possíveis causas**:
1. ⚠️ **JS: Speed muito alto**
   - **Solução**: Reduzir valor em JS: Speed
   - Exemplo: `user.agi * 0.5`

2. ⚠️ **JS: Acceleration muito alta**
   - **Solução**: Reduzir valor em JS: Acceleration
   - Exemplo: `0.5`

### Casting Não Funciona

**Sintoma**: Skills com speed negativo não criam casting

**Possíveis causas**:
1. ⚠️ **Skill não tem speed negativo**
   - **Solução**: Database > Skills/Items
   - Definir Speed como valor negativo (ex: -1000)

2. ⚠️ **JS: Cast Time não configurado**
   - **Solução**: Plugin Parameters > Mechanics Settings
   - Verificar JS: Cast Time

### Interrupt Não Funciona

**Sintoma**: Skills não interrompem casting

**Possíveis causas**:
1. ⚠️ **Skill sem `<ATB Interrupt>`**
   - **Solução**: Adicionar notetag `<ATB Interrupt>`

2. ⚠️ **Target não está em casting**
   - **Verificar**: Target está usando skill com speed < 0?

3. ⚠️ **Target tem `<ATB Cannot Be Interrupted>`**
   - **Solução**: Remover notetag do target ou usar skill sem interrupt

## Problemas de Performance

### Lag com Muitos Battlers

**Sintoma**: FPS cai com muitos enemies/actors

**Soluções**:
1. **Desabilitar Field Gauge** se não é essencial
2. **Desabilitar Sprite Gauges** para alguns enemies
3. **Aumentar Marker Speed** (animação mais rápida)
4. **Acelerar JS formulas** (evitar cálculos complexos)

### Animações Travam

**Sintoma**: Animações de interrupt ficam em loop

**Possíveis causas**:
1. ⚠️ **Animation ID inválido**
   - **Solução**: Verificar ID existe em Database > Animations

2. ⚠️ **Core Engine não instalado**
   - **Solução**: Instalar VisuMZ_0_CoreEngine para animações

## Problemas de Notetags

### Notetag Não Funciona

**Sintoma**: Notetag não produz efeito

**Possíveis causas**:
1. ⚠️ **Sintaxe incorreta**
   - **Solução**: Verificar sintaxe exata
   - Exemplo: `<ATB Interrupt>` (não `ATB Interrupt` sem `<>`)

2. ⚠️ **Database object errado**
   - **Solução**: Verificar qual database object aceita o notetag
   - Ex: `<Hide ATB Gauge>` apenas para Enemies

3. ⚠️ **Plugin desabilitado**
   - **Solução**: Verificar Plugin Manager
   - Plugin deve estar habilitado

### JS Notetag Causa Erro

**Sintoma**: Erro no console ao usar skill

**Possíveis causas**:
1. ⚠️ **Sintaxe JavaScript inválida**
   - **Solução**: Verificar sintaxe JS
   - Usar try/catch para debugging

2. ⚠️ **Variável inexistente**
   - **Solução**: Verificar variáveis disponíveis
   - `<JS ATB Charge Gauge>`: `target`, `rate`
   - `<JS ATB After Gauge>`: `user`, `rate`

## Problemas de Compatibilidade

### Conflito com Outro Plugin

**Sintoma**: Comportamento estranho após adicionar plugin

**Soluções**:
1. **Verificar ordem dos plugins**
   - Active Turn Battle deve ser Tier 2
   - Colocar abaixo de Core Engine e Battle Core

2. **Desabilitar outros plugins**
   - Desabilitar um por um para identificar conflito
   - Consultar [Compatibilidade](./compatibilidade.md)

## Debugging

### Ativar Console

1. **Test Play** (F12)
2. **Abrir Console** (F8)
3. **Procurar erros** com "ATB" ou "VisuStella"

### Logging JS

Adicionar `console.log()` em JS formulas:

```javascript
<JS ATB Speed>
console.log("AGI:", user.agi);
return user.agi;
</JS ATB Speed>
```

### Teste Isolado

1. **Novo projeto** com apenas VisuStella plugins
2. **Testar funcionalidade**
3. **Se funcionar**: Conflito com outro plugin
4. **Se não funcionar**: Problema com configuração

## Ver Também

- [Glossário](./glossario.md) - Termos técnicos
- [Compatibilidade](./compatibilidade.md) - Plugins compatíveis
- [Configuration](../configuration/) - Ajustar parâmetros

## Ainda Com Problemas?

1. Verificar [VisuStella MZ Issues](https://github.com/VisuStella/VisuStella-MZ/issues)
2. Procurar fóruns RPG Maker Web
3. Consultar documentação oficial VisuStella
