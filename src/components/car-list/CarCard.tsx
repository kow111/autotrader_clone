import { useNavigate } from "react-router-dom";

import type { Car } from "@/types/type";

import { CarCardBadges } from "./car-card/CarCardBadges";
import { CarCardDealerFooter } from "./car-card/CarCardDealerFooter";
import { CarCardMainInfo } from "./car-card/CarCardMainInfo";
import { CarCardMedia } from "./car-card/CarCardMedia";
import { CarCardPricing } from "./car-card/CarCardPricing";

interface CarCardProps {
  car: Car;
  onRequestInfo?: () => void;
  isSimilar?: boolean;
}

export const CarCard: React.FC<CarCardProps> = ({
  car,
  onRequestInfo,
  isSimilar,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/car/${car.id}${location.search}`, {
      state: { fromSearch: true },
    });
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-lg border border-gray-300 overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col font-sans h-full"
    >
      <CarCardMedia car={car} />

      <div className="p-4 flex flex-col grow cursor-pointer">
        <CarCardMainInfo car={car} />
        <CarCardPricing car={car} />
        <CarCardBadges car={car} isSimilar={isSimilar} />
      </div>
      {!isSimilar && (
        <>
          <hr className="mx-auto w-[90%] border-gray-300" />
          <CarCardDealerFooter car={car} onRequestInfo={onRequestInfo} />
        </>
      )}
    </div>
  );
};
