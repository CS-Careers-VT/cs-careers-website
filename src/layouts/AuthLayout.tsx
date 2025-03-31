import { Outlet } from 'react-router-dom';
import Navbar from '@components/common/Navbar';
import Footer from '@components/common/Footer';

function AuthLayout() {
  return (
    <>
        <div className="flex justify-center align-middle min-h-screen bg-gradient-to-b from-csc-maroon to-csc-organge">
            <div className="bg-gray-700 bg-opacity-70 p-10 rounded-lg shadow-lg w-xl h-fit my-auto">
                <Outlet />
            </div>
        </div>
    </>
  );
};

export default AuthLayout;
