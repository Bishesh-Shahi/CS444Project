import { useState, useEffect } from "react";
import { api } from "../lib/api";
import { Plant } from "../types/api";

export function usePlant(id: string) {
  const [plant, setPlant] = useState<Plant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPlant() {
      try {
        setIsLoading(true);
        const data = await api.plants.getById(id);
        setPlant(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch plant")
        );
        setPlant(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPlant();
  }, [id]);

  return { plant, isLoading, error };
}
