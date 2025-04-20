export type Season = "spring" | "summer" | "fall" | "winter";

export interface TreeImage {
  url: string;
  name: string;
  season?: Season;
  description?: string;
}

export interface TreeImageMetadata {
  treeId: string;
  treeName: string;
  defaultImage: string;
  seasons: {
    [key in Season]?: TreeImage[];
  };
}

// Map of tree IDs to their image metadata
export const treeImages: Record<string, TreeImageMetadata> = {
  "3": {
    treeId: "3",
    treeName: "Austrian Pine",
    defaultImage: "/images/trees/austrian-pine/summer-1.jpg",
    seasons: {
      spring: [
        {
          url: "/images/trees/austrian-pine/spring-2.jpg",
          season: "spring",
          name: "Spring View",
          description: "Austrian Pine in spring showing new growth",
        },
      ],
      summer: [
        {
          url: "/images/trees/austrian-pine/summer-1.jpg",
          season: "summer",
          name: "Summer View",
          description: "Austrian Pine in full summer foliage",
        },
      ],
      fall: [
        {
          url: "/images/trees/austrian-pine/fall-1.jpg",
          season: "fall",
          name: "Fall View",
          description: "Austrian Pine autumn colors",
        },
      ],
      winter: [
        {
          url: "/images/trees/austrian-pine/winter-1.jpg",
          season: "winter",
          name: "Winter View",
          description: "Austrian Pine in winter",
        },
      ],
    },
  },
  "35": {
    treeId: "35",
    treeName: "Tulip Tree",
    defaultImage: "/images/trees/tulip-tree/summer-1.png",
    seasons: {
      spring: [
        {
          url: "/images/trees/tulip-tree/spring-1.png",
          season: "spring",
          name: "Spring Blooms",
          description: "Tulip Tree showcasing its beautiful spring flowers",
        },
      ],
      summer: [
        {
          url: "/images/trees/tulip-tree/summer-1.png",
          season: "summer",
          name: "Summer Foliage",
          description: "Tulip Tree in full summer leaf display",
        },
      ],
      fall: [
        {
          url: "/images/trees/tulip-tree/fall-1.jpg",
          season: "fall",
          name: "Fall Colors",
          description: "Tulip Tree displaying vibrant fall colors",
        },
      ],
      winter: [
        {
          url: "/images/trees/tulip-tree/winter-1.png",
          season: "winter",
          name: "Winter Structure",
          description:
            "Tulip Tree showing its distinctive winter branch structure",
        },
      ],
    },
  },
};
