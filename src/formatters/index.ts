import stylish from './stylish';
import codeframe from './codeframe';
import visualstudio from './visualstudio';
import { FormatFunction } from './formatter-types';

const formatters: { [key: string]: FormatFunction } = {
    stylish,
    codeframe,
    visualstudio
};

export = formatters;
