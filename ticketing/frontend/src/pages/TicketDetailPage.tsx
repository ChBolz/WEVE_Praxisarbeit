import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Ticket } from "../types/ticket";
import { getTicketById } from "../services/ticketAPI";

export default function TicketDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (!id) return;

      try {
        const data = await getTicketById(id);
        setTicket(data);
      } catch {
        setError("Ticket konnte nicht geladen werden.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) return <p>Lade Ticket...</p>;
  if (error) return <p>{error}</p>;
  if (!ticket) return <p>Ticket nicht gefunden.</p>;

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
        <h2 style={{ margin: 0 }}>{ticket.title}</h2>
        <span style={{ opacity: 0.7 }}>{ticket.id}</span>
      </div>

      <p style={{ margin: 0 }}>{ticket.description}</p>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <span
          style={{
            border: "1px solid #ccc",
            borderRadius: 999,
            padding: "2px 10px",
          }}
        >
          Status: {ticket.status}
        </span>
        <span style={{ opacity: 0.8 }}>
          Erstellt: {new Date(ticket.createdAt).toLocaleString()}
        </span>
        {ticket.assignedTo ? (
          <span style={{ opacity: 0.8 }}>Zugewiesen: {ticket.assignedTo}</span>
        ) : (
          <span style={{ opacity: 0.6 }}>Nicht zugewiesen</span>
        )}
      </div>

      <div>
        <Link to="/tickets">← Zurück zur Liste</Link>
      </div>
    </div>
  );
}
