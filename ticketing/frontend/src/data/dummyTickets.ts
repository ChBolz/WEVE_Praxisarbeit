import type { Ticket } from "../types/ticket";

export const initialTickets: Ticket[] = [
  {
    id: "T-1001",
    title: "Login funktioniert nicht",
    description:
      "Beim Einloggen kommt 'Invalid credentials' obwohl Passwort korrekt ist.",
    status: "open",
    createdAt: new Date().toISOString(),
  },
  {
    id: "T-1002",
    title: "Fehler beim Datei-Upload",
    description: "Upload bricht bei ~30MB ab. Bitte prüfen (Timeout?).",
    status: "in_progress",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "T-1003",
    title: "Ticket schliessen Button fehlt",
    description:
      "In der Detailansicht wird der 'Schliessen' Button nicht angezeigt.",
    status: "closed",
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
];
