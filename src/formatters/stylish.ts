/**
 * @fileoverview Stylish reporter
 * @author Original by Sindre Sorhus - Rebuilt for guides by Jacques Favreau
 */

import chalk, { Chalk } from 'chalk';
import stripAnsi from 'strip-ansi';
import table from 'text-table';
import { resolveGuideDataForMessage } from '../utils';

import { ResultsType } from './formatter-types';
import { GuideCollection, ResolvedRule } from '../guides/guide-types';

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Given a word and a count, append an s if count is not one.
 * @param {string} word A word in its singular form.
 * @param {int} count A number controlling whether word should be pluralized.
 * @returns {string} The original word with an s on the end if count is not one.
 */
function pluralize(word: string, count: number) {
    return count === 1 ? word : `${word}s`;
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

export = (results: Array<ResultsType>, guides: GuideCollection) => {
    let output = '\n';
    const counts = {
        error: 0,
        warning: 0,
        fixableError: 0,
        fixableWarning: 0
    };
    let summaryColor: keyof Chalk = 'yellow';

    results.forEach(
        ({
            messages,
            errorCount,
            warningCount,
            fixableErrorCount,
            fixableWarningCount,
            filePath
        }) => {
            if (messages.length === 0) {
                return;
            }

            counts.error += errorCount;
            counts.warning += warningCount;
            counts.fixableError += fixableErrorCount;
            counts.fixableWarning += fixableWarningCount;

            output += `${chalk.underline(filePath)}\n`;

            output += `${table(
                messages
                    .map(msg => {
                        const { column, fatal, line, ruleId, severity } = msg;

                        const { context, message } = resolveGuideDataForMessage(
                            msg,
                            guides
                        );
                        let messageType;

                        if (fatal || severity === 2) {
                            messageType = chalk.red('error');
                            summaryColor = 'red';
                        } else {
                            messageType = chalk.yellow('warning');
                        }

                        const report = [
                            [
                                '',
                                line || 0,
                                column || 0,
                                messageType,
                                message.replace(/([^ ])\.$/, '$1'),
                                chalk.dim(ruleId || '')
                            ]
                        ];
                        if (context.length > 0) {
                            report.push(
                                [
                                    '',
                                    '',
                                    '',
                                    '',
                                    chalk.dim(
                                        `✨ Additional info: ${context
                                            .map(c =>
                                                chalk.underline(chalk.blue(c))
                                            )
                                            .join(', ')}`
                                    ),
                                    ''
                                ],
                                ['']
                            );
                        }
                        return report;
                    })
                    .reduce((acc, cur) => acc.concat(cur), []),
                {
                    align: ['l', 'r', 'l'],
                    stringLength(str) {
                        return stripAnsi(str).length;
                    }
                }
            )
                .split('\n')
                .map((el: string) =>
                    el.replace(/(\d+)\s+(\d+)/, (m, p1, p2) =>
                        chalk.dim(`${p1}:${p2}`)
                    )
                )
                .join('\n')}\n\n`;
        }
    );

    const total = counts.error + counts.warning;

    if (total > 0) {
        output += chalk[summaryColor].bold(
            [
                '\u2716 ',
                total,
                pluralize(' problem', total),
                ' (',
                counts.error,
                pluralize(' error', counts.error),
                ', ',
                counts.warning,
                pluralize(' warning', counts.warning),
                ')\n'
            ].join('')
        );

        if (counts.fixableError > 0 || counts.fixableWarning > 0) {
            output += chalk[summaryColor].bold(
                [
                    '  ',
                    counts.fixableError,
                    pluralize(' error', counts.fixableError),
                    ' and ',
                    counts.fixableWarning,
                    pluralize(' warning', counts.fixableWarning),
                    ' potentially fixable with the `--fix` option.\n'
                ].join('')
            );
        }
    }

    return total > 0 ? output : '';
};
