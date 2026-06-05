# Compatibilidade

## Requisitos

- **RPG Maker MZ**: Obrigatorio. Nao funciona em outras versoes do RPG Maker.
- **Tier 2**: Deve ser colocado abaixo de plugins de tier inferior (0, 1) no Plugin Manager.

## Plugins VisuStella Integrados

| Plugin | Integracao | Detalhes |
|--------|-----------|----------|
| VisuMZ_2_ClassChangeSystem | Opcional | Adiciona custos em CP (Class Points) e JP (Job Points). Notetags: `<Learn CP Cost>`, `<Learn JP Cost>`, `<JS Learn CP Cost>`, `<JS Learn JP Cost>` |
| VisuMZ_3_VictoryAftermath | Opcional | Exibe AP/SP ganhos na tela de vitoria. Configuravel em AP/SP Settings > Victory |

## Ordem no Plugin Manager

```
Tier 0: VisuMZ_0_CoreEngine
Tier 1: (outros tier 1)
Tier 2: VisuMZ_2_SkillLearnSystem  ← aqui
Tier 3: (outros tier 3)
...
```

## Consideracoes

- Se ClassChangeSystem nao estiver instalado, as notetags de CP/JP sao ignoradas silenciosamente.
- Se VictoryAftermath nao estiver instalado, o sistema funciona normalmente sem exibicao na tela de vitoria.
- O Skill Learn System funciona independentemente de outros plugins VisuStella.
