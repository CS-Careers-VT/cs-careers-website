import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, AboutUs, NewsEvents, PhotoGallery, Sponsorships } from "@pages/index";
import { MainLayout, AuthLayout, AdminLayout } from '@layouts';
// Admin Routes
import { Login, ForgotPassword } from '@admin/auth/index';
import { AdminHome, AdminEventManagement, AdminPhotoManagement, AdminManagement } from '@admin/pages/index';


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

            <Route path="/admin">
              {/* Admin Auth Routes */}
              <Route element={<AuthLayout />} path="auth">
                <Route path="login" element={<Login/>} />
                <Route path="forgot-password" element={<ForgotPassword/>} />
              </Route>

              {/* Admin Routes - Must be authenticated to access */}
              <Route element={<AdminLayout />}>
                <Route path="" element={<AdminHome />} />
                <Route path="events" element={<AdminEventManagement />} />
                <Route path="photos" element={<AdminPhotoManagement />} />
                <Route path="admin-management" element={<AdminManagement/>} />
              </Route>
            </Route>

          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
