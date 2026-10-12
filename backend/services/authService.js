// Business logic for users: register and login.
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../utils/db');
const logger = require('../utils/logger');
const AppError = require('../utils/AppError');
const { JWT_SECRET, JWT_EXPIRES_IN, SALT_ROUNDS } = require('../config/constants');

function makeToken(user) {
  return jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

async function register({ name, email, password }) {
  const data = db.load();
  if (data.users.find((u) => u.email === email)) throw new AppError(409, 'Email already registered');

  const user = { id: data.nextId++, name, email, passwordHash: await bcrypt.hash(password, SALT_ROUNDS) };
  data.users.push(user);
  db.save(data);

  logger.info(`User registered: ${email}`);
  return { token: makeToken(user), name: user.name };
}

async function login({ email, password }) {
  const user = db.load().users.find((u) => u.email === email);
  const ok = user && (await bcrypt.compare(password, user.passwordHash));
  if (!ok) {
    logger.warn(`Failed login: ${email}`);
    throw new AppError(401, 'Wrong email or password');
  }
  logger.info(`User logged in: ${email}`);
  return { token: makeToken(user), name: user.name };
}

module.exports = { register, login };
