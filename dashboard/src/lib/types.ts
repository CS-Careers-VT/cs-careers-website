export type Role = "MEMBER" | "DEV" | "ADMIN";

export interface Me {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: Role;
  joined_at: string;
}

export interface ResourceColumn {
  name: string;
  required: boolean;
  creatable: boolean;
}

export interface ResourceInfo {
  name: string;
  label: string;
  min_role: Role;
  supports_soft_delete: boolean;
  columns: ResourceColumn[];
}

export interface RowList {
  rows: Record<string, unknown>[];
  total: number;
  limit: number;
  offset: number;
}

export interface AuditEntry {
  id: string;
  actor_id: string;
  action: string;
  resource: string;
  target_id: string;
  detail: string | null;
  created_at: string;
}

export interface AuditList {
  entries: AuditEntry[];
  total: number;
}
