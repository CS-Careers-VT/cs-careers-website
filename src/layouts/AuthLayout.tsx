import { Navigate, Outlet } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@config/firebase';

function AuthLayout() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    // Optionally, render a loading indicator while waiting for auth state
    return <div>Loading...</div>;
  }

  if (user) {
    // Redirect to the admin home page if the user is already authenticated
    return <Navigate to="/admin" replace />;
  }

  // If the user is not authenticated, render the auth pages
  return (
    <>
        <div className="flex justify-center align-middle min-h-screen bg-gradient-to-b from-csc-maroon to-csc-maroon-bg">
            <div className="bg-gray-700 bg-opacity-70 p-10 rounded-lg shadow-lg w-1/2 max-w-4xl h-fit my-auto px-4 sm:px-4 md:px-8 lg:px-16 xl:px-24  py-20">
                <Outlet />
            </div>
        </div>
    </>
  );
};

export default AuthLayout;
