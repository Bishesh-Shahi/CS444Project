/**
 * Theme configuration for the Tree App
 *
 * This file centralizes all theme settings to make it easy to update the app's appearance
 * from a single location. Use these values throughout the app for consistency.
 */

const THEME = {
  colors: {
    primary: "var(--tree-primary)",
    primaryHover: "var(--tree-primary-hover)",
    text: {
      body: "text-gray-700",
      muted: "text-gray-600",
    },
    background: {
      card: "bg-white",
      button: {
        active: "bg-[var(--tree-primary)]",
        hover: "hover:bg-[var(--tree-primary-hover)]",
      },
    },
    border: {
      primary: "border-[var(--tree-primary)]",
    },
    seasonal: {
      spring: "var(--season-spring)",
      summer: "var(--season-summer)",
      fall: "var(--season-fall)",
      winter: "var(--season-winter)",
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
  shadows: {
    card: "var(--tree-shadow)",
  },
  borderRadius: {
    default: "0.5rem",
    full: "9999px",
  },
  transitions: {
    default: "transition-all duration-200",
    fast: "transition-all duration-150",
    slow: "transition-all duration-300",
  },
};

export default THEME;
