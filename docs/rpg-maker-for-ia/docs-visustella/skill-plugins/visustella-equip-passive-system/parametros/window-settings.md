# Plugin Parameters - Window Settings

Configurações visuais das janelas do menu de Passivos.

## Equip Passive List

| Parâmetro | Descrição |
|-----------|-----------|
| Background Type | Tipo de fundo da janela |
| Equipped Color | Cor para passivos equipados (#rrggbb ou número do Window Skin) |
| Show Capacity Costs? | Mostra custos de capacidade na lista |
| → Show 0 Costs? | Mostra custos zero? |
| → Show 1 Costs? | Mostra custos de 1? |
| → Show Cost Numbers? | Mostra números ou múltiplos ícones |
| → → Cost Icon Limit | Máximo de ícones antes de usar números |
| Sort Style | Ordenação dos passivos |
| Show Unlearned? | Mostra passivos não aprendidos |
| → Separate Unlearned? | Separa não aprendidos dos aprendidos |
| → Mask Unlearned? | Aplica máscara nos não aprendidos |
| → → Mask Icon | Ícone para passivos mascarados |
| → → Mask Character | Caractere de mascaramento (ex: `?`) |
| → → Italics? | Usa itálico para nomes mascarados |

## Passive Status Window

| Parâmetro | Descrição |
|-----------|-----------|
| Show Window? | Mostra esta janela na cena |
| Background Type | Tipo de fundo da janela |
| Max Capacity Color | Cor quando capacidade está no máximo (Window Skin) |

## Relação entre Parâmetros

```
Show Unlearned? = false
  └── Lista mostra APENAS passivos aprendidos

Show Unlearned? = true
  ├── Separate Unlearned? = true
  │     └── Divisão visual entre aprendidos e não
  └── Mask Unlearned? = true
        ├── Mask Icon aplicado
        ├── Mask Character substitui letras
        └── Italics opcional

Show Capacity Costs? = true
  ├── Show 0 Costs? controla visibilidade de custo zero
  ├── Show 1 Costs? controla visibilidade de custo 1
  └── Show Cost Numbers?
        ├── true → mostra número
        └── false → mostra ícones até Cost Icon Limit
```
