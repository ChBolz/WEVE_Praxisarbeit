import { useNavigate } from "react-router-dom";
import TicketForm from "../components/TicketForm";
import type { Ticket } from "../types/ticket";
import { createTicket } from "../services/ticketAPI";

export default function TicketCreatePage() {
  const navigate = useNavigate();

  async function handleCreate(data: Omit<Ticket, "id" | "createdAt">) {
    const newTicket: Ticket = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...data,
    };

    await createTicket(newTicket);

    navigate("/tickets");
  }

  return (
    <div>
      <h2>Neues Ticket</h2>
      <TicketForm onCreate={handleCreate} />
    </div>
  );
}
