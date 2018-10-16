import { RuleCollection } from './index';

const rules: RuleCollection = {
    'import/no-unresolved': { context: ['http://bit.ly/2QRH9Gj'] },
    'import/named': { context: ['http://bit.ly/2QRXtqo'] },
    'import/default': { context: ['http://bit.ly/2QUQLjw'] },
    'import/namespace': { context: ['http://bit.ly/2QRXv1u'] },
    'import/no-restricted-paths': { context: ['http://bit.ly/2QVqKk9'] },
    'import/no-absolute-path': { context: ['http://bit.ly/2QRXvyw'] },
    'import/no-dynamic-require': { context: ['http://bit.ly/2QP5tbQ'] },
    'import/no-internal-modules': { context: ['http://bit.ly/2QRXvP2'] },
    'import/no-webpack-loader-syntax': { context: ['http://bit.ly/2QSI5Ki'] },
    'import/no-self-import': { context: ['http://bit.ly/2QRXxq8'] },
    'import/no-cycle': { context: ['http://bit.ly/2QRuP8X'] },
    'import/no-useless-path-segments': { context: ['http://bit.ly/2QRXz1e'] },
    'import/no-relative-parent-imports': { context: ['http://bit.ly/2QVqKAF'] },
    'import/export': { context: ['http://bit.ly/2QRXACk'] },
    'import/no-named-as-default': { context: ['http://bit.ly/2QXeq2Z'] },
    'import/no-named-as-default-member': { context: ['http://bit.ly/2QRXBpS'] },
    'import/no-deprecated': { context: ['http://bit.ly/2QVlMUj'] },
    'import/no-extraneous-dependencies': { context: ['http://bit.ly/2QRXCtW'] },
    'import/no-mutable-exports': { context: ['http://bit.ly/2QWVCAR'] },
    'import/unambiguous': { context: ['http://bit.ly/2QRXDy0'] },
    'import/no-commonjs': { context: ['http://bit.ly/2QRXEC4'] },
    'import/no-amd': { context: ['http://bit.ly/2QUQLQy'] },
    'import/no-nodejs-modules': { context: ['http://bit.ly/2QRXFG8'] },
    'import/first': { context: ['http://bit.ly/2QRXhaE'] },
    'import/exports-last': { context: ['http://bit.ly/2QRXJ8Q'] },
    'import/no-duplicates': { context: ['http://bit.ly/2QVapMq'] },
    'import/no-namespace': { context: ['http://bit.ly/2QRXKJW'] },
    'import/extensions': { context: ['http://bit.ly/2QPr4ki'] },
    'import/order': { context: ['http://bit.ly/2QRXM4w'] },
    'import/newline-after-import': { context: ['http://bit.ly/2QRuPFZ'] },
    'import/prefer-default-export': { context: ['http://bit.ly/2QRXNW8'] },
    'import/max-dependencies': { context: ['http://bit.ly/2QVqL7H'] },
    'import/no-unassigned-import': { context: ['http://bit.ly/2QRXPgI'] },
    'import/no-named-default': { context: ['http://bit.ly/2QVaqjs'] },
    'import/no-anonymous-default-export': {
        context: ['http://bit.ly/2QRXQkM']
    },
    'import/group-exports': { context: ['http://bit.ly/2QWVDop'] },
    'import/no-default-export': { context: ['http://bit.ly/2QRXSsU'] },
    'import/no-named-export': { context: ['http://bit.ly/2QPr4Rk'] },
    'import/dynamic-import-chunkname': { context: ['http://bit.ly/2QRXSZW'] }
};

export default {
    name: 'import',
    schema: 1,
    rules
};
