import type { Ticket } from "../types/ticket";

const BASE_URL = "http://localhost:3000/api/tickets";

export async function getTickets(): Promise<Ticket[]> {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Fehler beim Laden der Tickets");
  return response.json();
}

export async function createTicket(ticket: Ticket): Promise<void> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ticket),
  });

  if (!response.ok) throw new Error("Fehler beim Erstellen des Tickets");
}

export async function getTicketById(id: string): Promise<Ticket> {
  const response = await fetch(`${BASE_URL}/${encodeURIComponent(id)}`);
  if (!response.ok) throw new Error("Ticket nicht gefunden");
  return response.json();
}

export async function updateTicket(
  id: string,
  patch: Partial<Ticket>,
): Promise<Ticket> {
  const response = await fetch(`${BASE_URL}/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  if (!response.ok) throw new Error("Fehler beim Aktualisieren des Tickets");
  return response.json();
}

export async function deleteTicket(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  if (!response.ok && response.status !== 204) {
    throw new Error("Fehler beim Löschen des Tickets");
  }
}
