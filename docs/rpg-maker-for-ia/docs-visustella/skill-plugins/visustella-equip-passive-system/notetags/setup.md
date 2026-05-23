# Notetags - Setup

Notetags de configuração definem quais passivos cada actor/class pode aprender, custo de capacidade, e state inicial.

## State Notetags (configuração do passivo)

### Custo de Capacidade

```xml
<Equip Passive Cost: x>
```
- Define o custo de Passive Capacity do passivo
- Se omitido, usa o valor padrão do Plugin Parameter

### Ícone e Nome Customizados

```xml
<Equip Passive Icon: x>
<Equip Passive Name: name>
```
- Altera ícone e nome exibidos no menu de passivos
- Útil para ocultar ícone na lista de states normal

### Help Description

```xml
<Help Description>
  texto de ajuda
</Help Description>
```
- Texto exibido no help window ao selecionar o passivo
- Melhor resultado com apenas uma linha

### Branching (desbloqueio em cadeia)

```xml
<!-- Aprende diretamente quando este passivo é aprendido -->
<Branch Learn Equip Passive: id>
<Branch Learn Equip Passives: id, id, id>

<!-- Adiciona à lista learnable quando este passivo é aprendido -->
<Branch Learnable Equip Passive: id>
<Branch Learnable Equip Passives: id, id, id>
```
- Apenas State Notetags
- Target passives não precisam estar na lista learnable

## Actor/Class Notetags (listagem)

### Learnable Passives

```xml
<!-- Por ID -->
<Learnable Equip Passive: id>
<Learnable Equip Passives: id, id, id>

<!-- Por Nome -->
<Learnable Equip Passive: name>
<Learnable Equip Passives: name, name, name>

<!-- Múltiplas linhas -->
<Learnable Equip Passives>
  name
  name
  name
</Learnable Equip Passives>
```
- Adiciona passivos à lista de aprendizável do actor
- Actor/Class Notetags
- **NÃO** coloca no Skill Learn System; apenas no menu Passives com condições de unlock

### Pre-Learned (já aprendidos ao entrar no party)

```xml
<!-- Aprendido mas não equipado -->
<Learned Equip Passive: id>
<Learned Equip Passives: id, id, id>

<!-- Aprendido E equipado -->
<Already Equip Passive: id>
<Already Equip Passives: id, id, id>
```
- Apenas Actor Notetags
- Não precisam estar na lista learnable

## Skill Notetags (link com skills)

```xml
<!-- Quando esta skill é aprendida, também aprende o passivo -->
<Link Learn Equip Passive: id>
<Link Learn Equip Passives: id, id, id>

<!-- Quando esta skill é aprendida, adiciona passivo como learnable -->
<Link Learnable Equip Passive: id>
<Link Learnable Equip Passives: id, id, id>
```
- Skill Notetags
- Target passives não precisam estar na lista learnable
