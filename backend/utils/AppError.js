// An error that carries an HTTP status code (400, 401, 404 ...)
class AppError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
module.exports = AppError;
