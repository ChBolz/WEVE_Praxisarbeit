const express = require("express");
const router = express.Router();
const db = require("../db");

// GET /api/tickets
router.get("/", (req, res) => {
  const tickets = db.prepare("SELECT * FROM tickets").all();
  res.json(tickets);
});

// POST /api/tickets
router.post("/", (req, res) => {
  const { id, title, description, status, assignedTo, createdAt } = req.body;

  if (!title || !description || !status || !createdAt || !id) {
    return res.status(400).json({ error: "Fehlende Pflichtfelder" });
  }

  db.prepare(
    `
    INSERT INTO tickets (id, title, description, status, assignedTo, createdAt)
    VALUES (?, ?, ?, ?, ?, ?)
  `,
  ).run(id, title, description, status, assignedTo || null, createdAt);

  res.status(201).json({ message: "Ticket erstellt" });
});

module.exports = router;
