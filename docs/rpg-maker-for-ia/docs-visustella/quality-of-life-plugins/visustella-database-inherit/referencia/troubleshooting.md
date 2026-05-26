# Troubleshooting

## Problemas Comuns

### Tempo de carregamento lento

**Causa**: O plugin pre-carrega todas as entradas do banco de dados uma a uma para aplicar heranca.

**Solucoes**:
- Reduza a quantidade de herancas desnecessarias
- Consolide objetos que poderiam ser um unico parent
- Use heranca especifica (Properties, Traits) em vez de Everything quando possivel

### Propriedades herdadas nao aparecem

**Causa possivel 1**: O parent tem ID maior que o child. O child so recebe propriedades do parent **antes** da heranca do parent ser aplicada.

**Solucao**: Use a regra de ouro - herde sempre de IDs menores.

**Causa possivel 2**: A notetag esta com sintaxe incorreta (nome errado, ID inexistente).

**Solucao**: Verifique se o nome/ID do parent existe exatamente no banco de dados correspondente.

**Causa possivel 3**: O plugin esta desligado ou abaixo de um plugin que conflita.

**Solucao**: Verifique se o plugin esta ativo e na posicao correta do Plugin Manager (Tier 4).

### Heranca de banco cruzado nao funciona

**Causa**: O plugin nao suporta heranca entre bancos de dados diferentes (ex: Skill herdar de Item).

**Solucao**: Use notetags apenas dentro do mesmo banco de dados.

### Traits/Effects em ordem errada

**Causa**: Traits e effects do parent vem antes dos do child, o que pode afetar a logica de empilhamento.

**Solucao**: Planeje a ordem de traits e effects considerando que os do parent serao processados primeiro.

### Multipla heranca com resultados inesperados

**Causa**: Com multiplos parents, propriedades overwritten vem do ultimo parent listado.

**Solucao**: Liste os parents na ordem de prioridade desejada, com o mais importante por ultimo.
