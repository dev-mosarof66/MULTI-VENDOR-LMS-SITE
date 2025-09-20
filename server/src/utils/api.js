class ApiResponse {
    constructor(code, data, msg = 'Success') {
        this.code = code
        this.data = data
        this.msg = msg
        this.success = code < 400 ? true : false
    }
}


class ApiError extends Error {
    constructor(code, msg = 'Something went wrong', errors = [], stack = '') {
        super(msg)
        this.code = code
        this.data = null
        this.msg = msg
        this.success = false
        this.errors = errors
        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.contructor)
        }
    }
}



export { ApiResponse, ApiError }