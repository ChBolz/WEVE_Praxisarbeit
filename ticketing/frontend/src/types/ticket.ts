export type TicketStatus = "open" | "in_progress" | "closed";

export type Ticket = {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  createdAt: string; // ISO string
};
