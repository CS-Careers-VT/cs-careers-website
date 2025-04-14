import { useEffect, useState } from 'react';
import AdminUserTable from '@admin/components/AdminUsersTable';
import AdminUserForm from '@admin/components/AdminUsersForm';
import { AdminData, deleteUser, listUsers } from '@admin/services/adminService';
import ConfirmationModal from '@admin/components/ConfirmationModal';
import { resetPassword } from '@admin/services/authService';
import InformationModal from '@admin/components/InformationModal';

function AdminManagement() {
  const [adminUsers, setAdminUsers] = useState<AdminData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [resetPasswordModal, setResetPasswordModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const loadAdminUsers = async () => {
    setLoading(true);
    try {
      const users = await listUsers();
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


  const handleRequestDelete = (uid: string) => {
    setSelectedUserId(uid);
    setConfirmDeleteModalOpen(true);
  };


  const handleConfirmDelete = async () => {
    if (selectedUserId) {
      try {
        await deleteUser(selectedUserId);
        loadAdminUsers();
      } catch (err: any) {
        setError(err.message);
      } finally {
        setConfirmDeleteModalOpen(false);
        setSelectedUserId(null);
      }
    }
  };


  const handleCancelDelete = () => {
    setConfirmDeleteModalOpen(false);
    setSelectedUserId(null);
  };


  const handleResetPassword = async (email: string) => {
    setResetPasswordModal(true);
    try {
      await resetPassword(email);
      // alert('Password reset triggered');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-black">Admin Management</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <p>Loading admin users...</p>
      ) : (
        <AdminUserTable
          adminUsers={adminUsers}
          onDelete={handleRequestDelete}
          onResetPassword={handleResetPassword}
        />
      )}
      <hr className="my-6" />
      <AdminUserForm onUserCreated={loadAdminUsers} />

      <ConfirmationModal
        isOpen={confirmDeleteModalOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this admin user?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      <InformationModal
        isOpen={resetPasswordModal}
        title="Reset Password"
        message="Password reset email sent successfully."
        onClose={() => setResetPasswordModal(false)}
      />
    </div>
  );
}

export default AdminManagement;