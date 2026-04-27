export const CheckboxItem = ({
  label,
  checked,
  onChange,
  hasTooltip = false,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  hasTooltip?: boolean;
}) => (
  <div className="flex items-center justify-between mb-3 group">
    <label className="flex items-center gap-3 cursor-pointer flex-1">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded border-gray-400 text-[#004685] focus:ring-[#004685] cursor-pointer"
      />
      <span className="text-[15px] text-gray-700 group-hover:text-gray-900">
        {label}
      </span>
    </label>
    {hasTooltip && (
      <span className="text-blue-600 text-xs border border-blue-600 rounded-full w-4 h-4 flex items-center justify-center cursor-help">
        i
      </span>
    )}
  </div>
);
