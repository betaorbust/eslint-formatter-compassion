import { ResultsType, FormatFunction } from './formatters/index';
import { mergeGuides } from './rule_data/index';
import { getFormatterByName, getGuidesByName } from './runtime_builders';

// Eventually get these from process.env
const requestedGuides = ['eslint', 'import', 'jsx-a11y', 'react', 'airbnb'];
const requestedFormatter = 'codeframe';
const thing = 'foo';
export = (results: Array<ResultsType>) => {
    const formatter = getFormatterByName(requestedFormatter);
    const guide = mergeGuides(getGuidesByName(requestedGuides));
    return formatter(results, guide);
};
