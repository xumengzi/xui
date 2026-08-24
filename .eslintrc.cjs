/**
 * xui 项目 ESLint 配置
 * 与 .prettierrc 保持一致：2 空格 / 单引号 / 无尾分号 / trailingComma=es5
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: false,
    },
  },
  rules: {
    indent: ['warn', 2, { SwitchCase: 1 }],
    'linebreak-style': ['warn', 'unix'],
    quotes: ['warn', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    semi: ['warn', 'never'],
    'comma-dangle': ['warn', 'only-multiline'],
    eqeqeq: ['warn', 'smart'],
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-empty': ['warn', { allowEmptyCatch: true }],
  },
  ignorePatterns: ['dist/', 'book/', '_book/', 'node_modules/', 'assets/xui.js'],
}
