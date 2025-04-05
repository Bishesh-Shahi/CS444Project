import { useState } from "react";
import { useTrees } from "../hooks/useTrees";
import { Spinner } from "../components/ui/Spinner";

const sampleTreeData = {
  "Austrian Pine": {
    essentialInfo: {
      height: "40-60 feet",
      spread: "20-40 feet",
      growthRate: "Medium, about 13-24 inches per year",
      lifespan: "100-150 years",
    },
    detailedInfo: {
      scientificName: "Pinus nigra",
      family: "Pinaceae",
      nativeRange: "Central and Southern Europe",
      description: `The Austrian Pine is a large evergreen conifer known for its dense, dark green needles and robust growth habit. It's highly adaptable and tolerant of urban conditions.`,
      characteristics: {
        bark: "Dark gray to brown-black, deeply furrowed and scaly",
        needles: "Dark green, stiff, 4-6 inches long, in bundles of 2",
        cones: "2-3 inches long, light brown when mature",
        flowers: "Male cones yellow, female cones reddish",
      },
      growthRequirements: {
        sunlight: "Full sun",
        soil: "Adaptable to various soils, prefers well-drained",
        water: "Drought tolerant once established",
        hardiness: "USDA zones 4-8",
      },
      uses: [
        "Windbreaks and screens",
        "Urban street tree",
        "Parks and large landscapes",
        "Christmas tree production",
      ],
      maintenance: [
        "Prune dead or damaged branches as needed",
        "Monitor for pine wilt disease",
        "Remove fallen needles and cones",
        "Water deeply during establishment",
      ],
    },
  },
};

export const AboutPage = () => {
  const { trees, loading, error } = useTrees();
  const [expandedTrees, setExpandedTrees] = useState<Set<string>>(new Set());

  if (loading) return <Spinner />;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  const toggleTreeInfo = (treeId: string) => {
    const newExpanded = new Set(expandedTrees);
    if (newExpanded.has(treeId)) {
      newExpanded.delete(treeId);
    } else {
      newExpanded.add(treeId);
    }
    setExpandedTrees(newExpanded);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid gap-8">
        {trees.map((tree) => {
          const isExpanded = expandedTrees.has(tree.EntityId);
          const treeData = sampleTreeData["Austrian Pine"]; // Using sample data for all trees for now

          return (
            <div
              key={tree.EntityId}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={
                    tree.DefaultImagePath ||
                    "https://plus.unsplash.com/premium_photo-1676654936916-831f9c11e8fe?q=80&w=1887&auto=format&fit=crop"
                  }
                  alt={tree.DisplayName}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://plus.unsplash.com/premium_photo-1676654936916-831f9c11e8fe?q=80&w=1887&auto=format&fit=crop";
                  }}
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2
                    className="text-2xl font-bold"
                    style={{ color: "#3B1083" }}
                  >
                    {tree.DisplayName}
                  </h2>
                  <button
                    onClick={() => toggleTreeInfo(tree.EntityId)}
                    className={`px-4 py-2 text-sm font-medium border rounded-full 
                             transition-colors duration-200 
                             ${
                               isExpanded
                                 ? "bg-[#3B1083] text-white border-[#3B1083]"
                                 : "text-[#3B1083] border-[#3B1083] hover:bg-[#3B1083] hover:text-white"
                             }`}
                  >
                    {isExpanded ? "Show Less" : "Show More"}
                  </button>
                </div>

                {/* Essential Information */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[#3B1083]">🌲</span>
                      <span className="font-medium">Height:</span>
                      <span>{treeData.essentialInfo.height}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#3B1083]">↔️</span>
                      <span className="font-medium">Spread:</span>
                      <span>{treeData.essentialInfo.spread}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[#3B1083]">📈</span>
                      <span className="font-medium">Growth Rate:</span>
                      <span>{treeData.essentialInfo.growthRate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#3B1083]">⏳</span>
                      <span className="font-medium">Lifespan:</span>
                      <span>{treeData.essentialInfo.lifespan}</span>
                    </div>
                  </div>
                </div>

                {/* Detailed Information (Expandable) */}
                {isExpanded && (
                  <div className="mt-6 border-t pt-6 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-[#3B1083] mb-2">
                        Scientific Details
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">
                            Scientific Name
                          </p>
                          <p className="font-medium">
                            {treeData.detailedInfo.scientificName}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Family</p>
                          <p className="font-medium">
                            {treeData.detailedInfo.family}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-[#3B1083] mb-2">
                        Description
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {treeData.detailedInfo.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-[#3B1083] mb-2">
                        Characteristics
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(
                          treeData.detailedInfo.characteristics
                        ).map(([key, value]) => (
                          <div key={key}>
                            <p className="text-sm text-gray-600 capitalize">
                              {key}
                            </p>
                            <p className="font-medium">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-[#3B1083] mb-2">
                        Growing Requirements
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(
                          treeData.detailedInfo.growthRequirements
                        ).map(([key, value]) => (
                          <div key={key}>
                            <p className="text-sm text-gray-600 capitalize">
                              {key}
                            </p>
                            <p className="font-medium">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-[#3B1083] mb-2">
                        Common Uses
                      </h3>
                      <ul className="list-disc list-inside space-y-1">
                        {treeData.detailedInfo.uses.map((use, index) => (
                          <li key={index} className="text-gray-700">
                            {use}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-[#3B1083] mb-2">
                        Maintenance Tips
                      </h3>
                      <ul className="list-disc list-inside space-y-1">
                        {treeData.detailedInfo.maintenance.map((tip, index) => (
                          <li key={index} className="text-gray-700">
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
