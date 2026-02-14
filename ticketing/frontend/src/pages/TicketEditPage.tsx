import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TicketForm from "../components/TicketForm";
import type { Ticket } from "../types/ticket";
import { getTicketById, updateTicket } from "../services/ticketApi";

export default function TicketEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!id) return;
      try {
        const t = await getTicketById(id);
        setTicket(t);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <p>Lade Ticket...</p>;
  if (!ticket) return <p>Ticket nicht gefunden.</p>;

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <h2 style={{ margin: 0 }}>Ticket bearbeiten</h2>

      <TicketForm
        submitLabel="Änderungen speichern"
        initialValues={{
          title: ticket.title,
          description: ticket.description,
          status: ticket.status,
          assignedTo: ticket.assignedTo ?? null,
        }}
        onSubmit={async (values) => {
          if (!id) return;
          await updateTicket(id, values);
          navigate(`/tickets/${encodeURIComponent(id)}`);
        }}
      />

      <div>
        <Link to={`/tickets/${encodeURIComponent(ticket.id)}`}>
          ← Zurück zum Ticket
        </Link>
      </div>
    </div>
  );
}
