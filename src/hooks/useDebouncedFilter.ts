import { useState, useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { setFilter } from "../store/carSlice";
import type { CarFilters } from "../types/type";

export function useDebouncedFilter<K extends keyof CarFilters>(
  filterKey: K,
  reduxValue: CarFilters[K],
  delay: number = 500,
) {
  const dispatch = useAppDispatch();

  const [localValue, setLocalValue] = useState<CarFilters[K]>(reduxValue);

  useEffect(() => {
    setLocalValue(reduxValue);
  }, [reduxValue]);

  useEffect(() => {
    if (localValue === reduxValue) return;

    const handler = setTimeout(() => {
      dispatch(setFilter({ [filterKey]: localValue } as Pick<CarFilters, K>));
    }, delay);

    return () => clearTimeout(handler);
  }, [localValue, reduxValue, filterKey, delay, dispatch]);

  return [localValue, setLocalValue] as const;
}
