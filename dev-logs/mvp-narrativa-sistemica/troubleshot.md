# Troubleshooting — Mapa de Teste da Narrativa Sistêmica

## 2025-11-02 — Validação com Playwright

- **Problema:** Não consegui executar o fluxo “Novo Jogo” via MCP Playwright. O ambiente atual não oferece comando ou integração disponível para disparar o teste automatizado solicitado.
- **Impacto:** Execução automatizada de QA pendente; testes precisam ser realizados manualmente no RPG Maker até que o MCP seja configurado.
- **Solução adotada:** Registrei a limitação e mantive a validação via script de JSON. É necessário configurar o MCP Playwright na estação ou fornecer instruções atualizadas para completar esse passo.

### Aprendizados até o momento
- Vale manter uma rotina de validação de JSON automatizada (`npm run validate:json`) para garantir que o RPG Maker aceite as alterações sem corromper arquivos minificados.
- Scripts de evento em `Map021.json` funcionam bem com `Plugin Command: Script`, permitindo lógica condicional sem depender de Common Events.
- Registrar limitações (como a ausência do MCP Playwright) em `troubleshot.md` ajuda a não perder contexto quando o ambiente for configurado futuramente.
