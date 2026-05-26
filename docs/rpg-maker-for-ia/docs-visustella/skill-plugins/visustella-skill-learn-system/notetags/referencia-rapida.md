# Referencia Rapida - Todas as Notetags

## Notetags por Destinatario

### Actor
| Notetag | Descricao |
|---------|-----------|
| `<Starting AP: x>` | AP inicial na classe padrao |
| `<Class id Starting AP: x>` | AP inicial por classe |
| `<Starting SP: x>` | SP inicial na classe padrao |
| `<Class id Starting SP: x>` | SP inicial por classe |

### Class
| Notetag | Descricao |
|---------|-----------|
| `<Learn Skill: id>` | Skill aprendivel (unica) |
| `<Learn Skills: id, id>` | Skills aprendiveis (multiplas) |
| `<Learn Skills> ... </Learn Skills>` | Skills aprendiveis (multi-linha) |

### Skill
| Notetag | Descricao |
|---------|-----------|
| `<Learn AP Cost: x>` | Custo AP |
| `<Learn SP Cost: x>` | Custo SP |
| `<Learn Gold Cost: x>` | Custo Gold |
| `<Learn CP Cost: x>` | Custo CP (requer ClassChangeSystem) |
| `<Learn JP Cost: x>` | Custo JP (requer ClassChangeSystem) |
| `<Learn Item id Cost: x>` | Custo em item |
| `<Learn Weapon id Cost: x>` | Custo em arma |
| `<Learn Armor id Cost: x>` | Custo em equipamento |
| `<Learn Skill Costs> ... </Learn Skill Costs>` | Custo composto |
| `<JS Learn AP Cost>` | Custo dinamico AP |
| `<JS Learn SP Cost>` | Custo dinamico SP |
| `<JS Learn CP Cost>` | Custo dinamico CP |
| `<JS Learn JP Cost>` | Custo dinamico JP |
| `<Learn Show Level: x>` | Nivel minimo para aparecer |
| `<Learn Show Skill: id>` | Skill pre-requisito (show) |
| `<Learn Show All/Any Skills: ...>` | Multiplas skills (show) |
| `<Learn Show Switch: x>` | Switch para aparecer |
| `<Learn Show All/Any Switches: ...>` | Multiplos switches (show) |
| `<JS Learn Show>` | Condicao show dinamica |
| `<JS Learn Show List Text>` | Texto custom (lista, show) |
| `<JS Learn Show Detail Text>` | Texto custom (detalhe, show) |
| `<Learn Require Level: x>` | Nivel minimo para habilitar |
| `<Learn Require Skill: id>` | Skill pre-requisito (require) |
| `<Learn Require All/Any Skills: ...>` | Multiplas skills (require) |
| `<Learn Require Switch: x>` | Switch para habilitar |
| `<Learn Require All/Any Switches: ...>` | Multiplos switches (require) |
| `<JS Learn Requirements>` | Condicao require dinamica |
| `<JS Learn Requirements List Text>` | Texto custom (lista, require) |
| `<JS Learn Requirements Detail Text>` | Texto custom (detalhe, require) |
| `<Learn Skill Animation: id>` | Animacao ao aprender |
| `<Learn Skill Fade Speed: x>` | Velocidade do fade-in |
| `<Learn Skill Picture: filename>` | Imagem customizada |
| `<JS On Learn Skill>` | Codigo JS ao aprender |

### Item (mesmas de Skill para ganho)
| Notetag | Descricao |
|---------|-----------|
| `<AP Gain: x>` / `<User AP Gain: x>` | Usuario ganha AP por hit |
| `<Target AP Gain: x>` | Alvo ganha AP por hit |
| `<SP Gain: x>` / `<User SP Gain: x>` | Usuario ganha SP por hit |
| `<Target SP Gain: x>` | Alvo ganha SP por hit |

### Enemy
| Notetag | Descricao |
|---------|-----------|
| `<AP: x>` | AP ao ser derrotado |
| `<SP: x>` | SP ao ser derrotado |

### Actor, Class, Weapon, Armor, State (Modificadores)
| Notetag | Descricao |
|---------|-----------|
| `<AP Plus: +x%>` | Modificador aditivo AP |
| `<AP Rate: x%>` | Modificador multiplicativo AP |
| `<AP Flat: +x%>` | Modificador flat AP |
| `<SP Plus: +x%>` | Modificador aditivo SP |
| `<SP Rate: x%>` | Modificador multiplicativo SP |
| `<SP Flat: +x%>` | Modificador flat SP |

## Variaveis JavaScript Disponiveis

| Notetag | Variaveis | Retorno |
|---------|-----------|---------|
| `<JS Learn AP/SP/CP/JP Cost>` | `user`, `skill` | `cost` (numero) |
| `<JS Learn Show>` | `user`, `skill` | `visible` (booleano) |
| `<JS Learn Show List/Detail Text>` | `user`, `skill` | `text` (string) |
| `<JS Learn Requirements>` | `user`, `skill` | `enabled` (booleano) |
| `<JS Learn Requirements List/Detail Text>` | `user`, `skill` | `text` (string) |
| `<JS On Learn Skill>` | `user`, `skill` | nenhum (acao) |
