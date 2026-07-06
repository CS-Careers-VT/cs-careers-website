import { useState } from "react";
import { api, ApiError } from "../lib/api";
import type { ResourceInfo } from "../lib/types";

export default function CreateRowModal({
  resource,
  onClose,
  onCreated,
}: {
  resource: ResourceInfo;
  onClose: () => void;
  onCreated: () => void;
}) {
  const creatable = resource.columns.filter((c) => c.creatable);
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function set(name: string, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    // Drop empty optional fields; coerce simple booleans.
    const payload: Record<string, unknown> = {};
    for (const col of creatable) {
      const raw = values[col.name];
      if (raw === undefined || raw === "") {
        if (col.required) {
          setError(`"${col.name}" is required`);
          setBusy(false);
          return;
        }
        continue;
      }
      if (raw === "true") payload[col.name] = true;
      else if (raw === "false") payload[col.name] = false;
      else payload[col.name] = raw;
    }

    try {
      await api.createRow(resource.name, payload);
      onCreated();
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : err instanceof Error
            ? err.message
            : "Failed to create"
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/40 p-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
      >
        <h3 className="text-lg font-semibold text-slate-800">
          Add {resource.label} row
        </h3>

        <div className="mt-4 max-h-[60vh] space-y-3 overflow-y-auto">
          {creatable.map((col) => (
            <label
              key={col.name}
              className="block text-sm font-medium text-slate-700"
            >
              {col.name}
              {col.required && <span className="text-red-500"> *</span>}
              <input
                value={values[col.name] ?? ""}
                onChange={(e) => set(col.name, e.target.value)}
                placeholder={col.required ? "required" : "optional"}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
              />
            </label>
          ))}
        </div>

        {error && (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={busy}
            className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
          >
            {busy ? "Creating…" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
