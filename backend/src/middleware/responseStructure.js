module.exports.successResponse = (req, res, next) => {
    stat = res.locals.status
    message = res.locals.message
    data = res.locals.data

    res.status(stat).json({
        status: stat,
        message: message,
        data: data,
    });
};