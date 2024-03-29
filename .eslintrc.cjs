module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true
    },
    extends: ['standard', 'eslint-config-standard-with-typescript', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
      project: './tsconfig.eslint.json'
    },
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        'prettier/prettier': 'error',
        "@typescript-eslint/no-extraneous-class": "error",
        "@typescript-eslint/strict-boolean-expressions": 0
    }
  }
