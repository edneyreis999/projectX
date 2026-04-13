# Troubleshooting

Problemas comuns e soluções.

---

## Passive States

### "Passive state não está funcionando com isStateAffected()"
**Causa**: `isStateAffected()` NÃO detecta passive states. Isso é comportamento correto.
**Solução**: Use `a.states().includes($dataStates[id])` para detectar ambos.

### "Conditional Branch não detecta passive state"
**Causa**: Conditional Branch verifica "affected state", passive states não são "affected".
**Solução**: Use script call com `a.states().includes($dataStates[id])` no Conditional Branch.

### "Passive state está causando loop infinito"
**Causa**: O JS Passive Condition depende de outro passive state, trait de state, ou parâmetro modificado por state.
**Solução**: Remova dependências circulares. O sistema tem failsafes contra isso.

### "addState/eraseState não funciona em passive state"
**Causa**: Passive states não são diretamente aplicados. Estas funções não se aplicam a eles.
**Solução**: Remova o passive state removendo a fonte (equip, trait, etc.).

---

## Skill Costs

### "Custo MP está limitado a 9,999"
**Causa**: Database Editor tem limite de 9,999 para MP.
**Solução**: Use notetag `<MP Cost: x>` para bypassar o limite.

### "Item Cost consumindo key items"
**Causa**: Versões antes de 1.39 consumiam todos os itens.
**Solução**: Atualize para v1.39+ e copie as novas "Item Cost" Plugin Parameter settings.

### "Múltiplos custos não aparecem"
**Causa**: Comportamento vanilla mostra apenas UM tipo.
**Solução**: Instale/atualize o Skills & States Core - ele mostra todos.

---

## States

### "State com Cannot Move + Action End nunca expira"
**Causa**: Action End Update habilitado + Cannot Move = battler nunca age.
**Solução**: O plugin automaticamente converte para Turn End. OU desative "Action End Update".

### "Slip Damage mostra apenas um popup"
**Causa**: Comportamento intencional - mostra total acumulado.
**Solução**: Isso NÃO é um bug. É design para melhor experiência do jogador.

### "State categories não funcionam fora de batalha"
**Causa**: Bug corrigido na v1.17.
**Solução**: Atualize para v1.17+.

### "Group Defeat não dá EXP/Gold"
**Causa**: Bug corrigido na v1.36.
**Solução**: Atualize para v1.36+.

---

## Plugin Parameters

### "Skill Cost Types não atualizam após update"
**Causa**: Parâmetros são mantidos do projeto existente.
**Solução**:
1. Crie projeto novo, instale plugin
2. Copie "Skill Cost Types" settings
3. Cole no projeto original

### "Lag spikes durante batalha"
**Causa**: Switch/Variable Refresh habilitados + spam de changes.
**Solução**: Desative Switch Refresh e Variable Refresh, ou reduza a frequência de changes.

---

## Compatibilidade

### "Gauges não funcionam após RPG Maker MZ 1.3.3"
**Causa**: Formato de gauges mudou na v1.3.3.
**Solução**: Atualize Skills & States Core para v1.23+ e copie Skill Cost Types settings.

### "Layout do Skill Menu conflita com Core Engine"
**Causa**: Updated Layout sobrepõe Core Engine settings.
**Solução**: Isso é intencional. Desative "Use Updated Layout" se preferir o Core Engine.
