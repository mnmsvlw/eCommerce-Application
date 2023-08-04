const path = require('path')

module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es2021: true
  },
  extends: ['standard-with-typescript', 'eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    tsconfigRootDir: __dirname,
    sourceType: "module",
    project: path.join(__dirname, "tsconfig.json"),
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 2,
    '@typescript-eslint/no-var-requires': 'off',
    "@typescript-eslint/no-empty-function": "off"
  },
  plugins: [
    '@typescript-eslint'

  ],
  ignorePatterns: [".eslintrc.js", "jest.config.ts"],
}