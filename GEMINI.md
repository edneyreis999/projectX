# Documentação em `@frontend/docs/`

A documentação do projeto, especialmente a relacionada ao Game Design (GDD), está localizada no diretório `@frontend/docs/`. A estrutura visa organizar as informações de forma lógica e facilitar a navegação entre documentos inter-relacionados.

## Organização de Pastas

A estrutura de pastas segue uma hierarquia temática. Por exemplo:

-   `@frontend/docs/GDD/`: Contém todos os documentos de Game Design.
    -   `1-fundacao-narrativa/`: Pilares da história, como premissa e temas.
    -   `2-world-building/`: Detalhes sobre o mundo, raças, locais e magia.
    -   `templates/`: Modelos para criar novos documentos de GDD.
-   `@frontend/docs/Quests/`: Documentação específica de cada quest, incluindo diálogos e documentos técnicos.
-   `@frontend/docs/plugins/`: Guias e documentação para os plugins do RPG Maker MZ.

## Regras para Links

Para manter a consistência e a rastreabilidade, os links entre documentos devem seguir um padrão claro. A ideia é fornecer uma breve descrição ou citação do conteúdo relevante e, em seguida, um link para o arquivo de origem para quem desejar aprofundar.

### Exemplo de Link Correto

O arquivo `@frontend/docs/GDD/2-world-building/locais/distrito-residencial.info.md` demonstra a prática ideal. Ele agrega informações de várias fontes para construir a descrição de um local específico.

Observe como cada trecho de informação é apresentado:

1.  Uma citação direta ou um resumo do GDD.
2.  A tag `*Fonte:*` seguida por um link relativo para o arquivo Markdown de onde a informação foi extraída.

**Exemplo prático extraído do arquivo:**

```markdown
A cidade foi "esculpida na rocha", com vastos salões e túneis. Os pisos e paredes são escavados diretamente na rocha-mãe e polidos, e as paredes de pedra são frequentemente decoradas com painéis de madeira escura.
*Fonte: [gildrat-arquitetura-v2.md](../racas/anoes/gildrat-arquitetura-v2.md#2-assentamento-e-morfologia-urbana)*
```

Este método garante que:
-   O leitor tenha o contexto imediato.
-   A origem da informação seja facilmente verificável.
-   A navegação pela documentação seja intuitiva.

Ao criar ou editar documentos, siga este padrão para garantir que a base de conhecimento do projeto permaneça organizada e coesa.
