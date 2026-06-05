# VisuStella Aggro Control System

Documentacao catalogada do plugin Aggro Control System para RPG Maker MZ pela VisuStella.

## Informacoes

| Campo | Valor |
|-------|-------|
| **Plugin** | Aggro Control System |
| **Autor** | VisuStella MZ |
| **Tier** | 2 |
| **Requer** | RPG Maker MZ |
| **Opcionais** | Core Engine, Battle Core |

## Mapa da Documentacao

### Conceitos
- [Visao Geral](./conceitos/visao-geral.md) - Introducao e funcionalidades principais
- [Provoke](./conceitos/provoke.md) - Mecanica de provocacao baseada em states
- [Taunt](./conceitos/taunt.md) - Mecanica de taunt por tipo de acao
- [Aggro](./conceitos/aggro.md) - Sistema numerico de ameaca
- [Prioridades](./conceitos/prioridades.md) - Hierarquia Provoke > Taunt > Aggro

### Notetags
- [Provoke](./notetags/provoke.md) - Notetags de provoke e bypass
- [Taunt](./notetags/taunt.md) - Notetags de taunt por tipo e bypass
- [Aggro](./notetags/aggro.md) - Notetags de aggro (user, target, passivo, multiplicador)
- [JavaScript Aggro](./notetags/javascript-aggro.md) - Notetags JS para aggro dinamico
- [Referencia Rapida](./notetags/referencia-rapida.md) - Todas as notetags em tabela unica

### Comandos
- [Atores](./comandos/atores.md) - Change Aggro e Set Aggro para actors
- [Inimigos](./comandos/inimigos.md) - Change Aggro e Set Aggro para enemies

### Parametros
- [Provoke Settings](./parametros/provoke-settings.md) - Configuracoes visuais de provoke
- [Taunt Settings](./parametros/taunt-settings.md) - Configuracoes de animacoes de taunt
- [Aggro Settings](./parametros/aggro-settings.md) - Configuracoes de mecanica e gauge

### Referencia
- [Requisitos](./referencia/requisitos.md) - Requisitos e ordem no Plugin Manager
- [Compatibilidade](./referencia/compatibilidade.md) - Compatibilidade e troubleshooting
- [Glossario](./referencia/glossario.md) - Termos e definicoes

## Ordem de Leitura Recomendada

1. [Visao Geral](./conceitos/visao-geral.md) - Entender o que o plugin faz
2. [Prioridades](./conceitos/prioridades.md) - Como as mecanicas interagem
3. [Referencia Rapida](./notetags/referencia-rapida.md) - Todas as notetags
4. Mecanica especifica conforme necessidade (Provoke, Taunt, Aggro)
5. Parametros conforme necessidade de configuracao

## Origem

Documento original: `planos/019-kit-killin/bodyquard/aggro-approuch/aggro-control-system.md`
