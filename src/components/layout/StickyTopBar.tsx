import { useState, useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { clearFilters } from "@/store/carSlice";
import { Heart, Funnel } from "lucide-react";
import { useSidebarLogic } from "@/hooks/useSidebarLogic";
import { KeywordSearch } from "../filters/KeywordSearch";
import { MobileFilterModal } from "../filters/MobileFilterModal";
import ActiveFilter from "../filters/ActiveFilter";

export const StickyTopBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { keyword, setKeyword } = useSidebarLogic();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-50 transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center gap-4">
          <div className="relative shrink-0 w-64 hidden md:block">
            <KeywordSearch keyword={keyword} setKeyword={setKeyword} />
          </div>

          <div className="hidden md:block h-6 w-px bg-gray-300"></div>

          <div className="flex-1 flex items-center overflow-hidden relative">
            <div
              id="sticky-pills-container"
              className="flex flex-1 items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth whitespace-nowrap pr-8"
            >
              <div className="hidden md:flex items-center gap-2 text-[#004685] shrink-0 mr-2 ">
                <Heart size={16} />
                <span className="font-bold text-sm cursor-pointer hover:underline ">
                  Save Search
                </span>
                <span className="text-gray-300 mx-1">|</span>
                <button
                  onClick={() => dispatch(clearFilters())}
                  className="text-sm font-medium hover:underline focus:outline-none"
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
          </div>
        </div>
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
