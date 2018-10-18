/**
 * @fileoverview Tests for codeframe reporter.
 * @author Vitor Balocco
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { assert } from 'chai';
import path from 'path';
import stripAnsi from 'strip-ansi';
import { guide, testCaseResults } from '../fixtures/with-guide-data';

import { ResultsType, MessageType } from '../../formatters/formatter-types';

import { fillResults } from '../utils';
import formatter from '../../../src/formatters/codeframe';

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

describe('formatter:codeframe', () => {
    describe('when passed no messages', () => {
        const code = <Array<Partial<ResultsType>>>[
            {
                filePath: 'foo.js',
                messages: [],
                errorCount: 0,
                warningCount: 0
            }
        ];

        it('should return nothing', () => {
            const result = formatter(fillResults(code), guide);

            assert.strictEqual(result, '');
        });
    });

    describe('when passed a single warning message', () => {
        const code = fillResults([
            {
                filePath: path.join(process.cwd(), 'lib', 'foo.js'),
                source: 'var foo = 1;\n var bar = 2;\n',
                messages: <Array<MessageType>>[
                    {
                        message: 'Unexpected foo.',
                        severity: 1,
                        line: 1,
                        column: 5,
                        ruleId: 'foo'
                    }
                ],
                errorCount: 0,
                warningCount: 1,
                fixableErrorCount: 0,
                fixableWarningCount: 0
            }
        ]);

        it('should return a string in the correct format for warnings', () => {
            const result = formatter(code, guide);
            assert.strictEqual(
                stripAnsi(result),
                [
                    `warning: Unexpected foo at ${path.join(
                        'lib',
                        'foo.js'
                    )}:1:5`,
                    'Rule: foo',
                    '> 1 | var foo = 1;',
                    '    |     ^',
                    '  2 |  var bar = 2;',
                    '  3 | ',
                    '\n',
                    '1 warning found.'
                ].join('\n')
            );
        });

        describe('when the warning is fixable', () => {
            beforeEach(() => {
                code[0].fixableWarningCount = 1;
            });

            it('should return a string in the correct format', () => {
                const result = formatter(code, guide);
                assert.strictEqual(
                    stripAnsi(result),
                    [
                        `warning: Unexpected foo at ${path.join(
                            'lib',
                            'foo.js'
                        )}:1:5`,
                        'Rule: foo',
                        '> 1 | var foo = 1;',
                        '    |     ^',
                        '  2 |  var bar = 2;',
                        '  3 | ',
                        '\n',
                        '1 warning found.',
                        '1 warning potentially fixable with the `--fix` option.'
                    ].join('\n')
                );
            });
        });
    });

    describe('when passed a single error message', () => {
        const code = fillResults([
            {
                filePath: path.join(process.cwd(), 'lib', 'foo.js'),
                source: 'var foo = 1;\n var bar = 2;\n',
                messages: <Array<MessageType>>[
                    {
                        message: 'Unexpected foo.',
                        severity: 2,
                        line: 1,
                        column: 5,
                        ruleId: 'foo'
                    }
                ],
                errorCount: 1,
                warningCount: 0
            }
        ]);

        it('should return a string in the correct format for errors', () => {
            const result = formatter(code, guide);

            assert.strictEqual(
                stripAnsi(result),
                [
                    `error: Unexpected foo at ${path.join(
                        'lib',
                        'foo.js'
                    )}:1:5`,
                    'Rule: foo',
                    '> 1 | var foo = 1;',
                    '    |     ^',
                    '  2 |  var bar = 2;',
                    '  3 | ',
                    '\n',
                    '1 error found.'
                ].join('\n')
            );
        });
    });

    describe("when passed a message that ends with ' .'", () => {
        const code = fillResults([
            {
                filePath: 'foo.js',
                messages: <Array<MessageType>>[
                    {
                        ruleId: 'foo',
                        message: 'Unexpected .',
                        severity: 2
                    }
                ],
                source: 'foo',
                errorCount: 1,
                warningCount: 0
            }
        ]);

        it("should return a string in the correct format (retaining the ' .')", () => {
            const result = formatter(code, guide);

            assert.strictEqual(
                stripAnsi(result),
                `error: Unexpected . at foo.js:1:1\nRule: foo\n> 1 | foo\n    | ^\n\n\n1 error found.`
            );
        });
    });

    describe('when passed multiple messages', () => {
        const code = fillResults([
            {
                filePath: 'foo.js',
                source: 'const foo = 1\n',
                messages: <Array<MessageType>>[
                    {
                        message: 'Missing semicolon.',
                        severity: 2,
                        line: 1,
                        column: 14,
                        ruleId: 'semi'
                    },
                    {
                        message: "'foo' is assigned a value but never used.",
                        severity: 2,
                        line: 1,
                        column: 7,
                        ruleId: 'no-unused-vars'
                    }
                ],
                errorCount: 2,
                warningCount: 0
            }
        ]);

        it('should return a string with multiple entries', () => {
            const result = formatter(code, guide);

            assert.strictEqual(
                stripAnsi(result),
                [
                    'error: Missing semicolon at foo.js:1:14',
                    'Rule: semi',
                    '> 1 | const foo = 1',
                    '    |              ^',
                    '  2 | ',
                    '\n',
                    "error: 'foo' is assigned a value but never used at foo.js:1:7",
                    'Rule: no-unused-vars',
                    '> 1 | const foo = 1',
                    '    |       ^',
                    '  2 | ',
                    '\n',
                    '2 errors found.'
                ].join('\n')
            );
        });
    });

    describe('when passed one file with 1 message and fixes applied', () => {
        const code = fillResults([
            {
                filePath: 'foo.js',
                messages: <Array<MessageType>>[
                    {
                        ruleId: 'no-unused-vars',
                        severity: 2,
                        message: "'foo' is assigned a value but never used.",
                        line: 4,
                        column: 11
                    }
                ],
                errorCount: 1,
                warningCount: 0,
                source: '    const foo = 1;',
                output:
                    'function foo() {\n\n    // a comment\n    const foo = 1;\n}\n\n'
            }
        ]);

        it('should return a string with code preview pointing to the correct location after fixes', () => {
            const result = formatter(code, guide);

            assert.strictEqual(
                stripAnsi(result),
                [
                    "error: 'foo' is assigned a value but never used at foo.js:4:11",
                    'Rule: no-unused-vars',
                    '  2 | ',
                    '  3 |     // a comment',
                    '> 4 |     const foo = 1;',
                    '    |           ^',
                    '  5 | }',
                    '  6 | ',
                    '  7 | ',
                    '\n',
                    '1 error found.'
                ].join('\n')
            );
        });
    });

    describe('when passed multiple files with 1 message each', () => {
        const code = fillResults([
            {
                filePath: 'foo.js',
                source: 'const foo = 1\n',
                messages: <Array<MessageType>>[
                    {
                        message: 'Missing semicolon.',
                        severity: 2,
                        line: 1,
                        column: 14,
                        ruleId: 'semi'
                    }
                ],
                errorCount: 1,
                warningCount: 0
            },
            {
                filePath: 'bar.js',
                source: 'const bar = 2\n',
                messages: <Array<MessageType>>[
                    {
                        message: 'Missing semicolon.',
                        severity: 2,
                        line: 1,
                        column: 14,
                        ruleId: 'semi'
                    }
                ],
                errorCount: 1,
                warningCount: 0
            }
        ]);

        it('should return a string with multiple entries', () => {
            const result = formatter(code, guide);

            assert.strictEqual(
                stripAnsi(result),
                [
                    'error: Missing semicolon at foo.js:1:14',
                    'Rule: semi',
                    '> 1 | const foo = 1',
                    '    |              ^',
                    '  2 | ',
                    '\n',
                    'error: Missing semicolon at bar.js:1:14',
                    'Rule: semi',
                    '> 1 | const bar = 2',
                    '    |              ^',
                    '  2 | ',
                    '\n',
                    '2 errors found.'
                ].join('\n')
            );
        });
    });

    describe('when passed a fatal error message', () => {
        const code = fillResults([
            {
                filePath: 'foo.js',
                source: 'e{}\n',
                messages: <Array<MessageType>>[
                    {
                        column: 2,
                        fatal: true,
                        line: 1,
                        message: 'Parsing error: Unexpected token {',
                        ruleId: null,
                        severity: 2
                    }
                ],
                errorCount: 1,
                warningCount: 0
            }
        ]);

        it('should return a string in the correct format', () => {
            const result = formatter(code, guide);

            assert.strictEqual(
                stripAnsi(result),
                [
                    'error: Parsing error: Unexpected token { at foo.js:1:2',
                    '> 1 | e{}',
                    '    |  ^',
                    '  2 | ',
                    '\n',
                    '1 error found.'
                ].join('\n')
            );
        });
    });

    describe('when passed one file not found message', () => {
        const code = fillResults([
            {
                filePath: 'foo.js',
                messages: <Array<MessageType>>[
                    {
                        fatal: true,
                        message: "Couldn't find foo.js."
                    }
                ],
                errorCount: 1,
                warningCount: 0
            }
        ]);

        it('should return a string without code preview (codeframe)', () => {
            const result = formatter(code, guide);

            assert.strictEqual(
                stripAnsi(result),
                "error: Couldn't find foo.js at foo.js:1:1\n\n\n1 error found."
            );
        });
    });

    describe('fixable problems', () => {
        it('should not output fixable problems message when no errors or warnings are fixable', () => {
            const code = fillResults([
                {
                    filePath: 'foo.js',
                    errorCount: 1,
                    warningCount: 0,
                    fixableErrorCount: 0,
                    fixableWarningCount: 0,
                    messages: <Array<MessageType>>[
                        {
                            message: 'Unexpected foo.',
                            severity: 2,
                            line: 5,
                            column: 10,
                            ruleId: 'foo'
                        }
                    ]
                }
            ]);

            const result = formatter(code, guide);

            assert.notInclude(result, 'potentially fixable');
        });

        it('should output the fixable problems message when errors are fixable', () => {
            const code = fillResults([
                {
                    filePath: 'foo.js',
                    errorCount: 1,
                    warningCount: 0,
                    fixableErrorCount: 1,
                    fixableWarningCount: 0,
                    messages: <Array<MessageType>>[
                        {
                            message: 'Unexpected foo.',
                            severity: 2,
                            line: 5,
                            column: 10,
                            ruleId: 'foo'
                        }
                    ]
                }
            ]);

            const result = formatter(code, guide);

            assert.include(
                result,
                '1 error potentially fixable with the `--fix` option.'
            );
        });

        it('should output fixable problems message when warnings are fixable', () => {
            const code = fillResults([
                {
                    filePath: 'foo.js',
                    errorCount: 0,
                    warningCount: 3,
                    fixableErrorCount: 0,
                    fixableWarningCount: 2,
                    messages: <Array<MessageType>>[
                        {
                            message: 'Unexpected foo.'
                        }
                    ]
                }
            ]);

            const result = formatter(code, guide);

            assert.include(
                result,
                '2 warnings potentially fixable with the `--fix` option.'
            );
        });

        it('should output the total number of fixable errors and warnings', () => {
            const code = fillResults([
                {
                    filePath: 'foo.js',
                    errorCount: 5,
                    warningCount: 3,
                    fixableErrorCount: 5,
                    fixableWarningCount: 2,
                    messages: <Array<MessageType>>[
                        {
                            message: 'Unexpected foo.'
                        }
                    ]
                },
                {
                    filePath: 'bar.js',
                    errorCount: 4,
                    warningCount: 2,
                    fixableErrorCount: 4,
                    fixableWarningCount: 1,
                    messages: <Array<MessageType>>[
                        {
                            message: 'Unexpected bar.'
                        }
                    ]
                }
            ]);

            const result = formatter(code, guide);

            assert.include(
                result,
                '9 errors and 3 warnings potentially fixable with the `--fix` option.'
            );
        });
    });

    describe('when a rule matches a some guidance', () => {
        it('should provide context if provided', () => {
            const code = testCaseResults.withContext;
            const result = formatter(code, guide);

            assert.strictEqual(
                stripAnsi(result),
                [
                    'error: This should have some context at foo.js:1:1',
                    'Rule: with-context     ✨Rule context: https://some/context.for/you',
                    '> 1 | something',
                    '    | ^',
                    '\n',
                    '1 error found.'
                ].join('\n')
            );
        });
        it('should provide multiple contexts if provided', () => {
            const code = testCaseResults.withMultipleContext;
            const result = formatter(code, guide);

            assert.strictEqual(
                stripAnsi(result),
                [
                    'error: This should have some context at foo.js:1:1',
                    'Rule: with-multi-context     ✨Rule context: https://some.context, https://some.other/context',
                    '> 1 | something',
                    '    | ^',
                    '\n',
                    '1 error found.'
                ].join('\n')
            );
        });
        it('should swap in an alternate message if provided', () => {
            const code = testCaseResults.withMessageOverride;
            const result = formatter(code, guide);

            assert.strictEqual(
                stripAnsi(result),
                [
                    'error: A provided message at foo.js:1:1',
                    'Rule: changed-message',
                    '> 1 | something',
                    '    | ^',
                    '\n',
                    '1 error found.'
                ].join('\n')
            );
        });
    });
});
