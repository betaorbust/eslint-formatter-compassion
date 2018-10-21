const { expect } = require('chai');
const { mergeGuides, validateGuides } = require('../utils');

const guides = {
    guide1: {
        name: 'guide1',
        schema: 1,
        rules: {
            rule1: {
                context: ['link1', 'link2'],
                message: 'a message'
            }
        }
    },
    guide2: {
        name: 'guide2',
        schema: 1,
        rules: {
            rule1: {
                context: ['link3', 'link4'],
                message: 'a different message'
            },
            rule2: {
                context: ['link5, link6']
            }
        }
    },
    emptyGuide: {
        name: 'emptyGuide',
        schema: 1,
        rules: {}
    },
    missingName: {
        schema: 1,
        rules: {}
    },
    emptyName: {
        name: '',
        schema: 1,
        rules: {}
    },
    mismatchedSchema: {
        name: 'mismatchedSchema',
        schema: 42,
        rules: {}
    },
    invalidSchema: {
        name: 'invalidSchema',
        schema: 'invalid',
        rules: {}
    },
    missingRules: {
        name: 'missingRules',
        schema: 1
    },
    malformedRules: {
        name: 'malformedRules',
        schema: 1,
        rules: ['something']
    }
};

describe('utils', () => {
    describe('validateGuides', () => {
        it('validates that an array of guides was passed', () => {
            expect(() => {
                validateGuides('something');
            }).to.throw('Guides must be in an array.');
        });
        it('validates that an array of guides has at least one guide', () => {
            expect(() => {
                validateGuides([]);
            }).to.throw(/at least one guide/i);
        });
        it('validates a name exists', () => {
            expect(() => {
                validateGuides([guides.missingName]);
            }).throws(/must have.*name/);
            expect(() => {
                validateGuides([guides.emptyName]);
            }).throws(/must have.*name/);
        });
        it('validates schema', () => {
            expect(() => {
                validateGuides([guides.invalidSchema]);
            }).throws(/must have.*numeric schema/);
            expect(() => {
                validateGuides([guides.guide1, guides.mismatchedSchema]);
            }).throws(/Provided schema was.*but only versions.*are supported/);
        });
        it('validates rules', () => {
            expect(() => {
                validateGuides([guides.missingRules]);
            }).throws(/must have a rules property/);
            expect(() => {
                validateGuides([guides.malformedRules]);
            }).throws(/must be an object/);
        });
    });
    describe('mergeGuides', () => {
        it('validates guides', () => {
            expect(() => {
                mergeGuides([guides.missingRules]);
            }).throws(/must have a rules property/);
        });
        it('returns a single guide if only one provided', () => {
            const merged = mergeGuides([guides.guide1]);
            expect(merged.rules).to.deep.equal(guides.guide1.rules);
        });
        it('Appends names of merged guides', () => {
            expect(mergeGuides([guides.guide1, guides.guide2]).name).to.equal(
                'merged-guide1-guide2'
            );
        });
    });
});
