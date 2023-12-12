module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'react-hooks', 'jsx-a11y', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off', //app을 안써도 됨
    'react/jsx-uses-react': 'off', // jsx에서 리액트 안써도 됨
    'react-hooks/rules-of-hooks': 'error', //훅에 관련된 에러 잡아달라고
    'react-hooks/exhaustive-deps': 'off', // 끄는걸 권장
    'react/prop-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off', // 끄고 하는게 좋음(any 남발 x)
    'prettier/prettier': 'error',
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  settings: {
    react: { version: 'detect' }, // 리액트 업그레이트해도 보호해줌
  },
};
