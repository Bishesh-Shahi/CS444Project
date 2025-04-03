import { useTrees } from "../hooks/useTrees";
import { Spinner } from "./ui/Spinner";
import { Link } from "react-router-dom";

// Sample plant data for fallback
const samplePlant = {
  image:
    "https://plus.unsplash.com/premium_photo-1676654936916-831f9c11e8fe?q=80&w=1887&auto=format&fit=crop",
  description:
    "A member of the 'Little Girl' group of hybrid magnolias developed in the mid-fifties at the U.S. National Arboretum. Hardy shrub or small tree. Impressive deep purple-red flowers with 7-9 petals that resemble a tulip. Blooms mid to late March and may sporadically bloom again in summer.",
  characteristics: {
    height: "8 - 10 feet",
    spread: "10 feet",
    habitat: "Urban areas, parks, and gardens",
  },
};

export const TreeList = () => {
  const { trees, loading, error } = useTrees();

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {trees.map((tree) => (
        <Link
          key={tree.entityId}
          to={`/trees/${tree.entityId}`}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={tree.defaultImagePath || samplePlant.image}
              alt={tree.displayName}
              className="object-cover w-full h-full"
              onError={(e) => {
                e.currentTarget.src = samplePlant.image;
              }}
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-800">
              {tree.displayName}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {samplePlant.description}
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <svg
                  className="w-4 h-4 mr-2"
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
                {tree.geoLocation && tree.geoLocation.length > 0 ? (
                  <span>
                    {tree.geoLocation[0].Lat.slice(0, 8)}°N,{" "}
                    {tree.geoLocation[0].Lng.slice(0, 8)}°W
                  </span>
                ) : (
                  <span>Location not available</span>
                )}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  />
                </svg>
                <span>Height: {samplePlant.characteristics.height}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  />
                </svg>
                <span>Spread: {samplePlant.characteristics.spread}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
