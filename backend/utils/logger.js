// Tiny logger: always prints to the console.
// It only saves to a file when running on your own computer (not on Vercel).
const fs = require('fs');
const path = require('path');

const saveToFile = !process.env.VERCEL;
const logDir = path.join(__dirname, '..', 'logs');

if (saveToFile) {
  try { fs.mkdirSync(logDir, { recursive: true }); } catch (e) { /* ignore */ }
}

function write(level, message) {
  const line = `${new Date().toISOString()} [${level}] ${message}`;
  console.log(line);
  if (saveToFile) {
    try { fs.appendFileSync(path.join(logDir, 'app.log'), line + '\n'); } catch (e) { /* ignore */ }
  }
}

module.exports = {
  info: (msg) => write('INFO', msg),
  warn: (msg) => write('WARN', msg),
  error: (msg) => write('ERROR', msg),
};
