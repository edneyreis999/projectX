# Mudanças no Core - Enhanced TP System

Este plugin adiciona novas funcionalidades hardcoded ao RPG Maker MZ. Abaixo, a lista completa de alterações.

## MaxTP Overwrite

**Antes:** Nada alterava MaxTP.

**Agora:** Este plugin oferece TP Modes que mudam o total MaxTP. A função foi sobrescrita para mais funcionalidade.

**Impacto:** MaxTP agora é dinâmico baseado no TP Mode ativo.

---

## Preserve TP

**Antes:** Determinado pela presença do trait "Preserve TP".

**Agora:** Determinado pelo TP Mode atual e sua propriedade de TP Preservation.

**Motivo:** Manter consistência nos TP Modes e dar mais controle ao game dev.

**Impacto:** A trait Preserve TP não mais controla isso diretamente.

---

## Initial TP Gain in Battle Reworked

**Antes:** Se 'Preserve TP' estava OFF, battlers recebiam uma quantidade random de TP no início da batalha. Sem controle no editor.

**Agora:** Totalmente configurável via TP Mode formulas.

**Controles:**
- Pode requerer ou não 'Preserve TP' flag
- Valor configurável via fórmula

**Impacto:** Controle completo do TP inicial.

---

## On Damage TP Gain

**Antes:** Função default de ganho de TP ao receber dano.

**Agora:** Sobrescrita em favor do ganho customizado do TP Mode equipado.

**Motivo:** Manter funcionalidade sob controle.

**Impacto:** Ganho de TP ao receber dano é controlado pelo TP Mode.

---

## Sprite_Gauge Changes

**Mudanças:** Sprite gauge levemente alterado para permitir flashing gauges.

**Detalhes:**
- Gauges separados em layers diferentes especificamente para TP
- Sem problemas de compatibilidade esperados
- Exceto com plugins que alteram completamente o TP gauge

**Impacto:** Visualmente imperceptível, exceto pelo flashing.

---

## Compatibilidade

Estas mudanças são internas e não devem quebrar a maioria dos plugins. Plugins que modificam as mesmas funções podem ter conflitos.

## Documentação Relacionada

- [Visão Geral](visao-geral.md) - Recursos do plugin
- [Modos de TP](../parametros/modos.md) - Configurar Preserve TP e MaxTP
- [Fórmulas de TP](../parametros/formulas.md) - Configurar Initial TP
