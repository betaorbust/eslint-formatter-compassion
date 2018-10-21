// Prebaked version of visualstudio formatter with every guide applied.
// Use via `eslint . -f eslint-formatter-compassionate/formatters/pre-baked-with-all-guides/visualstudio`

import formatter from '../visualstudio';
import { prebaker } from './prebaker';

import { ResultsType } from '../formatter-types';

export = function visualstudioPrebaked(results: Array<ResultsType>) {
    return prebaker(results, formatter);
};
