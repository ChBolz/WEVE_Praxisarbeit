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

// PATCH /api/tickets/:id  (Teil-Update)
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, status, assignedTo } = req.body;

  const existing = db.prepare("SELECT * FROM tickets WHERE id = ?").get(id);
  if (!existing)
    return res.status(404).json({ error: "Ticket nicht gefunden" });

  const allowedStatus = ["open", "in_progress", "closed"];
  if (status !== undefined && !allowedStatus.includes(status)) {
    return res.status(400).json({ error: "Ungültiger Status" });
  }

  const updated = {
    title: title ?? existing.title,
    description: description ?? existing.description,
    status: status ?? existing.status,
    assignedTo: assignedTo ?? existing.assignedTo,
  };

  if (!updated.title || !updated.description || !updated.status) {
    return res.status(400).json({ error: "Fehlende Pflichtfelder" });
  }

  db.prepare(
    `UPDATE tickets
     SET title = ?, description = ?, status = ?, assignedTo = ?
     WHERE id = ?`,
  ).run(
    updated.title,
    updated.description,
    updated.status,
    updated.assignedTo,
    id,
  );

  const result = db.prepare("SELECT * FROM tickets WHERE id = ?").get(id);
  res.json(result);
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

// DELETE /api/tickets/:id
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const existing = db.prepare("SELECT * FROM tickets WHERE id = ?").get(id);
  if (!existing) {
    return res.status(404).json({ error: "Ticket nicht gefunden" });
  }

  db.prepare("DELETE FROM tickets WHERE id = ?").run(id);

  res.status(204).send();
});

module.exports = router;
