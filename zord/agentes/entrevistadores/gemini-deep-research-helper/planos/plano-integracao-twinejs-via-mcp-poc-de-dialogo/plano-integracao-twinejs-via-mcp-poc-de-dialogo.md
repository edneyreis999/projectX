# Integração TwineJS via MCP: PoC de diálogo

## Objetivo e contexto

- Objetivo: Criar uma PoC em Node.js (VS Code como cliente MCP) que recebe um diálogo de dois personagens e gera um HTML jogável do Twine (Harlowe ou SugarCube), orquestrado por um servidor MCP.

## Perguntas de pesquisa

1. Existe um provedor MCP oficial (ou de terceiros) para TwineJS? Onde está o repositório e como é a interface (schemas, métodos, ferramentas)?
2. Quais story formats (Harlowe, SugarCube) estão melhor suportados via fluxo programático/CLI (Tweego), e qual é mais conveniente para a PoC?
3. Quais são as melhores práticas para converter um diálogo estruturado (JSON) em passagens Twine (Twee), incluindo metadados (tags, links, estilos)?
4. Como integrar o compilador (Tweego) no servidor MCP Node.js de forma robusta (portabilidade, logs, erros, performance)?
5. Quais capacidades adicionais fazem sentido expor via MCP para Twine (ex.: criar/editar passagens, compilar, validar links, importar/exportar histórias, pré-visualizar)?

## Metodologia

- Abordagem:
  - Verificar existência e maturidade de um provedor MCP para Twine/TwineJS (issues, documentação, exemplos). Se viável, usar/estender.
  - Manter a PoC simples, mas extensível (Harlowe por padrão; opção para SugarCube).
- Critérios de inclusão/exclusão:
  - Incluir soluções com CLI/SDK estáveis, licença permissiva, com exemplos de uso.
  - Excluir ferramentas abandonadas ou que exijam fluxos proprietários sem opção de automação.
- Métricas de sucesso:
  - Entrada: JSON de diálogo de dois personagens.
  - Saída: HTML Twine funcional, com passagens navegáveis e identificação de falas/personagens.
  - Facilidade de integração com cliente MCP no VS Code (ex.: Cline/Claude Dev).

## Estratégia de fontes e verificação

- Buscas sugeridas:
  - "twine mcp", "twinejs mcp", "model context protocol twine"
  - "tweego twine compile cli", "twee to html twine"
  - Repositórios GitHub de provedores MCP e exemplos com Node.js (`@modelcontextprotocol/sdk`).
- Triangulação:
  - Conferir README e schemas das ferramentas MCP encontradas.
  - Validar compatibilidade com story formats (Harlowe/SugarCube) usando Tweego.
  - Testar localmente a PoC com casos simples e checagem de links/passagens.

## Design da PoC (Node.js + MCP)

- Cliente MCP: VS Code usando um cliente compatível com MCP (ex.: Cline ou Claude Dev para VS Code).
- Servidor MCP custom (caso não haja provedor pronto):
  - Dependências: `@modelcontextprotocol/sdk`, `execa` (ou similar) para chamar o Tweego.
  - Binário: Tweego instalado localmente (ou containerizado). Story formats instalados.
  - Ferramenta MCP: `twine_generate_dialog`.
    - Entrada (exemplo):

      ```json
      {
        "title": "Conversa de Exemplo",
        "format": "Harlowe", // ou "SugarCube"
        "characters": ["Ana", "Bruno"],
        "dialog": [
          { "speaker": "Ana", "text": "Oi, Bruno!" },
          { "speaker": "Bruno", "text": "Oi, Ana. Tudo bem?" },
          { "speaker": "Ana", "text": "Tudo sim!" }
        ],
        "outputPath": "./dist/conversa-exemplo.html"
      }
      ```

    - Saída:

      ```json
      {
        "htmlPath": "./dist/conversa-exemplo.html",
        "format": "Harlowe",
        "passageCount": 3
      }
      ```

  - Conversão JSON → Twee (estratégia simples):
    - Uma passagem por fala, com links de "Próximo" encadeando passagens.
    - Tags por personagem (ex.: `#Ana`, `#Bruno`) e título da história.
    - Estilo básico inline para destacar o nome do personagem.
  - Compilação Twee → HTML:
    - Chamar `tweego -o dist/<arquivo>.html --format <Harlowe|SugarCube> temp/story.twee`.
    - Capturar stdout/stderr e expor no retorno em caso de erro.

