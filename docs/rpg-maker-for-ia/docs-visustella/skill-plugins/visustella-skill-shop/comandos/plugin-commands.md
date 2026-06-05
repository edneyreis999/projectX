# Plugin Commands — VisuStella Skill Shop

## Scene: Open Skill Shop

Abre a cena de Skill Shop com as skills especificadas.

| Propriedade | Descrição |
|-------------|-----------|
| **Uso** | Event Command → Plugin Command |
| **Contexto** | Apenas no mapa (não pode ser usado em batalha) |

### Parâmetros

#### Skill ID(s)
- **Tipo**: Seleção de ID(s)
- **Descrição**: Define quais Skills estarão disponíveis na loja
- **Múltiplo**: Pode selecionar vários Skill IDs

#### Discount Rate
- **Tipo**: Texto / Código JavaScript
- **Descrição**: Taxa de desconto aplicada a todas as skills do shop
- **Exemplo**: `0.5` para 50% de desconto, ou expressão JS como `0.8` para 20% de desconto

### Exemplo de Uso via Evento

1. Criar um evento no mapa
2. Adicionar **Plugin Command** → "Scene: Open Skill Shop"
3. Selecionar os Skill IDs desejados
4. Definir Discount Rate (1.0 = sem desconto)

---

## Links Relacionados

- [Notetags](../notetags/skill-shop-notetags.md) — Configure requisitos e custos das skills
- [Configuração Geral](../parametros/configuracao-geral.md) — Custo padrão quando notetag ausente
