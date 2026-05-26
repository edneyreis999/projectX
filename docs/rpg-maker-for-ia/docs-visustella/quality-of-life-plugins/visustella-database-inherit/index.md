# VisuStella Database Inherit

Plugin utilitario para RPG Maker MZ que permite heranca de propriedades entre objetos do banco de dados via notetags.

## Metadados

- **Plugin**: VisuStella Database Inherit
- **Tier**: 4
- **Requisito**: RPG Maker MZ
- **Posicao no Plugin Manager**: Abaixo de plugins de tier inferior (0, 1, 2, 3)

## Mapa da Documentacao

```
visustella-database-inherit/
├── conceitos/
│   ├── visao-geral.md          # Como funciona a heranca (7 etapas)
│   └── ordem-heranca.md        # Ordem de processamento e regra de ouro
├── notetags/
│   ├── tudo.md                 # Heranca completa (Everything)
│   ├── notetags.md             # Heranca de notetags
│   ├── propriedades.md         # Heranca de propriedades basicas
│   ├── damage-formula.md       # Heranca de formulas de dano
│   ├── parametros.md           # Heranca de parametros (Weapon, Armor, Enemy)
│   ├── enemy-actions.md        # Heranca de action patterns (Enemy)
│   ├── traits.md               # Heranca de traits
│   ├── effects.md              # Heranca de effects
│   └── referencia-rapida.md    # Tabela resumo de todas as notetags
├── configuration/
│   └── parametros-plugin.md    # Parametros do plugin
└── referencia/
    ├── troubleshooting.md      # Problemas comuns
    └── glossario.md            # Termos tecnicos
```

## Ordem de Leitura Recomendada

1. [Visao Geral](conceitos/visao-geral.md) - Entenda o mecanismo de heranca
2. [Ordem de Heranca](conceitos/ordem-heranca.md) - Regra critica sobre IDs
3. [Referencia Rapida](notetags/referencia-rapida.md) - Tabela de todas as notetags
4. Notetags especificas conforme necessidade
5. [Parametros do Plugin](configuration/parametros-plugin.md) - Configuracao global

## Aviso Importante

Este plugin **pre-carrega** todas as entradas do banco de dados uma a uma. O tempo de carregamento aumenta conforme o tamanho do banco e a quantidade de herancas configuradas.
