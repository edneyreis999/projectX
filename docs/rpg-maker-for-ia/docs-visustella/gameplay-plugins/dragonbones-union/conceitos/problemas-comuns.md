# DragonBones - Problemas Comuns e Soluções

## Visão Geral

Aqui estão alguns problemas comuns e soluções envolvendo armatures Dragonbones.

---

## 1. Armature FPS Desynchs

### Sintoma
Se múltiplas entidades têm armatures Dragonbones e podem executar animações uma após a outra e então retornar ao idle, elas podem dessincronizar entre si.

### Causas

1. **Armature Animation FPS não divide 60 cleanly**
   - RPG Maker MZ emite requisições de animação no frame
   - O problema de ordenação pode estar em um número não divisível para a armature

2. **Animation Timelines não terminam em números divisíveis por 60**
   - Nem todas as animações devem terminar em valores divisíveis
   - Esta ainda é a causa para dessincronização entre duas Armatures reproduzindo a mesma animação uma após a outra

3. **Tempos de Carregamento**
   - Às vezes RPG Maker MZ precisa de tempo para processar outras partes do jogo antes de continuar
   - Isso pode ser visto ao carregar novas imagens e/ou texturas para exibir e/ou animar
   - Tempos de carregamento são muito aleatórios e imprevisíveis
   - Não é culpa do plugin, da Armature ou do Dragonbones - é assim que os computadores funcionam

### Solução
Se você precisa garantir que entidades estejam sincronizadas, **evite situações onde carregar pictures ou animações são necessários**.

**Nota**: Naturalmente, isso não vai funcionar em batalha com todas as animações de batalha voando constantemente.

---

## 2. Particles Not Appearing

### Sintoma
Se suas armatures usam partículas, elas podem ou não aparecer in-game dependendo de como são enraizadas (rooted) para a Armature e usam modos de mistura normais.

### Causa
A biblioteca JavaScript fornecida por http://dragonbones.com/ conflita com a do Pixi às vezes quando se trata de manipular âncoras e modos de mistura.

### Solução
Certifique-se de que as partículas estão **enraizadas ao corpo (body) em vez da âncora (anchor)**.

---

## 3. "Unwanted" Animation Frames

### Sintoma
Se você está criando uma Action Sequence e faz sua Armature executar uma Dragonbones Animation vinculada a um motion, você pode obter "frames de animação indesejados" da pose "idle" de vez em quando.

### Causa
Isso acontece porque após a animação Dragonbones reproduzida terminar, um "Motion Refresh" ocorre conforme as instruções do corescript do RPG Maker MZ. Isso traz a Armature de volta para "idle".

### Solução
Você pode ajustar isso através do Plugin Parameter **"Idle Bypass"**.

---

## Links Relacionados

- [Visão Geral](./visao-geral.md) - Voltar para visão geral
- [Comportamentos](./comportamentos.md) - Comportamentos das armatures
- [Configuração Geral](../configuracao/general-settings.md) - Parâmetros relacionados
