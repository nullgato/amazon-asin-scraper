const msg = 'The fetch call or response text parsing threw an error.'

class DataRetrievalError extends Error {
    constructor(public innerError: Error) {
        super(msg)

        Object.setPrototypeOf(this, DataRetrievalError.prototype)
    }
}

export { DataRetrievalError }
