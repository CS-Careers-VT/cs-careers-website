import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@config/firebase";
import AdminNavbar from "@admin/components/AdminNavbar";

const AdminLayout = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    // Optionally, render a loading indicator while waiting for auth state
    return <div>Loading...</div>;
  }

  if (!user) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/admin/auth/login" replace />;
  }

  // If the user is authenticated, render the protected component(s)
  return (
    <>
      <AdminNavbar />
      <Outlet />;
    </>
  )
};


export default AdminLayout;
