import { useTrees } from "../hooks/useTrees";
import { Spinner } from "../components/ui/Spinner";

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
  },
};

export const AboutPage = () => {
  const { trees, loading, error } = useTrees();

  if (loading) return <Spinner />;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid gap-8">
        {trees.map((tree) => (
          <div
            key={tree.entityId}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={
                  tree.defaultImagePath ||
                  "https://plus.unsplash.com/premium_photo-1676654936916-831f9c11e8fe?q=80&w=1887&auto=format&fit=crop"
                }
                alt={tree.displayName}
                className="object-cover w-full h-full"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://plus.unsplash.com/premium_photo-1676654936916-831f9c11e8fe?q=80&w=1887&auto=format&fit=crop";
                }}
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-green-800 mb-4">
                {tree.displayName}
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 whitespace-pre-line">
                  {sampleTreeData["Ruby Red Horsechestnut"].about}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
