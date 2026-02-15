import { useEffect, useState } from "react";
import type { Ticket, TicketStatus } from "../types/ticket";
import TicketList from "../components/TicketList";
import { getTickets } from "../services/ticketAPI";
import { useLocation } from "react-router-dom";

export default function TicketListPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filter, setFilter] = useState<TicketStatus | "all">("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await getTickets();
        setTickets(data);
      } catch {
        setError("Tickets konnten nicht geladen werden.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [location.key]);

  if (loading) return <p>Lade Tickets...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Tickets</h2>
      <TicketList
        tickets={tickets}
        statusFilter={filter}
        onChangeFilter={setFilter}
      />
    </div>
  );
}
