import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Home, AboutUs, Events, PhotoGallery, Sponsorships, CoffeeChats } from "@pages";
import Navbar from '@components/common/Navbar';
import Footer from '@components/common/Footer';

// Scrolls to top on route change, or to the hash target (e.g. "/#follow") when present.
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <div className="bg-glow" aria-hidden="true"></div>
      <div className="bg-grid" aria-hidden="true"></div>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/photo-gallery" element={<PhotoGallery />} />
          <Route path="/sponsorships" element={<Sponsorships />} />
          <Route path="/coffee-chats" element={<CoffeeChats />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
