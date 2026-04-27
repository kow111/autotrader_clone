import type {
  Car,
  CarFilters,
  FilterOptions,
  PageResponse,
  SortOption,
} from "../types/type";
import { API_BASE_URL } from "@/config/apiBaseUrl";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const carApi = {
  fetchCars: async (
    filters: CarFilters,
    sortBy: SortOption,
    page: number = 0,
    size: number = 10,
  ) => {
    const params = new URLSearchParams();
    //for displaying skeleton UI
    await delay(400);
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((val) => params.append(key, val));
      } else if (value !== null && value !== undefined && value !== "") {
        params.append(key, String(value));
      }
    });

    if (sortBy && sortBy !== "recommended") {
      params.append("sort", sortBy);
    }

    params.append("page", String(page));
    params.append("size", String(size));

    const response = await fetch(`${API_BASE_URL}/cars?${params.toString()}`);

    if (!response.ok) {
      throw new Error("Lỗi khi fetch dữ liệu từ server");
    }

    const apiResult: PageResponse<Car> = await response.json();

    return {
      cars: apiResult.data ?? [],
      totalResults: apiResult.totalElements,
      hasMore: apiResult.hasNext,
    };
  },

  getCarById: async (id: number): Promise<Car | undefined> => {
    // for displaying skeleton UI
    await delay(400);
    const response = await fetch(`${API_BASE_URL}/cars/${id}`);

    if (!response.ok) {
      throw new Error("Error fetch data from server");
    }

    return response.json();
  },

  getFilter: async (): Promise<FilterOptions | undefined> => {
    const response = await fetch(`${API_BASE_URL}/cars/filters`);

    if (!response.ok) {
      throw new Error("Error fetch data from server");
    }

    return response.json();
  },
};
