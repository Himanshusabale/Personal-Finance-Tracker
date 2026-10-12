// Business logic for transactions. Every function only touches the logged-in user's data.
const db = require('../utils/db');
const logger = require('../utils/logger');
const AppError = require('../utils/AppError');
const { RECENT_COUNT } = require('../config/constants');

function list(userId, { from, to, category, search } = {}) {
  return db.load().transactions
    .filter((t) => t.userId === userId)
    .filter((t) => !from || t.date >= from)
    .filter((t) => !to || t.date <= to)
    .filter((t) => !category || t.category === category)
    .filter((t) => !search || t.description.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);
}

function create(userId, input) {
  const data = db.load();
  const tx = { id: data.nextId++, userId, ...input };
  data.transactions.push(tx);
  db.save(data);
  logger.info(`User ${userId} created transaction ${tx.id}`);
  return tx;
}

function update(userId, id, input) {
  const data = db.load();
  const tx = data.transactions.find((t) => t.id === id && t.userId === userId);
  if (!tx) throw new AppError(404, 'Transaction not found');
  Object.assign(tx, input);
  db.save(data);
  logger.info(`User ${userId} updated transaction ${id}`);
  return tx;
}

function remove(userId, id) {
  const data = db.load();
  const index = data.transactions.findIndex((t) => t.id === id && t.userId === userId);
  if (index === -1) throw new AppError(404, 'Transaction not found');
  data.transactions.splice(index, 1);
  db.save(data);
  logger.info(`User ${userId} deleted transaction ${id}`);
}

// Totals + recent list + income/expense per month (for the chart)
function dashboard(userId) {
  const all = list(userId);
  let totalIncome = 0;
  let totalExpense = 0;
  const months = {}; // e.g. { '2026-10': { income: 0, expense: 0 } }

  for (const t of all) {
    const month = t.date.slice(0, 7);
    months[month] = months[month] || { income: 0, expense: 0 };
    if (t.category === 'Income') {
      totalIncome += t.amount;
      months[month].income += t.amount;
    } else {
      totalExpense += t.amount;
      months[month].expense += t.amount;
    }
  }

  const monthly = Object.keys(months).sort().map((month) => ({ month, ...months[month] }));
  return { totalIncome, totalExpense, balance: totalIncome - totalExpense, recent: all.slice(0, RECENT_COUNT), monthly };
}

module.exports = { list, create, update, remove, dashboard };
