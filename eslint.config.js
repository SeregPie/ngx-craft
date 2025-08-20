import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import {defineConfig} from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig([
  stylistic.configs.customize({
    semi: true,
    arrowParens: true,
    jsx: false,
  }),
  {
    rules: {
      '@stylistic/object-curly-spacing': ['error', 'never'],
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: {js},
    languageOptions: {globals: {...globals.browser, ...globals.node}},
  },
  tseslint.configs.base,
  {
    files: ['**/*.json'],
    plugins: {json},
    language: 'json/json',
    extends: ['json/recommended'],
  },
  // {files: ["**/*.md"], plugins: {markdown}, language: "markdown/gfm", extends: ["markdown/recommended"]},
]);
