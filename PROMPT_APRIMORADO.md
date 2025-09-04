# Prompt Aprimorado — Documentação de Desenvolvedor (VisuMZ CoreEngine)

## Prompt para usar (copiar e colar)

Leia apenas o arquivo `frontend/js/plugins/VisuMZ_0_CoreEngine.js` e produza uma documentação ESPECÍFICA para desenvolvedores de plugins JavaScript para RPG Maker MZ, com foco em reuso seguro das APIs existentes (não crie funções do zero se já existirem). Siga exatamente as instruções abaixo:

- Objetivo: mapear com precisão APIs, pontos de extensão e utilitários do CoreEngine para reutilização, evitando duplicações.
- Escopo: NÃO invente nada que não esteja no arquivo. Se algo não existir, escreva “não encontrado na documentação”.
- Extraia e documente, para cada item encontrado: namespaces/globais criados, classes do engine alteradas, funções utilitárias, “quick functions”, comandos de plugin, notetags, parâmetros de plugin e seus efeitos em runtime, constantes, aliases e hooks.
- Para cada item, inclua: nome canônico, assinatura, propósito, contexto de uso (classe/cena), dependências, efeitos colaterais, retorno/erros, compatibilidade e exemplo de chamada. Informe também quando substituir/alias de método original e a diferença de comportamento vs. padrão.
- Liste todos os símbolos globais exportados (ex.: `Imported.VisuMZ_0_CoreEngine`, `VisuMZ.CoreEngine`, versão) e utilitários visíveis (ex.: referências a `VisuMZ.openURL`).
- Inclua “Regras de Conflito”: como detectar se uma função já existe e deve ser reutilizada (ex.: checar `Imported.VisuMZ_0_CoreEngine`, presença de métodos), e quando NÃO redefinir.
- Validação: crie uma seção “Prováveis confusões” com 5+ casos onde devs tenderiam a duplicar funções e a alternativa correta já existente.
- Formato de saída:
  1) Um ÍNDICE em YAML com metadados por item (um por função/método/param/notetag/etc.).
  2) Seções humanas curtas por categoria (Namespaces, Overrides, Quick Functions, Notetags, Parâmetros→Runtime, Comandos/Script Calls, Utilitários, Exemplos, Anti‑padrões).
- Regras de segurança para IA:
  - Se uma necessidade não estiver documentada no índice, responda “não encontrado na documentação” em vez de criar função nova.
  - Antes de sugerir função nova, procure no índice por nome/sinônimo; se existir, proponha reutilização ou wrapper.

Saída final bem estruturada e pronta para indexação.

## Estrutura exigida da saída

1) Índice YAML (um item por símbolo)

Campos obrigatórios por item:

- name: nome canônico do símbolo
- kind: function|method|class|namespace|param|notetag|plugin_command|constant|hook
- signature: parâmetros e retorno (se aplicável)
- module/class: onde vive (ex.: `Game_Interpreter`, `Scene_Boot`)
- category: Override|Utility|Hook|QuickFunction|Param|Notetag|Command|Global
- introduced_in: versão do Core (`VisuMZ.CoreEngine.version` se aparecer)
- replaces/aliases: método original ou alias (se override)
- reads/writes: estado/propriedades alteradas
- side_effects: efeitos colaterais relevantes
- dependencies: outros símbolos necessários
- tags: termos de busca/sinônimos
- usage_example: snippet curto e válido de uso

2) Seções por categoria (texto humano, conciso):

- Namespaces/Globais
- Overrides de Engine
- Quick Functions
- Notetags e Script Calls
- Parâmetros de Plugin → Efeitos em runtime
- Utilitários
- Regras de Conflito e Extensão Segura
- Exemplos Canônicos de Uso
- Anti‑padrões e Armadilhas
- Prováveis Confusões (tabela intenção → API correta)

## Conteúdo mínimo esperado (pistas do arquivo)

Use o próprio arquivo como fonte. Exemplos de itens que tendem a aparecer nesse CoreEngine (valide no arquivo antes de documentar):

- Namespaces/Globais: `Imported.VisuMZ_0_CoreEngine`, `VisuMZ.CoreEngine` (versão esperada próxima de 1.85).
- Overrides/patches potenciais: `Scene_Boot.onDatabaseLoaded`, `Game_Interpreter.command355`, `Sprite_Animation.setViewport`, `Bitmap.blt` (smoothing e coordenadas), comportamento de `Window_Message` para texto instantâneo, `Sprite_Timer` no spriteset, etc.
- Estruturas de parâmetros `/*~struct~...*/`: menus (Save/Load/Title/GameEnd/Shop/Name), UI/Window/Screen/Param/Command, etc., mapeadas para onde são consumidas e seus efeitos.
- Quick Functions: respeitam regra de não criar se nome similar já existir (documente a regra explícita e onde se aplica).
- Utilitários exemplares: abrir URL via `VisuMZ.openURL` em botões de título.

Se algum item acima não existir no arquivo, marque como “não encontrado na documentação”.

## Regras de Conflito e Extensão Segura (incluir na saída)

- Presença do CoreEngine:
  - `if (!Imported || !Imported.VisuMZ_0_CoreEngine) throw new Error('Requer VisuMZ CoreEngine');`
- Checar existência antes de criar:
  - `if (VisuMZ.CoreEngine && typeof VisuMZ.CoreEngine.fnX === 'function') { /* reutiliza */ }`
- Padrão de alias em overrides:
  - `const _alias = Class.prototype.method; Class.prototype.method = function(...) { _alias.call(this, ...); /* extra */ };`
- Regra de quick functions (se aplicável, conforme o arquivo): “Se já existir função/variável de nome similar no escopo global, ignore e NÃO crie a quick function.”

## “Prováveis Confusões” (incluir na saída)

Mapeie intenções comuns do dev → API correta já existente, por exemplo:

- Abrir URL a partir do título → use `VisuMZ.openURL(url)`.
- Executar script longo em evento → entender o comportamento de `Game_Interpreter.command355` provido pelo CoreEngine ao invés de recriar.
- Ajustar smoothing/desenho de bitmaps → reutilizar as extensões de `Bitmap`/`ImageManager` documentadas.
- Corrigir tearing de setas de janela ou sprites invisíveis → ver overrides de `Window_*` e `Sprite_*` já implementados.
- Texto instantâneo vs. por letra em `Window_Message` → usar regra documentada, não monkey‑patchar `measureTextWidth` genericamente.

## Exemplo de índice YAML (modelo)

```yaml
- name: Bitmap.blt
  kind: method
  signature: (srcBitmap, sx, sy, sw, sh, dx, dy, dw, dh)
  module/class: Bitmap
  category: Override
  introduced_in: 1.85
  replaces/aliases: Bitmap.prototype.blt (original aliased em _Bitmap_blt)
  reads/writes: writes: destination bitmap; reads: fonte
  side_effects: aplica ajustes de smoothing/coords
  dependencies: ImageManager
  tags: [bitmap, blt, smoothing, draw]
  usage_example: |
    const b = new Bitmap(100, 100);
    b.blt(src, 0, 0, 32, 32, 10, 10, 32, 32);
```

## Observações finais

- Seja específico: cite nomes exatos e onde aparecem (classe/método). Evite texto genérico.
- Se um item não está no arquivo, sinalize claramente como “não encontrado na documentação”.
- Priorize reuso de APIs existentes; só proponha wrappers quando estritamente necessário.

