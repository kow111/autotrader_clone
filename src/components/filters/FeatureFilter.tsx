import { useMemo } from "react";
import { CheckboxGroup } from "./CheckboxGroup";
import type { CarFilters, Feature } from "@/types/type";

type FeatureFilterProps = {
  features: Feature[];
  selectedValues: string[];
  onToggle: (key: keyof CarFilters, value: string) => void;
};

const formatCategoryTitle = (category: string) =>
  category
    .replace(/[_-]+/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

export const FeatureFilter = ({
  features,
  selectedValues,
  onToggle,
}: FeatureFilterProps) => {
  const groupedFeatures = useMemo(() => {
    const groups = new Map<string, Feature[]>();

    features.forEach((feature) => {
      const category = feature.category?.trim() || "Other";
      const current = groups.get(category) ?? [];
      groups.set(category, [...current, feature]);
    });

    return Array.from(groups.entries());
  }, [features]);

  if (!features.length) return null;

  return (
    <div className="space-y-4">
      {groupedFeatures.map(([category, items]) => (
        <div key={category}>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
            {formatCategoryTitle(category)}
          </p>
          <CheckboxGroup
            filterKey="features"
            options={items.map((item) => ({
              label: item.name,
              value: item.id.toString(),
            }))}
            selectedValues={selectedValues}
            onToggle={onToggle}
          />
        </div>
      ))}
    </div>
  );
};
