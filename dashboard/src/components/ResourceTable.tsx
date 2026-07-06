import { useCallback, useEffect, useState } from "react";
import { api, ApiError } from "../lib/api";
import type { ResourceInfo, RowList } from "../lib/types";
import CreateRowModal from "./CreateRowModal";

const PAGE = 25;

function cell(value: unknown): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

export default function ResourceTable({ resource }: { resource: ResourceInfo }) {
  const [data, setData] = useState<RowList | null>(null);
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  const load = useCallback(async () => {
    setError(null);
    try {
      const d = await api.listRows(resource.name, PAGE, offset);
      setData(d);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    }
  }, [resource.name, offset]);

  useEffect(() => {
    load();
  }, [load]);

  async function act(fn: () => Promise<unknown>, confirmMsg?: string) {
    if (confirmMsg && !window.confirm(confirmMsg)) return;
    setBusy(true);
    setError(null);
    try {
      await fn();
      await load();
    } catch (e) {
      const msg =
        e instanceof ApiError ? e.message : e instanceof Error ? e.message : "Action failed";
      setError(msg);
    } finally {
      setBusy(false);
    }
  }

  const columns = data?.rows.length
    ? Object.keys(data.rows[0])
    : resource.columns.map((c) => c.name);

  const rowId = (row: Record<string, unknown>) => String(row["id"] ?? "");
  const isActive = (row: Record<string, unknown>) => row["is_active"] === true;

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            {resource.label}
          </h2>
          <p className="text-sm text-slate-500">
            {data ? `${data.total} row(s)` : "Loading…"} · requires{" "}
            {resource.min_role}
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          + Add row
        </button>
      </div>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((c) => (
                <th
                  key={c}
                  className="px-4 py-2 text-left font-medium text-slate-500"
                >
                  {c}
                </th>
              ))}
              <th className="px-4 py-2 text-right font-medium text-slate-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data?.rows.map((row) => (
              <tr key={rowId(row)} className="hover:bg-slate-50">
                {columns.map((c) => (
                  <td
                    key={c}
                    className="max-w-xs truncate px-4 py-2 text-slate-700"
                    title={cell(row[c])}
                  >
                    {cell(row[c])}
                  </td>
                ))}
                <td className="whitespace-nowrap px-4 py-2 text-right">
                  {resource.supports_soft_delete &&
                    (isActive(row) ? (
                      <button
                        disabled={busy}
                        onClick={() =>
                          act(() =>
                            api.deactivateRow(resource.name, rowId(row))
                          )
                        }
                        className="mr-2 text-xs font-medium text-amber-600 hover:underline disabled:opacity-50"
                      >
                        Deactivate
                      </button>
                    ) : (
                      <button
                        disabled={busy}
                        onClick={() =>
                          act(() =>
                            api.reactivateRow(resource.name, rowId(row))
                          )
                        }
                        className="mr-2 text-xs font-medium text-emerald-600 hover:underline disabled:opacity-50"
                      >
                        Reactivate
                      </button>
                    ))}
                  <button
                    disabled={busy}
                    onClick={() =>
                      act(
                        () => api.deleteRow(resource.name, rowId(row)),
                        `Permanently delete this ${resource.label} row? This cannot be undone.`
                      )
                    }
                    className="text-xs font-medium text-red-600 hover:underline disabled:opacity-50"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {data && data.rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-8 text-center text-slate-400"
                >
                  No rows.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {data && data.total > PAGE && (
        <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
          <span>
            {offset + 1}–{Math.min(offset + PAGE, data.total)} of {data.total}
          </span>
          <div className="space-x-2">
            <button
              disabled={offset === 0}
              onClick={() => setOffset(Math.max(0, offset - PAGE))}
              className="rounded-lg border border-slate-300 px-3 py-1 disabled:opacity-40"
            >
              Prev
            </button>
            <button
              disabled={offset + PAGE >= data.total}
              onClick={() => setOffset(offset + PAGE)}
              className="rounded-lg border border-slate-300 px-3 py-1 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {showCreate && (
        <CreateRowModal
          resource={resource}
          onClose={() => setShowCreate(false)}
          onCreated={() => {
            setShowCreate(false);
            load();
          }}
        />
      )}
    </div>
  );
}
