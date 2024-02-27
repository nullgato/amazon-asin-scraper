const msg =
    'The data returned by the parser was null, book retrieved but unable to be parsed.'

class DataParserError extends Error {
    constructor() {
        super(msg)

        Object.setPrototypeOf(this, DataParserError.prototype)
    }
}

export { DataParserError }
