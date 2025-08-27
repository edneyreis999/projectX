module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-case": [1, "never", "pascal-case"],
    "type-enum": [
      2,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
        "bump",
      ],
    ],
  },
  prompt: {
    // só perguntar o necessário
    skipQuestions: [
      "scope",
      "body",
      "isBreaking",
      "breakingBody",
      "breaking",
      "issuesBody",
      "issues",
    ],
    questions: {
      type: {
        description: "Selecione o tipo de mudança que está comitando",
        enum: {
          feat: { description: "✨ Nova funcionalidade", title: "Features", emoji: "✨" },
          fix: { description: "🐞 Correção de bug", title: "Bug Fixes", emoji: "🐞" },
          docs: { description: "📝 Alterações de documentação", title: "Documentation", emoji: "📝" },
          style: { description: "🎨 Estilo (formatação, etc.)", title: "Styles", emoji: "🎨" },
          refactor: { description: "🧰 Refatoração (sem mudança de comportamento)", title: "Refactor", emoji: "🧰" },
          perf: { description: "⚡ Melhoria de performance", title: "Performance", emoji: "⚡" },
          test: { description: "✅ Adição/ajuste de testes", title: "Tests", emoji: "✅" },
          build: { description: "🏗️ Build ou dependências", title: "Builds", emoji: "🏗️" },
          ci: { description: "⚙️ Configuração de CI", title: "CI", emoji: "⚙️" },
          chore: { description: "🧹 Tarefas diversas (sem mudar src/test)", title: "Chores", emoji: "🧹" },
          revert: { description: "⏪ Reverte um commit", title: "Reverts", emoji: "⏪" },
          bump: { description: "⏭️ Promover versão", title: "Bumps", emoji: "⏭️" },
        },
      },
      subject: {
        description: "Escreva uma descrição curta, no imperativo",
      },
      // Usando uma pergunta sim/não existente para cumprir o requisito
      // (padrão é "não"). Não dispara perguntas adicionais pois estão em skipQuestions.
      isIssueAffected: {
        description: "Você alterou o arquivo system.json do jogo?",
        default: false,
      },
    },
  },
};