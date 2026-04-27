import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setFilter, toggleArrayFilter } from "../store/carSlice";
import { uiValidationSchema } from "../utils/validators";
import { useDebouncedFilter } from "./useDebouncedFilter";
import type { CarFilters } from "@/types/type";
import { useGetFilterOptionsQuery } from "@/store/filterOptionsApi";

export const useSidebarLogic = () => {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.cars);
  const { data: filterOptions } = useGetFilterOptionsQuery();

  const [keyword, setKeyword] = useDebouncedFilter("keyword", filters.keyword);
  const [minPrice, setMinPrice] = useDebouncedFilter(
    "minPrice",
    filters.minPrice,
  );
  const [maxPrice, setMaxPrice] = useDebouncedFilter(
    "maxPrice",
    filters.maxPrice,
  );
  const [minYear, setMinYear] = useDebouncedFilter("minYear", filters.minYear);
  const [maxYear, setMaxYear] = useDebouncedFilter("maxYear", filters.maxYear);

  const handleFilterChange = (
    key: keyof CarFilters,
    value: string | number | boolean | null,
  ) => {
    dispatch(setFilter({ [key]: value }));
  };

  const handleCheckboxToggle = (filterKey: keyof CarFilters, value: string) => {
    dispatch(toggleArrayFilter({ key: filterKey, value }));
  };

  const validationErrors = useMemo(() => {
    const result = uiValidationSchema.safeParse({
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      minYear: filters.minYear,
      maxYear: filters.maxYear,
    });

    const errors: Record<string, string> = {};
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        errors[String(issue.path[0])] = issue.message;
      });
    }
    return errors;
  }, [filters.minPrice, filters.maxPrice, filters.minYear, filters.maxYear]);

  const currentYear = new Date().getFullYear();
  const years = useMemo(
    () => Array.from({ length: 20 }, (_, i) => currentYear + 1 - i),
    [currentYear],
  );

  return {
    filters,
    validationErrors,
    years,
    handleFilterChange,
    handleCheckboxToggle,
    keyword,
    setKeyword,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    minYear,
    setMinYear,
    maxYear,
    setMaxYear,
    filterOptions,
  };
};
