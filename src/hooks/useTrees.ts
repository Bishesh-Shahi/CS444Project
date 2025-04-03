import { useState, useEffect } from "react";
import { Tree } from "../types/api";

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
          const defaultImagePath =
            tree.querySelector("DefaultImagePath")?.textContent || "";
          const displayName =
            tree.querySelector("DisplayName")?.textContent || "";
          const entityId = parseInt(
            tree.querySelector("EntityId")?.textContent || "0"
          );
          const geoLocationText =
            tree.querySelector("GeoLocation")?.textContent || "[]";

          return {
            defaultImagePath,
            displayName,
            entityId,
            geoLocation: JSON.parse(geoLocationText),
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
