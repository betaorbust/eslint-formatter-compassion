module.exports = {
    // Fit code within this line limit
    printWidth: 80,

    // Number of spaces it should use per tab
    tabWidth: 4,

    // Use the flow parser instead of babylon
    parser: 'typescript',

    // If true, will use single instead of double quotes
    singleQuote: true,

    // Controls the printing of trailing commas wherever possible
    trailingComma: 'none',

    // Controls the printing of spaces inside array and objects
    bracketSpacing: true,

    // Overrides for other types of files.
    overrides: [
        {
            files: '*.md',
            options: {
                parser: 'markdown',
                proseWrap: 'always',
                printWidth: 100
            }
        },
        {
            files: '*.json',
            options: {
                parser: 'json'
            }
        }
    ]
};
