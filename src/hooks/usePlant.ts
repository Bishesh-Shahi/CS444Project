/**
 * Hook for fetching and managing plant data
 */
import { useState, useEffect } from "react";

/**
 * Plant information structure
 */
export interface Plant {
  /** Scientific name of the plant */
  scientificName: string;
  /** Common name of the plant */
  commonName: string;
  /** Description of the plant */
  description: string;
  /** Plant bark characteristics */
  bark?: string;
  /** Flower characteristics */
  flower?: string;
  /** Fruit characteristics */
  fruit?: string;
  /** USDA hardiness zones where the plant thrives */
  hardiness: string;
  /** Maximum height of the plant */
  height: string;
  /** Leaf characteristics */
  leaf?: string;
  /** Whether the plant is native to the region */
  isNative: boolean;
  /** Special features of the plant */
  features: string[];
  /** Preferred sun exposure */
  sunExposure: string;
  /** Maximum width/spread of the plant */
  width: string;
}

/**
 * Hook that fetches plant data by ID
 * @param plantId - The ID of the plant to fetch
 * @returns Object containing plant data, loading state, and any error that occurred
 */
export const usePlant = (plantId: string) => {
  const [plant, setPlant] = useState<Plant | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Don't fetch without a valid plantId
    if (!plantId) {
      setPlant(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    const fetchPlant = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // This would normally fetch from an API
        // For now, return a hardcoded sample plant
        const samplePlant: Plant = {
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

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        setPlant(samplePlant);
      } catch (err) {
        console.error("Error in usePlant hook:", err);
        setError(
          err instanceof Error ? err : new Error("Failed to fetch plant")
        );
        setPlant(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlant();
  }, [plantId]);

  return { plant, isLoading, error };
};
