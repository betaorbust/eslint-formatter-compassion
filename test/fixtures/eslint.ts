export default [
    {
        filePath: '/some/dev/box/index.js',
        messages: [
            {
                ruleId: 'no-warning-comments',
                severity: 1,
                message: "Unexpected 'todo' comment.",
                line: 8,
                column: 2,
                nodeType: 'Line',
                source: '\t// TODO: fix this later'
            },
            {
                ruleId: 'no-multiple-empty-lines',
                severity: 2,
                message: 'More than 1 blank line not allowed.',
                line: 18,
                column: 2,
                nodeType: 'Program',
                source: ''
            }
        ],
        errorCount: 1,
        warningCount: 1
    },
    {
        filePath: '/some/dev/box/test.js',
        messages: [
            {
                ruleId: 'ava/use-test',
                severity: 2,
                message: 'AVA should be imported as `test`.',
                line: 1,
                column: 1,
                nodeType: 'ImportDeclaration',
                source: "import ava from 'ava';"
            }
        ],
        errorCount: 1,
        warningCount: 0
    },
    {
        filePath: '/some/dev/box/foo.js',
        messages: [
            {
                ruleId: 'no-warning-comments',
                severity: 1,
                message: "Unexpected 'todo' comment.",
                line: 8,
                column: 2,
                nodeType: 'Line',
                source: '\t// TODO: fix this later'
            }
        ],
        errorCount: 0,
        warningCount: 1
    }
];
