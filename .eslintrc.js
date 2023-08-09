const path = require('path')

module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "airbnb-base",
    "airbnb-typescript/base",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier"
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    // tsconfigRootDir: __dirname,
    sourceType: "module",
    project: path.join(__dirname, "tsconfig.json"),
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 2,
    "prettier/prettier": "error",
    "class-methods-use-this": "off",
    "no-debugger": "off",
    "no-console": 0,
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "ts": "never"
      }
   ]
  },
  plugins: [
    '@typescript-eslint',
    "prettier", 
    "import",
  ],
  ignorePatterns: [".eslintrc.js", "jest.config.ts"],
}