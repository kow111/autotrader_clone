import { useEffect } from "react";
import { X } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { clearFilters } from "@/store/carSlice";
import SidebarFilter from "./SidebarFilter";
import { FiltersBar } from "./FiltersBar";

interface MobileFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileFilterModal: React.FC<MobileFilterModalProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const { totalResults, status } = useAppSelector((state) => state.cars);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex justify-end bg-black/60 backdrop-blur-sm md:hidden">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="relative w-full h-[95vh] mt-auto bg-white flex flex-col rounded-t-2xl shadow-2xl animate-slide-up">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 shrink-0">
          <div className="w-8"></div>
          <h2 className="text-xl font-black text-gray-900">Filters</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={22} />
          </button>
        </div>
        <div className="px-4 py-3 border-b border-gray-200 shrink-0 flex items-center">
          <FiltersBar />
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <SidebarFilter />
        </div>

        <div className="p-4 border-t border-gray-200 shrink-0 flex gap-3 bg-white pb-safe">
          <button
            onClick={() => {
              dispatch(clearFilters());
              onClose();
            }}
            className="flex-1 py-3.5 border border-[#004685] text-[#004685] font-bold text-[15px] rounded-md hover:bg-blue-50 transition-colors"
          >
            Clear Filters
          </button>
          {status === "loading" ? (
            <button
              disabled
              className="flex-2 py-3.5 bg-[#004685] text-white font-bold text-[15px] rounded-md "
            >
              Loading...
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex-2 py-3.5 bg-[#004685] text-white font-bold text-[15px] rounded-md hover:bg-blue-800 transition-colors shadow-md"
            >
              See {totalResults.toLocaleString()} Results
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
