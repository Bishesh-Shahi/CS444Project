/**
 * Hook for fetching and managing tree image data
 */
import { useState, useEffect } from "react";
import { getTreeImages, TreeImage } from "../services/api";

/**
 * Hook that fetches images for a specific tree
 * @param treeId - The ID of the tree to fetch images for
 * @returns Object containing images array, loading state, and any error that occurred
 */
export const useTreeImages = (treeId: string) => {
  const [images, setImages] = useState<TreeImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Don't fetch without a valid treeId
    if (!treeId) {
      setImages([]);
      setLoading(false);
      setError(null);
      return;
    }

    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);

        const treeImages = await getTreeImages(treeId);
        setImages(treeImages);
      } catch (err) {
        console.error("Error in useTreeImages hook:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch images");
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [treeId]);

  return { images, loading, error };
};
