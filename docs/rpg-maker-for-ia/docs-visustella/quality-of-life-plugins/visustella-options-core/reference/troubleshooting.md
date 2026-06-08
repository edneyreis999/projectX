# Troubleshooting

## WASD Retroativo

Se voce habilitou WASD Movement no Core Engine **depois** de ja ter `config.rmmzsave`:

| Sintoma | Causa | Solucao |
|---------|-------|---------|
| Controles WASD nao funcionam para jogadores antigos | config.rmmzsave nao foi atualizado retroativamente | 1. Adicionar manualmente nos keybindings 2. Deletar `config.rmmzsave` de `/save/` |

> Isso so afeta jogadores que ja possuem save anterior. Novos jogadores nao sao impactados.

## Novas Opcoes Nao Aparecem

| Sintoma | Causa | Solucao |
|---------|-------|---------|
| Opcao nova de update nao aparece no menu | Plugin Parameters nao foram atualizados com a nova opcao | Adicionar manualmente via Options Categories nos Plugin Parameters |

## Opcoes Customizadas Nao Funcionam

| Sintoma | Causa | Solucao |
|---------|-------|---------|
| Opcao customizada nao responde | Codigo JS nos campos Functions/Data pode estar incorreto | Verificar JS: Default Value, JS: Save Option e JS: Load Option |
| Opcao aparece mas nao pode ser alterada | JS: Enable retornando false | Verificar logica do JS: Enable |
| Opcao nao aparece | JS: Show/Hide retornando false | Verificar logica do JS: Show/Hide |

## Integracao com Outros Plugins

| Problema | Causa | Solucao |
|----------|-------|---------|
| Opcao de plugin VisuStella nao aparece | Plugin dependente nao esta instalado ou esta acima do Options Core | Instalar o plugin dependente e garantir que Options Core (Tier 1) esteja abaixo de Tier 0 |
| Touch UI nao aparece | CoreEngine nao instalado ou Touch UI desabilitado | Instalar CoreEngine e verificar parametro Touch UI |

## Ordem dos Plugins

O Options Core e **Tier 1**. Deve ser posicionado:
- **Abaixo** de plugins Tier 0 (CoreEngine)
- **Acima** de plugins Tier 2, 3, 4, 5
