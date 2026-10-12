// A very simple "database": one JSON file. Good enough for learning.
const fs = require('fs');
const path = require('path');

// Vercel only allows writing to /tmp
const file = process.env.VERCEL ? '/tmp/db.json' : path.join(__dirname, '..', 'data', 'db.json');
try { fs.mkdirSync(path.dirname(file), { recursive: true }); } catch {}

function load() {
  if (!fs.existsSync(file)) return { users: [], transactions: [], nextId: 1 };
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function save(db) {
  fs.writeFileSync(file, JSON.stringify(db, null, 2));
}

module.exports = { load, save };
