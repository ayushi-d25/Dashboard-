const jwt = require('jsonwebtoken')
const BlacklistedToken = require('../models/blackListTokenSchema')
const { UnauthorizedError } = require('../utils/customErrorHandler')

module.exports.authenticate = async (req, res, next) => {

    const authHeader = req.headers['authorization'];
    if (!authHeader) throw new UnauthorizedError('No token provided');

    const token = authHeader.split(' ')[1];
    if (!token) throw new UnauthorizedError('No token provided');

    const blacklisted = await BlacklistedToken.findOne({ token });
    if (blacklisted) throw new UnauthorizedError('Token is blacklisted');

    let decodedData;
    try {
        decodedData = jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            decodedData = jwt.decode(token);
            req.expiredToken = true;
        } else {
            throw new UnauthorizedError('Invalid token');
        }
    }

    req.user = decodedData;
    next();

};

