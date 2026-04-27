export interface Car {
  id: number;
  make: string;
  model: string;
  trim: string;
  year: number;
  price: number;
  msrp?: number;
  mileage: number;
  condition: string;
  fuelType: string;
  driveType: string;
  images: string[];
  isSponsored: boolean;
  priceRating: string | null;
  badges: string[];
  dealerName: string;
  dealerPhone: string;
  hasOnlinePaperwork: boolean;
  features: Feature[];
}

export interface Feature {
  id: number;
  name: string;
  category: string; // API-driven feature group, e.g. HIGHLIGHTS, SAFETY, COMFORT
}

export interface FilterOptions {
  make: string[];
  condition: string[];
  driveType: string[];
  fuelType: string[];
  priceRating: string[];
  features: Feature[];
}

export interface CarFilters {
  keyword?: string | null;
  make?: string | null;
  model?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  minYear?: number | null;
  maxYear?: number | null;
  maxMileage?: number | null;
  onlinePaper?: boolean | null;
  condition: string[];
  driveType: string[];
  priceRating: string[];
  features: string[];
  fuelType: string[];
}

export type SortOption =
  | "price_asc"
  | "price_desc"
  | "year_desc"
  | "year_asc"
  | "recommended";

export interface CarState {
  items: Car[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  filters: CarFilters;
  sortBy: SortOption;
  totalResults: number;
  page: number;
  hasMore: boolean;
}

export interface PageResponse<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  hasNext: boolean;
}

export interface FetchCarsPayload {
  cars: Car[];
  totalResults: number;
  hasMore: boolean;
  pageIndex: number;
}
