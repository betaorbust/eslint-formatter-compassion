import stylish from './stylish';
import { RuleCollection } from '../rule_data/index';

export type MessageType = {
    column: number;
    endColumn?: number;
    endLine?: number;
    fatal?: boolean;
    fix?: {
        range: [number, number];
        text: string;
    };
    line: number;
    message: string;
    nodeType: string;
    ruleId: string;
    severity: number;
};

export type ResultsType = {
    errorCount: number;
    filePath: string;
    fixableErrorCount: number;
    fixableWarningCount: number;
    messages: Array<MessageType>;
    warningCount: number;
};

export interface FormatFunction {
    (results: Array<ResultsType>, ruleCollection: RuleCollection): string;
}

const formatters: { [key: string]: FormatFunction } = {
    stylish
};

export default formatters;
