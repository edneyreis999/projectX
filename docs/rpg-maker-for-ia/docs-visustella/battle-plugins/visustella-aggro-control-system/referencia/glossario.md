# Glossario

Termos e conceitos do Aggro Control System.

---

## Termos do Sistema

| Termo | Definicao |
|-------|-----------|
| **Aggro** | Valor numerico que determina probabilidade de ser atacado. Quanto maior, maior a chance. |
| **Provoke** | Mecanica baseada em states que forca o alvo a atacar apenas o provocador. |
| **Taunt** | Mecanica que redireciona acoes de tipo especifico para o taunter. |
| **Taunter** | Battler com efeito de Taunt ativo. |
| **Provoker** | Battler que aplicou o state de Provoke. |
| **Provoked** | Battler afetado por um state de Provoke. |

## Termos do RPG Maker MZ

| Termo | Definicao |
|-------|-----------|
| **Single Target** | Acao que afeta apenas um alvo (diferente de multi-target/area). |
| **Trait Object** | Objeto que pode conter traits: Actor, Class, Weapon, Armor, Enemy, State. |
| **State** | Condicao temporaria aplicada a um battler (buff, debuff, status). |
| **Notetag** | Tag especial no campo de notas do database para funcionalidades de plugins. |
| **Plugin Command** | Comando de evento que chama funcionalidade de plugin. |
| **SV Actor** | Side-View Actor, representacao visual do actor em batalha lateral. |

## Termos de Targeting

| Termo | Definicao |
|-------|-----------|
| **Weighted** | Selecao de alvo baseada em peso/probabilidade proporcional ao aggro. |
| **Highest** | Selecao de alvo SEMPE focando o membro com maior aggro. |
| **Bypass** | Ignorar uma mecanica de targeting (provoke, taunt, highest aggro). |
| **Priority** | Valor do state no database que determina qual provoke vence quando ha multiplos. |

## Tipos de Acao

| Tipo | Descricao |
|------|-----------|
| **Physical** | Acao fisica (ataque normal, skills fisicas). |
| **Magical** | Acao magica (spells). |
| **Certain Hit** | Acao que sempre acerta, ignora evasion. |

## Visuais

| Termo | Definicao |
|-------|-----------|
| **Provoke Line** | Linha animada conectando provocador ao provocado. |
| **Taunt Animation** | Animacao ciclica sobre battlers com taunt ativo. |
| **Aggro Gauge** | Barra visual mostrando aggro relativo do membro. |
