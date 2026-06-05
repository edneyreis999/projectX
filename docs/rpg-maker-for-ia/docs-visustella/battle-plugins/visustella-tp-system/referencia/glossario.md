# Glossário - Enhanced TP System

Termos técnicos usados no plugin e documentação.

---

## TP (Tactic Points)

**Definição:** Recurso de batalha no RPG Maker MZ, similar a MP/HP.

**Características:**
- Reset por padrão entre batalhas
- Usado para skills especiais
- Limitado a MaxTP
- Custo de skill em TP

**Neste Plugin:** Totalmente customizável via TP Modes.

---

## TP Mode

**Definição:** Conjunto de regras que define como um battler ganha e usa TP.

**Componentes:**
- MaxTP Formula
- Fórmulas de ganho (Initial, Damage, Heal, etc.)
- Preserve TP? setting
- Gauge appearance

**Exemplo:** Mode "Berserker" ganha mais TP ao receber dano, menos ao usar skills.

**Analogia:** Como uma "classe de TP" ou "build de TP".

---

## Preserve TP

**Definição:** Se TP persiste entre batalhas.

**No RPG Maker Base:** Determinado por trait "Preserve TP".

**Neste Plugin:** Determinado pelo TP Mode atual.

**Veja também:** [Mudanças no Core](../conceitos/mudancas-core.md#preserve-tp)

---

## MaxTP

**Definição:** Valor máximo de TP que um battler pode ter.

**No RPG Maker Base:** Sempre 100.

**Neste Plugin:** Customizável por TP Mode via MaxTP Formula.

**Exemplos:**
- `100` → Fixo 100
- `user.level * 10` → Baseado em level

---

## TCR Multiplier

**Definição:** Multiplicador de quanto TP é ganho (TP Charge Rate).

**Stacking:** Multiplicativo com TCR trait.

**Fórmula:** `TP Gain * TCR Multiplier * TCR Trait`

**Exemplo:**
- TCR Multiplier: 1.5
- TCR Trait: 150%
- Resultado: 1.5 * 1.5 = 2.25 (225% do ganho base)

---

## Gauge Flash

**Definição:** Efeito visual onde o gauge pisca em cores diferentes.

**Requisitos:**
- Flash Gauge? = true
- VisuMZ_1_SkillsStatesCore instalado
- TP ≥ Required Rate

**Propriedades:**
- Required Rate - Percentual mínimo
- Flash Speed - Velocidade da troca de cor
- Color Lightness - Intensidade da cor

---

## Initial TP

**Definição:** TP que o battler tem no início da batalha.

**No RPG Maker Base:** Random se Preserve TP = OFF, 0 se ON.

**Neste Plugin:** Totalmente customizável via Initial TP formula.

**Veja também:** [Mudanças no Core](../conceitos/mudancas-core.md#initial-tp-gain-in-battle-reworked)

---

## Trait Object

**Definição:** Objeto que fornece traits ao battler.

**Exemplos:** States, Weapons, Armors, Classes

**Neste Plugin:** States podem ter `<Force TP Mode:>` notetag.

**Priority:** Ordem de trait objects determina qual Force TP Mode prevalece.

---

## Global TP Modes

**Definição:** Lista de TP Modes disponíveis para todos actors escolherem.

**Impacto:** Modes listados aparecem no Scene_Skill.

**Diferença de Default TP Mode:**
- Default = Mode inicial
- Global = Modes disponíveis para escolha

---

## TCR (TP Charge Rate)

**Definição:** Trait do RPG Maker que multiplica ganho de TP.

**Stacking:** Multiplicativo com TCR Multiplier do TP Mode.

**Exemplo:** TCR 150% + TCR Multiplier 1.5 = 225% total.

---

## Scene_Skill

**Definição:** Scene do RPG Maker onde player vê skills.

**Neste Plugin:** Contém integração para selecionar TP Modes.

**Configuração:** Plugin Parameters > General Settings > Scene_Skill

**Controle Dinâmico:** Plugin Command `System: Show/Hide TP Mode`

---

## Battler

**Definição:** Unidade que pode batalhar.

**Tipos:** Actor ou Enemy

**Neste Plugin:** Qualquer battler pode ter TP Mode.

---

## Regen / Regeneration

**Definição:** Fase da batalha onde recuperamos recursos.

**Neste Plugin:** Fórmulas da seção "During Regen" são executadas.

**Momento:** Início de cada turno.

---

## Tier 2

**Definição:** Classificação de compatibilidade da VisuStella.

**Significado:** Coloque abaixo de plugins Tier 0 e 1.

**Propósito:** Melhor compatibilidade com biblioteca VisuStella MZ.

**Ordem:** 0, 1, 2, 3, 4, 5

---

## Documentação Relacionada

- [FAQ](faq.md) - Perguntas frequentes
- [Visão Geral](../conceitos/visao-geral.md) - Recursos do plugin
- [Modos de TP](../parametros/modos.md) - Configurar TP Modes
