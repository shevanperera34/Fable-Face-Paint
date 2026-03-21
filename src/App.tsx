import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/small-events" element={<HomePage />} />
        <Route path="/birthdays" element={<HomePage />} />
        <Route path="/large-events" element={<HomePage />} />
        <Route path="/corporate" element={<HomePage />} />
        <Route path="/services" element={<HomePage />} />
        <Route path="/gallery" element={<HomePage />} />
        <Route path="/about" element={<HomePage />} />
        <Route path="/faq" element={<HomePage />} />
        <Route path="/contact" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
