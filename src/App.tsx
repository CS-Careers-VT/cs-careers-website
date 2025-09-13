import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Home, AboutUs, Events, PhotoGallery, Sponsorships } from "@pages";
import Navbar from '@components/common/Navbar';
import Footer from '@components/common/Footer';

// Brings page back to top when new URL is clicked
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <div className='pt-28 bg-csc-maroon-bg min-h-screen'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path='/events' element={<Events />} />
            <Route path='/photo-gallery' element={<PhotoGallery />} />
            <Route path='/sponsorships' element={<Sponsorships />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
