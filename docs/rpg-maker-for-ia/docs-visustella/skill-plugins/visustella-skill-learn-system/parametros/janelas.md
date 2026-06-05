# Parametros - Window Settings

O plugin adiciona duas janelas ao menu de Skills: **Detail Window** e **Confirm Window**.

## Detail Window

Lista os custos e requisitos detalhados para aprender uma skill.

### Requirements
- **Requirement Title**: Texto do cabecalho. `%1` = Icone da skill, `%2` = Nome da skill.
- **Requirement Met**: Aparencia de requisito atendido. `%1` = Texto do requisito.
- **Requirement Not Met**: Aparencia de requisito NAO atendido. `%1` = Texto do requisito.
- **Requirement Level**: Exibicao de nivel. `%1` = Nivel, `%2` = Texto completo, `%3` = Abreviacao.
- **Requirement Skill**: Exibicao de skill. `%1` = Icone, `%2` = Nome.
- **Requirement Switch**: Exibicao de switch. `%1` = Nome do switch.

### Costs
- **Cost Title**: Cabecalho de custos. `%1` = Icone, `%2` = Nome da skill.
- **Cost Name**: Label do recurso sendo consumido.
- **Cost Quantity**: Label da quantidade do recurso.
- **Cost of Owned**: Label da quantidade possuida.

### Layout
- **Background Type**: 0 = Window, 1 = Dim, 2 = Transparent.
- **JS: X, Y, W, H**: Codigo JavaScript para dimensoes da janela.

---

## Confirm Window

Janela de confirmacao que aparece na parte inferior antes de aprender uma skill.

- **Confirm Text**: Texto do botao Confirmar. Aceita text codes.
- **Cancel Text**: Texto do botao Cancelar. Aceita text codes.
- **Background Type**: 0 = Window, 1 = Dim, 2 = Transparent.
- **JS: X, Y, W, H**: Codigo JavaScript para dimensoes da janela.
