import stylish from './stylish';
import codeframe from './codeframe';
import visualstudio from './visualstudio';
import { FormatFunction } from './formatter-types';

// eslint-disable-next-line no-console
console.warn(
    'eslint-formatter-compassion/formatters/index has been deprecated and will be removed in the future. Please require formatters directly'
);

const formatters: { [key: string]: FormatFunction } = {
    stylish,
    codeframe,
    visualstudio
};

export = formatters;
