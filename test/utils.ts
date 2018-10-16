export type MessagePartialType = {
    ruleId?: string;
    severity?: number;
    message?: string;
    line?: number;
    column?: number;
    nodeType?: string;
    source?: string;
    fatal?: boolean;
};

export type ReportPartialTypes = {
    filePath?: string;
    errorCount?: number;
    fixableErrorCount?: number;
    warningCount?: number;
    fixableWarningCount?: number;
    messages?: Array<MessagePartialType>;
};

type ReportPiece = {
    reportData: ReportPartialTypes;
    messages: Array<MessagePartialType>;
};

export const reportDefaults: ReportPartialTypes = {
    filePath: '/some/dev/box/index.js',
    errorCount: 0,
    fixableErrorCount: 0,
    warningCount: 0,
    fixableWarningCount: 0,
    messages: []
};

export const messageDefaults: MessagePartialType = {
    ruleId: 'default-rule',
    severity: 1,
    message: 'Default rule.',
    line: 1,
    column: 1,
    nodeType: 'Program',
    source: '// Default source',
    fatal: false
};

export function assembleReport(reportPieces: Array<ReportPiece>) {
    return reportPieces.map(reportPiece =>
        Object.assign({}, reportPiece.reportData, {
            messages: reportPiece.messages.map(message =>
                Object.assign({}, messageDefaults, message)
            )
        })
    );
}
