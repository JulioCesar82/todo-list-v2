/* eslint-env node */

module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false,
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:storybook/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime'
  ],
  plugins: ['react'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    // Configuration for Vue files
    {
      files: ['packages/04-apps/vue-app/**/*.{js,vue}'],
      extends: ['plugin:vue/vue3-essential'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@babel/eslint-parser',
        sourceType: 'module',
        requireConfigFile: false,
      },
    },
    // Configuration for TypeScript files
    {
      files: ['packages/04-apps/angular-app/**/*.ts'],
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module',
        project: './packages/04-apps/angular-app/tsconfig.json',
      },
    },
  ],
};
