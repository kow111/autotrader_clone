import { Star, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import type { Car } from "@/types/type";
import { useScroll } from "@/hooks/useScroll";
import { CarCard } from "../car-list/CarCard";

interface SimilarCarsFromDealerProps {
  mainCar: Car;
  similarCars: Car[];
}

export const SimilarCarsFromDealer: React.FC<SimilarCarsFromDealerProps> = ({
  mainCar,
  similarCars,
}) => {
  const { scrollContainerRef, handleScroll } = useScroll({
    scrollAmount: 300,
  });

  if (!similarCars || similarCars.length === 0) return null;

  return (
    <div className="my-8">
      <h2 className="text-3xl font-bold text-[#002b5e] mb-6 tracking-tight">
        Check out similar styles from this dealer
      </h2>

      <div className="flex flex-col xl:flex-row gap-6 items-stretch">
        {/* ================= CỘT TRÁI: DEALER INFO CARD ================= */}
        <div className="w-full xl:w-[320px] shrink-0 bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {mainCar.dealerName || "Premium Auto Dealer"}
          </h3>

          <div className="flex items-center gap-1.5 text-[13px] font-medium mb-5">
            <span className="text-gray-600">KBB.com® Dealer Rating</span>
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-gray-900">4.9</span>
            <span className="text-blue-600 font-normal">(1076)</span>
          </div>

          <div className="space-y-4 text-[15px] mb-8 w-full">
            <a
              href="#"
              className="text-[#004685] hover:underline flex items-center justify-center gap-1"
            >
              6133 S 27TH ST, Milwaukee, WI 53221
              <ExternalLink size={14} />
            </a>

            <p className="text-gray-700">
              {mainCar.dealerPhone || "(414) 455-2982"}
            </p>

            <p className="text-gray-500">Closed</p>

            <button className="text-[#004685] hover:underline font-medium">
              View all hours
            </button>
          </div>

          <button className="mt-auto w-full bg-[#004685] hover:bg-[#00386b] text-white font-bold py-3 px-4 rounded transition-colors flex items-center justify-center gap-2">
            Visit Dealer Website
            <ExternalLink size={16} strokeWidth={2.5} />
          </button>
        </div>

        {/* ================= CỘT PHẢI: CAROUSEL CAR CARDS ================= */}
        <div className="flex-1 relative group min-w-0">
          <button
            onClick={() => handleScroll("left")}
            className=" cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.15)] border border-gray-100 flex items-center justify-center text-[#004685] opacity-0 group-hover:opacity-100 transition-opacity duration-300 xl:hidden group-hover:xl:flex"
          >
            <ChevronLeft size={24} />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar h-full"
          >
            {similarCars.map((car, idx) => (
              <div key={idx} className="w-70 shrink-0 snap-start h-full">
                <CarCard car={car} onRequestInfo={() => {}} isSimilar={true} />
              </div>
            ))}
          </div>

          <button
            onClick={() => handleScroll("right")}
            className="  cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.15)] border border-gray-100 flex items-center justify-center text-[#004685] opacity-0 group-hover:opacity-100 transition-opacity duration-300 xl:hidden group-hover:xl:flex"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
