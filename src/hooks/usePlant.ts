import { useState, useEffect } from "react";
import { Plant } from "../types/api";
import { api } from "../lib/api";

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
        setError(null);
        const data = await api.plants.getById(id);
        setPlant(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch plant")
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchPlant();
  }, [id]);

  return { plant, isLoading, error };
}
