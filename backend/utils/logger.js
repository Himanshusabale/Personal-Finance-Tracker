// Tiny logger: prints to the console and saves to logs/app.log
const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '..', 'logs');
fs.mkdirSync(logDir, { recursive: true });

function write(level, message) {
  const line = `${new Date().toISOString()} [${level}] ${message}`;
  console.log(line);
  fs.appendFileSync(path.join(logDir, 'app.log'), line + '\n');
}

module.exports = {
  info: (msg) => write('INFO', msg),
  warn: (msg) => write('WARN', msg),
  error: (msg) => write('ERROR', msg),
};
