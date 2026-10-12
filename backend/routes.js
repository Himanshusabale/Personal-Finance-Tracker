// Maps URLs to controller functions.
const express = require('express');
const requireLogin = require('./middleware/auth');
const auth = require('./controllers/authController');
const tx = require('./controllers/transactionController');

const router = express.Router();

// Lets async controllers pass their errors to the error handler
const safe = (fn) => (req, res, next) => Promise.resolve(fn(req, res)).catch(next);

router.post('/auth/register', safe(auth.register));
router.post('/auth/login', safe(auth.login));

router.get('/dashboard', requireLogin, safe(tx.dashboard));
router.get('/transactions', requireLogin, safe(tx.list));
router.post('/transactions', requireLogin, safe(tx.create));
router.put('/transactions/:id', requireLogin, safe(tx.update));
router.delete('/transactions/:id', requireLogin, safe(tx.remove));

module.exports = router;
