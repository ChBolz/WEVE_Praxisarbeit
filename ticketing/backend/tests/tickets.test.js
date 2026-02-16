process.env.DB_FILE = "memory";

const request = require("supertest");
const fs = require("fs");
const path = require("path");
const app = require("../app");

const testDbPath = path.join(__dirname, "..", "database", "test.db");

test("GET /api/tickets returns array", async () => {
  const res = await request(app).get("/api/tickets");
  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});

test("POST /api/tickets creates ticket", async () => {
  const ticket = {
    id: "T-TEST-1",
    title: "Test Ticket",
    description: "Das ist eine Testbeschreibung.",
    status: "open",
    assignedTo: null,
    createdAt: new Date().toISOString(),
  };

  const res = await request(app).post("/api/tickets").send(ticket);
  expect(res.statusCode).toBe(201);

  const list = await request(app).get("/api/tickets");
  expect(list.body.length).toBe(1);
  expect(list.body[0].id).toBe("T-TEST-1");
});

test("GET /api/tickets/:id returns ticket", async () => {
  const ticket = {
    id: "T-TEST-2",
    title: "Detail Test",
    description: "Beschreibung für Detail Test.",
    status: "open",
    assignedTo: null,
    createdAt: new Date().toISOString(),
  };

  await request(app).post("/api/tickets").send(ticket);

  const res = await request(app).get("/api/tickets/T-TEST-2");
  expect(res.statusCode).toBe(200);
  expect(res.body.title).toBe("Detail Test");
});

test("PATCH /api/tickets/:id updates status and assignedTo", async () => {
  const ticket = {
    id: "T-TEST-3",
    title: "Patch Test",
    description: "Beschreibung für Patch Test.",
    status: "open",
    assignedTo: null,
    createdAt: new Date().toISOString(),
  };

  await request(app).post("/api/tickets").send(ticket);

  const patch = { status: "closed", assignedTo: "Admin" };
  const res = await request(app).patch("/api/tickets/T-TEST-3").send(patch);

  expect(res.statusCode).toBe(200);
  expect(res.body.status).toBe("closed");
  expect(res.body.assignedTo).toBe("Admin");
});

test("DELETE /api/tickets/:id deletes ticket", async () => {
  const ticket = {
    id: "T-TEST-4",
    title: "Delete Test",
    description: "Beschreibung für Delete Test.",
    status: "open",
    assignedTo: null,
    createdAt: new Date().toISOString(),
  };

  await request(app).post("/api/tickets").send(ticket);

  const del = await request(app).delete("/api/tickets/T-TEST-4");
  expect(del.statusCode).toBe(204);

  const res = await request(app).get("/api/tickets/T-TEST-4");
  expect(res.statusCode).toBe(404);
});
