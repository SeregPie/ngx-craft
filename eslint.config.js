import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import {defineConfig} from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default defineConfig([
  /*
  await (async () => {
    const parser = await import('@typescript-eslint/parser');
    const {default: plugin} = await import('@stylistic/eslint-plugin');
    const {rules} = stylistic.configs.customize({
      semi: true,
      arrowParens: true,
      jsx: false,
    });
    return {};
  })(),
  */
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: {
      parser: tsParser,
    },
    ...(() => {
      const config = stylistic.configs.customize({
        semi: true,
        arrowParens: true,
        jsx: false,
      });
      return {
        ...config,
        rules: {
          ...config.rules,
          '@stylistic/object-curly-spacing': ['error', 'never'],
        },
      };
    })(),
  },

]);
