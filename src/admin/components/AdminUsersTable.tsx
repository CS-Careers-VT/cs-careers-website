import { AdminData } from '@admin/services/adminService';

interface AdminUsersTableProps {
  adminUsers: AdminData[];
  onDelete: (uid: string) => void;
  onResetPassword: (uid: string) => void;
}

function AdminUsersTable({ adminUsers, onDelete, onResetPassword }: AdminUsersTableProps) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="border px-4 py-2">Name</th>
          <th className="border px-4 py-2">Email</th>
          <th className="border px-4 py-2">Last Login</th>
          <th className="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {adminUsers.map((user) => (
          <tr key={user.uid}>
            <td className="border px-4 py-2">{user.displayName}</td>
            <td className="border px-4 py-2">{user.email}</td>
            <td className="border px-4 py-2">{user.uid}</td>
            <td className="border px-4 py-2 space-x-2">
              <button
                onClick={() => onResetPassword(user.email)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Reset Password
              </button>
              <button
                onClick={() => onDelete(user.uid)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AdminUsersTable;