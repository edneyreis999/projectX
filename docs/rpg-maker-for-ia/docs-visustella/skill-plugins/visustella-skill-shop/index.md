# VisuStella Skill Shop

Plugin de loja de habilidades para RPG Maker MZ. Permite que o jogador compre skills com gold para ensinar aos membros do party, com requisitos configuráveis (classe, nível, skills prévias, switches).

## Metadados

| Campo | Valor |
|-------|-------|
| **Nome** | VisuStella Skill Shop |
| **Tipo** | Mechanic (sistema de feature) |
| **Tier** | 4 — colocar abaixo de plugins de tier menor |
| **Requisito** | RPG Maker MZ |
| **Compatibilidade** | Visual Gold Display (custos exibidos no formato Visual Gold) |

## Mapa de Navegação

```
visustella-skill-shop/
├── conceitos/visao-geral.md          ← Comece aqui
├── notetags/skill-shop-notetags.md   ← Notetags para Skills
├── comandos/plugin-commands.md       ← Comandos de evento
├── parametros/
│   ├── configuracao-geral.md         ← Custo padrão e backgrounds
│   ├── vocabulario.md                ← Textos e ícones das janelas
│   └── janelas.md                    ← Dimensões e estilos das janelas
└── chunks.json                       ← Chunks semânticos para recuperação
```

## Ordem de Leitura Recomendada

1. **[Visão Geral](conceitos/visao-geral.md)** — Entenda o que o plugin faz e seus requisitos
2. **[Notetags](notetags/skill-shop-notetags.md)** — Configure custos e requisitos das skills
3. **[Plugin Commands](comandos/plugin-commands.md)** — Aprenda a abrir a loja via eventos
4. **[Configuração Geral](parametros/configuracao-geral.md)** — Ajuste custos padrão e backgrounds
5. **[Vocabulário](parametros/vocabulario.md)** — Customize textos da interface
6. **[Janelas](parametros/janelas.md)** — Ajuste dimensões e estilos visuais
