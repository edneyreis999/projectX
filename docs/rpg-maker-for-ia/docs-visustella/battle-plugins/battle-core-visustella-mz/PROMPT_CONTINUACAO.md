# PROMPT DE CONTINUAÇÃO - Catalogação Battle Core

## CONTEXTO

Você está continuando um trabalho de catalogação da documentação do plugin **VisuStella MZ Battle Core** versão 1.85.

### Documento Original
- **Caminho**: `/Users/edney/projects/coreto/projectX/docs/rpg-maker-for-ia/docs-visustella/Battle_Core_VisuStella_MZ.md`
- **Tamanho**: 24.716 linhas (751KB)
- **Formato**: Documentação de plugin RPG Maker MZ

### Objetivo da Catalogação
Transformar o documento original em uma documentação otimizada para:
1. Navegação hierárquica
2. Recuperação semântica por partes
3. Leitura incremental
4. Referência cruzada entre tópicos
5. Uso futuro por LLMs

---

## O QUE JÁ FOI FEITO ✅

### Estrutura de Pastas Criada
```
docs/rpg-maker-for-ia/battle-core-visustella-mz/
├── index.md                    ✅ CRIADO
├── llms.txt                    ✅ CRIADO
├── llms-full.txt               ✅ CRIADO
├── conceitos/
│   ├── visao-geral.md         ✅ CRIADO
│   ├── major-changes.md       ✅ CRIADO
│   ├── base-troops.md         ✅ CRIADO
│   └── damage-styles.md       ✅ CRIADO
├── notetags/
│   ├── hp-gauge.md            ⬜ VAZIO (preencher)
│   ├── animacao.md            ⬜ VAZIO (preencher)
│   ├── battleback.md          ⬜ VAZIO (preencher)
│   ├── battle-command.md      ⬜ VAZIO (preencher)
│   ├── targeting.md           ⬜ VAZIO (preencher)
│   ├── damage.md              ⬜ VAZIO (preencher)
│   ├── critical.md            ⬜ VAZIO (preencher)
│   ├── life-steal.md          ⬜ VAZIO (preencher)
│   ├── action-sequence.md     ⬜ VAZIO (preencher)
│   ├── animated-sideview-battler.md ⬜ VAZIO (preencher)
│   ├── enemy.md               ⬜ VAZIO (preencher)
│   ├── mechanics.md           ⬜ VAZIO (preencher)
│   ├── battle-layout.md       ⬜ VAZIO (preencher)
│   └── troop-tags.md          ⬜ VAZIO (preencher)
├── parametros/
│   ├── auto-battle.md         ⬜ VAZIO (preencher)
│   ├── damage.md              ⬜ VAZIO (preencher)
│   ├── mechanics.md           ⬜ VAZIO (preencher)
│   ├── battle-layout.md       ⬜ VAZIO (preencher)
│   ├── battle-log.md          ⬜ VAZIO (preencher)
│   ├── battleback-scaling.md  ⬜ VAZIO (preencher)
│   ├── party-command-window.md ⬜ VAZIO (preencher)
│   ├── actor-command-window.md ⬜ VAZIO (preencher)
│   ├── in-battle-status-window.md ⬜ VAZIO (preencher)
│   ├── multi-target-windows.md ⬜ VAZIO (preencher)
│   ├── damage-combo-window.md ⬜ VAZIO (preencher)
│   ├── actor-battler-settings.md ⬜ VAZIO (preencher)
│   ├── enemy-battler-settings.md ⬜ VAZIO (preencher)
│   ├── hp-gauge.md            ⬜ VAZIO (preencher)
│   └── action-sequence.md     ⬜ VAZIO (preencher)
├── action-sequences/
│   ├── action-sets.md         ⬜ VAZIO (preencher)
│   ├── animacoes.md           ⬜ VAZIO (preencher)
│   ├── battle-log.md          ⬜ VAZIO (preencher)
│   ├── camera.md              ⬜ VAZIO (preencher)
│   ├── cutins.md              ⬜ VAZIO (preencher)
│   ├── elements.md            ⬜ VAZIO (preencher)
│   ├── grid.md                ⬜ VAZIO (preencher)
│   ├── horror-effects.md      ⬜ VAZIO (preencher)
│   ├── impact.md              ⬜ VAZIO (preencher)
│   ├── inject.md              ⬜ VAZIO (preencher)
│   ├── mechanics.md           ⬜ VAZIO (preencher)
│   ├── motion.md              ⬜ VAZIO (preencher)
│   ├── movement.md            ⬜ VAZIO (preencher)
│   ├── opacity.md             ⬜ VAZIO (preencher)
│   ├── overlays.md            ⬜ VAZIO (preencher)
│   ├── pictures.md            ⬜ VAZIO (preencher)
│   ├── portraits.md           ⬜ VAZIO (preencher)
│   ├── shake.md               ⬜ VAZIO (preencher)
│   ├── sound.md               ⬜ VAZIO (preencher)
│   ├── state.md               ⬜ VAZIO (preencher)
│   ├── targets.md             ⬜ VAZIO (preencher)
│   ├── time.md                ⬜ VAZIO (preencher)
│   ├── toggle.md              ⬜ VAZIO (preencher)
│   ├── transform.md           ⬜ VAZIO (preencher)
│   ├── user-interface.md      ⬜ VAZIO (preencher)
│   ├── visible.md             ⬜ VAZIO (preencher)
│   └── wait.md                ⬜ VAZIO (preencher)
├── referencia/
│   ├── compatibilidade.md     ✅ CRIADO
│   ├── termos-uso.md          ✅ CRIADO
│   ├── creditos.md            ✅ CRIADO
│   ├── changelog.md           ✅ CRIADO
│   ├── glossario.md           ✅ CRIADO
│   └── troubleshooting.md     ✅ CRIADO
└── chunks.json                ⬜ VAZIO (preencher)
```

