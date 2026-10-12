// DTO-style validators: check incoming data and return clean data.
const AppError = require('./AppError');
const { CATEGORIES } = require('../config/constants');

function validateRegister(body) {
  const { name, email, password } = body;
  if (!name || !email || !password) throw new AppError(400, 'Name, email and password are required');
  if (password.length < 6) throw new AppError(400, 'Password must be at least 6 characters');
  return { name: name.trim(), email: email.trim().toLowerCase(), password };
}

function validateLogin(body) {
  const { email, password } = body;
  if (!email || !password) throw new AppError(400, 'Email and password are required');
  return { email: email.trim().toLowerCase(), password };
}

function validateTransaction(body) {
  const amount = Number(body.amount);
  if (!(amount > 0)) throw new AppError(400, 'Amount must be a positive number');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(body.date || '')) throw new AppError(400, 'Date must look like 2026-10-12');
  if (!CATEGORIES.includes(body.category)) throw new AppError(400, 'Category must be Income or Expense');
  return { amount, date: body.date, category: body.category, description: (body.description || '').trim() };
}

module.exports = { validateRegister, validateLogin, validateTransaction };
