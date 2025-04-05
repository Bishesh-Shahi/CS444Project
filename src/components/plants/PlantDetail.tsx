import React from "react";
import { Plant } from "../../hooks/usePlant";

interface PlantDetailProps {
  plant: Plant;
  className?: string;
}

export function PlantDetail({ plant, className }: PlantDetailProps) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${className || ""}`}>
      {/* Left column - Image placeholder since we don't have real images */}
      <div className="relative h-[400px] rounded-lg overflow-hidden bg-gray-100">
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          <img
            src="https://plus.unsplash.com/premium_photo-1676654936916-831f9c11e8fe?q=80&w=1887&auto=format&fit=crop"
            alt={plant.commonName}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right column - Plant Information */}
      <div className="space-y-6">
        <div className="bg-[#3B1083] text-white p-6 rounded-lg">
          <h1 className="text-2xl font-bold">{plant.commonName}</h1>
          <p className="text-purple-200 italic">{plant.scientificName}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-[#3B1083] mb-2">
              Description
            </h2>
            <p className="text-gray-700">{plant.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {plant.height && (
              <div>
                <h3 className="font-semibold text-[#3B1083]">Height</h3>
                <p className="text-gray-700">{plant.height}</p>
              </div>
            )}
            {plant.width && (
              <div>
                <h3 className="font-semibold text-[#3B1083]">Spread</h3>
                <p className="text-gray-700">{plant.width}</p>
              </div>
            )}
            <div>
              <h3 className="font-semibold text-[#3B1083]">Hardiness Zone</h3>
              <p className="text-gray-700">{plant.hardiness}</p>
            </div>
            {plant.sunExposure && (
              <div>
                <h3 className="font-semibold text-[#3B1083]">Sun Exposure</h3>
                <p className="text-gray-700">{plant.sunExposure}</p>
              </div>
            )}
          </div>

          {plant.features && plant.features.length > 0 && (
            <div>
              <h3 className="font-semibold text-[#3B1083] mb-2">Features</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {plant.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {plant.flower && (
              <div>
                <h3 className="font-semibold text-[#3B1083]">Flower</h3>
                <p className="text-gray-700">{plant.flower}</p>
              </div>
            )}
            {plant.fruit && (
              <div>
                <h3 className="font-semibold text-[#3B1083]">Fruit</h3>
                <p className="text-gray-700">{plant.fruit}</p>
              </div>
            )}
            {plant.bark && (
              <div>
                <h3 className="font-semibold text-[#3B1083]">Bark</h3>
                <p className="text-gray-700">{plant.bark}</p>
              </div>
            )}
            {plant.leaf && (
              <div>
                <h3 className="font-semibold text-[#3B1083]">Leaf</h3>
                <p className="text-gray-700">{plant.leaf}</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-[#3B1083]">Native Status</h3>
            <p className="text-gray-700">
              {plant.isNative
                ? "Native to Minnesota"
                : "Not native to Minnesota"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