---

## O QUE FALTA FAZER ⬜

### 1. Preencher Arquivos de Notetags (14 arquivos)

Cada arquivo de notetag deve seguir este padrão:

```markdown
# [Nome da Categoria] - Notetags

## Visão Geral
Breve descrição do que estas notetags fazem

## Lista de Notetags

### <Notetag Name>
- **Used for**: [Skill, Item, Actor, Enemy, State, etc.]
- **Descrição**: O que faz

### <Another Notetag>
...
```

#### Linhas Guia no Documento Original
Use `grep` para encontrar seções de notetags:
```bash
grep -n "=== .*-Related Notetags ===" docs/rpg-maker-for-ia/docs-visustella/Battle_Core_VisuStella_MZ.md
```

**Seções de Notetags (aproximadamente)**:
- HP Gauge-Related: linha ~411
- Animation-Related: linha ~456
- Battleback-Related: linha ~489
- Battle Command-Related: linha ~510
- Targeting-Related: linha ~785
- Damage-Related: linha ~1006
- Critical-Related: linha ~1152
- Life Steal-Related: linha ~1291
- Action Sequence-Related: linha ~1400
- Animated Sideview Battler-Related: linha ~1507
- Enemy-Related: linha ~1805
- Mechanics-Related: linha ~1900
- Battle Layout-Related: linha ~2318
- Troop Size Tags: linha ~2342
- Troop Comment Tags: linha ~2361

### 2. Preencher Arquivos de Parâmetros (15 arquivos)

Cada arquivo de parâmetro deve seguir este padrão:

```markdown
# [Nome da Categoria] - Plugin Parameters

## Visão Geral
Descrição do que estes parâmetros controlam

## Parâmetros

### [Nome do Parâmetro]
- **Descrição**: O que faz
- **Default**: Valor padrão (se aplicável)
- **Notas**: Observações importantes
```

#### Linhas Guia no Documento Original
```bash
grep -n "Plugin Parameters: .*" docs/rpg-maker-for-ia/docs-visustella/Battle_Core_VisuStella_MZ.md
```

**Seções de Plugin Parameters**:
- Auto Battle Settings: linha ~6065
- Damage Settings: linha ~6128
- Mechanics Settings: linha ~6250
- Battle Layout Settings: linha ~6451
- Battle Log Settings: linha ~6604
- Battleback Scaling Settings: linha ~6735
- Party Command Window: linha ~6764
- Actor Command Window: linha ~6844
- In-Battle Status Window: linha ~6960
- Multi-Target Windows Settings: linha ~7138
- Damage Combo Window Settings: linha ~7189
- Actor Battler Settings: linha ~7307
- Enemy Battler Settings: linha ~7413
- HP Gauge Settings: linha ~7561
- Action Sequence Settings: linha ~7621

### 3. Preencher Arquivos de Action Sequences (25+ arquivos)

Cada arquivo de Action Sequence deve seguir este padrão:

```markdown
# [Nome do Comando] - Action Sequence

## Visão Geral
Descrição do que o comando faz

## Sintaxe
```
ACTION SEQUENCE: [target]
```

## Parâmetros
- **target**: Descrição do alvo

## Exemplos
```
# Exemplo 1
ACTION SEQUENCE: user
```

## Notas
Observações importantes sobre uso
```

#### Linhas Guia no Documento Original
```bash
grep -n "=== Action Sequences - .* ===" docs/rpg-maker-for-ia/docs-visustella/Battle_Core_VisuStella_MZ.md
```

