import { supabase } from "./supabase";
import type {
  AuditList,
  Me,
  ResourceInfo,
  RowList,
} from "./types";

const BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function authHeader(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(await authHeader()),
    ...((options.headers as Record<string, string>) ?? {}),
  };

  const resp = await fetch(`${BASE}${path}`, { ...options, headers });

  if (resp.status === 204) {
    return undefined as T;
  }

  let body: unknown = null;
  const text = await resp.text();
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = text;
    }
  }

  if (!resp.ok) {
    const detail =
      (body as { detail?: string } | null)?.detail ?? resp.statusText;
    throw new ApiError(resp.status, detail);
  }

  return body as T;
}

export const api = {
  me: () => request<Me>("/api/auth/me"),

  resources: () =>
    request<{ resources: ResourceInfo[] }>("/api/admin/resources").then(
      (r) => r.resources
    ),

  listRows: (resource: string, limit = 50, offset = 0) =>
    request<RowList>(
      `/api/admin/${resource}?limit=${limit}&offset=${offset}`
    ),

  createRow: (resource: string, data: Record<string, unknown>) =>
    request<{ row: Record<string, unknown> }>(`/api/admin/${resource}`, {
      method: "POST",
      body: JSON.stringify({ data }),
    }),

  deleteRow: (resource: string, id: string) =>
    request<void>(`/api/admin/${resource}/${id}`, { method: "DELETE" }),

  deactivateRow: (resource: string, id: string) =>
    request<{ row: Record<string, unknown> }>(
      `/api/admin/${resource}/${id}/deactivate`,
      { method: "POST" }
    ),

  reactivateRow: (resource: string, id: string) =>
    request<{ row: Record<string, unknown> }>(
      `/api/admin/${resource}/${id}/reactivate`,
      { method: "POST" }
    ),

  audit: (limit = 50, offset = 0) =>
    request<AuditList>(`/api/admin/audit?limit=${limit}&offset=${offset}`),
};
