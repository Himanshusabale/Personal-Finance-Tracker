// One place that turns any error into a clean JSON response.
const logger = require('../utils/logger');

module.exports = function errorHandler(err, req, res, next) {
  if (err.status) {
    logger.warn(`${req.method} ${req.path} -> ${err.status} ${err.message}`);
    return res.status(err.status).json({ error: err.message });
  }
  logger.error(`${req.method} ${req.path} -> ${err.stack}`);
  res.status(500).json({ error: 'Something went wrong on the server' });
};
