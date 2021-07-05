import ErrorResponse from '../utils/ErrorResponse.js'


const notFound = (req, res, next) => {
    next(new ErrorResponse(`Not Found - ${req.originalUrl}`, 404))
}

const errorHandler = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        error: err.message || "Server Error",
        stack: process.env.NODE_ENV === 'production' ?  null : err.stack
    })
}

export { notFound, errorHandler }