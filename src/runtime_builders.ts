import formatters from './formatters/index';
import guides from './rule_data/index';

export function getGuidesByName(guideNames: Array<string>) {
    return guideNames.map(guideName => {
        if (!(guideName in guides)) {
            throw new Error(
                `Arbitrary guides are not supported. Yet. Possible guide values are: [${Object.keys(
                    guides
                ).join(' | ')}]`
            );
        }
        return guides[guideName];
    });
}

export function getFormatterByName(formatterName: string) {
    if (!(formatterName in formatters)) {
        throw new Error(
            `Arbitrary formatters are not supported yet. Possible formatter values are [${Object.keys(
                formatters
            ).join(' | ')}]`
        );
    }
    return formatters[formatterName];
}
