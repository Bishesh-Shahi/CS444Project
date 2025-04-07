import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTrees } from "../../hooks/useTrees";
import { Spinner } from "../ui/Spinner";
import THEME from "../../utils/theme-config";

type TabType = "about" | "images" | "location";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

const sampleTreeData = {
  "Ruby Red Horsechestnut": {
    about: `The Ruby Red Horsechestnut (Aesculus x carnea 'Briotii') is a stunning ornamental tree known for its vibrant ruby-red flower clusters that bloom in spring. This hybrid tree combines the best features of its parent species, offering:

    • Height: Typically grows 30-40 feet tall
    • Spread: 30-35 feet wide
    • Flowers: Large, upright panicles of deep red blossoms
    • Blooming Period: Late spring to early summer
    • Leaves: Dark green, palmate compound leaves
    • Fall Color: Yellow to brown
    • Bark: Gray-brown, slightly rough texture
    
    This tree is particularly valued in urban landscapes for its compact size, disease resistance, and spectacular flowering display.`,
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/7/7e/Aesculus_x_carnea_%27Briotii%27_JPG1b.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/5/58/Aesculus_%C3%97_carnea_Briotii_kz1.jpg",
      "https://bs.plantnet.org/image/o/8fa5a8b7a1d130ed1ed8707927dcc92993dd47ae",
    ],
  },
};

export const TreeDetail = () => {
  const [activeTab, setActiveTab] = useState<TabType>("about");
  const { id } = useParams<{ id: string }>();
  const { trees, loading, error } = useTrees();

  if (loading) return <Spinner />;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  const tree = trees.find((t) => t.EntityId.toString() === id);
  if (!tree) return <div>Tree not found</div>;

  const sampleData = sampleTreeData["Ruby Red Horsechestnut"];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">
        {tree.DisplayName}
      </h1>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {["about", "images", "location"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as TabType)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === tab
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="prose max-w-none">
        {activeTab === "about" && (
          <div className="whitespace-pre-line">{sampleData.about}</div>
        )}

        {activeTab === "images" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sampleData.images.map((image, index) => (
              <div key={index} className="aspect-w-16 aspect-h-9">
                <img
                  src={image}
                  alt={`${tree.DisplayName} - View ${index + 1}`}
                  className="object-cover rounded-lg shadow-md"
                />
              </div>
            ))}
            {tree.DefaultImagePath && (
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={tree.DefaultImagePath}
                  alt={tree.DisplayName}
                  className="object-cover rounded-lg shadow-md"
                />
              </div>
            )}
          </div>
        )}

        {activeTab === "location" && (
          <div>
            {tree.geoLocation && tree.geoLocation.length > 0 ? (
              <div>
                <h3 className="text-lg font-semibold mb-2">Tree Location</h3>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <p className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 mr-2"
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
                      {tree.geoLocation[0].Lat}°N, {tree.geoLocation[0].Lng}°W
                    </span>
                  </p>
                  <div className="mt-4 aspect-w-16 aspect-h-9">
                    <iframe
                      title="Tree Location"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${tree.geoLocation[0].Lat},${tree.geoLocation[0].Lng}&zoom=18`}
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            ) : (
              <p>Location information not available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
