export interface TreeLocation {
  Lat: string;
  Lng: string;
}

export interface Tree {
  DefaultImagePath: string;
  DisplayName: string;
  EntityId: string;
  GeoLocation: string; // This is a JSON string that needs to be parsed
}

export interface TreeData extends Omit<Tree, "GeoLocation"> {
  GeoLocation: TreeLocation[];
}

export interface TreesResponse {
  ArrayOfThemeEntityAbridgedData: {
    ThemeEntityAbridgedData: Tree[];
  };
}
