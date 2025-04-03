import { Plant, PaginatedResponse, ApiError } from "../types/api";

const API_BASE_URL = "https://api.arboretum.umn.edu/v1";

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { params, ...init } = options;
  const url = new URL(`${API_BASE_URL}${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const response = await fetch(url.toString(), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "An error occurred");
  }

  return data;
}

export const api = {
  plants: {
    list: (params?: {
      page?: number;
      pageSize?: number;
      search?: string;
      family?: string;
      isNative?: boolean;
    }) => fetchApi<PaginatedResponse<Plant>>("/plants", { params }),

    getById: (id: string) => fetchApi<Plant>(`/plants/${id}`),

    search: (query: string) =>
      fetchApi<PaginatedResponse<Plant>>("/plants/search", {
        params: { q: query },
      }),
  },

  locations: {
    list: () => fetchApi<PaginatedResponse<Location>>("/locations"),

    getById: (id: string) => fetchApi<Location>(`/locations/${id}`),

    getPlantsInLocation: (locationId: string) =>
      fetchApi<PaginatedResponse<Plant>>(`/locations/${locationId}/plants`),
  },
};
