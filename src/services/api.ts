const API_BASE_URL = "https://w3.winona.edu/Locations";

export interface TreeImage {
  url: string;
  name: string;
}

export const getTreeImages = async (treeId: string): Promise<TreeImage[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/trees/${treeId}/images`);
    if (!response.ok) {
      throw new Error("Failed to fetch tree images");
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

export const getTreeDetails = async (treeId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/trees/${treeId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch tree details");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching tree details:", error);
    return null;
  }
};
