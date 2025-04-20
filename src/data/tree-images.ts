import { TreeImageMetadata, Season } from "@/types/tree-images";

export const treeImages: Record<string, TreeImageMetadata> = {
  "1": {
    treeId: "1",
    treeName: "Example Tree 1",
    defaultImage: "/images/trees/1/default.jpg",
    seasons: {
      spring: [
        { url: "/images/trees/1/1-spring-1.jpg", name: "Spring View 1" },
        { url: "/images/trees/1/1-spring-2.jpg", name: "Spring View 2" },
      ],
      summer: [
        { url: "/images/trees/1/1-summer-1.jpg", name: "Summer View 1" },
        { url: "/images/trees/1/1-summer-2.jpg", name: "Summer View 2" },
      ],
      fall: [
        { url: "/images/trees/1/1-fall-1.jpg", name: "Fall View 1" },
        { url: "/images/trees/1/1-fall-2.jpg", name: "Fall View 2" },
      ],
      winter: [
        { url: "/images/trees/1/1-winter-1.jpg", name: "Winter View 1" },
        { url: "/images/trees/1/1-winter-2.jpg", name: "Winter View 2" },
      ],
    },
  },
  "2": {
    treeId: "2",
    treeName: "Example Tree 2",
    defaultImage: "/images/trees/2/default.jpg",
    seasons: {
      spring: [
        { url: "/images/trees/2/2-spring-1.jpg", name: "Spring View 1" },
        { url: "/images/trees/2/2-spring-2.jpg", name: "Spring View 2" },
      ],
      summer: [
        { url: "/images/trees/2/2-summer-1.jpg", name: "Summer View 1" },
        { url: "/images/trees/2/2-summer-2.jpg", name: "Summer View 2" },
      ],
      fall: [
        { url: "/images/trees/2/2-fall-1.jpg", name: "Fall View 1" },
        { url: "/images/trees/2/2-fall-2.jpg", name: "Fall View 2" },
      ],
      winter: [
        { url: "/images/trees/2/2-winter-1.jpg", name: "Winter View 1" },
        { url: "/images/trees/2/2-winter-2.jpg", name: "Winter View 2" },
      ],
    },
  },
  // ... existing code ...
};
