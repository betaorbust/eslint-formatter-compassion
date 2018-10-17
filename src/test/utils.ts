import { ResultsType, MessageType } from '../formatters/index';
// import { RuleCollection } from "../src/rule_data/index";
// export type MessagePartialType = {
//     [key: ]
//     ruleId?: string;
//     severity?: number;
//     message?: string;
//     line?: number;
//     column?: number;
//     nodeType?: string;
//     source?: string;
//     fatal?: boolean;
// };

// export type ReportPartialTypes = {
//     filePath?: string;
//     errorCount?: number;
//     fixableErrorCount?: number;
//     warningCount?: number;
//     fixableWarningCount?: number;
//     messages?: Array<MessagePartialType>;
// };

// type ReportPiece = {
//     results: Partial<ResultsType>;
//     messages: Array<Partial<MessageType>>;
// };

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
