# Action Sequences - Inject

Comandos de Action Sequence do tipo INJECT para injeção de spritesheet animations em battlers. Acessíveis pelo **Battle Core**.

**Requer**: `VisuMZ_3_ActSeqImpact`

---

## Animation Begin

```
INJECT: Animation Begin
```

Injeta e reproduz uma spritesheet animation completa no battler. A animação roda sobre o battler até terminar. O sprite original do battler fica invisível durante a animação.

| Parâmetro | Descrição |
|-----------|-----------|
| Targets | Unidade(s) para injetar a animação |
| Filename | Arquivo da spritesheet (localizado em `/img/sv_actors/`) |
| Horizontal Cells | Quantidade de colunas na spritesheet |
| Vertical Cells | Quantidade de linhas na spritesheet |
| Frame Delay | Frames entre cada célula (controla velocidade) |
| Smooth Bitmap? | Suavizar o gráfico da spritesheet? |
| Offset X | Deslocamento X. Negativo: esquerda. Positivo: direita |
| Offset Y | Deslocamento Y. Negativo: cima. Positivo: baixo |

### Comportamento

- A animação **substitui visualmente** o sprite do battler enquanto executa
- O sprite original **fica invisível** até a animação terminar
- Arquivos de spritesheet ficam em `/img/sv_actors/`
- Frame Delay controla velocidade: mais frames = mais lento

---

## Animation End

```
INJECT: Animation End
```

Para e encerra qualquer animação injetada nos target(s). A animação é terminada prematuramente.

| Parâmetro | Descrição |
|-----------|-----------|
| Targets | Unidade(s) para parar animações injetadas |

---

## Animation Pause/Resume

```
INJECT: Animation Pause/Resume
```

Pausa ou retoma animações injetadas nos target(s).

| Parâmetro | Descrição |
|-----------|-----------|
| Targets | Unidade(s) para pausar/retomar animações |
| Pause? | Pausar a animação injetada? |

---

## Wait For Injected Animation

```
INJECT: Wait For Injected Animation
```

Espera as animações injetadas completarem antes de executar o próximo comando da Action Sequence.

**Não possui parâmetros adicionais.**

### Quando Usar

Use este comando quando precisar que a sequência aguarde a conclusão de uma animação injetada antes de prosseguir. Sem ele, os próximos comandos executam imediatamente enquanto a animação ainda roda.
