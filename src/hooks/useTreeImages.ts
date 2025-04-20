/**
 * Hook for fetching and managing tree image data
 */
import { useState, useEffect } from "react";
import {
  TreeImage,
  TreeImageMetadata,
  Season,
  treeImages,
} from "@/types/tree-images";
import { getTreeImages } from "../services/api";

interface UseTreeImagesResult {
  images: TreeImage[];
  defaultImage: string | null;
  loading: boolean;
  error: string | null;
}

/**
 * Hook that fetches images for a specific tree
 * @param treeId - The ID of the tree to fetch images for
 * @param season - The season to fetch images for
 * @returns Object containing images array, loading state, and any error that occurred
 */
export const useTreeImages = (
  treeId: string | null,
  season: Season = "spring"
): UseTreeImagesResult => {
  const [images, setImages] = useState<TreeImage[]>([]);
  const [defaultImage, setDefaultImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      if (!treeId) {
        setImages([]);
        setDefaultImage(null);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // First check if we have local images
        const localTreeData = treeImages[treeId];
        if (localTreeData) {
          setDefaultImage(localTreeData.defaultImage);
          const seasonImages = localTreeData.seasons[season];
          if (seasonImages && seasonImages.length > 0) {
            setImages(seasonImages);
            setLoading(false);
            return;
          }
        }

        // If no local images, fetch from API
        const apiImages = await getTreeImages(treeId);
        setImages(apiImages);
      } catch (err) {
        console.error("Error fetching tree images:", err);
        setError("Failed to load tree images. Please try again later.");
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [treeId, season]);

  return { images, defaultImage, loading, error };
};
