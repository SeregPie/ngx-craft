import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import {defineConfig} from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export const globJS = '*.?([cm])js';
export const globJSX = '*.?([cm])jsx';

export const globTS = '*.?([cm])ts';
export const globTSX = '*.?([cm])tsx';

export const globHTML = '*.htm?(l)';

export const globSVG = '*.svg';

export const globCSS = '*.css';
export const globPostCSS = '*.{p,post}css';
export const globLESS = '*.less';
export const globSCSS = '*.scss';

export const globSvelte = '*.svelte';
export const globVue = '*.vue';

export const globJSON = '*.json';
export const globJSON5 = '*.json5';
export const globJSONC = '*.jsonc';

export const globYAML = '*.y?(a)ml';
export const globTOML = '*.toml';
export const globXML = '*.xml';

export const globGraphQL = '*.{g,graph}ql';

export const globMarkdown = '*.md';

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
    files: ['*.{js,mjs,cjs,ts,mts,cts}'],
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
