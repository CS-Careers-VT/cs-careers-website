import { useState } from "react";
import { Link } from "react-router-dom";
import mainLogo from "@assets/main_logo.svg";
import { signOut } from 'firebase/auth';
import { auth } from '@config/firebase';

function AdminNavbar() {
    const [navbar, setNavbar] = useState(false);

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
        <nav className="w-full bg-csc-maroon-bg shadow">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <div className="flex items-center space-x-2">
                            <img
                                src={mainLogo}
                                alt="CS Careers @ VT Logo"
                                className="h-16 w-auto object-contain" />
                            <p>
                                Admin
                            </p>
                        </div>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-white"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
                            }`}
                    >
                        <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                            <li className="text-white hover:text-indigo-200">
                                <Link to="/admin">Home</Link>
                            </li>
                            <li className="text-white hover:text-indigo-200">
                                <Link to="/admin/events">Events</Link>
                            </li>
                            <li className="text-white hover:text-indigo-200">
                                <Link to="/admin/photos">Photos</Link>
                            </li>
                            <li className="text-white hover:text-indigo-200">
                                <Link to="/admin/admin-management">Admin Management</Link>
                            </li>
                        </ul>

                        <div className="mt-3 space-y-2 lg:hidden md:inline-block">
                            <button
                                onClick={handleLogout}
                                className="bg-csc-organge rounded-md py-2 px-4 text-white hover:bg-opacity-55">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
                <div className="hidden space-x-2 md:inline-block">
                    <button
                        onClick={handleLogout}
                        className="bg-csc-organge rounded-md py-2 px-4 text-white hover:bg-opacity-55">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default AdminNavbar;