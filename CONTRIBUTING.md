# Contribuindo com Daratrine

As mensagens de commit e os pull requests devem registrar primeiro a mudança do ponto de vista do jogador. Detalhes de código continuam importantes, mas entram como contexto para explicar como a
experiência foi construída.

## Ativar o template de commit

Depois de clonar o repositório, execute uma vez, a partir de qualquer pasta do projeto:

```sh
git config --local commit.template "$(git rev-parse --show-toplevel)/.gitmessage"
```

O arquivo [`.gitmessage`](.gitmessage) será aberto pelo Git ao criar um commit sem a opção `-m`. Editores e clientes gráficos podem exigir que a criação do commit seja aberta no editor para exibir o
template.

O template de pull request em [`.github/pull_request_template.md`](.github/pull_request_template.md) é carregado automaticamente ao abrir um novo PR no GitHub.

## Princípio de escrita

Use esta ordem:

1. O que mudou para o jogador.
2. Por que isso melhora ou altera a experiência.
3. Como a mudança foi validada.
4. Quais decisões técnicas ou de design precisam ficar registradas.
5. Que imagens e momentos ajudam a contar essa história em um devlog.

Evite mensagens como `ajustes`, `polimento` ou `implementa sistema` sem explicar o resultado observável. Uma boa descrição permite que alguém entenda e demonstre a entrega sem precisar reconstruir a
intenção a partir do diff.

Quando uma alteração for apenas técnica, documental ou preparatória, declare que ela não muda diretamente a experiência atual e explique o que foi viabilizado. Nunca atribua ao jogador um benefício
que não foi observado ou validado.

## Exemplo curto de commit

```text
feat(combate): permite à Filena converter Momentum em turnos agressivos

Experiência do jogador:
- Antes: acumular Momentum não criava uma decisão clara de explosão.
- Agora: Filena pode gastar o recurso para antecipar uma sequência ofensiva.
- Por que importa: o jogador escolhe entre manter consistência ou acelerar o combate.

Validação:
- [x] A habilidade foi usada com TP baixo, médio e máximo em playtest.

Bastidores:
- A geração continua seguindo o TP Mode da Filena; a skill altera apenas o gasto e o efeito.

Material para devlog:
- Momento demonstrável: comparação do gauge ATB antes e depois da ativação.
- Captura sugerida: clipe curto mostrando o turno extra e o custo de Momentum.

Limitações:
- Números de balanceamento ainda podem mudar depois dos testes com chefes.
```
