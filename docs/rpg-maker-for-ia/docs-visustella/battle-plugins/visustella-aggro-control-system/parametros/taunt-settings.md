# Parametros - Taunt Settings

Configuracoes visuais do sistema de Taunt. Requer **VisuMZ_0_CoreEngine** e **VisuMZ_1_BattleCore** para funcionar.

---

## Requisito

```
VisuMZ_0_CoreEngine & VisuMZ_1_BattleCore
```

---

## Configuracoes Principais

### Show Animations?

| Propriedade | Valor |
|-------------|-------|
| **Tipo** | Boolean |
| **Padrao** | - |
| **Descricao** | Mostrar animacoes para cada tipo de taunt? |
| **Requer** | VisuMZ_0_CoreEngine e VisuMZ_1_BattleCore |

---

## Animation ID's

IDs das animacoes reproduzidas em battlers com taunt.

### Physical Taunt
- **Tipo**: Number
- **Descricao**: Animation ID usada para taunts fisicos
- **Valor especial**: `0` ou `None` para desabilitar este tipo

### Magical Taunt
- **Tipo**: Number
- **Descricao**: Animation ID usada para taunts magicos
- **Valor especial**: `0` ou `None` para desabilitar este tipo

### Certain Hit Taunt
- **Tipo**: Number
- **Descricao**: Animation ID usada para taunts certain hit
- **Valor especial**: `0` ou `None` para desabilitar este tipo

---

## Animation Settings

Configuracoes de reproducao das animacoes de taunt.

### Cycle Time
- **Tipo**: Number (frames)
- **Descricao**: Quantidade de frames de espera entre cada ciclo de animacao
- **WARNING**: Numeros baixos podem prejudicar a performance do jogo

### Mirror Actor Ani?
- **Tipo**: Boolean
- **Descricao**: Espelhar animacoes reproduzidas em actors?

### Mute Animation SFX?
- **Tipo**: Boolean
- **Descricao**: Silenciar sons reproduzidos pelas animacoes?

---

## Resumo

| Parametro | Tipo | Categoria |
|-----------|------|-----------|
| Show Animations? | Boolean | Principal |
| Physical Taunt | Number (Anim ID) | Animation IDs |
| Magical Taunt | Number (Anim ID) | Animation IDs |
| Certain Hit Taunt | Number (Anim ID) | Animation IDs |
| Cycle Time | Number (frames) | Animation Settings |
| Mirror Actor Ani? | Boolean | Animation Settings |
| Mute Animation SFX? | Boolean | Animation Settings |
