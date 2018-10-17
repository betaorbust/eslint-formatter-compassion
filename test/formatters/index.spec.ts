import { expect } from 'chai';
import 'mocha';
import base from '../fixtures/eslint';
import format from '../../src/index';

function checkTest(results: string) {}
describe('Eslint Formatter Compassion', () => {
    it('should format the output nicely', () => {
        console.log(format(base));
    });
});
