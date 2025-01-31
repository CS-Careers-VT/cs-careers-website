import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import AboutUs from "../pages/AboutUs/AboutUs";
import NewsEvents from "../pages/NewsEvents/NewsEvents";
import Sponsorships from "../pages/Sponsorships/Sponsorships";
import PhotoGallery from "../pages/PhotoGallery/PhotoGallery";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/news-events" element={<NewsEvents />} />
        <Route path="/sponsorships" element={<Sponsorships />} />
        <Route path="/photo-gallery" element={<PhotoGallery />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
