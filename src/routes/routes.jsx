import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import NewsEvents from "../pages/NewsEvents";
import Sponsorships from "../pages/Sponsorships";
import PhotoGallery from "../pages/PhotoGallery";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/news-events" element={<NewsEvents />} />
        <Route path="/sponsorships" element={<Sponsorships />} />
        <Route path="/photo-gallery" element={<PhotoGallery />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
