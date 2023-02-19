module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: [
        'airbnb-base',
        'plugin:@typescript-eslint/recommended',
        'prettier'
    ],
    ignorePatterns: ['**/tests/*.ts'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
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
                moduleDirectory: ['node_modules', 'src/'],
            },
            typescript: {
                alwaysTryTypes: true,
                project: './tsconfig.json'
            }
        }
    },
    rules: {
        '@typescript-eslint/explicit-module-boundary-types': ['error'],
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
        'import/no-extraneous-dependencies': ["error", {"devDependencies": true}],
        '@typescript-eslint/no-explicit-any': "off",
        'import/no-cycle': ['off'],
        radix: 'off',
        'import/prefer-default-export': 'off',
        "no-restricted-imports": ["error", "import1", "import2"]
    }
};
