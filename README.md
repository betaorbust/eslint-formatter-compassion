# Compassionate Linting (`eslint-formatter-compassionate`)

Linter output for humans.

> ### _The fastest path to `eslint-disable-line` runs directly through cryptic error messages._

ESLint is a fantastic tool, that lets us write better, more maintainable code. Unfortunately, when
we get feedback from a linter, it usually comes across about as friendly as

```
You did something wrong. Here's a token to Google around for.
```

😓

At a minimum, it would be useful to understand what the larger context around why the rule was
written (ESLint docs!), but even more useful would be to understand the _why_ of the rule.

`eslint-formatter-compassionate` helps address that _why_ by letting you add contextual links to
your own style guide (or any of the guides provided by this package) and modify error messages to
fit your organization's needs. Leave the linting up to ESLint, but when it comes time to communicate
with your human engineers, grab the reins and set some better context.

![gif of formatter running in a terminal](./docs/images/formatter-demo.gif)

## Usage

### Quickstart

```bash
# Assuming you already have eslint running in your project.
# If not, see https://eslint.org/docs/user-guide/getting-started

# Add eslint-formatter-compassionate as a dependency.
# If you're using NPM: npm install eslint-formatter-compassionate --save-dev
yarn add -D eslint-formatter-compassionate

# Lint using one of the pre-baked all-guides-enabled formatters
# The -f (or --format) flag lets you select a different formatter.
eslint ./ -f './node_modules/eslint-formatter-compassionate/formatters/prebaked-with-all-guides/stylish'
```

### Project Components

This package provides three major component types:

-   [Guides](#guides)
    -   Guides optionally provide better messages or contextual links for linting failures.
    -   You can make your own to add your own context.
-   [Formatters](#formatters)
    -   Process the output of ESLint into something human readable a guide, to help augment their
        output.
-   Prebaked All-in-one ESLint formatters
    -   With all our supported guides. Just pick one of the pre-built, ESLint-compatible formatters
        from `eslint-formatter-compassionate/prebaked-with-all-guides/<formatter type>`

You can roll your own formatter using `eslint-formatter-compassionate` as a base, or use one of the
pre-built formatters of your choice.

### Guides

Guides are the data source for augmenting eslint output. They can provide replacement messages as
well as multiple context links. A sample guide for modifying ESLint's built-in `semi` rule would
look something like this:

```js
module.exports = {
    name: 'myguide', // Each guide is named for debugability
    schema: 1, // Schema to automatically detect future breaking changes
    rules: {
        // A rules object
        semi: {
            // Keys by ruleId
            // Optional message to override the default one provided by `semi`
            message: 'Automatic semicolon insertion is hard to grok, so we use semicolons in JS.',
            // Optional array of links to external context. In this case, a blog post.
            context: ['http://bit.ly/semiplease']
        }
    }
};
```

If you'd like to use your own guide content, please see the section below on rolling your own
formatter.

### Formatters

Formatters are very similar to
[ESLint's formatters](https://eslint.org/docs/user-guide/formatters/), with the exception that they
take in a [Guide](#guides), and augment their output with that Guide's data. Because they take an
additional agument, they're not compatible with ESLint right out of the box. If you'd like an easy
start, see the Quick-Start section, which uses the pre-built, ESLint-compatible versions of these
formatters. If you'd like to make your own or use custom guide information, see the section below on
making your own custom formatter.

### Pre-built Formatters

There are several pre-built format styles (based off of popular eslint-provided formatters) which
can be found in `eslint-formatter-compassionate/formatters/prebaked-with-all-guides`.

Currently, we have:

-   `codeframe` Providing the maximum context for a linting error. Based off of ESLint's CodeFrame
    formatter.
    -   ![codeframe output](./docs/images/codeframe.png)
-   `stylish` Providing a more compact view. Based off of ESLint's Stylish formatter.
    -   ![stylish output](./docs/images/stylish.png)
-   `visualstudio` For use in IDE tooltips.
    -   ![visualstudio output](./docs/images/visualstudio.png)

Each pre-built solution includes every available guide.

#### Use:

```sh
eslint ./ -f './node_modules/eslint-formatter-compassionate/formatters/prebaked-with-all-guides/stylish'
```

## Customizing Formatters

If you'd like to add your own context or customizations, it's very simple to make a project or
team-specific eslint formatter and guide information.

```js
// Load up all the guides we want to use. You can mix and match as you like,
// or do everyting from scratch.
const airbnb = require('eslint-formatter-compassionate/guides/airbnb');
const eslint = require('eslint-formatter-compassionate/guides/eslint'); // Provides all eslint docs.
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
const mergedGuides = mergeGuides([eslint, importGuide, jsxA11y, react, airbnb, myGuide]);

// finally, we export a single function, taking in the results from ESLint,
// and returning the output of calling our formatter with our results, and
// our merged guides.
// This function is ESLint compatible, and can now be used like any other formatter.
module.exports = eslintResults => formatter(eslintResults, mergedGuides);
```

If you saved that file as `./my-formatter.js` in your project, you can run eslint with your
contextualized formatter like this:

```sh
eslint ./ -f './my-formatter.js'
```
