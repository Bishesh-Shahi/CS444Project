import { useState } from "react";
import { useTrees } from "../hooks/useTrees";
import { Spinner } from "../components/ui/Spinner";
import { useNavigate } from "react-router-dom";

// Constants for consistent styling
const THEME = {
  colors: {
    primary: "#3B1083",
    text: {
      body: "text-gray-700",
      muted: "text-gray-600",
    },
    background: {
      card: "bg-white",
      button: {
        active: "bg-[#3B1083]",
        hover: "hover:bg-[#3B1083]",
      },
    },
    border: {
      primary: "border-[#3B1083]",
    },
  },
  spacing: {
    container: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",
    section: "space-y-6",
  },
  typography: {
    title: "text-xl sm:text-2xl md:text-3xl font-bold",
    subtitle: "text-lg sm:text-xl font-semibold",
    body: "text-base",
  },
};

// Add Google Maps API key
const GOOGLE_MAPS_API_KEY = "REMOVED_API_KEY";

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
  const navigate = useNavigate();
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

  const getLocationString = (geoLocation: string) => {
    try {
      const location = JSON.parse(geoLocation)[0];
      if (!location || !location.Lat || !location.Lng) return null;

      // Format coordinates with 6 decimal places
      const lat = parseFloat(location.Lat).toFixed(6);
      const lng = parseFloat(location.Lng).toFixed(6);

      return `${lat}°N, ${lng}°W`;
    } catch {
      console.error("Failed to parse location:", geoLocation);
      return null;
    }
  };

  const goToLocationPage = (treeId: string) => {
    navigate(`/location?treeId=${treeId}`);
  };

  const goToImagesPage = (treeId: string) => {
    navigate(`/images?treeId=${treeId}`);
  };

  return (
    <div className={`py-4 sm:py-6 md:py-8 ${THEME.spacing.container}`}>
      <div className="grid gap-4 sm:gap-6 md:gap-8">
        {trees.map((tree) => {
          const isExpanded = expandedTrees.has(tree.EntityId);
          const treeData = sampleTreeData["Austrian Pine"];
          const locationString = getLocationString(tree.GeoLocation);

          return (
            <div
              key={tree.EntityId}
              className={`${THEME.colors.background.card} rounded-lg shadow-md overflow-hidden relative`}
            >
              {/* Tree Image Section */}
              <div className="relative aspect-w-16 aspect-h-12 sm:aspect-h-9">
                <img
                  src={tree.DefaultImagePath}
                  alt={tree.DisplayName}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://plus.unsplash.com/premium_photo-1676654936916-831f9c11e8fe?q=80&w=1887&auto=format&fit=crop";
                  }}
                />
              </div>

              {/* Content Section */}
              <div className="p-4 sm:p-6">
                {/* Header */}
                <h2
                  className={`${THEME.typography.title} mb-6`}
                  style={{ color: THEME.colors.primary }}
                >
                  {tree.DisplayName}
                </h2>

                {/* Main Content - Always visible */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-3">
                    <InfoItem
                      icon="🌲"
                      label="Height"
                      value={treeData.essentialInfo.height}
                    />
                    <InfoItem
                      icon="↔️"
                      label="Spread"
                      value={treeData.essentialInfo.spread}
                    />
                    {locationString && (
                      <div
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded-md transition-colors duration-200"
                        onClick={() => goToLocationPage(tree.EntityId)}
                      >
                        <span style={{ color: THEME.colors.primary }}>📍</span>
                        <span className="font-medium">Location:</span>
                        <span className={THEME.colors.text.body}>
                          {locationString}
                        </span>
                        <span className="ml-auto text-sm text-gray-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                            />
                          </svg>
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    <InfoItem
                      icon="📈"
                      label="Growth Rate"
                      value={treeData.essentialInfo.growthRate}
                    />
                    <InfoItem
                      icon="⏳"
                      label="Lifespan"
                      value={treeData.essentialInfo.lifespan}
                    />
                    <div
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded-md transition-colors duration-200"
                      onClick={() => goToImagesPage(tree.EntityId)}
                    >
                      <span style={{ color: THEME.colors.primary }}>🖼️</span>
                      <span className="font-medium">Images:</span>
                      <span className={THEME.colors.text.body}>
                        View Gallery
                      </span>
                      <span className="ml-auto text-sm text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Show More Button */}
                <button
                  onClick={() => toggleTreeInfo(tree.EntityId)}
                  className={`
                    w-full px-4 py-2 text-sm font-medium border rounded-full
                    transition-all duration-200
                    ${
                      isExpanded
                        ? `${THEME.colors.background.button.active} text-white ${THEME.colors.border.primary}`
                        : `text-[${THEME.colors.primary}] ${THEME.colors.border.primary} ${THEME.colors.background.button.hover} hover:text-white`
                    }
                  `}
                >
                  {isExpanded ? "Show Less" : "Show More"}
                </button>

                {/* Detailed Information (Expandable) */}
                {isExpanded && (
                  <div
                    className={`mt-6 border-t pt-6 ${THEME.spacing.section}`}
                  >
                    {/* Detailed sections remain the same */}
                    <DetailSection
                      title="Scientific Details"
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                      <DetailItem
                        label="Scientific Name"
                        value={treeData.detailedInfo.scientificName}
                      />
                      <DetailItem
                        label="Family"
                        value={treeData.detailedInfo.family}
                      />
                      <DetailItem
                        label="Native Range"
                        value={treeData.detailedInfo.nativeRange}
                      />
                    </DetailSection>

                    <DetailSection title="Description">
                      <p
                        className={`${THEME.colors.text.body} leading-relaxed`}
                      >
                        {treeData.detailedInfo.description}
                      </p>
                    </DetailSection>

                    <DetailSection
                      title="Characteristics"
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                      {Object.entries(
                        treeData.detailedInfo.characteristics
                      ).map(([key, value]) => (
                        <DetailItem
                          key={key}
                          label={key}
                          value={value}
                          capitalize
                        />
                      ))}
                    </DetailSection>

                    <DetailSection
                      title="Growing Requirements"
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                      {Object.entries(
                        treeData.detailedInfo.growthRequirements
                      ).map(([key, value]) => (
                        <DetailItem
                          key={key}
                          label={key}
                          value={value}
                          capitalize
                        />
                      ))}
                    </DetailSection>

                    <DetailSection title="Common Uses">
                      <ul className="list-disc list-inside space-y-1">
                        {treeData.detailedInfo.uses.map((use, index) => (
                          <li key={index} className={THEME.colors.text.body}>
                            {use}
                          </li>
                        ))}
                      </ul>
                    </DetailSection>

                    <DetailSection title="Maintenance Tips">
                      <ul className="list-disc list-inside space-y-1">
                        {treeData.detailedInfo.maintenance.map((tip, index) => (
                          <li key={index} className={THEME.colors.text.body}>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </DetailSection>
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

// Reusable components
const InfoItem = ({
  icon,
  label,
  value,
  actionLabel,
  onAction,
}: {
  icon: string;
  label: string;
  value: string;
  actionLabel?: string;
  onAction?: () => void;
}) => (
  <div className="flex items-center gap-2">
    <span style={{ color: THEME.colors.primary }}>{icon}</span>
    <span className="font-medium">{label}:</span>
    <span className={THEME.colors.text.body}>{value}</span>
    {actionLabel && onAction && (
      <button
        onClick={onAction}
        className="ml-auto text-sm text-white bg-[#3B1083] px-2 py-1 rounded hover:bg-[#2d0c66]"
      >
        {actionLabel}
      </button>
    )}
  </div>
);

const DetailSection = ({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className="space-y-3">
    <h3
      className={`${THEME.typography.subtitle}`}
      style={{ color: THEME.colors.primary }}
    >
      {title}
    </h3>
    <div className={className}>{children}</div>
  </div>
);

const DetailItem = ({
  label,
  value,
  capitalize = false,
}: {
  label: string;
  value: string;
  capitalize?: boolean;
}) => (
  <div>
    <p
      className={`text-sm ${THEME.colors.text.muted} ${
        capitalize ? "capitalize" : ""
      }`}
    >
      {label}
    </p>
    <p className="font-medium">{value}</p>
  </div>
);
