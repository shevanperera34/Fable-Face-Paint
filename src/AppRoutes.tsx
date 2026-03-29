import { Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FaqPage from "./pages/FaqPage";
import GalleryPage from "./pages/GalleryPage";
import LargeEventsPage from "./pages/LargeEventsPage";
import ServicesPage from "./pages/ServicesPage";
import SmallEventsPage from "./pages/SmallEventsPage";

export function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/small-events" element={<SmallEventsPage />} />
      <Route path="/birthdays" element={<Navigate to="/small-events" replace />} />
      <Route path="/large-events" element={<LargeEventsPage />} />
      <Route path="/corporate" element={<Navigate to="/large-events" replace />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  );
}
