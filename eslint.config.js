// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');
const ngrxPlugin = require('@ngrx/eslint-plugin');

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      prettierConfig,
      ngrxPlugin.configs['@ngrx/recommended']
    ],
    plugins: {
      prettier: prettierPlugin,
      eslintPluginNgrx: ngrxPlugin.configs['@ngrx/eslint-plugin'], //check
    },
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
      'prettier/prettier': 'error', // Enforce Prettier formatting as lint errors
      '@typescript-eslint/no-explicit-any': 'error', // Forbid usage of 'any'\
      '@ngrx/no-store-subscription': 'error', // Forbid usage of store subscription
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);
