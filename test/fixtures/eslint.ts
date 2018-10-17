import { ResultsType } from '../formatters/index';

const test: Array<ResultsType> = [
    {
        filePath: './some/dev/box/index.js',
        messages: [
            {
                ruleId: 'space-before-blocks',
                severity: 1,
                message: 'Unexpected chained assignment.',
                line: 8,
                column: 2,
                nodeType: 'Line',
                fatal: false
            },
            {
                ruleId: 'no-multi-assign',
                severity: 2,
                message: 'Unexpected chained assignment.',
                line: 18,
                column: 2,
                nodeType: 'Program',
                fatal: false
            },
            {
                ruleId: 'jsx-a11y/click-events-have-key-events',
                severity: 2,
                message:
                    'Visible, non-interactive elements with click handlers must have at least one keyboard listener.',
                line: 20,
                column: 4,
                nodeType: 'FunctionCall',
                fatal: false
            }
        ],
        errorCount: 1,
        fixableErrorCount: 0,
        warningCount: 1,
        fixableWarningCount: 0,
        source: 'something something something something\n'.repeat(200)
    }
];

export default test;
