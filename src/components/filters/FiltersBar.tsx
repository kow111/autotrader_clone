import React, { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { clearFilters } from "@/store/carSlice";
import { Heart, Funnel } from "lucide-react";
import { MobileFilterModal } from "./MobileFilterModal";
import ActiveFilter from "./ActiveFilter";

export const FiltersBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center flex-wrap gap-2 mb-2 text-sm py-3">
        <div className=" items-center gap-2 text-[#004685] mr-2 hidden md:flex">
          <Heart size={16} />
          <span className="font-bold cursor-pointer hover:underline">
            Save Search
          </span>
          <span className="text-gray-400 mx-1">|</span>
          <button
            onClick={() => dispatch(clearFilters())}
            className="text-[#004685] hover:underline focus:outline-none"
          >
            Clear Filters
          </button>
        </div>
        <div
          className="text-[#004685] block md:hidden shrink-0 mr-2"
          onClick={() => setIsMobileModalOpen(true)}
        >
          <Funnel />
        </div>
        <ActiveFilter />
      </div>
      {isMobileModalOpen && (
        <MobileFilterModal
          isOpen={isMobileModalOpen}
          onClose={() => setIsMobileModalOpen(false)}
        />
      )}
    </>
  );
};
