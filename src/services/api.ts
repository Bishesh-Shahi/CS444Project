/**
 * API services for interacting with the WSU Locations API
 */

/** Base URL for all API requests */
const API_BASE_URL = "https://w3.winona.edu/Locations";

/**
 * Tree image data structure
 */
export interface TreeImage {
  /** Full URL to the image resource */
  url: string;
  /** Display name for the image */
  name: string;
}

/**
 * Fetches images for a specific tree
 * @param treeId - The ID of the tree to fetch images for
 * @returns Promise resolving to an array of TreeImage objects
 */
export const getTreeImages = async (treeId: string): Promise<TreeImage[]> => {
  if (!treeId) {
    console.warn("getTreeImages called without a treeId");
    return [];
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/trees/${treeId}/images`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch tree images: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    return data.map((image: any) => ({
      url: `${API_BASE_URL}/Resources/${image.fileName}`,
      name: image.displayName || "Tree Image",
    }));
  } catch (error) {
    console.error("Error fetching tree images:", error);
    return [];
  }
};

/**
 * Fetches detailed information for a specific tree
 * @param treeId - The ID of the tree to fetch details for
 * @returns Promise resolving to the tree details or null if the fetch fails
 */
export const getTreeDetails = async (treeId: string) => {
  if (!treeId) {
    console.warn("getTreeDetails called without a treeId");
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/trees/${treeId}`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch tree details: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching tree details:", error);
    return null;
  }
};
