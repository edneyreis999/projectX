# Procedimento técnico: mover e fixar um evento no RPG Maker MZ

Objetivo: ao interagir com um NPC, mover outro evento até uma coordenada, definir sua direção final, impedir movimento autônomo e manter sua posição após sair e retornar ao mapa.

## Escopo

Edite apenas o arquivo `frontend/data/MapXXX.json` autorizado. Antes de alterar:

1. Feche o RPG Maker MZ para impedir sobrescrita do JSON.
2. Faça parse do JSON.
3. Confirme IDs, posição inicial e páginas dos eventos envolvidos.
4. Confirme que `VisuMZ_1_EventsMoveCore` está ativo em `frontend/js/plugins.js`.

## Estrutura recomendada

Use:

- Evento A: NPC que dispara a cena.
- Evento B: personagem que se moverá.
- Variável livre: estado persistente da cena.
- Events & Movement Core: `Move To: X, Y`.
- Notetag no evento B: `<Save Event Location>`.

## Fluxo do evento A

No evento do NPC, crie um ramo condicional:

```text
Se Variável[estado] == 0:
  Mostrar Mensagem
  Controlar Variável[estado] = 1
  Definir Rota de Movimento: Evento B
    Script: Move To: X, Y
    Virar para Cima
Fim
```

Regras da rota:

```json
{
  "repeat": false,
  "skippable": false,
  "wait": false,
  "list": [
    { "code": 45, "parameters": ["Move To: X, Y"] },
    { "code": 19 },
    { "code": 0 }
  ]
}
```

O comando `205` deve apontar para o ID do evento B. Cada item interno da rota deve ter o respectivo `code: 505` espelhado na lista de comandos do evento.

## Página fixa do evento B

Adicione uma página acima da página padrão, condicionada a `Variável[estado] >= 1`.

Configure essa página com:

- `moveType: 0` — imóvel;
- direção `8` — para cima;
- mesma imagem, prioridade e colisão da página base;
- lista vazia, terminada por `code: 0`.

A página base pode manter `moveType: 1` caso o personagem deva andar aleatoriamente antes da cena.

## Persistência

No campo `note` do evento B, inclua:

```text
<Save Event Location>
```

Isso usa o Events & Movement Core para restaurar a posição do evento quando o jogador voltar ao mapa.

## Validação obrigatória

1. O JSON continua válido.
2. A variável escolhida está livre e não conflita com outra quest.
3. A rota aponta para o evento correto.
4. O destino e a direção final estão corretos.
5. A rota só ocorre na primeira interação.
6. O evento não volta ao movimento aleatório depois de chegar.
7. O evento permanece na posição final após sair e retornar ao mapa.
8. Playtest no RPG Maker MZ sem erros no console.