**Seções de Action Sequences** (aproximadamente):
- Action Sets: linha ~2414
- Angle: (parte de outros)
- Animations: linha ~2480
- Battle Log: linha ~2803
- Camera: linha ~2871
- Cutins: linha ~2982
- Dragonbones: linha ~3063
- Elements: linha ~3094
- Grid: linha ~3136
- Horror Effects: linha ~3541
- Impact: linha ~3642
- Inject: linha ~3928
- Mechanics: linha ~4000
- Motion: linha ~4678
- Movement: linha ~4761
- Opacity: (parte de outros)
- Overlays: (parte de outros)
- Pictures: (parte de outros)
- Portraits: (parte de outros)
- Shake: (parte de outros)
- Sound: linha ~4800+
- State: linha ~5000+
- Targets: linha ~5200+
- Time: linha ~5400+
- Toggle: linha ~5600+
- Transform: linha ~5800+
- User Interface: linha ~6000+
- Visible: linha ~6200+
- Wait/Frames: linha ~6400+

### 4. Gerar chunks.json

Criar arquivo `chunks.json` com schema:

```json
{
  "chunks": [
    {
      "id": "battle-core-visustella-mz-001",
      "title": "Título do Chunk",
      "path": "conceitos/visao-geral.md",
      "section": "Conceitos",
      "breadcrumbs": ["Battle Core", "Conceitos", "Visão Geral"],
      "summary": "Resumo de 1-2 frases",
      "keywords": ["keyword1", "keyword2", "keyword3"],
      "content": "Conteúdo completo do chunk",
      "related_topics": ["related-file-1.md", "related-file-2.md"],
      "source_ref": "Battle_Core_VisuStella_MZ.md:10-50"
    }
  ]
}
```

**Regras para Chunks**:
- Cada arquivo .md deve gerar 2-5 chunks
- Chunks devem ser semanticamente completos
- Não corte no meio de uma regra ou procedimento
- Inclua contexto suficiente no summary
- Keywords devem ser úteis para busca

---

## COMO PROCEDER

### Passo 1: Ler o Documento Original
```bash
# Leia o documento em partes para não exceder limite
head -n 100 docs/rpg-maker-for-ia/docs-visustella/Battle_Core_VisuStella_MZ.md

# Ou use grep para encontrar seções específicas
grep -n "=== .* ===" docs/rpg-maker-for-ia/docs-visustella/Battle_Core_VisuStella_MZ.md
```

### Passo 2: Processar Seção por Seção
Comece com **Notetags** (são mais fáceis):
1. Leia a seção de notetags
2. Extraia as notetags
3. Formate no padrão acima
4. Escreva no arquivo correspondente

### Passo 3: Validação
Antes de considerar completo, valide:
- ✅ Todos os arquivos têm conteúdo
- ✅ Nenhum arquivo ficou vazio
- ✅ Links internos funcionam
- ✅ Títulos estão específicos
- ✅ Formatação está consistente

### Passo 4: Gerar chunks.json
Use os arquivos .md criados como base:
1. Leia cada arquivo .md
2. Divida em chunks semânticos
3. Extraia keywords
4. Identifique related_topics
5. Compile em chunks.json

---

## EXEMPLOS DE ARQUIVOS JÁ CRIADOS

Use estes arquivos como referência de formato e estilo:

- `conceitos/visao-geral.md` - Exemplo de introdução
- `conceitos/major-changes.md` - Exemplo de lista detalhada
- `referencia/compatibilidade.md` - Exemplo de referência técnica
- `referencia/glossario.md` - Exemplo de glossário

---

## REGRAS DE QUALIDADE

### Preservação de Conteúdo
- ✅ Preservar todo o conteúdo relevante
- ❌ Remover apenas redundância óbvia e ruído visual
- ❌ Não resumir agressivamente
- ❌ Não omitir detalhes operacionais importantes

### Estrutura
- Títulos H1 para nome do arquivo
- Títulos H2 para seções principais
- Títulos H3 para sub-seções
- Links entre arquivos relacionados
- Seção "Ver Também" no final

### Nomenclatura
- Arquivos: kebab-case (hp-gauge.md)
- Títulos: texto claro (# HP Gauge)
- Consistência com arquivos existentes

---

## COMPLETAR O TRABALHO

### Checkpoint Final
Quando terminar, confirme:

```
+================================================================+
|              CATALOGAÇÃO CONCLUÍDA                              |
+================================================================+
| Sistema: Battle Core VisuStella MZ                              |
| Tipo: battle-system                                              |
| Pasta: docs/rpg-maker-for-ia/battle-core-visustella-mz/        |
+----------------------------------------------------------------+
| Arquivos criados: 70+                                            |
| Chunks gerados: 200+                                             |
+================================================================+
```

### Entregar Resumo
Forneça:
1. Número de arquivos criados
2. Número de chunks gerados
3. Lista de caminhos onde arquivos foram gerados
4. Avisos se algum arquivo existente foi sobrescrito

---

## NOTAS IMPORTANTES

1. **Documento Grande**: 24.716 linhas - processe em partes
2. **Use `Read` com offset/limit**: Para não exceder limite de tamanho
3. **Valide linhas guia**: Os números de linha fornecidos são aproximados
4. **Consulte arquivos existentes**: Use-os como template de formato
5. **Mantenha consistência**: Siga o padrão dos arquivos já criados

Boa sorte! 🚀
