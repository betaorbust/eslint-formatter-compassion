// Load up all the guides we want to use
import airbnb from '../../guides/airbnb';
import eslint from '../../guides/eslint';
import importGuide from '../../guides/import';
import jsxA11y from '../../guides/jsx-a11y';
import react from '../../guides/react';

// Types
import { ResultsType, FormatFunction } from '../formatter-types';
import { GuideCollection } from '../../guides/guide-types';

const guides: GuideCollection = [eslint, importGuide, jsxA11y, react, airbnb];

export function prebaker(
    results: Array<ResultsType>,
    formatter: FormatFunction
) {
    return formatter(results, guides);
}
