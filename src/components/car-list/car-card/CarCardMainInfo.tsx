import type { Car } from "@/types/type";

interface CarCardMainInfoProps {
  car: Car;
}

const formatMileage = (mileage: number) => {
  if (mileage >= 1000) {
    return `${(mileage / 1000).toFixed(0)}K`;
  }

  return mileage;
};

export const CarCardMainInfo = ({ car }: CarCardMainInfoProps) => (
  <>
    <p className="text-xs text-gray-600 mb-1">{car.condition}</p>

    <h3 className="text-lg font-bold text-gray-900 leading-tight hover:underline mb-1">
      {car.year} {car.make} {car.model}
    </h3>

    <p className="text-sm text-gray-600 mb-3 flex items-center gap-1.5">
      {car.trim} • {formatMileage(car.mileage)} mi
      {car.fuelType === "Hybrid" && (
        <span className="flex items-center gap-1 ml-1 text-gray-500">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 22h20L12 2z" />
          </svg>
          Hybrid
        </span>
      )}
    </p>
  </>
);
