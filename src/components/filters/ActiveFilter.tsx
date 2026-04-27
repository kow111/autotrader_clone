import { X } from "lucide-react";
import { useActiveFilter } from "@/hooks/useActiveFilter";

const ActiveFilter = () => {
  const { activePills, removeFilter } = useActiveFilter();

  return (
    <>
      {activePills.map((pill, idx) => (
        <div
          key={`${pill.key}-${pill.value}-${idx}`}
          className="flex items-center gap-1.5 bg-[#e8f0fe] text-[#004685] px-3 py-1 rounded-full text-[13px] font-semibold border border-blue-100 shrink-0 cursor-pointer hover:bg-[#d2e3fc] transition-colors"
          onClick={() => removeFilter(pill)}
        >
          <span>{pill.label}</span>
          <X size={14} className="text-blue-700" />
        </div>
      ))}
    </>
  );
};

export default ActiveFilter;
