module.exports.errorHandler = (err, req, res, next) => {
    if (err) {
        const message = err.message
        const status = err.status
        const error = err.error
        res.status(400).json({ status, error, message })
    }
}