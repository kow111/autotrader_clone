import { FilterSection } from "./FilterSection";
import { useSidebarLogic } from "@/hooks/useSidebarLogic";
import { CheckboxGroup } from "./CheckboxGroup";
import { MILEAGE_OPTIONS, ONLINE_PAPER_OPTIONS } from "@/data/constants";
import { FilterSelect } from "./FilterSelect";
import type { FilterOptions } from "@/types/type";
import { FeatureFilter } from "./FeatureFilter";
import { KeywordSearch } from "./KeywordSearch";
import { RangeFilter } from "./RangeFilter";
import React from "react";

const SidebarFilter = () => {
  const {
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
  } = useSidebarLogic();

  const labelToOptions = (labels: string[]) => {
    return labels.map((i) => ({ value: i, label: i }));
  };

  const formatTitle = (key: string) => {
    const result = key.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <KeywordSearch keyword={keyword} setKeyword={setKeyword} />

      <div className="border border-gray-200 rounded-sm bg-white overflow-hidden">
        <RangeFilter
          title="Year"
          type="select"
          options={years}
          minLabel="Min Year"
          maxLabel="Max Year"
          minValue={minYear}
          maxValue={maxYear}
          onMinChange={setMinYear}
          onMaxChange={setMaxYear}
          error={validationErrors.yearError}
        />

        <RangeFilter
          title="Price"
          type="input"
          minPlaceholder="$0"
          maxPlaceholder="No Max"
          minLabel="Min"
          maxLabel="Max"
          minValue={minPrice}
          maxValue={maxPrice}
          onMinChange={setMinPrice}
          onMaxChange={setMaxPrice}
          error={validationErrors.priceError}
        />

        <FilterSection title="Purchase Option" defaultOpen>
          <FilterSelect
            value={
              filters.onlinePaper !== null ? String(filters.onlinePaper) : ""
            }
            onChange={(val) => {
              let parsedVal: boolean | null = null;
              if (val === "true") parsedVal = true;
              if (val === "false") parsedVal = false;
              handleFilterChange("onlinePaper", parsedVal);
            }}
            options={ONLINE_PAPER_OPTIONS}
            placeholder="Any"
          />
        </FilterSection>

        <FilterSection title="Mileage" defaultOpen>
          <FilterSelect
            value={filters.maxMileage || ""}
            onChange={(val) => handleFilterChange("maxMileage", val || null)}
            options={MILEAGE_OPTIONS}
            placeholder="Any Mileage"
          />
        </FilterSection>
        {filterOptions &&
          Object.entries(filterOptions).map(([rawKey, value]) => {
            const key = rawKey as keyof FilterOptions;

            switch (key) {
              case "make":
                return (
                  <FilterSection
                    key={key}
                    title="Make, Model & Trim"
                    defaultOpen
                  >
                    <FilterSelect
                      value={(filters[key] as string) || ""}
                      onChange={(val) => handleFilterChange(key, val || null)}
                      options={labelToOptions(value as string[])}
                      placeholder="Any Make"
                    />
                  </FilterSection>
                );
              case "features":
                return (
                  <FilterSection key={key} title="Features" defaultOpen>
                    <FeatureFilter
                      features={filterOptions?.features || []}
                      selectedValues={filters.features || []}
                      onToggle={handleCheckboxToggle}
                    />
                  </FilterSection>
                );

              default:
                return (
                  <FilterSection key={key} title={formatTitle(key)} defaultOpen>
                    <CheckboxGroup
                      filterKey={key}
                      options={labelToOptions(value as string[])}
                      selectedValues={(filters[key] as string[]) || []}
                      onToggle={handleCheckboxToggle}
                    />
                  </FilterSection>
                );
            }
          })}
      </div>
    </div>
  );
};

export default React.memo(SidebarFilter);
