import stylish from './stylish';
import codeframe from './codeframe';
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
    ruleId: string | null;
    severity: number;
};

export type ResultsType = {
    errorCount: number;
    filePath: string;
    fixableErrorCount: number;
    fixableWarningCount: number;
    messages: Array<MessageType>;
    warningCount: number;
    output?: string;
    source?: string;
};

export interface FormatFunction {
    (results: Array<ResultsType>, ruleCollection: RuleCollection): string;
}

const formatters: { [key: string]: FormatFunction } = {
    stylish,
    codeframe
};

export default formatters;
