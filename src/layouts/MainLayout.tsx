import { Outlet } from 'react-router-dom';
import Navbar from '@components/common/Navbar';
import Footer from '@components/common/Footer';

function MainLayout() {
  return (
    <>
        <Navbar />
        <div className='pt-28 bg-csc-maroon-bg min-h-screen'>
            <Outlet />
        </div>
        <Footer />
    </>
  );
};

export default MainLayout;
