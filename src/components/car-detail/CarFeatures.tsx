import { Info, ChevronLeft, ChevronRight } from "lucide-react";
import {
  generateCarFeatures,
  type FeatureItemData,
} from "@/utils/carFeaturesData";
import { useScroll } from "@/hooks/useScroll";
import { Car } from "@/types/type";

interface CarFeaturesProps {
  car: Car;
}

const FeatureItem: React.FC<FeatureItemData> = ({
  icon: Icon,
  text,
  showInfo = false,
}) => (
  <div className="flex items-start gap-4 mb-5">
    <Icon className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" strokeWidth={1.5} />
    <span className="text-[#333] text-[15px] flex items-center gap-1.5 leading-relaxed">
      {text}
      {showInfo && (
        <Info
          className="w-4 h-4 text-blue-500 cursor-pointer"
          strokeWidth={2}
        />
      )}
    </span>
  </div>
);

export const CarFeatures: React.FC<CarFeaturesProps> = ({ car }) => {
  const features = generateCarFeatures(car);

  const { scrollContainerRef, handleScroll } = useScroll({
    scrollAmount: 300,
  });

  return (
    <div className="mt-8 relative group">
      <button
        onClick={() => handleScroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100 items-center justify-center text-[#c04b2b] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex hover:bg-gray-50"
      >
        <ChevronLeft size={24} />
      </button>

      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar"
      >
        {features.map((category) => {
          const MainIcon = category.mainIcon;

          return (
            <div
              key={category.id}
              className="bg-white border border-gray-300 rounded-lg p-6 min-w-70 md:min-w-75 snap-start shrink-0"
            >
              <div className="flex flex-col items-center mb-6">
                <MainIcon
                  className="w-8 h-8 text-[#c04b2b] mb-2"
                  strokeWidth={1.5}
                />
                <h3 className="text-lg font-bold text-[#002b5e]">
                  {category.title}
                </h3>
              </div>
              <div>
                {category.items.map((item, idx) => (
                  <FeatureItem
                    key={idx}
                    icon={item.icon}
                    text={item.text}
                    showInfo={item.showInfo}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => handleScroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100 items-center justify-center text-[#c04b2b] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex hover:bg-gray-50"
      >
        <ChevronRight size={24} />
      </button>

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
