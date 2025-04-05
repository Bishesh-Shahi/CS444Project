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
  /** Parsed location data as an array of points */
  geoLocation: TreeLocation[];
}

/**
 * Raw tree data from the API with unparsed GeoLocation
 */
export interface RawTree {
  /** Path to the default image of the tree */
  DefaultImagePath: string;
  /** Display name of the tree */
  DisplayName: string;
  /** Unique identifier for the tree */
  EntityId: string;
  /** Location data as a JSON string - needs to be parsed */
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

export interface TreesResponse {
  ArrayOfThemeEntityAbridgedData: {
    ThemeEntityAbridgedData: RawTree[];
  };
}
