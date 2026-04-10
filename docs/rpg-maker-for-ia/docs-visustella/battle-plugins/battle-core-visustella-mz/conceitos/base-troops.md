# Base Troops

## Visão Geral

**Base Troops** são troops especiais cujos eventos são replicados e aplicados a **todos os outros troops** no database.

## Como Funciona

### Configuração
Base Troops podem ser encontrados, declarados e modificados em:
```
Plugin Parameters => Mechanics Settings => Base Troop ID's
```

### Comportamento
Todos os Troop ID's listados terão seus **page events replicados** e colocados sob todos os outros troops encontrados no database.

## Exemplo de Uso

Se você tem um event que roda na **Turn 1** de um Base Troop:
- Para **cada troop** no database
- Esse **mesmo event** também roda na **Turn 1**

## Benefícios

### 1. Redução de Trabalho
Reduz a quantidade de trabalho necessário para **copy/paste event pages** em cada database troop object manualmente.

### 2. Customização do Battle System
Útil para aqueles que desejam customizar seu battle system ainda mais, aplicando lógica comum a todas as batalhas.

### 3. Manutenção Centralizada
Mudanças em um Base Troop se aplicam automaticamente a todos os troops, facilitando manutenção.

## Casos de Uso Típicos

### Eventos de Turno Comum
Aplicar eventos que rodam em turnos específicos para todos os troops:
- Turn 1: Setup inicial de batalha
- Turn 5+: Aumento progressivo de dificuldade
- Last Turn: Cleanup ou rewards especiais

### Sistemas Globais de Batalha
Implementar sistemas que afetam todas as batalhas:
- Weather effects dinâmicos
- Background music changes baseado em estado
- Conditional spawns baseados em variáveis globais

### Troop AI Padrão
Estabelecer comportamentos de AI comuns para todos os enemies:
- Retreat patterns
- Self-heal thresholds
- Party-wide buffs

## Configuração

### Parâmetros
Localização: `Plugin Parameters => Mechanics Settings => Base Troop ID's`

Digite os ID's dos troops que deseja usar como Base Troops, separados por vírgula.

### Best Practices

1. **Use ID's baixos** para Base Troops (ex: 1, 2, 3)
2. **Documente** quais troops são Base Troops em notas do projeto
3. **Teste** eventos de Base Troop com troops diferentes para garantir funcionamento
4. **Evite conflicts** garantindo que Base Troops não tenham lógica muito específica

## Limitações

- **Não há herança**: Base Troop events são **copiados**, não herdados. Mudanças no Base Troop não afetam troops existentes a menos que você reapply.
- **Page conflicts**: Se um troop já tem events nas mesmas condições, ambos os events rodam (Base Troop events primeiro)
- **Performance**: Muitos Base Troops com events complexos podem impactar performance de batalha

## Troubleshooting

### Events não rodando
- Verifique se o Troop ID está listado em Base Troop ID's
- Verifique se as condições da page estão sendo atendidas
- Verifique se o troop onde está esperando o event está usando as condições corretas

### Events rodando em ordem errada
- Base Troop events sempre rodam **primeiro**
- Use switches/variables para controlar ordem de execução se necessário

### Performance issues
- Reduza número de Base Troops
- Simplifique events nos Base Troops
- Considere usar Common Events ao invés de Base Troops para lógica muito complexa

## Ver Também

- [Parâmetros: Mechanics](../parametros/mechanics.md) - Configuração de Base Troops
- [Conceitos: Major Changes](./major-changes.md) - Outras mudanças no battle system
- [Action Sequences](../action-sequences/) - Para lógica de batalha mais avançada
