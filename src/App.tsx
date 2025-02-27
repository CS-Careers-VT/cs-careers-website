import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AboutUs from './pages/AboutUs';
import Home from './pages/Home';
import NewsEvents from './pages/NewsEvents';
import PhotoGallery from './pages/PhotoGallery';
import Sponsorships from './pages/Sponsorships';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path='/news-events' element={<NewsEvents />} />
          <Route path='/photo-gallery' element={<PhotoGallery />} />
          <Route path='/sponsorships' element={<Sponsorships />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
