import assert from 'assert';
import eslint from './eslint';
import airbnb from './airbnb';
import importGuide from './import';
import react from './react';
import jsxA11y from './jsx-a11y';

type Rule = {
    message?: string;
    context?: Array<string>;
};

export type RuleCollection = {
    [index: string]: Rule;
};

export type GuideRuleType = {
    // eslint-disable-next-line no-restricted-globals
    name: string;
    schema: number;
    rules: RuleCollection;
};

const availableGuides: { [key: string]: GuideRuleType } = {
    eslint,
    airbnb,
    import: importGuide,
    react,
    'jsx-a11y': jsxA11y
};

export function mergeGuides(guides: Array<GuideRuleType>) {
    guides.forEach(guide => {
        assert((guide.schema = guides[0].schema), `Guide schemas must match`);
    });

    return guides
        .map(guide => guide.rules)
        .reduce((mergedData, rules) => Object.assign(mergedData, rules), {});
}

export default availableGuides;
