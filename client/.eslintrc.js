module.exports = {
    root: true,
    env: {
      node: true,
      commonjs: true,
      es6: true,
      browser: true,
    },
    extends: [
      "eslint:recommended",
      "plugin:prettier/recommended",
    ],
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
    },
    ignorePatterns: ["dist/", "node_modules/"],
    rules: {},
  };