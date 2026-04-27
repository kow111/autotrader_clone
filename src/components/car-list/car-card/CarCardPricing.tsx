import type { Car } from "@/types/type";
import { formatMoney } from "@/utils/formatMoney";

interface CarCardPricingProps {
  car: Car;
}

export const CarCardPricing = ({ car }: CarCardPricingProps) => (
  <div className="mb-3">
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-extrabold text-gray-900">
        {formatMoney(car.price)}
      </span>
      {car.msrp && (
        <span className="text-xs text-gray-500 line-through">
          MSRP {formatMoney(car.msrp)}
        </span>
      )}
      {!car.msrp && car.condition === "New" && (
        <span className="text-xs text-gray-500 flex items-center gap-0.5">
          TSRP
          <span className="border border-gray-400 rounded-full w-3 h-3 inline-flex items-center justify-center text-[8px]">
            i
          </span>
        </span>
      )}
    </div>
    <a href="#" className="text-sm text-blue-700 hover:underline">
      See payment
    </a>
  </div>
);
