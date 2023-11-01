// err to overwrite default express error handler, next is to call any further middleware.
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode)

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    }) // stack trace gives some additional information, but only in development mode.
}

module.exports = {
    errorHandler,
}