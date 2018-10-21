const { expect } = require('chai');
const { resolveGuideDataForMessage, validateGuides } = require('../utils');

const guides = {
    guide1: {
        name: 'guide1',
        schema: 1,
        rules: {
            rule1: {
                context: ['link1', 'link2'],
                message: 'a message'
            },
            rule2: {
                message: 'a message from rule 1'
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
            },
            rule3: {
                context: ['link7', 'link8']
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
    describe('resolveGuideDataForMessage', () => {
        it('validates the guides', () => {
            expect(() => {
                resolveGuideDataForMessage({}, [guides.missingRules]);
            }).throws(/must have a rules property/);
        });
        it('returns the first match for a rule from the ordered list of guides', () => {
            const output = resolveGuideDataForMessage(
                {
                    ruleId: 'rule1',
                    message: 'some message'
                },
                [guides.guide1, guides.guide2]
            );
            expect(output.message).to.equal(guides.guide2.rules.rule1.message);
            expect(output.context).to.deep.equal(
                guides.guide2.rules.rule1.context
            );
        });
        it('returns the first context match and the first message match independently', () => {
            const output = resolveGuideDataForMessage(
                {
                    ruleId: 'rule2',
                    message: 'some message'
                },
                [guides.guide1, guides.guide2]
            );
            expect(output).to.deep.equal({
                context: guides.guide2.rules.rule2.context,
                message: guides.guide1.rules.rule2.message
            });
        });
        it('Returns input message with augmented context if no messages resolved', () => {
            const output = resolveGuideDataForMessage(
                {
                    ruleId: 'rule3',
                    message: 'Input message'
                },
                [guides.guide1, guides.guide2]
            );
            expect(output).to.deep.equal({
                context: guides.guide2.rules.rule3.context,
                message: 'Input message'
            });
        });
        it('Returns the input message and empty context when no guides match', () => {
            const rulePartial = {
                ruleId: 'unmatchedId',
                message: 'Input message'
            };
            const output = resolveGuideDataForMessage(rulePartial, [
                guides.guide1
            ]);
            expect(output).to.deep.equal({
                message: rulePartial.message,
                context: []
            });
        });
    });
});
