export interface SelectOption {
  label: string | number;
  value: string | number;
}

interface FilterSelectProps {
  label?: string;
  value: string | number;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
}

export const FilterSelect: React.FC<FilterSelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = "Any",
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs text-gray-500 mb-1">{label}</label>
      )}
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2.5 text-[15px] text-gray-700 bg-white outline-none focus:border-[#004685] cursor-pointer"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
