// src/components/CheckboxGroup.tsx

import { CheckboxItem } from "./CheckboxItem";
import { CarFilters } from "@/types/type";

export interface CheckboxOption {
  label: string;
  value: string;
  hasTooltip?: boolean;
}

interface CheckboxGroupProps {
  filterKey: keyof CarFilters;
  options: CheckboxOption[];
  selectedValues: string[];
  onToggle: (key: keyof CarFilters, value: string) => void;
  defaultOpen?: boolean;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  filterKey,
  options,
  selectedValues,
  onToggle,
}) => {
  return (
    <>
      {options.map((opt) => (
        <CheckboxItem
          key={opt.value}
          label={opt.label}
          checked={selectedValues?.includes(opt.value) || false}
          onChange={() => onToggle(filterKey, opt.value)}
          hasTooltip={opt.hasTooltip}
        />
      ))}
    </>
  );
};
