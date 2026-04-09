# FAQ - Enhanced TP System

> Perguntas frequentes sobre o Enhanced TP System.

## Configuração Básica

### Como adiciono o plugin corretamente?

**Resposta:**
1. Abra Plugin Manager no RPG Maker MZ
2. Adicione `VisuMZ_2_EnhancedTpSystem.js`
3. Coloque **após** plugins Tier 0 e Tier 1 (VisuStella Core Engine)
4. Ative o plugin

### O plugin não está funcionando. O que verificar?

**Resposta:** Verifique nesta ordem:
1. Plugin está **ativo** em Plugin Manager?
2. Plugin está na **ordem correta** (após Tier 0 e 1)?
3. Existe pelo menos um **TP Mode** configurado?
4. O ator/inimigo tem um TP Mode atribuído (via notetag ou padrão)?

---

## TP Modes

### Como crio um TP Mode?

**Resposta:**
1. Plugin Manager → Enhanced TP System → TP Modes
2. Clique em "Add" para adicionar novo modo
3. Configure:
   - Name (nome único)
   - MaxTP Formula
   - TCR Multiplier
   - Preserve TP?
   - Fórmulas de ganho
4. Salve

**Leia mais:** [Modos TP](parametros/modos-tp.md)

### Posso ter TP Modes diferentes para cada personagem?

**Resposta:** Sim! Use notetag `<TP Mode: name>` no Actor para definir o modo inicial, e `<Starting TP Modes>` para listar modos disponíveis.

```xml
<!-- Actor: Filena -->
<Starting TP Modes>
  Momentum
  Ritmo Acelerado
</Starting TP Modes>
<TP Mode: Momentum>
```

### Como faço para jogador trocar de TP Mode?

**Resposta:**
1. Habilite "Show TP Mode?" em General Settings
2. Adicione modos a "Global TP Modes" ou use `<Starting TP Modes>`
3. Jogador pode trocar via: Menu Skills → Comando TP Mode

### Posso forçar um TP Mode em certas situações?

**Resposta:** Sim! Use notetag `<Force TP Mode: name>` em States, Weapons, Armors, etc.

```xml
<!-- State: Enraivecido -->
<Force TP Mode: Fúria Incontrolável>
```

---

## Fórmulas e Ganho de TP

### Por que meus personagens não ganham TP ao dar dano?

**Resposta:** O Enhanced TP System removeu o ganho padrão. Você precisa configurar fórmulas:
1. Plugin Parameters → TP Modes → Selecione o modo
2. Vá em "TP Formulas > HP Damage"
3. Configure "Deal HP Damage": `value / 10` (ou sua fórmula)

**Leia mais:** [Fórmulas TP](parametros/formulas-tp.md)

### Como faço para personagem ganhar TP ao tomar dano?

**Resposta:** Configure a fórmula "Take HP Damage":

```
TP Formulas > HP Damage > Take HP Damage
value / 10    (1 TP a cada 10 de dano)
value / 5     (1 TP a cada 5 de dano - mais agressivo)
```

### Posso usar JavaScript nas fórmulas?

**Resposta:** Sim! Todas as fórmulas aceitam JavaScript:

```
user.level * 2                    // Baseado no nível
Math.min(value, 20)               // Máximo de 20 TP
value > 50 ? 20 : 10              // Condicional
rand(10) + 5                      // Aleatório
```

---

## MaxTP e Preserve

### Por que o MaxTP mudou do padrão (100)?

**Resposta:** O plugin permite MaxTP dinâmico via fórmula. Se seu modo tem `MaxTP Formula: 100`, será 100. Se vazia ou diferente, usará a fórmula configurada.

### O trait "Preserve TP" não está funcionando. Por quê?

**Resposta:** O Enhanced TP System **ignora** o trait nativo. Configure `Preserve TP?` no TP Mode:
- `ON` - Preserva TP entre batalhas
- `OFF` - Reseta TP (usa fórmula Initial TP)

### Como faço para TP começar cheio em cada batalha?

**Resposta:** Configure `Initial TP` no TP Mode:

```
TP Formulas > Generic > Initial TP
100           (sempre começa cheio)
user.maxTp()  (sempre começa no máximo)
```

---

## Visual e Gauge

### Como mudar a cor do gauge de TP?

**Resposta:** Configure no TP Mode:
1. "Custom Color 1" e "Custom Color 2"
2. Use formato `#rrggbb` ou número do Window Skin

```
Custom Color 1: #ff4444  (vermelho)
Custom Color 2: #cc0000
```

### Posso mudar o texto "TP" do gauge?

**Resposta:** Sim! Use "Custom Label" no TP Mode:

```
Custom Label: MOMENTUM
```

**Nota:** Isso só muda o gauge visual, não os custos de TP nas skills.

### Como fazer o gauge piscar?

**Resposta:** Configure Gauge Flash no TP Mode:
1. "Flash Gauge?" = ON
2. "Required Rate" = 0.8 (piscar acima de 80%)
3. "Flash Speed" = 20 (velocidade)

**Requisito:** VisuStella MZ Skills & States Core

---

## Notetags e Comandos

### Qual a diferença entre Learn e Unlock TP Mode?

**Resposta:**
| Learn | Unlock |
|-------|--------|
| Permanente | Temporário |
| Apenas Skills | Skills e Items |
| Requer aprender skill | Pode ser via item |

### Como mudo o TP Mode via evento?

**Resposta:** Use Plugin Command:
```
Plugin Command → Actor: Change TP Mode
  Actor ID(s): 1
  TP Mode Name: Fúria
```

### Como mudo o TP Mode do inimigo?

**Resposta:** Use Plugin Command:
```
Plugin Command → Enemy: Change TP Mode
  Enemy Index(es): 1
  TP Mode Name: Segunda Fase
```

---

## Problemas e Erros

### "Bad JavaScript TP Formula" erro aparece. O que fazer?

**Resposta:** Uma fórmula de TP tem erro de sintaxe. Verifique:
1. Parênteses balanceados?
2. Vírgulas corretas?
3. Variáveis existem (`user`, `value`, etc.)?

Exemplo errado: `valu / 10` (typo)
Exemplo correto: `value / 10`

### TP Mode não aparece no seletor. Por quê?

**Resposta:** Verifique:
1. Modo está em "Global TP Modes" OU personagem tem `<Starting TP Modes>`?
2. "Show TP Mode?" está ON?
3. Modo tem nome único (sem duplicatas)?

### Inimigo não está usando o TP Mode certo. O que fazer?

**Resposta:** Verifique:
1. Enemy tem `<TP Mode: name>` no database?
2. Modo com esse nome existe nos parâmetros?
3. Alguém está usando `<Force TP Mode>` em state?

---

## Integração e Compatibilidade

### Este plugin é compatível com ATB?

**Resposta:** Sim! Enhanced TP System é compatível com VisuStella ATB. TP pode ser usado como recurso para skills em combate ATB.

### Posso usar com plugins de TP de outros desenvolvedores?

**Resposta:** Cuidado. O Enhanced TP System **overwrites** funções do core. Pode haver incompatibilidade. Plugins VisuStella são projetados para trabalhar juntos.

### Qual a ordem correta dos plugins?

**Resposta:**
```
Tier 0: VisuStella Core Engine
Tier 1: Outros plugins Tier 1
Tier 2: Enhanced TP System ← aqui!
Tier 3+: Outros plugins
```

---

## Ver Também

- [Glossário](glossario.md) - Termos técnicos
- [Troubleshooting](#) - (pode ser adicionado futuramente)
- [VisuStella docs](https://visustella.com) - Documentação oficial
