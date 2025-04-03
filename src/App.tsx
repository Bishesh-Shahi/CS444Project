<<<<<<< HEAD
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/ui/Navigation";
import { AboutPage } from "./pages/AboutPage";
import { LocationPage } from "./pages/LocationPage";
import { RootLayout } from "./layouts/RootLayout";
import { PlantDetail } from "./components/plants/PlantDetail";
import { Spinner } from "./components/ui/Spinner";
import { usePlant } from "./hooks/usePlant";
import { TreeList } from "./components/TreeList";
import { TreeDetail } from "./components/trees/TreeDetail";

// Sample data
const samplePlant = {
  scientificName: "Magnolia x 'Ann'",
  commonName: "Ann Magnolia",
  description:
    'A member of the "Little Girl" group of hybrid magnolias developed in the mid-fifties at the U.S. National Arboretum. Hardy shrub or small tree. Impressive deep purple-red flowers with 7-9 petals that resemble a tulip. Blooms mid to late March and may sporadically bloom again in summer. Leaves are dark green and somewhat leathery in appearance.',
  bark: "The plant's bark is showy.",
  flower:
    "Impressive deep purple-red flowers with 7-9 petals that resemble a tulip.",
  fruit:
    "This plant rarely fruits but when it does the fruit is red in color and dry.",
  hardiness: "4 to 7",
  height: "8 - 10 feet",
  leaf: "Leaves are dark green and somewhat leathery in appearance.",
  isNative: false,
  features: [
    "Flowers are very fragrant and very showy",
    "Blooms in early spring",
    "Purple-red flowers",
    "Compact growth habit",
  ],
  sunExposure: "Partial shade to full sun",
  width: "10 feet",
};

function PlantDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { plant, isLoading, error } = usePlant(id!);

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
        <Spinner size="lg" className="mx-auto text-primary" />
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

  return <PlantDetail plant={plant} />;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<AboutPage />} />
            <Route path="/location" element={<LocationPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
=======
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
>>>>>>> 4ad53782d32301002638b06efc23e708124999a6
