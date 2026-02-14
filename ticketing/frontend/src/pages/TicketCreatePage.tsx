import { useNavigate } from "react-router-dom";
import TicketForm from "../components/TicketForm";
import type { Ticket } from "../types/ticket";
import { createTicket } from "../services/ticketAPI";

export default function TicketCreatePage() {
  const navigate = useNavigate();

  async function handleCreate(data: {
    title: string;
    description: string;
    status: Ticket["status"];
    assignedTo?: string | null;
  }) {
    const newTicket: Ticket = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      title: data.title,
      description: data.description,
      status: data.status,
      assignedTo: data.assignedTo ?? null,
    };

    await createTicket(newTicket);
    navigate("/tickets");
  }

  return (
    <div>
      <h2>Neues Ticket</h2>
      <TicketForm submitLabel="Ticket erstellen" onSubmit={handleCreate} />
    </div>
  );
}
