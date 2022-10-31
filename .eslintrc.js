module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    // DESC: 일단 off, 리팩토링하며 off된 rules 수정 예정
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    'react/button-has-type': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'no-void': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'consistent-return': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'max-len': 'off',
    'no-shadow': 'off',
    'object-curly-newline': 'off',
    'react/jsx-no-constructed-context-values': 'off',
    'no-unused-expressions': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'no-console': 'off',
  },
};