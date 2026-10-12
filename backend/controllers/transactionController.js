const service = require('../services/transactionService');
const { validateTransaction } = require('../utils/validators');

exports.list = (req, res) => res.json(service.list(req.userId, req.query));
exports.create = (req, res) => res.status(201).json(service.create(req.userId, validateTransaction(req.body)));
exports.update = (req, res) => res.json(service.update(req.userId, Number(req.params.id), validateTransaction(req.body)));
exports.remove = (req, res) => { service.remove(req.userId, Number(req.params.id)); res.sendStatus(204); };
exports.dashboard = (req, res) => res.json(service.dashboard(req.userId));
