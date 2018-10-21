// Prebaked version of codeframe formatter with every guide applied.
// Use via `eslint . -f eslint-formatter-compassionate/formatters/pre-baked-with-all-guides/codeframe`

import formatter from '../codeframe';
import { prebaker } from './prebaker';

import { ResultsType } from '../formatter-types';

export = function stylishPrebaked(results: Array<ResultsType>) {
    return prebaker(results, formatter);
};
