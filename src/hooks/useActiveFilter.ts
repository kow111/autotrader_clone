import { setFilter, toggleArrayFilter } from "@/store/carSlice";
import { useGetFilterOptionsQuery } from "@/store/filterOptionsApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { FilterOptions } from "@/types/type";
import { useMemo } from "react";

interface ActivePill {
  key: string;
  value: string | number | boolean;
  label: string;
  isArray: boolean;
}

export const useActiveFilter = () => {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.cars);
  const { data: filterOptions } = useGetFilterOptionsQuery();

  const featureLabelById = useMemo(() => {
    const map = new Map<string, string>();
    (filterOptions?.features ?? []).forEach((feature) => {
      map.set(String(feature.id), feature.name);
    });
    return map;
  }, [filterOptions]);

  const activePills: ActivePill[] = useMemo(() => {
    const pills: ActivePill[] = [];
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) =>
          pills.push({
            key,
            value: item,
            label:
              key === "features"
                ? (featureLabelById.get(String(item)) ?? String(item))
                : item,
            isArray: true,
          }),
        );
        return;
      }

      if (value !== null && value !== "") {
        let label = String(value);
        switch (key) {
          case "keyword":
            label = `Keyword: ${value}`;
            break;
          case "minPrice":
            label = `Min: $${value.toLocaleString()}`;
            break;
          case "maxPrice":
            label = `Max: $${value.toLocaleString()}`;
            break;
          case "minYear":
            label = `From ${value}`;
            break;
          case "maxYear":
            label = `To ${value}`;
            break;
          case "maxMileage":
            label = `Under ${value.toLocaleString()} mi`;
            break;
          case "make":
            label = `Make: ${value}`;
            break;
          case "onlinePaper":
            label = value === true ? "Buy 100% online" : "Paper only";
            break;
          default:
            label = String(value);
        }
        pills.push({ key, value, label, isArray: false });
      }
    });
    return pills;
  }, [filters, featureLabelById]);

  const removeFilter = (pill: (typeof activePills)[0]) => {
    if (pill.isArray) {
      dispatch(
        toggleArrayFilter({
          key: pill.key as keyof FilterOptions,
          value: String(pill.value),
        }),
      );
      return;
    }

    dispatch(setFilter({ [pill.key]: null }));
  };
  return {
    activePills,
    removeFilter,
  };
};
