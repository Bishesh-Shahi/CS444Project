import { useState, useEffect } from "react";
import { getTreeImages, TreeImage } from "@/services/api";

export const useTreeImages = (treeId: string) => {
  const [images, setImages] = useState<TreeImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const treeImages = await getTreeImages(treeId);
        setImages(treeImages);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch images");
      } finally {
        setLoading(false);
      }
    };

    if (treeId) {
      fetchImages();
    }
  }, [treeId]);

  return { images, loading, error };
};