### Esqueleto de servidor (ilustrativo)

```ts
// src/server.ts
import { Server } from "@modelcontextprotocol/sdk/server";
import { z } from "zod";
import { execa } from "execa";
import fs from "node:fs/promises";
import path from "node:path";

const GenerateDialogSchema = z.object({
  title: z.string().default("Dialogo"),
  format: z.enum(["Harlowe", "SugarCube"]).default("Harlowe"),
  characters: z.array(z.string()).min(2),
  dialog: z.array(z.object({ speaker: z.string(), text: z.string() })).min(1),
  outputPath: z.string().default("./dist/dialogo.html")
});

function toTwee(input: z.infer<typeof GenerateDialogSchema>) {
  const slug = input.title.replace(/\s+/g, "-").toLowerCase();
  const header = `:: StoryTitle\n${input.title}\n`;
  const passages = input.dialog.map((d, i) => {
    const name = `P${i + 1}`;
    const next = i < input.dialog.length - 1 ? `[[Próximo->P${i + 2}]]` : "";
    const tags = `#${d.speaker}`;
    const body = `''${d.speaker}:'' ${d.text}\\n\\n${next}`;
    return `:: ${name} [${tags}]\n${body}\n`;
  });
  return [header, ...passages].join("\n");
}

async function compileWithTweego(twee: string, out: string, format: "Harlowe" | "SugarCube") {
  const tmpDir = path.join(process.cwd(), ".twine-tmp");
  await fs.mkdir(tmpDir, { recursive: true });
  const tweePath = path.join(tmpDir, "story.twee");
  await fs.writeFile(tweePath, twee, "utf-8");
  await fs.mkdir(path.dirname(out), { recursive: true });
  const formatFlag = format === "SugarCube" ? "sugarcube-2" : "harlowe-3";
  await execa("tweego", ["-o", out, "--format", formatFlag, tweePath]);
  return out;
}

const server = new Server({ name: "twine-mcp", version: "0.1.0" });

server.tool("twine_generate_dialog", {
  description: "Gera HTML Twine a partir de um diálogo simples",
  inputSchema: GenerateDialogSchema,
  handler: async (input) => {
    const twee = toTwee(input);
    const htmlPath = path.resolve(input.outputPath);
    const out = await compileWithTweego(twee, htmlPath, input.format);
    return { htmlPath: out, format: input.format, passageCount: input.dialog.length };
  },
});

server.start();
```

## Possibilidades de uso (MCP + Twine)

- Geração de histórias: criar passagens automaticamente a partir de prompts/estruturas (diálogo, cenas, escolhas) e compilar para HTML.
- Edição incremental: ferramentas MCP para adicionar/renomear/editar passagens, tags, e links; validação de links quebrados.
- Importação/Exportação: ler HTML/Twee existentes, converter para estrutura manipulável e reemitir versões compiladas.
- Formatação/estilo: aplicar templates, CSS, macros (principalmente em SugarCube) para estilos e HUD.
- Testes e QA: varredura de grafos de passagens, cobertura de choices, checagem de finais alcançáveis.
- Integrações: salvar/abrir projetos, publicar outputs, anexar assets (imagens/áudio), ou rodar Tweego em container.

## Resultados esperados e critérios de aceitação

- HTML jogável gerado (Harlowe como padrão), com passagens encadeadas representando o diálogo de dois personagens.
- Ferramenta MCP `twine_generate_dialog` utilizável via cliente no VS Code.
- Documentação mínima de uso (exemplo de input e comando/integração com cliente MCP).
- Alternativa para SugarCube facilmente habilitável.
