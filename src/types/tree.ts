/**
 * Type definitions for tree data from WSU Locations API
 */

/**
 * Represents a single location with latitude and longitude
 */
export interface TreeLocation {
  Lat: string;
  Lng: string;
}

/**
 * Basic tree data structure returned from API
 */
export interface Tree {
  /** Path to the default image of the tree */
  DefaultImagePath: string;
  /** Display name of the tree */
  DisplayName: string;
  /** Unique identifier for the tree */
  EntityId: string;
  /** JSON string containing location data - must be parsed */
  GeoLocation: string;
}

/**
 * Extended tree details with additional properties
 */
export interface TreeDetails extends Tree {
  /** Tree description text */
  Description?: string;
  /** Physical characteristics of the tree */
  Characteristics?: {
    height: string;
    spread: string;
    habitat: string;
  };
}

/**
 * Tree data with parsed GeoLocation
 */
export interface TreeData extends Omit<Tree, "GeoLocation"> {
  /** Parsed location data as an array of points */
  GeoLocation: TreeLocation[];
}

export interface TreesResponse {
  ArrayOfThemeEntityAbridgedData: {
    ThemeEntityAbridgedData: Tree[];
  };
}
