import { Link, useLocation, useSearchParams } from "react-router-dom";
import { FaTree } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { BiInfoCircle } from "react-icons/bi";
import { IoImagesOutline } from "react-icons/io5";
import { useState } from "react";

export const Navigation = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const selectedTreeId = searchParams.get("treeId");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const getTreeLink = (path: string) => {
    return selectedTreeId ? `${path}?treeId=${selectedTreeId}` : path;
  };

  const navigationItems = [
    { path: "/", icon: FaTree, label: "Trees" },
    { path: "/about", icon: BiInfoCircle, label: "About" },
    { path: "/location", icon: MdLocationOn, label: "Location" },
    { path: "/images", icon: IoImagesOutline, label: "Images" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header" role="banner">
      <div className="header__container">
        {/* Logo Section */}
        <div className="header__logo-wrapper">
          <Link
            to="/"
            className="header__logo"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FaTree className="header__logo-icon" aria-hidden="true" />
            <span className="header__logo-text">Arboretum</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav
          className="header__nav"
          role="navigation"
          aria-label="Main navigation"
        >
          <ul className="header__nav-list">
            {navigationItems.map((item) => (
              <li key={item.path} className="header__nav-item">
                <Link
                  to={item.path === "/" ? "/" : getTreeLink(item.path)}
                  className={`header__link ${
                    isActive(item.path) ? "header__link--active" : ""
                  }`}
                >
                  <item.icon className="header__link-icon" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="header__menu-button"
          aria-label="Toggle menu"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen ? "true" : "false"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <nav
        className={`header__mobile-nav ${isMobileMenuOpen ? "open" : ""}`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <ul className="header__mobile-nav-list">
          {navigationItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path === "/" ? "/" : getTreeLink(item.path)}
                className={`header__mobile-link ${
                  isActive(item.path) ? "header__mobile-link--active" : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="header__link-icon" aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
