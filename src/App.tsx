import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, AboutUs, NewsEvents, PhotoGallery, Sponsorships } from "@pages";


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
