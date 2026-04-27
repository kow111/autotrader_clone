import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export const FilterSection = ({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer w-full flex justify-between items-center py-4 px-3 hover:bg-gray-50 text-left font-bold text-gray-900 text-[15px] transition-colors"
      >
        {title}
        {isOpen ? (
          <ChevronUp size={20} className="text-[#d85e26]" />
        ) : (
          <ChevronDown size={20} className="text-[#d85e26]" />
        )}
      </button>
      {isOpen && <div className="pb-4 px-3">{children}</div>}
    </div>
  );
};
