import { Info } from "lucide-react";
import { FilterSection } from "./FilterSection";

interface Props {
  title: string;
  minLabel: string;
  maxLabel: string;
  minValue: number | null | undefined;
  maxValue: number | null | undefined;
  onMinChange: (val: number | null) => void;
  onMaxChange: (val: number | null) => void;
  error?: string;

  type: "input" | "select";

  options?: number[];
  minPlaceholder?: string;
  maxPlaceholder?: string;
}

export const RangeFilter: React.FC<Props> = ({
  title,
  minLabel,
  maxLabel,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  error,
  type,
  options = [],
  minPlaceholder = "",
  maxPlaceholder = "",
}) => {
  const renderControl = (
    value: number | null | undefined,
    onChange: (val: number | null) => void,
    placeholder: string,
  ) => {
    if (type === "select") {
      return (
        <select
          value={value || ""}
          onChange={(e) =>
            onChange(e.target.value ? Number(e.target.value) : null)
          }
          className="w-full border border-gray-300 rounded p-2.5 text-[15px] outline-none focus:border-[#004685] bg-white cursor-pointer"
        >
          <option value="">Any</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type="number"
        placeholder={placeholder}
        value={value || ""}
        onChange={(e) =>
          onChange(e.target.value ? Number(e.target.value) : null)
        }
        className="w-full border border-gray-300 rounded p-2.5 text-[15px] outline-none focus:border-[#004685]"
      />
    );
  };

  return (
    <FilterSection title={title} defaultOpen>
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">{minLabel}</label>
          {renderControl(minValue, onMinChange, minPlaceholder)}
        </div>
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">{maxLabel}</label>
          {renderControl(maxValue, onMaxChange, maxPlaceholder)}
        </div>
      </div>

      {error && (
        <div className="mt-2 text-red-600 text-[11px] font-bold flex items-center gap-1 bg-[#fdf5f5] p-2 border border-red-200 rounded">
          <Info size={14} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </FilterSection>
  );
};
