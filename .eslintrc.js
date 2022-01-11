module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['airbnb-base'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jxs', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', './', './src'],
      },
      typescript: {},
    },
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'import/no-import-module-exports': 'off',
    'implicit-arrow-linebreak': 'off',
    'operator-linebreak': 'off',
    'import/extensions': [
      'warn',
      'never',
      {
        json: 'always',
        css: 'always',
        scss: 'always',
      },
    ],
    'import/prefer-default-export': 'off',
  },
  ignorePatterns: ['build/*'],
};
