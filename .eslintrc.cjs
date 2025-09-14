module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
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
  ignorePatterns: [
    ".eslintrc.cjs",
    "commitlint.config.ts",
    "frontend/js/plugins.js",
    "frontend/js/plugins/PKD_HelpInMessages.js",
    "frontend/js/plugins/PKD_VisualChoices_MZ.js",
    "frontend/js/plugins/PKD_SimpleQuestSystem.js",
    "frontend/js/plugins/TAA_CharacterPoses.js",
    "frontend/js/plugins/PKD_AnimaX.js",
    "frontend/js/plugins/VisuMZ_*.js",
    "dist",
    "coverage",
    "node_modules",
  ],
  overrides: [
    {
      files: ['**/*.ts'],
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
      rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      files: ['**/*.js'],
      parser: require.resolve('espree'),
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: null,
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
    {
      // Ban CommonJS in migrated ESM layers
      files: ['frontend/js/domain/**/*.{ts,js}', 'frontend/js/application/**/*.{ts,js}', 'frontend/js/dto/**/*.{ts,js}', 'frontend/typescript/**/*.{ts,js}'],
      rules: {
        'no-restricted-globals': [
          'error',
          {
            name: 'module',
            message: 'CommonJS module object is banned in ESM layers. Use export/import instead.'
          },
          {
            name: 'exports',
            message: 'CommonJS exports object is banned in ESM layers. Use export/import instead.'
          }
        ],
        'no-restricted-syntax': [
          'error',
          {
            selector: 'CallExpression[callee.name="require"]',
            message: 'CommonJS require() is banned in ESM layers. Use import instead.'
          },
          {
            selector: 'AssignmentExpression[left.object.name="module"][left.property.name="exports"]',
            message: 'CommonJS module.exports is banned in ESM layers. Use export instead.'
          }
        ]
      }
    },
    {
      // Disable any-related rules for test files
      files: ['frontend/__tests__/typescript/**/*.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-implicit-any-return': 'off'
      }
    },
  ],
};
