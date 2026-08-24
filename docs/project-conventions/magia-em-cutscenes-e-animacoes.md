---
title: "Convenção — ‘Está faltando Magia’ em cutscenes e animações"
type: project-convention
status: accepted
date: "2026-08-24"
decision_scope: "Feedback perceptivo sobre apresentação audiovisual"
---

# “Está faltando Magia” em cutscenes e animações

## Significado

Quando o feedback sobre uma cutscene ou animação disser que **“está faltando Magia”**, “Magia” é uma expressão de direção e acabamento perceptivo. Significa que a cena está sem capricho, sem graça, seca ou pouco atraente para uma pessoa que a experimenta.

Nesse uso, “Magia” não significa necessariamente magia literal do universo de Daratrine, Mana, poder de personagem ou efeito sobrenatural canônico. A implementação não deve introduzir lore, habilidade ou fenômeno mágico apenas por causa dessa frase.

## Como responder ao feedback

O responsável pela cena deve identificar quais recursos podem tornar o momento mais vivo e memorável sem esconder o fato narrativo ou retirar clareza do jogador. Conforme o beat, isso pode envolver:

- staging e movimento corporal com intenção;
- enquadramento, foco, zoom, pausa, antecipação e reação;
- animação, troca de sprite ou expressão;
- som, silêncio, impacto e transição;
- falas menores e ritmo mais natural;
- contraste entre preparação, clímax e cleanup;
- participação ou reação de personagens presentes.

Não é obrigatório usar todos esses recursos. A menor composição capaz de valorizar o momento é preferível a uma pilha de efeitos sem hierarquia.

## Critério de aceite

A cena atende ao feedback quando uma avaliação humana consegue:

1. identificar o momento de interesse e o que mudou;
2. sentir intenção, energia e ritmo, em vez de apenas observar comandos funcionais;
3. acompanhar o fato principal sem efeitos competindo com texto, input ou orientação espacial;
4. perceber começo, clímax e encerramento, sem câmera, áudio, UI ou locks residuais;
5. distinguir acabamento expressivo de uma afirmação nova sobre o cânone.

Validação estrutural pode provar que movimentos, efeitos e cleanup existem, mas não prova que a cena ganhou “Magia”. Esse aceite exige observação humana no runtime.

## Exemplo de aplicação

Na cena em que Thorin equipa o elmo da estátua, “faltava Magia” porque a troca de equipamento era funcional, porém seca para um momento especial. A resposta aprovada combina falas breves, recuo físico, aproximação de câmera, efeito de transformação, troca de skin já vinculada ao elmo, reação cômica e retorno explícito da câmera. A referência de energia é “O Máscara”, sem transformar o elmo em objeto mágico canônico.

## Fontes consultadas e conflitos

- `docs/GDD/00_Foundation/00.1_Core_Concept/Core _Concept.md`: narrativa cativante, humor e referência a “máscara”.
- `docs/GDD/00_Foundation/00.3_Tone_Vibe/Tone_Vibe.md`: separa o registro onírico/mágico canônico do registro pragmático e cômico.
- `docs/domains/scene-presentation-designer/README.md`: staging, câmera, timing, cleanup e validação humana.
- `docs/project-conventions/scene-routing-ex-vn.md`: preserva a cena física curta no mapa EX.
- `docs/Quests/2-semifinal/semifinal.cutscene.md`, `.dialogos.md` e `.audio.md`: contratos específicos do primeiro caso materializado.

O feedback de 2026-08-24 substituiu, apenas no beat do elmo, a direção anterior de câmera discreta, zoom máximo de 110%, ausência de shake e confirmação dependente de nova interação. Permanecem válidos o cânone, a origem não mágica do elmo, a pressa de Thorin e a obrigação de cleanup.
