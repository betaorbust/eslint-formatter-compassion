/**
 * @fileoverview Tests for VisualStudio format.
 * @author Ronald Pijnacker
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { assert } from 'chai';
import formatter from '../../formatters/visualstudio';
import { guide, testCaseResults } from '../fixtures/with-guide-data';
import { fillResults } from '../test-utils';
import { MessageType } from '../../formatters/formatter-types';

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

describe('formatter:visualstudio', () => {
    describe('when passed no messages', () => {
        const code = fillResults([
            {
                filePath: 'foo.js',
                messages: <Array<MessageType>>[]
            }
        ]);

        it('should return nothing', () => {
            const result = formatter(code, guide);

            assert.strictEqual(result, 'no problems');
        });
    });

    describe('when passed a single message', () => {
        const code = fillResults([
            {
                filePath: 'foo.js',
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

        it('should return a string in the format filename(x,y): error z for errors', () => {
            const result = formatter(code, guide);

            assert.strictEqual(
                result,
                'foo.js(5,10): error foo : Unexpected foo.\n\n1 problem'
            );
        });

        it('should return a string in the format filename(x,y): warning z for warnings', () => {
            code[0].messages[0].severity = 1;
            const result = formatter(code, guide);

            assert.strictEqual(
                result,
                'foo.js(5,10): warning foo : Unexpected foo.\n\n1 problem'
            );
        });
    });

    describe('when passed a fatal error message', () => {
        const code = fillResults([
            {
                filePath: 'foo.js',
                messages: <Array<MessageType>>[
                    {
                        fatal: true,
                        message: 'Unexpected foo.',
                        line: 5,
                        column: 10,
                        ruleId: 'foo'
                    }
                ]
            }
        ]);

        it('should return a string in the format filename(x,y): error  z', () => {
            const result = formatter(code, guide);

            assert.strictEqual(
                result,
                'foo.js(5,10): error foo : Unexpected foo.\n\n1 problem'
            );
        });
    });

    describe('when passed multiple messages', () => {
        const code = fillResults([
            {
                filePath: 'foo.js',
                messages: <Array<MessageType>>[
                    {
                        message: 'Unexpected foo.',
                        severity: 2,
                        line: 5,
                        column: 10,
                        ruleId: 'foo'
                    },
                    {
                        message: 'Unexpected bar.',
                        severity: 1,
                        line: 6,
                        column: 11,
                        ruleId: 'bar'
                    }
                ]
            }
        ]);

        it('should return a string with multiple entries', () => {
            const result = formatter(code, guide);

            assert.strictEqual(
                result,
                'foo.js(5,10): error foo : Unexpected foo.\nfoo.js(6,11): warning bar : Unexpected bar.\n\n2 problems'
            );
        });
    });

    describe('when passed multiple files with 1 message each', () => {
        const code = fillResults([
            {
                filePath: 'foo.js',
                messages: <Array<MessageType>>[
                    {
                        message: 'Unexpected foo.',
                        severity: 2,
                        line: 5,
                        column: 10,
                        ruleId: 'foo'
                    }
                ]
            },
            {
                filePath: 'bar.js',
                messages: <Array<MessageType>>[
                    {
                        message: 'Unexpected bar.',
                        severity: 1,
                        line: 6,
                        column: 11,
                        ruleId: 'bar'
                    }
                ]
            }
        ]);

        it('should return a string with multiple entries', () => {
            const result = formatter(code, guide);

            assert.strictEqual(
                result,
                'foo.js(5,10): error foo : Unexpected foo.\nbar.js(6,11): warning bar : Unexpected bar.\n\n2 problems'
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
                        message: "Couldn't find foo.js.",
                        ruleId: 'foo'
                    }
                ]
            }
        ]);

        it('should return a string without line and column', () => {
            const result = formatter(code, guide);

            assert.strictEqual(
                result,
                "foo.js(1,1): error foo : Couldn't find foo.js.\n\n1 problem"
            );
        });
    });
    describe('when a rule matches a some guidance', () => {
        it('should provide context if provided', () => {
            const code = testCaseResults.withContext;
            const result = formatter(code, guide);

            assert.strictEqual(
                result,
                [
                    `foo.js(1,1): error with-context : This should have some context  Additional context: https://some/context.for/you`,
                    '',
                    `1 problem`
                ].join('\n')
            );
        });
        it('should provide multiple contexts if provided', () => {
            const code = testCaseResults.withMultipleContext;
            const result = formatter(code, guide);

            assert.strictEqual(
                result,
                [
                    `foo.js(1,1): error with-multi-context : This should have some context  Additional context: https://some.context, https://some.other/context`,
                    '',
                    `1 problem`
                ].join('\n')
            );
        });
        it('should swap in an alternate message if provided', () => {
            const code = testCaseResults.withMessageOverride;
            const result = formatter(code, guide);

            assert.strictEqual(
                result,
                [
                    `foo.js(1,1): error changed-message : A provided message`,
                    '',
                    `1 problem`
                ].join('\n')
            );
        });
    });
});
