# Compatibilidade

## Plugins VisuStella MZ

### Core Engine (Tier 0)
- **Status**: Opcional
- **Funcionalidade**: Base para animacoes de Taunt
- **Sem o plugin**: Taunt mechanics funcionam, mas sem animacoes visuais

### Battle Core (Tier 1)
- **Status**: Opcional
- **Funcionalidade**: Provoke Priority Lines, Taunt Animations, Aggro Gauge
- **Sem o plugin**: Todas as mecanicas funcionam, mas sem visuais aprimorados

### Outros Plugins de Battle
- **Status**: Geralmente compativel
- **Risco**: Plugins que modificam target selection podem conflitar
- **Mitigacao**: Testar interacao especifica caso a caso

## Plugins Nao-VisuStella

### Plugins de AI Customizada
- **Risco**: ALTO se modificam target selection
- **Motivo**: Ambos os plugins tentam controlar o targeting de inimigos
- **Solucao**: Usar notetags de bypass para ceder controle ao outro plugin

### Plugins de Battle System Alternativos
- **Risco**: MEDIO
- **Motivo**: Podem ter seus proprios sistemas de targeting
- **Solucao**: Testar e desabilitar funcionalidades conflitantes

### Plugins de HUD/Battle UI
- **Risco**: BAIXO
- **Motivo**: Aggro Gauge pode sobrepor com elementos customizados
- **Solucao**: Ajustar offsets e posicoes via Plugin Parameters

## Solução de Problemas Comuns

| Problema | Causa Provavel | Solucao |
|----------|---------------|---------|
| Provoke nao funciona | State sem `<Provoke>` notetag | Adicionar notetag ao state |
| Taunt ignorado | Bypass Taunt em trait object | Verificar equipamentos/states |
| Aggro gauge nao aparece | Battle Core ausente | Instalar Battle Core ou habilitar gauge |
| Inimigo ignora aggro | Targeting padrao do RPG Maker | Verificar Priority: Highest TGR |
| Linhas de provoquer nao aparecem | Battle Core ausente | Instalar Battle Core |
| Animacoes de taunt lag | Cycle Time muito baixo | Aumentar Cycle Time |
| Aggro "reseta" | Comparacao relativa, nao absoluta | Normal - gauge mostra valor relativo |
