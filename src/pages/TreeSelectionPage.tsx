import { useState } from "react";
import { useTrees } from "@/hooks/useTrees";
import { Spinner } from "@/components/ui/Spinner";
import { Tree } from "@/types/tree";
import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";

export const TreeSelectionPage = () => {
  const { trees, loading, error } = useTrees();
  const navigate = useNavigate();

  if (loading) return <Spinner />;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Select a Tree</h1>

        <div className="grid gap-4">
          {trees.map((tree) => (
            <Button
              key={tree.EntityId}
              variant="outline"
              className="w-full justify-start text-left p-6"
              onClick={() => navigate(`/about?treeId=${tree.EntityId}`)}
            >
              <span className="text-lg">{tree.DisplayName}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
