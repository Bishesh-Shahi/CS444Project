/**
 * Hook for fetching and managing tree data
 */
import { useState, useEffect } from "react";
import { Tree, TreeLocation } from "../types/tree";

/**
 * Hook that fetches all trees from the API
 * @returns Object containing trees array, loading state, and any error that occurred
 */
export const useTrees = () => {
  const [trees, setTrees] = useState<Tree[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrees = async () => {
      try {
        // Fetch tree data from local XML file
        const response = await fetch("/trees.xml");

        if (!response.ok) {
          throw new Error(
            `Failed to fetch trees: ${response.status} ${response.statusText}`
          );
        }

        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");

        // Extract tree data from XML
        const treeElements = xmlDoc.getElementsByTagName(
          "ThemeEntityAbridgedData"
        );

        if (!treeElements || treeElements.length === 0) {
          throw new Error("No trees found in XML data");
        }

        // Transform XML elements to Tree objects
        const transformedTrees = Array.from(treeElements).map((tree) => {
          const DefaultImagePath =
            tree.querySelector("DefaultImagePath")?.textContent || "";
          const DisplayName =
            tree.querySelector("DisplayName")?.textContent || "";
          const EntityId = tree.querySelector("EntityId")?.textContent || "";
          const GeoLocationString =
            tree.querySelector("GeoLocation")?.textContent || "";

          // Parse the GeoLocation string to an array of TreeLocation objects
          let geoLocation: TreeLocation[] = [];

          try {
            if (GeoLocationString && GeoLocationString !== "[]") {
              // The GeoLocation is stored as a JSON string
              const parsedLocation = JSON.parse(GeoLocationString);

              // Check if it's an array or a single object
              if (Array.isArray(parsedLocation)) {
                geoLocation = parsedLocation;
              } else {
                // If it's a single object, convert to array
                geoLocation = [parsedLocation];
              }

              // Validate that each item has Lat and Lng properties
              geoLocation = geoLocation.filter(
                (loc): loc is TreeLocation =>
                  typeof loc === "object" &&
                  loc !== null &&
                  "Lat" in loc &&
                  "Lng" in loc
              );
            }
          } catch (parseError) {
            console.error(
              "Error parsing GeoLocation:",
              parseError,
              GeoLocationString
            );
            // In case of parsing error, leave as empty array
            geoLocation = [];
          }

          return {
            DefaultImagePath,
            DisplayName,
            EntityId,
            geoLocation,
          };
        });

        setTrees(transformedTrees);
        setError(null);
      } catch (err) {
        console.error("Error fetching trees:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch trees");
        setTrees([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrees();
  }, []);

  return { trees, loading, error };
};
