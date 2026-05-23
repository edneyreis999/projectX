# Plugin Parameters - General Settings

Configurações gerais do Equip Passive System.

## General Settings

| Parâmetro | Descrição |
|-----------|-----------|
| Default Show Command | Mostra comando Passives por padrão |
| Auto-Equip on Learn | Equipa automaticamente ao aprender passivo |
| Text Popup on Learn | Produz popup de texto ao aprender |
| → Text Popup Format | Formato: `%1` Actor, `%2` Passive, `%3` Icon |

## Capacity Settings

| Parâmetro | Descrição |
|-----------|-----------|
| Capacity Formula | Fórmula para calcular capacidade máxima |
| Default Capacity Cost | Custo padrão de capacidade (sem notetag) |
| Minimum Capacity Cap | Valor mínimo de capacidade |
| Maximum Capacity Cap | Valor máximo de capacidade |
| Check Over-Capacity | Verifica over-capacity quando EXP muda |

### Capacity Formula

A fórmula pode usar variáveis do jogo e referências ao actor para cálculo dinâmico. Exemplo: um actor de level alto pode ter mais capacidade.

### Check Over-Capacity

Quando habilitado, o sistema verifica se os passivos equipados excedem a capacidade sempre que EXP muda (level up). Se exceder, passivos podem ser desequipados automaticamente.
