import { underline, red, yelllow, dim } from 'chalk';

const RUNNING_IN_CI = process.env.CI;

function formatMessage(
    guide,
    {
        ruleId,
        severity,
        message,
        line,
        column,
        nodeType,
        endLine,
        endColumn,
        fix
    }
) {}

export default function buildFormatter(guide) {
    return function formatter(results) {
        const output = '';
        const count = {
            errors: 0,
            fixableErrors: 0,
            warnings: 0,
            fixableWarnings: 0
        };
        results.forEach(
            ({
                filePath,
                messages,
                errorCount,
                warningCount,
                fixableErrorCount,
                fixableWarningCount,
                source
            }) => {
                messages.forEach(() => {});
            }
        );
        return output;
    };
}
