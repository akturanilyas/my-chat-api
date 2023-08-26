module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'prettier'
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts']
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/']
      },
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json'
      }
    }
  },
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    'arrow-parens': ['error', 'as-needed'],
    'no-trailing-spaces': 'error',
    'import/extensions': 'off',
    'max-len': [
      'error',
      {
        'code': 100,
        'tabWidth': 2,
        'ignoreComments': true,
        'ignoreStrings': true
      }
    ],
    'import/no-extraneous-dependencies': ['error', {'devDependencies': true}],
    '@typescript-eslint/no-explicit-any': 'error',
    'import/no-cycle': ['off'],
    'no-empty-interface': 'off',
    'class-methods-use-this': 'off',
    radix: 'off',
    'import/prefer-default-export': 'off',
    'no-unused-expressions': 'off',
    'no-restricted-imports': ['error', 'import1', 'import2'],
    'camelcase': 'off',
    'no-await-in-loop': 'off',
    'no-restricted-syntax': 'off',
    'no-non-null-assertion': 'off',
    'eol-last': ['error', 'always'],
    'lines-between-class-members': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'warn',
    'linebreak-style': ['error', 'unix'],
    'no-unreachable': 'error',
    'no-underscore-dangle': 'off',
    'consistent-return': 'off',
    'newline-before-return': 'error'
  }
};
