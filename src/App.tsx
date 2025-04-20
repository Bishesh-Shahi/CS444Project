import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TreeSelectionPage } from "./pages/TreeSelectionPage";
import { AboutPage } from "./pages/AboutPage";
import { LocationPage } from "./pages/LocationPage";
import { ImagesPage } from "./pages/ImagesPage";
import { PlantDetailPage } from "./pages/PlantDetailPage";
import { RootLayout } from "./components/layout/RootLayout";

function App() {
  return (
    <Router>
      <RootLayout>
        <Routes>
          <Route path="/" element={<TreeSelectionPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/images" element={<ImagesPage />} />
          <Route path="/plants/:id" element={<PlantDetailPage />} />
        </Routes>
      </RootLayout>
    </Router>
  );
}

export default App;
