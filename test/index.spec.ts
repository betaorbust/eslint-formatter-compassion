import { expect } from 'chai';
import 'mocha';
import base from './fixtures/eslint';
import formatter from '../src/index';

describe('Eslint Formatter Guidance', () => {
    it('should format the output nicely', () => {
        const output = formatter(base);
        expect(output).exist;
        console.log(output);
    });
});
