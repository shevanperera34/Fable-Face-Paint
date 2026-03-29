import React from "react";
import { BrowserRouter } from "react-router-dom";
import { getBasePath } from "./config/site";
import { AppRoutes } from "./AppRoutes";

const App: React.FC = () => {
  const base = getBasePath();
  return (
    <BrowserRouter basename={base || undefined}>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
