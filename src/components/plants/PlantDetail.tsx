import React from "react";
import { Plant } from "../../types/api";
import { cn } from "../../lib/utils";

interface PlantDetailProps {
  plant: Plant;
  className?: string;
}

export function PlantDetail({ plant, className }: PlantDetailProps) {
  const mainImage = plant.images[0];
  const hardinessRange = plant.growthRequirements.hardiness
    ? `${plant.growthRequirements.hardiness.min} to ${plant.growthRequirements.hardiness.max}`
    : "Unknown";

  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-8", className)}>
      {/* Left column - Image */}
      <div className="relative h-[400px] rounded-lg overflow-hidden bg-gray-100">
        {mainImage ? (
          <img
            src={mainImage.url}
            alt={mainImage.caption || plant.commonName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No image available
          </div>
        )}
      </div>

      {/* Right column - Plant Information */}
      <div className="space-y-6">
        <div className="bg-primary text-white p-6 rounded-lg">
          <h1 className="text-2xl font-bold">{plant.commonName}</h1>
          <p className="text-primary-100 italic">{plant.scientificName}</p>
          <p className="text-sm mt-2">Family: {plant.family}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-primary mb-2">
              Description
            </h2>
            <p className="text-gray-700">{plant.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {plant.characteristics.height && (
              <div>
                <h3 className="font-semibold text-primary">Height</h3>
                <p className="text-gray-700">{plant.characteristics.height}</p>
              </div>
            )}
            {plant.characteristics.spread && (
              <div>
                <h3 className="font-semibold text-primary">Spread</h3>
                <p className="text-gray-700">{plant.characteristics.spread}</p>
              </div>
            )}
            <div>
              <h3 className="font-semibold text-primary">Hardiness Zone</h3>
              <p className="text-gray-700">{hardinessRange}</p>
            </div>
            {plant.growthRequirements.sunlight && (
              <div>
                <h3 className="font-semibold text-primary">Sun Exposure</h3>
                <p className="text-gray-700">
                  {plant.growthRequirements.sunlight.join(", ")}
                </p>
              </div>
            )}
          </div>

          {plant.tags.length > 0 && (
            <div>
              <h3 className="font-semibold text-primary mb-2">Features</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {plant.tags.map((tag, index) => (
                  <li key={index}>{tag}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {plant.characteristics.flower && (
              <div>
                <h3 className="font-semibold text-primary">Flower</h3>
                <p className="text-gray-700">{plant.characteristics.flower}</p>
              </div>
            )}
            {plant.characteristics.fruit && (
              <div>
                <h3 className="font-semibold text-primary">Fruit</h3>
                <p className="text-gray-700">{plant.characteristics.fruit}</p>
              </div>
            )}
            {plant.characteristics.bark && (
              <div>
                <h3 className="font-semibold text-primary">Bark</h3>
                <p className="text-gray-700">{plant.characteristics.bark}</p>
              </div>
            )}
            {plant.characteristics.leaf && (
              <div>
                <h3 className="font-semibold text-primary">Leaf</h3>
                <p className="text-gray-700">{plant.characteristics.leaf}</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-primary">Native Status</h3>
            <p className="text-gray-700">
              {plant.isNative
                ? "Native to Minnesota"
                : "Not native to Minnesota"}
            </p>
          </div>

          {plant.locations.length > 0 && (
            <div>
              <h3 className="font-semibold text-primary mb-2">Locations</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {plant.locations.map((location) => (
                  <li key={location.id}>{location.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
