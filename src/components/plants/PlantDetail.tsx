import { Plant } from "../../types/api";

interface PlantDetailProps {
  plant: Plant;
}

export function PlantDetail({ plant }: PlantDetailProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">{plant.commonName}</h1>
        <p className="text-lg text-gray-600 italic">{plant.scientificName}</p>
        <p className="text-sm text-gray-500">Family: {plant.family}</p>
      </div>

      {/* Description */}
      <div className="prose max-w-none">
        <p>{plant.description}</p>
      </div>

      {/* Characteristics */}
      {plant.characteristics &&
        Object.keys(plant.characteristics).length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              Characteristics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(plant.characteristics).map(
                ([key, value]) =>
                  value && (
                    <div key={key} className="space-y-1">
                      <dt className="text-sm font-medium text-gray-500 capitalize">
                        {key}
                      </dt>
                      <dd className="text-base text-gray-900">{value}</dd>
                    </div>
                  )
              )}
            </div>
          </div>
        )}

      {/* Growth Requirements */}
      {plant.growthRequirements && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Growth Requirements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plant.growthRequirements.sunlight && (
              <div className="space-y-1">
                <dt className="text-sm font-medium text-gray-500">Sunlight</dt>
                <dd className="text-base text-gray-900">
                  {plant.growthRequirements.sunlight.join(", ")}
                </dd>
              </div>
            )}
            {plant.growthRequirements.soil && (
              <div className="space-y-1">
                <dt className="text-sm font-medium text-gray-500">Soil</dt>
                <dd className="text-base text-gray-900">
                  {plant.growthRequirements.soil.join(", ")}
                </dd>
              </div>
            )}
            {plant.growthRequirements.water && (
              <div className="space-y-1">
                <dt className="text-sm font-medium text-gray-500">Water</dt>
                <dd className="text-base text-gray-900">
                  {plant.growthRequirements.water}
                </dd>
              </div>
            )}
            {plant.growthRequirements.hardiness && (
              <div className="space-y-1">
                <dt className="text-sm font-medium text-gray-500">
                  Hardiness Zones
                </dt>
                <dd className="text-base text-gray-900">
                  {plant.growthRequirements.hardiness.min} -{" "}
                  {plant.growthRequirements.hardiness.max}
                </dd>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Images */}
      {plant.images && plant.images.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Images</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {plant.images.map((image, index) => (
              <div key={index} className="relative aspect-square">
                <img
                  src={image.url}
                  alt={
                    image.caption || `${plant.commonName} image ${index + 1}`
                  }
                  className="object-cover rounded-lg w-full h-full"
                />
                {image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
                    <p className="text-sm">{image.caption}</p>
                    {image.credit && (
                      <p className="text-xs italic">Credit: {image.credit}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Native Status and Tags */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
          {plant.isNative ? "Native Species" : "Non-native Species"}
        </div>
        {plant.tags.map((tag) => (
          <div
            key={tag}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}
