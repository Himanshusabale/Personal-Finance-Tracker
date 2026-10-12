// Runs before protected routes. Checks the JWT token and sets req.userId.
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/constants');
const AppError = require('../utils/AppError');

module.exports = function requireLogin(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.replace('Bearer ', '');
  if (!token) return next(new AppError(401, 'Please log in'));
  try {
    req.userId = jwt.verify(token, JWT_SECRET).userId;
    next();
  } catch {
    next(new AppError(401, 'Session expired, please log in again'));
  }
};
