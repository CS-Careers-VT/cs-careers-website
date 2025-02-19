import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, AboutUs, NewsEvents, PhotoGallery, Sponsorships } from "@pages";
import Navbar from '@components/common/Navbar';
import Footer from '@components/common/Footer';


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path='/news-events' element={<NewsEvents />} />
          <Route path='/photo-gallery' element={<PhotoGallery />} />
          <Route path='/sponsorships' element={<Sponsorships />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
