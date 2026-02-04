import { useState } from "react";
import type { Ticket, TicketStatus } from "../types/ticket";

type Props = {
  onCreate: (data: Omit<Ticket, "id" | "createdAt">) => void;
};

export default function TicketForm({ onCreate }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TicketStatus>("open");

  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!title.trim()) return setError("Titel ist erforderlich.");
    if (description.trim().length < 10)
      return setError("Beschreibung muss mindestens 10 Zeichen haben.");

    onCreate({
      title: title.trim(),
      description: description.trim(),
      status,
    });

    setTitle("");
    setDescription("");
    setStatus("open");
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "grid", gap: 12, maxWidth: 600 }}
    >
      <div style={{ display: "grid", gap: 6 }}>
        <label htmlFor="title">Titel</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="z.B. Login funktioniert nicht"
        />
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label htmlFor="description">Beschreibung</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Beschreibe das Problem kurz und konkret…"
          rows={5}
        />
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as TicketStatus)}
        >
          <option value="open">open</option>
          <option value="in_progress">in_progress</option>
          <option value="closed">closed</option>
        </select>
      </div>

      {error && (
        <div
          style={{ padding: 10, border: "1px solid #f3c4c4", borderRadius: 8 }}
        >
          <strong>Fehler:</strong> {error}
        </div>
      )}

      <button
        type="submit"
        style={{ width: "fit-content", padding: "8px 14px" }}
      >
        Ticket erstellen
      </button>
    </form>
  );
}
