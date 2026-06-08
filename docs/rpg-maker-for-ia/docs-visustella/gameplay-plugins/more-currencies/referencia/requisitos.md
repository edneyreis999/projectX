# Requisitos e Compatibilidade

## Requisitos Obrigatórios

| Requisito | Detalhes |
|-----------|----------|
| **RPG Maker MZ** | Não funciona em outras versões do RPG Maker |
| **Core Engine VisuStella MZ** | Deve estar ACIMA deste plugin no Plugin Manager |
| **Items and Equips Core VisuStella MZ** | Deve estar ACIMA deste plugin no Plugin Manager. Versão mais recente necessária para funcionalidade de Proxy |

## Tier

- **Tier 2**: Colocar abaixo de plugins de tier inferior (0, 1) no Plugin Manager
- Ordem recomendada: Tier 0 → Tier 1 → Tier 2 → ...

## Posicionamento no Plugin Manager

```
[Acima]
  Core Engine VisuStella MZ
  Items and Equips Core VisuStella MZ
  ---
  More Currencies VisuStella MZ  ← Este plugin
[Abaixo]
  (plugins de tier 3+)
```

## Mudanças no Engine

Este plugin faz alterações hard-coded no RPG Maker MZ:

### Window_ShopNumber
- Conteúdo visual completamente reformulado
- Mostra: recursos possuídos, custo da transação, resultado líquido
- Elementos visuais reorganizados para acomodar novas informações

### Sistema de Proxy
- Adiciona funcionalidade de itens proxy temporários
- Intercepta aquisição de itens proxy para bloquear obtenção por meios não-shop
