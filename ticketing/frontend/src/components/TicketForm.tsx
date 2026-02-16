import { useState } from "react";
import type { TicketStatus } from "../types/ticket";

type FormValues = {
  title: string;
  description: string;
  status: TicketStatus;
  assignedTo?: string | null;
};

type Props = {
  initialValues?: FormValues;
  submitLabel?: string;
  onSubmit: (data: FormValues) => Promise<void> | void;
};

export default function TicketForm({
  initialValues,
  submitLabel = "Speichern",
  onSubmit,
}: Props) {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [description, setDescription] = useState(
    initialValues?.description ?? "",
  );
  const [status, setStatus] = useState<TicketStatus>(
    initialValues?.status ?? "open",
  );
  const [assignedTo, setAssignedTo] = useState(initialValues?.assignedTo ?? "");

  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!title.trim()) return setError("Titel ist erforderlich.");
    if (description.trim().length < 10)
      return setError("Beschreibung muss mindestens 10 Zeichen haben.");

    await onSubmit({
      title: title.trim(),
      description: description.trim(),
      status,
      assignedTo: assignedTo.trim() ? assignedTo.trim() : null,
    });
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
        />
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label htmlFor="description">Beschreibung</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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

      <div style={{ display: "grid", gap: 6 }}>
        <label htmlFor="assignedTo">Zuweisung (Admin)</label>
        <input
          id="assignedTo"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          placeholder="z.B. Max Muster"
        />
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
        {submitLabel}
      </button>
    </form>
  );
}
