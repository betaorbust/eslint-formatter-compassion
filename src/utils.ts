import assert from 'assert';
import { GuideRuleType } from './guides/guide-types';

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
export function validateGuides(guides: Array<GuideRuleType>) {
    assert(Array.isArray(guides), 'Guides must be in an array.');
    assert(guides.length > 0, 'At least one guide must be provided.');
    guides.forEach(guide => {
        validateGuide(guide);
        assert(guide.schema === guides[0].schema, `Guide schemas must match.`);
    });
}

export function mergeGuides(guides: Array<GuideRuleType>) {
    validateGuides(guides);
    return guides.reduce(
        (mergedData, guide) => {
            mergedData.name += `-${guide.name}`;
            mergedData.rules = Object.assign(mergedData.rules, guide.rules);
            return mergedData;
        },
        {
            name: 'merged',
            schema: guides[0].schema,
            rules: {}
        }
    );
}
