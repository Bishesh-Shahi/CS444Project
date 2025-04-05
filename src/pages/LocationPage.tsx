import { useTrees } from "../hooks/useTrees";
import { Spinner } from "../components/ui/Spinner";

const GOOGLE_MAPS_API_KEY =
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY ||
  "REMOVED_API_KEY";

export const LocationPage = () => {
  const { trees, loading, error } = useTrees();

  if (loading) return <Spinner />;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-8">Tree Locations</h1>
      {trees.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-600">
            No trees found. Please check the data source.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {trees.map((tree) => (
            <div
              key={tree.EntityId}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-4">
                <h3 className="text-lg font-semibold text-green-800 mb-4">
                  {tree.DisplayName}
                </h3>
                {tree.geoLocation && tree.geoLocation.length > 0 ? (
                  <>
                    <div className="flex items-center text-gray-600 mb-4">
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
                    </div>
                    <div className="aspect-w-16 aspect-h-9 h-48">
                      <iframe
                        title={`${tree.DisplayName} Location`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${tree.geoLocation[0].Lat},${tree.geoLocation[0].Lng}&zoom=18`}
                        allowFullScreen
                      ></iframe>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500 italic">
                    Location information not available
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
