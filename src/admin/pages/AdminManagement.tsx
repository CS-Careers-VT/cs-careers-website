import { useEffect, useState } from 'react';
import AdminUserTable from '@admin/components/AdminUsersTable';
import AdminUserForm from '@admin/components/AdminUsersForm';
import { deleteAdminUser, fetchAdminUsers } from '@admin/services/adminService';
import { UserInfo } from 'firebase/auth';

function AdminManagement() {
  const [adminUsers, setAdminUsers] = useState<UserInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadAdminUsers = async () => {
    setLoading(true);
    try {
      const users = await fetchAdminUsers();
      setAdminUsers(users);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminUsers();
  }, []);

  const handleDelete = async (uid: string) => {
    if (window.confirm('Are you sure you want to delete this admin user?')) {
      try {
        await deleteAdminUser(uid);
        loadAdminUsers();
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  // const handleResetPassword = async (uid: string) => {
  //   if (window.confirm('Trigger password reset for this admin user?')) {
  //     try {
  //       await resetPasswordForUser(uid);
  //       alert('Password reset triggered');
  //     } catch (err: any) {
  //       setError(err.message);
  //     }
  //   }
  // };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Management</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <p>Loading admin users...</p>
      ) : (
        <AdminUserTable
          adminUsers={adminUsers}
          onDelete={handleDelete}
          // onResetPassword={handleResetPassword}
        />
      )}
      <hr className="my-6" />
      <AdminUserForm onUserCreated={loadAdminUsers} />
    </div>
  );
}

export default AdminManagement;