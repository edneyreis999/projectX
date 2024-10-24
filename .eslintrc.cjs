module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.cjs", "commitlint.config.ts",
    "frontend/js/plugins/PKD_SimpleQuestSystem.js", 
    "frontend/js/plugins/VisuMZ_0_CoreEngine.js", 
    "frontend/js/plugins/VisuMZ_1_MessageCore.js"
  ],
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      files: ['*.js'],
      parser: 'espree',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      rules: {
        'prettier/prettier': [
          'error',
          {
            endOfLine: 'auto',
            singleQuote: true,
            printWidth: 200,
            arrowParens: 'avoid',
            bracketSpacing: true,
          },
        ],
      },
    },
  ],
};