// Load up all the guides we want to use
const airbnb = require('eslint-formatter-compassionate/guides/airbnb');
const eslint = require('eslint-formatter-compassionate/guides/eslint');
const importGuide = require('eslint-formatter-compassionate/guides/import');
const jsxA11y = require('eslint-formatter-compassionate/guides/jsx-a11y');
const react = require('eslint-formatter-compassionate/guides/react');

// Import the utility to merge guides together
const { mergeGuides } = require('eslint-formatter-compassionate/utils');

// Import the formatter we want to use for output
const formatter = require('eslint-formatter-compassionate/formatters/codeframe');

// Here are the custom rules.
// In this case we'll override eslint's `semi` rule to have a better error
// message as well as providing a link for context when the error is hit.
const myGuide = {
    name: 'myguide',
    schema: 1,
    rules: {
        semi: {
            message:
                'Automatic semicolon insertion is hard to grok, so we choose to use semicolons in JS.',
            context: ['http://bit.ly/semiplease']
        }
    }
};

// We now merge our guides together.
// Order is important. It's usually best to start with 'eslint' and build
// up from there. If these were shallow objects, we'd do something like
// Object.assign({}, eslint, importGuide, /* etc */); but because we want
// to keep our schema controlled, we provide the mergeGuides method.
const mergedGuides = mergeGuides([
    eslint,
    importGuide,
    jsxA11y,
    react,
    airbnb,
    myGuide
]);

// finally, we export a single function, taking in the results from ESLint,
// and returning the output of calling our formatter with our results, and
// our merged guides.
module.exports = eslintResults => formatter(eslintResults, mergedGuides);
