/* eslint-disable no-use-before-define */

import { MessageType } from '../formatters/formatter-types';

export type Rule = {
    message?: string;
    context?: Array<string>;
};

export type ResolvedRule = {
    message: string;
    context: Array<string>;
};

export type RuleCollection = {
    [index: string]: Rule;
};

export type GuideRuleType = {
    // eslint-disable-next-line no-restricted-globals
    name: string;
    schema: number;
    rules: RuleCollection;
};

export type GuideCollection = GuideRuleType[];
