import type { Ticket, TicketStatus } from "../types/ticket";
import { Link } from "react-router-dom";

type Props = {
  tickets: Ticket[];
  statusFilter: TicketStatus | "all";
  onChangeFilter: (value: TicketStatus | "all") => void;
};

export default function TicketList({
  tickets,
  statusFilter,
  onChangeFilter,
}: Props) {
  const filtered =
    statusFilter === "all"
      ? tickets
      : tickets.filter((t) => t.status === statusFilter);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <label htmlFor="statusFilter">Filter:</label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) =>
            onChangeFilter(e.target.value as TicketStatus | "all")
          }
        >
          <option value="all">Alle</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>

        <span style={{ marginLeft: "auto", opacity: 0.8 }}>
          {filtered.length} / {tickets.length}
        </span>
      </div>

      {filtered.length === 0 ? (
        <p style={{ opacity: 0.8 }}>Keine Tickets im aktuellen Filter.</p>
      ) : (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "grid",
            gap: 10,
          }}
        >
          {filtered.map((t) => (
            <li
              key={t.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: 8,
                padding: 12,
                display: "grid",
                gap: 6,
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <strong>
                  {" "}
                  <Link
                    to={`/tickets/${encodeURIComponent(t.id)}`}
                    style={{ textDecoration: "none" }}
                  >
                    {t.title}
                  </Link>
                </strong>
                <span style={{ opacity: 0.7, fontSize: 12 }}>{t.id}</span>
                <span
                  style={{ marginLeft: "auto", fontSize: 12, opacity: 0.7 }}
                >
                  {new Date(t.createdAt).toLocaleString()}
                </span>
              </div>

              <div style={{ opacity: 0.9 }}>{t.description}</div>

              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span
                  style={{
                    fontSize: 12,
                    padding: "2px 8px",
                    borderRadius: 999,
                    border: "1px solid #ccc",
                  }}
                >
                  {t.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
