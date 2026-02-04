import { useMemo, useState } from "react";
import type { TicketStatus, Ticket } from "../types/ticket";
import { initialTickets } from "../data/dummyTickets";
import TicketList from "../components/TicketList";

export default function TicketListPage() {
  // später ersetzen wir das durch API (useEffect + fetch)
  const [tickets] = useState<Ticket[]>(initialTickets);
  const [filter, setFilter] = useState<TicketStatus | "all">("all");

  const headline = useMemo(() => {
    const map: Record<string, string> = {
      all: "Alle Tickets",
      open: "Offene Tickets",
      in_progress: "Tickets in Bearbeitung",
      closed: "Geschlossene Tickets",
    };
    return map[filter];
  }, [filter]);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h2 style={{ margin: 0 }}>{headline}</h2>
      <TicketList
        tickets={tickets}
        statusFilter={filter}
        onChangeFilter={setFilter}
      />
    </div>
  );
}
