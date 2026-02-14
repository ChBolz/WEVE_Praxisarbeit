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
