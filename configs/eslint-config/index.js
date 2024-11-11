const stylisticPluginJs = require("@stylistic/eslint-plugin-js");
const typescriptPlugin = require("@typescript-eslint/eslint-plugin");
const typescriptParser = require("@typescript-eslint/parser");
const configPrettier = require("eslint-config-prettier");
const pluginImport = require("eslint-plugin-import");
const pluginTurbo = require("eslint-plugin-turbo");
const pluginUnusedImports = require("eslint-plugin-unused-imports");
const pluginVue = require("eslint-plugin-vue");
const vueParser = require("vue-eslint-parser");

const configGlobalIgnore = {
  ignores: [
    "**/node_modules/*",
    "**/dist/*",
    "**/storybook-static/*"
  ]
};

const configForCommon = {
  files: ["**/*.{js,jsx,ts,tsx}"],
  plugins: {
    turbo: pluginTurbo,
    import: pluginImport,
    "unused-imports": pluginUnusedImports,
    "@stylistic/js": stylisticPluginJs
  },
  rules: {
    ...pluginTurbo.configs.recommended.rules,
    "import/order": [
      "error",
      { alphabetize: { order: "asc", caseInsensitive: true } },
    ],
    "unused-imports/no-unused-imports": "error",
    "@stylistic/js/eol-last": ["error", "always"]
  }
};

const configForTypeScript = {
  files: ["**/*.{ts,tsx}"],
  languageOptions: {
    parser: typescriptParser
  },
  plugins: {
    "@typescript-eslint": typescriptPlugin
  },
  rules: {
    ...typescriptPlugin.configs.recommended.rules,
    ...typescriptPlugin.configs["eslint-recommended"].overrides[0].rules,
    curly: "error",
    "@typescript-eslint/no-unused-vars": "off"
  }
};

const configForVueSFC = {
  files: ["**/*.vue"],
  languageOptions: {
    parser: vueParser,
    parserOptions: {
      parser: typescriptParser,
      sourceType: "module",
      extraFileExtensions: [".vue"],
    },
  },
  plugins: {
    vue: pluginVue
  },
  rules: {
    ...pluginVue.configs['flat/recommended'].rules,
  }
}

const configForTestAndStories = {
  files: ["**/*.test.{js,jsx,ts,tsx}", "**/*.stories.{js,jsx,ts,tsx}"],
  plugins: {
    "@typescript-eslint": typescriptPlugin
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "off"
  }
};

const eslintConfigs = [
  configGlobalIgnore,
  configForCommon,
  configForTypeScript,
  configForVueSFC,
  configForTestAndStories,
];

/**
 * - filesに指定した拡張子に対して、配列の上から設定が適用され、重複したruleは後方のもので上書きされる
 * - prettierの設定はeslintの設定より後に宣言する必要がある
 */
module.exports = [...eslintConfigs, configPrettier];
