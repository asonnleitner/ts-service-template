module.exports = {
  root: true,
  extends: 'standard-with-typescript',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json'
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off'
  },
  ignorePatterns: ['dist']
}
