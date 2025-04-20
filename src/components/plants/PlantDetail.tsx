interface Plant {
  id: string;
  name: string;
  description: string;
  // Add other plant properties as needed
}

interface PlantDetailProps {
  plant: Plant;
}

export function PlantDetail({ plant }: PlantDetailProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-3xl font-bold mb-4">{plant.name}</h1>
      <p className="text-gray-600 mb-6">{plant.description}</p>
      {/* Add more plant details as needed */}
    </div>
  );
}
