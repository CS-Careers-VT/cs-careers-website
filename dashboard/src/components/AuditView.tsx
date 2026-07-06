import { useEffect, useState } from "react";
import { api } from "../lib/api";
import type { AuditList } from "../lib/types";

const ACTION_STYLE: Record<string, string> = {
  CREATE: "bg-emerald-100 text-emerald-700",
  DELETE: "bg-red-100 text-red-700",
  DEACTIVATE: "bg-amber-100 text-amber-700",
  REACTIVATE: "bg-sky-100 text-sky-700",
};

export default function AuditView() {
  const [data, setData] = useState<AuditList | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .audit(100, 0)
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <div>
      <h2 className="mb-5 text-lg font-semibold text-slate-800">Audit Log</h2>
      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              {["When", "Action", "Resource", "Target", "Actor", "Detail"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 py-2 text-left font-medium text-slate-500"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data?.entries.map((e) => (
              <tr key={e.id} className="hover:bg-slate-50">
                <td className="whitespace-nowrap px-4 py-2 text-slate-500">
                  {new Date(e.created_at).toLocaleString()}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      ACTION_STYLE[e.action] ?? "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {e.action}
                  </span>
                </td>
                <td className="px-4 py-2 text-slate-700">{e.resource}</td>
                <td className="max-w-xs truncate px-4 py-2 text-slate-500">
                  {e.target_id}
                </td>
                <td className="max-w-xs truncate px-4 py-2 text-slate-500">
                  {e.actor_id}
                </td>
                <td className="px-4 py-2 text-slate-500">{e.detail ?? "—"}</td>
              </tr>
            ))}
            {data && data.entries.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-slate-400"
                >
                  No audit entries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
