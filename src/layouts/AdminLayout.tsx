import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@config/firebase";

// function AdminLayout() {
//   return (
//     <div className="flex min-h-screen">
//       <div className="flex-1 p-6 bg-gray-100">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

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
  return <Outlet />;
};


export default AdminLayout;
