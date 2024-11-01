/** @type {import("eslint").Linter.Config} */

import eslintPluginAstro from "eslint-plugin-astro"
import jsxA11y from "eslint-plugin-jsx-a11y"

export default [
  {
    ignores: [
      "dist/",
      ".github/",
      "node_modules/",
      ".vscode/",
      "**/temp.js",
      "config/*",
    ],
  },
  ...eslintPluginAstro.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    rules: {},
  },
  {
    files: ["*.astro"],
    parser: "astro-eslint-parser",
    parserOptions: {
      parser: "@typescript-eslint/parser",
      extraFileExtensions: [".astro"],
    },
    rules: {},
  },
]