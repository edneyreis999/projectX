# Regras

* Sempre que faltar informação, pergunte.
* O comando Balão (balloon de expressão) não pode ser executado entre os comandos `start_dialog` e `finish_dialog`.
* Durante os diálogos, as expressões dos atores devem ser representadas por alterações no busto.
* Colocar um "Inicio" e "Fim" de diálogo antes de adicionar ou remover os bustos.
* Sempre que um comando de `move to`, `invisibilidade` ou `turn` for usado, os bustos devem sair da tela.
* O busto do personagem correspondente sempre deve aparecer quando ele falar.
* Sempre aplicar `wait` em comandos de rota de movimento; se houver vários comandos de rota seguidos, aplique o `wait` apenas no último da sequência.
* Toda ação de rota de movimento seguida e com o mesmo personagem deve ser condensada em um único comando.
* As falas devem estar em português e com acento quando necessário.
* Sempre analise a necessidade do `Auto-Reverse` em `h_mirror` para os bustos.
* O arquivo de saída deve ter o nome da cena e "Implementacao".
* Usar o TF8 para preservar os acentos e pontuação nanos detalhes das ações de `talk`