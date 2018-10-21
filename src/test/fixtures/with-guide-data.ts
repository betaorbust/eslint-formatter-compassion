import { fillResults } from '../test-utils';
import { RuleCollection } from '../../guides/guide-types';
import { MessageType } from '../../formatters/formatter-types';

export const guide: RuleCollection = {
    'changed-message': {
        message: 'A provided message'
    },
    'with-context': {
        context: ['https://some/context.for/you']
    },
    'with-multi-context': {
        context: ['https://some.context', 'https://some.other/context']
    }
};

const withContext = fillResults([
    {
        filePath: 'foo.js',
        messages: <Array<MessageType>>[
            {
                message: 'This should have some context',
                ruleId: 'with-context',
                severity: 2
            }
        ],
        source: 'something',
        errorCount: 1,
        warningCount: 0
    }
]);

const withMultipleContext = fillResults([
    {
        filePath: 'foo.js',
        messages: <Array<MessageType>>[
            {
                message: 'This should have some context',
                ruleId: 'with-multi-context',
                severity: 2
            }
        ],
        source: 'something',
        errorCount: 1,
        warningCount: 0
    }
]);

const withMessageOverride = fillResults([
    {
        filePath: 'foo.js',
        messages: <Array<MessageType>>[
            {
                message: 'This message should not be seen',
                ruleId: 'changed-message',
                severity: 2
            }
        ],
        source: 'something',
        errorCount: 1,
        warningCount: 0
    }
]);

export const testCaseResults = {
    withContext,
    withMultipleContext,
    withMessageOverride
};
