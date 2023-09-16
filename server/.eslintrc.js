module.exports = {
  root: true,
  plugins: ["prettier", "unused-imports"],
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 2022,
  },
  rules: {
    // Errors
    "no-dupe-keys": "error",
    "no-dupe-args": "error",
    "no-dupe-class-members": "error",
    "no-dupe-else-if": "error",
    "no-duplicate-case": "error",
    "no-duplicate-imports": "error",
    "default-param-last": "error",
    "no-sequences": "error",
    "no-prototype-builtins": "error",
    "brace-style": "error",
    "no-unused-expressions": "error",
    "unused-imports/no-unused-imports": "error",
    "no-undef": "error",
    "no-redeclare": "error",
    "no-var": "error",
    "no-empty": "error",
    "array-callback-return": "error",
    "constructor-super": "error",
    "for-direction": "error",
    "no-cond-assign": "error",
    "no-const-assign": "error",
    "no-constant-condition": "error",
    "no-constant-binary-expression": "error",
    "no-ex-assign": "error",
    "valid-typeof": "error",
    "use-isnan": "error",
    "no-use-before-define": "error",

    // Warnings
    "no-inner-declarations": "warn",
    "unused-imports/no-unused-vars": "warn",

    // Setting Prettier
    "prettier/prettier": ["error", { parser: "flow" }],

    // Off
    "no-unused-vars": "off",
    eqeqeq: "off",
    "no-throw-literal": "off",
    camelcase: "off",
    "no-async-promise-executor": "off",
    "prefer-promise-reject-errors": "off",
  },
  globals: {
    global_app_config: true,
    app_root_path: true,
    app_config: true,
    mqtt_client_id: true,
    mqtt_connection_ok: true,
    mqtt_client: true,
    influx_connection_ok: true,
    global_influx: true,
    localBrokerStatus: true,
    activeTrolleyList: true,
    activeBarcodeList: true,
  },
};
