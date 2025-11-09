const BlacklistedToken = require('../models/BlacklistedToken')
const { UnauthorizedError } = require('../utils/customErrorHandler')

const checkBlacklist = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return next(new UnauthorizedError('No token provided'))

  const blacklisted = await BlacklistedToken.findOne({ token })
  if (blacklisted) return next(new UnauthorizedError('Token is blacklisted'))

  next()
}

module.exports = checkBlacklist
