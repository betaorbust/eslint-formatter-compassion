import { RuleCollection } from './index';

const rules: RuleCollection = {
    'prefer-const,': { context: ['http://bit.ly/2AexBjj'] },
    'no-const-assign': { context: ['http://bit.ly/2AexBjj'] },
    'no-var': { context: ['http://bit.ly/2AeG85M'] },
    'no-new-object': { context: ['http://bit.ly/2AegaiD'] },
    'object-shorthand': {
        context: ['http://bit.ly/2AdCr05', 'http://bit.ly/2AdyIj2']
    },
    'quote-props': { context: ['http://bit.ly/2AexBQl'] },
    'no-prototype-builtins': { context: ['http://bit.ly/2AdugRo'] },
    'no-array-constructor': { context: ['http://bit.ly/2AexCDT'] },
    'array-callback-return': { context: ['http://bit.ly/2AexCnn'] },
    'prefer-destructuring': {
        context: ['http://bit.ly/2AdF4yO', 'http://bit.ly/2AdXpvO']
    },
    quotes: { context: ['http://bit.ly/2AexDrr'] },
    'prefer-template': { context: ['http://bit.ly/2AdCusN'] },
    'template-curly-spacing': { context: ['http://bit.ly/2AexDHX'] },
    'no-eval': { context: ['http://bit.ly/2AexEeZ'] },
    'no-useless-escape': { context: ['http://bit.ly/2AdXq2Q'] },
    'func-style': { context: ['http://bit.ly/2AdNBC8'] },
    'wrap-iife': { context: ['http://bit.ly/2AdAX5P'] },
    'no-loop-func': { context: ['http://bit.ly/2AexFzz'] },
    'prefer-rest-params': { context: ['http://bit.ly/2AexFQ5'] },
    'no-new-func': { context: ['http://bit.ly/2AexF2x'] },
    'space-before-function-paren': { context: ['http://bit.ly/2AdZdVz'] },
    'space-before-blocks': {
        context: ['http://bit.ly/2AdZdVz', 'http://bit.ly/2AexHaF']
    },
    'no-param-reassign': {
        context: ['http://bit.ly/2Aegaz9', 'http://bit.ly/2AdcBt9']
    },
    'prefer-spread': { context: ['http://bit.ly/2AexHYd'] },
    'function-paren-newline': { context: ['http://bit.ly/2AexHHH'] },
    'prefer-arrow-callback,': { context: ['http://bit.ly/2Adk2jO'] },
    'arrow-spacing': { context: ['http://bit.ly/2Adk2jO'] },
    'arrow-parens,': { context: ['http://bit.ly/2Aduh7U'] },
    'arrow-body-style': { context: ['http://bit.ly/2AexILL'] },
    'arrow-parens': { context: ['http://bit.ly/2AexJ2h'] },
    'no-confusing-arrow': { context: ['http://bit.ly/2AdF4Pk'] },
    'implicit-arrow-linebreak': { context: ['http://bit.ly/2AdWFXC'] },
    'no-useless-constructor': { context: ['http://bit.ly/2AexJzj'] },
    'no-dupe-class-members': { context: ['http://bit.ly/2AexK6l'] },
    'no-iterator': { context: ['http://bit.ly/2Ae719D'] },
    'no-restricted-syntax': { context: ['http://bit.ly/2Ae719D'] },
    'generator-star-spacing': { context: ['http://bit.ly/2AdCuJj'] },
    'dot-notation': { context: ['http://bit.ly/2AexKDn'] },
    'no-restricted-properties.': { context: ['http://bit.ly/2AexLap'] },
    'no-undef': { context: ['http://bit.ly/2AdXqjm'] },
    'prefer-const': { context: ['http://bit.ly/2AeG8CO'] },
    'one-var': { context: ['http://bit.ly/2AexLHr'] },
    'no-multi-assign': { context: ['http://bit.ly/2AexMet'] },
    'no-unused-vars': { context: ['http://bit.ly/2AegaPF'] },
    eqeqeq: { context: ['http://bit.ly/2AexMLv'] },
    'no-case-declarations': { context: ['http://bit.ly/2AexNix'] },
    'no-nested-ternary': { context: ['http://bit.ly/2AdAXml'] },
    'no-unneeded-ternary': { context: ['http://bit.ly/2AfgnlJ'] },
    'no-mixed-operators': { context: ['http://bit.ly/2AexNPz'] },
    'nonblock-statement-body-position': { context: ['http://bit.ly/2Ad5wsy'] },
    'brace-style': { context: ['http://bit.ly/2AexOmB'] },
    'no-else-return': { context: ['http://bit.ly/2AfhAcG'] },
    'spaced-comment': { context: ['http://bit.ly/2AexOTD'] },
    indent: { context: ['http://bit.ly/2Adk2Ak'] },
    'keyword-spacing': { context: ['http://bit.ly/2AexPa9'] },
    'space-infix-ops': { context: ['http://bit.ly/2AebJnX'] },
    'padded-blocks': { context: ['http://bit.ly/2AexPXH'] },
    'space-in-parens': { context: ['http://bit.ly/2AdF55Q'] },
    'array-bracket-spacing': { context: ['http://bit.ly/2AexQLf'] },
    'object-curly-spacing': { context: ['http://bit.ly/2AexQuJ'] },
    'max-len': { context: ['http://bit.ly/2AdWGe8'] },
    'block-spacing': { context: ['http://bit.ly/2AdCuZP'] },
    'comma-spacing': { context: ['http://bit.ly/2AexRyN'] },
    'computed-property-spacing': { context: ['http://bit.ly/2AeG8Tk'] },
    'func-call-spacing': { context: ['http://bit.ly/2AexS5P'] },
    'key-spacing': { context: ['http://bit.ly/2AdNC9a'] },
    'no-trailing-spaces': { context: ['http://bit.ly/2AexSml'] },
    'no-multiple-empty-lines': { context: ['http://bit.ly/2Aegb6b'] },
    'comma-style': { context: ['http://bit.ly/2AexT9T'] },
    'comma-dangle': { context: ['http://bit.ly/2AfgnCf'] },
    semi: { context: ['http://bit.ly/2AdyKYc'] },
    'no-new-wrappers': {
        context: [
            'http://bit.ly/2AexTGV',
            'http://bit.ly/2AexTXr',
            'http://bit.ly/2AdcC0b'
        ]
    },
    radix: { context: ['http://bit.ly/2AexTXr'] },
    'id-length': { context: ['http://bit.ly/2AdLxd5'] },
    camelcase: { context: ['http://bit.ly/2AexV1v'] },
    'new-cap': { context: ['http://bit.ly/2AebJEt'] },
    'no-underscore-dangle': { context: ['http://bit.ly/2AexUKZ'] }
};

export default {
    name: 'airbnb',
    schema: 1,
    rules
};
