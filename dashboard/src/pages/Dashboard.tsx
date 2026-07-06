import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { api } from "../lib/api";
import type { ResourceInfo } from "../lib/types";
import ResourceTable from "../components/ResourceTable";
import AuditView from "../components/AuditView";

type Selection = { kind: "resource"; resource: ResourceInfo } | { kind: "audit" };

export default function Dashboard() {
  const { me, signOut } = useAuth();
  const [resources, setResources] = useState<ResourceInfo[]>([]);
  const [selection, setSelection] = useState<Selection | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .resources()
      .then((rs) => {
        setResources(rs);
        if (rs.length) setSelection({ kind: "resource", resource: rs[0] });
      })
      .catch((e) => setError(e.message));
  }, []);

  const isAdmin = me?.role === "ADMIN";

  return (
    <div className="flex h-full bg-slate-50">
      <aside className="flex w-64 flex-col border-r border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4">
          <h1 className="text-sm font-semibold text-slate-800">
            Admin Dashboard
          </h1>
          <p className="mt-0.5 truncate text-xs text-slate-500">
            {me?.email}
          </p>
          <span className="mt-2 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
            {me?.role}
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <p className="px-2 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Data
          </p>
          {resources.map((r) => {
            const active =
              selection?.kind === "resource" &&
              selection.resource.name === r.name;
            return (
              <button
                key={r.name}
                onClick={() => setSelection({ kind: "resource", resource: r })}
                className={`mb-1 w-full rounded-lg px-3 py-2 text-left text-sm ${
                  active
                    ? "bg-slate-800 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {r.label}
              </button>
            );
          })}

          {isAdmin && (
            <>
              <p className="mt-4 px-2 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                System
              </p>
              <button
                onClick={() => setSelection({ kind: "audit" })}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm ${
                  selection?.kind === "audit"
                    ? "bg-slate-800 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                Audit Log
              </button>
            </>
          )}
        </nav>

        <div className="border-t border-slate-200 p-3">
          <button
            onClick={signOut}
            className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-100"
          >
            Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}
        {selection?.kind === "resource" && (
          <ResourceTable
            key={selection.resource.name}
            resource={selection.resource}
          />
        )}
        {selection?.kind === "audit" && <AuditView />}
        {!selection && !error && (
          <p className="text-sm text-slate-500">No resources available.</p>
        )}
      </main>
    </div>
  );
}
