module.exports = {
    env: { mocha: true },
    extends: require.resolve('../.eslintrc.js'),
    rules: {
        'no-unused-expressions': 'off',
        'no-console': 'off'
    }
};
