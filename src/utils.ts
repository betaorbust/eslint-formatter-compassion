import assert from 'assert';
import {
    GuideRuleType,
    GuideCollection,
    ResolvedRule
} from './guides/guide-types';
import { MessageType } from './formatters/formatter-types';

// Current supported versions of the schema in this release
const SUPPORTED_SCHEMA_VERSIONS = new Set([1]);

// Want to detect if an object is an object.
function isPojo(obj: object) {
    if (obj === null || typeof obj !== 'object') {
        return false;
    }
    return Object.getPrototypeOf(obj) === Object.prototype;
}

// Validate a single guide
function validateGuide(guide: GuideRuleType) {
    assert(
        typeof guide.name === 'string' && guide.name.trim() !== '',
        'Guides must have a non-empty name property.'
    );
    assert(
        typeof guide.schema === 'number',
        'Guides must have a numeric schema value'
    );
    assert(
        SUPPORTED_SCHEMA_VERSIONS.has(guide.schema),
        `Provided schema was "${guide.schema}", but only versions ${Array.from(
            SUPPORTED_SCHEMA_VERSIONS
        )
            .map(v => `"${v}"`)
            .join(',')} are supported.`
    );

    assert(
        guide.rules && isPojo(guide.rules),
        'Guides must have a rules property and it must be an object'
    );
}

/**
 *  Validates that all guides in an array are well-formed and have matching schemas
 *
 *  @param {Object[]} guides An array of Guide objects to validate.
 */
export function validateGuides(guides: GuideCollection) {
    assert(Array.isArray(guides), 'Guides must be in an array.');
    assert(guides.length > 0, 'At least one guide must be provided.');
    guides.forEach(guide => {
        validateGuide(guide);
        assert(guide.schema === guides[0].schema, `Guide schemas must match.`);
    });
}

// Make sure we only validate a guide once.
const validatedGuides = new WeakSet();

export function resolveGuideDataForMessage(
    incomingMessage: MessageType,
    guides: GuideCollection
): ResolvedRule {
    // Make sure we only validate a collection of guides once.
    if (!validatedGuides.has(guides)) {
        validateGuides(guides);
        validatedGuides.add(guides);
    }

    const unmodifiedResults: ResolvedRule = {
        message: incomingMessage.message,
        context: []
    };

    const { ruleId } = incomingMessage;
    // Work from last guide towards the front.
    const guideValues: Partial<ResolvedRule> = {};
    for (let i = guides.length - 1; i >= 0; i -= 1) {
        const guide = guides[i];
        // If we have a match in this guide
        if (ruleId && guide.rules[ruleId]) {
            if (!guideValues.message && guide.rules[ruleId].message) {
                guideValues.message = guide.rules[ruleId].message;
            }
            if (!guideValues.context && guide.rules[ruleId].context) {
                guideValues.context = guide.rules[ruleId].context;
            }
            if (guideValues.message && guideValues.context) {
                break;
            }
        }
    }

    return Object.assign(unmodifiedResults, guideValues);
}
