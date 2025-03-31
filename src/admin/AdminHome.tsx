import { signOut } from 'firebase/auth';
import { auth } from '@config/firebase';

function AdminHome() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
      // Optionally, you can redirect the user after logout
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      <div className="bg-csc-maroon-bg min-h-screen">
        <h1>Admin Home!</h1>
        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default AdminHome;
