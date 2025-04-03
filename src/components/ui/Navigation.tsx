import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-wsu-purple text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link
              to="/"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                isActive("/")
                  ? "border-white text-white"
                  : "border-transparent text-purple-100 hover:border-purple-300 hover:text-white"
              }`}
            >
              About
            </Link>
            <Link
              to="/location"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                isActive("/location")
                  ? "border-white text-white"
                  : "border-transparent text-purple-100 hover:border-purple-300 hover:text-white"
              }`}
            >
              Location
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
