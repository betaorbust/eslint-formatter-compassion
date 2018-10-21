// Prebaked version of stylish formatter with every guide applied.
// Use via `eslint . -f eslint-formatter-compassionate/formatters/pre-baked-with-all-guides/stylish`

import formatter from '../stylish';
import { prebaker } from './prebaker';

import { ResultsType } from '../formatter-types';

export = function stylishPrebaked(results: Array<ResultsType>) {
    return prebaker(results, formatter);
};
