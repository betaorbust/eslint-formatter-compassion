import { RuleCollection } from './index';

const rules: RuleCollection = {
    'jsx-a11y/accessible-emoji': { context: ['http://bit.ly/2AdLU7o'] },
    'jsx-a11y/alt-text': { context: ['http://bit.ly/2AeEAbY'] },
    'jsx-a11y/anchor-has-content': { context: ['http://bit.ly/2AdtnIy'] },
    'jsx-a11y/anchor-is-valid': { context: ['http://bit.ly/2AdjhY0'] },
    'jsx-a11y/aria-activedescendant-has-tabindex': {
        context: ['http://bit.ly/2AfPsq1']
    },
    'jsx-a11y/aria-props': { context: ['http://bit.ly/2AdzRHf'] },
    'jsx-a11y/aria-proptypes': { context: ['http://bit.ly/2AffXf4'] },
    'jsx-a11y/aria-role': { context: ['http://bit.ly/2Ad4KMa'] },
    'jsx-a11y/aria-unsupported-elements': {
        context: ['http://bit.ly/2AdaIN5']
    },
    'jsx-a11y/click-events-have-key-events': {
        context: ['http://bit.ly/2Aefbir']
    },
    'jsx-a11y/heading-has-content': { context: ['http://bit.ly/2AdKE4f'] },
    'jsx-a11y/html-has-lang': { context: ['http://bit.ly/2AeEzEW'] },
    'jsx-a11y/iframe-has-title': { context: ['http://bit.ly/2AdEf9c'] },
    'jsx-a11y/img-redundant-alt': { context: ['http://bit.ly/2AdKDxd'] },
    'jsx-a11y/interactive-supports-focus': {
        context: ['http://bit.ly/2AdzSuN']
    },
    'jsx-a11y/label-has-for': { context: ['http://bit.ly/2AdBtkt'] },
    'jsx-a11y/lang': { context: ['http://bit.ly/2Ae6bcZ'] },
    'jsx-a11y/media-has-caption': { context: ['http://bit.ly/2AdEeCa'] },
    'jsx-a11y/mouse-events-have-key-events': {
        context: ['http://bit.ly/2AdE5Pp']
    },
    'jsx-a11y/no-access-key': { context: ['http://bit.ly/2AesejS'] },
    'jsx-a11y/no-autofocus': { context: ['http://bit.ly/2AewujD'] },
    'jsx-a11y/no-distracting-elements': { context: ['http://bit.ly/2Ad4Kf8'] },
    'jsx-a11y/no-interactive-element-to-noninteractive-role': {
        context: ['http://bit.ly/2AdzRXL']
    },
    'jsx-a11y/no-noninteractive-element-interactions': {
        context: ['http://bit.ly/2Adtow6']
    },
    'jsx-a11y/no-noninteractive-element-to-interactive-role': {
        context: ['http://bit.ly/2AdYnIp']
    },
    'jsx-a11y/no-noninteractive-tabindex': {
        context: ['http://bit.ly/2Ae6aFX']
    },
    'jsx-a11y/no-onchange': { context: ['http://bit.ly/2AdV6cc'] },
    'jsx-a11y/no-redundant-roles': { context: ['http://bit.ly/2AdV6Je'] },
    'jsx-a11y/no-static-element-interactions': {
        context: ['http://bit.ly/2AdYnbn']
    },
    'jsx-a11y/role-has-required-aria-props': {
        context: ['http://bit.ly/2AfebL1']
    },
    'jsx-a11y/role-supports-aria-props': { context: ['http://bit.ly/2AdUjHW'] },
    'jsx-a11y/scope': { context: ['http://bit.ly/2AcFRzZ'] },
    'jsx-a11y/tabindex-no-positive': { context: ['http://bit.ly/2AdaJAD'] }
};

export default {
    name: 'jsx-a11y',
    schema: 1,
    rules
};
