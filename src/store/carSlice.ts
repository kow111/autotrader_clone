import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit/react";
import { carApi } from "../services/api";
import type { RootState } from "./store";
import type { CarFilters, CarState, FetchCarsPayload } from "../types/type";

const initialState: CarState = {
  items: [],
  status: "idle",
  error: null,
  filters: {
    keyword: null,
    make: null,
    model: null,
    minPrice: null,
    maxPrice: null,
    fuelType: [] as string[],
    minYear: null,
    maxYear: null,
    maxMileage: null,
    condition: [] as string[],
    driveType: [] as string[],
    priceRating: [] as string[],
    features: [] as string[],
  },
  sortBy: "recommended",
  totalResults: 0,
  page: 0,
  hasMore: true,
};

export const fetchCarsAsync = createAsyncThunk<
  FetchCarsPayload,
  number,
  { state: RootState; rejectValue: string }
>("cars/fetchCars", async (pageIndex, { getState, rejectWithValue }) => {
  try {
    const { filters, sortBy } = getState().cars;
    const data = await carApi.fetchCars(filters, sortBy, pageIndex);

    if (!data) {
      return rejectWithValue("Không nhận được dữ liệu từ server");
    }

    return { ...data, pageIndex };
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Lỗi không xác định");
  }
});

const carSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<CarFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      if (action.payload.make !== undefined) {
        state.filters.model = null;
      }
    },
    toggleArrayFilter: (
      state,
      action: PayloadAction<{
        key: keyof CarFilters;
        value: string;
      }>,
    ) => {
      const { key, value } = action.payload;
      const currentArray = state.filters[key] as string[];

      if (currentArray.includes(value)) {
        (state.filters[key] as string[]) = currentArray.filter(
          (item) => item !== value,
        );
      } else {
        (state.filters[key] as string[]).push(value);
      }
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarsAsync.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
        const requestedPage = action.meta.arg;

        if (requestedPage === 0) {
          state.items = [];
          state.page = 0;
        }
      })
      .addCase(fetchCarsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        const { cars, totalResults, hasMore, pageIndex } = action.payload;

        state.items = pageIndex === 0 ? cars : [...state.items, ...cars];

        state.totalResults = totalResults;
        state.hasMore = hasMore;
        state.page = pageIndex;
      })
      .addCase(fetchCarsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload || action.error.message || "Something went wrong";
      });
  },
});

export const { setFilter, clearFilters, setSortBy, toggleArrayFilter } =
  carSlice.actions;
export default carSlice.reducer;
