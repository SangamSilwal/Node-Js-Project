class ApiError extends Error {
    constructor(
        statusCode,
        message="Something went wrong",
        errors = [],
        statck = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors



        if (statck) {
            this.stack = statck
            
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}
export {ApiError}


/*
ApiError is a custom error class for creating consistent and meaningful error responses.

It extends JavaScript's Error class and adds properties like statusCode, message, and errors.

Use it to throw errors in your API and handle them in middleware.

*/