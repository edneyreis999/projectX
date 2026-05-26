# Notetags - Animacao e Efeitos ao Aprender

## Animacoes de Aprendizado

### `<Learn Skill Animation: id>`
### `<Learn Skill Animation: id, id, id>`
- **Uso**: Skill Notetags
- Reproduz a(s) animacao(oes) quando a skill e aprendida pelo menu.
- **Sobrepoe** a animacao padrao dos Plugin Parameters.
- Se multiplas IDs, reproduz uma apos a outra na ordem listada.
- `id`: ID da animacao no banco de dados.

### `<Learn Skill Fade Speed: x>`
- **Uso**: Skill Notetags
- Velocidade do fade-in do icone da skill durante a animacao.
- Numeros menores = fade lento. Numeros maiores = fade rapido.

### `<Learn Skill Picture: filename>`
### `<Picture: filename>`
- **Uso**: Skill Notetags
- Usa uma imagem de `/img/pictures/` em vez do icone da skill.
- Nao incluir extensao do arquivo.
- Escala nao se aplica a imagem.
- `<Picture: filename>` funciona com outros plugins que usem essa notetag.

---

## Efeitos JavaScript ao Aprender

### `<JS On Learn Skill>`
```
 code
 code
 code
</JS On Learn Skill>`
```
- **Uso**: Skill Notetags
- Executa codigo JavaScript quando a skill e aprendida.
- **Aplica-se a qualquer aprendizado**: nivel natural OU pelo menu Skill Learn System.
- **Variaveis**:
  - `user`: ator que esta aprendendo
  - `skill`: skill sendo aprendida

---

## Exemplos

### Animacao customizada ao aprender Fireball:
```
<Learn Skill Animation: 50>
<Learn Skill Fade Speed: 20>
```

### Multiplos efeitos ao aprender:
```
<JS On Learn Skill>
 $gameVariables.setValue(10, $gameVariables.value(10) + 1);
 user.learnSkill(25);
</JS On Learn Skill>
```

### Imagem customizada:
```
<Learn Skill Picture: skill_fire>
```
