const msg = 'Amazon is asking for a captcha and the script cannot continue.'

class AmazonCaptchaError extends Error {
    constructor() {
        super(msg)

        Object.setPrototypeOf(this, AmazonCaptchaError.prototype)
    }
}

export { AmazonCaptchaError }
