module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['prettier', 'simple-import-sort'],
    rules: {
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'never'],
        'prettier/prettier': 'error',
        'simple-import-sort/sort': 'error',
        'sort-imports': 'off',
        'import/order': 'off',
    },
}