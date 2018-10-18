import assert from 'assert';
import { GuideRuleType } from './guides/guide-types';

export function mergeGuides(guides: Array<GuideRuleType>) {
    guides.forEach(guide => {
        assert((guide.schema = guides[0].schema), `Guide schemas must match`);
    });

    return guides
        .map(guide => guide.rules)
        .reduce((mergedData, rules) => Object.assign(mergedData, rules), {});
}
