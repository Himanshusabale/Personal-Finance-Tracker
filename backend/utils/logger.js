const fs = require('fs');
const path = require('path');

const saveToFile = !process.env.VERCEL;
const logDir = path.join(__dirname, '..', 'logs');

if (saveToFile) {
  try {
    fs.mkdirSync(logDir, { recursive: true });
  } catch (e) {}
}

function write(level, message) {
  const line = new Date().toISOString() + ' [' + level + '] ' + message;
  console.log(line);
  if (saveToFile) {
    try {
      fs.appendFileSync(path.join(logDir, 'app.log'), line + '\n');
    } catch (e) {}
  }
}

module.exports = {
  info: (msg) => write('INFO', msg),
  warn: (msg) => write('WARN', msg),
  error: (msg) => write('ERROR', msg),
};
