import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TicketForm from "../components/TicketForm";
import type { Ticket } from "../types/ticket";
import { initialTickets } from "../data/dummyTickets";

export default function TicketCreatePage() {
  const navigate = useNavigate();

  // Fürs erste: lokal (Dummy). Später: POST /api/tickets
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);

  function createTicket(data: Omit<Ticket, "id" | "createdAt">) {
    const newTicket: Ticket = {
      id: `T-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      ...data,
    };

    setTickets((prev) => [newTicket, ...prev]);

    // zurück zur Liste
    navigate("/tickets");
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h2 style={{ margin: 0 }}>Neues Ticket</h2>
      <TicketForm onCreate={createTicket} />

      <p style={{ opacity: 0.75, fontSize: 12 }}>
        Hinweis: Aktuell wird lokal gespeichert (Dummy). Als nächstes ersetzen
        wir das durch Backend + SQLite.
      </p>

      <details>
        <summary>Debug: Lokale Tickets (nur zur Kontrolle)</summary>
        <pre style={{ whiteSpace: "pre-wrap" }}>
          {JSON.stringify(tickets, null, 2)}
        </pre>
      </details>
    </div>
  );
}
