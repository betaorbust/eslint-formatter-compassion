export default {
    schema: 1,
    rules: {
        'no-console': {
            message: 'General message to override',
            context: 'http://link.to/general/context/for/rule',
            messageIds: {
                noConsole: {
                    message: 'This overrides the specific provided messageId',
                    context: 'http://link.to/some/context/doc'
                }
            }
        },
        'no-unused-vars': {
            message: 'This overrides the provided message',
            context: 'http://link.to/some/other/context/doc'
        }
    }
};
