// Controllers: read the request, call a service, send the response.
const authService = require('../services/authService');
const { validateRegister, validateLogin } = require('../utils/validators');

exports.register = async (req, res) => res.status(201).json(await authService.register(validateRegister(req.body)));
exports.login = async (req, res) => res.json(await authService.login(validateLogin(req.body)));
