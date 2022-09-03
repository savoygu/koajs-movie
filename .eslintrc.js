module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  globals: {
    $: 'readonly'
  },
  ignorePatterns: ['node_modules/', 'public/libs/'],
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 13
  },
  rules: {
    'n/handle-callback-err': 'off'
  }
}
