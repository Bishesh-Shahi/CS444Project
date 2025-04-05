import { Link, useLocation } from "react-router-dom";
import { FaTree } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { BiInfoCircle } from "react-icons/bi";
import { Button } from "./Button";

export const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="header" role="banner">
      <div className="header__container">
        {/* Logo Section */}
        <div className="header__logo-wrapper">
          <Link to="/" className="header__logo">
            <FaTree className="header__logo-icon" aria-hidden="true" />
            <span className="header__logo-text">Arboretum</span>
          </Link>
        </div>

        {/* Main Navigation */}
        <nav
          className="header__nav"
          role="navigation"
          aria-label="Main navigation"
        >
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link
                to="/"
                className={`header__link ${
                  isActive("/") ? "header__link--active" : ""
                }`}
              >
                <BiInfoCircle
                  className="header__link-icon"
                  aria-hidden="true"
                />
                <span>About</span>
              </Link>
            </li>
            <li className="header__nav-item">
              <Link
                to="/location"
                className={`header__link ${
                  isActive("/location") ? "header__link--active" : ""
                }`}
              >
                <MdLocationOn
                  className="header__link-icon"
                  aria-hidden="true"
                />
                <span>Location</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Action Buttons */}
        <div className="header__actions">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
          <Button>Get Started</Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="header__menu-button" aria-label="Toggle menu">
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
    </header>
  );
};
