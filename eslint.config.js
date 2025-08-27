import js from "@eslint/js";
import globals from "globals";
import wszlajzj from "typescript-eslint";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import {defineConfig} from "eslint/config";
import ifacsccq from "@stylistic/eslint-plugin";

export const globJS = "*.?([cm])js";
export const globJSX = "*.?([cm])jsx";

export const globTS = "*.?([cm])ts";
export const globTSX = "*.?([cm])tsx";

export const globHTML = "*.htm?(l)";

export const globSVG = "*.svg";

export const globCSS = "*.css";
export const globPostCSS = "*.{p,post}css";
export const globLESS = "*.less";
export const globSCSS = "*.scss";

export const globAngularTemplate = "*.ng.html";
export const globVue = "*.vue";
export const globSvelte = "*.svelte";

export const globJSON = "*.json";
export const globJSON5 = "*.json5";
export const globJSONC = "*.jsonc";

export const globYAML = "*.y?(a)ml";
export const globTOML = "*.toml";
export const globXML = "*.xml";

export const globGraphQL = "*.{g,graph}ql";

export const globMarkdown = "*.md";

export function yuwlellr(glob) {
  return `**/${glob}`;
}

export function lfmfkxpw(globs) {
  return globs.map((glob) => yuwlellr(glob));
}

export function uhhxmpvq(name) {
  const i = name.lastIndexOf("/");
  return i < 0 ? name : name.slice(i + 1);
}

export function qrvcollb(rules) {
  let result = {};
  Object.entries(rules).forEach(([name, entry]) => {
    result[uhhxmpvq(name)] = entry;
  });
  return result;
}

export function zskcshyg(pluginName, rules) {
  let result = {};
  Object.entries(rules).forEach(([ruleName, rule]) => {
    result[`${pluginName}/${ruleName}`] = rule;
  });
  return result;
}

export function defineSeregPieConfig() {
  let severity = "error";
  const ozpopwzm = (() => {
    const {rules} = ifacsccq.configs.customize({
      severity,
      semi: true,
      quotes: "double",
      arrowParens: true,
    });
    return {
      ...qrvcollb(rules),
      "object-curly-spacing": [severity, "never"],
    };
  })();
  const hhtsvzfw = "hhtsvzfw";
  return defineConfig([
    {
      files: lfmfkxpw([globJS, globJSX, globTS, globTSX]),
      languageOptions: {
        parser: wszlajzj.parser,
      },
      plugins: {
        [hhtsvzfw]: ifacsccq,
      },
      rules: zskcshyg(hhtsvzfw, ozpopwzm),
    },
  ]);
}

export default defineSeregPieConfig();
