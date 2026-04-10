# Parâmetros - Configuração Geral - Enhanced TP System

Configurações globais do sistema de TP.

## Defaults Section

### Default TP Mode

**Função:** Define qual TP mode actors e enemies terão por padrão.

**Valor:** Nome de um TP Mode da lista

**Impacto:**
- Actors sem `<TP Mode:>` notetag usam este
- Enemies sem `<TP Mode:>` notetag usam este
- Battlers recém-criados começam com este mode

**Exemplo:** `Standard`

---

### Global TP Modes

**Função:** TP Modes disponíveis para todos actors escolherem.

**Valor:** Lista de TP Modes

**Impacto:**
- Modes listados aqui aparecem no Scene_Skill
- Actors podem alternar entre estes modes
- Não afeta enemies (eles usam mode fixo)

**Exemplo:** `[Standard, Cautious, Aggressive]`

**Notas:**
- Modes desbloqueados via notetag/commands adicionam à lista
- Actor só pode usar modes em sua lista disponível

---

## Scene_Skill Section

Configuração visual do Scene_Skill.

### Show TP Mode?

**Função:** Mostra seleção de TP Mode no Scene_Skill por padrão.

**Valor:** Boolean (true/false)

**Sobrescrito por:** Plugin Command `System: Show/Hide TP Mode`

**Use Case:** Começar com `false` e mostrar após tutorial.

---

### TP Mode Command

**Função:** Nome do comando mostrado no Scene_Skill.

**Valor:** String com placeholder `%1`

**Placeholder `%1`:** Substituído por texto de TP do database

**Exemplos:**
- `TP Mode` → "TP Mode"
- `Change %1 Mode` → "Change TP Mode"
- `%1 Style` → "TP Style"

---

### TP Mode Icon

**Função:** Ícone do comando no Scene_Skill.

**Valor:** Número do ícone (database)

**Exemplo:** `78` (ícone de sword)

---

### Background Type

**Função:** Visual da janela de seleção.

**Valores:**
- `0` - Window (padrão)
- `1` - Dim (escuro)
- `2` - Transparent

**Estética:** Dim ou Transparent ficam melhor com plugins de imagem de fundo.

---

## Fluxo de Configuração

1. **Criar TP Modes** → Veja [Modos de TP](modos.md)
2. **Definir Default** → Escolha mode padrão
3. **Configurar Global** → Liste modes disponíveis
4. **Ajustar Visual** → Personalize Scene_Skill

---

## Documentação Relacionada

- [Modos de TP](modos.md) - Criar/editar TP Modes
- [Fórmulas de TP](formulas.md) - Configurar ganho de TP
- [Comandos de Sistema](../comandos/sistema.md) - Show/Hide dinâmico
