// All fixed values live here so they are easy to find and change.
module.exports = {
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
  JWT_EXPIRES_IN: '2h',
  SALT_ROUNDS: 10,
  CATEGORIES: ['Income', 'Expense'],
  RECENT_COUNT: 5,
};
