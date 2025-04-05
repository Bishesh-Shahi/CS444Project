import { useState } from "react";
import { Tree } from "@/types/tree";
import { Spinner } from "@/components/ui/Spinner";
import { useTrees } from "@/hooks/useTrees";
import { useTreeImages } from "@/hooks/useTreeImages";

type Season = "All" | "Spring" | "Summer" | "Fall" | "Winter";

const seasons: { name: Season; icon: string }[] = [
  { name: "All", icon: "🌳" },
  { name: "Spring", icon: "🌸" },
  { name: "Summer", icon: "☀️" },
  { name: "Fall", icon: "🍂" },
  { name: "Winter", icon: "❄️" },
];

// Map trees to seasons based on their characteristics
const getTreeSeasons = (tree: Tree): Season[] => {
  // This is a simplified example. You should adjust the logic based on your actual data
  const name = tree.DisplayName.toLowerCase();
  const seasons: Season[] = [];

  // Example logic - you should adjust this based on your actual tree data
  if (
    name.includes("maple") ||
    name.includes("cherry") ||
    name.includes("dogwood")
  ) {
    seasons.push("Spring", "Fall");
  }
  if (
    name.includes("pine") ||
    name.includes("spruce") ||
    name.includes("fir")
  ) {
    seasons.push("Winter", "Summer");
  }
  if (name.includes("oak") || name.includes("elm") || name.includes("birch")) {
    seasons.push("Summer", "Fall");
  }
  if (
    name.includes("magnolia") ||
    name.includes("cherry") ||
    name.includes("plum")
  ) {
    seasons.push("Spring");
  }

  // If no specific seasons are assigned, assume the tree is visible in all seasons
  return seasons.length > 0 ? seasons : ["Spring", "Summer", "Fall", "Winter"];
};

export const ImagesPage = () => {
  const { trees, loading: treesLoading, error: treesError } = useTrees();
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<Season>("All");
  const {
    images,
    loading: imagesLoading,
    error: imagesError,
  } = useTreeImages(selectedTree?.EntityId || "");

  if (treesLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (treesError) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error: {treesError}
      </div>
    );
  }

  const treesWithImages = trees.filter((tree) => tree.DefaultImagePath);

  const filteredTrees =
    selectedSeason === "All"
      ? treesWithImages
      : treesWithImages.filter((tree) =>
          getTreeSeasons(tree).includes(selectedSeason)
        );

  return (
    <div className="gallery">
      <h1 className="text-3xl font-bold mb-8 text-center">Tree Gallery</h1>

      {/* Season Filter */}
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-xl font-semibold mb-4">Filter by Season</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {seasons.map(({ name, icon }) => (
            <button
              key={name}
              onClick={() => setSelectedSeason(name)}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-full transition-all
                transform hover:scale-105 active:scale-95
                ${
                  selectedSeason === name
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-white hover:bg-gray-50 text-gray-800 border border-gray-200"
                }
              `}
            >
              <span className="text-xl">{icon}</span>
              <span>{name}</span>
            </button>
          ))}
        </div>
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredTrees.length} trees for{" "}
          {selectedSeason.toLowerCase()} season
        </div>
      </div>

      {/* Image Grid */}
      <div className="gallery__grid">
        {filteredTrees.map((tree) => (
          <div
            key={tree.EntityId}
            className="gallery__item"
            onClick={() => setSelectedTree(tree)}
          >
            <div className="gallery__image-wrapper">
              <img
                src={tree.DefaultImagePath}
                alt={tree.DisplayName}
                className="gallery__image"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/400x300?text=No+Image";
                }}
              />
            </div>
            <div className="gallery__overlay">
              <h3 className="gallery__title">{tree.DisplayName}</h3>
              <div className="gallery__seasons">
                {getTreeSeasons(tree).map((season) => (
                  <span
                    key={season}
                    className={`
                      inline-block px-3 py-1 rounded-full text-xs
                      ${
                        selectedSeason === "All" || selectedSeason === season
                          ? "bg-green-500 text-white"
                          : "bg-gray-700 text-gray-300"
                      }
                    `}
                  >
                    {season}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for selected image */}
      {selectedTree && (
        <div className="modal" onClick={() => setSelectedTree(null)}>
          <div className="modal__content" onClick={(e) => e.stopPropagation()}>
            {imagesLoading ? (
              <div className="flex justify-center p-8">
                <Spinner />
              </div>
            ) : imagesError ? (
              <div className="text-red-500 p-4">
                Error loading additional images
              </div>
            ) : (
              <>
                <div className="modal__image-wrapper">
                  <img
                    src={selectedTree.DefaultImagePath}
                    alt={selectedTree.DisplayName}
                    className="modal__image"
                  />
                  <button
                    className="modal__close"
                    onClick={() => setSelectedTree(null)}
                  >
                    ×
                  </button>
                </div>
                <div className="modal__info">
                  <h2 className="modal__title">{selectedTree.DisplayName}</h2>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {getTreeSeasons(selectedTree).map((season) => (
                      <span
                        key={season}
                        className={`
                          px-3 py-1 rounded-full text-sm
                          ${
                            selectedSeason === "All" ||
                            selectedSeason === season
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-600"
                          }
                        `}
                      >
                        {season}
                      </span>
                    ))}
                  </div>
                  {selectedTree.GeoLocation && (
                    <p className="modal__location">
                      {(() => {
                        try {
                          const geoLocation = JSON.parse(
                            selectedTree.GeoLocation
                          );
                          return `Location: ${geoLocation[0]?.Lat}°N, ${geoLocation[0]?.Lng}°W`;
                        } catch {
                          return null;
                        }
                      })()}
                    </p>
                  )}
                </div>

                {/* Additional Images */}
                {images.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">
                      Additional Images
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {images.map((image, index) => (
                        <div
                          key={index}
                          className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden"
                        >
                          <img
                            src={image.url}
                            alt={image.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Empty state */}
      {filteredTrees.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          {selectedSeason === "All"
            ? "No tree images available."
            : `No trees available for ${selectedSeason.toLowerCase()} season.`}
        </div>
      )}
    </div>
  );
};
