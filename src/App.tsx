import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import { Navigation } from "./components/ui/Navigation";
import { AboutPage } from "./pages/AboutPage";
import { LocationPage } from "./pages/LocationPage";
import { ImagesPage } from "./pages/ImagesPage";
import { TreeSelectionPage } from "./pages/TreeSelectionPage";
import { PlantDetail } from "./components/plants/PlantDetail";
import { Spinner } from "./components/ui/Spinner";
import { usePlant } from "./hooks/usePlant";

// Create a Plant Detail Page component that uses the hook and displays the plant
function PlantDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { plant, isLoading, error } = usePlant(id || "1");

  if (error) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-600">{error.message}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <Spinner />
        <p className="mt-4 text-gray-600">Loading plant details...</p>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Plant Not Found
        </h2>
        <p className="text-gray-600">The requested plant could not be found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <PlantDetail plant={plant} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <main className="container mx-auto py-8 px-4">
          <Routes>
            <Route path="/" element={<TreeSelectionPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/location" element={<LocationPage />} />
            <Route path="/images" element={<ImagesPage />} />
            <Route path="/plants/:id" element={<PlantDetailPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
