type Rule = {
    message?: string;
    context?: Array<string>;
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
