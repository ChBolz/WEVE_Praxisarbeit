const Database = require("better-sqlite3");
const path = require("path");

let db;

if (process.env.DB_FILE === "memory") {
  db = new Database(":memory:");
} else {
  const filename = process.env.DB_FILE || "database.db";
  const dbPath = path.join(__dirname, "database", filename);
  db = new Database(dbPath);
}

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS tickets (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL,
    assignedTo TEXT,
    createdAt TEXT NOT NULL
  )
`,
).run();

module.exports = db;
