import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Ticket } from "../types/ticket";
import { getTicketById } from "../services/ticketAPI";
import { updateTicket } from "../services/ticketAPI";
import type { TicketStatus } from "../types/ticket";

export default function TicketDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [assignedToDraft, setAssignedToDraft] = useState("");
  const [statusDraft, setStatusDraft] = useState<TicketStatus>("open");

  useEffect(() => {
    async function load() {
      if (!id) return;

      try {
        const data = await getTicketById(id);
        setTicket(data);
        setAssignedToDraft(data.assignedTo ?? "");
        setStatusDraft(data.status);
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
      <section
        style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}
      >
        <h3 style={{ marginTop: 0 }}>Admin: Schnellaktionen</h3>

        <div style={{ display: "grid", gap: 10, maxWidth: 420 }}>
          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="statusDraft">Status</label>
            <select
              id="statusDraft"
              value={statusDraft}
              onChange={(e) => setStatusDraft(e.target.value as TicketStatus)}
              disabled={saving}
            >
              <option value="open">open</option>
              <option value="in_progress">in_progress</option>
              <option value="closed">closed</option>
            </select>
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label htmlFor="assignedToDraft">Zuweisen an</label>
            <input
              id="assignedToDraft"
              value={assignedToDraft}
              onChange={(e) => setAssignedToDraft(e.target.value)}
              placeholder="z.B. Max Muster"
              disabled={saving}
            />
          </div>

          <button
            type="button"
            disabled={saving}
            onClick={async () => {
              if (!ticket) return;
              setSaving(true);
              setError(null);

              try {
                const updated = await updateTicket(ticket.id, {
                  status: statusDraft,
                  assignedTo: assignedToDraft.trim()
                    ? assignedToDraft.trim()
                    : null,
                });
                setTicket(updated);
              } catch {
                setError("Änderungen konnten nicht gespeichert werden.");
              } finally {
                setSaving(false);
              }
            }}
            style={{ width: "fit-content", padding: "8px 14px" }}
          >
            {saving ? "Speichere..." : "Änderungen speichern"}
          </button>
        </div>
      </section>
      <div>
        <Link to="/tickets">← Zurück zur Liste</Link>
      </div>
      <div>
        {" "}
        <Link to={`/tickets/${encodeURIComponent(ticket.id)}/edit`}>
          Ticket bearbeiten
        </Link>
      </div>
    </div>
  );
}
