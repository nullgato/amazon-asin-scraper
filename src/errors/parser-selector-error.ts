const msg =
    'The parser attempted to select an element from the DOM which came back null.'

class ParserSelectorError extends Error {
    constructor() {
        super(msg)

        Object.setPrototypeOf(this, ParserSelectorError.prototype)
    }
}

export { ParserSelectorError }
