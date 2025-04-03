export interface Plant {
  id: string;
  scientificName: string;
  commonName: string;
  family: string;
  description: string;
  characteristics: {
    bark?: string;
    flower?: string;
    fruit?: string;
    leaf?: string;
    height?: string;
    spread?: string;
    habitat?: string;
    nativeRange?: string;
  };
  growthRequirements: {
    sunlight?: string[];
    soil?: string[];
    water?: string;
    hardiness?: {
      min: number;
      max: number;
    };
  };
  images: {
    url: string;
    caption?: string;
    credit?: string;
  }[];
  tags: string[];
  isNative: boolean;
  locations: {
    id: string;
    name: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  }[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
}

export interface TreeLocation {
  Lat: string;
  Lng: string;
}

export interface Tree {
  defaultImagePath: string;
  displayName: string;
  entityId: number;
  geoLocation: TreeLocation[];
}

export interface TreeResponse {
  ThemeEntityAbridgedData: Tree[];
}
