import base from './fixtures/eslint';
import format from '..';

function checkTest(results: string) {}
describe('Eslint Formatter Compassion', () => {
    it('should format the output nicely', () => {
        console.log(format(base));
    });
});
