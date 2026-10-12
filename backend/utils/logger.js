// Tiny logger: prints to the console and tries to save to a log file
const fs = require('fs');
const path = require('path');

// Vercel only allows writing to /tmp
const logDir = process.env.VERCEL ? '/tmp/logs' : path.join(__dirname, '..', 'logs');
try { fs.mkdirSync(logDir, { recursive: true }); } catch {}

function write(level, message) {
  const line = `${new Date().toISOString()} [${level}] ${message}`;
  console.log(line);
  try { fs.appendFileSync(path.join(logDir, 'app.log'), line + '\n'); } catch {}
}

module.exports = {
  info: (msg) => write('INFO', msg),
  warn: (msg) => write('WARN', msg),
  error: (msg) => write('ERROR', msg),
};
