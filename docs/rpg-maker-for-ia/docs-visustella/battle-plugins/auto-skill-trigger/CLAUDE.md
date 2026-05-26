Auto Skill Trigger - VisuStella MZ Plugin - Documentação Completa
================================================================

RESUMO EXECUTIVO
---------------
Sistema de triggers automáticos para skills que reagem a condições específicas
durante combate. Oferece 60 tipos diferentes de triggers para criar habilidades
reativas e comportamentos tácticos em RPG Maker MZ.

ESTRUTURA DA DOCUMENTAÇÃO
-------------------------

CONCEITOS (Fundamentos)
├── introducao.md
│   ├── Visão geral do sistema
│   ├── Features principais (Battle Events, Death Mechanics, etc.)
│   ├── Casos de uso comuns
│   └── Caminho recomendado de aprendizado
│
└── funcionamento.md
    ├── Limites por turno (Turn-Based e TPB-Based)
    ├── Prevenção de efeito runaway
    ├── Recomendações de design (MP/TP costs, cooldowns)
    ├── Proteções contra loops infinitos
    └── Configuração para diferentes cenários

NOTETAGS (Implementação)
├── triggers.md
│   ├── 60 tipos de Auto Triggers organizados em 8 categorias:
│   │   1. Battle Events (Battle Start, Battle Win, Death)
│   │   2. User Actions (Attack, Guard, Item, Physical, Magical, etc.)
│   │   3. Target Reactions (ser alvo de ações)
│   │   4. Ally Reactions (aliados sendo alvos)
│   │   5. Enemy Reactions (inimigos sendo alvos)
│   │   6. Friends (observando time aliado)
│   │   7. Friends Only (time aliado, exclui próprio)
│   │   8. Opponents (observando time opositor)
│   ├── Sintaxe básica e com chance percentual
│   └── Nota sobre escopo original (*Note1*)
│
├── condicoes.md
│   ├── <No Auto Skill Trigger> - Prevenir triggers
│   ├── Regras importantes:
│   │   - Prevenção de loop infinito
│   │   - Múltiplos triggers por skill
│   │   - Condição de usabilidade normal
│   │   - Escopo original (Note1)
│   └── Compatibilidade com outros sistemas
│
└── exemplos.md
    ├── Exemplos básicos de cada categoria
    ├── Exemplos com Skill Types e Elementos
    ├── Exemplos com chance percentual
    ├── Combinações práticas (Counter-Attack, Paladin's Protection, etc.)
    ├── Casos de uso avançados
    └── Dicas de design para prevenir runaway

REFERÊNCIA (Configuração)
├── compatibilidade.md
│   ├── Battle systems incompatíveis (FTB, ETB, PTB)
│   ├── Motivo da incompatibilidade
│   ├── Requisitos de plugin (VisuMZ_1_BattleCore)
│   └── Ordem recomendada de plugins
│
├── parametros.md
│   ├── Limit Per Turn (Turn-Based)
│   ├── Limit Per Turn (TPB-Based)
│   ├── Explicação do risco de runaway
│   ├── Configurações recomendadas (Conservador, Equilibrado, Agressivo)
│   └── Configuração "ilimitada" e avisos
│
└── requisitos.md
    ├── Requisitos de plataforma (RPG Maker MZ)
    ├── Plugins obrigatórios (VisuMZ_1_BattleCore)
    ├── Classificação Tier (Tier 3)
    ├── Ordem recomendada no Plugin Manager
    └── Checklist de instalação

FLUXO DE APRENDIZAGEM RECOMENDADO
----------------------------------
1. introducao.md → Entender propósito e features
2. funcionamento.md → Compreender limites e riscos de runaway
3. triggers.md → Referência completa dos 60 tipos disponíveis
4. condicoes.md → Regras e restrições importantes
5. exemplos.md → Ver aplicações práticas e casos de uso
6. parametros.md → Configurar limites adequadamente
7. compatibilidade.md → Verificar incompatibilidades antes de usar

TÓPICOS CRÍTICOS
-----------------
❌ INCOMPATIBILIDADES: FTB, ETB, PTB battle systems
⚠️ RISCO: Runaway effects se não limitado adequadamente
✅ REQUISITO: VisuMZ_1_BattleCore (Tier 1)
🔢 TIER: 3 (colocar após Tier 0, 1, 2)
🎯 TOTAL: 60 tipos diferentes de Auto Triggers

RELAÇÕES ENTRE DOCUMENTOS
--------------------------
introducao.md → funcionamento.md (entender antes de configurar)
introducao.md → triggers.md (visão geral → referência detalhada)
funcionamento.md → parametros.md (teoria → configuração)
triggers.md → exemplos.md (referência → prática)
condicoes.md → exemplos.md (regras → aplicação)
requisitos.md → compatibilidade.md (o que precisa → o que não funciona)
parametros.md → funcionamento.md (configuração → explicação)

PONTOS DE ATENÇÃO PARA LLMs
-----------------------------
1. Sempre verificar compatibilidade antes de sugerir Auto Skill Triggers
2. Nunca recomendar limites muito altos sem avisar sobre runaway
3. Lembrar que skills com Auto Trigger não podem triggerar outros Auto Triggers
4. Escopo original (*Note1*) é crucial para entender triggers de alvo
5. Diferença entre "Friends" (inclui próprio) e "Friends Only" (exclui próprio)
6. Death trigger é especial: pode prevenir morte se recuperar HP suficiente
7. Skill Type e Element names devem ser exatamente iguais ao database
8. Chance percentual é opcional: sem chance = 100%, com chance = x%

PALAVRAS-CHAVE PARA BUSCA
-------------------------
- auto skill trigger
- automatic skill
- reactive skills
- battle triggers
- death trigger
- counter attack
- runaway effect
- trigger conditions
- skill reactions
- element triggers
- skill type triggers
- battler triggers
- target triggers
- user actions
- friends triggers
- opponents triggers
