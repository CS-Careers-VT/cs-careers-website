import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, AboutUs, NewsEvents, PhotoGallery, Sponsorships } from "@pages/index";
import { MainLayout } from '@layouts';
import Navbar from '@components/common/Navbar';
import Footer from '@components/common/Footer';


function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            {/* 404 Route */}
            <Route path="*" element={<h1 className="text-black">404 Not Found</h1>} />`


            {/* Public Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path='/news-events' element={<NewsEvents />} />
              <Route path='/photo-gallery' element={<PhotoGallery />} />
              <Route path='/sponsorships' element={<Sponsorships />} />
            </Route>

          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
