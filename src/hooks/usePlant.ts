import { useState, useEffect } from "react";

interface Plant {
  id: string;
  name: string;
  description: string;
  // Add other plant properties as needed
}

interface UsePlantResult {
  plant: Plant | null;
  isLoading: boolean;
  error: Error | null;
}

export function usePlant(id: string): UsePlantResult {
  const [plant, setPlant] = useState<Plant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPlant() {
      try {
        setIsLoading(true);
        // Replace this with your actual API call
        const response = await fetch(`/api/plants/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch plant");
        }
        const data = await response.json();
        setPlant(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setIsLoading(false);
      }
    }

    fetchPlant();
  }, [id]);

  return { plant, isLoading, error };
}
