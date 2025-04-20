import { useTrees } from "../hooks/useTrees";
import { Spinner } from "../components/ui/Spinner";
import THEME from "../utils/theme-config";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { IoArrowBack } from "react-icons/io5";
import { FaApple, FaGoogle } from "react-icons/fa";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

export const LocationPage = () => {
  const { trees, loading, error } = useTrees();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedTreeId = searchParams.get("treeId");

  if (loading) return <Spinner />;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  // If no tree is selected, redirect to tree selection
  if (!selectedTreeId) {
    navigate("/");
    return null;
  }

  const selectedTree = trees.find((tree) => tree.EntityId === selectedTreeId);

  // If selected tree is not found, redirect to tree selection
  if (!selectedTree) {
    navigate("/");
    return null;
  }

  const openInGoogleMaps = () => {
    const lat = selectedTree.geoLocation[0].Lat;
    const lng = selectedTree.geoLocation[0].Lng;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, "_blank");
  };

  const openInAppleMaps = () => {
    const lat = selectedTree.geoLocation[0].Lat;
    const lng = selectedTree.geoLocation[0].Lng;
    const url = `http://maps.apple.com/?daddr=${lat},${lng}`;
    window.open(url, "_blank");
  };

  return (
    <div className={`px-4 py-8 ${THEME.spacing.container}`}>
      <Button
        variant="ghost"
        className="mb-6 flex items-center gap-2"
        onClick={() => navigate("/")}
      >
        <IoArrowBack className="w-5 h-5" />
        Back to Trees
      </Button>

      <h1
        className={`${THEME.typography.title} mb-8`}
        style={{ color: THEME.colors.primary }}
      >
        {selectedTree.DisplayName} Location
      </h1>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            {selectedTree.geoLocation && selectedTree.geoLocation.length > 0 ? (
              <>
                <div
                  className={`flex items-center ${THEME.colors.text.muted} mb-6 text-lg`}
                >
                  <svg
                    className="w-6 h-6 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>
                    {selectedTree.geoLocation[0].Lat}°N,{" "}
                    {selectedTree.geoLocation[0].Lng}°W
                  </span>
                </div>

                {/* Map Direction Buttons */}
                <div className="flex gap-4 mb-6">
                  <Button
                    variant="map"
                    className="flex-1 flex items-center justify-center gap-2"
                    onClick={openInGoogleMaps}
                  >
                    <FaGoogle className="w-5 h-5" />
                    Open in Google Maps
                  </Button>
                  <Button
                    variant="map"
                    className="flex-1 flex items-center justify-center gap-2"
                    onClick={openInAppleMaps}
                  >
                    <FaApple className="w-5 h-5" />
                    Open in Apple Maps
                  </Button>
                </div>

                <div className="aspect-w-16 aspect-h-9 h-[500px]">
                  <iframe
                    title={`${selectedTree.DisplayName} Location`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${selectedTree.geoLocation[0].Lat},${selectedTree.geoLocation[0].Lng}&zoom=18`}
                    allowFullScreen
                  ></iframe>
                </div>
              </>
            ) : (
              <p className="text-gray-500 italic text-center py-8">
                Location information not available for this tree
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
