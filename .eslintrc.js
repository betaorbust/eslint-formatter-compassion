module.exports = {
    extends: ['airbnb-base', 'prettier'],
    parser: 'typescript-eslint-parser',
    parserOptions: {
        ecmaFeatures: {
            impliedStrict: true
        }
    },

    rules: {
        'import/prefer-default-export': 'off',
        'import/no-unresolved': 'off',
        'no-param-reassign': 'off',
        'no-undef': 'off', // typescript will handle this for us
        'no-unused-vars': 'off'
        // 'import/no-extraneous-dependencies': [
        //     'error',
        //     { devDependencies: ['src/test/**/*', '**/*.spec.js'] }
        // ]
    }
};
