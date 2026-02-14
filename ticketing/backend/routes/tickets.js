const express = require("express");
const router = express.Router();
const db = require("../db");

// GET /api/tickets
router.get("/", (req, res) => {
  const tickets = db.prepare("SELECT * FROM tickets").all();
  res.json(tickets);
});

// GET /api/tickets/:id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const ticket = db.prepare("SELECT * FROM tickets WHERE id = ?").get(id);

  if (!ticket) {
    return res.status(404).json({ error: "Ticket nicht gefunden" });
  }

  res.json(ticket);
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
