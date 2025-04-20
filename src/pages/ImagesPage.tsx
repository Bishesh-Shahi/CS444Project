import { useState, useEffect } from "react";
import { Tree } from "@/types/tree";
import { Season, treeImages } from "@/types/tree-images";
import { Spinner } from "@/components/ui/Spinner";
import { useTrees } from "@/hooks/useTrees";
import { useTreeImages } from "@/hooks/useTreeImages";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { IoArrowBack } from "react-icons/io5";
import THEME from "@/utils/theme-config";
import { cn } from "@/lib/utils";

const seasons: { name: Season; icon: string }[] = [
  { name: "spring", icon: "🌸" },
  { name: "summer", icon: "☀️" },
  { name: "fall", icon: "🍂" },
  { name: "winter", icon: "❄️" },
];

interface TreeImage {
  url: string;
  name?: string;
}

// Get available seasons for a tree based on its images
const getTreeSeasons = (tree: Tree): Season[] => {
  // Get the tree's image metadata
  const treeMetadata = treeImages[tree.EntityId];

  // If no metadata, return all seasons since we'll use API images
  if (!treeMetadata) {
    return ["spring", "summer", "fall", "winter"];
  }

  // Get the seasons that have images
  const availableSeasons = Object.entries(treeMetadata.seasons)
    .filter(([_, images]) => images && images.length > 0)
    .map(([season]) => season as Season);

  // If no local images available, return all seasons for API images
  return availableSeasons.length > 0
    ? availableSeasons
    : ["spring", "summer", "fall", "winter"];
};

export const ImagesPage = () => {
  const { trees, loading: treesLoading, error: treesError } = useTrees();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedTreeId = searchParams.get("treeId");
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<Season>("spring");
  const [selectedImage, setSelectedImage] = useState<TreeImage | null>(null);

  // Effect to handle tree selection and initial season
  useEffect(() => {
    if (!treesLoading && trees && selectedTreeId) {
      const tree = trees.find((t) => t.EntityId === selectedTreeId);
      if (tree) {
        setSelectedTree(tree);
        // Get available seasons for this tree
        const availableSeasons = getTreeSeasons(tree);
        // Set initial season to the first available season or keep current if valid
        if (availableSeasons.length > 0) {
          if (!availableSeasons.includes(selectedSeason)) {
            setSelectedSeason(availableSeasons[0]);
          }
        }
      } else {
        setSelectedTree(null);
      }
    }
  }, [trees, selectedTreeId, treesLoading, selectedSeason]);

  const {
    images,
    defaultImage,
    loading: imagesLoading,
    error: imagesError,
  } = useTreeImages(selectedTreeId || null, selectedSeason);

  // Show loading state while trees are loading
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
        <div className="text-center">
          <p className="text-xl mb-4">Error loading trees: {treesError}</p>
          <Button variant="ghost" onClick={() => navigate("/")}>
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  if (!selectedTreeId || !selectedTree) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-xl mb-4">
            {!selectedTreeId ? "No tree selected" : "Tree not found"}
          </p>
          <Button variant="ghost" onClick={() => navigate("/")}>
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  const availableSeasons = getTreeSeasons(selectedTree);
  const hasLocalImages = availableSeasons.length > 0;
  const showInSeason = hasLocalImages
    ? availableSeasons.includes(selectedSeason)
    : true;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-6 flex items-center gap-2"
        onClick={() => navigate("/")}
      >
        <IoArrowBack className="w-5 h-5" />
        Back to Trees
      </Button>

      <h1
        className="text-3xl font-bold mb-8 text-center"
        style={{ color: THEME.colors.primary }}
      >
        {selectedTree.DisplayName} Gallery
      </h1>

      {/* Season Filter */}
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-xl font-semibold mb-4">Seasonal Appearance</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {seasons.map(({ name, icon }) => (
            <button
              key={name}
              onClick={() => setSelectedSeason(name)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-full transition-all",
                "transform hover:scale-105 active:scale-95",
                selectedSeason === name
                  ? "bg-primary text-white shadow-lg"
                  : "bg-white hover:bg-gray-50 text-gray-800 border border-gray-200"
              )}
            >
              <span className="text-xl">{icon}</span>
              <span>{name}</span>
            </button>
          ))}
        </div>
        <div className="mt-4 text-sm text-gray-600">
          Viewing {selectedTree.DisplayName} in {selectedSeason.toLowerCase()}{" "}
          season
        </div>
      </div>

      {/* Main Image Section */}
      <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {imagesLoading ? (
          <div className="aspect-video w-full flex items-center justify-center bg-gray-100">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : imagesError ? (
          <div className="aspect-video w-full flex items-center justify-center bg-gray-100">
            <p className="text-red-500">Error loading images: {imagesError}</p>
          </div>
        ) : images.length === 0 ? (
          <div className="aspect-video w-full flex items-center justify-center bg-gray-100">
            <p className="text-gray-500">
              No images available for {selectedTree.DisplayName} in{" "}
              {selectedSeason.toLowerCase()} season
            </p>
          </div>
        ) : (
          <>
            <div className="relative aspect-video w-full">
              <img
                src={selectedImage?.url || images[0].url}
                alt={
                  selectedImage?.name ||
                  `${selectedTree.DisplayName} in ${selectedSeason}`
                }
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="p-4 bg-gray-50">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(image)}
                      className={cn(
                        "relative aspect-square rounded-lg overflow-hidden transition-all",
                        "transform hover:scale-105 active:scale-95",
                        selectedImage?.url === image.url &&
                          "ring-2 ring-primary ring-offset-2"
                      )}
                    >
                      <img
                        src={image.url}
                        alt={
                          image.name ||
                          `${selectedTree.DisplayName} - Image ${index + 1}`
                        }
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Additional Images */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">
          {hasLocalImages ? `${selectedSeason} Images` : "Available Images"}
        </h2>
        {imagesLoading ? (
          <div className="flex justify-center p-8">
            <Spinner />
          </div>
        ) : imagesError ? (
          <div className="text-red-500 p-4 text-center">
            Error loading images: {imagesError}
          </div>
        ) : images.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {images.map((image, index) => (
              <div
                key={index}
                className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md group relative"
              >
                <img
                  src={image.url}
                  alt={`${selectedTree.DisplayName} - ${
                    image.name || `View ${index + 1}`
                  }`}
                  className="object-cover w-full h-full transition-transform group-hover:scale-105"
                />
                {image.description && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-white text-sm">{image.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            <p>
              {hasLocalImages
                ? `No images available for ${
                    selectedTree.DisplayName
                  } in ${selectedSeason.toLowerCase()} season.`
                : `No additional images available for ${selectedTree.DisplayName}.`}
            </p>
            <p className="mt-2 text-sm">
              Check back later as we continue to update our gallery.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
