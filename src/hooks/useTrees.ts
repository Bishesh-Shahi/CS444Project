import { useState, useEffect } from "react";
import { Tree } from "../types/tree";

export const useTrees = () => {
  const [trees, setTrees] = useState<Tree[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrees = async () => {
      try {
        const response = await fetch("/trees.xml");
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");

        const treeElements = xmlDoc.getElementsByTagName(
          "ThemeEntityAbridgedData"
        );
        const transformedTrees = Array.from(treeElements).map((tree) => {
          const DefaultImagePath =
            tree.querySelector("DefaultImagePath")?.textContent || "";
          const DisplayName =
            tree.querySelector("DisplayName")?.textContent || "";
          const EntityId = tree.querySelector("EntityId")?.textContent || "";
          const GeoLocation =
            tree.querySelector("GeoLocation")?.textContent || "[]";

          return {
            DefaultImagePath,
            DisplayName,
            EntityId,
            GeoLocation,
          };
        });

        setTrees(transformedTrees);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch trees");
      } finally {
        setLoading(false);
      }
    };

    fetchTrees();
  }, []);

  return { trees, loading, error };
};
