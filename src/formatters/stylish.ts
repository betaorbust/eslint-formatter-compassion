// Use the

import eslintDefinitions from '../guides/eslint';
import builder from '../formatter_builder';

const eslintFormatter = builder(eslintDefinitions);

export default function(results) {
    eslintFormatter(results);
}
