module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'next/core-web-vitals',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', 'prettier'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'object-shorthand': 'off',
  },
  overrides: [
    {
      files: ['**/cypress/*.ts'],
      parserOptions: {
        project: ['cypress/tsconfig.json'],
      },
      extends: ['plugin:cypress/recommended'],
    },
  ],
}
