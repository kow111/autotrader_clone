import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchCarsAsync, setSortBy, setFilter } from "../store/carSlice";
import { carFilterSchema, uiValidationSchema } from "../utils/validators";
import type { SortOption } from "../types/type";

const normalizeParamString = (params: URLSearchParams) => {
  const entries = [...params.entries()].sort(
    ([keyA, valueA], [keyB, valueB]) => {
      if (keyA === keyB) return valueA.localeCompare(valueB);
      return keyA.localeCompare(keyB);
    },
  );

  return new URLSearchParams(entries).toString();
};

export const useCarSearchSync = () => {
  const dispatch = useAppDispatch();
  const { filters, sortBy, status } = useAppSelector((state) => state.cars);
  const [searchParams, setSearchParams] = useSearchParams();
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      const rawUrlData = {
        keyword: searchParams.get("keyword"),
        make: searchParams.get("make"),
        minPrice: searchParams.get("minPrice"),
        maxPrice: searchParams.get("maxPrice"),
        minYear: searchParams.get("minYear"),
        maxYear: searchParams.get("maxYear"),
        maxMileage: searchParams.get("maxMileage"),
        condition: searchParams.getAll("condition"),
        driveType: searchParams.getAll("driveType"),
        priceRating: searchParams.getAll("priceRating"),
        features: searchParams.getAll("features"),
        fuelType: searchParams.getAll("fuelType"),
      };

      const parsedFilters = carFilterSchema.safeParse(rawUrlData);

      if (parsedFilters.success) {
        dispatch(setFilter(parsedFilters.data));
      }

      const sortParam = searchParams.get("sort");
      if (sortParam) dispatch(setSortBy(sortParam as SortOption));

      isInitialMount.current = false;
    }
  }, [dispatch, searchParams]);

  useEffect(() => {
    if (!isInitialMount.current) {
      const validationResult = uiValidationSchema.safeParse({
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        minYear: filters.minYear,
        maxYear: filters.maxYear,
      });

      if (!validationResult.success) {
        return;
      }

      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          if (value.length > 0) value.forEach((val) => params.append(key, val));
        } else if (value !== null && value !== "") {
          params.append(key, String(value));
        }
      });

      if (sortBy !== "recommended") params.append("sort", sortBy);

      const nextParamString = normalizeParamString(params);
      const currentParamString = normalizeParamString(searchParams);

      if (nextParamString !== currentParamString) {
        setSearchParams(params, { replace: true });
      }

      if (nextParamString === currentParamString && status !== "idle") {
        return;
      }

      if (status === "loading") {
        return;
      }
      dispatch(fetchCarsAsync(0));
    }
  }, [filters, sortBy, status, dispatch, setSearchParams, searchParams]);
};
