import { ResultsType, MessageType } from '../formatters/formatter-types';

export const reportDefaults: ResultsType = {
    errorCount: 0,
    filePath: '/some/dev/box/index.js',
    fixableErrorCount: 0,
    fixableWarningCount: 0,
    messages: [],
    warningCount: 0
};

export const messageDefaults: MessageType = {
    column: 1,
    line: 1,
    message: 'Default rule.',
    nodeType: 'Program',
    ruleId: 'default-rule',
    severity: 1
};

export function fillResults(reportPieces: Array<Partial<ResultsType>>) {
    return reportPieces.map(reportPiece => {
        const filledReport = Object.assign({}, reportDefaults, reportPiece);
        filledReport.messages = filledReport.messages.map(msg =>
            Object.assign({}, messageDefaults, msg)
        );
        return filledReport;
    });
}
