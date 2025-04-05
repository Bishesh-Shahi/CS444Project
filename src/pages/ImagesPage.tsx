import { useState } from "react";
import { Tree, TreeData, TreeLocation } from "@/types/tree";
import { Spinner } from "@/components/ui/Spinner";
import { useTrees } from "@/hooks/useTrees";

export const ImagesPage = () => {
  const { trees, loading, error } = useTrees();
  const [selectedTree, setSelectedTree] = useState<TreeData | null>(null);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  const treesWithImages = trees.filter((tree) => tree.DefaultImagePath);

  const handleTreeClick = (tree: Tree) => {
    const geoLocation: TreeLocation[] = tree.GeoLocation
      ? JSON.parse(tree.GeoLocation)
      : [];
    setSelectedTree({
      ...tree,
      GeoLocation: geoLocation,
    });
  };

  return (
    <div className="gallery">
      <h1 className="text-3xl font-bold mb-8 text-center">Tree Gallery</h1>

      {/* Image Grid */}
      <div className="gallery__grid">
        {treesWithImages.map((tree) => (
          <div
            key={tree.EntityId}
            className="gallery__item"
            onClick={() => handleTreeClick(tree)}
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
            </div>
          </div>
        ))}
      </div>

      {/* Modal for selected image */}
      {selectedTree && (
        <div className="modal" onClick={() => setSelectedTree(null)}>
          <div className="modal__content" onClick={(e) => e.stopPropagation()}>
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
              {selectedTree.GeoLocation &&
                selectedTree.GeoLocation.length > 0 && (
                  <p className="modal__location">
                    Location: {selectedTree.GeoLocation[0].Lat}°N,{" "}
                    {selectedTree.GeoLocation[0].Lng}°W
                  </p>
                )}
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {treesWithImages.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No tree images available.
        </div>
      )}
    </div>
  );
};
